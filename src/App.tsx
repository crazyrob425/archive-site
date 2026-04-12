import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1412 0%, #2a2420 100%)',
      fontFamily: '"Playfair Display", serif',
      color: '#f5ede3'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #d4af69 0%, #f5ede3 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 4px 6px rgba(212, 175, 105, 0.3)'
        }}>
          The Archive of Rare Knowledge
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#c1a87b',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          A luxury digital bookstore of obscure, niche, and hard-to-find knowledge.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #d4af69 0%, #c1a87b 100%)',
            color: '#1a1412',
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(212, 175, 105, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 105, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 105, 0.3)';
          }}>
            Explore Collections
          </button>
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            background: 'transparent',
            color: '#d4af69',
            border: '2px solid #d4af69',
            borderRadius: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 105, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
