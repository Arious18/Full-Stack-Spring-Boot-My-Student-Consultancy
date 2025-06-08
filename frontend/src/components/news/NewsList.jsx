import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Search, Filter, MapPin, Calendar, Eye, Star,
    TrendingUp, Globe, Clock, User, MessageCircle,
    ChevronDown, X, ExternalLink, BookOpen, Tag,
    AlertCircle, Zap, Award, ThumbsUp, Share2
} from 'lucide-react';
import axios from 'axios';
import "./NewsList.css";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

function NewsList() {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('PUBLISHED');
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [breakingOnly, setBreakingOnly] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt-desc');
    const [showFilters, setShowFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Reduced for better layout

    const navigate = useNavigate();
    const { t } = useTranslation();
    const filterRef = useRef(null);

    const categories = ['Politics', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'World'];
    const regions = ['Global', 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'];
    const statuses = ['PUBLISHED', 'DRAFT', 'SCHEDULED'];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/news/published');
                const processedNews = response.data.content.map(article => ({
                    ...article,
                    viewCount: article.viewCount || 0,
                    likeCount: article.likeCount || 0,
                    shareCount: article.shareCount || 0,
                    commentCount: article.commentCount || 0,
                    featured: article.featured || false,
                    breaking: article.breaking || false,
                    tags: article.tags || [],
                    metaKeywords: article.metaKeywords || [],
                    imageUrl: article.imageUrl || null,
                    readTime: calculateReadTime(article.content || '')
                }));

                // Fetch comment counts for each news article
                const newsWithComments = await Promise.all(
                    processedNews.map(async (article) => {
                        try {
                            const commentsResponse = await axios.get(`http://localhost:8080/news/${article.id}/comments?page=0&size=1&approvedOnly=true`);
                            return {
                                ...article,
                                commentCount: commentsResponse.data.totalElements || 0
                            };
                        } catch (err) {
                            console.warn(`Failed to fetch comments for article ${article.id}`);
                            return article;
                        }
                    })
                );

                setNews(newsWithComments);
                setError(null);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError(t('errorFetchingData') || 'Error fetching news');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [t]);

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime < 1 ? 1 : readTime;
    };

    useEffect(() => {
        let filtered = [...news];

        if (searchQuery && searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(article => {
                const titleMatch = article.title && article.title.toLowerCase().includes(searchLower);
                const summaryMatch = article.summary && article.summary.toLowerCase().includes(searchLower);
                const contentMatch = article.content && article.content.toLowerCase().includes(searchLower);
                const authorMatch = article.authorName && article.authorName.toLowerCase().includes(searchLower);
                const tagsMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchLower));
                const keywordsMatch = article.metaKeywords && article.metaKeywords.some(keyword => keyword.toLowerCase().includes(searchLower));
                return titleMatch || summaryMatch || contentMatch || authorMatch || tagsMatch || keywordsMatch;
            });
        }

        if (selectedCategory) {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }

        if (selectedAuthor) {
            filtered = filtered.filter(article => article.authorName === selectedAuthor);
        }

        if (selectedRegion && selectedRegion !== 'Global') {
            filtered = filtered.filter(article => article.region === selectedRegion);
        }

        if (selectedStatus) {
            filtered = filtered.filter(article => article.status === selectedStatus);
        }

        if (featuredOnly) {
            filtered = filtered.filter(article => article.featured);
        }

        if (breakingOnly) {
            filtered = filtered.filter(article => article.breaking);
        }

        // Sort articles
        filtered.sort((a, b) => {
            let aValue, bValue;
            switch (sortBy) {
                case 'title-asc':
                    aValue = (a.title || '').toLowerCase();
                    bValue = (b.title || '').toLowerCase();
                    return aValue.localeCompare(bValue);
                case 'title-desc':
                    aValue = (a.title || '').toLowerCase();
                    bValue = (b.title || '').toLowerCase();
                    return bValue.localeCompare(aValue);
                case 'author-asc':
                    aValue = (a.authorName || '').toLowerCase();
                    bValue = (b.authorName || '').toLowerCase();
                    return aValue.localeCompare(bValue);
                case 'author-desc':
                    aValue = (a.authorName || '').toLowerCase();
                    bValue = (b.authorName || '').toLowerCase();
                    return bValue.localeCompare(aValue);
                case 'views-high':
                    return (b.viewCount || 0) - (a.viewCount || 0);
                case 'views-low':
                    return (a.viewCount || 0) - (b.viewCount || 0);
                case 'likes-high':
                    return (b.likeCount || 0) - (a.likeCount || 0);
                case 'comments-high':
                    return (b.commentCount || 0) - (a.commentCount || 0);
                case 'createdAt-desc':
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return bValue - aValue;
                case 'createdAt-asc':
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return aValue - bValue;
                default:
                    // Featured and breaking articles first, then by creation date
                    if (a.breaking && !b.breaking) return -1;
                    if (!a.breaking && b.breaking) return 1;
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return bValue - aValue;
            }
        });

        setFilteredNews(filtered);
        setCurrentPage(1);
    }, [news, searchQuery, selectedCategory, selectedAuthor, selectedRegion, selectedStatus, featuredOnly, breakingOnly, sortBy]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNewsClick = (slug) => navigate(`/news/${slug}`);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedAuthor('');
        setSelectedRegion('');
        setSelectedStatus('PUBLISHED');
        setFeaturedOnly(false);
        setBreakingOnly(false);
        setSortBy('createdAt-desc');
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return null;
        const diffHours = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
        if (diffHours === 0) return 'Just now';
        if (diffHours === 1) return '1 hour ago';
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNews = filteredNews.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getActiveFilterCount = () => {
        return [
            selectedCategory,
            selectedAuthor,
            selectedRegion !== 'Global' ? selectedRegion : '',
            selectedStatus !== 'PUBLISHED' ? selectedStatus : '',
            featuredOnly,
            breakingOnly
        ].filter(Boolean).length;
    };

    const activeFilterCount = getActiveFilterCount();

    const renderNewsCard = (article, index) => {
        const title = article.title || 'Title Not Available';
        const summary = article.summary || 'Summary will be provided...';
        const authorName = article.authorName || 'Unknown Author';
        const category = article.category || 'General';
        const region = article.region || 'Global';
        const isMainCard = index === 0; // First card can be featured larger

        return (
            <article key={article.id} className={`news-card ${isMainCard && currentPage === 1 ? 'news-card-main' : ''}`} onClick={() => handleNewsClick(article.slug)}>
                {/* Large Image Section */}
                <div className="news-card-image-container">
                    {article.imageUrl ? (
                        <img
                            src={article.imageUrl}
                            alt={article.imageAlt || title}
                            className="news-card-image"
                            loading="lazy"
                        />
                    ) : (
                        <div className="news-card-placeholder">
                            <div className="placeholder-content">
                                <BookOpen size={64} />
                                <span>No Image Available</span>
                            </div>
                        </div>
                    )}

                    {/* Image Overlay */}
                    <div className="news-image-overlay">
                        {/* Top Badges */}
                        <div className="news-badges">
                            {article.breaking && (
                                <span className="badge breaking">
                                    <Zap size={14} />
                                    Breaking News
                                </span>
                            )}
                            {article.featured && (
                                <span className="badge featured">
                                    <Star size={14} />
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* Category Badge */}
                        <div className="category-badge">
                            <Tag size={14} />
                            <span>{category}</span>
                        </div>

                        {/* Bottom Gradient */}
                        <div className="image-gradient"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="news-card-content">
                    {/* Meta Information */}
                    <div className="news-meta">
                        <div className="meta-row">
                            <div className="meta-item">
                                <Globe size={14} />
                                <span>{region}</span>
                            </div>
                            <div className="meta-item">
                                <Clock size={14} />
                                <span>{getTimeAgo(article.createdAt) || 'Recently'}</span>
                            </div>
                            <div className="meta-item">
                                <BookOpen size={14} />
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="news-title">{title}</h2>

                    {/* Summary */}
                    <p className="news-summary">
                        {summary.length > 200 ? `${summary.substring(0, 200)}...` : summary}
                    </p>

                    {/* Author Section */}
                    <div className="news-author-section">
                        <div className="author-info">
                            <div className="author-avatar">
                                <User size={20} />
                            </div>
                            <div className="author-details">
                                <span className="author-name">By {authorName}</span>
                                {article.authorEmail && (
                                    <span className="author-email">{article.authorEmail}</span>
                                )}
                            </div>
                        </div>
                        <div className="publish-date">
                            <Calendar size={14} />
                            <span>{formatDate(article.createdAt)}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="news-tags-section">
                            <div className="tags-container">
                                {article.tags.slice(0, 4).map((tag, tagIndex) => (
                                    <span key={tagIndex} className="news-tag">
                                        #{tag}
                                    </span>
                                ))}
                                {article.tags.length > 4 && (
                                    <span className="news-tag more-tags">
                                        +{article.tags.length - 4} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="news-engagement">
                        <div className="engagement-stats">
                            <div className="stat-group">
                                <div className="stat-item">
                                    <Eye size={16} />
                                    <span>{article.viewCount?.toLocaleString() || '0'}</span>
                                    <label>Views</label>
                                </div>
                                <div className="stat-item">
                                    <ThumbsUp size={16} />
                                    <span>{article.likeCount?.toLocaleString() || '0'}</span>
                                    <label>Likes</label>
                                </div>
                                <div className="stat-item">
                                    <MessageCircle size={16} />
                                    <span>{article.commentCount?.toLocaleString() || '0'}</span>
                                    <label>Comments</label>
                                </div>
                                {article.shareCount > 0 && (
                                    <div className="stat-item">
                                        <Share2 size={16} />
                                        <span>{article.shareCount?.toLocaleString()}</span>
                                        <label>Shares</label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Read More Button */}
                        <div className="read-more-section">
                            <button className="read-more-btn">
                                <span>Read Full Article</span>
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        );
    };

    if (loading) {
        return (
            <div className="NeListPageWrapper">
                <Header />
                <div className="NeListLoadingContainer">
                    <div className="NeListLoadingSpinner"></div>
                    <p>{t('loading') || 'Loading latest news...'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="NeListPageWrapper">
                <Header />
                <div className="NeListErrorContainer">
                    <div className="NeListErrorIcon">⚠️</div>
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="NeListRetryButton"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // Get unique authors for filter
    const uniqueAuthors = [...new Set(news.map(article => article.authorName).filter(Boolean))];

    return (
        <>
            <Header />
            <div className="NeListPageWrapper">
                <section className="NeListHero">
                    <div className="NeListHeroContent">
                        <h1 className="NeListHeroTitle">
                            {t('latestNews') || 'Latest News & Updates'}
                        </h1>
                        <p className="NeListHeroSubtitle">
                            {t('stayInformed') || 'Stay informed with breaking news, in-depth analysis, and comprehensive coverage from around the world'}
                        </p>
                        <div className="NeListHeroStats">
                            <div className="NeListHeroStatItem">
                                <span className="NeListHeroStatNumber">{news.length}+</span>
                                <span className="NeListHeroStatLabel">
                                    {t('articles') || 'Articles'}
                                </span>
                            </div>
                            <div className="NeListHeroStatItem">
                                <span className="NeListHeroStatNumber">
                                    {new Set(news.map(article => article.category)).size}+
                                </span>
                                <span className="NeListHeroStatLabel">
                                    {t('categories') || 'Categories'}
                                </span>
                            </div>
                            <div className="NeListHeroStatItem">
                                <span className="NeListHeroStatNumber">
                                    {news.filter(article => article.breaking).length}
                                </span>
                                <span className="NeListHeroStatLabel">
                                    {t('breaking') || 'Breaking News'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="NeListLayoutContainer">
                    <div className="NeListSearchFilterSection">
                        <div className="NeListSearchContainer">
                            <Search className="NeListSearchIcon" />
                            <input
                                type="text"
                                placeholder={t('searchNews') || 'Search articles, authors, topics, or keywords...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="NeListSearchInput"
                            />
                        </div>
                        <div className="NeListFilterControls">
                            <button
                                className={`NeListFilterToggle ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={16} />
                                {t('filters') || 'Filters'}
                                {activeFilterCount > 0 && (
                                    <span className="NeListFilterBadge">{activeFilterCount}</span>
                                )}
                                <ChevronDown
                                    className={`NeListChevronIcon ${showFilters ? 'rotated' : ''}`}
                                    size={16}
                                />
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="NeListFiltersPanel" ref={filterRef}>
                            <div className="NeListFiltersHeader">
                                <h3>{t('advancedFilters') || 'Filter Options'}</h3>
                                <button className="NeListClearAllFiltersButton" onClick={clearFilters}>
                                    <X size={16} />
                                    {t('clearAll') || 'Clear All'}
                                </button>
                            </div>
                            <div className="NeListFiltersGrid">
                                <div className="NeListFilterGroup">
                                    <label className="NeListFilterGroupLabel">
                                        {t('category') || 'Category'}
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="NeListFilterSelect"
                                    >
                                        <option value="">{t('allCategories') || 'All Categories'}</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="NeListFilterGroup">
                                    <label className="NeListFilterGroupLabel">
                                        {t('author') || 'Author'}
                                    </label>
                                    <select
                                        value={selectedAuthor}
                                        onChange={(e) => setSelectedAuthor(e.target.value)}
                                        className="NeListFilterSelect"
                                    >
                                        <option value="">{t('allAuthors') || 'All Authors'}</option>
                                        {uniqueAuthors.map(author => (
                                            <option key={author} value={author}>
                                                {author}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="NeListFilterGroup">
                                    <label className="NeListFilterGroupLabel">
                                        {t('region') || 'Region'}
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                        className="NeListFilterSelect"
                                    >
                                        {regions.map(region => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="NeListFilterGroup">
                                    <label className="NeListFilterGroupLabel">
                                        {t('sortBy') || 'Sort By'}
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="NeListFilterSelect"
                                    >
                                        <option value="createdAt-desc">
                                            {t('newest') || 'Most Recent'}
                                        </option>
                                        <option value="createdAt-asc">
                                            {t('oldest') || 'Oldest First'}
                                        </option>
                                        <option value="views-high">
                                            {t('mostViewed') || 'Most Viewed'}
                                        </option>
                                        <option value="likes-high">
                                            {t('mostLiked') || 'Most Liked'}
                                        </option>
                                        <option value="comments-high">
                                            {t('mostCommented') || 'Most Commented'}
                                        </option>
                                        <option value="title-asc">
                                            {t('titleAZ') || 'Title (A-Z)'}
                                        </option>
                                        <option value="author-asc">
                                            {t('authorAZ') || 'Author (A-Z)'}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="NeListCheckboxFiltersContainer">
                                <div className="NeListCheckboxGroup">
                                    <label className="NeListCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            checked={featuredOnly}
                                            onChange={(e) => setFeaturedOnly(e.target.checked)}
                                            className="NeListFilterCheckboxInput"
                                        />
                                        <span>{t('featuredOnly') || 'Featured articles only'}</span>
                                    </label>
                                    <label className="NeListCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            checked={breakingOnly}
                                            onChange={(e) => setBreakingOnly(e.target.checked)}
                                            className="NeListFilterCheckboxInput"
                                        />
                                        <span>{t('breakingOnly') || 'Breaking news only'}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="NeListResultsSummary">
                        <p className="NeListResultsCount">
                            {t('showingResults', {
                                start: startIndex + 1,
                                end: Math.min(endIndex, filteredNews.length),
                                total: filteredNews.length
                            }) || `Showing ${startIndex + 1}-${Math.min(endIndex, filteredNews.length)} of ${filteredNews.length} articles`}
                        </p>
                    </div>

                    {filteredNews.length === 0 ? (
                        <div className="NeListEmptyState">
                            <div className="NeListEmptyStateIcon">📰</div>
                            <h3>{t('noNewsFound') || 'No Articles Found'}</h3>
                            <p>{t('tryAdjustingFilters') || 'Please adjust your search criteria or filter options'}</p>
                            <button onClick={clearFilters} className="NeListEmptyStateClearFiltersButton">
                                {t('clearFilters') || 'Reset Filters'}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="news-container">
                                {currentNews.map((article, index) => renderNewsCard(article, index))}
                            </div>
                            {totalPages > 1 && (
                                <div className="NeListPaginationContainer">
                                    <div className="NeListPaginationControls">
                                        <button
                                            className="NeListPaginationButton"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            ← Previous
                                        </button>
                                        <div className="NeListPaginationNumbers">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum = i + 1;
                                                if (totalPages > 5) {
                                                    if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }
                                                }
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        className={`NeListPaginationNumberButton ${currentPage === pageNum ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <button
                                            className="NeListPaginationButton"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                    <div className="NeListPaginationInfo">
                                        {t('pageXofY', { current: currentPage, total: totalPages }) || `Page ${currentPage} of ${totalPages}`}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewsList;