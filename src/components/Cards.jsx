import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
    FaTrophy,
    FaCheckCircle,
    FaGraduationCap,
    FaClock,
    FaStar,
    FaHeart,
    FaBook,
} from "react-icons/fa";

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const ProgressBar = ({ percentage, color = "blue" }) => {
    const colorMap = {
        blue: "from-blue-500 to-blue-400",
        orange: "from-orange-500 to-orange-400",
        green: "from-green-500 to-green-400",
        purple: "from-purple-500 to-purple-400",
        red: "from-red-500 to-red-400",
        pink: "from-pink-500 to-pink-400",
    };

    return (
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-2 rounded-full bg-gradient-to-r ${colorMap[color] || colorMap.blue}`}
            />
        </div>
    );
};

const ProficiencyLevel = ({ percentage }) => {
    let level, color, icon;

    if (percentage >= 90) {
        level = "Expert";
        color = "text-purple-400";
        icon = FaTrophy;
    } else if (percentage >= 70) {
        level = "Advanced";
        color = "text-blue-400";
        icon = FaCheckCircle;
    } else if (percentage >= 50) {
        level = "Intermediate";
        color = "text-green-400";
        icon = FaGraduationCap;
    } else if (percentage >= 30) {
        level = "Beginner";
        color = "text-yellow-400";
        icon = FaClock;
    } else {
        level = "Learning";
        color = "text-orange-400";
        icon = FaBook;
    }

    const Icon = icon;

    return (
        <div className={`flex items-center gap-2 ${color}`}>
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{level}</span>
        </div>
    );
};

const UnifiedSkillCard = ({ item, index, type = "skill" }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const getColorByPercentage = (percentage) => {
        if (percentage >= 90) return "purple";
        if (percentage >= 70) return "blue";
        if (percentage >= 50) return "green";
        if (percentage >= 30) return "orange";
        return "red";
    };

    const getSkillLevel = (percentage) => {
        if (percentage >= 90) return "Expert";
        if (percentage >= 70) return "Advanced";
        if (percentage >= 50) return "Intermediate";
        if (percentage >= 30) return "Beginner";
        return "Learning";
    };

    const color = getColorByPercentage(item.percentage);
    const skillLevel = getSkillLevel(item.percentage);

    // Get display properties based on type
    const getDisplayProps = () => {
        switch (type) {
            case "language":
                return {
                    name: item.name,
                    category: null,
                    description: null,
                    additionalInfo: null,
                };
            case "framework":
                return {
                    name: item.name,
                    category: item.language,
                    description: null,
                    additionalInfo: item.language,
                };
            case "tool":
            default:
                return {
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    additionalInfo: null,
                };
        }
    };

    const displayProps = getDisplayProps();

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ delay: 0.1 * index }}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group hover:shadow-xl hover:-translate-y-2"
        >
            {/* Header with gradient */}
            <div
                className={`h-2 bg-gradient-to-r ${
                    color === "purple"
                        ? "from-purple-600 via-pink-600 to-purple-600"
                        : color === "blue"
                          ? "from-blue-600 via-cyan-600 to-blue-600"
                          : color === "green"
                            ? "from-green-600 via-emerald-600 to-green-600"
                            : color === "orange"
                              ? "from-orange-600 via-yellow-600 to-orange-600"
                              : "from-red-600 via-rose-600 to-red-600"
                } group-hover:opacity-80 transition-opacity`}
            />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {item.image && (
                            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={displayProps.name}
                                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                {displayProps.name}
                            </h3>
                            {displayProps.category && (
                                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                                    {displayProps.category}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <span
                            className={`text-lg font-bold ${
                                color === "purple"
                                    ? "text-purple-300"
                                    : color === "blue"
                                      ? "text-blue-300"
                                      : color === "green"
                                        ? "text-green-300"
                                        : color === "orange"
                                          ? "text-orange-300"
                                          : "text-red-300"
                            }`}
                        >
                            {item.percentage}%
                        </span>
                        <ProficiencyLevel percentage={item.percentage} />
                    </div>
                </div>

                {/* Description (only for tools) */}
                {displayProps.description && (
                    <p className="text-white/70 text-sm mb-4 group-hover:text-white/90 transition-colors">
                        {displayProps.description}
                    </p>
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                    <ProgressBar percentage={item.percentage} color={color} />
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.favorite && (
                        <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                            <FaHeart className="h-3 w-3" />
                            Favorite
                        </span>
                    )}
                    {item.learning && (
                        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1">
                            <FaGraduationCap className="h-3 w-3" />
                            Learning
                        </span>
                    )}
                    {item.percentage >= 90 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <FaTrophy className="h-3 w-3" />
                            Expert Level
                        </span>
                    )}
                </div>

                {/* Experience Level Bar */}
                <div className="pt-2 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs text-white/60">
                        <span>Experience Level</span>
                        <div className="flex items-center gap-2">
                            {type === "language" ? (
                                // Star rating for languages
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`h-3 w-3 ${
                                                i <
                                                Math.ceil(item.percentage / 20)
                                                    ? "text-yellow-400"
                                                    : "text-white/20"
                                            }`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                // Text level for tools and frameworks
                                <span className="font-medium">
                                    {skillLevel}
                                </span>
                            )}
                            {displayProps.additionalInfo && (
                                <span className="font-medium text-blue-300">
                                    {displayProps.additionalInfo}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UnifiedSkillCard;
