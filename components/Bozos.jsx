import { Button, ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const Bozos = _ => {
    const { crawler, setStarted, started, sourceState, callbacks, contentModulePack } = useContext(AppContext);    

    const start = _ => {
        setStarted(true);
        crawler.source(sourceState, callbacks, contentModulePack.module, undefined);
        crawler.weave();
    }

    const stop = _ => {
        setStarted(false);
        crawler.stop();
    }

    return (
        <ButtonGroup className="w-100 mt-4">
            { !started && <Button variant="outline-primary" onClick={ start }>Start</Button> }
            { started && <Button variant="outline-primary" onClick={ stop }>Stop</Button> }
        </ButtonGroup>
    );
}

export default Bozos