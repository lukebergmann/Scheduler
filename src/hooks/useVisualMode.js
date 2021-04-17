import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];

  const transition = function (newMode, replace = false) {
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      const replaceNewHistory = [...newHistory, newMode];
      setHistory(replaceNewHistory);
    } else {
      const newHistory = [...history, newMode];
      setHistory(newHistory);
    }
  };

  const back = function () {
    const newHistory = [...history];
    if (newHistory > initial) {
      newHistory.pop();
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}
