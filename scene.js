import * as T from './three.module.js';
const art=document.querySelector('#art'),kind=document.body.dataset.kind;
let renderer;
try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{console.info('WebGL unavailable; interactive SVG scene remains active.');}
if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;art.append(renderer.domElement);art.classList.add('webgl');
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,180),world=new T.Group(),parts=[],tints=[];scene.add(world);let progress=window.sceneState?.progress||0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,visible=true,last=0,raf=0;
 const mat=(c,rough=.5,metal=0)=>new T.MeshStandardMaterial({color:c,roughness:rough,metalness:metal});
 const stone=mat('#aaa9a1',.8),black=mat('#171b24',.38,.25),white=mat('#e7e8e3',.5),wood=mat('#b0794e',.65),green=mat('#45683f',.9),chrome=mat('#a9b1bc',.2,.9);
 function mesh(geo,m,x=0,y=0,z=0,parent=world){const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z,p)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,p);
 const ball=(r,m,x,y,z,p)=>mesh(new T.SphereGeometry(r,40,28),m,x,y,z,p);
 const cyl=(r1,r2,h,m,x,y,z,p)=>mesh(new T.CylinderGeometry(r1,r2,h,72),m,x,y,z,p);
 function part(o,axis='y',amount=1){parts.push({o,base:o.position.clone(),axis,amount});return o;}
 const hemi=new T.HemisphereLight('#d6e3ff','#27222c',2.5);scene.add(hemi);const key=new T.DirectionalLight('#fff0d9',5);key.position.set(-4,9,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);const rim=new T.PointLight('#a995fa',30,35);rim.position.set(5,4,-4);scene.add(rim);
 const floor=mesh(new T.PlaneGeometry(120,120),new T.ShadowMaterial({opacity:.24}),0,-2.2,0,scene);floor.rotation.x=-Math.PI/2;
 let focus=new T.Vector3(0,0,0),baseCamera=new T.Vector3(0,2.3,12),targetCamera=baseCamera.clone();
 if(kind==='burger'){
  const bunMat=mat('#ca7e2a',.6),pattyMat=mat('#492d1b',.94),cheeseMat=mat('#efb52a',.6),tomatoMat=mat('#bd3525',.45);let bottom=cyl(1.65,1.5,.35,bunMat,0,-1.3,0);part(bottom,'y',-1.5);
  const patty=cyl(1.65,1.58,.35,pattyMat,0,-.87,0);part(patty,'y',-.8);patty.name='patty';
  const cheese=box(2.8,.09,2.8,cheeseMat,0,-.59,0);cheese.rotation.y=.25;part(cheese,'y',.05);
  const tomato=cyl(1.5,1.5,.2,tomatoMat,0,-.35,0);part(tomato,'y',.65);
  const lettuce=new T.Group();world.add(lettuce);lettuce.position.y=-.1;for(let i=0;i<35;i++){const a=i*2.4,r=.3+1.1*(i%7)/7;const o=ball(.35,green,Math.cos(a)*r,Math.sin(a*4)*.05,Math.sin(a)*r,lettuce);o.scale.set(1,.16,1);o.rotation.z=i;}part(lettuce,'y',1.15);
  const top=new T.Group();world.add(top);top.position.y=.2;const cap=mesh(new T.SphereGeometry(1.65,72,36,0,Math.PI*2,0,Math.PI/2),bunMat,0,0,0,top);cap.scale.y=.65;cyl(1.65,1.65,.13,bunMat,0,.03,0,top);for(let i=0;i<100;i++){const a=i*2.399,r=1.5*Math.sqrt(i/100);let o=ball(.035,mat('#f8d899'),Math.cos(a)*r,.12+1.0*Math.sqrt(1-r*r/2.73),Math.sin(a)*r,top);o.scale.set(1,.4,2.4);o.rotation.y=a;}part(top,'y',2.0);focus.set(0,.3,0);baseCamera.set(0,1.8,12);rim.color.set('#ff692d');
 }else if(kind==='office'){
  box(11,.2,8,wood,0,-1.3,0);box(11,3.4,.18,white,0,.3,-4);box(.18,3.4,8,white,-5.5,.3,0);for(let i=0;i<32;i++)box(.018,.012,8,mat('#92714f'),-5.3+i*.34,-1.19,0);
  for(let i=0;i<6;i++){let g=new T.Group();world.add(g);g.position.set(-3+(i%3)*2.6,-.3,-1.9+Math.floor(i/3)*3);box(2,.13,1.1,wood,0,0,0,g);for(let x of [-.85,.85])for(let z of [-.4,.4])box(.06,1,.06,black,x,-.55,z,g);box(.7,.48,.05,black,0,.37,-.25,g);box(.61,.36,.008,mat('#506a7c'),0,.39,-.215,g);box(.06,.24,.06,chrome,0,.1,-.25,g);box(.6,.04,.25,black,0,.1,.18,g);box(.6,.16,.6,mat('#69827c'),0,-.35,1,g);box(.6,.65,.12,mat('#69827c'),0,-.07,1.2,g);cyl(.03,.03,.65,chrome,0,-.78,1,g);}
  let glass=new T.MeshPhysicalMaterial({color:'#b9d8db',transparent:true,opacity:.2,roughness:.1,metalness:.1});box(.06,2.8,4,glass,2.1,.2,1.8);for(let z of [0,2,4])box(.05,2.8,.05,chrome,2.1,.2,z);
  cyl(.9,.9,.12,wood,3.7,-.2,1.8);cyl(.07,.1,1.05,chrome,3.7,-.8,1.8);
  for(let i=0;i<4;i++){const x=i%2?4.8:2.5,z=i<2?1:2.8;box(.65,.15,.65,mat('#b78c61'),x,-.4,z);box(.65,.65,.12,mat('#b78c61'),x,-.1,z+.3);}
  for(let [x,z] of [[-4.8,-3.3],[4.8,-3.3],[-4.7,3.2]]){cyl(.22,.32,.5,mat('#b78460'),x,-.95,z);for(let i=0;i<9;i++){let leaf=ball(.3,green,x+Math.cos(i*2.4)*.22,-.3+i*.09,z+Math.sin(i*2.4)*.22);leaf.scale.set(1,.25,1);leaf.rotation.z=i;}}
  focus.set(0,-.2,0);baseCamera.set(10,10,14);floor.position.y=-1.45;
 }else if(kind==='polo'){
  // A gently folded garment surface with separate collar and sleeves.
  const fabric=mat('#242830',.92);tints.push(fabric);let shape=new T.Shape();shape.moveTo(-.9,-1.6);shape.lineTo(.9,-1.6);shape.lineTo(1,1.15);shape.lineTo(.65,1.6);shape.lineTo(-.65,1.6);shape.lineTo(-1,1.15);shape.closePath();let torso=mesh(new T.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.08,bevelThickness:.08,curveSegments:24}),fabric);const pos=torso.geometry.attributes.position;for(let i=0;i<pos.count;i++){let x=pos.getX(i),y=pos.getY(i);pos.setZ(i,pos.getZ(i)+.045*Math.sin(x*20+y*1.4)*Math.sin(y*3));}torso.geometry.computeVertexNormals();
  for(let side of [-1,1]){let s=box(.72,.9,.25,fabric,side*1.22,1.05,.04);s.rotation.z=side*.55;part(s,'x',side*.7);}
  let collar=new T.Group();world.add(collar);collar.position.y=1.55;for(let side of [-1,1]){let s=box(.55,.48,.08,fabric,side*.28,0,.18,collar);s.rotation.z=side*.55;}part(collar,'y',.85);box(.09,.7,.05,fabric,0,1.1,.25);for(let i=0;i<3;i++)ball(.027,white,0,1.32-i*.19,.3);baseCamera.set(0,1,10);focus.set(0,.3,0);rim.color.set('#c2b2a0');
 }else if(kind==='figure'){
  const skin=mat('#5f487d',.22,.9);tints.push(skin);let figure=new T.Group();world.add(figure);ball(.48,skin,0,1.45,0,figure);let torso=ball(.7,skin,0,.35,0,figure);torso.scale.set(.85,1.1,.52);for(let side of [-1,1]){const arm=ball(.26,skin,side*.72,.1,0,figure);arm.scale.set(.7,2.6,.7);arm.rotation.z=side*.2;let leg=ball(.28,skin,side*.3,-1.16,0,figure);leg.scale.set(.8,3,.8);}part(figure,'y',.2);for(let i=0;i<3;i++){let ring=mesh(new T.TorusGeometry(2.1+i*.3,.012,12,150),new T.MeshStandardMaterial({color:'#b777ff',emissive:'#7841c2',emissiveIntensity:.7}));ring.rotation.set(i*.9,.7+i,0);part(ring,'y',(i-1)*.8);}baseCamera.set(0,1,11);focus.set(0,.1,0);rim.intensity=55;
 }else if(kind==='nature'){
  let earth=mesh(new T.IcosahedronGeometry(1.9,4),mat('#544335',.95));earth.scale.set(1,.55,1);earth.position.y=-.65;part(earth,'y',-.8);let lawn=ball(1.88,green,0,-.18,0);lawn.scale.y=.24;
  for(let i=0;i<42;i++){let a=i*2.399,r=1.6*Math.sqrt(i/42),x=Math.cos(a)*r,z=Math.sin(a)*r,h=.5+(i%7)*.13;let tree=new T.Group();world.add(tree);tree.position.set(x,.02,z);cyl(.035,.07,h,wood,0,h/2,0,tree);for(let j=0;j<4;j++){let crown=ball(.26+(i%3)*.035,mat(['#527648','#74905c','#354e35'][i%3]),Math.cos(j*2)*.1,h+j*.09,Math.sin(j*2)*.1,tree);crown.scale.set(1,1.3,1);}part(tree,'y',.4+(i%3)*.3);}
  baseCamera.set(4,3.6,9);focus.set(0,.3,0);rim.color.set('#c5e1aa');
 }else if(kind==='ice'){
  const ice=new T.MeshPhysicalMaterial({color:'#d2e4ec',roughness:.2,metalness:.05,clearcoat:1});tints.push(ice);for(let row=0;row<7;row++){let theta=(row+.5)/7*Math.PI/2,r=1.8*Math.cos(theta),y=-1.5+1.8*Math.sin(theta),count=Math.max(5,Math.round(r*13));for(let i=0;i<count;i++){let a=(i+row%2*.5)/count*Math.PI*2;if(row<3&&Math.abs(a-Math.PI/2)<.35)continue;let b=box(.42,.3,.28,ice,Math.cos(a)*r,y,Math.sin(a)*r);b.rotation.y=-a;part(b,'y',row*.2);}}
  for(let i=0;i<9;i++){const a=i*2.4,r=5+i*.6;let mountain=mesh(new T.ConeGeometry(2+(i%3),3+(i%4),5),mat('#c6d0d4'),Math.cos(a)*r,-1.3,Math.sin(a)*r);mountain.rotation.y=i;}
  const snow=mesh(new T.PlaneGeometry(120,120),mat('#e9eff0'),0,-1.7,0);snow.rotation.x=-Math.PI/2;baseCamera.set(4,2.4,11);focus.set(0,-.2,0);hemi.intensity=3;rim.color.set('#abc4d8');
 }else if(kind==='glass'){
  const colors=['#7bdbef','#c2a0ff','#ed8db7'];for(let i=0;i<5;i++){const glass=new T.MeshPhysicalMaterial({color:colors[i%3],metalness:.24,roughness:.09,transparent:true,opacity:.55,clearcoat:1,side:T.DoubleSide});tints.push(glass);const o=box(1.6,2.8,.35,glass,(i-2)*.7,(i%2-.5)*.4,(i%3)*.5);o.rotation.set(.12,i*.4,.1*(i-2));part(o,'x',(i-2)*.7);}let g=mesh(new T.TorusKnotGeometry(.8,.17,160,24),chrome,0,.2,1);part(g,'y',1);baseCamera.set(0,1,12);rim.color.set('#68dfff');
 }else{
  const paint=new T.MeshPhysicalMaterial({color:'#a71626',metalness:.7,roughness:.23,clearcoat:1});tints.push(paint);let chassis=new T.Group();world.add(chassis);box(5.7,.55,2.35,paint,0,-.65,0,chassis);let hood=box(2.1,.24,2.25,paint,-1.6,-.2,0,chassis);hood.rotation.z=-.08;let roof=box(2.3,.65,1.9,black,.3,.14,0,chassis);roof.rotation.z=.04;box(2.7,.12,2.05,paint,.25,.52,0,chassis);for(let side of [-1,1]){box(2.1,.45,.025,mat('#314650',.1,.65),.25,.12,side*.97,chassis);box(.1,.65,.08,paint,-.75,.12,side,chassis);box(.1,.65,.08,paint,1.2,.12,side,chassis);box(.8,.08,.03,white,-2.25,-.37,side*1.18,chassis);box(.7,.06,.03,mat('#ff2739'),2.4,-.37,side*1.18,chassis);}
  for(let x of [-1.9,1.9])for(let z of [-1.25,1.25]){let wheel=new T.Group();world.add(wheel);wheel.position.set(x,-.9,z);const tyre=mesh(new T.TorusGeometry(.52,.16,24,72),mat('#111317',.95),0,0,0,wheel);const hub=cyl(.4,.4,.1,chrome,0,0,0,wheel);hub.rotation.x=Math.PI/2;for(let i=0;i<5;i++){let spoke=box(.06,.72,.06,black,0,0,.07,wheel);spoke.rotation.z=i*Math.PI/5;}part(wheel,'z',Math.sign(z)*.8);}part(chassis,'y',.4);baseCamera.set(-7,3.4,10);focus.set(0,-.25,0);rim.color.set('#ff4654');rim.intensity=50;
 }
 function resize(){const w=art.clientWidth,h=art.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}resize();window.addEventListener('resize',resize);
 function update(){const t=paused?0:Math.sin(progress*Math.PI);for(let p of parts)p.o.position[p.axis]=p.base[p.axis]+t*p.amount;world.rotation.y=paused?0:progress*.55;world.position.x=innerWidth>700?(kind==='polo'?0:2.25):0;world.position.y=innerWidth>700?0:-1.2;world.scale.setScalar(innerWidth>700?1:.82);
  if(kind==='office'){targetCamera.set(10-progress*6,10-progress*4,14-progress*5);}else targetCamera.copy(baseCamera);camera.position.copy(targetCamera);camera.lookAt(focus.x+(innerWidth>700&&kind!=='polo'?1:0),focus.y,focus.z);renderer.render(scene,camera);}
 function loop(ms){raf=0;if(!visible||document.hidden)return;if(ms-last>32){update();last=ms;}if(!paused)raf=requestAnimationFrame(loop);}
 function kick(){if(!raf)raf=requestAnimationFrame(loop);}window.addEventListener('storychange',e=>{progress=e.detail.progress;paused=e.detail.paused;update();if(!paused)kick()});window.addEventListener('finishchange',e=>{for(let m of tints)m.color.set(e.detail);update()});window.addEventListener('stackchange',e=>{const patty=world.getObjectByName('patty');if(patty){patty.material.color.set(e.detail==='Garden stack'?'#506b39':'#492d1b');patty.scale.y=e.detail==='Double cheese'?1.6:1;}update()});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){update();kick();}else if(raf){cancelAnimationFrame(raf);raf=0;}},{threshold:0}).observe(art);document.addEventListener('visibilitychange',()=>{if(!document.hidden)kick()});renderer.domElement.addEventListener('webglcontextlost',()=>{art.classList.remove('webgl');if(raf)cancelAnimationFrame(raf);});update();kick();
}
