import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import './AboutUs.css';
import { Globe, Users, Award, Target, CheckCircle, Mail, Phone, MapPin, Edit2, Save, X, BookOpen, Compass, Shield, Sparkles } from 'lucide-react';

function AboutUs() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(() => {
        const savedContent = localStorage.getItem('aboutUsContent');
        return savedContent ? JSON.parse(savedContent) : {
            heroTitle: 'TmTalyp - Your Education Journey Partner',
            heroDescription: 'Empowering students to achieve their educational dreams globally',
            ourStory: 'Welcome to TmTalyp! We understand that the journey towards higher education is one of the most exciting, yet potentially daunting, chapters in a student\'s life. The world is filled with incredible opportunities – countless universities, diverse fields of study, vibrant countries, and renowned faculties. But navigating this vast landscape to find the perfect fit can feel overwhelming.\n\n' +
                'That\'s where we come in. We are more than just consultants; we are your dedicated partners, your experienced guides, and your steadfast allies on the path to achieving your academic dreams. Our mission is simple yet profound: To empower every student to discover and secure their ideal place in the world of higher education, ensuring they are perfectly prepared to thrive.\n\n' +
                '# Understanding Student Needs\n\n' +
                'Choosing a university isn\'t just about picking a name from a list. It\'s about finding an environment where you can flourish intellectually, personally, and professionally. It involves critical questions:\n\n' +
                '• What field truly ignites my passion and aligns with my talents?\n' +
                '• Which university offers the specific program, research opportunities, and campus culture that suit me best?\n' +
                '• Which faculty members are leaders in my area of interest?\n' +
                '• Should I study domestically or explore international opportunities in a specific country?\n' +
                '• How do I navigate the complex application processes, write compelling essays, and prepare for interviews?\n' +
                '• How can I be sure I\'m making the right decision for my future?\n\n' +
                'The pressure to make these choices correctly, often with limited information or guidance, can be immense. We recognize these challenges and have built our entire service around alleviating that stress and replacing confusion with clarity and confidence.\n\n' +
                '# Our Comprehensive Solution\n\n' +
                'At TmTalyp, we offer a comprehensive, personalized suite of services designed to meticulously guide students through every stage of the university selection and application process. We help you:\n\n' +
                '## Discover Your Path (Field & Major Exploration)\n' +
                'We work closely with you to understand your interests, strengths, values, and long-term aspirations. Through assessments, discussions, and exploration tools, we help you identify the academic fields and potential career paths that resonate most deeply with you.\n\n' +
                '## Identify Your Ideal Institutions (University & Faculty Matching)\n' +
                'Armed with a clear understanding of your goals, we leverage our extensive global database and deep knowledge of educational systems worldwide. We help you research and shortlist universities that excel in your chosen field, match your academic profile, fit your budget, and offer the right cultural and social environment.\n\n' +
                '## Explore Global Horizons (Country Selection)\n' +
                'For students considering international study, we provide expert guidance on choosing the right country based on academic reputation, cultural fit, visa requirements, cost of living, and future opportunities.\n\n' +
                '## Achieve Application Excellence\n' +
                'Finding the right place is only half the battle. We provide hands-on support to ensure your application stands out:\n' +
                '• Strategic Application Planning\n' +
                '• Compelling Personal Statements & Essays\n' +
                '• Resume/CV Building\n' +
                '• Interview Preparation\n' +
                '• Navigating Requirements\n' +
                '• Holistic Profile Development\n\n' +
                '# Our Approach & Philosophy\n\n' +
                'Our methodology is built on a foundation of personalization, expertise, and unwavering support:\n\n' +
                '• Student-Centric: You are at the heart of everything we do\n' +
                '• Expert Guidance: Our team comprises experienced educational consultants\n' +
                '• Data-Driven Insights: We utilize comprehensive data and analytics\n' +
                '• Empowerment: We equip you with knowledge and confidence\n' +
                '• Holistic Support: We understand this journey impacts the whole family\n' +
                '• Integrity & Transparency: We operate with the highest ethical standards',
            ourMission: 'To provide comprehensive educational guidance and support to students seeking international education opportunities, ensuring they make informed decisions about their academic future.',
            ourVision: 'To be the most trusted global education consultancy, recognized for our commitment to student success and our ability to transform educational aspirations into reality.',
            values: [
                {
                    title: 'Excellence',
                    description: 'We strive for excellence in everything we do, ensuring the highest quality service for our students.'
                },
                {
                    title: 'Integrity',
                    description: 'We operate with complete transparency and honesty in all our dealings.'
                },
                {
                    title: 'Innovation',
                    description: 'We continuously evolve our services to meet the changing needs of international education.'
                },
                {
                    title: 'Support',
                    description: 'We provide comprehensive support throughout your educational journey.'
                }
            ],
            teamMembers: [
                {
                    name: 'John Smith',
                    position: 'CEO & Founder',
                    description: '15+ years experience in international education'
                },
                {
                    name: 'Sarah Johnson',
                    position: 'Head of Admissions',
                    description: 'Expert in university placement and admissions'
                },
                {
                    name: 'Michael Brown',
                    position: 'Student Counselor',
                    description: 'Specialized in student guidance and support'
                },
                {
                    name: 'Emily Davis',
                    position: 'International Relations',
                    description: 'Manages partnerships with global universities'
                }
            ],
            contact: {
                email: 'info@tmtalyp.com',
                phone: '+1 (555) 123-4567',
                address: '123 Education Street, New York, NY 10001'
            },
            ctaTitle: 'Ready to Build Your Future?',
            ctaDescription: 'Let\'s start the conversation today and embark on your educational journey together.'
        };
    });

    const [editingContent, setEditingContent] = useState({ ...content });

    const stats = [
        { value: '10K+', label: 'Students Placed', icon: Users },
        { value: '500+', label: 'Partner Universities', icon: Globe },
        { value: '50+', label: 'Countries', icon: MapPin },
        { value: '15+', label: 'Years Experience', icon: Award }
    ];

    const handleEdit = () => {
        setIsEditing(true);
        setEditingContent({ ...content });
    };

    const handleSave = () => {
        setContent(editingContent);
        localStorage.setItem('aboutUsContent', JSON.stringify(editingContent));
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

    const handleValueChange = (index, field, value) => {
        const newValues = [...editingContent.values];
        newValues[index] = { ...newValues[index], [field]: value };
        setEditingContent(prev => ({
            ...prev,
            values: newValues
        }));
    };

    const handleTeamMemberChange = (index, field, value) => {
        const newTeamMembers = [...editingContent.teamMembers];
        newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
        setEditingContent(prev => ({
            ...prev,
            teamMembers: newTeamMembers
        }));
    };

    const handleContactChange = (field, value) => {
        setEditingContent(prev => ({
            ...prev,
            contact: { ...prev.contact, [field]: value }
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
                    rows={10}
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

    return (
        <div className="about-page-wrapper">
            <Header />



            {/* Hero Section */}
            <div className="about-hero">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
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
            <div className="about-container">
                {/* Our Journey Section */}
                <section className="about-section">
                    <div className="section-header">
                        <BookOpen className="section-icon" />
                        <h2 className="section-title">Our Journey & Commitment</h2>
                    </div>
                    <div className="about-content">
                        <EditableText
                            value={isEditing ? editingContent.ourStory : content.ourStory}
                            onChange={(value) => handleContentChange('ourStory', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stats-overlay"></div>
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <stat.icon className="stat-icon" />
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="about-section">
                    <div className="mission-vision-grid">
                        <div className="mission-vision-item">
                            <div className="section-header">
                                <Compass className="section-icon" />
                                <h2 className="section-title">Our Mission</h2>
                            </div>
                            <EditableText
                                value={isEditing ? editingContent.ourMission : content.ourMission}
                                onChange={(value) => handleContentChange('ourMission', value)}
                                multiline={true}
                            />
                        </div>
                        <div className="mission-vision-item">
                            <div className="section-header">
                                <Sparkles className="section-icon" />
                                <h2 className="section-title">Our Vision</h2>
                            </div>
                            <EditableText
                                value={isEditing ? editingContent.ourVision : content.ourVision}
                                onChange={(value) => handleContentChange('ourVision', value)}
                                multiline={true}
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="about-section">
                    <div className="section-header">
                        <Shield className="section-icon" />
                        <h2 className="section-title">Our Core Values</h2>
                    </div>
                    <div className="values-grid">
                        {(isEditing ? editingContent.values : content.values).map((value, index) => (
                            <div key={index} className="value-item">
                                {index === 0 && <Award className="value-icon" />}
                                {index === 1 && <CheckCircle className="value-icon" />}
                                {index === 2 && <Target className="value-icon" />}
                                {index === 3 && <Users className="value-icon" />}
                                <h3 className="value-title">
                                    <EditableText
                                        value={value.title}
                                        onChange={(val) => handleValueChange(index, 'title', val)}
                                    />
                                </h3>
                                <p className="value-description">
                                    <EditableText
                                        value={value.description}
                                        onChange={(val) => handleValueChange(index, 'description', val)}
                                        multiline={true}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="about-section">
                    <div className="section-header">
                        <Users className="section-icon" />
                        <h2 className="section-title">Our Expert Team</h2>
                    </div>
                    <div className="team-grid">
                        {(isEditing ? editingContent.teamMembers : content.teamMembers).map((member, index) => (
                            <div key={index} className="team-member">
                                <div className="team-member-image">
                                    <img
                                        src={`https://placehold.co/200x200/e2e8f0/1e293b?text=${member.name.split(' ').map(n => n[0]).join('')}`}
                                        alt={member.name}
                                    />
                                </div>
                                <h3 className="team-member-name">
                                    <EditableText
                                        value={member.name}
                                        onChange={(val) => handleTeamMemberChange(index, 'name', val)}
                                    />
                                </h3>
                                <p className="team-member-position">
                                    <EditableText
                                        value={member.position}
                                        onChange={(val) => handleTeamMemberChange(index, 'position', val)}
                                    />
                                </p>
                                <p className="team-member-description">
                                    <EditableText
                                        value={member.description}
                                        onChange={(val) => handleTeamMemberChange(index, 'description', val)}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="about-section contact-section">
                    <div className="section-header">
                        <Mail className="section-icon" />
                        <h2 className="section-title">Get In Touch</h2>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-item">
                            <Mail className="contact-icon" />
                            <h3>Email Us</h3>
                            <p>
                                <EditableText
                                    value={isEditing ? editingContent.contact.email : content.contact.email}
                                    onChange={(val) => handleContactChange('email', val)}
                                />
                            </p>
                        </div>
                        <div className="contact-item">
                            <Phone className="contact-icon" />
                            <h3>Call Us</h3>
                            <p>
                                <EditableText
                                    value={isEditing ? editingContent.contact.phone : content.contact.phone}
                                    onChange={(val) => handleContactChange('phone', val)}
                                />
                            </p>
                        </div>
                        <div className="contact-item">
                            <MapPin className="contact-icon" />
                            <h3>Visit Us</h3>
                            <p>
                                <EditableText
                                    value={isEditing ? editingContent.contact.address : content.contact.address}
                                    onChange={(val) => handleContactChange('address', val)}
                                />
                            </p>
                        </div>
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
                                {t('applyNow') || 'Apply Now'}
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

export default AboutUs;