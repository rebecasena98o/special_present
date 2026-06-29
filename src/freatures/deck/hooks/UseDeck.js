import { useState, useEffect } from "react";
import { charactersData } from "../../../data/charactersData";

export const useDeck = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const currentCharacter = charactersData[currentIndex];

    //loop para próxima carta
    const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === charactersData.length - 1 ? 0 : prevIndex + 1
    );
  };

  //loop para carta anterior
  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? charactersData.length - 1 : prevIndex - 1
    );
  };

  // Permite pular direto para uma carta específica se criarmos um menu/grade lateral
  const goToCard = (id) => {
    const index = charactersData.findIndex(char => char.id === id);
    if (index !== -1) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  };

  return {
    currentCharacter,
    currentIndex,
    totalCards: charactersData.length,
    direction,
    nextCard,
    prevCard,
    goToCard
  };
}