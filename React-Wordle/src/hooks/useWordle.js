import { useState } from 'react';
// this is the og work version
const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}); // {a:'green', b:'yellow', c:'grey'}

    // format the guesses into an array of objects [{ key: "a", color: "yellow" }]
    const formatGuess = () => {
        // colors are set to a default of grey
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l)=> {
            return {key: l, color: 'grey'}
        })

        // find any letter that need to be green
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })
        //find all the yellow colors
        formattedGuess.forEach((l,i)=> {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    };

    // add a new guess to the guesses state, and if correct, increment the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys};

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return
                }

                if(l.color === 'grey' && currentColor !=='green' && currentColor !== 'yellow' ){
                    newKeys[l.key] = 'grey'
                    return
                }
            })  
            return newKeys
        })
        setCurrentGuess('')
    };

    // handle keyup event and track current guess
    // if user hits enter, add that to the new guess
    const handleKeyup = ({key}) => {
        // use rejex to make sure we have alphabet
        if(key === 'Enter') {
            // only add hess if turn is less then five && no repeated words && its five characters long
            if(turn  > 5){
                console.log('you used all guesses')
                return
            }

            if(history.includes(currentGuess)){
                console.log('you already tried that word')
                return
            }

            if(currentGuess.length !== 5) {
                console.log("Your word must be five characters long")
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if(key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return // becuase we are done
        }
        
        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    };

    // Return the states and functions you want to expose
    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
