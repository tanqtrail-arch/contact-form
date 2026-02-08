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

  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 12,
        border: `1px solid ${BRAND.borderLight}`,
        padding: "14px 8px 10px",
      }}
    >
      {/* Month header */}
      <div
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 15,
          color: BRAND.primaryDark,
          marginBottom: 10,
          letterSpacing: 1,
        }}
      >
        {month}月度（{sessions}）
      </div>

      {/* Weekday headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          marginBottom: 4,
          borderBottom: `1px solid ${BRAND.borderLight}`,
          paddingBottom: 4,
        }}
      >
        {WEEKDAYS.map((wd, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
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
        <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {w.map((day, di) => {
            if (day == null) {
              return <div key={di} style={{ height: 30 }} />;
            }

            const isClass = classSet.has(day);
            const isClosed = closedSet.has(day);
            const isSunday = di === 0;
            const isSaturday = di === 6;

            let bg = "transparent";
            let color = BRAND.text;
            let fontWeight = 400;

            if (isClass) {
              bg = "#D32F2F";
              color = "#fff";
              fontWeight = 700;
            } else if (isClosed) {
              bg = "#1565C0";
              color = "#fff";
              fontWeight = 700;
            } else if (isSunday) {
              color = "#D32F2F";
            } else if (isSaturday) {
              color = "#1565C0";
            }

            return (
              <div
                key={di}
                style={{
                  height: 30,
                  textAlign: "center",
                  fontSize: 13,
                  lineHeight: "30px",
                  borderRadius: 4,
                  background: bg,
                  color,
                  fontWeight,
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Build a human-readable summary of closed day ranges */
function formatClosedRanges(closedDays, month) {
  if (closedDays.length === 0) return null;
  const sorted = [...closedDays].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let end = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${month}/${start}` : `${month}/${start}〜${month}/${end}`);
      start = sorted[i];
      end = sorted[i];
    }
  }
  ranges.push(start === end ? `${month}/${start}` : `${month}/${start}〜${month}/${end}`);
  return ranges.join("、");
}

export default function CalendarPage() {
  // Collect all closed-day summaries for display
  const closedSummary = CALENDAR_2026.filter((m) => m.closedDays.length > 0).map((m) => ({
    month: m.month,
    text: formatClosedRanges(m.closedDays, m.month),
  }));

  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>📅</span> {FISCAL_YEAR}年度　TRAIL年間カレンダー
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 13,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#D32F2F" }} />
            <span style={{ fontWeight: 600, color: BRAND.text }}>授業日</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#1565C0" }} />
            <span style={{ fontWeight: 600, color: BRAND.text }}>休講日</span>
          </div>
        </div>

        {/* Month grid — 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 16,
            marginBottom: 28,
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

        {/* Closed days summary */}
        <div
          style={{
            background: "#EEF2F7",
            borderRadius: 12,
            padding: "18px 20px",
            border: "1px solid #D0D8E4",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1565C0",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 16 }}>📋</span> 休講日一覧
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {closedSummary.map((item) => (
              <div
                key={item.month}
                style={{
                  fontSize: 13,
                  color: BRAND.text,
                  display: "flex",
                  gap: 8,
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: "#1565C0",
                    minWidth: 40,
                    flexShrink: 0,
                  }}
                >
                  {item.month}月
                </span>
                <span style={{ color: BRAND.textMuted }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
