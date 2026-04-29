import axios from 'axios';
import toast from 'react-hot-toast';

interface ScheduleEventParams {
    selectedInterval: number | null;
    intervals: any[];
    timeslot: any;
    guestName: string;
    guestEmail: string;
    hasAuthCookie: boolean;
    setGuestName: (val: string) => void;
    setGuestEmail: (val: string) => void;
    setStep: (step: number) => void;
    onSuccess?: () => void;
}

export const handleScheduleEvent = async ({
    selectedInterval,
    intervals,
    timeslot,
    guestName,
    guestEmail,
    hasAuthCookie,
    setGuestName,
    setGuestEmail,
    setStep,
    onSuccess
}: ScheduleEventParams) => {
    if (selectedInterval === null) return;
    
    try {
        const interval = intervals[selectedInterval];
        const data = {
            TimeslotID: timeslot.ID,
            Name: guestName,
            Email: guestEmail,
            Start: interval.start.toISOString(),
            End: interval.end.toISOString()
        };
        
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_BOOKING}/create`, data, {
            withCredentials: true
        });
        
        if (res.status === 201 || res.status === 200) {
            if (hasAuthCookie) {
                toast.success("Booking submitted successfully!", {
                    duration: 5000,
                    style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                });
            } else {
                toast.success("Booking submitted successfully! An email has been sent with a verification link.", {
                    duration: 5000,
                    style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                });
            }
            setGuestName('');
            setGuestEmail('');
            setStep(1);
            if (onSuccess) onSuccess();
        }
    } catch (err) {
        console.error("Error creating booking:", err);
        toast.error("Failed to schedule event. Please try again.", {
            style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        });
    }
};
