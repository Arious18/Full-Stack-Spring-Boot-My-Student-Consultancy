import React from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import './footer.css';
import {useNavigate} from "react-router-dom";

function Footer() {

    const navigate = useNavigate();

    return (
        <footer className="foot-footer">
            <div className="foot-footer-container">
                <div className="foot-footer-grid">
                    {/* Brand Section */}
                    <div className="foot-footer-brand">
                        <div className="foot-brand-logo">
                            <span className="foot-logo-text">KuvvatlyEyyam</span>
                        </div>
                        <p className="foot-brand-description">
                            Empowering your digital journey with innovative solutions and exceptional service.
                        </p>
                        <div className="foot-social-icons">
                            <a href="#" className="foot-social-icon"><Facebook /></a>
                            <a href="#" className="foot-social-icon"><Twitter /></a>
                            <a href="#" className="foot-social-icon"><Instagram /></a>
                            <a href="#" className="foot-social-icon"><Linkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="foot-footer-section">
                        <h3 className="foot-section-title">Quick Links</h3>
                        <ul className="foot-link-list">
                            <li><a href="#" className="foot-footer-link">About Us</a></li>
                            <li><a href="#" className="foot-footer-link">Services</a></li>
                            <li><a href="#" className="foot-footer-link">Products</a></li>
                            <li> <a onClick={() => navigate('/AdminDashboard')} className="foot-footer-link"></a>
                        </li>
                            <li><a href="#" className="foot-footer-link">Blog</a></li>
                                <li><a href="#" className="foot-footer-link">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="foot-footer-section">
                        <h3 className="foot-section-title">Support</h3>
                        <ul className="foot-link-list">
                            <li><a href="#" className="foot-footer-link">Help Center</a></li>
                            <li><a href="#" className="foot-footer-link">Privacy Policy</a></li>
                            <li><a href="#" className="foot-footer-link">Terms of Service</a></li>
                            <li><a href="#" className="foot-footer-link">FAQ</a></li>
                            <li><a href="#" className="foot-footer-link">Shipping Info</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="foot-footer-section">
                        <h3 className="foot-section-title">Contact Us</h3>
                        <ul className="foot-contact-list">
                            <li className="foot-contact-item">
                                <MapPin className="foot-contact-icon" />
                                <span>Isparta Turkey</span>
                            </li>
                            <li className="foot-contact-item">
                                <Phone className="foot-contact-icon" />
                                <span>+905013542771</span>
                            </li>
                            <li className="foot-contact-item">
                                <Mail className="foot-contact-icon" />
                                <span>azatvepakulyyev@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="foot-footer-bottom">
                    <p className="foot-copyright">
                        © {new Date().getFullYear()} KuvvatlyEyyam. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;