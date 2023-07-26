import { Badge, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function Project({ title, description, techstack, isOwner, projectId }) {
  // console.log(projectId);
  const deleteProject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.delete(
        `http://localhost:5001/api/projects/${projectId}`,
        {
          headers,
        }
      );
      toast.success("Project deleted successfully");
      console.log(response);
    } catch (err) {
      toast.warn(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <Card>
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
            <Card.Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={deleteProject}
            >
              Delete
            </Card.Link>
            <Card.Link style={{ textDecoration: "none" }} href="#">
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
