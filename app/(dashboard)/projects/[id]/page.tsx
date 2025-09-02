"use client";

import { useParams } from "next/navigation";
import { useProjects } from "@/app/context/ProjectsContext";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams();

  const { projects, setProjects } = useProjects(); // ✅ need setter in context
  const project = projects.find((p) => p.id === id);

  const [status, setStatus] = useState(project?.status || "");

  if (!project) {
    return <Typography>Project not found</Typography>;
  }

  const handleStatusChange = (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    // ✅ Update state in context
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{project.title}</Typography>
          <Typography variant="subtitle1">Owner: {project.owner}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {project.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Created At: {new Date(project.createdAt).toLocaleDateString()}
          </Typography>

          {/* 🔹 Editable status */}
          <FormControl sx={{ mt: 3, minWidth: 200 }}>
            <Select value={status} onChange={handleStatusChange}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
}
