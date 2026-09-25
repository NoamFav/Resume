import { useMemo, useState } from "react";

// An htop process list: a solid header row whose columns sort on click (the
// active one marked ▼/▲), and rows that highlight like a TUI selection.
//
// columns: [{ key, label, className, value(row), render(row, i), sort }]
export default function ProcTable({ columns, rows, initial, rowKey, template }) {
    const [sort, setSort] = useState(initial);
    const sorted = useMemo(() => {
        const col = columns.find((c) => c.key === sort.key);
        if (!col?.value) return rows;
        const dir = sort.desc ? -1 : 1;
        return [...rows].sort((a, b) => {
            const x = col.value(a);
            const y = col.value(b);
            return (typeof x === "string" ? x.localeCompare(y) : x - y) * dir;
        });
    }, [rows, columns, sort]);

    const grid = { gridTemplateColumns: template };

    return (
        <div role="table" className="text-[13px] overflow-x-auto no-scrollbar">
            <div role="row" className="grid gap-4 px-3 h-7 items-center bg-accent text-ink font-bold min-w-[36rem]" style={grid}>
                {columns.map((c) =>
                    c.value ? (
                        <button
                            key={c.key}
                            role="columnheader"
                            type="button"
                            aria-sort={sort.key === c.key ? (sort.desc ? "descending" : "ascending") : "none"}
                            onClick={() =>
                                setSort((s) =>
                                    s.key === c.key ? { key: c.key, desc: !s.desc } : { key: c.key, desc: c.desc ?? false },
                                )
                            }
                            className={`text-left truncate hover:underline ${c.className ?? ""}`}
                        >
                            {c.label}
                            {sort.key === c.key && (sort.desc ? "▼" : "▲")}
                        </button>
                    ) : (
                        <span key={c.key} role="columnheader" className={`truncate ${c.className ?? ""}`}>
                            {c.label}
                        </span>
                    ),
                )}
            </div>
            {sorted.map((r, i) => (
                <div
                    key={rowKey(r)}
                    role="row"
                    className="tui-row grid gap-4 px-3 py-1.5 items-center border-b border-line/60 min-w-[36rem]"
                    style={grid}
                >
                    {columns.map((c) => (
                        <span key={c.key} role="cell" className={`min-w-0 ${c.className ?? ""}`}>
                            {c.render ? c.render(r, i) : c.value(r)}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
