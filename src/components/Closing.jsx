import React from 'react';
import { Share2 } from 'lucide-react';
import { Divider, Mandala, Vine } from '../ornaments/Ornaments.jsx';
import PhotoArch from './PhotoArch.jsx';
import Reveal from './Reveal.jsx';

export default function Closing({ wedding }) {
  const share = () => {
    const text = `${wedding.share.message} ${window.location.href.split('#')[0]}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };
  return (
    <section className="section closing">
      <Mandala className="closing-mandala" />
      <Reveal>
        <PhotoArch src={wedding.photos?.garden} alt={`${wedding.bride} and ${wedding.groom} in the garden`} position="50% 45%" className="small" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="closing-line">{wedding.closing.line}</p>
        <Vine className="vine" width={220} />
        <p className="script with-love">With love,</p>
        <p className="closing-names gold-text">{wedding.bride} <span className="script amp-sm">&amp;</span> {wedding.groom}</p>
        <Divider />
        <button className="btn-open sm" onClick={share}>
          <Share2 size={16} strokeWidth={1.6} /><span>Share on WhatsApp</span>
        </button>
        <p className="deva footer-deva">॥ शुभ विवाह ॥</p>
      </Reveal>
    </section>
  );
}
