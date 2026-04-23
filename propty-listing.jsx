
// Propty Listing Detail Page
const { useState: useStateL, useEffect: useEffectL } = React;

function AIPriceCheck({ property }) {
  const [state, setState] = useStateL('idle'); // idle | loading | done
  const [result, setResult] = useStateL(null);

  const runCheck = async () => {
    setState('loading');
    try {
      const prompt = `You are Propty's AI Price Estimator for Bangladesh real estate. Analyze this property and give a concise price verdict.

Property: ${property.title}
Location: ${property.location.area}, ${property.location.city}
Type: ${property.type}, ${property.furnishing}
Size: ${property.area} sqft, Floor ${property.floor}/${property.totalFloors}
Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}
Price: ৳${property.price.toLocaleString()}${property.priceType === 'rent' ? '/month' : ' (sale)'}
Price per sqft: ৳${property.pricePerSqft}
Parking: ${property.parking ? 'Yes' : 'No'}
Amenities: ${property.amenities.join(', ')}

Give a response in this exact JSON format (no markdown):
{
  "verdict": "Fair Price" or "Good Deal" or "Overpriced",
  "confidence": 85,
  "yourPrice": 82000,
  "marketRange": {"low": 75000, "high": 95000},
  "avgAreaPsf": 45,
  "reasoning": "2-3 sentences explaining the verdict, mentioning the area and comparable properties.",
  "tips": ["One negotiation tip", "One thing to check before signing"]
}`;

      const text = await window.claude.complete(prompt);
      const json = JSON.parse(text.trim());
      setResult(json);
      setState('done');
    } catch (e) {
      setState('error');
    }
  };

  const verdictColor = result?.verdict === 'Good Deal' ? COLORS.green : result?.verdict === 'Overpriced' ? COLORS.red : COLORS.amber;

  return (
    <div style={{ background: COLORS.purpleLight, borderRadius: 14, padding: 20, border: `1.5px solid ${COLORS.purple}30` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: state === 'idle' ? 14 : 16 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:COLORS.purple, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
        <div>
          <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:16, color:COLORS.navy }}>Propty AI Price Check</div>
          <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate }}>Powered by our ML model · 50K+ BD transactions</div>
        </div>
      </div>

      {state === 'idle' && (
        <button onClick={runCheck} style={{ width:'100%', padding:'12px', background:COLORS.purple, color:'#fff', border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor:'pointer', transition:'opacity 0.15s' }}
          onMouseEnter={e => e.target.style.opacity='0.9'} onMouseLeave={e => e.target.style.opacity='1'}>
          Is this fairly priced? →
        </button>
      )}

      {state === 'loading' && (
        <div style={{ textAlign:'center', padding:'20px 0' }}>
          <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate, marginBottom:8 }}>Analysing 50,000+ comparable transactions...</div>
          <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:COLORS.purple, animation:`bounce 1s ${i*0.2}s infinite`, opacity:0.7 }} />
            ))}
          </div>
          <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.6)} 40%{transform:scale(1)} }`}</style>
        </div>
      )}

      {state === 'error' && (
        <div style={{ textAlign:'center', padding:'16px 0', fontFamily:'Prompt', fontSize:14, color: COLORS.red }}>
          Could not connect to AI right now. <button onClick={() => setState('idle')} style={{ color:COLORS.purple, background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Try again</button>
        </div>
      )}

      {state === 'done' && result && (
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background: verdictColor + '15', border:`1.5px solid ${verdictColor}40`, borderRadius:10, padding:'8px 14px' }}>
              <span style={{ fontSize:20 }}>{result.verdict === 'Good Deal' ? '✅' : result.verdict === 'Overpriced' ? '⚠️' : '🟡'}</span>
              <span style={{ fontFamily:'Kanit', fontWeight:700, fontSize:18, color: verdictColor }}>{result.verdict}</span>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate }}>AI Confidence</div>
              <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:20, color:COLORS.navy }}>{result.confidence}%</div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'14px 16px', marginBottom:12 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, textAlign:'center' }}>
              <div>
                <div style={{ fontFamily:'Prompt', fontSize:11, color:COLORS.slate, marginBottom:3 }}>Market Low</div>
                <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:15, color:COLORS.navy }}>৳{result.marketRange?.low?.toLocaleString()}</div>
              </div>
              <div style={{ borderLeft:'1px solid #E5E7EB', borderRight:'1px solid #E5E7EB' }}>
                <div style={{ fontFamily:'Prompt', fontSize:11, color:COLORS.slate, marginBottom:3 }}>AI Estimate</div>
                <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:15, color:COLORS.purple }}>৳{result.yourPrice?.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontFamily:'Prompt', fontSize:11, color:COLORS.slate, marginBottom:3 }}>Market High</div>
                <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:15, color:COLORS.navy }}>৳{result.marketRange?.high?.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <p style={{ fontFamily:'Prompt', fontSize:13, color:COLORS.slate, lineHeight:1.7, margin:'0 0 12px' }}>{result.reasoning}</p>

          {result.tips && result.tips.length > 0 && (
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {result.tips.map((tip, i) => (
                <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontFamily:'Prompt', fontSize:12, color:COLORS.navy }}>
                  <span style={{ color:COLORS.purple, flexShrink:0 }}>→</span> {tip}
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setState('idle')} style={{ marginTop:12, background:'none', border:'none', color:COLORS.purple, fontFamily:'Prompt', fontSize:12, cursor:'pointer', fontWeight:600 }}>
            ↺ Run again
          </button>
        </div>
      )}
    </div>
  );
}

function BookVisitModal({ open, onClose, agent, property }) {
  const [selectedDate, setSelectedDate] = useStateL('');
  const [selectedTime, setSelectedTime] = useStateL('');
  const [booked, setBooked] = useStateL(false);

  const dates = ['Thu, 24 Apr', 'Fri, 25 Apr', 'Sat, 26 Apr', 'Sun, 27 Apr', 'Mon, 28 Apr'];
  const times = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

  if (booked) return (
    <Modal open={open} onClose={() => { onClose(); setBooked(false); }} title="Visit Confirmed ✓">
      <div style={{ textAlign:'center', padding:'24px 0' }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
        <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:22, color:COLORS.navy, marginBottom:8 }}>Visit Booked!</div>
        <div style={{ fontFamily:'Prompt', fontSize:15, color:COLORS.slate, marginBottom:6 }}>{selectedDate} at {selectedTime}</div>
        <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate, marginBottom:24 }}>with {agent?.name}</div>
        <div style={{ background: COLORS.purpleLight, borderRadius:10, padding:'12px 16px', display:'flex', gap:10, alignItems:'flex-start', textAlign:'left', marginBottom:20 }}>
          <span style={{ fontSize:20 }}>📱</span>
          <div>
            <div style={{ fontFamily:'Kanit', fontWeight:600, fontSize:14, color:COLORS.navy, marginBottom:2 }}>Confirmation sent</div>
            <div style={{ fontFamily:'Prompt', fontSize:13, color:COLORS.slate }}>SMS and email confirmation sent. Your agent will call 1 hour before the visit.</div>
          </div>
        </div>
        <button onClick={() => { onClose(); setBooked(false); }} style={{ width:'100%', padding:'12px', background:COLORS.purple, color:'#fff', border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor:'pointer' }}>
          Done
        </button>
      </div>
    </Modal>
  );

  return (
    <Modal open={open} onClose={onClose} title="Book a Property Visit">
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'Prompt', fontSize:13, color:COLORS.slate, marginBottom:4 }}>Property</div>
        <div style={{ fontFamily:'Kanit', fontWeight:600, fontSize:15, color:COLORS.navy }}>{property?.title}</div>
      </div>

      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'Prompt', fontSize:13, fontWeight:600, color:COLORS.slate, marginBottom:10, textTransform:'uppercase', letterSpacing:'0.5px', fontSize:11 }}>Select Date</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {dates.map(d => (
            <button key={d} onClick={() => setSelectedDate(d)} style={{ padding:'8px 12px', borderRadius:8, border:`1.5px solid ${selectedDate===d?COLORS.purple:'#E5E7EB'}`, background: selectedDate===d?COLORS.purpleLight:'#fff', color: selectedDate===d?COLORS.purple:COLORS.navy, fontFamily:'Prompt', fontWeight:500, fontSize:13, cursor:'pointer', transition:'all 0.12s' }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'Prompt', fontSize:11, fontWeight:600, color:COLORS.slate, marginBottom:10, textTransform:'uppercase', letterSpacing:'0.5px' }}>Select Time Slot</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {times.map(t => (
            <button key={t} onClick={() => setSelectedTime(t)} style={{ padding:'8px 14px', borderRadius:8, border:`1.5px solid ${selectedTime===t?COLORS.purple:'#E5E7EB'}`, background: selectedTime===t?COLORS.purpleLight:'#fff', color: selectedTime===t?COLORS.purple:COLORS.navy, fontFamily:'Prompt', fontWeight:500, fontSize:13, cursor:'pointer', transition:'all 0.12s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <button disabled={!selectedDate || !selectedTime} onClick={() => setBooked(true)}
        style={{ width:'100%', padding:'13px', background: selectedDate&&selectedTime ? COLORS.purple : '#E5E7EB', color: selectedDate&&selectedTime ? '#fff' : COLORS.slate, border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor: selectedDate&&selectedTime ? 'pointer' : 'not-allowed', transition:'all 0.15s' }}>
        Confirm Visit
      </button>
    </Modal>
  );
}

function ListingPage({ propertyId, setPage }) {
  const property = PROPTY_DATA.properties.find(p => p.id === propertyId) || PROPTY_DATA.properties[0];
  const agent = PROPTY_DATA.agents.find(a => a.id === property.agentId);
  const [activeImg, setActiveImg] = useStateL(0);
  const [showBook, setShowBook] = useStateL(false);
  const [showContact, setShowContact] = useStateL(false);
  const [wishlisted, setWishlisted] = useStateL(false);
  const [msgSent, setMsgSent] = useStateL(false);
  const [msg, setMsg] = useStateL('');

  const similar = PROPTY_DATA.properties.filter(p => p.id !== property.id && p.priceType === property.priceType).slice(0,3);
  const grad = `linear-gradient(135deg, ${property.colors[0]}, ${property.colors[1]})`;

  const imgPanels = [0,1,2].map(i => ({ label: ['Main View','Living Room','Bedroom'][i], grad }));

  return (
    <div style={{ paddingTop:68, minHeight:'100vh', background:COLORS.gray }}>
      {/* Breadcrumb */}
      <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', padding:'10px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', gap:8, fontFamily:'Prompt', fontSize:13 }}>
          <span style={{ color:COLORS.purple, cursor:'pointer' }} onClick={() => setPage({ key:'home' })}>Home</span>
          <span style={{ color:COLORS.grayDark }}>›</span>
          <span style={{ color:COLORS.purple, cursor:'pointer' }} onClick={() => setPage({ key:'search', priceType: property.priceType })}>
            Properties for {property.priceType === 'rent' ? 'Rent' : 'Sale'}
          </span>
          <span style={{ color:COLORS.grayDark }}>›</span>
          <span style={{ color:COLORS.slate }}>{property.location.area}</span>
          <span style={{ color:COLORS.grayDark }}>›</span>
          <span style={{ color:COLORS.navy, fontWeight:500 }}>{property.title}</span>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'24px 24px', display:'grid', gridTemplateColumns:'1fr 360px', gap:24, alignItems:'start' }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Gallery */}
          <div style={{ borderRadius:16, overflow:'hidden', marginBottom:20 }}>
            <div style={{ height:400, background: grad, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <div style={{ textAlign:'center' }}>
                <svg width="120" height="90" viewBox="0 0 80 60" fill="none">
                  <rect x="15" y="30" width="50" height="28" fill="rgba(255,255,255,0.2)" rx="2"/>
                  <polygon points="10,30 40,8 70,30" fill="rgba(255,255,255,0.3)"/>
                  <rect x="25" y="38" width="10" height="10" fill="rgba(255,255,255,0.4)" rx="1"/>
                  <rect x="45" y="38" width="10" height="10" fill="rgba(255,255,255,0.4)" rx="1"/>
                  <rect x="33" y="42" width="14" height="16" fill="rgba(255,255,255,0.5)" rx="1"/>
                </svg>
                <div style={{ fontFamily:'Prompt', fontSize:14, color:'rgba(255,255,255,0.7)', marginTop:8 }}>{imgPanels[activeImg].label}</div>
              </div>
              <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:8 }}>
                <VerifiedBadge badge={property.badge} size="md" />
                <button onClick={() => setWishlisted(!wishlisted)} style={{ background:'rgba(0,0,0,0.4)', border:'none', borderRadius:8, padding:'6px 10px', cursor:'pointer', fontSize:16, backdropFilter:'blur(4px)' }}>
                  {wishlisted ? '❤️' : '🤍'}
                </button>
              </div>
              <div style={{ position:'absolute', bottom:12, left:12, fontFamily:'Prompt', fontSize:12, color:'rgba(255,255,255,0.7)' }}>
                👁 {property.views} views · Listed {property.postedDays} days ago
              </div>
            </div>
            <div style={{ display:'flex', gap:8, padding:'10px', background:'#fff', borderTop:'1px solid #E5E7EB' }}>
              {imgPanels.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ flex:1, height:72, background: i === activeImg ? grad : '#F3F4F6', borderRadius:8, cursor:'pointer', border:`2px solid ${activeImg===i?COLORS.purple:'transparent'}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Prompt', fontSize:12, color: i===activeImg?'rgba(255,255,255,0.9)':COLORS.slate, transition:'all 0.15s', overflow:'hidden' }}>
                  {img.label}
                </div>
              ))}
              <div style={{ flex:1, height:72, background:COLORS.gray, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Prompt', fontSize:12, color:COLORS.slate, cursor:'pointer', border:'2px solid transparent' }}>
                +27 Photos
              </div>
            </div>
          </div>

          {/* Title & price */}
          <div style={{ background:'#fff', borderRadius:14, padding:'24px', marginBottom:20, border:'1px solid #E5E7EB' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:16 }}>
              <div>
                <h1 style={{ fontFamily:'Kanit', fontWeight:700, fontSize:26, color:COLORS.navy, margin:'0 0 6px' }}>{property.title}</h1>
                <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate }}>
                  📍 {property.location.area}, {property.location.thana}, {property.location.city}
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <PriceTag price={property.price} priceType={property.priceType} />
                <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate, marginTop:2 }}>৳{property.pricePerSqft}/sqft</div>
              </div>
            </div>

            {/* Quick specs */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', padding:'16px 0', borderTop:'1px solid #F3F4F6', borderBottom:'1px solid #F3F4F6', marginBottom:16 }}>
              {[
                { icon:'🛏', label:`${property.bedrooms} Bedrooms` },
                { icon:'🚿', label:`${property.bathrooms} Bathrooms` },
                { icon:'📐', label:`${property.area.toLocaleString()} sqft` },
                { icon:'🏢', label:`Floor ${property.floor}/${property.totalFloors}` },
                { icon:'🧭', label:`${property.facing}-facing` },
                { icon:'🏠', label:property.type },
                { icon:'🛋', label:property.furnishing },
                { icon:'🚗', label: property.parking ? 'Parking Incl.' : 'No Parking' },
              ].map(s => (
                <div key={s.label} style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Prompt', fontSize:14, color:COLORS.navy }}>
                  <span style={{ fontSize:16 }}>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>

            <p style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate, lineHeight:1.8, margin:0 }}>{property.description}</p>
          </div>

          {/* Amenities */}
          <div style={{ background:'#fff', borderRadius:14, padding:'24px', marginBottom:20, border:'1px solid #E5E7EB' }}>
            <h2 style={{ fontFamily:'Kanit', fontWeight:700, fontSize:18, color:COLORS.navy, margin:'0 0 16px' }}>Amenities & Features</h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {property.amenities.map(a => (
                <span key={a} style={{ background:COLORS.purpleLight, color:COLORS.purple, borderRadius:8, padding:'6px 14px', fontFamily:'Prompt', fontSize:13, fontWeight:500 }}>
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>

          {/* AI Price Check */}
          <div style={{ marginBottom:20 }}>
            <AIPriceCheck property={property} />
          </div>

          {/* Similar listings */}
          <div style={{ background:'#fff', borderRadius:14, padding:'24px', border:'1px solid #E5E7EB' }}>
            <h2 style={{ fontFamily:'Kanit', fontWeight:700, fontSize:18, color:COLORS.navy, margin:'0 0 16px' }}>Similar Properties</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:14 }}>
              {similar.map(p => <PropertyCard key={p.id} property={p} onClick={() => setPage({ key:'listing', propertyId:p.id })} />)}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - sticky agent card */}
        <div style={{ position:'sticky', top:88, display:'flex', flexDirection:'column', gap:16 }}>
          {/* CTA card */}
          <div style={{ background:'#fff', borderRadius:14, border:`1.5px solid ${COLORS.purple}30`, padding:20 }}>
            <PriceTag price={property.price} priceType={property.priceType} />
            <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate, marginTop:2, marginBottom:18 }}>
              ৳{property.pricePerSqft}/sqft · {property.furnishing}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <button onClick={() => setShowBook(true)} style={{ padding:'13px', background:COLORS.purple, color:'#fff', border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor:'pointer', transition:'opacity 0.15s' }}
                onMouseEnter={e=>e.target.style.opacity='0.9'} onMouseLeave={e=>e.target.style.opacity='1'}>
                📅 Book a Visit
              </button>
              <button onClick={() => setShowContact(true)} style={{ padding:'13px', background:'#fff', color:COLORS.purple, border:`1.5px solid ${COLORS.purple}`, borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor:'pointer' }}>
                💬 Message Agent
              </button>
              <button style={{ padding:'11px', background:'#ECFDF5', color:'#059669', border:'1.5px solid #A7F3D0', borderRadius:10, fontFamily:'Prompt', fontWeight:600, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>💬</span> WhatsApp
              </button>
            </div>
          </div>

          {/* Agent card */}
          {agent && (
            <div style={{ background:'#fff', borderRadius:14, border:'1px solid #E5E7EB', padding:20 }}>
              <div style={{ fontFamily:'Prompt', fontSize:11, fontWeight:600, color:COLORS.slate, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Listed by</div>
              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:14 }}>
                <div style={{ width:52, height:52, borderRadius:12, background:agent.avatar, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Kanit', fontWeight:700, fontSize:18, flexShrink:0 }}>
                  {agent.initials}
                </div>
                <div>
                  <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:15, color:COLORS.navy, display:'flex', alignItems:'center', gap:6 }}>
                    {agent.name} {agent.verified && <span style={{ color:COLORS.green, fontSize:14 }}>✓</span>}
                  </div>
                  <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate }}>{agent.title}</div>
                  <StarRating rating={agent.rating} count={agent.reviewCount} />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
                {[
                  { label:'Deals', value: agent.deals },
                  { label:'Experience', value: `${agent.experience}y` },
                  { label:'Response', value: agent.responseTime },
                  { label:'Areas', value: agent.areas[0] },
                ].map(s => (
                  <div key={s.label} style={{ background:COLORS.gray, borderRadius:8, padding:'8px 10px' }}>
                    <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:14, color:COLORS.navy }}>{s.value}</div>
                    <div style={{ fontFamily:'Prompt', fontSize:11, color:COLORS.slate }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage({ key:'agent', agentId: agent.id })} style={{ width:'100%', padding:'10px', background:COLORS.gray, border:'none', borderRadius:9, fontFamily:'Prompt', fontWeight:600, fontSize:13, color:COLORS.navy, cursor:'pointer' }}>
                View Agent Profile →
              </button>
            </div>
          )}

          {/* Verification trail */}
          <div style={{ background:'#fff', borderRadius:14, border:'1px solid #E5E7EB', padding:20 }}>
            <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:15, color:COLORS.navy, marginBottom:14 }}>Verification Trail</div>
            {[
              { step:'Document Check', done: true, desc:'Title deed verified via OCR' },
              { step:'Agent Confirmation', done: true, desc:'GPS-tagged site photo confirmed' },
              { step:'Admin Sign-off', done: property.badge === 'Gold', desc: property.badge === 'Gold' ? 'QA passed · Gold badge issued' : 'Pending review' },
            ].map((v, i) => (
              <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom: i < 2 ? 12 : 0 }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background: v.done ? COLORS.green : COLORS.grayMid, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, flexShrink:0, marginTop:1 }}>
                  {v.done ? '✓' : '○'}
                </div>
                <div>
                  <div style={{ fontFamily:'Prompt', fontWeight:600, fontSize:13, color: v.done ? COLORS.navy : COLORS.slate }}>{v.step}</div>
                  <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookVisitModal open={showBook} onClose={() => setShowBook(false)} agent={agent} property={property} />

      <Modal open={showContact} onClose={() => setShowContact(false)} title="Message Agent">
        {msgSent ? (
          <div style={{ textAlign:'center', padding:'24px 0' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✉️</div>
            <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:20, color:COLORS.navy, marginBottom:8 }}>Message Sent!</div>
            <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate }}>{agent?.name} typically replies in {agent?.responseTime}.</div>
            <button onClick={() => { setShowContact(false); setMsgSent(false); setMsg(''); }} style={{ marginTop:20, padding:'11px 28px', background:COLORS.purple, color:'#fff', border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor:'pointer' }}>Done</button>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate, marginBottom:16 }}>Sending to: <strong style={{ color:COLORS.navy }}>{agent?.name}</strong></div>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder={`Hi ${agent?.name?.split(' ')[0]}, I'm interested in ${property.title}. Is it still available?`}
              style={{ width:'100%', height:120, padding:'12px', borderRadius:10, border:'1.5px solid #E5E7EB', fontFamily:'Prompt', fontSize:14, color:COLORS.navy, resize:'none', outline:'none', boxSizing:'border-box' }} />
            <button onClick={() => setMsgSent(true)} disabled={!msg.trim()} style={{ width:'100%', marginTop:12, padding:'12px', background: msg.trim() ? COLORS.purple : '#E5E7EB', color: msg.trim() ? '#fff' : COLORS.slate, border:'none', borderRadius:10, fontFamily:'Kanit', fontWeight:600, fontSize:15, cursor: msg.trim() ? 'pointer' : 'not-allowed' }}>
              Send Message
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

window.ListingPage = ListingPage;
