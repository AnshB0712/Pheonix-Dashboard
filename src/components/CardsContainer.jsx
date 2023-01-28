import React from 'react';

function CardsContainer({ children }) {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
      placeItems: 'center',
      gap: '8px',
      padding: '10px 0',
      overflow: 'hidden',
    }}
    >
      {children}
    </section>
  );
}

export default CardsContainer;
