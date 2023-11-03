import { ListGroup, Card } from "react-bootstrap";
import requirements from "./requirements";

const RequirementsList = _ => {
    const reqList = requirements?.map(({ title, detail, subList }, index) => {
        
        const subListComps = subList?.map(({itemTitle, itemDetail}, index) => {
            return (
                <ListGroup.Item key={index} className="text-white bg-primary">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{itemTitle}</div>
                        {itemDetail}
                    </div>
                </ListGroup.Item>
            );
        });

        return (
            <ListGroup.Item key={index}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold text-primary">{title}</div>
                    {detail}
                    <ListGroup>{subListComps}</ListGroup>
                </div>
            </ListGroup.Item>
        );
    });

    return (
        <Card className="mt-3 shadow requirements">
            <Card.Header className="h5 text-primary">Requirements and Overview</Card.Header>
            <ListGroup>{reqList}</ListGroup>
        </Card>
    );
}

export default RequirementsList;