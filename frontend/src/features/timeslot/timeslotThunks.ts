import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Timeslot } from '@/types/timeslot';

export const fetchTimeslots = createAsyncThunk(
    'timeslot/fetchTimeslots',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_TIMESLOT}/`, {
                withCredentials: true,
            });
            return response.data.data as Timeslot[];
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch timeslots');
        }
    }
);
