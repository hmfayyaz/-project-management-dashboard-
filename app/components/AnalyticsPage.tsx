/** @format */

"use client";

import React, { useMemo } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useProjects } from "../context/ProjectsContext"; // adjust path if needed
import Grid from "@mui/material/Grid";

// Disable SSR for ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AnalyticsPage: React.FC = () => {
  const { projects, loading } = useProjects();

  // Always call hooks (even if loading)
  const statusData = useMemo(() => {
    if (!projects?.length) return { active: 0, pending: 0, completed: 0 };

    const counts: Record<string, number> = {
      active: 0,
      pending: 0,
      completed: 0,
    };
    projects.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const projectsPerUser = useMemo(() => {
    if (!projects?.length) return {};
    const userMap: Record<string, number> = {};
    projects.forEach((p) => {
      userMap[p.owner] = (userMap[p.owner] || 0) + 1;
    });
    return userMap;
  }, [projects]);

  const projectsByMonth = useMemo(() => {
    if (!projects?.length) return {};
    const monthMap: Record<string, number> = {};
    projects.forEach((p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    return monthMap;
  }, [projects]);

  // Show loader if still fetching
  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "60vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      style={{ paddingTop: "30px", margin: "0 56px" }}
    >
      {/* Status Distribution */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Project Status Distribution</Typography>
            <Chart
              type="pie"
              series={Object.values(statusData)}
              options={{
                labels: Object.keys(statusData),
                colors: ["#4caf50", "#ff9800", "#f44336"],
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Projects per User */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Projects per User</Typography>
            <Chart
              type="bar"
              series={[
                {
                  name: "Projects",
                  data: Object.values(projectsPerUser),
                },
              ]}
              options={{
                xaxis: { categories: Object.keys(projectsPerUser) },
                colors: ["#2196f3"],
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Projects per Month */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Projects Created Per Month</Typography>
            <Chart
              type="line"
              series={[
                {
                  name: "Projects",
                  data: Object.values(projectsByMonth),
                },
              ]}
              options={{
                xaxis: { categories: Object.keys(projectsByMonth) },
                stroke: { curve: "smooth" },
                colors: ["#673ab7"],
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsPage;
