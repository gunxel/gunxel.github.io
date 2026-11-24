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