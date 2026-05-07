/*!
 * corelang.js v0.5.0
 * The official CoreLang renderer — by ReefDesign
 * https://dcpcdn.de/corelang.js
 */
(function (global) {
    'use strict';

    // ─── Lucide icons (inline SVG via CDN) ───────────────────────────────────────
    const ICON_CDN = 'https://unpkg.com/lucide-static@latest/icons/';

    // Fallback SVG icons for common social/brand names not in Lucide
    const SOCIAL_ICONS = {
        twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
        x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>',
        github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
        linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
        youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>',
        facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
        mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
        discord: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-.5-3-.5s-1.183-1-2.5-1c-1.333 0-2.5 1-2.5 1s-1.543-.515-3 .5c-2 5.667-2.167 9.833-1.5 11.5.667 1.333 2 3 3.5 3 .5 0 2-2 2-3"/></svg>',
        dribbble: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>',
        figma: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>'
    };

    function icon(name, size = 18) {
        if (!name) return '';
        const social = SOCIAL_ICONS[name];
        if (social) {
            return `<span class="cl-icon" style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;">${social.replace(/<svg /, `<svg width="${size}" height="${size}" `)}</span>`;
        }
        return `<img src="${ICON_CDN}${name}.svg" width="${size}" height="${size}" alt="" class="cl-icon" style="display:inline-block;vertical-align:middle;opacity:0.8;" loading="lazy" onerror="this.outerHTML='<span style=\\'display:inline-block;width:${size}px;height:${size}px;background:var(--cl-muted);border-radius:50%;\\'></span>'">`;
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
        link.href = `https://fonts.googleapis.com/css2?family=${googleFonts}:wght@300;400;500;600;700;800&display=swap`;
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
  --cl-shadow-glow: 0 0 20px ${theme.accent || '#0a0a0a'}40;
  --cl-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.cl-root *, .cl-root *::before, .cl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cl-root { font-family: var(--cl-font-body); background: var(--cl-bg); color: var(--cl-text); line-height: 1.6; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.cl-root a { color: inherit; text-decoration: none; }
.cl-root img { max-width: 100%; display: block; }
.cl-root .cl-icon img { max-width: none; display: inline; }
.cl-root .cl-footer-socials img { max-width: none; display: inline; }
.cl-root .cl-card-icon img { max-width: none; display: inline; }
.cl-root .cl-feature-icon img { max-width: none; display: inline; }
.cl-root .cl-badge img { max-width: none; display: inline; }
.cl-root .cl-btn img { max-width: none; display: inline; }
.cl-root .cl-eyebrow img { max-width: none; display: inline; }
.cl-root .cl-input img { max-width: none; display: inline; }
.cl-root .cl-checkbox img { max-width: none; display: inline; }
.cl-root ul, .cl-root ol { list-style: none; }
.cl-container { max-width: 1120px; margin: 0 auto; padding: 0 2rem; }

/* ─── Scroll Reveal ────────────────────────────────────────────── */
.cl-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
.cl-reveal.cl-visible { opacity: 1; transform: translateY(0); }

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
.cl-nav-logo .cl-logo-dot { width: 8px; height: 8px; background: var(--cl-accent); border-radius: 50%; flex-shrink: 0; }
.cl-nav-links { display: flex; align-items: center; gap: 1.75rem; }
.cl-nav-links a { font-size: 0.85rem; color: var(--cl-muted); transition: color var(--cl-transition); }
.cl-nav-links a:hover { color: var(--cl-accent); }
.cl-nav-cta { background: var(--cl-accent); color: #fff; font-family: var(--cl-font-body); font-size: 0.825rem; font-weight: 500; padding: 0.45rem 1.1rem; border-radius: var(--cl-radius); border: none; cursor: pointer; transition: opacity var(--cl-transition), transform var(--cl-transition), box-shadow var(--cl-transition); display: inline-flex; align-items: center; gap: 0.35rem; }
.cl-nav-cta:hover { opacity: 0.88; box-shadow: var(--cl-shadow-glow); }

/* Mobile menu toggle */
.cl-nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: var(--cl-text); }
.cl-nav-toggle svg { width: 22px; height: 22px; }

/* Mobile menu drawer */
.cl-nav-drawer { display: none; position: fixed; inset: 0; z-index: 200; }
.cl-nav-drawer.open { display: block; }
.cl-nav-drawer-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); }
.cl-nav-drawer-panel { position: absolute; top: 0; right: 0; width: min(320px, 85vw); height: 100%; background: var(--cl-bg); padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto; animation: cl-drawer-in 0.25s ease; }
@keyframes cl-drawer-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
.cl-nav-drawer-close { align-self: flex-end; background: none; border: none; cursor: pointer; padding: 0.5rem; color: var(--cl-muted); margin-bottom: 1rem; }
.cl-nav-drawer-close svg { width: 20px; height: 20px; }
.cl-nav-drawer a { display: block; padding: 0.75rem 0; font-size: 1rem; color: var(--cl-text); border-bottom: 1px solid var(--cl-border); }
.cl-nav-drawer .cl-nav-cta { margin-top: 1rem; text-align: center; justify-content: center; width: 100%; padding: 0.65rem 1.25rem; }

/* ─── HERO ────────────────────────────────────────────────────── */
.cl-hero { padding: 7rem 2rem 6rem; position: relative; }
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
.cl-hero-media { border-radius: var(--cl-radius); overflow: hidden; background: var(--cl-surface); position: relative; }
.cl-hero-media img, .cl-hero-media video { width: 100%; height: 100%; object-fit: cover; display: block; }
/* Hero background effects */
.cl-hero .cl-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: -1; }

/* ─── SECTION ────────────────────────────────────────────────── */
.cl-section { padding: 5rem 2rem; position: relative; }
.cl-section.pad-sm { padding: 2.5rem 2rem; }
.cl-section.pad-md { padding: 3.5rem 2rem; }
.cl-section.pad-lg { padding: 5rem 2rem; }
.cl-section.pad-xl { padding: 7rem 2rem; }
.cl-section.bg-surface { background: var(--cl-surface); }
.cl-section.bg-dark { background: var(--cl-text); color: var(--cl-bg); --cl-muted: rgba(255,255,255,0.55); --cl-surface: rgba(255,255,255,0.08); --cl-border: rgba(255,255,255,0.1); }
.cl-section.bg-default { background: var(--cl-bg); }
/* Section background patterns */
.cl-section.pattern-grid { background-image: linear-gradient(rgba(128,128,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.04) 1px, transparent 1px); background-size: 48px 48px; }
.cl-section.pattern-dots { background-image: radial-gradient(circle, rgba(128,128,128,0.1) 1px, transparent 1px); background-size: 24px 24px; }
.cl-section.pattern-grid.bg-dark { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 48px 48px; }
.cl-section.pattern-dots.bg-dark { background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 24px 24px; }

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
.cl-stack.max-sm { max-width: 400px; margin-left: auto; margin-right: auto; }
.cl-stack.max-md { max-width: 560px; margin-left: auto; margin-right: auto; }
.cl-stack.max-lg { max-width: 720px; margin-left: auto; margin-right: auto; }
.cl-stack.max-xl { max-width: 960px; margin-left: auto; margin-right: auto; }

/* ─── CARD ────────────────────────────────────────────────────── */
.cl-card { padding: 1.75rem; border-radius: var(--cl-radius); transition: transform var(--cl-transition), box-shadow var(--cl-transition), border-color var(--cl-transition); }
.cl-card.outlined { border: 1px solid var(--cl-border); background: var(--cl-bg); }
.cl-card.outlined:hover { transform: translateY(-2px); box-shadow: var(--cl-shadow-md); border-color: var(--cl-accent); }
.cl-card.filled { background: var(--cl-accent); color: #fff; --cl-muted: rgba(255,255,255,0.65); }
.cl-card.filled:hover { transform: translateY(-2px); box-shadow: var(--cl-shadow-lg); }
.cl-card.filled .cl-icon { filter: brightness(10); }
.cl-card.glow { border: 1px solid var(--cl-border); background: var(--cl-bg); box-shadow: inset 0 0 30px rgba(0,0,0,0.02); }
.cl-card.glow:hover { border-color: color-mix(in srgb, var(--cl-accent) 50%, transparent); box-shadow: var(--cl-shadow-glow); }
.cl-card.ghost { background: transparent; }
.cl-card.ghost:hover { background: var(--cl-surface); }
.cl-card-img { width: calc(100% + 3.5rem); margin: -1.75rem -1.75rem 1.25rem -1.75rem; height: 180px; object-fit: cover; border-radius: var(--cl-radius) var(--cl-radius) 0 0; }
.cl-card-icon { width: 40px; height: 40px; background: var(--cl-surface); border-radius: var(--cl-radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; flex-shrink: 0; transition: transform var(--cl-transition); }
.cl-card:hover .cl-card-icon { transform: scale(1.1); }
.cl-card.filled .cl-card-icon { background: rgba(255,255,255,0.12); }
.cl-card.glow .cl-card-icon { background: color-mix(in srgb, var(--cl-accent) 12%, transparent); color: var(--cl-accent); }
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
.cl-text.size-hero { font-size: clamp(2.75rem, 7vw, 5rem); letter-spacing: -0.04em; line-height: 1.05; }
.cl-text.weight-normal { font-weight: 400; }
.cl-text.weight-medium { font-weight: 500; }
.cl-text.weight-semibold { font-weight: 600; }
.cl-text.weight-bold { font-weight: 700; }
.cl-text.weight-extrabold { font-weight: 800; }
/* Gradient text */
.cl-text.gradient { background: linear-gradient(135deg, var(--cl-accent), color-mix(in srgb, var(--cl-accent) 70%, var(--cl-text))); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
/* Glow text */
.cl-text.glow { text-shadow: 0 0 20px color-mix(in srgb, var(--cl-accent) 40%, transparent); }

/* ─── BUTTON ────────────────────────────────────────────────── */
.cl-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; font-family: var(--cl-font-body); font-size: 0.875rem; font-weight: 500; padding: 0.625rem 1.35rem; border-radius: var(--cl-radius); border: 1px solid transparent; cursor: pointer; transition: all var(--cl-transition); text-decoration: none; white-space: nowrap; }
.cl-btn.primary { background: var(--cl-accent); color: #fff; border-color: var(--cl-accent); }
.cl-btn.primary:hover { opacity: 0.88; box-shadow: var(--cl-shadow-glow); }
.cl-btn.secondary { background: var(--cl-surface); color: var(--cl-text); border-color: var(--cl-surface); }
.cl-btn.secondary:hover { opacity: 0.88; }
.cl-btn.outline { background: transparent; color: var(--cl-text); border-color: var(--cl-border); }
.cl-btn.outline:hover { background: var(--cl-surface); border-color: var(--cl-muted); }
.cl-btn.ghost { background: transparent; color: var(--cl-text); border-color: transparent; }
.cl-btn.ghost:hover { background: var(--cl-surface); }
.cl-btn.sm { font-size: 0.8rem; padding: 0.4rem 0.9rem; }
.cl-btn.lg { font-size: 0.95rem; padding: 0.8rem 1.75rem; }
/* Inverse variant for dark on accent */
.cl-btn.inverse { background: #fff; color: var(--cl-accent); border-color: #fff; }
.cl-btn.inverse:hover { box-shadow: var(--cl-shadow-glow); }
/* Dark section button overrides */
.cl-section.bg-dark .cl-btn.outline { color: var(--cl-bg); border-color: rgba(255,255,255,0.2); }
.cl-section.bg-dark .cl-btn.outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.35); }
.cl-section.bg-dark .cl-btn.primary { background: #fff; color: var(--cl-text); border-color: #fff; }

/* ─── BADGE ────────────────────────────────────────────────── */
.cl-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 9999px; }
.cl-badge.default { background: var(--cl-surface); color: var(--cl-text); }
.cl-badge.accent { background: var(--cl-accent); color: #fff; }
.cl-badge.outline { border: 1px solid color-mix(in srgb, var(--cl-accent) 30%, transparent); color: var(--cl-accent); background: color-mix(in srgb, var(--cl-accent) 5%, transparent); }

/* ─── EYEBROW ────────────────────────────────────────────────── */
.cl-eyebrow { display: inline-block; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.09em; text-transform: uppercase; color: var(--cl-accent); margin-bottom: 1rem; padding: 0.3rem 0.8rem; border: 1px solid color-mix(in srgb, var(--cl-accent) 30%, transparent); border-radius: 9999px; background: color-mix(in srgb, var(--cl-accent) 5%, var(--cl-bg); }

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
.cl-feature-item { padding: 1.75rem; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-bg); transition: background var(--cl-transition), box-shadow var(--cl-transition), border-color var(--cl-transition); }
.cl-feature-item:hover { border-color: color-mix(in srgb, var(--cl-accent) 40%, transparent); box-shadow: var(--cl-shadow-sm); }
.cl-feature-icon { width: 40px; height: 40px; background: var(--cl-surface); border-radius: var(--cl-radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; flex-shrink: 0; color: var(--cl-accent); }
.cl-feature-title { font-family: var(--cl-font-heading); font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; letter-spacing: -0.01em; }
.cl-feature-body { font-size: 0.85rem; color: var(--cl-muted); line-height: 1.6; }
/* List layout */
.cl-features-list .cl-feature-item { display: flex; gap: 1.25rem; align-items: flex-start; border: none; border-bottom: 1px solid var(--cl-border); border-radius: 0; padding: 1.5rem 0; background: transparent; }
.cl-features-list .cl-feature-item:last-child { border-bottom: none; }
.cl-features-list .cl-feature-item:hover { background: transparent; box-shadow: none; border-color: var(--cl-border); }
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
.cl-plan.featured { border-color: var(--cl-accent); border-width: 2px; position: relative; box-shadow: var(--cl-shadow-glow); }
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

/* ─── TERMINAL ──────────────────────────────────────────────── */
.cl-terminal { border-radius: var(--cl-radius); overflow: hidden; border: 1px solid var(--cl-border); background: linear-gradient(145deg, #111111, #0d0d0d); font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace; font-size: 0.82rem; line-height: 1.7; }
.cl-terminal-bar { display: flex; align-items: center; gap: 6px; padding: 0.6rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.3); }
.cl-terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.cl-terminal-dot.red { background: #ef4444; }
.cl-terminal-dot.yellow { background: #eab308; }
.cl-terminal-dot.green { background: #22c55e; }
.cl-terminal-title { color: rgba(255,255,255,0.35); font-size: 0.7rem; margin-left: 8px; }
.cl-terminal-body { padding: 1.5rem; color: var(--cl-accent); white-space: pre-wrap; min-height: 100px; }
.cl-terminal-body .cl-terminal-prompt { color: rgba(255,255,255,0.35); }
.cl-terminal-body .cl-terminal-cursor { display: inline-block; width: 8px; height: 16px; background: var(--cl-accent); animation: cl-blink 1s infinite; vertical-align: middle; margin-left: 2px; }
@keyframes cl-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
/* Terminal glow border */
.cl-terminal.glow { box-shadow: 0 0 15px color-mix(in srgb, var(--cl-accent) 20%, transparent), inset 0 0 15px rgba(0,0,0,0.3); }

/* ─── CTA ────────────────────────────────────────────────────── */
.cl-cta { text-align: center; padding: 5.5rem 2rem; border-radius: var(--cl-radius); position: relative; overflow: hidden; }
.cl-cta.bg-default { background: var(--cl-surface); }
.cl-cta.bg-surface { background: var(--cl-surface); }
.cl-cta.bg-dark { background: var(--cl-text); color: var(--cl-bg); --cl-muted: rgba(255,255,255,0.55); --cl-surface: rgba(255,255,255,0.08); --cl-border: rgba(255,255,255,0.15); }
.cl-cta.bg-accent { background: var(--cl-accent); color: #fff; --cl-muted: rgba(255,255,255,0.65); --cl-surface: rgba(255,255,255,0.12); --cl-border: rgba(255,255,255,0.2); }
/* CTA dark/accent button overrides */
.cl-cta.bg-dark .cl-btn.primary { background: #fff; color: var(--cl-text); border-color: #fff; }
.cl-cta.bg-dark .cl-btn.primary:hover { opacity: 0.88; }
.cl-cta.bg-dark .cl-btn.outline { color: #fff; border-color: rgba(255,255,255,0.25); }
.cl-cta.bg-dark .cl-btn.outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.4); }
.cl-cta.bg-dark .cl-btn.secondary { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.1); }
.cl-cta.bg-dark .cl-btn.ghost { color: #fff; }
.cl-cta.bg-accent .cl-btn.primary { background: #fff; color: var(--cl-accent); border-color: #fff; }
.cl-cta.bg-accent .cl-btn.primary:hover { opacity: 0.88; }
.cl-cta.bg-accent .cl-btn.outline { color: #fff; border-color: rgba(255,255,255,0.3); }
.cl-cta.bg-accent .cl-btn.outline:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.5); }
.cl-cta h2 { font-family: var(--cl-font-heading); font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600; letter-spacing: -0.025em; margin-bottom: 0.75rem; line-height: 1.15; }
.cl-cta p { color: var(--cl-muted); font-size: 0.95rem; margin-bottom: 2rem; }
.cl-cta-actions { display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
/* CTA input field */
.cl-cta-input { display: inline-flex; align-items: center; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); overflow: hidden; max-width: 440px; width: 100%; background: var(--cl-bg); }
.cl-cta-input input { background: transparent; border: none; outline: none; padding: 0.65rem 1rem; flex: 1; font-family: var(--cl-font-body); font-size: 0.85rem; color: var(--cl-text); min-width: 0; }
.cl-cta-input input::placeholder { color: var(--cl-muted); }
.cl-cta-input .cl-btn { border-radius: 0; border: none; white-space: nowrap; }
/* CTA background glow */
.cl-cta .cl-glow { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }

/* ─── FOOTER ────────────────────────────────────────────────── */
.cl-footer { border-top: 1px solid var(--cl-border); padding: 4rem 2rem 2rem; background: var(--cl-bg); }
.cl-footer-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr auto; gap: 4rem; }
.cl-footer-brand .cl-footer-logo { font-family: var(--cl-font-heading); font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
.cl-footer-brand .cl-footer-logo img { height: 24px; width: auto; }
.cl-footer-brand p { font-size: 0.82rem; color: var(--cl-muted); line-height: 1.5; max-width: 280px; }
.cl-footer-socials { display: flex; gap: 0.75rem; margin-top: 1rem; }
.cl-footer-socials a { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: var(--cl-radius); background: var(--cl-surface); color: var(--cl-muted); transition: background var(--cl-transition), color var(--cl-transition); }
.cl-footer-socials a:hover { background: var(--cl-accent); color: #fff; }
.cl-footer-socials a .cl-icon { opacity: 1; }
.cl-footer-socials a:hover .cl-icon { filter: brightness(10); }
.cl-footer-cols { display: flex; gap: 4rem; }
.cl-footer-col h4 { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cl-muted); margin-bottom: 1rem; }
.cl-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.cl-footer-col ul a { font-size: 0.85rem; color: var(--cl-text); transition: color var(--cl-transition); }
.cl-footer-col ul a:hover { color: var(--cl-accent); }
.cl-footer-bottom { max-width: 1120px; margin: 2.5rem auto 0; padding-top: 1.5rem; border-top: 1px solid var(--cl-border); font-size: 0.78rem; color: var(--cl-muted); }

/* ─── FORM ────────────────────────────────────────────────── */
.cl-form { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
.cl-form.cl-form-gap-sm { gap: 0.625rem; }
.cl-form.cl-form-gap-md { gap: 1rem; }
.cl-form.cl-form-gap-lg { gap: 1.5rem; }

/* ─── INPUT ────────────────────────────────────────────────── */
.cl-input { display: flex; flex-direction: column; gap: 0.375rem; width: 100%; }
.cl-input-label { font-size: 0.825rem; font-weight: 500; color: var(--cl-text); letter-spacing: -0.01em; }
.cl-input-label .cl-input-required { color: var(--cl-accent); margin-left: 2px; }
.cl-input-field {
  font-family: var(--cl-font-body);
  font-size: 0.875rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--cl-border);
  border-radius: var(--cl-radius);
  background: var(--cl-surface);
  color: var(--cl-text);
  outline: none;
  transition: border-color var(--cl-transition), box-shadow var(--cl-transition);
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
}
.cl-input-field::placeholder { color: var(--cl-muted); opacity: 0.7; }
.cl-input-field:hover { border-color: color-mix(in srgb, var(--cl-border) 70%, var(--cl-muted)); }
.cl-input-field:focus { border-color: var(--cl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--cl-accent) 12%, transparent); }
.cl-input-field.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
/* Sizes */
.cl-input-field.sm { font-size: 0.8rem; padding: 0.45rem 0.7rem; }
.cl-input-field.lg { font-size: 0.95rem; padding: 0.8rem 1rem; }
/* Variants */
.cl-input-filled .cl-input-field { background: var(--cl-surface); border-color: transparent; }
.cl-input-filled .cl-input-field:focus { border-color: var(--cl-accent); }
/* Hint / error text */
.cl-input-hint { font-size: 0.75rem; color: var(--cl-muted); line-height: 1.4; }
.cl-input-error-text { font-size: 0.75rem; color: #ef4444; line-height: 1.4; }
/* Textarea */
.cl-input-field.textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
/* Dark section overrides */
.cl-section.bg-dark .cl-input-field { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: #fff; }
.cl-section.bg-dark .cl-input-field::placeholder { color: rgba(255,255,255,0.35); }
.cl-section.bg-dark .cl-input-field:focus { border-color: var(--cl-accent); background: rgba(255,255,255,0.08); }
.cl-section.bg-dark .cl-input-label { color: #fff; }
.cl-section.bg-dark .cl-input-hint { color: rgba(255,255,255,0.45); }
/* CTA dark overrides */
.cl-cta.bg-dark .cl-input-field { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: #fff; }
.cl-cta.bg-dark .cl-input-field::placeholder { color: rgba(255,255,255,0.35); }
.cl-cta.bg-dark .cl-input-field:focus { border-color: var(--cl-accent); background: rgba(255,255,255,0.08); }
.cl-cta.bg-dark .cl-input-label { color: #fff; }
/* Accent bg overrides */
.cl-cta.bg-accent .cl-input-field { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); color: #fff; }
.cl-cta.bg-accent .cl-input-field::placeholder { color: rgba(255,255,255,0.45); }
.cl-cta.bg-accent .cl-input-field:focus { border-color: #fff; background: rgba(255,255,255,0.14); }
.cl-cta.bg-accent .cl-input-label { color: #fff; }

/* ─── CHECKBOX ────────────────────────────────────────────────── */
.cl-checkbox { display: flex; align-items: flex-start; gap: 0.6rem; cursor: pointer; }
.cl-checkbox input[type="checkbox"] {
  appearance: none; -webkit-appearance: none;
  width: 18px; height: 18px; min-width: 18px;
  border: 1.5px solid var(--cl-border);
  border-radius: 4px;
  background: var(--cl-bg);
  cursor: pointer;
  transition: background var(--cl-transition), border-color var(--cl-transition), box-shadow var(--cl-transition);
  margin-top: 1px;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.cl-checkbox input[type="checkbox"]:hover { border-color: var(--cl-muted); }
.cl-checkbox input[type="checkbox"]:focus { border-color: var(--cl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--cl-accent) 12%, transparent); outline: none; }
.cl-checkbox input[type="checkbox"]:checked {
  background: var(--cl-accent);
  border-color: var(--cl-accent);
}
.cl-checkbox input[type="checkbox"]:checked::after {
  content: '';
  display: block;
  width: 10px; height: 6px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
  margin-top: 1px;
}
.cl-checkbox-label { font-size: 0.85rem; color: var(--cl-text); line-height: 1.5; }
.cl-checkbox-label a { color: var(--cl-accent); text-decoration: underline; text-underline-offset: 2px; }
.cl-checkbox-label a:hover { opacity: 0.8; }
/* Dark section overrides */
.cl-section.bg-dark .cl-checkbox input[type="checkbox"] { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
.cl-section.bg-dark .cl-checkbox-label { color: var(--cl-bg); }
.cl-cta.bg-dark .cl-checkbox input[type="checkbox"] { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
.cl-cta.bg-dark .cl-checkbox-label { color: #fff; }
.cl-cta.bg-accent .cl-checkbox input[type="checkbox"] { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
.cl-cta.bg-accent .cl-checkbox-label { color: #fff; }

/* ─── DIVIDER ────────────────────────────────────────────────── */
.cl-divider-line { border: none; border-top: 1px solid var(--cl-border); margin: 0; }
.cl-divider-space.sm { height: 1.5rem; }
.cl-divider-space.md { height: 3rem; }
.cl-divider-space.lg { height: 5rem; }

/* ─── Smooth scroll ─────────────────────────────────────────── */
.cl-root { scroll-behavior: smooth; }

/* ─── Glassmorphism card ────────────────────────────────────── */
.cl-card.glass { background: rgba(255,255,255,0.06); backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); border: 1px solid rgba(255,255,255,0.1); }
.cl-card.glass:hover { border-color: color-mix(in srgb, var(--cl-accent) 40%, transparent); box-shadow: var(--cl-shadow-glow); transform: translateY(-2px); }
.cl-card.glass .cl-card-icon { background: rgba(255,255,255,0.08); }

/* ─── ACCORDION ─────────────────────────────────────────────── */
.cl-accordion { width: 100%; }
.cl-accordion-item { border: 1px solid var(--cl-border); border-radius: var(--cl-radius); overflow: hidden; transition: border-color var(--cl-transition); }
.cl-accordion-item + .cl-accordion-item { margin-top: 0.5rem; }
.cl-accordion-item[open] { border-color: color-mix(in srgb, var(--cl-accent) 30%, transparent); }
.cl-accordion-item summary { padding: 1rem 1.25rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: var(--cl-bg); transition: background var(--cl-transition), color var(--cl-transition); }
.cl-accordion-item summary::-webkit-details-marker { display: none; }
.cl-accordion-item summary::after { content: '+'; font-size: 1.25rem; color: var(--cl-muted); transition: transform 0.3s ease; flex-shrink: 0; margin-left: 1rem; }
.cl-accordion-item[open] summary::after { transform: rotate(45deg); color: var(--cl-accent); }
.cl-accordion-item summary:hover { color: var(--cl-accent); }
.cl-accordion-body { padding: 0 1.25rem 1.25rem; font-size: 0.85rem; color: var(--cl-muted); line-height: 1.7; }

/* ─── TABS ──────────────────────────────────────────────────── */
.cl-tabs { width: 100%; }
.cl-tabs-nav { display: flex; gap: 0; border-bottom: 1px solid var(--cl-border); margin-bottom: 1.5rem; overflow-x: auto; scrollbar-width: none; }
.cl-tabs-nav::-webkit-scrollbar { display: none; }
.cl-tabs-btn { font-family: var(--cl-font-body); font-size: 0.85rem; font-weight: 500; padding: 0.75rem 1.25rem; border: none; border-bottom: 2px solid transparent; background: none; color: var(--cl-muted); cursor: pointer; white-space: nowrap; transition: color var(--cl-transition), border-color var(--cl-transition); }
.cl-tabs-btn:hover { color: var(--cl-text); }
.cl-tabs-btn.active { color: var(--cl-accent); border-bottom-color: var(--cl-accent); }
.cl-tabs-panel { display: none; animation: cl-tab-in 0.25s ease; }
.cl-tabs-panel.active { display: block; }
@keyframes cl-tab-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

/* ─── MARQUEE ───────────────────────────────────────────────── */
.cl-marquee { overflow: hidden; position: relative; padding: 1rem 0; }
.cl-marquee-track { display: flex; gap: 3rem; animation: cl-marquee-scroll 30s linear infinite; width: max-content; }
.cl-marquee.speed-fast .cl-marquee-track { animation-duration: 15s; }
.cl-marquee.speed-slow .cl-marquee-track { animation-duration: 60s; }
.cl-marquee:hover .cl-marquee-track { animation-play-state: paused; }
.cl-marquee-item { font-size: 0.9rem; font-weight: 500; color: var(--cl-muted); white-space: nowrap; display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.cl-marquee-fade { position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none; }
.cl-marquee-fade.left { left: 0; background: linear-gradient(90deg, var(--cl-bg), transparent); }
.cl-marquee-fade.right { right: 0; background: linear-gradient(270deg, var(--cl-bg), transparent); }
@keyframes cl-marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* ─── BANNER ────────────────────────────────────────────────── */
.cl-banner { display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.6rem 1.5rem; font-size: 0.82rem; font-weight: 500; text-align: center; }
.cl-banner.accent { background: var(--cl-accent); color: #fff; }
.cl-banner.surface { background: var(--cl-surface); color: var(--cl-text); }
.cl-banner.dark { background: var(--cl-text); color: var(--cl-bg); }
.cl-banner a { color: inherit; text-decoration: underline; text-underline-offset: 2px; font-weight: 600; }
.cl-banner-close { background: none; border: none; color: inherit; cursor: pointer; opacity: 0.6; padding: 0.25rem; margin-left: 0.5rem; transition: opacity var(--cl-transition); }
.cl-banner-close:hover { opacity: 1; }

/* ─── CODE ──────────────────────────────────────────────────── */
.cl-code { border-radius: var(--cl-radius); overflow: hidden; border: 1px solid var(--cl-border); background: #0d0d0d; font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace; font-size: 0.82rem; line-height: 1.7; }
.cl-code-header { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.3); }
.cl-code-lang { font-size: 0.7rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.05em; }
.cl-code-copy { font-family: var(--cl-font-body); font-size: 0.7rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: rgba(255,255,255,0.5); padding: 0.2rem 0.5rem; cursor: pointer; transition: all var(--cl-transition); }
.cl-code-copy:hover { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8); }
.cl-code-body { padding: 1.25rem; color: #e5e5e5; white-space: pre-wrap; overflow-x: auto; }
.cl-code .kw { color: #c084fc; } .cl-code .str { color: #86efac; } .cl-code .cm { color: #525252; } .cl-code .fn { color: #60a5fa; } .cl-code .num { color: #fbbf24; }

/* ─── VIDEO ─────────────────────────────────────────────────── */
.cl-video { border-radius: var(--cl-radius); overflow: hidden; position: relative; background: #000; }
.cl-video iframe, .cl-video video { width: 100%; aspect-ratio: 16/9; border: none; display: block; }
.cl-video.radius-none { border-radius: 0; }
.cl-video.radius-lg { border-radius: 16px; }

/* ─── COUNTER ───────────────────────────────────────────────── */
.cl-counter { text-align: center; }
.cl-counter-value { font-family: var(--cl-font-heading); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1; color: var(--cl-accent); }
.cl-counter-suffix { font-size: 0.7em; }
.cl-counter-label { font-size: 0.82rem; color: var(--cl-muted); margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; }

/* ─── TOGGLE ────────────────────────────────────────────────── */
.cl-toggle { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
.cl-toggle input { appearance: none; -webkit-appearance: none; width: 44px; height: 24px; border-radius: 12px; background: var(--cl-border); position: relative; cursor: pointer; transition: background var(--cl-transition); flex-shrink: 0; }
.cl-toggle input::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform var(--cl-transition); box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.cl-toggle input:checked { background: var(--cl-accent); }
.cl-toggle input:checked::after { transform: translateX(20px); }
.cl-toggle input:focus { outline: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--cl-accent) 15%, transparent); }
.cl-toggle-label { font-size: 0.85rem; color: var(--cl-text); }
.cl-toggle-desc { font-size: 0.75rem; color: var(--cl-muted); margin-top: 0.15rem; }

/* ─── SELECT ────────────────────────────────────────────────── */
.cl-select { display: flex; flex-direction: column; gap: 0.375rem; width: 100%; }
.cl-select-label { font-size: 0.825rem; font-weight: 500; color: var(--cl-text); letter-spacing: -0.01em; }
.cl-select-field { font-family: var(--cl-font-body); font-size: 0.875rem; padding: 0.625rem 2.25rem 0.625rem 0.875rem; border: 1px solid var(--cl-border); border-radius: var(--cl-radius); background: var(--cl-surface); color: var(--cl-text); outline: none; appearance: none; -webkit-appearance: none; width: 100%; cursor: pointer; transition: border-color var(--cl-transition), box-shadow var(--cl-transition); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 16px; }
.cl-select-field:hover { border-color: color-mix(in srgb, var(--cl-border) 70%, var(--cl-muted)); }
.cl-select-field:focus { border-color: var(--cl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--cl-accent) 12%, transparent); }
.cl-section.bg-dark .cl-select-field { background-color: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: #fff; }

/* ─── ALERT ─────────────────────────────────────────────────── */
.cl-alert { display: flex; gap: 0.75rem; padding: 1rem 1.25rem; border-radius: var(--cl-radius); font-size: 0.85rem; line-height: 1.6; border: 1px solid; }
.cl-alert.info { background: color-mix(in srgb, #3b82f6 8%, var(--cl-bg)); border-color: color-mix(in srgb, #3b82f6 20%, transparent); color: #3b82f6; }
.cl-alert.success { background: color-mix(in srgb, #22c55e 8%, var(--cl-bg)); border-color: color-mix(in srgb, #22c55e 20%, transparent); color: #22c55e; }
.cl-alert.warning { background: color-mix(in srgb, #f59e0b 8%, var(--cl-bg)); border-color: color-mix(in srgb, #f59e0b 20%, transparent); color: #b45309; }
.cl-alert.error { background: color-mix(in srgb, #ef4444 8%, var(--cl-bg)); border-color: color-mix(in srgb, #ef4444 20%, transparent); color: #ef4444; }
.cl-alert-icon { flex-shrink: 0; margin-top: 1px; }
.cl-alert-content { flex: 1; }
.cl-alert-title { font-weight: 600; margin-bottom: 0.2rem; }
.cl-alert-body { opacity: 0.85; color: var(--cl-text); }

/* ─── AVATAR ────────────────────────────────────────────────── */
.cl-avatar { position: relative; display: inline-flex; flex-shrink: 0; }
.cl-avatar-img { border-radius: 50%; object-fit: cover; background: var(--cl-surface); display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--cl-muted); overflow: hidden; }
.cl-avatar-img img { width: 100%; height: 100%; object-fit: cover; }
.cl-avatar.sm .cl-avatar-img { width: 32px; height: 32px; font-size: 0.7rem; }
.cl-avatar.md .cl-avatar-img { width: 44px; height: 44px; font-size: 0.85rem; }
.cl-avatar.lg .cl-avatar-img { width: 64px; height: 64px; font-size: 1.1rem; }
.cl-avatar.xl .cl-avatar-img { width: 96px; height: 96px; font-size: 1.5rem; }
.cl-avatar-status { position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--cl-bg); }
.cl-avatar-status.online { background: #22c55e; }
.cl-avatar-status.offline { background: var(--cl-muted); }
.cl-avatar-status.busy { background: #ef4444; }

/* ─── PROGRESS ──────────────────────────────────────────────── */
.cl-progress { width: 100%; }
.cl-progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.cl-progress-label { font-size: 0.82rem; font-weight: 500; }
.cl-progress-value { font-size: 0.78rem; color: var(--cl-muted); font-weight: 500; }
.cl-progress-bar { width: 100%; height: 8px; background: var(--cl-surface); border-radius: 9999px; overflow: hidden; }
.cl-progress-fill { height: 100%; background: var(--cl-accent); border-radius: 9999px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }
.cl-progress.sm .cl-progress-bar { height: 4px; }
.cl-progress.lg .cl-progress-bar { height: 12px; }
.cl-progress.striped .cl-progress-fill { background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent); background-size: 1rem 1rem; }
.cl-progress.animated .cl-progress-fill { animation: cl-progress-stripe 1s linear infinite; }
@keyframes cl-progress-stripe { from { background-position: 1rem 0; } to { background-position: 0 0; } }

/* ─── Animated gradient border ──────────────────────────────── */
.cl-gradient-border { position: relative; border-radius: var(--cl-radius); }
.cl-gradient-border::before { content: ''; position: absolute; inset: -1px; border-radius: inherit; background: conic-gradient(from 0deg, var(--cl-accent), color-mix(in srgb, var(--cl-accent) 60%, #fff), var(--cl-accent)); z-index: -1; animation: cl-gradient-spin 4s linear infinite; }
@keyframes cl-gradient-spin { to { transform: rotate(360deg); } }

/* ─── Reduced motion ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cl-reveal { transition: none; opacity: 1; transform: none; }
  .cl-marquee-track { animation: none; }
  .cl-terminal-cursor { animation: none; }
  .cl-progress.animated .cl-progress-fill { animation: none; }
  .cl-root { scroll-behavior: auto; }
}

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .cl-nav { padding: 0.75rem 1.25rem; }
  .cl-nav-links { display: none; }
  .cl-nav-cta.desktop-only { display: none; }
  .cl-nav-toggle { display: block; }

  .cl-hero { padding: 4rem 1.5rem 3.5rem; }
  .cl-hero.split-left, .cl-hero.split-right { grid-template-columns: 1fr; gap: 2.5rem; }
  .cl-hero.split-right .cl-hero-content { order: 0; }

  .cl-tabs-nav { gap: 0; }
  .cl-tabs-btn { padding: 0.6rem 0.9rem; font-size: 0.8rem; }
  .cl-marquee-fade { width: 40px; }
  .cl-hero.split-right .cl-hero-media { order: 0; }
  .cl-hero h1 { font-size: clamp(2rem, 8vw, 2.75rem); }

  .cl-section { padding: 3rem 1.25rem; }
  .cl-section.pad-xl { padding: 4rem 1.25rem; }

  .cl-grid.cols-2, .cl-grid.cols-3, .cl-grid.cols-4 { grid-template-columns: 1fr; }
  .cl-features-grid.cols-2, .cl-features-grid.cols-3, .cl-features-grid.cols-4 { grid-template-columns: 1fr; }
  .cl-features-alt .cl-feature-item { grid-template-columns: 1fr; }

  .cl-counter-value { font-size: clamp(2rem, 8vw, 2.75rem); }
  .cl-alert { flex-direction: column; gap: 0.5rem; }

  .cl-stats-row { flex-direction: column; }
  .cl-stats-row .cl-stat + .cl-stat { border-left: none; border-top: 1px solid var(--cl-border); }

  .cl-pricing-grid { grid-template-columns: 1fr; max-width: 400px; }

  .cl-footer-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .cl-footer-cols { flex-direction: column; gap: 2rem; }

  .cl-logo-grid-items { gap: 2rem; }

  .cl-cta { padding: 3.5rem 1.5rem; }
  .cl-cta-input { max-width: 100%; }
  .cl-input-field.lg { font-size: 0.875rem; padding: 0.7rem 0.875rem; }
}

@media (max-width: 480px) {
  .cl-hero { padding: 3rem 1rem 2.5rem; }
  .cl-hero-actions { flex-direction: column; width: 100%; }
  .cl-hero-actions .cl-btn { width: 100%; justify-content: center; }
  .cl-container { padding: 0 1rem; }
  .cl-cta-actions { flex-direction: column; width: 100%; }
  .cl-cta-actions .cl-btn { width: 100%; justify-content: center; }
  .cl-cta-input { flex-direction: column; }
  .cl-cta-input .cl-btn { border-radius: var(--cl-radius); }
}
    `;
        document.head.appendChild(style);
    }

    // ─── Animated counters ─────────────────────────────────────────────────────
    function initCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const numEl = el.querySelector('.cl-counter-num');
                    if (!numEl || el.dataset.counted) return;
                    el.dataset.counted = '1';
                    const target = parseFloat(el.dataset.target) || 0;
                    const duration = parseInt(el.dataset.duration) || 2000;
                    const isFloat = target % 1 !== 0;
                    const start = performance.now();
                    function step(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;
                        numEl.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
                        if (progress < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('.cl-counter').forEach(el => counterObserver.observe(el));
    }

    // ─── Scroll reveal ──────────────────────────────────────────────────────────
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cl-visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.cl-reveal').forEach(el => observer.observe(el));
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
        return r(block.props || {}, block);
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

    function glowHtml(glow) {
        if (!glow) return '';
        // glow: { color: hex, size: "300px"|"500px"|"800px", x: "left"|"center"|"right", y: "top"|"center"|"bottom" }
        const size = glow.size || '500px';
        const color = glow.color || 'var(--cl-accent)';
        const x = glow.x === 'left' ? '10%' : glow.x === 'right' ? '90%' : '50%';
        const y = glow.y === 'top' ? '10%' : glow.y === 'bottom' ? '90%' : '50%';
        const opacity = glow.opacity || '0.06';
        return `<div class="cl-glow" style="width:${size};height:${size};left:${x};top:${y};transform:translate(-50%,-50%);background:${color};opacity:${opacity};"></div>`;
    }

    const renderers = {

        NAV({ logo, links = [], cta, sticky, style }) {
            const cls = ['cl-nav', sticky ? 'sticky' : '', style || 'solid'].filter(Boolean).join(' ');
            let logoInner;
            if (typeof logo === 'object') {
                logoInner = `<img src="${logo.src}" alt="${logo.alt || ''}">`;
            } else {
                // Split logo text on last word to accent it
                const words = logo.split(' ');
                const lastWord = words.pop();
                const firstPart = words.join(' ');
                logoInner = firstPart ? `${firstPart}<span style="color:var(--cl-accent)">${lastWord}</span>` : `<span class="cl-logo-dot"></span>${logo}`;
            }
            const logoHtml = `<a href="/" class="cl-nav-logo">${logoInner}</a>`;
            const linksHtml = links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
            const ctaHtml = cta ? `<a href="${cta.href}" class="cl-nav-cta desktop-only">${cta.label}</a>` : '';
            const drawerHtml = createMobileDrawer(links, cta);
            const toggleHtml = `<button class="cl-nav-toggle" onclick="document.getElementById('cl-drawer-${drawerId + 1}').classList.add('open')" aria-label="Open menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>`;
            return `${drawerHtml}<nav class="${cls}"><div class="cl-nav-inner">${logoHtml}<div class="cl-nav-links">${linksHtml}</div>${ctaHtml}${toggleHtml}</div></nav>`;
        },

        HERO({ eyebrow, heading, subheading, cta_primary, cta_secondary, layout = 'centered', bg, bg_value, media, glow }) {
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
            const glowEl = glowHtml(glow);

            return `<div class="${cls}" style="${style}">
  ${glowEl}
  <div class="cl-hero-content">
    ${eyebrowHtml}
    <h1>${heading}</h1>
    ${subHtml}
    <div class="cl-hero-actions">${primaryHtml}${secondaryHtml}</div>
  </div>
  ${mediaHtml}
</div>`;
        },

        SECTION({ id, padding = 'lg', bg = 'default', pattern, children = [] }) {
            const cls = ['cl-section', `pad-${padding}`, `bg-${bg}`, pattern ? `pattern-${pattern}` : ''].filter(Boolean).join(' ');
            const idAttr = id ? `id="${id}"` : '';
            const style = bg && bg.startsWith('#') ? `style="background:${bg};"` : '';
            return `<section class="${cls}" ${idAttr} ${style}><div class="cl-container">${renderChildren(children)}</div></section>`;
        },

        GRID({ cols = 3, gap = 'md', children = [] }) {
            return `<div class="cl-grid cols-${cols} gap-${gap}">${renderChildren(children)}</div>`;
        },

        STACK({ gap = 'md', align = 'left', max_width, children = [] }) {
            const maxCls = max_width ? ` max-${max_width}` : '';
            return `<div class="cl-stack gap-${gap} align-${align}${maxCls}">${renderChildren(children)}</div>`;
        },

        CARD({ icon: ic, title, body, variant = 'outlined', href, image }) {
            const iconHtml = ic ? `<div class="cl-card-icon">${icon(ic, 18)}</div>` : '';
            const imgHtml = image ? `<img class="cl-card-img" src="${image.src}" alt="${image.alt || ''}" loading="lazy">` : '';
            const inner = `${imgHtml}${iconHtml}<div class="cl-card-title">${title}</div><div class="cl-card-body">${body}</div>`;
            if (href) return `<a href="${href}" class="cl-card ${variant}">${inner}</a>`;
            return `<div class="cl-card ${variant}">${inner}</div>`;
        },

        TEXT({ tag = 'p', content, align, size, weight, color, gradient, glow: textGlow }) {
            const cls = ['cl-text',
                align ? `align-${align}` : '',
                size ? `size-${size}` : '',
                weight ? `weight-${weight}` : '',
                color && !color.startsWith('#') ? `color-${color}` : '',
                gradient ? 'gradient' : '',
                textGlow ? 'glow' : ''
            ].filter(Boolean).join(' ');
            const styleParts = [];
            if (color && color.startsWith('#')) styleParts.push(`color:${color}`);
            const style = styleParts.length ? `style="${styleParts.join(';')}"` : '';
            return `<${tag} class="${cls}" ${style}>${content}</${tag}>`;
        },

        BUTTON({ label, href, icon: ic, icon_position = 'right', variant = 'primary', size = 'md', full_width }) {
            const iconHtml = ic ? icon(ic, 16) : '';
            const inner = icon_position === 'left'
                ? `${iconHtml}${label}`
                : `${label}${iconHtml}`;
            const widthStyle = full_width ? 'style="width:100%;justify-content:center"' : '';
            if (href) return `<a href="${href}" class="cl-btn ${variant} ${size}" ${widthStyle}>${inner}</a>`;
            return `<button class="cl-btn ${variant} ${size}" ${widthStyle} type="${href ? 'button' : 'submit'}">${inner}</button>`;
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
  <div class="cl-feature-item cl-reveal">
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
            const statsHtml = items.map(s => `<div class="cl-stat cl-reveal"><div class="cl-stat-value">${s.value}</div><div class="cl-stat-label">${s.label}</div></div>`).join('');
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

        TERMINAL({ title, prompt, output, glow: termGlow }) {
            const cls = ['cl-terminal', termGlow ? 'glow' : ''].filter(Boolean).join(' ');
            const titleHtml = title || 'terminal';
            const promptHtml = prompt ? `<span class="cl-terminal-prompt">${prompt}</span>` : '';
            const outputHtml = output || '';
            return `<div class="${cls}">
  <div class="cl-terminal-bar">
    <div class="cl-terminal-dot red"></div>
    <div class="cl-terminal-dot yellow"></div>
    <div class="cl-terminal-dot green"></div>
    <span class="cl-terminal-title">${titleHtml}</span>
  </div>
  <div class="cl-terminal-body">${promptHtml}${outputHtml}<span class="cl-terminal-cursor"></span></div>
</div>`;
        },

        CTA({ heading, subheading, cta_primary, cta_secondary, bg = 'surface', input_placeholder, input_button_label, glow }) {
            const cls = `cl-cta bg-${bg}`;
            const styleParts = [];
            if (bg && bg.startsWith('#')) styleParts.push(`background:${bg};`);
            const style = styleParts.length ? `style="${styleParts.join('')}"` : '';
            const subHtml = subheading ? `<p>${subheading}</p>` : '';
            const primaryHtml = cta_primary ? `<a href="${cta_primary.href}" class="cl-btn primary lg">${cta_primary.label}</a>` : '';
            const secondaryHtml = cta_secondary ? `<a href="${cta_secondary.href}" class="cl-btn outline lg">${cta_secondary.label}</a>` : '';
            const inputHtml = (input_placeholder && input_button_label)
                ? `<div class="cl-cta-input"><input type="email" placeholder="${input_placeholder}"><a href="#" class="cl-btn primary">${input_button_label}</a></div>`
                : '';
            const glowEl = glowHtml(glow);

            const actionsHtml = inputHtml
                ? inputHtml
                : `<div class="cl-cta-actions">${primaryHtml}${secondaryHtml}</div>`;

            return `<div class="${cls}" ${style}>${glowEl}<h2>${heading}</h2>${subHtml}${actionsHtml}</div>`;
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

        INPUT({ label, name, type = 'text', placeholder, required, hint, error, size, variant, autocomplete, disabled, rows }) {
            const isTextarea = type === 'textarea';
            const sizeCls = size ? ` ${size}` : '';
            const variantCls = variant === 'filled' ? ' cl-input-filled' : '';
            const labelHtml = label ? `<label class="cl-input-label" for="cl-${name}">${label}${required ? '<span class="cl-input-required">*</span>' : ''}</label>` : '';
            const hintHtml = hint ? `<span class="cl-input-hint">${hint}</span>` : '';
            const errorHtml = error ? `<span class="cl-input-error-text">${error}</span>` : '';
            const errorCls = error ? ' error' : '';
            const requiredAttr = required ? 'required' : '';
            const disabledAttr = disabled ? 'disabled' : '';
            const autocompleteAttr = autocomplete ? `autocomplete="${autocomplete}"` : '';
            const idAttr = name ? `id="cl-${name}"` : '';
            const nameAttr = name ? `name="${name}"` : '';

            let fieldHtml;
            if (isTextarea) {
                const rowsAttr = rows ? `rows="${rows}"` : 'rows="4"';
                fieldHtml = `<textarea class="cl-input-field textarea${sizeCls}${errorCls}" ${idAttr} ${nameAttr} placeholder="${placeholder || ''}" ${requiredAttr} ${disabledAttr} ${rowsAttr}></textarea>`;
            } else {
                fieldHtml = `<input class="cl-input-field${sizeCls}${errorCls}" type="${type}" ${idAttr} ${nameAttr} placeholder="${placeholder || ''}" ${requiredAttr} ${disabledAttr} ${autocompleteAttr}>`;
            }

            return `<div class="cl-input${variantCls}">${labelHtml}${fieldHtml}${errorHtml || hintHtml}</div>`;
        },

        FORM({ action, method = 'POST', gap = 'md', children = [] }) {
            const childrenHtml = renderChildren(children);
            const actionAttr = action ? `action="${action}"` : '';
            return `<form class="cl-form cl-form-gap-${gap}" ${actionAttr} method="${method}">${childrenHtml}</form>`;
        },

        CHECKBOX({ label, name, required, checked, disabled }) {
            const requiredAttr = required ? 'required' : '';
            const checkedAttr = checked ? 'checked' : '';
            const disabledAttr = disabled ? 'disabled' : '';
            const nameAttr = name ? `name="${name}"` : '';
            return `<label class="cl-checkbox"><input type="checkbox" ${nameAttr} ${requiredAttr} ${checkedAttr} ${disabledAttr}><span class="cl-checkbox-label">${label}</span></label>`;
        },

        DIVIDER({ style = 'line', size = 'md' }) {
            if (style === 'space') return `<div class="cl-divider-space ${size}"></div>`;
            return `<hr class="cl-divider-line">`;
        },

        ACCORDION({ items = [] }) {
            const itemsHtml = items.map(item => `<details class="cl-accordion-item"><summary>${item.title}</summary><div class="cl-accordion-body">${renderChildren(item.children || [])}</div></details>`).join('');
            return `<div class="cl-accordion">${itemsHtml}</div>`;
        },

        TABS({ tabs = [] }) {
            const uid = 'cl-tabs-' + Math.random().toString(36).substr(2, 6);
            const navHtml = tabs.map((t, i) => `<button class="cl-tabs-btn${i === 0 ? ' active' : ''}" data-tab="${uid}-${i}" onclick="document.querySelectorAll('[data-tabs=\\'${uid}\\'] .cl-tabs-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.querySelectorAll('[data-tabs=\\'${uid}\\'] .cl-tabs-panel').forEach(p=>p.classList.remove('active'));document.getElementById('${uid}-${i}').classList.add('active')">${t.label}</button>`).join('');
            const panelsHtml = tabs.map((t, i) => `<div class="cl-tabs-panel${i === 0 ? ' active' : ''}" id="${uid}-${i}">${renderChildren(t.children || [])}</div>`).join('');
            return `<div class="cl-tabs" data-tabs="${uid}"><div class="cl-tabs-nav">${navHtml}</div>${panelsHtml}</div>`;
        },

        MARQUEE({ items = [], speed = 'normal' }) {
            const itemsHtml = items.map(item => `<div class="cl-marquee-item">${item.icon ? icon(item.icon, 16) : ''}${item.text}</div>`).join('');
            const doubled = itemsHtml + itemsHtml;
            return `<div class="cl-marquee speed-${speed}"><div class="cl-marquee-fade left"></div><div class="cl-marquee-track">${doubled}</div><div class="cl-marquee-fade right"></div></div>`;
        },

        BANNER({ text, variant = 'accent', href, dismissible }) {
            const linkHtml = href ? `<a href="${href}">Learn more →</a>` : '';
            const closeHtml = dismissible ? `<button class="cl-banner-close" onclick="this.parentElement.remove()" aria-label="Dismiss">✕</button>` : '';
            return `<div class="cl-banner ${variant}">${text} ${linkHtml}${closeHtml}</div>`;
        },

        CODE({ language = '', code = '', title }) {
            const headerHtml = `<div class="cl-code-header"><span class="cl-code-lang">${language || title || 'code'}</span><button class="cl-code-copy" onclick="navigator.clipboard.writeText(this.closest('.cl-code').querySelector('.cl-code-body').textContent);this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)">Copy</button></div>`;
            const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<div class="cl-code">${headerHtml}<pre class="cl-code-body">${escaped}</pre></div>`;
        },

        VIDEO({ src, type = 'self', autoplay, muted: m = true, loop, poster, radius = 'md' }) {
            const cls = `cl-video radius-${radius}`;
            if (type === 'youtube') {
                const vid = src.match(/(?:youtu\.be\/|v=)([^&?]+)/)?.[1] || src;
                return `<div class="${cls}"><iframe src="https://www.youtube.com/embed/${vid}${autoplay ? '?autoplay=1&mute=1' : ''}" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe></div>`;
            }
            if (type === 'vimeo') {
                const vid = src.match(/vimeo\.com\/(\d+)/)?.[1] || src;
                return `<div class="${cls}"><iframe src="https://player.vimeo.com/video/${vid}${autoplay ? '?autoplay=1&muted=1' : ''}" allow="autoplay" allowfullscreen loading="lazy"></iframe></div>`;
            }
            const posterAttr = poster ? `poster="${poster}"` : '';
            return `<div class="${cls}"><video src="${src}" ${autoplay ? 'autoplay' : ''} ${m ? 'muted' : ''} ${loop ? 'loop' : ''} playsinline ${posterAttr} controls></video></div>`;
        },

        COUNTER({ value = 0, suffix = '', prefix = '', label, duration = 2000 }) {
            const uid = 'cl-counter-' + Math.random().toString(36).substr(2, 6);
            return `<div class="cl-counter cl-reveal" id="${uid}" data-target="${value}" data-duration="${duration}"><div class="cl-counter-value">${prefix}<span class="cl-counter-num">0</span><span class="cl-counter-suffix">${suffix}</span></div>${label ? `<div class="cl-counter-label">${label}</div>` : ''}</div>`;
        },

        TOGGLE({ label, name, checked, disabled, description }) {
            const checkedAttr = checked ? 'checked' : '';
            const disabledAttr = disabled ? 'disabled' : '';
            const nameAttr = name ? `name="${name}"` : '';
            const descHtml = description ? `<div class="cl-toggle-desc">${description}</div>` : '';
            return `<label class="cl-toggle"><input type="checkbox" ${nameAttr} ${checkedAttr} ${disabledAttr}><div><div class="cl-toggle-label">${label}</div>${descHtml}</div></label>`;
        },

        SELECT({ label, name, options = [], required, placeholder, disabled }) {
            const labelHtml = label ? `<label class="cl-select-label" for="cl-${name}">${label}${required ? '<span style="color:var(--cl-accent);margin-left:2px">*</span>' : ''}</label>` : '';
            const placeholderHtml = placeholder ? `<option value="" disabled selected>${placeholder}</option>` : '';
            const optionsHtml = options.map(o => typeof o === 'string' ? `<option value="${o}">${o}</option>` : `<option value="${o.value}">${o.label}</option>`).join('');
            const requiredAttr = required ? 'required' : '';
            const disabledAttr = disabled ? 'disabled' : '';
            return `<div class="cl-select">${labelHtml}<select class="cl-select-field" id="cl-${name}" name="${name}" ${requiredAttr} ${disabledAttr}>${placeholderHtml}${optionsHtml}</select></div>`;
        },

        ALERT({ variant = 'info', title, body, icon: ic }) {
            const iconMap = { info: 'info', success: 'check-circle', warning: 'alert-triangle', error: 'alert-circle' };
            const iconName = ic || iconMap[variant] || 'info';
            const titleHtml = title ? `<div class="cl-alert-title">${title}</div>` : '';
            const bodyHtml = body ? `<div class="cl-alert-body">${body}</div>` : '';
            return `<div class="cl-alert ${variant}"><div class="cl-alert-icon">${icon(iconName, 18)}</div><div class="cl-alert-content">${titleHtml}${bodyHtml}</div></div>`;
        },

        AVATAR({ src, alt = '', name, size = 'md', status }) {
            const inner = src ? `<img src="${src}" alt="${alt || name || ''}" loading="lazy">` : `<span>${(name || '?')[0].toUpperCase()}</span>`;
            const statusHtml = status ? `<div class="cl-avatar-status ${status}"></div>` : '';
            return `<div class="cl-avatar ${size}"><div class="cl-avatar-img">${inner}</div>${statusHtml}</div>`;
        },

        PROGRESS({ label, value = 0, max = 100, size = 'md', variant, show_value = true, animated, striped }) {
            const pct = Math.min(100, Math.max(0, (value / max) * 100));
            const cls = ['cl-progress', size !== 'md' ? size : '', striped ? 'striped' : '', animated ? 'animated' : ''].filter(Boolean).join(' ');
            const headerHtml = (label || show_value) ? `<div class="cl-progress-header">${label ? `<span class="cl-progress-label">${label}</span>` : '<span></span>'}${show_value ? `<span class="cl-progress-value">${Math.round(pct)}%</span>` : ''}</div>` : '';
            return `<div class="${cls}">${headerHtml}<div class="cl-progress-bar"><div class="cl-progress-fill" style="width:${pct}%"></div></div></div>`;
        },
    };

    // ─── Main render function ─────────────────────────────────────────────────────

    function render(json, target) {
        if (typeof json === 'string') {
            try { json = JSON.parse(json); } catch (e) { console.error('[CoreLang] Invalid JSON', e); return; }
        }

        // Backward compatibility: v0.1 and v0.2
        if (!json.version || json.version === '0.1' || json.version === '0.2') {
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

        // Init scroll reveal and counters
        initScrollReveal();
        initCounters();
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
                console.error('engine: failed to parse inline script please go fuck youreself and fix it', e);
            }
        });
    }

    // ─── Exports ──────────────────────────────────────────────────────────────────

    const CoreLang = { render, version: '0.5.0' };

    // Browser global
    global.CoreLang = CoreLang;

    // Auto-run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoRender);
    } else {
        autoRender();
    }

})(typeof window !== 'undefined' ? window : globalThis);
