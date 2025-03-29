import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { User, Mail, Phone, Home, Globe, Cake, Info, Camera, Edit, Save, X, LogOut } from 'lucide-react';
import './ProfilePage.css';
import { useAuth } from '../../Auth/components/AuthContext.jsx';
import Header from "../../components/header/Header.jsx";

const ProfilePage = () => {
    const { t } = useTranslation(); // Remove i18n from destructuring since we won't change language here
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
        try {
            const response = await axios.put(`http://localhost:8080/auth/${user.id}`, editData, {
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
            setError('');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || t('updateProfileError'));
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/${user.id}`, {
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
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
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

    if (loading && !profileData) {
        return (
            <div className="profile-loading">
                <div className="spinner"></div>
                <p>{t('loadingProfile')}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-header">
                    <h1>{isEditing ? t('editProfile') : t('userProfile')}</h1>
                    {!isEditing ? (
                        <button className="edit-button" onClick={handleEdit}>
                            <Edit size={18} />
                            {t('editProfile')}
                        </button>
                    ) : (
                        <div className="edit-actions">
                            <button className="cancel-button" onClick={handleCancel}>
                                <X size={18} />
                                {t('cancel')}
                            </button>
                            <button className="save-button" onClick={handleSubmit}>
                                <Save size={18} />
                                {t('saveChanges')}
                            </button>
                        </div>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="profile-content">
                    <div className="profile-sidebar">
                        <div className="profile-picture-container">
                            <div className="profile-picture">
                                {profileData?.profilePicture ? (
                                    <img src={profileData.profilePicture} alt="Profile" />
                                ) : (
                                    <User size={64} />
                                )}
                            </div>
                            {isEditing && (
                                <button className="change-picture-button">
                                    <Camera size={18} />
                                    {t('changePicture')}
                                </button>
                            )}
                        </div>
                        <div className="profile-info-card">
                            <h2>{profileData?.name} {profileData?.surname}</h2>
                            <p>{profileData?.email}</p>
                            <div className="role-badge">
                                {t('role')}: {profileData?.roles?.includes('ADMIN') ? t('admin') : t('user')}
                            </div>
                            <p className="member-since">
                                {t('memberSince')}: {profileData?.createdDate
                                ? new Date(profileData.createdDate).toLocaleDateString()
                                : t('unknown')}
                            </p>
                            <button className="logout-button" onClick={handleLogout}>
                                <LogOut size={18} />
                                {t('logout')}
                            </button>
                        </div>
                    </div>

                    <div className="profile-details">
                        {isEditing ? (
                            <form className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{t('firstName')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="surname">{t('lastName')}</label>
                                        <input
                                            type="text"
                                            id="surname"
                                            name="surname"
                                            value={editData.surname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">{t('email')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={editData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="address">{t('address')}</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={editData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nationality">{t('nationality')}</label>
                                        <input
                                            type="text"
                                            id="nationality"
                                            name="nationality"
                                            value={editData.nationality}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="dateOfBirth">{t('dateOfBirth')}</label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={editData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">{t('gender')}</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={editData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">{t('selectGender')}</option>
                                            <option value="Male">{t('male')}</option>
                                            <option value="Female">{t('female')}</option>
                                            <option value="Other">{t('other')}</option>
                                            <option value="Prefer not to say">{t('preferNotToSay')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="bio">{t('biography')}</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={editData.bio}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                </div>
                            </form>
                        ) : (
                            <div className="info-sections">
                                <div className="info-section">
                                    <h3>{t('personalInformation')}</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <User className="info-icon" />
                                            <div>
                                                <h4>{t('fullName')}</h4>
                                                <p>{profileData?.name} {profileData?.surname || ''}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <Mail className="info-icon" />
                                            <div>
                                                <h4>{t('email')}</h4>
                                                <p>{profileData?.email}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <Phone className="info-icon" />
                                            <div>
                                                <h4>{t('phone')}</h4>
                                                <p>{profileData?.phoneNumber || t('notProvided')}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <Home className="info-icon" />
                                            <div>
                                                <h4>{t('address')}</h4>
                                                <p>{profileData?.address || t('notProvided')}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <Globe className="info-icon" />
                                            <div>
                                                <h4>{t('nationality')}</h4>
                                                <p>{profileData?.nationality || t('notProvided')}</p>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <Cake className="info-icon" />
                                            <div>
                                                <h4>{t('dateOfBirth')}</h4>
                                                <p>{profileData?.dateOfBirth
                                                    ? new Date(profileData.dateOfBirth).toLocaleDateString()
                                                    : t('notProvided')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <h3>{t('aboutMe')}</h3>
                                    <div className="bio-content">
                                        <Info className="info-icon" />
                                        <p>{profileData?.bio || t('noBiography')}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;