import { Button, ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const Bozos = _ => {
    const { crawler } = useContext(AppContext);
    return (
        <ButtonGroup className="w-100 mt-4">
            <Button variant="outline-primary" onClick={ _ => crawler.weave() }>Start</Button>
            <Button variant="outline-primary" onClick={ _ => crawler.stop() }>Stop</Button>
        </ButtonGroup>
    );
}

export default Bozos