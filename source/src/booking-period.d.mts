export function taipeiDate(timestamp?: number): string;
export function taipeiTimestamp(timestamp: number): string;
export function mondayOfWeek(value: string): string;
export function endOfPeriod(start: string, weeks?: number): string;
export function parseBookingPeriod(start?: unknown, end?: unknown): {periodStart: string | null; periodEnd: string | null};
