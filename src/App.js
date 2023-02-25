import './App.css';
import { Route, Routes } from "react-router-dom";
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

axios.defaults.baseURL = 'https://food-delivery.kreosoft.ru/api';

function App() {

    const init = useZustandStore((store) => store.init);
    init();
    return (
        <div className={"bg-main"}>
            <NavBar />
            <div className={"content"}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/groups" element={<RegisterPage />} />
                    <Route path="/teachers" element={<RegisterPage />} />
                    <Route path="/auditories" element={<RegisterPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
