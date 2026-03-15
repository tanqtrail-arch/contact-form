import { useState } from "react";
import { BRAND } from "../constants/brand";
import { s } from "../utils/styles";

const FAQ_CATEGORIES = [
  {
    category: "授業について",
    icon: "📚",
    items: [
      {
        q: "授業の持ち物を教えてください。",
        a: "筆記用具、ノート（探究ノート）、水筒をお持ちください。特別な教材が必要な場合は事前にLINEでお知らせします。",
      },
      {
        q: "授業に遅刻する場合はどうすればいいですか？",
        a: "遅刻連絡フォームからご連絡ください。到着予定時刻をお知らせいただけると助かります。途中からでも授業に参加できます。",
      },
      {
        q: "授業を欠席した場合、振替はできますか？",
        a: "月内での振替が可能です。欠席連絡フォームの補足欄に振替希望日をご記入いただくか、LINEでご相談ください。",
      },
      {
        q: "授業の見学はできますか？",
        a: "随時見学を受け付けております。事前にLINEまたはお電話にてご予約ください。",
      },
    ],
  },
  {
    category: "送迎・安全",
    icon: "🚗",
    items: [
      {
        q: "送迎の際のルールはありますか？",
        a: "教室前は駐車禁止です。近隣のコインパーキングをご利用いただくか、教室前での乗降をお願いします。授業開始5分前から入室できます。",
      },
      {
        q: "子どもだけで通わせても大丈夫ですか？",
        a: "小学3年生以上であれば、保護者の同意のもとお一人での通塾が可能です。入退室時にLINEで通知をお送りするサービスもございます。",
      },
      {
        q: "災害や警報が出た場合はどうなりますか？",
        a: "授業開始2時間前の時点で暴風警報が発令されている場合は休講とし、LINEおよび当ポータルの緊急連絡バナーでお知らせします。",
      },
    ],
  },
  {
    category: "費用・手続き",
    icon: "💰",
    items: [
      {
        q: "月謝の支払い方法を教えてください。",
        a: "口座振替（毎月27日引落）となります。入会時に口座振替の手続きをお願いしております。",
      },
      {
        q: "休会・退会の手続きはどうすればいいですか？",
        a: "休会・退会をご希望の場合は、前月15日までにLINEまたは面談にてお申し出ください。",
      },
      {
        q: "兄弟割引はありますか？",
        a: "ご兄弟でご通塾の場合、2人目以降の月謝を10%割引いたします。詳しくはスタッフまでお問い合わせください。",
      },
    ],
  },
  {
    category: "保護者セミナー",
    icon: "🎓",
    items: [
      {
        q: "保護者セミナーは必ず参加しないといけませんか？",
        a: "任意参加です。ただし、お子さまの学びをより深く理解していただける内容ですので、ぜひご参加ください。",
      },
      {
        q: "オンラインで参加できますか？",
        a: "一部のセミナーはオンライン同時配信を行っています。各セミナーの詳細ページで配信の有無をご確認ください。",
      },
    ],
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: `1px solid ${BRAND.borderLight}`,
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "16px 0",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1 }}>
          <span style={{ color: BRAND.primary, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Q</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.text, lineHeight: 1.6 }}>{item.q}</span>
        </div>
        <span style={{ fontSize: 14, color: BRAND.textLight, flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          ▼
        </span>
      </div>
      {open && (
        <div style={{ padding: "0 0 16px 25px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: BRAND.accent, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>A</span>
          <span style={{ fontSize: 13, color: BRAND.textMuted, lineHeight: 1.8 }}>{item.a}</span>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div>
      <div style={s.card}>
        <div style={s.cardTitle}>
          <span>❓</span> よくある質問
        </div>
        <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 8, lineHeight: 1.6 }}>
          保護者の皆さまからよくいただくご質問をまとめました。
        </p>
      </div>

      {FAQ_CATEGORIES.map((cat) => (
        <div
          key={cat.category}
          style={{
            background: BRAND.white,
            borderRadius: 14,
            border: `1px solid ${BRAND.borderLight}`,
            padding: "24px 28px",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.primaryDark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span>{cat.icon}</span> {cat.category}
          </div>
          {cat.items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
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
        <span style={{ fontSize: 20, lineHeight: 1 }}>💬</span>
        <div style={{ fontSize: 13, color: BRAND.textMuted, lineHeight: 1.7 }}>
          <strong style={{ color: BRAND.text }}>上記以外のご質問</strong>
          <br />
          こちらに記載のないご質問は、LINE公式アカウントまたは面談予約からお気軽にお問い合わせください。
        </div>
      </div>
    </div>
  );
}
