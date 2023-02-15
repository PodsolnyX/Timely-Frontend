import './login-page.css';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return(
        <div className={"container"}>
            <div>
                <h1 className={"text-center"}>Логин</h1>
                <Link to={"/register"} className={"mx-auto"}>
                    <Button className={"mx-auto"} variant="outline-primary">Регистрироваться</Button>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;