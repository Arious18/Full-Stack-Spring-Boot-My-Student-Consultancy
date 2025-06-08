import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft, MapPin, DollarSign, Clock, Calendar, Users, Award,
    Briefcase, Globe, Star, TrendingUp, Eye, ExternalLink, Mail,
    Share2, BookmarkPlus, AlertCircle, CheckCircle, Building,
    GraduationCap, Zap, Heart, FileText, Target, Phone, Shield,
    Download, Copy, LinkedinIcon, TwitterIcon, FacebookIcon
} from 'lucide-react';
import axios from 'axios';
import "./JobDetails.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx"; // This will now import the updated CSS

function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
                setJob(response.data);
                setError(null);

                const bookmarks = JSON.parse(localStorage.getItem('jobBookmarks') || '[]');
                setBookmarked(bookmarks.includes(response.data.id));

                if (response.data.company) {
                    try {
                        const relatedResponse = await axios.get('http://localhost:8080/api/jobs', {
                            params: { company: response.data.company, status: 'active' }
                        });
                        setRelatedJobs(relatedResponse.data.filter(j => j.id !== id).slice(0, 3));
                    } catch (relatedError) {
                        console.warn('Could not fetch related jobs:', relatedError);
                    }
                }
            } catch (err) {
                console.error('Error fetching job details:', err);
                setError(t('errorFetchingJobDetails') || 'Failed to load job details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJobDetail();
        }
    }, [id, t]);

    const handleBack = () => {
        navigate(-1);
    };
    const handleApply = () => {
        // Always navigate to internal application form
        navigate(`/job/${job.id}/jobApply`);
    };
    const handleShare = async (platform) => {
        const url = window.location.href;
        const title = `${job.title} at ${job.company}`;
        const text = `Check out this job opportunity: ${title}`;

        if (platform === 'native' && navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(url);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.log('Error copying:', err);
            }
        } else {
            const shareUrls = {
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
            };

            if (shareUrls[platform]) {
                window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            }
        }
        setShareMenuOpen(false);
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        const bookmarks = JSON.parse(localStorage.getItem('jobBookmarks') || '[]');
        if (!bookmarked) {
            bookmarks.push(job.id);
        } else {
            const index = bookmarks.indexOf(job.id);
            if (index > -1) bookmarks.splice(index, 1);
        }
        localStorage.setItem('jobBookmarks', JSON.stringify(bookmarks));
    };

    const formatSalary = (job) => {
        if (!job.salaryMin && !job.salaryMax) {
            return job.salaryNegotiable ? 'Competitive' : 'Not disclosed';
        }

        const formatAmount = (amount) => {
            if (amount >= 1000000) {
                return `$${(amount / 1000000).toFixed(1)}M`;
            }
            if (amount >= 1000) {
                return `$${(amount / 1000).toFixed(0)}K`;
            }
            return `$${amount.toLocaleString()}`;
        };

        if (job.salaryMin && job.salaryMax) {
            return `${formatAmount(job.salaryMin)} - ${formatAmount(job.salaryMax)}`;
        }

        return formatAmount(job.salaryMin || job.salaryMax);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDaysAgo = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const isJobExpired = () => {
        if (!job?.applicationDeadline) return false;
        return new Date(job.applicationDeadline) < new Date();
    };

    const getUrgencyStatus = () => {
        if (!job?.applicationDeadline) return null;
        const deadline = new Date(job.applicationDeadline);
        const now = new Date();
        const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

        if (daysUntilDeadline < 0) return { type: 'expired', text: 'Application Closed' };
        if (daysUntilDeadline <= 3) return { type: 'urgent', text: 'Closing Soon' };
        if (daysUntilDeadline <= 7) return { type: 'warning', text: 'Apply Soon' };
        return null;
    };

    if (loading) {
        return (
            <div className="JoDeWrapper">
                <div className="JoDeLoadingContainer">
                    <div className="JoDeLoadingSpinner"></div>
                    <div className="JoDeLoadingContent">
                        <h3>Loading Job Details</h3>
                        <p>Please wait while we fetch the latest information...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="JoDeWrapper">
                <div className="JoDeErrorContainer">
                    <div className="JoDeErrorContent">
                        <AlertCircle size={48} className="JoDeErrorIcon" />
                        <h2>Unable to Load Job</h2>
                        <p>{error}</p>
                        <div className="JoDeErrorActions">
                            <button onClick={handleBack} className="JoDeButtonSecondary">
                                <ArrowLeft size={16} />
                                Go Back
                            </button>
                            <button onClick={() => window.location.reload()} className="JoDeButtonPrimary">
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="JoDeWrapper">
                <div className="JoDeErrorContainer">
                    <div className="JoDeErrorContent">
                        <Eye size={48} className="JoDeErrorIcon" />
                        <h2>Job Not Found</h2>
                        <p>The position you're looking for may have been filled or is no longer available.</p>
                        <button onClick={handleBack} className="JoDeButtonPrimary">
                            <ArrowLeft size={16} />
                            Browse Other Opportunities
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const urgencyStatus = getUrgencyStatus();

    return (
        <>
            <Header/>
        <div className="JoDeWrapper">
            {/* Header Section */}
            <header className="JoDeHeader">
                <div className="JoDeHeaderContainer">
                    <nav className="JoDeHeaderNavigation">
                        <button onClick={handleBack} className="JoDeBackButton">
                            <ArrowLeft size={18} />
                            <span>Back to Search</span>
                        </button>
                        <div className="JoDeHeaderMeta">
                            <span className="JoDeJobId">Job ID: {job.id}</span>
                            <span className="JoDeLastUpdated">Updated {getDaysAgo(job.updatedAt || job.createdAt)}</span>
                        </div>
                    </nav>

                    <div className="JoDeJobHeaderContent">
                        <div className="JoDeJobHeaderMain">
                            <div className="JoDeCompanySection">
                                <div className="JoDeCompanyLogo">
                                    {job.companyLogo ? (
                                        <img src={job.companyLogo} alt={`${job.company} logo`} />
                                    ) : (
                                        <Building size={32} />
                                    )}
                                </div>
                                <div className="JoDeCompanyInfo">
                                    <h3 className="JoDeCompanyName">{job.company}</h3>
                                    <div className="JoDeCompanyMeta">
                                        {job.industry && <span>{job.industry}</span>}
                                        <span>View all jobs</span>
                                    </div>
                                </div>
                            </div>

                            <div className="JoDeJobTitleSection">
                                <div className="JoDeTitleHeader">
                                    <h1 className="JoDeJobTitle">{job.title}</h1>
                                    <div className="JoDeJobBadges">
                                        {job.featured && (
                                            <span className="JoDeBadge featured">
                                                <Star size={12} />
                                                Featured
                                            </span>
                                        )}
                                        {urgencyStatus && (
                                            <span className={`JoDeBadge ${urgencyStatus.type}`}>
                                                <Clock size={12} />
                                                {urgencyStatus.text}
                                            </span>
                                        )}
                                        {job.remoteAllowed && (
                                            <span className="JoDeBadge remote">
                                                <Globe size={12} />
                                                Remote Friendly
                                            </span>
                                        )}
                                        {job.salaryNegotiable && (
                                            <span className="JoDeBadge negotiable">
                                                <DollarSign size={12} />
                                                Negotiable
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="JoDeJobMetaGrid">
                                    <div className="JoDeMetaItem">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="JoDeMetaItem">
                                        <Briefcase size={16} />
                                        <span>{job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1).replace(/[-_]/g, ' ')}</span>
                                    </div>
                                    {job.experienceLevel && (
                                        <div className="JoDeMetaItem">
                                            <GraduationCap size={16} />
                                            <span>{job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}</span>
                                        </div>
                                    )}
                                    <div className="JoDeMetaItem">
                                        <Eye size={16} />
                                        <span>{job.viewCount?.toLocaleString() || 0} views</span>
                                    </div>
                                    <div className="JoDeMetaItem">
                                        <Calendar size={16} />
                                        <span>Posted {getDaysAgo(job.createdAt)}</span>
                                    </div>
                                    {job.applicationCount > 0 && (
                                        <div className="JoDeMetaItem">
                                            <Users size={16} />
                                            <span>{job.applicationCount} applicants</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="JoDeJobActionsSection">
                                <div className="JoDeSalaryContainer">
                                    <div className="JoDeSalaryDisplay">
                                        <DollarSign size={20} />
                                        <div className="JoDeSalaryDetails">
                                            <span className="JoDeSalaryAmount">{formatSalary(job)}</span>
                                            {job.salaryPeriod && job.salaryPeriod !== 'annually' && (
                                                <span className="JoDeSalaryPeriod">per {job.salaryPeriod}</span>
                                            )}
                                        </div>
                                    </div>
                                    {job.benefits && job.benefits.length > 0 && (
                                        <div className="JoDeBenefitsPreview">
                                            <Shield size={14} />
                                            <span>+ {job.benefits.length} benefits</span>
                                        </div>
                                    )}
                                </div>

                                <div className="JoDeActionButtons">
                                    <div className="JoDeSecondaryActions">
                                        <button
                                            onClick={handleBookmark}
                                            className={`JoDeIconButton ${bookmarked ? 'active' : ''}`}
                                            title={bookmarked ? 'Remove from saved' : 'Save job'}
                                        >
                                            {bookmarked ? <Heart size={18} fill="currentColor" /> : <BookmarkPlus size={18} />}
                                        </button>

                                        <div className="JoDeShareDropdown">
                                            <button
                                                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                                                className="JoDeIconButton"
                                                title="Share job"
                                            >
                                                <Share2 size={18} />
                                            </button>

                                            {shareMenuOpen && (
                                                <div className="JoDeShareMenu">
                                                    <button onClick={() => handleShare('copy')} className="JoDeShareOption">
                                                        <Copy size={16} />
                                                        {copySuccess ? 'Copied!' : 'Copy Link'}
                                                    </button>
                                                    <button onClick={() => handleShare('linkedin')} className="JoDeShareOption">
                                                        <LinkedinIcon size={16} />
                                                        LinkedIn
                                                    </button>
                                                    <button onClick={() => handleShare('twitter')} className="JoDeShareOption">
                                                        <TwitterIcon size={16} />
                                                        Twitter
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleApply}
                                        className={`JoDeApplyButton ${isJobExpired() ? 'disabled' : 'primary'}`}
                                        disabled={isJobExpired()}
                                    >
                                        {isJobExpired() ? (
                                            <>
                                                <AlertCircle size={18} />
                                                Application Closed
                                            </>
                                        ) : (
                                            <>
                                                <ExternalLink size={18} />
                                                Apply for Position
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Application Deadline Alert */}
                        {job.applicationDeadline && !isJobExpired() && (
                            <div className={`JoDeDeadlineAlert ${urgencyStatus?.type || 'info'}`}>
                                <Clock size={16} />
                                <span>Application deadline: {formatDate(job.applicationDeadline)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="JoDeContainer">
                <div className="JoDeContent">
                    {/* Primary Content */}
                    <div className="JoDeJobMainContent">
                        {/* Job Description */}
                        <section className="JoDeContentSection">
                            <header className="JoDeSectionHeader">
                                <h2>
                                    <FileText size={20} />
                                    Position Overview
                                </h2>
                            </header>
                            <div className="JoDeSectionContent">
                                {job.description ? (
                                    <div className="JoDeRichContent">
                                        {job.description.split('\n').map((paragraph, index) => (
                                            paragraph.trim() && <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="JoDeEmptyState">
                                        <FileText size={24} />
                                        <p>Detailed job description will be provided during the application process.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Requirements */}
                        {job.requirements && (
                            <section className="JoDeContentSection">
                                <header className="JoDeSectionHeader">
                                    <h2>
                                        <Target size={20} />
                                        Requirements & Qualifications
                                    </h2>
                                </header>
                                <div className="JoDeSectionContent">
                                    <div className="JoDeRichContent">
                                        {job.requirements.split('\n').map((requirement, index) => (
                                            requirement.trim() && (
                                                <div key={index} className="JoDeRequirementItem">
                                                    <CheckCircle size={16} />
                                                    <span>{requirement}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <section className="JoDeContentSection">
                                <header className="JoDeSectionHeader">
                                    <h2>
                                        <Zap size={20} />
                                        Skills & Technologies
                                    </h2>
                                    <span className="JoDeSkillCount">{job.skills.length} skills required</span>
                                </header>
                                <div className="JoDeSectionContent">
                                    <div className="JoDeSkillsGrid">
                                        {job.skills.map((skill, index) => (
                                            <span key={index} className="JoDeSkillTag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <section className="JoDeContentSection JoDeBenefitsSection">
                                <header className="JoDeSectionHeader">
                                    <h2>
                                        <Heart size={20} />
                                        Benefits & Perks
                                    </h2>
                                    <span className="JoDeBenefitCount">{job.benefits.length} benefits included</span>
                                </header>
                                <div className="JoDeSectionContent">
                                    <div className="JoDeBenefitsGrid">
                                        {job.benefits.map((benefit, index) => (
                                            <div key={index} className="JoDeBenefitCard">
                                                <CheckCircle size={16} />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Application Process */}
                        <section className="JoDeContentSection JoDeApplicationSection">
                            <header className="JoDeSectionHeader">
                                <h2>
                                    <ExternalLink size={20} />
                                    Application Process
                                </h2>
                            </header>
                            <div className="JoDeSectionContent">
                                <div className="JoDeApplicationSteps">
                                    {job.applicationUrl && (
                                        <div className="JoDeApplicationMethod primary">
                                            <div className="JoDeMethodHeader">
                                                <h4>Online Application Portal</h4>
                                                <span className="JoDeRecommended">Recommended</span>
                                            </div>
                                            <p>Complete your application through our secure online platform for the fastest processing.</p>
                                            <a
                                                href={job.applicationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="JoDeApplicationLink primary"
                                            >
                                                <ExternalLink size={16} />
                                                Apply on Company Website
                                            </a>
                                        </div>
                                    )}

                                    {job.contactEmail && (
                                        <div className="JoDeApplicationMethod">
                                            <h4>Email Application</h4>
                                            <p>Send your resume and cover letter directly to our hiring team:</p>
                                            <a
                                                href={`mailto:${job.contactEmail}?subject=Application for ${job.title} - ${job.company}`}
                                                className="JoDeApplicationLink secondary"
                                            >
                                                <Mail size={16} />
                                                {job.contactEmail}
                                            </a>
                                        </div>
                                    )}

                                    {!job.applicationUrl && !job.contactEmail && (
                                        <div className="JoDeApplicationMethod">
                                            <div className="JoDeContactNotice">
                                                <Phone size={20} />
                                                <div>
                                                    <h4>Contact Required</h4>
                                                    <p>Please contact the company directly for application instructions and requirements.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="JoDeJobSidebar">
                        {/* Quick Facts */}
                        <div className="JoDeSidebarCard">
                            <h3 className="JoDeSidebarTitle">Position Details</h3>
                            <div className="JoDeDetailList">
                                <div className="JoDeDetailItem">
                                    <Briefcase size={16} />
                                    <div>
                                        <span className="JoDeDetailItemLabel">Employment Type</span>
                                        <span className="JoDeDetailItemValue">{job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1).replace(/[-_]/g, ' ')}</span>
                                    </div>
                                </div>

                                {job.experienceLevel && (
                                    <div className="JoDeDetailItem">
                                        <GraduationCap size={16} />
                                        <div>
                                            <span className="JoDeDetailItemLabel">Experience Level</span>
                                            <span className="JoDeDetailItemValue">{job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}</span>
                                        </div>
                                    </div>
                                )}

                                {job.industry && (
                                    <div className="JoDeDetailItem">
                                        <Building size={16} />
                                        <div>
                                            <span className="JoDeDetailItemLabel">Industry</span>
                                            <span className="JoDeDetailItemValue">{job.industry}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="JoDeDetailItem">
                                    <MapPin size={16} />
                                    <div>
                                        <span className="JoDeDetailItemLabel">Location</span>
                                        <span className="JoDeDetailItemValue">{job.location}</span>
                                    </div>
                                </div>

                                <div className="JoDeDetailItem">
                                    <DollarSign size={16} />
                                    <div>
                                        <span className="JoDeDetailItemLabel">Compensation</span>
                                        <span className="JoDeDetailItemValue">{formatSalary(job)}</span>
                                    </div>
                                </div>

                                {job.workingHours && (
                                    <div className="JoDeDetailItem">
                                        <Clock size={16} />
                                        <div>
                                            <span className="JoDeDetailItemLabel">Working Hours</span>
                                            <span className="JoDeDetailItemValue">{job.workingHours}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Profile */}
                        <div className="JoDeSidebarCard">
                            <h3 className="JoDeSidebarTitle">About {job.company}</h3>
                            <div className="JoDeCompanyProfile">
                                <div className="JoDeCompanyAvatar">
                                    {job.companyLogo ? (
                                        <img src={job.companyLogo} alt={`${job.company} logo`} />
                                    ) : (
                                        <Building size={32} />
                                    )}
                                </div>
                                <div className="JoDeCompanyDetails">
                                    <h4>{job.company}</h4>
                                    {job.industry && <p className="JoDeCompanyIndustry">{job.industry}</p>}
                                    <button className="JoDeViewCompanyLink">
                                        View All Open Positions
                                        <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Related Positions */}
                        {relatedJobs.length > 0 && (
                            <div className="JoDeSidebarCard">
                                <h3 className="JoDeSidebarTitle">Similar Opportunities</h3>
                                <div className="JoDeRelatedJobsList">
                                    {relatedJobs.map((relatedJob) => (
                                        <div
                                            key={relatedJob.id}
                                            className="JoDeRelatedJobCard"
                                            onClick={() => navigate(`/job/${relatedJob.id}`)}
                                        >
                                            <div className="JoDeRelatedJobHeader">
                                                <h5>{relatedJob.title}</h5>
                                                <span className="JoDeRelatedJobDate">{getDaysAgo(relatedJob.createdAt)}</span>
                                            </div>
                                            <div className="JoDeRelatedJobMeta">
                                                <span className="JoDeRelatedJobMetaLocation">{relatedJob.location}</span>
                                                <span className="JoDeRelatedJobMetaType">{relatedJob.jobType}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Application Stats */}
                        {job.applicationCount > 0 && (
                            <div className="JoDeSidebarCard JoDeStatsCard">
                                <h3 className="JoDeSidebarTitle">Application Insights</h3>
                                <div className="JoDeStatsGrid">
                                    <div className="JoDeStatItem">
                                        <Users size={20} />
                                        <div>
                                            <span className="JoDeStatValue">{job.applicationCount}</span>
                                            <span className="JoDeStatLabel">Applications</span>
                                        </div>
                                    </div>
                                    <div className="JoDeStatItem">
                                        <Eye size={20} />
                                        <div>
                                            <span className="JoDeStatValue">{job.viewCount || 0}</span>
                                            <span className="JoDeStatLabel">Views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
        <Footer/>
        </>
    );

}

export default JobDetail;