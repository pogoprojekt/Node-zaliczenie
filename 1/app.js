// Napisz jak najprostszy kod który spowoduje błąd `stack overflow`,

//     czyli zwróci komunikat błędu:

//     ```
//     Uncaught RangeError: Maximum call stack size exceeded

function infiniteLoop() {

    infiniteLoop();
    
}

console.log(infiniteLoop());