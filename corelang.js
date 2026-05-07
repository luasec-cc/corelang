/*!
 * corelang.js v0.2.0
 * The official CoreLang renderer — by ReefDesign
 * https://dcpcdn.de/corelang.js
 */
(function (global) {
  'use strict';

  // ─── Lucide icons (inline SVG via CDN) ───────────────────────────────────────
  const ICON_CDN = 'https://unpkg.com/lucide-static@latest/icons/';

  function icon(name, size = 18) {
    if (!name) return '';
    return `<img src="${ICON_CDN}${name}.svg" width="${size}" height="${size}" alt="" class="cl-icon" style="display:inline-block;vertical-align:middle;opacity:0.8;" loading="lazy" onerror="this.style.display='none'">`;
  }

  // ─── Theme injection ──────────────────────────────────────────────────────────
  function injectTheme(theme, fonts) {
    const id = 'corelang-theme';
    if (document.getElementById(id)) return;

    const headingFont = fonts?.heading || 'Inter';
    const bodyFont = fonts?.body || 'Inter';
    const googleFonts = [...new Set([headingFont, bodyFont])].join('&family=');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleFonts}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
:root {
  --cl-bg: ${theme.bg || '#ffffff'};
  --cl-text: ${theme.text || '#0a0a0a'};
  --cl-accent: ${theme.accent || '#0a0a0a'};
  --cl-surface: ${theme.surface || '#f5f5f5'};
  --cl-border: ${theme.border || '#e5e5e5'};
  --cl-muted: ${theme.muted || '#737373'};
  --cl-radius: ${theme.radius || '8px'};
  --cl-font-heading: '${headingFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --cl-font-body: '${bodyFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --cl-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --cl-shadow-md: 0 2px 8px rgba(0,0,0,0.06);
  --cl-shadow-lg: 0 8px 30px rgba(0,0,0,0.08);
  --cl-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.cl-root *, .cl-root *::before, .cl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cl-root { font-family: var(--cl-font-body); background: var(--cl-bg); color: var(--cl-text); line-height: 1.6; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.cl-root a { color: inherit; text-decoration: none; }
.cl-root img { max-width: 100%; display: block; }
.cl-root ul, .cl-root ol { list-style: none; }
.cl-container { max-width: 1120px; margin: 0 auto; padding: 0 2rem; }

/* ─── NAV ────────────────────────────────────────────────────── */
.cl-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 2rem;
  border-bottom: 1px solid var(--cl-border);
  background: var(--cl-bg);
  transition: background var(--cl-transition), border-color var(--cl-transition);
}
.cl-nav.sticky { position: sticky; top: 0; z-index: 100; }
.cl-nav.blur { backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); background: color-mix(in srgb, var(--cl-bg) 80%, transparent); }
.cl-nav.transparent { background: transparent; border-color: transparent; }
.cl-nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1120px; margin: 0 auto; }
.cl-nav-logo { font-family: var(--cl-font-heading); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.5rem; }
.cl-nav-logo img { height: 28px; width: auto; }
.cl-nav-links { display: flex; align-items: center; gap: 1.75rem; }
.cl-nav-links a { font-size: 0.85rem; color: var(--cl-muted); transition: color var(--cl-transition); }
.cl-nav-links a:hover { color: var(--cl-text); }
.cl-nav-cta { background: var(--cl-accent); color: #fff; font-family: var(--cl-font-body); font-size: 0.825rem; font-weight: 500; padding: 0.45rem 1.1rem; border-radius: var(--cl-radius); border: none; cursor: pointer; transition: opacity var(--cl-transition), transform var(--cl-transition); display: inline-flex; align-items: center; gap: 0.35rem; }
.cl-nav-cta:hover { opacity: 0.88; }

/* Mobile menu toggle */
.cl-nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: var(--cl-text); }
.cl-nav-toggle svg { width: 22px; height: 22px; }

/* Mobile menu drawer */
.cl-nav-drawer { display: none; position: fixed; inset: 0; z-index: 200; }
.cl-nav-drawer.open { display: block; }
.cl-nav-drawer-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); }
.cl-nav-drawer-panel { position: absolute; top: 0; right: 0; width: min(320px, 85vw); height: 100%; background: var(--cl-bg); padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto; animation: cl-drawer-in 0.25s ease; }
@keyframes cl-drawer-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
.cl-nav-drawer-close { align-self: flex-end; background: none; border: none; cursor: pointer; padding: 0.5rem; color: var(--cl-muted); margin-bottom: 1rem; }
.cl-nav-drawer-close svg { width: 20px; height: 20px; }
.cl-nav-drawer a { display: block; padding: 0.75rem 0; font-size: 1rem; color: var(--cl-text); border-bottom: 1px solid var(--cl-border); }
.cl-nav-drawer .cl-nav-cta { margin-top: 1rem; text-align: center; justify-content: center; width: 100%; padding: 0.65rem 1.25rem; }

/* ─── HERO ────────────────────────────────────────────────────── */
.cl-hero { padding: 7rem 2rem 6rem; }
.cl-hero.centered { text-align: center; display: flex; flex-direction: column; align-items: center; }
.cl-hero.split-left, .cl-hero.split-right { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 4rem; max-width: 1120px; margin: 0 auto; }
.cl-hero.split-right .cl-hero-content { order: 2; }
.cl-hero.split-left .cl-hero-media, .cl-hero.split-right .cl-hero-media { order: inherit; }
.cl-hero.split-right .cl-hero-media { order: 1; }
.cl-hero-content { max-width: 600px; }
.cl-hero.centered .cl-hero-content { max-width: 640px; }
.cl-hero h1 { font-family: var(--cl-font-heading); font-size: clamp(2.75rem, 5.5vw, 4.25rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1.05; margin-bottom: 1.5rem; }
.cl-hero .cl-hero-sub { font-size: 1.1rem; color: var(--cl-muted); max-width: 480px; line-height: 1.65; margin-bottom: 2.5rem; }
.cl-hero.centered .cl-hero-sub { margin-left: auto; margin-right: auto; }
.cl-hero-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.cl-hero.centered .cl-hero-actions { justify-content: center; }
.cl-hero-media { border-radius: var(--cl-radius); overflow: hidden; background: var(--cl-surface); }
.cl-hero-media img, .cl-hero-media video { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ─── SECTION ────────────────────────────────────────────────── */
.cl-section { padding: 5rem 2rem; }
.cl-section.pad-sm { padding: 2.5rem 2rem; }
.cl-section.pad-md { padding: 3.5rem 2rem; }
.cl-section.pad-lg { padding: 5rem 2rem; }
.cl-section.pad-xl { padding: 7rem 2rem; }
.cl-section.bg-surface { background: var(--cl-surface); }
.cl-section.bg-dark { background: var(--cl-text); color: var(--cl-bg); --cl-muted: rgba(255,255,255,0.55); --cl-surface: rgba(255,255,255,0.08); --cl-border: rgba(255,255,255,0.1); }
.cl-section.bg-default { background: var(--cl-bg); }

/* ─── GRID ────────────────────────────────────────────────────── */
.cl-grid { display: grid; gap: 1.25rem; }
.cl-grid.cols-1 { grid-template-columns: 1fr; }
.cl-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cl-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.cl-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.cl-grid.gap-sm { gap: 0.75rem; }
.cl-grid.gap-md { gap: 1.25rem; }
.cl-grid.gap-lg { gap: 2rem; }

/* ─── STACK ────────────────────────────────────────────────────── */
.cl-stack { display: flex; flex-direction: column; }
.cl-stack.gap-sm { gap: 0.5rem; }
.cl-stack.gap-md { gap: 1rem; }
.cl-stack.gap-lg { gap: 2rem; }
.cl-stack.align-center { align-items: center; text-align: center; }
.cl-stack.align-right { align-items: flex-end; text-align: right; }
.cl-stack.align-left { align-items: flex-start; }

/* ─── CARD ────────────────────────────────────────────────────── */
.cl-card { padding: 1.75rem; border-radius: var(--cl-radius); transition: transform var(--cl-transition), box-shadow var(--cl-transition); }
.cl-card.outlined { border: 1px solid var(--cl-border); background: var(--cl-bg); }
.cl-card.outlined:hover { transform: translateY(-2px); box-shadow: var(--cl-shadow-md); }
.cl-card.filled { background: var(--cl-accent); color: #fff; --cl-muted: rgba(255,255,255,0.65); }
.cl-card.filled:hover { transform: translateY(-2px); box-shadow: var(--cl-shadow-lg); }
.cl-card.filled .cl-icon { filter: brightness(10); }
.cl-card.ghost { background: transparent; }
.cl-card.ghost:hover { background: var(--cl-surface); }
.cl-card-img { width: calc(100% + 3.5rem); margin: -1.75rem -1.75rem 1.25rem -1.75rem; height: 180px; object-fit: cover; border-radius: var(--cl-radius) var(--cl-radius) 0 0; }
.cl-card-icon { width: 36px; height: 36px; background: var(--cl-surface); border-radius: calc(var(--cl-radius) - 2px); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; flex-shrink: 0; }
.cl-card.filled .cl-card-icon { background: rgba(255,255,255,0.12); }
.cl-card-title { font-family: var(--cl-font-heading); font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; letter-spacing: -0.01em; }
.cl-card-body { font-size: 0.85rem; color: var(--cl-muted); line-height: 1.6; }

/* ─── TEXT ────────────────────────────────────────────────────── */
.cl-text { }
.cl-text.align-center { text-align: center; }
.cl-text.align-right { text-align: right; }
.cl-text.color-muted { color: var(--cl-muted); }
.cl-text.color-accent { color: var(--cl-accent); }
.cl-text.size-xs { font-size: 0.75rem; }
.cl-text.size-sm { font-size: 0.875rem; }
.cl-text.size-md { font-size: 1rem; }
.cl-text.size-lg { font-size: 1.125rem; }
.cl-text.size-xl { font-size: 1.5rem; letter-spacing: -0.01em; }
.cl-text.size-2xl { font-size: 2rem; letter-spacing: -0.025em; line-height: 1.2; }
.cl-text.size-3xl { font-size: clamp(2rem, 4vw, 2.75rem); letter-spacing: -0.03em; line-height: 1.1; }
.cl-text.weight-normal { font-weight: 400; }
.cl-text.weight-medium { font-weight: 500; }
.cl-text.weight-semibold { font-weight: 600; }
.cl-text.weight-bold { font-weight: 700; }

/* ─── BUTTON ────────────────────────────────────────────────── */
.cl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; font-family: var(--cl-font-body); font-size: 0.875rem; font-weight: 500; padding: 0.625rem 1.35rem; border-radius: var(--cl-radius); border: 1px solid transparent; cursor: pointer; transition: all var(--cl-transition); text-decoration: none; white-space: nowrap; }
.cl-btn.primary { background: var(--cl-accent); color: #fff; border-color: var(--cl-accent); }
.cl-btn.primary:hover { opacity: 0.88; }
.cl-btn.secondary { background: var(--cl-surface); color: var(--cl-text); border-color: var(--cl-surface); }
.cl-btn.secondary:hover { opacity: 0.88; }
.cl-btn.outline { background: transparent; color: var(--cl-text); border-color: var(--cl-border); }
.cl-btn.outline:hover { background: var(--cl-surface); border-color: var(--cl-muted); }
.cl-btn.ghost { background: transparent; color: var(--cl-text); border-color: transparent; }
.cl-btn.ghost:hover { background: var(--cl-surface); }
.cl-btn.sm { font-size: 0.8rem; padding: 0.4rem 0.9rem; }
.cl-btn.lg { font-size: 0.95rem; padding: 0.8rem 1.75rem; }
/* Dark section button overrides */
.cl-section.bg-dark .cl-btn.outline { color: var(--cl-bg); border-color: rgba(255,255,255,0.2); }
.cl-section.bg-dark .cl-btn.outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.35); }
.cl-section.bg-dark .cl-btn.primary { background: #fff; color: var(--cl-text); border-color: #fff; }

/* ─── BADGE ────────────────────────────────────────────────── */
.cl-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 9999px; }
.cl-badge.default { background: var(--cl-surface); color: var(--cl-text); }
.cl-badge.accent { background: var(--cl-accent); color: #fff; }
.cl-badge.outline { border: 1px solid var(--cl-border); color: var(--cl-muted); }

/* ─── EYEBROW ────────────────────────────────────────────────── */
.cl-eyebrow { display: inline-block; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.09em; text-transform: uppercase; color: var(--cl-accent); margin-bottom: 1rem; padding: 0.3rem 0.8rem; border: 1px solid var(--cl-border); border-radius: 9999px; background: var(--cl-bg); }

/* ─── IMAGE ────────────────────────────────────────────────── */
.cl-image { overflow: hidden; }
.cl-image.radius-none { border-radius: 0; }
.cl-image.radius-sm { border-radius: 4px; }
.cl-image.radius-md { border-radius: var(--cl-radius); }
.cl-image.radius-lg { border-radius: 16px; }
.cl-image.radius-full { border-radius: 9999px; }
.cl-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cl-image[data-aspect="1/1"] { aspect-ratio: 1/1; }
.cl-image[data-aspect="4/3"] { aspect-ratio: 4/3; }
.cl-image[data-aspect="16/9"] { aspect-ratio: 16/9; }
.cl-image[data-aspect="3/2"] { aspect-ratio: 3/2; }
.cl-image-placeholder { width: 100%; aspect-ratio: 16/9; background: var(--cl-surface); border-radius: var(--cl-radius); display: flex; align-items: center; justify-content: center; color: var(--cl-muted); font-size: 0.8rem; border: 1px dashed var(--cl-border); }

/* ─── FEATURES ──────────────────────────────────────────────── */
.cl-features { }
.cl-features-header { text-align: center; margin-bottom: 3.5rem; }
.cl-features-grid { display: grid; gap: 1.25rem; }
.cl-features-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cl-features-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.cl-features-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.cl-feature-item { padding: 1.75rem; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-bg); transition: background var(--cl-transition), box-shadow var(--cl-transition); }
.cl-feature-item:hover { background: var(--cl-surface); box-shadow: var(--cl-shadow-sm); }
.cl-feature-icon { width: 40px; height: 40px; background: var(--cl-surface); border-radius: var(--cl-radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; flex-shrink: 0; }
.cl-feature-title { font-family: var(--cl-font-heading); font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; letter-spacing: -0.01em; }
.cl-feature-body { font-size: 0.85rem; color: var(--cl-muted); line-height: 1.6; }
/* List layout */
.cl-features-list .cl-feature-item { display: flex; gap: 1.25rem; align-items: flex-start; border: none; border-bottom: 1px solid var(--cl-border); border-radius: 0; padding: 1.5rem 0; background: transparent; }
.cl-features-list .cl-feature-item:last-child { border-bottom: none; }
.cl-features-list .cl-feature-item:hover { background: transparent; box-shadow: none; }
.cl-features-list .cl-feature-icon { margin-bottom: 0; }
/* Alternating layout */
.cl-features-alt .cl-feature-item { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; padding: 3rem 0; border: none; border-bottom: 1px solid var(--cl-border); border-radius: 0; background: transparent; }
.cl-features-alt .cl-feature-item:last-child { border-bottom: none; }
.cl-features-alt .cl-feature-item:hover { background: transparent; box-shadow: none; }
.cl-features-alt .cl-feature-item:nth-child(even) .cl-feature-text { order: 2; }

/* ─── STATS ──────────────────────────────────────────────────── */
.cl-stats { }
.cl-stats-row { display: flex; align-items: stretch; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); overflow: hidden; background: var(--cl-bg); }
.cl-stats-row .cl-stat + .cl-stat { border-left: 1px solid var(--cl-border); }
.cl-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.25rem; }
.cl-stats-grid .cl-stat { border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-bg); }
.cl-stat { flex: 1; padding: 2rem 1.5rem; text-align: center; }
.cl-stat-value { font-family: var(--cl-font-heading); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1; margin-bottom: 0.5rem; }
.cl-stat-label { font-size: 0.78rem; color: var(--cl-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }

/* ─── LOGO_GRID ──────────────────────────────────────────────── */
.cl-logo-grid { text-align: center; }
.cl-logo-grid-heading { font-size: 0.8rem; color: var(--cl-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; margin-bottom: 2rem; }
.cl-logo-grid-items { display: flex; align-items: center; justify-content: center; gap: 3rem; flex-wrap: wrap; opacity: 0.45; filter: grayscale(1); transition: opacity 0.3s, filter 0.3s; }
.cl-logo-grid-items:hover { opacity: 0.6; }
.cl-logo-grid-item img { height: 28px; width: auto; }
.cl-logo-grid-item span { font-family: var(--cl-font-heading); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; }

/* ─── PRICING ────────────────────────────────────────────────── */
.cl-pricing { }
.cl-pricing-header { text-align: center; margin-bottom: 3rem; }
.cl-pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; max-width: 800px; margin: 0 auto; }
.cl-plan { padding: 2rem; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-bg); transition: box-shadow var(--cl-transition); }
.cl-plan:hover { box-shadow: var(--cl-shadow-md); }
.cl-plan.featured { border-color: var(--cl-accent); border-width: 2px; position: relative; }
.cl-plan.featured::before { content: 'Popular'; position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--cl-accent); color: #fff; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; padding: 0.2rem 0.75rem; border-radius: 9999px; }
.cl-plan-name { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--cl-muted); margin-bottom: 0.75rem; }
.cl-plan.featured .cl-plan-name { color: var(--cl-accent); }
.cl-plan-price { font-family: var(--cl-font-heading); font-size: 2.75rem; font-weight: 600; letter-spacing: -0.04em; line-height: 1; }
.cl-plan-period { font-size: 0.8rem; color: var(--cl-muted); margin: 0.25rem 0 1.25rem; }
.cl-plan-desc { font-size: 0.85rem; color: var(--cl-muted); margin-bottom: 1.25rem; line-height: 1.5; }
.cl-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.75rem; }
.cl-plan-features li { font-size: 0.85rem; display: flex; align-items: center; gap: 0.6rem; }
.cl-plan-features li::before { content: ''; width: 18px; height: 18px; background: var(--cl-surface); border-radius: 50%; display: inline-block; flex-shrink: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E"); background-size: 10px; background-position: center; background-repeat: no-repeat; }

/* ─── FAQ ────────────────────────────────────────────────────── */
.cl-faq { max-width: 720px; margin: 0 auto; }
.cl-faq-header { text-align: center; margin-bottom: 2.5rem; }
.cl-faq-item { border-bottom: 1px solid var(--cl-border); }
.cl-faq-item:first-child { border-top: 1px solid var(--cl-border); }
.cl-faq-item summary { padding: 1.25rem 0; font-size: 0.95rem; font-weight: 500; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; transition: color var(--cl-transition); }
.cl-faq-item summary::-webkit-details-marker { display: none; }
.cl-faq-item summary::after { content: '+'; font-size: 1.25rem; color: var(--cl-muted); transition: transform 0.25s ease; flex-shrink: 0; margin-left: 1rem; }
.cl-faq-item[open] summary::after { transform: rotate(45deg); }
.cl-faq-item summary:hover { color: var(--cl-accent); }
.cl-faq-answer { padding: 0 0 1.25rem; font-size: 0.88rem; color: var(--cl-muted); line-height: 1.7; max-width: 600px; }

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
.cl-testimonials { }
.cl-testimonials-header { text-align: center; margin-bottom: 2.5rem; }
.cl-testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; }
.cl-testimonial { padding: 1.75rem; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-bg); transition: box-shadow var(--cl-transition); }
.cl-testimonial:hover { box-shadow: var(--cl-shadow-sm); }
.cl-testimonial-quote { font-size: 0.9rem; line-height: 1.65; margin-bottom: 1.25rem; color: var(--cl-text); }
.cl-testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
.cl-testimonial-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--cl-surface); overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; color: var(--cl-muted); }
.cl-testimonial-avatar img { width: 100%; height: 100%; object-fit: cover; }
.cl-testimonial-name { font-size: 0.85rem; font-weight: 600; }
.cl-testimonial-title { font-size: 0.78rem; color: var(--cl-muted); }

/* ─── TIMELINE ──────────────────────────────────────────────── */
.cl-timeline { max-width: 640px; margin: 0 auto; }
.cl-timeline-header { text-align: center; margin-bottom: 3rem; }
.cl-timeline-item { display: flex; gap: 1.5rem; position: relative; padding-bottom: 2.5rem; }
.cl-timeline-item:last-child { padding-bottom: 0; }
.cl-timeline-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.cl-timeline-dot { width: 32px; height: 32px; background: var(--cl-surface); border: 2px solid var(--cl-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; color: var(--cl-accent); flex-shrink: 0; }
.cl-timeline-line { width: 2px; flex: 1; background: var(--cl-border); margin-top: 0.5rem; }
.cl-timeline-item:last-child .cl-timeline-line { display: none; }
.cl-timeline-text { padding-top: 0.25rem; }
.cl-timeline-step { font-size: 0.72rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; color: var(--cl-accent); margin-bottom: 0.25rem; }
.cl-timeline-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.3rem; letter-spacing: -0.01em; }
.cl-timeline-body { font-size: 0.85rem; color: var(--cl-muted); line-height: 1.6; }

/* ─── CTA ────────────────────────────────────────────────────── */
.cl-cta { text-align: center; padding: 5.5rem 2rem; border-radius: var(--cl-radius); }
.cl-cta.bg-default { background: var(--cl-surface); }
.cl-cta.bg-surface { background: var(--cl-surface); }
.cl-cta.bg-dark { background: var(--cl-text); color: var(--cl-bg); --cl-muted: rgba(255,255,255,0.55); }
.cl-cta.bg-accent { background: var(--cl-accent); color: #fff; --cl-muted: rgba(255,255,255,0.65); }
.cl-cta h2 { font-family: var(--cl-font-heading); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -0.025em; margin-bottom: 0.75rem; line-height: 1.15; }
.cl-cta p { color: var(--cl-muted); font-size: 0.95rem; margin-bottom: 2rem; }
.cl-cta-actions { display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }

/* ─── FOOTER ────────────────────────────────────────────────── */
.cl-footer { border-top: 1px solid var(--cl-border); padding: 4rem 2rem 2rem; background: var(--cl-bg); }
.cl-footer-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr auto; gap: 4rem; }
.cl-footer-brand .cl-footer-logo { font-family: var(--cl-font-heading); font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
.cl-footer-brand .cl-footer-logo img { height: 24px; width: auto; }
.cl-footer-brand p { font-size: 0.82rem; color: var(--cl-muted); line-height: 1.5; max-width: 280px; }
.cl-footer-socials { display: flex; gap: 0.75rem; margin-top: 1rem; }
.cl-footer-socials a { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: var(--cl-radius); background: var(--cl-surface); color: var(--cl-muted); transition: background var(--cl-transition), color var(--cl-transition); }
.cl-footer-socials a:hover { background: var(--cl-accent); color: #fff; }
.cl-footer-cols { display: flex; gap: 4rem; }
.cl-footer-col h4 { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cl-muted); margin-bottom: 1rem; }
.cl-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.cl-footer-col ul a { font-size: 0.85rem; color: var(--cl-text); transition: color var(--cl-transition); }
.cl-footer-col ul a:hover { color: var(--cl-accent); }
.cl-footer-bottom { max-width: 1120px; margin: 2.5rem auto 0; padding-top: 1.5rem; border-top: 1px solid var(--cl-border); font-size: 0.78rem; color: var(--cl-muted); }

/* ─── DIVIDER ────────────────────────────────────────────────── */
.cl-divider-line { border: none; border-top: 1px solid var(--cl-border); margin: 0; }
.cl-divider-space.sm { height: 1.5rem; }
.cl-divider-space.md { height: 3rem; }
.cl-divider-space.lg { height: 5rem; }

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .cl-nav { padding: 0.75rem 1.25rem; }
  .cl-nav-links { display: none; }
  .cl-nav-cta.desktop-only { display: none; }
  .cl-nav-toggle { display: block; }

  .cl-hero { padding: 4rem 1.5rem 3.5rem; }
  .cl-hero.split-left, .cl-hero.split-right { grid-template-columns: 1fr; gap: 2.5rem; }
  .cl-hero.split-right .cl-hero-content { order: 0; }
  .cl-hero.split-right .cl-hero-media { order: 0; }
  .cl-hero h1 { font-size: clamp(2rem, 8vw, 2.75rem); }

  .cl-section { padding: 3rem 1.25rem; }
  .cl-section.pad-xl { padding: 4rem 1.25rem; }

  .cl-grid.cols-2, .cl-grid.cols-3, .cl-grid.cols-4 { grid-template-columns: 1fr; }
  .cl-features-grid.cols-2, .cl-features-grid.cols-3, .cl-features-grid.cols-4 { grid-template-columns: 1fr; }
  .cl-features-alt .cl-feature-item { grid-template-columns: 1fr; }

  .cl-stats-row { flex-direction: column; }
  .cl-stats-row .cl-stat + .cl-stat { border-left: none; border-top: 1px solid var(--cl-border); }

  .cl-pricing-grid { grid-template-columns: 1fr; max-width: 400px; }

  .cl-footer-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .cl-footer-cols { flex-direction: column; gap: 2rem; }

  .cl-logo-grid-items { gap: 2rem; }

  .cl-cta { padding: 3.5rem 1.5rem; }
}

@media (max-width: 480px) {
  .cl-hero { padding: 3rem 1rem 2.5rem; }
  .cl-hero-actions { flex-direction: column; width: 100%; }
  .cl-hero-actions .cl-btn { width: 100%; justify-content: center; }
  .cl-container { padding: 0 1rem; }
  .cl-cta-actions { flex-direction: column; width: 100%; }
  .cl-cta-actions .cl-btn { width: 100%; justify-content: center; }
}
    `;
    document.head.appendChild(style);
  }

  // ─── Mobile nav drawer ────────────────────────────────────────────────────────
  let drawerId = 0;

  function createMobileDrawer(links, cta) {
    drawerId++;
    const id = `cl-drawer-${drawerId}`;
    const linksHtml = links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
    const ctaHtml = cta ? `<a href="${cta.href}" class="cl-nav-cta">${cta.label}</a>` : '';
    return `
      <div class="cl-nav-drawer" id="${id}">
        <div class="cl-nav-drawer-overlay" onclick="document.getElementById('${id}').classList.remove('open')"></div>
        <div class="cl-nav-drawer-panel">
          <button class="cl-nav-drawer-close" onclick="document.getElementById('${id}').classList.remove('open')" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          ${linksHtml}
          ${ctaHtml}
        </div>
      </div>`;
  }

  // ─── Block renderers ──────────────────────────────────────────────────────────

  function renderBlock(block) {
    if (!block || !block.type) return '';
    const r = renderers[block.type];
    if (!r) return `<!-- unknown block: ${block.type} -->`;
    return r(block.props || {});
  }

  function renderChildren(children) {
    if (!Array.isArray(children)) return '';
    return children.map(renderBlock).join('');
  }

  function sectionHeading(eyebrow, heading, subheading) {
    const eyebrowHtml = eyebrow ? `<span class="cl-eyebrow">${eyebrow}</span>` : '';
    const subHtml = subheading ? `<p style="color:var(--cl-muted);font-size:1rem;margin-top:0.75rem;max-width:520px;margin-left:auto;margin-right:auto;">${subheading}</p>` : '';
    return `<div style="text-align:center;margin-bottom:3.5rem;">${eyebrowHtml}<h2 class="cl-text size-3xl weight-semibold" style="margin-top:0.25rem;">${heading}</h2>${subHtml}</div>`;
  }

  const renderers = {

    NAV({ logo, links = [], cta, sticky, style }) {
      const cls = ['cl-nav', sticky ? 'sticky' : '', style || 'solid'].filter(Boolean).join(' ');
      const logoHtml = typeof logo === 'object'
        ? `<a href="/" class="cl-nav-logo"><img src="${logo.src}" alt="${logo.alt || ''}"></a>`
        : `<a href="/" class="cl-nav-logo">${logo}</a>`;
      const linksHtml = links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
      const ctaHtml = cta ? `<a href="${cta.href}" class="cl-nav-cta desktop-only">${cta.label}</a>` : '';
      const drawerHtml = createMobileDrawer(links, cta);
      const toggleHtml = `<button class="cl-nav-toggle" onclick="document.getElementById('cl-drawer-${drawerId + 1}').classList.add('open')" aria-label="Open menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>`;
      return `${drawerHtml}<nav class="${cls}"><div class="cl-nav-inner">${logoHtml}<div class="cl-nav-links">${linksHtml}</div>${ctaHtml}${toggleHtml}</div></nav>`;
    },

    HERO({ eyebrow, heading, subheading, cta_primary, cta_secondary, layout = 'centered', bg, bg_value, media }) {
      const cls = `cl-hero ${layout}`;
      let style = '';
      if (bg === 'image' && bg_value) style = `background-image:url(${bg_value});background-size:cover;background-position:center;`;
      else if (bg === 'gradient') style = `background:linear-gradient(180deg, var(--cl-surface) 0%, var(--cl-bg) 100%);`;
      else if (bg === 'solid' && bg_value) style = `background:${bg_value};`;

      const eyebrowHtml = eyebrow ? `<span class="cl-eyebrow">${eyebrow}</span>` : '';
      const subHtml = subheading ? `<p class="cl-hero-sub">${subheading}</p>` : '';
      const primaryHtml = cta_primary ? `<a href="${cta_primary.href}" class="cl-btn primary lg">${cta_primary.label}</a>` : '';
      const secondaryHtml = cta_secondary ? `<a href="${cta_secondary.href}" class="cl-btn outline lg">${cta_secondary.label}</a>` : '';
      const mediaHtml = media ? `<div class="cl-hero-media"><${media.type === 'video' ? `video src="${media.src}" autoplay muted loop playsinline` : `img src="${media.src}" alt="" loading="lazy"`}></${media.type === 'video' ? 'video' : 'img'}></div>` : '';

      return `<div class="${cls}" style="${style}">
  <div class="cl-hero-content">
    ${eyebrowHtml}
    <h1>${heading}</h1>
    ${subHtml}
    <div class="cl-hero-actions">${primaryHtml}${secondaryHtml}</div>
  </div>
  ${mediaHtml}
</div>`;
    },

    SECTION({ id, padding = 'lg', bg = 'default', children = [] }) {
      const cls = `cl-section pad-${padding} bg-${bg}`;
      const idAttr = id ? `id="${id}"` : '';
      const style = bg && bg.startsWith('#') ? `style="background:${bg};"` : '';
      return `<section class="${cls}" ${idAttr} ${style}><div class="cl-container">${renderChildren(children)}</div></section>`;
    },

    GRID({ cols = 3, gap = 'md', children = [] }) {
      return `<div class="cl-grid cols-${cols} gap-${gap}">${renderChildren(children)}</div>`;
    },

    STACK({ gap = 'md', align = 'left', children = [] }) {
      return `<div class="cl-stack gap-${gap} align-${align}">${renderChildren(children)}</div>`;
    },

    CARD({ icon: ic, title, body, variant = 'outlined', href, image }) {
      const iconHtml = ic ? `<div class="cl-card-icon">${icon(ic, 18)}</div>` : '';
      const imgHtml = image ? `<img class="cl-card-img" src="${image.src}" alt="${image.alt || ''}" loading="lazy">` : '';
      const inner = `${imgHtml}${iconHtml}<div class="cl-card-title">${title}</div><div class="cl-card-body">${body}</div>`;
      if (href) return `<a href="${href}" class="cl-card ${variant}">${inner}</a>`;
      return `<div class="cl-card ${variant}">${inner}</div>`;
    },

    TEXT({ tag = 'p', content, align, size, weight, color }) {
      const cls = ['cl-text',
        align ? `align-${align}` : '',
        size ? `size-${size}` : '',
        weight ? `weight-${weight}` : '',
        color && !color.startsWith('#') ? `color-${color}` : ''
      ].filter(Boolean).join(' ');
      const style = color && color.startsWith('#') ? `style="color:${color}"` : '';
      return `<${tag} class="${cls}" ${style}>${content}</${tag}>`;
    },

    BUTTON({ label, href, icon: ic, icon_position = 'right', variant = 'primary', size = 'md' }) {
      const iconHtml = ic ? icon(ic, 16) : '';
      const inner = icon_position === 'left'
        ? `${iconHtml}${label}`
        : `${label}${iconHtml}`;
      if (href) return `<a href="${href}" class="cl-btn ${variant} ${size}">${inner}</a>`;
      return `<button class="cl-btn ${variant} ${size}">${inner}</button>`;
    },

    BADGE({ label, icon: ic, variant = 'default' }) {
      const iconHtml = ic ? icon(ic, 12) : '';
      return `<span class="cl-badge ${variant}">${iconHtml}${label}</span>`;
    },

    IMAGE({ src, alt = '', aspect, radius = 'md', fit = 'cover' }) {
      const aspectAttr = aspect && aspect !== 'auto' ? `data-aspect="${aspect}"` : '';
      const cls = `cl-image radius-${radius}`;
      if (!src) {
        const placeholderAspect = aspect || '16/9';
        return `<div class="cl-image-placeholder" style="aspect-ratio:${placeholderAspect};">Add image</div>`;
      }
      return `<div class="${cls}" ${aspectAttr}><img src="${src}" alt="${alt}" style="object-fit:${fit}" loading="lazy"></div>`;
    },

    FEATURES({ eyebrow, heading, subheading, layout = 'grid', cols = 3, items = [] }) {
      const layoutCls = layout === 'list' ? 'cl-features-list' : layout === 'alternating' ? 'cl-features-alt' : '';
      const headerHtml = sectionHeading(eyebrow, heading, subheading);
      const itemsHtml = items.map(item => `
  <div class="cl-feature-item">
    <div class="cl-feature-icon">${icon(item.icon, 18)}</div>
    <div class="cl-feature-text">
      <div class="cl-feature-title">${item.title}</div>
      <div class="cl-feature-body">${item.body}</div>
    </div>
  </div>`).join('');
      return `<div class="cl-features">${headerHtml}<div class="cl-features-grid cols-${cols} ${layoutCls}">${itemsHtml}</div></div>`;
    },

    STATS({ items = [], layout = 'row' }) {
      const cls = layout === 'grid' ? 'cl-stats-grid' : 'cl-stats-row';
      const statsHtml = items.map(s => `<div class="cl-stat"><div class="cl-stat-value">${s.value}</div><div class="cl-stat-label">${s.label}</div></div>`).join('');
      return `<div class="cl-stats"><div class="${cls}">${statsHtml}</div></div>`;
    },

    LOGO_GRID({ heading, logos = [] }) {
      const headingHtml = heading ? `<div class="cl-logo-grid-heading">${heading}</div>` : '';
      const logosHtml = logos.map(l => {
        if (l.src) return `<div class="cl-logo-grid-item"><img src="${l.src}" alt="${l.name}" loading="lazy"></div>`;
        return `<div class="cl-logo-grid-item"><span>${l.name}</span></div>`;
      }).join('');
      return `<div class="cl-logo-grid">${headingHtml}<div class="cl-logo-grid-items">${logosHtml}</div></div>`;
    },

    PRICING({ eyebrow, heading, subheading, plans = [] }) {
      const headerHtml = sectionHeading(eyebrow, heading, subheading);
      const plansHtml = plans.map(p => {
        const features = p.features.map(f => `<li>${f}</li>`).join('');
        const ctaHtml = p.cta ? `<a href="${p.cta.href}" class="cl-btn ${p.featured ? 'primary' : 'outline'}" style="width:100%;justify-content:center">${p.cta.label}</a>` : '';
        const descHtml = p.description ? `<p class="cl-plan-desc">${p.description}</p>` : '';
        return `<div class="cl-plan${p.featured ? ' featured' : ''}">
  <div class="cl-plan-name">${p.name}</div>
  <div class="cl-plan-price">${p.price}</div>
  <div class="cl-plan-period">${p.period}</div>
  ${descHtml}
  <ul class="cl-plan-features">${features}</ul>
  ${ctaHtml}
</div>`;
      }).join('');
      return `<div class="cl-pricing">${headerHtml}<div class="cl-pricing-grid">${plansHtml}</div></div>`;
    },

    FAQ({ heading, items = [] }) {
      const itemsHtml = items.map(i => `<details class="cl-faq-item"><summary>${i.question}</summary><div class="cl-faq-answer">${i.answer}</div></details>`).join('');
      return `<div class="cl-faq"><div class="cl-faq-header"><h2 class="cl-text size-2xl weight-semibold">${heading}</h2></div>${itemsHtml}</div>`;
    },

    TESTIMONIALS({ heading, items = [], layout = 'grid' }) {
      const headingHtml = heading ? `<div class="cl-testimonials-header"><h2 class="cl-text size-3xl weight-semibold">${heading}</h2></div>` : '';
      const itemsHtml = items.map(t => {
        const avatarInner = t.avatar
          ? `<img src="${t.avatar}" alt="${t.name}" loading="lazy">`
          : `<span>${t.name ? t.name[0] : ''}</span>`;
        return `<div class="cl-testimonial">
  <p class="cl-testimonial-quote">${t.quote}</p>
  <div class="cl-testimonial-author"><div class="cl-testimonial-avatar">${avatarInner}</div><div><div class="cl-testimonial-name">${t.name}</div>${t.title ? `<div class="cl-testimonial-title">${t.title}</div>` : ''}</div></div>
</div>`;
      }).join('');
      return `<div class="cl-testimonials">${headingHtml}<div class="cl-testimonials-grid">${itemsHtml}</div></div>`;
    },

    TIMELINE({ eyebrow, heading, subheading, items = [] }) {
      const headerHtml = sectionHeading(eyebrow, heading, subheading);
      const itemsHtml = items.map(item => `
  <div class="cl-timeline-item">
    <div class="cl-timeline-marker">
      <div class="cl-timeline-dot">${item.step}</div>
      <div class="cl-timeline-line"></div>
    </div>
    <div class="cl-timeline-text">
      <div class="cl-timeline-step">${item.step}</div>
      <div class="cl-timeline-title">${item.title}</div>
      <div class="cl-timeline-body">${item.body}</div>
    </div>
  </div>`).join('');
      return `<div class="cl-timeline">${headerHtml}${itemsHtml}</div>`;
    },

    CTA({ heading, subheading, cta_primary, cta_secondary, bg = 'surface' }) {
      const cls = `cl-cta bg-${bg}`;
      const style = bg && bg.startsWith('#') ? `style="background:${bg};"` : '';
      const subHtml = subheading ? `<p>${subheading}</p>` : '';
      const isDark = bg === 'dark' || bg === 'accent';
      const primaryHtml = cta_primary ? `<a href="${cta_primary.href}" class="cl-btn ${isDark ? 'primary' : 'primary'} lg">${cta_primary.label}</a>` : '';
      const secondaryHtml = cta_secondary ? `<a href="${cta_secondary.href}" class="cl-btn ${isDark ? 'outline' : 'outline'} lg">${cta_secondary.label}</a>` : '';
      return `<div class="${cls}" ${style}><h2>${heading}</h2>${subHtml}<div class="cl-cta-actions">${primaryHtml}${secondaryHtml}</div></div>`;
    },

    FOOTER({ logo, tagline, columns = [], social, bottom }) {
      const logoHtml = typeof logo === 'object'
        ? `<img src="${logo.src}" alt="${logo.alt || ''}" style="height:24px">`
        : logo;
      const colsHtml = columns.map(col => `<div class="cl-footer-col"><h4>${col.heading}</h4><ul>${col.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul></div>`).join('');
      const socialsHtml = social && social.length
        ? `<div class="cl-footer-socials">${social.map(s => `<a href="${s.href}" aria-label="${s.icon}">${icon(s.icon, 16)}</a>`).join('')}</div>`
        : '';
      const bottomHtml = bottom ? `<div class="cl-footer-bottom">${bottom}</div>` : '';
      return `<footer class="cl-footer">
  <div class="cl-footer-inner">
    <div class="cl-footer-brand"><div class="cl-footer-logo">${logoHtml}</div>${tagline ? `<p>${tagline}</p>` : ''}${socialsHtml}</div>
    <div class="cl-footer-cols">${colsHtml}</div>
  </div>
  ${bottomHtml}
</footer>`;
    },

    DIVIDER({ style = 'line', size = 'md' }) {
      if (style === 'space') return `<div class="cl-divider-space ${size}"></div>`;
      return `<hr class="cl-divider-line">`;
    },
  };

  // ─── Main render function ─────────────────────────────────────────────────────

  function render(json, target) {
    if (typeof json === 'string') {
      try { json = JSON.parse(json); } catch (e) { console.error('[CoreLang] Invalid JSON', e); return; }
    }

    // Support both v0.1 and v0.2
    if (!json.version || json.version === '0.1') {
      // Migrate: add muted from theme if missing
      if (json.meta?.theme && !json.meta.theme.muted) {
        json.meta.theme.muted = '#737373';
      }
    }

    injectTheme(json.meta?.theme || {}, json.meta?.fonts || {});

    if (json.meta?.title) document.title = json.meta.title;
    if (json.meta?.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
      meta.content = json.meta.description;
    }

    const html = (json.blocks || []).map(renderBlock).join('');

    let el;
    if (typeof target === 'string') el = document.querySelector(target);
    else if (target instanceof Element) el = target;
    else el = document.body;

    if (!el) { console.error('[CoreLang] Target not found:', target); return; }
    el.classList.add('cl-root');
    el.innerHTML = html;
  }

  // ─── Auto-render from <script type="corelang"> ────────────────────────────────

  function autoRender() {
    const scripts = document.querySelectorAll('script[type="corelang"]');
    scripts.forEach(script => {
      try {
        const json = JSON.parse(script.textContent);
        const targetSelector = script.getAttribute('data-target') || 'body';
        render(json, targetSelector);
      } catch (e) {
        console.error('[CoreLang] Failed to parse inline CoreLang script', e);
      }
    });
  }

  // ─── Exports ──────────────────────────────────────────────────────────────────

  const CoreLang = { render, version: '0.2.0' };

  // Browser global
  global.CoreLang = CoreLang;

  // Auto-run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoRender);
  } else {
    autoRender();
  }

})(typeof window !== 'undefined' ? window : globalThis);
