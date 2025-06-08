import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

// Modern Styled Components with Glassmorphism Design
const Container = styled.div`
  padding: 16px;
  background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
  min-height: 100vh;
  color: #ffffff;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const PageTitle = styled.h1`
  color: #ffffff;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 12px;

  &:before {
    content: '👥';
    font-size: 24px;
    -webkit-text-fill-color: initial;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const PageSubtitle = styled.p`
  color: #c1ccdf;
  margin-bottom: 16px;
  font-size: 14px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 14px 16px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #c1ccdf;
  font-size: 13px;
  font-weight: 500;

  .icon {
    font-size: 14px;
    opacity: 0.8;
  }

  .value {
    color: #ffffff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .icon {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 12px;
  }
`;

const TableContainer = styled.div`
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  overflow-x: auto;
  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;

  @media (max-width: 768px) {
    min-width: 1100px;
  }
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 11px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 14px 20px;
  color: #e2e8f0;
  font-size: 13px;
  vertical-align: middle;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 12px;
    max-width: 120px;
  }
`;

const RoleBadge = styled.span`
  background: ${props => props.$isAdmin ?
    'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' :
    'linear-gradient(135deg, #10B981 0%, #059669 100%)'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  margin-right: 4px;
  display: inline-block;
  margin-bottom: 2px;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .icon {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 10px;
    margin-bottom: 4px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 14px 16px;
  }
`;

const PageSizeSelector = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  padding: 6px 10px;
  font-size: 13px;
  margin-left: 8px;

  option {
    background: #1a1d4a;
    color: #ffffff;
  }
`;

const PageButtons = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
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
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
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
  z-index: 3000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    max-width: calc(100vw - 20px);
  }
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  color: #c1ccdf;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  min-height: 80px;
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
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3B82F6;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: #c1ccdf;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #c1ccdf;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorBox = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 20px;
  color: #FCA5A5;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 13px;

  &:before {
    content: '⚠️';
    font-size: 16px;
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
  z-index: 2999;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;

  &:before {
    content: '⏳';
    font-size: 28px;
    margin-right: 10px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 30px;
  color: #c1ccdf;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
  backdrop-filter: blur(20px);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;

  .icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  h3 {
    margin: 0 0 10px;
    color: #ffffff;
    font-size: 16px;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    
    .icon {
      font-size: 32px;
    }
    
    h3 {
      font-size: 14px;
    }
    
    p {
      font-size: 12px;
    }
  }
`;

const Users = () => {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        address: '',
        nationality: '',
        gender: '',
        bio: '',
        roles: ['USER']
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch user data
    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please login.");
                return;
            }

            const response = await axios.get("http://localhost:8080/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Ensure userData is always an array
            const users = Array.isArray(response.data) ? response.data : [];
            setUserData(users);
            setTotalCount(users.length);
            setError(null);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData([]);
            setTotalCount(0);

            if (error.response?.status === 403) {
                setError("You don't have permission to view users. Admin access required.");
            } else if (error.response?.status === 401) {
                setError("Your session has expired. Please login again.");
            } else {
                setError(error.response?.data?.message || error.message || "Failed to fetch users");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                id: selectedUser.id || '',
                name: selectedUser.name || '',
                surname: selectedUser.surname || '',
                email: selectedUser.email || '',
                phoneNumber: selectedUser.phoneNumber || '',
                address: selectedUser.address || '',
                nationality: selectedUser.nationality || '',
                gender: selectedUser.gender || '',
                bio: selectedUser.bio || '',
                roles: selectedUser.roles || ['USER']
            });
            setIsAdmin(selectedUser.roles?.includes('ADMIN') || false);
        }
    }, [selectedUser]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
        setFormData({
            id: '',
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            address: '',
            nationality: '',
            gender: '',
            bio: '',
            roles: ['USER']
        });
        setIsAdmin(false);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (e) => {
        const checked = e.target.checked;
        setIsAdmin(checked);
        let newRoles = ['USER'];
        if (checked) {
            newRoles.push('ADMIN');
        }
        setFormData(prev => ({
            ...prev,
            roles: newRoles
        }));
    };

    const handleSubmit = async () => {
        if (!formData.id) {
            setError("User ID is required.");
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please login.");
                return;
            }

            await axios.put(`http://localhost:8080/users/${formData.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            await fetchUserData();
            handleClose();
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Update failed: " + (error.response?.data?.message || "Something went wrong"));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pageCount) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        if (!isNaN(newSize) && newSize > 0) {
            setPageSize(newSize);
            setCurrentPage(0);
        }
    };

    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedUsers = userData.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const adminCount = userData.filter(user =>
        Array.isArray(user.roles) && user.roles.includes('ADMIN')
    ).length;

    const userCount = userData.filter(user =>
        Array.isArray(user.roles) && user.roles.includes('USER') && !user.roles.includes('ADMIN')
    ).length;

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Users Management</PageTitle>
                <PageSubtitle>
                    Manage users and their roles across the system
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{totalCount}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">👑</span>
                        <span>Admins: <span className="value">{adminCount}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">👤</span>
                        <span>Users: <span className="value">{userCount}</span></span>
                    </StatItem>
                </StatsContainer>
                <RefreshButton onClick={fetchUserData} disabled={isLoading}>
                    <span className="icon">🔄</span>
                    {isLoading ? 'Loading...' : 'Refresh Data'}
                </RefreshButton>
            </ActionBar>

            {userData.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">👥</div>
                    <h3>No Users Found</h3>
                    <p>No users available in the system</p>
                </EmptyState>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>ID</TableHeaderCell>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell>Phone</TableHeaderCell>
                                    <TableHeaderCell>Nationality</TableHeaderCell>
                                    <TableHeaderCell>Roles</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {displayedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>
                                            <strong style={{ color: '#ffffff', fontSize: '14px' }}>
                                                {user.name} {user.surname}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ color: '#60A5FA' }}>
                                                {user.email}
                                            </span>
                                        </TableCell>
                                        <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                                        <TableCell>{user.nationality || 'N/A'}</TableCell>
                                        <TableCell>
                                            {Array.isArray(user.roles) ? user.roles.map((role, index) => (
                                                <RoleBadge key={index} $isAdmin={role === 'ADMIN'}>
                                                    {role}
                                                </RoleBadge>
                                            )) : (
                                                <RoleBadge $isAdmin={false}>USER</RoleBadge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <ActionButton
                                                onClick={() => handleEdit(user)}
                                                disabled={isLoading}
                                            >
                                                <span className="icon">✏️</span>
                                                Edit
                                            </ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <PaginationContainer>
                        <div style={{ color: '#c1ccdf', fontSize: '13px' }}>
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

            {isLoading && <LoadingOverlay>Loading users...</LoadingOverlay>}

            {open && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>Edit User</ModalTitle>

                        <FormGrid>
                            <FormGroup>
                                <FormLabel>ID</FormLabel>
                                <FormInput
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Surname</FormLabel>
                                <FormInput
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Phone Number</FormLabel>
                                <FormInput
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Address</FormLabel>
                                <FormInput
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter address"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Nationality</FormLabel>
                                <FormInput
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleInputChange}
                                    placeholder="Enter nationality"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormInput
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    placeholder="Enter gender"
                                />
                            </FormGroup>
                        </FormGrid>

                        <FormGroup>
                            <FormLabel>Bio</FormLabel>
                            <FormTextArea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Enter user bio"
                                rows="3"
                            />
                        </FormGroup>

                        <CheckboxContainer>
                            <Checkbox
                                type="checkbox"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={handleRoleChange}
                            />
                            <CheckboxLabel htmlFor="isAdmin">
                                Grant Admin Privileges
                            </CheckboxLabel>
                        </CheckboxContainer>

                        <ButtonGroup>
                            <CancelButton
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </CancelButton>
                            <SaveButton
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default Users;