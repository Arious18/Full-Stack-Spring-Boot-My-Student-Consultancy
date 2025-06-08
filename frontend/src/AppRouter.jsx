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
import Contact from "./pages/Contact/Contact.jsx";
// Dashboard Components
import DashboardApp from "./Admin/dashboard/src/DashboardApp.jsx";
import Dashboard from "./Admin/dashboard/src/scenes/dashboard/index.jsx";

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
import TestPage from "../src/Test/TestPage.jsx";
import ProfilePage from "./pages/Profil/ProfilePage.jsx";
import AdminCountries from "./Admin/dashboard/src/scenes/AdminCountries/index.jsx";
import Search from "./pages/Search/Search";

import UniversityDetail from "./components/card/UniversityDetail.jsx";
import FacultyDetail from "./components/card/FacultyDetail.jsx";
import FieldDetail from "./components/card/FieldDetail.jsx";
import UniversityList from "./components/lists/UniveresityList.jsx";
import CountryDetail from "./components/flag/CountryDetail.jsx";
import AdminHeroes from "./Admin/dashboard/src/scenes/AdminHeroes/AdminHeroes.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyAndPolicy/PrivacyPolicy.jsx";
import Users from "./Admin/dashboard/src/scenes/team/Users.jsx";
import Services from "./pages/Services/Services.jsx";
import HelpCenter from "./pages/HelpCenter/HelpCenter.jsx";
import CountryList from "./components/lists/CountryList.jsx";
import AdminNews from "./Admin/dashboard/src/scenes/AdminNews/AdminNews.jsx";
import AdminJobApplication from "./Admin/dashboard/src/scenes/AdminJobApplication/AdminJobApplication.jsx";
import AdminJobs from "./Admin/dashboard/src/scenes/AdminJobs/index.jsx";
import JobList from "./components/job/JobList.jsx";
import NewsList from "./components/news/NewsList.jsx";
import NewsDetails from "./components/news/NewsDetails.jsx";

// Import the job components
import JobDetail from "./components/job/JobDetails.jsx";
import JobApplication from "./components/job/JobApplication.jsx";
import EndPointTester from "./Test/EndPoint/EndPointTester.jsx";

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
                <Route path="/country/:id" element={<CountryDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/helpCenter" element={<HelpCenter />} />
                <Route path="/countryList" element={<CountryList />} />

                <Route path="/EndPointTester" element={<EndPointTester />} />
                {/* Job Routes */}
                <Route path="/jobs" element={<JobList />} />
                <Route path="/jobList" element={<JobList />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/job/:jobId/jobApply" element={<JobApplication />} />

                <Route path="/newsList" element={<NewsList />} />
                <Route path="/news/:slug" element={<NewsDetails />} />

                {/* List Views */}
                <Route path="/university" element={<UniversityList />} />
                <Route path="/faculties/:universityId" element={<Faculties />} />
                <Route path="/fields/:facultyId" element={<Fields />} />

                {/* Detail Views */}
                <Route path="/university/:id" element={<UniversityDetail />} />
                <Route path="/faculty/:id" element={<FacultyDetail />} />
                <Route path="/field/:id" element={<FieldDetail />} />

                {/* Description router*/}
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />


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
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute requireAdmin={true}>
                            <DashboardApp />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="adminCountries" element={<AdminCountries />} />
                    <Route path="adminUniversities" element={<AdminUniversities />} />
                    <Route path="adminFaculties" element={<AdminFaculties />} />
                    <Route path="adminFields" element={<AdminFields />} />
                    <Route path="adminNews" element={<AdminNews />} />
                    <Route path="adminJobApplication" element={<AdminJobApplication />} />
                    <Route path="adminJobs" element={<AdminJobs />} />
                    <Route path="adminFields" element={<AdminFields />} />
                    <Route path="form" element={<Form />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="heroes" element={<AdminHeroes />} />
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