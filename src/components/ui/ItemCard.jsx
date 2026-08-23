import { motion } from "framer-motion";
import { FaHeart, FaGraduationCap } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { proficiencyLevel } from "../../lib/format";

export default function ItemCard({ item, index = 0, meta, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                    {item.image && (
                        <img
                            src={item.image}
                            alt=""
                            className="w-8 h-8 rounded-md shrink-0"
                            onError={(e) => {
                                e.target.style.visibility = "hidden";
                            }}
                        />
                    )}
                    <div className="min-w-0">
                        <h3 className="font-medium text-white truncate">
                            {item.name}
                        </h3>
                        {meta && (
                            <p className="text-xs text-zinc-500 truncate">
                                {meta}
                            </p>
                        )}
                    </div>
                </div>
                <span className="text-sm font-medium text-zinc-300 shrink-0">
                    {item.percentage}%
                </span>
            </div>

            <ProgressBar value={item.percentage} className="mb-3" />

            {description && (
                <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
                    {description}
                </p>
            )}

            <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{proficiencyLevel(item.percentage)}</span>
                <div className="flex gap-1.5">
                    {item.favorite && (
                        <FaHeart
                            className="h-3 w-3 text-pink-400"
                            title="Favorite"
                        />
                    )}
                    {item.learning && (
                        <FaGraduationCap
                            className="h-3.5 w-3.5 text-emerald-400"
                            title="Currently learning"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
