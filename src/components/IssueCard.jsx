import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import IssueContext from '../contexts/IssueContext';

function IssueCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { issueData, loadingData, errorData } = useContext(IssueContext);

  const [title, setTitle] = useState(props.issue.title);
  const [description, setDescription] = useState(props.issue.description);
  const [assignedTo, setAssignedTo] = useState(props.issue.assignedTo);
  const [priority, setPriority] = useState(props.issue.priority);
  const [status, setStatus] = useState(props.issue.status);

  const updateIssue = () => {
    if (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      assignedTo.trim().length > 0
    ) {
      updateIssueApiCall();
    } else {
      alert('Invalid details provided');
    }
  };

  const updateIssueApiCall = async () => {
    try {
      loadingData.setLoading(true);
      await axios.put(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue/' +
          props.issue.id,
        {
          title,
          description,
          assignedTo,
          priority,
          status,
        },
      );

      const issuesResults = await axios.get(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue',
      );

      issueData.setIssues(issuesResults.data);
      setIsEditModalOpen(false);
    } catch (error) {
      errorData.setError(true);
    } finally {
      loadingData.setLoading(false);
    }
  };

  const deleteIssue = async (id) => {
    try {
      loadingData.setLoading(true);

      await axios.delete(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue/' + id,
      );
      const issuesResults = await axios.get(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue',
      );

      issueData.setIssues(issuesResults.data);
    } catch (error) {
      errorData.setError(true);
    } finally {
      loadingData.setLoading(false);
    }
  };

  return (
    <div className="mt-2 mb-2">
      <Card>
        <Card.Header>
          {props.issue.title}
          <div style={{ float: 'right' }}>
            <Button
              className="m-1 btn-danger"
              onClick={() => {
                deleteIssue(props.issue.id);
              }}
            >
              Delete
            </Button>
            <Button
              className="m-1 btn-warning"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            >
              Edit
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{props.issue.description}</Card.Text>
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            variant="primary"
          >
            Expand
          </Button>
        </Card.Body>
        {isModalOpen ? (
          <>
            <Modal
              show={isModalOpen}
              onHide={() => {
                setIsModalOpen(false);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {props.issue.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <strong>Description: </strong>
                  {props.issue.description}
                </p>
                <p>
                  <strong>Assigned By:</strong> {props.issue.assignedBy}
                </p>
                <p>
                  <strong>Assigned To:</strong> {props.issue.assignedTo}
                </p>
                <p>
                  <strong>Due Date:</strong> {props.issue.dueDate}
                </p>
                <p>
                  <strong>Priority:</strong> {props.issue.priority}
                </p>
              </Modal.Body>
            </Modal>
          </>
        ) : null}

        {isEditModalOpen ? (
          <>
            <Modal
              show={isEditModalOpen}
              onHide={() => {
                setIsEditModalOpen(false);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit issue details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Group>
                    <Form.Control
                      className="mt-2 mb-2"
                      value={title}
                      placeholder="Title"
                      name="title"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                    <Form.Control
                      className="mt-5 mb-5"
                      placeholder="Description"
                      value={description}
                      name="description"
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                    <Form.Control
                      className="mt-5 mb-5"
                      placeholder="Assigned By"
                      value={props.issue.assignedBy}
                      disabled
                    />
                    <Form.Control
                      className="mt-5 mb-5"
                      placeholder="Assigned To"
                      name="assignedTo"
                      value={assignedTo}
                      onChange={(event) => {
                        setAssignedTo(event.target.value);
                      }}
                    />
                    <Form.Control
                      className="mt-5 mb-5"
                      placeholder="Due date"
                      type="date"
                      value={props.issue.dueDate}
                      disabled
                    />
                    <Form.Select
                      aria-label="Priority"
                      className="mt-5 mb-5"
                      name="priority"
                      value={priority}
                      onChange={(event) => {
                        setPriority(event.target.value);
                      }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Form.Select>
                    <Form.Select
                      aria-label="Status"
                      className="mt-5 mb-5"
                      name="status"
                      value={status}
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </Form.Select>
                    <Button
                      style={{ width: '100%' }}
                      onClick={() => {
                        updateIssue();
                      }}
                    >
                      Update issue
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Modal.Body>
            </Modal>
          </>
        ) : null}
      </Card>
    </div>
  );
}

export default IssueCard;
