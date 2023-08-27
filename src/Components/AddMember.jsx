import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { useProjectContext } from "../Contexts/ProjectsContext";

const AddMember = ({ show, onClose }) => {
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const { projects } = useProjectContext();
  const handlechange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const [formData, setFormData] = useState({
    userMail: "",
    projectId: "",
  });
  const sendRequest = async (e) => {
    try {
      e.preventDefault();
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/projectMember/sendRequest`,
        formData,
        {
          headers,
        }
      );
      toast.info(res.data.message);
      onClose();
    } catch (err) {
      toast.error("Project/ User ID is invalid");
      onClose();
    }
  };
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={sendRequest}>
          <div className="mb-3">
            <label htmlFor="userMail" className="form-label">
              User email
            </label>
            <input
              type="text"
              className="form-control"
              id="userMail"
              placeholder="Enter email"
              onChange={handlechange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">
              Project
            </label>
            <select
              className="form-control"
              id="projectId"
              onChange={handlechange}
            >
              <option value="">Select project</option>
              {projects.filter((project) => project.user_id === user.id).map((project) => (
                <option key={project.id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" type="submit" className="me-2">
            Send Request
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMember;