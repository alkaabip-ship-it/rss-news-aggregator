// RSS News Aggregator - Enhanced Arabic Version
// مجمع الأخبار العربية المطور

const RSS_FEEDS = [
    // مصادر France 24
    { name: 'فرانس 24 - أوروبا', url: 'https://www.france24.com/ar/%D8%A3%D9%88%D8%B1%D9%88%D8%A8%D8%A7/rss', category: 'أخبار دولية' },
    { name: 'فرانس 24 - الشرق الأوسط', url: 'https://www.france24.com/ar/%D8%A7%D9%84%D8%B4%D8%B1%D9%82-%D8%A7%D9%84%D8%A3%D9%88%D8%B3%D8%B7/rss', category: 'أخبار دولية' },
    { name: 'فرانس 24 - أمريكا', url: 'https://www.france24.com/ar/%D8%A3%D9%85%D8%B1%D9%8A%D9%83%D8%A7/rss', category: 'أخبار دولية' },
    { name: 'فرانس 24 - اقتصاد', url: 'https://www.france24.com/ar/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF/rss', category: 'اقتصاد' },
    
    // مصادر RT Arabic
    { name: 'روسيا اليوم', url: 'https://arabic.rt.com/rss/sitemap/', category: 'أخبار دولية' },

    // مصادر الشرق الأوسط
    { name: 'الشرق الأوسط', url: 'https://aawsat.com/feed', category: 'عام' },

    // مصادر العربية نت
    { name: 'العربية نت - رئيسية', url: 'https://www.alarabiya.net/feed/rss2/ar.xml', category: 'عام' },
    { name: 'العربية نت - العالم', url: 'https://www.alarabiya.net/feed/rss2/ar/arab-and-world.xml', category: 'العالم' },
    { name: 'العربية نت - السعودية', url: 'https://www.alarabiya.net/feed/rss2/ar/saudi-today.xml', category: 'السعودية' },
    { name: 'العربية نت - منوعات', url: 'https://www.alarabiya.net/feed/rss2/ar/variety.xml', category: 'منوعات' },

    // مصادر النهار
    { name: 'النهار', url: 'https://www.annahar.com/rss', category: 'لبنان' },

    // مصادر الجزيرة نت
    { name: 'الجزيرة نت', url: 'https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9', category: 'عام' },

    // مصادر متنوعة من RSS.app
    { name: 'الإمارات اليوم ', url: 'https://rss.app/feeds/XGwiyZWrb82rn9gb.xml', category: 'الإمارات' },
    { name: 'السياسي', url: 'https://rss.app/feeds/1O6SebJ3w0cuWkQ7.xml', category: 'عام' },
    { name: 'إرم نيوز', url: 'https://rss.app/feeds/L85xGTh6FCRTiZYk.xml', category: 'عام' },
    { name: 'مونتيكارلو', url: 'https://rss.app/feeds/1rxW4wPrOe1WW2XA.xml', category: 'عام' },
    { name: 'صوت بيروت', url: 'https://rss.app/feeds/24U9HI26SOIO9gnz.xml', category: 'لبنان' },
    { name: 'موقع الدفاع العربي', url: 'https://rss.app/feeds/txvIw0FFUeTmJRE8.xml', category: 'دفاع' },
    { name: 'إيران انترناشيونال', url: 'https://rss.app/feeds/APC0dxXnwWfj2h92.xml', category: 'إيران' },
    { name: 'الخليج', url: 'https://rss.app/feeds/6DK10x7VU3Tbw66N.xml', category: 'عام' },
    { name: 'الخليج تايمز', url: 'https://rss.app/feeds/MrvRODHMyW0NVFpF.xml', category: 'متنوع' },
    { name: 'نبض', url: 'https://rss.app/feeds/uQEMMhi6mvRm1dAE.xml', category: 'متنوع' },
  ,

    // مصادر France 24 الإضافية
    { name: 'فرانس 24 - أوروبا', url: 'https://www.france24.com/ar/%D8%A3%D9%88%D8%B1%D9%88%D8%A8%D8%A7/rss', category: 'أوروبا' },
    { name: 'فرانس 24 - الشرق الأوسط', url: 'https://www.france24.com/ar/%D8%A7%D9%84%D8%B4%D8%B1%D9%82-%D8%A7%D9%84%D8%A3%D9%88%D8%B3%D8%B7/rss', category: 'الشرق الأوسط' },
    { name: 'فرانس 24 - أمريكا', url: 'https://www.france24.com/ar/%D8%A3%D9%85%D8%B1%D9%8A%D9%83%D8%A7/rss', category: 'أمريكا' },
    { name: 'فرانس 24 - اقتصاد', url: 'https://www.france24.com/ar/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF/rss', category: 'اقتصاد' },

    // مصادر RSS.app إضافية
    { name: 'مصدر 11', url: 'https://rss.app/feeds/XGwiyZWrb82rn9gb.xml', category: 'عام' },
    { name: 'مصدر 12', url: 'https://rss.app/feeds/1O6SebJ3w0cuWkQ7.xml', category: 'عام' },
    { name: 'مصدر 13', url: 'https://rss.app/feeds/L85xGTh6FCRTiZYk.xml', category: 'عام' },
    { name: 'مصدر 14', url: 'https://rss.app/feeds/1rxW4wPrOe1WW2XA.xml', category: 'عام' },
    { name: 'مصدر 15', url: 'https://rss.app/feeds/24U9HI26SOIO9gnz.xml', category: 'عام' },
    { name: 'مصدر 16', url: 'https://rss.app/feeds/txvIw0FFUeTmJRE8.xml', category: 'عام' },
    { name: 'مصدر 17', url: 'https://rss.app/feeds/APC0dxXnwWfj2h92.xml', category: 'عام' },
    { name: 'مصدر 18', url: 'https://rss.app/feeds/6DK10x7VU3Tbw66N.xml', category: 'عام' },
    { name: 'مصدر 19', url: 'https://rss.app/feeds/MrvRODHMyW0NVFpF.xml', category: 'عام' },
    { name: 'مصدر 20', url: 'https://rss.app/feeds/uQEMMhi6mvRm1dAE.xml', category: 'عام' },

    // مصادر إضافية
    { name: 'RT Arabic - خريطة الموقع', url: 'https://arabic.rt.com/rss/sitemap/', category: 'أخبار دولية' },
    { name: 'عكاظ', url: 'https://aawsat.com/feed', category: 'عام' },
    { name: 'العربية - الرئيسية', url: 'https://www.alarabiya.net/feed/rss2/ar.xml', category: 'عام' },
    { name: 'العربية - العالم العربي', url: 'https://www.alarabiya.net/feed/rss2/ar/arab-and-world.xml', category: 'العالم العربي' },
    { name: 'العربية - السعودية اليوم', url: 'https://www.alarabiya.net/feed/rss2/ar/saudi-today.xml', category: 'السعودية' },
    { name: 'العربية - منوعات', url: 'https://www.alarabiya.net/feed/rss2/ar/variety.xml', category: 'منوعات' },
    { name: 'النهار', url: 'https://www.annahar.com/rss', category: 'لبنان' },
    { name: 'الجزيرة نت', url: 'https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9', category: 'أخبار دولية' }  { name: 'مصدر متنوع 10', url: 'https://rss.app/feeds/uQEMMhi6mvRm1dAE.xml', category: 'متنوع' }
];

let allNews = [];
let filteredNews = [];
let currentCategory = 'الكل';
let currentSort = 'newest';
let isLoading = false;

// DOM Elements
const newsContainer = document.getElementById('news-container' );
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
    
    const feedsToLoad = RSS_FEEDS; // Load all new sources
    
    try {
        const promises = feedsToLoad.map(feed => fetchRSSFeed(feed));
        const results = await Promise.allSettled(promises);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                allNews.push(...result.value);
            } else {
                console.warn(`Failed to load feed: ${feedsToLoad[index].name}`);
            }
        });
        
        // Filter news from last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        allNews = allNews.filter(news => new Date(news.pubDate) > twentyFourHoursAgo);
        
        filterNews();
        
    } catch (error) {
        console.error('Error loading news:', error);
        showError('حدث خطأ في تحميل الأخبار. يرجى المحاولة مرة أخرى.');
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

async function fetchRSSFeed(feed) {
    try {
        // Using a CORS proxy to fetch feeds from the browser
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url )}`;
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
        return null;
    }
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
    currentCategory = categoryFilter.value;
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
        newsContainer.innerHTML = '<div class="no-news">لا توجد أخبار متاحة حالياً تطابق معايير البحث.</div>';
        return;
    }
    
    const newsHTML = filteredNews.map(news => `
        <article class="news-card">
            ${news.imageUrl ? `<img src="${news.imageUrl}" alt="${news.title}" class="news-image" onerror="this.style.display='none'">` : ''}
            <div class="news-content">
                <h3 class="news-title">
                    <a href="${news.link}" target="_blank">${news.title}</a>
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
}

function formatDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'الآن';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;

    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
    refreshBtn.disabled = show;
}

function showError(message) {
    newsContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

// Event Listeners for filters
categoryFilter.addEventListener('change', filterNews);
sortSelect.addEventListener('change', sortNews);

// Export to PDF functionality
function exportToPDF() {
    if (filteredNews.length === 0) {
        alert('لا توجد أخبار للتصدير');
        return;
    }
    
    const today = new Date().toLocaleDateString('ar-SA');
    const content = `
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>تقرير الأخبار اليومي - ${today}</title>
            <style>
                body { font-family: 'Noto Sans Arabic', Arial, sans-serif; direction: rtl; }
                .header { text-align: center; margin-bottom: 30px; }
                .news-item { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; page-break-inside: avoid; }
                .news-title { font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
                .news-meta { font-size: 12px; color: #666; margin-bottom: 10px; }
                .news-description { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📰 تقرير الأخبار اليومي</h1>
                <h2>${today}</h2>
                <p>إجمالي الأخبار: ${filteredNews.length}</p>
            </div>
            ${filteredNews.map(news => `
                <div class="news-item">
                    <div class="news-title">${news.title}</div>
                    <div class="news-meta">
                        المصدر: ${news.source} | التصنيف: ${news.category} | التاريخ: ${formatDate(news.pubDate)}
                    </div>
                    <div class="news-description">${news.description}</div>
                </div>
            `).join('')}
        </body>
        </html>
    `;
    
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير-الأخبار-${today}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

// Auto-refresh every 5 minutes
setInterval(loadNews, 30 * 60 * 1000);

