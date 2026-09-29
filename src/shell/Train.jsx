import { useEffect } from "react";

// sl(1), the steam locomotive you get for typing `sl` instead of `ls`. Drawn
// fresh for this site: nose first, smoke trailing. It crosses once and leaves.
const TRAIN = String.raw`
          o  O   (  )
        _||_
   _____|  |__________   __________
 _/     NF   | [] [] |___| [] [] |
<____________|_______|___|________|
   (o)(o)(o)   (o)  (o)   (o)  (o)
`.slice(1, -1);

export default function Train({ onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 4200);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className="fixed inset-x-0 bottom-12 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
            <pre className="ascii sl-train text-[14px] text-fg w-max bg-bg px-3 py-1">{TRAIN}</pre>
        </div>
    );
}
