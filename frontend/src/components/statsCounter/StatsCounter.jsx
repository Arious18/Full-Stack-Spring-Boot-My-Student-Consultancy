import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './StatsCounter.css';

const StatsCounter = () => {
    const [stats, setStats] = useState({
        students: 0,
        users: 0,
        universities: 0,
        countries: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({
        students: 0,
        users: 0,
        universities: 0,
        countries: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDark, setIsDark] = useState(false);

    const statsRef = useRef(null);
    const animationRef = useRef({});

    // Check for dark mode on mount and listen for changes
    useEffect(() => {
        const checkDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        // Check initial state
        checkDarkMode();

        // Create observer for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Intersection Observer for scroll-triggered animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px'
            }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [isVisible]);

    // Check if user is admin
    const isAdmin = () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            // Decode JWT token to check roles (basic decode without verification)
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Check multiple possible role formats
            if (payload.roles && Array.isArray(payload.roles)) {
                return payload.roles.includes('ADMIN') || payload.roles.includes('admin');
            }
            if (payload.role) {
                return payload.role === 'ADMIN' || payload.role === 'admin';
            }
            if (payload.authorities && Array.isArray(payload.authorities)) {
                return payload.authorities.some(auth =>
                    auth === 'ADMIN' || auth === 'admin' || auth.authority === 'ADMIN'
                );
            }

            return false;
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    };

    // Fetch data from APIs
    const fetchStats = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const userIsAdmin = isAdmin();

            // Always fetch universities and countries (public data)
            const [universitiesResponse, countriesResponse] = await Promise.all([
                axios.get('http://localhost:8080/universities').catch(() => ({ data: [] })),
                axios.get('http://localhost:8080/countries').catch(() => ({ data: [] }))
            ]);

            const universities = Array.isArray(universitiesResponse.data) ? universitiesResponse.data : [];
            const countries = Array.isArray(countriesResponse.data) ? countriesResponse.data : [];

            let studentCount = 0;
            let userCount = 0;

            // Only fetch user data if user is admin
            if (userIsAdmin) {
                try {
                    console.log('Admin detected, fetching user data...');
                    const usersResponse = await axios.get('http://localhost:8080/users', { headers });
                    const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];

                    console.log('Users fetched:', users.length);

                    // Calculate student count (assuming students are users without admin role)
                    studentCount = users.filter(user => {
                        if (!user.roles) return true; // No roles = student
                        if (Array.isArray(user.roles)) {
                            return !user.roles.includes('ADMIN') && !user.roles.includes('admin');
                        }
                        if (typeof user.roles === 'string') {
                            return user.roles !== 'ADMIN' && user.roles !== 'admin';
                        }
                        return true;
                    }).length;

                    userCount = users.length;

                    console.log('Admin stats - Students:', studentCount, 'Users:', userCount);
                } catch (userError) {
                    console.error('Error fetching user data for admin:', userError);
                    // Don't use fallback for admin - show 0 if can't fetch
                    studentCount = 0;
                    userCount = 0;
                    setError('Unable to fetch user data');
                }
            } else {
                console.log('Regular user, trying public stats...');
                // For non-admin users, try to get public stats endpoint or use fallback
                try {
                    // Try to fetch from a public stats endpoint if available
                    const publicStatsResponse = await axios.get('http://localhost:8080/stats/public').catch(() => null);

                    if (publicStatsResponse && publicStatsResponse.data) {
                        studentCount = publicStatsResponse.data.students || 1750;
                        userCount = publicStatsResponse.data.users || 1500;
                        console.log('Public stats fetched:', studentCount, userCount);
                    } else {
                        // Use reasonable fallback values for public display
                        studentCount = 1700;
                        userCount = 140;
                        console.log('Using fallback values for regular user');
                    }
                } catch (publicError) {
                    console.error('Error fetching public stats:', publicError);
                    // Use fallback values
                    studentCount = 1250;
                    userCount = 1500;
                }
            }

            setStats({
                students: studentCount,
                users: userCount,
                universities: universities.length,
                countries: countries.length
            });

        } catch (error) {
            console.error('Error fetching stats:', error);
            setError('Failed to load some statistics');

            // Set fallback values for all stats
            setStats({
                students: 1250,
                users: 1500,
                universities: 45,
                countries: 12
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // Animate numbers when visible
    useEffect(() => {
        if (isVisible && !isLoading) {
            const duration = 2000; // 2 seconds
            const frameRate = 60;
            const totalFrames = (duration / 1000) * frameRate;

            Object.keys(stats).forEach(key => {
                const finalValue = stats[key];
                let currentFrame = 0;

                const animate = () => {
                    currentFrame++;
                    const progress = currentFrame / totalFrames;
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(finalValue * easeOutQuart);

                    setAnimatedStats(prev => ({
                        ...prev,
                        [key]: currentValue
                    }));

                    if (currentFrame < totalFrames) {
                        animationRef.current[key] = requestAnimationFrame(animate);
                    } else {
                        setAnimatedStats(prev => ({
                            ...prev,
                            [key]: finalValue
                        }));
                    }
                };

                if (animationRef.current[key]) {
                    cancelAnimationFrame(animationRef.current[key]);
                }
                animationRef.current[key] = requestAnimationFrame(animate);
            });
        }

        return () => {
            Object.values(animationRef.current).forEach(id => {
                if (id) cancelAnimationFrame(id);
            });
        };
    }, [isVisible, stats, isLoading]);

    const formatNumber = (num) => {
        // Ensure num is a valid number
        const number = Number(num);
        if (isNaN(number)) return '0';

        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    };

    const statsData = [
        {
            key: 'students',
            icon: '🎓',
            label: 'Students',
            value: animatedStats.students,
            color: '#4f46e5'
        },
        {
            key: 'users',
            icon: '🧑‍💼',
            label: 'Users',
            value: animatedStats.users,
            color: '#059669'
        },
        {
            key: 'universities',
            icon: '🏛️',
            label: 'Universities',
            value: animatedStats.universities,
            color: '#dc2626'
        },
        {
            key: 'countries',
            icon: '🌍',
            label: 'Countries',
            value: animatedStats.countries,
            color: '#7c3aed'
        }
    ];

    if (error && stats.students === 0 && stats.universities === 0) {
        return (
            <section className="StC-section">
                <div className="StC-container">
                    <div className="StC-error">
                        <span className="StC-error-icon">⚠️</span>
                        <p>Unable to load statistics</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="StC-section" ref={statsRef}>
            <div className="StC-container">
                <div className="StC-header">
                    <h2 className="StC-title">Our Impact in Numbers</h2>
                    <p className="StC-subtitle">
                        Empowering students worldwide with quality education opportunities
                    </p>
                </div>

                {isLoading ? (
                    <div className="StC-loading">
                        <div className="StC-loading-spinner"></div>
                        <p>Loading statistics...</p>
                    </div>
                ) : (
                    <div className="StC-grid">
                        {statsData.map((stat, index) => (
                            <div
                                key={stat.key}
                                className={`StC-card ${isVisible ? 'StC-animate' : ''}`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    '--stat-color': stat.color
                                }}
                            >
                                <div className="StC-icon">
                                    {stat.icon}
                                </div>
                                <div className="StC-content">
                                    <div className="StC-number">
                                        {formatNumber(stat.value)}
                                        <span className="StC-plus-sign">+</span>
                                    </div>
                                    <div className="StC-label">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className="StC-decoration"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="StC-note">
                        <span className="StC-note-icon">ℹ️</span>
                        <p>Some statistics may be using representative data</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StatsCounter;