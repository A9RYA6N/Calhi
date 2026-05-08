import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import TimeslotDrawer from '@/components/DashboardComponents/TimeslotDrawer';
import WeeklyCalendarGrid from '@/components/DashboardComponents/WeeklyCalendarGrid';
import TimeslotListCard from '@/components/DashboardComponents/TimeslotListCard';

type ViewTab = 'calendar' | 'timeslots';

function getMonday(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: 1 });
}

const ShowTimeslots = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<ViewTab>('calendar');
    const [weekStart, setWeekStart] = useState<Date>(getMonday(new Date()));

    const user = useAppSelector(state => state.auth.user);
    const timeslots = useAppSelector(state => state.timeslot.timeslots);
    const bookings = useAppSelector(state => state.booking.bookings);
    const userName = user?.Name || "Guest";
    const userSlug = user?.Username || user?.username || user?.UserName || '';

    // Booking count per timeslot
    const bookingCountMap = useMemo(() =>
        bookings.reduce((acc, b) => {
            acc[b.TimeslotID] = (acc[b.TimeslotID] || 0) + 1;
            return acc;
        }, {} as Record<number, number>),
        [bookings]
    );

    const prevWeek = () => setWeekStart(w => subWeeks(w, 1));
    const nextWeek = () => setWeekStart(w => addWeeks(w, 1));
    const weekEnd = addDays(weekStart, 6);
    const monthLabel = format(weekStart, 'MMM yyyy');

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden bg-[#0f0f0f] text-white font-body antialiased selection:bg-primary selection:text-white">
                <DashboardSidebar userName={userName} onNewTimeslot={() => setDrawerOpen(true)} />

                <main className="flex flex-1 flex-col overflow-hidden relative">
                    {/* Ambient glows */}
                    <div className="pointer-events-none absolute top-[-20%] left-[20%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                    <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />

                    <DashboardHeader userName={userName} />

                    {/* Page header + tabs */}
                    <div className="px-6 pt-6 pb-0 border-b border-white/5 bg-[#0f0f0f] shrink-0 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 mb-1">
                                    Dashboard · My Schedule
                                </p>
                                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                                    Availability Management
                                </h1>
                                <p className="text-[#9ca3af] text-sm">
                                    Manage your weekly slots, {timeslots.length} slot{timeslots.length !== 1 ? 's' : ''} configured.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/${userSlug}`}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] border border-white/5 transition-colors text-white text-sm font-bold shadow-lg"
                                    target="_blank"
                                >
                                    <span className="material-symbols-outlined text-[18px]">public</span>
                                    Show booking page
                                </Link>

                                {/* Month label + week nav */}
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#171717] border border-white/5 text-white text-sm font-medium transition-colors">
                                        <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">calendar_today</span>
                                        {monthLabel}
                                    </button>
                                    <div className="flex bg-[#171717] rounded-lg p-1 border border-white/5">
                                        <button onClick={prevWeek} className="p-1.5 rounded text-[#9ca3af] transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                        </button>
                                        <button onClick={nextWeek} className="p-1.5 rounded text-[#9ca3af] transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>

                                {/* New timeslot */}
                                <button
                                    onClick={() => setDrawerOpen(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary transition-colors text-white text-sm font-bold shadow-lg shadow-primary/25"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    New Timeslot
                                </button>
                            </div>
                        </div>

                        {/* Tab bar */}
                        <div className="flex gap-8">
                            {(['calendar', 'timeslots'] as ViewTab[]).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-bold border-b-2 transition-all capitalize ${activeTab === tab
                                            ? 'border-primary text-white'
                                            : 'border-transparent text-[#9ca3af] '
                                        }`}
                                >
                                    {tab === 'calendar' ? 'Calendar' : 'Timeslots'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content area — must be flex + overflow-hidden so child gets a concrete height */}
                    <div className="flex flex-1 flex-col overflow-hidden relative z-10 min-h-0">
                        {activeTab === 'calendar' ? (
                            <WeeklyCalendarGrid
                                timeslots={timeslots}
                                bookingCountMap={bookingCountMap}
                                weekStart={weekStart}
                            />
                        ) : (
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="p-6 space-y-3 max-w-4xl mx-auto">
                                    {/* Week range banner */}
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af] mb-4">
                                        {format(weekStart, 'MMM d')} – {format(weekEnd, 'MMM d, yyyy')} · All timeslots
                                    </p>

                                    {timeslots.length > 0 ? (
                                        timeslots
                                            .slice()
                                            .sort((a, b) => new Date(a.StartsAt).getTime() - new Date(b.StartsAt).getTime())
                                            .map(slot => (
                                                <TimeslotListCard
                                                    key={slot.ID}
                                                    slot={slot}
                                                    bookingCount={bookingCountMap[slot.ID] || 0}
                                                />
                                            ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-24 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-[#171717] border border-white/5 flex items-center justify-center text-violet-400 mb-4">
                                                <span className="material-symbols-outlined text-3xl">calendar_today</span>
                                            </div>
                                            <p className="text-white font-bold text-lg mb-1">No timeslots yet</p>
                                            <p className="text-[#9ca3af] text-sm mb-6">Create your first availability slot to get started.</p>
                                            <button
                                                onClick={() => setDrawerOpen(true)}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient text-white text-sm font-bold shadow-lg shadow-primary/25"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                                New Timeslot
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <TimeslotDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default ShowTimeslots;
