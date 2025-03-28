import Burger from '../components/Burger'
import { useState } from "react";


const BurgerShop = () => {
  const burgerNames = ['Le new yorker', 'Le chicken', 'Le black pepper']
  const [burgerChosen, setBurgerChosen] = useState('')
  const [sauce, setSauce] = useState([])


  const getBurger = (myBurger) => {
    console.log('clicked from parent', myBurger)
    setBurgerChosen(myBurger)
  }

  const addSauce = (mySauce) => {
    if (!sauce.includes(mySauce)) {
      setSauce([...sauce, mySauce])
    }
  }
 
  return (
    <>
      <div>Vous avez choisi: {burgerChosen}</div>
      <div>Choisissez une sauce: {sauce.join(',')}</div>
      <button onClick={() => addSauce('ketchup')}>Ketchup</button>
      <button onClick={() => addSauce('mayo')}>Mayo</button>
      <div className="flex">
        {
          burgerNames.map((burger, index) => (
            <div key={index}>
              <Burger burgerName={burger} handleParentClick={getBurger} />
            </div>
          ))
       }
      </div>
    </>
  )
}

export default BurgerShop;