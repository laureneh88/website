(() => {
 const style = document.createElement('style');
 style.textContent = `body textarea,body #demoDraft{box-sizing:border-box;resize:none;max-height:none;overflow-y:hidden}body .demo-fixed-composer,body .composer{height:auto;flex-shrink:0}body .demo-input-dock{flex-shrink:0}`;
 document.head.append(style);
 const nativeValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
 const registered = new WeakSet();
 const widths = new WeakMap();
 const observer = new ResizeObserver(entries => {
  for(const entry of entries) {
   const width = entry.contentRect.width;
   if(widths.get(entry.target) === width) continue;
   widths.set(entry.target, width);
   fit(entry.target);
  }
 });
 function fit(input) {
  if(!input.isConnected || input.clientWidth === 0) return;
  const minimum = input.id === 'demoDraft' ? 48 : 56;
  const maximum = Math.max(150, Math.floor(innerHeight * .4));
  input.style.height = '0px';
  const needed = Math.max(minimum, input.scrollHeight);
  input.style.height = Math.min(needed, maximum) + 'px';
  input.style.overflowY = needed > maximum ? 'auto' : 'hidden';
  if(needed > maximum) input.scrollTop = input.scrollHeight;
 }
 function register(input) {
  if(registered.has(input)) return;
  registered.add(input);
  // Scripted typing updates .value without dispatching an input event.
  Object.defineProperty(input, 'value', {
   configurable:true,
   get(){return nativeValue.get.call(this)},
   set(value){nativeValue.set.call(this,value);fit(this)}
  });
  input.addEventListener('input', () => fit(input));
  observer.observe(input);
  fit(input);
 }
 const scan = () => document.querySelectorAll('textarea').forEach(register);
 new MutationObserver(scan).observe(document.body, {childList:true,subtree:true});
 window.addEventListener('resize', () => document.querySelectorAll('textarea').forEach(fit));
 scan();
})();
