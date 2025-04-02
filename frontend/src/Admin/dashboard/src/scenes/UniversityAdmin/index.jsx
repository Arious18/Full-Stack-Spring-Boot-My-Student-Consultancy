import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Header} from "../../components/index.jsx";

// Styled Components
const Container = styled.div`
    margin: 20px;
`;

const FlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`;

const ActionButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
`;

const AddButton = styled(ActionButton)`
    background-color: #4cceac;

    &:hover {
        background-color: #3dbb9a;
    }
`;

const EditButton = styled(ActionButton)`
    background-color: #6870fa;

    &:hover {
        background-color: #535ac8;
    }
`;

const DeleteButton = styled(ActionButton)`
    background-color: #db4f4a;

    &:hover {
        background-color: #c04440;
    }
`;

const CancelButton = styled(ActionButton)`
    background-color: #777;

    &:hover {
        background-color: #666;
    }
`;

const SaveButton = styled(ActionButton)`
    background-color: #4cceac;

    &:hover {
        background-color: #3dbb9a;
    }
`;

const ErrorBox = styled.div`
    background-color: #db4f4a;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    color: white;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #1F2A40;
    color: white;
    border-radius: 4px;
    overflow: hidden;
`;

const TableHeader = styled.thead`
    background-color: #3e4396;
`;

const TableHeaderCell = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #2d3748;
`;

const TableBody = styled.tbody`
    background-color: #1F2A40;
`;

const TableRow = styled.tr`
    &:hover {
        background-color: #293145;
    }
`;

const TableCell = styled.td`
    padding: 12px 16px;
    border-bottom: 1px solid #2d3748;
`;

const PriceText = styled.span`
    color: #4cceac;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #1F2A40;
    border-radius: 8px;
    padding: 24px;
    width: 500px;
    border: 2px solid #2d3748;
    color: white;
`;

const ModalTitle = styled.h4`
    margin-bottom: 16px;
    font-size: 24px;
`;

const FormGroup = styled.div`
    margin-bottom: 16px;
`;

const FormLabel = styled.h6`
    margin-bottom: 8px;
    font-size: 16px;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 10px;
    background-color: #2d3748;
    border: 1px solid #4a5568;
    border-radius: 4px;
    color: white;
    box-sizing: border-box;
`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    background-color: #2d3748;
    border: 1px solid #4a5568;
    border-radius: 4px;
    color: white;
    min-height: 100px;
    resize: vertical;
    box-sizing: border-box;
`;

const ImagePreview = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: #2d3748;
    border-radius: 4px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
`;

const UploadBox = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #3e4396;
`;

const PageSizeSelector = styled.select`
    padding: 8px;
    border-radius: 4px;
    background-color: #2d3748;
    color: white;
    border: 1px solid #4a5568;
`;

const PageButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    border-radius: 4px;
    background-color: ${props => props.active ? '#4cceac' : '#2d3748'};
    border: 1px solid ${props => props.active ? '#3dbb9a' : '#4a5568'};
    color: white;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// SVG Icons as components
const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AddIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AdminUniversities = () => {
    const [universities, setUniversities] = useState([]);
    const [editUniversity, setEditUniversity] = useState(null);
    const [newUniversity, setNewUniversity] = useState({
        name: "",
        description: "",
        about: "",
        yearlyPrice: 0,
        countryId: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const fetchUniversities = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://deneme5-g63n.onrender.com/universities");
            setUniversities(response.data);
            setTotalCount(response.data.length);
            setError(null);
        } catch (error) {
            console.error("Error fetching universities:", error);
            setError("Failed to load universities. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleEdit = (university) => {
        setEditUniversity({...university});
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", editUniversity.name);
            formData.append("description", editUniversity.description);
            formData.append("about", editUniversity.about || "");
            formData.append("yearlyPrice", editUniversity.yearlyPrice);
            formData.append("countryId", editUniversity.countryId); // Append countryId

            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.put(
                `https://deneme5-g63n.onrender.com/universities/${editUniversity.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUniversities(
                universities.map((u) => (u.id === editUniversity.id ? response.data : u))
            );
            setEditUniversity(null);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating university:", error);
            setError("Failed to update university. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditUniversity(null);
        setNewUniversity({
            name: "",
            description: "",
            about: "",
            yearlyPrice: 0,
        });
        setSelectedFile(null);
    };

    const handleCreateNew = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", newUniversity.name);
            formData.append("description", newUniversity.description);
            formData.append("about", newUniversity.about || "");
            formData.append("yearlyPrice", newUniversity.yearlyPrice);
            formData.append("countryId", newUniversity.countryId); // Append countryId

            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.post(
                "https://deneme5-g63n.onrender.com/universities",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUniversities([...universities, response.data]);
            setNewUniversity({
                name: "",
                description: "",
                about: "",
                yearlyPrice: 0,
                countryId: "",

            });
            setIsAddingNew(false);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating university:", error);
            setError("Failed to create university. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this university?")) {
            setIsLoading(true);
            try {
                await axios.delete(`https://deneme5-g63n.onrender.com/universities/${id}`);
                setUniversities(universities.filter((u) => u.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting university:", error);
                setError("Failed to delete university. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        setEditUniversity(null);
        setIsAddingNew(false);
        setSelectedFile(null);
        setError(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0); // Reset to first page when changing page size
    };

    const handleInputChange = (e, isEditing) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === "yearlyPrice") {
            parsedValue = parseFloat(value);
        }
        console.log("Updating Field:", name, parsedValue); // Debugging line

        if (isEditing) {
            setEditUniversity({
                ...editUniversity,
                [name]: parsedValue,
            });
        } else {
            setNewUniversity({
                ...newUniversity,
                [name]: parsedValue,
            });
        }
    };

    // Inside AdminUniversities component
    const [countries, setCountries] = useState([]);

// Fetch Countries
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://deneme5-g63n.onrender.com/countries");
            setCountries(response.data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

// Calculate pagination values
    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedUniversities = universities.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    return (
        <>
            <Header />
            <Container>
                <h2>Universities Management</h2>

                {error && <ErrorBox>{error}</ErrorBox>}

                <FlexEnd>
                    <AddButton onClick={handleAddNew}>
                        <AddIcon /> Add New University
                    </AddButton>
                </FlexEnd>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Yearly Price</TableHeaderCell>
                            <TableHeaderCell>Country</TableHeaderCell> {/* New Column */}
                            <TableHeaderCell>Image</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {displayedUniversities.map((university) => {
                            const country = countries.find((c) => c.id === university.countryId);
                            return (
                                <TableRow key={university.id}>
                                    <TableCell>{university.name}</TableCell>
                                    <TableCell>
                                        {university.description && university.description.length > 100
                                            ? `${university.description.substring(0, 100)}...`
                                            : university.description}
                                    </TableCell>
                                    <TableCell>
                                        <PriceText>${university.yearlyPrice.toLocaleString()}</PriceText>
                                    </TableCell>
                                    <TableCell>{country ? country.name : "N/A"}</TableCell> {/* Country Name */}
                                    <TableCell>
                                        {university.imageUrl && (
                                            <img
                                                src={university.imageUrl}
                                                alt={university.name}
                                                style={{ height: "40px", width: "auto" }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <EditButton onClick={() => handleEdit(university)}>
                                                <EditIcon /> Edit
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDelete(university.id)}>
                                                <DeleteIcon /> Delete
                                            </DeleteButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Pagination>
                    <div>
                        <span>Items per page: </span>
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
                            Previous
                        </PageButton>
                        {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                            // Show at most 5 page buttons
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
                                    active={pageNum === currentPage}
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
                            Next
                        </PageButton>
                    </PageButtons>
                </Pagination>

                {isLoading && (
                    <LoadingOverlay>
                        <div>Loading...</div>
                    </LoadingOverlay>
                )}

                {(editUniversity || isAddingNew) && (
                    <ModalOverlay>
                        <ModalContent>
                            <ModalTitle>
                                {isAddingNew ? "Add New University" : "Edit University"}
                            </ModalTitle>

                            <FormGroup>
                                <FormLabel>University Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={isAddingNew ? newUniversity.name : editUniversity.name}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter university name"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormTextArea
                                    name="description"
                                    value={
                                        isAddingNew
                                            ? newUniversity.description
                                            : editUniversity.description
                                    }
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter description"
                                />
                            </FormGroup>


                            <FormGroup>
                                <FormLabel>Country</FormLabel>
                                <FormInput
                                    as="select"
                                    name="countryId"
                                    value={isAddingNew ? newUniversity.countryId : editUniversity?.countryId}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </FormInput>
                            </FormGroup>




                            <FormGroup>
                                <FormLabel>Yearly Price ($)</FormLabel>
                                <FormInput
                                    type="number"
                                    name="yearlyPrice"
                                    value={
                                        isAddingNew
                                            ? newUniversity.yearlyPrice
                                            : editUniversity.yearlyPrice
                                    }
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter yearly price"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Image</FormLabel>
                                <FormInput type="file" onChange={handleFileChange} />
                            </FormGroup>

                            {(!isAddingNew && editUniversity && editUniversity.imageUrl) ? (
                                <ImagePreview>
                                    <img
                                        src={editUniversity.imageUrl}
                                        alt="Preview"
                                        style={{ height: "100px", width: "auto" }}
                                    />
                                    <div>Current image</div>
                                </ImagePreview>
                            ) : selectedFile ? (
                                <ImagePreview>
                                    <div>New image selected: {selectedFile.name}</div>
                                </ImagePreview>
                            ) : null}

                            <ButtonGroup>
                                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                                <SaveButton
                                    onClick={isAddingNew ? handleCreateNew : handleSave}
                                >
                                    {isAddingNew ? "Create" : "Save Changes"}
                                </SaveButton>
                            </ButtonGroup>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Container>
        </>
    );
};

export default AdminUniversities;