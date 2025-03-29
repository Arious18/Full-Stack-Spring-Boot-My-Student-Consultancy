// Create a new file: src/pages/SearchPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import SearchService from './SearchService';
import './SearchPage.css';
import { useTranslation } from 'react-i18next';

function SearchPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, [initialQuery]);

    const performSearch = async (query) => {
        setLoading(true);
        try {
            const searchResults = await SearchService.searchAll(query);
            setResults(searchResults);

            const total =
                searchResults.universities.length +
                searchResults.faculties.length +
                searchResults.fields.length +
                searchResults.countries.length;

            setTotalResults(total);
        } catch (error) {
            console.error('Search failed:', error);
            // Handle error state
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            performSearch(searchQuery);
        }
    };

    const renderResultItem = (item, type) => {
        const navigateToDetail = () => {
            switch (type) {
                case 'university':
                    navigate(`/university/${item.id}`);
                    break;
                case 'faculty':
                    navigate(`/faculty/${item.id}`);
                    break;
                case 'field':
                    navigate(`/field/${item.id}`);
                    break;
                case 'country':
                    navigate(`/country/${item.id}`);
                    break;
            }
        };

        return (
            <div key={`${type}-${item.id}`} className="search-result-item" onClick={navigateToDetail}>
                <div className="search-result-image">
                    {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                    ) : (
                        <div className="search-result-placeholder">{item.name.charAt(0)}</div>
                    )}
                </div>
                <div className="search-result-content">
                    <h3>{item.name}</h3>
                    <p className="search-result-type">{t(type)}</p>
                    <p className="search-result-description">
                        {item.description ? (
                            item.description.length > 150
                                ? `${item.description.substring(0, 150)}...`
                                : item.description
                        ) : t('noDescription')}
                    </p>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        if (!results) return null;

        const { universities, faculties, fields, countries } = results;

        if (activeTab === 'all') {
            if (totalResults === 0) {
                return <div className="search-no-results">{t('noResults')}</div>;
            }

            return (
                <>
                    {universities.length > 0 && (
                        <div className="search-section">
                            <h2>{t('universities')}</h2>
                            <div className="search-results-list">
                                {universities.map(uni => renderResultItem(uni, 'university'))}
                            </div>
                        </div>
                    )}

                    {faculties.length > 0 && (
                        <div className="search-section">
                            <h2>{t('faculties')}</h2>
                            <div className="search-results-list">
                                {faculties.map(faculty => renderResultItem(faculty, 'faculty'))}
                            </div>
                        </div>
                    )}

                    {fields.length > 0 && (
                        <div className="search-section">
                            <h2>{t('fields')}</h2>
                            <div className="search-results-list">
                                {fields.map(field => renderResultItem(field, 'field'))}
                            </div>
                        </div>
                    )}

                    {countries.length > 0 && (
                        <div className="search-section">
                            <h2>{t('countries')}</h2>
                            <div className="search-results-list">
                                {countries.map(country => renderResultItem(country, 'country'))}
                            </div>
                        </div>
                    )}
                </>
            );
        }

        // Render individual category tabs
        let categoryResults = [];
        let categoryTitle = '';

        switch (activeTab) {
            case 'universities':
                categoryResults = universities;
                categoryTitle = t('universities');
                break;
            case 'faculties':
                categoryResults = faculties;
                categoryTitle = t('faculties');
                break;
            case 'fields':
                categoryResults = fields;
                categoryTitle = t('fields');
                break;
            case 'countries':
                categoryResults = countries;
                categoryTitle = t('countries');
                break;
        }

        if (categoryResults.length === 0) {
            return <div className="search-no-results">{t('noCategoryResults', { category: categoryTitle })}</div>;
        }

        return (
            <div className="search-section">
                <h2>{categoryTitle}</h2>
                <div className="search-results-list">
                    {categoryResults.map(item => renderResultItem(item, activeTab.slice(0, -1)))}
                </div>
            </div>
        );
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h1>{t('searchTitle')}</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-container">
                        <SearchIcon className="search-form-icon" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            {t('search')}
                        </button>
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="search-loading">
                    <div className="search-spinner"></div>
                    <p>{t('searching')}</p>
                </div>
            ) : results && (
                <div className="search-content">
                    <div className="search-tabs">
                        <button
                            className={`search-tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            {t('allResults')} ({totalResults})
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'universities' ? 'active' : ''}`}
                            onClick={() => setActiveTab('universities')}
                        >
                            {t('universities')} ({results.universities.length})
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'faculties' ? 'active' : ''}`}
                            onClick={() => setActiveTab('faculties')}
                        >
                            {t('faculties')} ({results.faculties.length})
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'fields' ? 'active' : ''}`}
                            onClick={() => setActiveTab('fields')}
                        >
                            {t('fields')} ({results.fields.length})
                        </button>
                        <button
                            className={`search-tab ${activeTab === 'countries' ? 'active' : ''}`}
                            onClick={() => setActiveTab('countries')}
                        >
                            {t('countries')} ({results.countries.length})
                        </button>
                    </div>

                    <div className="search-results-container">
                        {renderResults()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchPage;