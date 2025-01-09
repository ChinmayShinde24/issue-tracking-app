import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import IssueContext from '../contexts/IssueContext';

function CreateIssue() {
  const { issueData, loadingData, errorData } = useContext(IssueContext);

  const title = useRef(null);
  const description = useRef(null);
  const assignedBy = useRef(null);
  const assignedTo = useRef(null);
  const dueDate = useRef(null);
  const priority = useRef(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createIssue = async () => {
    const titleValue = title.current.value.trim();
    const descriptionValue = description.current.value.trim();
    const assignedByValue = assignedBy.current.value.trim();
    const assignedToValue = assignedTo.current.value.trim();
    const dueDateValue = dueDate.current.value;
    const priorityValue = priority.current.value;

    if (
      titleValue.length > 0 &&
      descriptionValue.length > 0 &&
      assignedByValue.length > 0 &&
      assignedToValue.length > 0 &&
      dueDateValue.length > 0 &&
      priorityValue.length > 0
    ) {
      await storeIssue(
        titleValue,
        descriptionValue,
        assignedByValue,
        assignedToValue,
        dueDateValue,
        priorityValue,
      );
      navigate('/');
    } else {
      alert('Invalid');
    }
  };

  const storeIssue = async (
    titleValue,
    descriptionValue,
    assignedByValue,
    assignedToValue,
    dueDateValue,
    priorityValue,
  ) => {
    try {
      setLoading(true);
      await axios.post(
        'https://677a5952671ca0306833b719.mockapi.io/api/issue',
        {
          title: titleValue,
          description: descriptionValue,
          assignedBy: assignedByValue,
          assignedTo: assignedToValue,
          dueDate: dueDateValue,
          priority: priorityValue,
          status: 'Pending',
          createdAt: new Date(),
        },
      );

      // const issuesResults = await axios.get(
      //   'https://677a5952671ca0306833b719.mockapi.io/api/issue',
      // );

      // issueData.setIssues(issuesResults.data);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Create Issue</h1>
          <Form.Group>
            <Form.Control
              className="mt-5 mb-5"
              placeholder="Title"
              ref={title}
            />
            <Form.Control
              className="mt-5 mb-5"
              placeholder="Description"
              ref={description}
            />
            <Form.Control
              className="mt-5 mb-5"
              placeholder="Assigned By"
              ref={assignedBy}
            />
            <Form.Control
              className="mt-5 mb-5"
              placeholder="Assigned To"
              ref={assignedTo}
            />
            <Form.Control
              className="mt-5 mb-5"
              placeholder="Due date"
              type="date"
              ref={dueDate}
            />
            <Form.Select
              aria-label="Priority"
              className="mt-5 mb-5"
              ref={priority}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
            <Button
              style={{ width: '100%' }}
              onClick={() => {
                createIssue();
              }}
            >
              Create issue
            </Button>
          </Form.Group>
        </div>
      )}
    </>
  );
}

export default CreateIssue;
