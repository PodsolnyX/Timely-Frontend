import './login-page.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const loginRef = useRef();
    useEffect(() => {
        const listener = (event) => {
            if (event.key == "Enter") {
                loginRef.current.click();
            }
        }
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [])

    const checkEmail = () => {
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setEmailError("Некорректный email");
            return false;
        }
        else setEmailError("");
        return true;
    }

    const checkPassword = () => {
        if (password.length && !password.match(/^[а-яА-ЯёЁa-zA-Z0-9\-_!@#№$%^&?*+=(){}[\]<>~]+$/)) {
            setPasswordError("Недопустимые символы");
            return false;
        }
        else if (password.length < 8 || password.length > 64) {
            setPasswordError("Длина пароля от 8 до 64 символов");
            return false;
        }
        else setPasswordError("");
        return true;
    }

    const getToken = async () => {
        const request = await axios.post("/account/login", {
            email,
            password
        });
        return request.data.token;
    };

    const tryLogin = async () => {
        const checkLoginEmail = checkEmail();
        const checkPasswordEmail = checkPassword();
        if (!checkLoginEmail || !checkPasswordEmail) return;

        try {
            loginRef.current.classList.add("disabled");
            const token = await getToken();
            localStorage.setItem("jwt", token);
            window.location.href = "/shedule";
        }
        catch (err) {
            loginRef.current.classList.remove("disabled");
            if (!err.response) {
                setFormError("Ошибка соединения");
            }
            else {
                setFormError("Неверные данные");
            }
        }
    }

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Вход</h1>
            <div className="card p-0 mx-auto my-4 reg w-75 bold">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="login">Почта</label>
                            <input tabIndex="1" type="text" className="form-control my-2" id="login" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkEmail} />
                        </div>
                        <p className="text-danger fw-bold">{emailError}</p>

                        <div className="col-12">
                            <label htmlFor="password">Пароль</label>
                            <input tabIndex="2" type="password" className="form-control my-2" id="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={checkPassword} />
                        </div>
                        <p className="text-danger fw-bold">{passwordError}</p>

                        <div className="col-12">
                            <Button variant="primary" onClick={tryLogin} ref={loginRef} className="mx-2">Войти</Button>
                            <Link to="/register">
                                <Button variant="secondary">Зарегистрироваться</Button>
                            </Link>
                        </div>
                        <p className="text-danger fw-bold">{formError}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;