
// Propty Search Page
const { useState: useStateS, useEffect: useEffectS } = React;

function MapView({ properties, selectedId, onSelect }) {
  const areas = PROPTY_DATA.areas;
  return (
    <div style={{ width:'100%', height:'100%', background:'#e8f0f7', borderRadius:12, position:'relative', overflow:'hidden' }}>
      {/* Grid lines */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.3 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {[10,20,30,40,50,60,70,80,90].map(n => (
          <React.Fragment key={n}>
            <line x1={n} y1="0" x2={n} y2="100" stroke="#94a3b8" strokeWidth="0.3"/>
            <line x1="0" y1={n} x2="100" y2={n} stroke="#94a3b8" strokeWidth="0.3"/>
          </React.Fragment>
        ))}
      </svg>

      {/* Road-like shapes */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.25 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 50 0 L 50 100" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
        <path d="M 0 50 L 100 50" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
        <path d="M 30 0 L 70 100" stroke="#94a3b8" strokeWidth="0.7" fill="none"/>
        <path d="M 0 30 L 100 70" stroke="#94a3b8" strokeWidth="0.7" fill="none"/>
        <circle cx="65" cy="45" r="8" stroke="#b0c4de" strokeWidth="0.8" fill="rgba(144,190,224,0.3)"/>
      </svg>

      {/* Water body (Buriganga-like) */}
      <div style={{ position:'absolute', bottom:'15%', left:'5%', right:'40%', height:'8%', background:'rgba(96,165,250,0.35)', borderRadius:100 }} />

      {/* Area bubbles */}
      {areas.map(a => (
        <div key={a.name} style={{ position:'absolute', left:`${a.x}%`, top:`${a.y}%`, transform:'translate(-50%,-50%)', cursor:'pointer', zIndex:2 }}
          onClick={() => {}}>
          <div style={{ background: COLORS.purple, color:'#fff', borderRadius:20, padding:'4px 10px', fontSize:11, fontFamily:'Prompt', fontWeight:600, whiteSpace:'nowrap', boxShadow:'0 2px 8px rgba(91,61,246,0.4)', opacity:0.85 }}>
            {a.name} <span style={{ opacity:0.7 }}>{a.count}</span>
          </div>
        </div>
      ))}

      {/* Property pins */}
      {properties.map(p => (
        <div key={p.id} style={{ position:'absolute', left:`${((p.lng - 90.36) / 0.08 * 100)}%`, top:`${((23.87 - p.lat) / 0.13 * 100)}%`, transform:'translate(-50%,-50%)', cursor:'pointer', zIndex: selectedId === p.id ? 10 : 3, transition:'all 0.2s' }}
          onClick={() => onSelect(p)}>
          <div style={{ background: selectedId === p.id ? COLORS.navy : COLORS.purple, color:'#fff', borderRadius:8, padding:'3px 8px', fontSize:11, fontFamily:'Kanit', fontWeight:700, boxShadow:'0 2px 6px rgba(0,0,0,0.25)', border: selectedId === p.id ? `2px solid ${COLORS.amber}` : 'none', transform: selectedId === p.id ? 'scale(1.15)' : 'scale(1)', whiteSpace:'nowrap' }}>
            {p.priceType === 'rent' ? `৳${Math.round(p.price/1000)}k` : `৳${(p.price/10000000).toFixed(1)}Cr`}
          </div>
          <div style={{ width:6, height:6, background: selectedId === p.id ? COLORS.navy : COLORS.purple, borderRadius:'50%', margin:'0 auto', marginTop:-2 }} />
        </div>
      ))}

      {/* Map label */}
      <div style={{ position:'absolute', bottom:10, right:12, fontFamily:'Prompt', fontSize:10, color:'#94a3b8' }}>Dhaka, Bangladesh</div>
    </div>
  );
}

function FilterSidebar({ filters, onChange }) {
  const areas = ['All Areas', 'Gulshan', 'Banani', 'Baridhara', 'Dhanmondi', 'Mirpur', 'Uttara', 'Bashundhara', 'Mohakhali'];
  const types = ['All Types', 'Apartment', 'House', 'Duplex', 'Studio', 'Commercial'];

  return (
    <div style={{ background:'#fff', borderRadius:14, border:'1px solid #E5E7EB', padding:20, display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:16, color:COLORS.navy }}>Filters</div>

      {/* Type toggle */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Looking to</label>
        <div style={{ display:'flex', background:COLORS.gray, borderRadius:8, padding:3 }}>
          {['rent','sale'].map(t => (
            <button key={t} onClick={() => onChange({ ...filters, priceType: t })} style={{ flex:1, padding:'7px', border:'none', borderRadius:6, fontFamily:'Prompt', fontWeight:600, fontSize:13, cursor:'pointer', transition:'all 0.15s', background: filters.priceType===t ? COLORS.purple : 'transparent', color: filters.priceType===t ? '#fff' : COLORS.slate }}>
              {t === 'rent' ? 'Rent' : 'Buy'}
            </button>
          ))}
        </div>
      </div>

      {/* Area */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Area</label>
        <select value={filters.area || 'All Areas'} onChange={e => onChange({ ...filters, area: e.target.value === 'All Areas' ? '' : e.target.value })}
          style={{ width:'100%', padding:'9px 12px', borderRadius:8, border:'1.5px solid #E5E7EB', fontFamily:'Prompt', fontSize:14, color:COLORS.navy, background:'#fff', outline:'none' }}>
          {areas.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      {/* Property type */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Property Type</label>
        <select value={filters.type || 'All Types'} onChange={e => onChange({ ...filters, type: e.target.value === 'All Types' ? '' : e.target.value })}
          style={{ width:'100%', padding:'9px 12px', borderRadius:8, border:'1.5px solid #E5E7EB', fontFamily:'Prompt', fontSize:14, color:COLORS.navy, background:'#fff', outline:'none' }}>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Bedrooms</label>
        <div style={{ display:'flex', gap:6 }}>
          {['Any','1','2','3','4','5+'].map(b => (
            <button key={b} onClick={() => onChange({ ...filters, beds: b === 'Any' ? '' : b })}
              style={{ flex:1, padding:'7px 4px', border:`1.5px solid ${filters.beds === (b==='Any'?'':b) || (!filters.beds && b==='Any') ? COLORS.purple : '#E5E7EB'}`, borderRadius:7, background: (filters.beds === (b==='Any'?'':b) || (!filters.beds && b==='Any')) ? COLORS.purpleLight : '#fff', color: (filters.beds === (b==='Any'?'':b) || (!filters.beds && b==='Any')) ? COLORS.purple : COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:13, cursor:'pointer', transition:'all 0.12s' }}>
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>
          Max Price {filters.priceType === 'rent' ? '(BDT/mo)' : '(Crore BDT)'}
        </label>
        {filters.priceType === 'rent' ? (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {[30000,50000,80000,120000,0].map(p => (
              <button key={p} onClick={() => onChange({ ...filters, maxPrice: p || null })}
                style={{ padding:'5px 10px', borderRadius:6, border:`1.5px solid ${filters.maxPrice===p||(p===0&&!filters.maxPrice)?COLORS.purple:'#E5E7EB'}`, background:(filters.maxPrice===p||(p===0&&!filters.maxPrice))?COLORS.purpleLight:'#fff', color:(filters.maxPrice===p||(p===0&&!filters.maxPrice))?COLORS.purple:COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all 0.12s' }}>
                {p ? `৳${p/1000}k` : 'Any'}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {[1,2,5,10,0].map(p => (
              <button key={p} onClick={() => onChange({ ...filters, maxPrice: p ? p*10000000 : null })}
                style={{ padding:'5px 10px', borderRadius:6, border:`1.5px solid ${filters.maxPrice===p*10000000||(p===0&&!filters.maxPrice)?COLORS.purple:'#E5E7EB'}`, background:(filters.maxPrice===p*10000000||(p===0&&!filters.maxPrice))?COLORS.purpleLight:'#fff', color:(filters.maxPrice===p*10000000||(p===0&&!filters.maxPrice))?COLORS.purple:COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all 0.12s' }}>
                {p ? `${p} Cr` : 'Any'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Badge */}
      <div>
        <label style={{ fontFamily:'Prompt', fontSize:12, fontWeight:600, color:COLORS.slate, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Verification</label>
        <div style={{ display:'flex', gap:6 }}>
          {['All','Gold','Silver'].map(b => (
            <button key={b} onClick={() => onChange({ ...filters, badge: b === 'All' ? '' : b })}
              style={{ flex:1, padding:'7px 4px', border:`1.5px solid ${(filters.badge||'All')===b?COLORS.purple:'#E5E7EB'}`, borderRadius:7, background:(filters.badge||'All')===b?COLORS.purpleLight:'#fff', color:(filters.badge||'All')===b?COLORS.purple:COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:12, cursor:'pointer', transition:'all 0.12s' }}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => onChange({ priceType:'rent' })} style={{ padding:'10px', background:COLORS.gray, border:'none', borderRadius:8, fontFamily:'Prompt', fontWeight:600, fontSize:13, color:COLORS.slate, cursor:'pointer' }}>
        Clear All Filters
      </button>
    </div>
  );
}

function SearchPage({ initialQuery, initialPriceType, setPage }) {
  const [filters, setFilters] = useStateS({ priceType: initialPriceType || 'rent', area:'', type:'', beds:'', maxPrice:null, badge:'' });
  const [view, setView] = useStateS('grid'); // grid | map
  const [selectedPin, setSelectedPin] = useStateS(null);
  const [query, setQuery] = useStateS(initialQuery || '');

  const allProps = PROPTY_DATA.properties;
  const filtered = allProps.filter(p => {
    if (filters.priceType && p.priceType !== filters.priceType) return false;
    if (filters.area && !p.location.area.toLowerCase().includes(filters.area.toLowerCase()) && !p.location.thana.toLowerCase().includes(filters.area.toLowerCase())) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.location.area.toLowerCase().includes(query.toLowerCase())) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.beds && filters.beds !== '5+' && p.bedrooms !== parseInt(filters.beds)) return false;
    if (filters.beds === '5+' && p.bedrooms < 5) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.badge && p.badge !== filters.badge) return false;
    return true;
  });

  return (
    <div style={{ paddingTop: 68, minHeight:'100vh', background: COLORS.gray }}>
      {/* Top bar */}
      <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', padding:'14px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ flex:1, maxWidth:560 }}>
            <SearchBar compact onSearch={({ query: q }) => setQuery(q)} placeholder="Search area or property..." />
          </div>
          <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
            <button onClick={() => setView('grid')} style={{ padding:'8px 14px', borderRadius:8, border:`1.5px solid ${view==='grid'?COLORS.purple:'#E5E7EB'}`, background: view==='grid'?COLORS.purpleLight:'#fff', color: view==='grid'?COLORS.purple:COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:13, cursor:'pointer' }}>
              ▦ Grid
            </button>
            <button onClick={() => setView('map')} style={{ padding:'8px 14px', borderRadius:8, border:`1.5px solid ${view==='map'?COLORS.purple:'#E5E7EB'}`, background: view==='map'?COLORS.purpleLight:'#fff', color: view==='map'?COLORS.purple:COLORS.slate, fontFamily:'Prompt', fontWeight:600, fontSize:13, cursor:'pointer' }}>
              🗺 Map
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'260px 1fr', gap:20, alignItems:'start' }}>
        {/* Sidebar */}
        <div style={{ position:'sticky', top:88 }}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Results */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <span style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate }}>
              <strong style={{ color:COLORS.navy, fontFamily:'Kanit' }}>{filtered.length}</strong> properties found
              {filters.area ? ` in ${filters.area}` : ' in Dhaka'}
            </span>
            <select style={{ padding:'7px 12px', borderRadius:8, border:'1.5px solid #E5E7EB', fontFamily:'Prompt', fontSize:13, color:COLORS.navy, background:'#fff', outline:'none' }}>
              <option>Sort: Most Relevant</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {view === 'grid' ? (
            filtered.length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:18 }}>
                {filtered.map(p => (
                  <PropertyCard key={p.id} property={p} onClick={() => setPage({ key:'listing', propertyId: p.id })} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'80px 24px', background:'#fff', borderRadius:14 }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🏠</div>
                <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:20, color:COLORS.navy, marginBottom:8 }}>No properties found</div>
                <div style={{ fontFamily:'Prompt', fontSize:14, color:COLORS.slate }}>Try adjusting your filters or search a different area.</div>
              </div>
            )
          ) : (
            <div style={{ height:580, display:'grid', gridTemplateColumns:'1fr 340px', gap:16 }}>
              <MapView properties={filtered} selectedId={selectedPin?.id} onSelect={setSelectedPin} />
              <div style={{ overflowY:'auto', display:'flex', flexDirection:'column', gap:10 }}>
                {filtered.map(p => (
                  <div key={p.id} onClick={() => setSelectedPin(p)} style={{ background:'#fff', borderRadius:10, border:`1.5px solid ${selectedPin?.id===p.id?COLORS.purple:'#E5E7EB'}`, padding:'12px 14px', cursor:'pointer', transition:'all 0.15s' }}>
                    <div style={{ fontFamily:'Kanit', fontWeight:600, fontSize:14, color:COLORS.navy, marginBottom:4 }}>{p.title}</div>
                    <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate, marginBottom:6 }}>📍 {p.location.area}</div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <PriceTag price={p.price} priceType={p.priceType} compact />
                      <VerifiedBadge badge={p.badge} />
                    </div>
                    {selectedPin?.id === p.id && (
                      <button onClick={(e) => { e.stopPropagation(); setPage({ key:'listing', propertyId: p.id }); }} style={{ width:'100%', marginTop:10, padding:'8px', background:COLORS.purple, color:'#fff', border:'none', borderRadius:7, fontFamily:'Prompt', fontWeight:600, fontSize:13, cursor:'pointer' }}>
                        View Details →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.SearchPage = SearchPage;
