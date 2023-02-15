import './App.css';
import {useState} from 'react'

const AC = "AC";
const EQUALS = "=";
const DECIMAL = ".";
const MINUS = "-";

const CALC_DATA = [
  { id: "clear", value: AC },
  { id: "divide", value: "/" },
  { id: "multiply", value: "*" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: MINUS },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: EQUALS },
  { id: "zero", value: 0 },
  { id: "decimal", value: DECIMAL },
];

const OPERATORS = ["/", "*", "+", MINUS];

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ lastInput, display }) => (
  <div className="output">
    <span id="display" className="result">{display}</span>
    <span className="input">{lastInput}</span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {CALC_DATA.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [lastInput, setLastInput] = useState("");
  const [display, setDisplay] = useState("0");

  const handleInput = input => {
    if (input === AC) {
      setDisplay("0");
      setLastInput();
      return;
    }

    if (NUMBERS.includes(input)) {
      if (display === "0" || lastInput === EQUALS) {
        setDisplay(`${input}`);
      } else {
        setDisplay(`${display}${input}`);
      }
      setLastInput(input); 
      return;
    }

    if (input === EQUALS) {
      try {
        setDisplay(eval(display));
        setLastInput(input);
      } catch (error) {
        console.error("eval failed for display value: ", display)
      }
    }

    if (OPERATORS.includes(input)) {
      if (!OPERATORS.includes(lastInput) || input === MINUS) {
        setDisplay(`${display}${input}`);
      } else {
        const displayWithoutTrailingOperators = display.replace(/[\+\-\*\/]+$/, "");
        setDisplay(`${displayWithoutTrailingOperators}${input}`);
      }
      setLastInput(input); 
    }

    if (input === DECIMAL) {
      const currentNumber = display.split(/[\+\-\*\/]/).pop();

      if (!currentNumber.includes(DECIMAL)) {
        setDisplay(`${display}${input}`);
        setLastInput(input);
      }
    }
  }

  return (
    <div className="container">
      <div className="calculator">
        <Display lastInput={lastInput} display={display} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
