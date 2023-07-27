import React, {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const AddMember = ({ show, onClose }) => {
    const handlechange = (e) => {
       const {id , value} = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    const [formData, setFormData] = useState({
        userId:"",
        projectId: "",
    })
    const sendRequest = async(e)=>{
        try {
            e.preventDefault();
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            const res = await axios.post(
              "http://localhost:5001/api/projectMember/sendRequest",
              formData,
              {
                headers,
              }
            );
            console.log(res);
            toast.info(res.data.message);
            onClose();
          } catch (err) {
            toast.error('Project/ User ID is invalid');
            console.log(err);
            onClose();
          }
    }
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={sendRequest}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              UserID
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="Enter UserID"
              onChange={handlechange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">
              Project ID
            </label>
            <input
              type="text"
              className="form-control"
              id="projectId"
              placeholder="Enter project ID"
              onChange={handlechange}
            />
          </div>
          <Button variant="primary" type="submit" className="me-2">Send Request</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMember;
