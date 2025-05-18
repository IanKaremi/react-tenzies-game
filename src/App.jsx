import {useState } from 'react'
import './App.css'
import Die from './die'

function App() {

 

  const [dice, setDice] = useState(getDiceNumbers())
  
  
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
    setDice(prevDice => prevDice.map(die=>
      die.isHeld ? die :  {...die, value: Math.floor(Math.random() * 6) + 1}
        //if the die is held, return it as is
      
    ))
    
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
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='diceGrid'>
        {dieElements}
        </div>
        <button className='rollBtn' onClick={rollDice}>Roll</button>


     </main>
    </>
  )
}

export default App
