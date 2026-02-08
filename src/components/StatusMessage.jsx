import { BRAND } from "../constants/brand";
import { s } from "../utils/styles";

export default function StatusMessage({ type, title, children, onBack, backLabel }) {
  const isError = type === "error";
  return (
    <div style={{ ...s.card, textAlign: "center", padding: "60px 32px" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{isError ? "⚠️" : "✅"}</div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: isError ? BRAND.error : BRAND.primaryDark,
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      {children}
      <button
        style={{ ...s.btn, ...(isError ? s.btnPrimary : s.btnSecondary) }}
        onClick={onBack}
      >
        {backLabel || "戻る"}
      </button>
    </div>
  );
}
