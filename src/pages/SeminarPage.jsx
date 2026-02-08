import { useState } from "react";
import { BRAND, CLASS_OPTIONS } from "../constants/brand";
import { SEMINARS } from "../constants/seminars";
import { s, focusStyle, blurStyle } from "../utils/styles";
import { submitToGAS } from "../utils/submitToGAS";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FORM = { parentName: "", studentName: "", className: "", attendance: "" };

function SeminarCard({ sem, onClick }) {
  const isOpen = sem.status === "open";
  const isUpcoming = sem.status === "upcoming";

  return (
    <div
      style={{
        ...s.card,
        marginBottom: 0,
        transition: "all 0.2s ease",
        borderLeft: `4px solid ${isOpen ? BRAND.primary : isUpcoming ? BRAND.accent : BRAND.textLight}`,
        cursor: isOpen ? "pointer" : "default",
        opacity: sem.status === "closed" ? 0.6 : 1,
      }}
      onClick={() => {
        if (isOpen) onClick(sem);
      }}
      onMouseEnter={(e) => {
        if (isOpen) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)";
        }
      }}
      onMouseLeave={(e) => {
        if (isOpen) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 250 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                fontWeight: 600,
                background: isOpen ? "#E8F5EE" : isUpcoming ? "#FFF8E1" : "#F5F5F5",
                color: isOpen ? BRAND.primary : isUpcoming ? "#F57F17" : BRAND.textLight,
              }}
            >
              {isOpen ? "受付中" : isUpcoming ? "近日公開" : "終了"}
            </span>
            {sem.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: `${BRAND.primary}10`,
                  color: BRAND.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: BRAND.text,
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            {sem.title}
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 13,
              color: BRAND.textMuted,
              marginBottom: 10,
            }}
          >
            <span>📅 {sem.date}</span>
            <span>⏰ {sem.time}</span>
            <span>📍 {sem.location}</span>
          </div>
          <p style={{ fontSize: 13, color: BRAND.textMuted, lineHeight: 1.6 }}>
            {sem.description.slice(0, 80)}...
          </p>
        </div>

        {isOpen && (
          <div style={{ textAlign: "center", minWidth: 100 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.primary }}>
              {sem.remaining}
            </div>
            <div style={{ fontSize: 11, color: BRAND.textMuted }}>/ {sem.capacity}席</div>
            <div style={{ marginTop: 10, fontSize: 13, color: BRAND.primary, fontWeight: 600 }}>
              申し込む →
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SeminarApplicationForm({ seminar, form, setForm, onSubmit, onBack }) {
  const isValid = form.parentName && form.studentName && form.className && form.attendance;

  return (
    <div>
      <div
        style={{ marginBottom: 20, fontSize: 13, color: BRAND.primary, fontWeight: 600, cursor: "pointer" }}
        onClick={onBack}
      >
        ← セミナー一覧に戻る
      </div>

      <div style={{ ...s.card, borderTop: `4px solid ${BRAND.accent}` }}>
        <div
          style={{ fontSize: 12, color: BRAND.accent, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}
        >
          SEMINAR
        </div>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: BRAND.primaryDark,
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          {seminar.title}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 20,
            fontSize: 14,
            color: BRAND.textMuted,
          }}
        >
          <span>📅 {seminar.date}</span>
          <span>⏰ {seminar.time}</span>
          <span>📍 {seminar.location}</span>
        </div>
        <p style={{ fontSize: 14, color: BRAND.text, lineHeight: 1.8, marginBottom: 24 }}>
          {seminar.description}
        </p>

        <div style={{ height: 1, background: BRAND.borderLight, margin: "24px 0" }} />

        <h3 style={{ fontSize: 16, fontWeight: 700, color: BRAND.primaryDark, marginBottom: 20 }}>
          📝 参加お申し込み
        </h3>

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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
              <option value="外部参加">外部参加（TRAIL生以外）</option>
            </select>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>
              参加方法 <span style={s.required}>*必須</span>
            </label>
            <select
              style={s.select}
              value={form.attendance}
              onChange={(e) => setForm({ ...form, attendance: e.target.value })}
            >
              <option value="">選択してください</option>
              <option value="教室参加">教室参加</option>
              {seminar.location.includes("オンライン") && (
                <option value="オンライン参加">オンライン参加</option>
              )}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button
            style={{
              ...s.btn,
              ...s.btnPrimary,
              opacity: isValid ? 1 : 0.5,
              pointerEvents: isValid ? "auto" : "none",
            }}
            onClick={onSubmit}
          >
            申し込む →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SeminarPage() {
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const handleApply = async () => {
    if (!form.parentName || !form.studentName || !form.className || !form.attendance) return;
    setStatus("sending");
    const result = await submitToGAS("seminar", {
      ...form,
      seminarTitle: selectedSeminar.title,
      seminarDate: selectedSeminar.date,
    });
    setStatus(result.success ? "success" : "error");
  };

  const resetAll = () => {
    setStatus("idle");
    setSelectedSeminar(null);
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
        title="お申し込みを受け付けました"
        onBack={resetAll}
        backLabel="一覧に戻る"
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
            <strong>セミナー：</strong>
            {selectedSeminar.title}
          </div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            <strong>日時：</strong>
            {selectedSeminar.date}　{selectedSeminar.time}
          </div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            <strong>保護者：</strong>
            {form.parentName}
          </div>
          <div style={{ fontSize: 14 }}>
            <strong>参加方法：</strong>
            {form.attendance}
          </div>
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

  if (selectedSeminar) {
    return (
      <SeminarApplicationForm
        seminar={selectedSeminar}
        form={form}
        setForm={setForm}
        onSubmit={handleApply}
        onBack={() => setSelectedSeminar(null)}
      />
    );
  }

  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>🎓</span> 保護者セミナー
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          TRAILでは保護者の皆さまを対象に、子どもの学びをより深くサポートするためのセミナーを定期開催しています。
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SEMINARS.map((sem) => (
          <SeminarCard key={sem.id} sem={sem} onClick={setSelectedSeminar} />
        ))}
      </div>
    </div>
  );
}
