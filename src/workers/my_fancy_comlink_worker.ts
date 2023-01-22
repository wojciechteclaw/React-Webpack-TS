import { getNthFibonacciItemValue } from '../actions/index';
import { expose } from 'comlink';


const getNthFibonacciItemValueComlink = (n: number) => {
    console.log('this is message inside comlink worker');
    let result = getNthFibonacciItemValue(n);
    console.log('this is message after execution of comlink worker');
    return result;
}

const worker = {
    getNthFibonacciItemValueComlink
}

export type WorkerType = typeof worker;
expose (worker);