import React from 'react';

const HeroBanner = ({ setCurrentPage }) => {
  return (
    <div className="hero-banner-logo" style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" alt="LuminaStore Sale Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Welcome to LuminaStore</h1>
        <button 
          onClick={() => setCurrentPage('products')}
          style={{ padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#ff9f00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
