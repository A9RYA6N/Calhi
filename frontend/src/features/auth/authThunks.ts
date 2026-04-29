import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/`, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user');
        }
    }
);
