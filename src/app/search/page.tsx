// Static page with no client-side functionality
export default function SearchPage() {
  return (
    <div style={{padding: '4rem'}}>
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>Search</h1>
      <p style={{color: '#888', marginBottom: '2rem'}}>Search functionality coming soon</p>
      
      <div style={{background: '#1a1a1a', padding: '2rem', borderRadius: '0.5rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem'}}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
            <div key={num} style={{textAlign: 'center'}}>
              <div style={{width: '100%', aspectRatio: '1/1', background: '#333', borderRadius: '0.25rem', marginBottom: '0.5rem'}}></div>
              <div style={{color: 'white', fontSize: '0.875rem'}}>Album {num}</div>
              <div style={{color: '#888', fontSize: '0.75rem'}}>Artist</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 