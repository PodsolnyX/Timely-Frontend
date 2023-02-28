import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import FormField from '../../FormField';
import FormPairField from '../../FormPairField';
import { useZustandStore } from '../../../shared/useZustandStore';
import { useZustandFormStore } from '../../../shared/useZustandFormStore';
import { validator, checkPassword, checkPasswordRepeat } from '../../../helpers/validation';
import FormLayout from "../../FormLayout";

const ProfilePassword = () => {
    const btnRef = useRef();
    const formState = useZustandFormStore((store) => store.changePassword);
    const setFormState = useZustandFormStore((store) => store.setChangePasswordData);
    const validateOldPassword = validator(checkPassword, formState, setFormState, "oldPassword");
    const validatePassword = validator(checkPassword, formState, setFormState, "newPassword");
    const validatePasswordRepeat = validator(checkPasswordRepeat, formState, setFormState, "newPasswordRepeat", "newPassword");

    const changePassword = useZustandStore((store) => store.changePassword);
    const tryChangePassword = async (e) => {
        e.preventDefault();
        setFormState("formMsg", {err: "", msg: ""});
        const checks = [validateOldPassword(), validatePassword(), validatePasswordRepeat()];
        for (let check of checks) {
            if (!check) return;
        }
        btnRef.current.classList.add("disabled");
        try {
            await changePassword(formState.oldPassword, formState.newPassword);
            setFormState("formMsg", {err: "", msg: "Пароль изменен!"})
        }
        catch (err) {
            btnRef.current.classList.remove("disabled");
            if (!err.response) {
                setFormState("formMsg", {err: "Ошибка. Попробуйте позже", msg: ""});
            }
            else {
                setFormState("formMsg", {err: "Неверный пароль", msg: ""});
            }
        }
    };
    return (
        <div className={"container schedule-page-container text-white"}>
            <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
                <h2 className={"text-white"}>Сменить пароль</h2>
                <hr style={{ color: "white" }} />
                <FormLayout>
                    <FormField
                        formId="oldPassword"
                        tabIndex="1"
                        formState={formState}
                        setFormState={setFormState}
                        disabled={formState.formMsg.msg}
                        validator={validateOldPassword}
                        label="Текущий пароль"
                        type="password"
                        placeholder="Введите текущий пароль"
                    />
                    <FormPairField
                        index="2"
                        formIds={["newPassword", "newPasswordRepeat"]}
                        formState={formState}
                        setFormState={setFormState}
                        disabled={formState.formMsg.msg}
                        validators={[validatePassword, validatePasswordRepeat]}
                        labels={["Новый пароль", "Новый пароль ещё раз"]}
                        type="password"
                        placeholders={["Введите новый пароль", "Введите новый пароль ещё раз"]}
                    />
                    
                    <Button variant={"outline-primary"}
                        type="submit"
                        onClick={tryChangePassword}
                        disabled={formState.formMsg.msg}
                        className={"mt-4"}
                        ref={btnRef}>
                        Сменить пароль
                    </Button>
                    <p className="text-danger fw-bold">{formState.formMsg.err}</p>
                    <p className="text-success fw-bold">{formState.formMsg.msg}</p>
                </FormLayout>
            </div>

        </div >
    )
}

export default ProfilePassword;