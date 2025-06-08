import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for better error handling
import './UniversitiesGrid.css';

function UniversitiesGrid() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:8080';

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching universities...');

            // Try multiple possible endpoints
            let response;
            try {
                // Try the primary endpoint first
                response = await axios.get(`${baseUrl}/universities`, {
                    timeout: 10000,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            } catch (firstError) {
                console.log('First endpoint failed, trying with /api prefix:', firstError.message);
                try {
                    // Try with /api prefix
                    response = await axios.get(`${baseUrl}/api/universities`, {
                        timeout: 10000,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (secondError) {
                    console.log('Second endpoint failed:', secondError.message);
                    throw secondError;
                }
            }

            const universitiesData = response.data;
            console.log('Fetched universities:', universitiesData);

            if (!Array.isArray(universitiesData)) {
                throw new Error('Invalid universities data format - expected array');
            }

            const formattedData = universitiesData.map(university => ({
                ...university,
                imageUrl: university.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/http-error-404-not-found.png'
            }));

            setUniversities(formattedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching universities:', err);

            let errorMessage = 'Failed to load universities';
            if (err.response) {
                // Server responded with error status
                errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
                if (err.response.status === 404) {
                    errorMessage = 'Universities endpoint not found. Please check if the backend server is running and the endpoint is correct.';
                } else if (err.response.status === 403) {
                    errorMessage = 'Access denied. Authentication may be required.';
                } else if (err.response.status === 500) {
                    errorMessage = 'Internal server error. Please check backend logs.';
                }
            } else if (err.request) {
                // Request was made but no response received
                errorMessage = 'Cannot connect to server. Please check if the backend server is running.';
            } else {
                // Something else happened
                errorMessage = `Request error: ${err.message}`;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getEffectivePrice = (university) => {
        return university.discountPrice && university.discountPrice < university.yearlyPrice
            ? university.discountPrice
            : university.yearlyPrice;
    };

    // Get only the first 8 universities for display
    const displayedUniversities = universities.slice(0, 8);

    return (
        <div className="cg-cards-list-container">
            <header className="cg-cards-header">
                <div className="cg-header-content">
                    <h1 className="cg-main-title">In mesgur universitetler</h1>
                    <button
                        className="cg-see-more-btn"
                        onClick={() => navigate('/university')}
                    >
                        See More
                    </button>
                </div>
            </header>

            <div className="cg-component-container">
                <h2 className="cg-section-title">Available Universities</h2>

                {loading && (
                    <div className="cg-loading">
                        <p>Loading universities...</p>
                        <div className="loading-spinner">⏳</div>
                    </div>
                )}

                {error && (
                    <div className="cg-error">
                        <p>{error}</p>
                        <button
                            onClick={fetchUniversities}
                            className="cg-retry-btn"
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="cg-cards-grid">
                        {displayedUniversities.map(university => (
                            <div key={university.id} className="cg-card">
                                <div className="cg-card-image-container">
                                    <img
                                        src={university.imageUrl}
                                        alt={university.name}
                                        className="cg-card-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/http-error-404-not-found.png';
                                        }}
                                    />
                                </div>
                                <div className="cg-card-content">
                                    <h3 className="cg-card-title">{university.name}</h3>
                                    <p className="cg-card-description">
                                        {university.description && university.description.length > 100
                                            ? `${university.description.substring(0, 100)}...`
                                            : university.description || 'No description available'}
                                    </p>
                                    {university.yearlyPrice !== undefined && (
                                        <div className="cg-card-price">
                                            <span className="cg-price-label">Price:</span>
                                            <span className="cg-price-value">${getEffectivePrice(university).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <button
                                        className="cg-learn-more-btn"
                                        onClick={() => navigate(`/faculties/${university.id}`)}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && universities.length === 0 && (
                    <div className="cg-no-results">
                        <p>No universities found.</p>
                        <button
                            onClick={fetchUniversities}
                            className="cg-retry-btn"
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#4f46e5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer'
                            }}
                        >
                            Refresh
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UniversitiesGrid;