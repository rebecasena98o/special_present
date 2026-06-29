import React from 'react';
import {motion} from 'framer-motion';
import '../../../style/Card3D.css';

export const Card3D = ({ character, isFlipped, onClick}) => {
    return (
        <div className="card-perspective" onClick={onClick}>
            <motion.div
                className= "card-inner"
                initial = {false}
                animate = {{rotateY: isFlipped ? 180 : 0}}
                transition = {{duration: 0.6, type: "spring", stiffness: 260, damping: 25}}
                >
                <div className="card-face card-front">
          {character.spriteUrl ? (
            <img src={character.spriteUrl} alt={character.name} className="pixel-art" />
          ) : (
            <div className="placeholder-sprite">Sem Sprite</div>
          )}
        </div>

        <div className="card-face card-back" style={{ borderColor: character.themeColor }}>
          <div className="stats-header">
            <span className="char-number">#{character.number}</span>
            <h3>{character.name}</h3>
            <span className="char-origin">{character.origin}</span>
          </div>
          
          <p className="char-message">"{character.message}"</p>
          
          <div className="stats-container">
            {Object.entries(character.stats).map(([key, value]) => {
              const displayValue = value > 100 ? 100 : value;
              return (
                <div key={key} className="stat-row">
                  <div className="stat-info">
                    <span className="stat-name">{key.replace('_', ' ').toUpperCase()}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                  <div className="stat-bar-bg">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${displayValue}%`, backgroundColor: character.themeColor }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};