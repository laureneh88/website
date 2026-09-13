// Each caller waits for completion before beginning the next conversation turn.
async function streamResponseElement(element) {
 if(!element || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),parts=[];
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(!node.textContent.trim()||node.parentElement.closest('button,svg,.receipt-file,.travel-file'))continue;
  parts.push({node,text:node.textContent});
 }
 parts.forEach(part=>part.node.nodeValue='');
 for(const part of parts){
  const words=part.text.match(/\S+\s*|\s+/g)||[part.text];
  for(let i=0;i<words.length;i+=2){
   if(!element.isConnected)return;
   part.node.nodeValue+=words.slice(i,i+2).join('');
   moveDemoTo(part.node.parentElement);
   await new Promise(resolve=>setTimeout(resolve,80));
  }
 }
}
// Keep scrolling under one controller; CSS smooth scrolling would compete with it.
const stableResponseStyle=document.createElement('style');
stableResponseStyle.textContent='body .drawer-body{scroll-behavior:auto!important;overflow-anchor:none}';
document.head.append(stableResponseStyle);

async function streamResponseMarkup(markup, target) {
 const source=document.createElement('div');source.innerHTML=markup;
 const root=source.firstElementChild.cloneNode(false);target.append(root);
 for(const child of source.firstElementChild.childNodes){
  if(!root.isConnected)return;
  const block=child.cloneNode(true);root.append(block);
  if(block.nodeType===Node.ELEMENT_NODE)await streamResponseElement(block);
  moveDemoTo(root);
 }
 return root;
}
function finishDemoResponse(){
 document.querySelector('#demoInputDock').classList.add('hidden');
 const transcript=document.querySelector('#buildNarration');
 const footer=document.createElement('div');footer.className='demo-response-footer';footer.innerHTML=mainWebsiteFooterMarkup;transcript.append(footer);moveDemoTo(footer);
 document.querySelector('#demoDraft').value='';document.querySelector('#demoDraft').placeholder='Reply to Claude…';document.querySelector('#demoDraftSend').onclick=null;
}
revealPlantAnswer=async function(markup){const root=await streamResponseMarkup(markup,document.querySelector('#buildNarration'));if(root?.isConnected)finishDemoResponse()};
revealReceiptAnswer=async function(markup){const root=await streamResponseMarkup(markup,document.querySelector('#buildNarration'));if(root?.isConnected)finishDemoResponse()};
streamTravelResponse=async function(markup,done){const root=await streamResponseMarkup(markup,document.querySelector('#buildNarration'));if(root?.isConnected)done()};
