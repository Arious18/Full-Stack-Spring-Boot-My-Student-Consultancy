import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../../components/index.jsx"; // Adjust path as needed

// Styled Components (unchanged from original, included for completeness)
const Container = styled.div`margin: 20px; position: relative;`;
const ActionButton = styled.button`padding: 8px 16px; border-radius: 4px; border: none; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 14px;`;
const EditButton = styled(ActionButton)`background-color: #6870fa; &:hover { background-color: #535ac8; }`;
const DeleteButton = styled(ActionButton)`background-color: #db4f4a; &:hover { background-color: #c04440; }`;
const CancelButton = styled(ActionButton)`background-color: #777; &:hover { background-color: #666; }`;
const SaveButton = styled(ActionButton)`background-color: #4cceac; &:hover { background-color: #3dbb9a; }`;
const Table = styled.table`width: 100%; border-collapse: collapse; background-color: #1F2A40; color: white; border-radius: 4px; overflow: hidden;`;
const TableHeader = styled.thead`background-color: #3e4396;`;
const TableHeaderCell = styled.th`padding: 12px 16px; text-align: left; font-weight: 600; border-bottom: 1px solid #2d3748;`;
const TableBody = styled.tbody`background-color: #1F2A40;`;
const TableRow = styled.tr`&:hover { background-color: #293145; }`;
const TableCell = styled.td`padding: 12px 16px; border-bottom: 1px solid #2d3748;`;
const ModalOverlay = styled.div`position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
const ModalContent = styled.div`background-color: #1F2A40; border-radius: 8px; padding: 24px; width: 600px; border: 2px solid #2d3748; color: white; max-height: 80vh; overflow-y: auto;`;
const FormGroup = styled.div`margin-bottom: 16px;`;
const FormLabel = styled.h6`margin-bottom: 8px; font-size: 16px;`;
const FormInput = styled.input`width: 100%; padding: 10px; background-color: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: white; box-sizing: border-box;`;
const FormSelect = styled.select`width: 100%; padding: 10px; background-color: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: white; box-sizing: border-box;`;
const ButtonGroup = styled.div`display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px;`;
const LoadingOverlay = styled.div`position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; z-index: 1000;`;

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

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [appsResponse, unisResponse, facsResponse, fieldsResponse] = await Promise.all([
                axios.get("http://localhost:8080/applications"),
                axios.get("http://localhost:8080/universities"),
                axios.get("http://localhost:8080/faculties"),
                axios.get("http://localhost:8080/fields"),
            ]);

            setApplications(appsResponse.data);
            setUniversities(unisResponse.data);
            setFaculties(facsResponse.data);
            setFields(fieldsResponse.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data from MongoDB. Please try again.");
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

    const getUniversityName = (id) => universities.find((u) => u.id === id)?.name || "Unknown";
    const getFacultyName = (id) => faculties.find((f) => f.id === id)?.name || "Unknown";
    const getFieldName = (id) => fields.find((f) => f.id === id)?.name || "Unknown";

    return (
        <>
            <Header />
            <Container>
                <h2>Applications Management</h2>
                {error && (
                    <div style={{ backgroundColor: "#db4f4a", padding: "10px", marginBottom: "20px", borderRadius: "4px", color: "white" }}>
                        {error}
                    </div>
                )}
                {isLoading && !applications.length && (
                    <LoadingOverlay>
                        <div>Loading applications...</div>
                    </LoadingOverlay>
                )}

                {applications.length === 0 && !isLoading ? (
                    <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
                        No applications found.
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell>Surname</TableHeaderCell>
                                <TableHeaderCell>Actions</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id} onClick={() => handleEdit(app)} style={{ cursor: "pointer" }}>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.surname}</TableCell>
                                    <TableCell>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <EditButton onClick={(e) => { e.stopPropagation(); handleEdit(app); }}>
                                                <EditIcon /> Edit
                                            </EditButton>
                                            <DeleteButton onClick={(e) => { e.stopPropagation(); handleDelete(app.id); }}>
                                                <DeleteIcon /> Delete
                                            </DeleteButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {isLoading && applications.length > 0 && (
                    <LoadingOverlay>
                        <div>Processing...</div>
                    </LoadingOverlay>
                )}

                {selectedApplication && (
                    <ModalOverlay>
                        <ModalContent>
                            <h4>Application Details</h4>
                            <FormGroup>
                                <FormLabel>Full Name</FormLabel>
                                <FormInput
                                    type="text"
                                    value={`${selectedApplication.name} ${selectedApplication.surname}`}
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
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormInput
                                    type="date"
                                    name="dateOfBirth"
                                    value={selectedApplication.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Unique ID</FormLabel>
                                <FormInput
                                    type="text"
                                    name="uniqueId"
                                    value={selectedApplication.uniqueId}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Gender</FormLabel>
                                <FormSelect name="gender" value={selectedApplication.gender} onChange={handleInputChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>University</FormLabel>
                                <FormSelect
                                    name="chosenUniversity"
                                    value={selectedApplication.chosenUniversity}
                                    onChange={handleInputChange}
                                >
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
                                    value={selectedApplication.chosenFaculty}
                                    onChange={handleInputChange}
                                >
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
                                    value={selectedApplication.chosenField}
                                    onChange={handleInputChange}
                                >
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
                                    value={selectedApplication.contactInfo}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Application Country</FormLabel>
                                <FormInput
                                    type="text"
                                    name="applicationCountry"
                                    value={selectedApplication.applicationCountry}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Father's Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="fatherName"
                                    value={selectedApplication.fatherName || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Mother's Name</FormLabel>
                                <FormInput
                                    type="text"
                                    name="motherName"
                                    value={selectedApplication.motherName || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Finished School</FormLabel>
                                <FormInput
                                    type="text"
                                    name="finishedSchool"
                                    value={selectedApplication.finishedSchool || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            {selectedApplication.fileUrl && (
                                <FormGroup>
                                    <FormLabel>Uploaded Document</FormLabel>
                                    <a href={selectedApplication.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4cceac" }}>
                                        View Document
                                    </a>
                                </FormGroup>
                            )}
                            <ButtonGroup>
                                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                                <SaveButton onClick={handleSave}>Save Changes</SaveButton>
                            </ButtonGroup>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Container>
        </>
    );
};

export default AdminForm;