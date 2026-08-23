import { FaSearch } from "react-icons/fa";

const STATUS_OPTIONS = [
    { key: "all", label: "All" },
    { key: "favorites", label: "Favorites" },
    { key: "learning", label: "Learning" },
];

export default function FilterBar({
    search,
    onSearchChange,
    searchPlaceholder = "Search...",
    status,
    onStatusChange,
    categories,
    category,
    onCategoryChange,
    categoryLabel = "Categories",
    sortOptions,
    sort,
    onSortChange,
}) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-10">
            <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 h-3.5 w-3.5" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
                {status !== undefined && (
                    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                        {STATUS_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => onStatusChange(opt.key)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                    status === opt.key
                                        ? "bg-white text-black"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}

                {categories && categories.length > 1 && (
                    <select
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">All {categoryLabel}</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                )}

                {sortOptions && (
                    <select
                        value={sort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.key} value={opt.key}>
                                Sort: {opt.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}
