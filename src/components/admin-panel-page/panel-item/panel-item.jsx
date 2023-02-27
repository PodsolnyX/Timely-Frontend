import {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import "./panel-item.css"

const AdminPanelItem = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [inputText, setInputText] = useState(props.data.label);

    const onEditItem = () => {
        setIsEdit(true);
    }

    let onSubmitSaveItem = (e) => {
        e.preventDefault()
        props.saveItem(props.data.value, e.target.elements.input.value);
        setIsEdit(false);
    }

    const onDeleteItem = () => {
        props.deleteItem(props.data.value)
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