import { BRAND } from "../constants/brand";

// Shared styles
export const s = {
  app: {
    fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
    background: BRAND.bg,
    minHeight: "100vh",
    color: BRAND.text,
  },
  header: {
    background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 50%, ${BRAND.primaryLight} 100%)`,
    color: BRAND.white,
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 20px rgba(27,107,74,0.3)",
  },
  headerInner: { maxWidth: 1100, margin: "0 auto", padding: "16px 24px 0" },
  headerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: -1,
    border: "1px solid rgba(255,255,255,0.3)",
  },
  logoText: { fontSize: 22, fontWeight: 800, letterSpacing: 2 },
  logoSub: { fontSize: 11, opacity: 0.8, letterSpacing: 1, marginTop: -2 },
  nav: { display: "flex", gap: 0, overflowX: "auto" },
  navItem: (active) => ({
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    borderBottom: active
      ? `3px solid ${BRAND.accent}`
      : "3px solid transparent",
    color: active ? BRAND.white : "rgba(255,255,255,0.7)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  }),
  main: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" },
  card: {
    background: BRAND.bgCard,
    borderRadius: 16,
    padding: "32px",
    boxShadow:
      "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)",
    border: `1px solid ${BRAND.borderLight}`,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: BRAND.primaryDark,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  formGroup: { marginBottom: 20 },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: BRAND.text,
    marginBottom: 6,
  },
  required: { color: BRAND.error, fontSize: 11, marginLeft: 4 },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${BRAND.border}`,
    fontSize: 15,
    color: BRAND.text,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    background: BRAND.white,
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${BRAND.border}`,
    fontSize: 15,
    color: BRAND.text,
    outline: "none",
    background: BRAND.white,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235A6B5A' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${BRAND.border}`,
    fontSize: 15,
    color: BRAND.text,
    outline: "none",
    resize: "vertical",
    minHeight: 100,
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: BRAND.white,
  },
  btn: {
    padding: "14px 32px",
    borderRadius: 12,
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`,
    color: BRAND.white,
    boxShadow: `0 4px 14px rgba(27,107,74,0.3)`,
  },
  btnSecondary: {
    background: BRAND.bgWarm,
    color: BRAND.primary,
    border: `1.5px solid ${BRAND.border}`,
  },
};

// Focus / blur helpers for inputs
export const focusStyle = (e) => {
  e.target.style.borderColor = BRAND.primary;
  e.target.style.boxShadow = `0 0 0 3px ${BRAND.primary}20`;
};
export const blurStyle = (e) => {
  e.target.style.borderColor = BRAND.border;
  e.target.style.boxShadow = "none";
};
