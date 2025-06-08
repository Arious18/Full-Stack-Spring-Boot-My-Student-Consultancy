import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Search, Filter, Grid, Table, MapPin, DollarSign, Users, Award,
    ChevronDown, X, Clock, Briefcase, Calendar, Eye, Star,
    TrendingUp, Globe, Target, User, Building, ExternalLink,
    Zap, ArrowUpRight, ThumbsUp, MessageCircle, Share2
} from 'lucide-react';
import axios from 'axios';
import "./JobList.css"
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // Default to table view

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');
    const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [remoteOnly, setRemoteOnly] = useState(false);
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [urgentOnly, setUrgentOnly] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt-desc');
    const [showFilters, setShowFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(viewMode === 'table' ? 15 : 12);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const filterRef = useRef(null);

    const jobTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
    const experienceLevels = ['entry', 'mid', 'senior', 'executive'];
    const salaryRanges = [
        { label: 'Under $30k', min: 0, max: 30000 },
        { label: '$30k - $50k', min: 30000, max: 50000 },
        { label: '$50k - $80k', min: 50000, max: 80000 },
        { label: '$80k - $120k', min: 80000, max: 120000 },
        { label: '$120k+', min: 120000, max: Infinity }
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/jobs');
                const processedJobs = response.data.map(job => ({
                    ...job,
                    viewCount: job.viewCount || Math.floor(Math.random() * 500) + 50,
                    applicationCount: job.applicationCount || Math.floor(Math.random() * 50) + 5,
                    likeCount: job.likeCount || Math.floor(Math.random() * 100) + 10,
                    featured: job.featured || Math.random() > 0.8,
                    isUrgent: job.isUrgent || Math.random() > 0.9,
                    remoteAllowed: job.remoteAllowed || Math.random() > 0.6,
                    salaryNegotiable: job.salaryNegotiable || false,
                    skills: job.skills || ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'].slice(0, Math.floor(Math.random() * 5) + 2),
                    benefits: job.benefits || ['Health Insurance', 'Dental', '401k', 'Remote Work', 'Vacation'].slice(0, Math.floor(Math.random() * 3) + 2),
                    keywords: job.keywords || []
                }));
                setJobs(processedJobs);
                setError(null);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError(t('errorFetchingData') || 'Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [t]);

    useEffect(() => {
        let filtered = [...jobs];

        if (searchQuery && searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(job => {
                const titleMatch = job.title && job.title.toLowerCase().includes(searchLower);
                const companyMatch = job.company && job.company.toLowerCase().includes(searchLower);
                const locationMatch = job.location && job.location.toLowerCase().includes(searchLower);
                const descMatch = job.description && job.description.toLowerCase().includes(searchLower);
                const skillsMatch = job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchLower));
                const keywordsMatch = job.keywords && job.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
                return titleMatch || companyMatch || locationMatch || descMatch || skillsMatch || keywordsMatch;
            });
        }

        if (selectedJobType) {
            filtered = filtered.filter(job => job.jobType === selectedJobType);
        }

        if (selectedExperienceLevel) {
            filtered = filtered.filter(job => job.experienceLevel === selectedExperienceLevel);
        }

        if (selectedSalaryRange) {
            const range = salaryRanges.find(r => r.label === selectedSalaryRange);
            if (range) {
                filtered = filtered.filter(job => {
                    const salary = job.salaryMax || job.salaryMin || 0;
                    return salary >= range.min && salary <= range.max;
                });
            }
        }

        if (selectedLocation) {
            filtered = filtered.filter(job => job.location && job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
        }

        if (remoteOnly) {
            filtered = filtered.filter(job => job.remoteAllowed);
        }

        if (featuredOnly) {
            filtered = filtered.filter(job => job.featured);
        }

        if (urgentOnly) {
            filtered = filtered.filter(job => job.isUrgent);
        }

        // Only show active jobs
        filtered = filtered.filter(job => job.status === 'active' || !job.status);

        // Sort jobs
        filtered.sort((a, b) => {
            let aValue, bValue;
            switch (sortBy) {
                case 'title-asc':
                    aValue = (a.title || '').toLowerCase();
                    bValue = (b.title || '').toLowerCase();
                    return aValue.localeCompare(bValue);
                case 'title-desc':
                    aValue = (a.title || '').toLowerCase();
                    bValue = (b.title || '').toLowerCase();
                    return bValue.localeCompare(aValue);
                case 'company-asc':
                    aValue = (a.company || '').toLowerCase();
                    bValue = (b.company || '').toLowerCase();
                    return aValue.localeCompare(bValue);
                case 'company-desc':
                    aValue = (a.company || '').toLowerCase();
                    bValue = (b.company || '').toLowerCase();
                    return bValue.localeCompare(aValue);
                case 'salary-low':
                    aValue = getEffectiveSalary(a);
                    bValue = getEffectiveSalary(b);
                    return aValue - bValue;
                case 'salary-high':
                    aValue = getEffectiveSalary(a);
                    bValue = getEffectiveSalary(b);
                    return bValue - aValue;
                case 'views-high':
                    return (b.viewCount || 0) - (a.viewCount || 0);
                case 'applications-high':
                    return (b.applicationCount || 0) - (a.applicationCount || 0);
                case 'createdAt-desc':
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return bValue - aValue;
                case 'createdAt-asc':
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return aValue - bValue;
                case 'deadline-asc':
                    aValue = new Date(a.applicationDeadline || '9999-12-31');
                    bValue = new Date(b.applicationDeadline || '9999-12-31');
                    return aValue - bValue;
                default:
                    // Priority order: Featured -> Urgent -> Date
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    if (a.isUrgent && !b.isUrgent) return -1;
                    if (!a.isUrgent && b.isUrgent) return 1;
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
                    return bValue - aValue;
            }
        });

        setFilteredJobs(filtered);
        setCurrentPage(1);
    }, [jobs, searchQuery, selectedJobType, selectedExperienceLevel, selectedSalaryRange, selectedLocation, remoteOnly, featuredOnly, urgentOnly, sortBy]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleJobClick = (id) => navigate(`/job/${id}`);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedJobType('');
        setSelectedExperienceLevel('');
        setSelectedSalaryRange('');
        setSelectedLocation('');
        setRemoteOnly(false);
        setFeaturedOnly(false);
        setUrgentOnly(false);
        setSortBy('createdAt-desc');
    };

    const getEffectiveSalary = (job) => job.salaryMax || job.salaryMin || 0;

    const formatSalary = (job) => {
        if (!job.salaryMin && !job.salaryMax) {
            return job.salaryNegotiable ? 'Negotiable' : 'Not specified';
        }

        const formatAmount = (amount) => {
            if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
            if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
            return `$${amount.toLocaleString()}`;
        };

        if (job.salaryMin && job.salaryMax) {
            return `${formatAmount(job.salaryMin)} - ${formatAmount(job.salaryMax)}`;
        }
        return formatAmount(job.salaryMin || job.salaryMax);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Recently';
        const diffHours = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
        if (diffHours === 0) return 'Just posted';
        if (diffHours === 1) return '1 hour ago';
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getActiveFilterCount = () => {
        return [
            selectedJobType,
            selectedExperienceLevel,
            selectedSalaryRange,
            selectedLocation,
            remoteOnly,
            featuredOnly,
            urgentOnly
        ].filter(Boolean).length;
    };

    const activeFilterCount = getActiveFilterCount();

    // Get unique locations for filter
    const uniqueLocations = [...new Set(jobs.map(job => job.location).filter(Boolean))];

    const renderJobCard = (job) => {
        const jobTitle = job.title || 'Position Title Not Available';
        const companyName = job.company || 'Company Name Not Available';
        const location = job.location || 'Location Not Specified';
        const description = job.description || 'Job description will be provided during the application process.';
        const jobType = job.jobType ? job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1).replace('-', ' ') : 'Full-time';
        const experienceLevel = job.experienceLevel ? job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1) : 'All Levels';

        return (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
                {/* Image/Logo Section */}
                <div className="job-card-image-container">
                    <div className="job-card-placeholder">
                        <div className="placeholder-content">
                            <Building size={48} />
                            <span>{companyName}</span>
                        </div>
                    </div>

                    {/* Image Overlay */}
                    <div className="job-image-overlay">
                        {/* Top Badges */}
                        <div className="job-badges">
                            {job.isUrgent && (
                                <span className="badge urgent">
                                    <Zap size={14} />
                                    Urgent Hiring
                                </span>
                            )}
                            {job.featured && (
                                <span className="badge featured">
                                    <Star size={14} />
                                    Featured
                                </span>
                            )}
                            {job.remoteAllowed && (
                                <span className="badge remote">
                                    <Globe size={14} />
                                    Remote OK
                                </span>
                            )}
                        </div>

                        {/* Job Type Badge */}
                        <div className="job-type-badge">
                            <Briefcase size={14} />
                            <span>{jobType}</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="job-card-content">
                    {/* Meta Information */}
                    <div className="job-meta">
                        <div className="meta-row">
                            <div className="meta-item">
                                <MapPin size={14} />
                                <span>{location}</span>
                            </div>
                            <div className="meta-item">
                                <Clock size={14} />
                                <span>{getTimeAgo(job.createdAt)}</span>
                            </div>
                            <div className="meta-item">
                                <Award size={14} />
                                <span>{experienceLevel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="job-title">{jobTitle}</h2>

                    {/* Company */}
                    <div className="job-company">
                        <Building size={16} />
                        <span>{companyName}</span>
                    </div>

                    {/* Description */}
                    <p className="job-description">
                        {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                    </p>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                        <div className="job-skills-section">
                            <div className="skills-container">
                                {job.skills.slice(0, 4).map((skill, skillIndex) => (
                                    <span key={skillIndex} className="job-skill">
                                        {skill}
                                    </span>
                                ))}
                                {job.skills.length > 4 && (
                                    <span className="job-skill more-skills">
                                        +{job.skills.length - 4} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Salary & Stats */}
                    <div className="job-footer">
                        <div className="salary-section">
                            <DollarSign size={18} />
                            <div className="salary-info">
                                <span className="salary-amount">{formatSalary(job)}</span>
                                {job.salaryPeriod && job.salaryPeriod !== 'annually' && (
                                    <span className="salary-period">/{job.salaryPeriod}</span>
                                )}
                            </div>
                        </div>

                        {/* Engagement Stats */}
                        <div className="job-engagement">
                            <div className="engagement-stats">
                                <div className="stat-item">
                                    <Eye size={16} />
                                    <span>{job.viewCount?.toLocaleString() || '0'}</span>
                                    <label>Views</label>
                                </div>
                                <div className="stat-item">
                                    <Users size={16} />
                                    <span>{job.applicationCount?.toLocaleString() || '0'}</span>
                                    <label>Applied</label>
                                </div>
                                {job.likeCount > 0 && (
                                    <div className="stat-item">
                                        <ThumbsUp size={16} />
                                        <span>{job.likeCount?.toLocaleString()}</span>
                                        <label>Likes</label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="apply-section">
                            <button className="apply-btn">
                                <span>Apply Now</span>
                                <ArrowUpRight size={16} />
                            </button>
                        </div>

                        {/* Deadline */}
                        {job.applicationDeadline && (
                            <div className="deadline-section">
                                <Calendar size={14} />
                                <span>Apply by {formatDate(job.applicationDeadline)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderTableRow = (job) => {
        const jobTitle = job.title || 'Position Title Not Available';
        const companyName = job.company || 'Company Name Not Available';
        const location = job.location || 'Location Not Specified';
        const jobType = job.jobType ? job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1).replace('-', ' ') : 'Full-time';
        const experienceLevel = job.experienceLevel ? job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1) : 'All Levels';

        return (
            <tr key={job.id} className="job-table-row" onClick={() => handleJobClick(job.id)}>
                {/* Company & Job */}
                <td className="job-table-cell job-info-cell">
                    <div className="job-info">
                        <div className="company-logo-small">
                            <Building size={24} />
                        </div>
                        <div className="job-details">
                            <h3 className="job-title-table">{jobTitle}</h3>
                            <div className="company-name">{companyName}</div>
                            <div className="job-badges-table">
                                {job.isUrgent && (
                                    <span className="badge urgent small">
                                        <Zap size={10} />
                                        Urgent
                                    </span>
                                )}
                                {job.featured && (
                                    <span className="badge featured small">
                                        <Star size={10} />
                                        Featured
                                    </span>
                                )}
                                {job.remoteAllowed && (
                                    <span className="badge remote small">
                                        <Globe size={10} />
                                        Remote
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </td>

                {/* Location */}
                <td className="job-table-cell location-cell">
                    <div className="location-info">
                        <MapPin size={16} />
                        <span>{location}</span>
                    </div>
                </td>

                {/* Job Type & Experience */}
                <td className="job-table-cell type-cell">
                    <div className="type-info">
                        <div className="job-type">{jobType}</div>
                        <div className="experience-level">{experienceLevel}</div>
                    </div>
                </td>

                {/* Salary */}
                <td className="job-table-cell salary-cell">
                    <div className="salary-info-table">
                        <DollarSign size={16} />
                        <div className="salary-details">
                            <span className="salary-amount">{formatSalary(job)}</span>
                            {job.salaryPeriod && job.salaryPeriod !== 'annually' && (
                                <span className="salary-period">/{job.salaryPeriod}</span>
                            )}
                        </div>
                    </div>
                </td>

                {/* Skills */}
                <td className="job-table-cell skills-cell">
                    <div className="skills-table">
                        {job.skills && job.skills.length > 0 ? (
                            <>
                                {job.skills.slice(0, 3).map((skill, skillIndex) => (
                                    <span key={skillIndex} className="skill-tag-small">
                                        {skill}
                                    </span>
                                ))}
                                {job.skills.length > 3 && (
                                    <span className="skill-tag-small more">
                                        +{job.skills.length - 3}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="no-skills">No specific skills</span>
                        )}
                    </div>
                </td>

                {/* Stats */}
                <td className="job-table-cell stats-cell">
                    <div className="stats-table">
                        <div className="stat-item-small">
                            <Eye size={14} />
                            <span>{job.viewCount || 0}</span>
                        </div>
                        <div className="stat-item-small">
                            <Users size={14} />
                            <span>{job.applicationCount || 0}</span>
                        </div>
                    </div>
                </td>

                {/* Posted Date */}
                <td className="job-table-cell date-cell">
                    <div className="date-info">
                        <Clock size={14} />
                        <span>{getTimeAgo(job.createdAt)}</span>
                    </div>
                </td>

                {/* Actions */}
                <td className="job-table-cell actions-cell">
                    <div className="table-actions">
                        <button className="apply-btn-small" onClick={(e) => {
                            e.stopPropagation();
                            handleJobClick(job.id);
                        }}>
                            Apply
                            <ExternalLink size={14} />
                        </button>
                        {job.applicationDeadline && (
                            <div className="deadline-small">
                                <Calendar size={12} />
                                <span>{formatDate(job.applicationDeadline)}</span>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    if (loading) {
        return (
            <div className="JoLiPageWrapper">
                <Header />
                <div className="JoLiLoadingContainer">
                    <div className="JoLiLoadingSpinner"></div>
                    <p>{t('loading') || 'Loading latest opportunities...'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="JoLiPageWrapper">
                <Header />
                <div className="JoLiErrorContainer">
                    <div className="JoLiErrorIcon">⚠️</div>
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="JoLiRetryButton"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="JoLiPageWrapper">
                <section className="JoLiHero">
                    <div className="JoLiHeroContent">
                        <h1 className="JoLiHeroTitle">
                            {t('findYourDreamJob') || 'Professional Career Opportunities'}
                        </h1>
                        <p className="JoLiHeroSubtitle">
                            {t('exploreOpportunities') || 'Discover career opportunities with leading companies and advance your professional journey'}
                        </p>
                        <div className="JoLiHeroStats">
                            <div className="JoLiHeroStatItem">
                                <span className="JoLiHeroStatNumber">{jobs.length}+</span>
                                <span className="JoLiHeroStatLabel">
                                    {t('jobs') || 'Open Positions'}
                                </span>
                            </div>
                            <div className="JoLiHeroStatItem">
                                <span className="JoLiHeroStatNumber">
                                    {new Set(jobs.map(job => job.company)).size}+
                                </span>
                                <span className="JoLiHeroStatLabel">
                                    {t('companies') || 'Partner Companies'}
                                </span>
                            </div>
                            <div className="JoLiHeroStatItem">
                                <span className="JoLiHeroStatNumber">
                                    {jobs.filter(job => job.remoteAllowed).length}+
                                </span>
                                <span className="JoLiHeroStatLabel">
                                    {t('remoteJobs') || 'Remote Opportunities'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="JoLiLayoutContainer">
                    <div className="JoLiSearchFilterSection">
                        <div className="JoLiSearchContainer">
                            <Search className="JoLiSearchIcon" />
                            <input
                                type="text"
                                placeholder={t('searchJobs') || 'Search positions, companies, locations, or required skills...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="JoLiSearchInput"
                            />
                        </div>
                        <div className="JoLiFilterControls">
                            <button
                                className={`JoLiFilterToggle ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={16} />
                                {t('filters') || 'Filters'}
                                {activeFilterCount > 0 && (
                                    <span className="JoLiFilterBadge">{activeFilterCount}</span>
                                )}
                                <ChevronDown
                                    className={`JoLiChevronIcon ${showFilters ? 'rotated' : ''}`}
                                    size={16}
                                />
                            </button>
                            <div className="JoLiViewControls">
                                <button
                                    className={`JoLiViewButton ${viewMode === 'table' ? 'active' : ''}`}
                                    onClick={() => setViewMode('table')}
                                    title="Table View"
                                >
                                    <Table size={16} />
                                </button>
                                <button
                                    className={`JoLiViewButton ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    title="Grid View"
                                >
                                    <Grid size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="JoLiFiltersPanel" ref={filterRef}>
                            <div className="JoLiFiltersHeader">
                                <h3>{t('advancedFilters') || 'Filter Options'}</h3>
                                <button className="JoLiClearAllFiltersButton" onClick={clearFilters}>
                                    <X size={16} />
                                    {t('clearAll') || 'Clear All'}
                                </button>
                            </div>
                            <div className="JoLiFiltersGrid">
                                <div className="JoLiFilterGroup">
                                    <label className="JoLiFilterGroupLabel">
                                        {t('jobType') || 'Employment Type'}
                                    </label>
                                    <select
                                        value={selectedJobType}
                                        onChange={(e) => setSelectedJobType(e.target.value)}
                                        className="JoLiFilterSelect"
                                    >
                                        <option value="">{t('allTypes') || 'All Employment Types'}</option>
                                        {jobTypes.map(type => (
                                            <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="JoLiFilterGroup">
                                    <label className="JoLiFilterGroupLabel">
                                        {t('experienceLevel') || 'Experience Level'}
                                    </label>
                                    <select
                                        value={selectedExperienceLevel}
                                        onChange={(e) => setSelectedExperienceLevel(e.target.value)}
                                        className="JoLiFilterSelect"
                                    >
                                        <option value="">{t('allLevels') || 'All Experience Levels'}</option>
                                        {experienceLevels.map(level => (
                                            <option key={level} value={level}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="JoLiFilterGroup">
                                    <label className="JoLiFilterGroupLabel">
                                        {t('salaryRange') || 'Salary Range'}
                                    </label>
                                    <select
                                        value={selectedSalaryRange}
                                        onChange={(e) => setSelectedSalaryRange(e.target.value)}
                                        className="JoLiFilterSelect"
                                    >
                                        <option value="">{t('allRanges') || 'All Salary Ranges'}</option>
                                        {salaryRanges.map(range => (
                                            <option key={range.label} value={range.label}>
                                                {range.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="JoLiFilterGroup">
                                    <label className="JoLiFilterGroupLabel">
                                        {t('location') || 'Location'}
                                    </label>
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="JoLiFilterSelect"
                                    >
                                        <option value="">{t('allLocations') || 'All Locations'}</option>
                                        {uniqueLocations.map(location => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="JoLiFilterGroup">
                                    <label className="JoLiFilterGroupLabel">
                                        {t('sortBy') || 'Sort By'}
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="JoLiFilterSelect"
                                    >
                                        <option value="createdAt-desc">
                                            {t('newest') || 'Most Recent'}
                                        </option>
                                        <option value="createdAt-asc">
                                            {t('oldest') || 'Oldest First'}
                                        </option>
                                        <option value="title-asc">
                                            {t('titleAZ') || 'Position (A-Z)'}
                                        </option>
                                        <option value="title-desc">
                                            {t('titleZA') || 'Position (Z-A)'}
                                        </option>
                                        <option value="company-asc">
                                            {t('companyAZ') || 'Company (A-Z)'}
                                        </option>
                                        <option value="company-desc">
                                            {t('companyZA') || 'Company (Z-A)'}
                                        </option>
                                        <option value="salary-high">
                                            {t('salaryHighLow') || 'Salary (Highest)'}
                                        </option>
                                        <option value="salary-low">
                                            {t('salaryLowHigh') || 'Salary (Lowest)'}
                                        </option>
                                        <option value="views-high">
                                            {t('mostViewed') || 'Most Viewed'}
                                        </option>
                                        <option value="applications-high">
                                            {t('mostApplied') || 'Most Applied'}
                                        </option>
                                        <option value="deadline-asc">
                                            {t('deadlineSoon') || 'Application Deadline'}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="JoLiCheckboxFiltersContainer">
                                <div className="JoLiCheckboxGroup">
                                    <label className="JoLiCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            checked={remoteOnly}
                                            onChange={(e) => setRemoteOnly(e.target.checked)}
                                            className="JoLiFilterCheckboxInput"
                                        />
                                        <span>{t('remoteOnly') || 'Remote positions only'}</span>
                                    </label>
                                    <label className="JoLiCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            checked={featuredOnly}
                                            onChange={(e) => setFeaturedOnly(e.target.checked)}
                                            className="JoLiFilterCheckboxInput"
                                        />
                                        <span>{t('featuredOnly') || 'Featured positions only'}</span>
                                    </label>
                                    <label className="JoLiCheckboxLabel">
                                        <input
                                            type="checkbox"
                                            checked={urgentOnly}
                                            onChange={(e) => setUrgentOnly(e.target.checked)}
                                            className="JoLiFilterCheckboxInput"
                                        />
                                        <span>{t('urgentOnly') || 'Urgent hiring only'}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="JoLiResultsSummary">
                        <p className="JoLiResultsCount">
                            {t('showingResults', {
                                start: startIndex + 1,
                                end: Math.min(endIndex, filteredJobs.length),
                                total: filteredJobs.length
                            }) || `Displaying ${startIndex + 1}-${Math.min(endIndex, filteredJobs.length)} of ${filteredJobs.length} positions`}
                        </p>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="JoLiEmptyState">
                            <div className="JoLiEmptyStateIcon">💼</div>
                            <h3>{t('noJobsFound') || 'No Positions Found'}</h3>
                            <p>{t('tryAdjustingFilters') || 'Please adjust your search criteria or filter options'}</p>
                            <button onClick={clearFilters} className="JoLiEmptyStateClearFiltersButton">
                                {t('clearFilters') || 'Reset Filters'}
                            </button>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="jobs-container">
                                    {currentJobs.map(job => renderJobCard(job))}
                                </div>
                            ) : (
                                <div className="jobs-table-container">
                                    <table className="jobs-table">
                                        <thead>
                                        <tr className="jobs-table-header">
                                            <th className="jobs-table-header-cell">Position & Company</th>
                                            <th className="jobs-table-header-cell">Location</th>
                                            <th className="jobs-table-header-cell">Type & Level</th>
                                            <th className="jobs-table-header-cell">Salary</th>
                                            <th className="jobs-table-header-cell">Skills</th>
                                            <th className="jobs-table-header-cell">Activity</th>
                                            <th className="jobs-table-header-cell">Posted</th>
                                            <th className="jobs-table-header-cell">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentJobs.map(job => renderTableRow(job))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="JoLiPaginationContainer">
                                    <div className="JoLiPaginationControls">
                                        <button
                                            className="JoLiPaginationButton"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            ← Previous
                                        </button>
                                        <div className="JoLiPaginationNumbers">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum = i + 1;
                                                if (totalPages > 5) {
                                                    if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }
                                                }
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        className={`JoLiPaginationNumberButton ${currentPage === pageNum ? 'active' : ''}`}
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <button
                                            className="JoLiPaginationButton"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                    <div className="JoLiPaginationInfo">
                                        {t('pageXofY', { current: currentPage, total: totalPages }) || `Page ${currentPage} of ${totalPages}`}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default JobList;