import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from '../Components/Project';
import { Row, Col, Nav, Container, Navbar, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
      const response = await axios.get('http://localhost:5001/api/projects',{headers});
      // console.log(response);
      setData(response.data);
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">TaskSync</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">New Project</Nav.Link>
            <Nav.Link href="#action2">Notifications</Nav.Link>
          </Nav>
          
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="🔎 Find a user"
          className="me-5"
          aria-label="Search"
        />
      </Form>
      <FontAwesomeIcon className = "me-2" icon={faUser} size='2x'/>      
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Row className='justify-content-around'>
        {data.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Project title={item.title} description={item.description} techstack={item.techStack} />
          </Col>
        ))}
      </Row>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;