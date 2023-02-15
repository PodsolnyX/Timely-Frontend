import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("jwt");
        navigate("/shedule");
    }
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