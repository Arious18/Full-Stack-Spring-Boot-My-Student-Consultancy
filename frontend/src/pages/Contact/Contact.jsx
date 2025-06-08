import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import './Contact.css';
import {
    Mail,
    Phone,
    Globe,
    ChevronDown,
    HelpCircle,
    Building,
    Users,
    GraduationCap,
    BookOpen,
    Award,
    MessageCircle,
    ExternalLink
} from 'lucide-react';

function Contact() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const contactMethods = [
        {
            icon: Mail,
            label: 'Email Address',
            value: 'info@tmtalyp.com',
            link: 'mailto:info@tmtalyp.com'
        },
        {
            icon: Phone,
            label: 'Phone Number',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: Globe,
            label: 'Website',
            value: 'www.tmtalyp.com',
            link: 'https://www.tmtalyp.com'
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: '+1 (555) 123-4567',
            link: 'https://wa.me/15551234567'
        }
    ];

    const supportMethods = [
        {
            icon: Mail,
            label: 'General Support',
            value: 'support@tmtalyp.com',
            link: 'mailto:support@tmtalyp.com'
        },
        {
            icon: Mail,
            label: 'Admissions Help',
            value: 'admissions@tmtalyp.com',
            link: 'mailto:admissions@tmtalyp.com'
        },
        {
            icon: Mail,
            label: 'Visa Guidance',
            value: 'visa@tmtalyp.com',
            link: 'mailto:visa@tmtalyp.com'
        },
        {
            icon: Mail,
            label: 'Scholarships',
            value: 'scholarships@tmtalyp.com',
            link: 'mailto:scholarships@tmtalyp.com'
        }
    ];

    const companyStats = [
        {
            number: '500+',
            label: 'Partner Universities'
        },
        {
            number: '50+',
            label: 'Countries Covered'
        },
        {
            number: '10,000+',
            label: 'Students Helped'
        },
        {
            number: '95%',
            label: 'Success Rate'
        }
    ];

    const faqData = [
        {
            question: 'How long does the university application process take?',
            answer: 'The application process typically takes 3-6 months depending on the universities and programs you\'re applying to. We recommend starting at least 8-12 months before your intended start date to ensure you have enough time for all requirements including language tests, document preparation, and visa processing.'
        },
        {
            question: 'Do you help with visa applications?',
            answer: 'Yes, we provide comprehensive visa guidance and support. Our experienced team will help you understand the requirements, prepare all necessary documentation, and guide you through the entire application process for student visas in your chosen destination country.'
        },
        {
            question: 'What are your consultation fees?',
            answer: 'We offer various service packages to fit different needs and budgets. Our initial consultation is completely free, and during that meeting we\'ll discuss our service options, pricing, and create a personalized plan for your educational journey. Contact us to schedule your free consultation today.'
        },
        {
            question: 'Can you help with scholarship applications?',
            answer: 'Absolutely! We help identify scholarship opportunities that match your academic profile and financial needs. This includes merit-based scholarships, need-based financial aid, country-specific funding opportunities, and university-specific grants. We assist with the entire application process to maximize your chances of receiving funding.'
        },
        {
            question: 'Do you work with students from all countries?',
            answer: 'Yes, we work with international students from around the world. Our team has extensive experience with various education systems, cultural backgrounds, and admission requirements for different countries and regions. We provide personalized guidance regardless of your home country.'
        },
        {
            question: 'What universities do you work with?',
            answer: 'We partner with over 500 universities across 50+ countries including top institutions in the US, UK, Canada, Australia, Germany, Netherlands, and many other destinations. Our partnerships span across various fields of study from undergraduate to doctoral programs.'
        }
    ];

    return (
        <div className="contact-page-wrapper">
            <Header />

            {/* Hero Section */}
            <div className="contact-hero">
                <div className="contact-hero-overlay"></div>
                <div className="contact-hero-content">
                    <h1>Get in Touch with TmTalyp</h1>
                    <p>Your trusted partner in international education. Ready to start your academic journey abroad?</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="contact-container">
                {/* Company Information Section */}
                <section className="company-info-section">
                    <div className="company-header">
                        <div className="company-logo">
                            <GraduationCap size={40} color="white" />
                        </div>
                        <h2 className="company-name">TmTalyp</h2>
                        <p className="company-tagline">Your Gateway to Global Education</p>
                    </div>

                    <p className="company-description">
                        TmTalyp is a leading international education consultancy dedicated to helping students achieve their dreams of studying abroad.
                        With years of experience and partnerships with top universities worldwide, we provide comprehensive guidance from university
                        selection to visa processing, ensuring your smooth transition to international education.
                    </p>
                </section>

                {/* Contact Cards Grid */}
                <div className="contact-cards-grid">
                    {/* Main Contact Information */}
                    <div className="contact-card">
                        <div className="card-header">
                            <div className="card-icon">
                                <Building size={24} />
                            </div>
                            <h3 className="card-title">Main Contact</h3>
                        </div>

                        <div className="contact-methods">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="contact-method">
                                    <method.icon className="method-icon" />
                                    <div className="method-content">
                                        <div className="method-label">{method.label}</div>
                                        <div className="method-value">
                                            <a
                                                href={method.link}
                                                className="method-link"
                                                target={method.link.startsWith('http') ? '_blank' : '_self'}
                                                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                            >
                                                {method.value}
                                                {method.link.startsWith('http') && (
                                                    <ExternalLink size={14} style={{ marginLeft: '4px', display: 'inline' }} />
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Specialized Support */}
                    <div className="contact-card">
                        <div className="card-header">
                            <div className="card-icon">
                                <Users size={24} />
                            </div>
                            <h3 className="card-title">Specialized Support</h3>
                        </div>

                        <div className="contact-methods">
                            {supportMethods.map((method, index) => (
                                <div key={index} className="contact-method">
                                    <method.icon className="method-icon" />
                                    <div className="method-content">
                                        <div className="method-label">{method.label}</div>
                                        <div className="method-value">
                                            <a href={method.link} className="method-link">
                                                {method.value}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="faq-section">
                    <div className="section-header">
                        <HelpCircle className="section-icon" />
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <div className="faq-list">
                        {faqData.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <div
                                    className={`faq-question ${activeAccordion === index ? 'active' : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown
                                        className={`faq-icon ${activeAccordion === index ? 'rotated' : ''}`}
                                    />
                                </div>
                                {activeAccordion === index && (
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default Contact;