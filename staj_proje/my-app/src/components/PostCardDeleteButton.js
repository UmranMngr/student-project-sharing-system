import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentSection';
import LikeForm from './LikesSection';
import './PostCardDeleteButton.css';

const PostCardDeleteButton = ({ post, onDelete }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // İhtiyaca göre formatı değiştirebilirsiniz
    };

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await axios.get(`/api/likes/post/${post.id}`);
                const likes = response.data;
                setLikeCount(likes.length); 
            } catch (error) {
                console.error("Error fetching like count", error);
            }
        };

        fetchLikeCount();
    }, [post.id]);

    const handleDelete = () => {
        axios.delete(`/api/posts/${post.id}`)
            .then(() => {
                onDelete(post.id); 
            })
            .catch(error => {
                // Daha fazla hata detayı yazdırarak sorunun ne olduğunu anlamaya çalışın
                if (error.response) {
                    // Sunucu yanıt verdi, ancak hata durumu oluştu
                    console.error("Error deleting post:", error.response.data);
                    console.error("Status code:", error.response.status);
                    alert(`Error deleting post: ${error.response.data}`);
                } else if (error.request) {
                    // Sunucuya istek gönderildi, ancak yanıt alınamadı
                    console.error("No response received:", error.request);
                    alert("No response from server. Please try again.");
                } else {
                    // İstek oluşturulurken hata oluştu
                    console.error("Error creating request:", error.message);
                    alert("Error deleting post. Please try again.");
                }
            });
    };
    

    return (
        <div className="post-card-delete-button">
            <img src={post.imageUrl} alt="Post" />
            <div className='components'>
                <div className='timeAndContent'>
                  <p className='createdTime'>Created at: {formatDate(post.createdAt)}</p>
                  <p style={{color:'white'}}>{post.description}</p>
                </div>
                <div className='ContentOfLike'>
                   <i class="bi bi-hand-thumbs-up-fill"></i>
                   <span style={{color:'white'}}>Likes: {likeCount}</span>
                </div>
              
              
            </div>
            <CommentForm postId={post.id} />
            <div className="button-container">
                <LikeForm postId={post.id} />
                <button className="delete-button" onClick={handleDelete}>Delete Post</button>
            </div>
            
        </div>
    );
};

export default PostCardDeleteButton;
