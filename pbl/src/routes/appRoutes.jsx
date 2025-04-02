import { Routes, Route } from "react-router-dom";
import EventsPage from "../components/EventsPage";
import EventDetails from "../components/EventDetails";
import CreateEvent from "../components/CreateEvent";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
    );
};

export default AppRoutes;
