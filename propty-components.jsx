
// Shared components for Propty prototype
// Exports to window: Nav, Footer, PropertyCard, VerifiedBadge, AgentMiniCard, Modal, PriceTag, StarRating, SearchBar

const { useState, useEffect, useRef } = React;

const COLORS = {
  purple: '#5B3DF6',
  purpleLight: '#EDE9FF',
  purpleDark: '#4527D4',
  navy: '#1E2938',
  slate: '#647488',
  green: '#10B981',
  amber: '#F59E0B',
  gray: '#F3F4F6',
  grayMid: '#E5E7EB',
  grayDark: '#9CA3AF',
  white: '#FFFFFF',
  red: '#EF4444',
};

const navStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #E5E7EB',
    height: 68,
    display: 'flex', alignItems: 'center',
  },
  inner: {
    maxWidth: 1280, width: '100%', margin: '0 auto',
    padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
    textDecoration: 'none',
  },
  logoIcon: {
    width: 36, height: 36, background: COLORS.purple, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontFamily: 'Kanit', fontWeight: 700, fontSize: 18,
  },
  logoText: {
    fontFamily: 'Kanit', fontWeight: 700, fontSize: 22,
    color: COLORS.navy, letterSpacing: '-0.3px',
  },
  links: { display: 'flex', alignItems: 'center', gap: 6 },
  link: {
    padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
    fontFamily: 'Prompt', fontSize: 14, fontWeight: 500, color: COLORS.slate,
    border: 'none', background: 'none', transition: 'all 0.15s',
  },
  linkActive: { color: COLORS.purple, background: COLORS.purpleLight },
  actions: { display: 'flex', alignItems: 'center', gap: 10 },
  btnOutline: {
    padding: '8px 18px', borderRadius: 8, border: `1.5px solid ${COLORS.purple}`,
    color: COLORS.purple, background: 'none', cursor: 'pointer',
    fontFamily: 'Prompt', fontSize: 14, fontWeight: 500, transition: 'all 0.15s',
  },
  btnFill: {
    padding: '8px 18px', borderRadius: 8, border: 'none',
    background: COLORS.purple, color: '#fff', cursor: 'pointer',
    fontFamily: 'Prompt', fontSize: 14, fontWeight: 500, transition: 'all 0.15s',
  },
};

function Nav({ page, setPage, onSignUp }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Buy', key: 'search', params: { priceType: 'sale' } },
    { label: 'Rent', key: 'search', params: { priceType: 'rent' } },
    { label: 'Find Agents', key: 'agents' },
    { label: 'How It Works', key: 'how' },
  ];
  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.inner}>
        <div style={navStyles.logo} onClick={() => setPage({ key: 'home' })}>
          <div style={navStyles.logoIcon}>p</div>
          <span style={navStyles.logoText}>Propty</span>
        </div>
        <div style={navStyles.links}>
          {links.map(l => (
            <button key={l.label} style={{
              ...navStyles.link,
              ...(page?.key === l.key ? navStyles.linkActive : {}),
            }} onClick={() => setPage({ key: l.key, ...l.params })}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={navStyles.actions}>
          <button style={navStyles.btnOutline} onClick={() => onSignUp && onSignUp('signin')}>Sign In</button>
          <button style={navStyles.btnFill} onClick={() => onSignUp && onSignUp('signup')}>List Property</button>
        </div>
      </div>
    </nav>
  );
}

function VerifiedBadge({ badge, size = 'sm' }) {
  if (!badge || badge === 'Pending') return (
    <span style={{ display:'inline-flex', alignItems:'center', gap: 3, background:'#FEF3C7', color:'#D97706', borderRadius: 6, padding: size === 'sm' ? '2px 8px' : '4px 12px', fontSize: size === 'sm' ? 11 : 13, fontFamily: 'Prompt', fontWeight: 600 }}>
      ⏳ Pending
    </span>
  );
  const isGold = badge === 'Gold';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap: 4, background: isGold ? '#ECFDF5' : '#F0F9FF', color: isGold ? '#059669' : '#0284C7', borderRadius: 6, padding: size === 'sm' ? '2px 8px' : '4px 12px', fontSize: size === 'sm' ? 11 : 13, fontFamily: 'Prompt', fontWeight: 600 }}>
      {isGold ? '✓' : '◎'} {badge} Verified
    </span>
  );
}

function PriceTag({ price, priceType, compact }) {
  const fmt = (n) => n >= 10000000
    ? `৳${(n/10000000).toFixed(1)} Cr`
    : n >= 100000
    ? `৳${(n/100000).toFixed(1)} L`
    : `৳${n.toLocaleString()}`;
  return (
    <span style={{ fontFamily: 'Kanit', fontWeight: 700, fontSize: compact ? 18 : 22, color: COLORS.navy }}>
      {fmt(price)}{priceType === 'rent' ? <span style={{ fontSize: 13, fontWeight: 400, color: COLORS.slate, fontFamily: 'Prompt' }}>/mo</span> : ''}
    </span>
  );
}

function StarRating({ rating, count }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Prompt', fontSize: 13 }}>
      <span style={{ color: COLORS.amber }}>★</span>
      <span style={{ fontWeight: 600, color: COLORS.navy }}>{rating}</span>
      {count && <span style={{ color: COLORS.slate }}>({count})</span>}
    </span>
  );
}

const cardStyles = {
  card: {
    background: '#fff', borderRadius: 14, overflow: 'hidden',
    border: '1px solid #E5E7EB', cursor: 'pointer',
    transition: 'transform 0.18s, box-shadow 0.18s',
    display: 'flex', flexDirection: 'column',
  },
  imgBox: {
    height: 200, position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  badgeRow: {
    position: 'absolute', top: 10, left: 10, right: 10,
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  typeTag: {
    background: 'rgba(0,0,0,0.55)', color: '#fff',
    borderRadius: 6, padding: '3px 9px', fontSize: 11,
    fontFamily: 'Prompt', fontWeight: 500, backdropFilter: 'blur(4px)',
  },
  body: { padding: '14px 16px 16px' },
  title: { fontFamily: 'Kanit', fontWeight: 600, fontSize: 15, color: COLORS.navy, margin: '0 0 4px', lineHeight: 1.3 },
  loc: { fontFamily: 'Prompt', fontSize: 12, color: COLORS.slate, margin: '0 0 10px' },
  specs: { display: 'flex', gap: 12, margin: '0 0 12px', flexWrap: 'wrap' },
  spec: { fontFamily: 'Prompt', fontSize: 12, color: COLORS.slate, display: 'flex', alignItems: 'center', gap: 3 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: 10, marginTop: 2 },
  viewCount: { fontFamily: 'Prompt', fontSize: 11, color: COLORS.grayDark },
};

function PropertyCard({ property, onClick, featured }) {
  const [hovered, setHovered] = useState(false);
  const grad = `linear-gradient(135deg, ${property.colors[0]}, ${property.colors[1]})`;
  return (
    <div style={{
      ...cardStyles.card,
      transform: hovered ? 'translateY(-3px)' : 'none',
      boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
      ...(featured ? { border: `1.5px solid ${COLORS.purple}` } : {}),
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(property)}
    >
      <div style={{ ...cardStyles.imgBox, background: grad }}>
        {/* Property illustration */}
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          <rect x="15" y="30" width="50" height="28" fill="rgba(255,255,255,0.2)" rx="2"/>
          <polygon points="10,30 40,8 70,30" fill="rgba(255,255,255,0.3)"/>
          <rect x="25" y="38" width="10" height="10" fill="rgba(255,255,255,0.4)" rx="1"/>
          <rect x="45" y="38" width="10" height="10" fill="rgba(255,255,255,0.4)" rx="1"/>
          <rect x="33" y="42" width="14" height="16" fill="rgba(255,255,255,0.5)" rx="1"/>
        </svg>
        <div style={cardStyles.badgeRow}>
          <span style={cardStyles.typeTag}>{property.type}</span>
          <VerifiedBadge badge={property.badge} size="sm" />
        </div>
        {featured && (
          <div style={{ position:'absolute', bottom:10, left:10, background: COLORS.purple, color:'#fff', borderRadius:6, padding:'2px 8px', fontSize:11, fontFamily:'Prompt', fontWeight:600 }}>
            ⚡ Featured
          </div>
        )}
      </div>
      <div style={cardStyles.body}>
        <p style={cardStyles.title}>{property.title}</p>
        <p style={cardStyles.loc}>📍 {property.location.area}, {property.location.city}</p>
        <div style={cardStyles.specs}>
          <span style={cardStyles.spec}>🛏 {property.bedrooms} Beds</span>
          <span style={cardStyles.spec}>🚿 {property.bathrooms} Baths</span>
          <span style={cardStyles.spec}>📐 {property.area.toLocaleString()} sqft</span>
          {property.parking && <span style={cardStyles.spec}>🚗 Parking</span>}
        </div>
        <div style={cardStyles.footer}>
          <PriceTag price={property.price} priceType={property.priceType} compact />
          <span style={cardStyles.viewCount}>{property.views} views · {property.postedDays}d ago</span>
        </div>
      </div>
    </div>
  );
}

function AgentMiniCard({ agent, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB',
      padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
      transition: 'all 0.15s',
      boxShadow: hovered ? '0 6px 18px rgba(0,0,0,0.09)' : 'none',
      transform: hovered ? 'translateY(-2px)' : 'none',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(agent)}
    >
      <div style={{ width:48, height:48, borderRadius:12, background: agent.avatar, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Kanit', fontWeight:700, fontSize:16, flexShrink:0 }}>
        {agent.initials}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Kanit', fontWeight:600, fontSize:14, color:COLORS.navy, display:'flex', alignItems:'center', gap:6 }}>
          {agent.name}
          {agent.verified && <span style={{ color: COLORS.green, fontSize:12 }}>✓</span>}
        </div>
        <div style={{ fontFamily:'Prompt', fontSize:12, color:COLORS.slate }}>{agent.title}</div>
        <StarRating rating={agent.rating} count={agent.reviewCount} />
      </div>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <div style={{ fontFamily:'Kanit', fontWeight:700, fontSize:16, color:COLORS.navy }}>{agent.deals}</div>
        <div style={{ fontFamily:'Prompt', fontSize:11, color:COLORS.slate }}>deals</div>
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background:'#fff', borderRadius:18, width:'100%', maxWidth:width, maxHeight:'90vh', overflow:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid #F3F4F6' }}>
          <span style={{ fontFamily:'Kanit', fontWeight:700, fontSize:20, color:COLORS.navy }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:22, color:COLORS.slate, lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function SearchBar({ onSearch, placeholder, compact }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('rent');
  return (
    <div style={{ display:'flex', background:'#fff', borderRadius: compact ? 10 : 14, border:'1.5px solid #E5E7EB', overflow:'hidden', boxShadow: compact ? 'none' : '0 8px 32px rgba(0,0,0,0.12)' }}>
      {!compact && (
        <div style={{ display:'flex', borderRight:'1.5px solid #E5E7EB' }}>
          {['rent','sale'].map(t => (
            <button key={t} onClick={() => setType(t)} style={{ padding:'0 18px', height:52, background: type===t ? COLORS.purple : 'none', color: type===t ? '#fff' : COLORS.slate, border:'none', cursor:'pointer', fontFamily:'Prompt', fontWeight:600, fontSize:14, transition:'all 0.15s', textTransform:'capitalize' }}>
              {t === 'rent' ? 'Rent' : 'Buy'}
            </button>
          ))}
        </div>
      )}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch({ query, type })}
        placeholder={placeholder || 'Search by area, e.g. Gulshan, Banani, Dhanmondi...'}
        style={{ flex:1, padding: compact ? '10px 14px' : '0 18px', border:'none', outline:'none', fontFamily:'Prompt', fontSize: compact ? 14 : 15, color:COLORS.navy, background:'transparent', minWidth:0 }}
      />
      <button onClick={() => onSearch({ query, type })} style={{ padding: compact ? '8px 16px' : '0 24px', background:COLORS.purple, color:'#fff', border:'none', cursor:'pointer', fontFamily:'Prompt', fontWeight:600, fontSize:14, transition:'background 0.15s', whiteSpace:'nowrap' }}>
        {compact ? '🔍' : '🔍 Search'}
      </button>
    </div>
  );
}

Object.assign(window, {
  Nav, Footer: () => null, PropertyCard, VerifiedBadge, AgentMiniCard, Modal, PriceTag, StarRating, SearchBar, COLORS,
});
