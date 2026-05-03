import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { getIntervals } from '../utils/bookingUtils/timeUtil';
import type { Timeslot } from '../types/timeslot';
import Step1 from '../components/BookingComponents/Step1';
import Step2 from '../components/BookingComponents/Step2';
import BookingSidebar from '../components/BookingComponents/BookingSidebar';
import { handleScheduleEvent as handleScheduleEventFn } from '../funcs/BookingFuncs';
import { fetchBookings } from '../features/booking/bookingThunks';
import { fetchTimeslots } from '../features/timeslot/timeslotThunks';

const Booking = () => {
    const [step, setStep] = useState(1);
    const { username, slug } = useParams();
    const location = useLocation();
    const state = location.state as any;

    // ── Multi-occurrence state ────────────────────────────────────────────────
    const [timeslots, setTimeslots] = useState<Timeslot[]>(
        state?.timeslot ? [state.timeslot] : []
    );
    const [isLoading, setIsLoading] = useState(false);

    // The specific occurrence the user has selected (one of the timeslots[])
    const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(
        state?.timeslot ?? null
    );

    // Time interval index within the selected slot
    const [selectedInterval, setSelectedInterval] = useState<number | null>(null);

    const [hostName, setHostName] = useState<string>(state?.hostName || '');
    // ─────────────────────────────────────────────────────────────────────────

    const user = useAppSelector(state => state.auth.user);
    const guestNameInit = user?.Name || '';
    const guestEmailInit = user?.Email || '';
    const [guestName, setGuestName] = useState(guestNameInit);
    const [guestEmail, setGuestEmail] = useState(guestEmailInit);
    const hasAuthCookie = !!user;
    const dispatch = useAppDispatch();

    // ── Idempotency key ──────────────────────────────────────────────────────
    // useRef keeps the same UUID across re-renders without triggering a render itself.
    // Generated ONCE per booking attempt; reused on any retry so the backend
    // can de-duplicate. Reset to a fresh UUID only after a successful submission.
    const idempotencyKeyRef = useRef<string>(uuidv4());

    // In-flight guard — disables submit buttons while the request is pending
    const [isSubmitting, setIsSubmitting] = useState(false);
    // ────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (user) {
            setGuestName(user.Name || '');
            setGuestEmail(user.Email || '');
        }
    }, [user]);

    // Fetch all occurrences for this slug from the new slug-specific endpoint.
    // If router state already has the single timeslot (from PublicProfile link)
    // we still fetch the full series so recurring siblings are shown.
    useEffect(() => {
        const fetchSeries = async () => {
            setIsLoading(true);
            try {
                // Use the dedicated slug endpoint — returns Timeslot[]
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_TIMESLOT}/${username}/${slug}`
                );
                const data: Timeslot[] = res.data?.data ?? [];
                setTimeslots(data);

                // Auto-select if only one occurrence (single event)
                if (data.length === 1) {
                    setSelectedSlot(data[0]);
                } else if (data.length > 1 && !selectedSlot) {
                    // Multi-occurrence: don't auto-select, let user pick
                    setSelectedSlot(null);
                }
            } catch (err) {
                console.error('Error fetching timeslot series:', err);
            } finally {
                setIsLoading(false);
            }

            // Fetch host display name separately
            try {
                const userRes = await axios.get(
                    `${import.meta.env.VITE_BACKEND_USER}/${username}`
                );
                setHostName(userRes.data?.data?.Name || username || '');
            } catch {
                setHostName(username || '');
            }
        };

        if (username && slug) fetchSeries();
    }, [username, slug]);

    // When user selects a different occurrence, clear time interval
    const handleSelectSlot = (slot: Timeslot) => {
        setSelectedSlot(slot);
        setSelectedInterval(null);
    };

    // Intervals for the currently selected slot
    const intervals = getIntervals(selectedSlot);

    const handleScheduleEvent = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isSubmitting || !selectedSlot) return;

        setIsSubmitting(true);
        try {
            await handleScheduleEventFn({
                selectedInterval,
                intervals,
                timeslot: selectedSlot,          // use the selected occurrence
                guestName,
                guestEmail,
                hasAuthCookie,
                idempotencyKey: idempotencyKeyRef.current,
                setGuestName,
                setGuestEmail,
                setStep,
                onSuccess: () => {
                    // Rotate to a fresh key so the NEXT booking is distinct
                    idempotencyKeyRef.current = uuidv4();
                    if (hasAuthCookie) {
                        dispatch(fetchBookings());
                        dispatch(fetchTimeslots());
                    }
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center relative overflow-hidden antialiased font-body">
            {/* Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* Glow Layer */}
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-40 -left-40 bg-primary/10 blur-[120px]" />
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -bottom-40 -right-40 bg-blue-600/10 blur-[120px]" />

            <main className="relative z-10 w-full max-w-5xl px-6 py-12">
                <div className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[600px] bg-[#111111]/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                    <BookingSidebar
                        step={step}
                        username={username}
                        hostName={hostName}
                        timeslot={selectedSlot ?? timeslots[0] ?? null}
                        selectedInterval={selectedInterval}
                        intervals={intervals}
                        setStep={setStep}
                    />

                    {/* Right Side: Dynamic Router */}
                    {step === 1 && (
                        <Step1
                            timeslots={timeslots}
                            isLoading={isLoading}
                            selectedSlot={selectedSlot}
                            onSelectSlot={handleSelectSlot}
                            intervals={intervals}
                            selectedInterval={selectedInterval}
                            setSelectedInterval={setSelectedInterval}
                            setStep={setStep}
                        />
                    )}

                    {step === 2 && (
                        <Step2
                            hasAuthCookie={hasAuthCookie}
                            guestName={guestName}
                            setGuestName={setGuestName}
                            guestEmail={guestEmail}
                            setGuestEmail={setGuestEmail}
                            setStep={setStep}
                            handleScheduleEvent={handleScheduleEvent}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Booking;
