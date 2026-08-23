import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-14"
        >
            {eyebrow && (
                <span className="inline-block text-xs font-medium tracking-wide uppercase text-blue-400 mb-3">
                    {eyebrow}
                </span>
            )}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                {title}
            </h1>
            {description && (
                <p className="text-lg text-zinc-400 leading-relaxed">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
