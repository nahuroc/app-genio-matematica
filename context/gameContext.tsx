import { createContext, ReactNode, useContext, useState } from "react";

type GameContextProps = {
  difficulty: number;
  changeDifficulty: (value: number) => void;
  type: "add/sub" | "mult/div";
  changeType: (type: "add/sub" | "mult/div") => void;
};

const gameContext = createContext<GameContextProps>({} as GameContextProps);

export default function GameContextProvider(props: { children: ReactNode }) {
  const [difficulty, setDifficulty] = useState(0);
  const [type, setType] = useState<"add/sub" | "mult/div">("add/sub");

  function changeDifficulty(value: number) {
    if (type === "mult/div" && value === 0) setDifficulty(value);
    if (value < 1 || value > 10) return;
    setDifficulty(value);
  }

  function changeType(type: "add/sub" | "mult/div") {
    setType(type);
  }

  return (
    <gameContext.Provider
      value={{ difficulty, changeDifficulty, type, changeType }}
    >
      {props.children}
    </gameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(gameContext);
}
