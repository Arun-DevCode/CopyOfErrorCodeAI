import HomePageLayout from "@/Pages/HomeScreen";
import LoginScreen from "@/Pages/LoginScreen";
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
