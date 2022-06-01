import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src":"/img/helmet-1.png", matched: false},
  {"src":"/img/potion-1.png", matched: false},
  {"src":"/img/ring-1.png", matched: false},
  {"src":"/img/scroll-1.png", matched: false},
  {"src":"/img/shield-1.png", matched: false},
  {"src":"/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // handle a choice
  const handleChoice = (c) => {
    choiceOne ? setChoiceTwo(c) : setChoiceOne(c)
  }


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id:Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // check if card matches
  useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
          setCards(prev => 
            prev.map(
              card => {
                if (card.src === choiceOne.src) {
                  return {...card, matched: true}
                } else {
                  return card
                }
              }
            ))
            resetChoices()
        } else {
          setTimeout(() => resetChoices(), 1000)
        }
      }
    }, [choiceOne, choiceTwo]
  )

  
  // reset choices and increace turns
  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prev) => prev + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {
          cards.map((card) => { return (
            <SingleCard  
            key={card.id}  
            card={ card } 
            handleChoice={handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
            disabled={disabled}
            />
          )})
        }
      </div>

      <h4>Turns: {turns}</h4>
    </div>
  );
}


export default App;
