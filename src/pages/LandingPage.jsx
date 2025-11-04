import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">YourBrand</div>
        <nav className="nav">
          <button onClick={() => navigate('/login')} className="nav-link">Log in</button>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">Create a stunning store in seconds</h1>
          <p className="hero-subtitle">
            Pre-built designs make it fast and easy to kickstart your brand.
          </p>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-label">CUSTOMIZABLE THEMES</div>
            <div className="feature-image-container">
              <div className="feature-image themes">
                <div className="theme-preview"></div>
                <div className="theme-preview"></div>
                <div className="theme-preview"></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-label">OPTIMIZED CHECKOUT</div>
            <div className="feature-content">
              <h3>Sell more with the world's best checkout</h3>
              <p>15% higher conversion means you can sell more than elsewhere.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-label">MEET SIDEKICK</div>
            <div className="feature-content">
              <div className="ai-card">
                <div className="ai-icon">🤖</div>
                <div className="ai-text">
                  <div>Hey there,</div>
                  <div className="ai-highlight">How can I help?</div>
                </div>
              </div>
              <h3>Level up with an AI assistant</h3>
              <p>Selling is easy with a built-in business partner who can help scale your vision.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-label">ALWAYS ON</div>
            <div className="feature-content">
              <div className="support-visual">
                <div className="globe-icon">🌍</div>
              </div>
              <h3>Support whenever you need it</h3>
              <p>We offer help 24/7 so your business never stops running smoothly.</p>
            </div>
          </div>
        </section>

        <section className="testimonial">
          <blockquote className="quote">
            "We've tripled in size since we first started. It gives us the tools we need to keep pushing forward."
          </blockquote>
          <p className="quote-author">Sarah Johnson, Founder</p>
        </section>

        <section className="cta-section">
          <div className="cta-box">
            <h2 className="cta-title">Start for free</h2>
            <div className="email-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="email-input"
              />
              <button onClick={handleGetStarted} className="arrow-button">→</button>
            </div>
            <p className="disclaimer">You agree to receive marketing emails.</p>
          </div>
        </section>

        <section className="faq">
          <h2 className="faq-title">Questions?</h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                What is this platform and how does it work?
                <span className="faq-icon">+</span>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                How much does it cost?
                <span className="faq-icon">+</span>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Can I use my own domain name?
                <span className="faq-icon">+</span>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Do I need to be a designer or developer?
                <span className="faq-icon">+</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-logo">🛍️</div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms of service</a>
          <a href="#" className="footer-link">Privacy policy</a>
          <a href="#" className="footer-link">Sitemap</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
