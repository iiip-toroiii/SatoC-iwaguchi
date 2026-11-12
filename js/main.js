/* 佐藤医院：スマートフォン用メニュー（フレームワーク不要） */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const heroTitle = document.querySelector('#hero-title');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');

  if (header && heroTitle) {
    function updateHeaderBackground() {
      const titleTop = heroTitle.getBoundingClientRect().top;
      header.classList.toggle('is-past-hero', titleTop <= header.offsetHeight);
    }

    window.addEventListener('scroll', updateHeaderBackground, { passive: true });
    window.addEventListener('resize', updateHeaderBackground);
    updateHeaderBackground();
  }

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  window.matchMedia('(min-width: 1241px)').addEventListener('change', closeMenu);
})();


/* =====================================================
   佐藤医院：マウス移動時の落ち葉アニメーション
   使用画像：assets/illustrations/leaf.svg
   ===================================================== */

(() => {
  "use strict";

  // ===== アニメーション設定 =====
  const SETTINGS = {
    imagePath: "assets/illustrations/leaf.svg",
    interval: 180,        // 葉を生成する最短間隔（ms）
    moveDistance: 25,    // 葉を生成するまでの移動距離（px）
    maxLeaves: 12,       // 同時に表示する最大枚数
    minSize: 25,         // 葉の最小サイズ（px）
    maxSize: 55,         // 葉の最大サイズ（px）
    minDuration: 3000,   // 最短の落下時間（ms）
    maxDuration: 5000    // 最長の落下時間（ms）
  };

  // マウスが使える端末でのみ実行
  const mouseQuery = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  // 動きを減らすOS設定に対応
  const motionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!mouseQuery.matches || motionQuery.matches) {
    return;
  }

  // ===== 葉っぱ表示用のレイヤー =====
  const layer = document.createElement("div");

  layer.setAttribute("aria-hidden", "true");

  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: "9999"
  });

  document.body.appendChild(layer);

  let lastTime = 0;
  let lastX = null;
  let lastY = null;
  let activeLeaves = 0;

  // 指定範囲のランダム値
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // ===== 葉っぱを1枚生成 =====
  function createLeaf(x, y) {
    if (activeLeaves >= SETTINGS.maxLeaves) {
      return;
    }

    activeLeaves++;

    const leaf = document.createElement("img");

    leaf.src = SETTINGS.imagePath;
    leaf.alt = "";
    leaf.draggable = false;

    const size = random(
      SETTINGS.minSize,
      SETTINGS.maxSize
    );

    const duration = random(
      SETTINGS.minDuration,
      SETTINGS.maxDuration
    );

    // 葉が落ちる方向と距離
    const drift = random(-2000, 2000);
    const fallDistance = random(130, 260);
    const rotation = random(-80, 80);

    // マウスの位置から少しずらして発生
    const startX = x + random(-12, 12);
    const startY = y + random(-12, 12);

    Object.assign(leaf.style, {
      position: "absolute",
      left: `${startX}px`,
      top: `${startY}px`,
      width: `${size}px`,
      height: `${size}px`,
      objectFit: "contain",
      pointerEvents: "none",
      userSelect: "none",
      opacity: "0",
      willChange: "transform, opacity"
    });

    layer.appendChild(leaf);

    // ===== ひらひら落ちる動き =====
    leaf.animate(
      [
        { translate: "0px 0px" },
        { translate: `${drift * 0.4}px 0px`, offset: 0.2 },
        { translate: `${drift * -0.4}px 0px`, offset: 0.5 },
        { translate: `${drift * 1.4}px 0px`, offset: 0.8 },
        { translate: `${drift}px 0px` }
      ],
      {
        duration: duration * 4,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );

    const animation = leaf.animate(
      [
        {
          transform: "translateY(0px) rotate(0deg) scale(0.8)",
          opacity: 0
        },
        {
          transform:
            `translateY(${fallDistance * 0.2}px)
             rotate(${rotation * 0.25}deg) scale(1)`,
          opacity: 0.85,
          offset: 0.2
        },
        {
          transform:
            `translateY(${fallDistance * 0.5}px)
             rotate(${rotation * 0.55}deg) scale(0.95)`,
          opacity: 0.85,
          offset: 0.5
        },
        {
          transform:
            `translateY(${fallDistance * 0.8}px)
             rotate(${rotation * 0.8}deg) scale(0.9)`,
          opacity: 0.5,
          offset: 0.8
        },
        {
          transform:
            `translateY(${fallDistance}px)
             rotate(${rotation}deg) scale(0.7)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );

    // アニメーション終了後に葉を削除
    let removed = false;

    function removeLeaf() {
      if (removed) return;
      removed = true;

      leaf.remove();
      activeLeaves--;
    }

    animation.addEventListener(
      "finish",
      removeLeaf,
      { once: true }
    );

    animation.addEventListener(
      "cancel",
      removeLeaf,
      { once: true }
    );

    // 環境設定が途中で変更された場合にも削除
    if (motionQuery.matches) {
      animation.cancel();
    }
  }

  // ===== マウス移動を検知 =====
  document.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      if (motionQuery.matches) return;

      const now = performance.now();

      if (now - lastTime < SETTINGS.interval) {
        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(
          x - lastX,
          y - lastY
        );

        if (distance < SETTINGS.moveDistance) {
          return;
        }
      }

      lastTime = now;
      lastX = x;
      lastY = y;

      createLeaf(x, y);
    },
    { passive: true }
  );

  // 動きを減らす設定に切り替えた場合
  motionQuery.addEventListener("change", () => {
    if (motionQuery.matches) {
      layer
        .querySelectorAll("img")
        .forEach((leaf) => {
          leaf.getAnimations().forEach((a) => {
            a.cancel();
          });
          leaf.remove();
        });

      activeLeaves = 0;
    }
  });

})();
