// Instant tooltips for any element with data-tip: shown on hover, keyboard
// focus, and on tap/click (so touch screens get them too). One shared bubble,
// clamped to the viewport.

let bubble = null, owner = null, timer = null;

function show(el) {
  hide();
  const text = el.dataset.tip;
  if (!text) return;
  bubble = document.createElement('div');
  bubble.className = 'tip-bubble';
  bubble.setAttribute('role', 'tooltip');
  bubble.textContent = text;
  document.body.append(bubble);
  owner = el;
  const r = el.getBoundingClientRect(), b = bubble.getBoundingClientRect();
  const left = Math.max(8, Math.min(innerWidth - b.width - 8, r.left + r.width / 2 - b.width / 2));
  const below = r.bottom + 8 + b.height < innerHeight || r.top - 8 - b.height < 0;
  bubble.style.left = `${left}px`;
  bubble.style.top = `${below ? r.bottom + 8 : r.top - 8 - b.height}px`;
}

function hide() {
  clearTimeout(timer);
  bubble?.remove();
  bubble = owner = null;
}

export function initTooltips() {
  const target = e => e.target.closest?.('[data-tip]');
  document.addEventListener('mouseover', e => { const el = target(e); if (el && el !== owner) show(el); });
  document.addEventListener('mouseout', e => { const el = target(e); if (el && el === owner && !el.contains(e.relatedTarget)) hide(); });
  document.addEventListener('focusin', e => { const el = target(e); if (el) show(el); });
  document.addEventListener('focusout', hide);
  document.addEventListener('click', e => {
    const el = target(e);
    if (!el) return hide();
    // On touch there is no hover: a tap shows the tip for a few seconds.
    if (el !== owner) show(el);
    clearTimeout(timer);
    timer = setTimeout(hide, 2600);
  });
  addEventListener('hashchange', hide);
  addEventListener('scroll', hide, { passive: true });
}
