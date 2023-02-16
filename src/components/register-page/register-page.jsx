import { useState, useRef, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import './register-page.css';
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formState, setFormState] = useState({
        fullName: "",
        group: "none",
        email: "",
        password: "",
        passwordRepeat: "",
        role: "student",
        fullNameError: "",
        emailError: "",
        passwordError: "",
        passwordRepeatError: ""
    });

    const [groups, setGroups] = useState(["Загрузка"]); 


    useEffect(() => {
        const getGroups = async () => {
            const a = await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
            return ["1", "2", "3", "4", "5"];
            const request = await axios.get("/search/group");
            return request.data.groups;
        };

        getGroups().then((value) => setGroups(value));
    }, []);

    const regRef = useRef();
    const navigate = useNavigate();

    const tryRegister = async () => {
        const checks = [checkEmail(), checkFullName(), checkPassword(), checkPasswordRepeat()];
        for (let i = 0; i < checks.length; ++i) {
            if (!checks[i]) return;
        }
        try {
            regRef.current.classList.add("disabled");
            const token = await getToken();
            localStorage.setItem("jwt", token);
            navigate("/shedule");
        }
        catch (err) {
            regRef.current.classList.remove("disabled");
            setFormState(state => ({ ...state, formError: "Ошибка. Попробуйте позже" }))
        }
    };

    const checkEmail = () => {
        if (!formState.email.match(/^\S+@\S+\.\S+$/)) {
            setFormState(state => ({ ...state, emailError: "Некорректный email" }));
            return false;
        }
        else setFormState(state => ({ ...state, emailError: "" }));
        return true;
    }

    const checkFullName = () => {
        const fullName = formState.fullName;
        if (fullName.length && !fullName.match(/^[а-яА-ЯёЁa-zA-Z\-_ ]+$/)) {
            setFormState(state => ({ ...state, fullNameError: "Недопустимые символы" }));
            return false;
        }
        else if (fullName.length < 5 || fullName.length > 128) {
            setFormState(state => ({ ...state, fullNameError: "Длина имени от 5 до 128 символов" }));
            return false;
        }
        else setFormState(state => ({ ...state, fullNameError: "" }));
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

    const checkPasswordRepeat = () => {
        if (formState.passwordRepeat != formState.password) {
            setFormState(state => ({ ...state, passwordRepeatError: "Пароли не совпадают" }));
            return false;
        }
        else setFormState(state => ({ ...state, passwordRepeatError: "" }));
        return true;
    }

    const getToken = async () => {
        const request = await axios.post("/account/register", {
            fullName: formState.fullName,
            group: formState.group,
            email: formState.email,
            password: formState.password,
            role: formState.role,
        });
        return request.data.token;
    };

   

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Регистрация</h1>
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
                                <label htmlFor="fullName">Имя</label>
                                <input
                                    tabIndex="2"
                                    type="text"
                                    className={formState.fullNameError ? "form-control my-2 is-invalid" : "form-control my-2"}
                                    id="fullName"
                                    placeholder="Введите имя"
                                    value={formState.fullName}
                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                    onBlur={checkFullName} />
                            </div>
                            <p className="text-danger fw-bold">{formState.fullNameError}</p>

                            <div className="col-12">
                                <label htmlFor="role">Роль</label>
                                <select tabIndex="3" className="form-select form-select my-2" id="role" defaultValue={formState.role} onChange={(e) => setFormState({...formState, role: e.target.value})}>
                                    <option value="student">Студент</option>
                                    <option value="teacher">Преподаватель</option>
                                </select>
                            </div>

                            <div className="col-12" hidden={ formState.role == "teacher" }>
                                <label htmlFor="group">Группа</label>
                                <select tabIndex="4" className="form-select form-select my-2" id="group" defaultValue={formState.group} onChange={(e) => setFormState({...formState, group: e.target.value})}>
                                    <option value="none">Не указана</option>
                                    {groups.map((group, i) => <option value={group} key={i}>{group}</option>)}
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="password">Пароль</label>
                                <input
                                    tabIndex="5"
                                    type="password"
                                    className={formState.passwordError || formState.passwordRepeatError ? "form-control my-2 is-invalid" : "form-control my-2"}
                                    id="password"
                                    placeholder="Введите пароль"
                                    value={formState.password}
                                    onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                    onBlur={checkPassword} />
                            </div>
                            <p className="text-danger fw-bold">{formState.passwordError}</p>

                            <div className="col-12">
                                <label htmlFor="passwordRepeat">Повторите пароль</label>
                                <input
                                    tabIndex="6"
                                    type="password"
                                    className={formState.passwordError || formState.passwordRepeatError ? "form-control my-2 is-invalid" : "form-control my-2"}
                                    id="passwordRepeat"
                                    placeholder="Повторите пароль"
                                    value={formState.passwordRepeat}
                                    onChange={(e) => setFormState({ ...formState, passwordRepeat: e.target.value })}
                                    onBlur={checkPasswordRepeat} />
                            </div>
                            <p className="text-danger fw-bold">{formState.passwordRepeatError}</p>


                            <div className="col-12">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        tryRegister();
                                    }}
                                    ref={regRef}
                                    className="mx-2">
                                    Зарегистрироваться
                                </Button>
                                <Link to="/register">
                                    <Button variant="secondary">Войти</Button>
                                </Link>
                            </div>
                            <p className="text-danger fw-bold">{formState.formError}</p>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default RegisterPage;