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
                setError(null);

                console.log('Fetching field with ID:', id);

                // Try multiple possible endpoints
                const endpoints = [
                    `http://localhost:8080/fields/${id}`,
                    `http://localhost:8080/api/fields/${id}`
                ];

                let lastError = null;

                for (const endpoint of endpoints) {
                    try {
                        console.log(`Trying endpoint: ${endpoint}`);
                        const response = await fetch(endpoint);

                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                        }

                        const data = await response.json();
                        console.log('Field data received:', data);
                        setField(data);
                        setError(null);
                        return; // Success, exit the loop

                    } catch (endpointError) {
                        console.log(`Endpoint ${endpoint} failed:`, endpointError.message);
                        lastError = endpointError;
                        continue;
                    }
                }

                // If we get here, all endpoints failed
                throw lastError || new Error('All field endpoints failed');

            } catch (err) {
                console.error('Error fetching field:', err);
                setError(`Failed to load field: ${err.message}`);
                setField(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchField();
        } else {
            setError('No field ID provided');
            setLoading(false);
        }
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="FiDe-field-detail-container">
                <div className="FiDe-loading">
                    <div>Loading field details...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="FiDe-field-detail-container">
                <div className="FiDe-error">
                    <div>
                        <h2>Error Loading Field</h2>
                        <p>{error}</p>
                        <button
                            className="FiDe-button"
                            onClick={() => navigate(-1)}
                            style={{ marginTop: '1rem', maxWidth: '200px' }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No field found state
    if (!field) {
        return (
            <div className="FiDe-field-detail-container">
                <div className="FiDe-error">
                    <div>
                        <h2>Field Not Found</h2>
                        <p>The requested field could not be found.</p>
                        <button
                            className="FiDe-button"
                            onClick={() => navigate(-1)}
                            style={{ marginTop: '1rem', maxWidth: '200px' }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main content
    return (
        <div className="FiDe-field-detail-container">
            <div className="FiDe-field-detail-card">
                <div className="FiDe-header">
                    <h1 className="FiDe-title">{field.name || 'Untitled Field'}</h1>
                    <p className="FiDe-subtitle">Field of Study Details</p>
                </div>

                <div className="FiDe-image-container">
                    <img
                        src={field.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'}
                        alt={field.name || 'Field image'}
                        className="FiDe-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
                        }}
                    />
                </div>

                <div className="FiDe-content">
                    <div className="FiDe-description">
                        {field.description || 'No description available for this field of study.'}
                    </div>

                    {/* Additional field information if available */}
                    {field.about && (
                        <div className="FiDe-about-section">
                            <h3 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1.125rem' }}>About This Field</h3>
                            <p style={{ color: '#666', lineHeight: '1.5' }}>
                                {field.about}
                            </p>
                        </div>
                    )}

                    <div className="FiDe-button-group">
                        <button
                            className="FiDe-button"
                            onClick={() => navigate('/apply')}
                            type="button"
                        >
                            Apply Now
                        </button>
                        <button
                            className="FiDe-button"
                            onClick={() => {
                                // Navigate back to the previous page or to fields list
                                if (field.facultyId) {
                                    navigate(`/faculties/${field.facultyId}`);
                                } else {
                                    navigate('/fields');
                                }
                            }}
                            type="button"
                        >
                            {field.facultyId ? 'Back to Faculty' : 'Back to Fields'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FieldDetail;