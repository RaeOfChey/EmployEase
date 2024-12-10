import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations.ts';
import Auth from '../utils/auth';

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [AddUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await AddUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      handleModalClose(); // Close modal after successful signup
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleChange}
            value={formState.username || ''}
            required
          />
          <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleChange}
            value={formState.password || ''}
            required
          />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>
        
        <Button
          disabled={!(formState.username && formState.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      
      {data && (
        <div className="my-3 p-3 bg-success text-white">
          User created successfully! Welcome, {data.addUser.username}.
        </div>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default SignupForm;