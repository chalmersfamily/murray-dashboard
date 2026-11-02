const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const start=html.indexOf('// WinterFit shares aggregate totals only');
const code=html.slice(start,html.indexOf('        (()=>{',start));
function fixture(blocked=false){
 const listeners={},elements={},tiles=Array.from({length:7},()=>{const dd=[{},{}],source={};return {dd,source,querySelectorAll:()=>dd,querySelector:()=>source};});
 const popup={closed:false,postMessage(){}},stored={};
 const get=id=>elements[id]||=( {addEventListener:(name,fn)=>listeners[id+name]=fn} );
 const ctx=vm.createContext({document:{getElementById:get,querySelectorAll:()=>tiles},window:{open:()=>blocked?null:popup,addEventListener:(name,fn)=>listeners[name]=fn},localStorage:{getItem:()=>null,setItem:(key,value)=>stored[key]=value},crypto:{randomUUID:()=> '12345678-1234-1234-1234-123456789abc'},setInterval:()=>1,clearInterval(){}});
 vm.runInContext(code,ctx);
 return {listeners,elements,tiles,popup,stored};
}
const summary={schema:1,generatedAt:'2026-11-02T10:00:00Z',coverage:'Saved records only',activities:Object.fromEntries(['walks','cycled','skis','rowing'].map(k=>[k,{count:2,km:1.5}]))};summary.activities.workouts={count:3};
const f=fixture();f.listeners.connectWinterFitclick();
const event={origin:'https://winter-fit.navybetta5.chatgpt.site',source:f.popup,data:{channel:'murray-fitness-totals-v1',type:'totals',requestId:'12345678-1234-1234-1234-123456789abc',summary}};
for(const spoof of [{...event,origin:'https://evil.example'},{...event,source:{}},{...event,data:{...event.data,requestId:'wrong'}}])f.listeners.message(spoof);
assert.equal(f.tiles[0].dd[0].textContent,undefined);
f.listeners.message(event);assert.equal(f.tiles[0].dd[0].textContent,'2');assert.equal(f.tiles[6].dd[0].textContent,'3');assert.equal(f.elements.connectWinterFit.disabled,false);assert.equal(Object.keys(f.stored).length,1);
const bad=fixture();bad.listeners.connectWinterFitclick();bad.listeners.message({...event,source:bad.popup,data:{...event.data,summary:{...summary,activities:{...summary.activities,walks:{count:-1,km:0}}}}});assert.equal(bad.tiles[0].dd[0].textContent,undefined);assert.equal(Object.keys(bad.stored).length,0);
const blocked=fixture(true);blocked.listeners.connectWinterFitclick();assert.match(blocked.elements.fitnessConnectionStatus.textContent,/Allow/);
console.log('Passed: popup blocking, strict origin/window/request matching, valid totals persistence and invalid totals rejection.');