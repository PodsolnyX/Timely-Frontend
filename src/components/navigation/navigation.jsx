import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useZustandStore } from '../../shared/useZustandStore';

const NavBar = () => {
    const logout = useZustandStore((store) => store.logout);

    return (
        <Navbar bg="light" expand="sm">
            <Container fluid>
                <Link to={"/"}>
                    <Navbar.Brand href="/">Teamely</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to={"/"}>
                            <Nav.Link href="/">Главная</Nav.Link>
                        </Link>
                    </Nav>
                    {
                        localStorage.getItem("jwt") ?
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