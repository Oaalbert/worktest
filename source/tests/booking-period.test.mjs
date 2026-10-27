import test from "node:test";
import assert from "node:assert/strict";
import {taipeiDate, taipeiTimestamp, mondayOfWeek, endOfPeriod, parseBookingPeriod} from "../src/booking-period.mjs";

test("booking periods are optional; partial periods are rejected", () => {
  for (const value of [undefined, null, ""]) assert.deepEqual(parseBookingPeriod(value, value), {periodStart: null, periodEnd: null});
  assert.throws(() => parseBookingPeriod("2026-10-26", null), /有效的掛列區間/);
  assert.throws(() => parseBookingPeriod(null, "2026-11-01"), /有效的掛列區間/);
});

test("Monday starts a week and Sunday belongs to the preceding Monday", () => {
  assert.equal(mondayOfWeek("2026-10-26"), "2026-10-26");
  assert.equal(mondayOfWeek("2026-10-27"), "2026-10-26");
  assert.equal(mondayOfWeek("2026-11-01"), "2026-10-26");
  assert.equal(mondayOfWeek("2026-11-02"), "2026-11-02");
});

test("one and two consecutive weeks cross month and year boundaries correctly", () => {
  for (const [start, weeks, end] of [["2026-10-26",1,"2026-11-01"],["2026-10-26",2,"2026-11-08"],["2026-12-28",2,"2027-01-10"],["2028-02-28",1,"2028-03-05"]]) {
    assert.equal(endOfPeriod(start, weeks), end);
    assert.deepEqual(parseBookingPeriod(start, end), {periodStart: start, periodEnd: end});
  }
});

test("server validation rejects partial weeks, reversed ranges, and more than two weeks", () => {
  for (const [start, end] of [["2026-10-27","2026-11-01"],["2026-10-26","2026-11-02"],["2026-10-26","2026-10-25"],["2026-10-26","2026-11-15"]]) assert.throws(() => parseBookingPeriod(start,end), /限一週或連續兩週/);
});

test("invalid dates and non-string API inputs are rejected", () => {
  for (const start of ["2026-02-30", "2026-13-01", "2026-1-01", {}, 1793001600000]) assert.throws(() => parseBookingPeriod(start,"2026-11-01"), /有效的掛列區間/);
  assert.equal(mondayOfWeek("2026-02-30"), "");
});

test("automatic booking dates use Taiwan midnight, independent of the client date", () => {
  assert.equal(taipeiDate(Date.parse("2026-10-27T15:59:59Z")), "2026-10-27");
  assert.equal(taipeiDate(Date.parse("2026-10-27T16:00:00Z")), "2026-10-28");
  assert.match(taipeiTimestamp(Date.parse("2026-10-27T16:01:02Z")), /2026\/10\/28\s00:01:02/);
});
