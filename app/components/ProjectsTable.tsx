/** @format */

"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useProjects, Project } from "../context/ProjectsContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const statuses = ["active", "pending", "completed"];

export default function ProjectsTable() {
  const { projects, setProjects, loading } = useProjects(); // ✅ added setProjects
  const [filtered, setFiltered] = React.useState<Project[]>([]);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = React.useState([
    { field: "createdAt", sort: "desc" as const },
  ]);

  const router = useRouter();

  // 🔹 Dialog state
  const [open, setOpen] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    title: "",
    owner: "",
    status: "",
    description: "",
  });

  React.useEffect(() => {
    let data = [...projects];
    if (search) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.owner.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      data = data.filter((p) => p.status === status);
    }
    setFiltered(data);
  }, [search, status, projects]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const paginatedRows = filtered.slice(
    paginationModel.page * paginationModel.pageSize,
    paginationModel.page * paginationModel.pageSize + paginationModel.pageSize
  );

  // 🔹 Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newProject.title || !newProject.owner || !newProject.status) {
      alert("Please fill all required fields");
      return;
    }

    const projectToAdd: Project = {
      id: uuidv4(), // convert number → string
      title: newProject.title,
      owner: newProject.owner,
      status: newProject.status as "active" | "pending" | "completed", // cast
      description: newProject.description,
      createdAt: new Date().toISOString(),
    };

    setProjects([...projects, projectToAdd]); // ✅ update global context
    setNewProject({ title: "", owner: "", status: "", description: "" });
    handleClose();
  };

  if (loading)
    return (
      <Box
        sx={{
          height: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box sx={{ paddingTop: "30px", margin: "0 56px" }}>
      {/* 🔹 Top controls */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by Title or Owner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 🔹 New Project Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto" }}
          onClick={handleOpen}
        >
          New Project
        </Button>
      </Box>

      {/* 🔹 DataGrid */}
      <DataGrid
        rows={paginatedRows}
        columns={columns}
        rowCount={filtered.length}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        sortModel={sortModel}
        getRowId={(row) => row.id}
        onRowClick={(params) =>
          router.push(`/projects/${String(params.row.id)}`)
        }
        disableColumnResize
      />

      {/* 🔹 Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            required
            value={newProject.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Owner"
            name="owner"
            fullWidth
            required
            value={newProject.owner}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            required
            value={newProject.status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            value={newProject.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
