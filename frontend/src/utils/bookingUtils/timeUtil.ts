export const getIntervals = (timeslot: any) => {
    if (!timeslot || !timeslot.StartsAt || !timeslot.EndsAt || !timeslot.Duration) return [];
    const start = new Date(timeslot.StartsAt);
    const end = new Date(timeslot.EndsAt);
    const duration = timeslot.Duration;

    const confirmedBookings = (timeslot.Bookings || []).filter((b: any) => b.Status !== 'pending');

    const intervals = [];
    let current = new Date(start);
    while (current < end) {
        const next = new Date(current.getTime() + duration * 60000);
        if (next <= end) {
            const isBooked = confirmedBookings.some((booking: any) => {
                const bStart = new Date(booking.StartsAt);
                const bEnd = new Date(booking.EndsAt);
                return current >= bStart && current < bEnd;
            });
            
            if (!isBooked) {
                intervals.push({ start: current, end: next });
            }
        }
        current = next;
    }
    return intervals;
};

export const formatDuration = (mins: number) => {
    if (!mins) return '';
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    const remaining = mins % 60;
    let str = `${hrs} hr${hrs > 1 ? 's' : ''}`;
    if (remaining > 0) str += ` ${remaining} min`;
    return str;
};
