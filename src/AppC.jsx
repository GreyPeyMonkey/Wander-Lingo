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
import { SpeakEsBtn, SpeakEnBtn, SpeakEnIconBtn, SpeakEnPill, ActionBtn, StarCount, FlashcardMode, QuizMode, MatchMode, SpeakMode, ScrambleMode, WriteMode, SayItMode, LevelExamScreen } from './AppA.jsx';
import { StoryListScreen, StoryScreen, FamilySetupScreen, ListenMode, CoreWordsScreen, EditProfileScreen, DailyReviewScreen } from './AppB.jsx';

// ══ PROFILE MANAGEMENT SCREENS ═══════════════════════════════════════════════

export function SwitchFamilyScreen({onSwitch, onBack}) {
  const[mode,setMode]=useState(null); // 'create'|'join'
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[newCode,setNewCode]=useState(null);

  const handleCreate=async()=>{
    if(!input.trim())return;
    setLoading(true);setError("");
    const code=Math.random().toString(36).substring(2,8).toUpperCase();
    const{data}=await db.from('families').insert({code,name:input.trim()}).select().single();
    if(data){localStorage.setItem('wl_family_id',data.id);setNewCode(code);}
    else setError("Could not create family. Try again.");
    setLoading(false);
  };

  const handleJoin=async()=>{
    if(input.length<6)return;
    setLoading(true);setError("");
    const{data}=await db.from('families').select('*').eq('code',input.toUpperCase()).single();
    if(data){localStorage.setItem('wl_family_id',data.id);onSwitch();}
    else{setError("Family code not found. Check and try again.");setLoading(false);}
  };

  if(newCode)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:380}}>
        <div style={{fontSize:48,marginBottom:8}}>🎉</div>
        <div style={{fontSize:22,color:"white",...DS,marginBottom:8}}>New Family Created!</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:16}}>Share this code so others can join your leaderboard:</div>
        <div style={{background:"#FCD34D",borderRadius:16,padding:"14px 20px",marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:800,color:"#78350F",marginBottom:4}}>FAMILY CODE</div>
          <div style={{fontSize:42,fontWeight:900,color:"#1F2937",letterSpacing:8}}>{newCode}</div>
        </div>
        <ActionBtn onClick={onSwitch} bg="#10B981" style={{width:"100%",padding:14,fontSize:16}}>Continue</ActionBtn>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:400}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:22,cursor:"pointer",marginBottom:20,fontFamily:"inherit"}}>Back</button>
        <div style={{fontSize:24,color:"white",...DS,marginBottom:6}}>Switch Family</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:24}}>Join a different family group or create a new one. Your profile and progress stays with you.</div>
        {!mode&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <button onClick={()=>setMode('create')} style={{padding:"18px",borderRadius:18,background:"#2563EB",border:"none",color:"white",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:26}}>✨</span><div style={{textAlign:"left"}}><div>Create a New Family</div><div style={{fontSize:12,fontWeight:500,opacity:.8}}>Start fresh with a new code</div></div>
          </button>
          <button onClick={()=>setMode('join')} style={{padding:"18px",borderRadius:18,background:"rgba(255,255,255,.1)",border:"2px solid rgba(255,255,255,.3)",color:"white",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:26}}>🔑</span><div style={{textAlign:"left"}}><div>Join with a Code</div><div style={{fontSize:12,fontWeight:500,opacity:.8}}>Enter a 6-letter family code</div></div>
          </button>
        </div>}
        {mode==='create'&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>Give your new family a name:</div>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. The Wanderers" maxLength={30} style={{padding:"14px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",color:"white",fontSize:17,fontFamily:"inherit",fontWeight:700}}/>
          {error&&<div style={{color:"#FCA5A5",fontSize:13}}>{error}</div>}
          <ActionBtn onClick={handleCreate} bg={input.trim()?"#10B981":"#374151"} style={{padding:14,fontSize:15,opacity:input.trim()?1:.5}}>{loading?"Creating...":"Create Family"}</ActionBtn>
          <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Back</button>
        </div>}
        {mode==='join'&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>Enter the 6-letter family code:</div>
          <input value={input} onChange={e=>setInput(e.target.value.toUpperCase())} placeholder="ABCDEF" maxLength={6} style={{padding:"14px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",color:"white",fontSize:32,fontFamily:"inherit",fontWeight:900,textAlign:"center",letterSpacing:6}}/>
          {error&&<div style={{color:"#FCA5A5",fontSize:13}}>{error}</div>}
          <ActionBtn onClick={handleJoin} bg={input.length>=6?"#10B981":"#374151"} style={{padding:14,fontSize:15,opacity:input.length>=6?1:.5}}>{loading?"Joining...":"Join Family"}</ActionBtn>
          <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Back</button>
        </div>}
      </div>
    </div>
  );
}

export function ManageFamilyScreen({profile, profiles, onBack, onMemberRemoved}) {
  const[removing,setRemoving]=useState(null);
  const[done,setDone]=useState(false);
  const others=profiles.filter(p=>p.id!==profile.id);

  const removePlayer=async(player)=>{
    setRemoving(player.id);
    await db.from('players').delete().eq('id',player.id);
    onMemberRemoved(player.id);
    setRemoving(null);
  };

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{fontSize:18,color:"white",...DS}}>Manage Family Members</div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:10}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:4}}>You can remove members from your family. Their progress is permanently deleted.</div>
        {others.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,.4)",padding:40}}>No other family members yet.</div>}
        {others.map(p=>(
          <div key={p.id} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:16,color:"white",fontWeight:700}}>{p.name}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Level {p.level||1} · {p.stars||0} stars</div>
            </div>
            <button onClick={()=>removePlayer(p)} disabled={removing===p.id} style={{padding:"8px 14px",borderRadius:12,background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.5)",color:"#FCA5A5",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
              {removing===p.id?"Removing...":"Remove"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══ VERB CHART SCREEN ═════════════════════════════════════════════════════════
export function VerbChartScreen({verb, isIrregular, onBack, color}) {
  const forms = isIrregular ? verb.forms : {
    yo: verb.stem + (verb.type === 'ar' ? 'o' : 'o'),
    tu: verb.stem + (verb.type === 'ar' ? 'as' : 'es'),
    el: verb.stem + (verb.type === 'ar' ? 'a' : 'e'),
    nosotros: verb.stem + (verb.type === 'ar' ? 'amos' : verb.type === 'er' ? 'emos' : 'imos'),
    vosotros: verb.stem + (verb.type === 'ar' ? 'ais' : verb.type === 'er' ? 'eis' : 'is'),
    ellos: verb.stem + (verb.type === 'ar' ? 'an' : 'en'),
  };
  const pronLabels = {yo:"yo (I)", tu:"tu (you)", el:"el/ella (he/she)", nosotros:"nosotros (we)", vosotros:"vosotros (y'all)", ellos:"ellos (they)"};

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{flex:1}}>
          <div style={{fontSize:20,color:"white",...DS}}>{verb.inf} — {verb.en}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{isIrregular ? "Irregular verb — memorize these forms" : "Regular verb — follows the pattern"}</div>
        </div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:10}}>
        {/* Hook */}
        <div style={{background:`${color}12`,border:`1.5px solid ${color}40`,borderRadius:16,padding:"12px 14px",fontSize:13,color:"rgba(255,255,255,.8)",lineHeight:1.6}}>
          <span style={{color,fontWeight:800}}>Memory Hook: </span>{verb.hook}
        </div>
        {/* Conjugation table */}
        <div style={{background:"white",borderRadius:20,overflow:"hidden",boxShadow:`0 8px 28px ${color}25`}}>
          {Object.entries(forms).map(([pron, form], i) => (
            <div key={pron} style={{display:"flex",alignItems:"center",padding:"14px 16px",borderBottom:i<5?"1px solid #F3F4F6":"none",background:i%2===0?"white":"#FAFAFA"}}>
              <div style={{width:140,fontSize:13,color:"#6B7280",fontWeight:600}}>{pronLabels[pron]}</div>
              <div style={{flex:1,fontSize:20,color,fontWeight:900,...DS}}>{form}</div>
              <button onClick={()=>speakEs(form)} style={{width:36,height:36,borderRadius:"50%",background:`${color}15`,border:`1.5px solid ${color}40`,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🔊</button>
            </div>
          ))}
        </div>
        {/* Examples if irregular */}
        {isIrregular && verb.examples && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>REAL EXAMPLES</div>
            {verb.examples.map((ex,i) => (
              <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,color:"white",fontWeight:700}}>{ex.es}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>{ex.en}</div>
                </div>
                <button onClick={()=>speakEs(ex.es)} style={{width:34,height:34,borderRadius:"50%",background:`${color}15`,border:`1.5px solid ${color}40`,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🔊</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══ CONJUGATION PRACTICE MODE ═════════════════════════════════════════════════
export function ConjugationPractice({verbs, type, color, onBack, onEarn}) {
  const allForms = verbs.flatMap(v =>
    Object.entries(v.forms || {yo: v.stem+(type==='ar'?'o':'o'), tu: v.stem+(type==='ar'?'as':'es'), el: v.stem+(type==='ar'?'a':'e'), nosotros: v.stem+(type==='ar'?'amos':type==='er'?'emos':'imos'), vosotros: v.stem+(type==='ar'?'ais':type==='er'?'eis':'is'), ellos: v.stem+(type==='ar'?'an':'en')}).map(([pron, form]) => ({
      inf: v.inf, en: v.en, stem: v.stem || null,
      pronoun: pron, pronEn: {yo:"I", tu:"you", el:"he/she", nosotros:"we", vosotros:"you all", ellos:"they"}[pron],
      answer: form, type
    }))
  );

  const[queue]=useState(()=>shuffle(allForms));
  const[idx,setIdx]=useState(0);
  const[typed,setTyped]=useState("");
  const[result,setResult]=useState(null);
  const[score,setScore]=useState(0);
  const inputRef=useRef(null);
  const q=queue[idx%queue.length];

  useEffect(()=>{setTyped("");setResult(null);setTimeout(()=>inputRef.current?.focus(),100);},[idx]);

  const normV=s=>s.toLowerCase().replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n").trim();

  const check=()=>{
    if(!q||result)return;
    const ua=normV(typed), ca=normV(q.answer);
    if(ua===ca){setResult("correct");setScore(s=>s+1);onEarn(3);speakEs(q.answer);setTimeout(()=>setIdx(i=>i+1),1500);}
    else setResult("wrong");
  };

  const pColors={yo:"#E8445A",tu:"#DC6B19","el/ella":"#10B981",nosotros:"#3B82F6",vosotros:"#8B5CF6",ellos:"#F59E0B"};
  const pc=pColors[q?.pronoun]||color;

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Conjugate the verb! Score: {score} right</div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        {/* Pronoun — prominent */}
        <div style={{display:"inline-block",background:pc,borderRadius:20,padding:"6px 18px",fontSize:16,fontWeight:900,color:"white",marginBottom:12}}>
          {q.pronoun} ({q.pronEn})
        </div>
        {/* Infinitive */}
        <div style={{fontSize:28,color:"#1F2937",...DS}}>{q.inf}</div>
        <div style={{fontSize:14,color:"#6B7280",marginTop:4}}>{q.en}</div>
        <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}>
          <button onClick={()=>speakEs(`${q.pronoun} ${q.answer}`)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:`${color}15`,border:`1.5px solid ${color}50`,fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color}}>
            🔊 Hear answer
          </button>
        </div>
      </div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8}}>
        <input ref={inputRef} value={typed} onChange={e=>!result&&setTyped(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!result&&check()} placeholder={`${q.pronoun} _____ (${q.en})`} disabled={!!result} style={{width:"100%",padding:"16px",borderRadius:16,border:`2px solid ${result==="correct"?"#10B981":result==="wrong"?"#EF4444":color+"60"}`,fontSize:18,fontFamily:"inherit",fontWeight:700,color:"#1F2937",outline:"none",background:result==="correct"?"#D1FAE5":result==="wrong"?"#FEE2E2":"white",textAlign:"center",transition:"all .2s"}}/>
        <div style={{fontSize:11,color:"#9CA3AF",textAlign:"center"}}>Accents are optional — close spelling accepted</div>
      </div>
      {result&&(
        <div style={{width:"100%",borderRadius:16,padding:"14px",background:result==="correct"?"#D1FAE5":"#FEE2E2",border:`2px solid ${result==="correct"?"#10B981":"#EF4444"}`,textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:800,color:result==="correct"?"#10B981":"#EF4444"}}>
            {result==="correct"?"Perfecto!":"The answer: "+q.pronoun+" "+q.answer}
          </div>
        </div>
      )}
      {!result
        ?<ActionBtn onClick={check} bg={typed.trim()?color:"#9CA3AF"} style={{width:"100%",padding:14,fontSize:16,opacity:typed.trim()?1:.5}}>Check</ActionBtn>
        :<div style={{display:"flex",gap:10,width:"100%"}}>
          {result==="wrong"&&<ActionBtn onClick={()=>{setTyped("");setResult(null);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Try Again</ActionBtn>}
          <ActionBtn onClick={()=>setIdx(i=>i+1)} bg={color} style={{flex:1,padding:14}}>Next</ActionBtn>
        </div>
      }
    </div>
  );
}

// ══ GRAMMAR LESSON SCREEN ═════════════════════════════════════════════════════
export function GrammarLessonScreen({lesson, onBack}) {
  const[section,setSection]=useState(0);

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{flex:1}}>
          <div style={{fontSize:18,color:"white",...DS}}>{lesson.title}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{lesson.difficulty}</div>
        </div>
      </div>
      <div style={{padding:"20px 16px",overflowY:"auto",paddingBottom:80}}>
        {/* Hook card */}
        <div style={{background:`${lesson.color}15`,border:`2px solid ${lesson.color}40`,borderRadius:18,padding:"16px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:800,color:lesson.color,letterSpacing:.5,marginBottom:6}}>THE BIG IDEA</div>
          <div style={{fontSize:15,color:"white",lineHeight:1.6}}>{lesson.hook}</div>
          <button onClick={()=>speakEn(lesson.hook)} style={{display:"flex",alignItems:"center",gap:6,marginTop:10,padding:"6px 12px",borderRadius:12,background:`${lesson.color}20`,border:`1px solid ${lesson.color}40`,fontSize:12,cursor:"pointer",fontFamily:"inherit",color:lesson.color,fontWeight:700}}>
            🔊 Hear this
          </button>
        </div>
        {/* Section tabs */}
        <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
          {lesson.sections.map((s,i)=>(
            <button key={i} onClick={()=>setSection(i)} style={{padding:"6px 12px",borderRadius:14,background:section===i?lesson.color:"rgba(255,255,255,.1)",border:"none",color:section===i?"white":"rgba(255,255,255,.6)",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
              {s.heading.split(" — ")[0].substring(0,20)}
            </button>
          ))}
        </div>
        {/* Current section */}
        {lesson.sections[section]&&(
          <div>
            <div style={{fontSize:15,color:lesson.color,fontWeight:800,marginBottom:12}}>{lesson.sections[section].heading}</div>
            {lesson.sections[section].points.map((pt,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.07)",borderRadius:14,padding:"14px 16px",marginBottom:8,borderLeft:`3px solid ${lesson.color}`}}>
                <div style={{fontSize:14,color:"white",fontWeight:700,marginBottom:4}}>{pt.rule}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:pt.note?4:0}}>
                  <div style={{flex:1,fontSize:14,color:lesson.color,fontStyle:"italic"}}>{pt.example}</div>
                  <button onClick={()=>speakEs(pt.example.split(" — ")[0])} style={{width:30,height:30,borderRadius:"50%",background:`${lesson.color}15`,border:`1px solid ${lesson.color}30`,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🔊</button>
                </div>
                {pt.note&&<div style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:700}}>{pt.note}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══ MAIN CONJUGATION HUB ══════════════════════════════════════════════════════
export function ConjugationScreen({onBack, profile, onEarn}) {
  const[view,setView]=useState("hub"); // hub|patterns|regular|irregular|grammar|chart|practice|lesson
  const[selectedType,setSelectedType]=useState(null);
  const[selectedVerb,setSelectedVerb]=useState(null);
  const[selectedLesson,setSelectedLesson]=useState(null);
  const[isIrregular,setIsIrregular]=useState(false);

  if(view==="chart"&&selectedVerb){
    return <VerbChartScreen verb={selectedVerb} isIrregular={isIrregular} color={isIrregular?selectedVerb.color:CONJ_PATTERNS[selectedType]?.color||"#2563EB"} onBack={()=>setView(isIrregular?"irregular":"regular")}/>;
  }
  if(view==="practice"&&selectedType){
    const verbs=selectedType==="irregular"?IRREGULAR_VERBS:REGULAR_VERBS[selectedType]||[];
    const color=selectedType==="irregular"?"#E8445A":CONJ_PATTERNS[selectedType]?.color||"#2563EB";
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setView(selectedType==="irregular"?"irregular":"regular")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{fontSize:18,color:"white",...DS}}>Conjugation Practice</div>
        </div>
        <div style={{flex:1,padding:"14px 14px 40px"}}>
          <div style={{background:"white",borderRadius:24,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
            <ConjugationPractice verbs={verbs} type={selectedType} color={color} onBack={()=>setView(selectedType==="irregular"?"irregular":"regular")} onEarn={onEarn}/>
          </div>
        </div>
      </div>
    );
  }
  if(view==="lesson"&&selectedLesson){
    return <GrammarLessonScreen lesson={selectedLesson} onBack={()=>setView("grammar")}/>;
  }

  // Pattern view
  if(view==="patterns"){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setView("hub")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{fontSize:18,color:"white",...DS}}>The Ending Patterns</div>
        </div>
        <div style={{padding:"20px 16px",overflowY:"auto"}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:16,lineHeight:1.6}}>
            Almost all Spanish verbs follow one of three patterns. Learn these endings and you can conjugate thousands of verbs!
          </div>
          {Object.entries(CONJ_PATTERNS).map(([type,pat])=>(
            <div key={type} style={{background:"rgba(255,255,255,.07)",border:`2px solid ${pat.color}40`,borderRadius:18,padding:"18px",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{background:pat.color,borderRadius:10,padding:"4px 12px",fontSize:13,fontWeight:900,color:"white"}}>{type.toUpperCase()}</div>
                <div style={{fontSize:15,color:"white",fontWeight:700}}>{pat.label}</div>
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:10,fontStyle:"italic"}}>{pat.example}</div>
              <div style={{background:`${pat.color}10`,borderRadius:12,padding:"10px 12px",marginBottom:10,fontSize:13,color:"rgba(255,255,255,.8)"}}>
                {pat.hook}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {Object.entries(pat.endings).map(([pron,end])=>(
                  <div key={pron} style={{background:"rgba(255,255,255,.06)",borderRadius:10,padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:600}}>{pron}</span>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:14,color:pat.color,fontWeight:900}}>-{end}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
                {Object.entries(pat.memory).map(([pron,mem])=>(
                  <div key={pron} style={{fontSize:12,color:"rgba(255,255,255,.5)",display:"flex",gap:6}}>
                    <span style={{color:pat.color,fontWeight:700,minWidth:70}}>{pron}:</span>
                    <span>{mem}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Regular verbs list
  if(view==="regular"){
    const pat=CONJ_PATTERNS[selectedType];
    const verbs=REGULAR_VERBS[selectedType]||[];
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setView("hub")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{flex:1}}><div style={{fontSize:18,color:"white",...DS}}>{pat?.label}</div><div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Regular {selectedType?.toUpperCase()} verbs</div></div>
        </div>
        <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:3}}>
          <ActionBtn onClick={()=>{setView("practice");}} bg={pat?.color} style={{marginBottom:10,padding:14,fontSize:15}}>Practice All — Type the Conjugation</ActionBtn>
          {verbs.map((v,i)=>(
            <button key={i} onClick={()=>{setSelectedVerb({...v,type:selectedType});setIsIrregular(false);setView("chart");}} style={{width:"100%",padding:"14px 16px",borderRadius:16,background:"rgba(255,255,255,.07)",border:`1px solid ${pat?.color}30`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,marginBottom:6,textAlign:"left"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:16,color:"white",fontWeight:700}}>{v.inf}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>yo: {v.yo} &nbsp;·&nbsp; tu: {v.tu} &nbsp;·&nbsp; el: {v.el}</div>
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{v.en} ›</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Irregular verbs list
  if(view==="irregular"){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setView("hub")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{flex:1}}><div style={{fontSize:18,color:"white",...DS}}>Irregular Verbs</div><div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Most important verbs to memorize</div></div>
        </div>
        <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:3}}>
          <ActionBtn onClick={()=>{setSelectedType("irregular");setView("practice");}} bg="#E8445A" style={{marginBottom:10,padding:14,fontSize:15}}>Practice All Irregular Verbs</ActionBtn>
          {IRREGULAR_VERBS.map((v,i)=>(
            <button key={i} onClick={()=>{setSelectedVerb(v);setIsIrregular(true);setView("chart");}} style={{width:"100%",padding:"14px 16px",borderRadius:16,background:"rgba(255,255,255,.07)",border:`1px solid ${v.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,marginBottom:6,textAlign:"left"}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:v.color,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:16,color:"white",fontWeight:700}}>{v.inf} — {v.en}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>yo: {v.forms.yo} &nbsp;·&nbsp; tu: {v.forms.tu} &nbsp;·&nbsp; nosotros: {v.forms.nosotros}</div>
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>›</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Grammar lessons list
  if(view==="grammar"){
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setView("hub")} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
          <div style={{fontSize:18,color:"white",...DS}}>Grammar Lessons</div>
        </div>
        <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:4}}>Understand WHY Spanish works the way it does.</div>
          {GRAMMAR_LESSONS.map((lesson,i)=>(
            <button key={i} onClick={()=>{setSelectedLesson(lesson);setView("lesson");}} style={{width:"100%",padding:"18px",borderRadius:18,background:"rgba(255,255,255,.07)",border:`2px solid ${lesson.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left"}}>
              <div style={{width:48,height:48,borderRadius:14,background:`${lesson.color}20`,border:`2px solid ${lesson.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:lesson.color,flexShrink:0,textAlign:"center",lineHeight:1.2,padding:4}}>
                {lesson.difficulty}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,color:"white",fontWeight:800}}>{lesson.title}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3,lineHeight:1.4}}>{lesson.hook.substring(0,60)}...</div>
              </div>
              <div style={{fontSize:22,color:lesson.color}}>›</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Hub — main landing screen
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>Back</button>
        <div style={{flex:1}}>
          <div style={{fontSize:20,color:"white",...DS}}>Verbs and Grammar</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>The engine of the Spanish language</div>
        </div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:10}}>
        {/* Patterns — start here */}
        <button onClick={()=>setView("patterns")} style={{width:"100%",padding:"20px",borderRadius:20,background:"linear-gradient(135deg,#1E3A5F,#1D4ED8)",border:"2px solid #3B82F6",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:40}}>📐</div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,color:"white",fontWeight:800}}>The 3 Patterns — Start Here</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>-AR, -ER, -IR endings explained with memory hooks</div>
          </div>
          <div style={{fontSize:22,color:"#60A5FA"}}>›</div>
        </button>

        <div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:.5,marginTop:4}}>REGULAR VERBS</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {Object.entries(CONJ_PATTERNS).map(([type,pat])=>(
            <button key={type} onClick={()=>{setSelectedType(type);setView("regular");}} style={{padding:"16px 10px",borderRadius:16,background:`${pat.color}15`,border:`2px solid ${pat.color}40`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div style={{fontSize:24,fontWeight:900,color:pat.color}}>-{type.toUpperCase()}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.7)",textAlign:"center",lineHeight:1.3}}>{REGULAR_VERBS[type]?.length||0} verbs</div>
            </button>
          ))}
        </div>

        <button onClick={()=>setView("irregular")} style={{width:"100%",padding:"18px",borderRadius:18,background:"rgba(239,68,68,.12)",border:"2px solid rgba(239,68,68,.4)",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:34}}>⚡</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",fontWeight:800}}>Irregular Verbs — Must Know</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>ser, estar, tener, ir, hacer, querer, poder, saber</div>
          </div>
          <div style={{fontSize:22,color:"#F87171"}}>›</div>
        </button>

        <div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:.5,marginTop:4}}>GRAMMAR</div>
        <button onClick={()=>setView("grammar")} style={{width:"100%",padding:"18px",borderRadius:18,background:"rgba(139,92,246,.12)",border:"2px solid rgba(139,92,246,.4)",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:34}}>📖</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",fontWeight:800}}>Grammar Lessons</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>Ser vs. Estar, Tu vs. Usted, Gender, Word Order</div>
          </div>
          <div style={{fontSize:22,color:"#A78BFA"}}>›</div>
        </button>
      </div>
    </div>
  );
}

