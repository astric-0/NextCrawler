import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const PageNumberList = ({ variant, start, end, current, setCurrent, max, refresh, children }) => {  
    const btnList = [];
    const [window, setWindow] = useState({ left: end, right: end - max })
    
    useEffect(_ => {
        setWindow({ left: end, right: end - max })
    }, [refresh()])

    for (let i = window.left; i > start && i > window.right; i--) {
        btnList.push(
            <ToggleButton
                key={i}
                type='radio'
                active={i==current}
                variant={'outline-' + variant}
                onClick={_ => { setCurrent(i); }}
            >
                {i}
            </ToggleButton>
        );                
    }
 
    if (end == 0) return <></>;

    const shiftLeft = _ => {
        window.left = window.left + max > end ? end : window.left + max;
        window.right = window.left - max;
        setWindow({ ...window });
    }

    const shiftRight = _ => {
        window.left = window.left - max < start + max ? start + max > end ? end : start + max : window.left - max;
        window.right = window.left - max;
        setWindow({ ...window });
    }

    return (
        <Container className='mb-3 fixed-bottom d-flex justify-content-center'>
            <div>
                {children}
                <span className='mx-2' onClick={shiftLeft}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </span>
                <ButtonGroup className='shadow'>
                    {btnList}
                </ButtonGroup>
                <span className='mx-2' onClick={shiftRight}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </span>
            </div>
        </Container>
    );
}

PageNumberList.defaultProps = {
    variant: 'primary',
    start: 0,
    end: 0,
    steps: 10,
    current: 0,
    setCurrent: _ => {},
    max: 10,
    refresh: _ => {}
};

export default PageNumberList;