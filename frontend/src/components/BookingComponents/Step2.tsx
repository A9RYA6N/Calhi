interface Step2Props {
    hasAuthCookie: boolean;
    guestName: string;
    setGuestName: (val: string) => void;
    guestEmail: string;
    setGuestEmail: (val: string) => void;
    setStep: (step: number) => void;
    handleScheduleEvent: (e?: React.FormEvent) => void;
}

const Step2 = ({ 
    hasAuthCookie, 
    guestName, 
    setGuestName, 
    guestEmail, 
    setGuestEmail, 
    setStep,
    handleScheduleEvent
}: Step2Props) => {
    return (
        <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#171717]/30 transition-all animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="font-headline font-bold text-2xl text-white mb-8">
                {hasAuthCookie ? "Confirm Booking" : "Enter Details"}
            </h2>
            {hasAuthCookie ? (
                <div className="space-y-6">
                    <div className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-inner">
                        <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2 text-white">Continue scheduling?</h3>
                        <p className="text-[#9ca3af] mb-8 text-sm leading-relaxed">
                            You are already logged in. Do you want to schedule this event using your current account details?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => handleScheduleEvent()}
                                className="btn-gradient flex-1 px-8 py-3.5 rounded-xl text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg shadow-primary/20"
                            >
                                Yes, Schedule Event
                            </button>
                            <button 
                                onClick={() => setStep(1)}
                                className="flex-1 px-8 py-3.5 rounded-xl text-white font-bold text-base border border-white/10 hover:bg-white/5 transition-colors bg-[#0a0a0a]"
                            >
                                No, Go Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleScheduleEvent}>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label text-sm font-semibold text-white" htmlFor="name">Name *</label>
                            <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="name" placeholder="Jane Doe" required type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label text-sm font-semibold text-white" htmlFor="email">Email *</label>
                            <input className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" id="email" placeholder="jane@example.com" required type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                        </div>
                        <div>
                            <button className="text-secondary hover:text-primary transition-colors flex items-center gap-2 font-medium text-sm px-2 py-1 -ml-2 rounded-md hover:bg-white/5" type="button">
                                <span className="material-symbols-outlined text-sm">person_add</span>
                                Add Guests
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-4">
                        <label className="font-label text-sm font-semibold text-white opacity-50" htmlFor="notes">Please share anything that will help prepare for our meeting</label>
                        <textarea disabled className="w-full bg-[#171717] border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-[#9ca3af]/30 focus:outline-none transition-all shadow-inner resize-none opacity-50 cursor-not-allowed" id="notes" placeholder="Notes currently disabled..." rows={4}></textarea>
                    </div>
                    <div className="pt-6">
                        <button className="btn-gradient w-full md:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-base hover:scale-[1.02] transition-transform active:scale-[0.98]" type="submit">
                            Schedule Event
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Step2;
