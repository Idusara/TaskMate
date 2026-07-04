import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import CategoryGrid from './components/home/CategoryGrid';
import FeaturedTaskers from './components/home/FeaturedTaskers';
import HowItWorks from './components/home/HowItWorks';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import BookingWizard from './components/booking/BookingWizard';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  // Interactive UI Filters
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Routing view state: 'home' | 'auth' | 'admin'
  const [view, setView] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role === 'admin') return 'admin';
    }
    return 'home';
  });
  const [authInitialTab, setAuthInitialTab] = useState('login');

  // Booking Flow
  const [bookingWizardOpen, setBookingWizardOpen] = useState(false);
  const [selectedTasker, setSelectedTasker] = useState(null);

  // Sync theme attribute on start
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Auth helper handlers
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.role === 'admin') {
      setView('admin');
    } else {
      setView('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setView('home');
  };

  const navigateToAuth = (tabName) => {
    setAuthInitialTab(tabName);
    setView('auth');
  };

  // Search trigger from Hero
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Auto scroll to taskers when searching
    if (query) {
      const taskerSection = document.getElementById('taskers');
      if (taskerSection) {
        taskerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Category select from grid
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
  };

  const handleSubcategorySelect = (subName) => {
    setSearchQuery(subName);
    // Auto scroll to tasker profiles list
    const taskerSection = document.getElementById('taskers');
    if (taskerSection) {
      taskerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger Booking Gated by Login
  const handleBookTasker = (tasker) => {
    setSelectedTasker(tasker);
    if (!user) {
      // Prompt user to sign up or sign in first
      navigateToAuth('login');
    } else {
      setBookingWizardOpen(true);
    }
  };

  if (view === 'auth') {
    return (
      <AuthPage 
        initialTab={authInitialTab}
        onLoginSuccess={handleLoginSuccess}
        onGoBack={() => setView('home')}
      />
    );
  }

  if (view === 'admin' && user?.role === 'admin') {
    return (
      <div className="app-container">
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          onOpenLogin={navigateToAuth}
          user={user}
          onLogout={handleLogout}
          onNavigateHome={() => setView('home')}
          onNavigateAdmin={() => setView('admin')}
        />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        onOpenLogin={navigateToAuth}
        user={user}
        onLogout={handleLogout}
        onNavigateHome={() => setView('home')}
        onNavigateAdmin={() => setView('admin')}
      />

      {/* Hero Banner Area */}
      <HeroSection 
        onSearch={handleSearch}
        onSelectCategory={handleSelectCategory}
      />

      {/* Interactive Main Content */}
      <main style={{ flex: 1 }}>
        {/* Categories grid list */}
        <CategoryGrid 
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onSubcategorySelect={handleSubcategorySelect}
        />

        {/* Informative Step-by-Step section */}
        <HowItWorks />

        {/* Vetted professionals listings */}
        <FeaturedTaskers 
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onBookTasker={handleBookTasker}
        />
      </main>

      {/* Bottom Footer Section */}
      <Footer />

      <BookingWizard 
        isOpen={bookingWizardOpen}
        onClose={() => setBookingWizardOpen(false)}
        tasker={selectedTasker}
      />
    </div>
  );
}

export default App;
