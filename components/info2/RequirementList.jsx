import Image from "next/image";
import { ListGroup, Card, Col, Container } from "react-bootstrap";
import requirements from "./requirements";

const RequirementsList = ({src}) => {
    const reqList = requirements?.map(({ title, detail, subList }, index) => {
      
        const subListComps = subList?.map(({itemTitle, itemDetail}, index) => (        
            <ListGroup.Item key={index} className="text-white bg-primary">
                <div className="ms-2 me-auto">
                    <div className="fw-bold text">{itemTitle}</div>
                    {itemDetail}
                </div>
            </ListGroup.Item>      
        ));

        return (
            <ListGroup.Item key={index} className="border-0">                
                <span className="fw-bold text-primary">{title}</span>
                <div>
                    {detail}
                    <ListGroup>{subListComps}</ListGroup>
                </div>
            </ListGroup.Item>
        );
    });

    return (
        <Container className='mt-4 d-flex justify-content-around'>
            <Col>            
                <Card.Header className="h3 text-primary bg-transparent fw-bold">Requirements and Overview</Card.Header>                
                <Card.Body className="requirements mt-2">
                    <ListGroup numbered>{reqList}</ListGroup>
                </Card.Body>            
            </Col>
            <Col xs={5}>
                <Image src={src} width={500} height={500} alt="Project" />
            </Col>
        </Container>
    );
}

export default RequirementsList;