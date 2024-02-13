import { useState } from "react";
import { useCheckParentheses } from "./useCheckParentheses";

function Lisp() {
  const [code, setCode] = useState<string>("");
  const { isValid, checkParentheses } = useCheckParentheses();

  return (
    <main className="container mt-4">
      <div className="App">
        <h1>Parentheses Checker</h1>
        <textarea
          className="w-100"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <button
          className="btn btn-primary"
          onClick={() => checkParentheses(code)}
        >
          Check
        </button>

        {isValid !== null && (
          <div className="mt-4" role="status">
            {isValid ? (
              <div className="alert alert-success">Valid LISP Code!</div>
            ) : (
              <div className="alert alert-danger">Not Valid LISP Code</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Lisp;
