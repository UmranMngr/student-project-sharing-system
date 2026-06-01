import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from 'react-bootstrap';

const PostForm = ({ postId, existingTitle = "", existingDescription = "", existingImage = null }) => {
    const [title, setTitle] = useState(existingTitle);
    const [description, setDescription] = useState(existingDescription);
    const [image, setImage] = useState(existingImage);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('userId', userId); 
        if (image) {
            formData.append('image', image);
        }

        try {
            if (postId) {
                await axios.put(`/api/posts/${postId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setSuccess('Post updated successfully.');
            } else {
                await axios.post("/api/posts", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setSuccess('Post created successfully.');
            }
        } catch (error) {
            setError('An error occurred while submitting the post.');
            console.error("Error submitting post", error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async () => {
        if (postId) {
            try {
                await axios.delete(`/api/posts/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setSuccess('Post deleted successfully.');
            } catch (error) {
                setError('An error occurred while deleting the post.');
                console.error("Error deleting post", error);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label style={{color:'white'}}>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label style={{color:'white'}}>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formImage">
                <Form.Label style={{color:'white'}}>Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit">
                {postId ? 'Update Post' : 'Create Post'}
            </Button>
            {postId && (
                <Button variant="danger" type="button" onClick={handleDelete} className="ms-2">
                    Delete Post
                </Button>
            )}
        </Form>
    );
};

export default PostForm;
