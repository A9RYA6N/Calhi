import { format } from 'date-fns';
import { renderCalendar } from '../../utils/bookingUtils/renderCalendar';

interface Step1Props {
    timeslot: any;
    intervals: any[];
    selectedInterval: number | null;
    setSelectedInterval: (idx: number) => void;
    setStep: (step: number) => void;
}

const Step1 = ({ timeslot, intervals, selectedInterval, setSelectedInterval, setStep }: Step1Props) => {
    return (
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-[#171717]/30">
            <h3 className="font-headline text-2xl font-bold text-white mb-8 tracking-tight">Select a Date & Time</h3>
            <div className="flex flex-col md:flex-row gap-10 flex-1">
                {/* Calendar Section */}
                <div className="w-full md:w-[55%] flex flex-col">
                    {renderCalendar(timeslot) || <div className="text-[#9ca3af]">Loading calendar...</div>}
                </div>
                {/* Time Slots */}
                <div className="w-full md:w-[45%] flex flex-col border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
                    <p className="font-medium text-sm text-white mb-6">
                        {timeslot?.Start ? format(new Date(timeslot.Start), "EEEE, MMMM d") : "Loading..."}
                    </p>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[320px] custom-scrollbar">
                        {intervals.map((intv, idx) => {
                            const timeString = format(intv.start, "h:mm a");
                            const isSelected = selectedInterval === idx;
                            
                            if (isSelected) {
                                return (
                                    <div key={idx} className="flex w-full gap-2 items-stretch h-[50px] animate-in slide-in-from-right-2 duration-200">
                                        <div className="w-1/2 bg-[#171717] border border-[#262626] flex items-center justify-center rounded-xl font-medium text-sm text-[#9ca3af]">
                                            {timeString}
                                        </div>
                                        <button onClick={() => setStep(2)} className="w-1/2 btn-gradient rounded-xl font-bold text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-1">
                                            Next
                                        </button>
                                    </div>
                                );
                            }

                            return (
                                <button 
                                    key={idx} 
                                    onClick={() => setSelectedInterval(idx)}
                                    className="w-full border border-white/5 bg-[#111111] hover:border-primary hover:text-primary transition-all duration-300 py-3.5 rounded-xl text-center font-medium text-sm"
                                >
                                    {timeString}
                                </button>
                            );
                        })}
                        {intervals.length === 0 && timeslot && (
                            <div className="text-center text-[#9ca3af] py-10">No availability.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1;
