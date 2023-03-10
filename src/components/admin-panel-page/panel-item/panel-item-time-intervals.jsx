import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./panel-item.css";

const AdminPanelItemTimeIntervals = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputTextStart, setInputTextStart] = useState(props.data.startTime);
  const [inputTextEnd, setInputTextEnd] = useState(props.data.endTime);

  const onEditItem = () => {
    setIsEdit(true);
  };

  let onSubmitSaveItem = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await props.saveItem(props.data.id, inputTextStart, inputTextEnd);
      setIsEdit(false);
    } catch (err) {
      setIsEdit(true);
    }
    finally {
      setIsLoading(false)
    }
  };

  const onDeleteItem = () => {
    props.deleteItem(props.data.id);
  };

  return (
    <Card>
      <Card.Body className={"card-body-admin"} style={{ padding: "10px" }}>
        <div className="d-flex">
          <Form onSubmit={onSubmitSaveItem} className={"col d-flex"}>
            <div className={"col d-flex"}>
              <Form.Control
                value={inputTextStart}
                type="text"
                disabled={isEdit ? null : "disabled"}
                aria-describedby="fio"
                size={"sm"}
                className={"mx-1"}
                name="input"
                onChange={(e) => {
                  setInputTextStart(e.target.value);
                }}
              />
              <Form.Control
                  value={inputTextEnd}
                  type="text"
                  disabled={isEdit ? null : "disabled"}
                  aria-describedby="fio"
                  size={"sm"}
                  className={"mx-1"}
                  name="input"
                  onChange={(e) => {
                    setInputTextEnd(e.target.value);
                  }}
              />
            </div>
            <div>
              {isEdit ? (
                <Button
                  variant={"outline-primary"}
                  type={"submit"}
                  size={"sm"}
                  className={"ms-2"}
                >
                  ??????????????????
                </Button>
              ) : null}
            </div>
          </Form>
          <div>
            {isEdit ? null : (
              <Button
                variant={"outline-warning"}
                type={"button"}
                size={"sm"}
                className={"ms-2"}
                onClick={onEditItem}
              >
                ????????????????
              </Button>
            )}
            <Button
              variant={"outline-danger"}
              type={"button"}
              size={"sm"}
              className={"ms-2"}
              onClick={onDeleteItem}
            >
              ??????????????
            </Button>
          </div>
        </div>
        <div className="row">
          {
            isLoading ? <div className={"text-white"}>LOADING...</div> : null
          }
          <div className={"text-danger col"}>{props.err}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminPanelItemTimeIntervals;
