import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from "../Components/Project";
import { Row, Col, Nav, Container, Navbar, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = ()=>{
    localStorage.clear();
    setLogin(0);
    toast.done("Logged out successfully");
    navigate('/signin');
  }
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
      setLogin(1);
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
    {login && (
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
              <Nav.Link href="#action1">New Project</Nav.Link>
              <Nav.Link href="#action2">Notifications</Nav.Link>
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="🔎 Search user"
                className="me-4"
                aria-label="Search"
              />
            </Form>
            </Nav>
            <Navbar.Brand className="ml-3 font-weight-bold">Welcome {user.name}</Navbar.Brand>
            <Button onClick={handleLogout} className="btn-secondary mr-3">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="justify-content-around">
        {data.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Project
              title={item.title}
              description={item.description}
              techstack={item.techStack}
            />
          </Col>
        ))}
      </Row>
      <ToastContainer/>
    </div>
    )}
    </>
  );
};

export default Dashboard;
