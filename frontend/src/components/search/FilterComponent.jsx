import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, SortAsc } from 'lucide-react';
import './FilterComponent.css';

const FilterComponent = ({ results, onFilterChange, activeFilters = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        types: [],
        countries: [],
        sortBy: 'relevance',
        ...activeFilters
    });

    // Extract unique countries from all result types
    const getUniqueCountries = () => {
        if (!results) return [];

        const countries = new Set();

        // From universities
        results.universities?.forEach(uni => {
            if (uni.country) {
                const countryName = typeof uni.country === 'object' ? uni.country.name : uni.country;
                if (countryName) countries.add(countryName);
            }
        });

        // From faculties
        results.faculties?.forEach(faculty => {
            if (faculty.country) {
                const countryName = typeof faculty.country === 'object' ? faculty.country.name : faculty.country;
                if (countryName) countries.add(countryName);
            }
        });

        // From fields
        results.fields?.forEach(field => {
            if (field.country) {
                const countryName = typeof field.country === 'object' ? field.country.name : field.country;
                if (countryName) countries.add(countryName);
            }
        });

        // From countries themselves
        results.countries?.forEach(country => {
            const countryName = typeof country === 'object' ? country.name : country;
            if (countryName) countries.add(countryName);
        });

        return Array.from(countries).sort();
    };

    // Get result counts by type
    const getResultCounts = () => {
        if (!results) return {};

        return {
            university: results.universities?.length || 0,
            faculty: results.faculties?.length || 0,
            field: results.fields?.length || 0,
            country: results.countries?.length || 0
        };
    };

    const resultCounts = getResultCounts();
    const uniqueCountries = getUniqueCountries();

    // Sort options
    const sortOptions = [
        { value: 'relevance', label: 'Most Relevant' },
        { value: 'name_asc', label: 'Name (A-Z)' },
        { value: 'name_desc', label: 'Name (Z-A)' },
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' }
    ];

    // Type options with counts
    const typeOptions = [
        { value: 'university', label: 'Universities', count: resultCounts.university },
        { value: 'faculty', label: 'Faculties', count: resultCounts.faculty },
        { value: 'field', label: 'Fields', count: resultCounts.field },
        { value: 'country', label: 'Countries', count: resultCounts.country }
    ].filter(option => option.count > 0);

    useEffect(() => {
        onFilterChange(localFilters);
    }, [localFilters, onFilterChange]);

    const handleTypeChange = (type) => {
        setLocalFilters(prev => ({
            ...prev,
            types: prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type]
        }));
    };

    const handleCountryChange = (country) => {
        setLocalFilters(prev => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter(c => c !== country)
                : [...prev.countries, country]
        }));
    };

    const handleSortChange = (sortBy) => {
        setLocalFilters(prev => ({
            ...prev,
            sortBy
        }));
    };

    const clearFilters = () => {
        setLocalFilters({
            types: [],
            countries: [],
            sortBy: 'relevance'
        });
    };

    const getActiveFilterCount = () => {
        return localFilters.types.length + localFilters.countries.length +
            (localFilters.sortBy !== 'relevance' ? 1 : 0);
    };

    const hasActiveFilters = getActiveFilterCount() > 0;

    return (
        <div className="filter-component">
            <button
                className={`filter-toggle ${isOpen ? 'active' : ''} ${hasActiveFilters ? 'has-filters' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Filter size={18} />
                <span>Filters</span>
                {hasActiveFilters && (
                    <span className="filter-count">{getActiveFilterCount()}</span>
                )}
                <ChevronDown size={16} className={`chevron ${isOpen ? 'rotated' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="filter-overlay" onClick={() => setIsOpen(false)} />
                    <div className="filter-dropdown">
                        <div className="filter-header">
                            <h3>Filter Results</h3>
                            {hasActiveFilters && (
                                <button className="clear-filters" onClick={clearFilters}>
                                    <X size={16} />
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="filter-content">
                            {/* Sort Section */}
                            <div className="filter-section">
                                <div className="filter-section-header">
                                    <SortAsc size={16} />
                                    <h4>Sort By</h4>
                                </div>
                                <div className="filter-options">
                                    {sortOptions.map(option => (
                                        <label key={option.value} className="filter-option">
                                            <input
                                                type="radio"
                                                name="sortBy"
                                                value={option.value}
                                                checked={localFilters.sortBy === option.value}
                                                onChange={() => handleSortChange(option.value)}
                                            />
                                            <span className="filter-option-label">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Type Filter Section */}
                            {typeOptions.length > 1 && (
                                <div className="filter-section">
                                    <div className="filter-section-header">
                                        <h4>Content Type</h4>
                                    </div>
                                    <div className="filter-options">
                                        {typeOptions.map(option => (
                                            <label key={option.value} className="filter-option">
                                                <input
                                                    type="checkbox"
                                                    checked={localFilters.types.includes(option.value)}
                                                    onChange={() => handleTypeChange(option.value)}
                                                />
                                                <span className="filter-option-label">
                                                    {option.label}
                                                    <span className="filter-option-count">({option.count})</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Country Filter Section */}
                            {uniqueCountries.length > 0 && (
                                <div className="filter-section">
                                    <div className="filter-section-header">
                                        <h4>Country</h4>
                                    </div>
                                    <div className="filter-options country-options">
                                        {uniqueCountries.map(country => (
                                            <label key={country} className="filter-option">
                                                <input
                                                    type="checkbox"
                                                    checked={localFilters.countries.includes(country)}
                                                    onChange={() => handleCountryChange(country)}
                                                />
                                                <span className="filter-option-label">{country}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterComponent;