const receiptAttachments = '<div class="receipt-thumbnails"><img src="receipt-whsmith.jpeg" alt="WHSmith receipt"><img src="receipt-grand.png" alt="Grand Hôtel Stockholm receipt"><img src="receipt-brisa.png" alt="La Brisa Tapas Bar receipt"></div>';
const receiptPrompt = 'Hi Claude, attached are pictures of my receipts from my last work trip. Can you create an excel of it? Most of these are in Swedish.';
const receiptResponse = `<div class="receipt-answer"><p>Done. I read all three receipts and built the expense report with a formula-driven total (recalculates automatically if you tweak anything).</p><p>A couple of things worth flagging before you submit:</p><ul><li><strong>Grand Hôtel Stockholm</strong> and <strong>La Brisa Tapas Bar</strong>: Totals include tips, matching the amount charged to your card.</li><li><strong>WHSmith at Arlanda</strong>: Includes ibuprofen, gum, and a Coke. Check your company’s policy before claiming these items.</li></ul><p>Let me know if you want it converted to USD or split by expense category instead.</p><div class="receipt-file"><span class="receipt-file-icon"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/></svg></span><span class="receipt-file-name">Sweden trip expense report<small>Spreadsheet · XLSX</small></span><button type="button" onclick="showToast('This file card is part of the recorded demo.')">Download <span>⌄</span></button></div></div>`;
const previousReceiptDemo = startCapabilityDemo;
startCapabilityDemo = function() {
 if(current !== 'write') return previousReceiptDemo();
 runPersistentDemo([{request:receiptPrompt,preservePrompt:true,file:true,preAttached:true,statuses:['Reading receipts','Generating a file...'],reply:'',output:()=>receiptResponse}]);
};
examples.write.cta = 'Create a file of your own';
examples.write.starter = 'Hi Claude, help me turn something into a file.';
function revealReceiptAnswer(markup) {
 const transcript = document.querySelector('#buildNarration');
 const source = document.createElement('div');source.innerHTML = markup;
 const answer = document.createElement('div');answer.className = 'receipt-answer';transcript.append(answer);
 const blocks = [...source.firstElementChild.children];let index = 0;
 function next() {
  if(!answer.isConnected) return;
  if(index === blocks.length) {
   const footer = document.createElement('div');footer.className = 'demo-response-footer';footer.innerHTML = '<div class="response-end-mark">'+claudeMark+'</div>';transcript.append(footer);
   const input = document.querySelector('#demoDraft');input.placeholder = 'Reply to Claude…';document.querySelector('#demoDraftSend').onclick = null;
   return;
  }
  answer.append(blocks[index++].cloneNode(true));
  cancelAnimationFrame(demoPanFrame);
  const viewport = document.querySelector('.drawer-body');viewport.scrollTo({top:viewport.scrollHeight,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'instant'});
  demoTimers.push(setTimeout(next,matchMedia('(prefers-reduced-motion: reduce)').matches?0:850));
 }
 next();
}
const receiptStyle = document.createElement('style');
receiptStyle.textContent = `.receipt-thumbnails{display:flex;gap:7px;padding:2px 0 9px}.receipt-thumbnails img{display:block;width:43px;height:54px;object-fit:cover;border-radius:6px;border:1px solid #ffffff26}.receipt-answer{font:13px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#e9e7e1}.receipt-answer p{margin:0 0 16px}.receipt-answer ul{padding-left:20px;margin:0 0 16px}.receipt-answer li{margin-bottom:12px}.receipt-file{display:flex;align-items:center;gap:12px;border:1px solid #4b5348;border-radius:12px;background:linear-gradient(110deg,#252c22,#222820);padding:14px 14px 0;min-height:77px;overflow:hidden}.receipt-file-icon{width:48px;height:58px;flex:none;border:1px solid #32652b;border-radius:8px 8px 0 0;background:linear-gradient(#203719,#11250b);color:#69c64e;display:grid;place-items:center}.receipt-file-name{flex:1;min-width:0;font-size:13px;line-height:1.3;padding-bottom:13px}.receipt-file-name small{display:block;color:#989e90;font-size:11px;margin-top:4px}.receipt-file button{align-self:center;margin-bottom:14px;border-radius:7px;background:#3d443b;padding:7px 9px;font-size:11px;white-space:nowrap}.receipt-file button span{padding-left:6px;color:#acb3a6}`;
document.head.append(receiptStyle);
receiptStyle.textContent += `.receipt-file{padding:10px 12px;min-height:60px;gap:10px}.receipt-file-icon{width:34px;height:40px;border-radius:6px}.receipt-file-icon svg{width:16px;height:16px}.receipt-file-name{padding-bottom:0;font-size:12px}.receipt-file-name small{font-size:10px}.receipt-file button{margin-bottom:0;font-size:10px;padding:6px 8px}`;
