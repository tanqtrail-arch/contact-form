import { useState } from "react";
import { BRAND, CLASS_OPTIONS } from "../constants/brand";
import { s, focusStyle, blurStyle } from "../utils/styles";
import { submitToGAS } from "../utils/submitToGAS";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";

const INITIAL_FORM = {
  parentName: "",
  childName: "",
  childGrade: "",
  trialType: "",
  preferredClass: "",
  date: "",
  phone: "",
  email: "",
  message: "",
};

const GRADES = [
  "年長", "小学1年", "小学2年", "小学3年",
  "小学4年", "小学5年", "小学6年",
  "中学1年", "中学2年", "中学3年",
];

const TRIAL_TYPES = [
  { value: "existing", label: "既存クラスに参加（土曜日の通常授業に体験参加）" },
  { value: "saturday", label: "個別体験 — 土曜日 14:00" },
  { value: "sunday", label: "個別体験 — 日曜日 14:00" },
];

function getTrialTypeLabel(value) {
  const t = TRIAL_TYPES.find((t) => t.value === value);
  return t ? t.label : value;
}

export default function TrialPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const needsClass = form.trialType === "existing";
  const isValid =
    form.parentName &&
    form.childName &&
    form.childGrade &&
    form.trialType &&
    (!needsClass || form.preferredClass) &&
    form.date &&
    form.phone && form.email;

  const handleSubmit = async () => {
    if (!isValid) return;
    setStatus("sending");
    const result = await submitToGAS("trial", {
      ...form,
      trialTypeLabel: getTrialTypeLabel(form.trialType),
    });
    setStatus(result.success ? "success" : "error");
  };

  if (status === "sending") {
    return <div style={s.card}><Spinner /></div>;
  }

  if (status === "success") {
    return (
      <StatusMessage
        type="success"
        title="体験授業のお申し込みを受け付けました"
        onBack={() => { setStatus("idle"); setForm(INITIAL_FORM); }}
        backLabel="TOPに戻る"
      >
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 4 }}>
          {form.childName}さん（{form.childGrade}）
        </p>
        <p style={{ color: BRAND.textMuted, fontSize: 14, marginBottom: 8 }}>
          {getTrialTypeLabel(form.trialType)}
          {needsClass && <>　—　{form.preferredClass}</>}
          <br />希望日: {form.date}
        </p>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 28, lineHeight: 1.7 }}>
          担当スタッフよりご連絡を差し上げます。<br />
          しばらくお待ちください。
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

  // Filter date input to only allow Saturday or Sunday based on trialType
  const dateInputProps = {};
  if (form.trialType === "sunday") {
    dateInputProps.onInput = (e) => {
      const d = new Date(e.target.value);
      if (d.getDay() !== 0) {
        e.target.setCustomValidity("日曜日を選択してください");
      } else {
        e.target.setCustomValidity("");
      }
    };
  } else if (form.trialType === "existing" || form.trialType === "saturday") {
    dateInputProps.onInput = (e) => {
      const d = new Date(e.target.value);
      if (d.getDay() !== 6) {
        e.target.setCustomValidity("土曜日を選択してください");
      } else {
        e.target.setCustomValidity("");
      }
    };
  }

  const dateDayLabel =
    form.trialType === "sunday" ? "（日曜日を選択）" :
    form.trialType === "existing" || form.trialType === "saturday" ? "（土曜日を選択）" : "";

  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>🌱</span> 無料体験授業のお申し込み
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          探究教室TRAILの授業を無料で体験いただけます。
          <br />
          お気軽にお申し込みください。
        </p>

        <div
          style={{
            background: `${BRAND.primary}08`,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 24,
            border: `1px solid ${BRAND.primary}20`,
          }}
        >
          <div style={{ fontSize: 13, color: BRAND.primary, fontWeight: 600, marginBottom: 8 }}>
            体験授業の2つの方法
          </div>
          <div style={{ fontSize: 12, color: BRAND.textMuted, lineHeight: 1.8 }}>
            <strong>1. 既存クラスに参加</strong> — 土曜日の通常授業にそのまま体験参加<br />
            <strong>2. 個別体験</strong> — 土曜 or 日曜の14:00にスタッフが個別対応
          </div>
        </div>

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
            お子さまの氏名 <span style={s.required}>*必須</span>
          </label>
          <input
            style={s.input}
            placeholder="山田 太郎"
            value={form.childName}
            onChange={(e) => setForm({ ...form, childName: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>
            学年 <span style={s.required}>*必須</span>
          </label>
          <select
            style={s.select}
            value={form.childGrade}
            onChange={(e) => setForm({ ...form, childGrade: e.target.value })}
          >
            <option value="">選択してください</option>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>
            体験タイプ <span style={s.required}>*必須</span>
          </label>
          {TRIAL_TYPES.map((t) => (
            <label
              key={t.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                marginBottom: 8,
                borderRadius: 10,
                border: `1.5px solid ${form.trialType === t.value ? BRAND.primary : BRAND.border}`,
                background: form.trialType === t.value ? `${BRAND.primary}08` : BRAND.white,
                cursor: "pointer",
                transition: "all 0.15s",
                fontSize: 14,
                color: BRAND.text,
              }}
              onClick={() => setForm({ ...form, trialType: t.value, preferredClass: t.value !== "existing" ? "" : form.preferredClass })}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${form.trialType === t.value ? BRAND.primary : BRAND.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {form.trialType === t.value && (
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: BRAND.primary }} />
                )}
              </div>
              {t.label}
            </label>
          ))}
        </div>

        {needsClass && (
          <div style={s.formGroup}>
            <label style={s.label}>
              参加クラス <span style={s.required}>*必須</span>
            </label>
            <select
              style={s.select}
              value={form.preferredClass}
              onChange={(e) => setForm({ ...form, preferredClass: e.target.value })}
            >
              <option value="">選択してください</option>
              {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        {form.trialType && (
          <div style={s.formGroup}>
            <label style={s.label}>
              希望日 <span style={s.required}>*必須</span>
              <span style={{ color: BRAND.textLight, fontSize: 11, marginLeft: 6 }}>{dateDayLabel}</span>
            </label>
            <input
              type="date"
              style={s.input}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              onFocus={focusStyle}
              onBlur={blurStyle}
              {...dateInputProps}
            />
          </div>
        )}

        <div style={s.formGroup}>
          <label style={s.label}>
            電話番号 <span style={s.required}>*必須</span>
          </label>
          <input
            type="tel"
            style={s.input}
            placeholder="090-1234-5678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>
           メールアドレス <span style={s.required}>*必須</span>
          </label>
          <input
            type="email"
            style={s.input}
            placeholder="example@mail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>ご質問・ご要望（任意）</label>
          <textarea
            style={s.textarea}
            placeholder="気になることがあればお気軽にご記入ください"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
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
          体験授業を申し込む →
        </button>
      </div>
    </div>
  );
}
