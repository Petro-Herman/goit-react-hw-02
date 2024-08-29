import { useState } from "react";
import Description from "../Description/Description";


export default function App() {
const [clicks, setClicks] = useState (0);
const [isOpen, setIsOpen] = useState(false);

const handleClick = () => {
    setClicks(clicks + 1);
};

const handleToggle = () => {
    setIsOpen(!isOpen);
};

    return (
        <div>
            <Description/>
            <button onClick={handleClick}>Good</button>
            <p>Good: {clicks}</p>
        </div>
    );
};