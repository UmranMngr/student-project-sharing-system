import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      localStorage.removeItem('userId');
      
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        navigate(`/profile/${response.data.userId}`);
      } else {
        console.error('Geçersiz yanıt:', response.data);
        alert('Giriş yapılamadı. Lütfen e-posta ve şifrenizi kontrol edin.');
      }
    } catch (error) {
      console.error("Error during login", error.response?.data || error.message || error);
      alert('Giriş sırasında bir hata oluştu.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button style={{backgroundColor:'#317482'}} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
