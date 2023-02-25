import {Accordion, Button, Form} from "react-bootstrap";
import "./panel-accordion-item.css"

const PanelAccordionItem = (props) => {

    let onSubmitSaveItem = (e) => {
        e.preventDefault();
        console.log(e.target.elements.input.value)
        props.saveItem();
    }

    return (
        <Accordion.Item eventKey={props.eventKey}>
            <Accordion.Header>{props.headerTitle}</Accordion.Header>
            <Accordion.Body className={""}>
                <Form onSubmit={onSubmitSaveItem} className={"d-flex"}>
                    <Form.Control
                        placeholder={props.placeholder}
                        type="text"
                        aria-describedby="fio"
                        className={"col"}
                        name={"input"}
                    />
                    <div className={"ms-3"}>
                        <Button variant={"outline-primary"} type={"submit"}>Сохранить</Button>
                    </div>
                </Form>
                <div className={"accordion-cards-container mt-3"}>
                    {props.listItems}
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default PanelAccordionItem