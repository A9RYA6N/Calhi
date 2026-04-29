import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUser } from '../features/auth/authThunks';
import { fetchTimeslots } from '../features/timeslot/timeslotThunks';
import { fetchBookings } from '../features/booking/bookingThunks';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(fetchTimeslots());
            dispatch(fetchBookings());
        }
    }, [isAuthenticated, user, dispatch]);

    // Show a loading screen while the initial user fetch is happening
    // Alternatively, just return children if we want the rest of the app to decide how to handle loading.
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return <>{children}</>;
};
