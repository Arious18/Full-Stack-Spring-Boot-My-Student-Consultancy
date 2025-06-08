import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Grid, List, MapPin, Users, Award, ChevronDown, X, School, Building } from 'lucide-react';
import axios from 'axios';
import './country-style.css';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name-asc');
    const [showFilters, setShowFilters] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const filterRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch both countries and universities
                const [countriesResponse, universitiesResponse] = await Promise.all([
                    axios.get('http://localhost:8080/countries'),
                    axios.get('http://localhost:8080/universities')
                ]);

                console.log('Raw countries data:', countriesResponse.data);
                console.log('Raw universities data:', universitiesResponse.data);

                // Process countries with university counts
                const processedCountries = countriesResponse.data.map(country => {
                    // Find universities for this country
                    const countryUniversities = universitiesResponse.data.filter(
                        university => university.countryId === country.id
                    );

                    return {
                        ...country,
                        universities: countryUniversities,
                        universityCount: countryUniversities.length
                    };
                });

                // Sort countries alphabetically by name initially
                const sortedCountries = processedCountries.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                console.log('Processed countries with universities:', sortedCountries.slice(0, 2));
                setCountries(sortedCountries);
                setUniversities(universitiesResponse.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(t('errorFetchingData') || 'Failed to load countries and universities. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [t]);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...countries];

        console.log('=== FILTERING DEBUG ===');
        console.log('Total countries:', countries.length);
        console.log('Search query:', searchQuery);
        console.log('Sort by:', sortBy);

        // Search filter
        if (searchQuery && searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(country => {
                const nameMatch = country.name && country.name.toLowerCase().includes(searchLower);
                const descMatch = country.description && country.description.toLowerCase().includes(searchLower);
                // Also search within university names
                const universityMatch = country.universities && country.universities.some(uni =>
                    uni.name && uni.name.toLowerCase().includes(searchLower)
                );

                return nameMatch || descMatch || universityMatch;
            });
            console.log('After search filter:', filtered.length);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name-asc':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    return aValue.localeCompare(bValue);

                case 'name-desc':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    return bValue.localeCompare(aValue);

                case 'universities-high':
                    return b.universityCount - a.universityCount;

                case 'universities-low':
                    return a.universityCount - b.universityCount;

                default:
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    return aValue.localeCompare(bValue);
            }
        });

        console.log('Final filtered and sorted countries:', filtered.length);
        console.log('=== END FILTERING DEBUG ===');

        setFilteredCountries(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [countries, searchQuery, sortBy]);

    // Close filters when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCountryClick = (id) => {
        navigate(`/country/${id}`);
    };

    const handleUniversityClick = (universityId, e) => {
        e.stopPropagation(); // Prevent country card click
        navigate(`/university/${universityId}`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSortBy('name-asc');
    };

    // Pagination calculations
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCountries = filteredCountries.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getTotalUniversities = () => {
        return universities.length;
    };

    if (loading) {
        return (
            <div className="country-page-wrapper">
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('loading') || 'Loading countries and universities...'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="country-page-wrapper">
                <Header />
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="country-page-wrapper">
            <Header />

            {/* Hero Section */}
            <section className="country-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        {t('exploreCountries') || 'Explore Countries & Universities'}
                    </h1>
                    <p className="hero-subtitle">
                        {t('discoverDestinations') || 'Discover amazing destinations and universities around the world'}
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">{countries.length}+</span>
                            <span className="stat-label">{t('countries') || 'Countries'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{getTotalUniversities()}+</span>
                            <span className="stat-label">{t('universities') || 'Universities'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{filteredCountries.length}</span>
                            <span className="stat-label">{t('available') || 'Available'}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="country-container">
                {/* Search and Filter Bar */}
                <div className="search-filter-section">
                    <div className="search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('searchCountries') || 'Search countries, universities, or descriptions...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchQuery('')}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="filter-controls">
                        <button
                            className={`filter-toggle ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={16} />
                            {t('filters') || 'Filters'}
                            <ChevronDown className={`chevron ${showFilters ? 'rotated' : ''}`} size={16} />
                        </button>

                        <div className="view-controls">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={16} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="filters-panel" ref={filterRef}>
                        <div className="filters-header">
                            <h3>{t('advancedFilters') || 'Advanced Filters'}</h3>
                            <button className="clear-filters" onClick={clearFilters}>
                                <X size={16} />
                                {t('clearAll') || 'Clear All'}
                            </button>
                        </div>

                        <div className="filters-grid">
                            <div className="filter-group">
                                <label className="filter-label">{t('sortBy') || 'Sort By'}</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="name-asc">{t('nameAZ') || 'Name (A-Z)'}</option>
                                    <option value="name-desc">{t('nameZA') || 'Name (Z-A)'}</option>
                                    <option value="universities-high">{t('universitiesHighLow') || 'Universities (High to Low)'}</option>
                                    <option value="universities-low">{t('universitiesLowHigh') || 'Universities (Low to High)'}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Summary */}
                <div className="results-summary">
                    <p className="results-count">
                        {t('showingResults', {
                            start: startIndex + 1,
                            end: Math.min(endIndex, filteredCountries.length),
                            total: filteredCountries.length
                        }) || `Showing ${startIndex + 1}-${Math.min(endIndex, filteredCountries.length)} of ${filteredCountries.length} countries`}
                    </p>
                </div>

                {/* Countries Grid/List */}
                {filteredCountries.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🌍</div>
                        <h3>{t('noCountriesFound') || 'No Countries Found'}</h3>
                        <p>{t('tryAdjustingFilters') || 'Try adjusting your search criteria or filters'}</p>
                        <button onClick={clearFilters} className="clear-filters-btn">
                            {t('clearFilters') || 'Clear Filters'}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={`countries-container ${viewMode}`}>
                            {currentCountries.map((country) => (
                                <div
                                    key={country.id}
                                    className="country-card"
                                    onClick={() => handleCountryClick(country.id)}
                                >
                                    <div className="country-image-container">
                                        {country.imageUrl ? (
                                            <img
                                                src={country.imageUrl}
                                                alt={country.name}
                                                className="country-image"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x300/e2e8f0/1e293b?text=Country';
                                                }}
                                            />
                                        ) : (
                                            <div className="country-image-placeholder">
                                                <span className="placeholder-icon">🌍</span>
                                            </div>
                                        )}

                                        {/* University count badge */}
                                        {country.universityCount > 0 && (
                                            <div className="university-count-badge">
                                                <School size={14} />
                                                <span>{country.universityCount}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="country-content">
                                        <div className="country-header">
                                            <h3 className="country-name">{country.name}</h3>
                                            <div className="country-location">
                                                <MapPin size={14} />
                                                <span>{t('exploreDestination') || 'Explore Destination'}</span>
                                            </div>
                                        </div>

                                        <p className="country-description">
                                            {country.description ?
                                                (country.description.length > 120 ?
                                                        `${country.description.substring(0, 120)}...` :
                                                        country.description
                                                ) :
                                                t('noDescription') || 'No description available'
                                            }
                                        </p>

                                        {/* Universities List */}
                                        {country.universities && country.universities.length > 0 && (
                                            <div className="country-universities">
                                                <div className="universities-header">
                                                    <Building size={16} />
                                                    <span className="universities-title">
                                                        {t('universities') || 'Universities'} ({country.universities.length})
                                                    </span>
                                                </div>
                                                <div className="universities-list">
                                                    {country.universities.slice(0, 3).map((university) => (
                                                        <div
                                                            key={university.id}
                                                            className="university-item"
                                                            onClick={(e) => handleUniversityClick(university.id, e)}
                                                        >
                                                            <div className="university-info">
                                                                <span className="university-name-small">
                                                                    {university.name}
                                                                </span>
                                                                {university.description && (
                                                                    <span className="university-desc-small">
                                                                        {university.description.length > 50
                                                                            ? `${university.description.substring(0, 50)}...`
                                                                            : university.description
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {country.universities.length > 3 && (
                                                        <div className="more-universities">
                                                            <span>+{country.universities.length - 3} more universities</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="country-footer">
                                            <div className="country-info">
                                                <div className="info-item">
                                                    <Users size={16} />
                                                    <span>{t('culture') || 'Culture'}</span>
                                                </div>
                                                <div className="info-item">
                                                    <School size={16} />
                                                    <span>{country.universityCount} {t('universities') || 'Universities'}</span>
                                                </div>
                                            </div>

                                            <button className="details-button">
                                                {t('viewDetails') || 'View Details'}
                                                <span className="button-arrow">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        ← Previous
                                    </button>

                                    <div className="pagination-numbers">
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
                                                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                                                    onClick={() => handlePageChange(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        className="pagination-btn"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next →
                                    </button>
                                </div>

                                <div className="pagination-info">
                                    {t('pageXofY', { current: currentPage, total: totalPages }) ||
                                        `Page ${currentPage} of ${totalPages}`}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default CountryList;