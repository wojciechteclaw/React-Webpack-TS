const getNthFibonacciItemValue = function (n) {
    if (n < 2) {
        return n;
    }
    return getNthFibonacciItemValue(n - 1) + getNthFibonacciItemValue(n - 2);
};

export {getNthFibonacciItemValue}