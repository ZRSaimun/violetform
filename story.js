// The scroll controller is independent of the optional WebGL renderer.
(()=>{
 const body=document.body,kind=body.dataset.kind,story=document.querySelector('#story'),stage=document.querySelector('.stage'),titles=[...document.querySelectorAll('.chapters button')].map(b=>b.textContent.slice(3)),media=matchMedia('(prefers-reduced-motion: reduce)');
 let progress=0,paused=media.matches,frame=0;
 const clamp=x=>Math.max(0,Math.min(1,x));
 function draw(){frame=0;progress=clamp(-story.getBoundingClientRect().top/(story.offsetHeight-innerHeight)); const part=Math.min(2,Math.floor(progress*3));
  document.documentElement.style.setProperty('--progress',progress);body.dataset.chapter=part;
  document.querySelector('#chapter-title').textContent=titles[part];document.querySelector('#chapter-number').textContent=`0${part+1} / 03`;
  document.querySelector('#chapter-copy').textContent=["A first look at the complete form.","Explore the parts that make the whole.","The final composition. Scroll back to retrace the story."][part];
  document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.step)===part)));
  const t=paused?0:Math.sin(progress*Math.PI),parts=[...document.querySelectorAll('.art svg [data-part]')];
  for(const p of parts){const n=+p.dataset.part;let x=0,y=0,r=0;if(kind==='burger'){y=-(n-2.5)*t*38;}else if(kind==='polo'){x=(n===2?1:n===1?-1:0)*t*65;y=n===1?-t*110:0;}else if(kind==='office'){y=n===0?-t*100:0;x=(n-1)*t*10;}else if(kind==='ice'){y=-n*t*20;x=(n%2?1:-1)*t*25;}else if(kind==='car'){x=n===1?t*35:0;y=n===1?t*25:-t*15;}else{y=-(n-1)*t*45;r=(n-1)*t*9;}p.style.transformBox='fill-box';p.style.transformOrigin='center';p.style.transform=`translate(${x}px,${y}px) rotate(${r}deg)`;}
  window.sceneState={progress,paused,kind};window.dispatchEvent(new CustomEvent('storychange',{detail:window.sceneState}));
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(draw)}
 function jump(i){const max=story.offsetHeight-innerHeight;window.scrollTo({top:story.offsetTop+max*(i===2?.96:i/3+.04),behavior:paused?'instant':'smooth'});}
 document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>jump(+b.dataset.step)));
 function pauseLabel(){const b=document.querySelector('#pause');b.textContent=paused?'Enable motion':'Pause motion';b.setAttribute('aria-pressed',String(paused));}
 document.querySelector('#pause').addEventListener('click',()=>{paused=!paused;pauseLabel();draw()});media.addEventListener('change',e=>{paused=e.matches;pauseLabel();draw()});
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{window.dispatchEvent(new CustomEvent('finishchange',{detail:b.dataset.color}));const photo=document.querySelector('.photo-scene');if(photo)photo.style.filter=b.dataset.color==='#d8d0b8'?'sepia(.3) brightness(1.2)':b.dataset.color==='#ad593a'?'sepia(.7) saturate(1.4)':'grayscale(.8)';document.querySelector('#result').textContent=`${b.getAttribute('aria-label')} selected.`;const g=document.querySelector('#fabric')||document.querySelector('#car')||document.querySelector('#glass');if(g)g.querySelectorAll('stop').forEach((s,i)=>{if(i%2===0)s.setAttribute('stop-color',b.dataset.color)})}));
 document.querySelector('#atmosphere')?.addEventListener('change',e=>{const value=e.target.value;stage.style.filter=value==='night'?'brightness(.58) saturate(.8)':value==='dusk'?'sepia(.2) brightness(.85)':'none';document.querySelector('#result').textContent=`${e.target.selectedOptions[0].text} atmosphere selected.`;window.dispatchEvent(new CustomEvent('lightchange',{detail:value}));});
 document.querySelector('#builder')?.addEventListener('submit',e=>{e.preventDefault();const v=document.querySelector('#stack').value;document.querySelector('#result').textContent=`${v} selected — visual preview only.`;const image=document.querySelector('.photo-scene [data-slice="2"]');if(image)image.style.filter=v==='Garden stack'?'hue-rotate(45deg)':v==='Double cheese'?'saturate(1.6)':'none';const patty=document.querySelector('.art svg [data-part="1"]');if(patty)patty.style.filter=v==='Garden stack'?'hue-rotate(70deg)':'none';window.dispatchEvent(new CustomEvent('stackchange',{detail:v}));});
 document.querySelector('a[href="#story"]').addEventListener('click',()=>jump(0));pauseLabel();draw();
})();

(()=>{const kind=document.body.dataset.kind,parts=[...document.querySelectorAll('.photo-scene [data-slice]')];window.addEventListener('storychange',e=>{const p=e.detail.paused?0:Math.sin(e.detail.progress*Math.PI);parts.forEach((im,i)=>{let y=0,x=0,rot=0;if(kind==='burger'){y=(i-2)*p*32;rot=(i-2)*p*.6}else if(kind==='polo'){x=(i-1)*p*28;y=(i-1)*p*14}else if(kind==='car'){y=-p*25}else if(kind==='office'){x=-p*38}else{y=(i-1)*p*14}im.style.transform=`translate(${x}px,${y}px) rotate(${rot}deg)`});});})();