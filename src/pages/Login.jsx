import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/feed');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-logo" onClick={() => navigate('/')}>YourBrand</h1>
        </div>

        <div className="auth-box">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            <div className="form-footer">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="submit-button">
              Log in
            </button>
          </form>

          <div className="auth-switch">
            <span>Don't have an account? </span>
            <button onClick={() => navigate('/signup')} className="switch-link">
              Sign up
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <a href="#" className="footer-link">Terms</a>
          <span className="footer-separator">•</span>
          <a href="#" className="footer-link">Privacy</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
