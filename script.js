// RSS News Aggregator JavaScript

// RSS Feed URLs - Popular Arabic and International News Sources
const RSS_FEEDS = [
    {
        name: 'الجزيرة نت',
        url: 'https://www.aljazeera.net/rss/all',
        category: 'arabic'
    },
    {
        name: 'العربية نت',
        url: 'https://www.alarabiya.net/rss.xml',
        category: 'arabic'
    },
    {
        name: 'BBC Arabic',
        url: 'https://feeds.bbci.co.uk/arabic/rss.xml',
        category: 'arabic'
    },
    {
        name: 'CNN Arabic',
        url: 'https://arabic.cnn.com/rss',
        category: 'arabic'
    },
    {
        name: 'Reuters',
        url: 'https://feeds.reuters.com/reuters/topNews',
        category: 'international'
    },
    {
        name: 'BBC News',
        url: 'https://feeds.bbci.co.uk/news/rss.xml',
        category: 'international'
    }
];

// CORS Proxy for RSS feeds
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

class NewsAggregator {
    constructor() {
        this.newsContainer = document.getElementById('news-container');
        this.loadingElement = document.getElementById('loading');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.sourceFilter = document.getElementById('source-filter');
        this.allNews = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateSourceFilter();
        this.loadNews();
    }

    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => this.loadNews());
        this.sourceFilter.addEventListener('change', () => this.filterNews());
    }

    populateSourceFilter() {
        RSS_FEEDS.forEach(feed => {
            const option = document.createElement('option');
            option.value = feed.name;
            option.textContent = feed.name;
            this.sourceFilter.appendChild(option);
        });
    }

    async loadNews() {
        this.showLoading();
        this.allNews = [];

        const promises = RSS_FEEDS.map(feed => this.fetchFeed(feed));
        
        try {
            await Promise.allSettled(promises);
            this.sortNewsByDate();
            this.displayNews();
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError();
        }
    }

    async fetchFeed(feed) {
        try {
            const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feed.url)}`);
            const data = await response.json();
            
            if (data.contents) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                
                items.forEach(item => {
                    const article = this.parseArticle(item, feed);
                    if (article) {
                        this.allNews.push(article);
                    }
                });
            }
        } catch (error) {
            console.error(`Error fetching ${feed.name}:`, error);
        }
    }

    parseArticle(item, feed) {
        try {
            const title = item.querySelector('title')?.textContent?.trim();
            const link = item.querySelector('link')?.textContent?.trim();
            const description = item.querySelector('description')?.textContent?.trim();
            const pubDate = item.querySelector('pubDate')?.textContent?.trim();
            
            if (!title || !link) return null;

            return {
                title: this.cleanText(title),
                link: link,
                description: this.cleanText(description) || 'لا يوجد وصف متاح',
                pubDate: pubDate ? new Date(pubDate) : new Date(),
                source: feed.name,
                category: feed.category
            };
        } catch (error) {
            console.error('Error parsing article:', error);
            return null;
        }
    }

    cleanText(text) {
        if (!text) return '';
        return text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
    }

    sortNewsByDate() {
        this.allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    }

    displayNews() {
        this.hideLoading();
        
        if (this.allNews.length === 0) {
            this.newsContainer.innerHTML = '<p class="no-news">لا توجد أخبار متاحة حالياً</p>';
            return;
        }

        const newsHTML = this.allNews.map(article => this.createArticleHTML(article)).join('');
        this.newsContainer.innerHTML = newsHTML;
    }

    createArticleHTML(article) {
        const formattedDate = this.formatDate(article.pubDate);
        const truncatedDescription = this.truncateText(article.description, 150);
        
        return `
            <article class="news-article">
                <div class="news-meta">
                    <span class="news-source">${article.source}</span>
                    <span class="news-date">${formattedDate}</span>
                </div>
                <h3><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h3>
                <p class="news-description">${truncatedDescription}</p>
                <a href="${article.link}" target="_blank" rel="noopener" class="read-more">اقرأ المزيد</a>
            </article>
        `;
    }

    formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'اليوم';
        } else if (diffDays === 2) {
            return 'أمس';
        } else if (diffDays <= 7) {
            return `منذ ${diffDays} أيام`;
        } else {
            return date.toLocaleDateString('ar-SA');
        }
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    filterNews() {
        const selectedSource = this.sourceFilter.value;
        
        if (selectedSource === 'all') {
            this.displayNews();
            return;
        }

        const filteredNews = this.allNews.filter(article => article.source === selectedSource);
        const newsHTML = filteredNews.map(article => this.createArticleHTML(article)).join('');
        
        if (filteredNews.length === 0) {
            this.newsContainer.innerHTML = '<p class="no-news">لا توجد أخبار من هذا المصدر</p>';
        } else {
            this.newsContainer.innerHTML = newsHTML;
        }
    }

    showLoading() {
        this.loadingElement.classList.remove('hidden');
        this.newsContainer.innerHTML = '';
    }

    hideLoading() {
        this.loadingElement.classList.add('hidden');
    }

    showError() {
        this.hideLoading();
        this.newsContainer.innerHTML = '<p class="error">حدث خطأ في تحميل الأخبار. يرجى المحاولة مرة أخرى.</p>';
    }
}

// Initialize the news aggregator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NewsAggregator();
});
