export interface Timeslot {
    ID: number;
    Start: string;
    End: string;
    EventName?: string;
    Duration?: number;
    Bookings?: any[];
}