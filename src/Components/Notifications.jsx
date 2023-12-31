import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Card, Row, Col, Spinner } from "react-bootstrap";

const Notifications = ({ show, onClose }) => {
  const [loading, setLoading] = useState(true);
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
        await axios.post(
          `${process.env.REACT_APP_URL}/api/projectMember/acceptRequest`,
          {projectId},
          {
            headers,
          }
        );
        setRequests((requests) =>
        requests.filter((request) => request.projectId !== projectId)
      );
      } catch (err) {
        toast.error('Please try again!');        
      }
    }
  
    const declineRequest = async(projectId)=>{
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        await axios.post(
          `${process.env.REACT_APP_URL}/api/projectMember/declineRequest`,
          {projectId},
          {
            headers,
          }
        );
        setRequests((requests) =>
        requests.filter((request) => request.projectId !== projectId)
      );
      } catch (err) {
        toast.error('Please try again!');
      }
    }

    const fetchRequests = async()=>{
        try {

            const accessToken = localStorage.getItem("accessToken");
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            const res = await axios.get(
              `${process.env.REACT_APP_URL}/api/projectMember/recieveRequests`,
              {
                headers,
              }
            );
            setLoading(false);
            setRequests(res.data);
          } catch (err) {
            onClose();
          }
    }
  return (
    <Modal show={show} onHide={onClose} top>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {!loading && requests.length === 0 ? (
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
        {loading && (<div className="d-flex justify-content-center align-projects-center">
      <Spinner animation="border" role="status" />
      <span>Loading...</span>
    </div>)}
      </Modal.Body>
    </Modal>
  );
};

export default Notifications;