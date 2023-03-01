import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const LinkButton = ({link, text}) => {
    return (
        <Link to={link}>
            <Button variant="outline-secondary">{text}</Button>
        </Link>
    );
};

export default LinkButton;