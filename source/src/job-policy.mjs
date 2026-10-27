export function remainingMinutes(job) {
  return job.totalMinutes - job.usedMinutes;
}
export function isBookable(job) {
  return Boolean(job.enabled) && !job.closed && remainingMinutes(job) > 0;
}
export function isLowBalance(job) {
  return isBookable(job) && remainingMinutes(job) <= 600;
}
