import test from "node:test";
import assert from "node:assert/strict";
import {isLowBalance,isBookable} from "../src/job-policy.mjs";
const job=(remaining, extra={})=>({totalMinutes:6000,usedMinutes:6000-remaining,enabled:1,closed:0,...extra});
test("low balance includes up to ten hours and excludes exhausted jobs",()=>{
  assert.equal(isLowBalance(job(15)),true);
  assert.equal(isLowBalance(job(600)),true);
  assert.equal(isLowBalance(job(615)),false);
  assert.equal(isLowBalance(job(0)),false);
});
test("warning uses hours rather than a percentage",()=>{
  assert.equal(isLowBalance(job(600,{totalMinutes:60000,usedMinutes:59400})),true);
  assert.equal(isLowBalance(job(900,{totalMinutes:60000,usedMinutes:59100})),false);
});
test("closed and disabled jobs are neither bookable nor low-balance warnings",()=>{
  for(const extra of [{closed:1},{enabled:0}]) {assert.equal(isLowBalance(job(300,extra)),false);assert.equal(isBookable(job(300,extra)),false);}
  assert.equal(isBookable(job(0)),false);
  assert.equal(isBookable(job(600)),true);
});
