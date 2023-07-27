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
  // console.log(projectId);
  const navigate = useNavigate();
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
      onDelete(projectId);
      console.log(response);
    } catch (err) {
      toast.warn(err.response.data.message);
      console.log(err);
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
        {isOwner && <Card.Subtitle className="mb-3 text-muted">Id: {projectId}</Card.Subtitle>}
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
