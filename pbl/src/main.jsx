import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/store.jsx";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider
import "./index.css";
import CreateEvent from "./pages/CreateEvent"; // ✅ Ensure correct path

import App from "./App.jsx";

// 🛠 Import Components
import Layout from "./components/layout.jsx";
import Home from "./components/home";
import Login from "./components/form/login.jsx";
import Signup from "./components/form/register.jsx";
import NewPost from "./components/form/newPost";
import AdminProfile from "./components/profile/adminProfile.jsx";
import StuProfile from "./components/profile/stuProfile.jsx";
import Clubs from "./components/allClubs.jsx";
import Calender from "./components/calender.jsx";
import EditPost from "./components/EditPost";
import Events from "./pages/Events.jsx"; 
import MyEvents from "./pages/MyEvents.jsx"; 
import EventRegistrations from "./pages/EventRegistrations"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "newpost", element: <NewPost /> },
      { path: "adminprofile", element: <AdminProfile /> },
      { path: "stuprofile", element: <StuProfile /> },
      { path: "clubs", element: <Clubs /> },
      { path: "calender", element: <Calender /> },
      { path: "/edit/:id" ,element:<EditPost />} ,
      { path: "events", element: <Events /> }, 
      { path: "myevents", element: <MyEvents /> }, 
      { path: "create-event", element: <CreateEvent /> },
      { path: "event/:eventId/registrations", element: <EventRegistrations /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthProvider> {/* ✅ Ensure AuthProvider wraps everything */}
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
