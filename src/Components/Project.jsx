import { Badge, Card } from "react-bootstrap";

function Project({ title, description, techstack, isOwner }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{title}</Card.Title>
          <Badge pill bg={isOwner ? "primary" : "secondary"}>
            {isOwner ? "Owner" : "Member"}
          </Badge>
        </div>
        <Card.Subtitle className="mb-2 text-muted">{techstack}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        {isOwner && (
          <div>
            <Card.Link style={{ textDecoration: "none" }} href="#">
              Update
            </Card.Link>
            <Card.Link style={{ textDecoration: "none" }} href="#">
              Delete
            </Card.Link>
            <Card.Link style={{ textDecoration: 'none' }} href="#">
               View
            </Card.Link>
          </div>
        )}
        {!isOwner && (
          <div>
            <Card.Link style={{ textDecoration: "none" }} href="#">
              View
            </Card.Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Project;
