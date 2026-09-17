import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MapPin, Fuel, Navigation, Menu, X, Check, Clock, ShieldCheck, ChevronRight,
  ChevronLeft, Bike, Car, Truck, Package, Phone, Star, TrendingUp, Users,
  Wallet, AlertCircle, Bell, LogOut, Plus, Search, Filter, Battery,
  CircleDot, Loader2, ArrowRight, BadgeCheck, XCircle, PauseCircle,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

/* ------------------------------------------------------------------ */
/* DESIGN TOKENS + GLOBAL STYLE                                        */
/* ------------------------------------------------------------------ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .fg-root {
      --bg: #090C13;
      --bg-soft: #0D111B;
      --surface: #131828;
      --surface-2: #1A2033;
      --border: #232B41;
      --border-soft: #1A2033;
      --text: #F1F3FA;
      --text-muted: #8991A8;
      --text-dim: #5A6379;
      --accent: #FF6B35;
      --accent-2: #FF8F5C;
      --accent-soft: rgba(255,107,53,0.14);
      --route: #4C8DFF;
      --route-soft: rgba(76,141,255,0.14);
      --success: #35D69B;
      --success-soft: rgba(53,214,155,0.14);
      --warn: #F5B942;
      --warn-soft: rgba(245,185,66,0.14);
      --danger: #F45B69;
      --danger-soft: rgba(244,91,105,0.14);
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    .fg-root * { box-sizing: border-box; }
    .fg-display { font-family: 'Bricolage Grotesque', sans-serif; }
    .fg-root ::selection { background: var(--accent-soft); }
    .fg-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
    .fg-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

    .fg-card {
      background: var(--surface);
      border: 1px solid var(--border-soft);
      border-radius: 18px;
    }
    .fg-card-flat {
      background: var(--bg-soft);
      border: 1px solid var(--border-soft);
      border-radius: 14px;
    }
    .fg-btn {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform .15s ease, background .15s ease, opacity .15s ease, border-color .15s ease;
      white-space: nowrap;
    }
    .fg-btn:active { transform: scale(0.97); }
    .fg-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .fg-btn-primary { background: linear-gradient(135deg, var(--accent-2), var(--accent)); color: #17110C; padding: 13px 22px; font-size: 14.5px; }
    .fg-btn-primary:hover:not(:disabled) { filter: brightness(1.06); }
    .fg-btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border); padding: 12px 21px; font-size: 14.5px; }
    .fg-btn-outline:hover:not(:disabled) { border-color: var(--text-dim); }
    .fg-btn-ghost { background: var(--surface-2); color: var(--text); padding: 10px 16px; font-size: 13.5px; }
    .fg-btn-ghost:hover:not(:disabled) { background: var(--border); }
    .fg-btn-sm { padding: 8px 14px; font-size: 13px; }
    .fg-input {
      width: 100%;
      background: var(--bg-soft);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 11px;
      padding: 12px 14px;
      font-size: 14.5px;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color .15s ease;
    }
    .fg-input:focus { border-color: var(--accent); }
    .fg-input::placeholder { color: var(--text-dim); }
    .fg-label { font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 7px; display: block; }
    .fg-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 700;
      letter-spacing: 0.02em;
    }
    .fg-link { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color .15s; }
    .fg-link:hover { color: var(--text); }
    .fg-choice {
      border: 1px solid var(--border);
      background: var(--bg-soft);
      border-radius: 14px;
      padding: 14px;
      cursor: pointer;
      transition: border-color .15s, background .15s;
      text-align: left;
    }
    .fg-choice:hover { border-color: var(--text-dim); }
    .fg-choice.active { border-color: var(--accent); background: var(--accent-soft); }
    .fg-focusable:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    @keyframes fg-spin { to { transform: rotate(360deg); } }
    .fg-spin { animation: fg-spin 1s linear infinite; }
    @keyframes fg-pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
    .fg-pulse { animation: fg-pulse 1.8s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .fg-spin, .fg-pulse { animation: none; }
    }
    table.fg-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    table.fg-table th { text-align: left; color: var(--text-dim); font-weight: 600; font-size: 11.5px; text-transform: none; padding: 10px 12px; border-bottom: 1px solid var(--border-soft); white-space: nowrap; }
    table.fg-table td { padding: 12px; border-bottom: 1px solid var(--border-soft); color: var(--text); white-space: nowrap; }
    table.fg-table tr:last-child td { border-bottom: none; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/* DEMO DATA                                                           */
/* ------------------------------------------------------------------ */
const DemoTag = ({ style }) => (
  <span className="fg-pill" style={{ background: "var(--warn-soft)", color: "var(--warn)", ...style }}>
    <CircleDot size={10} /> DEMO DATA
  </span>
);

const NEARBY_PARTNERS = [
  { id: "P-104", name: "Highway Aid – Velachery", distance: "1.2 km", eta: "8 min", status: "Available" },
  { id: "P-118", name: "QuickFuel Partners – OMR", distance: "2.1 km", eta: "11 min", status: "Available" },
  { id: "P-092", name: "SafeStop Services – Guindy", distance: "3.4 km", eta: "16 min", status: "Busy" },
];

const PARTNER_DIRECTORY = [
  { id: "P-104", name: "Highway Aid – Velachery", contact: "R. Kannan", phone: "9840XXX210", area: "South Chennai", status: "Verified", jobs: 412, rating: 4.8 },
  { id: "P-118", name: "QuickFuel Partners – OMR", contact: "S. Priya", phone: "9940XXX882", area: "OMR Corridor", status: "Verified", jobs: 288, rating: 4.6 },
  { id: "P-092", name: "SafeStop Services – Guindy", contact: "M. Arjun", phone: "9600XXX045", area: "Guindy – Velachery", status: "Verified", jobs: 351, rating: 4.7 },
  { id: "P-133", name: "RoadReady Assist – Tambaram", contact: "K. Divya", phone: "9884XXX773", area: "Tambaram", status: "Pending verification", jobs: 0, rating: null },
  { id: "P-076", name: "MotionFuel Co – Anna Nagar", contact: "V. Suresh", phone: "9003XXX519", area: "Anna Nagar", status: "Suspended", jobs: 94, rating: 3.9 },
];

const CUSTOMER_DIRECTORY = [
  { id: "C-2291", name: "Arun Ramesh", mobile: "98407XXXXX", requests: 6, since: "Feb 2026", status: "Active" },
  { id: "C-2288", name: "Meena Iyer", mobile: "99401XXXXX", requests: 2, since: "Apr 2026", status: "Active" },
  { id: "C-2270", name: "Dinesh Kumar", mobile: "90031XXXXX", requests: 11, since: "Nov 2025", status: "Active" },
  { id: "C-2201", name: "Sherin Thomas", mobile: "96001XXXXX", requests: 1, since: "Jun 2026", status: "Deactivated" },
];

const REQUEST_LOG = [
  { id: "FG-58231", type: "fuel", customer: "Arun R.", location: "Velachery Main Rd", vehicle: "Car", service: "Petrol · 5L", partner: "Highway Aid", status: "Completed", amount: 525, time: "09:14 AM" },
  { id: "FG-58230", type: "fuel", customer: "Meena I.", location: "OMR, Sholinganallur", vehicle: "Scooter", service: "Petrol · 2L", partner: "QuickFuel Partners", status: "Completed", amount: 210, time: "08:52 AM" },
  { id: "FG-58229", type: "tow", customer: "Dinesh K.", location: "GST Road, Tambaram", vehicle: "Van", service: "Tow to AutoCare SC", partner: "SafeStop Services", status: "Cancelled", amount: 0, time: "08:20 AM" },
  { id: "FG-58228", type: "battery", customer: "Sherin T.", location: "Anna Nagar West", vehicle: "Bike", service: "35Ah battery", partner: "—", status: "Pending", amount: 0, time: "07:58 AM" },
  { id: "FG-58227", type: "fuel", customer: "Arun R.", location: "ECR, Neelankarai", vehicle: "Car", service: "Petrol · 5L", partner: "Highway Aid", status: "Completed", amount: 450, time: "Yesterday" },
  { id: "FG-58226", type: "parts", customer: "Meena I.", location: "Sholinganallur", vehicle: "Car", service: "Wiper blade, Fuse kit", partner: "QuickFuel Partners", status: "Completed", amount: 380, time: "Yesterday" },
  { id: "FG-58225", type: "tow", customer: "Dinesh K.", location: "Tambaram", vehicle: "Van", service: "Tow to RRS Workshop", partner: "SafeStop Services", status: "Pending", amount: 0, time: "Yesterday" },
];

const REVENUE_TREND = [
  { month: "Apr", revenue: 182000, payout: 118000 },
  { month: "May", revenue: 214000, payout: 139000 },
  { month: "Jun", revenue: 239000, payout: 154000 },
  { month: "Jul", revenue: 261000, payout: 168000 },
  { month: "Aug", revenue: 298000, payout: 191000 },
  { month: "Sep", revenue: 271000, payout: 176000 },
];

const OPERATING_EXPENSES = [
  { id: 1, label: "Technology & hosting", amount: 24000 },
  { id: 2, label: "Marketing", amount: 31000 },
  { id: 3, label: "Support operations", amount: 18500 },
  { id: 4, label: "Insurance & compliance", amount: 12000 },
];

const CUSTOMER_GROWTH = [
  { month: "Apr", customers: 1840 }, { month: "May", customers: 2010 },
  { month: "Jun", customers: 2205 }, { month: "Jul", customers: 2360 },
  { month: "Aug", customers: 2480 }, { month: "Sep", customers: 2548 },
];

const BY_VEHICLE = [
  { name: "Car", value: 44 }, { name: "Bike", value: 27 },
  { name: "Scooter", value: 19 }, { name: "Van", value: 10 },
];
const PIE_COLORS = ["#FF6B35", "#4C8DFF", "#35D69B", "#F5B942"];

const MONTHLY_TX = [
  { month: "Apr", requests: 612 }, { month: "May", requests: 705 },
  { month: "Jun", requests: 788 }, { month: "Jul", requests: 861 },
  { month: "Aug", requests: 940 }, { month: "Sep", requests: 986 },
];

const PARTNER_PCT = 0.65; // configured payout share used for demo P&L math

/* ------------------------------------------------------------------ */
/* SMALL SHARED UI                                                     */
/* ------------------------------------------------------------------ */
const Logo = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="fgGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF9A6B" />
        <stop offset="1" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
    <path d="M24 4C24 4 9 21.5 9 30.5C9 39 15.7 44 24 44C32.3 44 39 39 39 30.5C39 21.5 24 4 24 4Z" fill="url(#fgGrad)" />
    <circle cx="24" cy="31" r="5.2" fill="#12070200" stroke="#170D06" strokeWidth="2" opacity="0.35" />
    <path d="M6 41.5C13 37 35 37 42 41.5" stroke="#4C8DFF" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.5 6.5" />
  </svg>
);

const Badge = ({ children, tone = "muted" }) => {
  const tones = {
    muted: { bg: "var(--surface-2)", c: "var(--text-muted)" },
    success: { bg: "var(--success-soft)", c: "var(--success)" },
    warn: { bg: "var(--warn-soft)", c: "var(--warn)" },
    danger: { bg: "var(--danger-soft)", c: "var(--danger)" },
    route: { bg: "var(--route-soft)", c: "var(--route)" },
    accent: { bg: "var(--accent-soft)", c: "var(--accent)" },
  };
  const t = tones[tone] || tones.muted;
  return <span className="fg-pill" style={{ background: t.bg, color: t.c }}>{children}</span>;
};

const StatCard = ({ icon: Icon, label, value, sub, tone = "accent" }) => (
  <div className="fg-card" style={{ padding: "18px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ color: "var(--text-muted)", fontSize: 12.5, fontWeight: 600 }}>{label}</span>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: `var(--${tone}-soft)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={15} color={`var(--${tone})`} />
      </div>
    </div>
    <div className="fg-display" style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>{sub}</div>}
  </div>
);

const EmptyState = ({ icon: Icon = AlertCircle, title, sub, action }) => (
  <div style={{ textAlign: "center", padding: "44px 20px", color: "var(--text-muted)" }}>
    <div style={{ width: 46, height: 46, margin: "0 auto 14px", borderRadius: 13, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={20} color="var(--text-dim)" />
    </div>
    <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
    {sub && <div style={{ fontSize: 13.5, maxWidth: 320, margin: "0 auto" }}>{sub}</div>}
    {action && <div style={{ marginTop: 16 }}>{action}</div>}
  </div>
);

const Loader = ({ label = "Loading…" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: 13.5, padding: "28px 0", justifyContent: "center" }}>
    <Loader2 size={16} className="fg-spin" /> {label}
  </div>
);

const SectionHeading = ({ eyebrow, title, sub, align = "left" }) => (
  <div style={{ textAlign: align, marginBottom: 30, maxWidth: align === "center" ? 620 : "none", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
    {eyebrow && <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{eyebrow}</div>}
    <h2 className="fg-display" style={{ fontSize: "clamp(22px,3.4vw,32px)", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>{title}</h2>
    {sub && <p style={{ color: "var(--text-muted)", marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

const STATUS_TONE = {
  Completed: "success", Pending: "warn", Cancelled: "danger", Active: "route",
  Available: "success", Busy: "warn", Verified: "success", Suspended: "danger",
  "Pending verification": "warn", Rejected: "danger", Deactivated: "danger", Refunded: "route",
};

/* ------------------------------------------------------------------ */
/* NAV + FOOTER                                                        */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "find", label: "Find Assistance" },
  { id: "how", label: "How It Works" },
  { id: "partners-info", label: "For Partners" },
  { id: "safety", label: "Safety" },
  { id: "about", label: "About" },
];

const NavBar = ({ page, go, role, setRole }) => {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(9,12,19,0.86)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-soft)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => go("home")} className="fg-focusable" style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Logo />
          <span className="fg-display" style={{ fontWeight: 700, fontSize: 19, color: "var(--text)" }}>FuelGo</span>
        </button>

        <nav className="fg-scroll" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="fg-focusable fg-desktop-nav"
              style={{ background: "none", border: "none", cursor: "pointer", color: page === l.id ? "var(--text)" : "var(--text-muted)", fontSize: 13.6, fontWeight: 600, padding: "8px 12px" }}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="fg-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {role ? (
            <button onClick={() => go(role === "customer" ? "customerDashboard" : role === "partner" ? "partnerDashboard" : "adminDashboard")} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable">
              <Users size={14} /> {role === "customer" ? "Dashboard" : role === "partner" ? "Partner Panel" : "Admin Panel"}
            </button>
          ) : (
            <button onClick={() => go("login")} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable">Login</button>
          )}
          <button onClick={() => go("request")} className="fg-btn fg-btn-primary fg-btn-sm fg-focusable">
            <Fuel size={14} /> Request Assistance
          </button>
        </div>

        <button className="fg-mobile-toggle fg-focusable" onClick={() => setOpen((o) => !o)} style={{ background: "var(--surface-2)", border: "none", borderRadius: 10, width: 38, height: 38, alignItems: "center", justifyContent: "center", cursor: "pointer", display: "none" }}>
          {open ? <X size={18} color="var(--text)" /> : <Menu size={18} color="var(--text)" />}
        </button>
      </div>

      {open && (
        <div className="fg-mobile-menu" style={{ borderTop: "1px solid var(--border-soft)", padding: "10px 20px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => { go(l.id); setOpen(false); }} className="fg-focusable" style={{ textAlign: "left", background: "none", border: "none", padding: "11px 4px", color: "var(--text)", fontSize: 15, fontWeight: 500, borderBottom: "1px solid var(--border-soft)" }}>
              {l.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button onClick={() => { go(role ? (role === "customer" ? "customerDashboard" : role === "partner" ? "partnerDashboard" : "adminDashboard") : "login"); setOpen(false); }} className="fg-btn fg-btn-outline" style={{ flex: 1 }}>{role ? "Dashboard" : "Login"}</button>
            <button onClick={() => { go("request"); setOpen(false); }} className="fg-btn fg-btn-primary" style={{ flex: 1 }}>Request</button>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 880px) {
          .fg-desktop-nav { display: none !important; }
          .fg-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

const Footer = ({ go }) => (
  <footer style={{ borderTop: "1px solid var(--border-soft)", marginTop: 60 }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 30px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 28 }} className="fg-footer-grid">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
          <Logo size={26} /> <span className="fg-display" style={{ fontWeight: 700, fontSize: 17 }}>FuelGo</span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.6, maxWidth: 280 }}>
          A technology platform connecting customers with authorized emergency fuel-service partners.
        </p>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Company</div>
        {["about", "safety", "partners-info", "investors"].map((id) => (
          <div key={id}><button onClick={() => go(id)} className="fg-link fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 0", display: "block" }}>
            {{ about: "About Us", safety: "Safety", "partners-info": "For Partners", investors: "For Investors" }[id]}
          </button></div>
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Support</div>
        {["faq", "contact", "how"].map((id) => (
          <div key={id}><button onClick={() => go(id)} className="fg-link fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 0", display: "block" }}>
            {{ faq: "FAQ", contact: "Contact", how: "How It Works" }[id]}
          </button></div>
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Legal</div>
        {["privacy", "terms"].map((id) => (
          <div key={id}><button onClick={() => go(id)} className="fg-link fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 0", display: "block" }}>
            {{ privacy: "Privacy Policy", terms: "Terms of Service" }[id]}
          </button></div>
        ))}
      </div>
    </div>
    <div style={{ borderTop: "1px solid var(--border-soft)", padding: "16px 20px", textAlign: "center", color: "var(--text-dim)", fontSize: 12.5 }}>
      © 2026 FuelGo Technologies. Prototype build for demonstration purposes — not a live commercial service.
    </div>
    <style>{`@media (max-width: 720px) { .fg-footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
  </footer>
);

/* ------------------------------------------------------------------ */
/* HERO BACKGROUND (light trails)                                      */
/* ------------------------------------------------------------------ */
const HeroBackground = () => (
  <svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} aria-hidden="true">
    <defs>
      <linearGradient id="trail1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF6B35" stopOpacity="0" /><stop offset="50%" stopColor="#FF6B35" stopOpacity="0.55" /><stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="trail2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4C8DFF" stopOpacity="0" /><stop offset="50%" stopColor="#4C8DFF" stopOpacity="0.45" /><stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.25" /><stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="920" cy="120" r="260" fill="url(#glow)" />
    <path d="M-50 480 C 250 380, 450 560, 750 420 S 1250 300, 1300 340" stroke="url(#trail1)" strokeWidth="2.5" fill="none" />
    <path d="M-50 560 C 300 500, 500 620, 800 500 S 1200 420, 1300 460" stroke="url(#trail2)" strokeWidth="2" fill="none" />
    <path d="M-50 340 C 250 260, 500 380, 780 260 S 1150 160, 1300 200" stroke="url(#trail1)" strokeWidth="1.5" fill="none" opacity="0.6" />
    {[...Array(28)].map((_, i) => (
      <circle key={i} cx={(i * 47) % 1200} cy={((i * 91) % 620)} r={i % 5 === 0 ? 1.6 : 0.9} fill="#5A6379" opacity="0.5" />
    ))}
  </svg>
);

/* ------------------------------------------------------------------ */
/* HOME PAGE                                                           */
/* ------------------------------------------------------------------ */
const VehicleIcon = { Bike, Scooter: Bike, Car, Van: Truck, Other: Package };

const HomePage = ({ go }) => (
  <div>
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-soft)" }}>
      <HeroBackground />
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "88px 20px 70px" }}>
        <Badge tone="accent"><ShieldCheck size={12} /> Emergency fuel assistance, connected</Badge>
        <h1 className="fg-display" style={{ fontSize: "clamp(34px,6vw,58px)", fontWeight: 800, lineHeight: 1.06, margin: "20px 0 18px", maxWidth: 700 }}>
          Ran out of fuel?<br />Don't get stranded.
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 540, lineHeight: 1.65, marginBottom: 30 }}>
          FuelGo connects you with authorized emergency fuel-service partners when you need assistance on the road.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => go("request")} className="fg-btn fg-btn-primary fg-focusable" style={{ padding: "15px 26px", fontSize: 15.5 }}>
            <Fuel size={17} /> Request Fuel Assistance
          </button>
          <button onClick={() => go("how")} className="fg-btn fg-btn-outline fg-focusable" style={{ padding: "15px 26px", fontSize: 15.5 }}>
            How It Works
          </button>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
          {[["14 min", "avg. response"], ["Verified only", "authorized partners"], ["24/7", "request availability"]].map(([a, b]) => (
            <div key={b}>
              <div className="fg-display" style={{ fontSize: 22, fontWeight: 700 }}>{a}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Live service concept */}
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="fg-display" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Available assistance near you</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginTop: 4 }}>A concept view of partner availability in your area.</p>
        </div>
        <DemoTag />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="fg-partner-grid">
        {NEARBY_PARTNERS.map((p) => (
          <div key={p.id} className="fg-card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--route-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Navigation size={17} color="var(--route)" />
              </div>
              <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 4 }}>{p.name}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, display: "flex", gap: 14 }}>
              <span><MapPin size={12} style={{ verticalAlign: -1 }} /> {p.distance}</span>
              <span><Clock size={12} style={{ verticalAlign: -1 }} /> ETA {p.eta}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 820px) { .fg-partner-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>

    {/* How it works */}
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 20px 60px" }}>
      <SectionHeading eyebrow="THE FLOW" title="Four steps to get moving again" sub="Built for a stressful moment — every step is short, clear, and mobile-first." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="fg-steps-grid">
        {[
          { n: "1", t: "Share your location", d: "Use your current location or enter it manually — nothing is accessed without your action.", i: MapPin },
          { n: "2", t: "Tell us your vehicle", d: "Vehicle type and fuel requirement, matched to what partners can safely provide.", i: Car },
          { n: "3", t: "Get matched", d: "We connect you with the nearest verified, available partner.", i: Navigation },
          { n: "4", t: "Track & confirm", d: "Watch live status from dispatch to arrival, then rate your experience.", i: Check },
        ].map((s) => (
          <div key={s.n} className="fg-card-flat" style={{ padding: 20 }}>
            <s.i size={18} color="var(--accent)" />
            <div style={{ fontWeight: 700, fontSize: 14.5, margin: "12px 0 6px" }}>{s.t}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.55 }}>{s.d}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 900px) { .fg-steps-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { .fg-steps-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>

    {/* Need more than fuel */}
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 60px" }}>
      <div className="fg-card" style={{ padding: "30px 26px", background: "linear-gradient(135deg, var(--surface), var(--surface-2))" }}>
        <Badge tone="route">FUTURE / PARTNER SERVICES</Badge>
        <h3 className="fg-display" style={{ fontSize: 21, fontWeight: 700, margin: "12px 0 8px" }}>Need more than fuel?</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 560, marginBottom: 18 }}>
          These roadside categories are shown for our platform roadmap. They are not guaranteed to be currently available in your area.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="fg-need-grid">
          {[["Fuel assistance", Fuel, "success"], ["Tyre assistance", CircleDot, "route"], ["Battery assistance", Battery, "warn"], ["Towing assistance", Truck, "accent"]].map(([label, Icon, tone]) => (
            <div key={label} style={{ background: "var(--bg-soft)", border: "1px solid var(--border-soft)", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={16} color={`var(--${tone})`} /> <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .fg-need-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  </div>
);

/* ------------------------------------------------------------------ */
/* REQUEST ASSISTANCE FLOW                                             */
/* ------------------------------------------------------------------ */
const SERVICE_TYPES = [
  { key: "fuel", label: "Fuel", sub: "Petrol or diesel top-up", icon: Fuel, tone: "accent" },
  { key: "battery", label: "Battery", sub: "Jumpstart or replacement", icon: Battery, tone: "warn" },
  { key: "parts", label: "Spare Parts & Tools", sub: "Small parts, on the spot", icon: Package, tone: "route" },
  { key: "tow", label: "Vehicle Pickup / Tow", sub: "Ride your vehicle to a service center", icon: Truck, tone: "success" },
];

const FUEL_RATE = { Petrol: 105, Diesel: 92 }; // ₹ per litre, demo
const FUEL_LITRES = {
  Bike: [1, 2], Scooter: [1, 2], Car: [5, 10], Van: [5, 10], Other: [2],
};

const BATTERY_OPTIONS = {
  Bike: [{ spec: "35Ah", price: 2800 }, { spec: "45Ah", price: 3400 }],
  Scooter: [{ spec: "35Ah", price: 2800 }, { spec: "45Ah", price: 3400 }],
  Car: [{ spec: "65Ah", price: 6200 }, { spec: "88Ah", price: 8900 }],
  Van: [{ spec: "88Ah", price: 8900 }, { spec: "100Ah", price: 10400 }],
  Other: [{ spec: "Jumpstart only", price: 350 }],
};

const PARTS_CATALOG = [
  { id: "oil", name: "Engine oil (1L)", price: 450 },
  { id: "plug", name: "Spark plug", price: 150 },
  { id: "fuse", name: "Fuse kit", price: 80 },
  { id: "puncture", name: "Tyre puncture kit", price: 250 },
  { id: "wiper", name: "Wiper blade", price: 300 },
  { id: "jumper", name: "Jumper cable", price: 350 },
];

const TOW_BASE_FARE = 150;
const TOW_PER_KM = 18;

const QUANTITY_OPTIONS = FUEL_LITRES;

const StepDots = ({ step, total = 6 }) => (
  <div style={{ display: "flex", gap: 6, marginBottom: 26 }}>
    {[...Array(total)].map((_, i) => (
      <div key={i} style={{ height: 4, flex: 1, borderRadius: 4, background: i < step ? "var(--accent)" : "var(--border)" }} />
    ))}
  </div>
);

const RequestFlow = ({ go, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    serviceType: "", locMode: "", locText: "", dropText: "", vehicle: "",
    fuel: "", litres: null, battery: null, parts: [],
    name: "", mobile: "", email: "", reg: "", notes: "",
  });
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [payMethod, setPayMethod] = useState("UPI");
  const [payStatus, setPayStatus] = useState("idle"); // idle, processing, success, failed

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleParts = (id) => setData((d) => ({ ...d, parts: d.parts.includes(id) ? d.parts.filter((p) => p !== id) : [...d.parts, id] }));

  const useCurrentLocation = () => {
    setLocError(""); setLocLoading(true);
    setTimeout(() => {
      setLocLoading(false);
      const failed = Math.random() < 0.15;
      if (failed) { setLocError("Unable to access your location. Please enter it manually."); }
      else { set("locMode", "current"); set("locText", "Rajiv Gandhi Salai (OMR), near Perungudi — detected"); }
    }, 1100);
  };

  const isTow = data.serviceType === "tow";

  const canNext = {
    1: !!data.serviceType,
    2: data.locText.trim().length > 3 && (!isTow || data.dropText.trim().length > 3),
    3: isTow
      ? !!data.vehicle
      : data.serviceType === "fuel" ? !!(data.vehicle && data.fuel && data.litres)
      : data.serviceType === "battery" ? !!(data.vehicle && data.battery)
      : data.parts.length > 0,
    4: data.name.trim().length > 1 && /^[0-9]{10}$/.test(data.mobile),
    5: payStatus === "success",
  };

  const towDistanceKm = 6; // demo fixed distance estimate
  const estFee = isTow ? TOW_BASE_FARE + TOW_PER_KM * towDistanceKm
    : data.serviceType === "fuel" ? (data.litres || 0) * (FUEL_RATE[data.fuel] || 0)
    : data.serviceType === "battery" ? (data.battery ? data.battery.price : 0)
    : data.parts.reduce((s, id) => s + PARTS_CATALOG.find((p) => p.id === id).price, 0);

  const runPayment = () => {
    setPayStatus("processing");
    setTimeout(() => setPayStatus(Math.random() < 0.9 ? "success" : "failed"), 1400);
  };

  const summaryDetail = isTow ? `Tow to ${data.dropText || "service center"} · ~${towDistanceKm} km`
    : data.serviceType === "fuel" ? `${data.fuel} · ${data.litres} L (₹${FUEL_RATE[data.fuel]}/L)`
    : data.serviceType === "battery" ? `${data.battery?.spec}`
    : data.parts.map((id) => PARTS_CATALOG.find((p) => p.id === id).name).join(", ");

  const submit = () => {
    onConfirm({
      id: "FG-" + Math.floor(60000 + Math.random() * 900),
      type: data.serviceType,
      customer: data.name, location: data.locText, dropLocation: data.dropText,
      vehicle: data.vehicle, fuel: data.fuel, litres: data.litres, battery: data.battery,
      parts: data.parts.map((id) => PARTS_CATALOG.find((p) => p.id === id).name),
      amount: estFee, mobile: data.mobile, notes: data.notes, detail: summaryDetail,
    });
    go("tracking");
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 80px" }}>
      <button onClick={() => (step === 1 ? go("home") : setStep((s) => s - 1))} className="fg-link fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <ChevronLeft size={15} /> {step === 1 ? "Back to home" : "Back"}
      </button>
      <StepDots step={step} />

      {step === 1 && (
        <div>
          <SectionHeading title="What do you need help with?" sub="Pick a service and we'll ask a few quick questions." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {SERVICE_TYPES.map((s) => (
              <button key={s.key} onClick={() => set("serviceType", s.key)} className={`fg-choice fg-focusable ${data.serviceType === s.key ? "active" : ""}`} style={{ padding: 16 }}>
                <s.icon size={18} color={`var(--${s.tone})`} />
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 9 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>{s.sub}</div>
              </button>
            ))}
          </div>
          <button disabled={!canNext[1]} onClick={() => setStep(2)} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 16 }}>
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <SectionHeading title={isTow ? "Pickup & drop-off" : "Where are you?"} sub="Nothing is accessed until you choose an option below." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <button onClick={useCurrentLocation} className={`fg-choice fg-focusable ${data.locMode === "current" ? "active" : ""}`}>
              <Navigation size={16} color="var(--accent)" /><div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 8 }}>Use current location</div>
            </button>
            <button onClick={() => { set("locMode", "manual"); set("locText", ""); }} className={`fg-choice fg-focusable ${data.locMode === "manual" ? "active" : ""}`}>
              <MapPin size={16} color="var(--route)" /><div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 8 }}>Enter manually</div>
            </button>
          </div>
          {locLoading && <Loader label="Detecting your location…" />}
          {locError && <div style={{ background: "var(--danger-soft)", color: "var(--danger)", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14 }}>{locError}</div>}
          {(data.locMode === "manual" || (data.locMode === "current" && data.locText)) && !locLoading && (
            <div style={{ marginBottom: isTow ? 14 : 0 }}>
              <label className="fg-label">{isTow ? "Pickup location" : "Location"}</label>
              <input className="fg-input" value={data.locText} onChange={(e) => set("locText", e.target.value)} placeholder="e.g. 4th Cross Street, Besant Nagar, Chennai" />
            </div>
          )}
          {isTow && (data.locText || data.locMode) && (
            <div>
              <label className="fg-label">Drop-off — nearest service center</label>
              <input className="fg-input" value={data.dropText} onChange={(e) => set("dropText", e.target.value)} placeholder="e.g. AutoCare Service Center, Velachery" />
              <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6 }}>Like a ride-hailing pickup — a partner driver rides your vehicle to the service center you choose.</p>
            </div>
          )}
          {data.locText && (
            <div className="fg-card-flat" style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
              <svg viewBox="0 0 400 130" style={{ width: "100%", display: "block" }}>
                <rect width="400" height="130" fill="#0D111B" />
                {[...Array(9)].map((_, i) => <line key={"h" + i} x1="0" y1={i * 16} x2="400" y2={i * 16} stroke="#1A2033" strokeWidth="1" />)}
                {[...Array(20)].map((_, i) => <line key={"v" + i} x1={i * 22} y1="0" x2={i * 22} y2="130" stroke="#1A2033" strokeWidth="1" />)}
                <circle cx="200" cy="65" r="7" fill="#FF6B35" /><circle cx="200" cy="65" r="14" fill="none" stroke="#FF6B35" strokeOpacity="0.4" strokeWidth="2" />
                {isTow && <><circle cx="300" cy="40" r="6" fill="#4C8DFF" /><path d="M200 65 C 240 55, 270 48, 300 40" stroke="#4C8DFF" strokeWidth="2" strokeDasharray="4 5" fill="none" /></>}
              </svg>
              <div style={{ padding: "10px 14px", fontSize: 12.5, color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
                Map preview <DemoTag />
              </div>
            </div>
          )}
          <button disabled={!canNext[2]} onClick={() => setStep(3)} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 15, marginTop: 20 }}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <SectionHeading
            title={isTow ? "Vehicle details" : data.serviceType === "fuel" ? "Vehicle & fuel details" : data.serviceType === "battery" ? "Vehicle & battery details" : "Choose parts & tools"}
            sub="This helps us match you with a partner who can help." />

          {data.serviceType !== "parts" && (
            <>
              <label className="fg-label">Vehicle type</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 18 }} className="fg-vehicle-grid">
                {["Bike", "Scooter", "Car", "Van", "Other"].map((v) => {
                  const Icon = VehicleIcon[v];
                  return (
                    <button key={v} onClick={() => { set("vehicle", v); set("litres", null); set("battery", null); }} className={`fg-choice fg-focusable ${data.vehicle === v ? "active" : ""}`} style={{ textAlign: "center", padding: "12px 6px" }}>
                      <Icon size={17} style={{ margin: "0 auto" }} /><div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 6 }}>{v}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {data.serviceType === "fuel" && (
            <>
              <label className="fg-label">Fuel requirement</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                {["Petrol", "Diesel"].map((f) => (
                  <button key={f} onClick={() => set("fuel", f)} className={`fg-choice fg-focusable ${data.fuel === f ? "active" : ""}`}>{f} <span style={{ color: "var(--text-dim)", fontWeight: 500 }}>· ₹{FUEL_RATE[f]}/L</span></button>
                ))}
              </div>
              {data.vehicle && (
                <>
                  <label className="fg-label">Litres needed</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 6 }}>
                    {FUEL_LITRES[data.vehicle].map((l) => (
                      <button key={l} onClick={() => set("litres", l)} className={`fg-choice fg-focusable ${data.litres === l ? "active" : ""}`} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{l} litres</span>{data.fuel && <span style={{ color: "var(--text-muted)" }}>₹{l * FUEL_RATE[data.fuel]}</span>}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 16 }}>Only safe, operationally supported quantities are offered.</p>
                </>
              )}
            </>
          )}

          {data.serviceType === "battery" && data.vehicle && (
            <>
              <label className="fg-label">Battery option</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {BATTERY_OPTIONS[data.vehicle].map((b) => (
                  <button key={b.spec} onClick={() => set("battery", b)} className={`fg-choice fg-focusable ${data.battery?.spec === b.spec ? "active" : ""}`} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{b.spec}</span><span style={{ color: "var(--text-muted)" }}>₹{b.price.toLocaleString("en-IN")}</span>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 8 }}>Capacity shown so you can confirm it matches your vehicle before ordering.</p>
            </>
          )}

          {data.serviceType === "parts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PARTS_CATALOG.map((p) => (
                <button key={p.id} onClick={() => toggleParts(p.id)} className={`fg-choice fg-focusable ${data.parts.includes(p.id) ? "active" : ""}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid var(--border)", background: data.parts.includes(p.id) ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {data.parts.includes(p.id) && <Check size={11} color="#17110C" />}
                    </span>
                    {p.name}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>₹{p.price}</span>
                </button>
              ))}
            </div>
          )}

          <button disabled={!canNext[3]} onClick={() => setStep(4)} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 15, marginTop: 16 }}>Continue</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <SectionHeading title="Your details" sub="So your partner knows who to look for." />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label className="fg-label">Full name</label><input className="fg-input" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" /></div>
            <div><label className="fg-label">Mobile number</label><input className="fg-input" value={data.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" /></div>
            <div><label className="fg-label">Email (optional)</label><input className="fg-input" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></div>
            <div><label className="fg-label">Vehicle registration number (optional, demo)</label><input className="fg-input" value={data.reg} onChange={(e) => set("reg", e.target.value)} placeholder="TN 09 XX 1234" /></div>
            <div><label className="fg-label">Special instructions</label><input className="fg-input" value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="e.g. Near the flyover, silver hatchback" /></div>
          </div>
          {data.mobile && !/^[0-9]{10}$/.test(data.mobile) && <div style={{ color: "var(--danger)", fontSize: 12.5, marginTop: 8 }}>Enter a valid 10-digit mobile number.</div>}
          <button disabled={!canNext[4]} onClick={() => setStep(5)} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 15, marginTop: 18 }}>Review request</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <SectionHeading title="Confirm your request" sub="Review the details below before we dispatch a partner." />
          <div className="fg-card" style={{ padding: 18, marginBottom: 18 }}>
            {[["Service", SERVICE_TYPES.find((s) => s.key === data.serviceType)?.label], ["Customer", data.name], ["Mobile", data.mobile], ["Location", data.locText], ...(isTow ? [["Drop-off", data.dropText]] : []), ...(data.serviceType !== "parts" ? [["Vehicle", data.vehicle]] : []), ["Details", summaryDetail], ["Est. response time", "10–16 min"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border-soft)", fontSize: 13.5 }}>
                <span style={{ color: "var(--text-muted)" }}>{k}</span><span style={{ fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 15 }}>
              <span style={{ fontWeight: 700 }}>Estimated service fee</span><span style={{ fontWeight: 800, color: "var(--accent)" }}>₹{estFee}</span>
            </div>
          </div>

          <label className="fg-label">Payment method (simulated)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
            {["UPI", "Card", "Wallet"].map((m) => (
              <button key={m} onClick={() => { setPayMethod(m); setPayStatus("idle"); }} className={`fg-choice fg-focusable ${payMethod === m ? "active" : ""}`}>{m}</button>
            ))}
          </div>

          {payStatus === "idle" && <button onClick={runPayment} className="fg-btn fg-btn-outline fg-focusable" style={{ width: "100%", padding: 14, marginBottom: 14 }}>Pay ₹{estFee} via {payMethod}</button>}
          {payStatus === "processing" && <Loader label="Processing payment…" />}
          {payStatus === "success" && <div style={{ background: "var(--success-soft)", color: "var(--success)", padding: "12px 14px", borderRadius: 10, fontSize: 13.5, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Check size={15} /> Payment successful — you're ready to confirm.</div>}
          {payStatus === "failed" && (
            <div style={{ background: "var(--danger-soft)", color: "var(--danger)", padding: "12px 14px", borderRadius: 10, fontSize: 13.5, marginBottom: 14 }}>
              Payment could not be completed. Please try again.
              <div><button onClick={runPayment} className="fg-link" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)", fontWeight: 700, marginTop: 6, textDecoration: "underline" }}>Retry payment</button></div>
            </div>
          )}

          <button disabled={!canNext[5]} onClick={submit} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 16 }}>Confirm Request</button>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TRACKING PAGE                                                       */
/* ------------------------------------------------------------------ */
const TIMELINE = [
  { key: "received", label: "Request received" },
  { key: "searching", label: "Searching for authorized partner" },
  { key: "assigned", label: "Partner assigned" },
  { key: "on_way", label: "Partner on the way" },
  { key: "completed", label: "Assistance completed" },
];

const TrackingPage = ({ request, go, onCancel, onComplete }) => {
  const [phase, setPhase] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!request) return;
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 4600);
    timers.current = [t1, t2, t3];
    return () => timers.current.forEach(clearTimeout);
  }, [request?.id]);

  if (!request) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 20px" }}>
        <EmptyState title="No active request" sub="You don't have a request in progress right now." action={<button onClick={() => go("request")} className="fg-btn fg-btn-primary fg-focusable">Request Assistance</button>} />
      </div>
    );
  }

  const assignedPartner = NEARBY_PARTNERS[0];
  const cancellable = phase < 3;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <div style={{ color: "var(--text-muted)", fontSize: 12.5 }}>Request ID</div>
          <div className="fg-display" style={{ fontSize: 19, fontWeight: 700 }}>{request.id}</div>
        </div>
        <Badge tone={phase >= 4 ? "success" : "route"}>{phase >= 4 ? "Completed" : "In progress"}</Badge>
      </div>

      <div className="fg-card-flat" style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        <svg viewBox="0 0 500 170" style={{ width: "100%", display: "block" }}>
          <rect width="500" height="170" fill="#0D111B" />
          {[...Array(11)].map((_, i) => <line key={"h" + i} x1="0" y1={i * 17} x2="500" y2={i * 17} stroke="#1A2033" />)}
          {[...Array(24)].map((_, i) => <line key={"v" + i} x1={i * 22} y1="0" x2={i * 22} y2="170" stroke="#1A2033" />)}
          <circle cx="150" cy="90" r="6" fill="#4C8DFF" /><text x="160" y="94" fill="#8991A8" fontSize="11">You</text>
          <circle cx="330" cy="60" r="6" fill="#FF6B35" className={phase < 3 ? "fg-pulse" : ""} /><text x="340" y="64" fill="#8991A8" fontSize="11">Partner</text>
          <path d="M150 90 C 220 70, 260 60, 330 60" stroke="#4C8DFF" strokeWidth="2" strokeDasharray="4 5" fill="none" />
        </svg>
        <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>Live tracking <DemoTag /></div>
      </div>

      <div className="fg-card" style={{ padding: 18, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>{phase >= 2 ? assignedPartner.name : "Matching you with a partner…"}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 2 }}>{phase >= 2 ? `ETA ${assignedPartner.eta} · ${assignedPartner.distance} away` : "Usually takes under a minute"}</div>
          </div>
          {phase >= 2 && <button className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable"><Phone size={13} /> Contact</button>}
        </div>
        <div>
          {TIMELINE.map((t, i) => {
            const state = i < phase ? "done" : i === phase ? "active" : "pending";
            return (
              <div key={t.key} style={{ display: "flex", gap: 12, paddingBottom: i === TIMELINE.length - 1 ? 0 : 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: state === "done" ? "var(--success)" : state === "active" ? "var(--accent)" : "var(--surface-2)", flexShrink: 0 }}>
                    {state === "done" ? <Check size={12} color="#0A0D16" /> : state === "active" ? <Loader2 size={12} className="fg-spin" color="#17110C" /> : null}
                  </div>
                  {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 18, background: i < phase ? "var(--success)" : "var(--border)" }} />}
                </div>
                <div style={{ paddingTop: 2, fontSize: 13.5, fontWeight: state === "pending" ? 500 : 600, color: state === "pending" ? "var(--text-dim)" : "var(--text)" }}>{t.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {phase >= 3 && phase < 4 && (
          <button onClick={() => { setPhase(4); onComplete(); }} className="fg-btn fg-btn-primary fg-focusable" style={{ flex: 1, padding: 14 }}>Mark assistance completed</button>
        )}
        {phase >= 4 && (
          <button onClick={() => go("customerDashboard")} className="fg-btn fg-btn-primary fg-focusable" style={{ flex: 1, padding: 14 }}>Go to dashboard</button>
        )}
        {cancellable && phase < 3 && (
          <button onClick={() => { onCancel(); go("customerDashboard"); }} className="fg-btn fg-btn-outline fg-focusable" style={{ padding: 14 }}>Cancel request</button>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* FEEDBACK MODAL                                                      */
/* ------------------------------------------------------------------ */
const FeedbackModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [dims, setDims] = useState({ Response: 0, Behaviour: 0, Ease: 0 });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(5,7,12,0.7)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div className="fg-card" style={{ width: "100%", maxWidth: 480, padding: 24, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, margin: "0 auto" }}>
        <h3 className="fg-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>How was your FuelGo experience?</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>Your feedback helps us keep the partner network reliable.</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 18, justifyContent: "center" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} className="fg-focusable" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Star size={28} fill={n <= rating ? "#F5B942" : "none"} color={n <= rating ? "#F5B942" : "#5A6379"} />
            </button>
          ))}
        </div>
        {Object.keys(dims).map((k) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{k}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setDims((d) => ({ ...d, [k]: n }))} className="fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                  <Star size={15} fill={n <= dims[k] ? "#FF6B35" : "none"} color={n <= dims[k] ? "#FF6B35" : "#5A6379"} />
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button onClick={onClose} className="fg-btn fg-btn-outline fg-focusable" style={{ flex: 1 }}>Skip</button>
          <button disabled={!rating} onClick={() => onSubmit(rating)} className="fg-btn fg-btn-primary fg-focusable" style={{ flex: 1 }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* LOGIN                                                                */
/* ------------------------------------------------------------------ */
const LoginPage = ({ go, setRole }) => {
  const [tab, setTab] = useState("customer");
  const [loading, setLoading] = useState(false);
  const creds = {
    customer: { u: "arun@fuelgo.demo", p: "demo1234" },
    partner: { u: "highwayaid@fuelgo.demo", p: "partner123" },
    admin: { u: "admin@fuelgo.demo", p: "admin123" },
  };
  const doLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setRole(tab);
      go(tab === "customer" ? "customerDashboard" : tab === "partner" ? "partnerDashboard" : "adminDashboard");
    }, 700);
  };
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "60px 20px 90px" }}>
      <SectionHeading eyebrow="DEMO MODE" title="Log in to FuelGo" sub="This prototype uses demo credentials — pick a role to explore its dashboard." />
      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "var(--surface-2)", padding: 4, borderRadius: 12 }}>
        {["customer", "partner", "admin"].map((r) => (
          <button key={r} onClick={() => setTab(r)} className="fg-focusable" style={{ flex: 1, textTransform: "capitalize", padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: tab === r ? "var(--accent)" : "transparent", color: tab === r ? "#17110C" : "var(--text-muted)" }}>{r}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 8 }}>
        <div><label className="fg-label">Email / username</label><input className="fg-input" defaultValue={creds[tab].u} readOnly /></div>
        <div><label className="fg-label">Password</label><input className="fg-input" type="password" defaultValue={creds[tab].p} readOnly /></div>
      </div>
      <p style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 18 }}>Demo credentials are pre-filled for this presentation build.</p>
      <button onClick={doLogin} disabled={loading} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", padding: 15 }}>
        {loading ? <><Loader2 size={15} className="fg-spin" /> Signing in…</> : `Log in as ${tab}`}
      </button>
      <div style={{ textAlign: "center", marginTop: 16 }}><button onClick={() => go("home")} className="fg-link fg-focusable" style={{ background: "none", border: "none", cursor: "pointer" }}>Continue browsing as guest</button></div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CUSTOMER DASHBOARD                                                   */
/* ------------------------------------------------------------------ */
const DashShell = ({ title, sub, tabs, tab, setTab, children, onLogout }) => (
  <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px 80px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
      <div>
        <h1 className="fg-display" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{title}</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginTop: 4 }}>{sub}</p>
      </div>
      <button onClick={onLogout} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable"><LogOut size={13} /> Logout</button>
    </div>
    <div className="fg-scroll" style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border-soft)", overflowX: "auto" }}>
      {tabs.map((t) => (
        <button key={t} onClick={() => setTab(t)} className="fg-focusable" style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 4px", marginRight: 22, fontSize: 13.5, fontWeight: 600, color: tab === t ? "var(--text)" : "var(--text-muted)", borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent", whiteSpace: "nowrap" }}>{t}</button>
      ))}
    </div>
    {children}
  </div>
);

const svcLabel = (type) => SERVICE_TYPES.find((s) => s.key === type)?.label || type || "Service";
const svcIcon = (type) => SERVICE_TYPES.find((s) => s.key === type)?.icon || Package;

const CustomerDashboard = ({ go, activeRequest, history, onLogout }) => {
  const [tab, setTab] = useState("My Orders");
  return (
    <DashShell title="Welcome back, Arun" sub="Here's what's happening with your FuelGo orders." tabs={["My Orders", "Order History", "Profile", "Notifications"]} tab={tab} setTab={setTab} onLogout={onLogout}>
      {tab === "My Orders" && (
        activeRequest ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--success)", fontSize: 13, fontWeight: 700 }}>
              <Check size={15} /> Order placed — visible below and updating live
            </div>
            <div className="fg-card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Order {activeRequest.id} · {svcLabel(activeRequest.type)}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{activeRequest.detail || `${activeRequest.vehicle || ""}`}</div>
                </div>
                <Badge tone="route">In progress</Badge>
              </div>
              <div style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 4 }}><MapPin size={12} style={{ verticalAlign: -1 }} /> {activeRequest.location}</div>
              {activeRequest.dropLocation && <div style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 4 }}><Navigation size={12} style={{ verticalAlign: -1 }} /> To: {activeRequest.dropLocation}</div>}
              <div style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 16 }}><Wallet size={12} style={{ verticalAlign: -1 }} /> ₹{activeRequest.amount}</div>
              <button onClick={() => go("tracking")} className="fg-btn fg-btn-primary fg-btn-sm fg-focusable">View live tracking <ChevronRight size={13} /></button>
            </div>
          </div>
        ) : (
          <EmptyState title="No active orders" sub="When you place a request, it'll show up here immediately with live tracking." action={<button onClick={() => go("request")} className="fg-btn fg-btn-primary fg-focusable">Request Assistance</button>} />
        )
      )}

      {tab === "Order History" && (
        history.length ? (
          <div className="fg-card fg-scroll" style={{ overflowX: "auto" }}>
            <table className="fg-table">
              <thead><tr><th>Date</th><th>Service</th><th>Detail</th><th>Status</th><th>Amount</th></tr></thead>
              <tbody>
                {history.map((h) => {
                  const Icon = svcIcon(h.type);
                  return (
                    <tr key={h.id}>
                      <td>{h.time}</td>
                      <td style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon size={13} color="var(--text-muted)" /> {svcLabel(h.type)}</td>
                      <td>{h.detail || "—"}</td>
                      <td><Badge tone={STATUS_TONE[h.status]}>{h.status}</Badge></td>
                      <td>{h.amount ? `₹${h.amount}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="No previous orders" sub="Completed and cancelled orders will appear here." />
      )}

      {tab === "Profile" && (
        <div className="fg-card" style={{ padding: 20, maxWidth: 460 }}>
          {[["Name", "Arun Ramesh"], ["Mobile", "98407 XXXXX"], ["Email", "arun@fuelgo.demo"], ["Saved vehicle", "Hyundai i20 · TN 09 AB 1234"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border-soft)", fontSize: 13.5 }}>
              <span style={{ color: "var(--text-muted)" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "Notifications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["Your request has been accepted.", "2 min ago", Check, "success"],
            ["Your service partner is on the way.", "18 min ago", Navigation, "route"],
            ["Your assistance request has been completed.", "Yesterday", BadgeCheck, "accent"],
          ].map(([msg, time, Icon, tone], i) => (
            <div key={i} className="fg-card-flat" style={{ padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `var(--${tone}-soft)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={14} color={`var(--${tone})`} /></div>
              <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{msg}</div><div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 2 }}>{time}</div></div>
            </div>
          ))}
        </div>
      )}
    </DashShell>
  );
};

/* ------------------------------------------------------------------ */
/* PARTNER DASHBOARD                                                    */
/* ------------------------------------------------------------------ */
const INCOMING_SEED = [
  { id: "FG-58241", customer: "Nithya S.", location: "Adyar, 2.1 km away", vehicle: "Car", service: "Petrol", time: "Just now" },
  { id: "FG-58240", customer: "Bala K.", location: "Thiruvanmiyur, 3.6 km away", vehicle: "Bike", service: "Petrol", time: "3 min ago" },
];

const PartnerDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState("Overview");
  const [incoming, setIncoming] = useState(INCOMING_SEED);
  const [active, setActive] = useState(null);
  const [status, setStatus] = useState("Accepted");

  const accept = (r) => { setIncoming((l) => l.filter((x) => x.id !== r.id)); setActive(r); setStatus("Accepted"); setTab("Active Request"); };
  const reject = (r) => setIncoming((l) => l.filter((x) => x.id !== r.id));

  const statusFlow = ["Accepted", "On the way", "Arrived", "Service completed"];

  return (
    <DashShell title="Highway Aid – Velachery" sub="Partner dashboard · Verified authorized partner" tabs={["Overview", "Incoming Requests", "Active Request"]} tab={tab} setTab={setTab} onLogout={onLogout}>
      {tab === "Overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 22 }} className="fg-stat-grid">
            <StatCard icon={Package} label="Today's requests" value="14" tone="route" />
            <StatCard icon={Check} label="Completed" value="11" tone="success" />
            <StatCard icon={Clock} label="Pending" value="2" tone="warn" />
            <StatCard icon={XCircle} label="Cancelled" value="1" tone="danger" />
            <StatCard icon={Wallet} label="Earnings today" value="₹3,240" tone="accent" />
          </div>
          <DemoTag />
        </>
      )}

      {tab === "Incoming Requests" && (
        incoming.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {incoming.map((r) => (
              <div key={r.id} className="fg-card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.id} · {r.customer}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 3 }}>{r.location} · {r.vehicle} · {r.service} · {r.time}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => reject(r)} className="fg-btn fg-btn-outline fg-btn-sm fg-focusable">Reject</button>
                  <button onClick={() => accept(r)} className="fg-btn fg-btn-primary fg-btn-sm fg-focusable">Accept</button>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState title="No partner requests at the moment" sub="New requests near your service area will appear here." />
      )}

      {tab === "Active Request" && (
        active ? (
          <div className="fg-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div><div style={{ fontWeight: 700, fontSize: 15 }}>{active.id} · {active.customer}</div><div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 3 }}>{active.location}</div></div>
              <button className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable"><Phone size={13} /> Contact</button>
            </div>
            <div className="fg-card-flat" style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
              <svg viewBox="0 0 500 140" style={{ width: "100%", display: "block" }}>
                <rect width="500" height="140" fill="#0D111B" />
                {[...Array(9)].map((_, i) => <line key={i} x1="0" y1={i * 17} x2="500" y2={i * 17} stroke="#1A2033" />)}
                <path d="M60 100 C 180 60, 320 90, 440 40" stroke="#4C8DFF" strokeWidth="2" strokeDasharray="4 5" fill="none" />
                <circle cx="60" cy="100" r="6" fill="#4C8DFF" /><circle cx="440" cy="40" r="6" fill="#FF6B35" />
              </svg>
            </div>
            <button className="fg-btn fg-btn-outline fg-focusable" style={{ width: "100%", marginBottom: 16 }}><Navigation size={14} /> Open navigation</button>
            <label className="fg-label">Update status</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {statusFlow.map((s) => (
                <button key={s} onClick={() => setStatus(s)} className={`fg-choice fg-focusable ${status === s ? "active" : ""}`} style={{ fontSize: 12, textAlign: "center", padding: 10 }}>{s}</button>
              ))}
            </div>
            {status === "Service completed" && (
              <button onClick={() => { setActive(null); setTab("Overview"); }} className="fg-btn fg-btn-primary fg-focusable" style={{ width: "100%", marginTop: 16 }}>Finish & return to overview</button>
            )}
          </div>
        ) : <EmptyState title="No active request" sub="Accept an incoming request to start a job." />
      )}
      <style>{`@media (max-width: 820px) { .fg-stat-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </DashShell>
  );
};

/* ------------------------------------------------------------------ */
/* ADMIN DASHBOARD                                                     */
/* ------------------------------------------------------------------ */
const ChartCard = ({ title, children, height = 240 }) => (
  <div className="fg-card" style={{ padding: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{title}</div><DemoTag />
    </div>
    <div style={{ width: "100%", height }}><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>
  </div>
);

const tooltipStyle = { background: "#131828", border: "1px solid #232B41", borderRadius: 10, fontSize: 12.5, color: "#F1F3FA" };

const AdminDashboard = ({ onLogout }) => {
  const [tab, setTab] = useState("Overview");
  const [partners, setPartners] = useState(PARTNER_DIRECTORY);
  const [expenses, setExpenses] = useState(OPERATING_EXPENSES);
  const [newExpense, setNewExpense] = useState({ label: "", amount: "" });
  const [orders, setOrders] = useState(REQUEST_LOG);
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [orderDetail, setOrderDetail] = useState(null);

  const setOrderStatus = (id, status) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
  const reassignOrder = (id) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, partner: PARTNER_DIRECTORY.filter((p) => p.status === "Verified" && p.name !== o.partner)[0]?.name || o.partner, status: "Pending" } : o)));
  const visibleOrders = orders.filter((o) => (orderTypeFilter === "All" || o.type === orderTypeFilter) && (orderStatusFilter === "All" || o.status === orderStatusFilter));

  const completedTx = REQUEST_LOG.filter((r) => r.status === "Completed");
  const revenue = completedTx.reduce((s, r) => s + r.amount, 0);
  const payout = Math.round(revenue * PARTNER_PCT);
  const opEx = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const grossProfit = revenue - payout;
  const netProfit = grossProfit - opEx;

  const setPartnerStatus = (id, status) => setPartners((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p)));
  const addExpense = () => {
    if (!newExpense.label || !newExpense.amount) return;
    setExpenses((e) => [...e, { id: Date.now(), label: newExpense.label, amount: Number(newExpense.amount) }]);
    setNewExpense({ label: "", amount: "" });
  };

  return (
    <DashShell title="Admin Dashboard" sub="Full platform visibility · DEMO MODE" tabs={["Overview", "Finance", "Customer Analytics", "Location", "Partners", "Customers", "Orders"]} tab={tab} setTab={setTab} onLogout={onLogout}>
      {tab === "Overview" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}><DemoTag /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }} className="fg-stat-grid">
            <StatCard icon={Users} label="Total customers" value="2,548" tone="route" sub="+108 this month" />
            <StatCard icon={Package} label="Total requests" value="4,892" tone="accent" sub="986 this month" />
            <StatCard icon={Check} label="Completed" value="4,320" tone="success" sub="88.3% completion" />
            <StatCard icon={Clock} label="Avg. response" value="14 min" tone="warn" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="fg-two-grid">
            <ChartCard title="Requests by status (this week)">
              <BarChart data={[{ name: "Mon", Completed: 62, Pending: 6, Cancelled: 3 }, { name: "Tue", Completed: 71, Pending: 4, Cancelled: 2 }, { name: "Wed", Completed: 68, Pending: 8, Cancelled: 4 }, { name: "Thu", Completed: 75, Pending: 5, Cancelled: 3 }, { name: "Fri", Completed: 88, Pending: 9, Cancelled: 5 }, { name: "Sat", Completed: 94, Pending: 7, Cancelled: 2 }, { name: "Sun", Completed: 81, Pending: 6, Cancelled: 3 }]}>
                <CartesianGrid stroke="#1A2033" vertical={false} /><XAxis dataKey="name" stroke="#5A6379" fontSize={11} /><YAxis stroke="#5A6379" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} /><Legend wrapperStyle={{ fontSize: 11.5 }} />
                <Bar dataKey="Completed" fill="#35D69B" radius={[4, 4, 0, 0]} /><Bar dataKey="Pending" fill="#F5B942" radius={[4, 4, 0, 0]} /><Bar dataKey="Cancelled" fill="#F45B69" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartCard>
            <ChartCard title="Monthly transactions">
              <LineChart data={MONTHLY_TX}>
                <CartesianGrid stroke="#1A2033" vertical={false} /><XAxis dataKey="month" stroke="#5A6379" fontSize={11} /><YAxis stroke="#5A6379" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="requests" stroke="#4C8DFF" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ChartCard>
          </div>
        </>
      )}

      {tab === "Finance" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}><DemoTag /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }} className="fg-stat-grid">
            <StatCard icon={Wallet} label="Total revenue" value={`₹${revenue.toLocaleString("en-IN")}`} tone="success" sub="Completed transactions" />
            <StatCard icon={Users} label="Partner payouts" value={`₹${payout.toLocaleString("en-IN")}`} tone="route" sub={`${Math.round(PARTNER_PCT * 100)}% configured share`} />
            <StatCard icon={TrendingUp} label="Gross profit" value={`₹${grossProfit.toLocaleString("en-IN")}`} tone="accent" />
            <StatCard icon={netProfit >= 0 ? TrendingUp : AlertCircle} label="Net profit / loss" value={`₹${netProfit.toLocaleString("en-IN")}`} tone={netProfit >= 0 ? "success" : "danger"} sub="After operating expenses" />
          </div>

          <ChartCard title="Revenue vs. partner payout trend" height={260}>
            <AreaChart data={REVENUE_TREND}>
              <CartesianGrid stroke="#1A2033" vertical={false} /><XAxis dataKey="month" stroke="#5A6379" fontSize={11} /><YAxis stroke="#5A6379" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
              <Area type="monotone" dataKey="revenue" stroke="#FF6B35" fill="rgba(255,107,53,0.18)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="payout" stroke="#4C8DFF" fill="rgba(76,141,255,0.14)" strokeWidth={2} />
            </AreaChart>
          </ChartCard>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginTop: 14 }} className="fg-two-grid">
            <div className="fg-card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Operating expenses</div>
              {expenses.map((e) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border-soft)", fontSize: 13.5 }}>
                  <span style={{ color: "var(--text-muted)" }}>{e.label}</span><span style={{ fontWeight: 600 }}>₹{Number(e.amount).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontWeight: 700, fontSize: 14 }}><span>Total</span><span>₹{opEx.toLocaleString("en-IN")}</span></div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <input className="fg-input" placeholder="Expense label" value={newExpense.label} onChange={(e) => setNewExpense((n) => ({ ...n, label: e.target.value }))} />
                <input className="fg-input" placeholder="₹" style={{ width: 90 }} value={newExpense.amount} onChange={(e) => setNewExpense((n) => ({ ...n, amount: e.target.value.replace(/\D/g, "") }))} />
              </div>
              <button onClick={addExpense} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable" style={{ marginTop: 10, width: "100%" }}><Plus size={13} /> Add expense</button>
            </div>
            <div className="fg-card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>P&amp;L summary</div>
              {[["Gross revenue", revenue], ["– Partner payouts", -payout], ["– Operating expenses", -opEx], ["= Net profit / loss", netProfit]].map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? "1px solid var(--border-soft)" : "none", fontSize: 13.5, fontWeight: i === 3 ? 700 : 500 }}>
                  <span style={{ color: i === 3 ? "var(--text)" : "var(--text-muted)" }}>{k}</span><span style={{ color: i === 3 ? (v >= 0 ? "var(--success)" : "var(--danger)") : "var(--text)" }}>₹{v.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <p style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 10 }}>Calculated live from completed transactions and configured payout share, not hard-coded.</p>
            </div>
          </div>
        </>
      )}

      {tab === "Customer Analytics" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}><DemoTag /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }} className="fg-stat-grid">
            <StatCard icon={Users} label="New this month" value="108" tone="success" />
            <StatCard icon={Users} label="Returning customers" value="1,940" tone="route" />
            <StatCard icon={TrendingUp} label="Retention rate" value="76%" tone="accent" />
            <StatCard icon={Star} label="Satisfaction" value="4.6/5" tone="warn" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }} className="fg-two-grid">
            <ChartCard title="Customer growth">
              <LineChart data={CUSTOMER_GROWTH}>
                <CartesianGrid stroke="#1A2033" vertical={false} /><XAxis dataKey="month" stroke="#5A6379" fontSize={11} /><YAxis stroke="#5A6379" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="customers" stroke="#35D69B" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ChartCard>
            <ChartCard title="Requests by vehicle type">
              <PieChart>
                <Pie data={BY_VEHICLE} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={3}>
                  {BY_VEHICLE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} /><Legend wrapperStyle={{ fontSize: 11.5 }} />
              </PieChart>
            </ChartCard>
          </div>
        </>
      )}

      {tab === "Location" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}><DemoTag /></div>
          <div className="fg-card-flat" style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
            <svg viewBox="0 0 800 300" style={{ width: "100%", display: "block" }}>
              <rect width="800" height="300" fill="#0D111B" />
              {[...Array(16)].map((_, i) => <line key={"h" + i} x1="0" y1={i * 19} x2="800" y2={i * 19} stroke="#1A2033" />)}
              {[...Array(36)].map((_, i) => <line key={"v" + i} x1={i * 22} y1="0" x2={i * 22} y2="300" stroke="#1A2033" />)}
              {[...Array(30)].map((_, i) => <circle key={i} cx={40 + ((i * 53) % 720)} cy={30 + ((i * 71) % 240)} r={3 + (i % 3)} fill="#FF6B35" opacity="0.55" />)}
              {NEARBY_PARTNERS.concat(PARTNER_DIRECTORY.slice(3)).map((p, i) => (
                <circle key={p.id} cx={120 + i * 130} cy={110 + (i % 2) * 70} r="7" fill="#4C8DFF" stroke="#0D111B" strokeWidth="2" />
              ))}
            </svg>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="fg-stat-grid">
            <StatCard icon={Package} label="Request density (peak)" value="High – OMR corridor" tone="accent" />
            <StatCard icon={Navigation} label="Active partner locations" value="5" tone="route" />
            <StatCard icon={Check} label="Completed (mapped)" value="4,320" tone="success" />
            <StatCard icon={Clock} label="Pending (mapped)" value="41" tone="warn" />
          </div>
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 12 }}>Mock coordinates shown for prototype purposes. Precise customer locations are restricted to authorized roles only.</p>
        </>
      )}

      {tab === "Partners" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <button className="fg-btn fg-btn-primary fg-btn-sm fg-focusable"><Plus size={13} /> Add partner</button><DemoTag />
          </div>
          <div className="fg-card fg-scroll" style={{ overflowX: "auto" }}>
            <table className="fg-table">
              <thead><tr><th>Partner</th><th>Contact</th><th>Area</th><th>Jobs</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td><td>{p.contact}<br /><span style={{ color: "var(--text-dim)", fontSize: 11.5 }}>{p.phone}</span></td>
                    <td>{p.area}</td><td>{p.jobs}</td><td>{p.rating ? `★ ${p.rating}` : "—"}</td>
                    <td><Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge></td>
                    <td style={{ display: "flex", gap: 6 }}>
                      {p.status !== "Verified" && <button onClick={() => setPartnerStatus(p.id, "Verified")} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable">Approve</button>}
                      {p.status !== "Suspended" && <button onClick={() => setPartnerStatus(p.id, "Suspended")} className="fg-btn fg-btn-outline fg-btn-sm fg-focusable">Suspend</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "Customers" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 10 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: 12, color: "var(--text-dim)" }} />
              <input className="fg-input" placeholder="Search customers" style={{ paddingLeft: 34 }} />
            </div>
            <DemoTag />
          </div>
          <div className="fg-card fg-scroll" style={{ overflowX: "auto" }}>
            <table className="fg-table">
              <thead><tr><th>Customer</th><th>Mobile</th><th>Requests</th><th>Since</th><th>Status</th></tr></thead>
              <tbody>
                {CUSTOMER_DIRECTORY.map((c) => (
                  <tr key={c.id}><td style={{ fontWeight: 600 }}>{c.name}</td><td>{c.mobile}</td><td>{c.requests}</td><td>{c.since}</td><td><Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "Orders" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "fuel", "battery", "parts", "tow"].map((t) => (
                <button key={t} onClick={() => setOrderTypeFilter(t)} className="fg-btn fg-btn-sm fg-focusable" style={{ background: orderTypeFilter === t ? "var(--accent)" : "var(--surface-2)", color: orderTypeFilter === t ? "#17110C" : "var(--text)" }}>
                  {t === "All" ? "All types" : svcLabel(t)}
                </button>
              ))}
              <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />
              {["All", "Pending", "Completed", "Cancelled"].map((s) => (
                <button key={s} onClick={() => setOrderStatusFilter(s)} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable" style={{ background: orderStatusFilter === s ? "var(--border)" : "var(--surface-2)" }}><Filter size={11} /> {s}</button>
              ))}
            </div>
            <DemoTag />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }} className="fg-stat-grid">
            {["Pending", "Completed", "Cancelled"].map((s) => (
              <StatCard key={s} icon={s === "Completed" ? Check : s === "Cancelled" ? XCircle : Clock} label={`${s} orders`} value={orders.filter((o) => o.status === s).length} tone={s === "Completed" ? "success" : s === "Cancelled" ? "danger" : "warn"} />
            ))}
            <StatCard icon={Wallet} label="Orders value shown" value={`₹${visibleOrders.reduce((s, o) => s + o.amount, 0).toLocaleString("en-IN")}`} tone="accent" />
          </div>

          <div className="fg-card fg-scroll" style={{ overflowX: "auto" }}>
            <table className="fg-table">
              <thead><tr><th>ID</th><th>Type</th><th>Customer</th><th>Location</th><th>Service</th><th>Partner</th><th>Status</th><th>Amount</th><th>Time</th><th>Controls</th></tr></thead>
              <tbody>
                {visibleOrders.map((r) => {
                  const Icon = svcIcon(r.type);
                  return (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600, cursor: "pointer", color: "var(--route)" }} onClick={() => setOrderDetail(r)}>{r.id}</td>
                      <td><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon size={13} color="var(--text-muted)" /> {svcLabel(r.type)}</span></td>
                      <td>{r.customer}</td><td>{r.location}</td><td>{r.service}</td><td>{r.partner}</td>
                      <td><Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge></td><td>{r.amount ? `₹${r.amount}` : "—"}</td><td>{r.time}</td>
                      <td style={{ display: "flex", gap: 6 }}>
                        {r.status === "Pending" && <button onClick={() => reassignOrder(r.id)} className="fg-btn fg-btn-ghost fg-btn-sm fg-focusable">Reassign</button>}
                        {r.status !== "Cancelled" && <button onClick={() => setOrderStatus(r.id, "Cancelled")} className="fg-btn fg-btn-outline fg-btn-sm fg-focusable">Cancel</button>}
                        {r.status === "Cancelled" && r.amount === 0 && <span style={{ color: "var(--text-dim)", fontSize: 12 }}>No charge</span>}
                        {r.status === "Completed" && <button onClick={() => setOrderStatus(r.id, "Refunded")} className="fg-btn fg-btn-outline fg-btn-sm fg-focusable">Refund</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orderDetail && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(5,7,12,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setOrderDetail(null)}>
              <div className="fg-card" style={{ maxWidth: 440, width: "100%", padding: 22 }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{orderDetail.id}</div>
                  <button onClick={() => setOrderDetail(null)} className="fg-focusable" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={16} color="var(--text-muted)" /></button>
                </div>
                {[["Type", svcLabel(orderDetail.type)], ["Customer", orderDetail.customer], ["Location", orderDetail.location], ["Service", orderDetail.service], ["Partner", orderDetail.partner], ["Status", orderDetail.status], ["Amount", orderDetail.amount ? `₹${orderDetail.amount}` : "—"], ["Time", orderDetail.time]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-soft)", fontSize: 13.5 }}>
                    <span style={{ color: "var(--text-muted)" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <p style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 12 }}>Admin can reassign partner, cancel, or refund directly from this panel.</p>
              </div>
            </div>
          )}
        </>
      )}
      <style>{`@media (max-width: 900px) { .fg-two-grid { grid-template-columns: 1fr !important; } } @media (max-width: 820px) { .fg-stat-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </DashShell>
  );
};

/* ------------------------------------------------------------------ */
/* STATIC INFO PAGES                                                    */
/* ------------------------------------------------------------------ */
const InfoPage = ({ id, go }) => {
  const content = {
    how: {
      title: "How It Works", sub: "From stranded to sorted, in a few guided steps.",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["Open FuelGo and tap Request Assistance.", "Share your location — current or manual entry.", "Tell us your vehicle and fuel requirement.", "We match you with the nearest verified, available partner.", "Track the partner's arrival in real time.", "Rate your experience once assistance is complete."].map((s, i) => (
            <div key={i} className="fg-card-flat" style={{ padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12.5, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 14, paddingTop: 3 }}>{s}</div>
            </div>
          ))}
        </div>
      ),
    },
    safety: {
      title: "Safety", sub: "Fuel handling is regulated for a reason — here's how FuelGo stays compliant.",
      body: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="fg-two-grid">
          {[
            ["Authorized partners only", "Every partner on the network is verified before appearing in a match, and re-checked on an ongoing basis."],
            ["Regulated quantities", "Requests are limited to safe, operationally supported amounts — enough to get moving, not bulk delivery."],
            ["Licensed handling", "Fuel is transported, stored, and dispensed only by partners operating under applicable petroleum and fire-safety regulations."],
            ["Location privacy", "Your precise location is only visible to your assigned partner and authorized platform staff."],
          ].map(([t, d]) => (
            <div key={t} className="fg-card" style={{ padding: 18 }}>
              <ShieldCheck size={16} color="var(--success)" />
              <div style={{ fontWeight: 700, fontSize: 14, margin: "10px 0 6px" }}>{t}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      ),
    },
    "partners-info": {
      title: "For Partners", sub: "Join FuelGo's network of authorized emergency fuel-service providers.",
      body: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }} className="fg-need-grid">
            {[["Verified demand", "Get routed requests from customers in your service area."], ["Transparent payouts", "Clear per-job fee share, tracked in your dashboard."], ["Flexible hours", "Accept or reject incoming requests as your capacity allows."]].map(([t, d]) => (
              <div key={t} className="fg-card-flat" style={{ padding: 16 }}><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>{d}</div></div>
            ))}
          </div>
          <button onClick={() => go("login")} className="fg-btn fg-btn-primary fg-focusable">Apply as a partner</button>
        </div>
      ),
    },
    about: {
      title: "About FuelGo", sub: "A technology platform connecting customers with authorized emergency fuel-service partners.",
      body: <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.7, maxWidth: 640 }}>FuelGo exists for one moment: when a vehicle stops moving because the fuel ran out. We don't sell or store fuel ourselves — we build the technology layer that connects stranded motorists with verified, licensed service partners who can help, subject to local regulations and partner availability.</p>,
    },
    investors: {
      title: "For Investors", sub: "Emergency fuel assistance, connected — and built to expand into full roadside support.",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="fg-two-grid">
            <div className="fg-card" style={{ padding: 18 }}><div style={{ fontWeight: 700, marginBottom: 6 }}>Problem</div><div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>Fuel emergencies leave motorists stranded with no fast, reliable way to get help.</div></div>
            <div className="fg-card" style={{ padding: 18 }}><div style={{ fontWeight: 700, marginBottom: 6 }}>Solution</div><div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>A technology-enabled matching platform connecting customers to authorized partners.</div></div>
            <div className="fg-card" style={{ padding: 18 }}><div style={{ fontWeight: 700, marginBottom: 6 }}>Business model</div><div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>Platform/service fees, partner subscriptions, B2B and fleet partnerships.</div></div>
            <div className="fg-card" style={{ padding: 18 }}><div style={{ fontWeight: 700, marginBottom: 6 }}>Competitive advantage</div><div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>Fast digital dispatch, location-based matching, verified partner network, analytics.</div></div>
          </div>
          <ChartCard title="Revenue trend (demo)" height={220}>
            <LineChart data={REVENUE_TREND}><CartesianGrid stroke="#1A2033" vertical={false} /><XAxis dataKey="month" stroke="#5A6379" fontSize={11} /><YAxis stroke="#5A6379" fontSize={11} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2.5} /></LineChart>
          </ChartCard>
        </div>
      ),
    },
    faq: {
      title: "FAQ", sub: "Common questions about how FuelGo works.",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["Is FuelGo a fuel station?", "No. FuelGo is a technology platform that connects you with authorized third-party fuel-service partners — we don't sell or store fuel ourselves."],
            ["How is fuel assistance provided?", "By licensed, verified partners operating under applicable petroleum, fire-safety, and transport regulations in your area."],
            ["What happens if no partner is available?", "You'll be notified immediately and can try again shortly, or contact general roadside assistance."],
            ["Can I cancel a request?", "Yes, cancellation is available while your request hasn't yet reached the 'on the way' stage."],
            ["Is this service available everywhere?", "Availability depends on authorized partner coverage and local regulations — it may not yet be available in every area."],
            ["How is my location protected?", "Your precise location is shared only with your assigned partner and authorized platform staff."],
          ].map(([q, a]) => (
            <div key={q} className="fg-card-flat" style={{ padding: 16 }}><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{q}</div><div style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{a}</div></div>
          ))}
        </div>
      ),
    },
    contact: {
      title: "Contact", sub: "We'll get back to you within one business day.",
      body: (
        <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 12 }}>
          <input className="fg-input" placeholder="Your name" /><input className="fg-input" placeholder="Email" /><textarea className="fg-input" rows={4} placeholder="Message" />
          <button className="fg-btn fg-btn-primary fg-focusable">Send message</button>
        </div>
      ),
    },
    privacy: { title: "Privacy Policy", sub: "How FuelGo handles your data.", body: <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.7, maxWidth: 640 }}>This prototype does not collect or transmit real personal data. In production, FuelGo would collect only what's needed to fulfil a request — location, contact details, and vehicle info — and restrict access to authorized roles, consistent with applicable data-protection law.</p> },
    terms: { title: "Terms of Service", sub: "The basics of using FuelGo.", body: <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.7, maxWidth: 640 }}>FuelGo is a matching platform, not a fuel retailer or carrier. Service availability, pricing, and delivery depend on independent, authorized partners and applicable local law. This is a prototype build for demonstration purposes only.</p> },
    find: { title: "Find Assistance", sub: "See authorized partners currently available near a location.", body: null },
  }[id] || { title: "Page", sub: "", body: null };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px 80px" }}>
      <SectionHeading title={content.title} sub={content.sub} />
      {id === "find" ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 12 }} className="fg-partner-grid">
            {NEARBY_PARTNERS.map((p) => (
              <div key={p.id} className="fg-card" style={{ padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <Navigation size={16} color="var(--route)" /><Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 4 }}>{p.distance} · ETA {p.eta}</div>
              </div>
            ))}
          </div>
          <DemoTag />
          <div style={{ marginTop: 20 }}><button onClick={() => go("request")} className="fg-btn fg-btn-primary fg-focusable"><Fuel size={15} /> Request Assistance</button></div>
        </div>
      ) : content.body}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* APP ROOT                                                             */
/* ------------------------------------------------------------------ */
export default function FuelGoApp() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [history, setHistory] = useState([
    { id: "FG-58201", type: "fuel", detail: "Petrol · 5 L (₹105/L)", status: "Completed", amount: 525, time: "3 Sep" },
    { id: "FG-58170", type: "battery", detail: "65Ah", status: "Completed", amount: 6200, time: "22 Aug" },
    { id: "FG-58122", type: "fuel", detail: "Diesel · 5 L (₹92/L)", status: "Cancelled", amount: 0, time: "9 Aug" },
  ]);
  const [showFeedback, setShowFeedback] = useState(false);

  const go = (p) => { setPage(p); window.scrollTo?.({ top: 0 }); };

  const handleConfirmRequest = (req) => { setActiveRequest(req); };
  const handleCancel = () => {
    if (activeRequest) setHistory((h) => [{ id: activeRequest.id, type: activeRequest.type, detail: activeRequest.detail, status: "Cancelled", amount: 0, time: "Just now" }, ...h]);
    setActiveRequest(null);
  };
  const handleComplete = () => setShowFeedback(true);
  const handleFeedbackSubmit = () => {
    if (activeRequest) setHistory((h) => [{ id: activeRequest.id, type: activeRequest.type, detail: activeRequest.detail, status: "Completed", amount: activeRequest.amount, time: "Just now" }, ...h]);
    setShowFeedback(false); setActiveRequest(null);
  };
  const handleLogout = () => { setRole(null); go("home"); };

  const staticInfoPages = ["how", "safety", "partners-info", "about", "investors", "faq", "contact", "privacy", "terms", "find"];

  return (
    <div className="fg-root">
      <GlobalStyle />
      <NavBar page={page} go={go} role={role} setRole={setRole} />

      {page === "home" && <HomePage go={go} />}
      {page === "request" && <RequestFlow go={go} onConfirm={handleConfirmRequest} />}
      {page === "tracking" && <TrackingPage request={activeRequest} go={go} onCancel={handleCancel} onComplete={handleComplete} />}
      {page === "login" && <LoginPage go={go} setRole={setRole} />}
      {page === "customerDashboard" && <CustomerDashboard go={go} activeRequest={activeRequest} history={history} onLogout={handleLogout} />}
      {page === "partnerDashboard" && <PartnerDashboard onLogout={handleLogout} />}
      {page === "adminDashboard" && <AdminDashboard onLogout={handleLogout} />}
      {staticInfoPages.includes(page) && <InfoPage id={page} go={go} />}

      {showFeedback && <FeedbackModal onClose={() => handleFeedbackSubmit()} onSubmit={() => handleFeedbackSubmit()} />}

      <Footer go={go} />
    </div>
  );
}
