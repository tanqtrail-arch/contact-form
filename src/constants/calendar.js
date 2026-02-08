// Calendar Data 2025 (fiscal year)
export const CALENDAR_2025 = [
  {
    month: 4,
    events: [
      { date: "4/5", label: "春期スタート", type: "start" },
      { date: "4/12", label: "保護者説明会", type: "event" },
      { date: "4/29", label: "昭和の日（休講）", type: "holiday" },
    ],
  },
  {
    month: 5,
    events: [
      { date: "5/3-5/6", label: "GW休講", type: "holiday" },
      { date: "5/17", label: "探究発表会", type: "event" },
    ],
  },
  {
    month: 6,
    events: [
      { date: "6/14", label: "個別面談週間", type: "meeting" },
      { date: "6/28", label: "前期中間まとめ", type: "event" },
    ],
  },
  {
    month: 7,
    events: [
      { date: "7/19", label: "前期終了", type: "end" },
      { date: "7/21-8/31", label: "夏期特別講座", type: "special" },
    ],
  },
  {
    month: 8,
    events: [
      { date: "8/11-8/16", label: "お盆休み", type: "holiday" },
      { date: "8/24", label: "夏の探究発表会", type: "event" },
    ],
  },
  {
    month: 9,
    events: [
      { date: "9/1", label: "後期スタート", type: "start" },
      { date: "9/15", label: "敬老の日（休講）", type: "holiday" },
    ],
  },
  {
    month: 10,
    events: [
      { date: "10/13", label: "体育の日（休講）", type: "holiday" },
      { date: "10/25", label: "ハロウィン探究", type: "special" },
    ],
  },
  {
    month: 11,
    events: [
      { date: "11/3", label: "文化の日（休講）", type: "holiday" },
      { date: "11/15", label: "後期面談週間", type: "meeting" },
      { date: "11/29", label: "探究発表会", type: "event" },
    ],
  },
  {
    month: 12,
    events: [
      { date: "12/21", label: "後期終了", type: "end" },
      { date: "12/23-1/6", label: "冬期休講", type: "holiday" },
    ],
  },
  {
    month: 1,
    events: [
      { date: "1/7", label: "3学期スタート", type: "start" },
      { date: "1/13", label: "成人の日（休講）", type: "holiday" },
    ],
  },
  {
    month: 2,
    events: [
      { date: "2/11", label: "建国記念日（休講）", type: "holiday" },
      { date: "2/22", label: "年度末面談", type: "meeting" },
    ],
  },
  {
    month: 3,
    events: [
      { date: "3/15", label: "年度末発表会", type: "event" },
      { date: "3/21", label: "春分の日（休講）", type: "holiday" },
      { date: "3/28", label: "年度終了", type: "end" },
    ],
  },
];

export const EVENT_COLORS = {
  start: { bg: "#E8F5EE", text: "#1B6B4A", dot: "#1B6B4A" },
  end: { bg: "#FFF3E0", text: "#B8860B", dot: "#E8A838" },
  event: { bg: "#E3F2FD", text: "#1565C0", dot: "#1976D2" },
  holiday: { bg: "#FFEBEE", text: "#C44B4B", dot: "#E57373" },
  meeting: { bg: "#F3E5F5", text: "#7B1FA2", dot: "#AB47BC" },
  special: { bg: "#FFF8E1", text: "#F57F17", dot: "#FFB300" },
};

export const MONTH_NAMES = [
  "",
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
