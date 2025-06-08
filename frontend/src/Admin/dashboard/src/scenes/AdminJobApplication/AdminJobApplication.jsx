import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";

// Re-use styled components from AdminJobs, with minor adjustments if needed
// (Assuming these are defined in a shared file or copied directly)
// For brevity, I'll assume they are available. If not, they'd be defined here.
// START COPIED STYLED COMPONENTS (abbreviated for brevity in thought process, full in final code)
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
        content: '📄'; // Changed icon
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
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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

    /* Column width distribution */
    &:nth-child(1) { width: 20%; } /* Applicant */
    &:nth-child(2) { width: 20%; } /* Job Title */
    &:nth-child(3) { width: 15%; } /* Company */
    &:nth-child(4) { width: 10%; } /* Status */
    &:nth-child(5) { width: 10%; } /* Applied At */
    &:nth-child(6) { width: 10%; }  /* Resume */
    &:nth-child(7) { width: 15%; } /* Actions */


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

    a {
        color: #93C5FD;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    
    @media (min-width: 768px) {
        padding: 12px 10px;
        font-size: 13px;
    }
`;

const ApplicationStatusBadge = styled.span`
    padding: 3px 6px;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${props => {
    switch (props.$status) {
        case 'pending': return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'; // Amber
        case 'reviewed': return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'; // Blue
        case 'shortlisted': return 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'; // Purple
        case 'interviewed': return 'linear-gradient(135deg, #EC4899 0%, #C026D3 100%)'; // Pink
        case 'offered': return 'linear-gradient(135deg, #10B981 0%, #059669 100%)'; // Green
        case 'rejected': return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'; // Red
        case 'withdrawn': return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'; // Gray
        default: return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
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
    if (props.$variant === 'edit') return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
    if (props.$variant === 'delete') return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    if (props.$variant === 'view') return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
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

    &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
    
    &[type="datetime-local"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
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
    
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const MobileJobsContainer = styled.div`
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
    word-break: break-word;
`;

const MobileJobDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 11px;
    word-break: break-word;
`;

const MobileJobActions = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`;
// END COPIED STYLED COMPONENTS


const API_BASE_URL = "http://localhost:8080/api/job-applications";

const initialNewApplicationState = {
    jobId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    currentPosition: "",
    currentCompany: "",
    yearsOfExperience: "",
    coverLetter: "",
    expectedSalary: "",
    expectedSalaryCurrency: "USD",
    noticePeriod: "",
    willingToRelocate: false,
    remoteWorkPreference: false,
    portfolioUrl: "",
    additionalNotes: "",
    status: "pending",
    // For edit/view only
    hrNotes: "",
    interviewDate: "",
    interviewSchedule: ""
};

const AdminJobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [editApplication, setEditApplication] = useState(null);
    const [newApplication, setNewApplication] = useState(initialNewApplicationState);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [stats, setStats] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Redirect to login or handle unauthorized access
            console.warn("No token found, API calls might fail.");
        }
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 7000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const fetchApplications = useCallback(async (page = 0, size = 10) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_BASE_URL, {
                params: { page, size, sortBy: "appliedAt", sortDir: "desc", paginated: true },
                headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
            });
            setApplications(response.data.applications || []);
            setTotalCount(response.data.totalElements || 0);
            setTotalPages(response.data.totalPages || 0);
            setCurrentPage(response.data.currentPage || 0);
            setError(null);
        } catch (err) {
            console.error("Error fetching applications:", err);
            handleApiError(err, "Failed to load applications");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchStatistics = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/statistics`, {
                headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
            });
            setStats(response.data);
        } catch (err) {
            console.error("Error fetching statistics:", err);
            // Non-critical, so don't set major error
        }
    }, []);

    useEffect(() => {
        fetchApplications(currentPage, pageSize);
        fetchStatistics();
    }, [currentPage, pageSize, fetchApplications, fetchStatistics]);

    const handleApiError = (err, defaultMessage) => {
        if (err.response) {
            if (err.response.status === 401) {
                setError("Authentication required. Please log in again.");
                // localStorage.removeItem('token'); // Optionally clear token
                // window.location.href = '/login'; // Optionally redirect
            } else if (err.response.status === 403) {
                setError("Access denied. You don't have permission for this action.");
            } else if (err.response.status === 404) {
                setError(`Endpoint not found. Please check server. (${err.response.config.url})`);
            } else {
                setError(err.response.data?.message || err.response.data?.error || defaultMessage);
            }
        } else if (err.request) {
            setError("Network error. Please check your connection and ensure the server is running.");
        } else {
            setError(defaultMessage + `: ${err.message}`);
        }
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditApplication(null);
        setNewApplication(initialNewApplicationState);
        setResumeFile(null);
        setError(null);
        setSuccess(null);
    };

    const handleViewOrEdit = async (applicationId) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/${applicationId}`, {
                headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
            });
            const appData = response.data;
            setEditApplication({
                ...appData,
                yearsOfExperience: appData.yearsOfExperience !== null ? String(appData.yearsOfExperience) : "",
                expectedSalary: appData.expectedSalary !== null ? String(appData.expectedSalary) : "",
                interviewDate: appData.interviewDate ? appData.interviewDate.substring(0, 16) : "", // Format for datetime-local
            });
            setIsAddingNew(false);
            setResumeFile(null);
        } catch (err) {
            handleApiError(err, "Failed to load application details");
        } finally {
            setIsLoading(false);
        }
    };


    const createApplicationFormData = (appData, resume) => {
        const formData = new FormData();
        // These must match @RequestParam names in controller's submitApplication
        formData.append('fullName', appData.fullName);
        formData.append('email', appData.email);
        if (appData.phoneNumber) formData.append('phoneNumber', appData.phoneNumber);
        if (appData.currentPosition) formData.append('currentPosition', appData.currentPosition);
        if (appData.currentCompany) formData.append('currentCompany', appData.currentCompany);
        if (appData.yearsOfExperience) formData.append('yearsOfExperience', parseInt(appData.yearsOfExperience));
        if (appData.coverLetter) formData.append('coverLetter', appData.coverLetter);
        if (appData.expectedSalary) formData.append('expectedSalary', parseFloat(appData.expectedSalary));
        if (appData.expectedSalaryCurrency) formData.append('expectedSalaryCurrency', appData.expectedSalaryCurrency);
        if (appData.noticePeriod) formData.append('noticePeriod', appData.noticePeriod);
        formData.append('willingToRelocate', appData.willingToRelocate || false);
        formData.append('remoteWorkPreference', appData.remoteWorkPreference || false);
        if (appData.portfolioUrl) formData.append('portfolioUrl', appData.portfolioUrl);
        if (appData.additionalNotes) formData.append('additionalNotes', appData.additionalNotes);
        if (resume) formData.append('resume', resume);
        // status is not part of submitApplication params, it's set by backend.
        // hrNotes, interviewDate are for updates by admin, not initial submission via this endpoint.
        return formData;
    };

    const handleCreateNew = async () => {
        if (!newApplication.jobId || !newApplication.fullName || !newApplication.email) {
            setError("Job ID, Full Name, and Email are required to create an application.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const token = localStorage.getItem('token');
            const formData = createApplicationFormData(newApplication, resumeFile);

            await axios.post(
                `${API_BASE_URL}/apply/${newApplication.jobId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data", ...(token && { 'Authorization': `Bearer ${token}` }) } }
            );
            await fetchApplications(currentPage, pageSize);
            await fetchStatistics();
            setNewApplication(initialNewApplicationState);
            setIsAddingNew(false);
            setResumeFile(null);
            setSuccess("Application created successfully!");
        } catch (err) {
            handleApiError(err, "Failed to create application");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => { // For editing
        if (!editApplication) return;
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        let updated = false;

        try {
            const token = localStorage.getItem('token');
            const originalApp = applications.find(app => app.id === editApplication.id) || {};

            // Update status if changed
            if (originalApp.status !== editApplication.status || (editApplication.hrNotes && originalApp.hrNotes !== editApplication.hrNotes)) {
                await axios.put(
                    `${API_BASE_URL}/${editApplication.id}/status`,
                    null, // Body is not used, params are query params
                    {
                        params: { status: editApplication.status, notes: editApplication.hrNotes || "" },
                        headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
                    }
                );
                updated = true;
            }

            // Schedule/update interview if changed
            // Ensure interviewDate is in ISO format if provided
            const formattedInterviewDate = editApplication.interviewDate
                ? new Date(editApplication.interviewDate).toISOString()
                : null;
            const originalFormattedInterviewDate = originalApp.interviewDate
                ? new Date(originalApp.interviewDate).toISOString()
                : null;

            if (formattedInterviewDate && formattedInterviewDate !== originalFormattedInterviewDate) {
                await axios.post(
                    `${API_BASE_URL}/${editApplication.id}/schedule-interview`,
                    null, // Body is not used, params are query params
                    {
                        params: { interviewDateTime: formattedInterviewDate, notes: editApplication.interviewSchedule || "" },
                        headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
                    }
                );
                updated = true;
            }

            if (updated) {
                await fetchApplications(currentPage, pageSize);
                await fetchStatistics();
                setEditApplication(null);
                setSuccess("Application updated successfully!");
            } else {
                setSuccess("No changes to save.");
                setEditApplication(null);
            }

        } catch (err) {
            handleApiError(err, "Failed to update application");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setError("Delete functionality is not available in the backend for applications.");
        // if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
        //     setIsLoading(true);
        //     setError(null);
        //     setSuccess(null);
        //     try {
        //         const token = localStorage.getItem('token');
        //         await axios.delete(`${API_BASE_URL}/${id}`, {
        //             headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
        //         });
        //         await fetchApplications(currentPage, pageSize);
        //         await fetchStatistics();
        //         setSuccess("Application deleted successfully!");
        //     } catch (err) {
        //         handleApiError(err, "Failed to delete application");
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }
    };

    const handleCancel = () => {
        setEditApplication(null);
        setIsAddingNew(false);
        setResumeFile(null);
        setError(null);
        setSuccess(null);
    };

    const handleInputChange = (e, isEditing) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        const targetState = isEditing ? editApplication : newApplication;
        const setState = isEditing ? setEditApplication : setNewApplication;

        setState({ ...targetState, [name]: finalValue });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setError("File size must be less than 10MB");
                return;
            }
            setResumeFile(file);
            setError(null);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };


    const applicationStatusOptions = [
        "pending", "reviewed", "shortlisted", "interviewed", "offered", "rejected", "withdrawn"
    ];

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Job Applications Management</PageTitle>
                <PageSubtitle>
                    Review and manage all submitted job applications.
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}
            {success && <SuccessBox>{success}</SuccessBox>}

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{stats?.totalApplications || totalCount || 0}</span></span>
                    </StatItem>
                    {stats?.applicationsByStatus && Object.entries(stats.applicationsByStatus).map(([status, count]) => (
                        <StatItem key={status}>
                            <span className="icon">🔸</span>
                            <span style={{textTransform: 'capitalize'}}>{status}: <span className="value">{count}</span></span>
                        </StatItem>
                    ))}
                </StatsContainer>
                <AddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New Application
                </AddButton>
            </ActionBar>

            {applications.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">📄</div>
                    <h3>No Applications Found</h3>
                    <p>There are no job applications to display at the moment.</p>
                </EmptyState>
            ) : (
                <>
                    <MobileJobsContainer>
                        {applications.map((app) => (
                            <MobileJobCard key={`mobile-${app.id}`}>
                                <MobileJobHeader>
                                    <MobileJobInfo>
                                        <MobileJobTitle>{app.fullName}</MobileJobTitle>
                                        <MobileJobCompany>for {app.jobTitle} at {app.companyName}</MobileJobCompany>
                                        <div style={{ fontSize: '11px', color: '#93C5FD', marginBottom: '6px' }}>{app.email}</div>
                                    </MobileJobInfo>
                                    <ApplicationStatusBadge $status={app.status}>
                                        {app.status}
                                    </ApplicationStatusBadge>
                                </MobileJobHeader>
                                <MobileJobDetails>
                                    <div>📅 Applied: {formatDate(app.appliedAt)}</div>
                                    <div>💼 Exp: {app.yearsOfExperience ?? 'N/A'} yrs</div>
                                    <div>
                                        📄 Resume: {app.resumeUrl ? <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
                                    </div>
                                    <div>
                                        🌐 Portfolio: {app.portfolioUrl ? <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer">Link</a> : "N/A"}
                                    </div>
                                </MobileJobDetails>
                                <MobileJobActions>
                                    <ActionButton $variant="view" onClick={() => handleViewOrEdit(app.id)} disabled={isLoading}>
                                        <span className="icon">👁️</span> View/Edit
                                    </ActionButton>
                                    <ActionButton $variant="delete" onClick={() => handleDelete(app.id)} disabled={isLoading}>
                                        <span className="icon">🗑️</span> Delete
                                    </ActionButton>
                                </MobileJobActions>
                            </MobileJobCard>
                        ))}
                    </MobileJobsContainer>

                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>Applicant</TableHeaderCell>
                                    <TableHeaderCell>Job Title</TableHeaderCell>
                                    <TableHeaderCell>Company</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Applied At</TableHeaderCell>
                                    <TableHeaderCell>Resume</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {applications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell>
                                            <div style={{ fontWeight: 'bold', color: '#FFF' }}>{app.fullName}</div>
                                            <div style={{ fontSize: '11px' }}>{app.email}</div>
                                        </TableCell>
                                        <TableCell>{app.jobTitle}</TableCell>
                                        <TableCell>{app.companyName}</TableCell>
                                        <TableCell>
                                            <ApplicationStatusBadge $status={app.status}>
                                                {app.status}
                                            </ApplicationStatusBadge>
                                        </TableCell>
                                        <TableCell>{formatDate(app.appliedAt)}</TableCell>
                                        <TableCell>
                                            {app.resumeUrl ? (
                                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                    View Resume
                                                </a>
                                            ) : (
                                                "Not Provided"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <ActionButton $variant="view" onClick={() => handleViewOrEdit(app.id)} disabled={isLoading} title="View/Edit Details">
                                                <span className="icon">👁️</span> View/Edit
                                            </ActionButton>
                                            <ActionButton $variant="delete" onClick={() => handleDelete(app.id)} disabled={isLoading} title="Delete Application (Currently Not Supported)">
                                                <span className="icon">🗑️</span> Delete
                                            </ActionButton>
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
                                    Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} applications
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
                                <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
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
                                <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1 || totalPages === 0}>
                                    Next →
                                </PageButton>
                            </PageButtons>
                        </PaginationContainer>
                    )}
                </>
            )}

            {isLoading && <LoadingOverlay>Loading applications...</LoadingOverlay>}

            {(editApplication || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New Application" : `Application: ${editApplication?.fullName || ''}`}
                        </ModalTitle>

                        {isAddingNew && (
                            <FormGroup>
                                <FormLabel>Job ID *</FormLabel>
                                <FormInput type="text" name="jobId" value={newApplication.jobId} onChange={(e) => handleInputChange(e, false)} placeholder="Enter Job ID application is for" required />
                            </FormGroup>
                        )}

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Full Name *</FormLabel>
                                <FormInput type="text" name="fullName" value={isAddingNew ? newApplication.fullName : editApplication.fullName} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's full name" required readOnly={!isAddingNew}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Email *</FormLabel>
                                <FormInput type="email" name="email" value={isAddingNew ? newApplication.email : editApplication.email} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's email" required readOnly={!isAddingNew}/>
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <FormLabel>Phone Number</FormLabel>
                                <FormInput type="tel" name="phoneNumber" value={isAddingNew ? newApplication.phoneNumber : editApplication.phoneNumber} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's phone" readOnly={!isAddingNew}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormInput type="number" name="yearsOfExperience" value={isAddingNew ? newApplication.yearsOfExperience : editApplication.yearsOfExperience} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="e.g., 5" readOnly={!isAddingNew}/>
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <FormLabel>Current Position</FormLabel>
                                <FormInput type="text" name="currentPosition" value={isAddingNew ? newApplication.currentPosition : editApplication.currentPosition} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's current role" readOnly={!isAddingNew}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Current Company</FormLabel>
                                <FormInput type="text" name="currentCompany" value={isAddingNew ? newApplication.currentCompany : editApplication.currentCompany} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's current company" readOnly={!isAddingNew}/>
                            </FormGroup>
                        </FormRow>
                        <FormGroup>
                            <FormLabel>Cover Letter</FormLabel>
                            <FormTextArea name="coverLetter" value={isAddingNew ? newApplication.coverLetter : editApplication.coverLetter} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Applicant's cover letter" readOnly={!isAddingNew}/>
                        </FormGroup>
                        <FormRow>
                            <FormGroup>
                                <FormLabel>Expected Salary</FormLabel>
                                <FormInput type="number" name="expectedSalary" value={isAddingNew ? newApplication.expectedSalary : editApplication.expectedSalary} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="e.g., 60000" readOnly={!isAddingNew}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Salary Currency</FormLabel>
                                <FormSelect name="expectedSalaryCurrency" value={isAddingNew ? newApplication.expectedSalaryCurrency : editApplication.expectedSalaryCurrency} onChange={(e) => handleInputChange(e, !isAddingNew)} disabled={!isAddingNew}>
                                    <option value="USD">USD</option> <option value="EUR">EUR</option> <option value="GBP">GBP</option> {/* Add more */}
                                </FormSelect>
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <FormLabel>Notice Period</FormLabel>
                                <FormInput type="text" name="noticePeriod" value={isAddingNew ? newApplication.noticePeriod : editApplication.noticePeriod} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="e.g., 1 month" readOnly={!isAddingNew}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Portfolio URL</FormLabel>
                                <FormInput type="url" name="portfolioUrl" value={isAddingNew ? newApplication.portfolioUrl : editApplication.portfolioUrl} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="https://portfolio.example.com" readOnly={!isAddingNew}/>
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input type="checkbox" name="willingToRelocate" checked={isAddingNew ? newApplication.willingToRelocate : editApplication.willingToRelocate} onChange={(e) => handleInputChange(e, !isAddingNew)} style={{ margin: 0 }} disabled={!isAddingNew}/>
                                    Willing to Relocate
                                </FormLabel>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input type="checkbox" name="remoteWorkPreference" checked={isAddingNew ? newApplication.remoteWorkPreference : editApplication.remoteWorkPreference} onChange={(e) => handleInputChange(e, !isAddingNew)} style={{ margin: 0 }} disabled={!isAddingNew}/>
                                    Remote Work Preference
                                </FormLabel>
                            </FormGroup>
                        </FormRow>
                        <FormGroup>
                            <FormLabel>Additional Notes from Applicant</FormLabel>
                            <FormTextArea name="additionalNotes" value={isAddingNew ? newApplication.additionalNotes : editApplication.additionalNotes} onChange={(e) => handleInputChange(e, !isAddingNew)} placeholder="Any additional info from applicant" readOnly={!isAddingNew}/>
                        </FormGroup>

                        {isAddingNew && (
                            <FormGroup>
                                <FormLabel>Resume/CV</FormLabel>
                                <FileUploadContainer>
                                    <FileInput type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                                    <FileUploadText>
                                        <span className="icon">📁</span>
                                        {resumeFile ? resumeFile.name : "Click to upload resume (PDF, DOC, DOCX)"}
                                        <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '3px' }}>Max 10MB</div>
                                    </FileUploadText>
                                </FileUploadContainer>
                            </FormGroup>
                        )}
                        {!isAddingNew && editApplication.resumeUrl && (
                            <FormGroup>
                                <FormLabel>Resume</FormLabel>
                                <a href={editApplication.resumeUrl} target="_blank" rel="noopener noreferrer" style={{color: '#93C5FD', textDecoration: 'underline'}}>View Uploaded Resume</a>
                            </FormGroup>
                        )}

                        {!isAddingNew && (
                            <>
                                <hr style={{borderColor: 'rgba(255,255,255,0.2)', margin: '20px 0'}} />
                                <h3 style={{color: '#FFF', fontSize: '16px', marginBottom: '10px'}}>Admin Actions</h3>
                                <FormRow>
                                    <FormGroup>
                                        <FormLabel>Application Status</FormLabel>
                                        <FormSelect name="status" value={editApplication.status} onChange={(e) => handleInputChange(e, true)}>
                                            {applicationStatusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                        </FormSelect>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Interview Date & Time</FormLabel>
                                        <FormInput type="datetime-local" name="interviewDate" value={editApplication.interviewDate} onChange={(e) => handleInputChange(e, true)} />
                                    </FormGroup>
                                </FormRow>
                                <FormGroup>
                                    <FormLabel>HR Notes / Interview Feedback</FormLabel>
                                    <FormTextArea name="hrNotes" value={editApplication.hrNotes || ""} onChange={(e) => handleInputChange(e, true)} placeholder="Internal notes for HR/recruiting team"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Interview Schedule Notes</FormLabel>
                                    <FormTextArea name="interviewSchedule" value={editApplication.interviewSchedule || ""} onChange={(e) => handleInputChange(e, true)} placeholder="e.g., Link to meeting, interviewer names"/>
                                </FormGroup>
                                <div style={{fontSize: '12px', color: '#c1ccdf', marginTop: '10px'}}>
                                    Applied At: {formatDateTime(editApplication.appliedAt)} <br />
                                    Last Status Update: {formatDateTime(editApplication.statusUpdatedAt)} by {editApplication.statusUpdatedBy || 'N/A'} <br />
                                    Source: {editApplication.applicationSource} (IP: {editApplication.ipAddress || 'N/A'})
                                </div>
                            </>
                        )}

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel} disabled={isLoading}>Cancel</CancelButton>
                            <SaveButton onClick={isAddingNew ? handleCreateNew : handleSave} disabled={isLoading}>
                                {isLoading ? "Saving..." : (isAddingNew ? "Create Application" : "Save Changes")}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminJobApplications;