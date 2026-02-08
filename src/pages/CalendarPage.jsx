import { BRAND } from "../constants/brand";
import { CALENDAR_2026, FISCAL_YEAR, getSaturdays } from "../constants/calendar";
import { s } from "../utils/styles";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function MonthCalendar({ year, month, sessions, closedDays }) {
  const saturdays = getSaturdays(year, month);
  const closedSet = new Set(closedDays);
  const classSet = new Set(saturdays.filter((d) => !closedSet.has(d)));

  const firstDow = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Build week rows
  const weeks = [];
  let week = new Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const cellBase = {
    width: 28,
    height: 24,
    textAlign: "center",
    fontSize: 12,
    lineHeight: "24px",
    borderRadius: 3,
  };

  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 10,
        border: `1px solid ${BRAND.borderLight}`,
        padding: "12px 10px",
        minWidth: 0,
      }}
    >
      {/* Month header */}
      <div
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 14,
          color: BRAND.text,
          marginBottom: 8,
        }}
      >
        {month}月度（{sessions}）
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 2 }}>
        {WEEKDAYS.map((wd, i) => (
          <div
            key={i}
            style={{
              ...cellBase,
              fontSize: 11,
              fontWeight: 600,
              height: 20,
              lineHeight: "20px",
              color: i === 0 ? "#D32F2F" : i === 6 ? "#1565C0" : BRAND.textMuted,
            }}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Date grid */}
      {weeks.map((w, wi) => (
        <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
          {w.map((day, di) => {
            if (day == null) return <div key={di} style={cellBase} />;

            const isClass = classSet.has(day);
            const isClosed = closedSet.has(day);
            const isSunday = di === 0;

            let bg = "transparent";
            let color = BRAND.text;

            if (isClass) {
              bg = "#D32F2F";
              color = "#fff";
            } else if (isClosed) {
              bg = "#1565C0";
              color = "#fff";
            } else if (isSunday) {
              color = "#D32F2F";
            }

            return (
              <div key={di} style={{ ...cellBase, background: bg, color, fontWeight: (isClass || isClosed) ? 700 : 400 }}>
                {day}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>📅</span> {FISCAL_YEAR}年度　TRAIL年間カレンダー
        </div>

        {/* Month grid — 3 columns on desktop, responsive */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {CALENDAR_2026.map((m) => (
            <MonthCalendar
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              sessions={m.sessions}
              closedDays={m.closedDays}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13, color: BRAND.textMuted }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: "#D32F2F" }} />
            <span>授業日</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: "#1565C0" }} />
            <span>休講日</span>
          </div>
        </div>
      </div>
    </div>
  );
}
