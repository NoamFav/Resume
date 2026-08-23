import { FaSpinner, FaSearch } from "react-icons/fa";

export function LoadingState({ label = "Loading..." }) {
    return (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="flex items-center gap-3 text-zinc-500">
                <FaSpinner className="animate-spin h-4 w-4" />
                <span className="text-sm">{label}</span>
            </div>
        </div>
    );
}

export function EmptyState({
    title = "Nothing found",
    description = "Try adjusting your filters or search terms.",
    action,
}) {
    return (
        <div className="text-center py-24">
            <FaSearch className="h-8 w-8 mx-auto mb-4 text-zinc-700" />
            <h3 className="text-white font-medium mb-1">{title}</h3>
            <p className="text-zinc-500 text-sm mb-6">{description}</p>
            {action}
        </div>
    );
}
