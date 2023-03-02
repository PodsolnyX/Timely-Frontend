import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { useZustandStore } from '../../shared/useZustandStore.js';
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
        getProfile()
            .then(() => getGroups())
            .then(() => setState({isLoading: false, err: false}))
            .catch(() => setState({isLoading: false, err: true}));
    }, [])

    if (state.isLoading) return <h1>Загрузка...</h1>
    if (state.err) return <h1>Ошибка</h1>
    return (
        <div className={"container schedule-page-container text-white"}>
            <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
                <h2 className={"text-white"}>Страница профиля</h2>
                <div className={"mt-4"}>
                    <h5 className={"text-white mb-3"}>{ profile.roles.includes("Administrator") ? "Админ" : profile.teacher ? "Преподаватель" : "Студент" }</h5>

                    <div className="row" style={{ color: "white" }}>
                        <div className="col-sm-12 col-md-4">
                            <NavLink to="main" className={({ isActive }) => isActive ? "active-link-profile" : "non-active-link-profile"}>
                                <h5>Основные данные</h5>
                            </NavLink>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <NavLink to="password" className={({ isActive }) => isActive ? "active-link-profile" : "non-active-link-profile"}>
                                <h5>Безопасность</h5>
                            </NavLink>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <NavLink to="confirm" className={({ isActive }) => isActive ? "active-link-profile" : "non-active-link-profile"}>
                                <h5>Подтверждение</h5>
                            </NavLink>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;