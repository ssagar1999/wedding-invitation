import React from 'react';
import { Corner } from '../ornaments/Ornaments.jsx';

/* A photograph set inside a gilded palace-arch window. */
export default function PhotoArch({ src, alt, position = 'center', className = '' }) {
  if (!src) return null;
  return (
    <figure className={`photo-arch ${className}`}>
      <div className="pa-outer">
        <div className="pa-window">
          <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: position }} />
          <span className="pa-sheen" aria-hidden="true" />
        </div>
      </div>
      <Corner className="pa-corner l" />
      <Corner className="pa-corner r" />
    </figure>
  );
}
