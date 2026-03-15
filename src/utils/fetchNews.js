import { GAS_URL } from "../constants/brand";

const FALLBACK_NEWS = [
  { date: "2026.02.05", text: "2月の面談予約を受け付けています", tag: "面談" },
  { date: "2026.01.28", text: "3学期の授業スケジュールを更新しました", tag: "更新" },
  { date: "2026.01.15", text: "冬の探究発表会の写真を公開しました", tag: "イベント" },
];

export async function fetchNews() {
  if (GAS_URL === "YOUR_GAS_WEB_APP_URL_HERE") {
    return { news: FALLBACK_NEWS, emergency: null };
  }
  try {
    const res = await fetch(`${GAS_URL}?type=news`, { method: "GET" });
    const data = await res.json();
    return {
      news: Array.isArray(data.news) && data.news.length > 0 ? data.news : FALLBACK_NEWS,
      emergency: data.emergency || null,
    };
  } catch {
    return { news: FALLBACK_NEWS, emergency: null };
  }
}
