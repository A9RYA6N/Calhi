import { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import type { Timeslot } from "../pages/Dashboard";

interface DashboardWeeklyOutlookProps {
    Timeslots: Timeslot[];
}

const DashboardWeeklyOutlook = ({ Timeslots }: DashboardWeeklyOutlookProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

    // Get an array of the 7 days for the current week starting from Monday
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);
            return date;
        });
    }, [weekStart]);

    const dateRangeLabel = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;

    const calculateTopAndHeight = (startString: string, endString: string) => {
        const start = new Date(startString);
        const end = new Date(endString);
        
        // Timeline is 8:00 AM to 8:00 PM (12 hours)
        const startHourOffset = start.getHours() + (start.getMinutes() / 60) - 8;
        const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        
        const topPercentage = Math.max(0, Math.min(100, (startHourOffset / 12) * 100));
        const heightPercentage = Math.max(0, Math.min(100, (durationHours / 12) * 100));
        
        return { top: `${topPercentage}%`, height: `${heightPercentage}%` };
    };

    return (
        <div className="glass-card rounded-2xl p-6 lg:col-span-2 flex flex-col h-full min-h-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Weekly Outlook</h3>
                <div className="flex items-center gap-2">
                    <button onClick={handlePreviousWeek} className="p-1 text-[#a79db9] hover:text-white hover:bg-[#2e2839] rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <span className="text-sm font-medium text-white">{dateRangeLabel}</span>
                    <button onClick={handleNextWeek} className="p-1 text-[#a79db9] hover:text-white hover:bg-[#2e2839] rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="ml-2 text-xs font-medium bg-[#2e2839] hover:bg-[#3f374e] text-white px-3 py-1.5 rounded-lg transition-colors">
                        Today
                    </button>
                </div>
            </div>

            {/* Calendar Visual */}
            <div className="flex flex-1 flex-col gap-4">
                {/* Days Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-[#a79db9] border-b border-[#2e2839] pb-2 pl-15">
                    {weekDays.map((day, idx) => (
                        <div key={idx} className={isSameDay(day, new Date()) ? "text-primary font-bold" : ""}>
                            {format(day, 'EEE')}
                        </div>
                    ))}
                </div>

                {/* Timeline Grid */}
                <div className="flex-1 grid gap-2 relative grid-cols-[60px_repeat(7,1fr)]">
                    {/* Time Axis */}
                    <div className="flex flex-col justify-between text-[10px] text-[#a79db9] pr-2 border-r border-[#2e2839]/30">
                        <div>08:00 AM</div>
                        <div>09:00 AM</div>
                        <div>10:00 AM</div>
                        <div>11:00 AM</div>
                        <div>12:00 PM</div>
                        <div>01:00 PM</div>
                        <div>02:00 PM</div>
                        <div>03:00 PM</div>
                        <div>04:00 PM</div>
                        <div>05:00 PM</div>
                        <div>06:00 PM</div>
                        <div>07:00 PM</div>
                        <div>08:00 PM</div>
                    </div>

                    {/* Horizontal Lines for Time visual */}
                    <div className="absolute inset-0 left-12 flex flex-col justify-between pointer-events-none opacity-20">
                        {[...Array(13)].map((_, i) => (
                            <div key={i} className="w-full border-t border-[#a79db9] border-dashed"></div>
                        ))}
                    </div>

                    {/* Render Columns */}
                    {weekDays.map((targetDate, index) => {
                        const dayTimeslots = Timeslots.filter(b => isSameDay(new Date(b.Start), targetDate));
                        const isToday = isSameDay(targetDate, new Date());

                        return (
                            <div key={index} className={`relative pt-2 ${isToday ? 'bg-[#1e1b24]/50 rounded-lg' : ''}`}>
                                {isToday && (
                                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full mt-1"></div>
                                )}
                                {dayTimeslots.map(Timeslot => {
                                    const { top, height } = calculateTopAndHeight(Timeslot.Start, Timeslot.End);
                                    return (
                                        <div 
                                            key={Timeslot.ID} 
                                            className="absolute left-0 right-0 bg-linear-to-b from-primary/30 to-primary/10 border border-primary/40 rounded-md mx-1 flex items-center justify-center overflow-hidden hover:from-primary/50 hover:to-primary/20 transition-colors cursor-pointer" 
                                            style={{ top, height }}
                                        >
                                            <span className="text-[10px] sm:text-xs font-bold text-white line-clamp-2 px-1 text-center">
                                                Timeslot
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardWeeklyOutlook;
