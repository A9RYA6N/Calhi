import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import timeslotReducer from '../features/timeslot/timeslotSlice';
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        timeslot: timeslotReducer,
        booking: bookingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
