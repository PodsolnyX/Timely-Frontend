import Button from "react-bootstrap/Button";
import { forwardRef } from 'react';
const SubmitButton = forwardRef((props, ref) => {
    return (
        <Button
            type="submit"
            variant="primary"
            onClick={(event) => {
                event.preventDefault();
                props.action();
            }}
            ref={ref}
            className="mx-2"
        >
            {props.text}
        </Button>
    );
});

export default SubmitButton;