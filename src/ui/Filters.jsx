// The filter bar every listing shares, drawn as terminal controls: a vim `/`
// search, a radio group of options, and a picker.

export function SearchField({ value, onChange, placeholder }) {
    return (
        <label className="flex-1 min-w-0 flex items-center h-8 border border-line focus-within:border-accent">
            <span className="px-2 text-accent">/</span>
            <input
                data-search
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && value && (e.stopPropagation(), onChange(""))}
                placeholder={placeholder}
                spellCheck={false}
                aria-label={placeholder}
                className="flex-1 min-w-0 h-full bg-transparent outline-none text-[13px] text-fg placeholder:text-dim caret-accent"
            />
            <span className="hidden sm:block px-2 text-[11px] text-dim">press /</span>
        </label>
    );
}

export function Options({ options, value, onChange }) {
    return (
        <div role="group" className="flex items-center border border-line p-0.5 shrink-0 overflow-x-auto no-scrollbar">
            {options.map((o) => (
                <button
                    key={o.key}
                    type="button"
                    aria-pressed={value === o.key}
                    onClick={() => onChange(o.key)}
                    className="opt"
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}

export function Picker({ options, value, onChange, all, label }) {
    if (!options || options.length < 2) return null;
    return (
        <label className="relative shrink-0 flex items-center">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={label ?? all}
                className="field text-muted max-w-[16rem]"
            >
                <option value="all">{all}</option>
                {options.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute right-2 text-[11px] text-dim">▾</span>
        </label>
    );
}

// The stats strip, as one line of `key value` pairs
export function Summary({ items }) {
    return (
        <dl className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
            {items.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                    <dt className="text-dim">{k}</dt>
                    <dd className="text-fg font-bold tabular-nums">{v}</dd>
                </div>
            ))}
        </dl>
    );
}
