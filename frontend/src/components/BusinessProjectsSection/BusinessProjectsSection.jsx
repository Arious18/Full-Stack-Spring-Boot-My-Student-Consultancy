import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Clock, Users, FileText, CheckCircle } from 'lucide-react';
import './BusinessProjectsSection.css';

const BusinessProjectsSection = () => {
    const [activeService, setActiveService] = useState(null);

    const services = [
        { icon: FileText, title: 'Business plans', description: 'Comprehensive business strategy development' },
        { icon: Users, title: 'Market research', description: 'In-depth market analysis and insights' },
        { icon: CheckCircle, title: 'Marketing & sales strategies', description: 'Effective marketing and sales solutions' },
        { icon: MapPin, title: 'Restaurant digitalization', description: 'Digital transformation for F&B industry' },
        { icon: Phone, title: 'Hotel & restaurant concepts', description: 'Innovative hospitality concepts' },
        { icon: Clock, title: 'Digitalization of customer touch-points', description: 'Enhanced customer experience solutions' },
        { icon: Users, title: 'Customer loyalty programs', description: 'Retention and engagement strategies' },
        { icon: CheckCircle, title: 'Sustainable business events & products', description: 'Eco-friendly business solutions' },
        { icon: FileText, title: 'Financial feasibility studies', description: 'Investment and financial analysis' },
        { icon: MapPin, title: 'Flagship boutique concepts', description: 'Premium retail experiences' }
    ];

    const handleDownloadBrochure = () => {
        // In a real implementation, this would trigger a download
        console.log('Downloading brochure...');
    };

    const handleContactTeam = () => {
        // In a real implementation, this would open contact form or navigate to contact page
        console.log('Contacting SBP team...');
    };

    return (
        <section className="business-projects-section">
            <div className="business-projects-container">
                {/* Services Grid */}
                <div className="services-intro">
                    <p className="services-description">
                        Through a variety of consulting formats, <strong>EHL students</strong> provide innovative and applicable solutions for many business challenges. Based on the organization's needs, the student consulting projects can be mandated to groups of Bachelor or Master degree students, always coached by faculty members of our School. Examples include:
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                className={`service-item ${activeService === index ? 'active' : ''}`}
                                onMouseEnter={() => setActiveService(index)}
                                onMouseLeave={() => setActiveService(null)}
                            >
                                <div className="service-icon">
                                    <IconComponent size={20} />
                                </div>
                                <div className="service-content">
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Section */}
                <div className="main-content">
                    <div className="text-content">
                        <h2 className="section-title">Student Business Projects (SBP)</h2>

                        <div className="content-description">
                            <p>
                                A team of senior bachelor's degree students will work <strong>full-time</strong> on your specific
                                mandate under the guidance of a dedicated EHL faculty coach and with the
                                support of a pool of EHL experts. Following a rigorous methodology, the student
                                team will deliver a professional report that will include their research findings as
                                well as a series of concrete and actionable recommendations.
                            </p>
                        </div>

                        <div className="project-details">
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <Users size={20} />
                                </div>
                                <div className="detail-content">
                                    <strong>Team:</strong> 6 students from the final semester of the Bachelor's Degree in
                                    International Hospitality Management
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <Clock size={20} />
                                </div>
                                <div className="detail-content">
                                    <strong>Duration:</strong> 9 weeks, full-time (2 sessions per year: in April and November)
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FileText size={20} />
                                </div>
                                <div className="detail-content">
                                    <strong>Deliverables:</strong> According to brief
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="image-content">
                        <div className="business-meeting-illustration">
                            <div className="meeting-table">
                                <div className="table-surface"></div>
                                <div className="table-leg table-leg-1"></div>
                                <div className="table-leg table-leg-2"></div>
                            </div>

                            <div className="meeting-participants">
                                <div className="participant participant-1">
                                    <div className="participant-head"></div>
                                    <div className="participant-body"></div>
                                    <div className="participant-arm"></div>
                                </div>

                                <div className="participant participant-2">
                                    <div className="participant-head"></div>
                                    <div className="participant-body"></div>
                                    <div className="participant-arm"></div>
                                </div>

                                <div className="participant participant-3">
                                    <div className="participant-head"></div>
                                    <div className="participant-body"></div>
                                    <div className="participant-arm"></div>
                                </div>
                            </div>

                            <div className="documents">
                                <div className="document doc-1"></div>
                                <div className="document doc-2"></div>
                                <div className="laptop">
                                    <div className="laptop-screen"></div>
                                    <div className="laptop-base"></div>
                                </div>
                            </div>

                            <div className="floating-elements">
                                <div className="floating-icon icon-1">
                                    <CheckCircle size={16} />
                                </div>
                                <div className="floating-icon icon-2">
                                    <FileText size={16} />
                                </div>
                                <div className="floating-icon icon-3">
                                    <Users size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessProjectsSection;