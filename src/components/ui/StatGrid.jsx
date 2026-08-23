export default function StatGrid({ stats }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 rounded-xl overflow-hidden mb-10 border border-zinc-800">
            {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-black p-5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span className="text-xs">{label}</span>
                    </div>
                    <div className="text-2xl font-semibold text-white">
                        {value}
                    </div>
                </div>
            ))}
        </div>
    );
}
