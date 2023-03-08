import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import FormField from '../../FormField';
import Field from "../../Field";
import { useZustandStore } from '../../../shared/useZustandStore';
import { useZustandFormStore } from '../../../shared/useZustandFormStore';
import { validator, checkFullName } from '../../../helpers/validation';
import FormLayout from "../../FormLayout";
import Select from "react-select";
import './profile-edit.css'
const ProfileEdit = () => {
    const customStyles = {
        singleValue: (styles) => {
            return {
                ...styles,
                color: "black"
            }
        },
        option: (styles) => {
            return {
                ...styles,
                color: "black"
            };
        },
    };
    const profile = useZustandStore(store => store.profile);

    const groups = useZustandStore(store => store.groups);
    const fullNameState = useZustandFormStore(store => store.fullName);
    const groupState = useZustandFormStore(store => store.group);
    const setFullNameState = useZustandFormStore(store => store.setFullNameData);
    const setGroupState = useZustandFormStore(store => store.setGroupData);
    useEffect(() => {
        if (!fullNameState.fullName) {
            setFullNameState({
                fullName: profile.fullName
            })
        }
        if (!groupState.groupId) {
            setGroupState({
                groupId: profile.group?.id,
                groupName: profile.group?.name
            })
        }
    }, [])
    const validateFullName = validator(checkFullName, fullNameState, (k, v) => setFullNameState({ [k]: v }), "fullName");
    const changeFullName = useZustandStore(store => store.editProfile);
    const changeGroup = useZustandStore(store => store.setGroup);
    const removeGroup = useZustandStore(store => store.removeGroup);
    const fullNameBtnRef = useRef();
    const groupBtnRef = useRef();
    const tryChangeFullName = async (event) => {
        event.preventDefault();
        if (!fullNameState.edit) {
            setFullNameState({ edit: true })
            return;
        }
        setFullNameState({ err: "", msg: "" });
        if (!validateFullName()) return;
        fullNameBtnRef.current.classList.add("disabled");
        try {
            await changeFullName(fullNameState.fullName);
            setFullNameState({ err: "", msg: "Успешно!" })
        }
        catch (err) {
            fullNameBtnRef.current.classList.remove("disabled");
            if (!err.response) {
                setFullNameState({ err: "Ошибка соединения", msg: "" });
            }
            else {
                setFullNameState({ err: "Неизвестная ошибка", msg: "" });
            }
        }
    }
    const tryChangeGroup = async (event) => {
        event.preventDefault();
        if (!groupState.edit) {
            setGroupState({ edit: true })
            return;
        }
        setGroupState({ err: "", msg: "" });
        groupBtnRef.current.classList.add("disabled");
        try {
            if (groupState.groupId === "group-none") await removeGroup();
            else await changeGroup(groupState.groupId);
            setGroupState({ err: "", msg: "Успешно!" })
        }
        catch (err) {
            groupBtnRef.current.classList.remove("disabled");
            if (!err.response) {
                setGroupState({ err: "Ошибка соединения", msg: "" });
            }
            else {
                setGroupState({ err: "Неизвестная ошибка", msg: "" });
            }
        }
    }
    return (
        <div className={"container schedule-page-container text-white"}>
            <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
                <h2 className={"text-white"}>Данные</h2>
                <hr style={{ color: "white" }} />
                <FormLayout header={"ФИО"}>
                    <FormField
                        tabIndex="1"
                        formId="fullName"
                        formState={fullNameState}
                        setFormState={(k, v) => setFullNameState({ [k]: v })}
                        validator={validateFullName}
                        label="ФИО"
                        disabled={!fullNameState.edit || fullNameState.msg}
                        type="text"
                        placeholder="Введите ФИО"
                    />
                    <Button variant={fullNameState.edit ? "outline-success" : "outline-warning"}
                        ref={fullNameBtnRef}
                        disabled={fullNameState.msg}
                        type="submit"
                        onClick={(e) => tryChangeFullName(e)}
                        className={"mt-4"}>
                        {fullNameState.edit ? "Сохранить" : "Править"}
                    </Button>
                    <p className="text-danger fw-bold">{fullNameState.err}</p>
                    <p className="text-success fw-bold">{fullNameState.msg}</p>
                </FormLayout>
                {
                    profile.roles?.includes("Student") &&
                    <FormLayout header={"Группа"}>
                        <Select options={[{ label: "Не выбрано", value: "group-none" }, ...groups]}
                            styles={customStyles}
                            isDisabled={!groupState.edit || groupState.msg}
                            value={groupState.groupId ? { value: groupState.groupId, label: groupState.groupName } : { value: "group-none", label: "Не выбрано" }}
                            onChange={(e) => setGroupState({ groupId: e.value, groupName: e.label })}
                            placeholder="Выберите группу" />
                        <Button variant={groupState.edit ? "outline-success" : "outline-warning"}
                            ref={groupBtnRef}
                            disabled={groupState.msg}
                            type="submit"
                            onClick={(e) => tryChangeGroup(e)}
                            className={"mt-4"}>
                            {groupState.edit ? "Сохранить" : "Править"}
                        </Button>
                        <p className="text-danger fw-bold">{groupState.err}</p>
                        <p className="text-success fw-bold">{groupState.msg}</p>
                    </FormLayout>
                }
                <FormLayout header={"Другое"}>
                    <h5>Здесь приведены данные, которые Вы не можете править</h5>
                    <Field
                        label="Полный логин"
                        type="text"
                        value={profile.userName}
                    />
                    <Field
                        label="Почта"
                        type="text"
                        value={profile.email}
                    />
                    <Field
                        label="Статус"
                        type="text"
                        value={profile.isEmailConfirmed ? "Подтвержден" : "Не подтвержден"}
                    />
                    <Field
                        label="Преподаватель"
                        type="text"
                        value={profile.teacher ? "Да" : "Нет"}
                    />
                    <Field
                        label="Роли"
                        type="text"
                        value={profile.roles?.length ? profile.roles.join(", ") : "Нет"}
                    />
                </FormLayout>
            </div>

        </div >
    )
}

export default ProfileEdit;