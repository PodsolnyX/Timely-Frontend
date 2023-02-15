import { useState } from 'react';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import './register-page.css';
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getToken = async () => {
        const request = await axios.post("/account/login", {
            email,
            password
        });
        return request.data.token;
    };

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Регистрация</h1>
            <div className="col">
                <Button variant="primary" onClick={() => getToken().then(value => {
                    console.log(value);
                }).catch(err => console.log(err))}>Зарегистрироваться</Button>
                <Link to={"/login"}>
                    <Button variant="secondary">Войти</Button>
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;