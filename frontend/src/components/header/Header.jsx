import React, { useState, useEffect } from 'react';
import { Search, Globe, Bell, Sun, Moon, User, ChevronDown } from 'lucide-react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Auth/components/AuthContext.jsx';

function Header() {
    const [isDark, setIsDark] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;
    const userName = user?.name || '';
    const isAdmin = user?.access === 'admin';

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ru', name: 'Русский' },
        { code: 'tk', name: 'Türkmen' },
        { code: 'tr', name: 'Türkçe' }
    ];

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
        setShowLanguageMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showLanguageMenu && !event.target.closest('.head-language-dropdown')) {
                setShowLanguageMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLanguageMenu]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        if (logout) {
            logout();
        } else {
            localStorage.clear();
        }
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <header className="head-header">
            <div className="head-container">
                <div className="head-header-content">
                    {/* Logo with translated brand name */}
                    <div className="head-logo">
                        <span className="head-logo-text">{t('brandName')}</span>
                    </div>

                    {/* Navigation Links with translated text */}
                    <nav className="head-nav-links">
                        <a href="/" className="head-nav-link">{t('home')}</a>
                        <a onClick={() => navigate('/University')} className="head-nav-link">{t('university')}</a>
                        <a href="#" className="head-nav-link">{t('services')}</a>
                        {isLoggedIn && (
                            <a
                                onClick={() => navigate(isAdmin ? '/dashboard' : '/apply')}
                                className="head-nav-link"
                            >
                                {isAdmin ? t('dashboard') : t('application')}
                            </a>
                        )}
                        <a href="#" className="head-nav-link">{t('about')}</a>
                    </nav>

                    {/* Enhanced Search Bar */}
                    <form onSubmit={handleSearch} className="head-search-container">
                        <Search className="head-search-icon" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="head-search-input"
                            aria-label={t('search')}
                        />
                        <button
                            type="submit"
                            className="head-search-button"
                            aria-label={t('search')}
                        >
                            {t('search')}
                        </button>
                    </form>

                    {/* Right Icons */}
                    <div className="head-icon-group">
                        {/* Language Dropdown */}
                        <div className="head-language-dropdown">
                            <button
                                className="head-icon-btn head-language-trigger"
                                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            >
                                <Globe className="head-icon" />
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                            {showLanguageMenu && (
                                <div className="head-language-menu-container">
                                    <div className="head-language-menu">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                className="head-language-menu-item"
                                                onClick={() => handleLanguageChange(lang.code)}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="head-icon-btn">
                        </button>

                        <button onClick={toggleDarkMode} className="head-icon-btn">
                            {isDark ? <Sun className="head-icon" /> : <Moon className="head-icon" />}
                        </button>

                        {isLoggedIn ? (
                            <div className="head-user-profile">
                                <button
                                    className="head-icon-btn"
                                    onClick={() => navigate('/ProfilePage')}
                                >
                                    <User className="head-icon" />
                                </button>
                                <span className="head-username">{userName}</span>
                            </div>
                        ) : (
                            <div className="head-auth-buttons">
                                <button className="head-signin-btn" onClick={() => navigate('/Auth')}>
                                    {t('signIn')}
                                </button>
                                <button className="head-signup-btn" onClick={() => navigate('/register')}>
                                    {t('signUp')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;