import HomePageLayout from "@/Pages/HomeScreen";
import LoginScreen from "@/Pages/LoginScreen";
import ProblemScreen from "@/Pages/ProblemScreen";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/explore",
    Component: HomePageLayout,
  },
  {
    path: "/:categoryId/problems",
    Component: ProblemScreen,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
