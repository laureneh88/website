(() => {
 const panel = document.getElementById('discoverDrawer');
 const handle = document.createElement('div');
 handle.className = 'discover-resize-handle';
 handle.tabIndex = 0;
 handle.setAttribute('role', 'separator');
 handle.setAttribute('aria-orientation', 'vertical');
 handle.setAttribute('aria-label', 'Resize Discover panel');
 handle.title = 'Drag to resize · Double-click to reset';
 panel.append(handle);
 const style = document.createElement('style');
 style.textContent = `@media(min-width:761px){body.discover-open{grid-template-columns:clamp(180px,16.3vw,300px) minmax(0,1fr) var(--discover-width,430px)}}.discover-resize-handle{position:absolute;left:0;top:0;bottom:0;width:9px;z-index:30;cursor:col-resize;touch-action:none}.discover-resize-handle:after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:transparent;transition:background .15s}.discover-resize-handle:hover:after,.discover-resize-handle:focus-visible:after,body.resizing-discover .discover-resize-handle:after{background:#DE7356}body.resizing-discover{cursor:col-resize;user-select:none}body.resizing-discover iframe{pointer-events:none}@media(max-width:760px){.discover-resize-handle{display:none}}`;
 document.head.append(style);
 let preferred = 430;
 const maxWidth = () => Math.max(330, Math.min(950, (document.querySelector('#discover-app-window')?.clientWidth || innerWidth) - document.querySelector('.sidebar').getBoundingClientRect().width - 280));
 function setWidth(width) {
  const value = Math.round(Math.max(330, Math.min(maxWidth(), width)));
  document.body.style.setProperty('--discover-width', value + 'px');
  handle.setAttribute('aria-valuemin', '330');
  handle.setAttribute('aria-valuemax', String(Math.round(maxWidth())));
  handle.setAttribute('aria-valuenow', String(value));
 }
 handle.addEventListener('pointerdown', event => {
  if(event.button !== 0) return;
  event.preventDefault();
  handle.setPointerCapture(event.pointerId);
  document.body.classList.add('resizing-discover');
 });
 handle.addEventListener('pointermove', event => {
  if(!handle.hasPointerCapture(event.pointerId)) return;
  preferred = (document.querySelector('#discover-app-window')?.getBoundingClientRect().right || innerWidth) - event.clientX;
  setWidth(preferred);
 });
 const finish = () => document.body.classList.remove('resizing-discover');
 handle.addEventListener('pointerup', finish);
 handle.addEventListener('pointercancel', finish);
 handle.addEventListener('lostpointercapture', finish);
 handle.addEventListener('dblclick', () => {preferred = 430;setWidth(preferred)});
 handle.addEventListener('keydown', event => {
  if(!['ArrowLeft','ArrowRight','Home'].includes(event.key)) return;
  event.preventDefault();
  preferred = event.key === 'Home' ? 430 : panel.getBoundingClientRect().width + (event.key === 'ArrowLeft' ? 30 : -30);
  setWidth(preferred);
 });
 window.addEventListener('resize', () => setWidth(preferred));
 setWidth(preferred);
})();
