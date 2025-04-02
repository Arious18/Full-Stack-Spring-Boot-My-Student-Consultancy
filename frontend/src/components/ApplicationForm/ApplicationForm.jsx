import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header.jsx";
import "./ApplicationForm.css";
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const ApplicationForm = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        middleName: "",
        dateOfBirth: "",
        uniqueId: "",
        fatherName: "",
        motherName: "",
        gender: "",
        chosenUniversity: "",
        chosenFaculty: "",
        chosenField: "",
        finishedSchool: "",
        contactInfo: "",
        applicationCountry: "",
        customFieldName: "",
    });
    const [file, setFile] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [fields, setFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFieldsLoading, setIsFieldsLoading] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ru', name: 'Русский' },
        { code: 'tk', name: 'Türkmen' },
        { code: 'tr', name: 'Türkçe' }
    ];

    // Fetch universities on mount
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                setError(null);
                const response = await axios.get("https://deneme5-g63n.onrender.com/universities");
                setUniversities(response.data);
            } catch (err) {
                console.error("Error fetching universities:", err);
                setError(t("updateProfileError"));
            }
        };
        fetchUniversities();
    }, [t]);

    // Fetch faculties when university changes
    useEffect(() => {
        if (formData.chosenUniversity) {
            const fetchFaculties = async () => {
                try {
                    setError(null);
                    const response = await axios.get(
                        `https://deneme5-g63n.onrender.com/faculties/university/${formData.chosenUniversity}`
                    );
                    if (Array.isArray(response.data)) {
                        setFaculties(response.data);
                        setFormData((prev) => ({
                            ...prev,
                            chosenFaculty: "",
                            chosenField: "",
                        }));
                        setFields([]);
                    } else {
                        throw new Error("Invalid faculty data format");
                    }
                } catch (err) {
                    console.error("Error fetching faculties:", err);
                    setError(t("updateProfileError"));
                    setFaculties([]);
                }
            };
            fetchFaculties();
        }
    }, [formData.chosenUniversity, t]);

    // Fetch fields when faculty changes
    useEffect(() => {
        if (formData.chosenFaculty) {
            const fetchFields = async () => {
                try {
                    setError(null);
                    setIsFieldsLoading(true);
                    const response = await axios.get(
                        `https://deneme5-g63n.onrender.com/fields/faculty/${formData.chosenFaculty}`,
                        { timeout: 10000 }
                    );

                    if (Array.isArray(response.data)) {
                        setFields(response.data);
                    } else {
                        setFields([{ id: "manual-entry", name: t("other") }]);
                    }
                    setFormData((prev) => ({ ...prev, chosenField: "" }));
                } catch (err) {
                    console.error("Error fetching fields:", err);
                    setError(t("updateProfileError"));
                    setFields([{ id: "manual-entry", name: t("other") }]);
                } finally {
                    setIsFieldsLoading(false);
                }
            };
            fetchFields();
        } else {
            setFields([]);
        }
    }, [formData.chosenFaculty, t]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "chosenField" && value === "manual-entry") {
            setFormData((prev) => ({ ...prev, chosenField: "custom-field" }));
        }
    };

    const handleCustomFieldChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            customFieldName: value,
            chosenField: "custom-field"
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (
            selectedFile &&
            (selectedFile.type === "application/pdf" || selectedFile.type.startsWith("image/"))
        ) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError(t("updateProfileError"));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = [
            "name",
            "surname",
            "dateOfBirth",
            "uniqueId",
            "gender",
            "chosenUniversity",
            "chosenFaculty",
            "contactInfo",
            "applicationCountry",
        ];

        if (formData.chosenField !== "custom-field") {
            requiredFields.push("chosenField");
        } else if (!formData.customFieldName) {
            setError(t("updateProfileError"));
            return;
        }

        if (requiredFields.some((field) => !formData[field])) {
            setError(t("updateProfileError"));
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formDataToSend = new FormData();
            const dataToSend = { ...formData };
            if (formData.chosenField === "custom-field" && formData.customFieldName) {
                dataToSend.chosenField = formData.customFieldName;
            }

            Object.keys(dataToSend).forEach((key) => {
                if (dataToSend[key] && key !== 'customFieldName') {
                    formDataToSend.append(key, dataToSend[key]);
                }
            });

            if (file) formDataToSend.append("file", file);

            const response = await axios.post("https://deneme5-g63n.onrender.com/applications", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess(t("saveChanges"));
            setFormData({
                name: "",
                surname: "",
                middleName: "",
                dateOfBirth: "",
                uniqueId: "",
                fatherName: "",
                motherName: "",
                gender: "",
                chosenUniversity: "",
                chosenFaculty: "",
                chosenField: "",
                finishedSchool: "",
                contactInfo: "",
                applicationCountry: "",
                customFieldName: "",
            });
            setFile(null);
        } catch (err) {
            setError(t("updateProfileError"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            surname: "",
            middleName: "",
            dateOfBirth: "",
            uniqueId: "",
            fatherName: "",
            motherName: "",
            gender: "",
            chosenUniversity: "",
            chosenFaculty: "",
            chosenField: "",
            finishedSchool: "",
            contactInfo: "",
            applicationCountry: "",
            customFieldName: "",
        });
        setFile(null);
        setError(null);
        setSuccess(null);
    };

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
        setShowLanguageMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showLanguageMenu && !event.target.closest('.language-dropdown')) {
                setShowLanguageMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLanguageMenu]);

    return (
        <>
            <Header />
            <div className="af-container">
                <header className="af-form-header">
                    <h1 className="af-main-title">{t('application')}</h1>
                    {/* Language Dropdown */}
                    <div className="language-dropdown" style={{ position: 'absolute', right: '20px', top: '20px' }}>
                        <button
                            className="af-icon-btn language-trigger"
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            style={{ display: 'flex', alignItems: 'center', padding: '5px 10px' }}
                        >
                            <Globe size={20} />
                            <ChevronDown size={16} style={{ marginLeft: '5px' }} />
                        </button>
                        {showLanguageMenu && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    background: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    zIndex: 1000
                                }}
                            >
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '8px 16px',
                                            textAlign: 'left',
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </header>
                <div className="af-form-container">
                    {error && <div className="af-error">{error}</div>}
                    {success && <div className="af-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('firstName')} *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('firstName')}
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('lastName')} *</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('lastName')}
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('middleName')}</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('middleName')}
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('dateOfBirth')} *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="af-form-input"
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('uniqueId')} *</label>
                            <input
                                type="text"
                                name="uniqueId"
                                value={formData.uniqueId}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('uniqueId')}
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('fatherName')}</label>
                            <input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('fatherName')}
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('motherName')}</label>
                            <input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('motherName')}
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('gender')} *</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="af-form-select"
                                required
                            >
                                <option value="" disabled>{t('selectGender')}</option>
                                <option value="Male">{t('male')}</option>
                                <option value="Female">{t('female')}</option>
                                <option value="Other">{t('other')}</option>
                            </select>
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('university')} *</label>
                            <select
                                name="chosenUniversity"
                                value={formData.chosenUniversity}
                                onChange={handleInputChange}
                                className="af-form-select"
                                required
                            >
                                <option value="" disabled>{t('selectUniversity')}</option>
                                {universities.map((uni) => (
                                    <option key={uni.id} value={uni.id}>
                                        {uni.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('chosenFaculty')} *</label>
                            <select
                                name="chosenFaculty"
                                value={formData.chosenFaculty}
                                onChange={handleInputChange}
                                className="af-form-select"
                                required
                                disabled={!formData.chosenUniversity || faculties.length === 0}
                            >
                                <option value="" disabled>{t('selectFaculty')}</option>
                                {faculties.map((fac) => (
                                    <option key={fac.id} value={fac.id}>
                                        {fac.name}
                                    </option>
                                ))}
                            </select>
                            {formData.chosenUniversity && faculties.length === 0 && !error && (
                                <div className="af-hint">{t('loadingProfile')}</div>
                            )}
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('chosenField')} *</label>
                            <select
                                name="chosenField"
                                value={formData.chosenField}
                                onChange={handleInputChange}
                                className="af-form-select"
                                required={formData.chosenField !== "custom-field"}
                                disabled={!formData.chosenFaculty || (fields.length === 0 && isFieldsLoading)}
                            >
                                <option value="" disabled>{t('selectField')}</option>
                                {fields.map((field) => (
                                    <option key={field.id || field._id || field.name} value={field.id || field._id || field.name}>
                                        {field.name}
                                    </option>
                                ))}
                            </select>
                            {formData.chosenFaculty && isFieldsLoading && (
                                <div className="af-hint">{t('loadingProfile')}</div>
                            )}
                            {formData.chosenField === "custom-field" && (
                                <div className="af-form-group" style={{ marginTop: "10px" }}>
                                    <input
                                        type="text"
                                        name="customFieldName"
                                        value={formData.customFieldName || ""}
                                        onChange={handleCustomFieldChange}
                                        className="af-form-input"
                                        placeholder={t('enterField')}
                                        required
                                    />
                                </div>
                            )}
                            {formData.chosenFaculty && !isFieldsLoading && fields.length === 0 && (
                                <div className="af-form-group" style={{ marginTop: "10px" }}>
                                    <button
                                        type="button"
                                        className="af-alt-btn"
                                        onClick={() => {
                                            setFields([{ id: "manual-entry", name: t("other") }]);
                                        }}
                                    >
                                        {t('enterFieldManually')}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('finishedSchool')}</label>
                            <input
                                type="text"
                                name="finishedSchool"
                                value={formData.finishedSchool}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('finishedSchool')}
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('contactInfo')} *</label>
                            <input
                                type="text"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('contactInfo')}
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('applicationCountry')} *</label>
                            <input
                                type="text"
                                name="applicationCountry"
                                value={formData.applicationCountry}
                                onChange={handleInputChange}
                                className="af-form-input"
                                placeholder={t('applicationCountry')}
                                required
                            />
                        </div>
                        <div className="af-form-group">
                            <label className="af-form-label">{t('uploadDocument')}</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="af-form-input"
                                accept="application/pdf,image/*"
                            />
                        </div>
                        <div className="af-button-group">
                            <button type="button" onClick={handleCancel} className="af-cancel-btn">
                                {t('cancel')}
                            </button>
                            <button type="submit" disabled={isLoading} className="af-submit-btn">
                                {isLoading ? t('submitting') : t('submitApplication')}
                            </button>
                        </div>
                    </form>
                    {isLoading && (
                        <div className="af-loading-overlay">
                            <div>{t('submitting')}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ApplicationForm;