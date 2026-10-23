import { personalData } from '../data/content.js';
import { getCurrentLang, onLangChange } from './i18n.js';
import { filterProjects } from './projects.js';
let selected = '', related = [];
const logos = {Python:'python',JavaScript:'javascript',TypeScript:'typescript',FastAPI:'fastapi',React:'react','Node.js':'nodedotjs',Pandas:'pandas',NumPy:'numpy',LangChain:'langchain',LangGraph:'langgraph',Git:'git',GitHub:'github','VS Code':'vscode',Docker:'docker',PostgreSQL:'postgresql','Google Colab':'googlecolab'};
export function highlightSkills(names = []) {
  related = names;
  document.querySelectorAll('[data-globe-tech]').forEach(b => b.classList.toggle('is-related', names.includes(b.dataset.globeTech)));
}
export function initSkillsNetwork() {
  const host = document.querySelector('.skills-network-layout');
  if (!host) return;
  host.className = 'competency-planet';
  host.innerHTML = '<div class="planet-stage" tabindex="0"><canvas aria-hidden="true"></canvas><div class="planet-nodes"></div></div><p class="planet-hint"></p><details class="planet-list"><summary></summary><div></div></details><button type="button" class="skills-reset"></button>';
  const stage = host.querySelector('.planet-stage'), canvas = host.querySelector('canvas'), ctx = canvas.getContext('2d');
  const names = [...new Set(Object.values(personalData.skillsLayers).flat())];
  const points = names.map((name,i) => { const y = 1-2*(i+.5)/names.length, a=i*Math.PI*(3-Math.sqrt(5)), r=Math.sqrt(1-y*y); return {name,x:Math.cos(a)*r,y,z:Math.sin(a)*r}; });
  const buttons = points.map(point => {
    const b = document.createElement('button'); b.type='button'; b.className='planet-logo'; b.dataset.globeTech=point.name; b.title=point.name; b.setAttribute('aria-label',point.name); b.setAttribute('aria-pressed','false');
    b.innerHTML = logos[point.name] ? '<img draggable="false" alt="" src="public/logos/'+logos[point.name]+'.svg"><span>'+point.name+'</span>' : '<b>'+point.name+'</b>';
    b.addEventListener('click', e => { if (moved && e.detail !== 0) { e.preventDefault(); return; } choose(point.name); });
    host.querySelector('.planet-nodes').appendChild(b); return b;
  });
  names.forEach(name => {const b=document.createElement('button'); b.type='button'; b.className='skill-item'; b.dataset.globeTech=name; b.textContent=name; b.addEventListener('click',()=>choose(name));host.querySelector('.planet-list div').appendChild(b);});
  function choose(name) {selected=selected===name?'':name;filterProjects(selected?[selected]:[]);host.querySelectorAll('[data-globe-tech]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.globeTech===selected)));}
  host.querySelector('.skills-reset').addEventListener('click',()=>{choose(selected);});
  let yaw=.4,pitch=-.2,size=1,drag=null,moved=false;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let autoRotate = !motion.matches, visible = false;
  const rotationButton = document.createElement('button');
  rotationButton.type = 'button'; rotationButton.className = 'skills-reset planet-rotation';
  host.insertBefore(rotationButton, host.querySelector('.planet-hint'));
  function labelRotation() {
    const english = getCurrentLang() === 'en';
    rotationButton.textContent = autoRotate ? (english ? 'Pause rotation' : 'Pausar rotação') : (english ? 'Rotate globe' : 'Girar globo');
    rotationButton.setAttribute('aria-pressed', String(autoRotate));
  }
  rotationButton.addEventListener('click', () => { autoRotate = !autoRotate; labelRotation(); });
  motion.addEventListener('change', () => { autoRotate = !motion.matches; labelRotation(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, {threshold: .1}).observe(stage);
  let previous = performance.now();
  setInterval(() => {
    const now = performance.now(), delta = Math.min(now - previous, 60); previous = now;
    if (!autoRotate || !visible || drag || document.hidden || stage.contains(document.activeElement)) return;
    yaw += delta * .00012; draw();
  }, 33);
  function rotate(p) {const x=p.x*Math.cos(yaw)+p.z*Math.sin(yaw),z=-p.x*Math.sin(yaw)+p.z*Math.cos(yaw);return {x,y:p.y*Math.cos(pitch)-z*Math.sin(pitch),z:p.y*Math.sin(pitch)+z*Math.cos(pitch)};}
  function draw() {
    const c=size/2,r=size*.37;ctx.clearRect(0,0,size,size);
    const halo=ctx.createRadialGradient(c,c,r*.93,c,c,r*1.17);halo.addColorStop(0,'#8abedc25');halo.addColorStop(.45,'#6eafe212');halo.addColorStop(1,'#00000000');ctx.fillStyle=halo;ctx.fillRect(0,0,size,size);
    const globe=ctx.createRadialGradient(c-r*.35,c-r*.4,0,c,c,r);globe.addColorStop(0,'#152b3b');globe.addColorStop(.65,'#09141f');globe.addColorStop(1,'#03070c');ctx.fillStyle=globe;ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.fill();
    function curve(arr,color) { for(let i=1;i<arr.length;i++){const a=rotate(arr[i-1]),b=rotate(arr[i]);if(a.z<0||b.z<0)continue;ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(c+a.x*r,c+a.y*r);ctx.lineTo(c+b.x*r,c+b.y*r);ctx.stroke();} }
    ctx.lineWidth=.7;
    for(let j=1;j<10;j++){const lat=-Math.PI/2+j*Math.PI/10;curve(Array.from({length:81},(_,i)=>{const a=i*Math.PI/40;return{x:Math.cos(lat)*Math.cos(a),y:Math.sin(lat),z:Math.cos(lat)*Math.sin(a)}}),'#a4c4da16');}
    for(let j=0;j<12;j++){const a=j*Math.PI/6;curve(Array.from({length:81},(_,i)=>{const t=i*Math.PI/40;return{x:Math.cos(a)*Math.cos(t),y:Math.sin(t),z:Math.sin(a)*Math.cos(t)}}),'#a4c4da16');}
    points.forEach((p,i)=>{const near=points.map((q,j)=>({q,j,d:p.x*q.x+p.y*q.y+p.z*q.z})).filter(v=>v.j>i&&v.d>.48);near.forEach(({q,d})=>{const angle=Math.acos(Math.min(1,d));curve(Array.from({length:25},(_,k)=>{const t=k/24,a=Math.sin((1-t)*angle)/Math.sin(angle),b=Math.sin(t*angle)/Math.sin(angle);return{x:a*p.x+b*q.x,y:a*p.y+b*q.y,z:a*p.z+b*q.z}}),'#edc47b40');});});
    points.forEach((p,i)=>{const q=rotate(p),b=buttons[i];b.style.left=(c+q.x*r)+'px';b.style.top=(c+q.y*r)+'px';b.style.opacity=q.z<-.12?'0':String(.58+.42*Math.max(0,q.z));b.style.visibility=q.z<-.12?'hidden':'visible';b.style.zIndex=String(Math.round((q.z+1)*100));b.style.transform='translate(-50%,-50%)';});
  }
  new ResizeObserver(()=>{size=stage.clientWidth;const dpr=Math.min(2,devicePixelRatio||1);canvas.width=size*dpr;canvas.height=size*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}).observe(stage);
  stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;moved=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY};});
  stage.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>6){moved=true;stage.setPointerCapture(e.pointerId);stage.classList.add('is-dragging');}if(moved){yaw+=dx*.007;pitch-=dy*.007;draw();}drag.x=e.clientX;drag.y=e.clientY;});
  const end=()=>{drag=null;stage.classList.remove('is-dragging');};stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);stage.addEventListener('lostpointercapture',end);window.addEventListener('pointerup',end);
  stage.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();yaw+=e.key==='ArrowRight'?.12:e.key==='ArrowLeft'?-.12:0;pitch+=e.key==='ArrowDown'?.12:e.key==='ArrowUp'?-.12:0;draw();});
  function translate(){const en=getCurrentLang()==='en';stage.setAttribute('aria-label',en?'Skills globe. Drag or use arrow keys to rotate.':'Globo de competências. Arraste ou use as setas para girar.');host.querySelector('.planet-hint').textContent=en?'Hold and drag to rotate. Select a technology to filter projects.':'Segure e arraste para girar. Selecione uma tecnologia para filtrar os projetos.';host.querySelector('summary').textContent=en?'View all technologies':'Ver todas as tecnologias';host.querySelector('.skills-reset:not(.planet-rotation)').textContent=en?'Clear filter':'Limpar filtro';}
  translate();labelRotation();onLangChange(() => { translate(); labelRotation(); });highlightSkills(related);
}
