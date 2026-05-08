import { format } from 'date-fns';

export const renderCalendar = (timeslot: any) => {
    if (!timeslot || !timeslot.StartsAt) return null;
    const date = new Date(timeslot.StartsAt);
    const month = format(date, 'MMMM yyyy');
    const day = date.getDate();

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const offset = startDay === 0 ? 6 : startDay - 1;

    const blanks = Array.from({ length: offset }).map((_, i) => <div key={`b-${i}`} className="w-10 h-10 mx-auto"></div>);
    const days = Array.from({ length: daysInMonth }).map((_, i) => {
        const d = i + 1;
        if (d === day) {
            return (
                <button key={d} className="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] relative">
                    {d}
                    <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                </button>
            );
        }
        return (
            <button key={d} disabled className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#9ca3af]/40 cursor-not-allowed">
                {d}
            </button>
        );
    });

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-headline font-semibold text-lg">{month}</h4>
                <div className="flex gap-2">
                    <button disabled className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1f1f1f] text-[#9ca3af]/30 cursor-not-allowed">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button disabled className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1f1f1f] text-[#9ca3af]/30 cursor-not-allowed border border-white/5">
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
                {blanks}
                {days}
            </div>
        </>
    );
};
