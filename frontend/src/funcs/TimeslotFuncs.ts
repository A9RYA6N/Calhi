import axios from "axios";

export const createTimeslot = async (date: Date, startTime: string, endTime: string): Promise<{ success: boolean; message: string }> => {
    try {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDateTime = new Date(date);
        startDateTime.setHours(startHours, startMinutes, 0, 0);

        const endDateTime = new Date(date);
        endDateTime.setHours(endHours, endMinutes, 0, 0);

        const apiObj = {
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString()
        };

        await axios({
            method: "POST",
            url: `${import.meta.env.VITE_BACKEND_Timeslot}/create`,
            data: apiObj,
            withCredentials: true,
        });
        return { success: true, message: "Timeslot created successfully" };
    } catch (err: any) {
        return { 
            success: false, 
            message: err.response?.data?.message || 'Timeslot failed to create. Please try again.' 
        };
    }
};