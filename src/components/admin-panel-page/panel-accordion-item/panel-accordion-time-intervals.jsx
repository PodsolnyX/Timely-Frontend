import {Accordion, Button, Form} from "react-bootstrap";
import "./panel-accordion-item.css";

const PanelAccordionTimeIntervals = (props) => {
  let onSubmitSaveItem = (e) => {
    e.preventDefault();
    props.createItem(e.target.elements.inputStart.value, e.target.elements.inputEnd.value);
    e.target.elements.inputStart.value = "";
    e.target.elements.inputEnd.value = "";
  };

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.headerTitle}</Accordion.Header>
      <Accordion.Body className={""}>
        <Form onSubmit={onSubmitSaveItem} className={"d-flex"}>
          <Form.Control
            placeholder={"10:35:00"}
            type="text"
            aria-describedby="fio"
            className={"col mx-1"}
            style={{borderRadius : "5px"}}
            name={"inputStart"}
          />
          <Form.Control
              placeholder={"12:10:00"}
              type="text"
              aria-describedby="fio"
              className={"col mx-1"}
              style={{borderRadius : "5px"}}
              name={"inputEnd"}
          />
          <div className={"ms-3"}>
            <Button variant={"outline-primary"} type={"submit"}>
              Сохранить
            </Button>
          </div>
        </Form>
        <div className="col-12">
          <div className={"text-white ms-3"}>{props.err}</div>
        </div>
        <div className="col-12">
          <div className={"accordion-cards-container mt-3"}>
            {props.listItems}
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PanelAccordionTimeIntervals;
