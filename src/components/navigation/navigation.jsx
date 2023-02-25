import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useZustandStore } from '../../shared/useZustandStore';

const NavBar = () => {
    const logout = useZustandStore((store) => store.logout);
    const isAuth = useZustandStore((store) => store.isAuth);
    return (
        <Navbar variant="dark" expand="md" style={{background: "#202225", borderBottom: "1px solid gray", boxShadow: "0 6px 10px rgba(0,0,0,0.2)", height : "70px"}}>
            <Container fluid style={{padding : "1px 5vw 1px 5vw"}}>
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
                        <Link to={"/"}> Главная </Link>
                        <Link className={"ms-3"} to={"/"}> Группы </Link>
                        <Link className={"ms-3"} to={"/"}> Преподаватели </Link>
                        <Link className={"ms-3"} to={"/"}> Аудитории </Link>
                        <Link className={"ms-3"} to={"/admin"}> Админ </Link>
                    </Nav>
                    {
                        isAuth ?
                            <Button variant="outline-primary" onClick={logout}>Выйти</Button>
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