import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import TimeslotModal from '@/components/DashboardComponents/TimeslotModal';
import { format } from 'date-fns';

const ShowBookings = () => {
    const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);
    const bookings = useAppSelector(state => state.booking.bookings);
    const timeslots = useAppSelector(state => state.timeslot.timeslots);
    const userName = user?.Name || "Guest";

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-[#E5E7EB] font-body antialiased selection:bg-primary selection:text-white">
                <DashboardSidebar userName={userName} onNewTimeslot={() => setIsTimeslotModalOpen(true)} />

                <main className="flex flex-1 flex-col overflow-hidden bg-background-light dark:bg-[#0f0f0f] relative">
                    <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
                    <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>

                    <DashboardHeader userName={userName} />

                    <div className="flex-1 overflow-auto custom-scrollbar relative z-10">
                        <div className="px-8 py-12 max-w-6xl mx-auto">
                            <div className="mb-12">
                                <p className="font-['Inter'] uppercase tracking-[0.2em] text-[11px] font-bold text-primary mb-2">Attendee Portal</p>
                                <h1 className="text-5xl font-black tracking-tighter text-white mb-8">Meetings</h1>

                                <div className="flex items-center gap-8 border-b border-white/5">
                                    <button className="pb-4 text-white font-bold border-b-2 border-primary relative">
                                        Upcoming
                                        <span className="ml-2 px-2 py-0.5 rounded bg-primary/20 text-[10px] text-primary">2</span>
                                    </button>
                                    <button className="pb-4 text-gray-500 font-medium hover:text-gray-300 transition-colors">
                                        Past
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {bookings.length > 0 ? bookings.map((booking) => {
                                    const timeslot = timeslots.find(t => t.ID === booking.TimeslotID);
                                    const eventName = timeslot?.EventName || "Meeting";
                                    const startDate = new Date(booking.Start);
                                    const endDate = new Date(booking.End);

                                    return (
                                        <div key={booking.ID} className="bg-[#171717]/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 group hover:border-primary/20 transition-all duration-300 flex items-center justify-between">
                                            <div className="flex items-center gap-8">
                                                <div className="w-20 text-center py-2 rounded-xl bg-white/5 border border-white/5">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">{format(startDate, 'MMM')}</span>
                                                    <span className="block text-2xl font-black text-white">{format(startDate, 'dd')}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                                        <span className="text-sm font-semibold text-white">{format(startDate, 'hh:mm a')} - {format(endDate, 'hh:mm a')}</span>
                                                        <span className="h-1 w-1 bg-white/20 rounded-full"></span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{eventName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 bg-[#25202e] flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-[#a79db9] text-xs">person</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-200">{booking.ClientName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all active:scale-95">
                                                    Details
                                                </button>
                                                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#171717]/40 text-gray-500 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }) : (
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

export default ShowBookings;
