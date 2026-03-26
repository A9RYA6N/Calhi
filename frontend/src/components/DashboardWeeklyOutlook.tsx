const DashboardWeeklyOutlook = () => {
    return (
        <div className="glass-card rounded-2xl p-6 lg:col-span-2 flex flex-col h-full min-h-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Weekly Outlook</h3>
                <div className="flex items-center gap-2">
                    <button className="p-1 text-[#a79db9] hover:text-white hover:bg-[#2e2839] rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <span className="text-sm font-medium text-white">Oct 12 - 18</span>
                    <button className="p-1 text-[#a79db9] hover:text-white hover:bg-[#2e2839] rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                    <button className="ml-2 text-xs font-medium bg-[#2e2839] hover:bg-[#3f374e] text-white px-3 py-1.5 rounded-lg transition-colors">
                        View Full
                    </button>
                </div>
            </div>

            {/* Calendar Visual */}
            <div className="flex flex-1 flex-col gap-4">
                {/* Days Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-[#a79db9] border-b border-[#2e2839] pb-2 pl-15">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div className="text-primary font-bold">Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                </div>

                {/* Timeline Grid */}
                <div className="flex-1 grid gap-2 relative grid-cols-[60px_repeat(7,1fr)]">
                    {/* Time Axis */}
                    <div className="flex flex-col justify-between text-[10px] text-[#a79db9] pr-2 border-r border-[#2e2839]/30">
                        <div>08:00 AM</div>
                        <div>09:00 AM</div>
                        <div>10:00 AM</div>
                        <div>11:00 AM</div>
                        <div>12:00 PM</div>
                        <div>01:00 PM</div>
                        <div>02:00 PM</div>
                        <div>03:00 PM</div>
                        <div>04:00 PM</div>
                        <div>05:00 PM</div>
                        <div>06:00 PM</div>
                        <div>07:00 PM</div>
                        <div>08:00 PM</div>
                    </div>

                    {/* Horizontal Lines for Time visual */}
                    <div className="absolute inset-0 left-12 flex flex-col justify-between pointer-events-none opacity-20">
                        {[...Array(13)].map((_, i) => (
                            <div key={i} className="w-full border-t border-[#a79db9] border-dashed"></div>
                        ))}
                    </div>

                    {/* Mon */}
                    <div className="relative pt-2">
                        <div className="absolute top-[10%] left-0 right-0 h-[30%] bg-[#2e2839] rounded-md border border-[#443b54] mx-1"></div>
                        <div className="absolute top-[50%] left-0 right-0 h-[20%] bg-blue-500/20 border border-blue-500/30 rounded-md mx-1"></div>
                    </div>

                    {/* Tue */}
                    <div className="relative pt-2">
                        <div className="absolute top-[20%] left-0 right-0 h-[40%] bg-primary/20 border border-primary/30 rounded-md mx-1"></div>
                    </div>

                    {/* Wed */}
                    <div className="relative pt-2">
                        <div className="absolute top-[10%] left-0 right-0 h-[20%] bg-[#2e2839] rounded-md border border-[#443b54] mx-1"></div>
                        <div className="absolute top-[60%] left-0 right-0 h-[25%] bg-primary/20 border border-primary/30 rounded-md mx-1"></div>
                    </div>

                    {/* Thu */}
                    <div className="relative pt-2">
                        <div className="absolute top-[30%] left-0 right-0 h-[50%] bg-[#2e2839] rounded-md border border-[#443b54] mx-1"></div>
                    </div>

                    {/* Fri (Today) */}
                    <div className="relative pt-2 bg-[#1e1b24]/50 rounded-lg">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full mt-1"></div>
                        <div className="absolute top-[15%] left-0 right-0 h-[20%] bg-linear-to-b from-primary/30 to-primary/10 border border-primary/40 rounded-md mx-1 flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white/80">Meeting</span>
                        </div>
                        <div className="absolute top-[45%] left-0 right-0 h-[30%] bg-[#2e2839] rounded-md border border-[#443b54] mx-1"></div>
                    </div>

                    {/* Sat */}
                    <div className="relative pt-2 opacity-50"></div>

                    {/* Sun */}
                    <div className="relative pt-2 opacity-50"></div>
                </div>
            </div>
        </div>
    );
};
export default DashboardWeeklyOutlook;
