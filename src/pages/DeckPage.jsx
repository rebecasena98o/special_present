// src/pages/DeckPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeck } from '../freatures/deck/hooks/useDeck';
import { Button } from '../components/Button';
import { Card3D } from '../freatures/deck/components/Card3D';
import SunsetForestBackground from '../freatures/deck/components/SunsetForestBackground';
import { AnimatePresence, motion } from 'framer-motion';
import '../style/App.css';

export default function DeckPage() {
  const navigate = useNavigate();
  const { currentCharacter, nextCard, prevCard, direction } = useDeck();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    nextCard();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    prevCard();
  };

  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 400 : -400,
      rotate: dir > 0 ? 35 : -35,
      opacity: 0,
      scale: 0.6,
      zIndex: 0
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      zIndex: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 20 },
        rotate: { type: "spring", stiffness: 180, damping: 18 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -500 : 500,
      rotate: dir > 0 ? -45 : 45,
      y: -80,
      scale: 0.7,
      opacity: 0,
      transition: {
      x: { type: "spring", stiffness: 260, damping: 22 },
      y: { duration: 0.3, ease: "easeIn" },
      rotate: { duration: 0.3 },
      opacity: { duration: 0.15 }
      }
    })
  };
  return (
    <>
      <SunsetForestBackground />

      {/* Seu botão personalizado de Voltar */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 9999,
          padding: '10px 20px',
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
        }}
      >
        &larr; Voltar
      </button>

      <div 
      className="app-container" 
      style={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
        <div className="nav-wrapper left-nav">
          <Button direction="prev" onClick={handlePrev} />
        </div>

        <div className="center-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentCharacter.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              <Card3D 
                character={currentCharacter} 
                isFlipped={isFlipped} 
                onClick={() => setIsFlipped(!isFlipped)} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="nav-wrapper right-nav">
          <Button direction="next" onClick={handleNext} />
        </div>
      </div>
    </>
  );
}