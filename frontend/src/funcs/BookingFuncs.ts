import axios from 'axios';
import toast from 'react-hot-toast';

interface ScheduleEventParams {
    selectedInterval: number | null;
    intervals: any[];
    timeslot: any;
    guestName: string;
    guestEmail: string;
    hasAuthCookie: boolean;
    idempotencyKey: string;       // generated once per attempt in Booking.tsx
    setGuestName: (val: string) => void;
    setGuestEmail: (val: string) => void;
    setStep: (step: number) => void;
    onSuccess?: () => void;
}

export interface CreateBookingPayload {
    TimeslotID: number;
    Name: string;
    Email: string;
    StartsAt: string;
    EndsAt: string;
    IdempotencyKey: string;
}

export const handleScheduleEvent = async ({
    selectedInterval,
    intervals,
    timeslot,
    guestName,
    guestEmail,
    hasAuthCookie,
    idempotencyKey,
    setGuestName,
    setGuestEmail,
    setStep,
    onSuccess
}: ScheduleEventParams) => {
    if (selectedInterval === null) return;

    try {
        const interval = intervals[selectedInterval];

        const payload: CreateBookingPayload = {
            TimeslotID: timeslot.ID,
            Name: guestName,
            Email: guestEmail,
            StartsAt: interval.start.toISOString(),
            EndsAt: interval.end.toISOString(),
            IdempotencyKey: idempotencyKey,
        };

        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_BOOKING}/create`,
            payload,
            { withCredentials: true }
        );

        if (res.status === 201 || res.status === 200) {
            const toastMsg = hasAuthCookie
                ? 'Booking submitted successfully!'
                : 'Booking submitted successfully! An email has been sent with a verification link.';

            toast.success(toastMsg, {
                duration: 5000,
                style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
            });

            setGuestName('');
            setGuestEmail('');
            setStep(1);
            if (onSuccess) onSuccess();
        }
    } catch (err) {
        console.error('Error creating booking:', err);
        toast.error('Failed to schedule event. Please try again.', {
            style: { background: '#111111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        });
        // Key is NOT reset here — caller keeps the same key for safe retries
    }
};
