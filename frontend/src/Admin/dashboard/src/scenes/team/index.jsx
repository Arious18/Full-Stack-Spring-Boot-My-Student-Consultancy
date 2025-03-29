import { Box, Typography, useTheme, Button } from "@mui/material";
import { Header } from "../../components/index.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import Set from "./Set.jsx";

const Team = () => {
    const theme = useTheme();
    const [teamData, setTeamData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = () => {
        axios.get("http://localhost:8080/teams")
            .then(response => setTeamData(response.data))
            .catch(error => console.error("Error fetching team data:", error));
    };

    const handleEdit = (teamMember) => {
        setSelectedTeam(teamMember);
        setOpen(true);
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.5,
            renderCell: (params) => (
                <Button variant="contained" color="secondary" onClick={() => handleEdit(params.row)}>
                    <Edit />
                </Button>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box mt="40px" height="75vh">
                <DataGrid rows={teamData} columns={columns} pageSize={10} checkboxSelection />
            </Box>
            <Set open={open} handleClose={() => setOpen(false)} selectedTeam={selectedTeam} refreshData={fetchTeamData} />
        </Box>
    );
};

export default Team;
