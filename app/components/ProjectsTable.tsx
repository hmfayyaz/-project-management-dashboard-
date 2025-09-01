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
} from "@mui/material";
import { useProjects, Project } from "../context/ProjectsContext";

const statuses = ["active", "pending", "completed"];

export default function ProjectsTable() {
  const { projects, loading } = useProjects();
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

  if (loading)
    return (
      <Box
        sx={{
          height: 600, // keeps the same table height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" /> {/* blue spinner */}
      </Box>
    );

  return (
    <Box sx={{ height: 600, width: "100%", paddingTop: "30px" }}>
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
      </Box>
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
      />
    </Box>
  );
}
