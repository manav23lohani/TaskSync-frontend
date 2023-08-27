import { Badge, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Project({
  title,
  description,
  techstack,
  isOwner,
  projectId,
  onDelete,
}) {
  const navigate = useNavigate();
  const deleteProject = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/projects/${projectId}`,
        {
          headers,
        }
      );
      onDelete(projectId);
    } catch (err) {
      toast.warn(err.response.data.message);
    }
  };
  const updateProject = () => {
    navigate("/updateproject", { state: { projectId } });
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
        <Card.Subtitle className="mb-4 text-muted">{techstack}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        {isOwner && (
          <div>
            <Card.Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              // dont'pass project id here!
              onClick={updateProject}
            >
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