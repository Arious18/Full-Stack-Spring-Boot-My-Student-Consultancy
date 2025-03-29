import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
            const response = await fetch(`${baseUrl}/universities`);
            if (!response.ok) {
                throw new Error(`Failed to fetch universities: ${response.status}`);
            }
            const universitiesData = await response.json();
            console.log('Fetched universities:', universitiesData);

            if (!Array.isArray(universitiesData)) {
                throw new Error('Invalid universities data format');
            }

            const formattedData = universitiesData.map(university => ({
                ...university,
                imageUrl: university.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'
            }));

            setUniversities(formattedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Failed to load universities: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getEffectivePrice = (university) => {
        return university.discountPrice && university.discountPrice < university.yearlyPrice
            ? university.discountPrice
            : university.yearlyPrice;
    };

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
                    </div>
                )}

                {error && (
                    <div className="cg-error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="cg-cards-grid">
                        {universities.map(university => (
                            <div key={university.id} className="cg-card">
                                <div className="cg-card-image-container">
                                    <img
                                        src={university.imageUrl}
                                        alt={university.name}
                                        className="cg-card-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default UniversitiesGrid;