import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Improved Styled Components with better width utilization and smaller spacing
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
        content: '💼';
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

    /* Show table on desktop, hide on mobile */
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* Fixed layout for better control */
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

    /* Column width distribution */
    &:nth-child(1) { width: 18%; } /* Job Title */
    &:nth-child(2) { width: 15%; } /* Company */
    &:nth-child(3) { width: 12%; } /* Location */
    &:nth-child(4) { width: 8%; }  /* Type */
    &:nth-child(5) { width: 12%; } /* Salary */
    &:nth-child(6) { width: 8%; }  /* Status */
    &:nth-child(7) { width: 8%; }  /* Views */
    &:nth-child(8) { width: 10%; } /* Deadline */
    &:nth-child(9) { width: 9%; }  /* Actions */

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

const JobStatusBadge = styled.span`
    padding: 3px 6px;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${props => {
        switch (props.$status) {
            case 'active':
                return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            case 'closed':
                return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
            case 'draft':
                return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
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

const SalaryBadge = styled.span`
    padding: 3px 5px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 6px;
    color: #93C5FD;
    font-size: 9px;
    font-weight: 600;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
        padding: 3px 6px;
        font-size: 10px;
    }
`;

const ActionButton = styled.button`
    background: ${props => props.$variant === 'edit' ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
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

const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        gap: 16px;
    }
`;

const PageSizeSelector = styled.select`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: #ffffff;
    padding: 6px 10px;
    font-size: 13px;
    margin-left: 6px;
    width: 70px;

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const PageButtons = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
        gap: 6px;
        justify-content: flex-end;
    }
`;

const PageButton = styled.button`
    background: ${props => props.$active ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'rgba(255, 255, 255, 0.1)'};
    border: 1px solid ${props => props.$active ?
            'rgba(59, 130, 246, 0.5)' :
            'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.$active ? '#ffffff' : '#c1ccdf'};
    padding: 5px 7px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
        background: ${props => props.$active ?
                'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)' :
                'rgba(255, 255, 255, 0.2)'};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (min-width: 768px) {
        padding: 6px 10px;
        font-size: 12px;
    }
`;

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
    max-width: 800px;
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

    @media (min-width: 768px) {
        padding: 12px 16px;
        margin-bottom: 20px;
        gap: 10px;

        &:before {
            font-size: 16px;
            margin-top: 0;
        }
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

    @media (min-width: 768px) {
        padding: 12px 16px;
        margin-bottom: 20px;
        gap: 10px;

        &:before {
            font-size: 16px;
            margin-top: 0;
        }
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

    @media (min-width: 768px) {
        flex-direction: row;
        font-size: 16px;

        &:before {
            font-size: 28px;
            margin-bottom: 0;
            margin-right: 10px;
        }
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

    @media (min-width: 768px) {
        padding: 40px 30px;

        .icon {
            font-size: 40px;
            margin-bottom: 16px;
        }

        h3 {
            margin: 0 0 10px;
            font-size: 16px;
        }

        p {
            font-size: 14px;
        }
    }
`;

// Mobile card view for jobs (alternative to table)
const MobileJobCard = styled.div`
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

    /* Show cards on mobile, hide on desktop */
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const MobileJobsContainer = styled.div`
    /* Show on mobile, hide on desktop */
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const MobileJobHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
`;

const MobileJobInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const MobileJobTitle = styled.h3`
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 3px 0;
    word-break: break-word;
`;

const MobileJobCompany = styled.div`
    color: #c1ccdf;
    font-size: 12px;
    margin-bottom: 6px;
`;

const MobileJobDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 11px;
`;

const MobileJobActions = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`;

// Configuration constants
const API_BASE_URL = "http://localhost:8080/api/jobs"; // Updated to use /api/jobs

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [editJob, setEditJob] = useState(null);
    const [newJob, setNewJob] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "full-time",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        description: "",
        requirements: "",
        status: "active",
        applicationDeadline: "",
        contactEmail: "",
        applicationUrl: "",
        experienceLevel: "",
        industry: "",
        remoteAllowed: false,
        workingHours: "",
        salaryPeriod: "annually",
        salaryNegotiable: false,
        maxApplications: "",
        isUrgent: false,
        featured: false,
        skills: "",
        benefits: "",
        keywords: "",
        createdBy: ""
    });
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Setup axios defaults with authentication
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

    // Fetch Jobs with pagination and better error handling
    const fetchJobs = async (page = 0, size = 10) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching jobs from:', API_BASE_URL);

            const response = await axios.get(API_BASE_URL, {
                params: {
                    page: page,
                    size: size,
                    sortBy: "createdAt",
                    sortDir: "desc",
                    paginated: true
                },
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            });

            console.log('Jobs response:', response.data);
            setJobs(response.data.jobs || []);
            setTotalCount(response.data.totalElements || 0);
            setTotalPages(response.data.totalPages || 0);
            setCurrentPage(response.data.currentPage || 0);
            setError(null);
        } catch (error) {
            console.error("Error fetching jobs:", error);

            // Handle different error types
            if (error.response?.status === 404) {
                setError("Jobs endpoint not found. Please check if the server is running and the endpoint exists at " + API_BASE_URL);
            } else if (error.response?.status === 401) {
                setError("Authentication required. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to view jobs.");
            } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
                setError("Network error. Please check your connection and ensure the server is running at " + API_BASE_URL);
            } else {
                setError(`Failed to load jobs from ${API_BASE_URL}. Please try again. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Add missing handleAddNew function
    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditJob(null);
        setCompanyLogo(null);
        setError(null);
        setSuccess(null);
        // Reset new job form
        setNewJob({
            title: "",
            company: "",
            location: "",
            jobType: "full-time",
            salaryMin: "",
            salaryMax: "",
            currency: "USD",
            description: "",
            requirements: "",
            status: "active",
            applicationDeadline: "",
            contactEmail: "",
            applicationUrl: "",
            experienceLevel: "",
            industry: "",
            remoteAllowed: false,
            workingHours: "",
            salaryPeriod: "annually",
            salaryNegotiable: false,
            maxApplications: "",
            isUrgent: false,
            featured: false,
            skills: "",
            benefits: "",
            keywords: "",
            createdBy: ""
        });
    };

    // Handle Edit
    const handleEdit = (job) => {
        setEditJob({
            ...job,
            applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : "",
            salaryMin: job.salaryMin || "",
            salaryMax: job.salaryMax || "",
            skills: job.skills ? job.skills.join(", ") : "",
            benefits: job.benefits ? job.benefits.join(", ") : "",
            keywords: job.keywords ? job.keywords.join(", ") : "",
            maxApplications: job.maxApplications || "",
            experienceLevel: job.experienceLevel || "",
            industry: job.industry || "",
            workingHours: job.workingHours || "",
            createdBy: job.createdBy || "",
            remoteAllowed: job.remoteAllowed || false,
            salaryNegotiable: job.salaryNegotiable || false,
            isUrgent: job.isUrgent || false,
            featured: job.featured || false
        });
        setIsAddingNew(false);
        setCompanyLogo(null);
        setError(null);
        setSuccess(null);
    };

    // Create FormData for multipart requests
    const createFormData = (jobData, logoFile = null) => {
        const formData = new FormData();

        // Add all job fields, ensuring proper formatting for backend
        Object.keys(jobData).forEach(key => {
            const value = jobData[key];
            if (value !== null && value !== undefined && value !== "") {
                if (key === 'salaryMin' || key === 'salaryMax') {
                    if (value && !isNaN(value)) {
                        formData.append(key, parseFloat(value));
                    }
                } else if (key === 'maxApplications') {
                    if (value && !isNaN(value)) {
                        formData.append(key, parseInt(value));
                    }
                } else if (typeof value === 'boolean') {
                    formData.append(key, value);
                } else if (key === 'applicationDeadline' && value) {
                    // Format date for backend
                    formData.append(key, value);
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Add company logo if provided
        if (logoFile) {
            formData.append('companyLogo', logoFile);
        }

        return formData;
    };

    // Add missing handleCreateNew function
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
            if (!newJob.title || !newJob.company || !newJob.location) {
                setError("Please fill in all required fields (Title, Company, Location)");
                return;
            }

            console.log('Creating job at:', API_BASE_URL);
            const formData = createFormData(newJob, companyLogo);

            // Debug: Log form data contents
            console.log('Form data contents:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

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

            console.log('Job created successfully:', response.data);

            // Refresh the jobs list
            await fetchJobs(currentPage, pageSize);
            setNewJob({
                title: "",
                company: "",
                location: "",
                jobType: "full-time",
                salaryMin: "",
                salaryMax: "",
                currency: "USD",
                description: "",
                requirements: "",
                status: "active",
                applicationDeadline: "",
                contactEmail: "",
                applicationUrl: "",
                experienceLevel: "",
                industry: "",
                remoteAllowed: false,
                workingHours: "",
                salaryPeriod: "annually",
                salaryNegotiable: false,
                maxApplications: "",
                isUrgent: false,
                featured: false,
                skills: "",
                benefits: "",
                keywords: "",
                createdBy: ""
            });
            setIsAddingNew(false);
            setEditJob(null);
            setCompanyLogo(null);
            setSuccess("Job created successfully!");
        } catch (error) {
            console.error("Error creating job:", error);

            if (error.response?.status === 401) {
                setError("Authentication expired. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to create jobs. Admin access required.");
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.message || "Invalid job data. Please check your inputs.";
                setError(errorMsg);
            } else if (error.response?.status === 404) {
                setError(`Jobs endpoint not found at ${API_BASE_URL}. Please check your backend configuration.`);
            } else {
                setError(error.response?.data?.message || `Failed to create job. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Save with better error handling
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
            if (!editJob.title || !editJob.company || !editJob.location) {
                setError("Please fill in all required fields (Title, Company, Location)");
                return;
            }

            const formData = createFormData(editJob, companyLogo);

            const response = await axios.put(
                `${API_BASE_URL}/${editJob.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            // Refresh the jobs list
            await fetchJobs(currentPage, pageSize);
            setEditJob(null);
            setCompanyLogo(null);
            setSuccess("Job updated successfully!");
        } catch (error) {
            console.error("Error updating job:", error);

            if (error.response?.status === 401) {
                setError("Authentication expired. Please log in again.");
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                setError("Access denied. You don't have permission to update jobs. Admin access required.");
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.message || "Invalid job data. Please check your inputs.";
                setError(errorMsg);
            } else if (error.response?.status === 404) {
                setError("Job not found or endpoint not available.");
            } else {
                setError(error.response?.data?.message || `Failed to update job. Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Delete with better error handling
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this job posting?")) {
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

                // Refresh the jobs list
                await fetchJobs(currentPage, pageSize);
                setSuccess("Job deleted successfully!");
            } catch (error) {
                console.error("Error deleting job:", error);

                if (error.response?.status === 401) {
                    setError("Authentication expired. Please log in again.");
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } else if (error.response?.status === 403) {
                    setError("Access denied. You don't have permission to delete jobs.");
                } else if (error.response?.status === 404) {
                    setError("Job not found. It may have been already deleted.");
                } else {
                    setError(error.response?.data?.message || `Failed to delete job. Error: ${error.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle Cancel
    const handleCancel = () => {
        setEditJob(null);
        setIsAddingNew(false);
        setCompanyLogo(null);
        setError(null);
        setSuccess(null);
    };

    // Handle Input Change
    const handleInputChange = (e, isEditing) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;

        if (isEditing) {
            setEditJob({
                ...editJob,
                [name]: finalValue,
            });
        } else {
            setNewJob({
                ...newJob,
                [name]: finalValue,
            });
        }
    };

    // Handle file upload
    const handleFileChange = (e) => {
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

            setCompanyLogo(file);
            setError(null);
        }
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setCurrentPage(0);
    };

    // Format salary display
    const formatSalary = (job) => {
        if (!job.salaryMin && !job.salaryMax) return "Not specified";
        const min = job.salaryMin ? `${job.currency || 'USD'} ${job.salaryMin.toLocaleString()}` : "";
        const max = job.salaryMax ? `${job.currency || 'USD'} ${job.salaryMax.toLocaleString()}` : "";

        if (min && max) return `${min} - ${max}`;
        if (min) return `From ${min}`;
        if (max) return `Up to ${max}`;
        return "Not specified";
    };

    // Format date display
    const formatDate = (dateString) => {
        if (!dateString) return "No deadline";
        return new Date(dateString).toLocaleDateString();
    };

    // Calculate stats
    const activeJobs = jobs.filter(j => j.status === 'active').length;
    const jobsWithSalary = jobs.filter(j => j.salaryMin || j.salaryMax).length;
    const urgentJobs = jobs.filter(j => j.isUrgent).length;

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Jobs Management</PageTitle>
                <PageSubtitle>
                    Manage job postings and career opportunities for students and graduates
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
                        <span>Active: <span className="value">{activeJobs}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">💰</span>
                        <span>With Salary: <span className="value">{jobsWithSalary}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">🚨</span>
                        <span>Urgent: <span className="value">{urgentJobs}</span></span>
                    </StatItem>
                </StatsContainer>
                <AddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New Job
                </AddButton>
            </ActionBar>

            {jobs.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">💼</div>
                    <h3>No Jobs Found</h3>
                    <p>Start by adding your first job posting to help students find career opportunities</p>
                </EmptyState>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <MobileJobsContainer>
                        {jobs.map((job) => (
                            <MobileJobCard key={`mobile-${job.id}`}>
                                <MobileJobHeader>
                                    <MobileJobInfo>
                                        <MobileJobTitle>
                                            {job.title}
                                            {job.featured && (
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
                                            {job.isUrgent && (
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
                                        </MobileJobTitle>
                                        <MobileJobCompany>
                                            {job.companyLogo && (
                                                <img
                                                    src={job.companyLogo}
                                                    alt={`${job.company} logo`}
                                                    style={{
                                                        width: '14px',
                                                        height: '14px',
                                                        borderRadius: '3px',
                                                        objectFit: 'cover',
                                                        marginRight: '6px',
                                                        verticalAlign: 'middle'
                                                    }}
                                                />
                                            )}
                                            {job.company}
                                        </MobileJobCompany>
                                    </MobileJobInfo>
                                    <JobStatusBadge $status={job.status}>
                                        {job.status}
                                    </JobStatusBadge>
                                </MobileJobHeader>

                                <MobileJobDetails>
                                    <div style={{ color: '#c1ccdf' }}>
                                        📍 {job.location}
                                        {job.remoteAllowed && <span style={{ color: '#10B981' }}> 🌐</span>}
                                    </div>
                                    <div style={{ color: '#c1ccdf' }}>
                                        ⏰ {job.jobType?.replace('-', ' ')}
                                    </div>
                                    <div style={{ color: '#93C5FD' }}>
                                        💰 <SalaryBadge>{formatSalary(job)}</SalaryBadge>
                                    </div>
                                    <div style={{ color: '#c1ccdf' }}>
                                        📅 {formatDate(job.applicationDeadline)}
                                    </div>
                                    <div style={{ color: '#93C5FD' }}>
                                        👁️ {job.viewCount || 0} views
                                    </div>
                                </MobileJobDetails>

                                <MobileJobActions>
                                    <ActionButton
                                        $variant="edit"
                                        onClick={() => handleEdit(job)}
                                        disabled={isLoading}
                                    >
                                        <span className="icon">✏️</span>
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        $variant="delete"
                                        onClick={() => handleDelete(job.id)}
                                        disabled={isLoading}
                                    >
                                        <span className="icon">🗑️</span>
                                        Delete
                                    </ActionButton>
                                </MobileJobActions>
                            </MobileJobCard>
                        ))}
                    </MobileJobsContainer>

                    {/* Desktop Table View */}
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>Job Title</TableHeaderCell>
                                    <TableHeaderCell>Company</TableHeaderCell>
                                    <TableHeaderCell>Location</TableHeaderCell>
                                    <TableHeaderCell>Type</TableHeaderCell>
                                    <TableHeaderCell>Salary</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Views</TableHeaderCell>
                                    <TableHeaderCell>Deadline</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>
                                            <div>
                                                <strong style={{ color: '#ffffff', fontSize: '13px' }}>
                                                    {job.title}
                                                </strong>
                                                {job.featured && (
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
                                                {job.isUrgent && (
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
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {job.companyLogo && (
                                                    <img
                                                        src={job.companyLogo}
                                                        alt={`${job.company} logo`}
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '3px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                )}
                                                <span style={{ fontSize: '12px' }}>{job.company}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ fontSize: '12px' }}>
                                                {job.location}
                                                {job.remoteAllowed && (
                                                    <span style={{
                                                        marginLeft: '3px',
                                                        fontSize: '10px',
                                                        color: '#10B981',
                                                        fontWeight: '600'
                                                    }}>
                                                        🌐
                                                    </span>
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{
                                                textTransform: 'capitalize',
                                                padding: '2px 6px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '4px',
                                                fontSize: '10px',
                                                fontWeight: '600'
                                            }}>
                                                {job.jobType?.replace('-', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <SalaryBadge>{formatSalary(job)}</SalaryBadge>
                                        </TableCell>
                                        <TableCell>
                                            <JobStatusBadge $status={job.status}>
                                                {job.status}
                                            </JobStatusBadge>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{
                                                color: '#93C5FD',
                                                fontWeight: '600',
                                                fontSize: '12px'
                                            }}>
                                                👁️ {job.viewCount || 0}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ fontSize: '12px' }}>
                                                {formatDate(job.applicationDeadline)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                                                <ActionButton
                                                    $variant="edit"
                                                    onClick={() => handleEdit(job)}
                                                    disabled={isLoading}
                                                >
                                                    <span className="icon">✏️</span>
                                                    Edit
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDelete(job.id)}
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

                    {totalPages > 1 && (
                        <PaginationContainer>
                            <div style={{ color: '#c1ccdf', fontSize: '13px' }}>
                                <div style={{ marginBottom: '6px' }}>
                                    Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} jobs
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                    <span>Items per page:</span>
                                    <PageSizeSelector value={pageSize} onChange={handlePageSizeChange}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </PageSizeSelector>
                                </div>
                            </div>
                            <PageButtons>
                                <PageButton
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    ← Previous
                                </PageButton>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum = i;
                                    if (totalPages > 5) {
                                        if (currentPage > 1 && currentPage < totalPages - 2) {
                                            pageNum = currentPage - 2 + i;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 5 + i;
                                        }
                                    }
                                    return (
                                        <PageButton
                                            key={pageNum}
                                            $active={pageNum === currentPage}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum + 1}
                                        </PageButton>
                                    );
                                })}
                                <PageButton
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1 || totalPages === 0}
                                >
                                    Next →
                                </PageButton>
                            </PageButtons>
                        </PaginationContainer>
                    )}
                </>
            )}

            {isLoading && <LoadingOverlay>Loading jobs...</LoadingOverlay>}

            {(editJob || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New Job" : "Edit Job"}
                        </ModalTitle>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Job Title *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="title"
                                    value={isAddingNew ? newJob.title : editJob.title}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter job title"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Company *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="company"
                                    value={isAddingNew ? newJob.company : editJob.company}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter company name"
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Location *</FormLabel>
                                <FormInput
                                    type="text"
                                    name="location"
                                    value={isAddingNew ? newJob.location : editJob.location}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter job location"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Job Type *</FormLabel>
                                <FormSelect
                                    name="jobType"
                                    value={isAddingNew ? newJob.jobType : editJob.jobType}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                    <option value="remote">Remote</option>
                                </FormSelect>
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Experience Level</FormLabel>
                                <FormSelect
                                    name="experienceLevel"
                                    value={isAddingNew ? newJob.experienceLevel : editJob.experienceLevel}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="">Select level</option>
                                    <option value="entry">Entry Level</option>
                                    <option value="mid">Mid Level</option>
                                    <option value="senior">Senior Level</option>
                                    <option value="executive">Executive</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Industry</FormLabel>
                                <FormInput
                                    type="text"
                                    name="industry"
                                    value={isAddingNew ? newJob.industry : editJob.industry}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="e.g., Technology, Healthcare, Finance"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Minimum Salary</FormLabel>
                                <FormInput
                                    type="number"
                                    name="salaryMin"
                                    value={isAddingNew ? newJob.salaryMin : editJob.salaryMin}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter minimum salary"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Maximum Salary</FormLabel>
                                <FormInput
                                    type="number"
                                    name="salaryMax"
                                    value={isAddingNew ? newJob.salaryMax : editJob.salaryMax}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter maximum salary"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Currency</FormLabel>
                                <FormSelect
                                    name="currency"
                                    value={isAddingNew ? newJob.currency : editJob.currency}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="TRY">TRY</option>
                                    <option value="CAD">CAD</option>
                                    <option value="AUD">AUD</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Salary Period</FormLabel>
                                <FormSelect
                                    name="salaryPeriod"
                                    value={isAddingNew ? newJob.salaryPeriod : editJob.salaryPeriod}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="hourly">Hourly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="annually">Annually</option>
                                </FormSelect>
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Status *</FormLabel>
                                <FormSelect
                                    name="status"
                                    value={isAddingNew ? newJob.status : editJob.status}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="active">Active</option>
                                    <option value="closed">Closed</option>
                                    <option value="draft">Draft</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Working Hours</FormLabel>
                                <FormSelect
                                    name="workingHours"
                                    value={isAddingNew ? newJob.workingHours : editJob.workingHours}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="">Select hours</option>
                                    <option value="standard">Standard</option>
                                    <option value="flexible">Flexible</option>
                                    <option value="shifts">Shifts</option>
                                    <option value="weekend">Weekend</option>
                                    <option value="night">Night</option>
                                </FormSelect>
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Application Deadline</FormLabel>
                                <FormInput
                                    type="date"
                                    name="applicationDeadline"
                                    value={isAddingNew ? newJob.applicationDeadline : editJob.applicationDeadline}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Max Applications</FormLabel>
                                <FormInput
                                    type="number"
                                    name="maxApplications"
                                    value={isAddingNew ? newJob.maxApplications : editJob.maxApplications}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="e.g., 100"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Contact Email</FormLabel>
                                <FormInput
                                    type="email"
                                    name="contactEmail"
                                    value={isAddingNew ? newJob.contactEmail : editJob.contactEmail}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter contact email"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Application URL</FormLabel>
                                <FormInput
                                    type="url"
                                    name="applicationUrl"
                                    value={isAddingNew ? newJob.applicationUrl : editJob.applicationUrl}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="https://example.com/apply"
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <FormLabel>Skills (comma-separated)</FormLabel>
                            <FormInput
                                type="text"
                                name="skills"
                                value={isAddingNew ? newJob.skills : editJob.skills}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Benefits (comma-separated)</FormLabel>
                            <FormInput
                                type="text"
                                name="benefits"
                                value={isAddingNew ? newJob.benefits : editJob.benefits}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="e.g., Health Insurance, Remote Work, Flexible Hours"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Keywords (comma-separated)</FormLabel>
                            <FormInput
                                type="text"
                                name="keywords"
                                value={isAddingNew ? newJob.keywords : editJob.keywords}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="e.g., web development, frontend, backend"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Company Logo</FormLabel>
                            <FileUploadContainer>
                                <FileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <FileUploadText>
                                    <span className="icon">📁</span>
                                    {companyLogo ? companyLogo.name : "Click to upload company logo"}
                                    <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '3px' }}>
                                        JPG, PNG, GIF up to 5MB
                                    </div>
                                </FileUploadText>
                            </FileUploadContainer>
                        </FormGroup>

                        <FormRow>
                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="remoteAllowed"
                                        checked={isAddingNew ? newJob.remoteAllowed : editJob.remoteAllowed}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Remote Work Allowed
                                </FormLabel>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="salaryNegotiable"
                                        checked={isAddingNew ? newJob.salaryNegotiable : editJob.salaryNegotiable}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Salary Negotiable
                                </FormLabel>
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="isUrgent"
                                        checked={isAddingNew ? newJob.isUrgent : editJob.isUrgent}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Mark as Urgent
                                </FormLabel>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={isAddingNew ? newJob.featured : editJob.featured}
                                        onChange={(e) => handleInputChange(e, !isAddingNew)}
                                        style={{ margin: 0 }}
                                    />
                                    Featured Job
                                </FormLabel>
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <FormLabel>Job Description</FormLabel>
                            <FormTextArea
                                name="description"
                                value={isAddingNew ? newJob.description : editJob.description}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter detailed job description, responsibilities, and what the role involves"
                                style={{ minHeight: '80px' }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Requirements</FormLabel>
                            <FormTextArea
                                name="requirements"
                                value={isAddingNew ? newJob.requirements : editJob.requirements}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter job requirements, qualifications, skills, and experience needed"
                                style={{ minHeight: '80px' }}
                            />
                        </FormGroup>

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel} disabled={isLoading}>
                                Cancel
                            </CancelButton>
                            <SaveButton
                                onClick={isAddingNew ? handleCreateNew : handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : (isAddingNew ? "Create Job" : "Save Changes")}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminJobs;