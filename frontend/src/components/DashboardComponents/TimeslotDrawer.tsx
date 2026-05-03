import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInCalendarDays } from "date-fns";
import toast from "react-hot-toast";
import { createTimeslot } from '@/funcs/TimeslotFuncs';
import { useAppDispatch } from '@/store/hooks';
import { fetchTimeslots } from '@/features/timeslot/timeslotThunks';

// Day abbreviations — values must match backend expectations exactly
const DAYS_OF_WEEK = [
    { label: 'Mon', value: 'MON' },
    { label: 'Tue', value: 'TUE' },
    { label: 'Wed', value: 'WED' },
    { label: 'Thu', value: 'THU' },
    { label: 'Fri', value: 'FRI' },
    { label: 'Sat', value: 'SAT' },
    { label: 'Sun', value: 'SUN' },
];

interface TimeslotDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const TimeslotDrawer: React.FC<TimeslotDrawerProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();

    // ── Core fields ─────────────────────────────────────────────────────────
    const [date, setDate]           = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime]     = useState("21:00");
    const [eventName, setEventName] = useState("");
    const [duration, setDuration]   = useState("30");

    // ── Calendar popover states ──────────────────────────────────────────────
    const [isCalendarOpen, setIsCalendarOpen]   = useState(false);
    const [isUntilCalendarOpen, setIsUntilCalendarOpen] = useState(false);

    // ── Recurring fields ─────────────────────────────────────────────────────
    const [isRecurring, setIsRecurring]     = useState(false);
    const [recurringDays, setRecurringDays] = useState<string[]>([]);
    const [untilDate, setUntilDate]         = useState<Date | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const hasTimeError = () => startTime && endTime ? startTime >= endTime : false;

    const toggleDay = (day: string) => {
        setRecurringDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const resetForm = () => {
        setEventName("");
        setDate(new Date());
        setStartTime("09:00");
        setEndTime("21:00");
        setDuration("30");
        setIsRecurring(false);
        setRecurringDays([]);
        setUntilDate(null);
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleConfirmTimeslot = async () => {
        if (!date) { toast.error("Please select a date"); return; }
        if (hasTimeError()) { toast.error("End time must be after start time"); return; }

        // Recurring-specific validation
        if (isRecurring) {
            if (recurringDays.length === 0) {
                toast.error("Select at least one recurring day");
                return;
            }
            if (!untilDate) {
                toast.error("Select an end date for the recurring schedule");
                return;
            }
            const daysDiff = differenceInCalendarDays(untilDate, date);
            if (daysDiff <= 0) {
                toast.error("Until date must be after the start date");
                return;
            }
            if (daysDiff > 60) {
                toast.error("Recurring availability cannot exceed 60 days");
                return;
            }
        }

        setIsSubmitting(true);
        const response = await createTimeslot(
            date,
            startTime,
            endTime,
            eventName,
            parseInt(duration, 10),
            isRecurring,
            recurringDays,
            untilDate,
        );
        setIsSubmitting(false);

        if (response.success) {
            toast.success(isRecurring ? "Recurring timeslots created!" : "Timeslot created!");
            dispatch(fetchTimeslots());
            resetForm();
            onClose();
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <aside
                className={`fixed right-0 top-0 h-screen w-[400px] z-50 flex flex-col bg-[#0f0f0f] border-l border-white/5 shadow-[-20px_0_60px_rgba(124,58,237,0.12)] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-white text-xl font-bold tracking-tight">Create Slot</h3>
                        <p className="text-[#9ca3af] text-xs mt-0.5">Configure your availability window</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-white/10 transition-all"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form body — scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                    {/* Event Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Event Name</label>
                        <label className="w-full h-12 bg-[#171717] border border-white/5 rounded-xl flex items-center gap-3 px-4 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all cursor-text">
                            <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">edit</span>
                            <input
                                type="text"
                                placeholder="e.g. Office Hours"
                                value={eventName}
                                onChange={e => setEventName(e.target.value)}
                                className="bg-transparent text-white text-sm font-medium border-none focus:outline-none w-full placeholder-[#9ca3af]/50"
                            />
                        </label>
                    </div>

                    {/* Date picker */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">
                            {isRecurring ? "First Occurrence" : "Date"}
                        </label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger className="w-full h-12 bg-[#171717] border border-white/5 rounded-xl flex items-center justify-between px-4 hover:border-primary/30 transition-all cursor-pointer text-left">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">calendar_today</span>
                                    <span className="text-white text-sm font-medium">{date ? format(date, "MMM d, yyyy") : "Pick a date"}</span>
                                </span>
                                <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">expand_more</span>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[200] border-[#2e2839] bg-[#1e1b24] text-white" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={d => { setDate(d); setIsCalendarOpen(false); }}
                                    className="rounded-lg border"
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Start / End time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">Start Time</label>
                            <label className="w-full h-12 bg-[#171717] border border-white/5 rounded-xl flex items-center gap-3 px-3 focus-within:border-primary/50 transition-all cursor-text">
                                <span className="material-symbols-outlined text-blue-400 text-[18px]">schedule</span>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    className="bg-transparent text-white text-sm border-none focus:outline-none w-full [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${hasTimeError() ? 'text-red-400' : 'text-[#9ca3af]'}`}>End Time</label>
                            <label className={`w-full h-12 bg-[#171717] border rounded-xl flex items-center gap-3 px-3 transition-all cursor-text ${hasTimeError() ? 'border-red-500/50' : 'border-white/5 focus-within:border-primary/50'}`}>
                                <span className="material-symbols-outlined text-[#9ca3af] text-[18px]">history</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                    className="bg-transparent text-white text-sm border-none focus:outline-none w-full [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">Duration per booking</label>
                        <label className="w-full h-12 bg-[#171717] border border-white/5 rounded-xl flex items-center gap-3 px-4 focus-within:border-primary/50 transition-all cursor-pointer relative">
                            <span className="material-symbols-outlined text-violet-400 text-[20px]">hourglass_empty</span>
                            <select
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                                className="bg-transparent text-white text-sm border-none focus:outline-none w-full appearance-none cursor-pointer pr-6"
                            >
                                <option value="15" className="bg-[#1e1b24]">15 minutes</option>
                                <option value="30" className="bg-[#1e1b24]">30 minutes</option>
                                <option value="60" className="bg-[#1e1b24]">1 hour</option>
                                <option value="120" className="bg-[#1e1b24]">2 hours</option>
                            </select>
                            <span className="material-symbols-outlined text-[#9ca3af] text-[18px] pointer-events-none absolute right-4">expand_more</span>
                        </label>
                    </div>

                    {/* ── Recurring Toggle ──────────────────────────────────────── */}
                    <div className="space-y-4">
                        {/* Toggle row */}
                        <div
                            className="flex items-center justify-between p-4 rounded-xl bg-[#171717] border border-white/5 cursor-pointer hover:border-primary/30 transition-all"
                            onClick={() => setIsRecurring(prev => !prev)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg transition-colors ${isRecurring ? 'bg-primary/20 text-primary' : 'bg-white/5 text-[#9ca3af]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">repeat</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Recurring Availability</p>
                                    <p className="text-xs text-[#9ca3af]">Repeat this schedule on selected days</p>
                                </div>
                            </div>
                            {/* Toggle pill */}
                            <div className={`w-10 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${isRecurring ? 'bg-primary' : 'bg-[#2e2839]'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isRecurring ? 'translate-x-5' : 'translate-x-1'}`} />
                            </div>
                        </div>

                        {/* Recurring sub-form (animated) */}
                        <div className={`overflow-hidden transition-all duration-300 ${isRecurring ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-5 pt-1">

                                {/* Day selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Repeat On</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {DAYS_OF_WEEK.map(day => {
                                            const selected = recurringDays.includes(day.value);
                                            return (
                                                <button
                                                    key={day.value}
                                                    type="button"
                                                    onClick={() => toggleDay(day.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all border ${
                                                        selected
                                                            ? 'bg-primary/20 border-primary text-primary'
                                                            : 'bg-[#171717] border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-white'
                                                    }`}
                                                >
                                                    {day.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Until date picker */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">Repeat Until</label>
                                    <Popover open={isUntilCalendarOpen} onOpenChange={setIsUntilCalendarOpen}>
                                        <PopoverTrigger className="w-full h-12 bg-[#171717] border border-white/5 rounded-xl flex items-center justify-between px-4 hover:border-primary/30 transition-all cursor-pointer text-left">
                                            <span className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">event</span>
                                                <span className={`text-sm font-medium ${untilDate ? 'text-white' : 'text-[#9ca3af]/50'}`}>
                                                    {untilDate ? format(untilDate, "MMM d, yyyy") : "Pick an end date"}
                                                </span>
                                            </span>
                                            <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">expand_more</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 z-[200] border-[#2e2839] bg-[#1e1b24] text-white" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={untilDate ?? undefined}
                                                onSelect={d => { setUntilDate(d ?? null); setIsUntilCalendarOpen(false); }}
                                                disabled={d => date ? d <= date : false}
                                                className="rounded-lg border"
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {/* 60-day warning */}
                                    {untilDate && date && differenceInCalendarDays(untilDate, date) > 60 && (
                                        <p className="text-red-400 text-xs font-medium">
                                            Recurring availability cannot exceed 60 days.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 shrink-0">
                    <button
                        disabled={hasTimeError() || isSubmitting}
                        onClick={handleConfirmTimeslot}
                        className="w-full h-12 rounded-xl btn-gradient text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none hover:scale-[1.01] active:scale-95 transition-transform shadow-lg shadow-primary/25"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isRecurring ? 'repeat' : 'check'}
                        </span>
                        {isSubmitting ? "Saving..." : isRecurring ? "Save Recurring Slots" : "Save Availability"}
                    </button>
                </div>

                {/* Ambient glow */}
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
            </aside>
        </>
    );
};

export default TimeslotDrawer;
