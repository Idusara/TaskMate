import React from 'react';
import { CheckSquare, Moon, Sun, Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar({ 
  theme, 
  setTheme, 
  onOpenLogin, 
  user, 
  onLogout,
  onNavigateHome,
  onNavigateAdmin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <nav className="navbar-container">
      <div className="container nav-content">
        <div className="logo-section" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          <CheckSquare className="logo-icon" />
          <span className="logo-text">Task<span>Mate</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <a href="#categories" className="nav-link">Services</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <button className="nav-link text-btn" onClick={() => onOpenLogin('tasker')}>Become a Tasker</button>
          
          <div className="nav-divider"></div>
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div className="user-profile">
              <span className="welcome-text">Hi, {user.name}</span>
              {user.role === 'admin' && (
                <button className="btn btn-outline" onClick={onNavigateAdmin} style={{ marginRight: '10px' }}>
                  Admin Panel
                </button>
              )}
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <button className="btn btn-outline nav-logout-btn" onClick={onLogout} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-outline" onClick={() => onOpenLogin('login')}>Sign in</button>
              <button className="btn btn-primary" onClick={() => onOpenLogin('signup')}>Sign up</button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-toggle">
          <button className="theme-toggle" onClick={toggleTheme} style={{ marginRight: '12px' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <a href="#categories" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#how-it-works" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
          <button className="mobile-link text-btn-mobile" onClick={() => { onOpenLogin('tasker'); setMobileMenuOpen(false); }}>
            Become a Tasker
          </button>
          
          <div className="mobile-divider"></div>

          {user ? (
            <div className="mobile-user-section">
              <div className="user-profile-mobile">
                <div className="user-avatar large">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
              </div>
              {user.role === 'admin' && (
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '16px' }} onClick={() => { onNavigateAdmin(); setMobileMenuOpen(false); }}>
                  Admin Panel
                </button>
              )}
              <button className="btn btn-outline" style={{ width: '100%', marginTop: '16px' }} onClick={() => { onLogout(); setMobileMenuOpen(false); }}>
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <button className="btn btn-outline" onClick={() => { onOpenLogin('login'); setMobileMenuOpen(false); }}>Sign in</button>
              <button className="btn btn-primary" onClick={() => { onOpenLogin('signup'); setMobileMenuOpen(false); }}>Sign up</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
