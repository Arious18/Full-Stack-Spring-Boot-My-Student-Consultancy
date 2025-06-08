
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components (similar to jobs component)
const Container = styled.div`
    padding: 16px;
    background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
    min-height: 100vh;
    color: #ffffff;
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 768px) {
        padding: 20px;
    }
`;

const HeaderSection = styled.div`
    margin-bottom: 20px;

    @media (min-width: 768px) {
        margin-bottom: 24px;
    }
`;

const PageTitle = styled.h1`
    color: #ffffff;
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 8px;

    &:before {
        content: '📰';
        font-size: 20px;
        -webkit-text-fill-color: initial;
    }

    @media (min-width: 768px) {
        font-size: 28px;
        gap: 10px;

        &:before {
            font-size: 24px;
        }
    }
`;

const PageSubtitle = styled.p`
    color: #c1ccdf;
    margin-bottom: 12px;
    font-size: 14px;
    opacity: 0.9;

    @media (min-width: 768px) {
        font-size: 15px;
    }
`;

const ActionBar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 16px 20px;
        gap: 16px;
    }
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    @media (min-width: 768px) {
        display: flex;
        align-items: center;
        gap: 16px;
    }
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #c1ccdf;
    font-size: 11px;
    font-weight: 500;

    .icon {
        font-size: 12px;
        opacity: 0.8;
    }

    .value {
        color: #ffffff;
        font-weight: 700;
    }

    @media (min-width: 768px) {
        font-size: 13px;
        gap: 6px;

        .icon {
            font-size: 14px;
        }
    }
`;

const AddButton = styled.button`
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    border: none;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    width: 100%;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }

    .icon {
        font-size: 14px;
    }

    @media (min-width: 768px) {
        width: auto;
        padding: 10px 18px;
        font-size: 14px;
    }
`;

const TableContainer = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    width: 100%;
    overflow-x: auto;

    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
`;

const TableHeader = styled.thead`
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const TableHeaderCell = styled.th`
    padding: 12px 8px;
    text-align: left;
    color: #ffffff;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:nth-child(1) { width: 20%; } /* Title */
    &:nth-child(2) { width: 12%; } /* Author */
    &:nth-child(3) { width: 10%; } /* Category */
    &:nth-child(4) { width: 8%; }  /* Status */
    &:nth-child(5) { width: 8%; }  /* Views */
    &:nth-child(6) { width: 8%; }  /* Comments */
    &:nth-child(7) { width: 10%; } /* Published */
    &:nth-child(8) { width: 14%; } /* Actions */

    @media (min-width: 768px) {
        padding: 14px 10px;
        font-size: 12px;
    }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: scale(1.002);
    }

    &:last-child {
        border-bottom: none;
    }
`;

const TableCell = styled.td`
    padding: 10px 8px;
    color: #e2e8f0;
    font-size: 12px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
        padding: 12px 10px;
        font-size: 13px;
    }
`;

const StatusBadge = styled.span`
    padding: 3px 6px;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${props => {
    switch (props.$status?.toLowerCase()) {
        case 'published':
            return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        case 'draft':
            return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
        case 'archived':
            return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
        case 'scheduled':
            return 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)';
        default:
            return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
}};
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    display: inline-block;

    @media (min-width: 768px) {
        padding: 3px 8px;
        font-size: 10px;
    }
`;

const ActionButton = styled.button`
    background: ${props => {
    switch (props.$variant) {
        case 'edit':
            return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
        case 'delete':
            return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
        case 'comments':
            return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        default:
            return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
}};
    color: white;
    border: none;
    padding: 4px 6px;
    border-radius: 6px;
    font-size: 9px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 3px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    white-space: nowrap;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    }

    .icon {
        font-size: 10px;
    }

    @media (min-width: 768px) {
        padding: 5px 8px;
        font-size: 10px;
        margin-right: 4px;
        gap: 3px;

        .icon {
            font-size: 11px;
        }
    }
`;

// Mobile card view
const MobileNewsContainer = styled.div`
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const MobileNewsCard = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
    margin-bottom: 12px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-1px);
    }
`;

const MobileNewsHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
`;

const MobileNewsInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const MobileNewsTitle = styled.h3`
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 3px 0;
    word-break: break-word;
`;

const MobileNewsAuthor = styled.div`
    color: #c1ccdf;
    font-size: 12px;
    margin-bottom: 6px;
`;

const MobileNewsDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 11px;
`;

const MobileNewsActions = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`;

// Modal styles
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;
    padding: 12px;
    overflow-y: auto;

    @media (min-width: 768px) {
        align-items: center;
        padding: 16px;
    }
`;

const ModalContent = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    margin: 12px 0;

    @media (min-width: 768px) {
        padding: 24px;
        margin: 0;
    }
`;

const ModalTitle = styled.h2`
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (min-width: 768px) {
        font-size: 22px;
        margin-bottom: 20px;
    }
`;

// Form styles
const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 12px;

    @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 768px) {
        margin-bottom: 16px;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 12px;

    @media (min-width: 768px) {
        margin-bottom: 16px;
    }
`;

const FormLabel = styled.label`
    display: block;
    color: #c1ccdf;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (min-width: 768px) {
        font-size: 12px;
        margin-bottom: 6px;
    }
`;

const FormInput = styled.input`
    width: 100%;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    @media (min-width: 768px) {
        padding: 10px 14px;
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    option {
        background: #1a1d4a;
        color: #ffffff;
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    @media (min-width: 768px) {
        padding: 10px 14px;
    }
`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;
    min-height: 70px;
    resize: vertical;
    font-family: inherit;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    @media (min-width: 768px) {
        padding: 10px 14px;
        min-height: 80px;
    }
`;

const FileUploadContainer = styled.div`
    position: relative;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 12px;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;

    &:hover {
        border-color: #3B82F6;
        background: rgba(59, 130, 246, 0.1);
    }

    @media (min-width: 768px) {
        padding: 16px;
    }
`;

const FileInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

const FileUploadText = styled.div`
    color: #c1ccdf;
    font-size: 12px;
    margin-bottom: 6px;

    .icon {
        font-size: 16px;
        margin-bottom: 6px;
        display: block;
    }

    @media (min-width: 768px) {
        font-size: 13px;

        .icon {
            font-size: 18px;
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;

    @media (min-width: 480px) {
        flex-direction: row;
        justify-content: flex-end;
    }

    @media (min-width: 768px) {
        margin-top: 20px;
    }
`;

const CancelButton = styled.button`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #c1ccdf;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }

    @media (min-width: 480px) {
        width: auto;
    }
`;

const SaveButton = styled.button`
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    border: none;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    @media (min-width: 480px) {
        width: auto;
    }
`;

// Utility styles
const ErrorBox = styled.div`
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 16px;
    color: #FCA5A5;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-weight: 500;
    font-size: 13px;
    word-break: break-word;

    &:before {
        content: '⚠️';
        font-size: 14px;
        flex-shrink: 0;
        margin-top: 1px;
    }
`;

const SuccessBox = styled.div`
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 16px;
    color: #6EE7B7;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-weight: 500;
    font-size: 13px;

    &:before {
        content: '✅';
        font-size: 14px;
        flex-shrink: 0;
        margin-top: 1px;
    }
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    padding: 16px;

    &:before {
        content: '⏳';
        font-size: 24px;
        margin-bottom: 8px;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 30px 16px;
    color: #c1ccdf;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
    backdrop-filter: blur(20px);
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 12px;

    .icon {
        font-size: 32px;
        margin-bottom: 12px;
        opacity: 0.6;
    }

    h3 {
        margin: 0 0 8px;
        color: #ffffff;
        font-size: 15px;
    }

    p {
        margin: 0;
        opacity: 0.8;
        font-size: 13px;
    }
`;

// Comments Modal styles
const CommentsModalContent = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    margin: 12px 0;

    @media (min-width: 768px) {
        padding: 24px;
        margin: 0;
    }
`;

const CommentCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 10px;
`;

const CommentAuthor = styled.div`
    color: #ffffff;
    font-weight: 600;
    font-size: 13px;
`;

const CommentDate = styled.div`
    color: #c1ccdf;
    font-size: 11px;
    opacity: 0.8;
`;

const CommentContent = styled.div`
    color: #e2e8f0;
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 8px;
    word-break: break-word;
`;

const CommentActions = styled.div`
    display: flex;
    gap: 6px;
    justify-content: flex-end;
`;

const CommentStatus = styled.span`
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    background: ${props => {
    switch (props.$status) {
        case 'APPROVED':
            return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        case 'PENDING':
            return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
        case 'REJECTED':
            return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
        default:
            return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
}};
    color: white;
`;

// Configuration
const API_BASE_URL = "http://localhost:8080/news";

const AdminNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [editNews, setEditNews] = useState(null);
    const [newNews, setNewNews] = useState({
        title: "",
        subtitle: "",
        content: "",
        summary: "",
        authorName: "",
        authorEmail: "",
        category: "",
        tags: "",
        imageCaption: "",
        imageAlt: "",
        status: "DRAFT",
        priority: "MEDIUM",
        source: "",
        sourceUrl: "",
        region: "",
        country: "",
        city: "",
        isFeatured: false,
        isBreaking: false,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        socialTitle: "",
        socialDescription: "",
        scheduledAt: ""
    });
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [socialImage, setSocialImage] = useState(null);

    // Comments modal state
    const [commentsModal, setCommentsModal] = useState({
        isOpen: false,
        newsId: null,
        newsTitle: "",
        comments: []
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Setup axios defaults
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // Clear messages after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Fetch News
    const fetchNews = async (page = 0, size = 10) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching news from:', API_BASE_URL);

            const response = await axios.get(API_BASE_URL, {
                params: {
                    page: page,
                    size: size,
                    sortBy: "createdAt",
                    sortDir: "desc"
                },
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            });

            console.log('News response:', response.data);

            if (response.data.content) {
                // Paginated response
                setNewsList(response.data.content || []);
                setTotalCount(response.data.totalElements || 0);
                setTotalPages(response.data.totalPages || 0);
                setCurrentPage(response.data.number || 0);
            } else {
                // Direct array response
                setNewsList(response.data || []);
                setTotalCount(response.data?.length || 0);
                setTotalPages(1);
                setCurrentPage(0);
            }
            setError(null);
        } catch (error) {
            console.error("Error fetching news:", error);

            if (error.response?.status === 404) {
                setError("News endpoint not found. Please check if the server is running and the endpoint exists at " + API_BASE_URL);
            } else if (error.response?.status === 401) {
                setError("Authentication required. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to view news.");
            } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
                setError("Network error. Please check your connection and ensure the server is running at " + API_BASE_URL);
            } else {
                setError(`Failed to load news from ${API_BASE_URL}. Please try again. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Fetch Comments for a news article
    const fetchComments = async (newsId, newsTitle) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/${newsId}/comments`, {
                params: {
                    page: 0,
                    size: 100, // Get all comments
                    approvedOnly: false
                },
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            });

            setCommentsModal({
                isOpen: true,
                newsId: newsId,
                newsTitle: newsTitle,
                comments: response.data.content || response.data || []
            });
        } catch (error) {
            console.error("Error fetching comments:", error);
            setError("Failed to load comments. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Add New
    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditNews(null);
        setMainImage(null);
        setSocialImage(null);
        setError(null);
        setSuccess(null);
        setNewNews({
            title: "",
            subtitle: "",
            content: "",
            summary: "",
            authorName: "",
            authorEmail: "",
            category: "",
            tags: "",
            imageCaption: "",
            imageAlt: "",
            status: "DRAFT",
            priority: "MEDIUM",
            source: "",
            sourceUrl: "",
            region: "",
            country: "",
            city: "",
            isFeatured: false,
            isBreaking: false,
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            socialTitle: "",
            socialDescription: "",
            scheduledAt: ""
        });
    };

    // Handle Edit
    const handleEdit = (news) => {
        setEditNews({
            ...news,
            scheduledAt: news.scheduledAt ? news.scheduledAt.split('T')[0] : "",
            tags: news.tags ? news.tags.join(", ") : "",
            metaKeywords: news.metaKeywords ? news.metaKeywords.join(", ") : "",
            isFeatured: news.isFeatured || false,
            isBreaking: news.isBreaking || false
        });
        setIsAddingNew(false);
        setMainImage(null);
        setSocialImage(null);
        setError(null);
        setSuccess(null);
    };

    // Create FormData for multipart requests
    const createFormData = (newsData, imageFile = null, socialImageFile = null) => {
        const formData = new FormData();

        // Add all news fields
        Object.keys(newsData).forEach(key => {
            const value = newsData[key];
            if (value !== null && value !== undefined && value !== "") {
                if (key === 'tags' || key === 'metaKeywords') {
                    // Convert comma-separated string to array
                    if (typeof value === 'string') {
                        const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
                        if (arrayValue.length > 0) {
                            arrayValue.forEach(item => formData.append(key, item));
                        }
                    }
                } else if (typeof value === 'boolean') {
                    formData.append(key, value);
                } else if (key === 'scheduledAt' && value) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Add images if provided
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (socialImageFile) {
            formData.append('socialImage', socialImageFile);
        }

        return formData;
    };

    // Handle Create New
    const handleCreateNew = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Authentication required. Please log in again.");
                return;
            }

            // Validate required fields
            if (!newNews.title || !newNews.content || !newNews.authorName) {
                setError("Please fill in all required fields (Title, Content, Author Name)");
                return;
            }

            console.log('Creating news at:', API_BASE_URL);
            const formData = createFormData(newNews, mainImage, socialImage);

            const response = await axios.post(
                API_BASE_URL,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            console.log('News created successfully:', response.data);

            // Refresh the news list
            await fetchNews(currentPage, pageSize);
            setNewNews({
                title: "",
                subtitle: "",
                content: "",
                summary: "",
                authorName: "",
                authorEmail: "",
                category: "",
                tags: "",
                imageCaption: "",
                imageAlt: "",
                status: "DRAFT",
                priority: "MEDIUM",
                source: "",
                sourceUrl: "",
                region: "",
                country: "",
                city: "",
                isFeatured: false,
                isBreaking: false,
                metaTitle: "",
                metaDescription: "",
                metaKeywords: "",
                socialTitle: "",
                socialDescription: "",
                scheduledAt: ""
            });
            setIsAddingNew(false);
            setMainImage(null);
            setSocialImage(null);
            setSuccess("News article created successfully!");
        } catch (error) {
            console.error("Error creating news:", error);

            if (error.response?.status === 401) {
                setError("Authentication expired. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to create news.");
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.message || "Invalid news data. Please check your inputs.";
                setError(errorMsg);
            } else {
                setError(error.response?.data?.message || `Failed to create news. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Save
    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Authentication required. Please log in again.");
                return;
            }

            // Validate required fields
            if (!editNews.title || !editNews.content || !editNews.authorName) {
                setError("Please fill in all required fields (Title, Content, Author Name)");
                return;
            }

            const formData = createFormData(editNews, mainImage, socialImage);

            const response = await axios.put(
                `${API_BASE_URL}/${editNews.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            // Refresh the news list
            await fetchNews(currentPage, pageSize);
            setEditNews(null);
            setMainImage(null);
            setSocialImage(null);
            setSuccess("News article updated successfully!");
        } catch (error) {
            console.error("Error updating news:", error);

            if (error.response?.status === 401) {
                setError("Authentication expired. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to update news.");
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.message || "Invalid news data. Please check your inputs.";
                setError(errorMsg);
            } else {
                setError(error.response?.data?.message || `Failed to update news. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news article?")) {
            setIsLoading(true);
            setError(null);
            setSuccess(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Authentication required. Please log in again.");
                    return;
                }

                await axios.delete(`${API_BASE_URL}/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                // Refresh the news list
                await fetchNews(currentPage, pageSize);
                setSuccess("News article deleted successfully!");
            } catch (error) {
                console.error("Error deleting news:", error);

                if (error.response?.status === 401) {
                    setError("Authentication expired. Please log in again.");
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } else if (error.response?.status === 403) {
                    setError("Access denied. You don't have permission to delete news.");
                } else if (error.response?.status === 404) {
                    setError("News article not found. It may have been already deleted.");
                } else {
                    setError(error.response?.data?.message || `Failed to delete news. Error: ${error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle Delete Comment
    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/${commentsModal.newsId}/comments/${commentId}`, {
                    params: { isAdmin: true },
                    headers: { "Authorization": `Bearer ${token}` }
                });

                // Refresh comments
                await fetchComments(commentsModal.newsId, commentsModal.newsTitle);
                setSuccess("Comment deleted successfully!");
            } catch (error) {
                console.error("Error deleting comment:", error);
                setError("Failed to delete comment. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle Approve Comment
    const handleApproveComment = async (commentId) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/admin/comments/${commentId}/approve`, {
                moderatorEmail: "admin@example.com" // You might want to get this from user context
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            // Refresh comments
            await fetchComments(commentsModal.newsId, commentsModal.newsTitle);
            setSuccess("Comment approved successfully!");
        } catch (error) {
            console.error("Error approving comment:", error);
            setError("Failed to approve comment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Reject Comment
    const handleRejectComment = async (commentId) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/admin/comments/${commentId}/reject`, {
                moderatorEmail: "admin@example.com",
                reason: "Inappropriate content"
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            // Refresh comments
            await fetchComments(commentsModal.newsId, commentsModal.newsTitle);
            setSuccess("Comment rejected successfully!");
        } catch (error) {
            console.error("Error rejecting comment:", error);
            setError("Failed to reject comment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Cancel
    const handleCancel = () => {
        setEditNews(null);
        setIsAddingNew(false);
        setMainImage(null);
        setSocialImage(null);
        setError(null);
        setSuccess(null);
    };

    // Handle Input Change
    const handleInputChange = (e, isEditing) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;

        if (isEditing) {
            setEditNews({
                ...editNews,
                [name]: finalValue,
            });
        } else {
            setNewNews({
                ...newNews,
                [name]: finalValue,
            });
        }
    };

    // Handle file upload
    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                setError("Please upload a valid image file (JPG, PNG, GIF)");
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }

            if (fileType === 'main') {
                setMainImage(file);
            } else if (fileType === 'social') {
                setSocialImage(file);
            }
            setError(null);
        }
    };

    // Format date display
    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        return new Date(dateString).toLocaleDateString();
    };

    // Calculate stats
    const publishedNews = newsList.filter(n => n.status === 'PUBLISHED').length;
    const draftNews = newsList.filter(n => n.status === 'DRAFT').length;
    const featuredNews = newsList.filter(n => n.isFeatured).length;
    const breakingNews = newsList.filter(n => n.isBreaking).length;

    return (
        <Container>
            <HeaderSection>
                <PageTitle>News Management</PageTitle>
                <PageSubtitle>
                    Manage news articles, publications, and media content
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}
            {success && <SuccessBox>{success}</SuccessBox>}

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{totalCount}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">✅</span>
                        <span>Published: <span className="value">{publishedNews}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">📝</span>
                        <span>Drafts: <span className="value">{draftNews}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">⭐</span>
                        <span>Featured: <span className="value">{featuredNews}</span></span>
                    </StatItem>
                </StatsContainer>
                <AddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New Article
                </AddButton>
            </ActionBar>

            {newsList.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">📰</div>
                    <h3>No News Articles Found</h3>
                    <p>Start by adding your first news article to share updates and information</p>
                </EmptyState>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <MobileNewsContainer>
                        {newsList.map((news) => (
                            <MobileNewsCard key={`mobile-${news.id}`}>
                                <MobileNewsHeader>
                                    <MobileNewsInfo>
                                        <MobileNewsTitle>
                                            {news.title}
                                            {news.isFeatured && (
                                                <span style={{
                                                    marginLeft: '6px',
                                                    fontSize: '9px',
                                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                    color: 'white',
                                                    padding: '1px 3px',
                                                    borderRadius: '3px'
                                                }}>
                                                    ⭐
                                                </span>
                                            )}
                                            {news.isBreaking && (
                                                <span style={{
                                                    marginLeft: '6px',
                                                    fontSize: '9px',
                                                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                                                    color: 'white',
                                                    padding: '1px 3px',
                                                    borderRadius: '3px'
                                                }}>
                                                    🚨
                                                </span>
                                            )}
                                        </MobileNewsTitle>
                                        <MobileNewsAuthor>
                                            By {news.authorName}
                                        </MobileNewsAuthor>
                                    </MobileNewsInfo>
                                    <StatusBadge $status={news.status}>
                                        {news.status}
                                    </StatusBadge>
                                </MobileNewsHeader>

                                <MobileNewsDetails>
                                    <div style={{ color: '#c1ccdf' }}>
                                        📂 {news.category || 'General'}
                                    </div>
                                    <div style={{ color: '#c1ccdf' }}>
                                        👁️ {news.viewCount || 0} views
                                    </div>
                                    <div style={{ color: '#c1ccdf' }}>
                                        💬 {news.commentCount || 0} comments
                                    </div>
                                    <div style={{ color: '#c1ccdf' }}>
                                        📅 {formatDate(news.publishedAt)}
                                    </div>
                                </MobileNewsDetails>

                                <MobileNewsActions>
                                    <ActionButton
                                        $variant="edit"
                                        onClick={() => handleEdit(news)}
                                        disabled={isLoading}
                                    >
                                        <span className="icon">✏️</span>
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        $variant="comments"
                                        onClick={() => fetchComments(news.id, news.title)}
                                        disabled={isLoading}
                                    >
                                        <span className="icon">💬</span>
                                        Comments
                                    </ActionButton>
                                    <ActionButton
                                        $variant="delete"
                                        onClick={() => handleDelete(news.id)}
                                        disabled={isLoading}
                                    >
                                        <span className="icon">🗑️</span>
                                        Delete
                                    </ActionButton>
                                </MobileNewsActions>
                            </MobileNewsCard>
                        ))}
                    </MobileNewsContainer>

                    {/* Desktop Table View */}
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>Title</TableHeaderCell>
                                    <TableHeaderCell>Author</TableHeaderCell>
                                    <TableHeaderCell>Category</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Views</TableHeaderCell>
                                    <TableHeaderCell>Comments</TableHeaderCell>
                                    <TableHeaderCell>Published</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {newsList.map((news) => (
                                    <TableRow key={news.id}>
                                        <TableCell>
                                            <div>
                                                <strong style={{ color: '#ffffff', fontSize: '13px' }}>
                                                    {news.title}
                                                </strong>
                                                {news.isFeatured && (
                                                    <span style={{
                                                        marginLeft: '6px',
                                                        fontSize: '9px',
                                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                        color: 'white',
                                                        padding: '1px 4px',
                                                        borderRadius: '3px'
                                                    }}>
                                                        ⭐
                                                    </span>
                                                )}
                                                {news.isBreaking && (
                                                    <span style={{
                                                        marginLeft: '6px',
                                                        fontSize: '9px',
                                                        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                                                        color: 'white',
                                                        padding: '1px 4px',
                                                        borderRadius: '3px'
                                                    }}>
                                                        🚨
                                                    </span>
                                                )}
                                                {news.subtitle && (
                                                    <div style={{
                                                        fontSize: '11px',
                                                        color: '#c1ccdf',
                                                        marginTop: '2px',
                                                        opacity: 0.8
                                                    }}>
                                                        {news.subtitle.substring(0, 50)}...
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <span style={{ fontSize: '12px', fontWeight: '600' }}>
                                                    {news.authorName}
                                                </span>
                                                {news.authorEmail && (
                                                    <div style={{
                                                        fontSize: '10px',
                                                        color: '#c1ccdf',
                                                        opacity: 0.7
                                                    }}>
                                                        {news.authorEmail}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{
                                                padding: '2px 6px',
                                                background: 'rgba(59, 130, 246, 0.2)',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                borderRadius: '4px',
                                                color: '#93C5FD',
                                                fontSize: '10px',
                                                fontWeight: '600'
                                            }}>
                                                {news.category || 'General'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge $status={news.status}>
                                                {news.status}
                                            </StatusBadge>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{
                                                color: '#93C5FD',
                                                fontWeight: '600',
                                                fontSize: '12px'
                                            }}>
                                                👁️ {news.viewCount || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{
                                                color: '#10B981',
                                                fontWeight: '600',
                                                fontSize: '12px'
                                            }}>
                                                💬 {news.commentCount || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ fontSize: '12px' }}>
                                                {formatDate(news.publishedAt)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                                                <ActionButton
                                                    $variant="edit"
                                                    onClick={() => handleEdit(news)}
                                                    disabled={isLoading}
                                                >
                                                    <span className="icon">✏️</span>
                                                    Edit
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="comments"
                                                    onClick={() => fetchComments(news.id, news.title)}
                                                    disabled={isLoading}
                                                >
                                                    <span className="icon">💬</span>
                                                    Comments
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDelete(news.id)}
                                                    disabled={isLoading}
                                                >
                                                    <span className="icon">🗑️</span>
                                                    Delete
                                                </ActionButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}

            {/* News Form Modal */}
            {(editNews || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New News Article" : "Edit News Article"}
                        </ModalTitle>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Title *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="title"
                                    value={isAddingNew ? newNews.title : editNews.title}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter article title"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Subtitle</FormLabel>
                                <FormInput
                                    type="text"
                                    name="subtitle"
                                    value={isAddingNew ? newNews.subtitle : editNews.subtitle}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter article subtitle"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Author Name *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="authorName"
                                    value={isAddingNew ? newNews.authorName : editNews.authorName}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter author name"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Author Email</FormLabel>
                                <FormInput
                                    type="email"
                                    name="authorEmail"
                                    value={isAddingNew ? newNews.authorEmail : editNews.authorEmail}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter author email"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Category</FormLabel>
                                <FormSelect
                                    name="category"
                                    value={isAddingNew ? newNews.category : editNews.category}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="">Select category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Education">Education</option>
                                    <option value="Health">Health</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Science">Science</option>
                                    <option value="General">General</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Status *</FormLabel>
                                <FormSelect
                                    name="status"
                                    value={isAddingNew ? newNews.status : editNews.status}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Published</option>
                                    <option value="ARCHIVED">Archived</option>
                                    <option value="SCHEDULED">Scheduled</option>
                                </FormSelect>
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Priority</FormLabel>
                                <FormSelect
                                    name="priority"
                                    value={isAddingNew ? newNews.priority : editNews.priority}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Scheduled At</FormLabel>
                                <FormInput
                                    type="datetime-local"
                                    name="scheduledAt"
                                    value={isAddingNew ? newNews.scheduledAt : editNews.scheduledAt}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Source</FormLabel>
                                <FormInput
                                    type="text"
                                    name="source"
                                    value={isAddingNew ? newNews.source : editNews.source}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="e.g., Reuters, BBC, Local News"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Source URL</FormLabel>
                                <FormInput
                                    type="url"
                                    name="sourceUrl"
                                    value={isAddingNew ? newNews.sourceUrl : editNews.sourceUrl}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="https://example.com/article"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Region</FormLabel>
                                <FormInput
                                    type="text"
                                    name="region"
                                    value={isAddingNew ? newNews.region : editNews.region}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="e.g., Europe, Asia, Americas"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Country</FormLabel>
                                <FormInput
                                    type="text"
                                    name="country"
                                    value={isAddingNew ? newNews.country : editNews.country}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="e.g., Turkey, USA, Germany"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <FormLabel>City</FormLabel>
                            <FormInput
                                type="text"
                                name="city"
                                value={isAddingNew ? newNews.city : editNews.city}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="e.g., Istanbul, New York, Berlin"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Tags (comma-separated)</FormLabel>
                            <FormInput
                                type="text"
                                name="tags"
                                value={isAddingNew ? newNews.tags : editNews.tags}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="e.g., breaking news, technology, education"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Summary</FormLabel>
                            <FormTextArea
                                name="summary"
                                value={isAddingNew ? newNews.summary : editNews.summary}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter a brief summary of the article"
                                style={{ minHeight: '60px' }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Content *</FormLabel>
                            <FormTextArea
                                name="content"
                                value={isAddingNew ? newNews.content : editNews.content}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter the full article content"
                                style={{ minHeight: '120px' }}
                                required
                            />
                        </FormGroup>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Image Caption</FormLabel>
                                <FormInput
                                    type="text"
                                    name="imageCaption"
                                    value={isAddingNew ? newNews.imageCaption : editNews.imageCaption}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter image caption"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Image Alt Text</FormLabel>
                                <FormInput
                                    type="text"
                                    name="imageAlt"
                                    value={isAddingNew ? newNews.imageAlt : editNews.imageAlt}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter image alt text for accessibility"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <FormLabel>Main Image</FormLabel>
                            <FileUploadContainer>
                                <FileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'main')}
                                />
                                <FileUploadText>
                                    <span className="icon">📁</span>
                                    {mainImage ? mainImage.name : "Click to upload main image"}
                                    <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '3px' }}>
                                        JPG, PNG, GIF up to 5MB
                                    </div>
                                </FileUploadText>
                            </FileUploadContainer>
                        </FormGroup>

                        {/* SEO Fields */}
                        <div style={{
                            marginTop: '20px',
                            marginBottom: '16px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '16px'
                        }}>
                            <h3 style={{
                                color: '#ffffff',
                                fontSize: '16px',
                                marginBottom: '12px',
                                fontWeight: '600'
                            }}>
                                SEO & Social Media
                            </h3>
                        </div>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Meta Title</FormLabel>
                                <FormInput
                                    type="text"
                                    name="metaTitle"
                                    value={isAddingNew ? newNews.metaTitle : editNews.metaTitle}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="SEO title for search engines"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Social Title</FormLabel>
                                <FormInput
                                    type="text"
                                    name="socialTitle"
                                    value={isAddingNew ? newNews.socialTitle : editNews.socialTitle}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Title for social media sharing"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <FormLabel>Meta Description</FormLabel>
                            <FormTextArea
                                name="metaDescription"
                                value={isAddingNew ? newNews.metaDescription : editNews.metaDescription}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="SEO description for search engines"
                                style={{ minHeight: '60px' }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Social Description</FormLabel>
                            <FormTextArea
                                name="socialDescription"
                                value={isAddingNew ? newNews.socialDescription : editNews.socialDescription}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Description for social media sharing"
                                style={{ minHeight: '60px' }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Meta Keywords (comma-separated)</FormLabel>
                            <FormInput
                                type="text"
                                name="metaKeywords"
                                value={isAddingNew ? newNews.metaKeywords : editNews.metaKeywords}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="SEO keywords separated by commas"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Social Media Image</FormLabel>
                            <FileUploadContainer>
                                <FileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'social')}
                                />
                                <FileUploadText>
                                    <span className="icon">📁</span>
                                    {socialImage ? socialImage.name : "Click to upload social media image"}
                                    <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '3px' }}>
                                        Optimized for social media sharing
                                    </div>
                                </FileUploadText>
                            </FileUploadContainer>
                        </FormGroup>

                        <FormRow>
                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={isAddingNew ? newNews.isFeatured : editNews.isFeatured}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Featured Article
                                </FormLabel>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="isBreaking"
                                        checked={isAddingNew ? newNews.isBreaking : editNews.isBreaking}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Breaking News
                                </FormLabel>
                            </FormGroup>
                        </FormRow>

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel} disabled={isLoading}>
                                Cancel
                            </CancelButton>
                            <SaveButton
                                onClick={isAddingNew ? handleCreateNew : handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : (isAddingNew ? "Create Article" : "Save Changes")}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Comments Modal */}
            {commentsModal.isOpen && (
                <ModalOverlay>
                    <CommentsModalContent>
                        <ModalTitle>
                            Comments for: {commentsModal.newsTitle}
                        </ModalTitle>

                        {commentsModal.comments.length === 0 ? (
                            <EmptyState>
                                <div className="icon">💬</div>
                                <h3>No Comments Found</h3>
                                <p>This article doesn't have any comments yet</p>
                            </EmptyState>
                        ) : (
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {commentsModal.comments.map((comment) => (
                                    <CommentCard key={comment.id}>
                                        <CommentHeader>
                                            <div>
                                                <CommentAuthor>
                                                    {comment.authorName}
                                                    {comment.authorEmail && (
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: '#c1ccdf',
                                                            fontWeight: '400',
                                                            marginLeft: '6px'
                                                        }}>
                                                            ({comment.authorEmail})
                                                        </span>
                                                    )}
                                                </CommentAuthor>
                                                <CommentDate>
                                                    {formatDate(comment.createdAt)} •
                                                    <CommentStatus $status={comment.status} style={{ marginLeft: '6px' }}>
                                                        {comment.status || (comment.isApproved ? 'APPROVED' : 'PENDING')}
                                                    </CommentStatus>
                                                </CommentDate>
                                            </div>
                                            <CommentActions>
                                                {!comment.isApproved && comment.status !== 'APPROVED' && (
                                                    <ActionButton
                                                        $variant="comments"
                                                        onClick={() => handleApproveComment(comment.id)}
                                                        disabled={isLoading}
                                                        style={{ fontSize: '8px', padding: '3px 5px' }}
                                                    >
                                                        ✅ Approve
                                                    </ActionButton>
                                                )}
                                                {comment.isApproved && comment.status !== 'REJECTED' && (
                                                    <ActionButton
                                                        $variant="delete"
                                                        onClick={() => handleRejectComment(comment.id)}
                                                        disabled={isLoading}
                                                        style={{ fontSize: '8px', padding: '3px 5px' }}
                                                    >
                                                        ❌ Reject
                                                    </ActionButton>
                                                )}
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    disabled={isLoading}
                                                    style={{ fontSize: '8px', padding: '3px 5px' }}
                                                >
                                                    🗑️ Delete
                                                </ActionButton>
                                            </CommentActions>
                                        </CommentHeader>
                                        <CommentContent>
                                            {comment.content}
                                        </CommentContent>
                                        {comment.likeCount > 0 && (
                                            <div style={{
                                                fontSize: '10px',
                                                color: '#10B981',
                                                marginTop: '4px'
                                            }}>
                                                👍 {comment.likeCount} likes
                                                {comment.replyCount > 0 && (
                                                    <span style={{ marginLeft: '10px', color: '#93C5FD' }}>
                                                        💬 {comment.replyCount} replies
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </CommentCard>
                                ))}
                            </div>
                        )}

                        <ButtonGroup style={{ marginTop: '16px' }}>
                            <CancelButton onClick={() => setCommentsModal({ ...commentsModal, isOpen: false })}>
                                Close
                            </CancelButton>
                        </ButtonGroup>
                    </CommentsModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminNews;