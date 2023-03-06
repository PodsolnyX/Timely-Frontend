import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useZustandStore } from '../../shared/useZustandStore';
import "./navigation.css";
import {getWeekFromMS} from "../../helpers/get-week";

const NavBar = () => {
    const logout = useZustandStore((store) => store.logout);
    const isAuth = useZustandStore((store) => store.isAuth);
    const profile = useZustandStore((store) => store.profile);

    const navigate = useNavigate();
    console.log(profile)

    let week = getWeekFromMS(new Date());

    let path = "";
    if (profile?.group)
        path = `/schedule/group/${profile.group.id}?name=${profile.group.name}&startDate=${week[0]}&endDate=${week[5]}`;
    else if (profile?.teacher)
        path = `/schedule/teacher/${profile.teacher.id}?name=${profile.teacher.name}&startDate=${week[0]}&endDate=${week[5]}`;
    else
        path = `/main`;

    const onLogout = () => {
        logout().then(navigate(0));
    }

    return (
        <Navbar variant="dark" expand="lg" style={{background: "#202225", borderBottom: "1px solid gray", boxShadow: "0 6px 10px rgba(0,0,0,0.2)", height : "70px"}}>
            <Container>
                <Link to={"/"}>
                    <Navbar.Brand>Timely</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 ms-5"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={"/"}> Главная </NavLink>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={"/groups"}> Группы </NavLink>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={"/teachers"}> Преподаватели </NavLink>
                        <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={"/audiences"}> Аудитории </NavLink>
                        { isAuth && (profile.roles?.includes("Student") || profile.roles?.includes("Teacher"))
                            ? <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={path}> Моё расписание </NavLink>
                            : null
                        }
                    </Nav>
                    <div>
                        {
                            isAuth ?
                                <div className="dropdown">
                                    <button className="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false"
                                    > {profile.fullName} </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link className="dropdown-item" to={"/profile"}>Профиль</Link>

                                        </li>
                                        <li>
                                            {profile.roles?.includes("Administrator") ?
                                                <Link className="dropdown-item" to={"/admin"}> Админ-панель </Link> : null}
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li className={"d-flex justify-content-center"}>
                                            <Link to={"/"} className={""}>
                                                <Button variant="outline-danger" size="sm" onClick={onLogout}>Выйти</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <Link to={"/login"}>
                                    <Button variant="outline-primary">Войти</Button>
                                </Link>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;