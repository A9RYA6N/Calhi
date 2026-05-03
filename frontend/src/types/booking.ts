export interface Booking {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    TimeslotID: number;
    ClientName: string;
    ClientEmail: string;
    StartsAt: string;
    EndsAt: string;
    Status: string;
    Token?: string;
    IdempotencyKey?: string;
    Timeslot?: any; // To allow nesting if the backend populates it
}
