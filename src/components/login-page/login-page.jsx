import './login-page.css';
import { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../SubmitButton';
import LinkButton from '../LinkButton';
import FormLayout from '../FormLayout';
import FormField from '../FormField';
import { validator, checkEmail, checkPassword } from '../../helpers/validation';
import { useZustandStore } from '../../shared/useZustandStore.js';
import { useZustandFormStore } from '../../shared/useZustandFormStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useZustandStore((store) => store.login);
    const formState = useZustandFormStore((store) => store.login);
    const setFormState = useZustandFormStore((store) => store.setLoginData);

    const loginRef = useRef();

    const validateEmail = validator(checkEmail, formState, setFormState, "email");
    const validatePassword = validator(checkPassword, formState, setFormState, "password");

    const tryLogin = async () => {
        setFormState("formError", "");
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
                setFormState("formError", "Ошибка соединения");
            }
            else {
                setFormState("formError", "Неверные данные");
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