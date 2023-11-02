import React, { useState } from "react";
import keywords from "./keywords";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";

const KeywordCard = _ => {    
    const [currentKeyword, setCurrentKeyword] = useState(keywords[0]);

    const keywordsBtnList = keywords.map((word, index) =>  (
            <Button 
                key={index}
                variant="outline-dark"
                onClick={_ => setCurrentKeyword(word)}
                active={currentKeyword.keyword == word.keyword}
            >                
                {word.title}
            </Button>
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
                <h5 className='h5 fw-bold'>{listTitle}</h5>
                <ListGroup as='ul'>{pointsList}</ListGroup>
            </div>
        );
    });

    return (
        <Card className='mt-4 shadow'>
            <Card.Header className="d-flex justify-content-between">
                <span className='h2'>Keywords</span>
                <ButtonGroup variant='dark' className='mt-2'>
                    {keywordsBtnList}
                </ButtonGroup>
            </Card.Header>
            <Card.Body>
                <Card.Title className="h3 fw-bold">{currentKeyword.title}</Card.Title>
                <Card.Text align='justify'>{currentKeyword.detail}</Card.Text>                
                {keywordPointsLists}                
            </Card.Body>
        </Card>
    );
}

export default KeywordCard;