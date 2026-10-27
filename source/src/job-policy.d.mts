type BalanceJob = {totalMinutes: number; usedMinutes: number; enabled: number | boolean; closed?: number | boolean};
export function remainingMinutes(job: BalanceJob): number;
export function isBookable(job: BalanceJob): boolean;
export function isLowBalance(job: BalanceJob): boolean;
