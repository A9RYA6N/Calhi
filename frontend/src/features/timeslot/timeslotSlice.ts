import { createSlice } from '@reduxjs/toolkit';
import { fetchTimeslots } from './timeslotThunks';
import type { Timeslot } from '@/types/timeslot';
import { logout } from '../auth/authSlice';

interface TimeslotState {
    timeslots: Timeslot[];
    loading: boolean;
    error: string | null;
}

const initialState: TimeslotState = {
    timeslots: [],
    loading: false,
    error: null,
};

const timeslotSlice = createSlice({
    name: 'timeslot',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeslots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTimeslots.fulfilled, (state, action) => {
                state.loading = false;
                state.timeslots = action.payload || [];
            })
            .addCase(fetchTimeslots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout, (state) => {
                state.timeslots = [];
                state.error = null;
                state.loading = false;
            });
    },
});

export default timeslotSlice.reducer;
