import React, { useState } from 'react';
import { 
  Wrench, 
  Tv, 
  Truck, 
  Sparkles, 
  TreePine, 
  Hammer, 
  Paintbrush, 
  TrendingUp,
  Check
} from 'lucide-react';

const CATEGORIES_DATA = {
  assembly: {
    id: 'assembly',
    name: 'Assembly',
    icon: Wrench,
    title: 'Furniture Assembly',
    price: '$35',
    subcategories: [
      'General Furniture Assembly',
      'IKEA Assembly',
      'Crib Assembly',
      'Bookshelf Assembly',
      'Desk Assembly',
      'Bed Assembly',
      'Outdoor Furniture Assembly'
    ],
    bullets: [
      'Beds, desks, chairs, IKEA assemblies, and bookshelves put together.',
      'All tools and hardware handled safely by our vetted experts.',
      'Elite rated local professionals with clean, neat cleanup.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581785896080-c08ecf6a8e5a?auto=format&fit=crop&w=800&q=80'
  },
  mounting: {
    id: 'mounting',
    name: 'Mounting',
    icon: Tv,
    title: 'Wall Mounting',
    price: '$45',
    subcategories: [
      'Hang Art, Mirror & Decor',
      'Install Blinds & Window Treatments',
      'Mount & Anchor Furniture',
      'Install Shelves, Rods & Hooks',
      'Other Mounting',
      'TV Mounting'
    ],
    bullets: [
      'Securely mount your TV, shelves, art, mirrors, dressers, and more.',
      'Check drywall/stud strength to prevent future wall damage.',
      'Cables concealed beautifully for a neat, premium finish.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  moving: {
    id: 'moving',
    name: 'Moving',
    icon: Truck,
    title: 'Moving & Hauling',
    price: '$48',
    subcategories: [
      'Help Moving',
      'Truck-Assisted Help Moving',
      'Flat-Rate Move',
      'Trash & Furniture Removal',
      'Heavy Lifting & Loading',
      'Rearrange Furniture',
      'Junk Haul Away'
    ],
    bullets: [
      'Moving help such as packing/unpacking, loading, and lifting heavy items.',
      'Truck transport, cargo packing, and freight logistics configured.',
      'Decluttering and trash removal to keep spaces clean and tidy.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80'
  },
  cleaning: {
    id: 'cleaning',
    name: 'Cleaning',
    icon: Sparkles,
    title: 'House Cleaning',
    price: '$32',
    subcategories: [
      'Cleaning',
      'Apartment Cleaning',
      'Deep Clean',
      'Garage Cleaning',
      'Move Out Clean'
    ],
    bullets: [
      'Clean your home or office; deep clean appliances and other spaces.',
      'Now Trending: Eco-friendly products, home cleaning.',
      'Meticulous sanitation of kitchen, bathrooms, and floorings.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor Help',
    icon: TreePine,
    title: 'Outdoor Help',
    price: '$38',
    subcategories: [
      'Yard Work',
      'Lawn Care',
      'Lawn Mowing',
      'Branch & Hedge Trimming',
      'Gardening & Weeding',
      'Pressure Washing'
    ],
    bullets: [
      'Beat the heat with lawn mowing, garden maintenance, patio cleanup, and pressure washing for a summer-ready yard.',
      'Now Trending: Pressure washing services.',
      'Weeding, gutter cleanup, and hedge trimming done quickly.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80'
  },
  repairs: {
    id: 'repairs',
    name: 'Home Repairs',
    icon: Hammer,
    title: 'Home Repairs',
    price: '$50',
    subcategories: [
      'Door, Cabinet, & Furniture Repair',
      'Wall Repair',
      'Sealing & Caulking',
      'Appliance Installation & Repairs',
      'Window & Blinds Repair',
      'Flooring & Tiling Help',
      'Electrical Help',
      'Plumbing Help',
      'Light Carpentry'
    ],
    bullets: [
      'Home improvements like plumbing, electrical, and appliance installation.',
      'Drywall patching, door knobs, leak fixing, and minor electrical tasks.',
      'Experienced vetted handymen with professional gear.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  painting: {
    id: 'painting',
    name: 'Painting',
    icon: Paintbrush,
    title: 'Wall Painting',
    price: '$42',
    subcategories: [
      'Interior Wall Painting',
      'Cabinet Painting',
      'Door & Frame Paint',
      'Deck Staining',
      'Wall Patching & Trim'
    ],
    bullets: [
      'Accent walls, full room paint, ceiling refreshes, and cabinet paint.',
      'Meticulous taping, masking, clean borders, and smooth finishes.',
      'Touch-up repairs and surface prepping handled safely.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
  },
  trending: {
    id: 'trending',
    name: 'Trending',
    icon: TrendingUp,
    title: 'Smart Home Setup',
    price: '$55',
    subcategories: [
      'Smart TV Setup',
      'Security System Install',
      'Smart Thermostat Setup',
      'Ring Doorbell Setup',
      'Wifi Troubleshooting',
      'Voice Assistant Setup'
    ],
    bullets: [
      'Wifi routers, Nest thermostats, Ring bells, and security cameras setup.',
      'Mobile app integrations and connectivity configuration.',
      'Troubleshooting range issues and wifi dead zones solved.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
  }
};

const CATEGORIES_KEYS = ['assembly', 'mounting', 'moving', 'cleaning', 'outdoor', 'repairs', 'painting', 'trending'];

export default function CategoryGrid({ activeCategory, onSelectCategory, onSubcategorySelect }) {
  const [selectedKey, setSelectedKey] = useState(activeCategory || 'mounting');
  const [activeSub, setActiveSub] = useState(null);

  const currentCategory = CATEGORIES_DATA[selectedKey];
  const IconComponent = currentCategory.icon;

  const handleTabChange = (key) => {
    setSelectedKey(key);
    setActiveSub(null);
    onSelectCategory(key);
  };

  const handleSubClick = (subName) => {
    setActiveSub(subName);
    if (onSubcategorySelect) {
      onSubcategorySelect(subName);
    }
  };

  return (
    <section id="categories" className="categories-section">
      <div className="container">
        
        {/* Horizontal Category Nav bar */}
        <div className="tab-navigation-container">
          <div className="tab-scroller">
            {CATEGORIES_KEYS.map((key) => {
              const cat = CATEGORIES_DATA[key];
              const CatIcon = cat.icon;
              const isActive = selectedKey === key;

              return (
                <button
                  key={key}
                  type="button"
                  className={`category-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabChange(key)}
                >
                  <div className="tab-icon-wrapper">
                    <CatIcon size={22} />
                  </div>
                  <span className="tab-label-text">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="subcategory-pills-wrapper">
          <div className="pills-container">
            {currentCategory.subcategories.map((sub, idx) => {
              const isSubActive = activeSub === sub;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`sub-pill-btn ${isSubActive ? 'active' : ''}`}
                  onClick={() => handleSubClick(sub)}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Area: Left Description Card, Right Illustrative Photo */}
        <div className="showcase-container animate-fade-in" key={selectedKey}>
          <div className="showcase-content-grid">
            
            {/* Left Card */}
            <div className="showcase-details-card animate-scale-up">
              <h3 className="showcase-title">{currentCategory.title}</h3>
              
              <ul className="showcase-bullets">
                {currentCategory.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <div className="bullet-checkmark">
                      <Check size={14} />
                    </div>
                    <span className="bullet-text">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="showcase-cta">
                <span className="showcase-price-info">Starting at <strong>{currentCategory.price}</strong>/hr</span>
                <button 
                  className="btn btn-primary showcase-action-btn"
                  onClick={() => {
                    // Auto scroll to tasker profiles list
                    const taskerSection = document.getElementById('taskers');
                    if (taskerSection) {
                      taskerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Book {currentCategory.name} Help
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="showcase-photo-container">
              <img 
                src={currentCategory.imageUrl} 
                alt={`${currentCategory.title} Service`} 
                className="showcase-img"
              />
              <div className="showcase-photo-gradient"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
export { CATEGORIES_DATA };
