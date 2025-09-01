/** @format */

// "use client";
// import * as React from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import type { GridValueFormatter } from "@mui/x-data-grid";

import ProjectsTable from "@/app/components/ProjectsTable";
import { ProjectsProvider } from "@/app/context/ProjectsContext";

// const statuses = ["active", "pending", "completed"];

// function randomStatus() {
//   return statuses[Math.floor(Math.random() * statuses.length)];
// }

// function randomDate() {
//   const start = new Date(2023, 0, 1);
//   const end = new Date();
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

// type Project = {
//   id: number;
//   title: string;
//   description: string;
//   owner: string;
//   status: string;
//   createdAt: Date;
// };

// export default function ProjectsPage() {
//   const [projects, setProjects] = React.useState<Project[]>([]);
//   const [filtered, setFiltered] = React.useState<Project[]>([]);

//   const [search, setSearch] = React.useState("");
//   const [status, setStatus] = React.useState("");
//   const [paginationModel, setPaginationModel] = React.useState({
//     page: 0,
//     pageSize: 10,
//   });

//   const [sortModel, setSortModel] = React.useState([
//     { field: "createdAt", sort: "desc" as const },
//   ]);

//   React.useEffect(() => {
//     async function fetchData() {
//       const [postsRes, usersRes] = await Promise.all([
//         fetch("https://jsonplaceholder.typicode.com/posts"),
//         fetch("https://jsonplaceholder.typicode.com/users"),
//       ]);
//       const posts = await postsRes.json();
//       const users = await usersRes.json();

//       const mapped = posts.map((post: any) => {
//         const owner = users.find((u: any) => u.id === post.userId);
//         return {
//           id: post.id,
//           title: post.title,
//           description: post.body,
//           owner: owner ? owner.name : "Unknown",
//           status: randomStatus(),
//           createdAt: randomDate(),
//         };
//       });
//       setProjects(mapped);
//       setFiltered(mapped);
//     }
//     fetchData();
//   }, []);

//   React.useEffect(() => {
//     let data = [...projects];
//     if (search) {
//       data = data.filter(
//         (p) =>
//           p.title.toLowerCase().includes(search.toLowerCase()) ||
//           p.owner.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (status) {
//       data = data.filter((p) => p.status === status);
//     }
//     setFiltered(data);
//   }, [search, status, projects]);

//   // Sorting
//   //   React.useEffect(() => {
//   //     if (sortModel.length && filtered.length) {
//   //       const { field, sort } = sortModel[0];
//   //       setFiltered((prev) =>
//   //         [...prev].sort((a, b) => {
//   //           if (field === "createdAt") {
//   //             const aDate = new Date(a.createdAt).getTime();
//   //             const bDate = new Date(b.createdAt).getTime();
//   //             if (sort === "asc") {
//   //               return aDate - bDate;
//   //             } else if (sort === "desc") {
//   //               return bDate - aDate;
//   //             }
//   //           }
//   //           return 0;
//   //         })
//   //       );
//   //     }
//   //   }, [sortModel]);

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "title", headerName: "Title", width: 200 },
//     { field: "owner", headerName: "Owner", width: 150 },
//     { field: "status", headerName: "Status", width: 120 },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 180,
//       //   valueFormatter: (params: GridValueFormatter) =>
//       //     new Date(params.value as Date).toLocaleDateString(),
//     },
//     { field: "description", headerName: "Description", width: 300 },
//   ];

//   // Pagination simulation
//   const paginatedRows = filtered.slice(
//     paginationModel.page * paginationModel.pageSize,
//     paginationModel.page * paginationModel.pageSize + paginationModel.pageSize
//   );

//   return (
//     <Box sx={{ height: 600, width: "100%" }}>
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <TextField
//           label="Search by Title or Owner"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={status}
//             label="Status"
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <MenuItem value="">All</MenuItem>
//             {statuses.map((s) => (
//               <MenuItem key={s} value={s}>
//                 {s.charAt(0).toUpperCase() + s.slice(1)}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>
//       <DataGrid
//         rows={paginatedRows}
//         columns={columns}
//         rowCount={filtered.length}
//         pagination
//         paginationMode="server"
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//         sortingMode="server"
//         sortModel={sortModel}
//         // onSortModelChange={(model) => setSortModel(model)}
//         // rowsPerPageOptions={[5, 10, 20]}
//         getRowId={(row) => row.id}
//       />
//     </Box>
//   );
// }

export default function ProjectsPage() {
  return (
    <ProjectsProvider>
      <ProjectsTable />
    </ProjectsProvider>
  );
}
