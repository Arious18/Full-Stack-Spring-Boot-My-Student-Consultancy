import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./FieldDetail.css";

function FieldDetail() {
    const { id } = useParams();
    const [field, setField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchField = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://deneme5-g63n.onrender.com/fields/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch field: ${response.status}`);
                }
                const data = await response.json();
                setField(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching field:', err);
                setError(`Failed to load field: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchField();
    }, [id]);

    if (loading) return <div className="cgr-loading">Loading...</div>;
    if (error) return <div className="cgr-error">{error}</div>;
    if (!field) return <div className="cgr-error">Field not found</div>;

    return (
        <div className="cgr-field-detail-container">
            <div className="cgr-field-detail-card">
                <div className="cgr-header">
                    <h1 className="cgr-title">{field.name}</h1>
                    <p className="cgr-subtitle">Field Details</p>
                </div>
                <div className="cgr-image-container">
                    <img
                        src={field.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'}
                        alt={field.name}
                        className="cgr-image"
                        onError={(e) => { e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'; }}
                    />
                </div>
                <div className="cgr-content">
                    <p className="cgr-description">
                        {field.description || 'No description available'}
                    </p>
                    <div className="cgr-button-group">
                        <button
                            className="cgr-button"
                            onClick={() => navigate('/apply')}
                        >
                            Apply Now
                        </button>
                        <button
                            className="cgr-button"
                            onClick={() => navigate(`/fields/${field.facultyId}`)}
                        >
                            Back to Fields
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FieldDetail;