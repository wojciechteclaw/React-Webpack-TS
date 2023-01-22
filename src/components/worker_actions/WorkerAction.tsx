import React, { useEffect, useState } from 'react'
// import { getNthFibonacciItemValue } from '../../actions'

const WorkerAction = () => {
  
    const [fibonacciRequestedValue, setFibonacciRequestedValue] = useState<number|null>(null)
    const [fibonacciResult, setFibonacciResult] = useState<number|null>(null)

    const onClick = async () => {
        const worker = new Worker(new URL("../../workers/my_fancy_worker.ts", import.meta.url), {type:"module"})
        worker.postMessage({fibonacciRequestedValue})
        worker.onmessage = (e) => {
            let {fibonacciResult} = e.data
            setFibonacciResult(fibonacciResult)
            setTimeout(() => {
                setFibonacciResult(null)
            }, 5000)
        }
    }

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setFibonacciRequestedValue(parseInt(e.target.value))
        }
    }
  
    return (
    <div id="workeractioncontainer" className='container'>
        <h3>Worker Action</h3>
        <input type="number" onChange={onInputChange}/>
        <button id='workeraction' onClick={onClick}>Calculate</button>
        <br />
        {fibonacciResult?`Result:${fibonacciResult}`:""}
    </div>
  )
}

export {WorkerAction}