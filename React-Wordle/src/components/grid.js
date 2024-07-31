import React from 'react'
import Row from './Row'
// make a series of the grids to appear on the screen for the user
export default function Grid({currentGuess, guesses, turn}) {
  return (
    <div>
    {guesses.map((g,i) => {
        if(turn  === i) {
            return <Row key ={i} currentGuess = {currentGuess}/>
        }
        return<Row key ={i} guess = {g}/>
    })}
    </div>
  )
}
