import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, Check, Shield, Star, ArrowLeft, CheckSquare } from 'lucide-react';

export default function AuthPage({ initialTab = 'login', onLoginSuccess, onGoBack }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'signup'
  const [role, setRole] = useState('user'); // 'user' | 'tasker'
  
  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    // Reset forms on tab changes
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setSkills('');
    setError('');
    setSuccess(false);
  }, [initialTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (activeTab === 'signup' && !name) {
      setError('Please provide your name.');
      return;
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = activeTab === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const payload = activeTab === 'signup' 
        ? { name, email, password, role } 
        : { email, password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
      
      setTimeout(() => {
        onLoginSuccess(data); // data contains token and user info
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Left Panel: Testimonial & Brand */}
      <div className="auth-side-panel">
        <div className="background-decor">
          <div className="decor-circle-1" style={{ width: '600px', height: '600px' }}></div>
          <div className="decor-circle-2" style={{ width: '400px', height: '400px' }}></div>
        </div>

        <div className="side-panel-content">
          <div className="side-logo" onClick={onGoBack}>
            <CheckSquare className="logo-icon-white" size={32} />
            <span className="logo-text-white">Task<span>Mate</span></span>
          </div>

          <div className="side-testimonial animate-fade-in">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="star-icon-filled" />
              ))}
            </div>
            
            <p className="testimonial-quote">
              "TaskMate completely changed how I handle home chores. I booked an assembly expert in 10 minutes, and he completed the bookcase flawlessly. Fast, secure, and highly recommended!"
            </p>

            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <div className="author-name">Marcus Sterling</div>
                <div className="author-title">Homeowner in San Francisco</div>
              </div>
            </div>
          </div>

          <div className="side-footer">
            <div className="trust-element">
              <Shield size={16} />
              <span>Vetted & Background Checked Professionals</span>
            </div>
            <div className="trust-element">
              <CheckSquare size={16} />
              <span>$1M Property Damage Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="auth-form-panel">
        <div className="form-panel-header">
          <button type="button" className="back-home-btn" onClick={onGoBack}>
            <ArrowLeft size={16} /> Back to Marketplace
          </button>
        </div>

        <div className="auth-form-wrapper">
          {success ? (
            <div className="modal-success-screen animate-scale-up">
              <div className="success-icon-container">
                <Check size={40} className="success-icon" />
              </div>
              <h2>Welcome to TaskMate!</h2>
              <p>Authentication was successful. Loading your personal dashboard space...</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="auth-header">
                <h2>{activeTab === 'login' ? 'Sign In to TaskMate' : 'Get Started for Free'}</h2>
                <p>Connecting you to trusted local freelancers for home & office tasks.</p>
              </div>

              {/* Role Select tab buttons */}
              <div className="role-selector auth-page-role">
                <button 
                  type="button" 
                  className={`role-btn ${role === 'user' ? 'active' : ''}`}
                  onClick={() => setRole('user')}
                >
                  <User size={16} /> I want to Hire
                </button>
                <button 
                  type="button" 
                  className={`role-btn ${role === 'tasker' ? 'active' : ''}`}
                  onClick={() => setRole('tasker')}
                >
                  <Shield size={16} /> I want to Work
                </button>
              </div>

              {/* Login vs Signup Tabs */}
              <div className="modal-tabs">
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('login'); setError(''); }}
                >
                  Sign In
                </button>
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('signup'); setError(''); }}
                >
                  Create Account
                </button>
              </div>

              {error && <div className="modal-error-alert">{error}</div>}

              <form onSubmit={handleSubmit} className="modal-form">
                {activeTab === 'signup' && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-with-icon">
                      <User className="input-icon" size={18} />
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" size={18} />
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {activeTab === 'signup' && role === 'tasker' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <div className="input-with-icon">
                        <Phone className="input-icon" size={18} />
                        <input 
                          type="tel" 
                          placeholder="+1 (555) 000-0000" 
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Services Offered</label>
                      <select 
                        className="form-control select-control"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        required
                      >
                        <option value="">-- Select primary skill --</option>
                        <option value="assembly">Furniture Assembly</option>
                        <option value="mounting">Wall Mounting</option>
                        <option value="moving">Moving & Hauling</option>
                        <option value="cleaning">House Cleaning</option>
                        <option value="repairs">Home Repairs</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-with-icon">
                    <Lock className="input-icon" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary form-submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner"></span>
                  ) : (
                    activeTab === 'login' ? 'Sign In' : 'Create Free Account'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
