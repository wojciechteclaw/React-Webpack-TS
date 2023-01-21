import { getNthFibonacciItemValue } from "../actions/index";

self.addEventListener("message", (event) => {
  const { data } = event;
  let fibonacciResult = getNthFibonacciItemValue(data.fibonacciRequestedValue);
  console.log(`Inside worker calculated value:${fibonacciResult}` )
  self.postMessage({fibonacciResult});
});
