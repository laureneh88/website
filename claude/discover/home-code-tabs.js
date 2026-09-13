(() => {
 const connector = document.querySelector('#connector-first-result');
 const sidebar = document.querySelector(connector ? '.pc-side' : '.sidebar');
 const tabs = document.createElement('div');
 tabs.className = 'app-home-code-tabs';
 tabs.setAttribute('aria-label','App mode');
 tabs.innerHTML = `<button type="button" class="selected" aria-pressed="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m4 10 8-7 8 7v10H4Z"/><path d="M9 20v-7h6v7"/></svg>Home</button><button type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/></svg>Code</button>`;
 sidebar.querySelector(connector ? '.pc-tools' : '.desktop-toolbar').after(tabs);
 tabs.children[0].onclick = () => sidebar.querySelector(connector ? '.pc-new' : '#newChat').click();
 tabs.children[1].onclick = () => {
  if(typeof showToast === 'function'){showToast('Code is outside this prototype.');return}
  let note=document.querySelector('.app-mode-notice');
  if(!note){note=document.createElement('div');note.className='app-mode-notice';note.setAttribute('role','status');document.body.append(note)}
  note.textContent='Code is outside this prototype.';note.hidden=false;
  setTimeout(()=>note.hidden=true,2500);
 };
 const style=document.createElement('style');
 style.textContent=`.app-home-code-tabs{display:flex;gap:2px;background:#20201f;border-radius:6px;padding:2px;box-sizing:border-box}.app-home-code-tabs button,#connector-first-result .app-home-code-tabs button{display:flex;align-items:center;justify-content:center;gap:7px;flex:1;padding:5px 7px;border:0;background:none;color:#92928b;font:12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border-radius:4px;cursor:pointer}.app-home-code-tabs button.selected,#connector-first-result .app-home-code-tabs button.selected{background:#353533;color:#e7e6df;box-shadow:inset 0 0 0 1px #ffffff05}.app-home-code-tabs svg{width:13px;height:13px}.sidebar>.app-home-code-tabs{position:absolute;top:49px;left:8px;right:8px}#connector-first-result .pc-tools{margin-bottom:10px}#connector-first-result .app-home-code-tabs{margin-bottom:12px}.app-mode-notice{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:10px 18px;background:#292927;border:1px solid #45453e;border-radius:8px;color:#e7e6df;font:13px system-ui;z-index:50}`;
 document.head.append(style);
})();
