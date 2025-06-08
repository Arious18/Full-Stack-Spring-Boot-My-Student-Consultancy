import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './FieldsGrid.css';

function FieldsGrid() {
    const [fields, setFields] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { facultyId } = useParams();

    useEffect(() => {
        console.log('Faculty ID from params:', facultyId);

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch faculties for name lookup
                const facultiesResponse = await fetch('http://localhost:8080/faculties');
                if (!facultiesResponse.ok) {
                    throw new Error(`Failed to fetch faculties: ${facultiesResponse.status}`);
                }
                const facultiesData = await facultiesResponse.json();
                setFaculties(facultiesData);

                // Fetch fields (either all or for a specific faculty)
                let fieldsUrl = facultyId
                    ? `http://localhost:8080/fields/faculty/${facultyId}`
                    : 'http://localhost:8080/fields';
                console.log('Fetching fields from:', fieldsUrl);
                const fieldsResponse = await fetch(fieldsUrl);
                if (!fieldsResponse.ok) {
                    throw new Error(`Failed to fetch fields: ${fieldsResponse.status}`);
                }
                const fieldsData = await fieldsResponse.json();
                console.log('Fetched fields:', fieldsData);

                if (!Array.isArray(fieldsData)) {
                    throw new Error('Invalid fields data format');
                }

                setFields(fieldsData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(`Failed to load fields: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [facultyId]);

    const getFacultyName = (facultyId) => {
        const faculty = faculties.find(fac =>
            fac.id === parseInt(facultyId) || fac.id === facultyId
        );
        return faculty ? faculty.name : 'Unknown Faculty';
    };

    const handleBackToFaculties = () => {
        if (facultyId) {
            const currentFaculty = faculties.find(f =>
                f.id === parseInt(facultyId) || f.id === facultyId
            );
            if (currentFaculty && currentFaculty.universityId) {
                navigate(`/faculties/${currentFaculty.universityId}`);
            } else {
                navigate('/university');
            }
        } else {
            navigate('/university');
        }
    };

    const formatPrice = (price) => {
        if (price === undefined || price === null) return '0';
        return price.toLocaleString();
    };

    const getDisplayPrice = (field) => {
        // If there's a discount price and it's less than the regular price, use it
        if (field.discountPrice && field.discountPrice < field.price) {
            return field.discountPrice;
        }
        return field.price;
    };

    return (
        <div className="FiGr-cards-list-container">
            <header className="FiGr-cards-header">
                <div className="FiGr-header-content">
                    <h1 className="FiGr-main-title">
                        {facultyId ? `Fields of ${getFacultyName(facultyId)}` : 'All Fields'}
                    </h1>
                    <button className="FiGr-see-more-btn" onClick={handleBackToFaculties}>
                        Back to {facultyId ? 'Faculties' : 'Universities'}
                    </button>
                </div>
            </header>

            <div className="FiGr-component-container">
                <h2 className="FiGr-section-title">Available Fields</h2>

                {loading && (
                    <div className="FiGr-loading">
                        <p>Loading fields...</p>
                    </div>
                )}

                {error && (
                    <div className="FiGr-error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="FiGr-cards-grid">
                        {fields.map(field => (
                            <div key={field.id} className="FiGr-card">
                                <div className="FiGr-card-content">
                                    <h3 className="FiGr-card-title">{field.name}</h3>

                                    <div className="FiGr-info-items">
                                        {/* Deposit */}
                                        <div className="FiGr-info-item">
                                            <svg className="FiGr-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                            <span className="FiGr-info-label">
                                                Depozit: {formatPrice(field.deposit)}$
                                            </span>
                                        </div>

                                        {/* Language */}
                                        <div className="FiGr-info-item">
                                            <svg className="FiGr-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                            </svg>
                                            <span className="FiGr-info-label">
                                                {field.language || 'Turkish'}  %{field.languagePercentage || 100}
                                            </span>
                                        </div>

                                        {/* Duration */}
                                        <div className="FiGr-info-item">
                                            <svg className="FiGr-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            <span className="FiGr-info-label">
                                                {field.duration || 4} Yıl
                                            </span>
                                        </div>
                                    </div>

                                    <div className="FiGr-action-section">
                                        <div className="FiGr-price-display">
                                            {field.discountPrice && field.discountPrice < field.price ? (
                                                <>
                                                    <span className="FiGr-original-price">
                                                        {formatPrice(field.price)},00 $
                                                    </span>
                                                    {formatPrice(field.discountPrice)},00 $
                                                </>
                                            ) : (
                                                `${formatPrice(field.price)},00 $`
                                            )}
                                        </div>
                                        <button className="FiGr-apply-btn" onClick={() => navigate('/apply')}>
                                            ŞİMDİ BAŞVUR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && fields.length === 0 && (
                    <div className="FiGr-no-results">
                        <p>No fields found{facultyId ? ' for this faculty' : ''}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FieldsGrid;