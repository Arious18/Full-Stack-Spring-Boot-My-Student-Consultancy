import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import './style.css';

function FieldList() {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facultyMap, setFacultyMap] = useState({});
    const [universityMap, setUniversityMap] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch all fields with correct URL
                const fieldResponse = await axios.get('http://localhost:8080/fields');
                console.log('Fields data received:', fieldResponse.data);

                // Fetch all faculties for mapping with correct URL
                const facultyResponse = await axios.get('http://localhost:8080/faculties');
                console.log('Faculties data received:', facultyResponse.data);

                const facultyData = facultyResponse.data.reduce((acc, faculty) => {
                    acc[faculty.id] = faculty;
                    return acc;
                }, {});

                setFacultyMap(facultyData);

                // Fetch all universities for mapping with correct URL
                const universityResponse = await axios.get('http://localhost:8080/universities');
                console.log('Universities data received:', universityResponse.data);

                const universityData = universityResponse.data.reduce((acc, university) => {
                    acc[university.id] = university;
                    return acc;
                }, {});

                setUniversityMap(universityData);

                // Sort fields alphabetically by name
                const sortedFields = fieldResponse.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setFields(sortedFields);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(t('errorFetchingData') || 'Failed to load fields. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [t]);

    const handleFieldClick = (id) => {
        navigate(`/field/${id}`);
    };

    // Parse JSON language string to display languages
    const parseLanguages = (languagesJson) => {
        if (!languagesJson) return '';

        try {
            const languagesArray = JSON.parse(languagesJson);
            return Array.isArray(languagesArray)
                ? languagesArray.join(', ')
                : languagesJson;
        } catch (error) {
            console.warn('Error parsing languages JSON:', error);
            return languagesJson;
        }
    };

    if (loading) return <div className="list-loading">{t('loading') || 'Loading...'}</div>;
    if (error) return <div className="list-error">{error}</div>;

    return (
        <div className="university-page-wrapper">
            <Header />
            <div className="list-container">
                <h2 className="list-title">{t('fields') || 'Fields'}</h2>
                <div className="list-wrapper">
                    {fields.length === 0 ? (
                        <p className="list-empty">{t('noFieldsFound') || 'No fields found'}</p>
                    ) : (
                        fields.map((field) => {
                            const faculty = facultyMap[field.facultyId] || {};
                            const university = universityMap[faculty.universityId] || {};
                            return (
                                <div
                                    key={field.id}
                                    className="list-item"
                                    onClick={() => handleFieldClick(field.id)}
                                >
                                    <div className="list-item-content">
                                        <div className="list-item-image-container">
                                            {field.imageUrl ? (
                                                <img
                                                    src={field.imageUrl}
                                                    alt={field.name}
                                                    className="list-item-image"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Field';
                                                    }}
                                                />
                                            ) : (
                                                <div className="list-item-image-placeholder">
                                                    {field.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="list-item-details">
                                            <h3 className="list-item-name">{field.name}</h3>
                                            <p className="list-item-faculty">
                                                {faculty.name || t('unknownFaculty') || 'Unknown Faculty'}
                                            </p>
                                            <p className="list-item-university">
                                                {university.name || t('unknownUniversity') || 'Unknown University'}
                                            </p>
                                            <p className="list-item-country">
                                                {university.country ? university.country.name : (t('noCountry') || 'No Country')}
                                            </p>
                                            {field.languages && (
                                                <p className="list-item-languages">
                                                    {parseLanguages(field.languages) || (t('noLanguages') || 'No Languages')}
                                                </p>
                                            )}
                                            {field.price && (
                                                <div className="list-item-price-container">
                                                    {field.discountPrice && field.discountPrice < field.price ? (
                                                        <>
                                                            <span className="list-item-price-original">${field.price.toLocaleString()}</span>
                                                            <span className="list-item-price-discount">${field.discountPrice.toLocaleString()}</span>
                                                        </>
                                                    ) : (
                                                        <span className="list-item-price">${field.price.toLocaleString()}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="list-item-actions">
                                        <button
                                            className="list-item-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/apply');
                                            }}
                                        >
                                            {t('apply') || 'Apply Now'}
                                        </button>
                                        <button
                                            className="list-item-button secondary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFieldClick(field.id);
                                            }}
                                        >
                                            {t('details') || 'Details'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FieldList;