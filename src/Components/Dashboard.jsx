import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from "./Project";
import Notifications from "./Notifications";
import { Row, Col, Nav, Container, Navbar, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';
import {useProjectContext} from '../Contexts/ProjectsContext';
import AddMember from "./AddMember";

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const [loading, setLoading] = useState(true);

  const { loggedIn, handleLogout } = useAuth();
  const { projects, setProjects } = useProjectContext();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    fetchData();
  }, [showNotifications]);
  const clickedLogout = ()=>{
    handleLogout();
    toast.done("Logged out successfully");
    navigate('/signin');
  }
  const handleProjectDeletion = (deletedProjectId) => {
    setProjects((data) => data.filter((project) => project._id !== deletedProjectId));
    toast.success("Project deleted successfully");
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/projects`, {
        headers,
      });
      // console.log(response);
      setProjects(response.data);
      setLoading(false);
    } 
    catch (err) {
      toast.warn("Please login first!", {
        toastId: 'id1',
    });
      navigate('/signin');
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
            <Nav
              className="me-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link onClick={()=>navigate('/addproject')}>New Project</Nav.Link>
              <Nav.Link onClick={()=>setShowNotifications(!showNotifications)}>Notifications</Nav.Link>
              <Nav.Link onClick={()=>setShowAddMember(!showAddMember)}>Add member</Nav.Link>
            </Nav>
            <Navbar.Brand className="ml-3 font-weight-bold">Welcome {user.name}
            </Navbar.Brand>
            <Button onClick={clickedLogout} className="btn-secondary mr-3">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       <Container className="my-4 mx-auto" style={{ maxWidth: "1200px" }}>
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
      {showNotifications && <Notifications show={showNotifications} onClose={() => setShowNotifications(false)} />}
      {showAddMember && <AddMember show={showAddMember} onClose={() => setShowAddMember(false)} />}
    </Container>
      <ToastContainer/>
    </div>
    )}
    {loading && (<div className="d-flex justify-content-center align-projects-center">
      <Spinner animation="border" role="status" />
      <span>Loading...</span>
    </div>)}
    </>
  );
};

export default Dashboard;