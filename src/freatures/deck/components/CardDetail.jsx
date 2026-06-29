
import { useDeck } from './hooks/useDeck';
import { Button } from '../../components/Button';

const { currentCharacter, nextCard, prevCard } = useDeck();

return (
  <div className="deck-container">
    <Button direction="prev" onClick={prevCard} />
    
    <img src={currentCharacter.spriteUrl} alt={currentCharacter.name} />
    
    <Button direction="next" onClick={nextCard} />
  </div>
);