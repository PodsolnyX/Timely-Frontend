import { forwardRef } from "react";
import { Button } from "react-bootstrap";
const ProfileButton = ({ state, handler }, ref) => {
  return (
    <Button
      variant={state.edit ? "outline-success" : "outline-warning"}
      ref={ref}
      disabled={state.msg}
      type="submit"
      onClick={(e) => handler(e)}
      className={"mt-4"}
    >
      {state.edit ? "Сохранить" : "Править"}
    </Button>
  );
};

export default forwardRef(ProfileButton);
