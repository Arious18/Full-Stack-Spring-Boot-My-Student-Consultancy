import { Routes, Route } from "react-router-dom";
import React from "react";

// Authentication pages
import { AuthProvider } from "./Auth/components/AuthContext";
import { ProtectedRoute } from "./Auth/components/ProtectedRoute";
import Login from "./pages/Auth/Auth.jsx";
import RegisterPage from "./pages/Auth/Register.jsx";
// General Pages
import Home from "./pages/Home";

import University from "./pages/University";

// Dashboard Components
import DashboardApp from "./Admin/dashboard/src/DashboardApp.jsx";
import Dashboard from "./Admin/dashboard/src/scenes/dashboard/index.jsx";
import Team from "./Admin/dashboard/src/scenes/team/index.jsx";
import Contacts from "./Admin/dashboard/src/scenes/contacts/index.jsx";
import AdminUniversities from "./Admin/dashboard/src/scenes/UniversityAdmin/index.jsx";
import Form from "./Admin/dashboard/src/scenes/form/index.jsx";
import Calendar from "./Admin/dashboard/src/scenes/calendar/index.jsx";
import Bar from "./Admin/dashboard/src/scenes/bar/index.jsx";
import Pie from "./Admin/dashboard/src/scenes/pie/index.jsx";
import Stream from "./Admin/dashboard/src/scenes/stream/index.jsx";
import Line from "./Admin/dashboard/src/scenes/line/index.jsx";
import FAQ from "./Admin/dashboard/src/scenes/faq/index.jsx";
import Geography from "./Admin/dashboard/src/scenes/geography/index.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import AdminFaculties from "./Admin/dashboard/src/scenes/AdminFaculties/index.jsx";
import Fields from "./pages/Fields.jsx";
import Faculties from "./pages/Faculties.jsx";
import AdminFields from "./Admin/dashboard/src/scenes/AdminFields/index.jsx";
import ApplForm from "./pages/ApplForm";
import AdminForm from "./Admin/dashboard/src/scenes/AdminForm/AdminForm.jsx";
import TestPage from "./Test/TestPage.jsx";
import ProfilePage from "./pages/Profil/ProfilePage.jsx";
import AdminCountries from "./Admin/dashboard/src/scenes/AdminCountries/index.jsx";
import Search from "./pages/Search/Search";
import Universities from "./components/card/UniversitiesGrid"
import UniversityDetail from "./components/card/UniversityDetail.jsx";
import FacultyDetail from "./components/card/FacultyDetail.jsx";
import FieldDetail from "./components/card/FieldDetail.jsx";
const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* General Site Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Auth" element={<Auth />} />
                <Route path="/profilePage" element={<ProfilePage />} />
                <Route path="/search" element={<Search />} />


                {/* List Views */}
                <Route path="/university" element={<University />} />
                <Route path="/faculties/:universityId" element={<Faculties />} />
                <Route path="/fields/:facultyId" element={<Fields />} />

                {/* Detail Views */}
                <Route path="/university/:id" element={<UniversityDetail />} />
                <Route path="/faculty/:id" element={<FacultyDetail />} />
                <Route path="/field/:id" element={<FieldDetail />} />
                {/* Protected Routes */}
                <Route
                    path="/apply"
                    element={
                        <ProtectedRoute>
                            <ApplForm />
                        </ProtectedRoute>
                    }
                />
                <Route path="/test" element={<TestPage />} />

                {/* Admin/Dashboard Routes - All protected and require admin access */}
                <Route path="/dashboard"element={
                    <ProtectedRoute requireAdmin={true}>
                        <DashboardApp />
                    </ProtectedRoute>
                }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="team" element={<Team />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="adminCountries" element={<AdminCountries />} />
                    <Route path="adminUniversities" element={<AdminUniversities />} />
                    <Route path="adminFaculties" element={<AdminFaculties />} />
                    <Route path="adminFields" element={<AdminFields />} />
                    <Route path="form" element={<Form />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="bar" element={<Bar />} />
                    <Route path="pie" element={<Pie />} />
                    <Route path="stream" element={<Stream />} />
                    <Route path="line" element={<Line />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="geography" element={<Geography />} />
                    <Route path="adminForm" element={<AdminForm />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default AppRouter;