import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Button, Container, Col } from "react-bootstrap";

const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    status: "pending",
    techStack: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/projects`,
        formData,
        {
          headers,
        }
      );
      toast.success('Project added successfully');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{
        maxWidth: "800px",
        border: "3px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status:</Form.Label>
          <Col>
            <Form.Check
              inline
              type="radio"
              name="status"
              value="pending"
              label="Pending"
              checked={formData.status === "pending"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="status"
              value="working"
              label="Working"
              checked={formData.status === "working"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="status"
              value="completed"
              label="Completed"
              checked={formData.status === "completed"}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="techStack">
          <Form.Label>Tech Stack:</Form.Label>
          <Form.Control
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="mt-4" type="submit">
          Add Project
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
