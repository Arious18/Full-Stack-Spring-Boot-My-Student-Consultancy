import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import './PrivacyPolicy.css';
import { Shield, Lock, Eye, Database, Globe, Mail, Edit2, Save, X, FileText, AlertTriangle, Cookie, Users, ChevronRight, Scale } from 'lucide-react';

function PrivacyPolicy() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(() => {
        const savedContent = localStorage.getItem('privacyPolicyContent');
        return savedContent ? JSON.parse(savedContent) : {
            heroTitle: 'Privacy Policy for TmTalyp',
            heroDescription: 'Our Commitment to Your Privacy',
            lastUpdated: 'Effective Date: April 26, 2025',
            introduction: 'Welcome to TmTalyp! We are dedicated to helping students navigate their journey towards higher education. Just as we are committed to providing excellent guidance, we are equally committed to protecting the privacy and security of the personal information entrusted to us by our users – students, parents, guardians, and website visitors.\n\n' +
                'This Privacy Policy outlines how TmTalyp ("we," "us," or "our") collects, uses, discloses, and protects your information when you visit our website, use our services, or otherwise interact with us. We value your trust and aim to be transparent about our data practices.\n\n' +
                'Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it. By using our website and services, you acknowledge the practices described in this policy.',
            informationCollect: '# Information We Collect\n\n' +
                'We collect information to provide and improve our services, communicate with you, and fulfill our operational needs. The types of information we may collect include:\n\n' +
                '## Personal Information You Provide Directly\n' +
                '• Contact Information: Name, email address, phone number, mailing address\n' +
                '• Academic Information: Educational history (schools attended, grades, test scores), areas of academic interest, potential fields of study, university preferences, career aspirations\n' +
                '• Application Materials (if applicable): Drafts of personal statements, essays, resumes/CVs, recommendation letters (or information about recommenders), and other documents shared with us for review or guidance\n' +
                '• Demographic Information (Optional): Age, date of birth, gender, nationality (often relevant for university applications or visa guidance)\n' +
                '• Account Information: Username and password if you create an account on our platform\n' +
                '• Communication Records: Records and copies of your correspondence if you contact us (emails, chat logs, inquiry form submissions)\n' +
                '• Payment Information (if applicable): If you purchase services, payment details are typically processed securely by a third-party payment processor, and we may retain transaction details (but usually not full card numbers)\n\n' +
                '## Information We Collect Automatically (Usage Data)\n' +
                '• Log Data: When you visit our website, our servers may automatically record information, including your IP address, browser type and settings, device information, operating system, referring URLs, pages visited, time spent on pages, links clicked, and timestamps\n' +
                '• Cookies and Similar Technologies: We use cookies (small text files placed on your device) and similar tracking technologies (like web beacons or pixels) to operate and personalize the website, analyze usage, track user movements, and gather demographic information. You can manage your cookie preferences through your browser settings',
            howWeUse: '# How We Use Your Information\n\n' +
                'We use the information we collect for various purposes, grounded in providing and enhancing our services:\n\n' +
                '• To Provide and Personalize Our Services: To help you identify suitable universities, fields, faculties, and countries; to assist with application materials; to tailor recommendations to your profile and preferences\n' +
                '• To Communicate With You: To respond to your inquiries, send you information about our services, provide updates on your progress, send administrative information (like policy updates), and request feedback\n' +
                '• To Process Transactions: To manage payments for services rendered (typically via third-party processors)\n' +
                '• To Improve Our Website and Services: To understand how users interact with our website, analyze trends, diagnose technical issues, improve functionality and user experience, and develop new features\n' +
                '• For Marketing and Outreach (with consent where required): To send you newsletters, promotional materials, or information about services that may interest you, based on your preferences and applicable law. You can opt-out of marketing communications at any time\n' +
                '• For Security and Fraud Prevention: To monitor for and prevent fraudulent activity, protect the security of our website and systems, and ensure the integrity of our services\n' +
                '• To Comply with Legal Obligations: To meet legal and regulatory requirements, respond to lawful requests from public authorities, and enforce our terms and conditions',
            legalBasis: '# Legal Basis for Processing Personal Information\n\n' +
                'We process your personal information based on the following legal grounds (depending on the context and applicable law, such as GDPR):\n\n' +
                '• Consent: Where you have given us explicit consent to process your information for a specific purpose (e.g., subscribing to a newsletter)\n' +
                '• Contractual Necessity: Where processing is necessary for the performance of a contract with you (e.g., providing the core consulting services you requested)\n' +
                '• Legitimate Interests: Where processing is necessary for our legitimate interests (or those of a third party), provided your fundamental rights and freedoms do not override those interests (e.g., improving our services, website security, analyzing usage patterns)\n' +
                '• Legal Obligation: Where processing is necessary to comply with a legal or regulatory obligation',
            dataSharing: '# How We Share Your Information\n\n' +
                'We do not sell your personal information. We may share your information in the following circumstances:\n\n' +
                '• With Your Consent: We may share information with third parties (such as specific universities during the application process) when you explicitly instruct us or give us consent to do so\n' +
                '• Service Providers: We engage trusted third-party companies and individuals to perform functions on our behalf (e.g., website hosting, data analysis, payment processing, email delivery, IT support). These providers only have access to the information needed to perform their tasks and are obligated not to disclose or use it for other purposes\n' +
                '• Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency)\n' +
                '• Business Transfers: If TmTalyp is involved in a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction, subject to standard confidentiality arrangements\n' +
                '• To Protect Rights and Safety: We may disclose information where we believe it necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of our Terms of Service, or as otherwise required by law',
            international: '# International Data Transfers\n\n' +
                'Given the nature of our services (helping students find universities globally), your information may be transferred to, stored, and processed in countries other than your own, where data protection laws may differ. We take appropriate measures to ensure that your personal information remains protected when transferred internationally, such as using Standard Contractual Clauses approved by relevant authorities or relying on adequacy decisions where applicable.',
            dataSecurity: '# Data Security\n\n' +
                'We implement reasonable administrative, technical, and physical security measures designed to protect the information we collect from unauthorized access, disclosure, alteration, and destruction. We use encryption, access controls, and other safeguards. However, please be aware that no security system is impenetrable, and we cannot guarantee the absolute security of your data transmitted to our site; any transmission is at your own risk.',
            dataRetention: '# Data Retention\n\n' +
                'We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as for tax, legal, or accounting purposes). The criteria used to determine our retention periods include the duration of your relationship with us, the need to fulfill the services requested, compliance with legal obligations, and the resolution of disputes.',
            yourRights: '# Your Data Protection Rights\n\n' +
                'Depending on your location and applicable data protection laws (like GDPR or CCPA), you may have certain rights regarding your personal information. These may include the right to:\n\n' +
                '• Access: Request access to the personal information we hold about you\n' +
                '• Rectification: Request correction of inaccurate or incomplete information\n' +
                '• Erasure (Right to be Forgotten): Request deletion of your personal information under certain conditions\n' +
                '• Restriction of Processing: Request that we limit the processing of your information under certain circumstances\n' +
                '• Data Portability: Request to receive your information in a structured, commonly used, machine-readable format, or have it transferred directly to another controller where technically feasible\n' +
                '• Object to Processing: Object to the processing of your information based on legitimate interests or for direct marketing purposes\n' +
                '• Withdraw Consent: Withdraw your consent at any time where we rely on consent as the legal basis for processing\n\n' +
                'To exercise any of these rights, please contact us using the details provided below. We will respond to your request in accordance with applicable law. We may need to verify your identity before processing your request.',
            childrenPrivacy: '# Children\'s Privacy\n\n' +
                'Our services are primarily aimed at students applying for higher education, who are typically older teenagers or young adults. Our website and services are not directed at children under the age of 13 (or a higher age threshold depending on the jurisdiction, e.g., 16 under GDPR in some cases). We do not knowingly collect personal information from children under this age without verifiable parental consent. If we learn that we have collected personal information from a child without appropriate consent, we will take steps to delete that information promptly. If you believe we might have any information from or about a child under the relevant age threshold, please contact us.',
            cookies: '# Cookies and Tracking Technologies\n\n' +
                'We use cookies and similar technologies. Cookies are small text files placed on your device that help us operate and personalize the website, analyze usage, track user movements, and gather demographic information. We use several types of cookies including essential cookies (required for basic website functionality), performance cookies (to analyze how users interact with our website), and functionality cookies (to remember your preferences). You can manage your cookie preferences through your browser settings, but please note that disabling certain cookies may affect the functionality of our website.',
            linksToOther: '# Links to Other Websites\n\n' +
                'Our website may contain links to other websites not operated or controlled by TmTalyp. This Privacy Policy does not apply to third-party websites. We encourage you to review the privacy policies of any third-party websites you visit.',
            changes: '# Changes to This Privacy Policy\n\n' +
                'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. If we make material changes, we will notify you by posting the updated policy on our website and updating the "Effective Date" at the top. We encourage you to review this policy periodically to stay informed about how we are protecting your information.',
            contact: '# Contact Us\n\n' +
                'If you have questions about this Privacy Policy or our data practices, please contact us:\n\n' +
                '## TmTalyp Privacy Team\n' +
                'Email: privacy@tmtalyp.com\n' +
                'Phone: +1 (555) 123-4567\n' +
                'Address: 123 Education Street, New York, NY 10001\n\n' +
                'You may also have the right to lodge a complaint with your local data protection authority.',
            ctaTitle: 'Have Questions About Your Privacy?',
            ctaDescription: 'We\'re here to help. Contact our privacy team for any questions or concerns about how we handle your data.'
        };
    });

    const [editingContent, setEditingContent] = useState({ ...content });

    const handleEdit = () => {
        setIsEditing(true);
        setEditingContent({ ...content });
    };

    const handleSave = () => {
        setContent(editingContent);
        localStorage.setItem('privacyPolicyContent', JSON.stringify(editingContent));
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
        <div className="privacy-page-wrapper">
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
            <div className="privacy-hero">
                <div className="privacy-hero-overlay"></div>
                <div className="privacy-hero-content">
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
            <div className="privacy-container">
                {/* Last Updated */}
                <div className="last-updated">
                    <EditableText
                        value={isEditing ? editingContent.lastUpdated : content.lastUpdated}
                        onChange={(value) => handleContentChange('lastUpdated', value)}
                    />
                </div>

                {/* Introduction Section */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Shield className="section-icon" />
                        <h2 className="section-title">Introduction</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.introduction : content.introduction}
                            onChange={(value) => handleContentChange('introduction', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Information We Collect */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Database className="section-icon" />
                        <h2 className="section-title">Information We Collect</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.informationCollect : content.informationCollect}
                            onChange={(value) => handleContentChange('informationCollect', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* How We Use Your Information */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Eye className="section-icon" />
                        <h2 className="section-title">How We Use Your Information</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.howWeUse : content.howWeUse}
                            onChange={(value) => handleContentChange('howWeUse', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Legal Basis for Processing */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Scale className="section-icon" />
                        <h2 className="section-title">Legal Basis for Processing</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.legalBasis : content.legalBasis}
                            onChange={(value) => handleContentChange('legalBasis', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Information Sharing */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Users className="section-icon" />
                        <h2 className="section-title">Information Sharing</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.dataSharing : content.dataSharing}
                            onChange={(value) => handleContentChange('dataSharing', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Data Security */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Lock className="section-icon" />
                        <h2 className="section-title">Data Security</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.dataSecurity : content.dataSecurity}
                            onChange={(value) => handleContentChange('dataSecurity', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Data Retention */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Database className="section-icon" />
                        <h2 className="section-title">Data Retention</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.dataRetention : content.dataRetention}
                            onChange={(value) => handleContentChange('dataRetention', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Your Rights */}
                <section className="privacy-section">
                    <div className="section-header">
                        <FileText className="section-icon" />
                        <h2 className="section-title">Your Rights</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.yourRights : content.yourRights}
                            onChange={(value) => handleContentChange('yourRights', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Cookies */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Cookie className="section-icon" />
                        <h2 className="section-title">Cookies & Tracking</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.cookies : content.cookies}
                            onChange={(value) => handleContentChange('cookies', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Links to Other Websites */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Globe className="section-icon" />
                        <h2 className="section-title">Links to Other Websites</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.linksToOther : content.linksToOther}
                            onChange={(value) => handleContentChange('linksToOther', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* International Transfers */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Globe className="section-icon" />
                        <h2 className="section-title">International Data Transfers</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.international : content.international}
                            onChange={(value) => handleContentChange('international', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Children's Privacy */}
                <section className="privacy-section">
                    <div className="section-header">
                        <AlertTriangle className="section-icon" />
                        <h2 className="section-title">Children's Privacy</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.childrenPrivacy : content.childrenPrivacy}
                            onChange={(value) => handleContentChange('childrenPrivacy', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Changes to Policy */}
                <section className="privacy-section">
                    <div className="section-header">
                        <ChevronRight className="section-icon" />
                        <h2 className="section-title">Changes to This Policy</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.changes : content.changes}
                            onChange={(value) => handleContentChange('changes', value)}
                            multiline={true}
                        />
                    </div>
                </section>

                {/* Contact Us */}
                <section className="privacy-section">
                    <div className="section-header">
                        <Mail className="section-icon" />
                        <h2 className="section-title">Contact Us</h2>
                    </div>
                    <div className="privacy-content">
                        <EditableText
                            value={isEditing ? editingContent.contact : content.contact}
                            onChange={(value) => handleContentChange('contact', value)}
                            multiline={true}
                        />
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
                                {t('contactPrivacyTeam') || 'Contact Privacy Team'}
                            </button>
                            <button className="cta-button secondary">
                                {t('downloadPolicy') || 'Download Policy'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default PrivacyPolicy;