import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import { useZustandStore } from '../../shared/useZustandStore';
import "./navigation.css";

const NavBar = () => {
    const logout = useZustandStore((store) => store.logout);
    const isAuth = useZustandStore((store) => store.isAuth);
    const profile = useZustandStore((store) => store.profile);
    return (
        <Navbar variant="dark" expand="md" style={{background: "#202225", borderBottom: "1px solid gray", boxShadow: "0 6px 10px rgba(0,0,0,0.2)", height : "70px"}}>
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
                        {
                            isAuth &&
                            <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                     to={"/profile"}> Профиль </NavLink>
                        }
                        {
                            profile.roles?.includes("Administrator") && isAuth &&
                            <NavLink className={({isActive}) => isActive ? "active-link" : "non-active-link"}
                                 to={"/admin"}> Админ </NavLink>
                        }
                    </Nav>
                    {
                        isAuth ?
                            <Link to={"/"}>
                                <Button variant="outline-danger" onClick={logout}>Выйти</Button>
                            </Link>
                            :
                            <Link to={"/login"}>
                                <Button variant="outline-primary">Войти</Button>
                            </Link>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;