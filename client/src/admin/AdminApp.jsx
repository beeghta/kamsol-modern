import { Routes, Route } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import ProtectedAdmin from "./components/ProtectedAdmin";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StaffAdmin from "./pages/StaffAdmin";
import ServicesAdmin from "./pages/ServicesAdmin";
import HomeSectionsAdmin from "./pages/HomeSectionsAdmin";
import CareersAdmin from "./pages/CareersAdmin";
import ContactAdmin from "./pages/ContactAdmin";
import BuildingTaxonomyAdmin from "./pages/BuildingTaxonomyAdmin";

function AdminApp() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/"
                element={
                    <ProtectedAdmin>
                        <AdminLayout />
                    </ProtectedAdmin>
                }
            >
                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="staff"
                    element={<StaffAdmin />}
                />

                <Route
                    path="services"
                    element={<ServicesAdmin />}
                />

                <Route
                    path="home"
                    element={<HomeSectionsAdmin />}
                />

                <Route
                    path="careers"
                    element={<CareersAdmin />}
                />

                <Route
                    path="contact"
                    element={<ContactAdmin />}
                />

                <Route
                    path="building-taxonomy"
                    element={<BuildingTaxonomyAdmin />}
                />
            </Route>

        </Routes>
    );
}

export default AdminApp;