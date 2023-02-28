import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useZustandStore } from '../../../shared/useZustandStore.js';
import { useZustandFormStore } from "../../../shared/useZustandFormStore.js";
const ProfileConfirm = () => {
    const sendEmailRequest = useZustandStore(store => store.sendEmail);
    const data = useZustandStore(store => store.profile);
    const state = useZustandFormStore(store => store.confirm);
    const setState = useZustandFormStore(store => store.setConfirmData);
    const variant = () => {
        if (state.sent) return "outline-success";
        if (state.err) return "outline-danger";
        return "outline-primary";
    }
    
    const sendEmail = async () => {
        setState({
            msg: "Отправка",
            sent: false,
            err: false
        });
        try {
            await sendEmailRequest();
            setState({
                msg: "Письмо отправлено",
                sent: true,
                err: false
            })
        }
        catch {
            setState({
                msg: "Попробуйте позже!",
                sent: false,
                err: true
            })
        }
    }
//location.state.confirmed
if (!data) return <h1>Загрузка</h1>
    return (
        <div className={"container schedule-page-container text-white"}>
            <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
                <h2 className={"text-white"}>Подтверждение почты</h2>
                <hr style={{ color: "white" }} />
                <div className={"mt-4 text-white"}>
                    {
                        data.isEmailConfirmed ?
                            <>
                                <h5>Поздравляем!</h5>
                                <p>Ваш электронный почтовый адрес: {data.email} успешно подтвержден ✔️. Никаких дополнительных действий не требуется. </p>
                            </>
                            :
                            <>
                                <h5>Требуется подтверждение!</h5>
                                <p>
                                    При регистрации аккаунта на электронную почту {data.email} было выслано письмо с подтверждением, в котором необходимо перейти по ссылке.
                                    Если Вы не видите письма, проверьте папку «Спам».
                                </p>
                                <p>Не получили письмо? Попробуйте отправить ссылку ещё раз.</p>
                                <Button variant={variant()}
                                    type="submit"
                                    disabled={state.sent || state.err}
                                    onClick={sendEmail}
                                    className={"mt-4"}>
                                    {state.msg}
                                </Button>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default ProfileConfirm;