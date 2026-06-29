// src/App.jsx
import React, { useState } from 'react';
import { useDeck } from './freatures/deck/hooks/useDeck';
import { Button } from './components/Button';
import { Card3D } from './freatures/deck/components/Card3D';
import SunsetForestBackground from './freatures/deck/components/SunsetForestBackground';
import { AnimatePresence, motion } from 'framer-motion';
import '../src/style/App.css';

function App() {
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
      rotate: { type: "spring", stiffness: 180, damping: 18 },
      scale: { duration: 0.4, ease: "easeOut" },
      opacity: { duration: 0.25 }
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

      <div className="app-container">
        {/* Botão Esquerda na Lateral do Site */}
        <div className="nav-wrapper left-nav">
          <Button direction="prev" onClick={handlePrev} />
        </div>

        {/* Container Central com a Carta Animada */}
        {/* CORREÇÃO: Adicionado os estilos inline necessários para que um card não empurre o outro no meio da transição */}
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

        {/* Botão Direita na Lateral do Site */}
        <div className="nav-wrapper right-nav">
          <Button direction="next" onClick={handleNext} />
        </div>
      </div>
    </>
  );
}

export default App;