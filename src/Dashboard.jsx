import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from 'recharts'

// replace lucide-react with tiny inline chevron components
const ChevronUp = ({ size = 24, stroke = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 15l6-6 6 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChevronDown = ({ size = 24, stroke = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// high-contrast gradient palette (brighter / more saturated colors)
const gradientMap = {
  Functionality: ['#60a5fa', '#1e3a8a'], // bright blue -> deep blue
  Reliability: ['#ff7b7b', '#b91c1c'],   // bright coral -> strong red
  Usability: ['#34d399', '#047857'],     // mint -> deep green
  Efficiency: ['#fbbf24', '#b45309'],    // amber -> rich orange
  Security: ['#a78bfa', '#6d28d9'],      // lavender -> violet
  Compatibility: ['#f472b6', '#be185d'],// pink -> magenta
  Maintainability: ['#2dd4bf', '#0f766e'],// teal -> deep teal
  Portability: ['#fb923c', '#c2410c'],  // orange -> darker orange
  IT: ['#60a5fa', '#1e3a8a'],
  Subject: ['#34d399', '#047857'],
  EndUser: ['#fbbf24', '#b45309'],
  // fallbacks
  default: ['#94a3b8', '#475569'],
}

const GradientDefs = ({ ids = [] }) => (
  <defs>
    {ids.map((id) => {
      const stops = gradientMap[id] || gradientMap.default
      return (
        <linearGradient key={id} id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stops[0]} stopOpacity="1" />
          <stop offset="100%" stopColor={stops[1]} stopOpacity="1" />
        </linearGradient>
      )
    })}
  </defs>
)

const CustomTooltip = ({ active, payload, label }) => {
  // return nothing when tooltip is inactive or payload is empty
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="custom-tooltip">
      <div className="tt-header">{label}</div>
      <div className="tt-body">
        {payload.map((p) => (
          <div key={p.name} className="tt-row">
            <span className="dot" style={{ background: (gradientMap[p.name] || gradientMap.default)[0] }} />
            <span className="tt-name">{p.name}</span>
            <span className="tt-value">{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  // show charts by default so user immediately sees the visuals
  const [expanded, setExpanded] = useState({ iso: true, mars: true })
  const [hoveredSeries, setHoveredSeries] = useState(null)

  // ISO Data Analysis
  const isoData = [
    { name: 'IT Expert', Functionality: 4.54, Reliability: 4.38, Usability: 4.23, Efficiency: 4.15, Security: 4.23, Compatibility: 4.15, Maintainability: 4.08, Portability: 4.08 },
    { name: 'Subject Expert', Functionality: 4.2, Reliability: 4.0, Usability: 3.8, Efficiency: 4.0, Security: 4.2, Compatibility: 4.2, Maintainability: 3.8, Portability: 3.8 },
    { name: 'End-user (Parent)', Functionality: 4.11, Reliability: 4.0, Usability: 4.0, Efficiency: 4.11, Security: 3.89, Compatibility: 4.22, Maintainability: 4.0, Portability: 4.22 }
  ]

  const isoCharacteristics = [
    { characteristic: 'Functionality', IT: 4.54, Subject: 4.2, EndUser: 4.11, avg: 4.28 },
    { characteristic: 'Reliability', IT: 4.38, Subject: 4.0, EndUser: 4.0, avg: 4.13 },
    { characteristic: 'Usability', IT: 4.23, Subject: 3.8, EndUser: 4.0, avg: 4.01 },
    { characteristic: 'Efficiency', IT: 4.15, Subject: 4.0, EndUser: 4.11, avg: 4.09 },
    { characteristic: 'Security', IT: 4.23, Subject: 4.2, EndUser: 3.89, avg: 4.11 },
    { characteristic: 'Compatibility', IT: 4.15, Subject: 4.2, EndUser: 4.22, avg: 4.19 },
    { characteristic: 'Maintainability', IT: 4.08, Subject: 3.8, EndUser: 4.0, avg: 3.96 },
    { characteristic: 'Portability', IT: 4.08, Subject: 3.8, EndUser: 4.22, avg: 4.03 }
  ]

  const marsCategories = [
    { category: 'Interest', IT: 3.62, Subject: 4.2, EndUser: 3.9, avg: 3.9 },
    { category: 'Customization', IT: 3.77, Subject: 4.0, EndUser: 3.7, avg: 3.82 },
    { category: 'Interactivity', IT: 3.62, Subject: 4.4, EndUser: 3.7, avg: 3.9 },
    { category: 'Target Group', IT: 3.62, Subject: 4.0, EndUser: 4.1, avg: 3.9 },
    { category: 'Performance', IT: 3.69, Subject: 3.8, EndUser: 3.6, avg: 3.7 },
    { category: 'Ease of Use', IT: 3.92, Subject: 4.0, EndUser: 4.2, avg: 4.04 },
    { category: 'Navigation', IT: 3.69, Subject: 4.2, EndUser: 4.0, avg: 3.96 },
    { category: 'Gestural Design', IT: 4.0, Subject: 4.0, EndUser: 4.1, avg: 4.03 },
    { category: 'Layout', IT: 3.85, Subject: 4.2, EndUser: 4.0, avg: 4.02 },
    { category: 'Graphics', IT: 3.69, Subject: 4.0, EndUser: 4.1, avg: 3.93 },
    { category: 'Visual Appeal', IT: 3.85, Subject: 4.0, EndUser: 4.0, avg: 3.95 },
    { category: 'Accuracy of Description', IT: 3.77, Subject: 3.6, EndUser: 3.6, avg: 3.66 },
    { category: 'Goals', IT: 3.85, Subject: 4.4, EndUser: 3.9, avg: 4.05 },
    { category: 'Quality of Information', IT: 3.77, Subject: 4.0, EndUser: 3.9, avg: 3.89 },
    { category: 'Visual Information', IT: 3.85, Subject: 3.8, EndUser: 4.3, avg: 3.98 },
    { category: 'Notifications', IT: 4.0, Subject: 4.0, EndUser: 4.6, avg: 4.2 },
    { category: 'Permissions', IT: 3.77, Subject: 4.0, EndUser: 4.1, avg: 3.96 },
    { category: 'Install Location', IT: 3.69, Subject: 4.0, EndUser: 4.0, avg: 3.9 },
    { category: 'App Details', IT: 3.85, Subject: 3.8, EndUser: 4.1, avg: 3.92 }
  ]

  const toggleExpand = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const onBarHover = (key) => () => setHoveredSeries(key)
  const onBarLeave = () => setHoveredSeries(null)

  // avoid mutating original arrays when sorting for display
  const isoByAvgDesc = [...isoCharacteristics].sort((a, b) => b.avg - a.avg)
  const marsDesc = [...marsCategories].sort((a, b) => b.avg - a.avg)
  const marsAsc = [...marsCategories].sort((a, b) => a.avg - b.avg)

  // Simple compact fallback bar visual: renders a horizontal bar using SVG
  const MiniBar = ({ value, max = 5, color = '#60a5fa' }) => {
    const w = Math.round((value / max) * 160)
    return (
      <svg width="180" height="14" style={{ verticalAlign: 'middle' }} aria-hidden>
        <rect x="0" y="3" width="180" height="8" rx="4" fill="rgba(0,0,0,0.06)"></rect>
        <rect x="0" y="3" width={w} height="8" rx="4" fill={color}></rect>
      </svg>
    )
  }

  return (
    <main className="dashboard">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="title">Survey Analysis Dashboard</h1>
            <p className="subtitle">Gamified Learning Platform for Children with Dyslexia</p>
          </div>
          <div className="badges">
            <div className="badge badge-blue">ISO Dataset: <strong>27</strong></div>
            <div className="badge badge-green">MARS Dataset: <strong>21</strong></div>
          </div>
        </header>

        {/* Layout: charts (left) and panels (right) */}
        <div className="layout">
          <div className="left">
            {/* ISO SECTION */}
            <section className="card">
              <div className="section-head">
                <h2 className="section-title">ISO/IEC 25010 Quality Model Analysis</h2>
                <button className="icon-btn" onClick={() => toggleExpand('iso')} aria-expanded={!!expanded.iso}>
                  {expanded.iso ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expanded.iso && (
                <div className="section-body">
                  <div className="chart-section">
                    <h3 className="chart-title">Average Scores by Respondent Group</h3>
                    <div className="chart-wrapper" role="img" aria-label="ISO scores by respondent group">
                      {/* Recharts imported directly */}
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={isoData} margin={{ top: 12, right: 18, left: 8, bottom: 6 }} barGap={6} barCategoryGap="24%">
                          <GradientDefs ids={['Functionality','Reliability','Usability','Efficiency','Security','Compatibility','Maintainability','Portability']} />
                          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="6 6" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} interval={0} />
                          <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} />
                          <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }} cursor={false} />
                          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: 'var(--text)', fontSize: 13, paddingTop: 8 }} />
                          <Bar dataKey="Functionality" isAnimationActive={false} fill={gradientMap.Functionality[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Functionality" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Reliability" isAnimationActive={false} fill={gradientMap.Reliability[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Reliability" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Usability" isAnimationActive={false} fill={gradientMap.Usability[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Usability" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Efficiency" isAnimationActive={false} fill={gradientMap.Efficiency[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Efficiency" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Security" isAnimationActive={false} fill={gradientMap.Security[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Security" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Compatibility" isAnimationActive={false} fill={gradientMap.Compatibility[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Compatibility" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Maintainability" isAnimationActive={false} fill={gradientMap.Maintainability[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Maintainability" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Portability" isAnimationActive={false} fill={gradientMap.Portability[0]} radius={[8,8,0,0]} barSize={18}><LabelList dataKey="Portability" position="top" formatter={(v)=>v.toFixed(2)} /></Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* ISO Characteristics Ranking (vertical) */}
                  <div className="chart-section">
                    <h3 className="chart-title">ISO Characteristics - Ranked</h3>
                    <div className="chart-wrapper tall" role="img" aria-label="ISO characteristics ranking">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={isoByAvgDesc} layout="vertical" margin={{ top: 6, right: 10, left: 6, bottom: 6 }} barGap={6} barCategoryGap="10%">
                          <GradientDefs ids={['IT','Subject','EndUser']} />
                          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="6 6" horizontal={true} vertical={false} />
                          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} domain={[0,5]} />
                          <YAxis dataKey="characteristic" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} width={180} />
                          <Tooltip content={CustomTooltip} cursor={false} />
                          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: 'var(--text)' }} />
                          <Bar dataKey="IT" isAnimationActive={false} fill={gradientMap.IT[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="IT" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Subject" isAnimationActive={false} fill={gradientMap.Subject[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="Subject" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="EndUser" isAnimationActive={false} fill={gradientMap.EndUser[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="EndUser" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="insights-grid">
                    <div className="insight insight-blue">
                      <h4>Highest Rated</h4>
                      <p><strong>Functionality (4.28)</strong> — core features rated highly.</p>
                    </div>
                    <div className="insight insight-yellow">
                      <h4>Lowest Rated</h4>
                      <p><strong>Maintainability (3.96)</strong> — long-term upkeep concerns.</p>
                    </div>
                    <div className="insight insight-purple">
                      <h4>Biggest Gap</h4>
                      <p><strong>Usability (0.43)</strong> — IT vs Subject Experts difference.</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* MARS SECTION (left column) */}
            <section className="card">
              <div className="section-head">
                <h2 className="section-title">MARS - Platform Functionality Analysis</h2>
                <button className="icon-btn" onClick={() => toggleExpand('mars')} aria-expanded={!!expanded.mars}>
                  {expanded.mars ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {expanded.mars && (
                <div className="section-body">
                  <div className="chart-section">
                    <h3 className="chart-title">MARS Categories - Ranked by Average Score</h3>
                    <div className="chart-wrapper extra-tall" role="img" aria-label="MARS categories ranking">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart
                           data={marsDesc}
                           layout="vertical"
                           margin={{ top: 6, right: 10, left: 6, bottom: 6 }}
                           barGap={6}
                           barCategoryGap="10%"
                         >
                          <GradientDefs ids={['IT','Subject','EndUser']} />
                          <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="6 6" horizontal={true} vertical={false} />
                          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} domain={[0,5]} />
                          <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 13 }} width={220} />
                          <Tooltip content={CustomTooltip} cursor={false} />
                          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: 'var(--text)' }} />
                          <Bar dataKey="IT" isAnimationActive={false} fill={gradientMap.IT[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="IT" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="Subject" isAnimationActive={false} fill={gradientMap.Subject[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="Subject" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                          <Bar dataKey="EndUser" isAnimationActive={false} fill={gradientMap.EndUser[0]} radius={[8,8,8,8]} barSize={12}><LabelList dataKey="EndUser" position="right" formatter={(v)=>v.toFixed(2)} /></Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="insights-grid">
                    <div className="insight insight-green">
                      <h4>Strongest Area</h4>
                      <p><strong>Notifications (4.2)</strong> — especially valued by parents (4.6).</p>
                    </div>
                    <div className="insight insight-orange">
                      <h4>Needs Work</h4>
                      <p><strong>Accuracy of Description (3.66)</strong> — clarify features & docs.</p>
                    </div>
                    <div className="insight insight-red">
                      <h4>Group Disparity</h4>
                      <p>End-users 4.6 vs IT Experts 4.0 on Notifications.</p>
                    </div>
                  </div>

                  <div className="comparison-grid">
                    <div>
                      <h4>Top Strengths</h4>
                      <ul>
                        {marsDesc.slice(0, 5).map((item, i) => (
                          <li key={i}><span>{item.category}</span><span className="muted">{item.avg.toFixed(2)}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Bottom Concerns</h4>
                      <ul>
                        {marsAsc.slice(0, 5).map((item, i) => (
                          <li key={i}><span>{item.category}</span><span className="muted">{item.avg.toFixed(2)}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="right">
            {/* Move insights, comparison and talking points into right column for better reading */}
            <section className="card talk-points">
              <h2 className="section-title">Key Talking Points for Your Presentation</h2>
              <div className="talk-grid">
                <div className="talk-point"><h4>1. Strong Foundation</h4><p>ISO metrics average above 3.9/5 — solid technical quality.</p></div>
                <div className="talk-point"><h4>2. IT Experts Most Satisfied</h4><p>IT ratings validate implementation (avg 4.38/5).</p></div>
                <div className="talk-point"><h4>3. UX Gaps</h4><p>Subject Experts flagged Usability & Maintainability (3.8)</p></div>
                <div className="talk-point"><h4>4. Parents Value Compatibility</h4><p>High marks for cross-device use and install flow.</p></div>
                <div className="talk-point"><h4>5. Notifications Win</h4><p>Keep them reliable — parents love them (4.6).</p></div>
                <div className="talk-point"><h4>6. Fix: Descriptions</h4><p>Improve onboarding and in-app guidance (Accuracy 3.66).</p></div>
                <div className="talk-point"><h4>7. Performance</h4><p>Monitor & optimize loading (Performance 3.7).</p></div>
                <div className="talk-point"><h4>8. Learning Linkage</h4><p>Map gamification to literacy progress explicitly.</p></div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
