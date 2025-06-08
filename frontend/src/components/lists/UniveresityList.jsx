import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Grid, List, MapPin, DollarSign, Users, Award, ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import './style.css';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

function UniversityList() {
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
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
                const [universitiesResponse, countriesResponse] = await Promise.all([
                    axios.get('http://localhost:8080/universities'),
                    axios.get('http://localhost:8080/countries')
                ]);

                console.log('Universities Response:', universitiesResponse.data);
                console.log('Countries Response:', countriesResponse.data);

                // Process universities to match expected format
                const processedUniversities = universitiesResponse.data.map(university => {
                    // Find country data
                    const country = countriesResponse.data.find(c => c.id === university.countryId);

                    return {
                        ...university,
                        // Ensure country object exists with the expected structure
                        country: country ? {
                            id: country.id,
                            name: country.name
                        } : null
                    };
                });

                console.log('Processed Universities:', processedUniversities.slice(0, 2));

                setUniversities(processedUniversities);
                setCountries(countriesResponse.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(t('errorFetchingData') || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [t]);

    // Apply filters and sorting - FIXED VERSION
    useEffect(() => {
        let filtered = [...universities];

        console.log('=== FILTERING DEBUG ===');
        console.log('Total universities:', universities.length);
        console.log('Search query:', searchQuery);
        console.log('Selected country:', selectedCountry);
        console.log('Sort by:', sortBy);

        // Search filter
        if (searchQuery && searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(university => {
                const nameMatch = university.name && university.name.toLowerCase().includes(searchLower);
                const descMatch = university.description && university.description.toLowerCase().includes(searchLower);
                const countryMatch = university.country && university.country.name.toLowerCase().includes(searchLower);

                return nameMatch || descMatch || countryMatch;
            });
            console.log('After search filter:', filtered.length);
        }

        // Country filter - FIXED
        if (selectedCountry && selectedCountry !== '') {
            console.log('Applying country filter for:', selectedCountry);

            filtered = filtered.filter(university => {
                if (!university.country) {
                    console.log('University without country:', university.name);
                    return false;
                }

                // Check both countryId (direct) and country.id (nested object)
                const universityCountryId = university.countryId || university.country.id;
                const selectedCountryId = selectedCountry;

                console.log('Comparing:', {
                    universityName: university.name,
                    universityCountryId: universityCountryId,
                    universityCountryName: university.country.name,
                    selectedCountryId: selectedCountryId,
                    directMatch: String(universityCountryId) === String(selectedCountryId),
                    nestedMatch: String(university.country.id) === String(selectedCountryId)
                });

                // Try multiple comparison methods for robustness
                return String(universityCountryId) === String(selectedCountryId) ||
                    String(university.country.id) === String(selectedCountryId);
            });

            console.log('After country filter:', filtered.length);
            console.log('Filtered universities:', filtered.map(u => ({
                name: u.name,
                country: u.country?.name,
                countryId: u.countryId || u.country?.id
            })));
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

                case 'country-asc':
                    aValue = a.country ? a.country.name.toLowerCase() : '';
                    bValue = b.country ? b.country.name.toLowerCase() : '';
                    return aValue.localeCompare(bValue);

                case 'country-desc':
                    aValue = a.country ? a.country.name.toLowerCase() : '';
                    bValue = b.country ? b.country.name.toLowerCase() : '';
                    return bValue.localeCompare(aValue);

                case 'price-low':
                    aValue = getEffectivePrice(a);
                    bValue = getEffectivePrice(b);
                    return aValue - bValue;

                case 'price-high':
                    aValue = getEffectivePrice(a);
                    bValue = getEffectivePrice(b);
                    return bValue - aValue;

                default:
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    return aValue.localeCompare(bValue);
            }
        });

        console.log('Final filtered and sorted universities:', filtered.length);
        console.log('=== END FILTERING DEBUG ===');

        setFilteredUniversities(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [universities, searchQuery, selectedCountry, sortBy]);

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

    const handleUniversityClick = (id) => {
        navigate(`/university/${id}`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCountry('');
        setSortBy('name-asc');
    };

    const getEffectivePrice = (university) => {
        const yearlyPrice = university.yearlyPrice || 0;
        const discountPrice = university.discountPrice || 0;
        return discountPrice && discountPrice < yearlyPrice ? discountPrice : yearlyPrice;
    };

    // Pagination calculations
    const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUniversities = filteredUniversities.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="university-page-wrapper">
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('loading') || 'Loading universities...'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="university-page-wrapper">
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
        <div className="university-page-wrapper">
            <Header />

            {/* Hero Section */}
            <section className="university-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        {t('findYourDreamUniversity') || 'Find Your Dream University'}
                    </h1>
                    <p className="hero-subtitle">
                        {t('exploreWorldClassEducation') || 'Explore world-class educational institutions and find the perfect match for your academic journey'}
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">{universities.length}+</span>
                            <span className="stat-label">{t('universities') || 'Universities'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{countries.length}+</span>
                            <span className="stat-label">{t('countries') || 'Countries'}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="university-container">
                {/* Search and Filter Bar */}
                <div className="search-filter-section">
                    <div className="search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('searchUniversities') || 'Search universities, countries, or programs...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
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
                                <label className="filter-label">{t('country') || 'Country'}</label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => {
                                        console.log('Country selection changed to:', e.target.value);
                                        setSelectedCountry(e.target.value);
                                    }}
                                    className="filter-select"
                                >
                                    <option value="">{t('allCountries') || 'All Countries'}</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">{t('sortBy') || 'Sort By'}</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="name-asc">{t('nameAZ') || 'Name (A-Z)'}</option>
                                    <option value="name-desc">{t('nameZA') || 'Name (Z-A)'}</option>
                                    <option value="country-asc">{t('countryAZ') || 'Country (A-Z)'}</option>
                                    <option value="country-desc">{t('countryZA') || 'Country (Z-A)'}</option>
                                    <option value="price-low">{t('priceLowHigh') || 'Price (Low to High)'}</option>
                                    <option value="price-high">{t('priceHighLow') || 'Price (High to Low)'}</option>
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
                            end: Math.min(endIndex, filteredUniversities.length),
                            total: filteredUniversities.length
                        }) || `Showing ${startIndex + 1}-${Math.min(endIndex, filteredUniversities.length)} of ${filteredUniversities.length} universities`}
                    </p>
                </div>

                {/* Universities Grid/List */}
                {filteredUniversities.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🏛️</div>
                        <h3>{t('noUniversitiesFound') || 'No Universities Found'}</h3>
                        <p>{t('tryAdjustingFilters') || 'Try adjusting your search criteria or filters'}</p>
                        <button onClick={clearFilters} className="clear-filters-btn">
                            {t('clearFilters') || 'Clear Filters'}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={`universities-container ${viewMode}`}>
                            {currentUniversities.map((university) => (
                                <div
                                    key={university.id}
                                    className="university-card"
                                    onClick={() => handleUniversityClick(university.id)}
                                >
                                    <div className="university-image-container">
                                        {university.imageUrl ? (
                                            <img
                                                src={university.imageUrl}
                                                alt={university.name}
                                                className="university-image"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x300/e2e8f0/1e293b?text=University';
                                                }}
                                            />
                                        ) : (
                                            <div className="university-image-placeholder">
                                                <span className="placeholder-icon">🏛️</span>
                                            </div>
                                        )}

                                        {university.discountPrice && university.discountPrice < university.yearlyPrice && (
                                            <div className="discount-badge">
                                                {Math.round(((university.yearlyPrice - university.discountPrice) / university.yearlyPrice) * 100)}% OFF
                                            </div>
                                        )}
                                    </div>

                                    <div className="university-content">
                                        <div className="university-header">
                                            <h3 className="university-name">{university.name}</h3>
                                            <div className="university-location">
                                                <MapPin size={14} />
                                                <span>{university.country ? university.country.name : t('noCountry') || 'No country'}</span>
                                            </div>
                                        </div>

                                        <p className="university-description">
                                            {university.description ?
                                                (university.description.length > 120 ?
                                                        `${university.description.substring(0, 120)}...` :
                                                        university.description
                                                ) :
                                                t('noDescription') || 'No description available'
                                            }
                                        </p>

                                        <div className="university-footer">
                                            <div className="university-price">

                                                <div className="price-content">
                                                    <span className="current-price">
                                                    </span>
                                                </div>
                                            </div>

                                            <button className="details-button">
                                                {t('viewDetails') || 'View Details'}
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

export default UniversityList;