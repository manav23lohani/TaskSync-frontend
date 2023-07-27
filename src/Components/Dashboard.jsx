import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from "../Components/Project";
import { Row, Col, Nav, Container, Navbar, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { loggedIn, handleLogout } = useAuth();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    fetchData();
  }, []);
  const clickedLogout = ()=>{
    handleLogout();
    toast.done("Logged out successfully");
    navigate('/signin');
  }
  const handleProjectDeletion = (deletedProjectId) => {
    setData((data) => data.filter((item) => item._id !== deletedProjectId));
    toast.success("Project deleted successfully");
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get("http://localhost:5001/api/projects", {
        headers,
      });
      // console.log(response);
      setData(response.data);
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
              <Nav.Link onClick={()=>navigate('/notifications')}>Notifications</Nav.Link>
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="🔎 Search user"
                className="me-4"
                aria-label="Search"
              />
            </Form>
            </Nav>
            <Navbar.Brand className="ml-3 font-weight-bold">Welcome {user.name}
            </Navbar.Brand>
            <Button onClick={clickedLogout} className="btn-secondary mr-3">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       <Container className="my-4 mx-auto" style={{ maxWidth: "1200px" }}>
      <Row>
        {data.map((item) => (
          <Col className="my-3" key={item.id} xs={12} sm={6} md={4} lg={4}>
            <Project
              title={item.title}
              description={item.description}
              techstack={item.techStack}
              isOwner={item.user_id === user.id}
              projectId={item._id}
              onDelete={handleProjectDeletion}
            />
          </Col>
        ))}
      </Row>
    </Container>
      <ToastContainer/>
    </div>
    )}
    </>
  );
};

export default Dashboard;
