(function(root){
 'use strict';
 function paddleTotals(data){
  if(!data||data.app!=='PaddleTrack'||data.schemaVersion!==1||!Array.isArray(data.seasons)||!Number.isFinite(data.exportedAtMs)||data.exportedAtMs<=0||data.exportedAtMs>8640000000000000)throw Error('Import a current PaddleTrack web sync file first.');
  const seen=new Map();
  for(const season of data.seasons){
   if(!Array.isArray(season.workouts))throw Error('A season is missing its workouts.');
   for(const w of season.workouts){
    if(!w||!['string','number'].includes(typeof w.id)||!String(w.id).trim()||!Number.isFinite(w.start)||!Number.isFinite(w.end)||w.end<w.start)throw Error('A workout has an invalid identifier or time.');
    const id=String(w.id),value=JSON.stringify([w.boat,w.start,w.end,w.km]);
    if(seen.has(id)){if(seen.get(id).value!==value)throw Error('A workout differs between seasons. Resolve it in PaddleTrack before sharing.');continue;}
    if(['OC1','OC6'].includes(w.boat)&&(typeof w.km!=='number'||!Number.isFinite(w.km)||w.km<0))throw Error('A classified paddle is missing valid kilometres.');
    seen.set(id,{value,boat:w.boat,km:w.km});
   }
  }
  const paddles=[...seen.values()].filter(w=>['OC1','OC6'].includes(w.boat));
  const km=paddles.reduce((s,w)=>s+w.km,0);if(!Number.isFinite(km))throw Error('Combined distance is invalid.');
  return {schema:1,generatedAt:new Date(data.exportedAtMs).toISOString(),count:paddles.length,km,coverage:'PaddleTrack snapshot · Combined OC1 + OC6 across all exported seasons. REVIEW and excluded workouts are omitted. Repeated workout IDs count once.'};
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={paddleTotals};else root.paddleTotals=paddleTotals;
})(typeof window!=='undefined'?window:globalThis);