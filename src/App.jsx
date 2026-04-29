import { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis
} from "recharts";

const C = {
  bg: "#0A0C10",
  panel: "#0F1218",
  border: "#1E2433",
  teal: "#00D4B1",
  amber: "#F59E0B",
  rose: "#F43F5E",
  violet: "#8B5CF6",
  blue: "#3B82F6",
  text: "#E2E8F0",
  muted: "#64748B",
  dim: "#1E2433",
};

const monthlyRevenue = [
  { month: "Jan", revenue: 124500, orders: 1842, target: 120000 },
  { month: "Feb", revenue: 138200, orders: 2010, target: 130000 },
  { month: "Mar", revenue: 152800, orders: 2234, target: 145000 },
  { month: "Apr", revenue: 141300, orders: 2089, target: 150000 },
  { month: "May", revenue: 167900, orders: 2451, target: 160000 },
  { month: "Jun", revenue: 183400, orders: 2678, target: 175000 },
  { month: "Jul", revenue: 195700, orders: 2890, target: 185000 },
  { month: "Aug", revenue: 211200, orders: 3102, target: 200000 },
  { month: "Sep", revenue: 198600, orders: 2934, target: 205000 },
  { month: "Oct", revenue: 224800, orders: 3310, target: 215000 },
  { month: "Nov", revenue: 268500, orders: 3987, target: 250000 },
  { month: "Dec", revenue: 312400, orders: 4562, target: 290000 },
];

const categoryData = [
  { name: "Electronics", revenue: 487200, units: 3240, growth: 18.4 },
  { name: "Apparel", revenue: 312800, units: 7820, growth: 12.1 },
  { name: "Home & Garden", revenue: 238400, units: 4560, growth: 9.7 },
  { name: "Sports", revenue: 195600, units: 3890, growth: 22.3 },
  { name: "Beauty", revenue: 156300, units: 5670, growth: 31.2 },
  { name: "Books", revenue: 89400, units: 8920, growth: -2.1 },
  { name: "Toys", revenue: 134200, units: 6230, growth: 15.8 },
];

const topProducts = [
  { id: "PRD-001", name: "AirPods Pro Max", category: "Electronics", sold: 1240, revenue: 186000, margin: 38, trend: "up" },
  { id: "PRD-002", name: "Premium Yoga Mat", category: "Sports", sold: 2890, revenue: 144500, margin: 52, trend: "up" },
  { id: "PRD-003", name: "Designer Hoodie", category: "Apparel", sold: 3120, revenue: 124800, margin: 61, trend: "up" },
  { id: "PRD-004", name: "Smart Watch Series 9", category: "Electronics", sold: 890, revenue: 116700, margin: 41, trend: "down" },
  { id: "PRD-005", name: "Vitamin C Serum", category: "Beauty", sold: 4560, revenue: 109440, margin: 74, trend: "up" },
  { id: "PRD-006", name: "Coffee Maker Pro", category: "Home & Garden", sold: 760, revenue: 98800, margin: 44, trend: "up" },
];

const customerSegments = [
  { name: "Loyal", value: 28, color: "#00D4B1" },
  { name: "New", value: 35, color: "#3B82F6" },
  { name: "At-Risk", value: 18, color: "#F43F5E" },
  { name: "Champions", value: 12, color: "#F59E0B" },
  { name: "Dormant", value: 7, color: "#8B5CF6" },
];

const channelData = [
  { channel: "Organic Search", sessions: 48200, conversions: 2650, rate: 5.5 },
  { channel: "Paid Ads", sessions: 31400, conversions: 1884, rate: 6.0 },
  { channel: "Social Media", sessions: 24800, conversions: 1116, rate: 4.5 },
  { channel: "Email", sessions: 18600, conversions: 1302, rate: 7.0 },
  { channel: "Direct", sessions: 15200, conversions: 1064, rate: 7.0 },
  { channel: "Referral", sessions: 9400, conversions: 423, rate: 4.5 },
];

const recentOrders = [
  { id: "#ORD-8821", customer: "Sarah K.", product: "AirPods Pro Max", amount: 549, status: "delivered", time: "2m ago" },
  { id: "#ORD-8820", customer: "Marcus T.", product: "Designer Hoodie", amount: 89, status: "processing", time: "8m ago" },
  { id: "#ORD-8819", customer: "Aisha M.", product: "Vitamin C Serum", amount: 48, status: "shipped", time: "15m ago" },
  { id: "#ORD-8818", customer: "Liam C.", product: "Smart Watch S9", amount: 399, status: "delivered", time: "23m ago" },
  { id: "#ORD-8817", customer: "Priya N.", product: "Coffee Maker Pro", amount: 299, status: "cancelled", time: "31m ago" },
  { id: "#ORD-8816", customer: "James W.", product: "Premium Yoga Mat", amount: 79, status: "processing", time: "44m ago" },
];

const fmt = (n) => n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : `$${n}`;
const pct = (n) => `${n > 0 ? "+" : ""}${n}%`;

const KPICard = ({ label, value, sub, color, delta, icon }) => (
  <div style={{ background: "#0F1218", border: "1px solid #1E2433", borderRadius: 12, padding: "20px 24px", position: "relative", overflow: "hidden", flex: "1 1 200px" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: "#64748B", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
        <div style={{ color: "#E2E8F0", fontSize: 28, fontWeight: 700, fontFamily: "monospace", letterSpacing: -1 }}>{value}</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", padding: "2px 8px", borderRadius: 20, background: delta >= 0 ? "#00D4B122" : "#F43F5E22", color: delta >= 0 ? "#00D4B1" : "#F43F5E" }}>{pct(delta)}</span>
          <span style={{ color: "#64748B", fontSize: 11 }}>{sub}</span>
        </div>
      </div>
      <div style={{ fontSize: 28, opacity: 0.4 }}>{icon}</div>
    </div>
  </div>
);

const SectionTitle = ({ children, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
    <div style={{ width: 3, height: 18, background: accent || "#00D4B1", borderRadius: 2 }} />
    <span style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>{children}</span>
  </div>
);

const Panel = ({ children, style = {} }) => (
  <div style={{ background: "#0F1218", border: "1px solid #1E2433", borderRadius: 12, padding: 24, ...style }}>{children}</div>
);

const StatusBadge = ({ status }) => {
  const map = {
    delivered: { bg: "#00D4B122", color: "#00D4B1", label: "Delivered" },
    processing: { bg: "#F59E0B22", color: "#F59E0B", label: "Processing" },
    shipped: { bg: "#3B82F622", color: "#3B82F6", label: "Shipped" },
    cancelled: { bg: "#F43F5E22", color: "#F43F5E", label: "Cancelled" },
  };
  const s = map[status] || map.processing;
  return <span style={{ fontSize: 10, fontFamily: "monospace", padding: "3px 8px", borderRadius: 20, background: s.bg, color: s.color, fontWeight: 700 }}>{s.label}</span>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#161B26", border: "1px solid #1E2433", borderRadius: 8, padding: "10px 14px" }}>
      <div style={{ color: "#64748B", fontSize: 11, fontFamily: "monospace", marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 12, fontFamily: "monospace" }}>
          {p.name}: <strong>{typeof p.value === "number" && p.name?.toLowerCase().includes("revenue") ? fmt(p.value) : p.value?.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};

export default function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => { setTimeout(() => setAnimIn(true), 100); }, []);

  const tabs = ["overview", "products", "customers", "channels"];
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthlyRevenue.reduce((s, m) => s + m.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div style={{ background: "#0A0C10", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#E2E8F0", opacity: animIn ? 1 : 0, transition: "opacity 0.6s ease" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ borderBottom: "1px solid #1E2433", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, background: "#0F1218CC", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00D4B1, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#000" }}>◈</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>RetailPulse</div>
            <div style={{ fontSize: 10, color: "#64748B", fontFamily: "monospace", letterSpacing: 1 }}>ANALYTICS DASHBOARD · FY 2024</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "monospace", letterSpacing: 0.5, textTransform: "capitalize", background: activeTab === t ? "#00D4B122" : "transparent", color: activeTab === t ? "#00D4B1" : "#64748B", transition: "all 0.2s" }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4B1", boxShadow: "0 0 8px #00D4B1" }} />
          <span style={{ fontSize: 11, color: "#00D4B1", fontFamily: "monospace" }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1400, margin: "0 auto" }}>

        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <KPICard label="Total Revenue" value={fmt(totalRevenue)} sub="vs last year" delta={24.7} color="#00D4B1" icon="💰" />
              <KPICard label="Total Orders" value={totalOrders.toLocaleString()} sub="vs last year" delta={18.3} color="#3B82F6" icon="📦" />
              <KPICard label="Avg Order Value" value={`$${avgOrderValue}`} sub="vs last year" delta={5.4} color="#F59E0B" icon="🛒" />
              <KPICard label="Conversion Rate" value="4.8%" sub="vs last year" delta={-0.3} color="#F43F5E" icon="📊" />
              <KPICard label="Return Rate" value="7.2%" sub="vs last year" delta={-1.8} color="#8B5CF6" icon="↩️" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
              <Panel>
                <SectionTitle>Revenue vs Target — Monthly</SectionTitle>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4B1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00D4B1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2433" />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="target" name="Target" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradTarget)" dot={false} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#00D4B1" strokeWidth={2.5} fill="url(#gradRev)" dot={{ fill: "#00D4B1", r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel>
                <SectionTitle accent="#8B5CF6">Customer Segments</SectionTitle>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={customerSegments} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                      {customerSegments.map((s, i) => <Cell key={i} fill={s.color} stroke="none" />)}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#161B26", border: "1px solid #1E2433", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {customerSegments.map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                        <span style={{ fontSize: 12, color: "#64748B" }}>{s.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontFamily: "monospace", color: s.color, fontWeight: 700 }}>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
              <Panel>
                <SectionTitle accent="#3B82F6">Revenue by Category</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={categoryData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={26}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2433" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" name="Revenue" radius={[4,4,0,0]}>
                      {categoryData.map((_, i) => <Cell key={i} fill={["#00D4B1","#3B82F6","#F59E0B","#F43F5E","#8B5CF6","#64748B","#00D4B1"][i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel>
                <SectionTitle accent="#F59E0B">Live Orders</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recentOrders.map((o, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 8, background: "#1E243344", borderLeft: `2px solid ${["delivered","shipped"].includes(o.status) ? "#00D4B1" : o.status === "cancelled" ? "#F43F5E" : "#F59E0B"}` }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{o.customer}</div>
                        <div style={{ fontSize: 10, color: "#64748B", fontFamily: "monospace" }}>{o.id} · {o.time}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#F59E0B" }}>${o.amount}</div>
                        <div style={{ marginTop: 3 }}><StatusBadge status={o.status} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Panel>
              <SectionTitle>Top Products by Revenue</SectionTitle>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Product ID","Name","Category","Units Sold","Revenue","Margin","Trend"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontFamily: "monospace", color: "#64748B", letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid #1E2433", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1E243322" }}>
                        <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 11, color: "#64748B" }}>{p.id}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600 }}>{p.name}</td>
                        <td style={{ padding: "14px 16px" }}><span style={{ fontSize: 11, fontFamily: "monospace", padding: "3px 10px", borderRadius: 20, background: "#3B82F622", color: "#3B82F6" }}>{p.category}</span></td>
                        <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 13 }}>{p.sold.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#00D4B1" }}>{fmt(p.revenue)}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#1E2433" }}>
                              <div style={{ height: "100%", width: `${p.margin}%`, borderRadius: 2, background: p.margin > 60 ? "#00D4B1" : p.margin > 40 ? "#F59E0B" : "#F43F5E" }} />
                            </div>
                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748B", minWidth: 30 }}>{p.margin}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 18 }}>{p.trend === "up" ? "↗" : "↘"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Panel>
                <SectionTitle accent="#F43F5E">Category Growth Rate</SectionTitle>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 30 }} barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2433" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip formatter={v => `${v}%`} contentStyle={{ background: "#161B26", border: "1px solid #1E2433", borderRadius: 8 }} />
                    <Bar dataKey="growth" name="YoY Growth" radius={[0,4,4,0]}>
                      {categoryData.map((d, i) => <Cell key={i} fill={d.growth >= 0 ? "#00D4B1" : "#F43F5E"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel>
                <SectionTitle accent="#F59E0B">Monthly Orders Volume</SectionTitle>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2433" />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="orders" name="Orders" stroke="#F59E0B" strokeWidth={2} fill="url(#gradOrders)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Total Customers", value: "48,291", delta: 14.2, color: "#00D4B1", icon: "👥" },
                { label: "New This Month", value: "3,847", delta: 22.1, color: "#3B82F6", icon: "🆕" },
                { label: "Returning", value: "71.4%", delta: 3.2, color: "#F59E0B", icon: "🔄" },
                { label: "Avg LTV", value: "$284", delta: 8.9, color: "#8B5CF6", icon: "💎" },
              ].map((k, i) => <KPICard key={i} {...k} sub="vs last month" />)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Panel>
                <SectionTitle>Customer Segment Distribution</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {customerSegments.map((s, i) => {
                    const descs = ["High frequency, high value shoppers","First-time visitors converted","Risk of churning soon","Top 10% by value & frequency","Haven't purchased in 90+ days"];
                    return (
                      <div key={i} style={{ padding: "14px 16px", borderRadius: 10, background: "#1E243344", borderLeft: `3px solid ${s.color}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                          <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}%</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8 }}>{descs[i]}</div>
                        <div style={{ height: 4, borderRadius: 2, background: "#1E2433" }}>
                          <div style={{ height: "100%", width: `${s.value}%`, borderRadius: 2, background: s.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel>
                <SectionTitle accent="#3B82F6">Acquisition Channel Performance</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 60px", padding: "8px 12px", fontSize: 10, fontFamily: "monospace", color: "#64748B", letterSpacing: 1, borderBottom: "1px solid #1E2433" }}>
                    <span>CHANNEL</span><span>SESSIONS</span><span>CONV.</span><span>RATE</span>
                  </div>
                  {channelData.map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 60px", padding: "12px 12px", alignItems: "center", borderBottom: "1px solid #1E243322" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 1, background: ["#00D4B1","#3B82F6","#F43F5E","#F59E0B","#8B5CF6","#64748B"][i] }} />
                        <span style={{ fontSize: 13 }}>{c.channel}</span>
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748B" }}>{c.sessions.toLocaleString()}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 12, color: "#00D4B1" }}>{c.conversions.toLocaleString()}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: c.rate >= 6.5 ? "#00D4B1" : c.rate >= 5 ? "#F59E0B" : "#64748B" }}>{c.rate}%</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {activeTab === "channels" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Panel>
                <SectionTitle>Channel Session Distribution</SectionTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={channelData} cx="50%" cy="50%" outerRadius={110} paddingAngle={2} dataKey="sessions" nameKey="channel" label={({ channel, percent }) => `${channel} ${(percent*100).toFixed(0)}%`} labelLine={{ stroke: "#64748B" }} fontSize={10}>
                      {channelData.map((_, i) => <Cell key={i} fill={["#00D4B1","#3B82F6","#F43F5E","#F59E0B","#8B5CF6","#64748B"][i]} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#161B26", border: "1px solid #1E2433", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </Panel>

              <Panel>
                <SectionTitle accent="#F59E0B">Conversion Rate by Channel</SectionTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={30}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2433" vertical={false} />
                    <XAxis dataKey="channel" tick={{ fill: "#64748B", fontSize: 9, fontFamily: "monospace" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={v => `${v}%`} contentStyle={{ background: "#161B26", border: "1px solid #1E2433", borderRadius: 8 }} />
                    <Bar dataKey="rate" name="Conv. Rate %" radius={[4,4,0,0]}>
                      {channelData.map((d, i) => <Cell key={i} fill={d.rate >= 6.5 ? "#00D4B1" : d.rate >= 5 ? "#F59E0B" : "#F43F5E"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </div>

            <Panel>
              <SectionTitle accent="#8B5CF6">Channel Performance Summary</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {channelData.map((c, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 10, border: "1px solid #1E2433", background: "#1E243322" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.channel}</span>
                      <span style={{ fontSize: 11, color: ["#00D4B1","#3B82F6","#F43F5E","#F59E0B","#8B5CF6","#64748B"][i] }}>●</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[
                        ["Sessions", c.sessions.toLocaleString(), "#E2E8F0"],
                        ["Conversions", c.conversions.toLocaleString(), "#00D4B1"],
                        ["Conv. Rate", `${c.rate}%`, c.rate >= 6.5 ? "#00D4B1" : c.rate >= 5 ? "#F59E0B" : "#F43F5E"],
                        ["Revenue Est.", fmt(c.conversions * avgOrderValue), "#F59E0B"],
                      ].map(([label, val, color], j) => (
                        <div key={j}>
                          <div style={{ fontSize: 9, fontFamily: "monospace", color: "#64748B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 14, fontFamily: "monospace", fontWeight: 700, color }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #1E2433", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "#64748B" }}>RetailPulse Analytics · FY 2024</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Export CSV","Share Report","Schedule"].map(l => (
              <button key={l} style={{ fontSize: 11, fontFamily: "monospace", color: "#64748B", background: "none", border: "1px solid #1E2433", borderRadius: 6, padding: "5px 12px", cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
