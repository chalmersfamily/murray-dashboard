'use strict';
(()=>{
 const origin='https://chalmersfamily.github.io',channel='murray-paddle-totals-v1';
 const status=document.getElementById('status'),button=document.getElementById('share');let requestId=null,transfer=null;
 function finish(){if(transfer)clearInterval(transfer.timer);transfer=null;}
 window.addEventListener('message',event=>{const m=event.data;
  if(event.origin!==origin||!window.opener||event.source!==window.opener||m?.channel!==channel||typeof m.requestId!=='string'||!/^[a-f0-9-]{36}$/.test(m.requestId))return;
  if(m.type==='received'&&transfer&&m.requestId===transfer.requestId){
   const summary=transfer.summary;finish();button.disabled=true;
   status.textContent='Dashboard confirmed receipt: '+summary.count+' paddles · '+summary.km.toLocaleString(undefined,{maximumFractionDigits:2})+' km combined OC1 + OC6. Return to your Dashboard.';return;
  }
  if(m.type!=='ping'||requestId===m.requestId)return;
  finish();requestId=m.requestId;button.disabled=false;status.textContent='Dashboard connected. Share your imported snapshot when ready.';
 });
 button.onclick=()=>{if(!requestId||!window.opener||transfer)return;try{
  const raw=localStorage.getItem('paddletrack_web_snapshot_v1');
  const summary=window.paddleTotals(raw?JSON.parse(raw):null);
  const message={channel,type:'totals',requestId,summary},started=Date.now();
  button.disabled=true;
  status.textContent='Sending '+summary.count+' paddles · '+summary.km.toLocaleString(undefined,{maximumFractionDigits:2})+' km. Waiting for Dashboard confirmation…';
  const timer=setInterval(()=>{
   if(window.opener.closed||Date.now()-started>10000){finish();button.disabled=false;status.textContent='Dashboard did not confirm receipt. Close this window, return to the Dashboard, and click Connect PaddleTrack again. Your snapshot is unchanged.';return;}
   window.opener.postMessage(message,origin);
  },1000);
  transfer={timer,requestId,summary};window.opener.postMessage(message,origin);
 }catch(e){status.textContent=e.message||'Could not read your PaddleTrack snapshot.';}};
})();