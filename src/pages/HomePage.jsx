import { BRAND, GAS_URL } from "../constants/brand";
import { s } from "../utils/styles";

const QUICK_LINKS = [
  { id: "absence", icon: "✉️", title: "欠席連絡", desc: "お休みの連絡はこちらから", color: BRAND.primary },
  { id: "calendar", icon: "📅", title: "年間カレンダー", desc: "授業日・イベント一覧", color: "#1976D2" },
  { id: "booking", icon: "🤝", title: "面談予約", desc: "ご都合の良い日時を選択", color: "#7B1FA2" },
  { id: "seminar", icon: "🎓", title: "保護者セミナー", desc: "セミナー情報・お申し込み", color: "#E8A838" },
];

const NEWS = [
  { date: "2026.02.05", text: "2月の面談予約を受け付けています", tag: "面談" },
  { date: "2026.01.28", text: "3学期の授業スケジュールを更新しました", tag: "更新" },
  { date: "2026.01.15", text: "冬の探究発表会の写真を公開しました", tag: "イベント" },
];

export default function HomePage({ setPage }) {
  const isDemoMode = GAS_URL === "YOUR_GAS_WEB_APP_URL_HERE";

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${BRAND.bgWarm} 0%, #E8F5EE 100%)`,
          borderRadius: 20,
          padding: "36px 32px",
          marginBottom: 28,
          border: `1px solid ${BRAND.borderLight}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 16, right: 24, opacity: 0.12, fontSize: 120 }}>
          🌿
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: BRAND.primaryDark,
            marginBottom: 8,
            position: "relative",
          }}
        >
          TRAIL 保護者ポータル
        </h1>
        <p
          style={{
            fontSize: 15,
            color: BRAND.textMuted,
            lineHeight: 1.7,
            position: "relative",
            maxWidth: 500,
          }}
        >
          探究教室TRAILへようこそ。
          <br />
          欠席のご連絡、年間スケジュールの確認、面談のご予約をこちらから行えます。
        </p>
      </div>

      {/* Quick links */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {QUICK_LINKS.map((link) => (
          <div
            key={link.id}
            onClick={() => setPage(link.id)}
            style={{
              ...s.card,
              marginBottom: 0,
              cursor: "pointer",
              transition: "all 0.25s ease",
              borderLeft: `4px solid ${link.color}`,
              padding: "28px 24px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{link.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.text, marginBottom: 6 }}>
              {link.title}
            </div>
            <div style={{ fontSize: 13, color: BRAND.textMuted }}>{link.desc}</div>
            <div style={{ marginTop: 16, fontSize: 13, color: link.color, fontWeight: 600 }}>
              → 開く
            </div>
          </div>
        ))}
      </div>

      {/* News */}
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>📢</span> お知らせ
        </div>
        {NEWS.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "14px 0",
              borderBottom: i < NEWS.length - 1 ? `1px solid ${BRAND.borderLight}` : "none",
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: BRAND.textLight,
                minWidth: 85,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.date}
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                background: BRAND.primary + "15",
                color: BRAND.primary,
                fontWeight: 600,
              }}
            >
              {item.tag}
            </span>
            <span style={{ fontSize: 14, color: BRAND.text }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* GAS connection status */}
      <div
        style={{
          background: isDemoMode ? "#FFF8E1" : "#E8F5EE",
          borderRadius: 12,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: `1px solid ${isDemoMode ? "#FFE082" : "#A5D6A7"}`,
          fontSize: 13,
        }}
      >
        <span>{isDemoMode ? "⚠️" : "✅"}</span>
        <span style={{ color: BRAND.textMuted }}>
          {isDemoMode
            ? "デモモード — GAS接続後にフォーム送信が有効になります"
            : "GAS接続済み — フォーム送信が有効です"}
        </span>
      </div>
    </div>
  );
}
