import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../../components/index.jsx";

// Modern Styled Components with Glassmorphism Design
const Container = styled.div`
    padding: 24px;
    background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
    min-height: 100vh;
    color: #ffffff;
`;

const HeaderSection = styled.div`
    margin-bottom: 32px;
`;

const PageTitle = styled.h1`
    color: #ffffff;
    margin-bottom: 8px;
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
        content: '📋';
        font-size: 28px;
        -webkit-text-fill-color: initial;
    }
`;

const PageSubtitle = styled.p`
    color: #c1ccdf;
    margin-bottom: 16px;
    font-size: 16px;
    opacity: 0.9;
`;

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #c1ccdf;
    font-size: 14px;
    font-weight: 500;

    .icon {
        font-size: 16px;
        opacity: 0.8;
    }

    .value {
        color: #ffffff;
        font-weight: 700;
    }
`;

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 200px;
`;

const FilterLabel = styled.label`
    color: #c1ccdf;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FilterSelect = styled.select`
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const TableContainer = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 24px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const TableHeaderCell = styled.th`
    padding: 20px 24px;
    text-align: left;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: scale(1.001);
    }

    &:last-child {
        border-bottom: none;
    }
`;

const TableCell = styled.td`
    padding: 18px 24px;
    color: #e2e8f0;
    font-size: 14px;
    vertical-align: middle;
`;

const ActionButton = styled.button`
    background: ${props => props.$variant === 'edit' ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 8px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .icon {
        font-size: 14px;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
`;

const PageSizeSelector = styled.select`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: #ffffff;
    padding: 8px 12px;
    font-size: 14px;
    margin-left: 8px;

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const PageButtons = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const PageButton = styled.button`
    background: ${props => props.$active ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'rgba(255, 255, 255, 0.1)'};
    border: 1px solid ${props => props.$active ?
            'rgba(59, 130, 246, 0.5)' :
            'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.$active ? '#ffffff' : '#c1ccdf'};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

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
    align-items: center;
    z-index: 1000;
    padding: 20px;
`;

const ModalContent = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 32px;
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const FormLabel = styled.label`
    display: block;
    color: #c1ccdf;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
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

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: rgba(255, 255, 255, 0.05);
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`;

const CancelButton = styled.button`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #c1ccdf;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }
`;

const SaveButton = styled.button`
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
`;

const ErrorBox = styled.div`
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 24px;
    color: #FCA5A5;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;

    &:before {
        content: '⚠️';
        font-size: 18px;
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
    justify-content: center;
    align-items: center;
    z-index: 999;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;

    &:before {
        content: '⏳';
        font-size: 32px;
        margin-right: 12px;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 60px 40px;
    color: #c1ccdf;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
    backdrop-filter: blur(20px);
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 16px;

    .icon {
        font-size: 48px;
        margin-bottom: 20px;
        opacity: 0.6;
    }

    h3 {
        margin: 0 0 12px;
        color: #ffffff;
        font-size: 18px;
    }

    p {
        margin: 0;
        opacity: 0.8;
    }
`;

const ApplicationInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ApplicationName = styled.div`
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
`;

const ApplicationDetails = styled.div`
    color: #c1ccdf;
    font-size: 12px;
    opacity: 0.8;
`;

const StatusBadge = styled.span`
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;
    background: ${props => {
        switch (props.status) {
            case 'approved': return 'rgba(16, 185, 129, 0.2)';
            case 'rejected': return 'rgba(239, 68, 68, 0.2)';
            default: return 'rgba(251, 191, 36, 0.2)';
        }
    }};
    color: ${props => {
        switch (props.status) {
            case 'approved': return '#10B981';
            case 'rejected': return '#EF4444';
            default: return '#F59E0B';
        }
    }};
    border: 1px solid ${props => {
        switch (props.status) {
            case 'approved': return 'rgba(16, 185, 129, 0.3)';
            case 'rejected': return 'rgba(239, 68, 68, 0.3)';
            default: return 'rgba(251, 191, 36, 0.3)';
        }
    }};
`;

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AdminForm = () => {
    const [applications, setApplications] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [statusFilter, setStatusFilter] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [appsResponse, unisResponse, facsResponse, fieldsResponse] = await Promise.all([
                axios.get("http://localhost:8080/applications"),
                axios.get("http://localhost:8080/universities"),
                axios.get("http://localhost:8080/faculties"),
                axios.get("http://localhost:8080/fields"),
            ]);

            setApplications(appsResponse.data || []);
            setUniversities(unisResponse.data || []);
            setFaculties(facsResponse.data || []);
            setFields(fieldsResponse.data || []);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data from server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (application) => {
        setSelectedApplication({ ...application });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:8080/applications/${selectedApplication.id}`,
                selectedApplication,
                { headers: { "Content-Type": "application/json" } }
            );
            setApplications(
                applications.map((app) =>
                    app.id === selectedApplication.id ? response.data : app
                )
            );
            setSelectedApplication(null);
            setError(null);
        } catch (error) {
            console.error("Error updating application:", error);
            setError("Failed to update application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:8080/applications/${id}`);
                setApplications(applications.filter((app) => app.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting application:", error);
                setError("Failed to delete application. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setSelectedApplication(null);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedApplication((prev) => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const getUniversityName = (id) => {
        const university = universities.find((u) => u.id === id);
        return university ? university.name : "Unknown";
    };

    const getFacultyName = (id) => {
        const faculty = faculties.find((f) => f.id === id);
        return faculty ? faculty.name : "Unknown";
    };

    const getFieldName = (id) => {
        const field = fields.find((f) => f.id === id);
        return field ? field.name : "Unknown";
    };

    // Filter applications by status
    const filteredApplications = statusFilter
        ? applications.filter(app => (app.status || 'pending') === statusFilter)
        : applications;

    // Calculate stats
    const pendingApplications = applications.filter(app => app.status === 'pending' || !app.status).length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

    // Pagination
    const pageCount = Math.ceil(filteredApplications.length / pageSize);
    const displayedApplications = filteredApplications.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Applications Management</PageTitle>
                <PageSubtitle>
                    Review and manage student applications for universities and programs
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{applications.length}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">⏳</span>
                        <span>Pending: <span className="value">{pendingApplications}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">✅</span>
                        <span>Approved: <span className="value">{approvedApplications}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">❌</span>
                        <span>Rejected: <span className="value">{rejectedApplications}</span></span>
                    </StatItem>
                </StatsContainer>
            </ActionBar>

            <FilterContainer>
                <FilterGroup>
                    <FilterLabel>Filter by Status:</FilterLabel>
                    <FilterSelect
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(0);
                        }}
                    >
                        <option value="">All Applications</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </FilterSelect>
                </FilterGroup>
            </FilterContainer>

            {filteredApplications.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">📋</div>
                    <h3>No Applications Found</h3>
                    <p>Student applications will appear here once they start applying</p>
                </EmptyState>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>Applicant</TableHeaderCell>
                                    <TableHeaderCell>University</TableHeaderCell>
                                    <TableHeaderCell>Faculty</TableHeaderCell>
                                    <TableHeaderCell>Field</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {displayedApplications.map((app) => (
                                    <TableRow key={app.id} onClick={() => handleEdit(app)}>
                                        <TableCell>
                                            <ApplicationInfo>
                                                <ApplicationName>
                                                    {app.name} {app.surname}
                                                </ApplicationName>
                                                <ApplicationDetails>
                                                    ID: {app.uniqueId} • {app.applicationCountry}
                                                </ApplicationDetails>
                                            </ApplicationInfo>
                                        </TableCell>
                                        <TableCell>{getUniversityName(app.chosenUniversity)}</TableCell>
                                        <TableCell>{getFacultyName(app.chosenFaculty)}</TableCell>
                                        <TableCell>{getFieldName(app.chosenField)}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={app.status || 'pending'}>
                                                {app.status || 'pending'}
                                            </StatusBadge>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <ActionButton
                                                    $variant="edit"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(app);
                                                    }}
                                                >
                                                    <EditIcon /> Edit
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(app.id);
                                                    }}
                                                >
                                                    <DeleteIcon /> Delete
                                                </ActionButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <PaginationContainer>
                        <div style={{ color: '#c1ccdf' }}>
                            <span>Items per page:</span>
                            <PageSizeSelector value={pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </PageSizeSelector>
                        </div>
                        <PageButtons>
                            <PageButton
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                ← Previous
                            </PageButton>
                            {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                                let pageNum = i;
                                if (pageCount > 5) {
                                    if (currentPage > 1 && currentPage < pageCount - 2) {
                                        pageNum = currentPage - 2 + i;
                                    } else if (currentPage >= pageCount - 2) {
                                        pageNum = pageCount - 5 + i;
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
                                disabled={currentPage === pageCount - 1 || pageCount === 0}
                            >
                                Next →
                            </PageButton>
                        </PageButtons>
                    </PaginationContainer>
                </>
            )}

            {isLoading && <LoadingOverlay>Loading applications...</LoadingOverlay>}

            {selectedApplication && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>Application Details</ModalTitle>

                        <FormGrid>
                            <FormGroup>
                                <FormLabel>Full Name</FormLabel>
                                <FormInput
                                    type="text"
                                    value={`${selectedApplication.name || ''} ${selectedApplication.surname || ''}`}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Middle Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="middleName"
                                    value={selectedApplication.middleName || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter middle name"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormInput
                                    type="date"
                                    name="dateOfBirth"
                                    value={selectedApplication.dateOfBirth || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Unique ID</FormLabel>
                                <FormInput
                                    type="text"
                                    name="uniqueId"
                                    value={selectedApplication.uniqueId || ""}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormSelect
                                    name="gender"
                                    value={selectedApplication.gender || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Application Status</FormLabel>
                                <FormSelect
                                    name="status"
                                    value={selectedApplication.status || 'pending'}
                                    onChange={handleInputChange}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>University</FormLabel>
                                <FormSelect
                                    name="chosenUniversity"
                                    value={selectedApplication.chosenUniversity || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select University</option>
                                    {universities.map((uni) => (
                                        <option key={uni.id} value={uni.id}>
                                            {uni.name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Faculty</FormLabel>
                                <FormSelect
                                    name="chosenFaculty"
                                    value={selectedApplication.chosenFaculty || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Faculty</option>
                                    {faculties.map((fac) => (
                                        <option key={fac.id} value={fac.id}>
                                            {fac.name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Field</FormLabel>
                                <FormSelect
                                    name="chosenField"
                                    value={selectedApplication.chosenField || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Field</option>
                                    {fields.map((field) => (
                                        <option key={field.id} value={field.id}>
                                            {field.name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Contact Information</FormLabel>
                                <FormInput
                                    type="text"
                                    name="contactInfo"
                                    value={selectedApplication.contactInfo || ""}
                                    onChange={handleInputChange}
                                    placeholder="Phone, email, etc."
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Application Country</FormLabel>
                                <FormInput
                                    type="text"
                                    name="applicationCountry"
                                    value={selectedApplication.applicationCountry || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter application country"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Nationality</FormLabel>
                                <FormInput
                                    type="text"
                                    name="nationality"
                                    value={selectedApplication.nationality || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter nationality"
                                />
                            </FormGroup>
                        </FormGrid>

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel}>
                                Cancel
                            </CancelButton>
                            <SaveButton onClick={handleSave}>
                                Save Changes
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminForm;