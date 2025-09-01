/** @format */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: string;
  createdAt: Date;
};

type ProjectsContextType = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  loading: boolean;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [postsRes, usersRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/users"),
      ]);
      const posts = await postsRes.json();
      const users = await usersRes.json();

      const statuses = ["active", "pending", "completed"];
      const randomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
      const randomDate = () => {
        const start = new Date(2023, 0, 1);
        const end = new Date();
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      };

      const mapped = posts.map((post: any) => {
        const owner = users.find((u: any) => u.id === post.userId);
        return {
          id: post.id,
          title: post.title,
          description: post.body,
          owner: owner ? owner.name : "Unknown",
          status: randomStatus(),
          createdAt: randomDate(),
        };
      });

      setProjects(mapped);
      setLoading(false);
    }

    fetchData();
  }, []);

  return <ProjectsContext.Provider value={{ projects, setProjects, loading }}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
