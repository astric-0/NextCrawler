import { Button, ButtonGroup } from "react-bootstrap";

const Bozos = ({ startCb, stopCb }) => {    
    return (
        <ButtonGroup>
            <Button variant="outline-primary" onClick={ startCb }>Start</Button>
            <Button variant="outline-primary" onClick={ stopCb }>Stop</Button>
        </ButtonGroup>
    );
}

export default Bozos