import './register-page.css';
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import FormLayout from '../FormLayout';
import FormField from '../FormField';
import FormPairField from '../FormPairField';
import FormSelect from '../FormSelect';
import SubmitButton from '../SubmitButton';
import LinkButton from "../LinkButton";
import { useZustandStore } from '../../shared/useZustandStore.js';
import { useZustandFormStore } from '../../shared/useZustandFormStore';
import { validator, checkEmail, checkPassword, checkPasswordRepeat, checkFullName } from '../../helpers/validation';

const RegisterPage = () => {
    const formState = useZustandFormStore((store) => store.register);
    const setFormState = useZustandFormStore((store) => store.setRegisterData);
    const roleOptions = [{ value: "student", name: "Студент" }, { value: "teacher", name: "Преподаватель" }];

    const regRef = useRef();
    const navigate = useNavigate();

    const validateEmail = validator(checkEmail, formState, setFormState, "email");
    const validatePassword = validator(checkPassword, formState, setFormState, "password");
    const validatePasswordRepeat = validator(checkPasswordRepeat, formState, setFormState, "passwordRepeat", "password");
    const validateFullName = validator(checkFullName, formState, setFormState, "fullName");

    const register = useZustandStore((store) => store.register);
    const tryRegister = async () => {
        const checks = [validateEmail(), validateFullName(), validatePassword(), validatePasswordRepeat()];
        for (let check of checks) {
            if (!check) return;
        }
        regRef.current.classList.add("disabled");
        try {
            const token = await register(
                formState.email,
                formState.password,
                formState.fullName,
                formState.role
            );
            localStorage.setItem("jwt", token);
            navigate("/shedule");
        }
        catch (err) {
            regRef.current.classList.remove("disabled");
            if (!err.response || err.response.status != 409) {
                setFormState("formError", "Ошибка. Попробуйте позже");
            }
            else {
                setFormState("formError", "Такой пользователь уже есть!");
            }
        }
    };

    return (
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
            <FormSelect
                tabIndex="3"
                formId="role"
                label="Роль"
                defaultValue={formState.role}
                onChange={(e) => setFormState("role", e.target.value)}
                options={roleOptions}
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
            <SubmitButton action={tryRegister} ref={regRef} text="Зарегистрироваться" />
            <LinkButton link="/login" text="Войти" />

            <p className="text-danger fw-bold">{formState.formError}</p>
        </FormLayout>
    );
}

export default RegisterPage;