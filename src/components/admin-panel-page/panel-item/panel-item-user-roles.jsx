import {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import "./panel-item.css";
import Select from "react-select";
import React from "react";
import makeAnimated from "react-select/animated";

const AdminPanelItemUserRoles = (props) => {
    const options = props.roles.map(item => ({label: item, value: item}))
    const defaultValue = props.data.roles.map(item => ({label: item, value: item}))

    const [isEdit, setIsEdit] = useState(false);
    const [inputRoles, setInputRoles] = useState(defaultValue);
    const animatedComponents = makeAnimated();

    const onEditItem = () => {
        setIsEdit(true);
    };

    const onChangeInput = (e) => {
        setInputRoles(e);
    }

    let onSubmitSaveItem = async (e) => {
        e.preventDefault();
        setIsEdit(false);
        try {
            const roles = inputRoles.map(r => r.value)
            await props.saveItem(props.data.email, roles);
            setIsEdit(false);
        } catch (err) {
            setIsEdit(true);
        }
    };

    return (
        <Card>
            <Card.Body className={"card-body-admin"} style={{padding: "10px"}}>
                <div className="d-flex flex-column">
                    <div className={"text-white mb-2"}>{props.data.fullName} | {props.data.email}</div>
                    <div className={"d-flex"}>
                        <Form onSubmit={onSubmitSaveItem} className={"col"}>
                            <div className={"col d-flex"}>
                                <Select
                                    defaultValue={defaultValue}
                                    isDisabled={isEdit ? null : "disabled"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={options}
                                    onChange={onChangeInput}
                                    className={"col"}
                                />
                                {isEdit
                                    ? <Button
                                        variant={"outline-primary"}
                                        type={"submit"}
                                        className={"ms-2 mb-2"}
                                    >
                                        Сохранить
                                    </Button>
                                    : null
                                }
                            </div>
                        </Form>
                        {isEdit
                            ? null
                            : <Button
                                variant={"outline-warning"}
                                type={"button"}
                                className={"ms-2 mb-2"}
                                onClick={onEditItem}
                            >
                                Изменить
                            </Button>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className={"text-white col"}>{props.err}</div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AdminPanelItemUserRoles;
