import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { createTimeslot } from '@/funcs/TimeslotFuncs';

interface TimeslotModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TimeslotModal: React.FC<TimeslotModalProps> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("21:00");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // Helper to evaluate error if start > end strictly using military time comparison
    const hasTimeError = () => {
        if (startTime && endTime) {
            return startTime >= endTime;
        }
        return false;
    }

    const handleConfirmTimeslot = async () => {
        if (!date) {
            toast.error("Please select a date for the timeslot");
            return;
        }
        setIsSubmitting(true);
        const response = await createTimeslot(date, startTime, endTime);
        setIsSubmitting(false);

        if (response.success) {
            toast.success("Timeslot created!");
            onClose();
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-2xl glass-card rounded-[16px] overflow-visible shadow-[0_0_80px_rgba(124,58,237,0.25)] relative border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter text-white">New Timeslot</h2>
                        <p className="text-[#a79db9] text-sm mt-1">Configure your session parameters below</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-8 space-y-8">
                    <div className="relative">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">Timeslot Date</label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger className="w-full h-14 glass-card px-5 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.1)] group cursor-pointer text-left">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    <span className="text-white font-medium">
                                        {date ? format(date, "MMMM d, yyyy") : "Pick a date"}
                                    </span>
                                </span>
                                <span className="material-symbols-outlined text-[#a79db9] transition-transform group-hover:rotate-180">expand_more</span>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[200] border-[#2e2839] bg-[#1e1b24] text-white" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => { setDate(d); setIsCalendarOpen(false); }}
                                    className="rounded-lg border"
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="space-y-3 relative">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Start Time</label>
                            <label className="w-full h-14 glass-card px-5 rounded-xl flex items-center gap-3 border border-white/5 hover:bg-white/5 transition-all text-white focus-within:ring-2 focus-within:ring-blue-500/50 cursor-text">
                                <span className="material-symbols-outlined text-blue-400 select-none">schedule</span>
                                <input 
                                    type="time" 
                                    value={startTime} 
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="bg-transparent text-white font-medium border-none focus:outline-none w-full appearance-none [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </label>
                        </div>
                        <div className="space-y-3 relative">
                            <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${hasTimeError() ? 'text-red-400' : 'text-gray-500'}`}>End Time</label>
                            <label className={`w-full h-14 glass-card px-5 rounded-xl flex items-center gap-3 border ${hasTimeError() ? 'border-red-500/50 bg-red-500/10 focus-within:ring-red-500/50' : 'border-white/5 hover:bg-white/5 focus-within:ring-primary/50'} transition-all text-white focus-within:ring-2 cursor-text`}>
                                <span className="material-symbols-outlined select-none text-[#a79db9]">history</span>
                                <input 
                                    type="time" 
                                    value={endTime} 
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="bg-transparent text-white font-medium border-none focus:outline-none w-full appearance-none [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </label>
                            {hasTimeError() && (
                                <p className="text-red-400 text-xs font-medium mt-1 absolute -bottom-6 right-0">End time must be after start time.</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            disabled={hasTimeError() || isSubmitting}
                            onClick={handleConfirmTimeslot}
                            className="w-full h-16 bg-linear-to-r from-primary to-blue-500 rounded-xl font-body font-black text-xl tracking-tight text-white shadow-[0_10px_40px_rgba(124,58,237,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:saturate-50 transition-all flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Timeslot"}
                            {!isSubmitting && <span className="material-symbols-outlined">arrow_forward</span>}
                        </button>
                    </div>
                </div>

                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-violet-600/20 blur-[60px] rounded-full pointer-events-none"></div>
            </div>
        </div>
    );
};

export default TimeslotModal;
