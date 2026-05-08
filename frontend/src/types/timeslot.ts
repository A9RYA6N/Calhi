export interface Timeslot {
    ID: number;
    StartsAt: string;
    EndsAt: string;
    Timezone?: string;
    EventName?: string;
    Duration?: number;
    Bookings?: any[];
    IsRecurring?: boolean;
    RecurringDays?: string[];
    Until?: string;
}