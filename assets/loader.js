/* 2FA Auth page loader — custom brand animation (neon ring + pulsing lock + progress bar)
   Shows:  • on every page RELOAD (min. 0.9s so the animation is visible)
           • when a page is still loading after 350ms
           • when a visitor clicks an internal link (opening another page)
   Never stays longer than 4s.   API: pageLoader.show() / pageLoader.hide() */
(function () {
  var d = document, h = d.documentElement;
  var css =
    '#pageLoader{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;' +
    'background:radial-gradient(circle at 50% 42%,#151826,#0A0C13 70%);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s;font-family:Manrope,system-ui,sans-serif}' +
    '#pageLoader.on{opacity:1;visibility:visible}' +
    '.pl-mark{position:relative;width:104px;height:104px;display:flex;align-items:center;justify-content:center}' +
    '.pl-ring,.pl-ring2{position:absolute;inset:0;border-radius:50%;border:3px solid transparent}' +
    '.pl-ring{border-top-color:#39FFA0;border-right-color:#3D8BFF;box-shadow:0 0 24px rgba(57,255,160,.4);animation:plspin 1.1s linear infinite}' +
    '.pl-ring2{inset:9px;border-bottom-color:#29D8EA;border-left-color:#7C5CFC;opacity:.75;animation:plspin 1.7s linear infinite reverse}' +
    '.pl-logo{width:54px;height:54px;border-radius:16px;background:linear-gradient(135deg,#29D8EA,#7C5CFC);display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 0 28px rgba(41,216,234,.45);animation:plpulse 1.4s ease-in-out infinite}' +
    '.pl-logo svg{width:28px;height:28px;color:#fff}' +
    '.pl-name{font-weight:700;font-size:17px;letter-spacing:.4px;color:#E7E9F1}' +
    '.pl-bar{position:relative;width:132px;height:3px;border-radius:3px;background:rgba(255,255,255,.09);overflow:hidden}' +
    '.pl-bar::after{content:"";position:absolute;top:0;bottom:0;width:45%;border-radius:3px;background:linear-gradient(90deg,transparent,#39FFA0,#3D8BFF,transparent);animation:plbar 1.1s ease-in-out infinite}' +
    '@keyframes plspin{to{transform:rotate(360deg)}}' +
    '@keyframes plpulse{0%,100%{transform:scale(1);filter:brightness(1)}50%{transform:scale(1.1);filter:brightness(1.2)}}' +
    '@keyframes plbar{0%{left:-45%}100%{left:100%}}' +
    '@media(prefers-reduced-motion:reduce){.pl-ring,.pl-ring2,.pl-logo,.pl-bar::after{animation-duration:3s}}';
  var st = d.createElement('style'); st.textContent = css; (d.head || h).appendChild(st);

  var el = d.createElement('div');
  el.id = 'pageLoader'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="pl-mark"><div class="pl-ring"></div><div class="pl-ring2"></div>' +
    '<div class="pl-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 2a4 4 0 0 0-4 4v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4z"/><line x1="12" y1="14" x2="12" y2="17"/></svg></div></div>' +
    '<div class="pl-name">2FA Auth</div><div class="pl-bar"></div>';

  var wait, failsafe, minUntil = 0;
  function show(min) {
    if (!el.parentNode) h.appendChild(el);
    void el.offsetWidth; el.classList.add('on');
    minUntil = Date.now() + (min || 300);
    clearTimeout(failsafe); failsafe = setTimeout(hide, 4000);
  }
  function hide() { clearTimeout(wait); clearTimeout(failsafe); el.classList.remove('on'); }
  function done() {
    clearTimeout(wait);
    var left = minUntil - Date.now();
    if (!el.classList.contains('on')) return;
    left > 0 ? setTimeout(hide, left) : hide();
  }

  var reload = false;
  try { var n = performance.getEntriesByType('navigation')[0]; reload = !!n && n.type === 'reload'; } catch (e) {}
  if (!reload && window.performance && performance.navigation && performance.navigation.type === 1) reload = true;

  if (reload) show(900); else wait = setTimeout(function () { show(300); }, 350);
  d.addEventListener('DOMContentLoaded', done);
  addEventListener('load', done);
  addEventListener('pageshow', function (e) { if (e.persisted) { minUntil = 0; hide(); } });

  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button || a.target === '_blank' || a.hasAttribute('download')) return;
    var u; try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname && u.search === location.search) return;   // same page / anchor
    setTimeout(function () { show(0); }, 120);
  });
  window.pageLoader = { show: function () { show(0); }, hide: hide };
})();
