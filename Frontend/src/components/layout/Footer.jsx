import React, { useState } from 'react';
import { CheckSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-grid">
          
          {/* Logo & Tagline */}
          <div className="footer-info animate-fade-in">
            <div className="logo-section" style={{ marginBottom: '16px' }}>
              <CheckSquare className="logo-icon" />
              <span className="logo-text">Task<span>Mate</span></span>
            </div>
            <p className="footer-desc">
              Your neighborhood marketplace connecting you to vetted, trusted professionals for every chore, project, and repair.
            </p>
            <div className="trust-badge">
              <ShieldCheck size={18} className="trust-badge-icon" />
              <span>$1M Property Damage Guarantee</span>
            </div>
          </div>

          {/* Links Discover */}
          <div className="footer-links-col animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="footer-title">Discover</h4>
            <ul>
              <li><a href="#categories">All Services</a></li>
              <li><a href="#how-it-works">How it Works</a></li>
              <li><a href="#taskers">Top Rated Taskers</a></li>
              <li><a href="#locations">TaskMate Cities</a></li>
              <li><a href="#become-tasker">Become a Tasker</a></li>
            </ul>
          </div>

          {/* Links Support */}
          <div className="footer-links-col animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="footer-title">Support & Safety</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Trust & Safety Guidelines</a></li>
              <li><a href="#guarantee">Happiness Pledge</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / Promo */}
          <div className="footer-promo animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="footer-title">Join Our Community</h4>
            <p className="promo-text">Get household tips, service updates, and <strong>$15 off</strong> your first booked task!</p>
            
            {subscribed ? (
              <div className="newsletter-success animate-fade-in">
                <span>Check your inbox for your promo code! 🎁</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="form-control newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} TaskMate Inc. All rights reserved. Made with love for home repair.
          </p>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
