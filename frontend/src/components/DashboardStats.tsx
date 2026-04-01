interface DashboardStatsProps {
    timeslotsCount: number;
}

const DashboardStats = ({ timeslotsCount }: DashboardStatsProps) => {
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="glass-card relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-[#a79db9]">Upcoming Timeslots</p>
                        <h3 className="mt-2 text-3xl font-bold text-white">{timeslotsCount}</h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <span className="material-symbols-outlined">event_available</span>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center text-xs font-semibold text-[#0bda6f] bg-[#0bda6f]/10 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                        12%
                    </span>
                    <span className="text-xs text-[#a79db9]">vs last week</span>
                </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-[#a79db9]">Daily Motivation</p>
                        <blockquote className="mt-3">
                            <p className="text-lg font-bold text-white italic leading-tight">"The secret of getting ahead is getting started."</p>
                            <footer className="mt-2 text-xs text-[#a79db9] font-medium">— Mark Twain</footer>
                        </blockquote>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                        <span className="material-symbols-outlined">format_quote</span>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Refreshed Daily
                    </span>
                </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-[#a79db9]">Efficiency Score</p>
                        <h3 className="mt-2 text-3xl font-bold text-white">8.5<span className="text-lg text-[#a79db9] font-normal">/10</span></h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                        <span className="material-symbols-outlined">speed</span>
                    </div>
                </div>
                <div className="mt-4 w-full bg-[#2e2839] rounded-full h-1.5">
                    <div className="bg-linear-to-r from-primary to-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
            </div>
        </section>
    );
};
export default DashboardStats;
