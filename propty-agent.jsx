
// Propty Agent Profile Page
const { useState: useStateA } = React;

function AgentPage({ agentId, setPage }) {
  const agent = PROPTY_DATA.agents.find(a => a.id === agentId) || PROPTY_DATA.agents[0];
  const listings = PROPTY_DATA.properties.filter(p => agent.listingIds.includes(p.id));
  const reviews = PROPTY_DATA.reviews.filter(r => r.agentId === agent.id);
  const [showContact, setShowContact] = useStateA(false);
  const [msgSent, setMsgSent] = useStateA(false);
  const [msg, setMsg] = useStateA('');

  const ratingBreakdown = [
    { label: 'Listing Accuracy', score: 4.9 },
    { label: 'Responsiveness', score: 4.8 },
    { label: 'Professionalism', score: 5.0 },
    { label: 'Area Knowledge', score: 4.9 },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: COLORS.gray }}>
      {/* Hero banner */}
      <div style={{ background: `linear-gradient(135deg, #1E2938, #1a1040)`, padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Back */}
          <button onClick={() => setPage({ key: 'search' })} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '7px 14px', fontFamily: 'Prompt', fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
            ← Back to Search
          </button>

          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ width: 96, height: 96, borderRadius: 20, background: agent.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Kanit', fontWeight: 700, fontSize: 36, flexShrink: 0, border: '4px solid rgba(255,255,255,0.2)' }}>
              {agent.initials}
            </div>
            <div style={{ flex: 1, paddingBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 28, color: '#fff', margin: 0 }}>{agent.name}</h1>
                {agent.verified && (
                  <span style={{ background: '#ECFDF5', color: '#059669', borderRadius: 6, padding: '3px 10px', fontFamily: 'Prompt', fontWeight: 600, fontSize: 12 }}>✓ ID Verified</span>
                )}
                <span style={{ background: COLORS.purpleLight, color: COLORS.purple, borderRadius: 6, padding: '3px 10px', fontFamily: 'Prompt', fontWeight: 600, fontSize: 12 }}>Pro Agent</span>
              </div>
              <div style={{ fontFamily: 'Prompt', fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}>{agent.title}</div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { icon: '★', label: `${agent.rating} Rating`, color: COLORS.amber },
                  { icon: '📋', label: `${agent.reviewCount} Reviews`, color: 'rgba(255,255,255,0.5)' },
                  { icon: '🏠', label: `${agent.deals} Deals`, color: 'rgba(255,255,255,0.5)' },
                  { icon: '⏱', label: agent.responseTime, color: 'rgba(255,255,255,0.5)' },
                ].map(s => (
                  <span key={s.label} style={{ fontFamily: 'Prompt', fontSize: 14, color: s.color, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span>{s.icon}</span> {s.label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ paddingBottom: 20, display: 'flex', gap: 10 }}>
              <button onClick={() => setShowContact(true)} style={{ padding: '11px 22px', background: COLORS.purple, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                💬 Message
              </button>
              <button style={{ padding: '11px 22px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                📞 Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* About */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.navy, margin: '0 0 14px' }}>About</h2>
            <p style={{ fontFamily: 'Prompt', fontSize: 14, color: COLORS.slate, lineHeight: 1.8, margin: '0 0 16px' }}>{agent.bio}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ background: COLORS.gray, borderRadius: 8, padding: '8px 14px' }}>
                <div style={{ fontFamily: 'Prompt', fontSize: 11, color: COLORS.slate }}>Experience</div>
                <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{agent.experience} years</div>
              </div>
              <div style={{ background: COLORS.gray, borderRadius: 8, padding: '8px 14px' }}>
                <div style={{ fontFamily: 'Prompt', fontSize: 11, color: COLORS.slate }}>Languages</div>
                <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{agent.languages.join(', ')}</div>
              </div>
              <div style={{ background: COLORS.gray, borderRadius: 8, padding: '8px 14px' }}>
                <div style={{ fontFamily: 'Prompt', fontSize: 11, color: COLORS.slate }}>Specialist Areas</div>
                <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{agent.areas.slice(0,2).join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Active Listings */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.navy, margin: '0 0 16px' }}>
              Active Listings <span style={{ fontFamily: 'Prompt', fontWeight: 400, fontSize: 14, color: COLORS.slate }}>({listings.length})</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {listings.map(p => (
                <PropertyCard key={p.id} property={p} onClick={() => setPage({ key: 'listing', propertyId: p.id })} />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.navy, margin: 0 }}>
                Client Reviews
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 22, color: COLORS.amber }}>★</span>
                <span style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 22, color: COLORS.navy }}>{agent.rating}</span>
                <span style={{ fontFamily: 'Prompt', fontSize: 13, color: COLORS.slate }}>/ 5.0 · {agent.reviewCount} reviews</span>
              </div>
            </div>

            {/* Rating breakdown */}
            <div style={{ background: COLORS.gray, borderRadius: 10, padding: 16, marginBottom: 20 }}>
              {ratingBreakdown.map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Prompt', fontSize: 13, color: COLORS.slate, width: 160, flexShrink: 0 }}>{r.label}</span>
                  <div style={{ flex: 1, height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(r.score / 5) * 100}%`, background: COLORS.purple, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 14, color: COLORS.navy, width: 32, textAlign: 'right' }}>{r.score}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ borderBottom: i < reviews.length - 1 ? '1px solid #F3F4F6' : 'none', paddingBottom: i < reviews.length - 1 ? 16 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <span style={{ fontFamily: 'Kanit', fontWeight: 600, fontSize: 14, color: COLORS.navy }}>{r.reviewer}</span>
                      <span style={{ marginLeft: 10, fontFamily: 'Prompt', fontSize: 12, color: COLORS.slate }}>{r.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ color: s <= r.rating ? COLORS.amber : '#E5E7EB', fontSize: 14 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Prompt', fontSize: 13, color: COLORS.slate, lineHeight: 1.7, margin: '0 0 4px' }}>{r.text}</p>
                  <span style={{ fontFamily: 'Prompt', fontSize: 11, color: COLORS.purple }}>✓ {r.deal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — sticky */}
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Performance card */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', padding: 20 }}>
            <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 16, color: COLORS.navy, marginBottom: 16 }}>Performance</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Total Deals', value: agent.deals, icon: '🏠' },
                { label: 'Avg Rating', value: agent.rating, icon: '★' },
                { label: 'Reviews', value: agent.reviewCount, icon: '💬' },
                { label: 'Response', value: agent.responseTime, icon: '⚡' },
              ].map(s => (
                <div key={s.label} style={{ background: COLORS.gray, borderRadius: 10, padding: '12px' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 18, color: COLORS.navy }}>{s.value}</div>
                  <div style={{ fontFamily: 'Prompt', fontSize: 11, color: COLORS.slate }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialist areas */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', padding: 20 }}>
            <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 16, color: COLORS.navy, marginBottom: 12 }}>Specialist Areas</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {agent.areas.map(a => (
                <span key={a} style={{ background: COLORS.purpleLight, color: COLORS.purple, borderRadius: 8, padding: '5px 12px', fontFamily: 'Prompt', fontWeight: 500, fontSize: 13 }}>
                  📍 {a}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #4527D4)`, borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 6 }}>Ready to find your home?</div>
            <div style={{ fontFamily: 'Prompt', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Talk to {agent.name.split(' ')[0]} today.</div>
            <button onClick={() => setShowContact(true)} style={{ width: '100%', padding: '12px', background: '#fff', color: COLORS.purple, border: 'none', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Send a Message
            </button>
          </div>
        </div>
      </div>

      <Modal open={showContact} onClose={() => setShowContact(false)} title={`Message ${agent.name.split(' ')[0]}`}>
        {msgSent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✉️</div>
            <div style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: 20, color: COLORS.navy, marginBottom: 8 }}>Message Sent!</div>
            <div style={{ fontFamily: 'Prompt', fontSize: 14, color: COLORS.slate, marginBottom: 20 }}>{agent.name} will reply within {agent.responseTime}.</div>
            <button onClick={() => { setShowContact(false); setMsgSent(false); setMsg(''); }} style={{ padding: '11px 28px', background: COLORS.purple, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Done</button>
          </div>
        ) : (
          <div>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder={`Hi ${agent.name.split(' ')[0]}, I'm looking for a property in ${agent.areas[0]}...`}
              style={{ width: '100%', height: 120, padding: '12px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontFamily: 'Prompt', fontSize: 14, color: COLORS.navy, resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
            <button onClick={() => setMsgSent(true)} disabled={!msg.trim()} style={{ width: '100%', padding: '12px', background: msg.trim() ? COLORS.purple : '#E5E7EB', color: msg.trim() ? '#fff' : COLORS.slate, border: 'none', borderRadius: 10, fontFamily: 'Kanit', fontWeight: 600, fontSize: 15, cursor: msg.trim() ? 'pointer' : 'not-allowed' }}>
              Send Message
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

window.AgentPage = AgentPage;
