import './login-page.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../SubmitButton';
import LinkButton from '../LinkButton';
import FormLayout from '../FormLayout';
import FormField from '../FormField';
import { validator, checkEmail, checkPassword } from '../../helpers/validation';
import { useZustandStore } from '../../shared/useZustandStore.js';

const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("jwt")) navigate("/schedule");
    }, []);

    const login = useZustandStore((store) => store.login);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        formError: ""
    });

    const loginRef = useRef();

    const validateEmail = validator(checkEmail, formState, setFormState, "email");
    const validatePassword = validator(checkPassword, formState, setFormState, "password");

    const tryLogin = async () => {
        const checks = [validateEmail(), validatePassword()];
        if (!checks[0] || !checks[1]) return;

        loginRef.current.classList.add("disabled");
        try {
            await login(formState.email, formState.password);
            navigate("/schedule");
        } 
        catch (err) {
            loginRef.current.classList.remove("disabled");
            if (!err.response) {
                setFormState(state => ({ ...state, formError: "Ошибка соединения" }));
            }
            else {
                setFormState(state => ({ ...state, formError: "Неверные данные" }));
            }
        }
    }

    return (
        <FormLayout header="Вход">
            <FormField
                formId="email"
                tabIndex="1"
                formState={formState}
                setFormState={setFormState}
                validator={validateEmail}
                label="Почта"
                type="email"
                placeholder="Введите почту"
            />
            <FormField
                formId="password"
                tabIndex="2"
                formState={formState}
                setFormState={setFormState}
                validator={validatePassword}
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
            />
            <SubmitButton action={tryLogin} ref={loginRef} text="Войти"/>
            <LinkButton link="/register" text="Зарегистрироваться"/>

            <p className="text-danger fw-bold">{formState.formError}</p>
        </FormLayout>
    );
}

export default LoginPage;