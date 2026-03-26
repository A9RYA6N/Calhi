const DashboardSidebar = () => {
    return (
        <aside className="hidden w-64 flex-col border-r border-[#2e2839] bg-[#131118] lg:flex">
            <div className="flex h-16 items-center gap-3 px-6 border-b border-[#2e2839]/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-blue-500 text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">Calhi</h1>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6">
                <nav className="flex flex-col gap-2">
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#a79db9]">Menu</p>
                    
                    {/* Active Item with Gradient */}
                    <a className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-white transition-all overflow-hidden" href="#">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-blue-600/80 opacity-100"></div>
                        <span className="material-symbols-outlined relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                        <span className="relative z-10 font-medium">Dashboard</span>
                    </a>

                    <a className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#a79db9] hover:bg-[#2e2839] hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span className="font-medium">Schedule</span>
                    </a>

                    <a className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#a79db9] hover:bg-[#2e2839] hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">bar_chart</span>
                        <span className="font-medium">Analytics</span>
                    </a>

                    <a className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#a79db9] hover:bg-[#2e2839] hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">group</span>
                        <span className="font-medium">Clients</span>
                    </a>

                    <div className="my-2 border-t border-[#2e2839]"></div>

                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#a79db9]">System</p>

                    <a className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#a79db9] hover:bg-[#2e2839] hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-medium">Settings</span>
                    </a>

                    <a className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#a79db9] hover:bg-[#2e2839] hover:text-white transition-colors" href="#">
                        <span className="material-symbols-outlined">help</span>
                        <span className="font-medium">Help Center</span>
                    </a>
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                    <div className="glass-card rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10">
                                <img alt="Profile picture of Alex" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgH2AUMiJPnwVia6_-v1rDaoRlUAIWMcqQlqYE1ZhNDWTOF1eFmwEvdlaXf7LSrqlaZvpUJndoIwlqb3R_bKb8Vi6_f2jT66MvtedEcX9kO46sRbCsddcTp6rosVlb0aFIZGRNgJw8qzjR4nbXAzZKzHGiCwLMy2hf-QVLKZF3FSQnC9jcKrkFn8KaDYUE-tdqt2K74-bm_RwYeeQI9tGU_X8dGH3ZpOU4ort6TkCl0HOUy_1qFy930r0IyJFtHSOt7IUS5x0cf5k"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Alex Morgan</span>
                                <span className="text-xs text-[#a79db9]">Pro Plan</span>
                            </div>
                        </div>
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        New Booking
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default DashboardSidebar;
