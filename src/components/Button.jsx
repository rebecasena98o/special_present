// src/components/Button.jsx
import React from 'react';

import ButtonRight from '../assets/ui/Button_Right.png';
import ButtonLeft from '../assets/ui/Button_Left.png';

export const Button = ({ direction = 'next', onClick }) => {

  const imageSrc = direction === 'next' ? ButtonRight : ButtonLeft;

  const buttonStyle = {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <button 
      onClick={onClick} 
      style={buttonStyle}
      className="pixel-button"
      aria-label={direction === 'next' ? 'Próxima carta' : 'Carta anterior'}
    >
     <img 
        src={imageSrc} 
        alt={direction === 'next' ? 'Seta Direita' : 'Seta Esquerda'} 
        style={{ 
          width: '48px', 
          height: '48px',
          imageRendering: 'pixelated' 
        }} 
      />
    </button>
  );
};