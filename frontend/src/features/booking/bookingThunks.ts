import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Booking } from '@/types/booking';

export const fetchBookings = createAsyncThunk(
    'booking/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BOOKING}/`, {
                withCredentials: true,
            });
            return response.data.data as Booking[];
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
        }
    }
);
