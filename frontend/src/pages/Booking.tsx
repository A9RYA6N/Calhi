import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { getIntervals, formatDuration } from '../utils/bookingUtils/timeUtil';
import { renderCalendar } from '../utils/bookingUtils/renderCalendar';

const Booking = () => {
    const [step, setStep] = useState(1);
    const { username, slug } = useParams();
    const location = useLocation();
    const state = location.state as any;

    const [timeslot, setTimeslot] = useState<any>(state?.timeslot || null);
    const [selectedInterval, setSelectedInterval] = useState<number | null>(null);
    const [hostName, setHostName] = useState<string>(state?.hostName || '');
    
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [hasAuthCookie, setHasAuthCookie] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/`, {
                    withCredentials: true
                });
                if (res.status === 200 && res.data?.data) {
                    setHasAuthCookie(true);
                    if (res.data.data.Name) setGuestName(res.data.data.Name);
                    if (res.data.data.Email) setGuestEmail(res.data.data.Email);
                }
            } catch (err) {
                setHasAuthCookie(false);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (state?.timeslot && state?.hostName) return;
        
        const fetchTimeslot = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_TIMESLOT}/${username}`);
                if (res.data?.data) {
                    const found = res.data.data.find((s: any) => s.ID.toString() === slug || s.Slug === slug);
                    if (found) setTimeslot(found);
                }
                
                try {
                    const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/${username}`);
                    if (userRes.data?.data?.Name) {
                        setHostName(userRes.data.data.Name);
                    } else {
                        setHostName(username || '');
                    }
                } catch (e) {
                    setHostName(username || '');
                }
            } catch (err) {
                console.error("Error fetching booking data:", err);
                if (!hostName) setHostName(username || '');
            }
        };
        fetchTimeslot();
    }, [username, slug, state]);

    const intervals = getIntervals(timeslot);
    
    const handleScheduleEvent = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (selectedInterval === null) return;
        
        try {
            const interval = intervals[selectedInterval];
            const data = {
                TimeslotID: timeslot.ID,
                Name: guestName,
                Email: guestEmail,
                Start: interval.start.toISOString(),
                End: interval.end.toISOString()
            };
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_BOOKING}/create`, data, {
                withCredentials: true
            });
            
            if (res.status === 201 || res.status === 200) {
                if (hasAuthCookie) {
                    toast.success("Booking submitted successfully!", {
                        duration: 5000,
                        style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                    });
                } else {
                    toast.success("Booking submitted successfully! An email has been sent with a verification link.", {
                        duration: 5000,
                        style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                    });
                }
                setGuestName('');
                setGuestEmail('');
                setStep(1);
            }
        } catch (err) {
            console.error("Error creating booking:", err);
            toast.error("Failed to schedule event. Please try again.", {
                style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
            });
        }
    };

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
                                <h2 className="font-headline font-semibold text-white capitalize">{hostName || username || 'Loading...'}</h2>
                            </div>
                        </div>

                        <div className="mt-2 relative z-10">
                            <h1 className="font-headline font-black text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-[#9ca3af]">
                                {timeslot?.EventName || "Loading..."}
                            </h1>
                            <div className="flex flex-col gap-4 text-[#9ca3af]">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                                    <span className="font-body text-base text-white font-medium">{timeslot ? formatDuration(timeslot.Duration) : ""}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">videocam</span>
                                    <div className="flex flex-col font-body">
                                        <span className="text-white font-medium">Video Conference</span>
                                        <span className="text-sm opacity-80 mt-0.5 relative">Details provided upon confirmation</span>
                                    </div>
                                </div>
                                {step === 2 && selectedInterval !== null && intervals[selectedInterval] && (
                                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5">
                                        <span className="material-symbols-outlined text-primary mt-0.5">event</span>
                                        <div className="flex flex-col font-body text-base">
                                            <span className="text-white font-medium">
                                                {`${format(intervals[selectedInterval].start, "h:mma").toLowerCase()} - ${format(intervals[selectedInterval].end, "h:mma").toLowerCase()}`}
                                            </span>
                                            <span className="text-sm opacity-80 mt-0.5">
                                                {format(intervals[selectedInterval].start, "EEEE, MMMM d, yyyy")}
                                            </span>
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
                                    {renderCalendar(timeslot) || <div className="text-[#9ca3af]">Loading calendar...</div>}
                                </div>
                                {/* Time Slots */}
                                <div className="w-full md:w-[45%] flex flex-col border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
                                    <p className="font-medium text-sm text-white mb-6">
                                        {timeslot?.Start ? format(new Date(timeslot.Start), "EEEE, MMMM d") : "Loading..."}
                                    </p>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[320px] custom-scrollbar">
                                        {intervals.map((intv, idx) => {
                                            const timeString = format(intv.start, "h:mm a");
                                            const isSelected = selectedInterval === idx;
                                            
                                            if (isSelected) {
                                                return (
                                                    <div key={idx} className="flex w-full gap-2 items-stretch h-[50px] animate-in slide-in-from-right-2 duration-200">
                                                        <div className="w-1/2 bg-[#171717] border border-[#262626] flex items-center justify-center rounded-xl font-medium text-sm text-[#9ca3af]">
                                                            {timeString}
                                                        </div>
                                                        <button onClick={() => setStep(2)} className="w-1/2 btn-gradient rounded-xl font-bold text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-1">
                                                            Next
                                                        </button>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <button 
                                                    key={idx} 
                                                    onClick={() => setSelectedInterval(idx)}
                                                    className="w-full border border-white/5 bg-[#111111] hover:border-primary hover:text-primary transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm"
                                                >
                                                    {timeString}
                                                </button>
                                            );
                                        })}
                                        {intervals.length === 0 && timeslot && (
                                            <div className="text-center text-[#9ca3af] py-10">No availability.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#171717]/30 transition-all animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="font-headline font-bold text-2xl text-white mb-8">
                                {hasAuthCookie ? "Confirm Booking" : "Enter Details"}
                            </h2>
                            {hasAuthCookie ? (
                                <div className="space-y-6">
                                    <div className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-inner">
                                        <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                                        </div>
                                        <h3 className="font-headline text-xl font-bold mb-2 text-white">Continue scheduling?</h3>
                                        <p className="text-[#9ca3af] mb-8 text-sm leading-relaxed">
                                            You are already logged in. Do you want to schedule this event using your current account details?
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button 
                                                onClick={() => handleScheduleEvent()}
                                                className="btn-gradient flex-1 px-8 py-3.5 rounded-xl text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg shadow-primary/20"
                                            >
                                                Yes, Schedule Event
                                            </button>
                                            <button 
                                                onClick={() => setStep(1)}
                                                className="flex-1 px-8 py-3.5 rounded-xl text-white font-bold text-base border border-white/10 hover:bg-white/5 transition-colors bg-[#0a0a0a]"
                                            >
                                                No, Go Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleScheduleEvent}>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label text-sm font-semibold text-white" htmlFor="name">Name *</label>
                                            <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="name" placeholder="Jane Doe" required type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label text-sm font-semibold text-white" htmlFor="email">Email *</label>
                                            <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="email" placeholder="jane@example.com" required type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                                        </div>
                                        <div>
                                            <button className="text-secondary hover:text-primary transition-colors flex items-center gap-2 font-medium text-sm px-2 py-1 -ml-2 rounded-md hover:bg-white/5" type="button">
                                                <span className="material-symbols-outlined text-sm">person_add</span>
                                                Add Guests
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 pt-4">
                                        <label className="font-label text-sm font-semibold text-white opacity-50" htmlFor="notes">Please share anything that will help prepare for our meeting</label>
                                        <textarea disabled className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/30 focus:outline-none transition-all shadow-inner resize-none opacity-50 cursor-not-allowed" id="notes" placeholder="Notes currently disabled..." rows={4}></textarea>
                                    </div>
                                    <div className="pt-6">
                                        <button className="btn-gradient w-full md:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-[0.98]" type="submit">
                                            Schedule Event
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Booking;
