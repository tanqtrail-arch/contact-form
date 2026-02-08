// Calendar Data 2026 fiscal year (Feb 2026 – Jan 2027)
// Each entry: year, month, sessions (授業回数), closedDays (休講日 = day-of-month)
// closedAll: true → month-wide closure (e.g. summer break) — all dates shown as 休講
// Class days are every Saturday NOT listed in closedDays.

export const FISCAL_YEAR = 2026;

export const CALENDAR_2026 = [
  { year: 2026, month: 2, sessions: 4, closedDays: [] },
  { year: 2026, month: 3, sessions: 4, closedDays: [] },
  { year: 2026, month: 4, sessions: 4, closedDays: [] },
  { year: 2026, month: 5, sessions: 4, closedDays: [2] },
  { year: 2026, month: 6, sessions: 4, closedDays: [] },
  { year: 2026, month: 7, sessions: 4, closedDays: [] },
  { year: 2026, month: 8, sessions: 0, closedDays: [1, 8, 15, 22, 29], closedAll: true },
  { year: 2026, month: 9, sessions: 4, closedDays: [] },
  { year: 2026, month: 10, sessions: 4, closedDays: [31] },
  { year: 2026, month: 11, sessions: 4, closedDays: [] },
  { year: 2026, month: 12, sessions: 4, closedDays: [] },
  { year: 2027, month: 1, sessions: 4, closedDays: [2] },
];

/** Return all Saturdays (day-of-month) in a given year/month */
export function getSaturdays(year, month) {
  const result = [];
  const days = new Date(year, month, 0).getDate();
  for (let d = 1; d <= days; d++) {
    if (new Date(year, month - 1, d).getDay() === 6) result.push(d);
  }
  return result;
}

const pad = (n) => String(n).padStart(2, "0");

/** Return a Set of ISO date strings ("YYYY-MM-DD") for all 休講日 */
export function getClosedDateSet() {
  const dates = new Set();
  for (const m of CALENDAR_2026) {
    if (m.closedAll) {
      const total = new Date(m.year, m.month, 0).getDate();
      for (let d = 1; d <= total; d++) {
        dates.add(`${m.year}-${pad(m.month)}-${pad(d)}`);
      }
    } else {
      for (const d of m.closedDays) {
        dates.add(`${m.year}-${pad(m.month)}-${pad(d)}`);
      }
    }
  }
  return dates;
}
