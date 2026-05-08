import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import type { Timeslot } from '@/types/timeslot';

interface TimeslotListCardProps {
    slot: Timeslot;
    bookingCount: number;
}

const TimeslotListCard: React.FC<TimeslotListCardProps> = ({ slot, bookingCount }) => {
    const navigate = useNavigate();
    const start = new Date(slot.StartsAt);
    const end = new Date(slot.EndsAt);

    return (
        <div
            className="flex items-center justify-between p-4 bg-[#1d1924] border border-white/5 rounded-xl ] /20 transition-all cursor-pointer group"
            onClick={() => navigate(`/dashboard/timeslots/${slot.ID}`)}
        >
            <div className="flex items-center gap-4">
                {/* Color indicator dot */}
                <div className="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/50 shrink-0" />

                <div className="flex flex-col gap-0.5">
                    <span className="text-white font-semibold text-sm -violet-200 transition-colors">
                        {slot.EventName || 'Timeslot'}
                    </span>
                    <span className="text-[#9ca3af] text-xs">
                        {format(start, 'EEE, MMM d')} · {format(start, 'h:mm a')} – {format(end, 'h:mm a')}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                {/* Duration badge */}
                {slot.Duration && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 text-[#9ca3af] text-[10px] font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {slot.Duration}m
                    </span>
                )}

                {/* Booking count badge */}
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${bookingCount > 0
                        ? 'bg-primary/15 text-primary'
                        : 'bg-white/5 text-[#9ca3af]'
                    }`}>
                    {bookingCount} booking{bookingCount !== 1 ? 's' : ''}
                </span>

                {/* Arrow */}
                <span className="material-symbols-outlined text-[#9ca3af] -white -x-0.5 transition-all text-[20px]">
                    arrow_forward
                </span>
            </div>
        </div>
    );
};

export default TimeslotListCard;
