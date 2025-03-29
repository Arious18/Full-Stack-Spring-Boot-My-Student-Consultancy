import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Set = ({ open, handleClose, selectedTeam, refreshData }) => {
    const [formData, setFormData] = useState(selectedTeam || {});

    useEffect(() => {
        if (selectedTeam) {
            setFormData(selectedTeam);
        }
    }, [selectedTeam]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/teams/${formData.id}`, formData);
            refreshData(); // Refresh the table data
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Error updating team member:", error.response?.data?.message || error.message);
            alert("Update failed: " + (error.response?.data?.message || "Something went wrong"));
        }
    };


    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "#2a2d64",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <Typography variant="h6" textAlign="center">Edit Team Member</Typography>
                <TextField label="ID" name="id" value={formData.id || ""} disabled fullWidth />
                <TextField label="Name" name="name" value={formData.name || ""} onChange={handleChange} fullWidth />
                <TextField label="Email" name="email" value={formData.email || ""} onChange={handleChange} fullWidth />
                <TextField label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} fullWidth />
                <TextField label="Age" name="age" type="number" value={formData.age || ""} onChange={handleChange} fullWidth />
                <TextField label="Access Level" name="access" value={formData.access || ""} onChange={handleChange} fullWidth />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default Set;
