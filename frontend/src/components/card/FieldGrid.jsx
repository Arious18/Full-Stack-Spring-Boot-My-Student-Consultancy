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
                const facultiesResponse = await fetch('https://deneme5-g63n.onrender.com/faculties');
                if (!facultiesResponse.ok) {
                    throw new Error(`Failed to fetch faculties: ${facultiesResponse.status}`);
                }
                const facultiesData = await facultiesResponse.json();
                setFaculties(facultiesData);

                // Fetch fields (either all or for a specific faculty)
                let fieldsUrl = facultyId
                    ? `https://deneme5-g63n.onrender.com/fields/faculty/${facultyId}`
                    : 'https://deneme5-g63n.onrender.com/fields';
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

                const formattedFields = fieldsData.map(field => ({
                    ...field,
                    imageUrl: field.imageUrl || 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg'
                }));

                setFields(formattedFields);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(`Failed to load fields: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Always fetch data, regardless of facultyId
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
                navigate('/university'); // Fallback
            }
        } else {
            navigate('/university'); // If no facultyId, go to universities list
        }
    };

    return (
        <div className="fld-cards-list-container">
            <header className="fld-cards-header">
                <div className="fld-header-content">
                    <h1 className="fld-main-title">
                        {facultyId ? `Fields of ${getFacultyName(facultyId)}` : 'All Fields'}
                    </h1>
                    <button className="fld-see-more-btn" onClick={handleBackToFaculties}>
                        Back to {facultyId ? 'Faculties' : 'Universities'}
                    </button>
                </div>
            </header>

            <div className="fld-component-container">
                <h2 className="fld-section-title">Available Fields</h2>

                {loading && (
                    <div className="fld-loading">
                        <p>Loading fields...</p>
                    </div>
                )}

                {error && (
                    <div className="fld-error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="fld-cards-grid">
                        {fields.map(field => (
                            <div key={field.id} className="fld-card">
                                <div className="fld-card-image-container">
                                    <img
                                        src={field.imageUrl}
                                        alt={field.name}
                                        className="fld-card-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/error.jpeg';
                                        }}
                                    />
                                </div>
                                <div className="fld-card-content">
                                    <h3 className="fld-card-title">{field.name}</h3>
                                    <p className="fld-card-faculty">
                                        Faculty: {getFacultyName(field.facultyId)}
                                    </p>
                                    <p className="fld-card-description">{field.description}</p>
                                    {field.price !== undefined && (
                                        <div className="fld-card-price">
                                            <span className="fld-price-label">Price:</span>
                                            <span className="fld-price-value">${field.price.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <button
                                        className="fld-learn-more-btn"
                                        onClick={() => navigate('/apply')}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && fields.length === 0 && (
                    <div className="fld-no-results">
                        <p>No fields found{facultyId ? ' for this faculty' : ''}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FieldsGrid;