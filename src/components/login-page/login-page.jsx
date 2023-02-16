import './login-page.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        formError: ""
    });

    const loginRef = useRef();
    const navigate = useNavigate();

    const checkEmail = () => {
        if (!formState.email.match(/^\S+@\S+\.\S+$/)) {
            setFormState(state => ({ ...state, emailError: "Некорректный email" }));
            return false;
        }
        else setFormState(state => ({ ...state, emailError: "" }));
        return true;
    }

    const checkPassword = () => {
        const password = formState.password;
        if (password.length && !password.match(/^[а-яА-ЯёЁa-zA-Z0-9\-_!@#№$%^&?*+=(){}[\]<>~]+$/)) {
            setFormState(state => ({ ...state, passwordError: "Недопустимые символы" }));
            return false;
        }
        else if (password.length < 8 || password.length > 64) {
            setFormState(state => ({ ...state, passwordError: "Длина пароля от 8 до 64 символов" }));
            return false;
        }
        else setFormState(state => ({ ...state, passwordError: "" }));
        return true;
    }

    const getToken = async () => {
        const request = await axios.post("/account/login", {
            email: formState.email,
            password: formState.password
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
            navigate("/shedule");
        }
        catch (err) {
            loginRef.current.classList.remove("disabled");
            if (!err.response) {
                setFormState(state => ({ ...state, formError: "Ошибка соединения" }))
            }
            else {
                setFormState(state => ({ ...state, formError: "Неверные данные" }))
            }
        }
    }

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Вход</h1>
            <div className="card p-0 mx-auto my-4 reg w-75 bold">
                <div className="card-body">
                    <div className="row">
                        <form>
                            <div className="col-12">
                                <label htmlFor="email">Почта</label>
                                <input
                                    tabIndex="1"
                                    type="email"
                                    className={formState.emailError ? "form-control my-2 is-invalid" : "form-control my-2"}
                                    id="email"
                                    placeholder="Введите почту"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onBlur={checkEmail} />
                            </div>
                            <p className="text-danger fw-bold">{formState.emailError}</p>

                            <div className="col-12">
                                <label htmlFor="password">Пароль</label>
                                <input
                                    tabIndex="2"
                                    type="password"
                                    className={formState.passwordError ? "form-control my-2 is-invalid" : "form-control my-2"}
                                    id="password"
                                    placeholder="Введите пароль"
                                    value={formState.password}
                                    onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                    onBlur={checkPassword} />
                            </div>
                            <p className="text-danger fw-bold">{formState.passwordError}</p>

                            <div className="col-12">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        tryLogin();
                                    }}
                                    ref={loginRef}
                                    className="mx-2">
                                    Войти
                                </Button>
                                <Link to="/register">
                                    <Button variant="secondary">Зарегистрироваться</Button>
                                </Link>
                            </div>
                            <p className="text-danger fw-bold">{formState.formError}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;