export default function BlogPostCardSkeleton() {
  return (
    <div className="cuan-card animate-pulse" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      {/* Date + time chips */}
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ height: 22, width: 80, borderRadius: 9999, background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ height: 22, width: 60, borderRadius: 9999, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 20, borderRadius: 8, background: 'rgba(255,255,255,0.07)', width: '90%' }} />
        <div style={{ height: 20, borderRadius: 8, background: 'rgba(255,255,255,0.07)', width: '65%' }} />
      </div>

      {/* Excerpt */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1 }}>
        <div style={{ height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.05)', width: '100%' }} />
        <div style={{ height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.05)', width: '80%' }} />
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 5, marginTop: 'auto' }}>
        {[70, 55, 80].map((w, i) => (
          <div key={i} style={{ height: 20, width: w, borderRadius: 9999, background: 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
    </div>
  );
}
