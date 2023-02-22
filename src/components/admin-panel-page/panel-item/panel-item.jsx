import {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";

const
    TYPE_TEACHER = "TYPE_TEACHER",
    TYPE_LESSON = "TYPE_LESSON",
    TYPE_AUDIENCE = "TYPE_AUDIENCE",
    TYPE_GROUP = "TYPE_GROUP",
    TYPE_LESSON_TYPE = "TYPE_LESSON_TYPE";

const AdminPanelItem = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [inputText, setInputText] = useState(props.data.label);

    const onEditItem = () => {
        setIsEdit(true);
    }

    let onSubmitSaveItem = (e) => {
        e.preventDefault()
        console.log(e.target.elements.input.value)
        saveItem();
        setIsEdit(false);
    }

    let onDeleteItem = () => {};
    let saveItem = () => {};

    switch (props.type) {
        case TYPE_TEACHER:
            onDeleteItem = () => {
                console.log(TYPE_TEACHER)
            };
            saveItem = () => {
                console.log(TYPE_TEACHER)
            };
            break;
        case TYPE_LESSON:
            onDeleteItem = () => {
                console.log(TYPE_LESSON)
            };
            saveItem = () => {
                console.log(TYPE_LESSON)
            };
            break;
        case TYPE_AUDIENCE:
            onDeleteItem = () => {
                console.log(TYPE_AUDIENCE)
            };
            saveItem = () => {
                console.log(TYPE_AUDIENCE)
            };
            break;
        case TYPE_GROUP:
            onDeleteItem = () => {
                console.log(TYPE_GROUP)
            };
            saveItem = () => {
                console.log(TYPE_GROUP)
            };
            break;
        case TYPE_LESSON_TYPE:
            onDeleteItem = () => {
                console.log(TYPE_LESSON_TYPE)
            };
            saveItem = () => {
                console.log(TYPE_LESSON_TYPE)
            };
            break;
        default:
            break;
    }

    return (
        <Card>
            <Card.Body className={"card-body-admin d-flex"} style={{padding: "10px"}}>
                <Form onSubmit={onSubmitSaveItem} className={"col d-flex"}>
                    <div className={"col"}>
                        <Form.Control
                            value={inputText}
                            type="text"
                            disabled={isEdit ? null : "disabled"}
                            aria-describedby="fio"
                            size={"sm"}
                            name="input"
                            onChange={(e) => {
                                setInputText(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        {isEdit
                            ? <Button variant={"outline-primary"} type={"submit"} size={"sm"}
                                      className={"ms-2"}>Сохранить</Button>
                            : null
                        }
                    </div>
                </Form>
                <div>
                    {isEdit
                        ? null
                        : <Button variant={"outline-warning"} type={"button"} size={"sm"} className={"ms-2"}
                                  onClick={onEditItem}>Изменить</Button>
                    }
                    <Button variant={"outline-danger"} type={"button"} size={"sm"} className={"ms-2"}
                            onClick={onDeleteItem}>Удалить</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default AdminPanelItem;