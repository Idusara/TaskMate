import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'General Furniture Assembly',
  'IKEA Assembly',
  'Crib Assembly',
  'Bookshelf Assembly',
  'Desk Assembly',
  'TV Wall Mounting',
  'Shelving & Rods',
  'Heavy Lifting & Moving',
  'Deep House Cleaning',
  'Yard Work & Mowing',
  'Home Repair & Maintenance',
  'Wall Painting',
  'Appliance Setup'
];

export default function HeroSection({ onSearch, onSelectCategory }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = query
    ? SUGGESTIONS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS.slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <header className="hero-section">
      <div className="background-decor">
        <div className="decor-circle-1"></div>
        <div className="decor-circle-2"></div>
      </div>
      
      <div className="container hero-content animate-fade-in">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>No. 1 Trusted Local Service Provider</span>
        </div>
        
        <h1 className="hero-title">
          Book trusted help <br />
          for <span className="text-gradient">home & office tasks</span>
        </h1>
        
        <p className="hero-description">
          Find top-rated, background-checked professionals for cleaning, mounting, assembly, and home repairs instantly.
        </p>

        {/* Search Bar Container */}
        <div className="search-outer">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={22} />
              <input
                type="text"
                placeholder="What do you need help with?"
                className="search-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
            </div>
            <button type="submit" className="btn btn-primary search-btn">
              Find a Tasker
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="search-suggestions-dropdown animate-fade-in">
              <div className="dropdown-title">Recommended Services</div>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="dropdown-item"
                    onMouseDown={() => handleSuggestionClick(item)}
                  >
                    <Search size={14} style={{ marginRight: '8px', opacity: 0.6 }} />
                    {item}
                  </button>
                ))
              ) : (
                <div className="dropdown-no-results">No matches found. Try searching something else.</div>
              )}
            </div>
          )}
        </div>

        {/* Popular Searches */}
        <div className="popular-tags">
          <span className="tag-label">Popular tasks:</span>
          {['IKEA Assembly', 'TV Mounting', 'Deep Cleaning', 'Yard Mowing'].map((tag) => (
            <button
              key={tag}
              type="button"
              className="tag-btn"
              onClick={() => {
                setQuery(tag);
                onSearch(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
