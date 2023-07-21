import Card from 'react-bootstrap/Card';

function Project({title, description,techstack}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{techstack}</Card.Subtitle>
        <Card.Text>
        {description}
        </Card.Text>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Project;