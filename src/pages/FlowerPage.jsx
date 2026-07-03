// src/pages/FlowerPage.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Flower.css';

export default function FlowerPage() {
  const navigate = useNavigate();
  const hasInitializedDust = useRef(false);

  // --- Rolagem interativa do texto Star Wars ---
  const crawlWrapRef = useRef(null); // área com a perspectiva (fixa)
  const crawlRef = useRef(null); // bloco de texto (o que realmente se move)

  const positionRef = useRef(0); // px já percorridos
  const totalDistanceRef = useRef(1); // px totais até o texto sumir de vez
  const viewportHeightRef = useRef(0); // altura da área de rolagem
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const isHoveringRef = useRef(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);

  const CRAWL_SPEED = 45; // px por segundo

  // Mede a altura real do texto e da área visível (funciona com texto de
  // qualquer tamanho, ao contrário da animação anterior que usava uma
  // distância fixa em px).
  const measure = useCallback(() => {
    const contentEl = crawlRef.current;
    const wrapEl = crawlWrapRef.current;
    if (!contentEl || !wrapEl) return;
    const contentHeight = contentEl.getBoundingClientRect().height;
    const viewportHeight = wrapEl.getBoundingClientRect().height;
    viewportHeightRef.current = viewportHeight;
    // + viewportHeight garante que o texto suma completamente da tela
    // antes de reiniciar, não importa quão longo ele seja.
    totalDistanceRef.current = Math.max(contentHeight + viewportHeight, 1);
  }, []);

  const wrapPosition = useCallback((value) => {
    const total = totalDistanceRef.current;
    return ((value % total) + total) % total;
  }, []);

  const applyTransform = useCallback(() => {
    const el = crawlRef.current;
    if (!el) return;
    // position = 0     -> texto já visível desde o início, encostado embaixo
    //                     (o CSS "bottom: 0" do .crawl cuida disso sozinho)
    // position = total -> texto totalmente acima da tela, pronto para reiniciar
    // Mesma inclinação 3D original (rotateX 30deg), com a posição vertical
    // controlada em px reais, não por % de uma animação fixa.
    const translateY = -positionRef.current;
    el.style.transform = `rotateX(30deg) translateY(${translateY}px)`;
  }, []);

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

  // Mede o texto assim que monta e sempre que a tela ou o conteúdo mudam
  useEffect(() => {
    measure();
    applyTransform();
    const ro = new ResizeObserver(() => {
      measure();
      applyTransform();
    });
    if (crawlRef.current) ro.observe(crawlRef.current);
    if (crawlWrapRef.current) ro.observe(crawlWrapRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, applyTransform]);

  // Loop de animação: velocidade constante em px/s, então funciona igual
  // para um texto curto ou um texto enorme, sem depender de uma duração fixa.
  useEffect(() => {
    const step = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const shouldAutoScroll = isPlaying && !isDraggingRef.current && !isHoveringRef.current;

      if (shouldAutoScroll) {
        positionRef.current = wrapPosition(positionRef.current + CRAWL_SPEED * dt);
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, wrapPosition, applyTransform]);

  // --- Arrastar com mouse ou toque para puxar o texto manualmente ---
  const handleDragStart = useCallback((clientY) => {
    isDraggingRef.current = true;
    dragStartYRef.current = clientY;
    dragStartPosRef.current = positionRef.current;
  }, []);

  const handleDragMove = useCallback(
    (clientY) => {
      if (!isDraggingRef.current) return;
      const delta = dragStartYRef.current - clientY;
      positionRef.current = wrapPosition(dragStartPosRef.current + delta);
      applyTransform();
    },
    [wrapPosition, applyTransform]
  );

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => handleDragMove(e.clientY);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) handleDragMove(e.touches[0].clientY);
    };
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // --- Roda do mouse: avança/retrocede sem precisar arrastar ---
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      positionRef.current = wrapPosition(positionRef.current + e.deltaY);
      applyTransform();
    },
    [wrapPosition, applyTransform]
  );

  // --- Barra de progresso: clicar/arrastar para pular direto a um ponto ---
  const seekFromClientX = useCallback(
    (clientX) => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      positionRef.current = wrapPosition(ratio * totalDistanceRef.current);
      applyTransform();
    },
    [wrapPosition, applyTransform]
  );

  const handleBarMouseDown = useCallback(
    (e) => {
      seekFromClientX(e.clientX);
      const onMove = (ev) => seekFromClientX(ev.clientX);
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [seekFromClientX]
  );

  return (
    <div className="flower-page">
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Voltar ao Menu
      </button>

      {/* Efeito do Texto Star Wars em 3D */}
      <div
        className="star-wars-wrap"
        ref={crawlWrapRef}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onTouchStart={(e) => e.touches[0] && handleDragStart(e.touches[0].clientY)}
        onMouseEnter={() => (isHoveringRef.current = true)}
        onMouseLeave={() => (isHoveringRef.current = false)}
        onWheel={handleWheel}
      >
        <div className="crawl" ref={crawlRef}>
          <h1>Episódio I</h1>
          <h2>O RESGATE DA FLOR</h2>
          <p>
            Numa galáxia muito, muito distante, uma rosa mística foi protegida dentro de uma cúpula de vidro. Uma proteção que ela mesma criou, em meio a dores, em meio ao caos, ela ergueu suas paredes para todo sempre... Mas a rosa não nasceu assim, ela era muito mais doce, meiga e delicada. Entretanto, vinhas vindas de outros planetas adentraram seu jardim, contaminaram suas terras e a fizeram chorar e adoecer, por muito tempo ela se manteve assim, sem saber como resolver... Clamando ao Rei de todo o universo ele concedeu sua proteção, seu cuidado e carinho, assim, ela se tornou forte e resistente. Pois a sua beleza e o seu perfume guarda a essência do universo, a essência da vida, a essência do Senhor, e o seu brilho carmesim nunca se apaga, dura para todo sempre. Muitos tentaram desvendar os seus segredos, muitos tentaram roubar a sua essência, muitos usaram de sua beleza para o mal, muitos tentaram quebrar a sua proteção, mas a rosa sempre se manteve firme. Entretanto, ela se tornou fria e distante, pois os espinhos que a rondavam eram a sua defesa, sua cúpula concedida pelo rei a prendeu em seu ninho, sua mente se entorpeceu acreditando que a solidão era o melhor caminho, mas também o seu veneno...
          </p>

          <p>
            Por um tempo ela se manteve assim, mas a sua essência nunca se apagou, e a sua beleza nunca se perdeu, pois ela sempre foi única e especial. Um dia, um jovem corajoso e determinado, que não se deixou levar pelo medo, nem pela dor ou sofrimento da rosa, decidiu se aproximar da rosa, e com muito cuidado, ele conseguiu quebrar a cúpula de vidro, dedicando toda a sua vida, todo seu amor, toda a sua coragem, toda a sua fé, toda a sua esperança, toda a sua paciência, toda a sua perseverança, toda a sua determinação, toda a sua força, toda a sua luz, toda a sua bondade, toda a sua pureza, toda a sua sinceridade, toda a sua verdade, toda a sua honestidade, toda a sua humildade, toda a sua compaixão, toda a sua empatia, toda a sua gratidão, toda a sua generosidade, toda a sua lealdade, seu coração, alma e espírito por inteiro, tudo entregue. Assim, ele lapidou o amor puro e sincero da sua rosa. Isso tudo não foi permitido por acaso, mas sim por um propósito muito maior, a união de duas almas: um pequeno e lindo príncipe, gentil, amoroso, carinhoso, bondoso, honesto, puro, sincero, heroico, determinado, dedicado, esforçado, trabalhador, responsável, romântico, cheio de fé, amabilidade, paciência, esperança, dócil, astuto, inteligente, cuidadoso, atento, atencioso, carismático, engraçado, detalhista, generoso, forte, delicado, empatico, lindo, bonitão, gatinho, meu solzinho da primavera, cheio do amor do Senhor e de uma paz tão extraordinária que me deixa todos os dias com mais vontade de buscar ao Senhor e honrar com o presente que Ele me deu. Ufa! são tantas características que eu passaria o dia inteiro falando sobre, mas enfim kkk. E uma rosa que todos os dias tem se esforçado para melhorar pelo pequeno príncipe e que a cada dia vê mais e mais o quão belo e majestoso ele é, o quanto ele se completa a mim, dessa forma ambos se fortalecem e iluminam o caminho do outro.
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