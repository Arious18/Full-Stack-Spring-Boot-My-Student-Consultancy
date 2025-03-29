import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./UniversityDetail.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

function UniversityDetail() {
    const { id } = useParams();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/universities/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch university: ${response.status}`);
                }
                const data = await response.json();
                setUniversity(data);
                setError(null);
            } catch (err) {
                setError(`Failed to load university: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversity();
    }, [id]);

    if (loading) return <div className="cgr-loading">Loading...</div>;
    if (error) return <div className="cgr-error">{error}</div>;
    if (!university) return <div className="cgr-error">University not found</div>;

    return (
        <><Header/>
        <div className="cgr-university-detail-container">
            <div className="cgr-university-detail-card">
                <div className="cgr-header">
                    <h1 className="cgr-title">{university.name}</h1>
                    <p className="cgr-subtitle">University Details</p>
                </div>
                <div className="cgr-image-container">
                    <img
                        src={university.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'}
                        alt={university.name}
                        className="cgr-image"
                        onError={(e) => { e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'; }}
                    />
                </div>
                <div className="cgr-content">
                    <p className="cgr-description">
                        {university.description || 'No description available'}
                    </p>
                    <div className="cgr-button-group">
                        <button
                            className="cgr-button"
                            onClick={() => navigate(`/faculties/${id}`)}
                        >
                            View Faculties
                        </button>
                        <button
                            className="cgr-button"
                            onClick={() => navigate('/university')}
                        >
                            Back to Universities
                        </button>
                    </div>
                </div>
            </div>
        </div>
            <Footer/>
        </>
    );
}

export default UniversityDetail;