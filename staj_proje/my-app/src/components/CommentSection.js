import React, { useState, useEffect } from "react";
import axios from "axios";
import './CommentSection.css';

const CommentForm = ({ postId }) => {
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]); 

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments?postId=${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to submit a comment.");
            return;
        }

        const formData = new FormData();
        formData.append("text", text);
        formData.append("userId", userId);
        formData.append("postId", postId);

        try {
            const response = await axios.post("/api/comments", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            alert("Comment submitted successfully.");
            setText(""); 
            setComments(prevComments => [...prevComments, response.data]); 
        } catch (error) {
            console.error("Error submitting comment", error);
            alert("An error occurred while submitting the comment.");
        }
    };

    return (
        <div>
            {/* Yorumları gösterme */}
            <div className="comment-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <p className="comment-username">{comment.userName}: {comment.text}</p> 
                        <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="commentPlace">
                <textarea 
                    placeholder="Add your comment" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <button type="submit" className="buttonSubmit">Send</button>
            </form>
        </div>
    );
};

export default CommentForm;
