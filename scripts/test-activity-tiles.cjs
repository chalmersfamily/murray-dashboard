const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
for (const [, code] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(code);
const tiles = [...html.matchAll(/<article class="activity-tile">([\s\S]*?)<\/article>/g)].map(m => m[1]);
assert.equal(tiles.length, 7);
assert.deepEqual(tiles.map(t => /<h3>[^ ]+ (.*?)<\/h3>/.exec(t)[1]), ['Walks', 'Cycled', 'Paddled', 'Remy Walks', 'Skis', 'Rowing', 'Workouts']);
assert.equal(tiles.filter(t => t.includes('Total km')).length, 6);
assert(!tiles[6].includes('Total km'));
const code = html.slice(html.indexOf('async function refreshActivityTotals()'), html.indexOf("document.getElementById('refreshActivities').addEventListener"));
const elements = {};
const context = vm.createContext({document: {getElementById: id => elements[id] ||= {}}, AbortSignal, fetch: null});
vm.runInContext(code, context);
async function run(snapshot, ok = true) {
  context.fetch = async () => ({ok, json: async () => snapshot});
  await context.refreshActivityTotals();
  assert.equal(elements.refreshActivities.disabled, false);
}
(async () => {
  await run({walks: [{km: 1.5}, {km: 2.25}], generatedAt: '2026-11-02T10:00:00Z'});
  assert.equal(elements.remyTotalCount.textContent, '2');
  assert.equal(elements.remyTotalKm.textContent, '3.75');
  await run({walks: [], generatedAt: '2026-11-02T10:00:00Z'});
  assert.equal(elements.remyTotalCount.textContent, '0');
  for (const snapshot of [{}, {walks: [{km: -2}], generatedAt: '2026-11-02'}, {walks: [], generatedAt: 'bad'}]) {
    await run(snapshot);
    assert.equal(elements.remyTotalCount.textContent, '—');
  }
  await run({}, false);
  assert.equal(elements.remyTotalKm.textContent, '—');
  context.fetch = async () => {throw Error('Offline');};
  await context.refreshActivityTotals();
  assert.equal(elements.refreshActivities.disabled, false);
  assert.equal(elements.remyTotalCount.textContent, '—');
  console.log('Passed: seven tiles, workout count only, script syntax, Remy totals/empty/invalid/HTTP failure/offline.');
})().catch(e => {console.error(e); process.exitCode = 1;});