import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
// Sayfalar
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyIcon from './components/myIcon';
import BasicProfilePage from './pages/BasicProfilePage';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []); // Bileşen ilk render edildiğinde çalışır

  return (
    <Router>
      <div style={{ backgroundColor: 'white' }}>
        <nav className='topSection'>
          <div className="dropdown">
            <ul className={`slideMenu ${isMenuOpen ? 'show' : ''}`}>
              <li className="item">
                <Link className='link' to="/">Home</Link>
              </li>
              <li className="item">
                <Link className='link' to={`/profile/${userId}`} onClick={() => setUserId(localStorage.getItem('userId'))}>
                  Profile
                </Link>
              </li>
              <li className="item">
                <Link className='link' to="/login">Login</Link>
              </li>
              <li className="item">
                <Link className='link' to="/register">Register</Link>
              </li>
            </ul>

            <button 
              className={`btn btn-secondary menu ${isMenuOpen ? 'show' : ''}`}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <i className={`bi ${isMenuOpen ? 'bi-chevron-left' : 'bi-three-dots-vertical'}`}></i>
            </button>
          </div>
          <div>
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MyIcon />
              <h2 className='yazı'>Proje Vitrini</h2>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ margin: '0px' }}>
              <Link to={`/profile/${userId}`} onClick={() => setUserId(localStorage.getItem('userId'))}>
                <i className="bi bi-person-circle"></i>
              </Link>
            </div>
            <Link to="/login" className='ButonLogin' style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </nav>

        {/* Sayfa Yönlendirmeleri */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<ProfilePage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/basic-profile/:id" element={<BasicProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
