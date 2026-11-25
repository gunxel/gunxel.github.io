'use strict';
const config = { youtube: '', email: '', store: '' };
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const filters=document.querySelectorAll('.filter');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.project').forEach(project=>{project.hidden=button.dataset.filter!=='all'&&project.dataset.category!==button.dataset.filter;});}));
if(config.youtube){const link=document.querySelector('#youtube-link');link.href=config.youtube;link.textContent='Visitar mi canal ↗';}
for(const [url,label] of [[config.email?'mailto:'+config.email:'','Correo electrónico'],[config.store,'Tienda de assets']]){if(!url)continue;const link=document.createElement('a');link.href=url;link.textContent=label+' ↗';link.className='button secondary';document.querySelector('#social-links').append(link);}
document.querySelector('#year').textContent=new Date().getFullYear();
const discordUser='gunxelmc';
function legacyCopy(){const field=document.createElement('textarea');field.value=discordUser;field.style.position='fixed';field.style.opacity='0';field.setAttribute('readonly','');document.body.append(field);field.select();field.setSelectionRange(0,field.value.length);let ok=false;try{ok=document.execCommand('copy');}catch(e){}field.remove();return ok;}
async function copyDiscord(){if(navigator.clipboard){try{await navigator.clipboard.writeText(discordUser);return true;}catch(e){}}return legacyCopy();}
function showDiscord(){const dialog=document.querySelector('#discord-dialog');if(!dialog.open)dialog.showModal();const field=document.querySelector('#discord-user');field.focus();field.select();}
async function copyAndReport(){const ok=await copyDiscord();const status=document.querySelector('#discord-status');status.textContent=ok?'Usuario copiado: gunxelmc':'Selecciona y copia el usuario manualmente.';if(!ok){const field=document.querySelector('#discord-user');field.focus();field.select();}return ok;}
document.querySelectorAll('.discord-contact').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showDiscord();copyAndReport();}));
document.querySelector('#copy-discord')?.addEventListener('click',()=>{showDiscord();copyAndReport();});
document.querySelector('#discord-copy-confirm').addEventListener('click',copyAndReport);

/* Acceso directo a la categoría de packs */
document.querySelectorAll('[data-project-filter]').forEach(link=>link.addEventListener('click',()=>{const filter=Array.from(document.querySelectorAll('.filter')).find(button=>button.dataset.filter===link.dataset.projectFilter);if(filter)filter.click();}));

/* Previsualizaciones del header, compartidas por todas las páginas. */
(()=>{
 const header=document.querySelector('.header');if(!header)return;
 const previews=[
 ['.brand','Inicio','Presentación de Gunxel, último vídeo y contacto.','#79cfff','/marca_agua_youtube_150.png'],
 ['.portfolio-nav','Portafolio','Conoce mi trabajo en videojuegos, modelos 3D y creación de recursos.','#79cfff','/assets/gunxel-render.png.png'],
 ['a[href="/add-ons/"]','Add-ons de Minecraft','Complementos para Bedrock y Java. Explora los gratuitos y de pago.','#a88bff',''],
 ['a[href="/packs/"]','Packs 3D','Colecciones de modelos 3D y recursos para tus proyectos.','#b5c7f3',''],
 ['.youtube-nav','Gunxel','Suscríbete','#ff5555','https://avatars.githubusercontent.com/u/360752888?v=4'],
 ['.tiktok-nav','Gunxel','Sígueme','#25f4ee','https://avatars.githubusercontent.com/u/360752888?v=4'],
 ['.x-nav','Gunxel','Sígueme','#ddd','https://avatars.githubusercontent.com/u/360752888?v=4'],
 ['.nav-cta.discord-contact','Contacto','Comisiones, colaboraciones y consultas por Discord: gunxelmc.','#858fff',''],
 ['.menu','Menú','Abre la navegación del sitio.','#79cfff','']
 ];
 const card=document.createElement('div');card.className='header-preview';card.id='header-preview';card.setAttribute('role','tooltip');card.hidden=true;
 const image=document.createElement('img');image.className='header-preview-image';image.alt='';image.hidden=true;
 const title=document.createElement('strong'),description=document.createElement('p'),hint=document.createElement('small');hint.textContent='Clic para abrir';
 const handle=document.createElement('span');handle.className='header-preview-handle';handle.textContent='@Gunxel';handle.hidden=true;card.append(image,title,handle,description,hint);document.body.append(card);
 let timer,active=null,shown=false,profilePromise;
 function hide(){clearTimeout(timer);if(active)active.removeAttribute('aria-describedby');active=null;shown=false;card.hidden=true;image.hidden=true;}
 function position(){if(!active||!shown)return;const b=active.getBoundingClientRect(),w=card.offsetWidth,h=card.offsetHeight;card.style.left=Math.max(10,Math.min(innerWidth-w-10,b.left+b.width/2-w/2))+'px';card.style.top=Math.max(10,Math.min(innerHeight-h-10,b.bottom+12))+'px';}
 function setImage(src){image.hidden=true;image.onload=()=>{if(shown){image.hidden=false;position();}};image.onerror=()=>{image.hidden=true;position();};image.src=src;}
 function open(el,data){if(active!==el)return;shown=true;const youtube=el.matches('.youtube-nav'),tiktok=el.matches('.tiktok-nav'),x=el.matches('.x-nav');card.classList.toggle('youtube-profile-preview',youtube);card.classList.toggle('tiktok-profile-preview',tiktok);card.classList.toggle('x-profile-preview',x);handle.textContent=x?'@GunxelMC':tiktok?'@gunxelmc':'@Gunxel';handle.hidden=!(youtube||tiktok||x);hint.hidden=youtube||tiktok||x;title.textContent=data[1];description.textContent=data[2];card.style.setProperty('--preview-accent',data[3]);hint.textContent=el.matches('.menu')?'Clic para desplegar':'Clic para abrir';card.hidden=false;el.setAttribute('aria-describedby',card.id);if(data[4])setImage(data[4]);position();
 if(youtube){profilePromise??=fetch('https://raw.githubusercontent.com/gunxel/gunxel.github.io/main/youtube-profile.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()}).catch(()=>null);profilePromise.then(v=>{if(active!==el||!shown||!v)return;if(typeof v.avatar==='string'&&/^https:\/\/(yt3\.googleusercontent\.com|yt3\.ggpht\.com)\//.test(v.avatar))setImage(v.avatar);if(typeof v.name==='string'&&v.name)title.textContent=v.name;position();});}}

 function schedule(el,data){hide();active=el;timer=setTimeout(()=>open(el,data),900);}
 for(const data of previews){const el=header.querySelector(data[0]);if(!el)continue;if(el.matches('.nav-cta'))el.removeAttribute('title');el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen')schedule(el,data);});el.addEventListener('pointerleave',()=>{if(active===el)hide();});el.addEventListener('focus',()=>{if(el.matches(':focus-visible'))schedule(el,data);});el.addEventListener('blur',()=>{if(active===el)hide();});el.addEventListener('click',hide);}
 addEventListener('scroll',hide,{passive:true});addEventListener('resize',hide);document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();});document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
})();
