import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './RegisterPage.css'; 

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post('/api/auth/register', { username, email, password });
      setSuccess(true);
      setError(null);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError("Error during registration: " + error.message);
    }
  };

  return (
    <Container className="register_container">
      <div className="register-card">
        <h1 className="text-center mb-4">Register</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Registration successful!</Alert>}
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button style={{backgroundColor:'#317482'}} variant="primary" type="submit" className="button mt-4">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
