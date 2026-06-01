import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to={`/profile/${user?.id}`}>Profile</Link>
        {user ? (
          <div>
            <span>{user.username}</span>
            <img src={user.profilePictureUrl} alt="Profile" />
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
