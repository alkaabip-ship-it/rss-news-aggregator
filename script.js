// RSS News Aggregator JavaScript - Arabic News Sources

// مصادر الأخبار العربية المتخصصة
const RSS_FEEDS = [
    // أخبار عامة عربية
    {
        name: 'الجزيرة نت',
        url: 'https://www.aljazeera.net/rss/all',
        category: 'عام',
        country: 'قطر'
    },
    {
        name: 'العربية نت',
        url: 'https://www.alarabiya.net/rss.xml',
        category: 'عام',
        country: 'السعودية'
    },
    {
        name: 'سكاي نيوز عربية',
        url: 'https://www.skynewsarabia.com/rss',
        category: 'عام',
        country: 'الإمارات'
    },
    {
        name: 'CNN بالعربية',
        url: 'https://arabic.cnn.com/rss',
        category: 'عام',
        country: 'دولي'
    },
    {
        name: 'بي بي سي عربي',
        url: 'https://feeds.bbci.co.uk/arabic/rss.xml',
        category: 'عام',
        country: 'دولي'
    },
    // أخبار الإمارات وعجمان
    {
        name: 'وكالة أنباء الإمارات',
        url: 'https://wam.ae/ar/rss',
        category: 'إمارات',
        country: 'الإمارات'
    },
    {
        name: 'البيان الإماراتية',
        url: 'https://www.albayan.ae/rss',
        category: 'إمارات',
        country: 'الإمارات'
    },
    {
        name: 'الخليج الإماراتية',
        url: 'https://www.alkhaleej.ae/rss',
        category: 'إمارات',
        country: 'الإمارات'
    },
    {
        name: 'الاتحاد الإماراتية',
        url: 'https://www.alittihad.ae/rss',
        category: 'إمارات',
        country: 'الإمارات'
    },
    // أخبار سياسية عربية
    {
        name: 'الشرق الأوسط',
        url: 'https://aawsat.com/rss',
        category: 'سياسة',
        country: 'السعودية'
    },
    {
        name: 'الحياة',
        url: 'https://www.alhayat.com/rss',
        category: 'سياسة',
        country: 'لبنان'
    },
    {
        name: 'الأهرام',
        url: 'https://www.ahram.org.eg/rss',
        category: 'سياسة',
        country: 'مصر'
    },
    // أخبار عالمية بالعربية
    {
        name: 'فرانس 24 عربي',
        url: 'https://www.france24.com/ar/rss',
        category: 'عالمي',
        country: 'فرنسا'
    },
    {
        name: 'دويتشه فيله عربي',
        url: 'https://www.dw.com/ar/rss',
        category: 'عالمي',
        country: 'ألمانيا'
    },
    {
        name: 'روسيا اليوم عربي',
        url: 'https://arabic.rt.com/rss',
        category: 'عالمي',
        country: 'روسيا'
    }
];

// متغيرات عامة
let allNews = [];
let currentSort = 'date';
let currentFilter = 'all';
let customSources = JSON.parse(localStorage.getItem('customSources')) || [];

// دمج المصادر المخصصة مع المصادر الافتراضية
function getAllSources() {
    return [...RSS_FEEDS, ...customSources];
}

// تحديث قائمة المصادر في الواجهة
function updateSourcesList() {
    const sourceSelect = document.getElementById('sourceFilter');
    sourceSelect.innerHTML = '<option value="all">جميع المصادر</option>';
    
    const categories = [...new Set(getAllSources().map(feed => feed.category))];
    categories.forEach(category => {
        sourceSelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
    
    getAllSources().forEach(feed => {
        sourceSelect.innerHTML += `<option value="${feed.name}">${feed.name}</option>`;
    });
}

// جلب الأخبار من مصدر واحد
async function fetchFeedNews(feed) {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(feed.url));
        const data = await response.json();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const news = [];
        
        items.forEach((item, index) => {
            if (index < 10) { // أخذ أول 10 أخبار من كل مصدر
                const title = item.querySelector('title')?.textContent || '';
                const description = item.querySelector('description')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';
                const imageUrl = extractImageFromDescription(description) || 
                             item.querySelector('enclosure')?.getAttribute('url') || 
                             item.querySelector('media\:thumbnail')?.getAttribute('url') || 
                             'https://via.placeholder.com/300x200?text=لا+توجد+صورة';
                
                // استخراج أول 4 فقرات من الوصف
                const paragraphs = extractParagraphs(description);
                
                news.push({
                    title: cleanText(title),
                    description: cleanText(description),
                    paragraphs: paragraphs,
                    link: link,
                    pubDate: new Date(pubDate),
                    source: feed.name,
                    category: feed.category,
                    country: feed.country,
                    imageUrl: imageUrl
                });
            }
        });
        
        return news;
    } catch (error) {
        console.error(`خطأ في جلب الأخبار من ${feed.name}:`, error);
        return [];
    }
}

// استخراج الصورة من الوصف
function extractImageFromDescription(description) {
    const imgRegex = /<img[^>]+src="([^"]+)"/i;
    const match = description.match(imgRegex);
    return match ? match[1] : null;
}

// استخراج أول 4 فقرات من النص
function extractParagraphs(text) {
    // إزالة HTML tags
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // تقسيم النص إلى جمل
    const sentences = cleanText.split(/[.!?]/).filter(s => s.trim().length > 20);
    
    // أخذ أول 4 جمل
    return sentences.slice(0, 4).map(s => s.trim()).filter(s => s.length > 0);
}

// تنظيف النص
function cleanText(text) {
    return text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim();
}

// جلب جميع الأخبار
async function fetchAllNews() {
    const news-container = document.getElementById('newsContainer');
    newsContainer.innerHTML = '<div class="loading">جاري تحميل الأخبار...</div>';
    
    allNews = [];
    const sources = getAllSources();
    
    // جلب الأخبار من جميع المصادر بشكل متوازي
    const promises = sources.map(feed => fetchFeedNews(feed));
    const results = await Promise.all(promises);
    
    // دمج جميع الأخبار
    results.forEach(newsArray => {
        allNews = allNews.concat(newsArray);
    });
    
    // ترتيب الأخبار حسب التاريخ (الأحدث أولاً)
    allNews.sort((a, b) => b.pubDate - a.pubDate);
    
    displayNews(allNews);
}

// عرض الأخبار
function displayNews(newsArray) {
    const news-container = document.getElementById('newsContainer');
    
    if (newsArray.length === 0) {
        newsContainer.innerHTML = '<div class="no-news">لا توجد أخبار متاحة حالياً</div>';
        return;
    }
    
    newsContainer.innerHTML = newsArray.map(news => `
        <article class="news-card">
            <div class="news-image">
                <img src="${news.imageUrl}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/300x200?text=لا+توجد+صورة'">
            </div>
            <div class="news-content">
                <h2 class="news-title">${news.title}</h2>
                <div class="news-meta">
                    <span class="news-source">${news.source}</span>
                    <span class="news-category">${news.category}</span>
                    <span class="news-date">${formatDate(news.pubDate)}</span>
                </div>
                <div class="news-paragraphs">
                    ${news.paragraphs.map(p => `<p>${p}</p>`).join('')}
                </div>
                <a href="${news.link}" target="_blank" class="read-more">اقرأ المزيد</a>
            </div>
        </article>
    `).join('');
}

// تنسيق التاريخ
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'منذ يوم واحد';
    } else if (diffDays < 7) {
        return `منذ ${diffDays} أيام`;
    } else {
        return date.toLocaleDateString('ar-SA');
    }
}

// ترتيب الأخبار
function sortNews(sortType) {
    currentSort = sortType;
    let sortedNews = [...allNews];
    
    switch (sortType) {
        case 'date':
            sortedNews.sort((a, b) => b.pubDate - a.pubDate);
            break;
        case 'source':
            sortedNews.sort((a, b) => a.source.localeCompare(b.source, 'ar'));
            break;
        case 'category':
            sortedNews.sort((a, b) => a.category.localeCompare(b.category, 'ar'));
            break;
    }
    
    displayNews(filterNews(sortedNews));
}

// فلترة الأخبار
function filterNews(newsArray = allNews) {
    if (currentFilter === 'all') {
        return newsArray;
    }
    
    return newsArray.filter(news => {
        // فلترة خاصة لأخبار عجمان
        if (currentFilter === 'عجمان') {
            return news.title.includes('عجمان') || 
                   news.title.includes('حاكم عجمان') ||
                   news.title.includes('ولي عهد عجمان') ||
                   news.description.includes('عجمان');
        }
        
        return news.category === currentFilter || news.source === currentFilter;
    });
}

// تطبيق الفلتر
function applyFilter(filterType) {
    currentFilter = filterType;
    const filteredNews = filterNews();
    displayNews(filteredNews);
}

// إضافة مصدر جديد
function addCustomSource() {
    const name = document.getElementById('sourceName').value.trim();
    const url = document.getElementById('sourceUrl').value.trim();
    const category = document.getElementById('sourceCategory').value.trim();
    const country = document.getElementById('sourceCountry').value.trim();
    
    if (!name || !url || !category || !country) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const newSource = { name, url, category, country };
    customSources.push(newSource);
    localStorage.setItem('customSources', JSON.stringify(customSources));
    
    // إعادة تعيين النموذج
    document.getElementById('addSourceForm').reset();
    
    // تحديث قائمة المصادر
    updateSourcesList();
    displayCustomSources();
    
    alert('تم إضافة المصدر بنجاح!');
}

// حذف مصدر مخصص
function deleteCustomSource(index) {
    if (confirm('هل أنت متأكد من حذف هذا المصدر؟')) {
        customSources.splice(index, 1);
        localStorage.setItem('customSources', JSON.stringify(customSources));
        displayCustomSources();
        updateSourcesList();
    }
}

// عرض المصادر المخصصة
function displayCustomSources() {
    const container = document.getElementById('customSourcesList');
    if (!container) return;
    
    container.innerHTML = customSources.map((source, index) => `
        <div class="custom-source-item">
            <span>${source.name} - ${source.category}</span>
            <button onclick="deleteCustomSource(${index})" class="delete-btn">حذف</button>
        </div>
    `).join('');
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث قائمة المصادر
    updateSourcesList();
    displayCustomSources();
    
    // ربط الأحداث
    document.getElementById('refresh-btn').addEventListener('click', fetchAllNews);
    document.getElementById('source-filter').addEventListener('change', (e) => applyFilter(e.target.value));
    document.getElementById('sort-select').addEventListener('change', (e) => sortNews(e.target.value));
    document.getElementById('add-source-btn').addEventListener('click', addCustomSource);
    
    // جلب الأخبار عند تحميل الصفحة
    fetchAllNews();
});


// إدارة النافذة المنبثقة
document.getElementById('manage-sources-btn').addEventListener('click', function() {
    document.getElementById('source-management').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('source-management').classList.add('hidden');
});

// إغلاق النافذة عند النقر خارجها
document.getElementById('source-management').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});
