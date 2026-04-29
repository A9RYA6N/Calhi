import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import TimeslotModal from '@/components/DashboardComponents/TimeslotModal';
import { format } from 'date-fns';

const ShowTimeslots = () => {
    const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);
    const timeslots = useAppSelector(state => state.timeslot.timeslots);
    const userName = user?.Name || "Guest";

    const allBookings = timeslots.flatMap(slot => {
        return (slot.Bookings || []).map(booking => ({
            ...booking,
            EventName: slot.EventName,
            Duration: slot.Duration
        }));
    }).sort((a, b) => new Date(a.Start).getTime() - new Date(b.Start).getTime());

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-[#E5E7EB] font-body antialiased selection:bg-primary selection:text-white">
                <DashboardSidebar userName={userName} onNewTimeslot={() => setIsTimeslotModalOpen(true)} />

                <main className="flex flex-1 flex-col overflow-hidden bg-background-light dark:bg-[#131118] relative">
                    <div className="pointer-events-none absolute top-[-20%] left-[20%] h-125 w-125 rounded-full bg-primary/5 blur-[120px]"></div>
                    <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-100 w-100 rounded-full bg-blue-600/5 blur-[100px]"></div>

                    <DashboardHeader userName={userName} />

                    <header className="flex-none pb-0 pt-6 pl-6 pr-12 relative z-10">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-[#a79db9] text-sm">
                                        <span>Dashboard</span>
                                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                        <span className="text-white font-medium">My Schedule</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Bookings Management</h2>
                                </div>
                                <div className="flex gap-3">
                                    <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2839] bg-[#1d1924] text-white hover:bg-[#2e2839] transition-colors text-sm font-medium">
                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                        Export CSV
                                    </button>
                                    <button onClick={() => setIsTimeslotModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-lg shadow-primary/25">
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                        New Booking
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <div className="relative flex-1 min-w-[240px] group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a79db9] material-symbols-outlined">search</span>
                                    <input className="w-full bg-[#1d1924] border border-[#2e2839] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#a79db9]/50" placeholder="Search client, ID, or context..." type="text" />
                                </div>
                                <div className="flex items-center gap-2 bg-[#1d1924] border border-[#2e2839] rounded-xl p-1 pr-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg text-[#a79db9]">
                                        <span className="material-symbols-outlined">calendar_today</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[#a79db9] font-medium uppercase tracking-wider">Date Range</span>
                                        <select className="bg-transparent border-none p-0 text-white text-sm font-medium focus:ring-0 cursor-pointer">
                                            <option>All Time</option>
                                            <option>Upcoming</option>
                                            <option>Past</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto pt-6 pl-6 pr-12 pb-6 relative z-10 custom-scrollbar">
                        <div className="w-full min-w-[1000px]">
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-[#a79db9] uppercase tracking-wider border-b border-[#2e2839] mb-2">
                                <div className="col-span-3">Client / User</div>
                                <div className="col-span-3">Context</div>
                                <div className="col-span-3">Date & Time</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-1 text-right">Actions</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {allBookings.map((booking, idx) => {
                                    const statusColors = {
                                        confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
                                        pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                                        rejected: "bg-red-500/10 text-red-400 border-red-500/20"
                                    };

                                    const statusDotColors = {
                                        confirmed: "bg-green-400",
                                        pending: "bg-yellow-400",
                                        rejected: "bg-red-400"
                                    };

                                    const statusTheme = statusColors[booking.Status as keyof typeof statusColors] || statusColors.pending;
                                    const dotTheme = statusDotColors[booking.Status as keyof typeof statusDotColors] || statusDotColors.pending;

                                    return (
                                        <div key={idx} className="group grid grid-cols-12 gap-4 items-center p-4 bg-[#1d1924] border border-[#2e2839]/50 hover:border-primary/30 rounded-xl transition-all hover:bg-[#25202e] hover:shadow-lg hover:shadow-black/20">
                                            <div className="col-span-3 flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium text-sm">{booking.ClientName || 'Guest'}</span>
                                                    <span className="text-[#a79db9] text-xs">{booking.ClientEmail || 'No email provided'}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                    <span className="text-white text-sm">{booking.EventName || 'Event'}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center col-span-3">
                                                <span className="text-white text-sm">{format(new Date(booking.Start), 'MMM dd, yyyy')}</span>
                                                <span className="text-[#a79db9] text-xs">{format(new Date(booking.Start), 'hh:mm a')} - {format(new Date(booking.End), 'hh:mm a')}</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusTheme} ${booking.Status === 'confirmed' ? 'shadow-[0_0_10px_rgba(74,222,128,0.15)]' : ''}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${dotTheme} ${booking.Status === 'confirmed' ? 'animate-pulse' : ''}`}></span>
                                                    {booking.Status ? booking.Status.charAt(0).toUpperCase() + booking.Status.slice(1) : 'Pending'}
                                                </span>
                                            </div>
                                            <div className="col-span-1 flex justify-end">
                                                <button className="p-2 text-[#a79db9] hover:text-white hover:bg-[#2e2839] rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {allBookings.length === 0 && (
                                    <div className="p-8 text-center text-[#a79db9]">
                                        No bookings found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <TimeslotModal isOpen={isTimeslotModalOpen} onClose={() => setIsTimeslotModalOpen(false)} />
        </>
    );
};

export default ShowTimeslots;
