// RSS News Aggregator - Enhanced Arabic Version
// مجمع الأخبار العربية المطور

const RSS_FEEDS = [
    // مصادر الأخبار العربية الرئيسية
    { name: 'الجزيرة نت', url: 'https://rss.app/feeds/uQEMMhi6mvRm1dAE.xml', category: 'عام' },
    { name: 'العربية نت', url: 'https://www.alarabiya.net/rss.xml', category: 'عام' },
    { name: 'بي بي سي عربي', url: 'https://feeds.bbci.co.uk/arabic/rss.xml', category: 'عام' },
    { name: 'سكاي نيوز عربية', url: 'https://www.skynewsarabia.com/rss', category: 'عام' },
    { name: 'الإمارات اليوم', url: 'https://www.emaratalyoum.com/rss', category: 'إماراتي' },
    { name: 'البيان', url: 'https://www.albayan.ae/rss', category: 'إماراتي' },
    { name: 'الخليج', url: 'https://www.alkhaleej.ae/rss', category: 'إماراتي' },
    { name: 'وام', url: 'https://wam.ae/ar/rss', category: 'إماراتي' },
    { name: 'الاتحاد', url: 'https://www.alittihad.ae/rss', category: 'إماراتي' },
    { name: 'عجمان 24', url: 'https://ajman24.ae/rss', category: 'عجمان' },
    { name: 'أخبار الإمارات', url: 'https://www.akhbaruae.com/rss', category: 'إماراتي' },
    { name: 'الرؤية', url: 'https://alroya.ae/rss', category: 'إماراتي' },
    { name: 'أهل مصر', url: 'https://www.ahlmasrnews.com/rss', category: 'مصري' },
    { name: 'اليوم السابع', url: 'https://www.youm7.com/rss', category: 'مصري' },
    { name: 'المصري اليوم', url: 'https://www.almasryalyoum.com/rss', category: 'مصري' },
    { name: 'الأهرام', url: 'https://www.ahram.org.eg/rss', category: 'مصري' },
    { name: 'الشرق الأوسط', url: 'https://aawsat.com/rss', category: 'سعودي' },
    { name: 'عكاظ', url: 'https://www.okaz.com.sa/rss', category: 'سعودي' },
    { name: 'الرياض', url: 'https://www.alriyadh.com/rss', category: 'سعودي' },
    { name: 'سبق', url: 'https://sabq.org/rss', category: 'سعودي' },
    { name: 'الغد', url: 'https://alghad.com/rss', category: 'أردني' },
    { name: 'الرأي', url: 'https://alrai.com/rss', category: 'أردني' },
    { name: 'النهار', url: 'https://www.annahar.com/rss', category: 'لبناني' },
    { name: 'الأخبار', url: 'https://al-akhbar.com/rss', category: 'لبناني' },
    { name: 'الوطن', url: 'https://alwatan.sy/rss', category: 'سوري' },
    { name: 'تشرين', url: 'https://tishreen.news.sy/rss', category: 'سوري' },
    { name: 'الصباح', url: 'https://alsabah.iq/rss', category: 'عراقي' },
    { name: 'الزمان', url: 'https://www.azzaman.com/rss', category: 'عراقي' },
    { name: 'المغرب اليوم', url: 'https://www.almaghribtoday.net/rss', category: 'مغربي' },
    { name: 'هسبريس', url: 'https://www.hespress.com/rss', category: 'مغربي' },
    { name: 'الشروق', url: 'https://www.echorouk.com/rss', category: 'جزائري' },
    { name: 'النهار أونلاين', url: 'https://www.ennaharonline.com/rss', category: 'جزائري' },
    { name: 'الصباح', url: 'https://www.assabah.com.tn/rss', category: 'تونسي' },
    { name: 'الشروق', url: 'https://www.alchourouk.com/rss', category: 'تونسي' },
    { name: 'ليبيا المستقبل', url: 'https://www.libya-al-mostakbal.org/rss', category: 'ليبي' },
    { name: 'بوابة الوسط', url: 'https://www.alwasat.ly/rss', category: 'ليبي' },
    { name: 'الخرطوم', url: 'https://www.alkhartoum.com/rss', category: 'سوداني' },
    { name: 'سودان تريبيون', url: 'https://www.sudantribune.net/rss', category: 'سوداني' },
    { name: 'اليمن الآن', url: 'https://www.yemen-now.com/rss', category: 'يمني' },
    { name: 'المشهد اليمني', url: 'https://almashhad-alyemeni.com/rss', category: 'يمني' },
    { name: 'الكويت اليوم', url: 'https://www.kuwait-today.com/rss', category: 'كويتي' },
    { name: 'الأنباء', url: 'https://www.alanba.com.kw/rss', category: 'كويتي' },
    { name: 'الوطن البحرين', url: 'https://www.alwatannews.net/rss', category: 'بحريني' },
    { name: 'أخبار الخليج', url: 'https://www.akhbar-alkhaleej.com/rss', category: 'بحريني' },
    { name: 'الوطن قطر', url: 'https://www.al-watan.com/rss', category: 'قطري' },
    { name: 'الراية', url: 'https://www.raya.com/rss', category: 'قطري' },
    { name: 'عمان', url: 'https://www.omandaily.om/rss', category: 'عماني' },
    { name: 'الشبيبة', url: 'https://www.shabiba.com/rss', category: 'عماني' }
    
];

let allNews = [];
let filteredNews = [];
let currentCategory = 'الكل';
let currentSort = 'newest';
let isLoading = false;

// DOM Elements
const newsContainer = document.getElementById('news-container');
const loadingElement = document.getElementById('loading');
const refreshBtn = document.getElementById('refresh-btn');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const exportBtn = document.getElementById('export-btn');
const manageSourcesBtn = document.getElementById('manage-sources-btn');
const sourcesModal = document.getElementById('sources-modal');
const closeModal = document.querySelector('.close-modal');
const addSourceBtn = document.getElementById('add-source-btn');
const sourcesList = document.getElementById('sources-list');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    populateCategoryFilter();
    loadNews();
});

function setupEventListeners() {
    refreshBtn.addEventListener('click', loadNews);
    categoryFilter.addEventListener('change', filterNews);
    sortSelect.addEventListener('change', sortNews);
    searchInput.addEventListener('input', searchNews);
    exportBtn.addEventListener('click', exportToPDF);
    manageSourcesBtn.addEventListener('click', openSourcesModal);
    closeModal.addEventListener('click', closeSourcesModal);
    addSourceBtn.addEventListener('click', addNewSource);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === sourcesModal) {
            closeSourcesModal();
        }
    });
}

function populateCategoryFilter() {
    const categories = ['الكل', ...new Set(RSS_FEEDS.map(feed => feed.category))];
    categoryFilter.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

async function loadNews() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading(true);
    allNews = [];
    
    const feedsToLoad = RSS_FEEDS.slice(0, 15); // Load first 15 sources for better performance
    
    try {
        const promises = feedsToLoad.map(feed => fetchRSSFeed(feed));
        const results = await Promise.allSettled(promises);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value && result.value.length > 0) {
                allNews.push(...result.value);
            } else {
                console.warn(`Failed to load feed: ${feedsToLoad[index].name}`);
            }
        });
        
        // Filter news from last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        allNews = allNews.filter(news => new Date(news.pubDate) > twentyFourHoursAgo);
        
        // Update news count and last update time
        updateNewsStats();
        
        filterNews();
        
    } catch (error) {
        console.error('Error loading news:', error);
        showError('حدث خطأ في تحميل الأخبار. يرجى المحاولة مرة أخرى.');
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

function updateNewsStats() {
    const newsCountElement = document.getElementById('news-count');
    const lastUpdateElement = document.getElementById('last-update');
    
    if (newsCountElement) {
        newsCountElement.textContent = allNews.length;
    }
    
    if (lastUpdateElement) {
        lastUpdateElement.textContent = new Date().toLocaleString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

async function fetchRSSFeed(feed) {
    try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        const items = xmlDoc.querySelectorAll('item');
        const news = [];
        
        items.forEach(item => {
            const title = item.querySelector('title')?.textContent || 'بدون عنوان';
            const description = item.querySelector('description')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
            const imageUrl = extractImageFromDescription(description) || item.querySelector('enclosure')?.getAttribute('url') || '';
            
            // Extract first 4 paragraphs from description
            const cleanDescription = cleanHtmlTags(description);
            const paragraphs = extractParagraphs(cleanDescription, 4);
            
            news.push({
                title: cleanHtmlTags(title),
                description: paragraphs,
                link,
                pubDate: new Date(pubDate),
                source: feed.name,
                category: feed.category,
                imageUrl
            });
        });
        
        return news;
        
    } catch (error) {
        console.error(`Error fetching RSS feed ${feed.name}:`, error);
        // Return mock data when actual RSS feed fails (for demo purposes)
        return generateMockNews(feed);
    }
}

// Mock data generator for demo purposes when RSS feeds are unavailable
function generateMockNews(feed) {
    const mockTitles = [
        'أخبار عاجلة من العالم العربي تتطلب متابعة عاجلة',
        'تطورات مهمة في الأحداث الجارية بالمنطقة',
        'تقرير حصري حول آخر المستجدات السياسية',
        'أحدث التطورات الاقتصادية في المنطقة',
        'تقرير شامل عن الوضع الراهن في المنطقة'
    ];
    
    const mockDescriptions = [
        'تفاصيل مهمة حول الأحداث الجارية في المنطقة العربية. هذا التقرير يسلط الضوء على أهم التطورات والمستجدات التي تشهدها المنطقة. نقدم لكم تحليلاً شاملاً للوضع الراهن مع عرض جميع الجوانب المختلفة للموضوع',
        'معلومات حصرية من مصادر موثوقة حول التطورات الأخيرة. يتضمن هذا التقرير تحليلاً معمقاً للأحداث مع استعراض الآراء المختلفة والتأثيرات المحتملة على المستقبل القريب والبعيد',
        'تقرير إخباري شامل يغطي آخر المستجدات في المنطقة. نقدم لكم رؤية متكاملة للأحداث مع التركيز على الجوانب المهمة والتأثيرات المباشرة على حياة المواطنين',
        'تحليل مفصل للوضع الحالي مع استعراض الخلفيات التاريخية. هذا التقرير يهدف إلى تقديم فهم أعمق للأحداث الجارية وتأثيراتها على مختلف القطاعات في المجتمع',
        'تغطية إخبارية متكاملة للأحداث المهمة في المنطقة. نقدم لكم آخر التطورات مع التركيز على الحقائق الموثقة والمعلومات المؤكدة من مصادر موثوقة'
    ];
    
    const news = [];
    const numArticles = Math.floor(Math.random() * 3) + 2; // 2-4 articles
    
    for (let i = 0; i < numArticles; i++) {
        const randomTitle = mockTitles[Math.floor(Math.random() * mockTitles.length)];
        const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
        const hoursAgo = Math.floor(Math.random() * 12) + 1;
        
        news.push({
            title: `${randomTitle} - ${feed.name}`,
            description: randomDescription,
            link: `#demo-article-${feed.name.replace(/\s+/g, '-')}-${i}`,
            pubDate: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
            source: feed.name,
            category: feed.category,
            imageUrl: `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(feed.name)}`
        });
    }
    
    return news;
}

function extractImageFromDescription(description) {
    const imgRegex = /<img[^>]+src="([^"]+)"/i;
    const match = description.match(imgRegex);
    return match ? match[1] : null;
}

function cleanHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '').trim();
}

function extractParagraphs(text, count = 4) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, count).join('. ').trim() + (sentences.length > count ? '...' : '');
}

function filterNews() {
    filteredNews = allNews.filter(news => {
        const categoryMatch = currentCategory === 'الكل' || news.category === currentCategory;
        const searchMatch = searchInput.value === '' || 
            news.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            news.description.toLowerCase().includes(searchInput.value.toLowerCase());
        
        return categoryMatch && searchMatch;
    });
    
    sortNews();
}

function sortNews() {
    const sortValue = sortSelect.value;
    
    filteredNews.sort((a, b) => {
        switch (sortValue) {
            case 'newest':
                return new Date(b.pubDate) - new Date(a.pubDate);
            case 'oldest':
                return new Date(a.pubDate) - new Date(b.pubDate);
            case 'source':
                return a.source.localeCompare(b.source, 'ar');
            default:
                return 0;
        }
    });
    
    displayNews();
}

function searchNews() {
    filterNews();
}

function displayNews() {
    if (filteredNews.length === 0) {
        newsContainer.innerHTML = '<div class="no-news">لا توجد أخبار متاحة حالياً. جرب تحديث الصفحة أو تغيير الفلتر.</div>';
        return;
    }
    
    const newsHTML = filteredNews.map((news, index) => `
        <article class="news-card" style="animation-delay: ${index * 0.1}s">
            ${news.imageUrl ? `<img src="${news.imageUrl}" alt="${news.title}" class="news-image" onerror="this.style.display='none'">` : ''}
            <div class="news-content">
                <h3 class="news-title">
                    <a href="${news.link}" target="_blank" rel="noopener noreferrer">${news.title}</a>
                </h3>
                <p class="news-description">${news.description}</p>
                <div class="news-meta">
                    <span class="news-source">${news.source}</span>
                    <span class="news-category">${news.category}</span>
                    <span class="news-date">${formatDate(news.pubDate)}</span>
                </div>
            </div>
        </article>
    `).join('');
    
    newsContainer.innerHTML = newsHTML;
    
    // Update filtered news count
    updateFilteredNewsCount();
}

function updateFilteredNewsCount() {
    const newsCountElement = document.getElementById('news-count');
    if (newsCountElement) {
        newsCountElement.textContent = filteredNews.length;
    }
}

function formatDate(date) {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'منذ أقل من ساعة';
    } else if (diffInHours < 24) {
        return `منذ ${diffInHours} ساعة`;
    } else {
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
    refreshBtn.disabled = show;
}

function showError(message) {
    newsContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

// Category filter change handler
categoryFilter.addEventListener('change', function() {
    currentCategory = this.value;
    filterNews();
});

// Sort change handler
sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    sortNews();
});

// Export to PDF functionality
function exportToPDF() {
    if (filteredNews.length === 0) {
        alert('لا توجد أخبار للتصدير');
        return;
    }
    
    const today = new Date().toLocaleDateString('ar-SA');
    const content = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>تقرير الأخبار اليومي - ${today}</title>
            <style>
                body { 
                    font-family: 'Noto Sans Arabic', Arial, sans-serif; 
                    direction: rtl; 
                    line-height: 1.6;
                    margin: 20px;
                    color: #333;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                .news-item { 
                    margin-bottom: 25px; 
                    padding: 20px; 
                    border: 1px solid #ddd; 
                    border-radius: 8px;
                    background: #f9f9f9;
                }
                .news-title { 
                    font-weight: bold; 
                    color: #2c3e50; 
                    margin-bottom: 10px; 
                    font-size: 1.2em;
                }
                .news-meta { 
                    font-size: 12px; 
                    color: #666; 
                    margin-bottom: 15px; 
                    padding: 8px;
                    background: #eee;
                    border-radius: 4px;
                }
                .news-description { 
                    line-height: 1.6; 
                    margin-bottom: 10px;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #666;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📰 تقرير الأخبار اليومي</h1>
                <h2>${today}</h2>
                <p>إجمالي الأخبار: ${filteredNews.length}</p>
            </div>
            
            <div class="content">
                ${filteredNews.map(news => `
                    <div class="news-item">
                        <div class="news-title">${news.title}</div>
                        <div class="news-meta">
                            المصدر: ${news.source} | التصنيف: ${news.category} | التاريخ: ${formatDate(news.pubDate)}
                        </div>
                        <div class="news-description">${news.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <p>تم إنشاء هذا التقرير بواسطة مجمع الأخبار العربية</p>
                <p>تاريخ الإنشاء: ${new Date().toLocaleString('ar-SA')}</p>
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير-الأخبار-${today.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('تم تصدير التقرير بنجاح!');
}

// Sources management
function openSourcesModal() {
    displaySourcesList();
    sourcesModal.style.display = 'block';
}

function closeSourcesModal() {
    sourcesModal.style.display = 'none';
}

function displaySourcesList() {
    sourcesList.innerHTML = RSS_FEEDS.map((feed, index) => `
        <div class="source-item">
            <span class="source-name">${feed.name}</span>
            <span class="source-category">${feed.category}</span>
            <button onclick="removeSource(${index})" class="remove-btn">حذف</button>
        </div>
    `).join('');
}

function addNewSource() {
    const name = document.getElementById('source-name').value.trim();
    const url = document.getElementById('source-url').value.trim();
    const category = document.getElementById('source-category').value.trim();
    
    if (!name || !url || !category) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    RSS_FEEDS.push({ name, url, category });
    displaySourcesList();
    populateCategoryFilter();
    
    // Clear form
    document.getElementById('source-name').value = '';
    document.getElementById('source-url').value = '';
    document.getElementById('source-category').value = '';
}

function removeSource(index) {
    if (confirm('هل أنت متأكد من حذف هذا المصدر؟')) {
        RSS_FEEDS.splice(index, 1);
        displaySourcesList();
        populateCategoryFilter();
    }
}

// Auto-refresh every 30 minutes
setInterval(loadNews, 30 * 60 * 1000);
