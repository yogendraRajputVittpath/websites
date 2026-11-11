(() => {
 'use strict';
 const form=document.querySelector('.enquiry-form');if(!form)return;
 const status=form.querySelector('.form-status'),button=form.querySelector('.form-submit');
 const cleanText=value=>String(value||'').replace(/[\r\n]/g,' ').trim();
 const setStatus=(message,error=false)=>{status.replaceChildren();status.textContent=message;status.style.color=error?'#a03434':'#315b54';};
 const configReady=window.jwConfig;

 configReady.then(c=>{
  function modes(){
   const p=c.programs.find(p=>p.id===form.elements.program.value);
   const online=form.elements.mode.querySelector('option[value="Online"]') || [...form.elements.mode.options].find(o=>o.value==='Online');
   if(online){
    online.disabled=!!p && p.type==='course';
    if(online.disabled && form.elements.mode.value==='Online')form.elements.mode.value='Offline';
   }
   if(p?.type==='course')form.elements.mode.value='Offline';
  }
  modes();
  form.elements.program.addEventListener('change',modes);
 });

 form.addEventListener('submit',async event=>{
  event.preventDefault();

  form.elements.name.value=form.elements.name.value.trim();
  const digits=form.elements.phone.value.replace(/\D/g,'');
  form.elements.phone.setCustomValidity(digits.length>=10 && digits.length<=15?'':'Enter 10 to 15 digits.');
  form.classList.add('was-validated');

  if(!form.checkValidity()){
   setStatus('Please check the highlighted fields.',true);
   form.querySelector(':invalid')?.focus();
   return;
  }

  button.disabled=true;
  const label=button.innerHTML;
  button.textContent='Opening WhatsApp…';
  setStatus('Preparing your enquiry for WhatsApp…');

  try{
   const c=await configReady;
   const data=Object.fromEntries(new FormData(form));
   const p=c.programs.find(p=>p.id===data.program);
   const programName=p?.name||data.program;

   const campaign=[];
   new URLSearchParams(location.search).forEach((v,k)=>{
    if(/^utm_(source|medium|campaign|term|content)$/.test(k))campaign.push(k+': '+v.slice(0,200));
   });

   const text=[
    'Hello JavaWallah! I am interested in your program.',
    '',
    'Name: '+cleanText(data.name),
    'Phone: '+cleanText(data.phone),
    'Email: '+cleanText(data.email),
    'Program: '+cleanText(programName),
    'Learning Mode: '+cleanText(data.mode),
    'Education: '+cleanText(data.education),
    'Message: '+cleanText(data.message)
   ];

   if(campaign.length) text.push('',...campaign);

   const wa=String(c.contact.whatsapp||'').replace(/\D/g,'');
   if(!wa){
    throw new Error('WhatsApp number is not configured.');
   }

   const whatsappUrl='https://wa.me/'+wa+'?text='+encodeURIComponent(text.join('\n'));
   // Meta Lead records a validated enquiry-form completion / WhatsApp handoff.
   // It does not confirm that the visitor sent the WhatsApp message.
   if(typeof window.fbq==='function'){
    window.fbq('track','Lead');
   }
   setStatus('Opening WhatsApp with your enquiry…');

   // Give the Meta Pixel request a brief opportunity to leave the browser
   // before navigating to WhatsApp. This is a form-to-WhatsApp handoff signal,
   // not confirmation that the WhatsApp message was sent.
   window.setTimeout(()=>{
    window.location.href=whatsappUrl;
   }, 700);
  }catch(error){
   setStatus('We could not open WhatsApp. Please try again or contact us directly.',true);
   button.disabled=false;
   button.innerHTML=label;
  }
 });

 form.elements.phone.addEventListener('input',()=>form.elements.phone.setCustomValidity(''));
})();
