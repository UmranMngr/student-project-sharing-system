import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import PostList from '../components/PostList';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const [storedUserId, setStoredUserId] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [userListVisible, setUserListVisible] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null); // Ref oluştur

    useEffect(() => {
        const retrievedUserId = localStorage.getItem('userId');
        if (retrievedUserId) {
            setUserId(retrievedUserId);
            setStoredUserId(retrievedUserId);
        }

        const fetchAllUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const users = await response.json();
                setAllUsers(users);
            } catch (error) {
                console.error('Kullanıcıları alırken hata:', error);
            }
        };

        fetchAllUsers();

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setUserListVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json();
            if (users.length > 0) {
                const userId = users[0].id;
                navigate(`/basic-profile/${userId}`);
            } else {
                alert('Kullanıcı bulunamadı.');
            }
        } catch (error) {
            console.error('Arama hatası:', error);
            alert('Arama işlemi sırasında bir hata oluştu.');
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/basic-profile/${userId}`);
    };

    const handleInputFocus = () => {
        setUserListVisible(true);
    };

    return (
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            <div className='akıs'>
                <div className='searchSection' ref={searchRef}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleInputFocus}
                        placeholder="Kullanıcı ara..."
                    />
                    <button className='searchButton' onClick={handleSearch}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                {userListVisible && (
                    <div className="user-list">
                        <ul>
                            {allUsers.map((user) => (
                                <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="home-content">
                    <PostList userId={storedUserId} />
                </div>
            </div>
        </div>
    );
};

export default Home;
