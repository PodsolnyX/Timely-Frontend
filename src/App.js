import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import axios from 'axios';
import MainPage from "./components/main-page/main-page";
import SchedulePage from "./components/schedule-page/schedule-page";
import NavBar from "./components/navigation/navigation";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";
import {useZustandStore} from './shared/useZustandStore';
import React, {useEffect} from "react";
import Footer from "./components/footer/footer";
import GroupsPage from "./components/groups-page/groups-page";
import AudiencesPage from "./components/audiences-page/audiences-page";
import TeachersPage from "./components/teachers-page/teachers-page";
import ProfilePage from "./components/profile-page/profile-page"
import ProfilePassword from './components/profile-page/profile-password/profile-password';
import ProfileEdit from './components/profile-page/profile-edit/profile-edit';
import ProfileConfirm from './components/profile-page/profile-confirm/profile-confirm';
import AdminPageContainer from "./components/admin-panel-page/admin-page-container";
import ConfirmEmailPage from "./components/confirm-email-page/confirm-email-page";

axios.defaults.baseURL = 'https://timely.markridge.space/api/';
axios.interceptors.response.use(response => response,
    error => {
        if (error.response?.status === 401) {
            useZustandStore.getState().logout(true);
        }
        return Promise.reject(error);
    });

function App() {
    const isAuth = useZustandStore(store => store.isAuth);
    const profile = useZustandStore(store => store.profile);
    const getProfile = useZustandStore(store => store.getProfile);
    useEffect(() => {
        if (isAuth) {
            getProfile();
        }
    }, []);
    return (
        <div className={"bg-main"}>
            <NavBar/>
            <div className={"content"}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/schedule/:scheduleTag/:id" element={<SchedulePage/>}/>
                    <Route path="/profile/*" element={!isAuth ? <Navigate to="/login"/> : <ProfilePage/>}>
                        <Route path="main" index element={<ProfileEdit/>}/>
                        <Route path="password" element={<ProfilePassword/>}/>
                        <Route path="confirm" element={<ProfileConfirm/>}/>
                        <Route path="*" element={<Navigate to="main" replace/>}/>
                    </Route>
                    <Route path="/groups" element={<GroupsPage/>}/>
                    <Route path="/teachers" element={<TeachersPage/>}/>
                    <Route path="/audiences" element={<AudiencesPage/>}/>
                    <Route path="/admin" element={!isAuth ? <Navigate to="/login"/> :
                        (!profile.roles?.includes("Administrator") && !profile.roles?.includes("Composer")) ?
                            <Navigate to="/"/> :
                            <AdminPageContainer/>}/>
                    <Route path="/login" element={isAuth ? <Navigate to="/"/> : <LoginPage/>}/>
                    <Route path="/register" element={isAuth ? <Navigate to="/"/> : <RegisterPage/>}/>
                    <Route path="/confirm-email" element={isAuth ? <ConfirmEmailPage/> : <Navigate to="/login"/>}/>
                    <Route path="/*" element={<Navigate to="/main"/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
