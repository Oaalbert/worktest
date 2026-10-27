const DAY = 86400000;

function dateValue(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(value + "T00:00:00Z");
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
}

export function taipeiDate(timestamp = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit"}).format(new Date(timestamp));
}

export function taipeiTimestamp(timestamp) {
  return new Intl.DateTimeFormat("zh-TW", {timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false}).format(new Date(timestamp));
}

// Calendar arithmetic uses UTC dates so device time zones and DST cannot shift a week.
export function mondayOfWeek(value) {
  const time = dateValue(value);
  if (!Number.isFinite(time)) return "";
  const offset = (new Date(time).getUTCDay() + 6) % 7;
  return new Date(time - offset * DAY).toISOString().slice(0, 10);
}

export function endOfPeriod(start, weeks = 1) {
  const time = dateValue(start);
  if (!Number.isFinite(time) || (weeks !== 1 && weeks !== 2)) return "";
  return new Date(time + (weeks * 7 - 1) * DAY).toISOString().slice(0, 10);
}

export function parseBookingPeriod(start, end) {
  const missing = value => value === undefined || value === null || value === "";
  if (missing(start) && missing(end)) return {periodStart: null, periodEnd: null};
  const a = dateValue(start), b = dateValue(end);
  if (!Number.isFinite(a) || !Number.isFinite(b) || start < "2000-01-01" || end > "2100-12-31") {
    throw new Error("請選擇有效的掛列區間，或清除區間後送出。");
  }
  if (new Date(a).getUTCDay() !== 1 || new Date(b).getUTCDay() !== 0 || (b - a !== 6 * DAY && b - a !== 13 * DAY)) {
    throw new Error("掛列區間須從週一開始、週日結束，限一週或連續兩週。");
  }
  return {periodStart: start, periodEnd: end};
}
