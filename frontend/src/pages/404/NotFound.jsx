import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, RefreshCw, MapPin, Clock, Compass } from 'lucide-react';

function NotFoundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleGoHome = () => {
        setIsLoading(true);
        // Simulate navigation delay
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const quickLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Universities', path: '/university', icon: MapPin },
        { name: 'Jobs', path: '/jobList', icon: Clock },
        { name: 'News', path: '/newsList', icon: Compass }
    ];

    return (
        <div className="not-found-container">
            {/* Animated Background */}
            <div
                className="background-gradient"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(103, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 50%, transparent 100%)`
                }}
            />

            {/* Floating Elements */}
            <div className="floating-elements">
                <div className="floating-element element-1">404</div>
                <div className="floating-element element-2">?</div>
                <div className="floating-element element-3">!</div>
                <div className="floating-element element-4">...</div>
            </div>

            {/* Main Content */}
            <div className="content-wrapper">
                <div className="main-content">
                    {/* 404 Display */}
                    <div className="error-code">
                        <span className="code-digit">4</span>
                        <span className="code-digit delay-1">0</span>
                        <span className="code-digit delay-2">4</span>
                    </div>

                    {/* Error Message */}
                    <div className="error-message">
                        <h1 className="error-title">Oops! Page Not Found</h1>
                        <p className="error-description">
                            The page you're looking for seems to have wandered off into the digital void.
                            Don't worry, even the best explorers sometimes take a wrong turn.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="search-section">
                        <div className="search-wrapper">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="search-input"
                            />
                            <button onClick={handleSearch} className="search-button">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            onClick={handleGoHome}
                            className="action-btn primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <RefreshCw className="btn-icon spinning" />
                            ) : (
                                <Home className="btn-icon" />
                            )}
                            Go Home
                        </button>

                        <button onClick={handleGoBack} className="action-btn secondary">
                            <ArrowLeft className="btn-icon" />
                            Go Back
                        </button>

                        <button onClick={handleRefresh} className="action-btn tertiary">
                            <RefreshCw className="btn-icon" />
                            Refresh
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links">
                        <h3 className="quick-links-title">Or explore these popular sections:</h3>
                        <div className="links-grid">
                            {quickLinks.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        className="quick-link"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="link-icon">
                                            <IconComponent size={20} />
                                        </div>
                                        <span className="link-text">{link.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="help-section">
                        <p className="help-text">
                            If you believe this is an error, please{' '}
                            <a href="/contact" className="help-link">contact our support team</a>.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .not-found-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    overflow: hidden;
                    padding: 2rem 1rem;
                }

                .background-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    transition: background 0.3s ease;
                    pointer-events: none;
                }

                .floating-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    overflow: hidden;
                }

                .floating-element {
                    position: absolute;
                    font-size: 2rem;
                    font-weight: bold;
                    color: rgba(103, 126, 234, 0.1);
                    animation: float 6s ease-in-out infinite;
                }

                .element-1 {
                    top: 20%;
                    left: 10%;
                    animation-delay: 0s;
                }

                .element-2 {
                    top: 60%;
                    right: 15%;
                    animation-delay: 2s;
                }

                .element-3 {
                    bottom: 30%;
                    left: 20%;
                    animation-delay: 4s;
                }

                .element-4 {
                    top: 40%;
                    right: 30%;
                    animation-delay: 3s;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 600px;
                }

                .main-content {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 24px;
                    padding: 3rem 2rem;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .error-code {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .code-digit {
                    font-size: 6rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: bounceIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .delay-1 {
                    animation-delay: 0.2s;
                }

                .delay-2 {
                    animation-delay: 0.4s;
                }

                .error-message {
                    margin-bottom: 2.5rem;
                }

                .error-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 1rem;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
                }

                .error-description {
                    font-size: 1.1rem;
                    color: #4a5568;
                    line-height: 1.6;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
                }

                .search-section {
                    margin-bottom: 2.5rem;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
                }

                .search-wrapper {
                    display: flex;
                    align-items: center;
                    background-color: #f8fafc;
                    border: 2px solid transparent;
                    border-radius: 16px;
                    padding: 0.75rem 1rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    gap: 0.75rem;
                }

                .search-wrapper:focus-within {
                    border-color: #667eea;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .search-icon {
                    color: #9ca3af;
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }

                .search-input {
                    border: none;
                    background: transparent;
                    flex: 1;
                    color: #374151;
                    outline: none;
                    font-size: 1rem;
                }

                .search-input::placeholder {
                    color: #9ca3af;
                }

                .search-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    white-space: nowrap;
                }

                .search-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }

                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 2.5rem;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
                }

                .action-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    font-size: 0.95rem;
                }

                .action-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .action-btn.primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
                }

                .action-btn.primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
                }

                .action-btn.secondary {
                    background: white;
                    color: #4a5568;
                    border: 2px solid #e2e8f0;
                }

                .action-btn.secondary:hover {
                    border-color: #667eea;
                    color: #667eea;
                    transform: translateY(-1px);
                }

                .action-btn.tertiary {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                    border: 2px solid transparent;
                }

                .action-btn.tertiary:hover {
                    background: rgba(102, 126, 234, 0.15);
                    transform: translateY(-1px);
                }

                .btn-icon {
                    width: 18px;
                    height: 18px;
                }

                .spinning {
                    animation: spin 1s linear infinite;
                }

                .quick-links {
                    margin-bottom: 2rem;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
                }

                .quick-links-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #4a5568;
                    margin-bottom: 1.5rem;
                }

                .links-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                }

                .quick-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: rgba(102, 126, 234, 0.05);
                    border: 2px solid transparent;
                    border-radius: 12px;
                    text-decoration: none;
                    color: #4a5568;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
                }

                .quick-link:hover {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                    transform: translateY(-2px);
                    color: #667eea;
                }

                .link-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 10px;
                    color: white;
                }

                .link-text {
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                .help-section {
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
                }

                .help-text {
                    color: #6b7280;
                    font-size: 0.9rem;
                }

                .help-link {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .help-link:hover {
                    color: #764ba2;
                    text-decoration: underline;
                }

                /* Animations */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3) translateY(-50px);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05) translateY(-10px);
                    }
                    70% {
                        transform: scale(0.9) translateY(0);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                    66% {
                        transform: translateY(-10px) rotate(-5deg);
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Responsive Design */
                @media (max-width: 640px) {
                    .not-found-container {
                        padding: 1rem 0.5rem;
                    }

                    .main-content {
                        padding: 2rem 1.5rem;
                        border-radius: 20px;
                    }

                    .code-digit {
                        font-size: 4rem;
                    }

                    .error-title {
                        font-size: 1.5rem;
                    }

                    .error-description {
                        font-size: 1rem;
                    }

                    .action-buttons {
                        flex-direction: column;
                        align-items: center;
                    }

                    .action-btn {
                        width: 100%;
                        max-width: 200px;
                        justify-content: center;
                    }

                    .links-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.75rem;
                    }

                    .quick-link {
                        padding: 0.75rem;
                    }
                }

                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                    .not-found-container {
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    }

                    .main-content {
                        background: rgba(30, 41, 59, 0.95);
                        border-color: rgba(255, 255, 255, 0.1);
                    }

                    .error-title {
                        color: #f1f5f9;
                    }

                    .error-description {
                        color: #cbd5e1;
                    }

                    .search-wrapper {
                        background-color: #334155;
                    }

                    .search-wrapper:focus-within {
                        background-color: #475569;
                    }

                    .search-input {
                        color: #f1f5f9;
                    }

                    .action-btn.secondary {
                        background: #334155;
                        color: #cbd5e1;
                        border-color: #475569;
                    }

                    .action-btn.secondary:hover {
                        border-color: #667eea;
                        color: #667eea;
                    }

                    .quick-links-title {
                        color: #cbd5e1;
                    }

                    .quick-link {
                        background: rgba(102, 126, 234, 0.1);
                        color: #cbd5e1;
                    }

                    .quick-link:hover {
                        color: #667eea;
                    }

                    .help-text {
                        color: #94a3b8;
                    }
                }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default NotFoundPage;