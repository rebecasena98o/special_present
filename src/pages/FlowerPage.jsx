// src/pages/FlowerPage.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Flower.css';

export default function FlowerPage() {
  const navigate = useNavigate();
  const hasInitializedDust = useRef(false);

  useEffect(() => {
    // Evita duplicar a poeira mágica caso o React renderize duas vezes no modo Strict
    if (hasInitializedDust.current) return;
    hasInitializedDust.current = true;

    const head = document.getElementsByTagName('head')[0];
    let animationId = 1;

    function createMagicDust(x1, x2, y1, y2, sizeRatio, fallingTime, animationDelay, node = 'main') {
      const targetNode = document.getElementById(node);
      if (!targetNode) return;

      let dust = document.createElement('span');
      let animation = document.createElement('style');
      
      animation.innerHTML = `
        @keyframes blink${animationId} {
          0% { top: ${y1}px; left: ${x1}px; width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .4; }
          20% { width: ${4 * sizeRatio}px; height: ${4 * sizeRatio}px; opacity: .8; }
          35% { width: ${2 * sizeRatio}px; height: ${2 * sizeRatio}px; opacity: .5; }
          55% { width: ${3 * sizeRatio}px; height: ${3 * sizeRatio}px; opacity: .7; }
          80% { width: ${sizeRatio}px; height: ${sizeRatio}px; opacity: .3; }
          100% { top: ${y2}px; left: ${x2}px; width: 0px; height: 0px; opacity: .1; }
        }
      `;
      
      head.appendChild(animation);
      dust.classList.add('dustDef');
      dust.setAttribute('style', `animation: blink${animationId++} ${fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${animationDelay}s`);
      targetNode.appendChild(dust);
    }

    const dustCoordinates = [
      [130, 132, 150, 152, .15, 2.5, .1, 'sub'],
      [65, 63, 300, 299, .5, 2, .2, 'sub'],
      [70, 70, 150, 150, .45, 2, .5],
      [75, 78, 160, 170, .6, 2, 1],
      [80, 82, 160, 180, .6, 1, .4],
      [85, 100, 160, 170, .5, 2, .5],
      [125, 110, 170, 180, .25, 3, 1.5],
      [90, 90, 115, 115, .4, 2, 2],
      [93, 95, 200, 200, .4, 3, 1.5],
      [100, 100, 145, 155, .45, 1, .5],
      [100, 90, 170, 230, .35, 2, .75],
      [100, 102, 115, 112, .35, 3, .25],
      [100, 95, 170, 200, .55, 1.5, .75],
      [100, 97, 150, 190, .7, 2, 1.5],
      [105, 100, 160, 180, .5, 1.5, .725],
      [125, 125, 180, 190, .25, 1, .725],
      [130, 130, 135, 135, .45, 3, 1.5],
      [135, 132, 170, 190, .25, 2.5, .75],
      [135, 132, 320, 315, .2, 5, .3, 'sub']
    ];

    dustCoordinates.forEach((coords) => createMagicDust(...coords));
  }, []);

  return (
    <div className="flower-page">
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Voltar ao Menu
      </button>

      {/* Efeito do Texto Star Wars em 3D */}
      <div className="star-wars-wrap">
        <div className="crawl">
          <h1>Episódio I</h1>
          <h2>O DESPERTAR DA FLOR</h2>
          <p>
            Numa galáxia muito, muito distante, uma rosa mística foi protegida
            dentro de uma cúpula de vidro. Ela guarda a essência do universo
            e o seu brilho carmesim nunca se apaga.
          </p>
          <p>
            Muitos tentaram desvendar os seus segredos, mas apenas os
            verdadeiros mestres do código conseguem manipular as suas
            pétalas brilhantes criadas puramente com CSS...
          </p>
        </div>
      </div>

      {/* Cenário Tridimensional e a Rosa Complexa */}
      <div id="castle">
        <div id="table"></div>
        
        {/* Cúpula e Flor Principal (Com animação de flutuar e poeira ID main) */}
        <div className="shade-wrap hover-animation" id="main">
          <div id="flower-wrap">
            <div id="stem"></div>
            <div id="petal1"></div>
            <div id="petal2"></div>
            <div id="petal3"></div>
            <div id="petal4"></div>
            <div id="petal5"></div>
            <div id="falling-petal"></div>
            <div id="leaf1"></div>
            <div id="leaf2"></div>
          </div>
        </div>

        {/* Reflexos e Vidros Traseiros (Poeira ID sub) */}
        <div className="shade-wrap" id="sub">
          <div id="shade-main-reflections"></div>
          <div id="shade-main">
            <div id="shade-handle-big"></div>
            <div id="shade-handle-small"></div>
            <div id="bottom-shade"></div>
          </div>
        </div>
      </div>
    </div>
  );
}