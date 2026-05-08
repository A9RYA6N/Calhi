import GenFooter from "@/components/GenFooter";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const getBaseSlug = (slug: string) => {
    if (!slug) return '';
    const parts = slug.split('-');
    if (parts.length < 2) return slug;
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) {
        return parts.slice(0, -1).join('-');
    }
    return slug;
};

const PublicProfile = () => {
    const { username } = useParams();
    const [timeslots, setTimeslots] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hostName, setHostName] = useState<string>('');

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_TIMESLOT}/${username}`);
                if (res.data?.data) {
                    const allSlots = res.data.data;
                    const grouped = new Map<string, any>();

                    allSlots.forEach((slot: any) => {
                        const baseSlug = getBaseSlug(slot.Slug || slot.ID.toString());
                        if (!grouped.has(baseSlug)) {
                            // Also optionally count occurrences if we wanted to show a badge, but for now just store the first one
                            grouped.set(baseSlug, { ...slot, _baseSlug: baseSlug });
                        }
                    });

                    setTimeslots(Array.from(grouped.values()));
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
                console.error("Failed to fetch public profile timeslots:", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (username) fetchPublicData();
    }, [username]);

    return (
        <div className="bg-[#0f0f0f] text-white font-body min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/30 selection:text-white">


            {/* Main Content Canvas */}
            <main className="flex-grow flex items-center justify-center p-4 md:p-8 z-10 relative py-24">
        <div className="w-full max-w-[720px] bg-[#111111] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                    {/* Top Section */}
                    <div className="relative p-10 md:p-14 flex flex-col items-center text-center border-b border-white/5">
                        <h1 className="font-headline text-4xl md:text-[2.25rem] font-black tracking-[-0.02em] text-white mb-4 relative z-10 capitalize">
                            {username}'s Profile
                        </h1>
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-[#0a0a0a]/80 p-6 md:p-10 flex flex-col gap-4">
                        {isLoading ? (
                            <div className="text-center text-[#9ca3af] py-10">Loading availability...</div>
                        ) : timeslots.length > 0 ? (
                            timeslots.map((slot: any) => (
                            <Link key={slot.ID} to={`/${username}/${slot._baseSlug || slot.Slug || slot.ID}`} state={{ timeslot: slot, hostName }} className="group relative block bg-[#171717] border border-white/5 rounded-xl p-6 overflow-hidden">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex-1 pr-6">
                                            <h2 className="font-headline text-[1.5rem] font-bold text-white mb-2">{slot.EventName || "Timeslot Session"}</h2>
                                            <div className="flex flex-wrap items-center text-[11px] font-label text-[#9ca3af] uppercase tracking-[0.15em] font-bold gap-3">
                                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span> {slot.Duration || 30} min</span>
                                                <span className="text-white/10 text-sm">|</span>
                                                <span className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[14px]">event</span>
                                                    {slot.StartsAt && slot.EndsAt ? (
                                                        `${format(new Date(slot.StartsAt), "MMM d, h:mm a")} - ${format(new Date(slot.EndsAt), "h:mm a")}`
                                                    ) : "TBD"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/5 bg-[#222] flex items-center justify-center text-[#9ca3af] shadow-sm">
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center text-[#9ca3af] py-10">No available timeslots found.</div>
                        )}
                    </div>
                </div>
            </main>
            <GenFooter />
        </div>
    );
};

export default PublicProfile;
