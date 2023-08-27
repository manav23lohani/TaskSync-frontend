import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from "./Project";
import Notifications from "./Notifications";
import { Row, Col, Nav, Container, Navbar, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useProjectContext } from "../Contexts/ProjectsContext";
import AddMember from "./AddMember";
import AddProject from "./AddProject";

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const [loading, setLoading] = useState(true);

  const { loggedIn, handleLogout } = useAuth();
  const { projects, setProjects } = useProjectContext();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    fetchData();
  }, [showNotifications, showAddProject]);
  
  const clickedLogout = () => {
    handleLogout();
    toast.info("Logged out successfully");
    navigate("/signin");
  };
  const handleProjectDeletion = (deletedProjectId) => {
    setProjects((data) =>
      data.filter((project) => project._id !== deletedProjectId)
    );
    toast.success("Project deleted successfully");
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/projects`,
        {
          headers,
        }
      );
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      // token is either expired/invalid or missing
      toast.info("Session expired! Please try again", {
        toastId: 'id1',
    });
      handleLogout();
      navigate("/signin");
    }
  };
  return (
    <>
      {loggedIn && (
        <div>
          <Navbar expand="lg" className="bg-body-tertiary mb-3 px-3">
            <Container fluid>
              <Navbar.Brand>TaskSync</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                  <Nav.Link onClick={() => setShowAddProject(!showAddProject)}>
                    New Project
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    Notifications
                  </Nav.Link>
                  <Nav.Link onClick={() => setShowAddMember(!showAddMember)}>
                    Add member
                  </Nav.Link>
                </Nav>
                <Navbar.Brand className="ml-3 font-weight-bold">
                  Welcome {user.name}
                </Navbar.Brand>
                <Button onClick={clickedLogout} className="btn-secondary mr-3">
                  Logout
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container className="my-4 mx-auto" style={{ maxWidth: "1200px" }}>
            {projects.length > 0 && (
              <Row>
                {projects.map((project) => (
                  <Col className="my-3" key={project.id} xs={12} sm={6} md={4} lg={4}>
                    <Project
                      title={project.title}
                      description={project.description}
                      techstack={project.techStack}
                      isOwner={project.user_id === user.id}
                      projectId={project._id}
                      onDelete={handleProjectDeletion}
                    />
                  </Col>
                ))}
              </Row>
            )}
            {!projects.length && !loading && (
              <div style={{ display: "flex" }}>
                <img
                  src="./home.jpg"
                  alt="Home"
                  style={{
                    width: "clamp(200px, 50%, 500px)",
                    maxWidth: "80vw",
                    alignContent: "center",
                    height: "auto",
                    maxHeight: "80vh",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(1rem, 4vw, 4rem)",
                    fontWeight: "800",
                    color: "rgba(0, 0, 0, .3)",
                    fontFamily: "Inter",
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  Add few projects to get started
                </span>
              </div>
            )}
            {showNotifications && (
              <Notifications
                show={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
            {showAddMember && (
              <AddMember
                show={showAddMember}
                onClose={() => setShowAddMember(false)}
              />
            )}
            {showAddProject && (
              <AddProject
                show={showAddProject}
                onClose={() => setShowAddProject(false)}
              />
            )}
          </Container>
          <ToastContainer />
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center mt-5 align-projects-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}
    </>
  );
};

export default Dashboard;
