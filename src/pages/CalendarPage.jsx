import { useState } from "react";
import { BRAND } from "../constants/brand";
import { CALENDAR_2025, EVENT_COLORS, MONTH_NAMES } from "../constants/calendar";
import { s } from "../utils/styles";

const EVENT_LABELS = {
  start: "開始",
  end: "終了",
  event: "イベント",
  holiday: "休講",
  meeting: "面談",
  special: "特別",
};

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const orderedMonths = [...CALENDAR_2025].sort((a, b) => {
    const orderA = a.month >= 4 ? a.month - 4 : a.month + 8;
    const orderB = b.month >= 4 ? b.month - 4 : b.month + 8;
    return orderA - orderB;
  });

  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>📅</span> 2025年度 年間カレンダー
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 24 }}>
          月をクリックすると詳細が表示されます。
        </p>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          {Object.entries(EVENT_COLORS).map(([type, colors]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
              <div
                style={{ width: 10, height: 10, borderRadius: 10, background: colors.dot }}
              />
              <span style={{ color: BRAND.textMuted }}>{EVENT_LABELS[type]}</span>
            </div>
          ))}
        </div>

        {/* Month grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {orderedMonths.map((monthData) => {
            const isSelected = selectedMonth === monthData.month;
            return (
              <div
                key={monthData.month}
                onClick={() => setSelectedMonth(isSelected ? null : monthData.month)}
                style={{
                  padding: "16px",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isSelected
                    ? `2px solid ${BRAND.primary}`
                    : `1.5px solid ${BRAND.borderLight}`,
                  background: isSelected ? `${BRAND.primary}08` : BRAND.white,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = BRAND.primary + "60";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.borderColor = BRAND.borderLight;
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: isSelected ? BRAND.primary : BRAND.text,
                    marginBottom: 8,
                  }}
                >
                  {MONTH_NAMES[monthData.month]}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {monthData.events.map((ev, i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8,
                        background: EVENT_COLORS[ev.type]?.dot || BRAND.textLight,
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: BRAND.textLight, marginTop: 6 }}>
                  {monthData.events.length} 件
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected month detail */}
      {selectedMonth && (
        <div style={{ ...s.card, borderLeft: `4px solid ${BRAND.primary}` }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: BRAND.primaryDark, marginBottom: 20 }}>
            {MONTH_NAMES[selectedMonth]} のスケジュール
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CALENDAR_2025.find((m) => m.month === selectedMonth)?.events.map((ev, i) => {
              const color = EVENT_COLORS[ev.type] || {
                bg: "#F5F5F5",
                text: "#666",
                dot: "#999",
              };
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: color.bg,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      background: color.dot,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: color.text,
                      minWidth: 80,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {ev.date}
                  </div>
                  <div style={{ fontSize: 14, color: BRAND.text }}>{ev.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
