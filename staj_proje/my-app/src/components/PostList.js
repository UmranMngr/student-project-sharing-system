import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard'; 
import './PostList.css'; 

const PostList = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFollowingPosts = async () => {
            try {
                const response = await axios.get(`/api/posts/following/${userId}`);
                console.log('Fetched data for followed users:', response.data);
        
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error("Fetched data is not an array", response.data);
                }
            } catch (error) {
                console.error("Error fetching posts for followed users", error);
            }
        };

        if (userId) {
            fetchFollowingPosts();
        }
    }, [userId]);

    return (
        <div className="post-list-container">
            {posts.length > 0 ? (
                posts.map(post => (
                    <div className="post-card-wrapper" key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default PostList;
