import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem, Spinner, Button } from 'react-bootstrap';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/userfollowers/notifications/${userId}`);
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Bildirimler yüklenirken bir hata oluştu:', error);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    const handleDeleteAll = async () => {
        try {
            const response = await axios.delete(`/api/notifications/delete-by-user/${userId}`);
            alert(response.data);  
            setNotifications([]); 
        } catch (error) {
            console.error('Bildirimler silinirken bir hata oluştu:', error);
            alert('Bildirimler silinirken bir hata oluştu.');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Spinner animation="border" variant="light" />
                <p>Loading notifications...</p>
            </div>
        );
    }

    return (
        <Container>
            <h2>Messages</h2>
            <Button variant="primary" onClick={handleDeleteAll}>Delete</Button>
            <ListGroup>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <ListGroupItem key={notification.id}>
                            {notification.message}
                        </ListGroupItem>
                    ))
                ) : (
                    <ListGroupItem>There is no new message</ListGroupItem>
                )}
            </ListGroup>
        </Container>
    );
};

export default Notifications;
