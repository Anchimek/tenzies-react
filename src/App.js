import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(createDice())

  React.useEffect(() => {
    const controlNum = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const sameNum = dice.every(die => die.value === controlNum)
    
    if(allHeld && sameNum) setTenzies(true)

  }, [dice])

  function createDieBody() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  }

  function createDice() {
    const dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(createDieBody())
    }
    return dice
  }


  function holdDie(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : { ...die }
    }))
  }

  function roll() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld
          ? die
          : createDieBody()
      })) 
    }
    else {
      setTenzies(false)
      setDice(createDice())
    }
  }

  const createDies = dice.map(die => {
    return (
      <Die
        key={die.id}
        value={die.value}
        holdDie={() => holdDie(die.id)}
        isHeld={die.isHeld}
      />
    )
  })

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='container'>
          <div className='game-board'>
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same.
                Click each die to freeze it at its
                current value between rolls.
            </p>

            <div className='dice-container'>
              {createDies}
            </div>

            <button onClick={roll}>
              {tenzies ? 'New game' : 'Roll'}
            </button>

          </div>
      </div>
    </main>
  )
}

export default App;
