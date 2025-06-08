import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft, MapPin, DollarSign, Clock, Calendar, Building,
    FileText, Upload, User, Mail, Phone, Briefcase, Award,
    Globe, CheckCircle, AlertCircle, Eye, Star, Save,
    Zap, Target, Heart, ExternalLink, Download, Loader
} from 'lucide-react';
import axios from 'axios';

// Import the CSS file
import './JobApplication.css';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

function JobApplication() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // State for job data
    const [job, setJob] = useState(null);
    const [jobLoading, setJobLoading] = useState(true);
    const [jobError, setJobError] = useState(null);

    // State for user data and authentication
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // State for application form
    const [applicationData, setApplicationData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        currentPosition: '',
        currentCompany: '',
        yearsOfExperience: '',
        coverLetter: '',
        expectedSalary: '',
        expectedSalaryCurrency: 'USD',
        noticePeriod: '',
        willingToRelocate: false,
        remoteWorkPreference: false,
        portfolioUrl: '',
        additionalNotes: '',
        linkedinProfile: '',
        githubProfile: '',
        availability: '',
        preferredStartDate: '',
        reasonForLeaving: '',
        salaryExpectations: '',
        workAuthorization: '',
        referralSource: ''
    });

    // State for form handling
    const [resume, setResume] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // State for form mode
    const [useUserData, setUseUserData] = useState(false);

    useEffect(() => {
        // Fetch job details
        const fetchJob = async () => {
            try {
                setJobLoading(true);
                const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}`, {
                    params: { skipViewIncrement: true }
                });
                setJob(response.data);
                setJobError(null);
            } catch (err) {
                console.error('Error fetching job:', err);
                setJobError('Failed to load job details');
            } finally {
                setJobLoading(false);
            }
        };

        // Fetch user data if authenticated
        const fetchUserData = async () => {
            try {
                setUserLoading(true);
                const response = await axios.get('http://localhost:8080/api/job-applications/user-data');

                if (response.data.authenticated) {
                    setIsAuthenticated(true);
                    setUser(response.data.userData);
                    setUseUserData(true);

                    // Pre-fill form with user data
                    setApplicationData(prev => ({
                        ...prev,
                        fullName: response.data.userData.fullName || '',
                        email: response.data.userData.email || '',
                        phoneNumber: response.data.userData.phoneNumber || '',
                        currentPosition: response.data.userData.currentPosition || '',
                        currentCompany: response.data.userData.currentCompany || '',
                        yearsOfExperience: response.data.userData.yearsOfExperience || ''
                    }));
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };

        if (jobId) {
            fetchJob();
            fetchUserData();
        }
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setApplicationData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                setValidationErrors(prev => ({
                    ...prev,
                    resume: 'Please upload a PDF or Word document'
                }));
                return;
            }

            if (file.size > maxSize) {
                setValidationErrors(prev => ({
                    ...prev,
                    resume: 'File size must be less than 5MB'
                }));
                return;
            }

            setResume(file);
            setValidationErrors(prev => ({
                ...prev,
                resume: null
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        // Required fields
        if (!applicationData.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }

        if (!applicationData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!applicationData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (!applicationData.coverLetter.trim()) {
            errors.coverLetter = 'Cover letter is required';
        } else if (applicationData.coverLetter.length < 50) {
            errors.coverLetter = 'Cover letter must be at least 50 characters';
        }

        // Optional but validated fields
        if (applicationData.portfolioUrl && !/^https?:\/\//.test(applicationData.portfolioUrl)) {
            errors.portfolioUrl = 'Please enter a valid URL (including http:// or https://)';
        }

        if (applicationData.linkedinProfile && !/^https?:\/\//.test(applicationData.linkedinProfile)) {
            errors.linkedinProfile = 'Please enter a valid LinkedIn URL';
        }

        if (applicationData.githubProfile && !/^https?:\/\//.test(applicationData.githubProfile)) {
            errors.githubProfile = 'Please enter a valid GitHub URL';
        }

        if (applicationData.expectedSalary && (isNaN(applicationData.expectedSalary) || applicationData.expectedSalary < 0)) {
            errors.expectedSalary = 'Please enter a valid salary amount';
        }

        if (applicationData.yearsOfExperience && (isNaN(applicationData.yearsOfExperience) || applicationData.yearsOfExperience < 0)) {
            errors.yearsOfExperience = 'Please enter a valid number of years';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);

            const formData = new FormData();

            // Add all application data to FormData
            Object.keys(applicationData).forEach(key => {
                if (applicationData[key] !== null && applicationData[key] !== '') {
                    formData.append(key, applicationData[key]);
                }
            });

            // Add resume if uploaded
            if (resume) {
                formData.append('resume', resume);
            }

            const endpoint = isAuthenticated
                ? `http://localhost:8080/api/job-applications/quick-apply/${jobId}`
                : `http://localhost:8080/api/job-applications/apply/${jobId}`;

            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSubmitSuccess(true);

            // Redirect after successful submission
            setTimeout(() => {
                navigate('/jobs', {
                    state: {
                        message: 'Application submitted successfully! We will review your application and get back to you soon.'
                    }
                });
            }, 3000);

        } catch (err) {
            console.error('Error submitting application:', err);
            if (err.response?.status === 409) {
                setSubmitError('You have already applied for this position.');
            } else {
                setSubmitError(err.response?.data?.message || 'Failed to submit application. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleQuickApply = async () => {
        if (!isAuthenticated) {
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);

            const formData = new FormData();
            if (applicationData.coverLetter) {
                formData.append('coverLetter', applicationData.coverLetter);
            }
            if (resume) {
                formData.append('resume', resume);
            }

            const response = await axios.post(
                `http://localhost:8080/api/job-applications/quick-apply/${jobId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setSubmitSuccess(true);

            setTimeout(() => {
                navigate('/jobs', {
                    state: {
                        message: 'Quick application submitted successfully!'
                    }
                });
            }, 2000);

        } catch (err) {
            console.error('Error with quick apply:', err);
            if (err.response?.status === 409) {
                setSubmitError('You have already applied for this position.');
            } else {
                setSubmitError(err.response?.data?.message || 'Failed to submit application.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const formatSalary = (job) => {
        if (!job.salaryMin && !job.salaryMax) {
            return job.salaryNegotiable ? 'Competitive' : 'Not disclosed';
        }

        const formatAmount = (amount) => {
            if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
            if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
            return `$${amount.toLocaleString()}`;
        };

        if (job.salaryMin && job.salaryMax) {
            return `${formatAmount(job.salaryMin)} - ${formatAmount(job.salaryMax)}`;
        }
        return formatAmount(job.salaryMin || job.salaryMax);
    };

    const getDaysAgo = (dateString) => {
        if (!dateString) return null;
        const diffDays = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        return `${Math.floor(diffDays / 7)} weeks ago`;
    };

    if (jobLoading || userLoading) {
        return (
            <div className="JobAppWrapper">
                <Header />
                <div className="JobAppLoadingContainer">
                    <div className="JobAppLoadingSpinner">
                        <Loader size={48} />
                    </div>
                    <div className="JobAppLoadingContent">
                        <h3>Loading Application Form</h3>
                        <p>Please wait while we prepare your application...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (jobError || !job) {
        return (
            <div className="JobAppWrapper">
                <Header />
                <div className="JobAppErrorContainer">
                    <div className="JobAppErrorContent">
                        <AlertCircle size={48} className="JobAppErrorIcon" />
                        <h2>Unable to Load Job</h2>
                        <p>{jobError || 'Job not found'}</p>
                        <div className="JobAppErrorActions">
                            <button onClick={() => navigate('/jobList')} className="JobAppButtonPrimary">
                                Browse Jobs
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (submitSuccess) {
        return (
            <div className="JobAppWrapper">
                <Header />
                <div className="JobAppSuccessContainer">
                    <div className="JobAppSuccessContent">
                        <CheckCircle size={64} className="JobAppSuccessIcon" />
                        <h2>Application Submitted Successfully!</h2>
                        <p>Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>.</p>
                        <p>We'll review your application and get back to you within 5-7 business days.</p>
                        <div className="JobAppSuccessActions">
                            <button onClick={() => navigate('/jobs')} className="JobAppButtonPrimary">
                                Browse More Jobs
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="JobAppWrapper">
            <Header />

            {/* Header Section */}
            <header className="JobAppHeader">
                <div className="JobAppHeaderContainer">
                    <nav className="JobAppHeaderNavigation">
                        <button onClick={() => navigate(`/job/${jobId}`)} className="JobAppBackButton">
                            <ArrowLeft size={18} />
                            <span>Back to Job Details</span>
                        </button>
                    </nav>

                    {/* Job Summary Card */}
                    <div className="JobAppJobSummary">
                        <div className="JobAppJobSummaryContent">
                            <div className="JobAppJobInfo">
                                <div className="JobAppCompanyLogo">
                                    {job.companyLogo ? (
                                        <img src={job.companyLogo} alt={`${job.company} logo`} />
                                    ) : (
                                        <Building size={32} />
                                    )}
                                </div>
                                <div className="JobAppJobDetails">
                                    <h1 className="JobAppJobTitle">{job.title}</h1>
                                    <div className="JobAppCompanyInfo">
                                        <Briefcase size={16} />
                                        <span>{job.company}</span>
                                    </div>
                                    <div className="JobAppJobMeta">
                                        <div className="JobAppMetaItem">
                                            <MapPin size={14} />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="JobAppMetaItem">
                                            <Clock size={14} />
                                            <span>{job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1).replace('-', ' ')}</span>
                                        </div>
                                        <div className="JobAppMetaItem">
                                            <DollarSign size={14} />
                                            <span>{formatSalary(job)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="JobAppJobBadges">
                                {job.featured && (
                                    <span className="JobAppBadge featured">
                                        <Star size={12} />
                                        Featured
                                    </span>
                                )}
                                {job.remoteAllowed && (
                                    <span className="JobAppBadge remote">
                                        <Globe size={12} />
                                        Remote
                                    </span>
                                )}
                                {job.isUrgent && (
                                    <span className="JobAppBadge urgent">
                                        <Zap size={12} />
                                        Urgent
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="JobAppContainer">
                <div className="JobAppContent">
                    {/* Application Form */}
                    <div className="JobAppFormSection">
                        <div className="JobAppFormHeader">
                            <h2>Apply for this Position</h2>
                            {isAuthenticated && (
                                <div className="JobAppUserStatus">
                                    <User size={16} />
                                    <span>Signed in as {user?.fullName || user?.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Error Display */}
                        {submitError && (
                            <div className="JobAppAlert JobAppAlertError">
                                <AlertCircle size={16} />
                                {submitError}
                            </div>
                        )}

                        {/* Quick Apply Option for Authenticated Users */}
                        {isAuthenticated && useUserData && (
                            <div className="JobAppQuickApplySection">
                                <div className="JobAppQuickApplyCard">
                                    <div className="JobAppQuickApplyHeader">
                                        <Zap size={20} />
                                        <h3>Quick Apply</h3>
                                        <span className="JobAppRecommended">Recommended</span>
                                    </div>
                                    <p>Use your saved profile information to apply quickly with just a cover letter.</p>

                                    <button
                                        onClick={handleQuickApply}
                                        disabled={submitting}
                                        className="JobAppQuickApplyButton"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader size={18} className="JobAppSpinner" />
                                                Applying...
                                            </>
                                        ) : (
                                            <>
                                                <Zap size={18} />
                                                Quick Apply Now
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="JobAppDivider">
                                    <span>Or fill out the detailed form below</span>
                                </div>
                            </div>
                        )}

                        {/* Main Application Form */}
                        <form onSubmit={handleSubmit} className="JobAppForm">
                            {/* Personal Information */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <User size={18} />
                                    Personal Information
                                </h3>

                                <div className="JobAppFormGrid">
                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">
                                            Full Name <span className="JobAppRequired">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={applicationData.fullName}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="Your full name"
                                            required
                                        />
                                        {validationErrors.fullName && (
                                            <span className="JobAppErrorText">{validationErrors.fullName}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">
                                            Email Address <span className="JobAppRequired">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={applicationData.email}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                        {validationErrors.email && (
                                            <span className="JobAppErrorText">{validationErrors.email}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">
                                            Phone Number <span className="JobAppRequired">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={applicationData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="+1 (555) 123-4567"
                                            required
                                        />
                                        {validationErrors.phoneNumber && (
                                            <span className="JobAppErrorText">{validationErrors.phoneNumber}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Portfolio URL</label>
                                        <input
                                            type="url"
                                            name="portfolioUrl"
                                            value={applicationData.portfolioUrl}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="https://yourportfolio.com"
                                        />
                                        {validationErrors.portfolioUrl && (
                                            <span className="JobAppErrorText">{validationErrors.portfolioUrl}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            name="linkedinProfile"
                                            value={applicationData.linkedinProfile}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                        {validationErrors.linkedinProfile && (
                                            <span className="JobAppErrorText">{validationErrors.linkedinProfile}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">GitHub Profile</label>
                                        <input
                                            type="url"
                                            name="githubProfile"
                                            value={applicationData.githubProfile}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="https://github.com/yourusername"
                                        />
                                        {validationErrors.githubProfile && (
                                            <span className="JobAppErrorText">{validationErrors.githubProfile}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Professional Experience */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <Briefcase size={18} />
                                    Professional Experience
                                </h3>

                                <div className="JobAppFormGrid">
                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Current Position</label>
                                        <input
                                            type="text"
                                            name="currentPosition"
                                            value={applicationData.currentPosition}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="Senior Software Engineer"
                                        />
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Current Company</label>
                                        <input
                                            type="text"
                                            name="currentCompany"
                                            value={applicationData.currentCompany}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="Tech Company Inc."
                                        />
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Years of Experience</label>
                                        <input
                                            type="number"
                                            name="yearsOfExperience"
                                            value={applicationData.yearsOfExperience}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            placeholder="5"
                                            min="0"
                                            max="50"
                                        />
                                        {validationErrors.yearsOfExperience && (
                                            <span className="JobAppErrorText">{validationErrors.yearsOfExperience}</span>
                                        )}
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Expected Salary</label>
                                        <div className="JobAppSalaryInput">
                                            <select
                                                name="expectedSalaryCurrency"
                                                value={applicationData.expectedSalaryCurrency}
                                                onChange={handleInputChange}
                                                className="JobAppFormSelect JobAppCurrencySelect"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                                <option value="CAD">CAD</option>
                                            </select>
                                            <input
                                                type="number"
                                                name="expectedSalary"
                                                value={applicationData.expectedSalary}
                                                onChange={handleInputChange}
                                                className="JobAppFormInput"
                                                placeholder="75000"
                                                min="0"
                                            />
                                        </div>
                                        {validationErrors.expectedSalary && (
                                            <span className="JobAppErrorText">{validationErrors.expectedSalary}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <FileText size={18} />
                                    Cover Letter
                                </h3>

                                <div className="JobAppFormGroup">
                                    <label className="JobAppFormLabel">
                                        Cover Letter <span className="JobAppRequired">*</span>
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        value={applicationData.coverLetter}
                                        onChange={handleInputChange}
                                        className="JobAppTextarea"
                                        placeholder="Dear Hiring Manager,&#10;&#10;I am writing to express my interest in the [position] role at [company]. With my background in [relevant experience], I believe I would be a valuable addition to your team.&#10;&#10;[Your compelling reasons why you're perfect for this role]&#10;&#10;I look forward to hearing from you.&#10;&#10;Best regards,&#10;[Your name]"
                                        rows={8}
                                        maxLength={2000}
                                        required
                                    />
                                    <div className="JobAppCharCounter">
                                        {applicationData.coverLetter.length}/2000 characters
                                    </div>
                                    {validationErrors.coverLetter && (
                                        <span className="JobAppErrorText">{validationErrors.coverLetter}</span>
                                    )}
                                    <p className="JobAppHelpText">
                                        Write a compelling cover letter that highlights your relevant experience and enthusiasm for this role.
                                    </p>
                                </div>
                            </div>

                            {/* Resume Upload */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <Upload size={18} />
                                    Resume & Documents
                                </h3>

                                <div className="JobAppFormGroup">
                                    <label className="JobAppFormLabel">Resume/CV</label>
                                    <div className="JobAppFileUpload">
                                        <input
                                            type="file"
                                            id="resume"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                            className="JobAppFileInput"
                                        />
                                        <label htmlFor="resume" className="JobAppFileLabel">
                                            <Upload size={18} />
                                            {resume ? resume.name : 'Upload Resume (PDF, DOC, DOCX - Max 5MB)'}
                                        </label>
                                    </div>
                                    {validationErrors.resume && (
                                        <span className="JobAppErrorText">{validationErrors.resume}</span>
                                    )}
                                    <p className="JobAppHelpText">
                                        Please upload your most recent resume. Accepted formats: PDF, DOC, DOCX (Max 5MB)
                                    </p>
                                </div>
                            </div>

                            {/* Availability & Preferences */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <Calendar size={18} />
                                    Availability & Preferences
                                </h3>

                                <div className="JobAppFormGrid">
                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Notice Period</label>
                                        <select
                                            name="noticePeriod"
                                            value={applicationData.noticePeriod}
                                            onChange={handleInputChange}
                                            className="JobAppFormSelect"
                                        >
                                            <option value="">Select notice period</option>
                                            <option value="immediate">Available Immediately</option>
                                            <option value="2_weeks">2 Weeks</option>
                                            <option value="1_month">1 Month</option>
                                            <option value="2_months">2 Months</option>
                                            <option value="3_months">3 Months</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Preferred Start Date</label>
                                        <input
                                            type="date"
                                            name="preferredStartDate"
                                            value={applicationData.preferredStartDate}
                                            onChange={handleInputChange}
                                            className="JobAppFormInput"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">Work Authorization</label>
                                        <select
                                            name="workAuthorization"
                                            value={applicationData.workAuthorization}
                                            onChange={handleInputChange}
                                            className="JobAppFormSelect"
                                        >
                                            <option value="">Select work authorization</option>
                                            <option value="citizen">US Citizen</option>
                                            <option value="permanent_resident">Permanent Resident</option>
                                            <option value="work_visa">Work Visa</option>
                                            <option value="requires_sponsorship">Requires Sponsorship</option>
                                        </select>
                                    </div>

                                    <div className="JobAppFormGroup">
                                        <label className="JobAppFormLabel">How did you hear about us?</label>
                                        <select
                                            name="referralSource"
                                            value={applicationData.referralSource}
                                            onChange={handleInputChange}
                                            className="JobAppFormSelect"
                                        >
                                            <option value="">Select source</option>
                                            <option value="job_board">Job Board</option>
                                            <option value="company_website">Company Website</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="referral">Employee Referral</option>
                                            <option value="recruiter">Recruiter</option>
                                            <option value="social_media">Social Media</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="JobAppCheckboxGroup">
                                    <label className="JobAppCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            name="willingToRelocate"
                                            checked={applicationData.willingToRelocate}
                                            onChange={handleInputChange}
                                            className="JobAppCheckbox"
                                        />
                                        <span className="JobAppCheckboxText">
                                            I am willing to relocate for this position
                                        </span>
                                    </label>

                                    <label className="JobAppCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            name="remoteWorkPreference"
                                            checked={applicationData.remoteWorkPreference}
                                            onChange={handleInputChange}
                                            className="JobAppCheckbox"
                                        />
                                        <span className="JobAppCheckboxText">
                                            I prefer remote work arrangements
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="JobAppFormSection">
                                <h3 className="JobAppSectionTitle">
                                    <Target size={18} />
                                    Additional Information
                                </h3>

                                <div className="JobAppFormGroup">
                                    <label className="JobAppFormLabel">Reason for Leaving Current Position</label>
                                    <textarea
                                        name="reasonForLeaving"
                                        value={applicationData.reasonForLeaving}
                                        onChange={handleInputChange}
                                        placeholder="Brief explanation of why you're looking for a new opportunity..."
                                        className="JobAppTextarea"
                                        rows={3}
                                        maxLength={500}
                                    />
                                    <div className="JobAppCharCounter">
                                        {applicationData.reasonForLeaving.length}/500 characters
                                    </div>
                                </div>

                                <div className="JobAppFormGroup">
                                    <label className="JobAppFormLabel">Additional Notes</label>
                                    <textarea
                                        name="additionalNotes"
                                        value={applicationData.additionalNotes}
                                        onChange={handleInputChange}
                                        placeholder="Any additional information you'd like to share..."
                                        className="JobAppTextarea"
                                        rows={4}
                                        maxLength={1000}
                                    />
                                    <div className="JobAppCharCounter">
                                        {applicationData.additionalNotes.length}/1000 characters
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="JobAppSubmitSection">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="JobAppSubmitButton"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader size={18} className="JobAppSpinner" />
                                            Submitting Application...
                                        </>
                                    ) : (
                                        <>
                                            <FileText size={18} />
                                            Submit Application
                                        </>
                                    )}
                                </button>

                                <p className="JobAppDisclaimer">
                                    By submitting this application, you agree to our terms of service and privacy policy.
                                    We will only use your information for recruitment purposes.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <aside className="JobAppSidebar">
                        {/* Job Summary */}
                        <div className="JobAppSidebarCard">
                            <h3 className="JobAppSidebarTitle">Position Summary</h3>
                            <div className="JobAppJobSummaryDetails">
                                <div className="JobAppDetailItem">
                                    <Briefcase size={16} />
                                    <div>
                                        <span className="JobAppDetailLabel">Employment Type</span>
                                        <span className="JobAppDetailValue">
                                            {job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1).replace('-', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {job.experienceLevel && (
                                    <div className="JobAppDetailItem">
                                        <Award size={16} />
                                        <div>
                                            <span className="JobAppDetailLabel">Experience Level</span>
                                            <span className="JobAppDetailValue">
                                                {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="JobAppDetailItem">
                                    <MapPin size={16} />
                                    <div>
                                        <span className="JobAppDetailLabel">Location</span>
                                        <span className="JobAppDetailValue">{job.location}</span>
                                    </div>
                                </div>

                                <div className="JobAppDetailItem">
                                    <DollarSign size={16} />
                                    <div>
                                        <span className="JobAppDetailLabel">Salary</span>
                                        <span className="JobAppDetailValue">{formatSalary(job)}</span>
                                    </div>
                                </div>

                                <div className="JobAppDetailItem">
                                    <Calendar size={16} />
                                    <div>
                                        <span className="JobAppDetailLabel">Posted</span>
                                        <span className="JobAppDetailValue">{getDaysAgo(job.createdAt)}</span>
                                    </div>
                                </div>

                                {job.applicationDeadline && (
                                    <div className="JobAppDetailItem">
                                        <Clock size={16} />
                                        <div>
                                            <span className="JobAppDetailLabel">Deadline</span>
                                            <span className="JobAppDetailValue">
                                                {new Date(job.applicationDeadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Required Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <div className="JobAppSidebarCard">
                                <h3 className="JobAppSidebarTitle">Required Skills</h3>
                                <div className="JobAppSkillsList">
                                    {job.skills.map((skill, index) => (
                                        <span key={index} className="JobAppSkillTag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="JobAppSidebarCard">
                                <h3 className="JobAppSidebarTitle">Benefits & Perks</h3>
                                <div className="JobAppBenefitsList">
                                    {job.benefits.map((benefit, index) => (
                                        <div key={index} className="JobAppBenefitItem">
                                            <CheckCircle size={14} />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Application Tips */}
                        <div className="JobAppSidebarCard JobAppTipsCard">
                            <h3 className="JobAppSidebarTitle">Application Tips</h3>
                            <div className="JobAppTipsList">
                                <div className="JobAppTip">
                                    <Target size={14} />
                                    <span>Tailor your cover letter to this specific role</span>
                                </div>
                                <div className="JobAppTip">
                                    <FileText size={14} />
                                    <span>Highlight relevant experience in your resume</span>
                                </div>
                                <div className="JobAppTip">
                                    <Zap size={14} />
                                    <span>Mention specific skills from the job description</span>
                                </div>
                                <div className="JobAppTip">
                                    <Eye size={14} />
                                    <span>Proofread your application before submitting</span>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="JobAppSidebarCard">
                            <h3 className="JobAppSidebarTitle">About {job.company}</h3>
                            <div className="JobAppCompanyProfile">
                                <div className="JobAppCompanyLogo">
                                    {job.companyLogo ? (
                                        <img src={job.companyLogo} alt={`${job.company} logo`} />
                                    ) : (
                                        <Building size={24} />
                                    )}
                                </div>
                                <div className="JobAppCompanyDetails">
                                    <h4>{job.company}</h4>
                                    {job.industry && <p>{job.industry}</p>}
                                    <button
                                        onClick={() => navigate(`/job/${jobId}`)}
                                        className="JobAppViewJobButton"
                                    >
                                        <ExternalLink size={14} />
                                        View Full Job Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default JobApplication;