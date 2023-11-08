import React, { useState } from "react";
import keywords from "./keywords";
import { Card, Container, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

const KeywordCard = _ => {    
    const [currentKeyword, setCurrentKeyword] = useState(keywords[0]);

    const dropDownList = keywords.map((word, index) => (
            <Dropdown.Item 
                key={index}
                variant="dark"
                onClick={_ => setCurrentKeyword(word)}                
                active={currentKeyword.keyword == word.keyword}
            >                
                {word.title}
            </Dropdown.Item>
        )
    );
    
    const keywordPointsLists = currentKeyword.lists?.map(({ listTitle, keyPoints }, index) => {

        const pointsList = keyPoints?.map(({ itemTitle, itemDetail }, index) => (
            <ListGroup.Item as='li' className='bg-black text-light' key={index}>                
                <span className="fw-bold me-2">{itemTitle}:</span> 
                {itemDetail}                
            </ListGroup.Item>
        ));

        return (
            <div className='mt-2' key={index}>
                <h5 className='h5 fw-bold text-primary'>{listTitle}</h5>
                <ListGroup as='ul'>{pointsList}</ListGroup>
            </div>
        );
    });

    return (
        <Container className='mt-4 rounded p-3'>
            <Card.Header className="d-flex bg-transparent justify-content-between mb-3">
                <span className='h2 fw-bold text-primary'>Keywords</span>
                <DropdownButton 
                    variant='primary' 
                    className='mt-2'
                    title={currentKeyword.title}
                >
                    {dropDownList}
                </DropdownButton>
            </Card.Header>
            <div>
                <Card.Title className="h3 fw-bold text-primary">{currentKeyword.title}</Card.Title>
                <Card.Text align='justify'>{currentKeyword.detail}</Card.Text>                
                {keywordPointsLists}                
            </div>
        </Container>
    );
}

export default KeywordCard;