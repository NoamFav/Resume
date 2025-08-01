import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    FaLayerGroup,
    FaHeart,
    FaGraduationCap,
    FaTrophy,
    FaChartBar,
    FaTools,
    FaCrown,
    FaCode,
} from "react-icons/fa";

const UnifiedStats = ({
    items,
    type = "languages",
    topItem = null, // Can be topLanguage, topTool, etc.
    customConfig = {},
}) => {
    // Default configurations for each type
    const defaultConfigs = {
        languages: {
            totalIcon: FaLayerGroup,
            totalLabel: "Total",
            totalColor: "text-blue-400",
            expertIcon: FaCrown,
            expertLabel: "Expert",
            expertColor: "text-purple-400",
            avgLabel: "Avg Level",
            avgColor: "text-yellow-400",
            gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
            showTopItem: true,
            topItemLabel: "Top Lang",
            topItemIcon: FaCode,
            topItemColor: "text-indigo-400",
        },
        frameworks: {
            totalIcon: FaLayerGroup,
            totalLabel: "Total",
            totalColor: "text-blue-400",
            expertIcon: FaTrophy,
            expertLabel: "Expert",
            expertColor: "text-purple-400",
            avgLabel: "Avg Level",
            avgColor: "text-yellow-400",
            gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
            showTopItem: true,
            topItemLabel: "Top Framework",
            topItemIcon: FaCode,
            topItemColor: "text-indigo-400",
        },
        tools: {
            totalIcon: FaTools,
            totalLabel: "Total Tools",
            totalColor: "text-blue-400",
            expertIcon: FaTrophy,
            expertLabel: "Expert",
            expertColor: "text-purple-400",
            avgLabel: "Avg Skill",
            avgColor: "text-orange-400",
            gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
            showTopItem: true,
            topItemLabel: "Top Tool",
            topItemIcon: FaTools,
            topItemColor: "text-cyan-400",
        },
    };

    // Merge default config with custom config
    const config = { ...defaultConfigs[type], ...customConfig };

    const stats = useMemo(() => {
        const total = items.length;
        const favorites = items.filter((item) => item.favorite).length;
        const learning = items.filter((item) => item.learning).length;
        const expert = items.filter((item) => item.percentage >= 90).length;
        const avgProficiency =
            total > 0
                ? Math.round(
                      items.reduce((acc, item) => acc + item.percentage, 0) /
                          total,
                  )
                : 0;

        return { total, favorites, learning, expert, avgProficiency };
    }, [items]);

    const TotalIcon = config.totalIcon;
    const ExpertIcon = config.expertIcon;
    const TopItemIcon = config.topItemIcon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`grid ${config.gridCols} gap-4 mb-8`}
        >
            {/* Total */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <TotalIcon className={`h-5 w-5 ${config.totalColor}`} />
                    <span className="text-sm text-white/60">
                        {config.totalLabel}
                    </span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.total}
                </span>
            </div>

            {/* Favorites */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaHeart className="h-5 w-5 text-red-400" />
                    <span className="text-sm text-white/60">Favorites</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.favorites}
                </span>
            </div>

            {/* Learning */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaGraduationCap className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white/60">Learning</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.learning}
                </span>
            </div>

            {/* Expert */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <ExpertIcon className={`h-5 w-5 ${config.expertColor}`} />
                    <span className="text-sm text-white/60">
                        {config.expertLabel}
                    </span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.expert}
                </span>
            </div>

            {/* Average Proficiency */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className={`h-5 w-5 ${config.avgColor}`} />
                    <span className="text-sm text-white/60">
                        {config.avgLabel}
                    </span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.avgProficiency}%
                </span>
            </div>

            {/* Top Item (Language/Tool/Framework) */}
            {config.showTopItem && topItem && (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <TopItemIcon
                            className={`h-5 w-5 ${config.topItemColor}`}
                        />
                        <span className="text-sm text-white/60">
                            {config.topItemLabel}
                        </span>
                    </div>
                    <span className="text-lg font-bold text-white">
                        {topItem}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default UnifiedStats;

// With custom configuration:
// <UnifiedStats
//     items={myItems}
//     type="languages"
//     topItem="Python"
//     customConfig={{
//         totalLabel: 'My Custom Total',
//         avgColor: 'text-pink-400',
//         topItemLabel: 'Primary',
//         topItemColor: 'text-emerald-400'
//     }}
// />
