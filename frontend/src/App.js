import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetails from "./pages/TourDetails";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import GlobalNavbar from "./components/GlobalNavbar";
import GlobalFooter from "./components/GlobalFooter";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <GlobalNavbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/packages/:id" element={<TourDetails />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <GlobalFooter />
            </div>
        </Router>
    );
};

export default App;
