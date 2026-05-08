import { format } from 'date-fns';
import type { Timeslot } from '../../types/timeslot';

interface Step1Props {
    // Multi-occurrence series
    timeslots: Timeslot[];
    isLoading: boolean;
    selectedSlot: Timeslot | null;
    onSelectSlot: (slot: Timeslot) => void;
    // Time intervals within the selected slot
    intervals: { start: Date; end: Date }[];
    selectedInterval: number | null;
    setSelectedInterval: (idx: number) => void;
    setStep: (step: number) => void;
}

const Step1 = ({
    timeslots,
    isLoading,
    selectedSlot,
    onSelectSlot,
    intervals,
    selectedInterval,
    setSelectedInterval,
    setStep,
}: Step1Props) => {
    const isMultiOccurrence = timeslots.length > 1;

    return (
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-[#171717]/30">
            <h3 className="font-headline text-2xl font-bold text-white mb-8 tracking-tight">
                Select a Date &amp; Time
            </h3>

            {isLoading ? (
                <div className="flex flex-1 items-center justify-center text-[#9ca3af] text-sm">
                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                    Loading availability...
                </div>
            ) : timeslots.length === 0 ? (
                <div className="flex flex-1 items-center justify-center flex-col gap-3 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#9ca3af]">event_busy</span>
                    <p className="text-[#9ca3af] text-sm">No available slots found.</p>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8 flex-1">

                    {/* ── Left: Date selection (multi) or date label (single) ── */}
                    <div className="w-full md:w-[50%] flex flex-col">
                        {isMultiOccurrence ? (
                            <>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 mb-4">
                                    Available Dates
                                </p>
                                <div className="flex flex-col gap-2 overflow-y-auto max-h-[340px] custom-scrollbar pr-1">
                                    {timeslots.map(slot => {
                                        const slotDate = new Date(slot.StartsAt);
                                        const isSelected = selectedSlot?.ID === slot.ID;
                                        return (
                                            <button
                                                key={slot.ID}
                                                onClick={() => onSelectSlot(slot)}
                                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${isSelected
                                                        ? 'border-primary bg-primary/10 text-white'
                                                        : 'border-white/5 bg-[#111111] text-[#9ca3af] '
                                                    }`}
                                            >
                                                {/* Date badge */}
                                                <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex flex-col items-center justify-center text-center transition-colors ${isSelected ? 'bg-primary/20' : 'bg-white/5'
                                                    }`}>
                                                    <span className="text-[9px] font-black uppercase tracking-widest leading-none opacity-70">
                                                        {format(slotDate, 'MMM')}
                                                    </span>
                                                    <span className="text-lg font-black leading-tight">
                                                        {format(slotDate, 'd')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">
                                                        {format(slotDate, 'EEEE, MMMM d')}
                                                    </span>
                                                    <span className="text-xs opacity-60 mt-0.5">
                                                        {format(slotDate, 'h:mm a')}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <span className="material-symbols-outlined ml-auto text-primary text-[18px]">check_circle</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            // Single occurrence — show a calendar-style date display
                            <div className="flex flex-col gap-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
                                    Date
                                </p>
                                {timeslots[0] && (
                                    <div className="flex items-center gap-4 px-4 py-4 rounded-xl border border-primary/30 bg-primary/5">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex flex-col items-center justify-center text-center">
                                            <span className="text-[9px] font-black uppercase tracking-widest leading-none text-primary/70">
                                                {format(new Date(timeslots[0].StartsAt), 'MMM')}
                                            </span>
                                            <span className="text-xl font-black text-white leading-tight">
                                                {format(new Date(timeslots[0].StartsAt), 'd')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">
                                                {format(new Date(timeslots[0].StartsAt), 'EEEE, MMMM d, yyyy')}
                                            </p>
                                            <p className="text-[#9ca3af] text-xs mt-0.5">
                                                {format(new Date(timeslots[0].StartsAt), 'h:mm a')} – {format(new Date(timeslots[0].EndsAt), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Time slots within the selected occurrence ── */}
                    <div className="w-full md:w-[50%] flex flex-col border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 mb-4">
                            {selectedSlot
                                ? format(new Date(selectedSlot.StartsAt), 'EEEE, MMMM d')
                                : isMultiOccurrence
                                    ? 'Select a date first'
                                    : 'Available Times'}
                        </p>

                        {!selectedSlot && isMultiOccurrence ? (
                            <div className="flex flex-1 items-center justify-center flex-col gap-2 text-center text-[#9ca3af]">
                                <span className="material-symbols-outlined text-3xl opacity-40">touch_app</span>
                                <p className="text-sm">Pick a date to see times</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[340px] custom-scrollbar">
                                {intervals.map((intv, idx) => {
                                    const timeString = format(intv.start, 'h:mm a');
                                    const isSelected = selectedInterval === idx;

                                    if (isSelected) {
                                        return (
                                            <div key={idx} className="flex w-full gap-2 items-stretch h-[50px] animate-in slide-in--2 duration-200">
                                                <div className="w-1/2 bg-[#171717] border border-[#262626] flex items-center justify-center rounded-xl font-medium text-sm text-[#9ca3af]">
                                                    {timeString}
                                                </div>
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="w-1/2 btn-gradient rounded-xl font-bold text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-1"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        );
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedInterval(idx)}
                                            className="w-full border border-white/5 bg-[#111111] transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm"
                                        >
                                            {timeString}
                                        </button>
                                    );
                                })}

                                {selectedSlot && intervals.length === 0 && (
                                    <div className="text-center text-[#9ca3af] py-10 text-sm">
                                        No available times for this date.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step1;
