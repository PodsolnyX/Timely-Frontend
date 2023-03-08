import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { useZustandStore } from '../../shared/useZustandStore.js';
import { useZustandFormStore } from "../../shared/useZustandFormStore.js";
import ProfileTab from "./profile-layout/profile-tab.jsx";
import "./profile-page.css";

const ProfilePage = () => {
    const getProfile = useZustandStore(store => store.getProfile);
    const getGroups = useZustandStore(store => store.getGroups);
    const profile = useZustandStore(store => store.profile);
    const [state, setState] = useState({
        isLoading: true,
        err: false
    });
    useEffect(() => {
        useZustandFormStore.getState().reset();
        getProfile()
            .then(() => getGroups())
            .then(() => setState({isLoading: false, err: false}))
            .catch(() => setState({isLoading: false, err: true}));
    }, []);

    if (state.isLoading) return <h1>Загрузка...</h1>
    if (state.err) return <h1>Ошибка</h1>
    return (
        <div className={"container schedule-page-container text-white mt-4"}>
            <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
                <h2 className={"text-white"}>Страница профиля</h2>
                <h5 className={"text-white my-3"}>{ profile.roles.includes("Administrator") ? "Админ" : profile.teacher ? "Преподаватель" : "Студент" }</h5>
                <div className="row" style={{ color: "white" }}>
                    <ProfileTab title="Основные данные" to="main"/>
                    <ProfileTab title="Безопасность" to="password"/>
                    <ProfileTab title="Подтверждение" to="confirm"/>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfilePage;