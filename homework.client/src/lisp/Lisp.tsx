import { useState } from "react";
import { useCheckParentheses } from "./useCheckParentheses";

function Lisp() {
  const [code, setCode] = useState<string>("");
  const { isValid, checkParentheses } = useCheckParentheses();

  return (
    <main className="search">
      <div className="App">
        <h1>Parentheses Checker</h1>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <br />
        <button onClick={() => checkParentheses(code)}>Check</button>
        <br />
        {isValid !== null && <p>Parentheses are valid: {isValid.toString()}</p>}
      </div>
    </main>
  );
}

export default Lisp;
