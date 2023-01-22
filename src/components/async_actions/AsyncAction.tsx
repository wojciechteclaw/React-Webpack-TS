import React, { useEffect, useState } from 'react'
import { getNthFibonacciItemValue } from '../../actions/index'

const AsyncAction = () => {
  
    const [fibonacciValue, setFibonacciValue] = useState<number|null>(null)
    const [fibonacciResult, setFibonacciResult] = useState<number|null>(null)

    const onClick = () => {
        let result = getNthFibonacciItemValue(fibonacciValue);
        setFibonacciResult(result)
        setTimeout(() => {
            setFibonacciResult(null)
        }, 5000)
    }

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setFibonacciValue(parseInt(e.target.value))
        }
    }
  
    return (
    <div id="asyncactioncontainer" className='container'>
        <h3>Async Action</h3>
        <input type="number" onChange={onInputChange}/>
        <button id='asyncaction' onClick={onClick}>Calculate</button>
        <br />
        {fibonacciResult?`Result:${fibonacciResult}`:""}
    </div>
  )
}

export {AsyncAction}