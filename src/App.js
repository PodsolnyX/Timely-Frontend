import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import MainPage from "./components/main-page/main-page";
import SchedulePage from "./components/schedule-page/schedule-page";
import NavBar from "./components/navigation/navigation";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";
import { useZustandStore } from './shared/useZustandStore';

axios.defaults.baseURL = 'http://timely.markridge.space/api/';

function App() {
    const isAuth = useZustandStore((store) => store.isAuth);
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/login" element={isAuth ? <Navigate to="/schedule"/> : <LoginPage />} />
                <Route path="/register" element={isAuth ? <Navigate to="/schedule"/> : <RegisterPage />} />
            </Routes>
        </div>
    );
}

export default App;
