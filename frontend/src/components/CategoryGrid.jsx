import React from 'react';

const CATEGORIES = [
  { id: 1, name: "For You",          image: 'https://images.unsplash.com/photo-1513885045260-6b3086b24c17?w=100&q=80' },
  { id: 2, name: "Fashion",          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&q=80' },
  { id: 3, name: "Mobiles",          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80' },
  { id: 4, name: "Beauty",           image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80' },
  { id: 5, name: "Electronics",      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&q=80' },
  { id: 6, name: "Home",             image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&q=80' },
  { id: 7, name: "Appliances",       image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&q=80' },
  { id: 8, name: "Toys & Baby",      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&q=80' },
  { id: 9, name: "Food & Health",    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&q=80' },
  { id: 10, name: "Auto Accessories",image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&q=80' },
];

const CategoryGrid = ({ setCurrentPage, onCategoryClick }) => {
  return (
    <div className="category-nav-bar" style={{ maxWidth: '1600px', margin: '0 auto', marginBottom: '1rem' }}>
      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          className="category-nav-item"
          onClick={() => {
            if (onCategoryClick) onCategoryClick(cat.name);
            if (setCurrentPage) setCurrentPage('products');
          }}
        >
          <img src={cat.image} alt={cat.name} style={{ borderRadius: '50%' }} />
          <div className="category-title">{cat.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
