import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        setCount(count - 1);
    };

    const resetCount = () => {
        setCount(0);
    };

    return (
        <>
            <h1>{count}</h1>
            <div className="buttonContainer">
                <button onClick={decreaseCount}>-</button>
                <button onClick={increaseCount}>+</button>
                <button onClick={resetCount}>reset</button>
            </div>
        </>
    );
};

export default Counter;