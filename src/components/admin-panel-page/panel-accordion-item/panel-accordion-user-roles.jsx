import {Accordion} from "react-bootstrap";
import "./panel-accordion-item.css";
import React from "react";

const PanelAccordionUserRoles = (props) => {

  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.headerTitle}</Accordion.Header>
      <Accordion.Body>
        <div className="col-12">
          <div className={"accordion-cards-container mt-3"}>
            {props.listItems}
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PanelAccordionUserRoles;
