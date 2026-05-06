import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { BG, db, speakEs, speakEn, speakEnSlow, SRClass, normText, scoreMatch, getDailyWords, loadProfiles, saveProfile, createProfile, getFamilyId, createFamily, makeCode } from './AppA.jsx';
import { SpeakEsBtn, SpeakEnBtn, SpeakEnIconBtn, SpeakEnPill, ActionBtn, StarCount, FlashcardMode, QuizMode, MatchMode, SpeakMode, ScrambleMode, WriteMode, SayItMode, LevelExamScreen } from './AppA.jsx';
import { StoryListScreen, StoryScreen, FamilySetupScreen, ListenMode, CoreWordsScreen, EditProfileScreen, DailyReviewScreen } from './AppB.jsx';
import { SwitchFamilyScreen, ManageFamilyScreen, VerbChartScreen, ConjugationPractice, GrammarLessonScreen, ConjugationScreen } from './AppC.jsx';

// ══ PROFILE SELECT ════════════════════════════════════════════════════════════
export function ProfileSelectScreen({profiles,onSelect,onCreate}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px 40px"}}>
      <div style={{paddingTop:52,textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56}}>🌍</div>
        <div style={{fontSize:34,color:"white",lineHeight:1,marginTop:8,...DS}}>Wander Lingo</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.6)",marginTop:6}}>Who's exploring today?</div>
      </div>
      <div style={{width:"100%",maxWidth:400,display:"flex",flexDirection:"column",gap:12}}>
        {profiles.map(p=>(
          <button key={p.id} onClick={()=>onSelect(p)} style={{width:"100%",padding:"16px 20px",borderRadius:20,background:"rgba(255,255,255,.1)",border:`2.5px solid ${p.color}`,cursor:"pointer",display:"flex",alignItems:"center",gap:16,textAlign:"left",backdropFilter:"blur(8px)"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:20,color:"white",...DS}}>{p.name}</div>
              <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>⭐ {p.stars}</span>
                {p.streak>0&&<span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>🔥 {p.streak}d</span>}
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>🏅 {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.15)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Level {p.level||1}</span>
              </div>
            </div>
            <div style={{fontSize:24,color:p.color}}>›</div>
          </button>
        ))}
        <button onClick={onCreate} style={{width:"100%",padding:"16px 20px",borderRadius:20,background:"rgba(255,255,255,.06)",border:"2.5px dashed rgba(255,255,255,.3)",cursor:"pointer",color:"rgba(255,255,255,.7)",fontSize:16,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:24}}>＋</span> Add New Player
        </button>
      </div>
    </div>
  );
}

// ══ CREATE PROFILE ════════════════════════════════════════════════════════════
export function CreateProfileScreen({onDone,onBack}){
  const[name,setName]=useState("");
  const[avatar,setAvatar]=useState(AVATARS[0]);
  const[color,setColor]=useState(PCOLORS[0]);
  const valid=name.trim().length>0;
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 20px 40px"}}>
      <div style={{width:"100%",maxWidth:400}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:24,cursor:"pointer",marginBottom:16,fontFamily:"inherit"}}>← Back</button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 12px"}}>{avatar}</div>
          <div style={{fontSize:22,color:"white",...DS}}>Create Your Explorer</div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>YOUR NAME</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name..." maxLength={16} style={{width:"100%",padding:"14px 16px",borderRadius:16,border:"2px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",color:"white",fontSize:18,fontFamily:"inherit",fontWeight:700}}/>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>PICK YOUR EXPLORER</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
            {AVATARS.map(a=><button key={a} onClick={()=>setAvatar(a)} style={{aspectRatio:"1",borderRadius:12,background:avatar===a?color:"rgba(255,255,255,.1)",border:avatar===a?"2px solid white":"2px solid transparent",fontSize:22,cursor:"pointer"}}>{a}</button>)}
          </div>
        </div>
        <div style={{marginBottom:28}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>PICK YOUR COLOR</label>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {PCOLORS.map(c=><button key={c} onClick={()=>setColor(c)} style={{width:40,height:40,borderRadius:"50%",background:c,border:color===c?"3px solid white":"3px solid transparent",cursor:"pointer",transition:"all .15s"}}/>)}
          </div>
        </div>
        <ActionBtn onClick={()=>valid&&onDone(name.trim(),avatar,color)} bg={valid?color:"#374151"} style={{width:"100%",padding:16,fontSize:18,opacity:valid?1:.5}}>Start Exploring! 🗺️</ActionBtn>
      </div>
    </div>
  );
}

// ══ HOME SCREEN ═══════════════════════════════════════════════════════════════
export function HomeScreen({profile,onLearn,onDaily,onBoard,onMyProfile,onSwitch,onLevelChange,onStories,onCore,onConjugation,onExam,onExamPrompt,onShowStarInfo,dailyDone}){
  const lv=profile.level||1;
  const vocab=lv>=3?VOCAB_L3:lv>=2?VOCAB_L2:VOCAB_L1;
  const[showStarInfo,setShowStarInfo]=useState(false);
  const catKeys=Object.keys(vocab);
  const nextSuggested=getNextSuggestedCat(profile);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:profile.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{profile.avatar}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:18,color:"white",lineHeight:1,...DS}}>Hola, {profile.name}! 👋</div>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <StarCount count={profile.stars} color={profile.color}/>
            {profile.streak>0&&<span style={{display:"inline-flex",alignItems:"center",gap:3,background:"rgba(252,211,77,.15)",borderRadius:20,padding:"4px 10px"}}><span style={{fontSize:16}}>🔥</span><span style={{fontSize:15,fontWeight:900,color:"#FCD34D"}}>{profile.streak}</span></span>}
          </div>
        </div>
        <button onClick={onSwitch} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Switch</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 100px"}}>
        {/* Today's Path — suggested next step */}
        {nextSuggested&&(
          <button onClick={()=>onLearn(nextSuggested.key,nextSuggested.lv)} style={{width:"100%",padding:"16px",borderRadius:20,background:`linear-gradient(135deg,${nextSuggested.cat.color}22,${nextSuggested.cat.color}10)`,border:`2px solid ${nextSuggested.cat.color}`,cursor:"pointer",textAlign:"left",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:14,background:nextSuggested.cat.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{nextSuggested.cat.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:800,color:nextSuggested.cat.color,letterSpacing:.5,marginBottom:2}}>SUGGESTED NEXT</div>
              <div style={{fontSize:15,color:"white",fontWeight:800}}>{nextSuggested.cat.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:2}}>{nextSuggested.hint||"Tap to continue!"}</div>
            </div>
            <div style={{fontSize:22,color:nextSuggested.cat.color}}>›</div>
          </button>
        )}

        {/* Star system info modal — shows when tapping locked category */}
        {showStarInfo&&(
          <div onClick={()=>setShowStarInfo(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:16}}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#1E293B",borderRadius:24,padding:24,width:"100%",maxWidth:440,border:"1px solid rgba(255,255,255,.15)"}}>
              <div style={{fontSize:20,color:"white",fontWeight:800,marginBottom:16}}>How to unlock categories</div>
              {[
                {stars:"⭐",label:"1 Star",desc:"Try the Quiz in this category — any score counts!"},
                {stars:"⭐⭐",label:"2 Stars — unlocks next category",desc:"Score 70% or higher on the Quiz"},
                {stars:"⭐⭐⭐",label:"3 Stars — master status",desc:"Score 90%+ on Quiz AND complete 3 Say It rounds"},
              ].map(({stars,label,desc})=>(
                <div key={label} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
                  <div style={{fontSize:20,minWidth:52,textAlign:"center"}}>{stars}</div>
                  <div>
                    <div style={{fontSize:14,color:"#FCD34D",fontWeight:800}}>{label}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginTop:2}}>{desc}</div>
                  </div>
                </div>
              ))}
              <button onClick={()=>setShowStarInfo(false)} style={{width:"100%",padding:"12px",borderRadius:14,background:"#2563EB",border:"none",color:"white",fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:15,marginTop:4}}>Got it!</button>
            </div>
          </div>
        )}

        {/* Daily Challenge */}
        <button onClick={dailyDone?undefined:onDaily} style={{width:"100%",padding:"18px",borderRadius:22,background:dailyDone?"rgba(255,255,255,.06)":profile.color,border:dailyDone?"2px solid rgba(255,255,255,.12)":`2px solid ${profile.color}`,cursor:dailyDone?"default":"pointer",textAlign:"left",marginBottom:12,display:"flex",alignItems:"center",gap:14,opacity:dailyDone?.6:1}}>
          <span style={{fontSize:36}}>📅</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>{dailyDone?"Daily Challenge Done! ✓":"Daily Challenge — New Today!"}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:3}}>{dailyDone?"Come back tomorrow for a new one!":"5 questions · Same for everyone · Bonus stars!"}</div>
          </div>
          {!dailyDone&&<span style={{fontSize:22,color:"white"}}>›</span>}
        </button>

        {/* Quick access row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <button onClick={onStories} style={{padding:"16px 14px",borderRadius:18,background:"rgba(255,255,255,.08)",border:"2px solid rgba(255,255,255,.2)",cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:4}}>
            <span style={{fontSize:28}}>📖</span>
            <div style={{fontSize:13,color:"white",...DS}}>Stories</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Cuenca conversations</div>
          </button>
          <button onClick={onCore} style={{padding:"16px 14px",borderRadius:18,background:"rgba(255,255,255,.08)",border:"2px solid rgba(252,211,77,.4)",cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:4}}>
            <span style={{fontSize:28}}>⭐</span>
            <div style={{fontSize:13,color:"white",...DS}}>Core 1000</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Most common words</div>
          </button>
        </div>

        {/* Level selector with lock state */}
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {[
            {lv:1,label:"⭐ Beginner",emoji:"⭐"},
            {lv:2,label:"🚀 Intermediate",emoji:"🚀"},
            {lv:3,label:"🔥 Advanced",emoji:"🔥"},
          ].map(({lv:l,label,emoji})=>{
            const unlocked=canUnlockLevel(profile,l);
            const prog=l>1?getLevelProgress(profile,l):null;
            const active=lv===l;
            return(
              <button key={l} onClick={()=>{if(unlocked)onLevelChange(l);else if(l>1)onExamPrompt(l-1);}} style={{width:"100%",padding:"12px 16px",borderRadius:16,background:active?"white":unlocked?"rgba(255,255,255,.1)":"rgba(255,255,255,.04)",border:active?`2px solid ${profile.color}`:"2px solid rgba(255,255,255,.15)",cursor:unlocked?"pointer":"default",display:"flex",alignItems:"center",gap:10,transition:"all .2s"}}>
                <span style={{fontSize:22}}>{unlocked?emoji:"🔒"}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:14,fontWeight:800,color:active?profile.color:unlocked?"white":"rgba(255,255,255,.35)"}}>{label}</div>
                  {!unlocked&&prog&&<div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{prog.current}/{prog.needed} categories mastered to unlock</div>}
                  {unlocked&&active&&<div style={{fontSize:11,color:profile.color,marginTop:2}}>Currently selected</div>}
                </div>
                {active&&<div style={{width:8,height:8,borderRadius:"50%",background:profile.color}}/>}
              </button>
            );
          })}
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:6}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>{lv>=3?"ADVANCED":lv>=2?"INTERMEDIATE":"BEGINNER"} CATEGORIES</div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>onLearn("__review__",lv)} style={{padding:"5px 10px",borderRadius:12,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",color:"white",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Mix Review</button>
            <button onClick={()=>onExam(lv)} style={{padding:"5px 10px",borderRadius:12,background:"rgba(252,211,77,.15)",border:"1px solid rgba(252,211,77,.4)",color:"#FCD34D",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Level Exam</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {catKeys.map((key,ki)=>{
            const cat=vocab[key];
            const stars=getCatStars(profile,key,lv);
            const unlocked=isCatUnlocked(profile,key,lv);
            const suggested=nextSuggested&&nextSuggested.key===key&&nextSuggested.lv===lv;
            const starDisplay=["","⭐","⭐⭐","⭐⭐⭐"][stars]||"";
            return(
              <button key={key} onClick={()=>unlocked?onLearn(key,lv):setShowStarInfo(true)}
                style={{padding:"14px 8px",borderRadius:18,
                  background:suggested?`${cat.color}35`:stars>=3?`${cat.color}18`:"rgba(255,255,255,.07)",
                  border:suggested?`2.5px solid ${cat.color}`:stars>=3?`2px solid ${cat.color}60`:`2px solid ${unlocked?cat.color+"40":"rgba(255,255,255,.1)"}`,
                  cursor:unlocked?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",gap:5,position:"relative",
                  opacity:unlocked?1:0.45,transition:"all .2s"}}>
                {stars>=3&&<div style={{position:"absolute",top:3,right:3,fontSize:9,background:cat.color,color:"white",borderRadius:6,padding:"1px 5px",fontWeight:800}}>Done!</div>}
                {suggested&&<div style={{position:"absolute",top:3,left:3,fontSize:9,background:cat.color,color:"white",borderRadius:6,padding:"1px 5px",fontWeight:800}}>Next!</div>}
                {!unlocked&&<div style={{position:"absolute",top:3,right:3,fontSize:12}}>🔒</div>}
                <span style={{fontSize:unlocked?26:22}}>{cat.icon}</span>
                <span style={{fontSize:10,fontWeight:800,color:unlocked?"white":"rgba(255,255,255,.4)",textAlign:"center",lineHeight:1.2}}>{cat.label}</span>
                <div style={{fontSize:10,minHeight:14,color:"#FCD34D"}}>{starDisplay}</div>
                {stars===2&&getSayItProgress(profile,key,lv)<3&&(
                  <div style={{fontSize:9,color:"rgba(255,255,255,.5)",textAlign:"center",lineHeight:1.2}}>
                    🎤 {getSayItProgress(profile,key,lv)}/3 to unlock ⭐⭐⭐
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {profile.badges&&profile.badges.length>0&&(
          <div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,marginBottom:10,letterSpacing:.5}}>YOUR BADGES</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {profile.badges.slice(0,6).map(b=>{const bd=BADGE_DEF[b];return bd?<div key={b} style={{background:"rgba(255,255,255,.1)",borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:18}}>{bd.icon}</span><span style={{fontSize:11,color:"white",fontWeight:700}}>{bd.name}</span></div>:null;})}
              {profile.badges.length>6&&<div style={{background:"rgba(255,255,255,.06)",borderRadius:12,padding:"8px 12px",fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,alignSelf:"center"}}>+{profile.badges.length-6} more</div>}
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(15,23,42,.96)",backdropFilter:"blur(16px)",borderTop:"1px solid rgba(255,255,255,.1)",display:"flex",padding:"10px 0 16px"}}>
        {[{icon:"🏠",label:"Home",action:null},{icon:"🏆",label:"Leaderboard",action:onBoard},{icon:"🎖️",label:"My Profile",action:onMyProfile}].map(({icon,label,action})=>(
          <button key={label} onClick={action||undefined} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:action?"pointer":"default",opacity:action?1:.5}}>
            <span style={{fontSize:22}}>{icon}</span>
            <span style={{fontSize:11,color:"white",fontWeight:700}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ══ LEARN SCREEN ══════════════════════════════════════════════════════════════
export function LearnScreen({catKey,catLevel,profile,onBack,onEarn,onStat,onCatProgress,onBookmark,onSayItAttempt,onWordResult}){
  const[mode,setMode]=useState(catKey==="__review__"?"quiz":"flashcard");
  const vocab=catLevel>=3?VOCAB_L3:catLevel>=2?VOCAB_L2:VOCAB_L1;
  const allWords=catLevel>=3?ALL_WORDS_L3:catLevel>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  // Mix Review: shuffle all level words, pick 20, use Quiz mode by default
  const reviewWords=React.useMemo(()=>shuffle(allWords).slice(0,20),[catKey,catLevel]);
  const cat=catKey==="__review__"?{icon:"shuffle",label:"Mix Review",color:profile.color,words:reviewWords}:(vocab[catKey]||null);
  if(!cat)return null;
  const modes=[{id:"flashcard",label:"Cards"},{id:"quiz",label:"Quiz"},{id:"listen",label:"Listen"},{id:"scramble",label:"Scramble"},{id:"write",label:"Write It"},{id:"match",label:"Match"},{id:"sayit",label:"Say It"},{id:"speak",label:"Echo"}];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>{cat.icon} {cat.label}</div>
        <div style={{marginLeft:"auto"}}><StarCount count={profile.stars} color={profile.color}/></div>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 14px",flexWrap:"wrap",justifyContent:"center"}}>
        {modes.map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{flex:"1 1 80px",maxWidth:100,padding:"9px 0",borderRadius:20,background:mode===m.id?"white":"rgba(255,255,255,.12)",border:"none",color:mode===m.id?cat.color:"rgba(255,255,255,.8)",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",boxShadow:mode===m.id?"0 4px 12px rgba(0,0,0,.2)":"none"}}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{padding:"0 14px 40px",flex:1}}>
        <div style={{background:"white",borderRadius:28,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
          <div style={{textAlign:"center",marginBottom:16,fontSize:20,color:cat.color,...DS}}>{cat.icon} {cat.label}</div>
          {mode==="flashcard"&&<FlashcardMode key={`${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} bookmarked={profile.bookmarked||[]} onBookmark={onBookmark}/>}
          {mode==="quiz"     &&<QuizMode key={`q${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} allWords={allWords} onProgress={stars=>onCatProgress&&onCatProgress(catKey,catLevel,stars)} onWordResult={onWordResult}/>}
          {mode==="match"    &&<MatchMode key={`m${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
          {mode==="listen"   &&<ListenMode key={`l${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} allWords={allWords} onProgress={stars=>onCatProgress&&onCatProgress(catKey,catLevel,stars)}/>}
          {mode==="scramble"&&<ScrambleMode key={`sc${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
          {mode==="write"&&<WriteMode key={`wr${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
          {mode==="sayit"&&<SayItMode key={`si${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} onSayItAttempt={()=>onSayItAttempt&&onSayItAttempt(catKey,catLevel)}/>}
          {mode==="speak"&&<SpeakMode key={`s${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
        </div>
      </div>
    </div>
  );
}

// ══ DAILY CHALLENGE ═══════════════════════════════════════════════════════════
export function DailyScreen({profile,onBack,onComplete}){
  const{words}=getDailyWords(profile.level||1);
  const lv=profile.level||1;
  const pool=lv>=3?ALL_WORDS_L3:lv>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  const[idx,setIdx]=useState(0);
  const[opts,setOpts]=useState([]);
  const[selected,setSelected]=useState(null);
  const[score,setScore]=useState(0);
  const[done,setDone]=useState(false);
  const word=words[idx];

  useEffect(()=>{
    if(!word)return;
    const wrong=shuffle(pool.filter(w=>w.en!==word.en)).slice(0,3);
    setOpts(shuffle([word,...wrong]));setSelected(null);speakEs(word.es);
  },[idx]);

  const pick=opt=>{
    if(selected)return;setSelected(opt);
    if(opt.en===word.en)setScore(s=>s+1);
    setTimeout(()=>{if(idx<words.length-1)setIdx(i=>i+1);else setDone(true);},1200);
  };

  if(done)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:380}}>
        <div style={{fontSize:72}}>{score===5?"🏆":score>=3?"🌟":"💪"}</div>
        <div style={{fontSize:28,color:"white",margin:"8px 0",...DS}}>Daily Complete!</div>
        <div style={{fontSize:48,fontWeight:900,color:"#FCD34D"}}>{score}/5</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginTop:4,marginBottom:8}}>{score===5?"Flawless! ¡Perfecto!":score>=3?"Great job!":"Practice makes perfect!"}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.5)",marginBottom:24}}>+{score*3} bonus stars earned!</div>
        <ActionBtn onClick={()=>onComplete(score)} bg={profile.color} style={{width:"100%",padding:16,fontSize:16}}>Back to Home 🏠</ActionBtn>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}><div style={{fontSize:18,color:"white",...DS}}>📅 Daily Challenge</div><div style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>Same for everyone today!</div></div>
        <div style={{fontSize:14,color:"#FCD34D",fontWeight:900}}>{idx+1}/5</div>
      </div>
      <div style={{flex:1,padding:"20px 14px"}}>
        <div style={{width:"100%",height:8,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:20}}>
          <div style={{height:"100%",borderRadius:99,background:"#FCD34D",width:`${(idx/5)*100}%`,transition:"width .4s"}}/>
        </div>
        <div style={{background:"white",borderRadius:24,padding:"22px 20px",border:"3px solid #FCD34D",boxShadow:"0 8px 28px rgba(0,0,0,.3)",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:28,color:"#1F2937",...DS}}>{word.es}</div>
          <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}>
            <SpeakEsBtn text={word.es} color="#F59E0B" size={40}/><span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {opts.map((opt,i)=>{
            const isC=opt.en===word.en,isCh=selected?.en===opt.en;
            let bg="white",border="#E5E7EB";
            if(selected){if(isC){bg="#D1FAE5";border="#10B981";}else if(isCh){bg="#FEE2E2";border="#EF4444";}}
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:16,background:bg,border:`2px solid ${border}`,transition:"all .2s"}}>
                <button onClick={()=>pick(opt)} style={{flex:1,background:"none",border:"none",textAlign:"left",fontSize:16,fontWeight:700,cursor:selected?"default":"pointer",color:"#1F2937",fontFamily:"inherit",padding:0}}>{opt.en}</button>
                <SpeakEnBtn text={opt.en} color={selected&&isC?"#10B981":"#F59E0B"}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══ LEADERBOARD ═══════════════════════════════════════════════════════════════
export function LeaderboardScreen({profiles,onBack}){
  const sorted=[...profiles].sort((a,b)=>b.stars-a.stars);
  const medals=["👑","🥈","🥉"];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>🏆 Family Leaderboard</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {sorted.map((p,i)=>(
          <div key={p.id} style={{background:i===0?"rgba(252,211,77,.12)":"rgba(255,255,255,.06)",border:i===0?"2px solid #FCD34D":"2px solid rgba(255,255,255,.1)",borderRadius:20,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:28,width:36,textAlign:"center"}}>{medals[i]||String(i+1)}</div>
            <div style={{width:48,height:48,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,color:"white",...DS}}>{p.name}</div>
              <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>🔥 {p.streak}d</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>🏅 {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.12)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Lv {p.level||1}</span>
              </div>
            </div>
            <div style={{fontSize:22,fontWeight:900,color:"#FCD34D"}}>⭐ {p.stars}</div>
          </div>
        ))}
        {profiles.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,.4)",padding:40,fontSize:16}}>No explorers yet!</div>}
      </div>
    </div>
  );
}

// ══ MY PROFILE ════════════════════════════════════════════════════════════════
export function MyProfileScreen({profile,onBack,familyCode,onEdit,onSwitchFamily,onManageMembers}){
  const allBadges=Object.entries(BADGE_DEF);
  const earned=new Set(profile.badges||[]);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>🎖️ Explorer Card</div>
        <button onClick={onEdit} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:12,padding:"7px 14px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Edit Profile</button>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:16,overflowY:"auto",paddingBottom:40}}>
        <div style={{background:`linear-gradient(135deg,${profile.color},${profile.color}99)`,borderRadius:24,padding:24,textAlign:"center"}}>
          <div style={{fontSize:56}}>{profile.avatar}</div>
          <div style={{fontSize:26,color:"white",marginTop:8,...DS}}>{profile.name}</div>
          <div style={{display:"inline-block",background:"rgba(255,255,255,.2)",borderRadius:12,padding:"4px 12px",fontSize:13,color:"white",fontWeight:700,marginTop:4}}>Level {profile.level||1}</div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>⭐ {profile.stars}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Stars</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>🔥 {profile.streak}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Streak</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>🏅 {(profile.badges||[]).length}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Badges</div></div>
          </div>
        </div>
        {familyCode&&(
          <div style={{background:"rgba(0,0,0,.25)",borderRadius:14,padding:"12px 16px",textAlign:"center",marginBottom:8}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5,marginBottom:6}}>YOUR FAMILY CODE</div>
            <div style={{fontSize:24,fontWeight:900,color:"#FCD34D",letterSpacing:6}}>{familyCode}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:4}}>Share this code with family members so they can join your leaderboard when they log in!</div>
          </div>
        )}
        {/* Family management buttons */}
        <div style={{display:"flex",gap:8,marginBottom:4}}>
          <button onClick={onSwitchFamily} style={{flex:1,padding:"10px",borderRadius:14,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",color:"white",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>Switch Family</button>
          <button onClick={onManageMembers} style={{flex:1,padding:"10px",borderRadius:14,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",color:"white",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>Manage Members</button>
        </div>
        {/* Bookmarked words summary */}
        {(profile.bookmarked||[]).length>0&&(
          <div style={{background:"rgba(252,211,77,.08)",border:"1px solid rgba(252,211,77,.2)",borderRadius:16,padding:"14px 16px"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#FCD34D",letterSpacing:.5,marginBottom:8}}>🔖 SAVED FOR REVIEW ({(profile.bookmarked||[]).length} words)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {(profile.bookmarked||[]).slice(0,12).map(es=>(
                <div key={es} style={{padding:"4px 10px",borderRadius:20,background:"rgba(252,211,77,.15)",border:"1px solid rgba(252,211,77,.3)",fontSize:12,color:"white",fontWeight:600}}>{es}</div>
              ))}
              {(profile.bookmarked||[]).length>12&&<div style={{padding:"4px 10px",fontSize:12,color:"rgba(255,255,255,.4)",alignSelf:"center"}}>+{(profile.bookmarked||[]).length-12} more</div>}
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:8}}>These appear in your daily review when you log in.</div>
          </div>
        )}
        <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>ALL BADGES</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {allBadges.map(([key,bd])=>{
            const got=earned.has(key);
            return(
              <div key={key} style={{background:got?"rgba(255,255,255,.1)":"rgba(255,255,255,.03)",border:got?"1px solid rgba(255,255,255,.2)":"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"12px 14px",opacity:got?1:.35,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:24}}>{bd.icon}</span>
                <div><div style={{fontSize:12,fontWeight:800,color:"white"}}>{bd.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>{bd.desc}</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══ MAIN APP ══════════════════════════════════════════════════════════════════
