import { useState } from "react";
import { BRAND } from "../constants/brand";
import { s } from "../utils/styles";

const EVENTS = [
  {
    id: 1,
    title: "冬の探究発表会 2025",
    date: "2026年1月25日",
    description: "3学期の探究成果を発表しました。テーマは「身近な不思議を科学する」。",
    photos: [
      { id: 1, caption: "発表の様子" },
      { id: 2, caption: "質疑応答タイム" },
      { id: 3, caption: "ポスターセッション" },
      { id: 4, caption: "集合写真" },
    ],
  },
  {
    id: 2,
    title: "秋の探究発表会 2025",
    date: "2025年10月18日",
    description: "2学期の探究テーマ「地域の課題を考える」の発表会を開催しました。",
    photos: [
      { id: 5, caption: "プレゼンテーション" },
      { id: 6, caption: "保護者参観" },
      { id: 7, caption: "グループワーク展示" },
    ],
  },
  {
    id: 3,
    title: "夏の特別プログラム 2025",
    date: "2025年8月10日",
    description: "夏休み特別企画「自然の中で探究しよう」フィールドワークの記録。",
    photos: [
      { id: 8, caption: "フィールドワーク" },
      { id: 9, caption: "観察記録" },
      { id: 10, caption: "まとめ発表" },
    ],
  },
];

// Placeholder color generator based on photo id
function placeholderBg(id) {
  const colors = ["#E8F5EE", "#FFF8E1", "#E3F2FD", "#FDE8E8", "#F3E5F5", "#E0F2F1"];
  return colors[id % colors.length];
}

function PhotoCard({ photo }) {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${BRAND.borderLight}`,
        background: BRAND.white,
      }}
    >
      <div
        style={{
          height: 140,
          background: placeholderBg(photo.id),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          color: BRAND.textLight,
        }}
      >
        📷
      </div>
      <div style={{ padding: "10px 12px", fontSize: 12, color: BRAND.textMuted, textAlign: "center" }}>
        {photo.caption}
      </div>
    </div>
  );
}

function EventSection({ event, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 14,
        border: `1px solid ${BRAND.borderLight}`,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: "20px 24px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.primaryDark, marginBottom: 4 }}>
            {event.title}
          </div>
          <div style={{ fontSize: 13, color: BRAND.textMuted }}>
            {event.date}　・　{event.photos.length}枚
          </div>
        </div>
        <span style={{ fontSize: 18, color: BRAND.textLight, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ fontSize: 13, color: BRAND.textMuted, lineHeight: 1.6, marginBottom: 16 }}>
            {event.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {event.photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  const [openId, setOpenId] = useState(EVENTS[0]?.id);

  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>📸</span> 探究発表会ギャラリー
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 8, lineHeight: 1.6 }}>
          探究発表会やイベントの様子をご覧いただけます。
        </p>
      </div>

      {EVENTS.map((event) => (
        <EventSection
          key={event.id}
          event={event}
          isOpen={openId === event.id}
          onToggle={() => setOpenId(openId === event.id ? null : event.id)}
        />
      ))}

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
          <strong style={{ color: BRAND.text }}>写真について</strong>
          <br />
          掲載写真のダウンロード・SNS等への転載はご遠慮ください。個別の写真データをご希望の場合はスタッフまでお声がけください。
        </div>
      </div>
    </div>
  );
}
