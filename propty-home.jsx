
// Propty Home Page
const { useState: useStateH, useEffect: useEffectH } = React;

function StatCounter({ end, prefix = '', suffix = '' }) {
  const [count, setCount] = useStateH(0);
  useEffectH(() => {
    let start = 0;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function HomePage({ setPage, onSignUp }) {
  const [heroHover, setHeroHover] = useStateH(null);
  const props = PROPTY_DATA.properties;
  const featured = props.filter(p => p.badge === 'Gold').slice(0, 3);

  const features = [
    { icon: '✓', color: '#10B981', title: 'Gold-Verified Listings', desc: 'Every listing passes our 3-step verification: document check, agent confirmation, and admin sign-off. No fakes, ever.' },
    { icon: '🤖', color: '#5B3DF6', title: 'AI Price Estimator', desc: 'Our ML model trained on 50,000+ BD transactions tells you instantly if a property is fairly priced, overpriced, or a great deal.' },
    { icon: '💬', color: '#0891B2', title: 'Encrypted Messaging', desc: 'Chat directly with verified agents. No phone numbers exposed until you\'re ready. All conversations tied to the listing.' },
    { icon: '🗺', color: '#F59E0B', title: 'Map-Based Discovery', desc: 'Draw a polygon on the map to search within your preferred neighbourhood. See price heatmaps by area.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Search & Filter', desc: 'Find properties by area, price, bedrooms, type. Shortlist what you love.' },
    { step: '02', title: 'Check Verification', desc: 'Every listing shows its badge — Gold, Silver, or Pending. See the full audit trail.' },
    { step: '03', title: 'Run AI Price Check', desc: 'Tap "Is this fairly priced?" and get a real-time AI verdict with comparable data.' },
    { step: '04', title: 'Book a Visit', desc: 'Schedule a site visit directly with the agent. SMS and email confirmations sent instantly.' },
  ];

  return (
    <div style={{ fontFamily: 'Prompt' }}>
      {/* HERO */}
      <div style={{ minHeight: '92vh', background: 'linear-gradient(145deg, #1E2938 0%, #0f1724 50%, #1a1040 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Background decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,61,246,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: 760, zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(91,61,246,0.2)', border: '1px solid rgba(91,61,246,0.4)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B3DF6', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Prompt', fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Bangladesh's First AI-Backed Real Estate Platform</span>
          </div>

          <h1 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', color: '#fff', lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-1px' }}>
            Find Your Perfect<br />
            <span style={{ background: 'linear-gradient(90deg, #5B3DF6, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Property in Bangladesh</span>
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', margin: '0 0 40px', lineHeight: 1.7, fontWeight: 400 }}>
            Verified listings. AI-powered pricing. Direct agent messaging.<br />
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>আমরা ডেটা বুঝি। আপনাকে বুঝি।</span>
          </p>

          <div style={{ maxWidth: 640, margin: '0 auto 28px' }}>
            <SearchBar onSearch={(q) => setPage({ key: 'search', query: q.query, priceType: q.type })} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
            {['Gulshan', 'Banani', 'Dhanmondi', 'Mirpur', 'Bashundhara'].map(a => (
              <button key={a} onClick={() => setPage({ key: 'search', query: a })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontFamily: 'Prompt', fontSize: 13, cursor: 'pointer', padding: 0, transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            {[
              { label: 'Verified Listings', value: 2847, suffix: '+' },
              { label: 'Active Agents', value: 412, suffix: '+' },
              { label: 'Cities Covered', value: 12, suffix: '' },
              { label: 'Deals Closed', value: 1940, suffix: '+' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 28, color: '#fff' }}>
                  <StatCounter end={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: 'Prompt', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 36, color: COLORS.navy, margin: '0 0 12px' }}>Why Propty Is Different</h2>
            <p style={{ fontFamily: 'Prompt', fontSize: 16, color: COLORS.slate, maxWidth: 480, margin: '0 auto' }}>We built the infrastructure of trust that Bangladesh real estate has always needed.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: COLORS.gray, borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.navy, margin: '0 0 10px' }}>{f.title}</h3>
                <p style={{ fontFamily: 'Prompt', fontSize: 14, color: COLORS.slate, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED LISTINGS */}
      <div style={{ background: COLORS.gray, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 32, color: COLORS.navy, margin: '0 0 6px' }}>Featured Listings</h2>
              <p style={{ fontFamily: 'Prompt', fontSize: 15, color: COLORS.slate, margin: 0 }}>Gold-verified, hand-picked properties</p>
            </div>
            <button onClick={() => setPage({ key: 'search' })} style={{ background: 'none', border: `1.5px solid ${COLORS.purple}`, borderRadius: 8, padding: '10px 20px', color: COLORS.purple, fontFamily: 'Prompt', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              View All →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {featured.map(p => <PropertyCard key={p.id} property={p} featured onClick={() => setPage({ key: 'listing', propertyId: p.id })} />)}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 36, color: COLORS.navy, margin: '0 0 12px' }}>How It Works</h2>
            <p style={{ fontFamily: 'Prompt', fontSize: 16, color: COLORS.slate, margin: 0 }}>From search to keys — simplified.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, position: 'relative' }}>
            {howItWorks.map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: COLORS.purpleLight, border: `2px solid ${COLORS.purple}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.purple }}>
                  {s.step}
                </div>
                <h3 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 17, color: COLORS.navy, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Prompt', fontSize: 14, color: COLORS.slate, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #1E2938 0%, #1a1040 100%)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 38, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
            Verified listings.<br /><span style={{ color: '#818CF8' }}>Guaranteed.</span>
          </div>
          <p style={{ fontFamily: 'Prompt', fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '0 0 36px', lineHeight: 1.7 }}>
            Our AI scans for duplicate images, copy-pasted descriptions, and address mismatches before any listing goes live. Every Gold badge listing has passed document OCR, agent GPS confirmation, and admin sign-off.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setPage({ key: 'search' })} style={{ padding: '14px 32px', background: COLORS.purple, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
              Browse Verified Listings
            </button>
            <button onClick={() => onSignUp && onSignUp('agent')} style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
              Join as Agent
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0f1724', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: COLORS.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Kanit', fontWeight: 700, fontSize: 15 }}>p</div>
          <span style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: '#fff' }}>Propty</span>
        </div>
        <p style={{ fontFamily: 'Prompt', fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '0 0 8px' }}>AI understands data. We understand you.</p>
        <p style={{ fontFamily: 'Prompt', fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>© 2025 Propty by JCX · proptybd.com · Confidential</p>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
