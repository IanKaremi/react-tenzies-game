import {useState} from 'react'
import './App.css'
import Die from './die'

function App() {

 

  const [dice, setDice] = useState(getDiceNumbers())
  
  
  function getDiceNumbers() {
    var diceArray = []
    diceArray.length = 10
    for (let i = 0; i < 10; i++) {
      //generate a random number between 1 and 6
      //and push it to each object then to the diceArray
      var obj = {isHeld: false, value: Math.floor(Math.random() * 6) + 1}
      diceArray.push(obj)
    } 
    console.log("diceArray: " + diceArray)
    return diceArray
  }

  //map through the diceArray and create a die element for each number
  var dieElements = dice.map((die, index) => {
    return (
      <Die key={index} value={die.value} held={die.isHeld}/>
    )
  }
  )

  console.log(dice)
  return (
    <>
     <main className='mainEl'>
        <div className='diceGrid'>
        {dieElements}
        </div>
        <button className='rollBtn' onClick={() => setDice(getDiceNumbers())}>Roll</button>


     </main>
    </>
  )
}

export default App
