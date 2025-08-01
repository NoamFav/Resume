import { useMemo } from "react";
import {
    FaSearch,
    FaLayerGroup,
    FaHeart,
    FaGraduationCap,
    FaTrophy,
    FaCrown,
    FaChartBar,
    FaBaby,
    FaSort,
} from "react-icons/fa";

// Unified Filter component with consistent design patterns
const UnifiedFilters = ({ items = [], filters, setFilters, config = {} }) => {
    const {
        type = "tools", // 'tools', 'frameworks', 'languages'
        searchPlaceholder,
        categoryField,
        showSort = true,
        sortUIStyle = "dropdown", // 'dropdown' or 'buttons'
        customStatusFilters,
        customSortOptions,
    } = config;

    const sharedStatusFilters = [
        { key: "all", label: "All", icon: FaLayerGroup },
        { key: "favorites", label: "Favorites", icon: FaHeart },
        { key: "learning", label: "Currently Learning", icon: FaGraduationCap },
        { key: "expert", label: "Expert (90%+)", icon: FaCrown },
        { key: "advanced", label: "Advanced (70–89%)", icon: FaTrophy },
        {
            key: "intermediate",
            label: "Intermediate (50–69%)",
            icon: FaChartBar,
        },
        { key: "beginner", label: "Beginner (<50%)", icon: FaBaby },
    ];

    // Unified configurations - consistent naming and structure
    const defaultConfigs = {
        tools: {
            searchPlaceholder: "Search tools...",
            categoryField: "category",
            proficiencyField: "proficiency", // unified field name
            statusFilters: sharedStatusFilters,
            sortOptions: [
                { key: "name", label: "Name" },
                { key: "proficiency", label: "Proficiency" },
                { key: "category", label: "Category" },
                { key: "favorites", label: "Favorites First" },
            ],
        },
        frameworks: {
            searchPlaceholder: "Search frameworks...",
            categoryField: "language",
            proficiencyField: "proficiency",
            statusFilters: sharedStatusFilters,

            sortOptions: [
                { key: "name", label: "Name" },
                { key: "proficiency", label: "Proficiency" },
                { key: "language", label: "Language" },
                { key: "favorites", label: "Favorites First" },
            ],
        },
        languages: {
            searchPlaceholder: "Search languages...",
            categoryField: null,
            proficiencyField: "proficiency",
            statusFilters: sharedStatusFilters,
            sortOptions: [
                { key: "proficiency", label: "Proficiency" },
                { key: "name", label: "Name" },
                { key: "favorites", label: "Favorites First" },
            ],
        },
    };

    // Get configuration for current type
    const typeConfig = defaultConfigs[type];
    const finalSearchPlaceholder =
        searchPlaceholder || typeConfig.searchPlaceholder;
    const finalCategoryField =
        categoryField !== undefined ? categoryField : typeConfig.categoryField;
    const statusFilters = customStatusFilters || typeConfig.statusFilters;
    const sortOptions = customSortOptions || typeConfig.sortOptions;

    // Extract categories dynamically if categoryField is specified
    const categories = useMemo(() => {
        if (!finalCategoryField || !items.length) return [];
        const cats = [
            ...new Set(
                items.map((item) => item[finalCategoryField]).filter(Boolean),
            ),
        ];
        return cats.sort();
    }, [items, finalCategoryField]);

    // Unified filter keys - consistent naming
    const FILTER_KEYS = {
        search: "search",
        status: "status", // unified - no more 'filter' vs 'status'
        sort: "sort",
        category: "category", // unified - use generic 'category' for all
    };

    // Get category label for display
    const getCategoryLabel = () => {
        if (type === "frameworks") return "Languages";
        return "Categories";
    };

    // Render sort controls with consistent styling
    const renderSortControls = () => {
        if (!showSort || !sortOptions.length) return null;

        const currentSortUIStyle =
            sortUIStyle || (type === "languages" ? "buttons" : "dropdown");

        if (currentSortUIStyle === "buttons") {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">Sort by:</span>
                    <div className="flex flex-wrap gap-2">
                        {sortOptions.map((sort) => (
                            <button
                                key={sort.key}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        [FILTER_KEYS.sort]: sort.key,
                                    }))
                                }
                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                    filters[FILTER_KEYS.sort] === sort.key
                                        ? "bg-purple-600 text-white"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                }`}
                            >
                                {sort.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // Dropdown style
        return (
            <div className="flex items-center gap-2">
                <FaSort className="h-4 w-4 text-white/40" />
                <select
                    value={
                        filters[FILTER_KEYS.sort] || sortOptions[0]?.key || ""
                    }
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            [FILTER_KEYS.sort]: e.target.value,
                        }))
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {sortOptions.map((option) => (
                        <option
                            key={option.key}
                            value={option.key}
                            className="bg-slate-800"
                        >
                            Sort by {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="mb-8 space-y-4">
            {/* Search - Consistent across all types */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder={finalSearchPlaceholder}
                    value={filters[FILTER_KEYS.search] || ""}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            [FILTER_KEYS.search]: e.target.value,
                        }))
                    }
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
            </div>

            {/* Status Filter Buttons - Consistent styling */}
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((status) => {
                        const StatusIcon = status.icon;
                        return (
                            <button
                                key={status.key}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        [FILTER_KEYS.status]: status.key,
                                    }))
                                }
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    filters[FILTER_KEYS.status] === status.key
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <StatusIcon className="h-4 w-4" />
                                {status.label}
                            </button>
                        );
                    })}
                </div>

                {/* Sort Controls - Configurable UI style */}
                {renderSortControls()}
            </div>

            {/* Category Filter - Consistent styling and naming */}
            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                [FILTER_KEYS.category]: "all",
                            }))
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                            filters[FILTER_KEYS.category] === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                        All {getCategoryLabel()}
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    [FILTER_KEYS.category]: category,
                                }))
                            }
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                                filters[FILTER_KEYS.category] === category
                                    ? "bg-purple-600 text-white"
                                    : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UnifiedFilters;

// Usage examples:

// For Tools:
/*
const ToolFilters = ({ tools, filters, setFilters }) => (
    <UnifiedFilters
        items={tools}
        filters={filters}
        setFilters={setFilters}
        config={{ type: 'tools' }}
    />
);
*/

// For Frameworks:
/*
const FrameworkFilters = ({ frameworks, filters, setFilters }) => (
    <UnifiedFilters
        items={frameworks}
        filters={filters}
        setFilters={setFilters}
        config={{ type: 'frameworks' }}
    />
);
*/

// For Languages:
/*
const LanguageFilters = ({ filters, setFilters }) => (
    <UnifiedFilters
        items={[]} // languages don't need items for categories
        filters={filters}
        setFilters={setFilters}
        config={{ type: 'languages' }}
    />
);
*/

// Custom configuration example:
/*
const CustomFilters = ({ items, filters, setFilters }) => (
    <UnifiedFilters
        items={items}
        filters={filters}
        setFilters={setFilters}
        config={{
            type: 'custom',
            searchPlaceholder: "Search custom items...",
            categoryField: "type",
            customStatusFilters: [
                { key: "all", label: "All Items", icon: FaLayerGroup },
                { key: "active", label: "Active", icon: FaCheckCircle },
            ],
            customSortOptions: [
                { key: "name", label: "Name" },
                { key: "date", label: "Date" },
            ]
        }}
    />
);
*/
