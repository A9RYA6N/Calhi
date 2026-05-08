import { useState, useMemo, useRef, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import type { Timeslot } from '@/types/timeslot';

interface DashboardWeeklyOutlookProps {
    Timeslots: Timeslot[];
}

// Compact row height for dashboard widget — keeps the card at a fixed, predictable size
const HOUR_HEIGHT = 48;
const END_HOUR = 24;
const HOURS = Array.from({ length: END_HOUR }, (_, i) => i);
const TOTAL_HEIGHT = END_HOUR * HOUR_HEIGHT; // 1152px — full scrollable height

function formatHourLabel(h: number) {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
}

function getBlockStyle(startISO: string, endISO: string): React.CSSProperties {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const topPx = (start.getHours() + start.getMinutes() / 60) * HOUR_HEIGHT;
    const durationHours = (end.getTime() - start.getTime()) / 3_600_000;
    return {
        top: `${topPx}px`,
        height: `${Math.max(durationHours * HOUR_HEIGHT, 20)}px`,
    };
}

const DashboardWeeklyOutlook = ({ Timeslots }: DashboardWeeklyOutlookProps) => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    // scrollRef points at the scrollable grid body — NOT the card or the page
    const scrollRef = useRef<HTMLDivElement>(null);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const dateRangeLabel = `${format(weekStart, 'MMM d')} – ${format(weekEnd, 'MMM d')}`;

    const weekDays = useMemo(
        () => Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + i);
            return d;
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [weekStart.toDateString()]
    );

    const isCurrentWeek = weekDays.some(d => isSameDay(d, new Date()));

    // Auto-scroll the inner grid div to centre current time — NOT the page
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const raf = requestAnimationFrame(() => {
            const now = new Date();
            const nowPx = (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT;
            // Put current time ~40% from the top of the visible area
            el.scrollTo({ top: Math.max(0, nowPx - el.clientHeight * 0.4), behavior: 'smooth' });
        });
        return () => cancelAnimationFrame(raf);
    }, [currentDate]);

    // Current-time line position
    const nowPx = useMemo(() => {
        const now = new Date();
        return (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT;
    }, []);

    return (
        /*
        * The card is a FIXED-HEIGHT flex column.
        * Only the inner grid body (scrollRef) scrolls — the card header is always visible.
        * h-[420px] matches the original dashboard widget height.
        */
        <div className="glass-card rounded-2xl p-5 lg:col-span-2 flex flex-col h-[420px]">

            {/* ── Card header (never scrolls) ── */}
            <div className="flex shrink-0 items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white">Weekly Outlook</h3>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setCurrentDate(d => subWeeks(d, 1))}
                        className="p-1 rounded-lg text-[#a79db9] ] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <span className="text-sm font-medium text-white px-1">{dateRangeLabel}</span>
                    <button
                        onClick={() => setCurrentDate(d => addWeeks(d, 1))}
                        className="p-1 rounded-lg text-[#a79db9] ] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="ml-1 text-xs font-medium bg-[#2e2839] ] text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Today
                    </button>
                </div>
            </div>

            {/* ── Day-name row (never scrolls) ── */}
            <div className="grid shrink-0 grid-cols-[44px_repeat(7,1fr)] border-b border-white/5 pb-2 mb-1">
                <div /> {/* spacer for time column */}
                {weekDays.map((day, i) => {
                    const isToday = isSameDay(day, new Date());
                    return (
                        <div key={i} className="text-center">
                            <div className={`text-[9px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-[#9ca3af]'}`}>
                                {format(day, 'EEE')}
                            </div>
                            <div className={`mx-auto mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${isToday ? 'bg-primary text-white shadow-sm shadow-primary/40' : 'text-[#9ca3af]'}`}>
                                {format(day, 'd')}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/*
 * ── Scrollable grid body ──
 * overflow-y-auto on THIS div only — not the card, not the page.
 * flex-1 fills the remaining card height.
 */}
            <div ref={scrollRef} className="flex flex-1 overflow-y-auto custom-scrollbar min-h-0">

                {/* Time-label column */}
                <div className="w-11 shrink-0 select-none" style={{ height: `${TOTAL_HEIGHT}px` }}>
                    {HOURS.map(h => (
                        <div
                            key={h}
                            className="pr-1.5 text-right text-[9px] text-[#9ca3af]"
                            style={{ height: `${HOUR_HEIGHT}px`, paddingTop: '4px' }}
                        >
                            {/* Only show label every 2 hours to avoid crowding */}
                            {h % 2 === 0 ? formatHourLabel(h) : ''}
                        </div>
                    ))}
                </div>

                {/* 7-column grid with absolute-positioned events */}
                <div
                    className="relative flex-1 grid grid-cols-7 divide-x divide-white/[0.04]"
                    style={{ height: `${TOTAL_HEIGHT}px` }}
                >
                    {/* Hour lines */}
                    {HOURS.map(h => (
                        <div
                            key={h}
                            className="pointer-events-none absolute left-0 right-0 border-t border-white/[0.04]"
                            style={{ top: `${h * HOUR_HEIGHT}px` }}
                        />
                    ))}

                    {/* Current time indicator */}
                    {isCurrentWeek && (
                        <div
                            className="pointer-events-none absolute left-0 right-0 z-20 flex items-center border-t-2 border-primary"
                            style={{ top: `${nowPx}px` }}
                        >
                            <div className="h-2 w-2 -ml-1 rounded-full bg-primary shadow-[0_0_6px_rgba(124,59,237,0.9)]" />
                        </div>
                    )}

                    {/* Day columns */}
                    {weekDays.map((day, dayIdx) => {
                        const daySlots = Timeslots.filter(t => isSameDay(new Date(t.StartsAt), day));
                        const isToday = isSameDay(day, new Date());
                        return (
                            <div key={dayIdx} className={`relative ${isToday ? 'bg-primary/[0.025]' : ''}`}>
                                {daySlots.map(slot => (
                                    <div
                                        key={slot.ID}
                                        className="absolute left-0.5 right-0.5 z-10 cursor-pointer overflow-hidden rounded gradient-slot px-1 py-0.5 transition-all group/slot hover:brightness-110"
                                        style={getBlockStyle(slot.StartsAt, slot.EndsAt)}
                                        onClick={() => navigate(`/dashboard/timeslots/${slot.ID}`)}
                                        title={slot.EventName || 'Timeslot'}
                                    >
                                        <span className="line-clamp-2 text-[10px] font-bold leading-tight text-white">
                                            {slot.EventName || 'Timeslot'}
                                        </span>
                                        <span className="hidden text-[9px] text-violet-300 group-hover/slot:block">
                                            {format(new Date(slot.StartsAt), 'h:mm a')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardWeeklyOutlook;
