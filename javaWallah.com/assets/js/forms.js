(() => {
 'use strict';
 const form=document.querySelector('.enquiry-form');if(!form)return;
 const status=form.querySelector('.form-status'),button=form.querySelector('.form-submit');
 const cleanText=value=>String(value||'').replace(/[\r\n]/g,' ').trim();
 const setStatus=(message,error=false)=>{status.replaceChildren();status.textContent=message;status.style.color=error?'#a03434':'#315b54';};
 const createLink=(href,label)=>{const a=document.createElement('a');a.href=href;a.className='btn btn-outline-primary';a.textContent=label;status.append(document.createElement('br'),a);};
 const configReady=window.jwConfig;
 configReady.then(c=>{
  const endpoint=c.forms.endpoint;
  const connected=window.jwValidURL(endpoint);
  if(connected){button.textContent='Send enquiry';form.querySelector('.form-note').textContent='Your details will be sent to our configured enquiry service so our team can respond.';}
  function modes(){const p=c.programs.find(p=>p.id===form.elements.program.value);const online=form.elements.mode.querySelector('option[value="Online"]') || [...form.elements.mode.options].find(o=>o.value==='Online');if(online){online.disabled=!!p && p.type==='course';if(online.disabled && form.elements.mode.value==='Online')form.elements.mode.value='Offline';}if(p?.type==='course')form.elements.mode.value='Offline';}
  modes();form.elements.program.addEventListener('change',modes);
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  form.elements.name.value=form.elements.name.value.trim();
  const digits=form.elements.phone.value.replace(/\D/g,'');
  form.elements.phone.setCustomValidity(digits.length>=10 && digits.length<=15?'':'Enter 10 to 15 digits.');
  form.classList.add('was-validated');
  if(!form.checkValidity()){setStatus('Please check the highlighted fields.',true);form.querySelector(':invalid')?.focus();return;}
  button.disabled=true;const label=button.textContent;button.textContent='Preparing…';setStatus('Preparing your enquiry…');
  const c=await configReady;
  const data=Object.fromEntries(new FormData(form));data.consent=true;
  const p=c.programs.find(p=>p.id===data.program);data.programName=p?.name||data.program;
  data.campaign={};new URLSearchParams(location.search).forEach((v,k)=>{if(/^utm_(source|medium|campaign|term|content)$/.test(k))data.campaign[k]=v.slice(0,200);});
  function emailFallback(){
   const email=c.contact.email;const text=['Name: '+cleanText(data.name),'Phone: '+cleanText(data.phone),'Email: '+cleanText(data.email),'Program: '+data.programName,'Mode: '+data.mode,'Education: '+data.education,'Message: '+data.message,...Object.entries(data.campaign).map(([k,v])=>k+': '+v)].join('\n');
   if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))createLink('mailto:'+email+'?subject='+encodeURIComponent('Program enquiry: '+data.programName)+'&body='+encodeURIComponent(text),'Open email draft');
   const wa=String(c.contact.whatsapp||'').replace(/\D/g,'');if(wa.length>=10 && wa.length<=15)createLink('https://wa.me/'+wa+'?text='+encodeURIComponent(text),'Review enquiry in WhatsApp');
   if(!email && !wa)setStatus('Contact information is currently unavailable. Please try again later.',true);
  }
  if(!window.jwValidURL(c.forms.endpoint)){
   setStatus('Your enquiry draft is ready. Nothing has been sent. Open your email app, review the message and send it to our team.');emailFallback();button.disabled=false;button.textContent=label;return;
  }
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),c.forms.timeoutMs||15000);
  try{
   const response=await fetch(c.forms.endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data),signal:controller.signal});
   if(!response.ok)throw new Error('Submission unsuccessful');
   const result=await response.json();if(result.success!==true)throw new Error('No submission confirmation');
   setStatus('Your enquiry was received. Our team will respond using the contact details you provided.');form.reset();form.classList.remove('was-validated');form.elements.program.dispatchEvent(new Event('change'));
  }catch(error){setStatus('We could not confirm delivery. Please use the email option below or call our team. If a request reached the service before the connection failed, the team may already have it.',true);emailFallback();}
  finally{clearTimeout(timer);button.disabled=false;button.textContent=label;}
 });
 form.elements.phone.addEventListener('input',()=>form.elements.phone.setCustomValidity(''));
})();
