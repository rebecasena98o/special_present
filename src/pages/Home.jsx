import React from 'react';
import { useNavigate } from 'react-router-dom';

import buttonOneImg from '../assets/ui/Button-one.png';
import buttonTwoImg from '../assets/ui/Button-two.png';
import backgroundImg from '../assets/background/background_neve.png';

export default function Home() {
  const navigate = useNavigate();


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      color: '#fff',
      fontFamily: "'Press Start 2P', sans-serif",
    }}>
      <h1 style={{
         marginBottom: '40px', 
         fontSize: '3.2rem',
        textAlign: 'center',
        fontFamily: "'Pixelify Sans', sans-serif",
        fontWeight: 'normal',
        letterSpacing: '1px',
        background: 'linear-gradient(to bottom, #fff6cc 0%, #ffd700 40%, #cca100 75%, #ffae00 100%)',
        WebkitBackgroundClip: 'text',
        boxShadow: 'none',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        textShadow: `
        0 4px 0px #806600, 
        0 8px 0px #000000, 
        0 12px 25px rgba(255, 215, 0, 0.3)
        `
         }}>
        Escolha o seu Destino
      </h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => navigate('/deck')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            transition: 'transform 0.2s ease, filter 0.2s ease',
          }}
          className="menu-sprite-button"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        >
          <img 
            src={buttonOneImg} 
            alt="Cartas 3D" 
            style={{
              width: '240px',
              height: 'auto',
              imageRendering: 'pixelated', 
              display: 'block'
            }}
          />
        </button>

        <button 
          onClick={() => navigate('/flower')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            transition: 'transform 0.2s ease, filter 0.2s ease',
          }}
          className="menu-sprite-button"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        >
          <img 
            src={buttonTwoImg} 
            alt="O Despertar da Flor" 
            style={{
              width: '240px',
              imageRendering: 'pixelated', 
              display: 'block'
            }}
          />
        </button>
      </div>
    </div>
  );
}