'use client';

export default function GradientOrbs({ variant = 'hero' }) {
  const orbConfigs = {
    hero: [
      { size: 400, top: '-10%', left: '-5%', bg: 'radial-gradient(circle, rgba(232,213,163,0.5) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' },
      { size: 350, top: '20%', right: '-8%', bg: 'radial-gradient(circle, rgba(212,168,67,0.25) 0%, transparent 70%)', animation: 'float 10s ease-in-out 2s infinite' },
      { size: 250, bottom: '10%', left: '30%', bg: 'radial-gradient(circle, rgba(255,245,224,0.6) 0%, transparent 70%)', animation: 'float 7s ease-in-out 1s infinite' },
    ],
    section: [
      { size: 300, top: '-15%', right: '-10%', bg: 'radial-gradient(circle, rgba(232,213,163,0.35) 0%, transparent 70%)', animation: 'float 9s ease-in-out infinite' },
      { size: 200, bottom: '-10%', left: '-5%', bg: 'radial-gradient(circle, rgba(255,245,224,0.5) 0%, transparent 70%)', animation: 'float 7s ease-in-out 1.5s infinite' },
    ],
    subtle: [
      { size: 200, top: '10%', right: '5%', bg: 'radial-gradient(circle, rgba(232,213,163,0.2) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite' },
    ],
  };

  const orbs = orbConfigs[variant] || orbConfigs.subtle;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.bg,
            filter: 'blur(40px)',
            animation: orb.animation,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
          }}
        />
      ))}
    </div>
  );
}
