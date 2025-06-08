import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import './HelpCenter.css';
import {
    HelpCircle,
    Search,
    ChevronDown,
    ChevronUp,
    MessageCircle,
    Mail,
    Phone,
    Book,
    FileText,
    Users,
    Globe,
    GraduationCap,
    Edit2,
    Save,
    X,
    Clock,
    CheckCircle,
    AlertCircle,
    Video,
    Download,
    ExternalLink,
    Star,
    ArrowRight
} from 'lucide-react';

function HelpCenter() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const [content, setContent] = useState(() => {
        const savedContent = localStorage.getItem('helpCenterContent');
        return savedContent ? JSON.parse(savedContent) : {
            heroTitle: 'How Can We Help You?',
            heroDescription: 'Find answers to your questions and get the support you need for your educational journey',

            categories: [
                { id: 'all', name: 'All Topics', icon: 'Book' },
                { id: 'applications', name: 'Applications', icon: 'FileText' },
                { id: 'admissions', name: 'Admissions', icon: 'GraduationCap' },
                { id: 'visas', name: 'Visas & Immigration', icon: 'Globe' },
                { id: 'services', name: 'Our Services', icon: 'Users' },
                { id: 'payments', name: 'Payments & Billing', icon: 'CheckCircle' }
            ],

            faqData: [
                {
                    id: 1,
                    category: 'applications',
                    question: 'How long does the university application process take?',
                    answer: 'The application process typically takes 3-6 months from start to finish. This includes university research and selection (2-4 weeks), document preparation (4-6 weeks), application submission (1-2 weeks), and waiting for admission decisions (8-16 weeks). We recommend starting at least 8-12 months before your intended start date to allow ample time for all steps, including visa processing.'
                },
                {
                    id: 2,
                    category: 'applications',
                    question: 'What documents do I need for my university application?',
                    answer: 'Required documents typically include: Academic transcripts and certificates, English proficiency test scores (IELTS/TOEFL), Personal statement or essay, Letters of recommendation (2-3), Passport copy, CV/Resume, Portfolio (for creative programs), Financial statements, and specific program requirements. We provide a detailed checklist tailored to your chosen universities and programs.'
                },
                {
                    id: 3,
                    category: 'admissions',
                    question: 'What are the minimum requirements for admission?',
                    answer: 'Admission requirements vary by university and program. Generally, you need: Completed secondary education with good grades, English proficiency (IELTS 6.0-7.5 or TOEFL 80-100), relevant work experience (for some programs), and standardized test scores (SAT, GRE, GMAT where required). We help assess your profile against specific university requirements and identify the best matches.'
                },
                {
                    id: 4,
                    category: 'admissions',
                    question: 'Can I apply to multiple universities?',
                    answer: 'Yes, we strongly recommend applying to multiple universities (typically 5-8) to maximize your chances of acceptance. We help you create a balanced list including reach schools, target schools, and safety schools. Each application is tailored to the specific university requirements and culture to optimize your chances of success.'
                },
                {
                    id: 5,
                    category: 'visas',
                    question: 'How long does the student visa process take?',
                    answer: 'Student visa processing times vary by country: USA (F-1): 2-8 weeks, UK (Student visa): 3-8 weeks, Canada (Study permit): 4-12 weeks, Australia (Student visa): 4-12 weeks. We recommend applying for your visa as soon as you receive your university acceptance letter. Our visa support team guides you through the entire process.'
                },
                {
                    id: 6,
                    category: 'visas',
                    question: 'What documents do I need for a student visa?',
                    answer: 'Student visa documents typically include: Valid passport, University acceptance letter (I-20, CAS, etc.), Visa application form, Passport photos, Financial evidence, Academic transcripts, English proficiency scores, Medical examination results (some countries), and Visa fee payment receipt. Requirements vary by country, and we provide country-specific guidance.'
                },
                {
                    id: 7,
                    category: 'services',
                    question: 'What services do you provide?',
                    answer: 'We offer comprehensive educational consulting services including: University and program selection, Application preparation and review, Personal statement and essay writing, Interview preparation, Scholarship assistance, Test preparation guidance (IELTS, TOEFL, SAT, GRE, GMAT), Visa application support, Pre-departure orientation, and Ongoing support throughout your studies.'
                },
                {
                    id: 8,
                    category: 'services',
                    question: 'Do you guarantee university admission?',
                    answer: 'While we cannot guarantee admission (as final decisions rest with universities), we have a 95% success rate in securing admissions for our students. Our comprehensive approach, including careful university selection, strong application preparation, and ongoing support, maximizes your chances of success. We work with you until you secure admission to a suitable program.'
                },
                {
                    id: 9,
                    category: 'payments',
                    question: 'What are your service fees?',
                    answer: 'We offer three service packages: Essential ($999) - Basic guidance and support, Comprehensive ($1,999) - Complete application support (most popular), Premium ($3,999) - Full-service with ongoing support. All packages include ongoing support throughout the application process. We also offer flexible payment plans and scholarships for qualifying students.'
                },
                {
                    id: 10,
                    category: 'payments',
                    question: 'Do you offer payment plans?',
                    answer: 'Yes, we offer flexible payment options including: Installment plans (3-6 months), Family payment plans, Early bird discounts (10% off for payments 6 months in advance), Sibling discounts (15% off for additional family members), and Need-based scholarships for qualifying students. Contact our team to discuss the best payment option for your situation.'
                }
            ],

            quickLinks: [
                { title: 'Application Checklist', description: 'Complete guide to required documents', icon: 'CheckCircle' },
                { title: 'University Rankings', description: 'Latest global university rankings', icon: 'Star' },
                { title: 'Scholarship Guide', description: 'Finding and applying for scholarships', icon: 'GraduationCap' },
                { title: 'Visa Requirements', description: 'Country-specific visa information', icon: 'Globe' },
                { title: 'Test Preparation', description: 'IELTS, TOEFL, SAT, GRE, GMAT guides', icon: 'Book' },
                { title: 'Contact Forms', description: 'Get personalized assistance', icon: 'MessageCircle' }
            ],

            contactOptions: [
                {
                    title: 'Live Chat',
                    description: 'Get instant answers to your questions',
                    icon: 'MessageCircle',
                    availability: 'Available 24/7',
                    action: 'Start Chat'
                },
                {
                    title: 'Email Support',
                    description: 'Send us detailed questions anytime',
                    icon: 'Mail',
                    availability: 'Response within 24 hours',
                    action: 'Send Email'
                },
                {
                    title: 'Phone Consultation',
                    description: 'Speak directly with our experts',
                    icon: 'Phone',
                    availability: 'Mon-Fri 9AM-6PM EST',
                    action: 'Schedule Call'
                },
                {
                    title: 'Video Consultation',
                    description: 'Face-to-face guidance sessions',
                    icon: 'Video',
                    availability: 'By appointment',
                    action: 'Book Session'
                }
            ],

            resources: [
                {
                    title: 'University Application Guide',
                    description: 'Step-by-step guide to university applications',
                    type: 'PDF Guide',
                    size: '2.5 MB'
                },
                {
                    title: 'Personal Statement Templates',
                    description: 'Templates and examples for writing compelling essays',
                    type: 'Template Pack',
                    size: '1.8 MB'
                },
                {
                    title: 'Country Comparison Sheet',
                    description: 'Compare study destinations side by side',
                    type: 'Excel Sheet',
                    size: '850 KB'
                },
                {
                    title: 'Scholarship Database',
                    description: 'Comprehensive list of available scholarships',
                    type: 'Online Database',
                    size: 'Web Access'
                }
            ],

            ctaTitle: 'Still Need Help?',
            ctaDescription: 'Our expert team is here to provide personalized assistance for your educational journey.'
        };
    });

    const [editingContent, setEditingContent] = useState({ ...content });

    const handleEdit = () => {
        setIsEditing(true);
        setEditingContent({ ...content });
    };

    const handleSave = () => {
        setContent(editingContent);
        localStorage.setItem('helpCenterContent', JSON.stringify(editingContent));
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

    const EditableText = ({ value, onChange, multiline = false, className = '' }) => {
        if (!isEditing) {
            if (multiline) {
                return <div className={`formatted-content ${className}`}>{value}</div>;
            }
            return <span className={className}>{value}</span>;
        }

        if (multiline) {
            return (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`editable-textarea ${className}`}
                    rows={6}
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

    const getCategoryIcon = (iconName) => {
        const iconMap = {
            'Book': Book,
            'FileText': FileText,
            'GraduationCap': GraduationCap,
            'Globe': Globe,
            'Users': Users,
            'CheckCircle': CheckCircle
        };
        const IconComponent = iconMap[iconName] || Book;
        return <IconComponent className="category-icon" />;
    };

    const getQuickLinkIcon = (iconName) => {
        const iconMap = {
            'CheckCircle': CheckCircle,
            'Star': Star,
            'GraduationCap': GraduationCap,
            'Globe': Globe,
            'Book': Book,
            'MessageCircle': MessageCircle
        };
        const IconComponent = iconMap[iconName] || CheckCircle;
        return <IconComponent className="quick-link-icon" />;
    };

    const getContactIcon = (iconName) => {
        const iconMap = {
            'MessageCircle': MessageCircle,
            'Mail': Mail,
            'Phone': Phone,
            'Video': Video
        };
        const IconComponent = iconMap[iconName] || MessageCircle;
        return <IconComponent className="contact-icon" />;
    };

    const filteredFAQs = content.faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFAQ = (faqId) => {
        setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
    };

    return (
        <div className="help-center-page-wrapper">
            <Header />

            {/* Admin Edit Button */}
            <div className="admin-controls">
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEdit}>
                        <Edit2 /> Edit Content
                    </button>
                ) : (
                    <div className="edit-controls">
                        <button className="save-button" onClick={handleSave}>
                            <Save /> Save
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                            <X /> Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Hero Section */}
            <div className="help-hero">
                <div className="help-hero-overlay"></div>
                <div className="help-hero-content">
                    <HelpCircle className="help-hero-icon" />
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

                    {/* Search Bar */}
                    <div className="search-container">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="help-center-container">
                {/* Quick Links */}
                <section className="help-section quick-links-section">
                    <h2 className="section-title">Quick Links</h2>
                    <div className="quick-links-grid">
                        {content.quickLinks.map((link, index) => (
                            <div key={index} className="quick-link-card">
                                {getQuickLinkIcon(link.icon)}
                                <h3 className="quick-link-title">{link.title}</h3>
                                <p className="quick-link-description">{link.description}</p>
                                <ArrowRight className="quick-link-arrow" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="help-section faq-section">
                    <div className="section-header">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    {/* Category Filter */}
                    <div className="category-filter">
                        {content.categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {getCategoryIcon(category.icon)}
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="faq-list">
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq) => (
                                <div key={faq.id} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleFAQ(faq.id)}
                                    >
                                        <span>{faq.question}</span>
                                        {expandedFAQ === faq.id ? (
                                            <ChevronUp className="faq-icon" />
                                        ) : (
                                            <ChevronDown className="faq-icon" />
                                        )}
                                    </button>
                                    {expandedFAQ === faq.id && (
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <AlertCircle className="no-results-icon" />
                                <p>No FAQs found matching your search. Try different keywords or browse by category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Options */}
                <section className="help-section contact-section">
                    <div className="section-header">
                        <h2 className="section-title">Get Personalized Help</h2>
                        <p className="section-description">Choose how you'd like to connect with our support team</p>
                    </div>
                    <div className="contact-options-grid">
                        {content.contactOptions.map((option, index) => (
                            <div key={index} className="contact-option-card">
                                {getContactIcon(option.icon)}
                                <h3 className="contact-option-title">{option.title}</h3>
                                <p className="contact-option-description">{option.description}</p>
                                <div className="contact-option-availability">
                                    <Clock className="availability-icon" />
                                    {option.availability}
                                </div>
                                <button className="contact-option-button">
                                    {option.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resources */}
                <section className="help-section resources-section">
                    <div className="section-header">
                        <h2 className="section-title">Helpful Resources</h2>
                        <p className="section-description">Download guides and tools to help with your application</p>
                    </div>
                    <div className="resources-grid">
                        {content.resources.map((resource, index) => (
                            <div key={index} className="resource-card">
                                <div className="resource-header">
                                    <Download className="resource-icon" />
                                    <div className="resource-info">
                                        <h3 className="resource-title">{resource.title}</h3>
                                        <p className="resource-type">{resource.type}</p>
                                    </div>
                                </div>
                                <p className="resource-description">{resource.description}</p>
                                <div className="resource-footer">
                                    <span className="resource-size">{resource.size}</span>
                                    <button className="resource-download-btn">
                                        <Download className="download-icon" />
                                        Download
                                    </button>
                                </div>
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
                            <button className="cta-button primary" onClick={() => navigate('/contact')}>
                                {t('contactSupport') || 'Contact Support'}
                            </button>
                            <button className="cta-button secondary" onClick={() => navigate('/apply')}>
                                {t('scheduleConsultation') || 'Schedule Consultation'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default HelpCenter;