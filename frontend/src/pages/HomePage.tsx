import HPHeader from "../components/HPHeader";
import GenFooter from "../components/GenFooter";

const HomePage = () => {
    return (
        <>
            <HPHeader />
            <main className="grow z-10 relative">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-medium text-primary uppercase tracking-wide">v2.0 Now Live</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
                            <span className="text-gradient">Never Double-Book</span> <br className="hidden md:block" /> Again.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                            The smart scheduling engine for professionals who manage complexity. Real-time availability, zero conflicts, complete peace of mind.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button className="btn-gradient h-12 px-8 rounded-xl text-white font-bold text-base shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                                Start Booking Free
                            </button>
                            <button className="h-12 px-8 rounded-xl bg-surface-dark border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                See How It Works
                            </button>
                        </div>

                        {/* Abstract Hero Visual */}
                        <div className="mt-20 relative w-full max-w-6xl mx-auto aspect-video md:aspect-21/9 rounded-2xl overflow-hidden glass-card border-t border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5"></div>
                            {/* Mockup content inside hero */}
                            <div className="relative h-full w-full p-8 flex items-center justify-center">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full opacity-80">
                                    {/* Calendar Column 1 */}
                                    <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3 border border-white/5">
                                        <div className="h-4 w-1/3 bg-white/10 rounded"></div>
                                        <div className="flex-1 bg-primary/10 border-l-2 border-primary rounded p-2 text-xs text-gray-300">
                                            <div className="font-bold text-white mb-1">Consultation</div>
                                            09:00 - 10:00 AM
                                        </div>
                                        <div className="h-16"></div>
                                        <div className="flex-1 bg-secondary/10 border-l-2 border-secondary rounded p-2 text-xs text-gray-300">
                                            <div className="font-bold text-white mb-1">Strategy Call</div>
                                            11:30 - 12:30 PM
                                        </div>
                                    </div>

                                    {/* Calendar Column 2 (Active) */}
                                    <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3 border border-primary/30 shadow-lg shadow-primary/10 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2">
                                            <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                                        </div>
                                        <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-10"></div>
                                        <div className="flex-1 bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded p-3 text-sm text-white flex items-center justify-center backdrop-blur-sm">
                                            <span className="material-symbols-outlined mr-2 text-primary">auto_awesome</span>
                                            Smart Slot Found
                                        </div>
                                        <div className="h-10"></div>
                                    </div>

                                    {/* Calendar Column 3 */}
                                    <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3 border border-white/5 md:block hidden">
                                        <div className="h-4 w-1/4 bg-white/10 rounded"></div>
                                        <div className="h-8"></div>
                                        <div className="flex-1 bg-white/5 border-l-2 border-gray-600 rounded p-2 text-xs text-gray-400">
                                            <div className="font-bold text-gray-300 mb-1">Deep Work</div>
                                            10:00 - 12:00 PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 relative bg-background-dark">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
                        <div className="mb-16 md:text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Scheduling Features</h2>
                            <p className="text-gray-400 text-lg">Designed for precision and efficiency in complex environments. Our engine handles the heavy lifting so you don't have to.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Feature 1 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col h-full group">
                                <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                                    <span className="material-symbols-outlined text-3xl icon-gradient-text">schedule</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Real-time Availability</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Instantly syncs across all your calendars (Google, Outlook, iCloud) to prevent overlap. Updates in milliseconds.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col h-full group">
                                <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                                    <span className="material-symbols-outlined text-3xl icon-gradient-text">verified_user</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Conflict Detection</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Smart algorithms detect potential double-bookings before they happen, offering intelligent resolution suggestions.
                                </p>
                            </div>
                            {/* Feature 3 */}
                            <div className="glass-card p-8 rounded-2xl flex flex-col h-full group">
                                <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                                    <span className="material-symbols-outlined text-3xl icon-gradient-text">public</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Timezone Normalization</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Seamlessly handles clients across multiple global timezones. Automatically adjusts slot display for every viewer.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Case Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-surface-dark/30 skew-y-3 transform origin-top-left -z-10"></div>
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            {/* Text Content */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
                                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">Multi-Context Support</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Built for Multi-Context Professionals</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Perfect for doctors, consultants, and freelancers who juggle multiple workplaces. Calhi unifies your fractured schedule into a single source of truth without merging your private data.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 min-w-6">
                                            <span className="material-symbols-outlined text-primary">check_circle</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">Separate but Unified</h4>
                                            <p className="text-sm text-gray-500">Keep hospital rounds separate from private clinic hours.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 min-w-6">
                                            <span className="material-symbols-outlined text-primary">check_circle</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">Context-Aware Links</h4>
                                            <p className="text-sm text-gray-500">Send unique booking links that only show relevant slots.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Visual Component */}
                            <div className="flex-1 w-full relative">
                                {/* Glow behind component */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full"></div>
                                <div className="glass-card rounded-2xl p-6 border border-white/10 relative">
                                    {/* Header of Card */}
                                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden relative">
                                                <img alt="Dr. Smith Profile" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-yVkDeuyuHw8bLAlxR3GbOJ82hoWTf-DDFEdTcfFBWY2Qqs3Wt0R6E00-mdNS3DBje8wOJfb2RjcTGyALDMk6gFgVxQcbK1HsORuC44o3CUqTX88YPSBspH_ihrDB2_OXntHQ8bS0vsyWF9RfVB0iPs1-2mCAh6KvzOvwY12lCwDwZ5eEXltdkb5JDacZIwELqShyx7EXbmc_pWvJusurn57HMsneHVdFE9dEGCtpfIMJE63noPCBFO_kvwC2Ljf5ODfnkK3eTmk" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-sm">Dr. Steven Smith</h3>
                                                <p className="text-xs text-gray-500">Weekly View • Oct 24</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                                            <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
                                            <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                                        </div>
                                    </div>
                                    {/* Calendar Visual */}
                                    <div className="grid grid-cols-4 gap-2 text-xs text-center text-gray-500 mb-2">
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 h-64 relative">
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 grid grid-rows-6 gap-0 pointer-events-none">
                                            <div className="border-t border-white/5"></div>
                                            <div className="border-t border-white/5"></div>
                                            <div className="border-t border-white/5"></div>
                                            <div className="border-t border-white/5"></div>
                                            <div className="border-t border-white/5"></div>
                                            <div className="border-t border-white/5"></div>
                                        </div>
                                        {/* Monday */}
                                        <div className="relative h-full">
                                            <div className="absolute top-4 left-0 right-0 h-24 rounded bg-blue-500/20 border-l-4 border-blue-500 p-2 flex flex-col justify-between">
                                                <span className="text-blue-100 font-bold text-[10px]">City Hospital</span>
                                            </div>
                                            <div className="absolute top-32 left-0 right-0 h-16 rounded bg-purple-500/20 border-l-4 border-purple-500 p-2">
                                                <span className="text-purple-100 font-bold text-[10px]">Private Clinic</span>
                                            </div>
                                        </div>
                                        {/* Tuesday */}
                                        <div className="relative h-full">
                                            <div className="absolute top-10 left-0 right-0 h-32 rounded bg-blue-500/20 border-l-4 border-blue-500 p-2">
                                                <span className="text-blue-100 font-bold text-[10px]">City Hospital</span>
                                            </div>
                                        </div>
                                        {/* Wednesday (Conflict) */}
                                        <div className="relative h-full">
                                            <div className="absolute top-4 left-0 right-0 h-20 rounded bg-blue-500/20 border-l-4 border-blue-500 p-2 opacity-50"></div>
                                            {/* Conflict Overlay */}
                                            <div className="absolute top-20 left-0 right-0 h-16 rounded bg-red-500/10 border border-red-500/50 p-1 flex items-center justify-center backdrop-blur-sm z-10 animate-pulse">
                                                <div className="flex flex-col items-center">
                                                    <span className="material-symbols-outlined text-red-500 text-sm mb-1">warning</span>
                                                    <span className="text-[9px] text-red-400 font-bold uppercase tracking-wide">Conflict</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-24 left-0 right-0 h-24 rounded bg-purple-500/20 border-l-4 border-purple-500 p-2">
                                                <span className="text-purple-100 font-bold text-[10px] mt-8">Private Clinic</span>
                                            </div>
                                        </div>
                                        {/* Thursday */}
                                        <div className="relative h-full">
                                            <div className="absolute top-0 bottom-0 left-0 right-0 border-2 border-dashed border-gray-700 rounded flex items-center justify-center">
                                                <span className="text-gray-600 text-[10px]">Free Day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-12 border-t border-white/5 bg-background-dark">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 text-center">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">Trusted by teams at</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                            <div className="text-xl font-black text-white flex items-center gap-2"><span className="material-symbols-outlined">diamond</span> Acme Corp</div>
                            <div className="text-xl font-black text-white flex items-center gap-2"><span className="material-symbols-outlined">rocket_launch</span> Stratos</div>
                            <div className="text-xl font-black text-white flex items-center gap-2"><span className="material-symbols-outlined">bolt</span> EnergyInc</div>
                            <div className="text-xl font-black text-white flex items-center gap-2"><span className="material-symbols-outlined">hub</span> Nexus</div>
                            <div className="text-xl font-black text-white flex items-center gap-2"><span className="material-symbols-outlined">language</span> Global</div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to take back your time?</h2>
                        <p className="text-xl text-gray-400 mb-10">Join 10,000+ professionals who trust Calhi to manage their complex schedules.</p>
                        <button className="btn-gradient px-10 py-4 rounded-xl text-lg font-bold text-white shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                            Get Started for Free
                        </button>
                        <p className="mt-4 text-sm text-gray-500">No credit card required. 14-day free trial.</p>
                    </div>
                    {/* Background decoration for CTA */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-75 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 blur-[100px] -z-0"></div>
                </section>
            </main>
            <GenFooter />
        </>
    );
};

export default HomePage;
