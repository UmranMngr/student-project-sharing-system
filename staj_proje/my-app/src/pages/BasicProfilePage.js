import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Image, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './BasicProfilePage.css';

const BasicProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                setUser(response.data);
                const userId = localStorage.getItem('userId');
                const followCheckResponse = await axios.get(`/api/userfollowers/check`, {
                    params: {
                        followedId: response.data.id,
                        userId: userId
                    }
                });
                setIsFollowing(followCheckResponse.data.isFollowing);
                setLoading(false);
            } catch (error) {
                console.error('Kullanıcı yüklenirken bir hata oluştu:', error);
                navigate('/error');
            }
        };
    
        fetchUser();
    }, [id, navigate]);
    

    const handleFollowToggle = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (user.id === userId) {
                alert("You cannot follow yourself.");
                return;
            }
    
            if (isFollowing) {
                // Takipten çıkma işlemi
                await axios.delete(`/api/userfollowers`, {
                    params: {
                        followedId: user.id,
                        userId: userId
                    }
                });
                setIsFollowing(false);
            } else {
                // Takip etme işlemi
                await axios.post('/api/userfollowers', {
                    FollowerId: userId,
                    FollowedId: user.id
                });
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Takip işlemi sırasında bir hata oluştu:', error);
        }
    };
    
    

    if (loading) {
        return (
            <div className="loading-container">
                <Spinner animation="border" variant="light" />
                <p>Loading...</p>
            </div>
        );
    }

    const defaultProfileImageUrl = '/pictures/avatar.png';
    const defaultBio = 'Bu alana bir biyografi ekleyin.';

    return (
        <Container className="profile-container">
            <div className="profile-info-container">
                <Image 
                    src={user.profilePictureUrl || defaultProfileImageUrl} 
                    roundedCircle
                    className="profile-picture"
                    alt="Profile"
                />
                <div className="profile-details">
                    <h1 >{user.username}</h1>
                    <p>{user.bio || defaultBio}</p>
                    <Button 
                        onClick={handleFollowToggle}
                        variant={isFollowing ? 'secondary' : 'primary'}
                        disabled={user.id === localStorage.getItem('userId')}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>
            </div>
        </Container>
    );
    
};

export default BasicProfilePage;
