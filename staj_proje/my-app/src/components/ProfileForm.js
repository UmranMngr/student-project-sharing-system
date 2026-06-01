import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const ProfileForm = ({ userId, onProfileUpdated }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUsername(response.data.username);
        setBio(response.data.bio);
        setCurrentProfileImageUrl(response.data.profilePictureUrl || '/pictures/avatar.png');
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('username', username);
    formData.append('bio', bio);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    } else {
      formData.append('profileImageUrl', currentProfileImageUrl);
    }

    try {
      await axios.put(`/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile updated successfully!');
      if (onProfileUpdated) onProfileUpdated(); 
    } catch (error) {
      setError('Error updating profile.');
      console.error('Error updating profile', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label style={{color:'white'}}>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBio">
        <Form.Label style={{color:'white'}}>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formProfileImage">
        <Form.Label style={{color:'white'}}>Profile Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <Button variant="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  );
};

export default ProfileForm;