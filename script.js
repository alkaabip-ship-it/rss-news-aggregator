// RSS News Aggregator - Arabic Version

// مصادر الأخبار العربية
const RSS_FEEDS = [
    {
        name: 'الجزيرة نت',
        url: 'https://www.aljazeera.net/rss/all',
        category: 'عام'
    },
    {
        name: 'العربية نت',
        url: 'https://www.alarabiya.net/rss.xml',
        category: 'عام'
    },
    {
        name: 'سكاي نيوز عربية',
        url: 'https://www.skynewsarabia.com/rss',
        category: 'عام'
    },
    {
        name: 'وكالة أنباء الإمارات',
        url: 'https://wam.ae/ar/rss',
        category: 'إمارات'
    },
    {
        name: 'البيان الإماراتية',
        url: 'https://www.albayan.ae/rss',
        category: 'إمارات'
    }
];

let allNews = [];
let customSources = JSON.parse(localStorage.getItem('customSources')) || [];

// دمج المصادر
function getAllSources() {
    return [...RSS_FEEDS, ...customSources];
}

// جلب الأخبار من مصدر واحد
async function fetchFeedNews(feed) {
    try {
        console.log('جلب الأخبار من:', feed.name);
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(feed.url));
        
        if (!response.ok) {
            throw new Error('فشل في جلب البيانات');
        }
        
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const news = [];
        
        items.forEach((item, index) => {
            if (index < 5) { // أخذ أول 5 أخبار من كل مصدر
                const title = item.querySelector('title')?.textContent || '';
                const description = item.querySelector('description')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';
                
                // استخراج الصورة
                let imageUrl = 'https://via.placeholder.com/300x200?text=لا+توجد+صورة';
                const imgMatch = description.match(/<img[^>]+src="([^"]+)"/i);
                if (imgMatch) {
                    imageUrl = imgMatch[1];
                }
                
                // استخراج 4 فقرات
                const cleanDesc = description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
                const sentences = cleanDesc.split(/[.!?]/).filter(s => s.trim().length > 20);
                const paragraphs = sentences.slice(0, 4).map(s => s.trim()).filter(s => s.length > 0);
                
                news.push({
                    title: title.replace(/<[^>]*>/g, '').trim(),
                    description: cleanDesc,
                    paragraphs: paragraphs,
                    link: link,
                    pubDate: new Date(pubDate),
                    source: feed.name,
                    category: feed.category,
                    imageUrl: imageUrl
                });
            }
        });
        
        console.log(`تم جلب ${news.length} خبر من ${feed.name}`);
        return news;
    } catch (error) {
        console.error(`خطأ في جلب الأخبار من ${feed.name}:`, error);
        return [];
    }
}

// جلب جميع الأخبار
async function fetchAllNews() {
    const newsContainer = document.getElementById('news-container');
    const loadingDiv = document.getElementById('loading');
    
    // إظهار التحميل
    if (loadingDiv) loadingDiv.classList.remove('hidden');
    newsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>جاري تحميل الأخبار...</p></div>';
    
    console.log('بدء جلب الأخبار...');
    allNews = [];
    const sources = getAllSources();
    
    // جلب الأخبار من كل مصدر
    for (const feed of sources) {
        const feedNews = await fetchFeedNews(feed);
        allNews = allNews.concat(feedNews);
    }
    
    console.log(`تم جلب ${allNews.length} خبر إجمالي`);
    
    // ترتيب الأخبار حسب التاريخ
    allNews.sort((a, b) => b.pubDate - a.pubDate);
    
    // إخفاء التحميل
    if (loadingDiv) loadingDiv.classList.add('hidden');
    
    // عرض الأخبار
    displayNews(allNews);
}

// عرض الأخبار
function displayNews(newsArray) {
    const newsContainer = document.getElementById('news-container');
    
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
    
    displayNews(sortedNews);
}

// فلترة الأخبار
function filterNews(filterType) {
    if (filterType === 'all') {
        displayNews(allNews);
        return;
    }
    
    const filteredNews = allNews.filter(news => {
        if (filterType === 'عجمان') {
            return news.title.includes('عجمان') || 
                   news.title.includes('حاكم عجمان') ||
                   news.title.includes('ولي عهد عجمان') ||
                   news.description.includes('عجمان');
        }
        
        return news.category === filterType || news.source === filterType;
    });
    
    displayNews(filteredNews);
}

// إضافة مصدر جديد
function addCustomSource() {
    const name = document.getElementById('source-name').value.trim();
    const url = document.getElementById('source-url').value.trim();
    const category = document.getElementById('source-category').value.trim();
    
    if (!name || !url || !category) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const newSource = { name, url, category };
    customSources.push(newSource);
    localStorage.setItem('customSources', JSON.stringify(customSources));
    
    // إعادة تعيين النموذج
    document.getElementById('add-source-form').reset();
    
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
    const container = document.getElementById('custom-sources-list');
    if (!container) return;
    
    container.innerHTML = customSources.map((source, index) => `
        <div class="custom-source-item">
            <span>${source.name} - ${source.category}</span>
            <button onclick="deleteCustomSource(${index})" class="delete-btn">حذف</button>
        </div>
    `).join('');
}

// تحديث قائمة المصادر
function updateSourcesList() {
    const sourceSelect = document.getElementById('source-filter');
    if (!sourceSelect) return;
    
    sourceSelect.innerHTML = `
        <option value="all">جميع المصادر</option>
        <option value="عجمان">أخبار عجمان</option>
        <option value="عام">أخبار عامة</option>
        <option value="إمارات">أخبار الإمارات</option>
        <option value="سياسة">أخبار سياسية</option>
        <option value="عالمي">أخبار عالمية</option>
    `;
    
    getAllSources().forEach(feed => {
        sourceSelect.innerHTML += `<option value="${feed.name}">${feed.name}</option>`;
    });
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة');
    
    // تحديث قائمة المصادر
    updateSourcesList();
    displayCustomSources();
    
    // ربط الأحداث
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', fetchAllNews);
    }
    
    const sourceFilter = document.getElementById('source-filter');
    if (sourceFilter) {
        sourceFilter.addEventListener('change', (e) => filterNews(e.target.value));
    }
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => sortNews(e.target.value));
    }
    
    const addSourceBtn = document.getElementById('add-source-btn');
    if (addSourceBtn) {
        addSourceBtn.addEventListener('click', addCustomSource);
    }
    
    // إدارة النافذة المنبثقة
    const manageSourcesBtn = document.getElementById('manage-sources-btn');
    const sourceManagement = document.getElementById('source-management');
    const closeModal = document.getElementById('close-modal');
    
    if (manageSourcesBtn && sourceManagement) {
        manageSourcesBtn.addEventListener('click', function() {
            sourceManagement.classList.remove('hidden');
        });
    }
    
    if (closeModal && sourceManagement) {
        closeModal.addEventListener('click', function() {
            sourceManagement.classList.add('hidden');
        });
    }
    
    if (sourceManagement) {
        sourceManagement.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    }
    
    // جلب الأخبار عند تحميل الصفحة
    fetchAllNews();
});
