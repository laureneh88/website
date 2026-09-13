// Reviewer annotations remain outside the product's interaction logic.
const experimentHighlightStyle=document.createElement('style');
experimentHighlightStyle.textContent=`
@property --experiment-outline-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
#discoverDrawer,.experiment-chat-highlight{position:relative}
#discoverDrawer::after,.experiment-chat-highlight::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;z-index:20;background:conic-gradient(from var(--experiment-outline-angle),#de735680 0deg,#de735680 220deg,#e88e6a 267deg,#ffc3a2 292deg,#e88e6a 317deg,#de735680 350deg);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:experiment-outline-drift 4s linear infinite}
@keyframes experiment-outline-drift{to{--experiment-outline-angle:360deg}}
@media(prefers-reduced-motion:reduce){#discoverDrawer::after,.experiment-chat-highlight::after{animation:none}}
.experiment-legend{display:flex;align-items:center;gap:9px;margin:10px 0 0;color:#d0cbc3;font:12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.experiment-legend-mark{width:15px;height:12px;border:1px solid #de7356;border-radius:3px;flex-shrink:0}
`;
document.head.append(experimentHighlightStyle);
const experimentLegend=document.createElement('div');experimentLegend.className='experiment-legend';experimentLegend.innerHTML='<span class="experiment-legend-mark" aria-hidden="true"></span><span>Orange outlines highlight proposed additions to Claude’s existing experience.</span>';
document.querySelector('.prototype-reviewer-note').append(experimentLegend);
const experimentComposer=document.querySelector('#composer').closest('.composer');
document.querySelector('#tryBtn').addEventListener('click',()=>experimentComposer.classList.add('experiment-chat-highlight'));
document.querySelector('#newChat').addEventListener('click',()=>experimentComposer.classList.remove('experiment-chat-highlight'));
