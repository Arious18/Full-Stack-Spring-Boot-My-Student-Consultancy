import React, { useState } from 'react';
import { Play, Copy, ExternalLink } from 'lucide-react';
import './TestimonialSection.css';

const TestimonialSection = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    // You can replace this with your actual video URL
    const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handlePlayVideo = () => {
        setIsVideoLoading(true);
        setIsVideoPlaying(true);
        // Small delay to show loading state
        setTimeout(() => setIsVideoLoading(false), 500);
    };

    const handleCloseVideo = () => {
        setIsVideoPlaying(false);
        setIsVideoLoading(false);
    };

    return (
        <section className="testimonial-section">
            <div className="testimonial-container">
                {/* Video Section */}
                <div className="video-section">
                    <div className="video-header">
                        <div className="video-info">
                            <div className="video-icon">
                                <div className="icon-circle">
                                    <ExternalLink size={20} />
                                </div>
                            </div>
                            <div className="video-details">
                                <h3 className="video-title">
                                    Student Business Projects (SBP) - École hôtelière de Lausanne (EHL)
                                </h3>
                                <button
                                    className={`copy-link-btn ${copySuccess ? 'copied' : ''}`}
                                    onClick={handleCopyLink}
                                >
                                    <Copy size={14} />
                                    <span>{copySuccess ? 'Copied!' : 'Copy link'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="video-container">
                        <div className="video-wrapper">
                            {!isVideoPlaying ? (
                                <div className="video-thumbnail">
                                    <div className="business-illustration">
                                        <div className="person person-1">
                                            <div className="person-body"></div>
                                            <div className="person-head"></div>
                                        </div>
                                        <div className="person person-2">
                                            <div className="person-body"></div>
                                            <div className="person-head"></div>
                                        </div>
                                        <div className="person person-3">
                                            <div className="person-body"></div>
                                            <div className="person-head"></div>
                                        </div>
                                        <div className="person person-4">
                                            <div className="person-body"></div>
                                            <div className="person-head"></div>
                                        </div>
                                        <div className="handshake-area"></div>
                                    </div>
                                    <button
                                        className="play-button"
                                        onClick={handlePlayVideo}
                                        aria-label="Play video"
                                        disabled={isVideoLoading}
                                    >
                                        {isVideoLoading ? (
                                            <div className="loading-spinner"></div>
                                        ) : (
                                            <Play size={32} fill="white" />
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="video-player">
                                    <video
                                        controls
                                        autoPlay
                                        width="100%"
                                        height="100%"
                                        onError={() => {
                                            console.error('Video failed to load');
                                            setIsVideoPlaying(false);
                                        }}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        <p>Your browser does not support the video tag.</p>
                                    </video>
                                    <button
                                        className="close-video-btn"
                                        onClick={handleCloseVideo}
                                        aria-label="Close video"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Testimonial Content */}
                <div className="testimonial-content">
                    <h2 className="testimonial-heading">What our clients say</h2>

                    <div className="testimonial-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-quote">
                                "The EHL students delivered exceptional insights that transformed our business approach. Their fresh perspective and professional methodology exceeded our expectations."
                            </div>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Sarah Mitchell</h4>
                                    <p>CEO, Innovation Corp</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-quote">
                                "Working with the Student Business Projects team was incredibly valuable. They provided actionable recommendations that we implemented immediately."
                            </div>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Marcus Rodriguez</h4>
                                    <p>Director, Hospitality Solutions</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-quote">
                                "The professionalism and quality of work from these students rivals that of established consulting firms. Highly recommended!"
                            </div>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Emma Thompson</h4>
                                    <p>Founder, TechStart Ltd</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;