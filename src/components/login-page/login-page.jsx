import './login-page.css';
import { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import FormLayout from '../FormLayout';
import FormField from '../FormField';
import { validator, checkEmail, checkPassword } from '../../helpers/validation';
import { useZustandStore } from '../../shared/useZustandStore';

const LoginPage = () => {
    const storeLogin = useZustandStore((store) => store.login);
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
        try {
            await storeLogin(formState.email, formState.password);
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
            <Button
                type="submit"
                variant="primary"
                onClick={(event) => {
                    tryLogin();
                    event.preventDefault();
                }}
                ref={loginRef}
                className="mx-2">
                Войти
            </Button>
            <Link to="/register">
                <Button variant="secondary">Зарегистрироваться</Button>
            </Link>

            <p className="text-danger fw-bold">{formState.formError}</p>
        </FormLayout>
    );
}

export default LoginPage;