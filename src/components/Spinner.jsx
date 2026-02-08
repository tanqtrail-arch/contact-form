import { BRAND } from "../constants/brand";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "60px 32px",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: `3px solid ${BRAND.borderLight}`,
          borderTop: `3px solid ${BRAND.primary}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: BRAND.textMuted, fontSize: 14 }}>送信中...</span>
    </div>
  );
}
