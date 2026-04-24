import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Booking = () => {
    const [step, setStep] = useState(1);
    const { username, slug } = useParams();

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center relative overflow-hidden antialiased font-body">
            {/* Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            {/* Glow Layer */}
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-40 -left-40 bg-primary/10 blur-[120px]"></div>
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -bottom-40 -right-40 bg-blue-600/10 blur-[120px]"></div>

            <main className="relative z-10 w-full max-w-5xl px-6 py-12">
                <div className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[600px] bg-[#111111]/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                    {/* Left Sidebar: Event Summary */}
                    <div className="w-full md:w-1/3 bg-[#0a0a0a]/80 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col gap-6 relative">
                        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

                        {step === 2 && (
                            <button 
                                onClick={() => setStep(1)}
                                className="w-10 h-10 rounded-full bg-[#171717] border border-white/5 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 mb-10 group relative z-10"
                            >
                                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            </button>
                        )}
                        {step === 1 && (
                            <Link to={`/${username}`} className="w-10 h-10 rounded-full bg-[#171717] border border-white/5 flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 mb-10 group relative z-10">
                                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-3 relative z-10">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9ca3af] mb-1">Host</p>
                                <h2 className="font-headline font-semibold text-white capitalize">{username || 'Loading...'}</h2>
                            </div>
                        </div>

                        <div className="mt-2 relative z-10">
                            <h1 className="font-headline font-black text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-[#9ca3af]">30 Minute<br/>Meeting</h1>
                            <div className="flex flex-col gap-4 text-[#9ca3af]">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                                    <span className="font-body text-base text-white font-medium">30 min</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">videocam</span>
                                    <div className="flex flex-col font-body">
                                        <span className="text-white font-medium">Video Conference</span>
                                        <span className="text-sm opacity-80 mt-0.5 relative">Details provided upon confirmation</span>
                                    </div>
                                </div>
                                {step === 2 && (
                                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5">
                                        <span className="material-symbols-outlined text-primary mt-0.5">event</span>
                                        <div className="flex flex-col font-body text-base">
                                            <span className="text-white font-medium">9:30am - 10:00am</span>
                                            <span className="text-sm opacity-80 mt-0.5">Thursday, October 26, 2023</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-auto pt-8 relative z-10">
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9ca3af]/50">Calhi Scheduling Engine</p>
                        </div>
                    </div>

                    {/* Right Side: Dynamic Router */}
                    {step === 1 && (
                        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-[#171717]/30">
                            <h3 className="font-headline text-2xl font-bold text-white mb-8 tracking-tight">Select a Date & Time</h3>
                            <div className="flex flex-col md:flex-row gap-10 flex-1">
                                {/* Calendar Section */}
                                <div className="w-full md:w-[55%] flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-headline font-semibold text-lg">October 2024</h4>
                                        <div className="flex gap-2">
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1f1f1f] transition-colors text-[#9ca3af] hover:text-white">
                                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                                            </button>
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1f1f1f] transition-colors text-white bg-[#262626]/50 border border-white/5">
                                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Mon</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Tue</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Wed</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Thu</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Fri</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Sat</span>
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#9ca3af]">Sun</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm">
                                        <div className="w-10 h-10 mx-auto"></div>
                                        <div className="w-10 h-10 mx-auto"></div>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af] hover:bg-[#1f1f1f] transition-colors">1</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af] hover:bg-[#1f1f1f] transition-colors">2</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">3</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">4</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af]/40 cursor-not-allowed">5</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af]/40 cursor-not-allowed">6</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">7</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">8</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] relative">
                                            9
                                            <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                                        </button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">10</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">11</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af]/40 cursor-not-allowed">12</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af]/40 cursor-not-allowed">13</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">14</button>
                                        <button className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-medium hover:bg-[#1f1f1f] transition-colors">15</button>
                                    </div>
                                </div>
                                {/* Time Slots */}
                                <div className="w-full md:w-[45%] flex flex-col border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
                                    <p className="font-medium text-sm text-white mb-6">Wednesday, October 9</p>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[320px] custom-scrollbar">
                                        <button className="w-full border border-white/5 bg-[#111111] hover:border-primary hover:text-primary transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm">
                                            9:00 AM
                                        </button>
                                        <div className="flex w-full gap-2 items-stretch h-[50px]">
                                            <div className="w-1/2 bg-[#171717] border border-[#262626] flex items-center justify-center rounded-xl font-medium text-sm text-[#9ca3af]">
                                                9:30 AM
                                            </div>
                                            <button onClick={() => setStep(2)} className="w-1/2 btn-gradient rounded-xl font-bold text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-1">
                                                Next
                                            </button>
                                        </div>
                                        <button className="w-full border border-white/5 bg-[#111111] hover:border-primary hover:text-primary transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm">
                                            10:00 AM
                                        </button>
                                        <button className="w-full border border-white/5 bg-[#111111] hover:border-primary hover:text-primary transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm">
                                            10:30 AM
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#171717]/30 transition-all animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="font-headline font-bold text-2xl text-white mb-8">Enter Details</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-label text-sm font-semibold text-white" htmlFor="name">Name *</label>
                                        <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="name" placeholder="Jane Doe" required type="text"/>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-label text-sm font-semibold text-white" htmlFor="email">Email *</label>
                                        <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="email" placeholder="jane@example.com" required type="email"/>
                                    </div>
                                    <div>
                                        <button className="text-secondary hover:text-primary transition-colors flex items-center gap-2 font-medium text-sm px-2 py-1 -ml-2 rounded-md hover:bg-white/5" type="button">
                                            <span className="material-symbols-outlined text-sm">person_add</span>
                                            Add Guests
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5 pt-4">
                                    <label className="font-label text-sm font-semibold text-white" htmlFor="notes">Please share anything that will help prepare for our meeting</label>
                                    <textarea className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner resize-none" id="notes" placeholder="Topics you'd like to discuss..." rows={4}></textarea>
                                </div>
                                <div className="pt-6">
                                    <button className="btn-gradient w-full md:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-[0.98]" type="submit">
                                        Schedule Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Booking;
