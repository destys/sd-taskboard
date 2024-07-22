import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard-page/dashboard-page";
import Root from "../components/root/root";
import ProjectPage from "../pages/project-page/project-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/projects",
        element: <DashboardPage />,
      },
      {
        path: "/project/:id",
        element: <ProjectPage />,
      },
    ],
  },
]);
