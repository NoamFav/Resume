import { motion } from "framer-motion";

export default function ProgressBar({ value, className = "" }) {
    return (
        <div
            className={`w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden ${className}`}
        >
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
        </div>
    );
}
