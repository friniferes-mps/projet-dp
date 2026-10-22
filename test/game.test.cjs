const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createEngine } = require('../lib/game.cjs');

const origin = 'https://example.netlify.app';
const post = (engine, route, data = {}) => engine.handle('POST', '/api/' + route, data);
const state = async engine => (await engine.handle('GET', '/api/state')).payload;

test('session survives independent requests and keeps presenter access private', async () => {
  let engine = createEngine(null, origin);
  const created = await post(engine, 'create');
  assert.equal(created.status, 200);
  const saved = JSON.parse(JSON.stringify(engine.getGame()));
  engine = createEngine(saved, origin);
  assert.equal((await post(engine, 'verify', { token: created.payload.token })).status, 200);
  assert.equal((await post(engine, 'host-notes', { token: 'invalid' })).status, 403);
  const visible = await state(engine);
  assert.equal(visible.joinBase, origin);
  assert.equal(visible.hostToken, undefined);
  assert.equal(visible.missions[0].correct, undefined);
  assert.equal((await post(engine, 'create')).status, 409);
});

test('voting closes correctly, hides results, and awards points once per round', async () => {
  const engine = createEngine(null, origin);
  const { payload: session } = await post(engine, 'create');
  const { payload: player } = await post(engine, 'join', { code: session.code, team: 0 });
  const command = (action, extras = {}) => post(engine, 'host', { token: session.token, action, ...extras });
  assert.equal((await post(engine, 'vote', { id: player.id, choice: 1 })).status, 400);
  await command('timer', { seconds: 45 });
  assert.equal((await post(engine, 'vote', { id: player.id, choice: 1 })).status, 200);
  assert.equal((await post(engine, 'vote', { id: player.id, choice: 1 })).status, 400);
  assert.equal((await state(engine)).counts, null);
  await command('reveal');
  assert.deepEqual((await state(engine)).counts, [0, 1, 0]);
  assert.equal((await command('awardAll')).status, 200);
  assert.equal((await command('awardAll')).status, 400);
  assert.equal((await state(engine)).teams[0].score, 100);
});

test('expired timers reveal on the next request and team capacity is enforced', async () => {
  let engine = createEngine(null, origin);
  const { payload: session } = await post(engine, 'create');
  for (let i = 0; i < 8; i++) assert.equal((await post(engine, 'join', { code: session.code, team: 0 })).status, 200);
  assert.equal((await post(engine, 'join', { code: session.code, team: 0 })).status, 400);
  const saved = engine.getGame();
  saved.stage = 'mission';
  saved.endsAt = Date.now() - 1000;
  engine = createEngine(saved, origin);
  assert.equal((await state(engine)).revealed, true);
});
