import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Award } from 'lucide-react';

export default function FeaturedTaskers({ activeCategory, searchQuery, onBookTasker }) {
  const [taskers, setTaskers] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const fetchTaskers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/taskers');
        if (!response.ok) {
          throw new Error('Failed to fetch taskers');
        }
        const data = await response.json();
        const formattedData = data.map(t => ({
          ...t,
          id: t._id,
          rate: t.hourlyRate || 0,
          reviewsCount: t.reviewsCount || 0,
          completedCount: t.completedCount || 0,
          categories: t.categories || []
        }));
        setTaskers(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskers();
  }, []);

  // Filter Taskers
  const filteredTaskers = taskers.filter(tasker => {
    // Filter by active category
    if (activeCategory && !tasker.categories.includes(activeCategory)) {
      return false;
    }
    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = tasker.name.toLowerCase().includes(q);
      const matchesBio = tasker.bio.toLowerCase().includes(q);
      const matchesCat = tasker.categories.some(c => c.toLowerCase().includes(q));
      if (!matchesName && !matchesBio && !matchesCat) {
        return false;
      }
    }
    return true;
  });

  // Sort Taskers
  const sortedTaskers = [...filteredTaskers].sort((a, b) => {
    if (sortBy === 'rate-low') {
      return a.rate - b.rate;
    }
    if (sortBy === 'rate-high') {
      return b.rate - a.rate;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: Elite status first, then by completed count
    if (a.isElite !== b.isElite) {
      return a.isElite ? -1 : 1;
    }
    return b.completedCount - a.completedCount;
  });

  const getCategoryName = (key) => {
    const maps = {
      assembly: 'Assembly',
      mounting: 'Mounting',
      moving: 'Moving',
      cleaning: 'Cleaning',
      outdoor: 'Yard Work',
      repairs: 'Home Repairs',
      painting: 'Painting',
      trending: 'Smart Home'
    };
    return maps[key] || key;
  };

  return (
    <section id="taskers" className="taskers-section">
      <div className="container">
        <div className="taskers-header">
          <div>
            <h2 className="section-title">Available Taskers</h2>
            <p className="section-subtitle">
              Compare ratings, services, and rates of local freelancers.
            </p>
          </div>

          {/* Sort Control */}
          <div className="sort-control">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select" 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated (5.0★)</option>
              <option value="rate-low">Price: Low to High</option>
              <option value="rate-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedTaskers.length > 0 ? (
          <div className="taskers-grid">
            {sortedTaskers.map((tasker) => (
              <div key={tasker.id} className="tasker-card animate-fade-in">
                <div className="tasker-card-body">
                  {/* Left Column: Avatar & Quick Info */}
                  <div className="tasker-profile-summary">
                    <div 
                      className="tasker-avatar-circle"
                      style={{ backgroundColor: tasker.avatarColor }}
                    >
                      {tasker.name.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    {tasker.isElite && (
                      <span className="badge badge-gold elite-badge">
                        <Award size={10} style={{ marginRight: '2px' }} />
                        Elite
                      </span>
                    )}
                    <div className="tasker-metric">
                      <Star size={16} className="star-icon" />
                      <span><strong>{tasker.rating.toFixed(1)}</strong> ({tasker.reviewsCount} reviews)</span>
                    </div>
                    <div className="tasker-metric">
                      <ShieldCheck size={16} className="shield-icon" />
                      <span className="verify-text">Vetted & Safe</span>
                    </div>
                  </div>

                  {/* Middle Column: Details */}
                  <div className="tasker-details">
                    <h3 className="tasker-name">{tasker.name}</h3>
                    <div className="tasker-location">
                      <MapPin size={14} />
                      <span>Within 15 miles of you</span>
                    </div>
                    <p className="tasker-bio">"{tasker.bio}"</p>
                    
                    <div className="tasker-categories-chips">
                      {tasker.categories.map((c, i) => (
                        <span key={i} className="tasker-chip">
                          {getCategoryName(c)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Price & Call-to-action */}
                  <div className="tasker-price-action">
                    <div className="price-box">
                      <span className="hourly-rate">${tasker.rate}</span>
                      <span className="rate-unit">/ hour</span>
                    </div>
                    <div className="completed-tag">
                      <strong>{tasker.completedCount}</strong> tasks done
                    </div>
                    <button 
                      className="btn btn-primary book-btn"
                      onClick={() => onBookTasker(tasker)}
                    >
                      Select & Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-taskers animate-fade-in">
            <p>No matching taskers found. Clear your category filter or expand your search criteria.</p>
            {activeCategory || searchQuery ? (
              <button 
                className="btn btn-outline" 
                style={{ marginTop: '16px' }}
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

