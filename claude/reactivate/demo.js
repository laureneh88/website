const $=s=>s==='#days'?document.querySelector('#introShell').contentDocument.querySelector(s):document.querySelector(s),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let generation=0,mode='intro',reversing=false,reversalTime=0,paused=false;
const timers=new Set();function later(fn,ms){const id=setTimeout(()=>{timers.delete(id);fn()},ms);timers.add(id)}
function clearTimers(){timers.forEach(clearTimeout);timers.clear();generation++}
function email(){clearTimers();mode='email';$('#app').hidden=true;$('#envelope').hidden=true;$('#email').hidden=false;$('#artifactApp').hidden=true;$('#skip').hidden=true;window.scrollTo({top:0,behavior:'smooth'})}
function start(){clearTimers();mode='intro';$('#app').hidden=false;$('#app').classList.remove('depart');$('#app').querySelector('.pixel-dissolve')?.remove();$('#email').hidden=true;$('#artifactApp').hidden=true;$('#envelope').hidden=true;$('#skip').hidden=false;$('#days').textContent='1 day';reversing=false;paused=false;let day=1;
 function tick(){if(day<7){$('#days').textContent=`${++day} days`;later(tick,Math.max(80,440-day*55))}else later(()=>{if(reduced){email();return}pixelateApp();$('#app').classList.add('depart');later(()=>{$('#app').hidden=true;$('#envelope').hidden=false;later(email,2050)},1350)},850)}
 later(tick,650);
}
function openArtifact(){clearTimers();mode='artifact';$('#email').hidden=true;$('#artifactApp').hidden=false;reversing=false;paused=false;$('#pause').textContent='Pause';$('#version').textContent='Original';$('#messages').innerHTML='<p class="assistant">Here’s your gravity playground. Adjust the gravity or add a ball to try it out.</p>';$('#editPrompt').value='Make gravity reverse every five seconds';$('#sendEdit').disabled=false;$('#editPrompt').disabled=false;$('#sendEdit').textContent='Send ↑';$('#gravity').value='9.8';$('#gravityValue').textContent='9.8';$('#gravityStatus').textContent='↓ Gravity pulls downward';worlds[1].reset();window.scrollTo({top:0,behavior:'smooth'});$('#editPrompt').focus({preventScroll:true})}
$('#restart').onclick=start;$('#skip').onclick=email;$('#makeYours').onclick=openArtifact;$('#backEmail').onclick=email;
$('#sendEdit').onclick=()=>{const prompt=$('#editPrompt').value.trim();if(!prompt)return;const run=generation;const user=document.createElement('p');user.className='user';user.textContent=prompt;$('#messages').append(user);$('#editPrompt').value='';$('#sendEdit').disabled=true;$('#editPrompt').disabled=true;const thinking=document.createElement('p');thinking.className='thinking';thinking.innerHTML='<span>✳</span> Thinking…';$('#messages').append(thinking);thinking.scrollIntoView({block:'nearest',behavior:'smooth'});
 const supported=/gravity/i.test(prompt)&&/revers|flip/i.test(prompt);
 later(()=>{thinking.innerHTML='<span>✳</span> '+(supported?'Updating…':'Thinking…')},700);
 later(()=>{thinking.remove();const reply=document.createElement('p');reply.className='assistant';$('#messages').append(reply);const text=supported?'Done — gravity now reverses every five seconds. Watch the balls fall, then float back up.':'Try the suggested change: “Make gravity reverse every five seconds.”';let n=0;
 function stream(){if(run!==generation)return;n+=3;reply.textContent=text.slice(0,n);$('#messages').scrollTop=$('#messages').scrollHeight;if(n<text.length){later(stream,reduced?0:45)}else{if(supported){reversing=true;reversalTime=performance.now();$('#version').textContent='Version 2';$('#sendEdit').textContent='Applied ✓'}else{$('#editPrompt').value='Make gravity reverse every five seconds';$('#editPrompt').disabled=false;$('#sendEdit').disabled=false}const footer=document.createElement('small');footer.style.color='#8e8b81';footer.textContent='⧉   ♧   ♡   ↻   just now';$('#messages').append(footer)}}stream()
 },1500)
};
$('#gravity').oninput=()=>$('#gravityValue').textContent=Number($('#gravity').value).toFixed(1);
$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'Resume':'Pause'};
const colors=['#df9575','#bec99f','#e6d7b4','#8cafa7','#b9a7bd'];
function physics(canvas,preview){const ctx=canvas.getContext('2d');let w=0,h=0,balls=[];function reset(){balls=Array.from({length:8},(_,i)=>({x:50+i*39,y:35+(i%3)*43,vx:((i%3)-1)*65+20,vy:0,r:10+i%3*4,color:colors[i%colors.length]}))}reset();
 const world={reset,add(){if(balls.length<35)balls.push({x:w*.5,y:h*.25,vx:Math.random()*160-80,vy:0,r:13,color:colors[balls.length%5]})},draw(dt,time){if(!canvas.getClientRects().length)return;const r=canvas.getBoundingClientRect();if(w!==r.width||h!==r.height){w=r.width;h=r.height;const d=devicePixelRatio||1;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}ctx.clearRect(0,0,w,h);ctx.strokeStyle='#ffffff08';ctx.lineWidth=1;for(let x=20;x<w;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=20;y<h;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 let sign=1;if(!preview&&reversing){sign=Math.floor((time-reversalTime)/5000)%2?-1:1;const remaining=5-Math.floor(((time-reversalTime)%5000)/1000);$('#gravityStatus').textContent=(sign===1?'↓ Downward':'↑ Upward')+' · reverses in '+remaining+'s'}
 const g=preview?6:Number($('#gravity').value);if(!preview&&paused)dt=0;
 for(const b of balls){b.vy+=g*32*sign*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<b.r){b.x=b.r;b.vx=Math.abs(b.vx)}if(b.x>w-b.r){b.x=w-b.r;b.vx=-Math.abs(b.vx)}if(b.y>h-b.r){b.y=h-b.r;b.vy=-Math.max(Math.abs(b.vy)*.82,70)}if(b.y<b.r){b.y=b.r;b.vy=Math.max(Math.abs(b.vy)*.82,70)}ctx.beginPath();ctx.fillStyle=b.color;ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.fillStyle='#ffffff35';ctx.arc(b.x-b.r*.3,b.y-b.r*.3,b.r*.25,0,Math.PI*2);ctx.fill()}
 }};return world}
const worlds=[physics($('#emailCanvas'),true),physics($('#playCanvas'),false)];$('#addBall').onclick=()=>worlds[1].add();$('#playCanvas').onclick=()=>worlds[1].add();let prev=performance.now();function frame(time){const dt=Math.min((time-prev)/1000,.03);prev=time;worlds.forEach(world=>world.draw(reduced?0:dt,time));requestAnimationFrame(frame)}requestAnimationFrame(frame);$('#introShell').addEventListener('load',start,{once:true});

function pixelateApp(){
 const app=$('#app');app.querySelector('.pixel-dissolve')?.remove();
 const layer=document.createElement('div');layer.className='pixel-dissolve';layer.setAttribute('aria-hidden','true');
 const cols=30,rows=18;for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const pixel=document.createElement('i');
  const seed=(x*17+y*31)%23;
  pixel.style.cssText=`left:${x/cols*100}%;top:${y/rows*100}%;width:${100/cols+.15}%;height:${100/rows+.15}%;--delay:${seed*18}ms;--tile:${seed%5===0?'#493c30':seed%3===0?'#302f2a':'#191918'}`;
  layer.append(pixel);
 }
 app.append(layer);
}
