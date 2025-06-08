import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import './flag.css';

function Flag() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                console.log('Fetching countries...');
                const response = await fetch('http://localhost:8080/countries');

                if (!response.ok) {
                    throw new Error(`Failed to fetch countries: ${response.status}`);
                }

                const data = await response.json();
                console.log('Countries data received:', data);
                setCountries(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching countries:', err);
                setError(`Failed to load countries: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryClick = (countryId) => {
        console.log('Country clicked, navigating to:', `/country/${countryId}`);
        navigate(`/country/${countryId}`);
    };

    const handleSeeMoreClick = () => {
        console.log('See more countries clicked, navigating to country list');
        navigate('/countryList');
    };

    // Log render state
    console.log('Flag component render state:', {
        countriesCount: countries.length,
        loading,
        error
    });

    if (loading) return <div className="flagService-loading">Loading countries...</div>;
    if (error) return <div className="flagService-error">{error}</div>;
    if (!countries || countries.length === 0) return <div className="flagService-empty">No countries available</div>;

    // Limit to only 9 countries
    const displayedCountries = countries.slice(0, 9);

    return (
        <div className="flagService-fullwidth">
            <div className="flagService-container">
                <h2 className="flagService-main-title">Explore Countries</h2>
                <div className="flagService-grid">
                    {displayedCountries.map(country => {
                        console.log('Rendering country:', country);
                        return (
                            <a
                                key={country.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCountryClick(country.id);
                                }}
                                href="#"
                                className="flagService-card"
                                style={{
                                    backgroundImage: `url(${country.imageUrl || 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="flagService-overlay"></div>
                                <div className="flagService-content">
                                    <h3 className="flagService-title">{country.name}</h3>
                                    <p className="flagService-description">
                                        {country.description && country.description.length > 100
                                            ? `${country.description.substring(0, 100)}...`
                                            : country.description || 'No description available'}
                                    </p>
                                    <div className="flagService-button">
                                        Explore
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* See More Countries Button */}
                {countries.length > 9 && (
                    <div className="flagService-see-more-container">
                        <button
                            onClick={handleSeeMoreClick}
                            className="flagService-see-more-button"
                        >
                            <Globe className="see-more-icon" size={20} />
                            <span>See All {countries.length} Countries</span>
                            <ArrowRight className="see-more-arrow" size={20} />
                        </button>
                        <p className="flagService-see-more-text">
                            Discover all destinations and find your perfect travel experience
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Flag;