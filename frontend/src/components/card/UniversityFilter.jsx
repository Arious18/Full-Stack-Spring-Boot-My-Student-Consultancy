import React, { useState, useEffect } from 'react';
import './UniversityFilter.css';

const UniversityFilter = ({
                              universities = [],
                              onFilteredUniversities,
                              countries = []
                          }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [sortBy, setSortBy] = useState('name-asc'); // name-asc, name-desc
    const [searchTerm, setSearchTerm] = useState('');

    // Apply filters whenever dependencies change
    useEffect(() => {
        let filteredUniversities = [...universities];

        // Filter by country
        if (selectedCountry && selectedCountry !== 'all') {
            filteredUniversities = filteredUniversities.filter(university =>
                university.country &&
                university.country.toLowerCase() === selectedCountry.toLowerCase()
            );
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim();
            filteredUniversities = filteredUniversities.filter(university =>
                (university.name && university.name.toLowerCase().includes(searchLower)) ||
                (university.description && university.description.toLowerCase().includes(searchLower)) ||
                (university.country && university.country.toLowerCase().includes(searchLower))
            );
        }

        // Sort universities
        switch (sortBy) {
            case 'name-asc':
                filteredUniversities.sort((a, b) =>
                    (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
                );
                break;
            case 'name-desc':
                filteredUniversities.sort((a, b) =>
                    (b.name || '').localeCompare(a.name || '', undefined, { sensitivity: 'base' })
                );
                break;
            default:
                break;
        }

        // Pass filtered results to parent component
        onFilteredUniversities(filteredUniversities);
    }, [universities, selectedCountry, sortBy, searchTerm, onFilteredUniversities]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setSelectedCountry('');
        setSortBy('name-asc');
        setSearchTerm('');
    };

    const hasActiveFilters = selectedCountry !== '' || searchTerm.trim() !== '' || sortBy !== 'name-asc';

    return (
        <div className="university-filter">
            <div className="filter-container">
                <div className="filter-header">
                    <h3 className="filter-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                        </svg>
                        Filter & Sort Universities
                    </h3>
                    {hasActiveFilters && (
                        <button
                            className="clear-filters-btn"
                            onClick={clearFilters}
                            title="Clear all filters"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            Clear
                        </button>
                    )}
                </div>

                <div className="filter-controls">
                    {/* Search Input */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            Search Universities
                        </label>
                        <input
                            type="text"
                            className="filter-input search-input"
                            placeholder="Search by name, description, or country..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Country Filter */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="2" y1="12" x2="22" y2="12"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            Country
                        </label>
                        <select
                            className="filter-select"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            <option value="">All Countries</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 6h18M7 12h10M10 18h4"/>
                            </svg>
                            Sort By
                        </label>
                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="active-filters">
                        <span className="active-filters-label">Active filters:</span>
                        <div className="filter-tags">
                            {searchTerm.trim() && (
                                <span className="filter-tag">
                                    Search: "{searchTerm}"
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="filter-tag-remove"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {selectedCountry && (
                                <span className="filter-tag">
                                    Country: {selectedCountry}
                                    <button
                                        onClick={() => setSelectedCountry('')}
                                        className="filter-tag-remove"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {sortBy !== 'name-asc' && (
                                <span className="filter-tag">
                                    Sort: {sortBy === 'name-desc' ? 'Z to A' : 'A to Z'}
                                    <button
                                        onClick={() => setSortBy('name-asc')}
                                        className="filter-tag-remove"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniversityFilter;