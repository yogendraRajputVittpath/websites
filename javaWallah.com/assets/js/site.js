/* JavaWallah: progressive enhancement. All content is usable without configuration fetch or JavaScript. */
(() => {
 'use strict';
 const root = document.body.dataset.root || '';
 // Carry campaign context through internal navigation without persistent storage.
 const campaign = [...new URLSearchParams(location.search)].filter(([k])=>/^utm_(source|medium|campaign|term|content)$/.test(k));
 if(campaign.length)document.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.href,location.href);if(u.origin===location.origin && !a.getAttribute('href').startsWith('#')){campaign.forEach(([k,v])=>u.searchParams.set(k,v.slice(0,200)));a.href=u.href;}});
 const fallback = JSON.parse(document.getElementById('safe-config').textContent);
 const validURL = value => {try {return new URL(value).protocol === 'https:';} catch {return false;}};
 window.jwConfig = fetch(root + 'assets/config/site-config.json', {cache:'no-cache'})
  .then(r => {if(!r.ok) throw new Error('Configuration unavailable'); return r.json();})
  .then(c => {if(!c || !c.contact || !Array.isArray(c.programs) || !c.forms) throw new Error('Invalid configuration'); return c;})
  .catch(() => fallback);
 document.getElementById('year').textContent = String(new Date().getFullYear());
 const top = document.querySelector('.back-top');
 const onScroll = () => top.classList.toggle('visible', window.scrollY > 450);
 window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){e.target.classList.add('fade-in');observer.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.program-card,.feature,.team-card').forEach(el => observer.observe(el));
 }
 // jQuery powers the searchable, combinable program catalogue.
 if(window.jQuery){
  const $=window.jQuery; let filter='all';
  const apply = () => {
   const q=($('#program-search').val() || '').toLowerCase().trim();let visible=0;
   $('.filter-card').each(function(){const text=this.dataset.name.toLowerCase(); const name=this.querySelector('h3').textContent.toLowerCase();const show=(!q || text.includes(q)) && (filter==='all' || name.includes(filter));this.hidden=!show;if(show) visible++;});
   $('#no-results').prop('hidden',visible!==0);$('.search-result').text(visible+' program'+(visible===1?'':'s')+' shown');
  };
  $('#program-search').on('input',apply);
  $('.filter-button').on('click',function(){filter=this.dataset.filter;$('.filter-button').removeClass('active').attr('aria-pressed','false');$(this).addClass('active').attr('aria-pressed','true');apply();});
  if($('#program-search').length)apply();
 }
 const safeStore={get(k){try{return localStorage.getItem(k);}catch{return null;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
 let analyticsLoaded=false;
 function loadAnalytics(t){
  if(analyticsLoaded) return;analyticsLoaded=true;
  if(/^G-[A-Z0-9]+$/.test(t.ga4Id || '')){
   window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',t.ga4Id);
   const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(t.ga4Id);document.head.append(s);
  }
  if(/^\d{5,25}$/.test(t.metaPixelId || '')){
   const f=window.fbq=function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments);};f.push=f;f.loaded=true;f.version='2.0';f.queue=[];
   const s=document.createElement('script');s.async=true;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.append(s);f('init',t.metaPixelId);f('track','PageView');
  }
 }
 window.jwConfig.then(c => {
  if(c.theme) for(const [key,val] of Object.entries({navy:c.theme.navy,blue:c.theme.blue,teal:c.theme.cyan,soft:c.theme.background}))if(/^#[0-9a-f]{6}$/i.test(val))document.documentElement.style.setProperty('--'+key,val);
  const t=c.tracking||{};const configured=/^G-[A-Z0-9]+$/.test(t.ga4Id||'') || /^\d{5,25}$/.test(t.metaPixelId||'');
  if(!configured)return;
  const banner=document.getElementById('consent-banner'), settings=document.getElementById('privacy-settings');settings.hidden=false;
  const stored=safeStore.get('jw-analytics-consent');if(stored==='allow')loadAnalytics(t);else if(!stored)banner.hidden=false;
  settings.addEventListener('click',()=>{banner.hidden=false;document.getElementById('consent-accept').focus();});
  document.getElementById('consent-accept').addEventListener('click',()=>{safeStore.set('jw-analytics-consent','allow');banner.hidden=true;loadAnalytics(t);});
  document.getElementById('consent-decline').addEventListener('click',()=>{safeStore.set('jw-analytics-consent','decline');banner.hidden=true;if(analyticsLoaded) location.reload();});
 });
 window.jwValidURL=validURL;
})();
