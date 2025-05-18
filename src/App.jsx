import {useState } from 'react'
import './App.css'
import Die from './die'
import Confetti from 'react-confetti'

function App() {

 

  const [dice, setDice] = useState(()=> getDiceNumbers())
//done to prevent react from re-rendering the component every time the state changes
  function checkWin() {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die => die.value === firstValue)
     if (allHeld && allSameValue) {
       console.log("You win!")
       return true
     } else {
       return false
     }
  }
  var won = checkWin()
  
  function getDiceNumbers() {
    var diceArray = []

   
    for (let i = 0; i < 10; i++) {
      //generate a random number between 1 and 6
          var obj = {isHeld: false, value: Math.floor(Math.random() * 6) + 1}
          diceArray.push(obj)
     
     
    } 
    //console.log("diceArray: " + diceArray)
    return diceArray
  }



  function holdDie(key){
    setDice(prevDice => {
      return prevDice.map((die, index) => {
        //if the index of the die is equal to the key passed in, set isHeld to true
        if (index === key) {
          return {...die, isHeld: !die.isHeld}
        } else {
          return die
        }
      })
    })
    console.log("index: " + key)
  };

  function rollDice() {
    if(!won){
    setDice(prevDice => prevDice.map(die=>
      die.isHeld ? die :  {...die, value: Math.floor(Math.random() * 6) + 1}
        //if the die is held, return it as is
      
    ))
  }else{
    setDice(getDiceNumbers())
    //if the game is won, reset the game
  }
    
  }



  //map through the diceArray and create a die element for each number
  var dieElements = dice.map((die, index) => {
    return (
      <Die key={index} id={index}  value={die.value} held={die.isHeld} hold={holdDie}/>
    )
  }
  )


  //console.log(dice)
  return (
    <>
     <main className='mainEl'>
      {won && <Confetti/>}
      <div aria-live="polite" className="sr-only">
                {won && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='diceGrid'>
        {dieElements}
        </div>
        <button className='rollBtn' onClick={rollDice}>{won ? "New Game" : "Roll"}</button>


     </main>
    </>
  )
}

export default App
