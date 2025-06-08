import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
    User, Mail, Phone, Home, Globe, Cake, Info, Edit, Save, X, LogOut,
    Shield, Calendar, MapPin, UserCheck, AlertCircle, CheckCircle
} from 'lucide-react';
import './ProfilePage.css';
import { useAuth } from '../../Auth/components/AuthContext.jsx';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";

const ProfilePage = () => {
    const { t } = useTranslation();
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        address: '',
        nationality: '',
        dateOfBirth: '',
        gender: '',
        bio: ''
    });

    // API Base URL - Use environment variable or fallback to localhost
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setProfileData({
            ...user,
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            nationality: user.nationality || '',
            dateOfBirth: user.dateOfBirth || '',
            gender: user.gender || '',
            bio: user.bio || ''
        });

        fetchUserProfile();
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Use the same base URL for consistency
            const response = await axios.put(`${API_BASE_URL}/auth/${user.id}`, editData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const updatedData = {
                ...profileData,
                ...response.data
            };
            setProfileData(updatedData);

            if (updateUser) {
                updateUser(updatedData);
            }

            setIsEditing(false);
            setSuccess('Profile updated successfully!');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.data) {
                const userData = {
                    phoneNumber: '',
                    address: '',
                    nationality: '',
                    dateOfBirth: null,
                    surname: '',
                    bio: '',
                    ...profileData,
                    ...response.data
                };
                setProfileData(userData);

                setEditData({
                    name: userData.name || '',
                    surname: userData.surname || '',
                    email: userData.email || '',
                    phoneNumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    nationality: userData.nationality || '',
                    dateOfBirth: userData.dateOfBirth
                        ? new Date(userData.dateOfBirth).toISOString().split('T')[0]
                        : '',
                    gender: userData.gender || '',
                    bio: userData.bio || ''
                });
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to load profile data');
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccess('');
        if (profileData) {
            setEditData({
                name: profileData.name || '',
                surname: profileData.surname || '',
                email: profileData.email || '',
                phoneNumber: profileData.phoneNumber || '',
                address: profileData.address || '',
                nationality: profileData.nationality || '',
                dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().split('T')[0] : '',
                gender: profileData.gender || '',
                bio: profileData.bio || ''
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        if (logout) {
            logout();
        } else {
            localStorage.clear();
        }
        navigate('/');
    };

    const formatDate = (dateString) => {
        if (!dateString) return t('notProvided');
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return t('notProvided');
        }
    };

    const calculateProfileCompletion = () => {
        if (!profileData) return 0;
        const fields = [
            profileData.name,
            profileData.surname,
            profileData.email,
            profileData.phoneNumber,
            profileData.address,
            profileData.nationality,
            profileData.dateOfBirth,
            profileData.gender,
            profileData.bio
        ];
        const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };

    if (loading && !profileData) {
        return (
            <>
                <Header />
                <div className="PfP-page">
                    <div className="PfP-container">
                        <div className="PfP-loading">
                            <div className="PfP-spinner"></div>
                            <p className="PfP-loading-text">{t('loadingProfile')}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const profileCompletion = calculateProfileCompletion();
    const isAdmin = profileData?.roles?.includes('ADMIN');

    return (
        <>
            <Header />
            <div className="PfP-page">
                <div className="PfP-container">
                    <div className="PfP-header">
                        <div>
                            <h1 className="PfP-header-title">
                                {isEditing ? t('editProfile') : t('userProfile')}
                            </h1>
                            <p className="PfP-header-subtitle">
                                {isEditing
                                    ? 'Update your personal information and preferences'
                                    : 'Manage your account settings and personal information'
                                }
                            </p>
                        </div>
                        {!isEditing ? (
                            <button className="PfP-button PfP-button-edit" onClick={handleEdit}>
                                <Edit size={20} />
                                {t('editProfile')}
                            </button>
                        ) : (
                            <div className="PfP-edit-actions">
                                <button className="PfP-button PfP-button-cancel" onClick={handleCancel}>
                                    <X size={20} />
                                    {t('cancel')}
                                </button>
                                <button
                                    className="PfP-button PfP-button-save"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    <Save size={20} />
                                    {loading ? 'Saving...' : t('saveChanges')}
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="PfP-error">
                            <AlertCircle className="PfP-error-icon" size={20} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="PfP-success">
                            <CheckCircle className="PfP-success-icon" size={20} />
                            {success}
                        </div>
                    )}

                    <div className="PfP-content">
                        <div className="PfP-sidebar">
                            <div className="PfP-profile-card">
                                <div className="PfP-avatar-container">
                                    <div className="PfP-avatar">
                                        <User className="PfP-avatar-icon" size={48} />
                                    </div>
                                </div>

                                <h2 className="PfP-profile-name">
                                    {profileData?.name} {profileData?.surname}
                                </h2>
                                <p className="PfP-profile-email">{profileData?.email}</p>

                                <div className="PfP-role-badge">
                                    <Shield size={16} />
                                    {isAdmin ? t('admin') : t('user')}
                                </div>

                                <p className="PfP-member-since">
                                    {t('memberSince')}: {formatDate(profileData?.createdDate)}
                                </p>

                                <div className="PfP-stats-grid">
                                    <div className="PfP-stat-item">
                                        <p className="PfP-stat-number">{profileCompletion}%</p>
                                        <p className="PfP-stat-label">Profile Complete</p>
                                    </div>
                                    <div className="PfP-stat-item">
                                        <p className="PfP-stat-number">{isAdmin ? 'Admin' : 'Member'}</p>
                                        <p className="PfP-stat-label">Status</p>
                                    </div>
                                </div>

                                <button className="PfP-button PfP-button-logout" onClick={handleLogout}>
                                    <LogOut size={18} />
                                    {t('logout')}
                                </button>
                            </div>
                        </div>

                        <div className="PfP-main-content">
                            {isEditing ? (
                                <form className="PfP-form" onSubmit={handleSubmit}>
                                    <div className="PfP-section">
                                        <h3 className="PfP-section-title">
                                            <User className="PfP-section-icon" size={24} />
                                            {t('personalInformation')}
                                        </h3>

                                        <div className="PfP-form-row">
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="name">
                                                    <User size={16} />
                                                    {t('firstName')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={editData.name}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="surname">
                                                    <User size={16} />
                                                    {t('lastName')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="surname"
                                                    name="surname"
                                                    value={editData.surname}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                        </div>

                                        <div className="PfP-form-row">
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="email">
                                                    <Mail size={16} />
                                                    {t('email')}
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={editData.email}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                    disabled
                                                />
                                            </div>
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="phoneNumber">
                                                    <Phone size={16} />
                                                    {t('phoneNumber')}
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={editData.phoneNumber}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                        </div>

                                        <div className="PfP-form-row">
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="address">
                                                    <MapPin size={16} />
                                                    {t('address')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={editData.address}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="nationality">
                                                    <Globe size={16} />
                                                    {t('nationality')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nationality"
                                                    name="nationality"
                                                    value={editData.nationality}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                        </div>

                                        <div className="PfP-form-row">
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="dateOfBirth">
                                                    <Cake size={16} />
                                                    {t('dateOfBirth')}
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dateOfBirth"
                                                    name="dateOfBirth"
                                                    value={editData.dateOfBirth}
                                                    onChange={handleChange}
                                                    className="PfP-form-input"
                                                />
                                            </div>
                                            <div className="PfP-form-group">
                                                <label className="PfP-form-label" htmlFor="gender">
                                                    <UserCheck size={16} />
                                                    {t('gender')}
                                                </label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={editData.gender}
                                                    onChange={handleChange}
                                                    className="PfP-form-select"
                                                >
                                                    <option value="">{t('selectGender')}</option>
                                                    <option value="Male">{t('male')}</option>
                                                    <option value="Female">{t('female')}</option>
                                                    <option value="Other">{t('other')}</option>
                                                    <option value="Prefer not to say">{t('preferNotToSay')}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="PfP-form-group full-width">
                                            <label className="PfP-form-label" htmlFor="bio">
                                                <Info size={16} />
                                                {t('biography')}
                                            </label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                value={editData.bio}
                                                onChange={handleChange}
                                                className="PfP-form-textarea"
                                                placeholder="Tell us about yourself..."
                                            />
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="PfP-section">
                                        <h3 className="PfP-section-title">
                                            <User className="PfP-section-icon" size={24} />
                                            {t('personalInformation')}
                                        </h3>
                                        <div className="PfP-info-grid">
                                            <div className="PfP-info-item">
                                                <User className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('fullName')}</h4>
                                                    <p>{profileData?.name} {profileData?.surname || ''}</p>
                                                </div>
                                            </div>
                                            <div className="PfP-info-item">
                                                <Mail className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('email')}</h4>
                                                    <p>{profileData?.email}</p>
                                                </div>
                                            </div>
                                            <div className="PfP-info-item">
                                                <Phone className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('phone')}</h4>
                                                    <p>{profileData?.phoneNumber || t('notProvided')}</p>
                                                </div>
                                            </div>
                                            <div className="PfP-info-item">
                                                <MapPin className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('address')}</h4>
                                                    <p>{profileData?.address || t('notProvided')}</p>
                                                </div>
                                            </div>
                                            <div className="PfP-info-item">
                                                <Globe className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('nationality')}</h4>
                                                    <p>{profileData?.nationality || t('notProvided')}</p>
                                                </div>
                                            </div>
                                            <div className="PfP-info-item">
                                                <Cake className="PfP-info-icon" size={20} />
                                                <div className="PfP-info-content">
                                                    <h4>{t('dateOfBirth')}</h4>
                                                    <p>{formatDate(profileData?.dateOfBirth)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="PfP-section">
                                        <h3 className="PfP-section-title">
                                            <Info className="PfP-section-icon" size={24} />
                                            {t('aboutMe')}
                                        </h3>
                                        <div className="PfP-bio-section">
                                            <div className="PfP-bio-content">
                                                <Info className="PfP-info-icon" size={20} />
                                                <p className="PfP-bio-text">
                                                    {profileData?.bio || 'No biography provided yet. Click edit to add information about yourself.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProfilePage;