import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import StatusLine from "./StatusLine";
import CommandLine from "./CommandLine";
import Help from "./Help";
import Footer from "./Footer";
import Boot, { shouldBoot } from "./Boot";
import Train from "./Train";
import { HIRE, NAV, PDF } from "./nav";
import { useScheme } from "./schemes";
import { ShellContext } from "./shell-context";

const TYPING = /^(INPUT|TEXTAREA|SELECT)$/;
const NOT_TEXT = /^(checkbox|radio|button|submit|file|range|color)$/;
const isEditable = (el) =>
    !!el &&
    (el.isContentEditable ||
        (TYPING.test(el.tagName) && !(el.tagName === "INPUT" && NOT_TEXT.test(el.type))));

const bar = (pct, w = 20) =>
    "=".repeat(Math.max(0, Math.round((pct / 100) * w) - 1)) +
    (pct < 100 ? ">" : "=") +
    " ".repeat(w - Math.round((pct / 100) * w));

export default function Shell({ children }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { cycle } = useScheme();
    const [mode, setMode] = useState("NORMAL");
    const [cmd, setCmd] = useState(false);
    const [help, setHelp] = useState(false);
    const [boot, setBoot] = useState(shouldBoot);
    const [message, setMessage] = useState("");
    const [wiping, setWiping] = useState("");
    const [train, setTrain] = useState(false);
    const [pending, setPending] = useState(null);
    const msgTimer = useRef(0);
    const wgetTimer = useRef(0);
    const rebooting = useRef(false);

    const say = useCallback((m) => {
        setMessage(m);
        clearTimeout(msgTimer.current);
        msgTimer.current = setTimeout(() => setMessage(""), 6000);
    }, []);

    // Download the PDF, with wget's progress line playing in the statusline
    const wget = useCallback(() => {
        const a = document.createElement("a");
        a.href = PDF;
        a.download = "noam-favier-resume.pdf";
        a.click();
        clearInterval(wgetTimer.current);
        let pct = 0;
        wgetTimer.current = setInterval(() => {
            pct = Math.min(100, pct + 9 + Math.random() * 14);
            say(`resume.pdf  ${String(Math.round(pct)).padStart(3)}%[${bar(pct)}]`);
            if (pct >= 100) {
                clearInterval(wgetTimer.current);
                say(`'noam-favier-resume.pdf' saved [${bar(100)}]`);
            }
        }, 45);
    }, [say]);

    // rm -rf --no-preserve-root /: the page falls away, the machine reboots
    // through the boot log, and everything comes back from HEAD
    const wipe = useCallback(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            say("removed '/'. restored from HEAD — it's all in git");
            return;
        }
        setWiping("fall");
        say("rm: removing '/' …");
        setTimeout(() => {
            rebooting.current = true;
            setBoot(true);
        }, 1300);
    }, [say]);

    const endBoot = useCallback(() => {
        setBoot(false);
        if (!rebooting.current) return;
        rebooting.current = false;
        setWiping("back");
        say("restored from HEAD — it's all in git");
        setTimeout(() => setWiping(""), 700);
    }, [say]);

    // sl: the train you get for mistyping ls
    const runTrain = useCallback(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            say("sl: steam locomotive — did you mean ls?");
            return;
        }
        setTrain(true);
    }, [say]);
    const trainDone = useCallback(() => {
        setTrain(false);
        say("did you mean ls?");
    }, [say]);

    // :!cmd hands the command to the shell on the home page, like vim's :!
    const exec = useCallback(
        (command) => {
            setPending(command);
            if (pathname !== "/") navigate("/");
        },
        [pathname, navigate],
    );
    const clearPending = useCallback(() => setPending(null), []);

    // INSERT while a text field has focus, like vim
    useEffect(() => {
        const sync = () =>
            setMode(isEditable(document.activeElement) ? "INSERT" : "NORMAL");
        const onOut = () => setTimeout(sync, 0);
        addEventListener("focusin", sync);
        addEventListener("focusout", onOut);
        return () => {
            removeEventListener("focusin", sync);
            removeEventListener("focusout", onOut);
        };
    }, []);

    useEffect(() => {
        let lastG = 0;
        let lastZ = 0;
        const onKey = (e) => {
            if (cmd || help || boot) return;
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setCmd(true);
                return;
            }
            if (isEditable(e.target)) {
                if (e.key === "Escape") e.target.blur();
                return;
            }
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const nav = NAV.find((n) => n.key === e.key);
            if (nav) return navigate(nav.path);
            switch (e.key) {
                case ":":
                    e.preventDefault();
                    setCmd(true);
                    break;
                case "/": {
                    // vim search: jump into the page's filter, or the shell on home
                    const field = document.querySelector("[data-search]");
                    if (field) {
                        e.preventDefault();
                        field.focus();
                        field.scrollIntoView({ block: "center" });
                    }
                    break;
                }
                case "?":
                    setHelp(true);
                    break;
                case "t":
                    cycle();
                    break;
                case "d":
                    wget();
                    break;
                case "j":
                    scrollBy({ top: 90 });
                    break;
                case "k":
                    scrollBy({ top: -90 });
                    break;
                case "G":
                    scrollTo({ top: document.documentElement.scrollHeight });
                    break;
                case "Z":
                    // ZZ: vim's save-and-quit, same as :wq
                    if (Date.now() - lastZ < 500) {
                        window.open(HIRE, "_blank", "noopener");
                        say('"project.md" [New] — tell me what to build');
                        lastZ = 0;
                    } else lastZ = Date.now();
                    break;
                case "g":
                    if (Date.now() - lastG < 500) {
                        scrollTo({ top: 0 });
                        lastG = 0;
                    } else lastG = Date.now();
                    break;
                default:
            }
        };
        addEventListener("keydown", onKey);
        return () => removeEventListener("keydown", onKey);
    }, [cmd, help, boot, cycle, navigate, wget, say]);

    // New page starts at the top
    useEffect(() => {
        scrollTo(0, 0);
    }, [pathname]);

    const value = {
        mode: cmd ? "COMMAND" : mode,
        message,
        say,
        wget,
        wipe,
        train: runTrain,
        exec,
        pending,
        clearPending,
        openCommand: () => setCmd(true),
        openHelp: () => setHelp(true),
    };

    return (
        <ShellContext.Provider value={value}>
            <div className="min-h-screen flex flex-col pb-7">
                <a
                    href="#main"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("main")?.focus();
                    }}
                    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-ink focus:px-3 focus:py-1"
                >
                    Skip to content
                </a>
                <TopBar />
                <main
                    id="main"
                    tabIndex={-1}
                    className={`flex-1 outline-none ${wiping ? `wipe-${wiping}` : ""}`}
                >
                    {children}
                </main>
                <Footer />
            </div>
            <StatusLine />
            {cmd && (
                <CommandLine
                    onClose={() => setCmd(false)}
                    say={say}
                    wget={wget}
                    exec={exec}
                    openHelp={() => setHelp(true)}
                />
            )}
            {train && <Train onDone={trainDone} />}
            {help && <Help onClose={() => setHelp(false)} />}
            {boot && <Boot onDone={endBoot} />}
        </ShellContext.Provider>
    );
}
