import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import DashboardWeeklyOutlook from "../components/DashboardWeeklyOutlook";
import DashboardRecentActivity from "../components/DashboardRecentActivity";
import TimeslotModal from "../components/TimeslotModal";

export interface Timeslot {
    ID: number;
    Start: string;
    End: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
    const [userName, setUserName] = useState<string>("Loading...");
    const [Timeslots, setTimeslots] = useState<Timeslot[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/`, { withCredentials: true });
                if (userRes.data?.data?.Name) {
                    setUserName(userRes.data.data.Name);
                }
            } catch (err) {
                console.error("Failed to fetch user, redirecting:", err);
                navigate("/");
                return; // Stop fetching Timeslots if user is unauthorized
            }

            try {
                const TimeslotRes = await axios.get(`${import.meta.env.VITE_BACKEND_Timeslot}/`, { withCredentials: true });
                if (TimeslotRes.data?.Timeslots) {
                    setTimeslots(TimeslotRes.data.Timeslots);
                }
            } catch (err) {
                console.error("Failed to fetch Timeslots:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-[#E5E7EB] font-body antialiased selection:bg-primary selection:text-white">
                <DashboardSidebar userName={userName} onNewTimeslot={() => setIsTimeslotModalOpen(true)} />

            <main className="flex flex-1 flex-col overflow-hidden bg-background-light dark:bg-background-dark relative">
                
                {/* Abstract Background Glows */}
                <div className="pointer-events-none absolute top-[-20%] left-[20%] h-125 w-125 rounded-full bg-primary/5 blur-[120px]"></div>
                <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-100 w-100 rounded-full bg-blue-600/5 blur-[100px]"></div>

                <DashboardHeader userName={userName} />

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-0">
                    <div className="mx-auto flex max-w-7xl flex-col gap-8">
                        
                        <DashboardStats TimeslotsCount={Timeslots.length} />

                        {/* Main Dashboard Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <DashboardWeeklyOutlook Timeslots={Timeslots} />
                            <DashboardRecentActivity />
                        </div>

                        {/* Bottom Promo / Upgrade Banner */}
                        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-900 to-purple-900 p-8 shadow-2xl">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Unlock Advanced Analytics</h3>
                                    <p className="text-indigo-200 max-w-lg">Get deeper insights into your scheduling efficiency and client retention with the Professional plan.</p>
                                </div>
                                <button className="whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-900 hover:bg-indigo-50 transition-colors shadow-lg">
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            </div>
            
            <TimeslotModal isOpen={isTimeslotModalOpen} onClose={() => setIsTimeslotModalOpen(false)} />
        </>
    );
};

export default Dashboard;
