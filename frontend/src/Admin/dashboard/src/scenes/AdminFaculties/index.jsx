import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../../components/index.jsx";

// Styled Components (unchanged except for new additions)
const Container = styled.div`margin: 20px;`;
const FlexEnd = styled.div`display: flex; justify-content: flex-end; margin-bottom: 20px;`;
const ActionButton = styled.button`padding: 8px 16px; border-radius: 4px; border: none; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 14px;`;
const AddButton = styled(ActionButton)`background-color: #4cceac; &:hover { background-color: #3dbb9a; }`;
const EditButton = styled(ActionButton)`background-color: #6870fa; &:hover { background-color: #535ac8; }`;
const DeleteButton = styled(ActionButton)`background-color: #db4f4a; &:hover { background-color: #c04440; }`;
const CancelButton = styled(ActionButton)`background-color: #777; &:hover { background-color: #666; }`;
const SaveButton = styled(ActionButton)`background-color: #4cceac; &:hover { background-color: #3dbb9a; }`;
const ErrorBox = styled.div`background-color: #db4f4a; padding: 10px; margin-bottom: 20px; border-radius: 4px; color: white;`;
const Table = styled.table`width: 100%; border-collapse: collapse; background-color: #1F2A40; color: white; border-radius: 4px; overflow: hidden;`;
const TableHeader = styled.thead`background-color: #3e4396;`;
const TableHeaderCell = styled.th`padding: 12px 16px; text-align: left; font-weight: 600; border-bottom: 1px solid #2d3748;`;
const TableBody = styled.tbody`background-color: #1F2A40;`;
const TableRow = styled.tr`&:hover { background-color: #293145; }`;
const TableCell = styled.td`padding: 12px 16px; border-bottom: 1px solid #2d3748;`;
const PriceText = styled.span`color: #4cceac;`;
const ModalOverlay = styled.div`position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
const ModalContent = styled.div`background-color: #1F2A40; border-radius: 8px; padding: 24px; width: 500px; border: 2px solid #2d3748; color: white;`;
const ModalTitle = styled.h4`margin-bottom: 16px; font-size: 24px;`;
const FormGroup = styled.div`margin-bottom: 16px;`;
const FormLabel = styled.h6`margin-bottom: 8px; font-size: 16px;`;
const FormInput = styled.input`width: 100%; padding: 10px; background-color: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: white; box-sizing: border-box;`;
const FormTextArea = styled.textarea`width: 100%; padding: 10px; background-color: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: white; min-height: 100px; resize: vertical; box-sizing: border-box;`;
const FormSelect = styled.select`width: 100%; padding: 10px; background-color: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: white; box-sizing: border-box;`;
const ImagePreview = styled.div`display: flex; align-items: center; gap: 16px; margin-bottom: 16px; padding: 16px; background-color: #2d3748; border-radius: 4px;`;
const ButtonGroup = styled.div`display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px;`;
const LoadingOverlay = styled.div`position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
const Pagination = styled.div`display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: #3e4396;`;
const PageSizeSelector = styled.select`padding: 8px; border-radius: 4px; background-color: #2d3748; color: white; border: 1px solid #4a5568;`;
const PageButtons = styled.div`display: flex; gap: 8px;`;
const PageButton = styled.button`padding: 8px 12px; border-radius: 4px; background-color: ${props => props.active ? '#4cceac' : '#2d3748'}; border: 1px solid ${props => props.active ? '#3dbb9a' : '#4a5568'}; color: white; cursor: pointer; &:disabled { opacity: 0.5; cursor: not-allowed; }`;
const FilterContainer = styled.div`margin-bottom: 20px; display: flex; gap: 16px; align-items: center;`;
const FilterLabel = styled.label`color: white; font-weight: 500;`;

// SVG Icons (unchanged)
const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const AddIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AdminFaculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [selectedUniversityId, setSelectedUniversityId] = useState(""); // New state for filtering
    const [formFaculty, setFormFaculty] = useState(null);
    const [newFaculty, setNewFaculty] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        universityId: "",
        languages: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const universitiesResponse = await axios.get("http://localhost:8080/universities");
            let facultiesResponse;
            if (selectedUniversityId) {
                facultiesResponse = await axios.get(`http://localhost:8080/faculties/university/${selectedUniversityId}`);
            } else {
                facultiesResponse = await axios.get("http://localhost:8080/faculties");
            }
            setFaculties(facultiesResponse.data);
            setUniversities(universitiesResponse.data);
            setTotalCount(facultiesResponse.data.length);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load faculties or universities. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedUniversityId]); // Refetch when university filter changes

    const handleEdit = (faculty) => {
        setFormFaculty({
            ...faculty,
            languages: faculty.languages ? JSON.stringify(faculty.languages) : "",
        });
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        if (!formFaculty.universityId) {
            setError("Please select a university.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", formFaculty.name);
            formData.append("description", formFaculty.description);
            formData.append("price", formFaculty.price);
            formData.append("discountPrice", formFaculty.discountPrice || 0);
            formData.append("universityId", formFaculty.universityId);
            formData.append("languages", formFaculty.languages || "{}");
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:8080/faculties/${formFaculty.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setFaculties(faculties.map((f) => (f.id === formFaculty.id ? response.data : f)));
            setFormFaculty(null);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating faculty:", error);
            setError("Failed to update faculty. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setFormFaculty(null);
        setNewFaculty({
            name: "",
            description: "",
            price: 0,
            discountPrice: 0,
            universityId: selectedUniversityId || "", // Preselect if filtered
            languages: "",
        });
        setSelectedFile(null);
    };

    const handleCreateNew = async () => {
        if (!newFaculty.universityId) {
            setError("Please select a university.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", newFaculty.name);
            formData.append("description", newFaculty.description);
            formData.append("price", newFaculty.price);
            formData.append("discountPrice", newFaculty.discountPrice || 0);
            formData.append("universityId", newFaculty.universityId);
            formData.append("languages", newFaculty.languages || "{}");
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.post(
                "http://localhost:8080/faculties",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setFaculties([...faculties, response.data]);
            setNewFaculty({
                name: "",
                description: "",
                price: 0,
                discountPrice: 0,
                universityId: "",
                languages: "",
            });
            setIsAddingNew(false);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating faculty:", error);
            setError("Failed to create faculty. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this faculty?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:8080/faculties/${id}`);
                setFaculties(faculties.filter((f) => f.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting faculty:", error);
                setError("Failed to delete faculty. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        setFormFaculty(null);
        setIsAddingNew(false);
        setSelectedFile(null);
        setError(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handleInputChange = (e, isEditing) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === "price" || name === "discountPrice") {
            parsedValue = parseFloat(value) || 0;
        }

        if (isEditing) {
            setFormFaculty({ ...formFaculty, [name]: parsedValue });
        } else {
            setNewFaculty({ ...newFaculty, [name]: parsedValue });
        }
    };

    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedFaculties = faculties.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const getUniversityName = (universityId) => {
        const university = universities.find((u) => u.id === universityId);
        return university ? university.name : "Unknown";
    };

    const getEffectivePrice = (faculty) => {
        return faculty.discountPrice && faculty.discountPrice < faculty.price
            ? faculty.discountPrice
            : faculty.price;
    };

    return (
        <>
            <Header />
            <Container>
                <h2>Faculties Management</h2>

                {error && <ErrorBox>{error}</ErrorBox>}

                <FilterContainer>
                    <FilterLabel>Filter by University:</FilterLabel>
                    <FormSelect
                        value={selectedUniversityId}
                        onChange={(e) => setSelectedUniversityId(e.target.value)}
                    >
                        <option value="">All Universities</option>
                        {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>
                                {uni.name}
                            </option>
                        ))}
                    </FormSelect>
                </FilterContainer>

                <FlexEnd>
                    <AddButton onClick={handleAddNew}>
                        <AddIcon /> Add New Faculty
                    </AddButton>
                </FlexEnd>

                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>University</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Image</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {displayedFaculties.map((faculty) => (
                            <TableRow key={faculty.id}>
                                <TableCell>{faculty.name}</TableCell>
                                <TableCell>{getUniversityName(faculty.universityId)}</TableCell>
                                <TableCell>
                                    {faculty.description && faculty.description.length > 100
                                        ? `${faculty.description.substring(0, 100)}...`
                                        : faculty.description}
                                </TableCell>
                                <TableCell>
                                    <PriceText>${getEffectivePrice(faculty).toLocaleString()}</PriceText>
                                </TableCell>
                                <TableCell>
                                    {faculty.imageUrl ? (
                                        <img
                                            src={faculty.imageUrl}
                                            alt={faculty.name}
                                            style={{ height: "40px", width: "auto" }}
                                        />
                                    ) : (
                                        "No image"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <EditButton onClick={() => handleEdit(faculty)}>
                                            <EditIcon /> Edit
                                        </EditButton>
                                        <DeleteButton onClick={() => handleDelete(faculty.id)}>
                                            <DeleteIcon /> Delete
                                        </DeleteButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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

                {(formFaculty || isAddingNew) && (
                    <ModalOverlay>
                        <ModalContent>
                            <ModalTitle>
                                {isAddingNew ? "Add New Faculty" : "Edit Faculty"}
                            </ModalTitle>

                            <FormGroup>
                                <FormLabel>Faculty Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={isAddingNew ? newFaculty.name : formFaculty.name}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter faculty name"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>University</FormLabel>
                                <FormSelect
                                    name="universityId"
                                    value={isAddingNew ? newFaculty.universityId : formFaculty.universityId}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    required
                                    disabled={selectedUniversityId && isAddingNew} // Lock if filtered
                                >
                                    <option value="" disabled>Select a university</option>
                                    {universities.map((uni) => (
                                        <option key={uni.id} value={uni.id}>
                                            {uni.name}
                                        </option>
                                    ))}
                                </FormSelect>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormTextArea
                                    name="description"
                                    value={isAddingNew ? newFaculty.description : formFaculty.description}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter description"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Price ($)</FormLabel>
                                <FormInput
                                    type="number"
                                    name="price"
                                    value={isAddingNew ? newFaculty.price : formFaculty.price}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter price"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Discount Price ($)</FormLabel>
                                <FormInput
                                    type="number"
                                    name="discountPrice"
                                    value={isAddingNew ? newFaculty.discountPrice : formFaculty.discountPrice}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter discount price (optional)"
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Image</FormLabel>
                                <FormInput type="file" onChange={handleFileChange} />
                            </FormGroup>

                            {(!isAddingNew && formFaculty && formFaculty.imageUrl) ? (
                                <ImagePreview>
                                    <img
                                        src={formFaculty.imageUrl}
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
                                <SaveButton onClick={isAddingNew ? handleCreateNew : handleSave}>
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

export default AdminFaculties;