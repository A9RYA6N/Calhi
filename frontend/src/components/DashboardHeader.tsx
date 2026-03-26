const DashboardHeader = () => {
    return (
        <header className="z-10 flex h-20 items-center justify-between border-b border-[#2e2839]/30 bg-background-dark/80 px-8 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button className="lg:hidden text-[#a79db9] hover:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>
                    <p className="text-xs text-[#a79db9]">Welcome back, Alex</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden w-96 md:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a79db9] text-[20px]">search</span>
                    <input className="h-10 w-full rounded-xl border-none bg-[#1e1b24] pl-10 pr-4 text-sm text-white placeholder-[#a79db9] focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Search bookings or clients..." type="text"/>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e1b24] text-[#a79db9] transition-colors hover:bg-[#2e2839] hover:text-white">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border border-[#1e1b24]"></span>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e1b24] text-[#a79db9] transition-colors hover:bg-[#2e2839] hover:text-white">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
export default DashboardHeader;
