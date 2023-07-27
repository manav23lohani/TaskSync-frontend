import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";

const Notifications = ({ show, onClose }) => {
  const[requests, setRequests] = useState([]);
  useEffect(() => {
    fetchRequests();
  }, []);

    const acceptRequest = async(projectId)=>{
      try {

        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.post(
          "http://localhost:5001/api/projectMember/acceptRequest",
          {projectId},
          {
            headers,
          }
        );
        setRequests((requests) =>
        requests.filter((request) => request.projectId !== projectId)
      );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  
    const declineRequest = async(projectId)=>{
      try {

        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.post(
          "http://localhost:5001/api/projectMember/declineRequest",
          {projectId},
          {
            headers,
          }
        );
        setRequests((requests) =>
        requests.filter((request) => request.projectId !== projectId)
      );
        console.log(res);
      } catch (err) {
        // toast.error(err.response.data.message);
        console.log(err);
      }
    }

    const fetchRequests = async()=>{
        try {

            const accessToken = localStorage.getItem("accessToken");
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            const res = await axios.get(
              "http://localhost:5001/api/projectMember/recieveRequests",
              {
                headers,
              }
            );
            // console.log(res);
            setRequests(res.data);
          } catch (err) {
            // toast.error(err.response.data.message);
            console.log(err);
            onClose();
          }
    }
  return (
    <Modal show={show} onHide={onClose} top>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {requests.length === 0 ? (
          <p className="d-flex align-items-center justify-content-center">No notifications</p>
        ) : (
          requests.map((request) => (
            <Card key={request.projectId}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={6}>
              <span className="h4">
                  {request.title}
                </span>
                <small className="small text-muted"> ~by {request.owner}</small>
                <p className=" mt-2 h6 text-muted">Tags: [ {request.techStack} ]</p>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button onClick={() => acceptRequest(request.projectId)} className="me-2" variant="success">
                  Accept
                </Button>
                <Button onClick={() => declineRequest(request.projectId)} variant="danger">Reject</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Notifications;