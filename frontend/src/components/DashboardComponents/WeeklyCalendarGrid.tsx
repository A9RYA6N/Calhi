import { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, isSameDay } from 'date-fns';
import type { Timeslot } from '@/types/timeslot';

// Map backend day abbreviation to short display name
const DAY_DISPLAY: Record<string, string> = {
    MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu',
    FRI: 'Fri', SAT: 'Sat', SUN: 'Sun',
};

function formatRecurringTooltip(slot: Timeslot): string {
    const days = (slot.RecurringDays ?? []).map(d => DAY_DISPLAY[d] ?? d).join(', ');
    const until = slot.Until ? format(new Date(slot.Until + 'T00:00:00'), 'MMM d') : null;
    return until ? `Repeats: ${days} until ${until}` : `Repeats: ${days}`;
}

const HOUR_HEIGHT = 80; // px per hour
const START_HOUR = 0;   // 12:00 AM
const END_HOUR = 24;    // midnight → full 24 hours
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
const TOTAL_HEIGHT = END_HOUR * HOUR_HEIGHT; // 1920px

interface WeeklyCalendarGridProps {
    timeslots: Timeslot[];
    bookingCountMap: Record<number, number>;
    weekStart: Date;
}

function getBlockStyle(startISO: string, endISO: string): React.CSSProperties {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const topPx = (start.getHours() + start.getMinutes() / 60) * HOUR_HEIGHT;
    const durationHours = (end.getTime() - start.getTime()) / 3_600_000;
    return {
        top: `${topPx}px`,
        height: `${Math.max(durationHours * HOUR_HEIGHT, 24)}px`,
    };
}

function formatBlockTime(iso: string) {
    return format(new Date(iso), 'h:mm a');
}

function formatHourLabel(h: number) {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
}

const WeeklyCalendarGrid: React.FC<WeeklyCalendarGridProps> = ({ timeslots, bookingCountMap, weekStart }) => {
    const navigate = useNavigate();
    const today = new Date();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to center the current time in the viewport on mount / week change
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Small delay so the DOM is fully painted before measuring clientHeight
        const raf = requestAnimationFrame(() => {
            const now = new Date();
            const nowPx = (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT;
            const scrollTo = Math.max(0, nowPx - el.clientHeight / 2.5);
            el.scrollTo({ top: scrollTo, behavior: 'smooth' });
        });
        return () => cancelAnimationFrame(raf);
    }, [weekStart]);

    // Build the 7 days of this week
    const weekDays = useMemo(
        () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
        [weekStart]
    );

    // Group timeslots by day column index
    const slotsByDay = useMemo(() => {
        const map: Record<number, Timeslot[]> = {};
        for (let i = 0; i < 7; i++) map[i] = [];
        timeslots.forEach(slot => {
            const idx = weekDays.findIndex(d => isSameDay(d, new Date(slot.StartsAt)));
            if (idx >= 0) map[idx].push(slot);
        });
        return map;
    }, [timeslots, weekDays]);

    // Current-time indicator (px from midnight)
    const nowPx = useMemo(() => {
        const now = new Date();
        return (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT;
    }, []);

    const isCurrentWeek = weekDays.some(d => isSameDay(d, today));

    return (
        /* 
         * Outer wrapper: fills the parent exactly (parent must have a concrete height).
         * flex-col so the sticky header + scrollable body stack vertically.
         */
        <div className="flex flex-col h-full w-full overflow-hidden">

            {/* ── Sticky day-name header ── */}
            <div className="flex shrink-0 border-b border-white/5 bg-[#131118]">
                {/* Spacer aligning with time column */}
                <div className="w-16 shrink-0 border-r border-white/5 bg-[#0f0f0f]" />
                <div className="grid grid-cols-7 flex-1 divide-x divide-white/5">
                    {weekDays.map((day, i) => {
                        const isToday = isSameDay(day, today);
                        return (
                            <div key={i} className={`px-2 py-3 text-center ${isToday ? 'bg-white/[0.04]' : ''}`}>
                                <span className={`block text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-[#9ca3af]'}`}>
                                    {format(day, 'EEE')}
                                </span>
                                {isToday ? (
                                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30">
                                        {format(day, 'd')}
                                    </span>
                                ) : (
                                    <span className={`mt-1 block text-lg font-bold ${i >= 5 ? 'text-[#9ca3af]/40' : 'text-white'}`}>
                                        {format(day, 'd')}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Scrollable body ── */}
            <div ref={scrollRef} className="flex flex-1 overflow-y-auto custom-scrollbar bg-[#0f0f0f]">

                {/* Time column — fixed width, full grid height */}
                <div className="w-16 shrink-0 border-r border-white/5 bg-[#0f0f0f] select-none" style={{ minHeight: `${TOTAL_HEIGHT}px` }}>
                    {HOURS.map(h => (
                        <div
                            key={h}
                            className="pr-2 text-right text-[10px] font-medium text-[#9ca3af]"
                            style={{ height: `${HOUR_HEIGHT}px`, paddingTop: '6px' }}
                        >
                            {formatHourLabel(h)}
                        </div>
                    ))}
                </div>

                {/* Day columns */}
                <div className="relative grid flex-1 grid-cols-7 divide-x divide-white/5" style={{ height: `${TOTAL_HEIGHT}px` }}>

                    {/* Hour lines */}
                    {HOURS.map(h => (
                        <div
                            key={h}
                            className="pointer-events-none absolute left-0 right-0 border-t border-white/[0.04]"
                            style={{ top: `${h * HOUR_HEIGHT}px` }}
                        />
                    ))}

                    {/* Current-time indicator */}
                    {isCurrentWeek && (
                        <div
                            className="pointer-events-none absolute left-0 right-0 z-20 flex items-center border-t-2 border-primary"
                            style={{ top: `${nowPx}px` }}
                        >
                            <div className="h-2.5 w-2.5 -ml-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(124,59,237,0.9)]" />
                        </div>
                    )}

                    {/* Day cells */}
                    {weekDays.map((_, dayIdx) => (
                        <div key={dayIdx} className={`relative ${dayIdx >= 5 ? 'bg-white/[0.01]' : ''}`}>
                            {slotsByDay[dayIdx].map(slot => {
                                const count = bookingCountMap[slot.ID] || 0;
                                return (
                                    <div
                                        key={slot.ID}
                                        className="absolute left-1 right-1 z-10 cursor-pointer rounded-lg gradient-slot p-2 transition-all group/slot hover:shadow-lg hover:shadow-primary/10 hover:brightness-110"
                                        style={getBlockStyle(slot.StartsAt, slot.EndsAt)}
                                        onClick={() => navigate(`/dashboard/timeslots/${slot.ID}`)}
                                        title={slot.IsRecurring ? formatRecurringTooltip(slot) : undefined}
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="truncate text-xs font-bold leading-tight text-white flex items-center gap-1">
                                                {slot.IsRecurring && (
                                                    <span className="material-symbols-outlined text-[11px] text-violet-300 flex-shrink-0" style={{ fontSize: '11px' }}>repeat</span>
                                                )}
                                                {slot.EventName || 'Timeslot'}
                                            </span>
                                            <span className="material-symbols-outlined ml-1 shrink-0 text-[13px] text-white opacity-0 transition-opacity group-hover/slot:opacity-100">
                                                open_in_new
                                            </span>
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-violet-300">
                                            {formatBlockTime(slot.StartsAt)} – {formatBlockTime(slot.EndsAt)}
                                        </div>
                                        {count > 0 && (
                                            <div className="mt-1 text-[10px] text-white/60">
                                                {count} booking{count !== 1 ? 's' : ''}
                                            </div>
                                        )}
                                        {/* Recurring tooltip (shown in native title on hover — see title prop above) */}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyCalendarGrid;
