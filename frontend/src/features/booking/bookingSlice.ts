import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Booking } from '@/types/booking';
import { fetchBookings } from './bookingThunks';
import { logout } from '../auth/authSlice';

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        clearBookingsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.loading = false;
                state.bookings = action.payload || [];
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout, (state) => {
                state.bookings = [];
                state.error = null;
                state.loading = false;
            });
    },
});

export const { clearBookingsError } = bookingSlice.actions;
export default bookingSlice.reducer;
