import React, { useContext, useEffect, useState } from "react";
import { faCircleDot, faCircle, faPlugCircleXmark, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "@/context/AppContext";
import { weaverStates } from "@/lib/services";
import { Button, ButtonGroup } from "react-bootstrap";

const stateFaces = {
    [weaverStates.active]: {
        icon: faCircleDot,
        color: 'success',
    },

    [weaverStates.pause]: {
        icon: faCircle,
        color: 'warning',
    },

    [weaverStates.inactive]: {
        icon: faPlugCircleXmark,
        color: 'danger',
    },

    [weaverStates.stop]: {
        icon: faSkullCrossbones,
        color: 'danger',
    }
}

const StatusControl = _ => {

    const { started, crawler } = useContext(AppContext);
    const [currState, setCurrState] = useState(crawler.getState());    

    useEffect(_ => {
        if (currState != crawler.getState())
            setCurrState(crawler.getState());
    }, [crawler.getState()]);

    const handleCurrState = state => _ => {     
        crawler.setState(state);   
        setCurrState(state);
    }

    const StateBtn = ({ state, noClick, title, variant }) => {
        const { icon, color } = stateFaces[state];
        return (
            <Button className={`rouneded-circle text-${color}`} variant={ variant ?? "outline" } onClick={ noClick ? _=>{} : handleCurrState(state)} title={title}>
                <FontAwesomeIcon size="xl" icon={icon} />
            </Button>
        );
    }
    
    return (
        <>
            <ButtonGroup className="rounded-pill shadow mx-2">
                { 
                    currState != weaverStates.stop && currState != weaverStates.inactive && 
                    <StateBtn state={weaverStates.stop} title='Click to Kill Crawler' />
                }
                { 
                    currState == weaverStates.pause 
                    ?
                        <StateBtn state={weaverStates.active} title='Click to Activate Crawler' />
                    :   
                        currState != weaverStates.stop && currState != weaverStates.inactive && 
                        <StateBtn state={weaverStates.pause} title='Click to Pause Crawler' />
                }
            </ButtonGroup>
            <ButtonGroup className="shadow rounded-pill">
            <StateBtn state={currState} noClick={true} title={`Current State is ${currState}`} />
            </ButtonGroup>
        </>
    );
}

export default StatusControl;