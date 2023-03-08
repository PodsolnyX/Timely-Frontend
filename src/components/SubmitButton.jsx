import Button from "react-bootstrap/Button";
import { forwardRef } from 'react';
const SubmitButton = forwardRef((props, ref) => {
    return (
        <Button
            type="submit"
            variant="outline-primary"
            onClick={(event) => {
                event.preventDefault();
                props.action();
            }}
            ref={ref}
            className="me-2"
        >
            {props.text}
        </Button>
    );
});

export default SubmitButton;