const DashboardRecentActivity = () => {
    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full min-h-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <button className="text-[#a79db9] hover:text-white">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
            </div>

            <div className="flex flex-col gap-0 relative">
                {/* Vertical Line */}
                <div className="absolute left-3.5 top-2 bottom-4 w-px bg-[#2e2839]"></div>

                {/* Item 1 */}
                <div className="relative flex gap-4 pb-6 group">
                    <div className="relative z-10 flex-none rounded-full bg-[#131118] p-1">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[12px] text-white">check</span>
                        </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#2e2839]/30 p-3 hover:bg-[#2e2839]/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-semibold text-white">Booking Confirmed</p>
                            <span className="text-[10px] text-[#a79db9]">2m ago</span>
                        </div>
                        <p className="text-xs text-[#a79db9]">Meeting with <span className="text-white font-medium">Acme Corp</span> confirmed for tomorrow at 2:00 PM.</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative flex gap-4 pb-6 group">
                    <div className="relative z-10 flex-none rounded-full bg-[#131118] p-1">
                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[12px] text-white">mail</span>
                        </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#2e2839]/30 p-3 hover:bg-[#2e2839]/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-semibold text-white">Reminder Sent</p>
                            <span className="text-[10px] text-[#a79db9]">1h ago</span>
                        </div>
                        <p className="text-xs text-[#a79db9]">Automated reminder sent to <span className="text-white font-medium">John Doe</span>.</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="relative flex gap-4 pb-6 group">
                    <div className="relative z-10 flex-none rounded-full bg-[#131118] p-1">
                        <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[12px] text-white">warning</span>
                        </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#2e2839]/30 p-3 hover:bg-[#2e2839]/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-semibold text-white">Reschedule Request</p>
                            <span className="text-[10px] text-[#a79db9]">3h ago</span>
                        </div>
                        <p className="text-xs text-[#a79db9]">Sarah requested to move the design review to Friday.</p>
                        <div className="mt-2 flex gap-2">
                            <button className="px-2 py-1 text-[10px] font-bold bg-primary/20 text-primary rounded hover:bg-primary/30">Accept</button>
                            <button className="px-2 py-1 text-[10px] font-bold bg-[#443b54] text-white rounded hover:bg-[#574c6b]">Decline</button>
                        </div>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="relative flex gap-4 group">
                    <div className="relative z-10 flex-none rounded-full bg-[#131118] p-1">
                        <div className="h-5 w-5 rounded-full bg-[#443b54] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[12px] text-white">add_task</span>
                        </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#2e2839]/30 p-3 hover:bg-[#2e2839]/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-semibold text-white">Task Completed</p>
                            <span className="text-[10px] text-[#a79db9]">5h ago</span>
                        </div>
                        <p className="text-xs text-[#a79db9]">Weekly report generation finished.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardRecentActivity;
