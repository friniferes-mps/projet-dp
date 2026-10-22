const {test}=require('node:test');
const assert=require('node:assert/strict');
const {initialGame,dispatch}=require('../lib/game.cjs');

test('session, authorization, votes, reveal and scoring survive serialized requests',async()=>{
  let game=initialGame();
  async function call(path,payload,method='POST'){
    const result=await dispatch(JSON.parse(JSON.stringify(game)),method,'/api/'+path,payload,'https://example.netlify.app');
    game=JSON.parse(JSON.stringify(result.game));
    return result;
  }
  let result=await call('state',{},'GET');
  assert.equal(result.data.missions.length,10);
  assert.equal(result.data.joinBase,'https://example.netlify.app');
  assert.equal(result.data.hostToken,undefined);
  const created=await call('create',{});
  assert.equal(created.status,200);
  const token=created.data.token;
  assert.equal((await call('create',{})).status,409);
  assert.equal((await call('host',{action:'timer',seconds:30})).status,403);
  assert.equal((await call('host-notes',{})).status,403);
  assert.equal((await call('host-notes',{token})).data.missions.length,10);
  assert.equal((await call('join',{code:'invalid',team:0})).status,404);
  const joined=await call('join',{code:game.code,team:0});
  const id=joined.data.id;
  await call('host',{token,action:'timer',seconds:30});
  assert.equal((await call('vote',{id,choice:1})).status,200);
  assert.equal((await call('vote',{id,choice:1})).status,400);
  result=await call('state',{},'GET');
  assert.equal(result.data.counts,null);
  assert.equal(result.data.missions[0].correct,undefined);
  assert.equal(result.data.participantsCount,1);
  game.endsAt=Date.now()-100;
  result=await call('state',{},'GET');
  assert.equal(result.data.revealed,true);
  assert.deepEqual(result.data.counts,[0,1,0]);
  assert.equal(result.data.missions[0].correct,1);
  await call('host',{token,action:'awardAll'});
  assert.equal(game.teams[0].score,100);
  assert.equal((await call('host',{token,action:'awardAll'})).status,400);
  assert.equal((await call('vote',{id,choice:0})).status,400);
});

test('team capacity is enforced',async()=>{
  let {game}=await dispatch(initialGame(),'POST','/api/create');
  for(let i=0;i<8;i++){
    const result=await dispatch(game,'POST','/api/join',{code:game.code,team:0});
    assert.equal(result.status,200); game=result.game;
  }
  assert.equal((await dispatch(game,'POST','/api/join',{code:game.code,team:0})).status,400);
});
