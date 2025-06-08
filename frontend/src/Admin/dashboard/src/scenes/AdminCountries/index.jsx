import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
        content: '🌍';
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

const AddButton = styled.button`
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }

    .icon {
        font-size: 16px;
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

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: scale(1.005);
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

const CountryImage = styled.img`
    width: 50px;
    height: 35px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.4);
    }
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
    max-width: 500px;
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
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  min-height: 100px;
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

const ImagePreview = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;

  img {
    max-width: 150px;
    max-height: 100px;
    border-radius: 8px;
    margin-bottom: 8px;
  }

  div {
    color: #c1ccdf;
    font-size: 13px;
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

const AdminCountries = () => {
    const [countries, setCountries] = useState([]);
    const [editCountry, setEditCountry] = useState(null);
    const [newCountry, setNewCountry] = useState({
        name: "",
        description: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch Countries
    const fetchCountries = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/countries");
            setCountries(response.data);
            setTotalCount(response.data.length);
            setError(null);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setError("Failed to load countries. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    // Handle Edit
    const handleEdit = (country) => {
        setEditCountry({ ...country });
        setIsAddingNew(false);
    };

    // Handle Save
    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", editCountry.name);
            formData.append("description", editCountry.description || "");
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:8080/countries/${editCountry.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setCountries(countries.map((c) => (c.id === editCountry.id ? response.data : c)));
            setEditCountry(null);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating country:", error);
            setError("Failed to update country. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Add New
    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditCountry(null);
        setNewCountry({
            name: "",
            description: "",
        });
        setSelectedFile(null);
    };

    // Handle Create New
    const handleCreateNew = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", newCountry.name);
            formData.append("description", newCountry.description || "");
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.post(
                "http://localhost:8080/countries",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setCountries([...countries, response.data]);
            setNewCountry({
                name: "",
                description: "",
            });
            setIsAddingNew(false);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating country:", error);
            setError("Failed to create country. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this country?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:8080/countries/${id}`);
                setCountries(countries.filter((c) => c.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting country:", error);
                if (error.response && error.response.status === 400) {
                    setError("Cannot delete country because it has associated universities");
                } else {
                    setError("Failed to delete country. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle File Change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle Cancel
    const handleCancel = () => {
        setEditCountry(null);
        setIsAddingNew(false);
        setSelectedFile(null);
        setError(null);
    };

    // Handle Input Change
    const handleInputChange = (e, isEditing) => {
        const { name, value } = e.target;

        if (isEditing) {
            setEditCountry({
                ...editCountry,
                [name]: value,
            });
        } else {
            setNewCountry({
                ...newCountry,
                [name]: value,
            });
        }
    };

    // Calculate pagination values
    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedCountries = countries.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Countries Management</PageTitle>
                <PageSubtitle>
                    Manage countries and regions for your educational platform
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
                        <span className="icon">🎯</span>
                        <span>Active: <span className="value">{countries.filter(c => c.active !== false).length}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">🏫</span>
                        <span>With Universities: <span className="value">{countries.filter(c => c.universities > 0).length || countries.length}</span></span>
                    </StatItem>
                </StatsContainer>
                <AddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New Country
                </AddButton>
            </ActionBar>

            {countries.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">🌍</div>
                    <h3>No Countries Found</h3>
                    <p>Start by adding your first country to organize universities by region</p>
                </EmptyState>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>Country</TableHeaderCell>
                                    <TableHeaderCell>Description</TableHeaderCell>
                                    <TableHeaderCell>Flag</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {displayedCountries.map((country) => (
                                    <TableRow key={country.id}>
                                        <TableCell>
                                            <strong style={{ color: '#ffffff', fontSize: '15px' }}>
                                                {country.name}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            {country.description && country.description.length > 100
                                                ? `${country.description.substring(0, 100)}...`
                                                : country.description || "No description available"}
                                        </TableCell>
                                        <TableCell>
                                            {country.imageUrl ? (
                                                <CountryImage
                                                    src={country.imageUrl}
                                                    alt={`${country.name} flag`}
                                                />
                                            ) : (
                                                <div style={{
                                                    color: '#64748b',
                                                    fontStyle: 'italic',
                                                    fontSize: '13px'
                                                }}>
                                                    No flag
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <ActionButton
                                                    $variant="edit"
                                                    onClick={() => handleEdit(country)}
                                                >
                                                    <span className="icon">✏️</span>
                                                    Edit
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDelete(country.id)}
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

            {isLoading && <LoadingOverlay>Loading countries...</LoadingOverlay>}

            {(editCountry || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New Country" : "Edit Country"}
                        </ModalTitle>

                        <FormGroup>
                            <FormLabel>Country Name</FormLabel>
                            <FormInput
                                type="text"
                                name="name"
                                value={isAddingNew ? newCountry.name : editCountry.name}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter country name"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormTextArea
                                name="description"
                                value={
                                    isAddingNew
                                        ? newCountry.description
                                        : editCountry.description
                                }
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter country description or information about educational opportunities"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Country Flag Image</FormLabel>
                            <FormInput
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </FormGroup>

                        {(!isAddingNew && editCountry && editCountry.imageUrl) ? (
                            <ImagePreview>
                                <img
                                    src={editCountry.imageUrl}
                                    alt="Current flag"
                                />
                                <div>Current flag image</div>
                            </ImagePreview>
                        ) : selectedFile ? (
                            <ImagePreview>
                                <div>📎 New flag image selected: {selectedFile.name}</div>
                            </ImagePreview>
                        ) : null}

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel}>
                                Cancel
                            </CancelButton>
                            <SaveButton onClick={isAddingNew ? handleCreateNew : handleSave}>
                                {isAddingNew ? "Create Country" : "Save Changes"}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminCountries;