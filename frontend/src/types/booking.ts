export interface Booking {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    TimeslotID: number;
    ClientName: string;
    ClientEmail: string;
    Start: string;
    End: string;
    Status: string;
    Token?: string;
    Timeslot?: any; // To allow nesting if the backend populates it
}
