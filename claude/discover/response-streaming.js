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

// Build the website answer in reading order, including non-text content.
async function streamWebsiteMarkup(markup, target) {
 const source=document.createElement('div');source.innerHTML=markup;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 async function reveal(node,parent){
  if(!target.isConnected)return;
  if(node.nodeType===Node.TEXT_NODE){
   const text=document.createTextNode('');parent.append(text);
   const words=node.textContent.match(/\S+\s*|\s+/g)||[];
   for(let i=0;i<words.length;i+=2){
    if(!target.isConnected)return;
    text.appendData(words.slice(i,i+2).join(''));moveDemoTo(parent);
    if(!reduced)await new Promise(resolve=>setTimeout(resolve,80));
   }
  }else if(node.nodeType===Node.ELEMENT_NODE){
   if(node.matches('code,.website-generated-files,.website-download-all')){
    parent.append(node.cloneNode(true));moveDemoTo(parent);return;
   }
   const next=node.cloneNode(false);parent.append(next);
   for(const child of node.childNodes)await reveal(child,next);
  }
 }
 for(const node of source.childNodes)await reveal(node,target);
}
