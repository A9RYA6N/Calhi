import axios from "axios";
import { format } from "date-fns";

export interface CreateTimeslotPayload {
    startsat: string;
    endsat: string;
    timezone: string;
    eventname: string;
    duration: number;
    isrecurring: boolean;
    recurringdays?: string[];
    until?: string;            // "yyyy-MM-dd" — only present when isrecurring is true
}

export const createTimeslot = async (
    date: Date,
    startTime: string,
    endTime: string,
    eventName: string,
    duration: number,
    isRecurring: boolean = false,
    recurringDays: string[] = [],
    until: Date | null = null
): Promise<{ success: boolean; message: string }> => {
    try {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes]=endTime.split(':').map(Number);

        // Build local Date objects for start and end
        const startDateTime = new Date(date);
        startDateTime.setHours(startHours, startMinutes, 0, 0);

        const endDateTime = new Date(date);
        endDateTime.setHours(endHours, endMinutes, 0, 0);

        // Use date-fns format() — produces naive local datetime string,
        // e.g. "2026-05-01T10:00:00". No UTC offset appended.
        // DO NOT use .toISOString() which converts to UTC and appends 'Z'.
        const naiveStart = format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        const naiveEnd   = format(endDateTime,   "yyyy-MM-dd'T'HH:mm:ss");

        // Browser-reported IANA timezone, e.g. "Asia/Kolkata"
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const payload: CreateTimeslotPayload = {
            startsat:  naiveStart,
            endsat:    naiveEnd,
            timezone,
            eventname: eventName,
            duration,
            isrecurring: isRecurring,
            ...(isRecurring && recurringDays.length > 0 && { recurringdays: recurringDays }),
            ...(isRecurring && until && { until: format(until, "yyyy-MM-dd") }),
        };

        await axios({
            method: "POST",
            url: `${import.meta.env.VITE_BACKEND_TIMESLOT}/create`,
            data: payload,
            withCredentials: true,
        });
        return { success: true, message: "Timeslot created successfully" };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || 'Timeslot failed to create. Please try again.',
        };
    }
};