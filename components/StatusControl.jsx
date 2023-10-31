import React, { useContext, useEffect, useState } from "react";
import { faCircleDot, faCircle, faPlugCircleXmark, faSkullCrossbones, faRotateRight } from "@fortawesome/free-solid-svg-icons";
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
    },

    [weaverStates.reset]: {
        icon: faRotateRight,
        color: 'warning',
    }
}

const StatusControl = _ => {

    const { crawler, resetApp } = useContext(AppContext);
    const [currState, setCurrState] = useState(crawler.getState());    

    useEffect(_ => {
        if (currState != crawler.getState())
            setCurrState(crawler.getState());
    }, [crawler.getState()]);
    
    const StateBtn = ({ state, onClick, title, variant }) => {
        const { icon, color } = stateFaces[state];
        
        const handleCurrState = state => _ => {     
            crawler.setState(state);   
            setCurrState(state);
        }

        return (
            <Button 
                className={`rouneded-circle text-${color}`} 
                variant={variant ?? "outline"} 
                onClick={onClick ?? handleCurrState(state)} title={title}
            >
                <FontAwesomeIcon size="xl" icon={icon} />
            </Button>
        );
    }
    
    const KillSwitch = _ => {
        if([weaverStates.stop, weaverStates.inactive].includes(currState)) return <></>;
        return <StateBtn state={weaverStates.stop} title='Click to Kill Crawler' />;
    }

    const ResetSwitch = _ => {
        if (currState != weaverStates.stop) return <></>;
        return <StateBtn state={weaverStates.reset} title='Click to Reset App' onClick={resetApp} />
    }

    const PausePlay = _ => {
        if (currState == weaverStates.pause)
            return <StateBtn state={weaverStates.active} title='Click to Activate Crawler' />  
        if  (currState == weaverStates.active)
            return <StateBtn state={weaverStates.pause} title='Click to Pause Crawler' />
        return <></>;
    }

    const CrawlerStateIndicator = _ => {
        return <StateBtn state={currState} onClick={(_=>{})} title={`Current State is ${currState}`} />
    }

    return (
        <>
            <ButtonGroup className="rounded-pill shadow mx-2">
                { ResetSwitch() }
                { KillSwitch() }
                { PausePlay() }
            </ButtonGroup>
            <ButtonGroup className="shadow rounded-pill">
                { CrawlerStateIndicator() }            
            </ButtonGroup>
        </>
    );
}

export default StatusControl;