import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppSelector } from '../store/hooks';
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";

function getInitials(name: string): string {
    const parts = name.trim().split(' ');
    return parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
}

const statusConfig: Record<string, { label: string; className: string }> = {
    confirmed: { label: 'Confirmed', className: 'bg-green-500/10 text-green-400' },
    pending: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-400' },
    arrived: { label: 'Arrived', className: 'bg-violet-500/10 text-violet-400' },
    rejected: { label: 'Rejected', className: 'bg-red-500/10 text-red-400' },
};

const TimeslotDetailPage = () => {
    const { id } = useParams();

    const user = useAppSelector(state => state.auth.user);
    const timeslots = useAppSelector(state => state.timeslot.timeslots);
    const allBookings = useAppSelector(state => state.booking.bookings);

    const userName = user?.Name || 'Guest';
    const timeslotId = Number(id);

    const timeslot = useMemo(
        () => timeslots.find(t => t.ID === timeslotId),
        [timeslots, timeslotId]
    );

    const bookings = useMemo(
        () => allBookings.filter(b => b.TimeslotID === timeslotId),
        [allBookings, timeslotId]
    );

    if (!timeslot) {
        return (
            <div className="flex h-screen w-full bg-[#0f0f0f] text-white font-body">
                <DashboardSidebar userName={userName} onNewTimeslot={() => { }} />
                <main className="flex flex-1 items-center justify-center flex-col gap-4">
                    <span className="material-symbols-outlined text-5xl text-[#9ca3af]">event_busy</span>
                    <p className="text-white font-bold text-lg">Timeslot not found</p>
                    <Link to="/dashboard/timeslots" className="text-sm text-[#9ca3af]">
                        ← Back to My Schedule
                    </Link>
                </main>
            </div>
        );
    }

    const start = new Date(timeslot.StartsAt);
    const end = new Date(timeslot.EndsAt);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#0f0f0f] text-white font-body antialiased">
            <DashboardSidebar userName={userName} onNewTimeslot={() => { }} />

            <main className="flex flex-1 flex-col overflow-hidden relative">


                <DashboardHeader userName={userName} />

                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 mb-6">
                        <Link
                            to="/dashboard/timeslots"
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af] -400 transition-colors cursor-pointer"
                        >
                            My Schedule
                        </Link>
                        <span className="material-symbols-outlined text-[14px] text-[#9ca3af]/40">chevron_right</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">
                            {timeslot.EventName || 'Timeslot'}
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-[#9ca3af]/40">chevron_right</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">Details</span>
                    </nav>

                    {/* Page header */}
                    <header className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
                                    Timeslot Details
                                </h1>
                                <p className="text-[#9ca3af] text-base">
                                    Detailed overview and booking management for the selected interval.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest text-[#9ca3af] border border-white/10 transition-all">
                                    Archive Slot
                                </button>
                                <button className="px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest btn-gradient text-white transition-transform">
                                    Share Slot
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Slot Overview Card */}
                        <section className="lg:col-span-1">
                            <div className="glass-card rounded-xl p-8 relative overflow-hidden group">
                                {/* Ambient glow inside card */}
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af] mb-8">
                                    Slot Overview
                                </h3>

                                <div className="space-y-8 relative z-10">
                                    {/* Event name */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#171717] flex items-center justify-center text-[#9ca3af] border border-white/5 shrink-0">
                                            <span className="material-symbols-outlined">calendar_month</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">Context</p>
                                            <p className="text-xl font-bold text-white tracking-tight">{timeslot.EventName || 'Timeslot'}</p>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#171717] flex items-center justify-center text-[#9ca3af] border border-white/5 shrink-0">
                                            <span className="material-symbols-outlined">event</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">Date</p>
                                            <p className="text-xl font-bold text-white tracking-tight">{format(start, 'MMMM d, yyyy')}</p>
                                        </div>
                                    </div>

                                    {/* Start / End */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#171717] flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
                                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">Start</p>
                                                <p className="font-bold text-white">{format(start, 'h:mm a')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#171717] flex items-center justify-center text-blue-400 border border-white/5 shrink-0">
                                                <span className="material-symbols-outlined text-[18px]">history</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">End</p>
                                                <p className="font-bold text-white">{format(end, 'h:mm a')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    {timeslot.Duration && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#171717] flex items-center justify-center text-[#9ca3af] border border-white/5 shrink-0">
                                                <span className="material-symbols-outlined">hourglass_empty</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">Duration / slot</p>
                                                <p className="text-xl font-bold text-white">{timeslot.Duration} min</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recurring status */}
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-green-400">sync</span>
                                                <span className="text-sm font-bold text-white">Recurring Status</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-[#2e2839] text-[#9ca3af] text-[9px] font-black uppercase tracking-widest">
                                                One-time
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA buttons */}
                                <div className="mt-10 flex flex-col gap-3 relative z-10">
                                    <button className="w-full btn-gradient py-4 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all">
                                        Update Slot
                                    </button>
                                    <button className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-red-400 border border-red-500/20 -500/10 -500 transition-all">
                                        Delete Slot
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Bookings section */}
                        <section className="lg:col-span-2">
                            <div className="glass-card rounded-xl p-8 h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af] mb-1">
                                            Bookings on this Slot
                                        </h3>
                                        <p className="text-sm text-[#9ca3af]">
                                            {bookings.length} booking{bookings.length !== 1 ? 's' : ''} filled
                                        </p>
                                    </div>
                                    <button className="text-xs font-bold text-[#9ca3af] underline underline-offset-4">
                                        Export Attendance
                                    </button>
                                </div>

                                {bookings.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    {['Name', 'Email', 'Booking Time', 'Status', 'Actions'].map(h => (
                                                        <th
                                                            key={h}
                                                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af] ${h === 'Actions' ? 'text-right' : ''}`}
                                                        >
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {bookings.map(booking => {
                                                    const status = booking.Status?.toLowerCase() || 'pending';
                                                    const cfg = statusConfig[status] || statusConfig.pending;
                                                    const initials = getInitials(booking.ClientName || '?');
                                                    return (
                                                        <tr key={booking.ID} className="group .02] transition-colors">
                                                            <td className="py-5">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-full bg-[#2e2839] border border-white/10 flex items-center justify-center font-bold text-sm text-white shrink-0">
                                                                        {initials}
                                                                    </div>
                                                                    <span className="font-bold text-white tracking-tight">{booking.ClientName}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-5 text-sm text-[#9ca3af]">{booking.ClientEmail}</td>
                                                            <td className="py-5 text-sm text-[#9ca3af]">
                                                                {format(new Date(booking.StartsAt), 'h:mm a')}
                                                            </td>
                                                            <td className="py-5">
                                                                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${cfg.className}`}>
                                                                    {cfg.label}
                                                                </span>
                                                            </td>
                                                            <td className="py-5 text-right">
                                                                <button className="text-[#9ca3af] transition-colors">
                                                                    <span className="material-symbols-outlined">more_vert</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center text-[#9ca3af]">
                                        <span className="material-symbols-outlined text-4xl mb-3">event_available</span>
                                        <p className="font-semibold text-white mb-1">No bookings yet</p>
                                        <p className="text-sm">Bookings for this slot will appear here.</p>
                                    </div>
                                )}

                                {/* Add manual booking */}
                                <div className="mt-10 p-6 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center group -500/50 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-[#171717] flex items-center justify-center text-[#9ca3af] mb-3">
                                        <span className="material-symbols-outlined">person_add</span>
                                    </div>
                                    <p className="font-bold text-white">Add Manual Booking</p>
                                    <p className="text-xs text-[#9ca3af] mt-1">Directly assign a client to this remaining slot</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TimeslotDetailPage;
