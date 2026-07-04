import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Check, Shield, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, initialView = 'login', onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState(initialView); // 'login' | 'signup' | 'tasker'
  const [role, setRole] = useState('user'); // 'user' | 'tasker'
  
  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  
  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Sync initial view if modal is triggered with a specific screen
  React.useEffect(() => {
    if (isOpen) {
      if (initialView === 'tasker') {
        setActiveTab('signup');
        setRole('tasker');
      } else {
        setActiveTab(initialView);
        setRole('user');
      }
      // Reset form on open
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setSkills('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic Valuations
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (activeTab === 'signup' && !name) {
      setError('Please provide your name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // Mock network request delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Simulate success after 1 second
      setTimeout(() => {
        const mockUserData = {
          name: name || (email.split('@')[0].toUpperCase()),
          email: email,
          role: role
        };
        onLoginSuccess(mockUserData);
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {success ? (
          <div className="modal-success-screen animate-fade-in">
            <div className="success-icon-container">
              <Check size={40} className="success-icon" />
            </div>
            <h2>Authentication Successful!</h2>
            <p>Welcome to TaskMate. Setting up your profile workspace...</p>
          </div>
        ) : (
          <div className="modal-body">
            {/* Header branding */}
            <div className="modal-header">
              <h2 className="modal-title">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="modal-subtitle">
                {role === 'tasker' 
                  ? 'Join as a Service Provider and start earning!' 
                  : 'Hire local trusted taskers for your needs.'
                }
              </p>
            </div>

            {/* Toggle Roles (only on general Signup/Login) */}
            {initialView !== 'tasker' && (
              <div className="role-selector">
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
            )}

            {/* Tabs */}
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
                New Account
              </button>
            </div>

            {/* Error Message */}
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
                    <label className="form-label">Primary Services Offered</label>
                    <select 
                      className="form-control select-control"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      required
                    >
                      <option value="">-- Choose Specialization --</option>
                      <option value="assembly">Furniture Assembly</option>
                      <option value="mounting">Wall Mounting</option>
                      <option value="moving">Moving & Lifting</option>
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
                  activeTab === 'login' ? 'Access Account' : 'Register Now'
                )}
              </button>
            </form>

            <div className="modal-divider-text">
              <span>Or connect with</span>
            </div>

            {/* Social Logins */}
            <div className="social-auth-grid">
              <button type="button" className="btn btn-outline social-auth-btn" onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  onLoginSuccess({ name: 'Google User', email: 'user@google.com', role: 'user' });
                  onClose();
                }, 1000);
              }}>
                <svg className="social-svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google
              </button>
              
              <button type="button" className="btn btn-outline social-auth-btn" onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  onLoginSuccess({ name: 'Apple User', email: 'user@apple.com', role: 'user' });
                  onClose();
                }, 1000);
              }}>
                <svg className="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
