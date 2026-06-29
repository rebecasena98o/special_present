import React, { useMemo } from 'react';
import {motion} from 'framer-motion';
import '../../../style/SunsetForestBackground.css';


function seededRandom(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function buildSkyline(treeCount, baseY, minH, maxH, jitter, seedOffset) {
  const width = 1000;
  const step = width / treeCount;
  let d = `M0,220`;

  for (let i = 0; i <= treeCount; i++) {
    const h = minH + seededRandom(i + seedOffset, 1) * (maxH - minH);
    const xPeak = i * step + step * 0.25 + (seededRandom(i + seedOffset, 2) - 0.5) * jitter;
    const xValley = i * step + step * 0.75 + (seededRandom(i + seedOffset, 3) - 0.5) * jitter;
    const yPeak = baseY - h;
    const yValley = baseY - h * (0.25 + seededRandom(i + seedOffset, 4) * 0.15);
    d += ` L${xPeak.toFixed(1)},${yPeak.toFixed(1)} L${xValley.toFixed(1)},${yValley.toFixed(1)}`;
  }
  d += ` L1000,220 Z`;
  return d;
}

function genStarShadows(count, maxTopPct) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * maxTopPct).toFixed(2);
    parts.push(`${x}vw ${y}vh #fff`);
  }
  return parts.join(', ');
}

function genGardenBlobs() {
  const blobColors = ['#160f24', '#1c1330'];
  const flowerColors = ['#ffd87a', '#ff9f6b', '#fff3a3'];
  const bushes = Array.from({ length: 16 }, (_, i) => ({
    id: `bush-${i}`,
    cx: Math.random() * 1000,
    cy: 195 + Math.random() * 20,
    r: 14 + Math.random() * 22,
    fill: blobColors[i % 2],
  }));
  const flowers = Array.from({ length: 10 }, (_, i) => ({
    id: `flower-${i}`,
    cx: Math.random() * 1000,
    cy: 198 + Math.random() * 18,
    r: 2 + Math.random() * 2.5,
    fill: flowerColors[i % 3],
  }));
  return { bushes, flowers };
}

function genFireflies(count) {
  const colors = ['#ffd87a', '#fff3a3', '#ffb74d'];
  return Array.from({ length: count }, (_, i) => ({
    id: `firefly-${i}`,
    top: 68 + Math.random() * 25,
    left: Math.random() * 100,
    color: colors[i % colors.length],
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 4,
  }));
}

function genShootingStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `shoot-${i}`,
    top: 5 + Math.random() * 30,
    left: Math.random() * 60,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 8,
  }));
}

export default function SunsetForestBackground() {
  const skylineBack = useMemo(() => buildSkyline(9, 190, 30, 70, 30, 11), []);
  const skylineFront = useMemo(() => buildSkyline(13, 220, 50, 110, 26, 47), []);
  const starsA = useMemo(() => genStarShadows(90, 55), []);
  const starsB = useMemo(() => genStarShadows(60, 50), []);
  const garden = useMemo(() => genGardenBlobs(), []);
  const fireflies = useMemo(() => genFireflies(14), []);
  const shootingStars = useMemo(() => genShootingStars(5), []);

  return (
    <div className="sf-bg">
      <div className="sf-sun" />

      <div
        className="sf-stars"
        style={{ '--stars-a': starsA, '--stars-b': starsB }}
      />

      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="sf-shoot"
          style={{
            '--t': `${s.top}%`,
            '--l': `${s.left}%`,
            '--dur': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}

      <div className="sf-fireflies">
        {fireflies.map((f) => (
          <div
            key={f.id}
            className="sf-firefly"
            style={{
              '--t': `${f.top}%`,
              '--l': `${f.left}%`,
              '--c': f.color,
              '--dur': `${f.duration}s`,
              '--delay': `${f.delay}s`,
            }}
          />
        ))}
      </div>
<svg 
        className="sf-forest-back tr-origin-bottom" 
        viewBox="0 0 1000 220" 
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          transformOrigin: '0% 100%',
          pointerEvents: 'none' // Evita que o SVG intercepte cliques do mouse nas cartas
        }}
      >
        <path d={skylineBack} fill="#2c1f45" />
      </svg>

      {/* 🌲 Árvores da Frente - Ajustadas com o mesmo comportamento do seu modelo */}
      <svg 
        className="sf-forest-front tr-origin-bottom" 
        viewBox="0 0 1000 220" 
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          transformOrigin: '0% 100%',
          pointerEvents: 'none'
        }}
      >
        <path d={skylineFront} fill="#160f24" />
        <g>
          {garden.bushes.map((b) => (
            <ellipse key={b.id} cx={b.cx} cy={b.cy} rx={b.r} ry={b.r * 0.6} fill={b.fill} />
          ))}
          {garden.flowers.map((f) => (
            <circle key={f.id} cx={f.cx} cy={f.cy} r={f.r} fill={f.fill} />
          ))}
        </g>
      </svg>
    </div>
  );
}