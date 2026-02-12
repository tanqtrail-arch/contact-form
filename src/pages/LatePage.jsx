import { useState, useMemo } from "react";
import { BRAND, CLASS_OPTIONS } from "../constants/brand";
import { getClosedDateSet } from "../constants/calendar";
import { s, focusStyle, blurStyle } from "../utils/styles";
import { submitToGAS } from "../utils/submitToGAS";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FORM = { studentName: "", className: "", date: "", arrivalTime: "", reason: "", details: "" };

export default function LatePage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const closedDates = useMemo(() => getClosedDateSet(), []);

  const isClosedDate = form.date && closedDates.has(form.date);
  const isValid = form.studentName && form.className && form.date && form.arrivalTime && form.reason && !isClosedDate;

  const handleSubmit = async () => {
    if (!isValid) return;
    setStatus("sending");
    const result = await submitToGAS("late", form);
    setStatus(result.success ? "success" : "error");
  };

  if (status === "sending") {
    return <div style={s.card}><Spinner /></div>;
  }

  if (status === "success") {
    return (
      <StatusMessage
        type="success"
        title="遅刻連絡を受け付けました"
        onBack={() => { setStatus("idle"); setForm(INITIAL_FORM); }}
        backLabel="新しい連絡を送る"
      >
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 4 }}>
          {form.studentName}さん（{form.className}）
        </p>
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 8 }}>
          {form.date}　到着予定 {form.arrivalTime}　—　{form.reason}
        </p>
        <p style={{ fontSize: 12, color: BRAND.success, marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          📲 LINEに通知を送信しました
        </p>
      </StatusMessage>
    );
  }

  if (status === "error") {
    return (
      <StatusMessage type="error" title="送信に失敗しました" onBack={() => setStatus("idle")}>
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
          <span>🕐</span> 遅刻連絡フォーム
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          授業に遅れる場合は、以下のフォームからご連絡ください。
          <br />
          到着予定時刻をお知らせいただけると助かります。
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
              {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={s.formGroup}>
            <label style={s.label}>
              遅刻日 <span style={s.required}>*必須</span>
            </label>
            <input
              type="date"
              style={{ ...s.input, ...(isClosedDate ? { borderColor: BRAND.error } : {}) }}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
            {isClosedDate && (
              <p style={{ color: BRAND.error, fontSize: 12, marginTop: 4 }}>
                この日は休講日です。
              </p>
            )}
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>
              到着予定時刻 <span style={s.required}>*必須</span>
            </label>
            <input
              type="time"
              style={s.input}
              value={form.arrivalTime}
              onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
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
            <option value="交通事情">交通事情</option>
            <option value="前の習い事">前の習い事</option>
            <option value="体調（遅れて参加）">体調（遅れて参加）</option>
            <option value="家庭の都合">家庭の都合</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>補足（任意）</label>
          <textarea
            style={s.textarea}
            placeholder="その他ご連絡事項があればご記入ください"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button
            style={{ ...s.btn, ...s.btnPrimary, opacity: isValid ? 1 : 0.5, pointerEvents: isValid ? "auto" : "none" }}
            onClick={handleSubmit}
          >
            送信する →
          </button>
        </div>
      </div>
    </div>
  );
}
