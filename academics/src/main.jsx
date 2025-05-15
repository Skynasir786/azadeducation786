import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Teachers from "./Teachers.jsx"
import App from "./App.jsx";
import Courses from "./Courses.jsx";
import TeacherProfile from "./Teacherprofile.jsx";
import ParentResourcesPage from "./Resourses"
import AboutUs from "./About.jsx";
import Signup from "./Signup.jsx"
import Admin from "./Adminpanel.jsx"
import Login from "./login"
import TeacherDashboard from "./Teacherdashboard.jsx";
import Studentdashboard from "./Studentdashboard.jsx"
// Router banayein
import CourseDetailPage from "./CourseDetailPage.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <App />,
    },
    {
        path:"/courses",
        element:<Courses />,
    },
    {
        path:"/academies",
        element:<Teachers />,
    },
    {
        path:"/teacherprofile",
        element:<TeacherProfile />,
    },
    {
        path:"/resources",
        element:<ParentResourcesPage />,
    },
    {
        path:"/admin",
        element:<Admin />,
    },
    {
        path:"/about",
        element:<AboutUs />,
    },

 {
        path:"/signup",
        element:<Signup />,
    },
    {
        path:"/login",
        element:<Login />,
    },
    {
        path:"/teacherdashboard",
        element:<TeacherDashboard/>,
    },
    {
        path:"/courses/:slug",
        element:<CourseDetailPage/>,
    },
    {
        path:"/studentdashboard",
        element:<Studentdashboard/>
    }





]);

// Root render karein
createRoot(document.getElementById("root")).render(
    
        <RouterProvider router={router} />
   
);
