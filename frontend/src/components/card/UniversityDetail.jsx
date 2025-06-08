import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./UniversityDetail.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

function UniversityDetail() {
    const { id } = useParams();
    const [university, setUniversity] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const navigate = useNavigate();

    const itemsPerPage = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch university details
                const response = await fetch(`http://localhost:8080/universities/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch university: ${response.status}`);
                }
                const data = await response.json();
                setUniversity(data);

                // Fetch faculties for this university
                const facultiesResponse = await fetch(`http://localhost:8080/faculties/university/${id}`);
                console.log('Fetching faculties from:', `http://localhost:8080/faculties/university/${id}`);
                console.log('Faculties response status:', facultiesResponse.status);

                if (!facultiesResponse.ok) {
                    throw new Error(`Failed to fetch faculties: ${facultiesResponse.status}`);
                }
                let facultiesData = await facultiesResponse.json();
                console.log('Faculties data received:', facultiesData);

                // Check if the data is in array format
                if (!Array.isArray(facultiesData)) {
                    console.log('Invalid faculties data format:', facultiesData);
                    // If it's not an array, try to see if it's wrapped in an object
                    if (facultiesData && Array.isArray(facultiesData.data)) {
                        console.log('Found array in data property');
                        facultiesData = facultiesData.data;
                    } else {
                        throw new Error('Invalid faculties data format');
                    }
                }

                // Format faculties data
                const formattedFaculties = facultiesData.map(faculty => ({
                    ...faculty,
                    imageUrl: faculty.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg',
                    description: faculty.description || 'No description available'
                }));

                console.log('Formatted faculties:', formattedFaculties);
                setFaculties(formattedFaculties);
                setError(null);
            } catch (err) {
                console.error('Error in fetchData:', err);
                setError(`Failed to load data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Pagination logic
    const totalPages = Math.ceil(faculties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFaculties = faculties.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to faculties section
        const facultiesSection = document.querySelector('.ud-faculties-section');
        if (facultiesSection) {
            facultiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="ud-loading-container">
                    <div className="ud-loading-spinner">
                        <div className="ud-spinner"></div>
                        <p>Loading university details...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="ud-error-container">
                    <div className="ud-error-content">
                        <div className="ud-error-icon">⚠️</div>
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                        <button className="ud-retry-btn" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!university) {
        return (
            <>
                <Header />
                <div className="ud-error-container">
                    <div className="ud-error-content">
                        <div className="ud-error-icon">🏛️</div>
                        <h2>University not found</h2>
                        <p>The university you're looking for doesn't exist or has been removed.</p>
                        <button className="ud-retry-btn" onClick={() => navigate('/university')}>
                            Browse Universities
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out ${university.name} - Amazing university with great programs!`;

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        if (currentPage > 1) {
            pageNumbers.push(
                <button
                    key="prev"
                    className="ud-pagination-btn ud-pagination-nav"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    Previous
                </button>
            );
        }

        // First page
        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    className="ud-pagination-btn"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(<span key="dots1" className="ud-pagination-dots">...</span>);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`ud-pagination-btn ${i === currentPage ? 'ud-pagination-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="dots2" className="ud-pagination-dots">...</span>);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    className="ud-pagination-btn"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        if (currentPage < totalPages) {
            pageNumbers.push(
                <button
                    key="next"
                    className="ud-pagination-btn ud-pagination-nav"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            );
        }

        return (
            <div className="ud-pagination">
                <div className="ud-pagination-info">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, faculties.length)} of {faculties.length} faculties
                </div>
                <div className="ud-pagination-controls">
                    {pageNumbers}
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="ud-university-detail-page">
                {/* Hero Section with Background Image */}
                <div className="ud-hero-section">
                    <div className="ud-hero-background">
                        <img
                            src={university.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'}
                            alt={university.name}
                            className="ud-hero-image"
                            onError={(e) => { e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'; }}
                        />
                        <div className="ud-hero-overlay"></div>
                    </div>

                    <div className="ud-hero-content">
                        <div className="ud-hero-text">
                            <h1 className="ud-hero-title">{university.name}</h1>
                            <div className="ud-hero-stats">
                                <div className="ud-stat">
                                    <span className="ud-stat-icon">🏛️</span>
                                    <span className="ud-stat-text">World-Class Education</span>
                                </div>
                                <div className="ud-stat">
                                    <span className="ud-stat-icon">🎓</span>
                                    <span className="ud-stat-text">{faculties.length}+ Faculties</span>
                                </div>
                                <div className="ud-stat">
                                    <span className="ud-stat-icon">🌍</span>
                                    <span className="ud-stat-text">International Recognition</span>
                                </div>
                            </div>
                        </div>

                        <div className="ud-hero-actions">
                            <button
                                className="ud-primary-btn"
                                onClick={() => navigate('/apply')}
                            >
                                <span className="ud-btn-icon">📝</span>
                                Apply Now
                            </button>
                            <button
                                className="ud-secondary-btn"
                                onClick={() => window.scrollTo({ top: document.querySelector('.ud-faculties-section').offsetTop, behavior: 'smooth' })}
                            >
                                <span className="ud-btn-icon">📚</span>
                                Explore Programs
                            </button>
                        </div>
                    </div>
                </div>

                {/* University Description */}
                <div className="ud-content-section">
                    <div className="ud-container">
                        <div className="ud-description-card">
                            <div className="ud-card-header">
                                <h2 className="ud-section-title">About {university.name}</h2>
                                <div className="ud-title-decoration"></div>
                            </div>
                            <p className="ud-description">
                                {university.description || 'Discover excellence in higher education with our comprehensive academic programs, world-class faculty, and state-of-the-art facilities. Join thousands of students who have chosen to build their future with us.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Faculties Section */}
                <div className="ud-faculties-section">
                    <div className="ud-container">
                        <div className="ud-section-header">
                            <h2 className="ud-section-title">Our Faculties</h2>
                            <div className="ud-title-decoration"></div>
                            <p className="ud-section-subtitle">
                                Explore our diverse range of academic programs and find your perfect path to success
                            </p>
                        </div>

                        {faculties.length === 0 ? (
                            <div className="ud-empty-state">
                                <div className="ud-empty-icon">🏫</div>
                                <h3>No faculties available</h3>
                                <p>This university hasn't added any faculties yet. Check back soon!</p>
                            </div>
                        ) : (
                            <>
                                {/* View Toggle */}
                                <div className="ud-view-controls">
                                    <div className="ud-view-toggle">
                                        <button
                                            className={`ud-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                            onClick={() => handleViewModeChange('grid')}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <rect x="3" y="3" width="7" height="7"/>
                                                <rect x="14" y="3" width="7" height="7"/>
                                                <rect x="14" y="14" width="7" height="7"/>
                                                <rect x="3" y="14" width="7" height="7"/>
                                            </svg>
                                            Grid
                                        </button>
                                        <button
                                            className={`ud-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                                            onClick={() => handleViewModeChange('table')}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/>
                                            </svg>
                                            Table
                                        </button>
                                    </div>
                                </div>

                                {/* Grid View */}
                                {viewMode === 'grid' && (
                                    <div className="ud-faculties-grid ud-faculties-grid-compact">
                                        {currentFaculties.map((faculty, index) => (
                                            <div
                                                key={faculty.id}
                                                className="ud-faculty-card ud-faculty-card-compact"
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <div className="ud-card-image-container ud-card-image-container-compact">
                                                    <img
                                                        src={faculty.imageUrl}
                                                        alt={faculty.name}
                                                        className="ud-card-image"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
                                                        }}
                                                    />
                                                    <div className="ud-card-overlay">
                                                        <button
                                                            className="ud-card-quick-btn ud-card-quick-btn-compact"
                                                            onClick={() => navigate(`/fields/${faculty.id}`)}
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="ud-card-content ud-card-content-compact">
                                                    <h3 className="ud-card-title ud-card-title-compact">{faculty.name}</h3>
                                                    <p className="ud-card-description ud-card-description-compact">
                                                        {faculty.description.length > 60
                                                            ? `${faculty.description.substring(0, 60)}...`
                                                            : faculty.description}
                                                    </p>

                                                    {faculty.price !== undefined && (
                                                        <div className="ud-card-price ud-card-price-compact">
                                                            <span className="ud-price-value ud-price-value-compact">
                                                                ${faculty.price.toLocaleString()}
                                                                <span className="ud-price-period">/year</span>
                                                            </span>
                                                        </div>
                                                    )}

                                                    <button
                                                        className="ud-card-btn ud-card-btn-compact"
                                                        onClick={() => navigate(`/fields/${faculty.id}`)}
                                                    >
                                                        <span>Explore</span>
                                                        <svg className="ud-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Table View */}
                                {viewMode === 'table' && (
                                    <div className="ud-faculties-table-container">
                                        <table className="ud-faculties-table">
                                            <thead>
                                            <tr>
                                                <th>Faculty</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentFaculties.map((faculty) => (
                                                <tr key={faculty.id} className="ud-table-row">
                                                    <td className="ud-table-faculty">
                                                        <div className="ud-table-faculty-info">
                                                            <img
                                                                src={faculty.imageUrl}
                                                                alt={faculty.name}
                                                                className="ud-table-faculty-image"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
                                                                }}
                                                            />
                                                            <div className="ud-table-faculty-details">
                                                                <h4 className="ud-table-faculty-name">{faculty.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="ud-table-description">
                                                        {faculty.description.length > 100
                                                            ? `${faculty.description.substring(0, 100)}...`
                                                            : faculty.description}
                                                    </td>
                                                    <td className="ud-table-price">
                                                        {faculty.price !== undefined ? (
                                                            <span className="ud-table-price-value">
                                                                    ${faculty.price.toLocaleString()}/year
                                                                </span>
                                                        ) : (
                                                            <span className="ud-table-price-na">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="ud-table-actions">
                                                        <button
                                                            className="ud-table-btn"
                                                            onClick={() => navigate(`/fields/${faculty.id}`)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Pagination */}
                                {renderPagination()}
                            </>
                        )}
                    </div>
                </div>

                {/* Social Share Section */}
                <div className="ud-share-section">
                    <div className="ud-container">
                        <div className="ud-share-card">
                            <h3 className="ud-share-title">Share with Friends</h3>
                            <p className="ud-share-subtitle">Help others discover this amazing university</p>
                            <div className="ud-social-buttons">
                                <button
                                    className="ud-social-btn ud-facebook"
                                    onClick={() => handleShare('facebook')}
                                    aria-label="Share on Facebook"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Facebook
                                </button>
                                <button
                                    className="ud-social-btn ud-twitter"
                                    onClick={() => handleShare('twitter')}
                                    aria-label="Share on Twitter"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                    Twitter
                                </button>
                                <button
                                    className="ud-social-btn ud-whatsapp"
                                    onClick={() => handleShare('whatsapp')}
                                    aria-label="Share on WhatsApp"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                    </svg>
                                    WhatsApp
                                </button>
                                <button
                                    className="ud-social-btn ud-telegram"
                                    onClick={() => handleShare('telegram')}
                                    aria-label="Share on Telegram"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                    </svg>
                                    Telegram
                                </button>
                                <button
                                    className="ud-social-btn ud-linkedin"
                                    onClick={() => handleShare('linkedin')}
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </button>
                                <button
                                    className="ud-social-btn ud-reddit"
                                    onClick={() => handleShare('reddit')}
                                    aria-label="Share on Reddit"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                                    </svg>
                                    Reddit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UniversityDetail;