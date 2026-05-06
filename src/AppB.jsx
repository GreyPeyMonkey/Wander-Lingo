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

// ══ STORY LIST SCREEN ═════════════════════════════════════════════════════════
export function StoryListScreen({onBack,onStory,profile}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>📖 Stories</div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:4}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:12,lineHeight:1.5}}>
          Real conversations from Cuenca! Tap any line to hear it spoken. Use the English hint if you need help. 🎧
        </div>
        {STORIES.map(story=>(
          <button key={story.id} onClick={()=>onStory(story)} style={{width:"100%",padding:"18px",borderRadius:20,background:"rgba(255,255,255,.08)",border:`2px solid ${story.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",marginBottom:10}}>
            <div style={{width:56,height:56,borderRadius:16,background:`${story.color}30`,border:`2px solid ${story.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{story.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:17,color:"white",...DS}}>{story.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>{story.titleEn} &nbsp;•&nbsp; {story.panels.length} lines</div>
            </div>
            <div style={{fontSize:22,color:story.color}}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ══ STORY SCREEN — full comic strip with per-line audio ═══════════════════════
export function StoryScreen({story,onBack,onComplete}){
  const[idx,setIdx]=useState(0);
  const[showEn,setShowEn]=useState(false);
  const[autoPlayed,setAutoPlayed]=useState(false);
  const panels=story.panels;
  const panel=panels[idx];
  const isScene=!!panel.scene;
  const isLast=idx===panels.length-1;

  // Auto-play Spanish when panel changes
  useEffect(()=>{
    setShowEn(false);setAutoPlayed(false);
    const timer=setTimeout(()=>{
      if(isScene){speakEs(panel.sceneEs);}else{speakEs(panel.es);}
      setAutoPlayed(true);
    },300);
    return()=>clearTimeout(timer);
  },[idx]);

  const next=()=>{
    if(isLast){onComplete();}else{setIdx(i=>i+1);}
  };
  const prev=()=>{ if(idx>0)setIdx(i=>i-1); };

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:17,color:"white",...DS}}>{story.emoji} {story.title}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Line {idx+1} of {panels.length}</div>
        </div>
        <div style={{fontSize:13,color:story.color,fontWeight:900,background:`${story.color}20`,padding:"6px 12px",borderRadius:20}}>{idx+1}/{panels.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{width:"100%",height:5,background:"rgba(255,255,255,.1)"}}>
        <div style={{height:"100%",background:story.color,width:`${((idx+1)/panels.length)*100}%`,transition:"width .4s"}}/>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"20px 16px",gap:14}}>
        {isScene?(
          /* Scene description panel */
          <div style={{background:`${story.color}15`,border:`2px solid ${story.color}40`,borderRadius:24,padding:"22px 20px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:8}}>🎬</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,.85)",lineHeight:1.6,fontStyle:"italic"}}>
              {panel.scene}
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:14,gap:10}}>
              <button onClick={()=>speakEs(panel.sceneEs)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:story.color,border:"none",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span>🔊</span><span>Hear in Spanish</span>
              </button>
            </div>
          </div>
        ):(
          /* Dialogue panel */
          <div style={{background:"white",borderRadius:24,padding:"22px 20px",boxShadow:`0 8px 32px ${story.color}30`,border:`3px solid ${story.color}`}}>
            {/* Speaker */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:`${story.color}20`,border:`2px solid ${story.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{panel.avatar}</div>
              <div style={{fontSize:15,fontWeight:800,color:story.color}}>{panel.speaker}</div>
            </div>

            {/* Speech bubble */}
            <div style={{background:`${story.color}08`,borderRadius:16,padding:"16px",marginBottom:14,position:"relative"}}>
              <div style={{fontSize:20,color:"#1F2937",lineHeight:1.5,fontWeight:700}}>{panel.es}</div>
            </div>

            {/* Audio buttons */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>speakEs(panel.es)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:20,background:story.color,border:"none",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white",flex:1}}>
                <span style={{fontSize:18}}>🔊</span><span>Hear it!</span>
              </button>
              <button onClick={()=>setShowEn(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:20,background:showEn?"#6B7280":"rgba(107,114,128,.15)",border:"2px solid #6B7280",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:showEn?"white":"#374151",flex:1}}>
                <span>{showEn?"👁️":"👁️"}</span><span>{showEn?"Hide English":"Show English"}</span>
              </button>
            </div>

            {showEn&&(
              <div style={{marginTop:12,padding:"12px 14px",background:"#F9FAFB",borderRadius:12,border:"1.5px solid #E5E7EB",display:"flex",alignItems:"center",gap:10}}>
                <div style={{flex:1,fontSize:14,color:"#374151",fontStyle:"italic"}}>{panel.en}</div>
                <SpeakEnBtn text={panel.en} color="#6B7280"/>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{display:"flex",gap:10,marginTop:"auto"}}>
          <ActionBtn onClick={prev} bg="rgba(255,255,255,.1)" color="rgba(255,255,255,.7)" style={{flex:1,opacity:idx===0?.4:1}}>← Back</ActionBtn>
          <ActionBtn onClick={next} bg={story.color} style={{flex:1.6,padding:"14px 20px",fontSize:16}}>
            {isLast?"Finish Story! 🎉":"Next →"}
          </ActionBtn>
        </div>
      </div>
    </div>
  );
}


// ══ FAMILY SETUP SCREEN (first launch only) ════════════════════════════════════
export function FamilySetupScreen({ onDone }) {
  const [mode, setMode] = useState(null);
  const [familyName, setFamilyName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdCode, setCreatedCode] = useState('');

  const handleCreate = async () => {
    if (!familyName.trim()) return;
    setLoading(true);
    const family = await createFamily(familyName.trim());
    if (family) { setCreatedCode(family.code); }
    setLoading(false);
  };

  const handleJoin = async () => {
    if (code.length < 6) return;
    setLoading(true); setError('');
    const family = await joinFamily(code);
    if (family) { onDone(); }
    else { setError("Code not found — double-check spelling and try again!"); setLoading(false); }
  };

  if (createdCode) return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ textAlign:"center", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", borderRadius:28, padding:36, width:"100%", maxWidth:380 }}>
        <div style={{ fontSize:56 }}>🎉</div>
        <div style={{ fontSize:26, color:"white", marginTop:8, ...DS }}>Family Created!</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", marginTop:8, marginBottom:20 }}>
          Your family code is below. Write it down or take a screenshot — share it with anyone you want to join your leaderboard!
        </div>
        <div style={{ background:"#FCD34D", borderRadius:20, padding:"16px 24px", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#78350F", letterSpacing:1, marginBottom:4 }}>YOUR FAMILY CODE</div>
          <div style={{ fontSize:48, fontWeight:900, color:"#1F2937", letterSpacing:8 }}>{createdCode}</div>
        </div>
        <ActionBtn onClick={onDone} bg="#10B981" style={{ width:"100%", padding:16, fontSize:16 }}>
          Let's Start Playing! 🌍
        </ActionBtn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ paddingBottom:32, textAlign:"center" }}>
        <div style={{ fontSize:56 }}>🌍</div>
        <div style={{ fontSize:32, color:"white", lineHeight:1, marginTop:8, ...DS }}>Wander Lingo</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.6)", marginTop:8 }}>
          First, let's set up your family group!
        </div>
      </div>

      {!mode && (
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={() => setMode('create')} style={{ padding:"20px", borderRadius:20, background:"#2563EB", border:"none", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>✨</span>
            <div style={{ textAlign:"left" }}>
              <div>Create a New Family</div>
              <div style={{ fontSize:12, fontWeight:500, opacity:.8, marginTop:2 }}>First time? Start here</div>
            </div>
          </button>
          <button onClick={() => setMode('join')} style={{ padding:"20px", borderRadius:20, background:"rgba(255,255,255,.1)", border:"2px solid rgba(255,255,255,.3)", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>🔑</span>
            <div style={{ textAlign:"left" }}>
              <div>Join with a Family Code</div>
              <div style={{ fontSize:12, fontWeight:500, opacity:.8, marginTop:2 }}>Someone already made one</div>
            </div>
          </button>
        </div>
      )}

      {mode === 'create' && (
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", textAlign:"center", lineHeight:1.5 }}>
            Give your family a name. You'll get a code to share with anyone you want on your leaderboard!
          </div>
          <input value={familyName} onChange={e => setFamilyName(e.target.value)}
            placeholder="e.g. The Wanderers" maxLength={30}
            style={{ padding:"14px 16px", borderRadius:16, border:"2px solid rgba(255,255,255,.2)", background:"rgba(255,255,255,.1)", color:"white", fontSize:18, fontFamily:"inherit", fontWeight:700 }} />
          <ActionBtn onClick={handleCreate} bg={familyName.trim() ? "#10B981" : "#374151"} style={{ padding:16, fontSize:16, opacity: familyName.trim() ? 1 : 0.5 }}>
            {loading ? "Creating..." : "Create Family! 🎉"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>← Back</button>
        </div>
      )}

      {mode === 'join' && (
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", textAlign:"center", lineHeight:1.5 }}>
            Enter the 6-letter code from the person who created your family
          </div>
          <input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="ABCDEF" maxLength={6}
            style={{ padding:"14px 16px", borderRadius:16, border:"2px solid rgba(255,255,255,.2)", background:"rgba(255,255,255,.1)", color:"white", fontSize:36, fontFamily:"inherit", fontWeight:900, textAlign:"center", letterSpacing:8 }} />
          {error && <div style={{ color:"#FCA5A5", fontSize:13, textAlign:"center" }}>{error}</div>}
          <ActionBtn onClick={handleJoin} bg={code.length >= 6 ? "#10B981" : "#374151"} style={{ padding:16, fontSize:16, opacity: code.length >= 6 ? 1 : 0.5 }}>
            {loading ? "Joining..." : "Join Family! 🔑"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>← Back</button>
        </div>
      )}
    </div>
  );
}

// ══ LISTEN MODE ═══════════════════════════════════════════════════════════════
export function ListenMode({words,color,onEarn,onStat,allWords,onProgress}){
  const[phase,setPhase]=useState("quiz");
  const[queue]=useState(()=>shuffle(words));
  const[missed,setMissed]=useState([]);
  const[idx,setIdx]=useState(0);
  const[opts,setOpts]=useState([]);
  const[selected,setSelected]=useState(null);
  const[played,setPlayed]=useState(false);
  const[score,setScore]=useState(0);
  const[speed,setSpeed]=useState("normal");
  const currentQueue=phase==="retry"?missed:queue;
  const word=currentQueue[idx];

  const playWord=useCallback((spd)=>{
    if(!word)return;
    setPlayed(true);
    if((spd||speed)==="fast")speakEsFast(word.es);
    else speakEs(word.es);
  },[word,speed]);

  useEffect(()=>{
    if(!word)return;
    const wrong=shuffle(allWords.filter(w=>w.en!==word.en)).slice(0,3);
    setOpts(shuffle([word,...wrong]));setSelected(null);setPlayed(false);
    const t=setTimeout(()=>playWord(),500);return()=>clearTimeout(t);
  },[idx,phase]);

  const pick=opt=>{
    if(selected||!word)return;setSelected(opt);
    const ok=opt.en===word.en;
    if(ok){setScore(s=>s+1);onEarn(2);onStat("quiz");}
    else setMissed(m=>[...m,word]);
    setTimeout(()=>setIdx(i=>i+1),1500);
  };

  const restart=()=>{setPhase("quiz");setMissed([]);setIdx(0);setScore(0);setSelected(null);setPlayed(false);};

  if(!word){
    const mc=missed.length;
    if(phase==="quiz")return(
      <div style={{textAlign:"center",padding:"28px 16px"}}>
        <div style={{fontSize:64}}>{score===queue.length?"🏆":score>queue.length*0.7?"🌟":"💪"}</div>
        <div style={{fontSize:22,color,...DS,marginTop:8}}>Listen Round Done!</div>
        <div style={{fontSize:36,fontWeight:900,color:"#FCD34D",margin:"6px 0"}}>{score}/{queue.length}</div>
        <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>{mc>0?`Missed ${mc} — practice them!`:"Perfect ears! ¡Increíble!"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {mc>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:12}}>Practice Missed 🔁</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12}}>Start Over 🔄</ActionBtn>
        </div>
      </div>
    );
    return(<div style={{textAlign:"center",padding:"28px 16px"}}><div style={{fontSize:64}}>🎉</div><div style={{fontSize:22,color,...DS,marginTop:8}}>Retry Done!</div><ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12,marginTop:16}}>Start Fresh 🔄</ActionBtn></div>);
  }

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Speed:</span>
        {[{id:"normal",label:"🐢 Slow & Clear"},{id:"fast",label:"⚡ Real Speed"}].map(s=>(
          <button key={s.id} onClick={()=>setSpeed(s.id)} style={{padding:"5px 12px",borderRadius:16,background:speed===s.id?color:"#F3F4F6",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:speed===s.id?"white":"#6B7280"}}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"🔁 Retry — ":""}{idx+1}/{currentQueue.length} &nbsp;•&nbsp; ✅ {score} right
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQueue.length)*100}%`,transition:"width .4s"}}/>
      </div>

      <div style={{width:"100%",background:"white",borderRadius:24,padding:"28px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:14}}>👂 LISTEN — WHAT DO YOU HEAR?</div>
        <button onClick={()=>playWord(speed)} style={{width:96,height:96,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:40,cursor:"pointer",boxShadow:`0 8px 28px ${color}50`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
          {played?"🔊":"▶️"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:10}}>
          {played?"Tap to hear again!":"Tap ▶️ to hear the Spanish word"}
        </div>
        {played&&!selected&&<div style={{fontSize:40,marginTop:10,opacity:.6}}>{word.emoji}</div>}
        {selected&&(
          <div style={{marginTop:12,padding:"10px 16px",background:`${color}12`,borderRadius:14}}>
            <div style={{fontSize:22,color,...DS}}>{word.es}</div>
            <div style={{fontSize:12,color:"#6B7280",marginTop:2}}>The Spanish word revealed</div>
          </div>
        )}
      </div>

      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:600,textAlign:"center"}}>
        {!played?"Tap ▶️ first — then choose the English meaning!":"Choose the English meaning:"}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",opacity:played?1:0.35,pointerEvents:played?"auto":"none",transition:"opacity .3s"}}>
        {opts.map((opt,i)=>{
          const isC=opt.en===word.en,isCh=selected?.en===opt.en;
          let bg="white",bdr="#E5E7EB",tc="#1F2937";
          if(selected){if(isC){bg="#D1FAE5";bdr="#10B981";}else if(isCh){bg="#FEE2E2";bdr="#EF4444";}}
          return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:16,background:bg,border:`2px solid ${bdr}`,transition:"all .2s"}}>
              <button onClick={()=>pick(opt)} style={{flex:1,background:"none",border:"none",textAlign:"left",fontSize:16,fontWeight:700,cursor:selected?"default":"pointer",color:tc,fontFamily:"inherit",padding:0,lineHeight:1.3}}>{opt.en}</button>
              <SpeakEnBtn text={opt.en} color={isC&&selected?"#10B981":isCh&&selected?"#EF4444":color}/>
            </div>
          );
        })}
      </div>
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"✅ ¡Correcto! Your ears are sharp!":"❌ Keep training! It was \""+word.en+"\""}</div>}
    </div>
  );
}


// == CORE 1000 SCREEN ==
export function CoreWordsScreen({onBack,profile}){
  const[activeSet,setActiveSet]=useState(null);
  const[mode,setMode]=useState("quiz");
  const allCoreWords=CORE_SETS.flatMap(s=>s.words);

  if(activeSet!==null){
    const set=CORE_SETS[activeSet];
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setActiveSet(null)} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{fontSize:18,color:"white",...DS}}>{set.title}</div>
        </div>
        <div style={{display:"flex",gap:6,padding:"12px 14px",flexWrap:"wrap",justifyContent:"center"}}>
          {[{id:"flashcard",label:"Cards"},{id:"quiz",label:"Quiz"},{id:"write",label:"Write It"}].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)} style={{flex:"1 1 80px",maxWidth:110,padding:"9px 0",borderRadius:20,background:mode===m.id?"white":"rgba(255,255,255,.12)",border:"none",color:mode===m.id?set.color:"rgba(255,255,255,.8)",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
              {m.label}
            </button>
          ))}
        </div>
        <div style={{padding:"0 14px 40px",flex:1}}>
          <div style={{background:"white",borderRadius:28,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
            {mode==="flashcard"&&<FlashcardMode key={`cf${activeSet}`} words={set.words} color={set.color} onEarn={()=>{}}/>}
            {mode==="quiz"     &&<QuizMode key={`cq${activeSet}`} words={set.words} color={set.color} onEarn={()=>{}} onStat={()=>{}} allWords={allCoreWords}/>}
            {mode==="write"    &&<WriteMode key={`cw${activeSet}`} words={set.words} color={set.color} onEarn={()=>{}} onStat={()=>{}}/>}
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{flex:1}}>
          <div style={{fontSize:20,color:"white",...DS}}>Core 1000 Words</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Most common Spanish words in conversation</div>
        </div>
      </div>
      <div style={{padding:"20px 16px",overflowY:"auto"}}>
        <div style={{background:"rgba(252,211,77,.1)",border:"1px solid rgba(252,211,77,.3)",borderRadius:16,padding:"14px 16px",marginBottom:20,fontSize:13,color:"rgba(255,255,255,.8)",lineHeight:1.6}}>
          Linguists say knowing the top 1000 most common words covers 85% of everyday conversation. These words appear in every level!
        </div>
        {CORE_SETS.map((set,i)=>(
          <button key={i} onClick={()=>setActiveSet(i)} style={{width:"100%",padding:"18px",borderRadius:20,background:"rgba(255,255,255,.08)",border:`2px solid ${set.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",marginBottom:10}}>
            <div style={{width:52,height:52,borderRadius:14,background:`${set.color}25`,border:`2px solid ${set.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,color:"white",fontWeight:900}}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,color:"white",...DS}}>{set.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>{set.words.length} words with memory hooks</div>
            </div>
            <div style={{fontSize:22,color:set.color}}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// == EDIT PROFILE SCREEN ==
export function EditProfileScreen({profile,familyCode,onSave,onBack,onDelete}){
  const[name,setName]=useState(profile.name);
  const[avatar,setAvatar]=useState(profile.avatar);
  const[color,setColor]=useState(profile.color);
  const[copied,setCopied]=useState(false);
  const valid=name.trim().length>0;
  const copyCode=()=>{
    if(familyCode){navigator.clipboard?.writeText(familyCode).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}
  };
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 20px 40px"}}>
      <div style={{width:"100%",maxWidth:400}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:24,cursor:"pointer",marginBottom:16,fontFamily:"inherit"}}>Back</button>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 12px"}}>{avatar}</div>
          <div style={{fontSize:22,color:"white",...DS}}>Edit Your Explorer</div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>YOUR NAME</label>
          <input value={name} onChange={e=>setName(e.target.value)} maxLength={16} style={{width:"100%",padding:"14px 16px",borderRadius:16,border:"2px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",color:"white",fontSize:18,fontFamily:"inherit",fontWeight:700}}/>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>YOUR EXPLORER</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
            {AVATARS.map(a=><button key={a} onClick={()=>setAvatar(a)} style={{aspectRatio:"1",borderRadius:12,background:avatar===a?color:"rgba(255,255,255,.1)",border:avatar===a?"2px solid white":"2px solid transparent",fontSize:22,cursor:"pointer"}}>{a}</button>)}
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{color:"rgba(255,255,255,.7)",fontSize:12,fontWeight:700,display:"block",marginBottom:8,letterSpacing:.5}}>YOUR COLOR</label>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {PCOLORS.map(col=><button key={col} onClick={()=>setColor(col)} style={{width:40,height:40,borderRadius:"50%",background:col,border:color===col?"3px solid white":"3px solid transparent",cursor:"pointer",transition:"all .15s"}}/>)}
          </div>
        </div>
        {familyCode&&(
          <div style={{marginBottom:20,background:"rgba(252,211,77,.1)",border:"2px solid rgba(252,211,77,.3)",borderRadius:18,padding:"16px"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#FCD34D",letterSpacing:.5,marginBottom:6}}>YOUR FAMILY CODE</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:10,lineHeight:1.5}}>Share this code with family members so they can join your leaderboard when they log in!</div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{flex:1,background:"rgba(0,0,0,.3)",borderRadius:12,padding:"12px 16px",fontSize:28,fontWeight:900,color:"#FCD34D",letterSpacing:6,textAlign:"center"}}>{familyCode}</div>
              <button onClick={copyCode} style={{padding:"12px 16px",borderRadius:12,background:copied?"#10B981":"rgba(255,255,255,.15)",border:"none",color:"white",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13,flexShrink:0}}>
                {copied?"Copied!":"Copy"}
              </button>
            </div>
          </div>
        )}
        <ActionBtn onClick={()=>valid&&onSave(name.trim(),avatar,color)} bg={valid?color:"#374151"} style={{width:"100%",padding:16,fontSize:18,opacity:valid?1:.5}}>
          Save Changes
        </ActionBtn>
        <div style={{marginTop:8,borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:20}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:10,textAlign:"center"}}>Danger Zone</div>
          <button onClick={onDelete} style={{width:"100%",padding:"13px",borderRadius:16,background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.4)",color:"#FCA5A5",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>
            Delete My Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// == DAILY REVIEW SCREEN ==
export function DailyReviewScreen({profile,onComplete,onBookmark,onWordResult}){
  const missedWords=profile.missedWords||{};
  const bookmarked=profile.bookmarked||[];
  const allVocab=[...ALL_WORDS_L1,...ALL_WORDS_L2,...ALL_WORDS_L3];
  const reviewQueue=React.useMemo(()=>{
    // Missed words first, then bookmarked words not already in missed list
    const missedEntries=Object.entries(missedWords).filter(([_,d])=>d.count>=1).sort((a,b)=>b[1].count-a[1].count).slice(0,8);
    const missedList=missedEntries.map(([es])=>allVocab.find(w=>w.es===es)).filter(Boolean);
    const missedEs=new Set(missedList.map(w=>w.es));
    const bookmarkedList=bookmarked.map(es=>allVocab.find(w=>w.es===es)).filter(w=>w&&!missedEs.has(w.es)).slice(0,5);
    return shuffle([...missedList,...bookmarkedList]);
  },[]);

  const[idx,setIdx]=useState(0);
  const[opts,setOpts]=useState([]);
  const[selected,setSelected]=useState(null);
  const[score,setScore]=useState(0);
  const word=reviewQueue[idx];

  useEffect(()=>{
    if(!word)return;
    const wrong=shuffle(allVocab.filter(w=>w.en!==word.en)).slice(0,3);
    setOpts(shuffle([word,...wrong]));setSelected(null);speakEs(word.es);
  },[idx]);

  if(reviewQueue.length===0){onComplete();return null;}

  const pick=opt=>{
    if(selected)return;
    setSelected(opt);
    const correct=opt.en===word.en;
    if(correct){
      setScore(s=>s+1);
      // Correct answer auto-removes word from missed list
      if(onWordResult)onWordResult(word,true);
    }
    setTimeout(()=>{if(idx<reviewQueue.length-1)setIdx(i=>i+1);else onComplete(score+(correct?1:0));},1200);
  };

  if(!word)return null;

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontSize:18,color:"white",...DS}}>Daily Review</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>Words you have missed before - review these first!</div>
        </div>
        <div style={{fontSize:13,color:"#FCD34D",fontWeight:900}}>{idx+1}/{reviewQueue.length}</div>
      </div>
      <div style={{background:"rgba(252,211,77,.1)",borderBottom:"1px solid rgba(252,211,77,.2)",padding:"10px 16px",fontSize:13,color:"#FCD34D",fontWeight:600,textAlign:"center"}}>
        {reviewQueue.length} words to review — missed words and bookmarks. Complete these first!
      </div>
      <div style={{flex:1,padding:"20px 14px"}}>
        <div style={{width:"100%",height:8,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:20}}>
          <div style={{height:"100%",borderRadius:99,background:"#FCD34D",width:`${(idx/reviewQueue.length)*100}%`,transition:"width .4s"}}/>
        </div>
        <div style={{background:"white",borderRadius:24,padding:"22px 20px",border:"3px solid #FCD34D",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:8}}>WHAT DOES THIS MEAN?</div>
          <div style={{fontSize:28,color:"#1F2937",...DS}}>{word.es}</div>
          <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}>
            <SpeakEsBtn text={word.es} color="#F59E0B" size={40}/>
            <span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear</span>
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
        {/* For bookmarked words: show remove option */}
        {onBookmark&&(profile.bookmarked||[]).includes(word.es)&&(
          <button onClick={()=>onBookmark(word)} style={{display:"flex",alignItems:"center",gap:8,margin:"8px auto 0",padding:"8px 16px",borderRadius:14,background:"rgba(252,211,77,.1)",border:"1px solid rgba(252,211,77,.4)",color:"#FCD34D",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
            <span>🔖</span><span>I know this now — remove bookmark</span>
          </button>
        )}
        {/* For missed quiz words: explain auto-clear */}
        {!(profile.bookmarked||[]).includes(word.es)&&selected&&selected.en===word.es&&(
          <div style={{fontSize:12,color:"rgba(255,255,255,.4)",textAlign:"center",marginTop:6}}>
            Got it right — this word will drop off your review list!
          </div>
        )}
      </div>
    </div>
  );
}

