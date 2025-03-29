import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './FacultiesGrid.css';

function FacultiesGrid() {
    const [faculties, setFaculties] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { universityId } = useParams();

    useEffect(() => {
        console.log('University ID from params:', universityId);

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch universities for name lookup
                const universitiesResponse = await fetch('http://localhost:8080/universities');
                if (!universitiesResponse.ok) {
                    throw new Error(`Failed to fetch universities: ${universitiesResponse.status}`);
                }
                const universitiesData = await universitiesResponse.json();
                setUniversities(universitiesData);

                // Fetch faculties (either all or for a specific university)
                let facultiesUrl = universityId
                    ? `http://localhost:8080/faculties/university/${universityId}`
                    : 'http://localhost:8080/faculties';
                console.log('Fetching faculties from:', facultiesUrl);
                const facultiesResponse = await fetch(facultiesUrl);
                if (!facultiesResponse.ok) {
                    throw new Error(`Failed to fetch faculties: ${facultiesResponse.status}`);
                }
                const facultiesData = await facultiesResponse.json();
                console.log('Faculties response:', facultiesData);

                if (!Array.isArray(facultiesData)) {
                    throw new Error('Invalid faculties data format');
                }

                const formattedFaculties = facultiesData.map(faculty => ({
                    ...faculty,
                    imageUrl: faculty.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg',
                    description: faculty.description && faculty.description.length > 150
                        ? faculty.description.substring(0, 150) + '...'
                        : faculty.description || 'No description available'
                }));

                setFaculties(formattedFaculties);
                setError(null);
            } catch (err) {
                console.error('Error in FacultiesGrid:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [universityId]);

    const getUniversityName = (universityId) => {
        const university = universities.find(uni => uni.id === universityId);
        return university ? university.name : 'Unknown University';
    };

    return (
        <div className="fg-cards-list-container">
            <header className="fg-cards-header">
                <div className="fg-header-content">
                    <h1 className="fg-main-title">
                        {universityId ? `Faculties of ${getUniversityName(universityId)}` : 'All Faculties'}
                    </h1>
                    <button className="fg-see-more-btn" onClick={() => navigate('/university')}>
                        Back to Universities
                    </button>
                </div>
            </header>

            <div className="fg-component-container">
                <h2 className="fg-section-title">Available Faculties</h2>

                {loading && (
                    <div className="fg-loading">
                        <p>Loading faculties...</p>
                    </div>
                )}

                {error && (
                    <div className="fg-error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="fg-cards-grid">
                        {faculties.map(faculty => (
                            <div key={faculty.id} className="fg-card">
                                <div className="fg-card-image-container">
                                    <img
                                        src={faculty.imageUrl}
                                        alt={faculty.name}
                                        className="fg-card-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
                                        }}
                                    />
                                </div>
                                <div className="fg-card-content">
                                    <h3 className="fg-card-title">{faculty.name}</h3>
                                    <p className="fg-card-university">
                                        University: {getUniversityName(faculty.universityId)}
                                    </p>
                                    <p className="fg-card-description">{faculty.description}</p>
                                    {faculty.price !== undefined && (
                                        <div className="fg-card-price">
                                            <span className="fg-price-label">Price:</span>
                                            <span className="fg-price-value">${faculty.price.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <button
                                        className="fg-learn-more-btn"
                                        onClick={() => navigate(`/fields/${faculty.id}`)}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && faculties.length === 0 && (
                    <div className="fg-no-results">
                        <p>No faculties found{universityId ? ' for this university' : ''}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FacultiesGrid;
