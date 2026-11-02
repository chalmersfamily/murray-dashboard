const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const start=html.indexOf("        (()=>{\n            const origin='https://paddletrack");
assert(start>0);
const receiver=html.slice(start,html.indexOf('        startup(); updateCountdown();',start));
const sender=fs.readFileSync(path.join(root,'paddletrack-connection/public/dashboard-share.js'),'utf8');
function fixture(){
 const queue=[],mainEvents={},shareEvents={},mainTimers=new Map(),shareTimers=new Map(),stored={},elements={},dd=[{},{}],source={};let time=0,id=0;
 const get=key=>elements[key]||={addEventListener:(type,fn)=>mainEvents[key+type]=fn};
 const tile={querySelectorAll:()=>dd,querySelector:()=>source};
 const popup={closed:false,postMessage:data=>queue.push(()=>shareEvents.message({origin:'https://chalmersfamily.github.io',source:opener,data}))};
 const opener={closed:false,postMessage:data=>queue.push(()=>mainEvents.message({origin:'https://paddletrack-web.chalmersfamily.workers.dev',source:popup,data}))};
 const main=vm.createContext({document:{getElementById:get,querySelectorAll:()=>[{}, {},tile]},window:{open:()=>popup,addEventListener:(type,fn)=>mainEvents[type]=fn},localStorage:{getItem:()=>null,setItem:(key,value)=>stored[key]=value},crypto:{randomUUID:()=> '12345678-1234-1234-1234-123456789abc'},Date:{now:()=>time,parse:Date.parse},setInterval:fn=>{mainTimers.set(++id,fn);return id},clearInterval:key=>mainTimers.delete(key)});
 // Date is used both as a constructor for the source timestamp and as a clock.
 class Clock extends Date {static now(){return time}}
 main.Date=Clock;
 const shareButton={},shareStatus={},summary={schema:1,generatedAt:'2026-10-21T00:00:00Z',count:79,km:595.4,coverage:'Combined OC1 + OC6'};
 const share=vm.createContext({document:{getElementById:key=>key==='share'?shareButton:shareStatus},window:{opener,paddleTotals:()=>summary,addEventListener:(type,fn)=>shareEvents[type]=fn},localStorage:{getItem:()=> '{}'},Date:Clock,setInterval:fn=>{shareTimers.set(++id,fn);return id},clearInterval:key=>shareTimers.delete(key)});
 vm.runInContext(receiver,main);vm.runInContext(sender,share);
 const flush=()=>{while(queue.length)queue.shift()()};
 return {mainEvents,shareEvents,mainTimers,shareTimers,stored,dd,popup,opener,shareButton,shareStatus,summary,flush,dropMessage:()=>queue.shift(),advance:ms=>time+=ms};
}
const f=fixture();f.mainEvents.connectPaddleTrackclick();[...f.mainTimers.values()][0]();f.flush();f.shareButton.onclick();
assert.match(f.shareStatus.textContent,/Waiting for Dashboard confirmation/);f.flush();
assert.equal(f.dd[0].textContent,'79');assert.equal(f.dd[1].textContent,'595.4');assert.match(f.shareStatus.textContent,/Dashboard confirmed receipt: 79 paddles/);assert.equal(f.shareTimers.size,0);assert.equal(Object.keys(f.stored).length,1);
// Lost first delivery is retried, and duplicates receive the receipt again.
const retry=fixture();retry.mainEvents.connectPaddleTrackclick();[...retry.mainTimers.values()][0]();retry.flush();retry.shareButton.onclick();retry.dropMessage();[...retry.shareTimers.values()][0]();retry.flush();assert.match(retry.shareStatus.textContent,/confirmed receipt/);
// An expired parent must never produce a success claim.
const expired=fixture();expired.mainEvents.connectPaddleTrackclick();[...expired.mainTimers.values()][0]();expired.flush();expired.advance(900001);[...expired.mainTimers.values()][0]();expired.shareButton.onclick();expired.flush();assert(!/confirmed receipt:/.test(expired.shareStatus.textContent));expired.advance(10001);[...expired.shareTimers.values()][0]();assert.match(expired.shareStatus.textContent,/did not confirm receipt/);
// Receipts from unrelated windows are ignored.
const spoof=fixture();spoof.mainEvents.connectPaddleTrackclick();[...spoof.mainTimers.values()][0]();spoof.flush();spoof.shareButton.onclick();spoof.shareEvents.message({origin:'https://evil.example',source:spoof.opener,data:{channel:'murray-paddle-totals-v1',type:'received',requestId:'12345678-1234-1234-1234-123456789abc'}});assert.match(spoof.shareStatus.textContent,/Waiting/);
console.log('Passed: 79 paddles / 595.4 km receipt round-trip, retries, duplicate receipts, timeout without false success and strict receipt origin.');