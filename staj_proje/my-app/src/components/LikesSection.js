import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LikesSection.css';

const LikeButton = ({ postId }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/likes/post/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const userLike = response.data.find(like => like.userId === parseInt(userId));
                setHasLiked(!!userLike);
            } catch (error) {
                console.error("Error checking like status", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            checkIfLiked();
        }
    }, [postId, userId, token]);

    const handleLike = async () => {
        if (userId === null) return; 

        const likeData = {
            PostId: postId,
            UserId: userId
        };

        try {
            setLoading(true);
            if (hasLiked) {
                const likeResponse = await axios.get(`/api/likes/post/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const userLike = likeResponse.data.find(like => like.userId === parseInt(userId));
                if (userLike) {
                    await axios.delete(`/api/likes/${userLike.id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                }
                setHasLiked(false);
            } else {
                await axios.post("/api/likes", likeData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setHasLiked(true);
            }
        } catch (error) {
            console.error("Error handling like", error.response ? error.response.data : error.message);
            alert("An error occurred while processing the like.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button className="icon-button" onClick={handleLike} disabled={loading}>
                {hasLiked ? (
                    <i className="bi bi-hand-thumbs-down-fill"></i>
                ) : (
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                )}
            </button>
        </div>
    );
};

export default LikeButton;
