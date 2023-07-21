import { React, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/User";

export default function SignIn() {
  const {setUserInfo} = useUser();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5001/api/users/login", {
        email: formData.email,
        password: formData.password
      });
      console.log(response);

      const accessToken = response.data.token;
      const name = response.data.username;
      const id = response.data.id;
      localStorage.setItem('accessToken', accessToken);

      setUserInfo({name,id});
      
      toast.success(`Welcome back ${response.data.username}!`);
      setFormData({
        email: '',
        password: ''
      });
      setTimeout(()=>navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
      console.log(err);
    }
  };
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-4 text-center text-uppercase ">
                    Sign-In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Log In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??
                        <span style={{cursor: 'pointer'}} onClick={()=>navigate('/signup')} className="text-primary fw-bold">
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}