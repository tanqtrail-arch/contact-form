import { useState, useMemo } from "react";
import { BRAND, CLASS_OPTIONS } from "../constants/brand";
import { getClosedDateSet } from "../constants/calendar";
import { s, focusStyle, blurStyle } from "../utils/styles";
import { submitToGAS } from "../utils/submitToGAS";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FORM = { studentName: "", className: "", date: "", reason: "", details: "" };

export default function AbsencePage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const closedDates = useMemo(() => getClosedDateSet(), []);

  const isClosedDate = form.date && closedDates.has(form.date);
  const isValid = form.studentName && form.className && form.date && form.reason && !isClosedDate;

  const handleSubmit = async () => {
    if (!isValid) return;
    setStatus("sending");
    const result = await submitToGAS("absence", form);
    setStatus(result.success ? "success" : "error");
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
        title="欠席連絡を受け付けました"
        onBack={() => {
          setStatus("idle");
          setForm(INITIAL_FORM);
        }}
        backLabel="新しい連絡を送る"
      >
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 4 }}>
          {form.studentName}さん（{form.className}）
        </p>
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 8 }}>
          {form.date}　—　{form.reason}
        </p>
        <p
          style={{
            fontSize: 12,
            color: BRAND.success,
            marginBottom: 28,
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
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>✉️</span> 欠席連絡フォーム
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          授業をお休みされる場合は、以下のフォームからご連絡ください。
          <br />
          授業開始の2時間前までにお願いいたします。
        </p>

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
          <label style={s.label}>
            欠席日 <span style={s.required}>*必須</span>
          </label>
          <input
            type="date"
            style={{
              ...s.input,
              ...(isClosedDate ? { borderColor: BRAND.error } : {}),
            }}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          {isClosedDate && (
            <p style={{ color: BRAND.error, fontSize: 12, marginTop: 4 }}>
              この日は休講日のため、欠席連絡は不要です。
            </p>
          )}
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>
            理由 <span style={s.required}>*必須</span>
          </label>
          <select
            style={s.select}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          >
            <option value="">選択してください</option>
            <option value="体調不良">体調不良</option>
            <option value="家庭の都合">家庭の都合</option>
            <option value="学校行事">学校行事</option>
            <option value="旅行・外出">旅行・外出</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>補足（任意）</label>
          <textarea
            style={s.textarea}
            placeholder="振替希望日やその他ご連絡事項があればご記入ください"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <button
          style={{
            ...s.btn,
            ...s.btnPrimary,
            width: "100%",
            justifyContent: "center",
            padding: "16px 32px",
            fontSize: 16,
            marginTop: 8,
            opacity: isValid ? 1 : 0.5,
            pointerEvents: isValid ? "auto" : "none",
          }}
          onClick={handleSubmit}
        >
          送信する →
        </button>
      </div>

      <div
        style={{
          background: BRAND.bgWarm,
          borderRadius: 14,
          padding: "20px 24px",
          border: `1px solid ${BRAND.accent}30`,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1 }}>💡</span>
        <div style={{ fontSize: 13, color: BRAND.textMuted, lineHeight: 1.7 }}>
          <strong style={{ color: BRAND.text }}>振替について</strong>
          <br />
          欠席分の振替は月内で調整いたします。ご希望の日時がある場合は補足欄にご記入ください。
        </div>
      </div>
    </div>
  );
}
