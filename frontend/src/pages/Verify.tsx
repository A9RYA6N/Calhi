import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verifyBooking = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setStatus('error');
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_BOOKING}/verify?token=${token}`, {
                    withCredentials: true
                });

                if (res.status === 200) {
                    setStatus('success');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                } else {
                    setStatus('error');
                }
            } catch (err) {
                console.error("Verification failed:", err);
                setStatus('error');
            }
        };

        verifyBooking();
    }, [searchParams, navigate]);

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center relative overflow-hidden font-body">
            {/* Grid and Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-40 -left-40 bg-primary/10 blur-[120px]"></div>

            <div className="relative z-10 glass-card bg-[#111111]/80 border border-white/10 rounded-2xl p-10 text-center max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-4">refresh</span>
                        <h2 className="font-headline text-2xl font-bold mb-2">Verifying Booking...</h2>
                        <p className="text-[#9ca3af]">Please wait while we confirm your appointment.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                        </div>
                        <h2 className="font-headline text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                        <p className="text-[#9ca3af] mb-6">Your appointment has been successfully scheduled.</p>
                        <p className="text-xs text-[#9ca3af]/50 uppercase tracking-widest font-bold">Redirecting to Dashboard...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl">error</span>
                        </div>
                        <h2 className="font-headline text-2xl font-bold text-white mb-2">Verification Failed</h2>
                        <p className="text-[#9ca3af] mb-6">We couldn't verify this booking. The link may be invalid or expired.</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-gradient px-6 py-2.5 rounded-lg font-bold text-sm"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Verify;
