import { createContext, useContext } from "react";

// mode: NORMAL | INSERT | COMMAND, the way vim's statusline reports it.
// message: a one-line notice shown in the statusline, vim-style.
export const ShellContext = createContext({
    mode: "NORMAL",
    openCommand: () => {},
    openHelp: () => {},
    say: () => {},
    wget: () => {},
});

export const useShell = () => useContext(ShellContext);
