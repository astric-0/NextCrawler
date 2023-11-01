import { Button, ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { weaverStates } from "@/lib/services";

const Bozos = ({ className }) => {
    const { 
        crawler,        
        sourceState, 
        callbacks, 
        contentModulePack 
    } = useContext(AppContext);

    const start = _ => {                
        crawler.source(sourceState, callbacks, contentModulePack.module, undefined);
        crawler.weave();
    }
    
    return (
        <ButtonGroup className={ className }>
            <Button variant="outline-primary" onClick={ start }>Start</Button>
        </ButtonGroup>
    );
}

Bozos.defaultProps = {
    className: 'w-100 mt-4',
}

export default Bozos