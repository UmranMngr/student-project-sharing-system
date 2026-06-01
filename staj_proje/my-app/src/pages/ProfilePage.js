import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import PostForm from '../components/PostForm';
import Notifications from '../components/Notifications';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import PostCardDeleteButton from '../components/PostCardDeleteButton';
import './ProfilePage.css';
import { Container, Row, Col, Button, Image, Spinner } from 'react-bootstrap';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const id = userId || localStorage.getItem('userId');
      if (!id) {
        navigate('/login');
        return;
      }

      const userResponse = await axios.get(`/api/users/${id}`);
      console.log('User Response:', userResponse.data);

      try {
        const postsResponse = await axios.get(`/api/posts/user/${id}`);
        console.log('Posts Response:', postsResponse.data);
        setPosts(Array.isArray(postsResponse.data) ? postsResponse.data : []);
      } catch (postsError) {
        if (postsError.response && postsError.response.status === 404) {
          setPosts([]);
        } else {
          console.error("Error fetching posts data", postsError);
          navigate('/error');
        }
      }

      setUser(userResponse.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      navigate('/error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, navigate]);

  const handleProfileEditToggle = () => {
    setIsEditingProfile(prevState => !prevState);
  };

  const handlePostCreationToggle = () => {
    setIsCreatingPost(prevState => !prevState);
  };

  const handlePostDelete = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleNotificationsToggle = () => {
    setShowNotifications(prevState => !prevState);
  };

  if (!user) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
        <Spinner animation="border" variant="light" />
        <p>Loading...</p>
      </div>
    );
  }

  const defaultBio = 'Bu alana bir biyografi ekleyin.';
  const defaultProfileImageUrl = '/pictures/avatar.png';

  return (
    <Container className="profile-container">

      <div className='akıs'>

        <div className="profileInfoContainer">
          <div className="profile-info">
            <Image
              src={user.profilePictureUrl || defaultProfileImageUrl}
              roundedCircle
              className="profile-picture"
              alt="Profile"
            />
            <div className="details">
              <h1>{user.username}</h1>
              <p>{user.bio || defaultBio}</p>
            </div>
          </div>
          <div className="notification-container">
            <Button onClick={handleNotificationsToggle} className="notification-button">
              <i className="bi bi-chat-left-text"></i>
            </Button>
            {showNotifications && (
              <div className="messages">
                <Notifications />
              </div>
            )}
          </div>

          <div className="buttons">
            <Button onClick={handleProfileEditToggle} className="me-2">
              {isEditingProfile ? 'Cancel Profile Edit' : 'Edit Profile'}
            </Button>
            <Button onClick={handlePostCreationToggle}>
              {isCreatingPost ? 'Cancel Post Creation' : 'Create Post'}
            </Button>
            <LogoutButton />
          </div>
        </div>

        {isEditingProfile && (
          <div className='Edit'>
            <div className="mt-3">
              <ProfileForm userId={user.id} onProfileUpdated={() => {
                setIsEditingProfile(false);
                fetchData();
              }} />
            </div>
          </div>
        )}

        {isCreatingPost && (
          <div className='Edit'>
            <div className="mt-3">
              <PostForm onPostCreated={() => {
                setIsCreatingPost(false);
                fetchData();
              }} />
            </div>
          </div>
        )}

        <div className="posts-section">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCardDeleteButton key={post.id} post={post} onDelete={handlePostDelete} />
            ))
          ) : (
            <p style={{ color: 'white' }}>Add your first post!</p>
          )}
        </div>

      </div>


    </Container>
  );
};

export default ProfilePage;
