import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import MainPage from "./components/main-page/main-page";
import SchedulePage from "./components/schedule-page/schedule-page";
import NavBar from "./components/navigation/navigation";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";
import { useZustandStore } from './shared/useZustandStore';
import AdminPage from "./components/admin-panel-page/admin-page";
import React from "react";
import Footer from "./components/footer/footer";
import GroupsPage from "./components/groups-page/groups-page";
import AudiencesPage from "./components/audiences-page/audiences-page";
import TeachersPage from "./components/teachers-page/teachers-page";
import ProfilePage from "./components/profile-page/profile-page"
import ProfilePassword from './components/profile-page/profile-password/profile-password';
import ProfileEdit from './components/profile-page/profile-edit/profile-edit';
import ProfileConfirm from './components/profile-page/profile-confirm/profile-confirm';

axios.defaults.baseURL = 'http://timely.markridge.space/api/';
axios.interceptors.response.use(response => response,
    error => {
        if (error.response?.status === 401) {
            useZustandStore.getState().logout(true);
        }
        return Promise.reject(error);
    });

function App() {
    const isAuth = useZustandStore((store) => store.isAuth);


    return (
        <div className={"bg-main"}>
            <NavBar />
            <div className={"content"}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/schedule/:scheduleTag/:id" element={<SchedulePage />} />
                    <Route path="/profile/*" element={!isAuth ? <Navigate to="/login"/> : <ProfilePage />}>
                        <Route path="main" index element={<ProfileEdit />} />
                        <Route path="password" element={<ProfilePassword />} />
                        <Route path="confirm" element={<ProfileConfirm />} />
                        <Route path="*" element={<Navigate to="main" replace />} />
                    </Route>
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/teachers" element={<TeachersPage />} />
                    <Route path="/audiences" element={<AudiencesPage />} />
                    <Route path="/admin" element={!isAuth ? <Navigate to="/login"/> : <AdminPage />} />
                    <Route path="/login" element={isAuth ? <Navigate to="/schedule"/> : <LoginPage />} />
                    <Route path="/register" element={isAuth ? <Navigate to="/schedule"/> : <RegisterPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
