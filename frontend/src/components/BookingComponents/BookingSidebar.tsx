import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { formatDuration } from '../../utils/bookingUtils/timeUtil';

interface BookingSidebarProps {
    step: number;
    username: string | undefined;
    hostName: string;
    timeslot: any;
    selectedInterval: number | null;
    intervals: any[];
    setStep: (step: number) => void;
}

const BookingSidebar = ({
    step,
    username,
    hostName,
    timeslot,
    selectedInterval,
    intervals,
    setStep
}: BookingSidebarProps) => {
    return (
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
    );
};

export default BookingSidebar;
