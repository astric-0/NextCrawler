import React from 'react';
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const PageNumberList = ({ variant, start, end, steps, current, max }) => {
    const n = (end - start) / steps;
    console.log(n, end, start, steps);
    const btnList = [];

    for (let i = 0; i < n && i < max; i++) {
        btnList.push(
            <ToggleButton
                key={i}
                type='radio'
                variant={'outline-' + variant}
            >
                {i}
            </ToggleButton>
        );
    }

    return (
        <Container className='mb-3 fixed-bottom d-flex justify-content-center'>
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
    current: 10,
    max: 5,
};

export default PageNumberList;