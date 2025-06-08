import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import './Services.css';
import {
    GraduationCap,
    MapPin,
    FileText,
    Users,
    Globe,
    Award,
    BookOpen,
    Search,
    Edit2,
    Save,
    X,
    CheckCircle,
    Star,
    Calendar,
    MessageCircle,
    Target,
    Compass,
    Briefcase,
    PenTool,
    Video,
    Clock,
    ArrowRight
} from 'lucide-react';

function Services() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(() => {
        const savedContent = localStorage.getItem('servicesContent');
        return savedContent ? JSON.parse(savedContent) : {
            heroTitle: 'Our Educational Services',
            heroDescription: 'Comprehensive guidance for your global education journey',
            introduction: 'At TmTalyp, we offer a complete suite of educational services designed to guide you through every step of your international education journey. From discovering your ideal field of study to securing admission at your dream university, our expert team provides personalized support tailored to your unique goals and aspirations.\n\nOur services are built on years of experience helping students navigate the complex world of international education. We understand that each student\'s journey is unique, which is why we offer flexible, comprehensive solutions that adapt to your specific needs.',

            coreServices: [
                {
                    title: 'Academic Path Discovery',
                    description: 'Comprehensive assessments and career counseling to help you identify the perfect field of study that aligns with your interests, strengths, and career goals.',
                    features: [
                        'Personality and aptitude assessments',
                        'Career exploration workshops',
                        'Academic interest analysis',
                        'Industry trend insights',
                        'Future career pathway mapping'
                    ]
                },
                {
                    title: 'University Selection & Matching',
                    description: 'Expert guidance in identifying and selecting universities that match your academic profile, preferences, and budget across the globe.',
                    features: [
                        'Personalized university shortlisting',
                        'Academic program comparisons',
                        'Admission requirements analysis',
                        'Campus culture assessment',
                        'Financial aid opportunities'
                    ]
                },
                {
                    title: 'Country & Destination Guidance',
                    description: 'Comprehensive support in choosing the right country for your studies, considering factors like culture, climate, cost of living, and post-graduation opportunities.',
                    features: [
                        'Country comparison analysis',
                        'Visa and immigration guidance',
                        'Cost of living breakdowns',
                        'Cultural adaptation support',
                        'Post-graduation work opportunities'
                    ]
                },
                {
                    title: 'Application Excellence',
                    description: 'Complete application support to ensure your applications stand out and effectively communicate your potential to admissions committees.',
                    features: [
                        'Personal statement writing',
                        'Essay editing and review',
                        'Resume/CV development',
                        'Letter of recommendation guidance',
                        'Application strategy planning'
                    ]
                },
                {
                    title: 'Test Preparation Support',
                    description: 'Comprehensive preparation for standardized tests including IELTS, TOEFL, SAT, GRE, GMAT, and other required examinations.',
                    features: [
                        'Customized study plans',
                        'Practice test sessions',
                        'Score improvement strategies',
                        'Test-taking techniques',
                        'Progress tracking and analysis'
                    ]
                },
                {
                    title: 'Interview Preparation',
                    description: 'Intensive training to help you excel in university admission interviews and scholarship interviews.',
                    features: [
                        'Mock interview sessions',
                        'Common questions preparation',
                        'Confidence building techniques',
                        'Video interview setup',
                        'Feedback and improvement plans'
                    ]
                }
            ],

            additionalServices: [
                {
                    title: 'Scholarship Assistance',
                    description: 'Comprehensive support in finding and applying for scholarships, grants, and financial aid opportunities.',
                    icon: 'Award'
                },
                {
                    title: 'Visa Processing Support',
                    description: 'Step-by-step guidance through the visa application process, including document preparation and interview preparation.',
                    icon: 'FileText'
                },
                {
                    title: 'Pre-Departure Orientation',
                    description: 'Essential preparation for your journey abroad, including cultural orientation, practical tips, and what to expect.',
                    icon: 'Globe'
                },
                {
                    title: 'Ongoing Support',
                    description: 'Continued assistance throughout your studies abroad, including academic support and career guidance.',
                    icon: 'Users'
                }
            ],

            serviceProcess: {
                title: 'Our Service Process',
                description: 'We follow a structured, personalized approach to ensure you receive the best possible guidance throughout your educational journey.',
                steps: [
                    {
                        step: '1',
                        title: 'Initial Consultation',
                        description: 'Free consultation to understand your goals, preferences, and current academic status.'
                    },
                    {
                        step: '2',
                        title: 'Comprehensive Assessment',
                        description: 'Detailed evaluation of your academic background, interests, and career aspirations.'
                    },
                    {
                        step: '3',
                        title: 'Personalized Planning',
                        description: 'Creation of a customized roadmap tailored to your specific goals and timeline.'
                    },
                    {
                        step: '4',
                        title: 'Implementation & Support',
                        description: 'Hands-on assistance with applications, documentation, and preparation.'
                    },
                    {
                        step: '5',
                        title: 'Success & Beyond',
                        description: 'Continued support through admission, visa processes, and your academic journey.'
                    }
                ]
            },

            pricing: {
                title: 'Service Packages',
                description: 'Choose the package that best fits your needs and budget. All packages include ongoing support throughout the application process.',
                packages: [
                    {
                        name: 'Essential',
                        price: '$999',
                        description: 'Perfect for students who need basic guidance and support',
                        features: [
                            'Initial consultation',
                            'University selection (up to 5 universities)',
                            'Application review',
                            'Basic essay editing',
                            'Email support'
                        ],
                        popular: false
                    },
                    {
                        name: 'Comprehensive',
                        price: '$1,999',
                        description: 'Our most popular package with complete application support',
                        features: [
                            'Everything in Essential',
                            'Personal statement writing',
                            'Interview preparation',
                            'Scholarship assistance',
                            'Test preparation guidance',
                            'Priority support'
                        ],
                        popular: true
                    },
                    {
                        name: 'Premium',
                        price: '$3,999',
                        description: 'Full-service package with white-glove treatment',
                        features: [
                            'Everything in Comprehensive',
                            'Unlimited university applications',
                            'One-on-one mentoring',
                            'Visa processing support',
                            'Pre-departure orientation',
                            '24/7 support',
                            'Ongoing academic support'
                        ],
                        popular: false
                    }
                ]
            },

            successStories: {
                title: 'Success Stories',
                description: 'See how our services have helped students achieve their educational dreams.',
                stories: [
                    {
                        name: 'Sarah M.',
                        university: 'Harvard University',
                        program: 'Computer Science',
                        testimonial: 'TmTalyp helped me navigate the complex application process and secure admission to my dream university. Their personalized guidance was invaluable.'
                    },
                    {
                        name: 'Ahmed K.',
                        university: 'University of Cambridge',
                        program: 'Engineering',
                        testimonial: 'The team at TmTalyp not only helped me get accepted but also secured a full scholarship. I couldn\'t have done it without their support.'
                    },
                    {
                        name: 'Maria L.',
                        university: 'Stanford University',
                        program: 'Business Administration',
                        testimonial: 'From university selection to visa processing, TmTalyp was with me every step of the way. Their expertise made all the difference.'
                    }
                ]
            },

            ctaTitle: 'Ready to Start Your Journey?',
            ctaDescription: 'Take the first step towards your educational dreams. Schedule a free consultation with our expert team today.'
        };
    });

    const [editingContent, setEditingContent] = useState({ ...content });

    const handleEdit = () => {
        setIsEditing(true);
        setEditingContent({ ...content });
    };

    const handleSave = () => {
        setContent(editingContent);
        localStorage.setItem('servicesContent', JSON.stringify(editingContent));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditingContent({ ...content });
        setIsEditing(false);
    };

    const handleContentChange = (field, value) => {
        setEditingContent(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCoreServiceChange = (index, field, value) => {
        const newServices = [...editingContent.coreServices];
        newServices[index] = { ...newServices[index], [field]: value };
        setEditingContent(prev => ({
            ...prev,
            coreServices: newServices
        }));
    };

    const handleAdditionalServiceChange = (index, field, value) => {
        const newServices = [...editingContent.additionalServices];
        newServices[index] = { ...newServices[index], [field]: value };
        setEditingContent(prev => ({
            ...prev,
            additionalServices: newServices
        }));
    };

    const EditableText = ({ value, onChange, multiline = false, className = '' }) => {
        if (!isEditing) {
            if (multiline) {
                return <div className={`formatted-content ${className}`}>{formatContent(value)}</div>;
            }
            return <span className={className}>{value}</span>;
        }

        if (multiline) {
            return (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`editable-textarea ${className}`}
                    rows={8}
                />
            );
        }

        return (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`editable-input ${className}`}
            />
        );
    };

    const formatContent = (text) => {
        return text.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
                return <h3 key={index} className="content-subheading">{paragraph.substring(2)}</h3>;
            } else if (paragraph.startsWith('## ')) {
                return <h4 key={index} className="content-subsubheading">{paragraph.substring(3)}</h4>;
            } else if (paragraph.startsWith('• ')) {
                return <li key={index} className="content-list-item">{paragraph.substring(2)}</li>;
            } else if (paragraph.trim() === '') {
                return <br key={index} />;
            } else {
                return <p key={index} className="content-paragraph">{paragraph}</p>;
            }
        });
    };

    const getServiceIcon = (service, index) => {
        const icons = [GraduationCap, Search, MapPin, FileText, BookOpen, Video];
        const IconComponent = icons[index] || GraduationCap;
        return <IconComponent className="service-icon" />;
    };

    const getAdditionalServiceIcon = (iconName) => {
        const iconMap = {
            'Award': Award,
            'FileText': FileText,
            'Globe': Globe,
            'Users': Users
        };
        const IconComponent = iconMap[iconName] || Award;
        return <IconComponent className="additional-service-icon" />;
    };

    return (
        <div className="services-page-wrapper">
            <Header />

        

            {/* Hero Section */}
            <div className="services-hero">
                <div className="services-hero-overlay"></div>
                <div className="services-hero-content">
                    <h1>
                        <EditableText
                            value={isEditing ? editingContent.heroTitle : content.heroTitle}
                            onChange={(value) => handleContentChange('heroTitle', value)}
                        />
                    </h1>
                    <p>
                        <EditableText
                            value={isEditing ? editingContent.heroDescription : content.heroDescription}
                            onChange={(value) => handleContentChange('heroDescription', value)}
                        />
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="services-container">
                {/* Introduction Section */}
                <section className="services-section">
                    <div className="section-header">
                        <Compass className="section-icon" />
                        <h2 className="section-title">How We Help You Succeed</h2>
                    </div>
                    <div className="services-content">
                        <EditableText
                            value={isEditing ? editingContent.introduction : content.introduction}
                            onChange={(value) => handleContentChange('introduction', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Core Services */}
                <section className="services-section">
                    <div className="section-header">
                        <Target className="section-icon" />
                        <h2 className="section-title">Our Core Services</h2>
                    </div>
                    <div className="core-services-grid">
                        {(isEditing ? editingContent.coreServices : content.coreServices).map((service, index) => (
                            <div key={index} className="core-service-card">
                                {getServiceIcon(service, index)}
                                <h3 className="service-title">
                                    <EditableText
                                        value={service.title}
                                        onChange={(value) => handleCoreServiceChange(index, 'title', value)}
                                    />
                                </h3>
                                <p className="service-description">
                                    <EditableText
                                        value={service.description}
                                        onChange={(value) => handleCoreServiceChange(index, 'description', value)}
                                        multiline={true}
                                    />
                                </p>
                                <ul className="service-features">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="service-feature">
                                            <CheckCircle className="feature-icon" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Additional Services */}
                <section className="services-section additional-services-section">
                    <div className="section-header">
                        <Star className="section-icon" />
                        <h2 className="section-title">Additional Services</h2>
                    </div>
                    <div className="additional-services-grid">
                        {(isEditing ? editingContent.additionalServices : content.additionalServices).map((service, index) => (
                            <div key={index} className="additional-service-card">
                                {getAdditionalServiceIcon(service.icon)}
                                <h3 className="additional-service-title">
                                    <EditableText
                                        value={service.title}
                                        onChange={(value) => handleAdditionalServiceChange(index, 'title', value)}
                                    />
                                </h3>
                                <p className="additional-service-description">
                                    <EditableText
                                        value={service.description}
                                        onChange={(value) => handleAdditionalServiceChange(index, 'description', value)}
                                        multiline={true}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Service Process */}
                <section className="services-section process-section">
                    <div className="section-header">
                        <Clock className="section-icon" />
                        <h2 className="section-title">{content.serviceProcess.title}</h2>
                    </div>
                    <p className="process-description">{content.serviceProcess.description}</p>
                    <div className="process-steps">
                        {content.serviceProcess.steps.map((step, index) => (
                            <div key={index} className="process-step">
                                <div className="step-number">{step.step}</div>
                                <div className="step-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                                {index < content.serviceProcess.steps.length - 1 && (
                                    <ArrowRight className="step-arrow" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing */}
                <section className="services-section pricing-section">
                    <div className="section-header">
                        <Briefcase className="section-icon" />
                        <h2 className="section-title">{content.pricing.title}</h2>
                    </div>
                    <p className="pricing-description">{content.pricing.description}</p>
                    <div className="pricing-grid">
                        {content.pricing.packages.map((pkg, index) => (
                            <div key={index} className={`pricing-card ${pkg.popular ? 'popular' : ''}`}>
                                {pkg.popular && <div className="popular-badge">Most Popular</div>}
                                <h3 className="package-name">{pkg.name}</h3>
                                <div className="package-price">{pkg.price}</div>
                                <p className="package-description">{pkg.description}</p>
                                <ul className="package-features">
                                    {pkg.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="package-feature">
                                            <CheckCircle className="feature-icon" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="package-button">
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Success Stories */}
                <section className="services-section success-section">
                    <div className="section-header">
                        <Award className="section-icon" />
                        <h2 className="section-title">{content.successStories.title}</h2>
                    </div>
                    <p className="success-description">{content.successStories.description}</p>
                    <div className="success-stories-grid">
                        {content.successStories.stories.map((story, index) => (
                            <div key={index} className="success-story-card">
                                <div className="story-header">
                                    <div className="student-info">
                                        <h4 className="student-name">{story.name}</h4>
                                        <p className="student-university">{story.university}</p>
                                        <p className="student-program">{story.program}</p>
                                    </div>
                                    <div className="story-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="rating-star" />
                                        ))}
                                    </div>
                                </div>
                                <p className="story-testimonial">"{story.testimonial}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>
                            <EditableText
                                value={isEditing ? editingContent.ctaTitle : content.ctaTitle}
                                onChange={(value) => handleContentChange('ctaTitle', value)}
                            />
                        </h2>
                        <p>
                            <EditableText
                                value={isEditing ? editingContent.ctaDescription : content.ctaDescription}
                                onChange={(value) => handleContentChange('ctaDescription', value)}
                            />
                        </p>
                        <div className="cta-buttons">
                            <button className="cta-button primary" onClick={() => navigate('/apply')}>
                                {t('scheduleConsultation') || 'Schedule Free Consultation'}
                            </button>
                            <button className="cta-button secondary" onClick={() => navigate('/contact')}>
                                {t('contactUs') || 'Contact Us'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default Services;