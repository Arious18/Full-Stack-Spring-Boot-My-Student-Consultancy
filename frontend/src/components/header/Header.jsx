import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Sun, Moon, User, ChevronDown, LogOut, Menu, X, Globe } from 'lucide-react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Auth/components/AuthContext.jsx';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const languageRef = useRef(null);
    const userMenuRef = useRef(null);
    const mobileSearchRef = useRef(null);
    const searchInputRef = useRef(null);
    const mobileSearchInputRef = useRef(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user, logout, isAuthenticated } = useAuth();

    const isLoggedIn = isAuthenticated();
    const userName = user?.name || '';
    const userEmail = user?.email || '';
    const isAdmin = user?.access === 'admin';

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];

    const navigationItems = [
        { path: '/', label: t('home') },
        { path: '/university', label: t('Universities') },
        { path: '/jobList', label: t('Jobs') },
        { path: '/newsList', label: t('News') },
        {path:'/countryList', label:t('Countries')},
        ...(isLoggedIn ? [{
            path: isAdmin ? '/dashboard' : '/apply',
            label: isAdmin ? t('dashboard') : t('application')
        }] : []),

    ];

    // Close all menus function
    const closeAllMenus = useCallback(() => {
        setShowLanguageMenu(false);
        setShowUserMenu(false);
        setIsMobileMenuOpen(false);
        setShowMobileSearch(false);
    }, []);

    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldUseDark);
        document.documentElement.classList.toggle('dark', shouldUseDark);
    }, []);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setShowLanguageMenu(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
            if (showMobileSearch && mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                const mobileSearchToggleButton = document.querySelector('.HDR-mobile-search-toggle');
                if (mobileSearchToggleButton && mobileSearchToggleButton.contains(event.target)) {
                    return;
                }
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMobileSearch]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                closeAllMenus();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [closeAllMenus]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllMenus();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [closeAllMenus]);

    // Auto-focus search input when mobile search opens
    useEffect(() => {
        if (showMobileSearch && mobileSearchInputRef.current) {
            const timer = setTimeout(() => {
                mobileSearchInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showMobileSearch]);

    const toggleDarkMode = useCallback(() => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    }, [isDark]);

    const handleLanguageChange = useCallback((langCode) => {
        i18n.changeLanguage(langCode);
        closeAllMenus();
    }, [i18n, closeAllMenus]);

    const handleLogout = useCallback(() => {
        logout();
        closeAllMenus();
        navigate('/');
    }, [logout, closeAllMenus, navigate]);

    const performSearch = useCallback((query) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setSearchQuery('');
            closeAllMenus();
        }
    }, [navigate, closeAllMenus]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        performSearch(searchQuery);
    }, [performSearch, searchQuery]);

    const handleMobileSearch = useCallback((e) => {
        e.preventDefault();
        performSearch(searchQuery);
    }, [performSearch, searchQuery]);

    const handleNavigation = useCallback((path) => {
        navigate(path);
        closeAllMenus();
    }, [navigate, closeAllMenus]);

    const toggleMobileSearch = useCallback(() => {
        setShowMobileSearch(prev => {
            if (!prev) {
                setIsMobileMenuOpen(false);
            }
            return !prev;
        });
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => {
            if (!prev) {
                setShowMobileSearch(false);
            }
            return !prev;
        });
    }, []);

    const handleSearchInputChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearchKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchQuery);
        }
    }, [performSearch, searchQuery]);

    return (
        <>
            <header className="HDR-header-main" role="banner">
                <div className="HDR-header-container">
                    <div className="HDR-header-content">
                        {/* Logo */}
                        <div
                            className="HDR-header-logo"
                            onClick={() => handleNavigation('/')}
                            role="button"
                            tabIndex="0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNavigation('/');
                                }
                            }}
                            aria-label="Go to homepage"
                        >
                            <span className="HDR-header-logo-text">{t('brandName')}</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="HDR-header-nav HDR-desktop-only" role="navigation" aria-label="Main navigation">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className="HDR-header-nav-link"
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Desktop Search */}
                        <form onSubmit={handleSearch} className="HDR-header-search HDR-desktop-only" role="search">
                            <div className="HDR-search-input-wrapper">
                                <Search className="HDR-search-icon" aria-hidden="true" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder={t('searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={handleSearchKeyDown}
                                    className="HDR-search-input"
                                    aria-label={t('search')}
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                            <button
                                type="submit"
                                className="HDR-search-button"
                                aria-label={t('search')}
                                disabled={!searchQuery.trim()}
                            >
                                {t('search')}
                            </button>
                        </form>

                        {/* Header Controls */}
                        <div className="HDR-header-controls">
                            {/* Mobile Search Toggle */}
                            <button
                                className="HDR-header-icon-btn HDR-mobile-only HDR-mobile-search-toggle"
                                onClick={toggleMobileSearch}
                                aria-label="Toggle search"
                                aria-expanded={showMobileSearch}
                                type="button"
                            >
                                <Search className="HDR-header-icon" />
                            </button>

                            {/*/!* Language Selector *!/*/}
                            {/*<div className="HDR-header-dropdown" ref={languageRef}>*/}
                            {/*    <button*/}
                            {/*        className="HDR-header-icon-btn"*/}
                            {/*        onClick={() => setShowLanguageMenu(!showLanguageMenu)}*/}
                            {/*        aria-label="Select language"*/}
                            {/*        aria-expanded={showLanguageMenu}*/}
                            {/*        aria-haspopup="true"*/}
                            {/*        type="button"*/}
                            {/*    >*/}
                            {/*        <Globe className="HDR-header-icon" />*/}
                            {/*        <ChevronDown className={`HDR-header-icon-sm ${showLanguageMenu ? 'HDR-rotate-180' : ''}`} />*/}
                            {/*    </button>*/}

                            {/*    {showLanguageMenu && (*/}
                            {/*        <div className="HDR-dropdown-menu" role="menu">*/}
                            {/*            {languages.map((lang) => (*/}
                            {/*                <button*/}
                            {/*                    key={lang.code}*/}
                            {/*                    onClick={() => handleLanguageChange(lang.code)}*/}
                            {/*                    className={`HDR-dropdown-item ${i18n.language === lang.code ? 'HDR-active' : ''}`}*/}
                            {/*                    role="menuitem"*/}
                            {/*                    type="button"*/}
                            {/*                >*/}
                            {/*                    <span className="HDR-language-flag" aria-hidden="true">{lang.flag}</span>*/}
                            {/*                    <span>{lang.name}</span>*/}
                            {/*                </button>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    )}*/}
                            {/*</div>*/}

                            {/*/!* Theme Toggle *!/*/}
                            {/*<button*/}
                            {/*    onClick={toggleDarkMode}*/}
                            {/*    className="HDR-header-icon-btn"*/}
                            {/*    aria-label={isDark ? t('switchToLightMode') : t('switchToDarkMode')}*/}
                            {/*    type="button"*/}
                            {/*>*/}
                            {/*    {isDark ? <Sun className="HDR-header-icon" /> : <Moon className="HDR-header-icon" />}*/}
                            {/*</button>*/}

                            {/* User Menu or Auth Buttons */}
                            {isLoggedIn ? (
                                <div className="HDR-header-dropdown HDR-user-dropdown" ref={userMenuRef}>
                                    <button
                                        className="HDR-user-trigger"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        aria-label="User menu"
                                        aria-expanded={showUserMenu}
                                        aria-haspopup="true"
                                        type="button"
                                    >
                                        <div className="HDR-user-avatar">
                                            <User className="HDR-header-icon" />
                                        </div>
                                        <div className="HDR-user-info HDR-desktop-only">
                                            <span className="HDR-user-name">{userName}</span>
                                            {userEmail && <span className="HDR-user-email">{userEmail}</span>}
                                        </div>
                                        <ChevronDown className={`HDR-header-icon-sm HDR-desktop-only ${showUserMenu ? 'HDR-rotate-180' : ''}`} />
                                    </button>

                                    {showUserMenu && (
                                        <div className="HDR-dropdown-menu HDR-user-menu" role="menu">
                                            <div className="HDR-user-menu-header">
                                                <div className="HDR-user-avatar-large">
                                                    <User className="HDR-header-icon" />
                                                </div>
                                                <div className="HDR-user-details">
                                                    <span className="HDR-user-name">{userName}</span>
                                                    {userEmail && <span className="HDR-user-email">{userEmail}</span>}
                                                    {isAdmin && <span className="HDR-user-role">Admin</span>}
                                                </div>
                                            </div>
                                            <div className="HDR-menu-divider"></div>
                                            <button
                                                onClick={() => {
                                                    navigate('/ProfilePage');
                                                    setShowUserMenu(false);
                                                }}
                                                className="HDR-dropdown-item"
                                                role="menuitem"
                                                type="button"
                                            >
                                                <User className="HDR-header-icon-sm" />
                                                {t('profile')}
                                            </button>
                                            <div className="HDR-menu-divider"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="HDR-dropdown-item HDR-danger"
                                                role="menuitem"
                                                type="button"
                                            >
                                                <LogOut className="HDR-header-icon-sm" />
                                                {t('logout')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="HDR-auth-buttons HDR-desktop-only">
                                    <button
                                        className="HDR-btn-secondary"
                                        onClick={() => handleNavigation('/login')}
                                        type="button"
                                    >
                                        {t('signIn')}
                                    </button>
                                    <button
                                        className="HDR-btn-primary"
                                        onClick={() => handleNavigation('/register')}
                                        type="button"
                                    >
                                        {t('signUp')}
                                    </button>
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                className="HDR-header-icon-btn HDR-mobile-menu-toggle HDR-mobile-only"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                                type="button"
                            >
                                {isMobileMenuOpen ? <X className="HDR-header-icon" /> : <Menu className="HDR-header-icon" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Search Bar */}
            {showMobileSearch && (
                <div className="HDR-mobile-search-overlay" ref={mobileSearchRef}>
                    <div className="HDR-mobile-search-container">
                        <form onSubmit={handleMobileSearch} className="HDR-mobile-search-form" role="search">
                            <div className="HDR-search-input-wrapper">
                                <Search className="HDR-search-icon" aria-hidden="true" />
                                <input
                                    ref={mobileSearchInputRef}
                                    type="text"
                                    placeholder={t('searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={handleSearchKeyDown}
                                    className="HDR-search-input"
                                    aria-label={t('search')}
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                            <button
                                type="submit"
                                className="HDR-search-button"
                                aria-label={t('search')}
                                disabled={!searchQuery.trim()}
                            >
                                {t('search')}
                            </button>
                            <button
                                type="button"
                                className="HDR-mobile-search-close"
                                onClick={() => setShowMobileSearch(false)}
                                aria-label="Close search"
                            >
                                <X className="HDR-header-icon-sm" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="HDR-mobile-menu-overlay">
                    <div className="HDR-mobile-menu-container">
                        <nav className="HDR-mobile-nav" role="navigation" aria-label="Mobile navigation">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className="HDR-mobile-nav-link"
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="HDR-mobile-divider"></div>

                        {/* Mobile Controls */}
                        <div className="HDR-mobile-controls">
                            <button
                                onClick={() => {
                                    toggleDarkMode();
                                    closeAllMenus();
                                }}
                                className="HDR-mobile-control-btn"
                                type="button"
                            >
                                {isDark ? <Sun className="HDR-header-icon" /> : <Moon className="HDR-header-icon" />}
                                <span>{isDark ? t('switchToLightMode') : t('switchToDarkMode')}</span>
                            </button>

                            <div className="HDR-mobile-language-section">
                                <span className="HDR-mobile-section-label">{t('languageLabel')}:</span>
                                <div className="HDR-mobile-language-options">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`HDR-mobile-lang-btn ${i18n.language === lang.code ? 'HDR-active' : ''}`}
                                            type="button"
                                        >
                                            <span className="HDR-language-flag" aria-hidden="true">{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="HDR-mobile-divider"></div>

                        {/* Mobile User Section */}
                        {isLoggedIn ? (
                            <div className="HDR-mobile-user-section">
                                <div className="HDR-mobile-user-info">
                                    <div className="HDR-user-avatar">
                                        <User className="HDR-header-icon" />
                                    </div>
                                    <div className="HDR-user-details">
                                        <span className="HDR-user-name">{userName}</span>
                                        {userEmail && <span className="HDR-user-email">{userEmail}</span>}
                                        {isAdmin && <span className="HDR-user-role">Admin</span>}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        navigate('/ProfilePage');
                                        closeAllMenus();
                                    }}
                                    className="HDR-mobile-profile-btn"
                                    type="button"
                                >
                                    {t('viewProfile')}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="HDR-mobile-logout-btn"
                                    type="button"
                                >
                                    <LogOut className="HDR-header-icon-sm" />
                                    {t('logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="HDR-mobile-auth-section">
                                <button
                                    className="HDR-mobile-btn-secondary"
                                    onClick={() => handleNavigation('/login')}
                                    type="button"
                                >
                                    {t('signIn')}
                                </button>
                                <button
                                    className="HDR-mobile-btn-primary"
                                    onClick={() => handleNavigation('/register')}
                                    type="button"
                                >
                                    {t('signUp')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;