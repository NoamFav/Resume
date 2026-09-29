import { createContext, useContext } from "react";

// mode: NORMAL | INSERT | COMMAND, the way vim's statusline reports it.
// message: a one-line notice shown in the statusline, vim-style.
// pending: a command sent from the vim command line (`:!cmd`) for the home
// page's shell to run.
export const ShellContext = createContext({
    mode: "NORMAL",
    openCommand: () => {},
    openHelp: () => {},
    say: () => {},
    wget: () => {},
    wipe: () => {},
    train: () => {},
    exec: () => {},
    pending: null,
    clearPending: () => {},
});

export const useShell = () => useContext(ShellContext);
