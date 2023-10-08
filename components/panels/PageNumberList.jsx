import React from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const PageNumberList = ({ variant, start, end, steps, current, max, setCurrent }) => {
    const n = ~~((end - start) / steps);    
    if (n == 0) return;
    
    let count = 0, btnList = [];
    for (let i = n; i > 0 && count < max; i--) {
        btnList.push(
            <ToggleButton
                key={i}
                type='radio'
                active={i==current}
                variant={'outline-' + variant}
            >
                {i}
            </ToggleButton>
        );
        count++;
    }

    return (
        <Container className='mb-3 fixed-bottom d-flex justify-content-center'>
            {end}<br/>
            {current}            
            <div>
                <span className='mx-2'>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </span>
                <ButtonGroup className='shadow'>
                    {btnList}
                </ButtonGroup>
                <span className='mx-2'>
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
    max: 5,
};

export default PageNumberList;