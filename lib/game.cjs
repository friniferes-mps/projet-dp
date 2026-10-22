const crypto=require('node:crypto');
const {missions,teamDefs}=require('./game-content.cjs');
const presenterGuides=require('../presenter-guides.json');
function initialGame(){return {code:'',hostToken:'',stage:'welcome',mission:0,endsAt:null,teams:teamDefs.map(([name,tag],id)=>({id,name,tag,score:0})),participants:{},votes:{},revealed:false,round:0,createdAt:Date.now(),autoReveal:true,rehearsal:false};
}
async function dispatch(game,method,pathname,payload={},origin=''){
const req={method},url={pathname},res={};
let result;
function send(res,status,data){result={status,data};}
function fail(res,error,status=400){send(res,status,{error});}
function host(req,b){return b.token===game.hostToken&&game.hostToken.length>0}
function publicState(){let counts=[0,0,0],total=0;Object.values(game.votes).forEach(v=>{counts[v.choice]++;total++});return {joinBase:origin,liveVotes:Object.keys(game.votes).length,code:game.code,stage:game.stage,mission:game.mission,endsAt:game.endsAt,autoReveal:game.autoReveal,rehearsal:game.rehearsal,teams:game.teams,participantsCount:Object.keys(game.participants).length,teamCounts:game.teams.map(t=>Object.values(game.participants).filter(p=>p.team===t.id).length),counts:game.revealed?counts:null,total:game.revealed?total:null,revealed:game.revealed,round:game.round,missions:missions.map(({title,category,story,choices,concept,hostLine,discussion},i)=>({title,category,story,choices,concept,hostLine,discussion,correct:game.revealed&&game.mission===i?missions[i].correct:undefined,lesson:game.revealed&&game.mission===i?missions[i].lesson:undefined}))};}
function newGame(){game={code:String(crypto.randomInt(100000,1000000)),hostToken:crypto.randomBytes(24).toString('hex'),stage:'welcome',mission:0,endsAt:null,teams:teamDefs.map(([name,tag],id)=>({id,name,tag,score:0})),participants:{},votes:{},revealed:false,round:0,createdAt:Date.now(),autoReveal:true,rehearsal:false};}

if(game.stage==='mission'&&!game.revealed&&game.autoReveal&&game.endsAt&&Date.now()>=game.endsAt)game.revealed=true;
async function route(){
if(method==='GET'&&pathname==='/api/state')return send(res,200,publicState());
if(req.method==='POST'&&url.pathname==='/api/host-notes'){const b=payload;if(!host(req,b))return fail(res,'Accès présentateur refusé.',403);return send(res,200,{missions:missions.map(({speaker,ask,explain,followup,tip,hostLine},i)=>({speaker,ask,explain,followup,tip,hostLine,...presenterGuides[i]}))})}
if(req.method==='POST'&&url.pathname==='/api/verify'){const b=payload;return b.token===game.hostToken&&game.hostToken?send(res,200,{ok:true}):fail(res,'Session expirée',403)}
if(req.method==='POST'&&url.pathname==='/api/create'){if(game.code&&Date.now()-game.createdAt<3600000)return fail(res,'Une session active existe déjà. Ouvrez la régie existante ou réessayez après une heure.',409);newGame();return send(res,200,{code:game.code,token:game.hostToken})}
if(req.method==='POST'&&url.pathname==='/api/host'){const b=payload;if(!host(req,b))return fail(res,'Accès présentateur refusé.',403);const a=b.action;
if(a==='stage'){if(!['welcome','intro','science','video','tiktok','rules','teams','mission','breathing','toolkit','ranking','challenge','final'].includes(b.stage))return fail(res,'Étape invalide');game.stage=b.stage;/* La manche commence uniquement après LANCER le chrono. */}
else if(a==='rehearsal'){game.rehearsal=Boolean(b.enabled);game.endsAt=null;game.revealed=false;game.votes={};game.round++;}
else if(a==='autoReveal'){game.autoReveal=Boolean(b.enabled)}
else if(a==='timer'){const seconds=Math.max(0,Math.min(180,Number(b.seconds)||0));game.endsAt=Date.now()+seconds*1000;game.revealed=false;game.stage='mission';game.votes={};game.round++}
else if(a==='reveal'){game.revealed=true;game.endsAt=Date.now()}
else if(a==='next'){if(game.mission===missions.length-1){game.stage='ranking';game.endsAt=null}else{game.mission++;game.round++;game.votes={};game.revealed=false;game.endsAt=null;game.stage='mission'}}
else if(a==='mission'){const n=Number(b.index);if(!Number.isInteger(n)||n<0||n>=missions.length)return fail(res,'Mission invalide');game.mission=n;game.round++;game.votes={};game.revealed=false;game.endsAt=null;game.stage='mission'}
else if(a==='awardAll'){if(game.rehearsal)return fail(res,'Points désactivés en répétition');if(!game.revealed)return fail(res,'Révélez la réponse avant les points');if(game.awardedRound===game.round)return fail(res,'Points déjà attribués pour cette manche');const c=missions[game.mission].correct;for(const t of game.teams){const votes=Object.values(game.votes).filter(v=>v.team===t.id);if(votes.length&&votes.filter(v=>v.choice===c).length>votes.length/2)t.score+=100}game.awardedRound=game.round}
else if(a==='award'){if(game.rehearsal)return fail(res,'Points désactivés en répétition');if(!game.revealed&&!['challenge','ranking'].includes(game.stage))return fail(res,'Révélez la réponse avant les points');const t=game.teams.find(x=>x.id===Number(b.team));if(!t)return fail(res,'Équipe invalide');t.score=Math.max(0,t.score+Math.max(-100,Math.min(100,Number(b.points)||0)))}
else if(a==='rename'){const t=game.teams.find(x=>x.id===Number(b.team));if(!t)return fail(res,'Équipe invalide');t.name=String(b.name||'').trim().slice(0,24)||t.name}
else return fail(res,'Action inconnue');return send(res,200,{ok:true})}
if(req.method==='POST'&&url.pathname==='/api/join'){const b=payload;if(!game.code||b.code!==game.code)return fail(res,'Code de session incorrect',404);const team=Number(b.team);if(!Number.isInteger(team)||team<0||team>=5)return fail(res,'Équipe invalide');const existing=Object.values(game.participants).filter(p=>p.team===team).length;if(existing>=8)return fail(res,'Équipe complète');const id=crypto.randomBytes(16).toString('hex');game.participants[id]={team,joined:Date.now()};return send(res,200,{id,team})}
if(req.method==='POST'&&url.pathname==='/api/vote'){const b=payload,p=game.participants[b.id];if(!p)return fail(res,'Rejoignez une équipe',403);if(game.rehearsal||game.stage!=='mission'||game.revealed||!game.endsAt||Date.now()>game.endsAt)return fail(res,'Vote fermé');const choice=Number(b.choice);if(!Number.isInteger(choice)||choice<0||choice>=missions[game.mission].choices.length)return fail(res,'Choix invalide');if(Object.hasOwn(game.votes,b.id))return fail(res,'Vote déjà enregistré');game.votes[b.id]={team:p.team,choice};return send(res,200,{ok:true})}

return fail(res,'Route inconnue',404);
}
await route();
return {...result,game};
}
module.exports={initialGame,dispatch};
