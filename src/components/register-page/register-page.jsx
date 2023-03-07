import './register-page.css';
import {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import FormLayout from '../FormLayout';
import FormField from '../FormField';
import FormPairField from '../FormPairField';
import SubmitButton from '../SubmitButton';
import LinkButton from "../LinkButton";
import {useZustandStore} from '../../shared/useZustandStore.js';
import {useZustandFormStore} from '../../shared/useZustandFormStore';
import {validator, checkEmail, checkPassword, checkPasswordRepeat, checkFullName} from '../../helpers/validation';
import {Container} from "react-bootstrap";

const RegisterPage = () => {
    const formState = useZustandFormStore(store => store.register);
    const setFormState = useZustandFormStore(store => store.setRegisterData);
    const getProfile = useZustandStore(store => store.getProfile);

    const regRef = useRef();
    const navigate = useNavigate();

    const validateEmail = validator(checkEmail, formState, setFormState, "email");
    const validatePassword = validator(checkPassword, formState, setFormState, "password");
    const validatePasswordRepeat = validator(checkPasswordRepeat, formState, setFormState, "passwordRepeat", "password");
    const validateFullName = validator(checkFullName, formState, setFormState, "fullName");

    const register = useZustandStore((store) => store.register);
    const tryRegister = async () => {
        setFormState("formError", "");
        const checks = [validateEmail(), validateFullName(), validatePassword(), validatePasswordRepeat()];
        for (let check of checks) {
            if (!check) return;
        }
        regRef.current.classList.add("disabled");
        try {
            await register(
                formState.email,
                formState.password,
                formState.fullName
            );
            await getProfile();
            navigate("/");
        } catch (err) {
            regRef.current.classList.remove("disabled");
            if (!err.response || err.response.status !== 409) {
                setFormState("formError", "Ошибка. Попробуйте позже");
            } else {
                setFormState("formError", "Такой пользователь уже есть!");
            }
        }
    };

    return (
        <Container className={"mt-3 col-12 col-lg-6"}>
            <FormLayout header="Регистрация">
                <FormField
                    tabIndex="1"
                    formId="email"
                    formState={formState}
                    setFormState={setFormState}
                    validator={validateEmail}
                    label="Почта"
                    type="email"
                    placeholder="Введите почту"
                />
                <FormField
                    tabIndex="2"
                    formId="fullName"
                    formState={formState}
                    setFormState={setFormState}
                    validator={validateFullName}
                    label="ФИО"
                    type="text"
                    placeholder="Введите ФИО"
                />
                <FormPairField
                    index="5"
                    formIds={["password", "passwordRepeat"]}
                    formState={formState}
                    setFormState={setFormState}
                    validators={[validatePassword, validatePasswordRepeat]}
                    labels={["Пароль", "Пароль ещё раз"]}
                    type="password"
                    placeholders={["Введите пароль", "Введите пароль ещё раз"]}
                />
                <div className={"mt-4"}>
                    <SubmitButton action={tryRegister} ref={regRef} text="Регистрация"/>
                    <LinkButton link="/login" text="Войти"/>
                </div>

                <div className="text-danger fw-bold mt-2 small">{formState.formError}</div>
            </FormLayout>
        </Container>
    );
}

export default RegisterPage;