import React, {useState} from 'react';

const useCalculator = ({player1, player2}) => {
    const [success, setSuccess] = useState(0)
    const [profile1, setProfile1] = useState({})
    const [profile2, setProfile2] = useState({})
    const [results, setResults] = useState({})

    const calcFunction = () => {
        setProfile1(player1)
        setProfile2(player2)

        let profile1Rolls = []
        for(let i = 0; i < profile1.bs; i++){
            profile1Rolls.push(Math.random() * (20 -1) + 1);
        }

        let profile2Rolls = []
        for(let i = 0; i < profile2.bs; i++){
            profile2Rolls.push(Math.random() * (20 -1) + 1);
        }

        setResults({profile1Rolls, profile2Rolls})
    }

    calcFunction()
    return {results}
}

export default useCalculator;