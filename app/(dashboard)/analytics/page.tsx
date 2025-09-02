/** @format */

import AnalyticsPage from "../../components/AnalyticsPage";
import { ProjectsProvider } from "@/app/context/ProjectsContext";

export default function Analytics() {
  return (
    <ProjectsProvider>
      <AnalyticsPage />
    </ProjectsProvider>
  );
}
