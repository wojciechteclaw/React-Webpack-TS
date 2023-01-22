import { wrap } from "comlink";
import React, { useEffect, useState } from "react";
import { WorkerType } from "../../workers/my_fancy_comlink_worker";

const WorkerComlink = () => {
  const [fibonacciRequestedValue, setFibonacciRequestedValue] = useState<number | null>(null);
  const [fibonacciResult, setFibonacciResult] = useState<number | null>(null);

  const onClick = async () => {
    const worker = new Worker(
      new URL("../../workers/my_fancy_comlink_worker.ts", import.meta.url),
      { type: "module", name: "fibonacci" }
    );
    const tasks = wrap<WorkerType>(worker);
    if (fibonacciRequestedValue) {
      setFibonacciResult(await tasks.getNthFibonacciItemValueComlink(fibonacciRequestedValue));
      setTimeout(() => {
          setFibonacciResult(null)
      }, 5000)
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setFibonacciRequestedValue(parseInt(e.target.value));
    }
  };

  return (
    <div id="workercomlinkactioncontainer" className='container'>
      <h3>Worker Comlink Action</h3>
      <input type="number" onChange={onInputChange} />
      <button id="workercomlinkaction" onClick={onClick}>
        Calculate
      </button>
      <br />
      {fibonacciResult ? `Result:${fibonacciResult}` : ""}
    </div>
  );
};

export { WorkerComlink };
