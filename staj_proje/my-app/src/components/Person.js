import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const Person = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUsername(response.data.username);
        setBio(response.data.bio);
        setProfileImageUrl(response.data.profilePictureUrl || '/pictures/avatar.png');
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <img src={profileImageUrl} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
      <p><strong>Username:</strong> {username}</p>
    </div>
  );
};

export default Person;
