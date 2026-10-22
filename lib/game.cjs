'use strict';
const crypto=require('node:crypto');
const presenterGuides=require('../presenter-guides.json');
const missions=[
  {
    "title": "Message laissé en vu",
    "category": "AMITIÉ ET INTERPRÉTATION",
    "story": "Tu envoies un message important. Ton ami l’a lu, mais ne répond pas depuis trois heures. Quelle réaction est la plus constructive ?",
    "choices": [
      "Lui envoyer dix messages accusateurs.",
      "Vérifier les faits, éviter de conclure trop vite et lui laisser du temps.",
      "Décider immédiatement qu’il ne t’apprécie plus."
    ],
    "correct": 1,
    "lesson": "Ne pas confondre interprétation et réalité. L’absence de réponse ne dit pas à elle seule ce que pense l’autre.",
    "concept": "Biais d’interprétation",
    "discussion": "Qui a déjà inventé tout un scénario après un « vu » ?",
    "speaker": "Fares",
    "ask": "Faites lever la main à ceux qui ont déjà vécu cette situation.",
    "explain": "Fares : Ce qui nous fait réagir n’est pas toujours le fait lui-même, mais son interprétation. Ici, le seul fait certain est : le message a été lu. Imaginer que l’autre nous rejette est une hypothèse. Mahmoud : En psychologie, on parle de réévaluation cognitive : envisager plusieurs interprétations possibles avant de décider comment agir. Cela n’interdit pas d’exprimer un besoin ; cela évite de transformer une supposition en accusation. Méthode à enseigner : Réévaluation cognitive. Conseil concret : Distinguez ce que vous savez de ce que vous supposez. Posez une question calme plutôt que d’accuser. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez une autre explication possible au silence.",
    "hostLine": "Un « vu » n’est pas un rapport d’enquête.",
    "tip": "Réponse recommandée : B — Vérifier les faits, éviter de conclure trop vite et lui laisser du temps."
  },
  {
    "title": "Le conducteur pressé",
    "category": "COLÈRE ET CONTRÔLE",
    "story": "Dans un embouteillage, un conducteur te coupe brusquement la route. Tu sens la colère monter. Que peux-tu réellement contrôler ?",
    "choices": [
      "Le comportement de tous les conducteurs.",
      "La circulation entière.",
      "Ta distance de sécurité, ta respiration et ta propre réaction."
    ],
    "correct": 2,
    "lesson": "On ne contrôle pas toujours la situation, mais on peut choisir des comportements qui réduisent le risque.",
    "concept": "Cercle de contrôle",
    "discussion": "Est-ce que répondre à la colère par la colère améliore la sécurité ?",
    "speaker": "Mahmoud",
    "ask": "Demandez une réaction spontanée, puis une réaction réfléchie.",
    "explain": "Fares : Un conducteur vient de nous couper la route : la colère est compréhensible. Mais elle ne nous donne pas le contrôle de la circulation. Mahmoud : Il est utile de distinguer ce qui dépend de nous — distance de sécurité, attention, respiration — de ce qui dépend des autres. Se concentrer sur nos actions réduit les risques et nous aide à éviter une escalade dangereuse. Méthode à enseigner : Cercle de contrôle. Conseil concret : Nommez une action qui dépend de vous. En conduite, gardez la distance et évitez toute confrontation. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez ce qui dépend réellement de nous.",
    "hostLine": "Le klaxon n’a pas encore débloqué un embouteillage.",
    "tip": "Réponse recommandée : C — Ta distance de sécurité, ta respiration et ta propre réaction."
  },
  {
    "title": "La critique en public",
    "category": "ÉMOTION ET RÉACTION",
    "story": "Un collègue critique ton idée devant tout le monde. Tu as chaud au visage et envie de répliquer. Que fais-tu ?",
    "choices": [
      "Répondre immédiatement par une attaque personnelle.",
      "Nommer intérieurement la colère et demander un exemple concret calmement.",
      "Garder rancune sans jamais en parler."
    ],
    "correct": 1,
    "lesson": "Une émotion est un signal ; une réaction est un comportement. Les deux ne sont pas identiques.",
    "concept": "Régulation émotionnelle",
    "discussion": "Peut-on défendre son point de vue sans devenir agressif ?",
    "speaker": "Fares",
    "ask": "Faites jouer deux réponses : impulsive puis assertive.",
    "explain": "Fares : Rester calme ne veut pas dire accepter le manque de respect. On peut être très en colère et poser une limite claire. Mahmoud : Une émotion est une expérience intérieure ; l’agressivité est un comportement. Prendre quelques secondes puis dire « Je ne suis pas d’accord, parlons-en calmement » permet de défendre sa position sans alimenter le conflit. Méthode à enseigner : Communication assertive. Conseil concret : Utilisez une phrase en « je » : « Je me sens contrarié, peux-tu préciser ce que tu reproches ? » Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez une phrase assertive au public.",
    "hostLine": "Le micro est pour parler, pas pour lancer des missiles.",
    "tip": "Réponse recommandée : B — Nommer intérieurement la colère et demander un exemple concret calmement."
  },
  {
    "title": "Le match décisif",
    "category": "STRESS UTILE OU NUISIBILE",
    "story": "Avant un match important, ton cœur bat plus vite et tu es très concentré. Que peut signifier ce stress ?",
    "choices": [
      "Il est toujours dangereux.",
      "Il peut mobiliser ton attention, mais devenir gênant s’il est trop intense.",
      "Il prouve que tu vas perdre."
    ],
    "correct": 1,
    "lesson": "Le stress est une réaction d’adaptation. Selon son intensité, sa durée et le contexte, il peut aider ou gêner.",
    "concept": "Stress et performance",
    "discussion": "Vous êtes plutôt « concentré » ou « paniqué » avant un match ?",
    "speaker": "Mahmoud",
    "ask": "Demandez à la classe un exemple de stress qui motive.",
    "explain": "Fares : Avant un match décisif, un certain niveau de tension peut aider à se mobiliser. Le corps prépare une action. Mahmoud : Le stress n’est pas toujours négatif : l’activation peut favoriser la vigilance, mais lorsqu’elle devient trop intense, elle peut perturber l’attention. La préparation, la respiration et les routines simples aident à retrouver un niveau d’activation plus gérable. Méthode à enseigner : Préparation et routine. Conseil concret : Préparez une première action concrète et adoptez une respiration confortable avant de commencer. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Faites distinguer stress ponctuel et stress chronique.",
    "hostLine": "Même les champions ont le trac. La différence, c’est leur préparation.",
    "tip": "Réponse recommandée : B — Il peut mobiliser ton attention, mais devenir gênant s’il est trop intense."
  },
  {
    "title": "Une mauvaise nouvelle",
    "category": "CONSCIENCE DES ÉMOTIONS",
    "story": "Tu apprends qu’un projet important est annulé. Tu dis « ça va », mais tu n’arrives plus à te concentrer. Quelle explication est plausible ?",
    "choices": [
      "On peut ressentir une émotion sans l’identifier immédiatement.",
      "Si on dit « ça va », aucune émotion n’existe.",
      "Les émotions se voient toujours de l’extérieur."
    ],
    "correct": 0,
    "lesson": "Reconnaître ses émotions peut prendre du temps. Les indices corporels, les pensées et les comportements peuvent aider.",
    "concept": "Conscience émotionnelle",
    "discussion": "Comment votre corps vous avertit-il que quelque chose ne va pas ?",
    "speaker": "Fares",
    "ask": "Invitez deux personnes à citer un signe physique, sans parler de leur vie privée.",
    "explain": "Fares : Recevoir une mauvaise nouvelle peut provoquer plusieurs émotions à la fois : tristesse, peur, colère, confusion. Ce n’est pas contradictoire. Mahmoud : Nommer ce que l’on ressent permet de mieux comprendre son besoin du moment. On peut dire « je suis inquiet et déçu » plutôt que de prétendre que tout va bien. Il n’existe pas une réaction émotionnelle obligatoire. Méthode à enseigner : Écoute active. Conseil concret : Écoutez, reformulez ce que l’autre ressent et demandez ce dont il a besoin, sans chercher à tout résoudre. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez de distinguer fatigue et colère.",
    "hostLine": "« Ça va » est parfois le résumé le plus optimiste de la journée.",
    "tip": "Réponse recommandée : A — On peut ressentir une émotion sans l’identifier immédiatement."
  },
  {
    "title": "Deux amis, une soirée",
    "category": "RÉACTIONS DIFFÉRENTES",
    "story": "Deux amis sont invités à parler devant 40 personnes. L’un est enthousiaste, l’autre angoissé. Pourquoi ?",
    "choices": [
      "Parce que l’un est forcément plus intelligent.",
      "Parce qu’ils devraient ressentir la même chose.",
      "Parce que leurs expériences, ressources et interprétations diffèrent."
    ],
    "correct": 2,
    "lesson": "La perception d’une situation dépend du vécu, du contexte et du sentiment de pouvoir y faire face.",
    "concept": "Différences individuelles",
    "discussion": "Quelle situation vous stimule mais stresse quelqu’un d’autre ?",
    "speaker": "Mahmoud",
    "ask": "Demandez deux interprétations possibles du même événement.",
    "explain": "Fares : Deux personnes peuvent vivre la même soirée et ressentir des choses très différentes. L’une se sent stimulée ; l’autre se sent dépassée. Mahmoud : Nos expériences passées, nos attentes, notre fatigue et notre personnalité influencent la manière dont nous évaluons une situation. Avant de juger la réaction d’autrui, essayons de comprendre ce qu’il vit. Méthode à enseigner : Pause avant réponse. Conseil concret : Éloignez-vous brièvement si nécessaire, nommez l’émotion et reprenez la conversation plus tard. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Reliez la réponse à l’empathie.",
    "hostLine": "Même événement, deux cerveaux, deux bandes-annonces.",
    "tip": "Réponse recommandée : C — Parce que leurs expériences, ressources et interprétations diffèrent."
  },
  {
    "title": "Le conflit familial",
    "category": "ÉCOUTE ET EMPATHIE",
    "story": "Un membre de ta famille est très contrarié et parle fort. Quelle réponse peut désamorcer le conflit ?",
    "choices": [
      "Lui dire « arrête de dramatiser ».",
      "Écouter, reformuler son ressenti et proposer de reparler calmement.",
      "Monter le ton pour avoir le dernier mot."
    ],
    "correct": 1,
    "lesson": "L’empathie reconnaît le ressenti de l’autre sans obliger à accepter des paroles blessantes.",
    "concept": "Empathie et limites",
    "discussion": "Quelle phrase montre de l’écoute sans donner forcément raison ?",
    "speaker": "Fares",
    "ask": "Proposez la phrase « Je vois que tu es contrarié ; parlons-en calmement ».",
    "explain": "Fares : Dans un conflit familial, écouter l’autre ne signifie pas lui donner raison. On peut comprendre sa frustration tout en gardant nos limites. Mahmoud : L’empathie consiste à essayer de comprendre le ressenti de l’autre. Une phrase utile est : « Je vois que tu es en colère. Je veux t’écouter, mais pas si nous nous insultons. » C’est à la fois respectueux et ferme. Méthode à enseigner : Interprétation alternative. Conseil concret : Cherchez au moins deux explications possibles avant de réagir à chaud. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez une reformulation au public.",
    "hostLine": "« Calme-toi » n’a jamais été un bouton magique.",
    "tip": "Réponse recommandée : B — Écouter, reformuler son ressenti et proposer de reparler calmement."
  },
  {
    "title": "L’entretien d’embauche",
    "category": "OUTILS ANTI-STRESS",
    "story": "Tu attends ton premier entretien. Tes mains tremblent et tu crains de perdre tes moyens. Quelle stratégie essayer ?",
    "choices": [
      "Te répéter que tu vas échouer.",
      "Respirer confortablement, préparer ta première phrase et te concentrer sur une étape.",
      "T’interdire d’être nerveux."
    ],
    "correct": 1,
    "lesson": "Une respiration douce, une préparation concrète et une attention portée à la prochaine action peuvent aider à gérer le trac.",
    "concept": "Respiration et préparation",
    "discussion": "Quelle est votre première technique avant un moment important ?",
    "speaker": "Mahmoud",
    "ask": "Faites une démonstration de deux respirations lentes, sans forcer.",
    "explain": "Fares : Avoir le cœur qui bat avant un entretien n’est pas la preuve qu’on va échouer. C’est un signe que la situation compte pour nous. Mahmoud : Préparer quelques exemples, ralentir légèrement l’expiration et se concentrer sur la première question sont des stratégies concrètes. L’objectif n’est pas de supprimer toutes les sensations, mais de rester capable d’agir malgré elles. Méthode à enseigner : Ancrage dans le présent. Conseil concret : Observez vos appuis au sol et décrivez calmement ce que vous percevez autour de vous. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez un premier pas réaliste.",
    "hostLine": "Le cerveau ouvre 18 onglets ; commençons par en fermer quelques-uns.",
    "tip": "Réponse recommandée : B — Respirer confortablement, préparer ta première phrase et te concentrer sur une étape."
  },
  {
    "title": "La défaite de ton équipe",
    "category": "ÉMOTION, SENTIMENT, COMPORTEMENT",
    "story": "Ton équipe perd en finale. Tu ressens une déception immédiate, tu restes triste ensuite, puis tu félicites l’adversaire. Quelle est la réaction observable ?",
    "choices": [
      "La déception initiale.",
      "La tristesse ressentie après le match.",
      "Féliciter l’adversaire."
    ],
    "correct": 2,
    "lesson": "L’émotion est vécue, le sentiment est l’expérience affective consciente, et la réaction correspond à ce qu’on fait ou exprime.",
    "concept": "Émotion / sentiment / réaction",
    "discussion": "Peut-on être déçu et se comporter avec respect ?",
    "speaker": "Fares",
    "ask": "Faites identifier les trois éléments un par un.",
    "explain": "Fares : Une défaite peut provoquer une colère immédiate, puis une déception plus durable. Ces deux expériences ne sont pas exactement la même chose. Mahmoud : L’émotion est souvent une réaction relativement brève ; un sentiment peut durer davantage ; la réaction est ce que nous faisons. On peut être déçu, ressentir de la colère et choisir malgré tout de féliciter l’adversaire. Méthode à enseigner : Résilience. Conseil concret : Choisissez un petit pas réalisable, sollicitez du soutien et ajustez votre stratégie si elle ne marche pas. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez un exemple d’émotion différente de la réaction.",
    "hostLine": "La défaite est réelle ; la dignité est optionnelle… et recommandée.",
    "tip": "Réponse recommandée : C — Féliciter l’adversaire."
  },
  {
    "title": "L’ami en difficulté",
    "category": "SOUTIEN ET RÉSILIENCE",
    "story": "Ton ami traverse une période difficile et te dit qu’il n’en peut plus. Quelle réaction est la plus adaptée ?",
    "choices": [
      "Minimiser : « il y a pire ».",
      "L’écouter sans jugement, demander ce dont il a besoin et encourager une aide adaptée.",
      "Changer de sujet immédiatement."
    ],
    "correct": 1,
    "lesson": "L’écoute, la validation du ressenti et l’orientation vers un soutien approprié peuvent être utiles.",
    "concept": "Soutien social et résilience",
    "discussion": "Comment aider sans prétendre tout résoudre ?",
    "speaker": "Mahmoud",
    "ask": "Rappelez qu’on peut soutenir sans devenir thérapeute.",
    "explain": "Fares : Quand un ami va mal, nous n’avons pas toujours besoin de lui donner immédiatement une solution. Parfois, il a d’abord besoin d’être entendu. Mahmoud : Écouter sans juger, demander « tu veux que je t’écoute ou qu’on cherche une solution ? » et encourager une aide adaptée si la difficulté persiste sont des formes de soutien. La résilience n’est pas l’obligation de tout affronter seul. Méthode à enseigner : Reconnaissance des émotions. Conseil concret : Identifiez la sensation physique, nommez l’émotion puis choisissez une réponse adaptée. Demandez à un étudiant de reformuler la méthode avec ses mots, puis donnez un exemple où elle serait utile. Attention : une stratégie peut dépendre du contexte ; le quiz propose une réponse constructive, pas une règle universelle.",
    "followup": "Demandez une phrase bienveillante.",
    "hostLine": "Parfois, le meilleur conseil commence par une vraie écoute.",
    "tip": "Réponse recommandée : B — L’écouter sans jugement, demander ce dont il a besoin et encourager une aide adaptée."
  }
];
const teamDefs=[['CALM','Sang-froid'],['FOCUS','Concentration'],['ADAPT','Adaptabilité'],['BALANCE','Équilibre'],['RESOLVE','Résilience']];

function createEngine(saved,origin){
let game=saved||{code:'',hostToken:'',stage:'welcome',mission:0,endsAt:null,teams:teamDefs.map(([name,tag],id)=>({id,name,tag,score:0})),participants:{},votes:{},revealed:false,round:0,createdAt:Date.now(),autoReveal:true,rehearsal:false};
function publicState(){let counts=[0,0,0],total=0;Object.values(game.votes).forEach(v=>{counts[v.choice]++;total++});return {joinBase:origin,liveVotes:Object.keys(game.votes).length,code:game.code,stage:game.stage,mission:game.mission,endsAt:game.endsAt,autoReveal:game.autoReveal,rehearsal:game.rehearsal,teams:game.teams,participantsCount:Object.keys(game.participants).length,teamCounts:game.teams.map(t=>Object.values(game.participants).filter(p=>p.team===t.id).length),counts:game.revealed?counts:null,total:game.revealed?total:null,revealed:game.revealed,round:game.round,missions:missions.map(({title,category,story,choices,concept,hostLine,discussion},i)=>({title,category,story,choices,concept,hostLine,discussion,correct:game.revealed&&game.mission===i?missions[i].correct:undefined,lesson:game.revealed&&game.mission===i?missions[i].lesson:undefined}))};}

function broadcast(){}
function send(res,status,payload){return {status,payload}}
function newGame(){game={code:String(crypto.randomInt(100000,1000000)),hostToken:crypto.randomBytes(24).toString('hex'),stage:'welcome',mission:0,endsAt:null,teams:teamDefs.map(([name,tag],id)=>({id,name,tag,score:0})),participants:{},votes:{},revealed:false,round:0,createdAt:Date.now(),autoReveal:true,rehearsal:false};broadcast()}
function host(req,b){return b.token===game.hostToken&&game.hostToken.length>0}
function fail(res,msg,status=400){return send(res,status,{error:msg})}

async function handle(method,pathname,data={}){
const req={method},res={},url={pathname};
const body=async()=>data;
if(game.stage==='mission'&&!game.revealed&&game.autoReveal&&game.endsAt&&Date.now()>=game.endsAt)game.revealed=true;
if(method==='GET'&&pathname==='/api/state')return send(res,200,publicState());
if(req.method==='POST'&&url.pathname==='/api/host-notes'){const b=await body(req);if(!host(req,b))return fail(res,'Accès présentateur refusé.',403);return send(res,200,{missions:missions.map(({speaker,ask,explain,followup,tip,hostLine},i)=>({speaker,ask,explain,followup,tip,hostLine,...presenterGuides[i]}))})}
if(req.method==='POST'&&url.pathname==='/api/verify'){const b=await body(req);return b.token===game.hostToken&&game.hostToken?send(res,200,{ok:true}):fail(res,'Session expirée',403)}
if(req.method==='POST'&&url.pathname==='/api/create'){if(game.code&&Date.now()-game.createdAt<3600000)return fail(res,'Une session active existe déjà. Ouvrez la régie existante ou attendez son expiration.',409);newGame();return send(res,200,{code:game.code,token:game.hostToken})}
if(req.method==='POST'&&url.pathname==='/api/host'){const b=await body(req);if(!host(req,b))return fail(res,'Accès présentateur refusé.',403);const a=b.action;
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
else return fail(res,'Action inconnue');broadcast();return send(res,200,{ok:true})}
if(req.method==='POST'&&url.pathname==='/api/join'){const b=await body(req);if(!game.code||b.code!==game.code)return fail(res,'Code de session incorrect',404);const team=Number(b.team);if(!Number.isInteger(team)||team<0||team>=5)return fail(res,'Équipe invalide');const existing=Object.values(game.participants).filter(p=>p.team===team).length;if(existing>=8)return fail(res,'Équipe complète');const id=crypto.randomBytes(16).toString('hex');game.participants[id]={team,joined:Date.now()};broadcast();return send(res,200,{id,team})}
if(req.method==='POST'&&url.pathname==='/api/vote'){const b=await body(req),p=game.participants[b.id];if(!p)return fail(res,'Rejoignez une équipe',403);if(game.rehearsal||game.stage!=='mission'||game.revealed||!game.endsAt||Date.now()>game.endsAt)return fail(res,'Vote fermé');const choice=Number(b.choice);if(!Number.isInteger(choice)||choice<0||choice>=missions[game.mission].choices.length)return fail(res,'Choix invalide');if(Object.hasOwn(game.votes,b.id))return fail(res,'Vote déjà enregistré');game.votes[b.id]={team:p.team,choice};broadcast();return send(res,200,{ok:true})}

return fail(res,'Route inconnue',404);
}
return {handle,getGame:()=>game};
}
module.exports={createEngine};
