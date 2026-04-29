import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import axios from 'axios';
import { getIntervals } from '../utils/bookingUtils/timeUtil';
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

    const [timeslot, setTimeslot] = useState<any>(state?.timeslot || null);
    const [selectedInterval, setSelectedInterval] = useState<number | null>(null);
    const [hostName, setHostName] = useState<string>(state?.hostName || '');

    const user = useAppSelector(state => state.auth.user);

    const guestNameInit = user?.Name || '';
    const guestEmailInit = user?.Email || '';
    const [guestName, setGuestName] = useState(guestNameInit);
    const [guestEmail, setGuestEmail] = useState(guestEmailInit);
    const hasAuthCookie = !!user;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            setGuestName(user.Name || '');
            setGuestEmail(user.Email || '');
        }
    }, [user]);

    useEffect(() => {
        if (state?.timeslot && state?.hostName) return;

        const fetchTimeslot = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_TIMESLOT}/${username}`);
                if (res.data?.data) {
                    const found = res.data.data.find((s: any) => s.ID.toString() === slug || s.Slug === slug);
                    if (found) setTimeslot(found);
                }

                try {
                    const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/${username}`);
                    if (userRes.data?.data?.Name) {
                        setHostName(userRes.data.data.Name);
                    } else {
                        setHostName(username || '');
                    }
                } catch (e) {
                    setHostName(username || '');
                }
            } catch (err) {
                console.error("Error fetching booking data:", err);
                if (!hostName) setHostName(username || '');
            }
        };
        fetchTimeslot();
    }, [username, slug, state]);

    const intervals = getIntervals(timeslot);

    const handleScheduleEvent = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        await handleScheduleEventFn({
            selectedInterval,
            intervals,
            timeslot,
            guestName,
            guestEmail,
            hasAuthCookie,
            setGuestName,
            setGuestEmail,
            setStep,
            onSuccess: () => {
                if (hasAuthCookie) {
                    dispatch(fetchBookings());
                    dispatch(fetchTimeslots());
                }
            }
        });
    };

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center relative overflow-hidden antialiased font-body">
            {/* Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            {/* Glow Layer */}
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-40 -left-40 bg-primary/10 blur-[120px]"></div>
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -bottom-40 -right-40 bg-blue-600/10 blur-[120px]"></div>

            <main className="relative z-10 w-full max-w-5xl px-6 py-12">
                <div className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[600px] bg-[#111111]/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                    <BookingSidebar
                        step={step}
                        username={username}
                        hostName={hostName}
                        timeslot={timeslot}
                        selectedInterval={selectedInterval}
                        intervals={intervals}
                        setStep={setStep}
                    />

                    {/* Right Side: Dynamic Router */}
                    {step === 1 && (
                        <Step1
                            timeslot={timeslot}
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
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Booking;
