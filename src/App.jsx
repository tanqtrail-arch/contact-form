import { useState } from "react";
import { BRAND, NAV_ITEMS } from "./constants/brand";
import { s } from "./utils/styles";
import HomePage from "./pages/HomePage";
import AbsencePage from "./pages/AbsencePage";
import CalendarPage from "./pages/CalendarPage";
import BookingPage from "./pages/BookingPage";
import SeminarPage from "./pages/SeminarPage";

const PAGES = {
  home: HomePage,
  absence: AbsencePage,
  calendar: CalendarPage,
  booking: BookingPage,
  seminar: SeminarPage,
};

export default function App() {
  const [page, setPage] = useState("home");

  const PageComponent = PAGES[page] || HomePage;

  return (
    <div style={s.app}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.headerTop}>
            <div style={s.logo}>
              <div style={s.logoMark}>T</div>
              <div>
                <div style={s.logoText}>TRAIL</div>
                <div style={s.logoSub}>探究教室 保護者ポータル</div>
              </div>
            </div>
          </div>
          <nav style={s.nav}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                style={s.navItem(page === item.id)}
                onClick={() => setPage(item.id)}
                onMouseEnter={(e) => {
                  if (page !== item.id) e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  if (page !== item.id) e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main style={s.main}>
        <PageComponent setPage={setPage} />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: BRAND.primaryDark,
          color: "rgba(255,255,255,0.6)",
          padding: "24px",
          textAlign: "center",
          fontSize: 12,
        }}
      >
        <div
          style={{
            marginBottom: 4,
            color: "rgba(255,255,255,0.8)",
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          探究教室 TRAIL
        </div>
        © 2026 TRAIL — 自分で考える習慣を作る場所
      </footer>
    </div>
  );
}
