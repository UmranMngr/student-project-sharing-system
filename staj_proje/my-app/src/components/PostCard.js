import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentSection';
import LikeForm from './LikesSection';
import './PostCard.css';
import Person from './Person';

const PostCard = ({ post }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // İhtiyaca göre formatı değiştirebilirsiniz
    };

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                console.log(`Fetching like count for post ${post.id}`);
                const response = await axios.get(`/api/likes/post/${post.id}`);
                console.log('Response data for like count:', response.data);
                const likes = response.data;
                setLikeCount(likes.length); 
                console.log('Updated like count:', likes.length);
            } catch (error) {
                console.error("Error fetching like count", error);
            }
        };

        fetchLikeCount();
    }, [post.id]);

    return (
        <div className="post-card">

            <Person className='person' userId={post.userId}/>
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
            <LikeForm postId={post.id} />
        </div>
    );
};

export default PostCard;