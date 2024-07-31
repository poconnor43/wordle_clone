import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className = "modal">
        {isCorrect && (
            <div>
                <h1>YOU WIN!</h1>
                <p className = "solution">  The answer was: {solution}</p>
                <p>You found the solution in {turn} attempts</p>
            </div>
        )}
    {!isCorrect && (
            <div>
                <h1>YOU LOSE!</h1>
                <p className = "solution"> the answer was: {solution}</p>
                <p> to play again, refresh the screen!</p>
            </div>
        )}
    </div >
  )
}
