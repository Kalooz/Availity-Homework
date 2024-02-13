import { useState } from "react";

export function useCheckParentheses() {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const checkParentheses = async (code: string) => {
    const response = await fetch("/parentheses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const data = await response.json();
    setIsValid(data);
  };

  return { isValid, checkParentheses };
}
