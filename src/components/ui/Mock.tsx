import type { CSSProperties, ReactNode } from 'react'

/** Browser frame with stylised mock UI inside (always LTR). */
export function Frame({
  url,
  children,
  label,
  className = '',
}: {
  url: string
  children: ReactNode
  label: string
  className?: string
}) {
  return (
    <div className={`frame ${className}`} dir="ltr" role="img" aria-label={label}>
      <div className="frame-bar">
        <span className="d" />
        <span className="d" />
        <span className="d" />
        <span className="url">{url}</span>
      </div>
      {children}
    </div>
  )
}

const w = (width: string, extra?: CSSProperties): CSSProperties => ({ width, ...extra })

function Side({ active }: { active: number }) {
  const widths = ['70%', '85%', '60%', '78%', '66%', '72%']
  return (
    <div className="mk-side">
      <span
        className="sk"
        style={w('50%', { height: 10, marginBottom: 6, background: 'var(--tm)' })}
      />
      {widths.map((width, i) => (
        <span key={i} className={`sk ${i === active ? 'a' : ''}`} style={w(width)} />
      ))}
    </div>
  )
}

function Row({ a, b, pill }: { a: string; b: string; pill: string }) {
  return (
    <div className="rw">
      <span className="sk" style={{ width: 14, height: 14, borderRadius: '50%' }} />
      <span className="sk" style={w(a)} />
      <span className="sk" style={w(b, { marginInlineStart: 'auto' })} />
      <span className="pill">{pill}</span>
    </div>
  )
}

export function HeroMock() {
  const bars = [35, 52, 44, 63, 58, 72, 49, 80, 68, 90, 76, 84]
  return (
    <div className="mk" style={{ aspectRatio: '16/11' }}>
      <Side active={1} />
      <div className="mk-main">
        <div className="mk-top">
          <span className="mk-title">Today · Overview</span>
          <span className="pill">Live</span>
        </div>
        <div className="kpis">
          <div className="kpi">
            <span>Orders</span>
            <b>128</b>
            <em>▲ 12%</em>
          </div>
          <div className="kpi">
            <span>Revenue (EGP)</span>
            <b>46.2k</b>
            <em>▲ 8%</em>
          </div>
          <div className="kpi">
            <span>Avg. prep time</span>
            <b>9m</b>
            <em>▼ 2m</em>
          </div>
        </div>
        <div className="bars">
          {bars.map((h, i) => (
            <i key={i} className={i === 9 ? 'on' : ''} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="rws">
          <Row a="34%" b="18%" pill="Paid" />
          <Row a="28%" b="18%" pill="Preparing" />
          <Row a="40%" b="18%" pill="Delivered" />
        </div>
      </div>
    </div>
  )
}

export type MockKind = 'cases' | 'courses' | 'pos' | 'api'

export function ProjectMock({ kind }: { kind: MockKind }) {
  if (kind === 'cases')
    return (
      <div className="mk">
        <Side active={2} />
        <div className="mk-main">
          <div className="mk-top">
            <span className="mk-title">Cases</span>
            <span className="pill">+ New case</span>
          </div>
          <div className="kpis">
            <div className="kpi">
              <span>Active cases</span>
              <b>342</b>
            </div>
            <div className="kpi">
              <span>Donations</span>
              <b>EGP 1.2M</b>
            </div>
            <div className="kpi">
              <span>Commitments</span>
              <b>87</b>
            </div>
          </div>
          <div className="rws">
            <Row a="34%" b="18%" pill="Approved" />
            <Row a="28%" b="18%" pill="Pending" />
            <Row a="40%" b="18%" pill="Monthly" />
            <Row a="31%" b="18%" pill="Approved" />
            <Row a="34%" b="18%" pill="Review" />
          </div>
        </div>
      </div>
    )
  if (kind === 'courses' || kind === 'pos')
    return (
      <div className="mk">
        <Side active={kind === 'pos' ? 1 : 0} />
        <div className="mk-main">
          <div className="mk-top">
            <span className="mk-title">
              {kind === 'pos' ? 'Cashier · Table 4' : 'My courses'}
            </span>
            <span className="pill">{kind === 'pos' ? 'Dine-in' : 'AR · EN'}</span>
          </div>
          <div className="tiles">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="tile">
                <div className="img" />
                <span className="sk" style={w('70%')} />
                <span
                  className="sk"
                  style={w('40%', { background: i % 3 === 0 ? 'var(--acc)' : undefined })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  return (
    <div className="mk">
      <div className="mk-main">
        <div className="mk-top">
          <span className="mk-title">POST /api/auth/login</span>
          <span className="pill">200 OK</span>
        </div>
        <div className="code">
          <span className="c">{'// JWT + admin-defined page permissions\n'}</span>
          {'{\n  '}
          <span className="k">"token"</span>: <span className="s">"eyJhbGciOi…"</span>,
          {'\n  '}
          <span className="k">"user"</span>: {'{ '}
          <span className="k">"name"</span>: <span className="s">"Cashier 01"</span>
          {' },\n  '}
          <span className="k">"pages"</span>: [<span className="s">"pos"</span>,{' '}
          <span className="s">"orders"</span>],{'\n  '}
          <span className="k">"expiresIn"</span>: 3600{'\n}'}
        </div>
      </div>
    </div>
  )
}
