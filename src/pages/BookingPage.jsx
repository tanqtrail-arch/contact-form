import { useState, useMemo } from "react";
import { BRAND, CLASS_OPTIONS } from "../constants/brand";
import { AVAILABLE_SLOTS } from "../constants/booking";
import { getClosedDateSet } from "../constants/calendar";
import { s, focusStyle, blurStyle } from "../utils/styles";
import { submitToGAS } from "../utils/submitToGAS";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FORM = { parentName: "", studentName: "", className: "", topic: "" };
const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];
const STEPS = [
  { n: 1, label: "日程選択" },
  { n: 2, label: "時間選択" },
  { n: 3, label: "情報入力" },
];

function generateCalendar() {
  const year = 2026;
  const month = 1; // February (0-indexed)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function getDateKey(day) {
  return day ? `2026-02-${String(day).padStart(2, "0")}` : null;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const calDays = generateCalendar();
  const closedDates = useMemo(() => getClosedDateSet(), []);
  const isValid = form.parentName && form.studentName && form.className;

  const handleBook = async () => {
    if (!isValid) return;
    setStatus("sending");
    const result = await submitToGAS("booking", {
      ...form,
      date: selectedDate,
      time: selectedTime,
    });
    setStatus(result.success ? "success" : "error");
  };

  const resetAll = () => {
    setStatus("idle");
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm(INITIAL_FORM);
  };

  if (status === "sending") {
    return (
      <div style={s.card}>
        <Spinner />
      </div>
    );
  }

  if (status === "success") {
    return (
      <StatusMessage
        type="success"
        title="面談のご予約を承りました"
        onBack={resetAll}
        backLabel="別の予約をする"
      >
        <div
          style={{
            display: "inline-block",
            background: BRAND.bgWarm,
            borderRadius: 12,
            padding: "20px 32px",
            marginBottom: 16,
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            <strong>日時：</strong>
            {selectedDate?.replace("2026-", "").replace("-", "月")}日　{selectedTime}
          </div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            <strong>保護者：</strong>
            {form.parentName}
          </div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            <strong>生徒：</strong>
            {form.studentName}（{form.className}）
          </div>
          {form.topic && (
            <div style={{ fontSize: 14 }}>
              <strong>ご相談内容：</strong>
              {form.topic}
            </div>
          )}
        </div>
        <p
          style={{
            fontSize: 12,
            color: BRAND.success,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          📲 LINEに通知を送信しました
        </p>
      </StatusMessage>
    );
  }

  if (status === "error") {
    return (
      <StatusMessage
        type="error"
        title="送信に失敗しました"
        onBack={() => setStatus("idle")}
      >
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 28 }}>
          通信環境をご確認の上、もう一度お試しください。
        </p>
      </StatusMessage>
    );
  }

  return (
    <div>
      {/* Steps indicator */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {STEPS.map((st, i) => (
          <div key={st.n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                background: step >= st.n ? BRAND.primary : BRAND.borderLight,
                color: step >= st.n ? BRAND.white : BRAND.textLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                transition: "all 0.3s ease",
              }}
            >
              {st.n}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: step === st.n ? 700 : 400,
                color: step === st.n ? BRAND.primary : BRAND.textMuted,
              }}
            >
              {st.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: step > st.n ? BRAND.primary : BRAND.borderLight,
                  borderRadius: 2,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Date */}
      {step === 1 && (
        <div style={s.card}>
          <div style={s.cardTitle}>
            <span>📆</span> 日程を選んでください
          </div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: BRAND.text,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            2026年 2月
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            {WEEK_DAYS.map((d) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: d === "日" ? BRAND.error : d === "土" ? "#1976D2" : BRAND.textMuted,
                  padding: "8px 0",
                }}
              >
                {d}
              </div>
            ))}
            {calDays.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />;
              const dateKey = getDateKey(day);
              const isClosed = closedDates.has(dateKey);
              const hasSlots = !isClosed && AVAILABLE_SLOTS[dateKey];
              const dow = new Date(2026, 1, day).getDay();
              return (
                <div
                  key={day}
                  onClick={() => {
                    if (hasSlots) {
                      setSelectedDate(dateKey);
                      setStep(2);
                    }
                  }}
                  style={{
                    textAlign: "center",
                    padding: "10px 4px",
                    borderRadius: 10,
                    fontSize: 14,
                    cursor: hasSlots ? "pointer" : "default",
                    background: isClosed
                      ? "#1565C020"
                      : hasSlots
                        ? `${BRAND.primary}10`
                        : "transparent",
                    color: isClosed
                      ? "#1565C0"
                      : !hasSlots
                        ? BRAND.textLight
                        : dow === 0
                          ? BRAND.error
                          : dow === 6
                            ? "#1976D2"
                            : BRAND.text,
                    fontWeight: hasSlots ? 600 : 400,
                    opacity: isClosed ? 0.5 : 1,
                    border: hasSlots
                      ? `1.5px solid ${BRAND.primary}30`
                      : "1.5px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (hasSlots) {
                      e.currentTarget.style.background = `${BRAND.primary}20`;
                      e.currentTarget.style.borderColor = BRAND.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasSlots) {
                      e.currentTarget.style.background = `${BRAND.primary}10`;
                      e.currentTarget.style.borderColor = `${BRAND.primary}30`;
                    }
                  }}
                >
                  {day}
                  {isClosed && (
                    <div style={{ fontSize: 9, color: "#1565C0", marginTop: 1 }}>休</div>
                  )}
                  {hasSlots && (
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                        background: BRAND.accent,
                        margin: "3px auto 0",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: BRAND.textMuted }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  background: BRAND.accent,
                  display: "inline-block",
                }}
              />{" "}
              予約可能日
            </span>
          </div>
        </div>
      )}

      {/* Step 2: Time */}
      {step === 2 && selectedDate && (
        <div style={s.card}>
          <div style={s.cardTitle}>
            <span>⏰</span> 時間を選んでください
          </div>
          <p style={{ fontSize: 14, color: BRAND.textMuted, marginBottom: 20 }}>
            {selectedDate.replace("2026-02-", "2月")}日
            <span
              onClick={() => {
                setStep(1);
                setSelectedDate(null);
              }}
              style={{
                marginLeft: 12,
                color: BRAND.primary,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ← 日程を変更
            </span>
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 10,
            }}
          >
            {AVAILABLE_SLOTS[selectedDate]?.map((time) => (
              <div
                key={time}
                onClick={() => {
                  setSelectedTime(time);
                  setStep(3);
                }}
                style={{
                  padding: "16px 12px",
                  borderRadius: 12,
                  border: `1.5px solid ${BRAND.primary}40`,
                  background: BRAND.white,
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  color: BRAND.primary,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BRAND.primary;
                  e.currentTarget.style.color = BRAND.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = BRAND.white;
                  e.currentTarget.style.color = BRAND.primary;
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Info */}
      {step === 3 && (
        <div style={s.card}>
          <div style={s.cardTitle}>
            <span>📝</span> ご予約情報
          </div>
          <div
            style={{
              background: `${BRAND.primary}08`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 24,
              display: "flex",
              gap: 20,
              fontSize: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span>
              <strong>日時：</strong>
              {selectedDate?.replace("2026-02-", "2月")}日　{selectedTime}
            </span>
            <span
              onClick={() => {
                setStep(1);
                setSelectedTime(null);
                setSelectedDate(null);
              }}
              style={{ color: BRAND.primary, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            >
              変更する
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={s.formGroup}>
              <label style={s.label}>
                保護者氏名 <span style={s.required}>*必須</span>
              </label>
              <input
                style={s.input}
                placeholder="山田 花子"
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            <div style={s.formGroup}>
              <label style={s.label}>
                生徒氏名 <span style={s.required}>*必須</span>
              </label>
              <input
                style={s.input}
                placeholder="山田 太郎"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
          </div>

          <div style={s.formGroup}>
            <label style={s.label}>
              クラス <span style={s.required}>*必須</span>
            </label>
            <select
              style={s.select}
              value={form.className}
              onChange={(e) => setForm({ ...form, className: e.target.value })}
            >
              <option value="">選択してください</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div style={s.formGroup}>
            <label style={s.label}>ご相談内容（任意）</label>
            <textarea
              style={s.textarea}
              placeholder="面談でお話ししたい内容があればご記入ください"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <button style={{ ...s.btn, ...s.btnSecondary }} onClick={() => setStep(2)}>
              ← 戻る
            </button>
            <button
              style={{
                ...s.btn,
                ...s.btnPrimary,
                opacity: isValid ? 1 : 0.5,
                pointerEvents: isValid ? "auto" : "none",
              }}
              onClick={handleBook}
            >
              予約を確定する ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
