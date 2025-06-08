import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Calendar, User, Globe, Clock, Eye, ThumbsUp, Share2, MessageCircle,
    Tag, ExternalLink, Bookmark, ChevronLeft, Star, Zap,
    Send, Reply, AlertCircle, CheckCircle, X, Quote,
    Mail, Copy, ArrowUp, Layers, BookOpen, Heart, Settings,
    ChevronDown, ChevronUp
} from 'lucide-react';
import axios from 'axios';
import "./NewsDetails.css";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import { useAuth } from '../../Auth/components/AuthContext.jsx';

function NewsDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user: currentUser } = useAuth();

    // News state
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Comments state
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsPage, setCommentsPage] = useState(0);
    const [commentsHasMore, setCommentsHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(0);
    const [expandedComments, setExpandedComments] = useState(new Set());

    // Comment form state
    const [newComment, setNewComment] = useState({ content: '' });
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentError, setCommentError] = useState('');
    const [commentSuccess, setCommentSuccess] = useState('');

    // Reply state
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [replies, setReplies] = useState({});
    const [loadingReplies, setLoadingReplies] = useState({});

    // UI state
    const [showShareModal, setShowShareModal] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const contentRef = useRef(null);
    const shareModalRef = useRef(null);

    // API Base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    // Comment character limit
    const COMMENT_PREVIEW_LIMIT = 1000;

    // Helper function to truncate comment text
    const truncateComment = (text, limit = COMMENT_PREVIEW_LIMIT) => {
        if (text.length <= limit) return text;
        return text.substring(0, limit);
    };

    const isCommentTruncated = (text, limit = COMMENT_PREVIEW_LIMIT) => {
        return text.length > limit;
    };

    const toggleCommentExpansion = (commentId) => {
        setExpandedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    // Fetch news details
    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/news/slug/${slug}`);
                const newsData = {
                    ...response.data,
                    readTime: calculateReadTime(response.data.content || ''),
                    tags: response.data.tags || [],
                    metaKeywords: response.data.metaKeywords || []
                };
                setNews(newsData);

                // Increment view count
                await axios.post(`${API_BASE_URL}/news/${newsData.id}/view`);

                // Fetch related news
                if (newsData.tags && newsData.tags.length > 0) {
                    const relatedResponse = await axios.get(
                        `${API_BASE_URL}/news/${newsData.id}/related?tags=${newsData.tags.join(',')}`
                    );
                    setRelatedNews(relatedResponse.data);
                }

                // Fetch comments - only latest 15
                await fetchComments(newsData.id, 0, true);
                setError(null);
            } catch (err) {
                console.error('Error fetching news details:', err);
                setError(t('errorFetchingNews') || 'Error loading news article');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchNewsDetails();
        }
    }, [slug, t, API_BASE_URL]);

    const fetchComments = async (newsId, page = 0, reset = false) => {
        try {
            setCommentsLoading(true);
            // Fetch only 15 comments per page for better performance
            const response = await axios.get(
                `${API_BASE_URL}/news/${newsId}/comments?page=${page}&size=15&approvedOnly=true`
            );

            console.log('Comments response:', response.data);

            const newCommentsData = response.data.content || [];
            setComments(prev => reset ? newCommentsData : [...prev, ...newCommentsData]);
            setTotalComments(response.data.totalElements || 0);
            setCommentsHasMore(!response.data.last);
            setCommentsPage(page);
        } catch (err) {
            console.error('Error fetching comments:', err);
            if (reset) {
                setComments([]);
                setTotalComments(0);
                setCommentsHasMore(false);
            }
        } finally {
            setCommentsLoading(false);
        }
    };

    const fetchReplies = async (commentId) => {
        if (!news || !news.id) return;
        try {
            setLoadingReplies(prev => ({ ...prev, [commentId]: true }));
            const response = await axios.get(
                `${API_BASE_URL}/news/${news.id}/comments/${commentId}/replies`
            );
            setReplies(prev => ({ ...prev, [commentId]: response.data || [] }));
        } catch (err) {
            console.error('Error fetching replies:', err);
        } finally {
            setLoadingReplies(prev => ({ ...prev, [commentId]: false }));
        }
    };

    const handleCommentSubmit = async (e, parentCommentId = null, contentToSubmit = null) => {
        e.preventDefault();
        if (!currentUser) {
            setCommentError('Please log in to post a comment.');
            return;
        }

        const finalContent = contentToSubmit || newComment.content;

        if (!finalContent.trim()) {
            setCommentError('Comment content cannot be empty.');
            return;
        }

        try {
            setIsSubmittingComment(true);
            setCommentError('');

            const formData = new FormData();
            formData.append('authorName', currentUser.name);
            formData.append('authorEmail', currentUser.email);
            formData.append('content', finalContent.trim());

            if (parentCommentId) {
                formData.append('parentCommentId', parentCommentId);
            }

            await axios.post(`${API_BASE_URL}/news/${news.id}/comments`, formData);

            setCommentSuccess('Comment submitted successfully!');
            if (!parentCommentId) {
                setNewComment({ content: '' });
            } else {
                setReplyContent('');
            }
            setReplyingTo(null);

            setTimeout(async () => {
                await fetchComments(news.id, 0, true);
                if (parentCommentId) {
                    await fetchReplies(parentCommentId);
                }
                setCommentSuccess('');
            }, 500);

        } catch (err) {
            console.error('Error submitting comment:', err);
            setCommentError(err.response?.data?.message || 'Failed to submit comment. Please try again.');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleReplyClick = (commentId, authorName) => {
        if (!currentUser) {
            setCommentError('Please log in to reply to comments.');
            return;
        }
        setReplyingTo({ commentId, authorName });
        setReplyContent('');
        setCommentError('');
        setCommentSuccess('');
    };

    const handleLikeComment = async (commentId) => {
        if (!currentUser) {
            setCommentError('Please log in to like comments.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('userEmail', currentUser.email);

            await axios.post(`${API_BASE_URL}/news/${news.id}/comments/${commentId}/like`, formData);

            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId
                        ? { ...comment, likeCount: (comment.likeCount || 0) + 1 }
                        : comment
                )
            );
        } catch (err) {
            console.error('Error liking comment:', err);
            setCommentError(err.response?.data?.message || 'Failed to like comment.');
        }
    };

    const handleShare = async (platform) => {
        const url = window.location.href;
        const title = news?.title || "Interesting Article";
        const text = news?.summary || "Check out this article";

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
                break;
            case 'copy':
                try {
                    await navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy link:', err);
                }
                break;
            default: break;
        }
        setShowShareModal(false);
        if (news?.id) {
            try {
                await axios.post(`${API_BASE_URL}/news/${news.id}/share`);
                setNews(prev => ({ ...prev, shareCount: (prev.shareCount || 0) + 1 }));
            } catch (err) {
                console.error('Error incrementing share count:', err);
            }
        }
    };

    const handleLikeNews = async () => {
        if (!news?.id || !currentUser) {
            setCommentError("Please log in to like news.");
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/news/${news.id}/like`);
            setNews(prev => ({ ...prev, likeCount: (prev.likeCount || 0) + 1 }));
            setIsLiked(true);
        } catch (err) {
            console.error('Error liking news:', err);
            setCommentError(err.response?.data?.message || "Failed to like news.");
        }
    };

    const calculateReadTime = (content) => {
        if (!content) return 1;
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime < 1 ? 1 : readTime;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { return "Invalid Date"; }
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const now = new Date();
            const date = new Date(dateString);
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) return `${diffInHours}h ago`;
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) return `${diffInDays}d ago`;
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        } catch (e) { return "Invalid Date"; }
    };

    const getUserInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getUserAvatarColor = (email) => {
        if (!email) return '#6366f1';
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];
        const hash = email.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            setShowScrollTop(scrollY > 300);
            if (contentRef.current) {
                const contentTop = contentRef.current.offsetTop;
                const contentHeight = contentRef.current.scrollHeight;
                const scrollBottom = scrollY + windowHeight;
                let progress = 0;
                if (scrollBottom > contentTop && scrollY < contentTop + contentHeight) {
                    progress = Math.min(100, Math.max(0,
                        ((scrollY - contentTop + windowHeight * 0.8) / contentHeight) * 100
                    ));
                } else if (scrollBottom <= contentTop) {
                    progress = 0;
                } else if (scrollY >= contentTop + contentHeight) {
                    progress = 100;
                }
                setReadingProgress(progress);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [news]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareModalRef.current && !shareModalRef.current.contains(event.target)) {
                setShowShareModal(false);
            }
        };
        if (showShareModal) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showShareModal]);

    if (loading) {
        return (
            <div className="NeDetPageWrapper">
                <Header />
                <div className="NeDetLoadingContainer">
                    <div className="NeDetLoadingSpinner"></div>
                    <p>{t('loading') || 'Loading article...'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="NeDetPageWrapper">
                <Header />
                <div className="NeDetErrorContainer">
                    <div className="NeDetErrorIcon">⚠️</div>
                    <h3>{t('articleNotFound.title') || 'Article Not Found'}</h3>
                    <p>{error || t('articleNotFound.message') || 'The requested article could not be found.'}</p>
                    <button onClick={() => navigate('/news')} className="NeDetBackButton">
                        {t('articleNotFound.backButton') || 'Back to News'}
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="NeDetPageWrapper">
            <Header />

            <div className="NeDetReadingProgressBar">
                <div className="NeDetReadingProgressFill" style={{ width: `${readingProgress}%` }}></div>
            </div>

            <div className="NeDetBreadcrumb">
                <div className="NeDetBreadcrumbContainer">
                    <button onClick={() => navigate('/newsList')} className="NeDetBreadcrumbLink">
                        <ChevronLeft size={16} /> {t('breadcrumb.backToNews') || 'Back to News'}
                    </button>
                    <span className="NeDetBreadcrumbSeparator">/</span>
                    <span className="NeDetBreadcrumbCurrent">{news.category || t('breadcrumb.article', 'Article')}</span>
                </div>
            </div>

            <div className="NeDetMainWrapper">
                <article className="NeDetContainer">
                    <header className="NeDetHeader">
                        <div className="NeDetHeaderContent">
                            <div className="NeDetHeaderBadges">
                                {news.breaking && (
                                    <span className="NeDetBadge breaking"><Zap size={14} /> {t('badge.breaking') || 'Breaking'}</span>
                                )}
                                {news.featured && (
                                    <span className="NeDetBadge featured"><Star size={14} /> {t('badge.featured') || 'Featured'}</span>
                                )}
                                <span className="NeDetBadge category"><Tag size={14} /> {news.category}</span>
                            </div>
                            <h1 className="NeDetTitle">{news.title}</h1>
                            {news.subtitle && <h2 className="NeDetSubtitle">{news.subtitle}</h2>}
                            <div className="NeDetMeta">
                                <div className="NeDetMetaPrimary">
                                    <div className="NeDetAuthorInfo">
                                        <div className="NeDetAuthorAvatarContainer">
                                            <User size={20} />
                                        </div>
                                        <div className="NeDetAuthorDetails">
                                            <span className="NeDetAuthorName">{t('meta.by') || 'By'} {news.authorName || 'N/A'}</span>
                                            <span className="NeDetAuthorRole">Journalist</span>
                                        </div>
                                    </div>
                                    <div className="NeDetMetaStats">
                                        <div className="NeDetMetaItem"><Calendar size={16} /><span>{formatDate(news.createdAt)}</span></div>
                                        <div className="NeDetMetaItem"><Clock size={16} /><span>{news.readTime} {t('meta.minRead', 'min read')}</span></div>
                                        <div className="NeDetMetaItem"><Globe size={16} /><span>{news.region || t('meta.global', 'Global')}</span></div>
                                    </div>
                                </div>
                                <div className="NeDetMetaSecondary">
                                    <div className="NeDetEngagementStats">
                                        <div className="NeDetStatItem"><Eye size={16} /><span>{(news.viewCount || 0).toLocaleString()}</span><small>{t('stats.views', 'views')}</small></div>
                                        <div className="NeDetStatItem"><ThumbsUp size={16} /><span>{(news.likeCount || 0).toLocaleString()}</span><small>{t('stats.likes', 'likes')}</small></div>
                                        <div className="NeDetStatItem"><MessageCircle size={16} /><span>{totalComments}</span><small>{t('stats.comments', 'comments')}</small></div>
                                        <div className="NeDetStatItem"><Share2 size={16} /><span>{(news.shareCount || 0).toLocaleString()}</span><small>{t('stats.shares', 'shares')}</small></div>
                                    </div>
                                    <div className="NeDetActionButtons">
                                        <button className={`NeDetActionBtn like-btn ${isLiked ? 'active' : ''}`} onClick={handleLikeNews} disabled={isLiked || !currentUser} title={!currentUser ? "Login to like" : (isLiked ? "Already liked" : "Like this article")}>
                                            <Heart size={16} /> {isLiked ? t('actions.liked', 'Liked') : t('actions.like', 'Like')}
                                        </button>
                                        <button className="NeDetActionBtn share-btn" onClick={() => setShowShareModal(true)}>
                                            <Share2 size={16} /> {t('actions.share', 'Share')}
                                        </button>
                                        <button className={`NeDetActionBtn bookmark-btn ${isBookmarked ? 'active' : ''}`} onClick={() => setIsBookmarked(!isBookmarked)} title={isBookmarked ? "Remove from saved" : "Save for later"}>
                                            <Bookmark size={16} /> {isBookmarked ? t('actions.saved', 'Saved') : t('actions.save', 'Save')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {news.imageUrl && (
                        <div className="NeDetFeaturedImage">
                            <img src={news.imageUrl} alt={news.imageAlt || news.title} className="NeDetFeaturedImageImg" />
                            {news.imageCaption && <figcaption className="NeDetImageCaption">{news.imageCaption}</figcaption>}
                        </div>
                    )}

                    <div className="NeDetContent" ref={contentRef}>
                        {news.summary && (
                            <div className="NeDetSummary">
                                <Quote size={24} className="NeDetSummaryIcon" />
                                <p>{news.summary}</p>
                            </div>
                        )}
                        <div className="NeDetMainContent" dangerouslySetInnerHTML={{ __html: news.content }} />
                        {(news.source || news.sourceUrl) && (
                            <div className="NeDetSource">
                                <div className="NeDetSourceHeader"><ExternalLink size={16} /><span>{t('source.title') || 'Source'}</span></div>
                                {news.source && <p className="NeDetSourceName">{news.source}</p>}
                                {news.sourceUrl && (
                                    <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="NeDetSourceLink">
                                        {t('source.readOriginal') || 'Read Original Article'} <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        )}
                        {news.tags && news.tags.length > 0 && (
                            <div className="NeDetTags">
                                <div className="NeDetTagsHeader"><Tag size={16} /><span>{t('tags.title') || 'Tags'}</span></div>
                                <div className="NeDetTagsList">
                                    {news.tags.map((tag, index) => (
                                        <span key={index} className="NeDetTagItem">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="NeDetArticleFooter">
                            <div className="NeDetFooterMeta">
                                <p><strong>{t('articleFooter.published') || 'Published:'}</strong> {formatDate(news.createdAt)}</p>
                                {news.lastModifiedAt && news.lastModifiedAt !== news.createdAt && (
                                    <p><strong>{t('articleFooter.lastUpdated') || 'Last updated:'}</strong> {formatDate(news.lastModifiedAt)}</p>
                                )}
                                {news.lastModifiedBy && (
                                    <p><strong>{t('articleFooter.updatedBy') || 'Updated by:'}</strong> {news.lastModifiedBy}</p>
                                )}
                            </div>
                            <div className="NeDetFooterActions">
                                <button className="NeDetFooterActionBtn" onClick={() => setShowShareModal(true)}>
                                    <Share2 size={16} /> {t('articleFooter.shareArticle') || 'Share Article'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <section className="NeDetCommentsSection">
                        <div className="NeDetCommentsHeader">
                            <h3 className="NeDetCommentsTitle">
                                <MessageCircle size={24} /> {t('Yorumlar') || 'Discussion'} ({totalComments})
                            </h3>
                        </div>

                        <div className="NeDetCommentFormContainer">
                            <h4>{t('commentForm.joinConversation') || 'Join the conversation'}</h4>
                            {currentUser ? (
                                <>
                                    <div className="NeDetCurrentUserInfo">
                                        <div className="NeDetCommentAvatarContainer" style={{ backgroundColor: getUserAvatarColor(currentUser.email) }}>
                                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                                                {getUserInitials(currentUser.name)}
                                            </span>
                                        </div>
                                        <div className="NeDetUserDetails">
                                            <p className="NeDetFormDescription">
                                                {t('commentForm.loggedInAs', 'You are commenting as') || 'You are commenting as'} <strong>{currentUser.name}</strong>
                                            </p>
                                            <button
                                                onClick={() => navigate('/profilePage')}
                                                className="NeDetProfileLink"
                                                title="Go to profile"
                                            >
                                                <Settings size={14} />
                                                {t('commentForm.manageProfile', 'Manage Profile')}
                                            </button>
                                        </div>
                                    </div>
                                    {commentError && <div className="NeDetCommentAlert error"><AlertCircle size={16} />{commentError}</div>}
                                    {commentSuccess && <div className="NeDetCommentAlert success"><CheckCircle size={16} />{commentSuccess}</div>}
                                    <form onSubmit={(e) => handleCommentSubmit(e)} className="NeDetCommentForm">
                                        <div className="NeDetFormGroup">
                                            <label htmlFor="content">{t('commentForm.yourComment', 'Your Comment')} *</label>
                                            <textarea
                                                id="content"
                                                value={newComment.content}
                                                onChange={(e) => setNewComment({ content: e.target.value })}
                                                placeholder={t('commentForm.placeholder', 'What are your thoughts?')}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="NeDetSubmitCommentBtn" disabled={isSubmittingComment}>
                                            {isSubmittingComment ? (
                                                <><div className="NeDetSpinner"></div> {t('commentForm.publishing', 'Publishing...')}</>
                                            ) : (
                                                <><Send size={16} /> {t('commentForm.publish', 'Publish Comment')}</>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="NeDetLoginToComment">
                                    <div className="NeDetCommentAvatarContainer" style={{ backgroundColor: '#6b7280' }}>
                                        <User size={24} />
                                    </div>
                                    <div className="NeDetLoginContent">
                                        <p>{t('commentForm.pleaseLogin', 'Please log in to join the discussion.')}</p>
                                        <button onClick={() => navigate('/login')} className="NeDetLoginButton">
                                            {t('commentForm.loginButton', 'Log In')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="NeDetCommentsList">
                            {comments.length > 0 ? (
                                comments.map((comment) => {
                                    const isExpanded = expandedComments.has(comment.id);
                                    const shouldTruncate = isCommentTruncated(comment.content);
                                    const displayContent = shouldTruncate && !isExpanded
                                        ? truncateComment(comment.content)
                                        : comment.content;

                                    return (
                                        <div key={comment.id} className="NeDetCommentItem">
                                            <div
                                                className="NeDetCommentAvatarContainer"
                                                style={{ backgroundColor: getUserAvatarColor(comment.authorEmail) }}
                                            >
                                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                                                    {getUserInitials(comment.authorName)}
                                                </span>
                                            </div>
                                            <div className="NeDetCommentContent">
                                                <div className="NeDetCommentHeader">
                                                    <div className="NeDetCommentAuthor">
                                                        <span className="author-name">{comment.authorName}</span>
                                                        <span className="NeDetCommentDate">{getTimeAgo(comment.createdAt)}</span>
                                                    </div>
                                                    <div className="NeDetCommentActions">
                                                        <button className="NeDetCommentActionBtn" onClick={() => handleLikeComment(comment.id)} title={!currentUser ? "Login to like" : "Like comment"} disabled={!currentUser}>
                                                            <ThumbsUp size={14} /> {comment.likeCount || 0}
                                                        </button>
                                                        <button className="NeDetCommentActionBtn" onClick={() => handleReplyClick(comment.id, comment.authorName)} title={!currentUser ? "Login to reply" : "Reply to comment"} disabled={!currentUser}>
                                                            <Reply size={14} /> {t('actions.reply', 'Reply')}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="NeDetCommentText">
                                                    {displayContent}
                                                    {shouldTruncate && !isExpanded && (
                                                        <span className="NeDetCommentTruncated">...</span>
                                                    )}
                                                </div>

                                                {shouldTruncate && (
                                                    <button
                                                        className="NeDetExpandCommentBtn"
                                                        onClick={() => toggleCommentExpansion(comment.id)}
                                                    >
                                                        {isExpanded ? (
                                                            <>
                                                                <ChevronUp size={14} />
                                                                {t('actions.showLess', 'Show Less')}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown size={14} />
                                                                {t('actions.readMore', 'Read More')}
                                                            </>
                                                        )}
                                                    </button>
                                                )}

                                                {replyingTo?.commentId === comment.id && (
                                                    <div className="NeDetReplyForm">
                                                        <form onSubmit={(e) => handleCommentSubmit(e, comment.id, replyContent)}>
                                                            <textarea
                                                                value={replyContent}
                                                                onChange={(e) => setReplyContent(e.target.value)}
                                                                placeholder={`${t('commentForm.replyTo', 'Reply to')} ${replyingTo.authorName}...`}
                                                                rows="3"
                                                                required
                                                                autoFocus
                                                            />
                                                            <div className="NeDetReplyActions">
                                                                <button type="submit" className="NeDetReplySubmitBtn" disabled={isSubmittingComment}>
                                                                    {isSubmittingComment ? <div className="NeDetSpinnerSmall"></div> : <Send size={14} />}
                                                                    {isSubmittingComment ? t('actions.replying', 'Replying...') : t('actions.reply', 'Reply')}
                                                                </button>
                                                                <button type="button" className="NeDetReplyCancelBtn" onClick={() => setReplyingTo(null)}>
                                                                    {t('actions.cancel', 'Cancel')}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )}

                                                {(replies[comment.id] && replies[comment.id].length > 0) && (
                                                    <div className="NeDetRepliesList">
                                                        {replies[comment.id].map((reply) => (
                                                            <div key={reply.id} className="NeDetReplyItem">
                                                                <div
                                                                    className="NeDetCommentAvatarContainer small"
                                                                    style={{ backgroundColor: getUserAvatarColor(reply.authorEmail) }}
                                                                >
                                                                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>
                                                                        {getUserInitials(reply.authorName)}
                                                                    </span>
                                                                </div>
                                                                <div className="NeDetCommentContent">
                                                                    <div className="NeDetCommentHeader">
                                                                        <div className="NeDetCommentAuthor">
                                                                            <span className="author-name">{reply.authorName}</span>
                                                                            <span className="NeDetCommentDate">{getTimeAgo(reply.createdAt)}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="NeDetCommentText">{reply.content}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {!replies[comment.id] && comment.replyCount > 0 && (
                                                    <button className="NeDetLoadRepliesBtn" onClick={() => fetchReplies(comment.id)} disabled={loadingReplies[comment.id]}>
                                                        {loadingReplies[comment.id] ? (
                                                            <><div className="NeDetSpinnerSmall"></div> {t('actions.loadingReplies', 'Loading...')}</>
                                                        ) : (
                                                            <><Reply size={14} /> {t('actions.showReplies', 'Show {count} Replies', { count: comment.replyCount })}</>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="NeDetNoComments">
                                    <MessageCircle size={48} />
                                    <h4>{t('comments.noCommentsYet') || 'No comments yet'}</h4>
                                    <p>{t('comments.beTheFirst') || 'Be the first to share your thoughts!'}</p>
                                </div>
                            )}

                            {commentsHasMore && (
                                <div className="NeDetLoadMoreComments">
                                    <button className="NeDetLoadMoreBtn" onClick={() => fetchComments(news.id, commentsPage + 1, false)} disabled={commentsLoading}>
                                        {commentsLoading ? (
                                            <><div className="NeDetSpinner"></div> {t('actions.loadingMoreComments', 'Loading More...')}</>
                                        ) : (
                                            t('actions.loadMoreComments', 'Load More Comments')
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>

                    {relatedNews.length > 0 && (
                        <section className="NeDetRelatedArticles">
                            <h3 className="NeDetRelatedTitle">
                                <Layers size={24} /> {t('relatedArticles.title') || 'Related Articles'}
                            </h3>
                            <div className="NeDetRelatedGrid">
                                {relatedNews.slice(0, 3).map((article) => (
                                    <article key={article.id} className="NeDetRelatedCard" onClick={() => navigate(`/news/${article.slug}`)}>
                                        {article.imageUrl ? (
                                            <img src={article.imageUrl} alt={article.title} className="NeDetRelatedImage" />
                                        ) : (
                                            <div className="NeDetRelatedPlaceholder"><BookOpen size={32} /></div>
                                        )}
                                        <div className="NeDetRelatedContent">
                                            <span className="NeDetRelatedCategory">{article.category}</span>
                                            <h4 className="NeDetRelatedTitleText">{article.title}</h4>
                                            <p className="NeDetRelatedSummary">{article.summary?.substring(0, 100)}...</p>
                                            <div className="NeDetRelatedMeta">
                                                <span>{getTimeAgo(article.createdAt)}</span>
                                                <span>{calculateReadTime(article.content || '')} {t('meta.minRead', 'min read')}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </div>

            {showShareModal && (
                <div className="NeDetShareModalOverlay">
                    <div className="NeDetShareModal" ref={shareModalRef}>
                        <div className="NeDetShareModalHeader">
                            <h3>{t('shareModal.title') || 'Share this article'}</h3>
                            <button className="NeDetShareModalClose" onClick={() => setShowShareModal(false)}><X size={20} /></button>
                        </div>
                        <div className="NeDetShareOptions">
                            <button className="NeDetShareOption facebook" onClick={() => handleShare('facebook')}><Share2 size={20} /> Facebook</button>
                            <button className="NeDetShareOption twitter" onClick={() => handleShare('twitter')}><Share2 size={20} /> Twitter</button>
                            <button className="NeDetShareOption linkedin" onClick={() => handleShare('linkedin')}><Share2 size={20} /> LinkedIn</button>
                            <button className="NeDetShareOption whatsapp" onClick={() => handleShare('whatsapp')}><Share2 size={20} /> WhatsApp</button>
                            <button className="NeDetShareOption email" onClick={() => handleShare('email')}><Mail size={20} /> Email</button>
                            <button className="NeDetShareOption copy" onClick={() => handleShare('copy')}><Copy size={20} /> {t('shareModal.copyLink') || 'Copy Link'}</button>
                        </div>
                    </div>
                </div>
            )}

            {showScrollTop && (
                <button className="NeDetScrollTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Scroll to top">
                    <ArrowUp size={20} />
                </button>
            )}

            <Footer />
        </div>
    );
}

export default NewsDetails;