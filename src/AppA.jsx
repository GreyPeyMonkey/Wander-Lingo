import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

import {
  VOCAB_L1, VOCAB_L2, VOCAB_L3, CORE_SETS,
  ALL_WORDS_L1, ALL_WORDS_L2, ALL_WORDS_L3, ALL_WORDS,
} from "./AppData1.jsx";

import {
  STORIES, shuffle, todayStr, AVATARS, PCOLORS, DS,
  LEVEL_REQUIREMENTS, getCatProgress, setCatProgress,
  canUnlockLevel, getLevelProgress, getCatStars,
  getSayItProgress, getNextSuggestedCat, isCatUnlocked,
  CONJ_PATTERNS, PRONOUNS, REGULAR_VERBS, IRREGULAR_VERBS, GRAMMAR_LESSONS,
} from "./AppData2.jsx";

const BADGE_DEF = {
  first_star: {icon:"🌟",name:"First Star",    desc:"Earned your first star!"},
  stars_50:   {icon:"⭐",name:"Star Collector",desc:"50 stars earned!"},
  stars_100:  {icon:"🏆",name:"Champion",      desc:"100 stars earned!"},
  stars_250:  {icon:"👑",name:"Royalty",        desc:"250 stars — amazing!"},
  streak_3:   {icon:"🔥",name:"On Fire!",       desc:"3-day streak!"},
  streak_7:   {icon:"💪",name:"Week Warrior",   desc:"7 days in a row!"},
  streak_14:  {icon:"🌋",name:"Legend",         desc:"14-day streak!"},
  quiz_10:    {icon:"🎯",name:"Quiz Master",    desc:"10 quiz answers right"},
  speak_5:    {icon:"🎤",name:"Speak Up!",      desc:"5 pronunciation tries"},
  explorer:   {icon:"🌍",name:"Explorer",       desc:"Played 3 categories"},
  match_win:  {icon:"🧩",name:"Match Maker",    desc:"Completed a match game"},
  daily_done: {icon:"📅",name:"Daily Hero",     desc:"Finished a Daily Challenge"},
  storyteller:{icon:"📖",name:"Storyteller",    desc:"Completed a full story!"},
  level2:     {icon:"🚀",name:"Level Up!",      desc:"Unlocked Intermediate level"},
};

const calcBadges = (p) => {
  const s = new Set(p.badges||[]);
  if((p.stars||0)>=1)              s.add("first_star");
  if((p.stars||0)>=50)             s.add("stars_50");
  if((p.stars||0)>=100)            s.add("stars_100");
  if((p.stars||0)>=250)            s.add("stars_250");
  if((p.streak||0)>=3)             s.add("streak_3");
  if((p.streak||0)>=7)             s.add("streak_7");
  if((p.streak||0)>=14)            s.add("streak_14");
  if((p.quizCorrect||0)>=10)       s.add("quiz_10");
  if((p.speakAttempts||0)>=5)      s.add("speak_5");
  if((p.catsPlayed||[]).length>=3) s.add("explorer");
  if((p.matchWins||0)>=1)          s.add("match_win");
  if((p.dailyDone||0)>=1)          s.add("daily_done");
  if((p.storiesRead||0)>=1)        s.add("storyteller");
  if((p.level||1)>=2)              s.add("level2");
  return [...s];
};

// ══ SUPABASE SETUP ════════════════════════════════════════════════════════════
// ⬇️  STEP 1: Paste your Supabase Project URL between the quotes below
const SUPABASE_URL = 'https://jlqrxshoilgmcfaitxta.supabase.co'
// ⬇️  STEP 2: Paste your Supabase anon/public key between the quotes below
const SUPABASE_KEY = 'sb_publishable_5ImngTBY4P21KP3bzBu75Q_FYgl4Pn9'

export const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// ══ FAMILY CODE HELPERS ═══════════════════════════════════════════════════════
export const makeCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const LS_FAMILY = 'wl_family_id';
export const getFamilyId = () => localStorage.getItem(LS_FAMILY);
const setFamilyId = (id) => localStorage.setItem(LS_FAMILY, id);

// ══ LOAD / SAVE ════════════════════════════════════════════════════════════════
export const loadProfiles = async () => {
  const familyId = getFamilyId();
  if (!familyId) return [];
  const { data } = await db.from('players').select('*').eq('family_id', familyId);
  if (!data) return [];
  return data.map(r => ({
    id: r.id, name: r.name, avatar: r.avatar, color: r.color,
    stars: r.stars || 0, streak: r.streak || 0,
    longestStreak: r.longest_streak || 0, lastDate: r.last_date,
    badges: r.badges || [], quizCorrect: r.quiz_correct || 0,
    speakAttempts: r.speak_attempts || 0, catsPlayed: r.cats_played || [],
    matchWins: r.match_wins || 0, dailyDone: r.daily_done || 0,
    dailyScores: r.daily_scores || {}, storiesRead: r.stories_read || 0,
    level: r.level || 1,
    catProgress: r.cat_progress || {},
    missedWords: r.missed_words || {},
    bookmarked: r.bookmarked || [],
    catSayIt: r.cat_say_it || {},
  }));
};

export const saveProfile = async (profile) => {
  const familyId = getFamilyId();
  if (!familyId) return;
  await db.from('players').upsert({
    id: profile.id, family_id: familyId,
    name: profile.name, avatar: profile.avatar, color: profile.color,
    stars: profile.stars, streak: profile.streak,
    longest_streak: profile.longestStreak, last_date: profile.lastDate,
    badges: profile.badges, quiz_correct: profile.quizCorrect,
    speak_attempts: profile.speakAttempts, cats_played: profile.catsPlayed,
    match_wins: profile.matchWins, daily_done: profile.dailyDone,
    daily_scores: profile.dailyScores, stories_read: profile.storiesRead,
    level: profile.level, cat_progress: profile.catProgress||{}, missed_words: profile.missedWords||{}, bookmarked: profile.bookmarked||[], cat_say_it: profile.catSayIt||{}, updated_at: new Date().toISOString()
  });
};

export const createFamily = async (familyName) => {
  const code = makeCode();
  const { data } = await db.from('families').insert({ code, name: familyName }).select().single();
  if (data) setFamilyId(data.id);
  return data;
};

const joinFamily = async (code) => {
  const { data } = await db.from('families').select('*').eq('code', code.toUpperCase()).single();
  if (data) { setFamilyId(data.id); return data; }
  return null;
};

export const createProfile = (name, avatar, color) => ({
  id: Date.now().toString(), name, avatar, color,
  stars: 0, streak: 0, longestStreak: 0, lastDate: null,
  badges: [], quizCorrect: 0, speakAttempts: 0,
  catsPlayed: [], matchWins: 0, dailyDone: 0,
  bookmarked: [],
  catSayIt: {}, dailyScores: {},
  storiesRead: 0, level: 1, catProgress: {}, missedWords: {},
});

// ══ SPEECH ════════════════════════════════════════════════════════════════════
let esVoice=null, enVoice=null;
const findVoices = () => {
  const vs = window.speechSynthesis?window.speechSynthesis.getVoices():[];
  esVoice=vs.find(v=>v.lang==="es-MX")||vs.find(v=>v.lang==="es-US")||vs.find(v=>v.lang.startsWith("es"))||null;
  enVoice=vs.find(v=>v.lang==="en-US")||vs.find(v=>v.lang.startsWith("en"))||null;
  return !!esVoice;
};
export const speakEs = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="es-MX"; u.rate=0.82; u.pitch=1.05;
  if(esVoice)u.voice=esVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};
export const speakEn = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US"; u.rate=0.85;
  if(enVoice)u.voice=enVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};
export const speakEnSlow = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US"; u.rate=0.68; u.pitch=1.0;
  if(enVoice)u.voice=enVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};
const speakEsFast = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="es-MX"; u.rate=1.18; u.pitch=1.0;
  if(esVoice)u.voice=esVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};

// ══ DAILY ═════════════════════════════════════════════════════════════════════
export const getDailyWords = (level) => {
  const pool=level>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  const d=todayStr();
  let s=parseInt(d.replace(/-/g,""));
  const result=[];
  while(result.length<5){
    s=Math.abs((s*1664525+1013904223)&0x7fffffff);
    const w=pool[s%pool.length];
    if(!result.some(x=>x.es===w.es))result.push(w);
  }
  return{date:d,words:result};
};

// ══ PRONUNCIATION ═════════════════════════════════════════════════════════════
export const normText=str=>str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/gu,"").replace(/[¿¡.,!?]/g,"").trim();
export const scoreMatch=(heard,target)=>{
  const h=normText(heard),t=normText(target);
  if(!h)return 0;
  if(h===t)return 100;
  const tw=t.split(" "),hw=h.split(" ");
  // Strict: exact word matches only
  const exactHits=tw.filter(tw=>hw.some(hw=>hw===tw));
  const exactPct=Math.round((exactHits.length/tw.length)*100);
  // Loose: allow substring for longer words
  const looseHits=tw.filter(tw=>hw.some(hw=>hw===tw||(tw.length>4&&(hw.includes(tw)||tw.includes(hw)))));
  const loosePct=Math.round((looseHits.length/tw.length)*100);
  // Weight toward strict scoring — harder threshold
  return Math.min(97,Math.round((exactPct*0.72)+(loosePct*0.28)));
};
export const SRClass=typeof window!=="undefined"?(window.SpeechRecognition||window.webkitSpeechRecognition):null;
export const BG="linear-gradient(160deg,#0f172a 0%,#1e3a5f 50%,#0d4f3c 100%)";

// ══ SHARED COMPONENTS ════════════════════════════════════════════════════════

export function SpeakEsBtn({text,color,size=40,showLabel=false}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEs(text,()=>setOn(false));setTimeout(()=>setOn(false),4000);};
  if(showLabel)return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:20,background:on?color:`${color}18`,border:`2px solid ${color}`,fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:on?"white":color,transition:"all .18s"}}>
      <span style={{fontSize:18}}>{on?"🔊":"🔈"}</span><span>Hear Spanish</span>
    </button>
  );
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?color:`${color}18`,border:`2.5px solid ${color}`,fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"🔊":"🔈"}
    </button>
  );
}

export function SpeakEnBtn({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:on?color:`${color}20`,border:`2px solid ${color}60`,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
      {on?"🔊":"🔈"}
    </button>
  );
}

export function SpeakEnIconBtn({text,size=40}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?"rgba(255,255,255,.9)":"rgba(255,255,255,.25)",border:"2.5px solid rgba(255,255,255,.8)",fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"🔊":"🔈"}
    </button>
  );
}

export function SpeakEnPill({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:on?"rgba(255,255,255,.35)":"rgba(255,255,255,.18)",border:"2px solid rgba(255,255,255,.6)",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white",transition:"all .18s"}}>
      <span style={{fontSize:16}}>{on?"🔊":"🔈"}</span><span>Hear English</span>
    </button>
  );
}

export function ActionBtn({onClick,bg,color="white",children,style={}}){
  return(
    <button onClick={onClick} style={{padding:"12px 20px",borderRadius:18,background:bg,border:"none",color,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",...style}}>
      {children}
    </button>
  );
}

export function StarCount({count,color}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:3,background:`${color}20`,borderRadius:20,padding:"4px 12px"}}>
      <span style={{fontSize:18}}>⭐</span>
      <span style={{fontSize:18,fontWeight:900,color}}>{count}</span>
    </span>
  );
}

// ══ FLASHCARD (with memory hook) ══════════════════════════════════════════════
export function FlashcardMode({words,color,onEarn,bookmarked,onBookmark}){
  const[idx,setIdx]=useState(0);
  const[flipped,setFlipped]=useState(false);
  const[showHook,setShowHook]=useState(false);
  const[learned,setLearned]=useState(new Set());
  const word=words[idx];

  const navigate=(dir,gotIt)=>{
    if(gotIt){setLearned(p=>new Set([...p,idx]));onEarn(1);}
    setFlipped(false);setShowHook(false);
    setTimeout(()=>setIdx(i=>(i+dir+words.length)%words.length),160);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>{idx+1} of {words.length} &nbsp;•&nbsp; ✅ {learned.size} learned</div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(learned.size/words.length)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* Memory Hook hint */}
      {word.hook&&!flipped&&(
        <div style={{width:"100%",padding:"10px 14px",borderRadius:16,background:showHook?`${color}12`:"#FFFBEB",border:`1.5px solid ${showHook?color:"#FCD34D"}`}}>
          <button onClick={()=>setShowHook(h=>!h)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"flex-start",gap:8,fontFamily:"inherit",padding:0}}>
            <span style={{fontSize:20,flexShrink:0}}>💡</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:800,color:color,marginBottom:showHook?4:0}}>Memory Hook {showHook?"":"— tap to reveal!"}</div>
              {showHook&&<div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{word.hook}</div>}
            </div>
          </button>
          {showHook&&(
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,paddingTop:10,borderTop:`1px solid ${color}20`}}>
              <button onClick={e=>{e.stopPropagation();speakEnSlow(word.hook);}} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:color,border:"none",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span style={{fontSize:16}}>🔊</span><span>Hear the hook!</span>
              </button>
              <span style={{fontSize:12,color:"#6B7280"}}>Tap to listen!</span>
            </div>
          )}
        </div>
      )}

      {/* Card */}
      <div onClick={()=>setFlipped(f=>!f)} style={{width:"100%",minHeight:220,borderRadius:24,background:flipped?color:"white",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:"20px 24px",transition:"background .25s",gap:10,position:"relative",userSelect:"none"}}>
        <span style={{fontSize:68,lineHeight:1}}>{word.emoji}</span>
        <span style={{fontSize:28,textAlign:"center",color:flipped?"white":"#1F2937",lineHeight:1.2,...DS}}>
          {flipped?word.en:word.es}
        </span>
        <span style={{fontSize:12,color:flipped?"rgba(255,255,255,.6)":"#9CA3AF"}}>
          {flipped?"Tap for Spanish":"Tap for English"}
        </span>
        {!flipped&&<div style={{position:"absolute",top:12,right:12}}><SpeakEsBtn text={word.es} color={color} size={40}/></div>}
        {flipped&&<div style={{position:"absolute",top:12,right:12}}><SpeakEnIconBtn text={word.en} size={40}/></div>}
      </div>

      {!flipped&&<div style={{fontSize:12,color:"#9CA3AF",textAlign:"center"}}>Tap 🔈 to hear it · Tap 💡 for a memory trick · Tap card to flip</div>}
      {/* Bookmark button — clearly labelled */}
      <button onClick={()=>onBookmark&&onBookmark(word)}
        style={{alignSelf:"center",display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:bookmarked?.includes(word.es)?"#FEF3C7":"rgba(252,211,77,.1)",border:`1.5px solid ${bookmarked?.includes(word.es)?"#F59E0B":"rgba(252,211,77,.3)"}`,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
        <span style={{fontSize:16}}>{bookmarked?.includes(word.es)?"🔖":"🏷️"}</span>
        <span style={{fontSize:12,fontWeight:700,color:bookmarked?.includes(word.es)?"#92400E":"#9CA3AF"}}>
          {bookmarked?.includes(word.es)?"Saved for review":"Save for daily review"}
        </span>
      </button>

      <div style={{display:"flex",gap:10,width:"100%"}}>
        <ActionBtn onClick={()=>navigate(-1,false)} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>← Back</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,false)}  bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Skip</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,true)}   bg={color}                   style={{flex:1.4}}>Got it! ✓</ActionBtn>
      </div>
    </div>
  );
}

// ══ QUIZ ══════════════════════════════════════════════════════════════════════
export function QuizMode({words,color,onEarn,onStat,allWords,onProgress,onWordResult}){
  const [phase,setPhase]=useState("quiz"); // quiz | retry | done
  const [queue,setQueue]=useState(()=>shuffle(words));
  const [missed,setMissed]=useState([]);
  const [idx,setIdx]=useState(0);
  const [opts,setOpts]=useState([]);
  const [selected,setSelected]=useState(null);
  const [score,setScore]=useState(0);
  const [total,setTotal]=useState(0);

  const currentQueue = phase==="retry" ? missed : queue;
  const word = currentQueue[idx];
  const isFinished = !word;

  useEffect(()=>{
    if(!word)return;
    // words = THIS category's words — use for same-cat distractors
    // allWords = all level words — fallback if category too small
    const sameCatPool=shuffle(words.filter(w=>w.en!==word.en));
    const globalPool=shuffle(allWords.filter(w=>w.en!==word.en&&!sameCatPool.find(s=>s.en===w.en)));
    const wrong=sameCatPool.length>=3?sameCatPool.slice(0,3):[...sameCatPool,...globalPool].slice(0,3);
    setOpts(shuffle([word,...wrong]));setSelected(null);speakEs(word.es);
  },[idx,phase]);

  const pick=opt=>{
    if(selected||!word)return;
    setSelected(opt);setTotal(t=>t+1);
    const correct=opt.en===word.en;
    if(correct){setScore(s=>s+1);onEarn(2);onStat("quiz");}
    else{setMissed(m=>[...m,word]);}
    if(onWordResult)onWordResult(word,correct);
    setTimeout(()=>setIdx(i=>i+1),1400);
  };

  const restart=()=>{
    setPhase("quiz");setQueue(shuffle(words));setMissed([]);
    setIdx(0);setScore(0);setTotal(0);setSelected(null);
  };

  // End of first pass
  if(isFinished && phase==="quiz"){
    const missedCount=missed.length;
    const pct=total>0?score/total:0;
    const earnedStars=pct>=0.9?3:pct>=0.7?2:pct>0?1:0;
    // Report progress for level unlocking
    if(onProgress)onProgress(earnedStars);
    if(missedCount===0){
      return(
        <div style={{textAlign:"center",padding:"32px 16px"}}>
          <div style={{fontSize:72}}>🏆</div>
          <div style={{fontSize:26,color,marginTop:8,...DS}}>¡Perfecto! All correct!</div>
          <div style={{display:"flex",justifyContent:"center",gap:4,margin:"8px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:28,opacity:earnedStars>=i?1:.2}}>⭐</span>)}</div>
          <div style={{fontSize:15,color:"#6B7280",marginTop:4}}>{score} / {total} — flawless round!</div>
          <ActionBtn onClick={restart} bg={color} style={{marginTop:20,width:"100%",padding:14,fontSize:16}}>Play Again 🔄</ActionBtn>
        </div>
      );
    }
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:64}}>{pct>=0.9?"🌟":pct>=0.7?"👍":"💪"}</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Round Complete!</div>
        <div style={{display:"flex",justifyContent:"center",gap:4,margin:"6px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:24,opacity:earnedStars>=i?1:.2}}>⭐</span>)}</div>
        <div style={{fontSize:32,fontWeight:900,color:"#FCD34D",margin:"4px 0"}}>{score}/{total}</div>
        {missedCount>0&&<div style={{fontSize:14,color:"#6B7280",marginBottom:16}}>You missed {missedCount} word{missedCount>1?"s":""}. Practice them below!</div>}
        <div style={{display:"flex",gap:10,flexDirection:"column"}}>
          {missedCount>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:14,fontSize:15}}>Practice Missed Words 🔁</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:15}}>Start Over 🔄</ActionBtn>
        </div>
      </div>
    );
  }

  // End of retry pass
  if(isFinished && phase==="retry"){
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:72}}>🎉</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Retry Complete!</div>
        <div style={{fontSize:15,color:"#6B7280",margin:"8px 0 20px"}}>Great work practicing the tricky ones!</div>
        <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:16}}>Start Fresh 🔄</ActionBtn>
      </div>
    );
  }

  if(!word)return null;

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"🔁 Retry — ":""}
        {idx+1} / {currentQueue.length} &nbsp;•&nbsp; ✅ {score} right
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQueue.length)*100}%`,transition:"width .4s"}}/>
      </div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:28,color:"#1F2937",marginTop:4,...DS}}>{word.es}</div>
        <div style={{display:"flex",justifyContent:"center",marginTop:12,gap:8,alignItems:"center"}}>
          <SpeakEsBtn text={word.es} color={color} size={44}/>
          <span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear it again</span>
        </div>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:8,fontWeight:600}}>Tap 🔈 on each answer to hear it — then choose!</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%"}}>
        {opts.map((opt,i)=>{
          const isC=opt.en===word.en,isCh=selected?.en===opt.en;
          let bg="white",border="#E5E7EB",tc="#1F2937";
          if(selected){if(isC){bg="#D1FAE5";border="#10B981";}else if(isCh){bg="#FEE2E2";border="#EF4444";}}
          return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:16,background:bg,border:`2px solid ${border}`,transition:"all .2s"}}>
              <button onClick={()=>pick(opt)} style={{flex:1,background:"none",border:"none",textAlign:"left",fontSize:16,fontWeight:700,cursor:selected?"default":"pointer",color:tc,fontFamily:"inherit",padding:0,lineHeight:1.3}}>{opt.en}</button>
              <SpeakEnBtn text={opt.en} color={selected&&isC?"#10B981":selected&&isCh?"#EF4444":color}/>
            </div>
          );
        })}
      </div>
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"✅ ¡Correcto!":`❌ It was "${word.en}"`}</div>}
    </div>
  );
}

// ══ MATCH ═════════════════════════════════════════════════════════════════════
export function MatchMode({words,color,onEarn,onStat}){
  const mk=()=>{const s=shuffle(words).slice(0,4);return shuffle([...s.map((w,i)=>({id:`e${i}`,text:w.es,lang:"es",pid:i,emoji:w.emoji})),...s.map((w,i)=>({id:`n${i}`,text:w.en,lang:"en",pid:i}))]);};
  const[cards,setCards]=useState(mk);
  const[sel,setSel]=useState([]);
  const[matched,setMatched]=useState(new Set());
  const[wrong,setWrong]=useState(new Set());
  const[pairs,setPairs]=useState(0);
  const total=cards.length/2;
  const reset=()=>{setCards(mk());setSel([]);setMatched(new Set());setWrong(new Set());setPairs(0);};
  const tap=card=>{
    if(matched.has(card.id)||wrong.has(card.id))return;
    if(sel.length===0){setSel([card]);if(card.lang==="es")speakEs(card.text);else speakEn(card.text);return;}
    if(sel[0].id===card.id){setSel([]);return;}
    const[a,b]=[sel[0],card];
    if(a.pid===b.pid&&a.lang!==b.lang){setMatched(p=>new Set([...p,a.id,b.id]));setSel([]);const np=pairs+1;setPairs(np);onEarn(3);if(np===total)onStat("match");}
    else{setWrong(new Set([a.id,b.id]));setTimeout(()=>{setWrong(new Set());setSel([]);},650);}
  };
  if(pairs===total)return(<div style={{textAlign:"center",padding:32}}><div style={{fontSize:72}}>🎉</div><div style={{fontSize:26,color,...DS,margin:"8px 0"}}>¡Perfecto!</div><ActionBtn onClick={reset} bg={color} style={{marginTop:8}}>Play Again 🔄</ActionBtn></div>);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Match Spanish 🔗 English &nbsp;•&nbsp; {pairs}/{total}</div>
      <div style={{fontSize:12,color:"#9CA3AF",textAlign:"center"}}>Tapping any card reads it aloud!</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%"}}>
        {cards.map(card=>{
          const isSel=sel.some(s=>s.id===card.id),isM=matched.has(card.id),isW=wrong.has(card.id);
          const cardBg=isM?`${color}15`:isW?"#FEE2E2":isSel?`${color}28`:"white";
          const cardBorder=isM?color:isW?"#EF4444":isSel?color:"#E5E7EB";
          return(
            <div key={card.id} style={{position:"relative",borderRadius:16,background:cardBg,border:`2.5px solid ${cardBorder}`,transition:"all .18s",opacity:isM?.5:1,transform:isSel?"scale(.97)":"scale(1)"}}>
              <button onClick={()=>tap(card)} style={{width:"100%",minHeight:80,padding:"10px 10px 28px",background:"none",border:"none",cursor:isM?"default":"pointer",textAlign:"center",fontFamily:"inherit",color:isM?"#9CA3AF":"#1F2937"}}>
                {card.lang==="es"?<div style={{fontSize:14,fontWeight:700,...DS}}>{card.text}</div>:<div style={{fontSize:13,fontWeight:700,lineHeight:1.3}}>{card.text}</div>}
              </button>
              {/* Permanent listen button on every card */}
              <button onClick={e=>{e.stopPropagation();if(card.lang==="es")speakEs(card.text);else speakEn(card.text);}} style={{position:"absolute",bottom:4,right:4,width:24,height:24,borderRadius:"50%",background:`${color}20`,border:`1.5px solid ${color}60`,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:isM?.4:1}}>
                🔈
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══ SPEAK ═════════════════════════════════════════════════════════════════════
export function SpeakMode({words,color,onEarn,onStat}){
  const queue=useRef(shuffle(words));
  const[idx,setIdx]=useState(0);
  const[phase,setPhase]=useState("idle");
  const[transcript,setTranscript]=useState("");
  const[pct,setPct]=useState(null);
  const[ss,setSs]=useState(0);
  const recRef=useRef(null);
  const word=queue.current[idx%queue.current.length];
  const start=useCallback(()=>{
    if(!SRClass||phase==="listening")return;
    setPhase("listening");setTranscript("");setPct(null);
    const rec=new SRClass();
    rec.lang="es-MX";rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    recRef.current=rec;
    rec.onresult=e=>{
      const alts=Array.from(e.results[0]);
      const best=alts.reduce((b,a)=>{const s=scoreMatch(a.transcript,word.es);return s>b.s?{s,t:a.transcript}:b},{s:0,t:alts[0]?.transcript||""});
      setTranscript(alts.slice(0,2).map(a=>a.transcript).join(" / "));setPct(best.s);onStat("speak");
      if(best.s>=55){setSs(n=>n+1);onEarn(2);}else setSs(0);setPhase("result");
    };
    rec.onerror=()=>{setTranscript("Couldn't hear you — try again!");setPct(0);setPhase("result");};
    rec.start();
  },[word,phase,onEarn,onStat]);
  const next=()=>{setPhase("idle");setTranscript("");setPct(null);setIdx(i=>i+1);};
  const rb=pct===null?null:pct===100?{icon:"🏆",msg:"¡Perfecto!",clr:"#10B981"}:pct>=75?{icon:"🌟",msg:"¡Muy bien!",clr:"#10B981"}:pct>=50?{icon:"👍",msg:"¡Buen intento!",clr:"#F59E0B"}:{icon:"🔄",msg:"Try again!",clr:"#EF4444"};
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      {!SRClass&&<div style={{background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:16,padding:"10px 14px",fontSize:13,color:"#92400E",width:"100%",fontWeight:600}}>⚠️ Pronunciation mode needs Chrome or Edge.</div>}
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>🎤 Say it in Spanish! &nbsp;•&nbsp; 🔥 {ss} streak</div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:72}}>{word.emoji}</div>
        <div style={{fontSize:26,color:"#1F2937",lineHeight:1.2,marginTop:6,...DS}}>{word.es}</div>
        <div style={{fontSize:15,color:"#6B7280",marginTop:4}}>{word.en}</div>
        <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:14}}>
          <SpeakEsBtn text={word.es} color={color} showLabel={true}/>
          <SpeakEnPill text={word.en} color={color}/>
        </div>
      </div>
      {SRClass&&<React.Fragment>
        <button onClick={phase==="listening"?()=>{recRef.current?.stop();setPhase("idle");}:start} style={{width:110,height:110,borderRadius:"50%",background:phase==="listening"?"linear-gradient(135deg,#EF4444,#DC2626)":`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:48,cursor:"pointer",boxShadow:phase==="listening"?"0 0 0 10px #EF444420,0 8px 28px #EF444450":`0 8px 28px ${color}50`,transition:"all .22s",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {phase==="listening"?"⏹":"🎤"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>{phase==="idle"?"Tap the mic and say it in Spanish!":phase==="listening"?"🎙️ Listening — speak now!":""}</div>
      </React.Fragment>}
      {phase==="result"&&rb&&<div style={{width:"100%",borderRadius:20,padding:18,background:`${rb.clr}12`,border:`2px solid ${rb.clr}`,textAlign:"center"}}>
        <div style={{fontSize:36}}>{rb.icon}</div>
        <div style={{fontSize:20,color:rb.clr,...DS}}>{rb.msg}</div>
        {transcript&&<div style={{marginTop:6,fontSize:12,color:"#6B7280"}}>You said: <em>"{transcript}"</em></div>}
        <div style={{marginTop:4,fontSize:12,fontWeight:700,color:"#9CA3AF"}}>Match: {pct}%</div>
      </div>}
      {phase==="result"&&<div style={{display:"flex",gap:10,width:"100%"}}>
        {pct<55&&<ActionBtn onClick={()=>setPhase("idle")} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>🔄 Again</ActionBtn>}
        <ActionBtn onClick={next} bg={color} style={{flex:1}}>Next →</ActionBtn>
      </div>}
    </div>
  );
}


// == WORD SCRAMBLE ==
// Single words: scramble individual letters
// Multi-word phrases: scramble word order (more useful for language learning!)
export function ScrambleMode({words,color,onEarn,onStat}){
  // Use ALL words — no filtering. Single words get letter scramble, phrases get word scramble.
  const queue=useRef(shuffle(words));
  const[idx,setIdx]=useState(0);
  const[phase,setPhase]=useState("playing");
  const[tiles,setTiles]=useState([]);       // bank of available tiles
  const[chosen,setChosen]=useState([]);     // tiles placed by user
  const[allTiles,setAllTiles]=useState([]); // fixed reference for positions
  const[score,setScore]=useState(0);
  const word=queue.current[idx%queue.current.length];

  const isPhrase=word&&word.es.includes(" ");

  const makeTiles=w=>{
    if(w.es.includes(" ")){
      // Word-order scramble — tiles are whole words
      const words=w.es.split(" ").map((ch,i)=>({ch,id:`${i}_${ch}`}));
      let s=shuffle(words),t=0;
      while(s.map(l=>l.ch).join(" ")===w.es&&t++<10)s=shuffle(words);
      return s;
    } else {
      // Letter scramble — tiles are individual letters
      const letters=w.es.split("").map((ch,i)=>({ch,id:`${i}_${ch}`}));
      let s=shuffle(letters),t=0;
      while(s.map(l=>l.ch).join("")===w.es&&t++<10)s=shuffle(letters);
      return s;
    }
  };

  useEffect(()=>{
    if(!word)return;
    const t=makeTiles(word);
    setTiles(t);setAllTiles(t);setChosen([]);setPhase("playing");speakEs(word.es);
  },[idx]);

  // Check answer when all tiles placed
  useEffect(()=>{
    if(phase!=="playing"||tiles.length>0||chosen.length===0)return;
    const answer=isPhrase?chosen.map(l=>l.ch).join(" "):chosen.map(l=>l.ch).join("");
    if(answer===word.es){
      setPhase("correct");setScore(s=>s+1);onEarn(3);onStat("quiz");speakEs(word.es);
      setTimeout(()=>setIdx(i=>i+1),1800);
    } else {
      setPhase("wrong");
    }
  },[tiles,chosen,phase,word,isPhrase]);

  const pick=(tile,fromBank)=>{
    if(phase!=="playing")return;
    if(fromBank){
      setTiles(p=>p.filter(x=>x.id!==tile.id));
      setChosen(p=>[...p,tile]);
    } else {
      setChosen(p=>p.filter(x=>x.id!==tile.id));
      setTiles(p=>[...p,tile]);
    }
  };

  const backspace=()=>{
    if(chosen.length===0||phase!=="playing")return;
    const last=chosen[chosen.length-1];
    setChosen(p=>p.slice(0,-1));
    setTiles(p=>[...p,last]);
    if(phase==="wrong")setPhase("playing");
  };

  const clearAll=()=>{
    setTiles(allTiles);setChosen([]);
    if(phase==="wrong")setPhase("playing");
  };

  const chosenIds=new Set(chosen.map(l=>l.id));

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {isPhrase?"Put the words in order!":"Unscramble the letters!"} &nbsp;Score: {score}
      </div>
      {/* Clue card */}
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:64}}>{word.emoji}</div>
        <div style={{fontSize:22,color:"#1F2937",marginTop:6,...DS}}>{word.en}</div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8,alignItems:"center"}}>
          <SpeakEsBtn text={word.es} color={color} size={36}/>
          <span style={{fontSize:12,color:"#9CA3AF"}}>Tap to hear the answer</span>
        </div>
      </div>

      {/* Answer area */}
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,minHeight:52,width:"100%",padding:"10px",borderRadius:16,
        background:phase==="correct"?"#D1FAE5":phase==="wrong"?"#FEE2E2":"#F8FAFC",
        border:`2px solid ${phase==="correct"?"#10B981":phase==="wrong"?"#EF4444":"#E5E7EB"}`,transition:"all .2s"}}>
        {chosen.length===0
          ?<span style={{fontSize:13,color:"#9CA3AF",alignSelf:"center"}}>
            {isPhrase?"Tap words below in the right order":"Tap letters below to build the word"}
          </span>
          :chosen.map(l=>(
            <button key={l.id} onClick={()=>phase==="playing"&&pick(l,false)}
              style={{padding:isPhrase?"8px 12px":"0",width:isPhrase?"auto":38,height:42,borderRadius:10,
                background:color,border:"none",fontSize:isPhrase?15:18,fontWeight:900,
                color:"white",cursor:phase==="playing"?"pointer":"default",fontFamily:"inherit"}}>
              {l.ch}
            </button>
          ))
        }
      </div>

      {phase==="correct"&&<div style={{fontSize:15,color:"#10B981",fontWeight:800}}>Perfecto! {word.es}</div>}
      {phase==="wrong"&&<div style={{fontSize:13,color:"#EF4444",fontWeight:700}}>Not quite — use backspace or clear all!</div>}

      {/* Tile bank — fixed positions */}
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8}}>
        {allTiles.map(tile=>{
          const used=chosenIds.has(tile.id);
          return(
            <button key={tile.id} onClick={()=>!used&&phase==="playing"&&pick(tile,true)}
              disabled={used||phase!=="playing"}
              style={{padding:isPhrase?"8px 12px":"0",width:isPhrase?"auto":42,height:isPhrase?"auto":46,
                borderRadius:10,background:used?"rgba(255,255,255,.08)":"white",
                border:`2px solid ${used?"rgba(255,255,255,.15)":color+"60"}`,
                fontSize:isPhrase?15:20,fontWeight:900,
                color:used?"transparent":"#1F2937",
                cursor:used||phase!=="playing"?"default":"pointer",
                fontFamily:"inherit",transition:"all .15s",minWidth:isPhrase?36:42}}>
              {used?" ":tile.ch}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:8,width:"100%"}}>
        {chosen.length>0&&phase==="playing"&&(
          <ActionBtn onClick={backspace} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Back</ActionBtn>
        )}
        {chosen.length>1&&phase==="playing"&&(
          <ActionBtn onClick={clearAll} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Clear</ActionBtn>
        )}
        {phase==="wrong"&&<ActionBtn onClick={clearAll} bg="#F59E0B" style={{flex:2}}>Try Again</ActionBtn>}
        <ActionBtn onClick={()=>setIdx(i=>i+1)}
          bg={phase==="wrong"?color:"#F9FAFB"}
          color={phase==="wrong"?"white":"#6B7280"}
          style={{flex:1,border:phase==="wrong"?"none":"2px solid #E5E7EB"}}>Skip</ActionBtn>
      </div>
    </div>
  );
}
// == WRITE MODE ==
export function WriteMode({words,color,onEarn,onStat}){
  const queue=useRef(shuffle(words));
  const[phase,setPhase]=useState("quiz");
  const[missed,setMissed]=useState([]);
  const[idx,setIdx]=useState(0);
  const[typed,setTyped]=useState("");
  const[result,setResult]=useState(null);
  const[score,setScore]=useState(0);
  const inputRef=useRef(null);
  const currentQ=phase==="retry"?missed:queue.current;
  const word=currentQ[idx];
  useEffect(()=>{setTyped("");setResult(null);setTimeout(()=>inputRef.current?.focus(),100);},[idx,phase]);
  const normW=s=>s.toLowerCase().replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n").replace(/[?,!.]/g,"").trim();
  const editDist=(a,b)=>{const m=a.length,n=b.length;const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j));for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);return dp[m][n];};
  const check=()=>{
    if(!word||result)return;
    const ua=normW(typed),ca=normW(word.es);
    if(ua===ca){setResult("correct");setScore(s=>s+1);onEarn(3);onStat("quiz");speakEs(word.es);setTimeout(()=>next(true),1800);}
    else if(editDist(ua,ca)<=2){setResult("close");}
    else{setResult("wrong");setMissed(m=>[...m,word]);}
  };
  const next=(ok)=>{if(!ok&&result!=="correct")setMissed(m=>[...m,word]);setIdx(i=>i+1);};
  const restart=()=>{setPhase("quiz");setMissed([]);setIdx(0);setScore(0);setResult(null);setTyped("");};
  if(!word){
    const mc=missed.length,tot=currentQ.length;
    return(
      <div style={{textAlign:"center",padding:"28px 16px"}}>
        <div style={{fontSize:22,color,...DS,marginTop:8}}>{phase==="retry"?"Retry Done!":"Write Round Done!"}</div>
        <div style={{fontSize:36,fontWeight:900,color:"#FCD34D",margin:"6px 0"}}>{score}/{tot}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>
          {mc>0&&phase==="quiz"&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setResult(null);setTyped("");}} bg="#F59E0B" style={{width:"100%",padding:12}}>Practice Missed</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12}}>Start Over</ActionBtn>
        </div>
      </div>
    );
  }
  const rC={correct:"#10B981",close:"#F59E0B",wrong:"#EF4444"};
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>{phase==="retry"?"Retry - ":""}{idx+1}/{currentQ.length} - {score} right</div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}><div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQ.length)*100}%`,transition:"width .4s"}}/></div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"24px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:10}}>TYPE THIS IN SPANISH</div>
        <div style={{fontSize:60}}>{word.emoji}</div>
        <div style={{fontSize:26,color:"#1F2937",marginTop:8,...DS}}>{word.en}</div>
      </div>
      <input ref={inputRef} value={typed} onChange={e=>!result&&setTyped(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!result&&check()} placeholder="Type the Spanish here..." disabled={!!result} style={{width:"100%",padding:"16px",borderRadius:16,border:`2px solid ${result?rC[result]:color+"60"}`,fontSize:18,fontFamily:"inherit",fontWeight:700,color:"#1F2937",outline:"none",background:result==="correct"?"#D1FAE5":result==="close"?"#FEF3C7":result==="wrong"?"#FEE2E2":"white",transition:"all .2s",textAlign:"center"}}/>
      {result&&<div style={{width:"100%",borderRadius:16,padding:"14px",background:`${rC[result]}12`,border:`2px solid ${rC[result]}`,textAlign:"center",fontSize:16,fontWeight:800,color:rC[result]}}>{result==="correct"?"Perfecto!":result==="close"?`Almost! It is: ${word.es}`:`The answer is: ${word.es}`}</div>}
      {!result?<ActionBtn onClick={check} bg={typed.trim()?color:"#9CA3AF"} style={{width:"100%",padding:14,fontSize:16,opacity:typed.trim()?1:.5}}>Check Answer</ActionBtn>
      :<div style={{display:"flex",gap:10,width:"100%"}}>
        {result!=="correct"&&<ActionBtn onClick={()=>{setTyped("");setResult(null);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Try Again</ActionBtn>}
        <ActionBtn onClick={()=>next(result==="correct")} bg={color} style={{flex:1,padding:14}}>Next</ActionBtn>
      </div>}
    </div>
  );
}

// == SAY IT MODE ==
export function SayItMode({words,color,onEarn,onStat,onSayItAttempt}){
  const queue=useRef(shuffle(words));
  const[idx,setIdx]=useState(0);
  const[phase,setPhase]=useState("ready");
  const[transcript,setTranscript]=useState("");
  const[pct,setPct]=useState(null);
  const[streak,setStreak]=useState(0);
  const[showAns,setShowAns]=useState(false);
  const recRef=useRef(null);
  const word=queue.current[idx%queue.current.length];
  useEffect(()=>{setPhase("ready");setTranscript("");setPct(null);setShowAns(false);},[idx]);
  const startMic=useCallback(()=>{
    if(!SRClass||phase==="listening")return;
    setPhase("listening");setTranscript("");setPct(null);
    const rec=new SRClass();rec.lang="es-MX";rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    recRef.current=rec;
    rec.onresult=e=>{
      const alts=Array.from(e.results[0]);
      const best=alts.reduce((b,a)=>{const s=scoreMatch(a.transcript,word.es);return s>b.s?{s,t:a.transcript}:b},{s:0,t:alts[0]?.transcript||""});
      setTranscript(alts.slice(0,2).map(a=>a.transcript).join(" / "));setPct(best.s);onStat("speak");
      if(best.s>=60){setStreak(n=>n+1);onEarn(3);if(onSayItAttempt)onSayItAttempt();}else setStreak(0);setPhase("result");
    };
    rec.onerror=()=>{setTranscript("Could not hear - try again!");setPct(0);setPhase("result");};
    rec.start();
  },[word,phase,onEarn,onStat]);
  const rb=pct===null?null:pct>=90?{msg:"Perfecto!",clr:"#10B981"}:pct>=70?{msg:"Muy bien!",clr:"#10B981"}:pct>=55?{msg:"Buen intento!",clr:"#F59E0B"}:{msg:"Keep practicing!",clr:"#EF4444"};
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      {!SRClass&&<div style={{background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:16,padding:"10px 14px",fontSize:13,color:"#92400E",width:"100%",fontWeight:600}}>Pronunciation mode needs Chrome or Edge browser.</div>}
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Say the Spanish from memory! Streak: {streak}</div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"28px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:12}}>WHAT IS THIS IN SPANISH?</div>
        <div style={{fontSize:80,lineHeight:1}}>{word.emoji}</div>
        <div style={{fontSize:26,color:"#1F2937",marginTop:10,...DS}}>{word.en}</div>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:6}}>Say the Spanish - no peeking!</div>
        {(phase==="result"||showAns)&&(
          <div style={{marginTop:14,padding:"10px 16px",background:`${color}10`,borderRadius:14}}>
            {showAns?<><div style={{fontSize:22,color,...DS}}>{word.es}</div><button onClick={()=>speakEs(word.es)} style={{marginTop:6,padding:"6px 14px",borderRadius:10,background:color,border:"none",color:"white",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Hear it</button></>
            :<button onClick={()=>{speakEs(word.es);setShowAns(true);}} style={{padding:"8px 16px",borderRadius:12,background:`${color}20`,border:`1.5px solid ${color}`,color,fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Reveal Answer</button>}
          </div>
        )}
      </div>
      {SRClass&&<React.Fragment>
        <button onClick={phase==="listening"?()=>{recRef.current?.stop();setPhase("ready");}:startMic} style={{width:100,height:100,borderRadius:"50%",background:phase==="listening"?"linear-gradient(135deg,#EF4444,#DC2626)":`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:44,cursor:"pointer",boxShadow:phase==="listening"?"0 0 0 10px #EF444420":`0 6px 20px ${color}50`,transition:"all .22s",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
          {phase==="listening"?"Stop":"Mic"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>{phase==="ready"?"Tap the mic and say it!":phase==="listening"?"Listening - speak now!":""}</div>
      </React.Fragment>}
      {phase==="result"&&rb&&<div style={{width:"100%",borderRadius:20,padding:"16px 18px",background:`${rb.clr}12`,border:`2px solid ${rb.clr}`,textAlign:"center"}}>
        <div style={{fontSize:20,color:rb.clr,...DS}}>{rb.msg}</div>
        {transcript&&<div style={{marginTop:6,fontSize:13,color:"#6B7280"}}>You said: "{transcript}"</div>}
        {pct!==null&&<div style={{marginTop:4,fontSize:12,fontWeight:700,color:"#9CA3AF"}}>Match: {pct}%</div>}
      </div>}
      {(phase==="result"||phase==="ready")&&<div style={{display:"flex",gap:10,width:"100%"}}>
        {!showAns&&phase==="ready"&&<ActionBtn onClick={()=>{speakEs(word.es);setShowAns(true);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Reveal Answer</ActionBtn>}
        {phase==="result"&&pct<60&&<ActionBtn onClick={()=>{setPhase("ready");setTranscript("");setPct(null);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Try Again</ActionBtn>}
        <ActionBtn onClick={()=>setIdx(i=>i+1)} bg={color} style={{flex:1,padding:"14px 0"}}>Next</ActionBtn>
      </div>}
    </div>
  );
}

// == LEVEL FINAL EXAM ==
// Part 1: comprehension (hear Spanish, choose English)
// Part 2: production (see English, type or speak Spanish)
// Need 80% to unlock next level
export function LevelExamScreen({level,profile,onBack,onPass}){
  const vocab=level>=3?VOCAB_L3:level>=2?VOCAB_L2:VOCAB_L1;
  const allLevelWords=Object.values(vocab).flatMap(cat=>cat.words);
  const COMP=Math.min(15,Math.floor(allLevelWords.length*0.6));
  const PROD=Math.min(10,allLevelWords.length-COMP);
  const TOTAL=COMP+PROD;
  const shuffled=shuffle(allLevelWords);
  const[compQ]=useState(()=>shuffled.slice(0,COMP));
  const[prodQ]=useState(()=>shuffled.slice(COMP,COMP+PROD));
  const[phase,setPhase]=useState("intro");
  const[ci,setCi]=useState(0);const[pi,setPi]=useState(0);
  const[opts,setOpts]=useState([]);const[sel,setSel]=useState(null);
  const[typed,setTyped]=useState("");const[wRes,setWRes]=useState(null);
  const[score,setScore]=useState(0);
  const[micPhase,setMicPhase]=useState("ready");
  const recRef=useRef(null);
  const cw=compQ[ci],pw=prodQ[pi];

  useEffect(()=>{
    if(phase!=="comp"||!cw)return;
    const same=shuffle(allLevelWords.filter(w=>w.en!==cw.en)).slice(0,2);
    const cross=shuffle([...ALL_WORDS_L1,...ALL_WORDS_L2,...ALL_WORDS_L3].filter(w=>w.en!==cw.en&&!same.find(s=>s.en===w.en))).slice(0,1);
    setOpts(shuffle([cw,...same,...cross].slice(0,4)));setSel(null);speakEs(cw.es);
  },[ci,phase]);
  useEffect(()=>{if(phase!=="prod")return;setTyped("");setWRes(null);setMicPhase("ready");},[pi,phase]);

  const normW=s=>s.toLowerCase().replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n").replace(/[?,!.]/g,"").trim();
  const editDist=(a,b)=>{const m=a.length,n=b.length;const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j));for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);return dp[m][n];};

  const pickComp=opt=>{if(sel)return;setSel(opt);if(opt.en===cw.en)setScore(s=>s+1);setTimeout(()=>{if(ci<COMP-1)setCi(i=>i+1);else setPhase("prod");},1200);};
  const checkTyped=()=>{
    if(!pw||wRes)return;
    const ua=normW(typed),ca=normW(pw.es);
    if(ua===ca){setWRes("correct");setScore(s=>s+1);speakEs(pw.es);setTimeout(()=>advance(),1800);}
    else if(editDist(ua,ca)<=2){setWRes("close");}else{setWRes("wrong");}
  };
  const startMic=()=>{
    if(!SRClass||micPhase==="listening")return;
    setMicPhase("listening");
    const rec=new SRClass();rec.lang="es-MX";rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    recRef.current=rec;
    rec.onresult=e=>{
      const heard=Array.from(e.results[0])[0]?.transcript||"";
      const pct=scoreMatch(heard,pw.es);setMicPhase("ready");
      if(pct>=80){setWRes("correct");setScore(s=>s+1);speakEs(pw.es);setTimeout(()=>advance(),1800);}
      else if(pct>=55){setWRes("close");}else{setWRes("wrong");}
    };
    rec.onerror=()=>setMicPhase("ready");rec.start();
  };
  const advance=()=>{if(pi<PROD-1)setPi(i=>i+1);else setPhase("done");};
  const rC={correct:"#10B981",close:"#F59E0B",wrong:"#EF4444"};

  if(phase==="intro")return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:400}}>
        <div style={{fontSize:64}}>Trophy</div>
        <div style={{fontSize:24,color:"white",margin:"8px 0",...DS}}>{level===1?"Beginner":level===2?"Intermediate":"Advanced"} Final Exam</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:20,lineHeight:1.7}}>
          Part 1 ({COMP} questions): Hear Spanish, choose English meaning<br/>
          Part 2 ({PROD} questions): See English, type or say the Spanish<br/><br/>
          Need 80% ({Math.ceil(TOTAL*0.8)}/{TOTAL} correct) to unlock next level!
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <ActionBtn onClick={()=>setPhase("comp")} bg="#FCD34D" color="#1F2937" style={{width:"100%",padding:16,fontSize:16}}>Start Exam!</ActionBtn>
          <ActionBtn onClick={onBack} bg="rgba(255,255,255,.12)" style={{width:"100%",padding:14}}>Not ready - Back</ActionBtn>
        </div>
      </div>
    </div>
  );

  if(phase==="done"){
    const pct=score/TOTAL;const passed=pct>=0.8;
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{textAlign:"center",background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:400}}>
          <div style={{fontSize:72}}>{passed?"(trophy)":"(muscle)"}</div>
          <div style={{fontSize:26,color:"white",margin:"8px 0",...DS}}>{passed?"Level Complete!":"Not Quite Yet!"}</div>
          <div style={{fontSize:48,fontWeight:900,color:passed?"#FCD34D":"#F87171",margin:"8px 0"}}>{score}/{TOTAL}</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginBottom:16}}>{passed?`${Math.round(pct*100)}% - Excelente! Next level unlocked!`:`You need 80%. You got ${Math.round(pct*100)}%. Keep practicing!`}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {passed?<ActionBtn onClick={()=>onPass(level)} bg="#10B981" style={{width:"100%",padding:16,fontSize:16}}>Unlock Level {level+1}!</ActionBtn>
                   :<ActionBtn onClick={()=>setPhase("intro")} bg="#F59E0B" style={{width:"100%",padding:16}}>Try Again</ActionBtn>}
            <ActionBtn onClick={onBack} bg="rgba(255,255,255,.15)" style={{width:"100%",padding:14}}>Back to Home</ActionBtn>
          </div>
        </div>
      </div>
    );
  }

  if(phase==="comp"&&cw)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{flex:1}}><div style={{fontSize:16,color:"white",...DS}}>Part 1 - Comprehension</div><div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Hear Spanish, choose the English meaning</div></div>
        <div style={{fontSize:13,color:"#93C5FD",fontWeight:900}}>{ci+1}/{COMP}</div>
      </div>
      <div style={{flex:1,padding:"20px 14px"}}>
        <div style={{width:"100%",height:6,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:16}}><div style={{height:"100%",borderRadius:99,background:"#93C5FD",width:`${(ci/COMP)*100}%`,transition:"width .4s"}}/></div>
        <div style={{background:"white",borderRadius:24,padding:"22px 20px",border:"3px solid #93C5FD",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:28,color:"#1F2937",...DS}}>{cw.es}</div>
          <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}><SpeakEsBtn text={cw.es} color="#3B82F6" size={40}/><span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear</span></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {opts.map((opt,i)=>{const isC=opt.en===cw.en,isCh=sel?.en===opt.en;let bg="white",border="#E5E7EB";if(sel){if(isC){bg="#D1FAE5";border="#10B981";}else if(isCh){bg="#FEE2E2";border="#EF4444";}}return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:16,background:bg,border:`2px solid ${border}`,transition:"all .2s"}}><button onClick={()=>pickComp(opt)} style={{flex:1,background:"none",border:"none",textAlign:"left",fontSize:16,fontWeight:700,cursor:sel?"default":"pointer",color:"#1F2937",fontFamily:"inherit",padding:0}}>{opt.en}</button><SpeakEnBtn text={opt.en} color={sel&&isC?"#10B981":"#3B82F6"}/></div>);})}
        </div>
      </div>
    </div>
  );

  if(phase==="prod"&&pw)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}><div style={{fontSize:16,color:"white",...DS}}>Part 2 - Production</div><div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>See English, type or say the Spanish</div></div>
        <div style={{fontSize:13,color:"#86EFAC",fontWeight:900}}>{pi+1}/{PROD}</div>
      </div>
      <div style={{flex:1,padding:"20px 14px"}}>
        <div style={{width:"100%",height:6,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:16}}><div style={{height:"100%",borderRadius:99,background:"#86EFAC",width:`${(pi/PROD)*100}%`,transition:"width .4s"}}/></div>
        <div style={{background:"white",borderRadius:24,padding:"24px 20px",border:"3px solid #86EFAC",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:10}}>SAY OR TYPE THIS IN SPANISH</div>
          <div style={{fontSize:56}}>{pw.emoji}</div>
          <div style={{fontSize:24,color:"#1F2937",marginTop:8,...DS}}>{pw.en}</div>
        </div>
        {wRes&&<React.Fragment>
          <div style={{textAlign:"center",fontSize:16,fontWeight:800,color:rC[wRes],marginBottom:12}}>{wRes==="correct"?"Perfecto!":wRes==="close"?`Almost! It is: ${pw.es}`:`The answer is: ${pw.es}`}</div>
          <div style={{display:"flex",gap:10}}>
            {wRes!=="correct"&&<ActionBtn onClick={()=>{setTyped("");setWRes(null);setMicPhase("ready");}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Try Again</ActionBtn>}
            <ActionBtn onClick={advance} bg="#10B981" style={{flex:1,padding:14}}>Next</ActionBtn>
          </div>
        </React.Fragment>}
        {!wRes&&<React.Fragment>
          <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textAlign:"center",marginBottom:8}}>TYPE IT</div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input value={typed} onChange={e=>setTyped(e.target.value)} onKeyDown={e=>e.key==="Enter"&&typed.trim()&&checkTyped()} placeholder="Type the Spanish..." style={{flex:1,padding:"14px 16px",borderRadius:16,border:"2px solid rgba(134,239,172,.5)",fontSize:18,fontFamily:"inherit",fontWeight:700,color:"#1F2937",outline:"none",background:"white",textAlign:"center"}} autoFocus/>
            <ActionBtn onClick={checkTyped} bg={typed.trim()?"#10B981":"#9CA3AF"} style={{padding:"14px 16px",fontSize:14,opacity:typed.trim()?1:.4,flexShrink:0}}>Check</ActionBtn>
          </div>
          {SRClass&&<React.Fragment>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{flex:1,height:1,background:"rgba(255,255,255,.15)"}}/><span style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700}}>OR</span><div style={{flex:1,height:1,background:"rgba(255,255,255,.15)"}}/></div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700}}>SAY IT (mic)</div>
              <button onClick={micPhase==="listening"?()=>{recRef.current?.stop();setMicPhase("ready");}:startMic} style={{width:70,height:70,borderRadius:"50%",background:micPhase==="listening"?"linear-gradient(135deg,#EF4444,#DC2626)":"linear-gradient(135deg,#10B981,#059669)",border:"none",fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,boxShadow:micPhase==="listening"?"0 0 0 8px #EF444420":"0 4px 16px #10B98150"}}>
                {micPhase==="listening"?"Stop":"Mic"}
              </button>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Tap mic and say the Spanish</div>
            </div>
          </React.Fragment>}
        </React.Fragment>}
      </div>
    </div>
  );
  return null;
}
