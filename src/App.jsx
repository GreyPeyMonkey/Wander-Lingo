import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://jlqrxshoilgmcfaitxta.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpscXJ4c2hvaWxnbWNmYWl0eHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NTI5MjIsImV4cCI6MjA5MzQyODkyMn0.meCHs-9bxNxgu87lzjUoPFZY-5jsT2fXRrAMwUwcwcQ"
);

const T = {
  bg:"#FDF6EC", bgDark:"#2D1B69", cream:"#FDF6EC",
  purple:"#7C3AED", purpleL:"#A78BFA",
  blue:"#2563EB", blueL:"#60A5FA",
  gold:"#F59E0B", goldL:"#FCD34D",
  green:"#10B981", red:"#EF4444", orange:"#F97316",
  text:"#1C1917", textSoft:"#78716C", white:"#FFFFFF", card:"#FFFFFF",
};
const DS = { fontFamily:"'Nunito','Quicksand',system-ui,sans-serif", fontWeight:800 };

const LANDS = [
  { id:1,  name:"Greetings",     emoji:"👋", color:"#E8445A", level:"Beginner",     region:"Cuenca Plaza" },
  { id:2,  name:"Around Town",   emoji:"🏘️", color:"#F97316", level:"Beginner",     region:"Cuenca Streets" },
  { id:3,  name:"Family",        emoji:"🏠", color:"#F59E0B", level:"Beginner",     region:"Casa Familiar" },
  { id:4,  name:"Food",          emoji:"🍽️", color:"#10B981", level:"Beginner",     region:"Mercado Central" },
  { id:5,  name:"Feelings",      emoji:"🎭", color:"#3B82F6", level:"Beginner",     region:"Parque Calderon" },
  { id:6,  name:"Core Words 1",  emoji:"⭐", color:"#7C3AED", level:"Checkpoint",   region:"La Ruta Magica" },
  { id:7,  name:"School",        emoji:"🏫", color:"#E8445A", level:"Beginner",     region:"La Escuela" },
  { id:8,  name:"Numbers",       emoji:"🔢", color:"#F97316", level:"Beginner",     region:"El Mercado" },
  { id:9,  name:"Colors",        emoji:"🎨", color:"#8B5CF6", level:"Beginner",     region:"Arte de Cuenca" },
  { id:10, name:"Animals",       emoji:"🐾", color:"#10B981", level:"Beginner",     region:"El Campo" },
  { id:11, name:"Core Words 2",  emoji:"⭐", color:"#7C3AED", level:"Checkpoint",   region:"La Ruta Magica" },
  { id:12, name:"Verbs",         emoji:"⚡", color:"#F59E0B", level:"Intermediate", region:"Centro Historico" },
  { id:13, name:"Time",          emoji:"⏰", color:"#3B82F6", level:"Intermediate", region:"El Reloj" },
  { id:14, name:"Body",          emoji:"🧍", color:"#E8445A", level:"Intermediate", region:"La Clinica" },
  { id:15, name:"Descriptions",  emoji:"✨", color:"#8B5CF6", level:"Intermediate", region:"Las Galerias" },
  { id:16, name:"Shopping",      emoji:"🛍️", color:"#10B981", level:"Intermediate", region:"Artesanias" },
  { id:17, name:"Weather",       emoji:"🌦️", color:"#F97316", level:"Intermediate", region:"Los Andes" },
  { id:18, name:"Core Words 3",  emoji:"⭐", color:"#7C3AED", level:"Checkpoint",   region:"La Ruta Magica" },
  { id:19, name:"Core Words 4",  emoji:"⭐", color:"#7C3AED", level:"Checkpoint",   region:"La Ruta Magica" },
  { id:20, name:"Opinions",      emoji:"🗣️", color:"#E8445A", level:"Advanced",     region:"El Debate" },
  { id:21, name:"Travel",        emoji:"✈️", color:"#3B82F6", level:"Advanced",     region:"El Aeropuerto" },
  { id:22, name:"Health",        emoji:"🏥", color:"#10B981", level:"Advanced",     region:"La Farmacia" },
  { id:23, name:"Social Life",   emoji:"👥", color:"#F59E0B", level:"Advanced",     region:"La Fiesta" },
  { id:24, name:"Technology",    emoji:"📱", color:"#8B5CF6", level:"Advanced",     region:"El Cafe WiFi" },
  { id:25, name:"The Grand Final",emoji:"🏆", color:"#7C3AED", level:"Final Boss",   region:"La Gran Final" },
];

const speakEs = (text) => { try{ const u=new SpeechSynthesisUtterance(text); u.lang="es-ES"; u.rate=0.85; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch(e){} };
const speakEn = (text) => { try{ const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=0.9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch(e){} 
// ============================================================
// EXPLORER MODES + ACCESSIBLE AUDIO SYSTEM
// ============================================================
const EXPLORER_MODES = {
  little:   { id:"little",   label:"Little Explorer",  emoji:"🌱", desc:"Slowest audio, longest timers, extra encouragement",  rate:0.7,  timerMult:1.8, textScale:1.12, autoEncourage:true  },
  explorer: { id:"explorer", label:"Explorer",         emoji:"🧭", desc:"Normal pace, balanced challenge",                     rate:0.9,  timerMult:1.0, textScale:1.0,  autoEncourage:false },
  serious:  { id:"serious",  label:"Serious Explorer", emoji:"🎓", desc:"Fast audio, shorter timers, fewer hints",              rate:1.05, timerMult:0.75,textScale:0.95, autoEncourage:false },
};
function getMode(profile) {
  if (!profile) return EXPLORER_MODES.explorer;
  try {
    const stored = localStorage.getItem("wl_mode_" + profile.id);
    if (stored && EXPLORER_MODES[stored]) return EXPLORER_MODES[stored];
  } catch(e){}
  return EXPLORER_MODES.explorer;
}
function setProfileMode(profile, modeId) {
  if (!profile || !EXPLORER_MODES[modeId]) return;
  try { localStorage.setItem("wl_mode_" + profile.id, modeId); } catch(e){}
}
// Pass current profile mode to game components via a tiny context-y helper (kept as a prop, no React Context to stay simple)

// Queue-based audio sequence — uses speechSynthesis queueing
function speakSeq(items) {
  try {
    window.speechSynthesis.cancel();
    items.forEach(({text, lang, rate}) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || "es-ES";
      u.rate = rate || 0.9;
      window.speechSynthesis.speak(u);
    });
  } catch(e){}
}
// Auto-read sequence for a question + options. Returns estimated ms duration.
function autoReadQuestion(spanish, options, mode) {
  const m = mode || EXPLORER_MODES.explorer;
  const seq = [{ text: spanish, lang:"es-ES", rate: m.rate }];
  (options||[]).forEach(opt => seq.push({ text: opt, lang:"en-US", rate: m.rate }));
  speakSeq(seq);
  // estimate duration: ~ chars/12 seconds per item at rate 0.9
  return Math.round(((spanish.length + (options||[]).reduce((a,o)=>a+o.length,0)) / 11) * (1.1 / m.rate) * 1000) + 600;
}
function useAutoRead(spanish, options, deps, mode) {
  useEffect(() => {
    autoReadQuestion(spanish, options, mode);
    // eslint-disable-next-line
  }, deps);
}
function ReadAgainButton({ onReplay, color }) {
  return (
    <button onClick={onReplay} aria-label="Read again" style={{position:"absolute",top:14,right:14,background:"white",border:`2px solid ${color||"#7C3AED"}`,borderRadius:"50%",width:46,height:46,fontSize:22,cursor:"pointer",zIndex:20,boxShadow:`0 4px 12px ${(color||"#7C3AED")}55`,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>🔊</button>
  );
}
function EncouragementBubble({ correct, mode }) {
  if (!mode?.autoEncourage) return null;
  const msgs = correct ? ["¡Perfecto!","¡Muy bien!","¡Increíble!","¡Bravo!"] : ["¡Casi!","¡Try again!","¡Vamos!","Grayson dice keep going!"];
  const text = msgs[Math.floor(Math.random()*msgs.length)];
  return (
    <div style={{position:"absolute",top:60,left:"50%",transform:"translateX(-50%)",background:correct?"#10B981":"#F59E0B",color:"white",borderRadius:18,padding:"10px 18px",fontSize:18,...DS,fontWeight:900,boxShadow:"0 6px 18px rgba(0,0,0,0.2)",zIndex:30,whiteSpace:"nowrap",animation:"popIn 0.3s ease"}}>{text}</div>
  );
}

};

const FONT_LINK = <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>;

// ============================================================
// UsernameLogin / Opening / Family / Profiles / Avatar pickers
// ============================================================
function UsernameLoginScreen({ onFound, onBack }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const findPlayer = async () => {
    if(!username.trim()) return;
    setLoading(true);
    const { data } = await sb.from("players").select("*, families(*)").eq("username", username.toLowerCase().trim()).single();
    if(!data){ setError("Username not found. Check spelling and try again!"); setLoading(false); return; }
    onFound(data);
  };
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      {FONT_LINK}
      <button onClick={onBack} style={{position:"absolute",top:20,left:20,background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 14px",color:"white",cursor:"pointer",fontSize:14}}>← Back</button>
      <div style={{fontSize:36,marginBottom:12}}>🔑</div>
      <div style={{fontSize:24,color:"white",...DS,marginBottom:4}}>Welcome Back!</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:24,textAlign:"center"}}>Enter your username to pick up where you left off — on any device!</div>
      <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase())} placeholder="your username..." style={{width:"100%",maxWidth:300,padding:"16px",borderRadius:16,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"white",fontSize:18,fontFamily:"inherit",fontWeight:700,textAlign:"center",outline:"none",marginBottom:8}}/>
      {error && <div style={{color:"#FCA5A5",fontSize:13,marginBottom:8,textAlign:"center"}}>{error}</div>}
      <button onClick={findPlayer} disabled={!username.trim()||loading} style={{width:"100%",maxWidth:300,padding:16,borderRadius:18,background:username.trim()?"linear-gradient(135deg,#F59E0B,#F97316)":"rgba(255,255,255,0.2)",border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>{loading?"Finding you...":"Find My Account 🗺️"}</button>
    </div>
  );
}

function OpeningScreen({ onEnter, onReturning }) {
  const [show, setShow] = useState(false);
  useEffect(()=>{ setTimeout(()=>setShow(true),300); },[]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A 0%,#2D1B69 40%,#1A3A6B 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,overflow:"hidden",position:"relative"}}><OpeningMusic/>
      {[...Array(20)].map((_,i)=>(<div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,width:i%3===0?4:2,height:i%3===0?4:2,borderRadius:"50%",background:"white",opacity:0.3+Math.random()*0.5,animation:`twinkle ${2+Math.random()*3}s ease-in-out infinite`,animationDelay:`${Math.random()*3}s`}}/>))}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');
        @keyframes twinkle{0%,100%{opacity:.2}50%{opacity:.8}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes floatR{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}`}</style>
      <div style={{display:"flex",alignItems:"flex-end",gap:20,marginBottom:10,opacity:show?1:0,transition:"opacity 0.8s ease"}}>
        <div style={{animation:"float 3s ease-in-out infinite",animationDelay:"0.2s"}}><img src="/characters/grayson.png" style={{height:160,filter:"drop-shadow(0 8px 24px rgba(124,58,237,0.5))"}} alt="Grayson" onError={e=>{e.target.style.display='none';}}/></div>
        <div style={{animation:"floatR 3s ease-in-out infinite",animationDelay:"0.8s"}}><img src="/characters/peyton.png" style={{height:140,filter:"drop-shadow(0 8px 24px rgba(37,99,235,0.5))"}} alt="Peyton" onError={e=>{e.target.style.display='none';}}/></div>
      </div>
      <div style={{textAlign:"center",marginBottom:8,opacity:show?1:0,transition:"opacity 1s ease 0.4s",animation:show?"fadeUp 0.8s ease 0.4s both":"none"}}>
        <div style={{fontSize:13,letterSpacing:4,color:"#A78BFA",fontWeight:700,marginBottom:6}}>BIENVENIDOS A</div>
        <div style={{fontSize:42,color:"white",lineHeight:1.1,marginBottom:4,...DS,textShadow:"0 4px 20px rgba(124,58,237,0.6)"}}>Wander</div>
        <div style={{fontSize:42,color:T.goldL,lineHeight:1.1,...DS,textShadow:"0 4px 20px rgba(245,158,11,0.5)"}}>Lingo</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:8,fontStyle:"italic"}}>Learn Spanish. See the world.</div>
      </div>
      <div style={{display:"flex",gap:8,margin:"16px 0",alignItems:"center"}}>
        {["#E8445A","#F97316","#F59E0B","#10B981","#3B82F6","#7C3AED"].map((c,i)=>(<div key={i} style={{width:10,height:10,borderRadius:"50%",background:c,opacity:0.7,animation:`pulse ${1.5+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.15}s`}}/>))}
      </div>
      <button onClick={onEnter} style={{background:`linear-gradient(135deg,${T.gold},${T.orange})`,border:"none",borderRadius:24,padding:"16px 48px",fontSize:20,color:"white",cursor:"pointer",...DS,boxShadow:"0 8px 32px rgba(245,158,11,0.5)",animation:"pulse 2s ease-in-out infinite",opacity:show?1:0,transition:"opacity 1s ease 0.8s",marginTop:8}}>¡Vámonos! 🗺️</button>
      <button onClick={onReturning} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",marginTop:8,textDecoration:"underline",opacity:show?1:0,transition:"opacity 1s ease 1s"}}>Returning explorer? Log in with username</button>
      <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:8}}>25 lands • 15 games • 1 incredible adventure</div>
    </div>
  );
}

function FamilySetupScreen({ onDone }) {
  const [mode, setMode] = useState("choose");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const createFamily = async () => {
    if(!input.trim()) return;
    setLoading(true);
    const code = Math.random().toString(36).substring(2,8).toUpperCase();
    const { data, error: err } = await sb.from("families").insert({ name: input.trim(), code }).select().single();
    if(err){ setError("Error: " + err.message); setLoading(false); return; }
    onDone(data.id, data.code, data.name);
  };
  const joinFamily = async () => {
    if(input.length < 6) return;
    setLoading(true);
    const { data, error: err } = await sb.from("families").select().eq("code", input.toUpperCase()).single();
    if(err||!data){ setError("Family code not found. Check and try again!"); setLoading(false); return; }
    onDone(data.id, data.code, data.name);
  };
  if(mode === "choose") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      {FONT_LINK}
      <div style={{fontSize:48,marginBottom:8}}>🌍</div>
      <div style={{fontSize:28,color:"white",...DS,marginBottom:4}}>Start Your Adventure</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",marginBottom:32,textAlign:"center"}}>Create a family group or join one that already exists</div>
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:320}}>
        <button onClick={()=>setMode("create")} style={{padding:"18px",borderRadius:20,background:`linear-gradient(135deg,${T.purple},${T.blue})`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>🏡 Create My Family</button>
        <button onClick={()=>setMode("join")} style={{padding:"18px",borderRadius:20,background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",color:"white",fontSize:17,cursor:"pointer",...DS}}>🔑 Join a Family</button>
      </div>
    </div>
  );
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      {FONT_LINK}
      <button onClick={()=>{setMode("choose");setInput("");setError("");}} style={{position:"absolute",top:20,left:20,background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 14px",color:"white",cursor:"pointer",fontSize:14}}>← Back</button>
      <div style={{fontSize:36,marginBottom:12}}>{mode==="create"?"🏡":"🔑"}</div>
      <div style={{fontSize:24,color:"white",...DS,marginBottom:4}}>{mode==="create"?"Name Your Family":"Enter Family Code"}</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:24,textAlign:"center"}}>{mode==="create"?"e.g. The Quintanas, The Wanderers":"Ask your family for their 6-letter code"}</div>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder={mode==="create"?"Family name...":"XXXXXX"} maxLength={mode==="create"?30:6} style={{width:"100%",maxWidth:300,padding:"16px",borderRadius:16,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"white",fontSize:18,fontFamily:"inherit",fontWeight:700,textAlign:"center",outline:"none",marginBottom:8}}/>
      {error && <div style={{color:"#FCA5A5",fontSize:13,marginBottom:8,textAlign:"center"}}>{error}</div>}
      <button onClick={mode==="create"?createFamily:joinFamily} disabled={loading||(mode==="create"?!input.trim():input.length<6)} style={{width:"100%",maxWidth:300,padding:16,borderRadius:18,background:(mode==="create"?input.trim():input.length>=6)?`linear-gradient(135deg,${T.gold},${T.orange})`:"rgba(255,255,255,0.2)",border:"none",color:"white",fontSize:17,cursor:"pointer",...DS,opacity:loading?0.7:1}}>{loading?"...":mode==="create"?"Create Family 🎉":"Join Family 🚀"}</button>
    </div>
  );
}

const AVATARS = ["🦁","🐯","🦊","🐺","🦅","🐬","🦋","🌟","🔥","⚡","🌈","🎯"];
const COLORS  = ["#E8445A","#F97316","#F59E0B","#10B981","#3B82F6","#7C3AED","#EC4899","#14B8A6"];

function ProfileSelectScreen({ profiles, familyName, familyCode, onSelect, onCreate }) {
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",padding:20}}>
      {FONT_LINK}
      <div style={{textAlign:"center",marginBottom:24,marginTop:20}}>
        <div style={{fontSize:13,color:T.goldL,letterSpacing:3,fontWeight:700,marginBottom:4}}>{familyName?.toUpperCase()}</div>
        <div style={{fontSize:24,color:"white",...DS}}>Who's adventuring today?</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:4}}>Family code: {familyCode}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:380,margin:"0 auto",width:"100%"}}>
        {profiles.map(p=>(
          <button key={p.id} onClick={()=>onSelect(p)} style={{padding:"16px 20px",borderRadius:20,background:"rgba(255,255,255,0.08)",border:`2px solid ${p.color||T.purple}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:p.color||T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.avatar||"🌟"}</div>
            <div><div style={{fontSize:18,color:"white",...DS}}>{p.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:2}}>⭐ {p.stars||0} stars · Land {p.level||1}</div></div>
            <div style={{marginLeft:"auto",fontSize:22,color:"rgba(255,255,255,0.3)"}}>›</div>
          </button>
        ))}
        <button onClick={onCreate} style={{padding:"16px",borderRadius:20,background:"rgba(255,255,255,0.05)",border:"2px dashed rgba(255,255,255,0.2)",cursor:"pointer",color:"rgba(255,255,255,0.5)",fontSize:15,...DS}}>+ Add Explorer</button>
      </div>
    </div>
  );
}

function CreateProfileScreen({ onDone, onBack }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",padding:20}}>
      {FONT_LINK}
      <button onClick={onBack} style={{alignSelf:"flex-start",background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 14px",color:"white",cursor:"pointer",fontSize:14,marginBottom:20}}>← Back</button>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px"}}>{avatar}</div>
        <div style={{fontSize:22,color:"white",...DS}}>Create Your Explorer</div>
      </div>
      <div style={{maxWidth:340,margin:"0 auto",width:"100%",display:"flex",flexDirection:"column",gap:16}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name..." maxLength={20} style={{padding:"14px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"white",fontSize:17,fontFamily:"inherit",fontWeight:700,outline:"none"}}/>
        <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g,""))} placeholder="Choose a username (for login on any device)" maxLength={20} style={{padding:"14px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"white",fontSize:15,fontFamily:"inherit",fontWeight:700,outline:"none"}}/>
        <div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:8,fontWeight:700}}>CHOOSE YOUR AVATAR</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {AVATARS.map(a=>(<button key={a} onClick={()=>setAvatar(a)} style={{width:44,height:44,borderRadius:12,background:avatar===a?color:"rgba(255,255,255,0.1)",border:avatar===a?`2px solid ${color}`:"2px solid transparent",fontSize:20,cursor:"pointer"}}>{a}</button>))}
          </div>
        </div>
        <div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:8,fontWeight:700}}>CHOOSE YOUR COLOR</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {COLORS.map(c=>(<button key={c} onClick={()=>setColor(c)} style={{width:36,height:36,borderRadius:"50%",background:c,border:color===c?"3px solid white":"3px solid transparent",cursor:"pointer"}}/>))}
          </div>
        </div>
        <button onClick={()=>{ if(name.trim()) onDone(name.trim(),avatar,color,username.trim()); }} disabled={!name.trim()||loading} style={{padding:16,borderRadius:18,background:name.trim()?`linear-gradient(135deg,${T.gold},${T.orange})`:"rgba(255,255,255,0.2)",border:"none",color:"white",fontSize:17,cursor:"pointer",...DS,opacity:loading?0.7:1}}>{loading?"...":"Start Adventuring! 🗺️"}</button>
      </div>
    </div>
  );
}

// ============================================================
// AdventureMap, LandIntro, StudyHall, MyProfile
// ============================================================
function AdventureMap({ profile, onSelectLand, onStudyHall, onMyProfile }) {
  const unlockedLand = profile.level || 1;
  const lc = {
    "Beginner":     { text:"#92400E" },
    "Checkpoint":   { text:"#4C1D95" },
    "Intermediate": { text:"#1E3A5F" },
    "Advanced":     { text:"#064E3B" },
    "Final Boss":   { text:"#7F1D1D" },
  };
  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <div style={{background:"linear-gradient(135deg,#1C0A4A,#2D1B69)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:profile.color||T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{profile.avatar||"🌟"}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,color:"white",...DS}}>{profile.name}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>⭐ {profile.stars||0} stars</div>
        </div>
        <button onClick={onStudyHall} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:13,...DS}}>📚 Study Hall</button>
        <button onClick={onMyProfile} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:13}}>👤</button>
      </div>
      <div style={{padding:"16px 16px 8px",textAlign:"center"}}>
        <div style={{fontSize:11,color:T.textSoft,letterSpacing:3,fontWeight:700,marginBottom:4}}>YOUR ADVENTURE PATH</div>
        <div style={{fontSize:22,color:T.text,...DS}}>The Spanish Speaking World 🌍</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px 100px"}}>
        {LANDS.map(land=>{
          const unlocked = land.id <= unlockedLand;
          const current  = land.id === unlockedLand;
          const done     = land.id < unlockedLand;
          return (
            <button key={land.id} onClick={()=>unlocked&&onSelectLand(land)} style={{
              width:"100%",padding:"14px 16px",borderRadius:18,marginBottom:8,
              background:done?`${land.color}20`:current?"white":"rgba(0,0,0,0.04)",
              border:current?`3px solid ${land.color}`:done?`2px solid ${land.color}40`:"2px solid rgba(0,0,0,0.08)",
              cursor:unlocked?"pointer":"default",display:"flex",alignItems:"center",gap:12,textAlign:"left",
              boxShadow:current?`0 4px 20px ${land.color}30`:"none",opacity:unlocked?1:0.4,transition:"all 0.2s"
            }}>
              <div style={{width:48,height:48,borderRadius:14,background:done?land.color:current?land.color:"rgba(0,0,0,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{done?"✅":unlocked?land.emoji:"🔒"}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:15,color:unlocked?T.text:"#9CA3AF",...DS}}>{land.name}</span>
                  {current && <span style={{fontSize:10,background:land.color,color:"white",borderRadius:8,padding:"2px 8px",fontWeight:800}}>CURRENT</span>}
                  <span style={{fontSize:10,color:(lc[land.level]||lc["Beginner"]).text,fontWeight:800,marginLeft:"auto"}}>{land.level==="Checkpoint"?"⭐ CHECKPOINT":land.level.toUpperCase()}</span>
                </div>
                <div style={{fontSize:11,color:T.textSoft,marginTop:2}}>Land {land.id} · {land.region}</div>
              </div>
              {unlocked && <div style={{fontSize:20,color:land.color}}>›</div>}
            </button>
          );
        })}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid rgba(0,0,0,0.08)",display:"flex",padding:"10px 0 16px"}}>
        {[{icon:"🗺️",label:"Map",action:null},{icon:"📚",label:"Study Hall",action:onStudyHall},{icon:"👤",label:"My Profile",action:onMyProfile}].map(({icon,label,action})=>(
          <button key={label} onClick={action||undefined} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:action?"pointer":"default",opacity:action?1:0.5}}>
            <span style={{fontSize:22}}>{icon}</span><span style={{fontSize:10,color:T.textSoft,fontWeight:700}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// LAND 1 WORDS + Game Components used by Land 1 specifically
// ============================================================
const LAND1_WORDS = [
  { es:"Hola",          en:"Hello",            emoji:"👋", hook:"HOH-la — everyone knows this one!", speakHook:"Everyone already knows this one." },
  { es:"Adios",         en:"Goodbye",          emoji:"👋", hook:"ah-dee-OHS — say goodbye to not knowing this!", speakHook:"Say goodbye to not knowing this word." },
  { es:"Buenos dias",   en:"Good morning",     emoji:"🌅", hook:"BWEH-nos DEE-as — good days to you!", speakHook:"Good days to you!" },
  { es:"Buenas tardes", en:"Good afternoon",   emoji:"☀️", hook:"BWEH-nas TAR-des — tardes sounds like tardies!", speakHook:"Tardes sounds like tardies. Afternoon is when you are late!" },
  { es:"Buenas noches", en:"Good night",       emoji:"🌙", hook:"BWEH-nas NO-ches — no chess at night!", speakHook:"No chess at night, time for bed!" },
  { es:"Por favor",     en:"Please",           emoji:"🙏", hook:"por fah-VOR — pour the flavor please!", speakHook:"Sounds like pour the flavor!" },
  { es:"Gracias",       en:"Thank you",        emoji:"💛", hook:"GRAH-see-as — grassy us, thank you!", speakHook:"Sounds like grassy us!" },
  { es:"De nada",       en:"You are welcome",  emoji:"😊", hook:"day NAH-da — it was nothing!", speakHook:"Means of nothing, you are welcome!" },
  { es:"Mucho gusto",   en:"Nice to meet you", emoji:"🤝", hook:"MOO-cho GOO-sto — much pleasure!", speakHook:"Much pleasure meeting you!" },
  { es:"Como estas",    en:"How are you",      emoji:"❓", hook:"KOH-mo es-TAS — how are you?", speakHook:"How are you doing today?" },
  { es:"Bien",          en:"Good",             emoji:"✅", hook:"bee-EN — been good!", speakHook:"Short and sweet. Like saying been good." },
  { es:"Hasta luego",   en:"See you later",    emoji:"👋", hook:"AHS-ta loo-EH-go — friendlier hasta la vista!", speakHook:"Hasta la vista's friendlier cousin!" },
];

// ============================================================
// SHARED HELPERS: makeOptions / CuencaBg / CuyOverlay / OpeningMusic
// ============================================================
function makeOptions(word, pool, n=4) {
  const correct = word.en;
  const safePool = (pool || []).filter(x => x && x.en && x.en !== correct);
  const seen = new Set([correct]);
  const others = [];
  for (const cand of safePool.sort(() => Math.random()-0.5)) {
    if (!seen.has(cand.en)) { others.push(cand.en); seen.add(cand.en); }
    if (others.length >= n-1) break;
  }
  while (others.length < n-1) others.push(["Hello","Goodbye","Please","Thank you","Maybe","Yes","No","More"][others.length]);
  return [correct, ...others].sort(() => Math.random()-0.5);
}

function CuencaBg({ color, children, dark }) {
  return (
    <div style={{minHeight:"100vh",background:dark?"linear-gradient(160deg,#1C0A4A,#2D1B69)":`linear-gradient(170deg,${color}10 0%,#FDF6EC 50%,#F5E9D0 100%)`,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <svg viewBox="0 0 800 120" preserveAspectRatio="xMidYMax slice" style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:90,opacity:0.16,pointerEvents:"none"}}>
        <path d="M0,120 L0,80 L40,80 L40,60 L80,60 L80,75 L120,75 L120,50 L160,50 L160,68 L200,68 L200,55 L240,55 L240,72 L280,72 L280,45 L320,45 L320,65 L360,65 L360,55 L400,55 L400,72 L440,72 L440,50 L480,50 L480,68 L520,68 L520,55 L560,55 L560,75 L600,75 L600,60 L640,60 L640,72 L680,72 L680,55 L720,55 L720,68 L760,68 L760,78 L800,78 L800,120 Z" fill={dark?"#7C3AED":color}/>
        <circle cx="180" cy="50" r="12" fill={dark?"#7C3AED":color}/>
        <rect x="178" y="50" width="4" height="14" fill={dark?"#7C3AED":color}/>
        <circle cx="480" cy="50" r="14" fill={dark?"#7C3AED":color}/>
        <rect x="478" y="50" width="4" height="14" fill={dark?"#7C3AED":color}/>
        <rect x="300" y="20" width="8" height="25" fill={dark?"#7C3AED":color}/>
        <rect x="640" y="35" width="8" height="25" fill={dark?"#7C3AED":color}/>
      </svg>
      {children}
    </div>
  );
}

function CuyOverlay({ visible, landId=1 }) {
  if (!visible) return null;
  const outfits = ["🎩","🧣","👒","🕶️","🎒","👑","🎀","🥽","🧢","🦺","🧤","🌺"];
  const outfit = outfits[landId % outfits.length];
  const top = 18 + ((landId * 13) % 55);
  const dur = 18 + (landId % 5) * 2;
  return (
    <>
      <style>{`@keyframes cuyWalk${landId}{0%{left:-90px;transform:scaleX(1)}48%{left:50%;transform:scaleX(1)}50%{left:50%;transform:scaleX(-1)}98%{left:110%;transform:scaleX(-1)}100%{left:110%;transform:scaleX(-1)}}`}</style>
      <div style={{position:"absolute",top:`${top}%`,left:-90,fontSize:32,animation:`cuyWalk${landId} ${dur}s linear infinite`,zIndex:5,pointerEvents:"none",filter:"drop-shadow(0 3px 4px rgba(0,0,0,0.18))"}}>
        <span style={{display:"inline-block"}}>🐹</span>
        <span style={{position:"absolute",top:-12,left:6,fontSize:20,transform:"rotate(-12deg)"}}>{outfit}</span>
      </div>
    </>
  );
}

let _wlAudioCtx = null;
let _wlMusicTimer = null;
function startOpeningMusic() {
  try {
    if (!_wlAudioCtx) _wlAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _wlAudioCtx;
    if (ctx.state === "suspended") ctx.resume();
    if (_wlMusicTimer) return;
    const melody = [
      [392,0.18],[523,0.18],[659,0.18],[784,0.36],
      [659,0.18],[784,0.18],[880,0.55],
      [784,0.18],[659,0.18],[523,0.18],[659,0.55],
      [392,0.45]
    ];
    const playOnce = () => {
      let t = ctx.currentTime + 0.05;
      melody.forEach(([f,d])=>{
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.045, t+0.015);
        gain.gain.linearRampToValueAtTime(0, t+d);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t); osc.stop(t+d+0.02);
        t += d;
      });
      return t - ctx.currentTime;
    };
    const loop = () => {
      const dur = playOnce();
      _wlMusicTimer = setTimeout(loop, (dur+0.6)*1000);
    };
    loop();
  } catch(e) {}
}
function stopOpeningMusic() {
  if (_wlMusicTimer) { clearTimeout(_wlMusicTimer); _wlMusicTimer = null; }
}
function OpeningMusic() {
  useEffect(() => {
    const handler = () => { startOpeningMusic(); document.removeEventListener("pointerdown", handler); };
    document.addEventListener("pointerdown", handler, { once:true });
    return () => { document.removeEventListener("pointerdown", handler); stopOpeningMusic(); };
  }, []);
  return null;
}

function FallingWordsGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [sway, setSway] = useState(0);
  const word = words[idx % words.length];
  const options = useMemo(()=>makeOptions(word, pool, 4), [idx]);
  useEffect(()=>{ speakEs(word.es); setPos(0); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    if(selected) return;
    const t = setInterval(()=>{ setPos(p=>{ if(p>=100){ handlePick(null); return 0; } return p+0.9; }); setSway(s=>(s+8)%360); }, 50);
    return ()=>clearInterval(t);
    // eslint-disable-next-line
  },[idx, selected]);
  const handlePick = (opt)=>{
    if(selected) return;
    const correct = opt===word.en;
    setSelected(opt||"timeout");
    if(correct){ setScore(s=>s+1); speakEs(word.es); }
    setTimeout(()=>{
      if(idx>=words.length-1){ onComplete(); return; }
      setIdx(i=>i+1); setSelected(null); setPos(0);
    }, 1200);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes shimmerBar{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}@keyframes wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>{emoji} {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Tap the correct meaning! Score: {score}/{words.length}</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{width:"100%",maxWidth:420,height:200,position:"relative",background:"linear-gradient(180deg, #FFF7E8, #FCE7C0)",borderRadius:24,border:`3px solid ${color}`,overflow:"hidden",marginBottom:14,boxShadow:`0 6px 24px ${color}33`}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:36,background:`linear-gradient(180deg, ${color}30, transparent)`}}/>
          <div style={{position:"absolute",left:"50%",top:`${pos}%`,transform:`translateX(-50%) translateX(${Math.sin(sway*Math.PI/180)*10}px) rotate(${Math.sin(sway*Math.PI/180)*4}deg)`,transition:"top 0.05s linear,transform 0.05s linear",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:2,animation:"wiggle 0.5s ease-in-out infinite"}}>{word.emoji}</div>
            <div style={{fontSize:28,color,...DS,fontWeight:900,background:"white",padding:"4px 14px",borderRadius:14,boxShadow:`0 4px 14px ${color}40`,border:`2px solid ${color}`}}>{word.es}</div>
          </div>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:12,background:`linear-gradient(0deg, ${color}AA, ${color}40)`,borderTop:`2px dashed ${color}`}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:420,marginBottom:12}}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>handlePick(opt)} style={{padding:"15px",borderRadius:16,border:`2px solid ${!selected?color:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:16,...DS,fontWeight:700,color:"#1C1917"}}>{opt}</button>
          ))}
        </div>
        <div style={{width:"100%",maxWidth:420,height:10,background:"#E5E7EB",borderRadius:5,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${100-pos}%`,background:pos>75?"linear-gradient(90deg,#EF4444,#F97316)":pos>45?"linear-gradient(90deg,#F59E0B,#FCD34D)":`linear-gradient(90deg,${color},${color}CC)`,transition:"width 0.05s",animation:pos>75?"shimmerBar 0.4s ease-in-out infinite":"none"}}/>
        </div>
      </div>
    </CuencaBg>
  );
}

function MatchingGame({ words, color, title, onComplete, emoji, isReplay, landId }) {
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const esWords = words.map(w=>({id:w.es,text:w.es,type:"es"}));
  const [enShuffled] = useState(()=>[...words].sort(()=>Math.random()-0.5).map(w=>({id:w.es,text:w.en,type:"en"})));
  const handleSelect = (item) => {
    if(matched.includes(item.id)) return;
    if(!selected){ setSelected(item); speakEs(item.id); return; }
    if(selected.id===item.id && selected.type!==item.type){
      const newMatched = [...matched, item.id];
      setMatched(newMatched); setSelected(null);
      speakEn(words.find(w=>w.es===item.id)?.en||"");
      if(newMatched.length>=words.length) setTimeout(onComplete, 900);
    } else {
      setWrong(item.id);
      setTimeout(()=>{ setWrong(null); setSelected(null); },800);
    }
  };
  return(
    <CuencaBg color={color}>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      {FONT_LINK}
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>{emoji} {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Match Spanish to English! {matched.length}/{words.length} matched</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:11,color:color,fontWeight:800,textAlign:"center",...DS}}>SPANISH 🇪🇸</div>
          {esWords.map(item=>(
            <button key={item.id} onClick={()=>handleSelect(item)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${matched.includes(item.id)?"#10B981":selected?.id===item.id&&selected?.type==="es"?color:wrong===item.id?"#EF4444":"#E5E7EB"}`,background:matched.includes(item.id)?"#D1FAE5":selected?.id===item.id&&selected?.type==="es"?`${color}15`:wrong===item.id?"#FEE2E2":"white",cursor:"pointer",fontSize:14,...DS,fontWeight:800,color:matched.includes(item.id)?"#10B981":"#1C1917",textAlign:"center"}}>{matched.includes(item.id)?"✅":item.text}</button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:11,color:"#6B7280",fontWeight:800,textAlign:"center",...DS}}>ENGLISH 🇺🇸</div>
          {enShuffled.map(item=>(
            <button key={item.id+"-en"} onClick={()=>handleSelect(item)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${matched.includes(item.id)?"#10B981":selected?.id===item.id&&selected?.type==="en"?color:wrong===item.id?"#EF4444":"#E5E7EB"}`,background:matched.includes(item.id)?"#D1FAE5":selected?.id===item.id&&selected?.type==="en"?`${color}15`:wrong===item.id?"#FEE2E2":"white",cursor:"pointer",fontSize:12,...DS,fontWeight:700,color:matched.includes(item.id)?"#10B981":"#1C1917",textAlign:"center"}}>{matched.includes(item.id)?"✅":item.text}</button>
          ))}
        </div>
      </div>
    </CuencaBg>
  );
}

function ShootingGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState(null); // "hit"|"miss"|null
  const [tick, setTick] = useState(0);
  const word = words[idx];
  // Generate moving targets, refresh per word
  const targets = useMemo(()=>{
    const opts = makeOptions(word, pool, 4);
    return opts.map((en, i) => ({
      en,
      isCorrect: en === word.en,
      lane: i, // 0..3 vertical lane
      startTime: i * 700 + Math.random()*300, // ms after question start
      direction: i % 2 === 0 ? 1 : -1, // some right→left, some left→right
      speed: 0.9 + Math.random()*0.4, // px per ms multiplier
      id: `${idx}-${i}-${en}`,
    }));
  // eslint-disable-next-line
  },[idx]);
  const [questionStart, setQuestionStart] = useState(()=>Date.now());
  useEffect(()=>{ speakEs(word.es); setQuestionStart(Date.now()); setFeedback(null); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    const t = setInterval(()=>setTick(x=>x+1), 40);
    return ()=>clearInterval(t);
  },[]);
  // Compute target screen positions
  const arenaW = 360;
  const elapsed = Date.now() - questionStart;
  // Question times out after ~7s if no answer
  useEffect(()=>{
    if(feedback) return;
    if(elapsed > 7500){ shoot(null); }
    // eslint-disable-next-line
  },[tick]);
  const shoot = (target) => {
    if(feedback) return;
    if(target && target.isCorrect){
      setFeedback("hit"); setScore(s=>s+1); speakEs(word.es);
    } else {
      setFeedback("miss"); setMisses(m=>m+1);
    }
    setTimeout(()=>{
      if(idx<words.length-1) setIdx(i=>i+1);
      else onComplete();
    }, 1100);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes targetSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes hitFlash{0%{transform:scale(1)}50%{transform:scale(1.6);filter:brightness(1.4)}100%{transform:scale(0);opacity:0}}@keyframes missFlash{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>🎯 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Hits {score}/{words.length} · Misses {misses}</div>
      </div>
      <div style={{padding:"14px 16px",position:"relative",zIndex:1}}>
        <div style={{background:"white",borderRadius:18,padding:"16px 20px",textAlign:"center",boxShadow:`0 4px 20px ${color}30`,border:`3px solid ${color}`,marginBottom:8}}>
          <div style={{fontSize:11,color,fontWeight:800,letterSpacing:2,marginBottom:2}}>SHOOT THE MEANING OF:</div>
          <div style={{fontSize:36,marginBottom:0}}>{word.emoji}</div>
          <div style={{fontSize:32,color,...DS,fontWeight:900}}>{word.es}</div>
        </div>
      </div>
      <div style={{flex:1,position:"relative",zIndex:1,overflow:"hidden",margin:"0 12px",borderRadius:16,border:`2px solid ${color}40`,background:"linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)",animation:feedback==="miss"?"missFlash 0.4s ease":"none"}}>
        {targets.map(t=>{
          const tElapsed = Math.max(0, elapsed - t.startTime);
          const travel = (tElapsed * 0.10 * t.speed); // px from start
          const x = t.direction>0 ? -120 + travel : (arenaW+40) - travel;
          const offscreen = x < -130 || x > arenaW+60;
          const visible = tElapsed > 0 && !offscreen && !feedback;
          const y = 30 + t.lane*70;
          return visible ? (
            <button key={t.id} onClick={()=>shoot(t)} style={{position:"absolute",left:x,top:y,padding:"10px 16px",borderRadius:20,background:`linear-gradient(135deg, ${color}, ${color}CC)`,border:"3px solid white",color:"white",cursor:"pointer",fontSize:14,...DS,fontWeight:800,boxShadow:`0 4px 12px ${color}55`,minWidth:90,whiteSpace:"nowrap"}}>
              🎯 {t.en}
            </button>
          ) : null;
        })}
        {feedback==="hit" && <div style={{position:"absolute",left:"50%",top:"40%",transform:"translateX(-50%)",fontSize:80,animation:"hitFlash 0.8s ease forwards"}}>💥</div>}
        {feedback==="miss" && <div style={{position:"absolute",left:"50%",top:"40%",transform:"translateX(-50%)",fontSize:60,...DS,color:"#EF4444",fontWeight:900,textShadow:"0 2px 6px rgba(0,0,0,0.2)"}}>MISS!</div>}
        <div style={{position:"absolute",bottom:6,left:0,right:0,textAlign:"center",fontSize:11,color:"#92400E",fontWeight:700,...DS}}>Targets fly past — tap fast!</div>
      </div>
      <div style={{padding:"10px 16px",position:"relative",zIndex:1,textAlign:"center"}}>
        <button onClick={()=>speakEs(word.es)} style={{background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"6px 14px",cursor:"pointer",fontSize:13,color,fontWeight:700,...DS}}>🔊 Repeat</button>
      </div>
    </CuencaBg>
  );
}

function BossChallenge({ words, color, landName, nextLand, onComplete, isReplay, landId, profile }) {
  const mode = getMode(profile);
  const TOTAL_ROUNDS = Math.min(words.length, 8);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState("reading"); // reading|answering|reveal
  const [player, setPlayer] = useState({ platform:100, lastResult:null });
  const [npcs, setNpcs] = useState(()=>[
    { id:"djdollar", name:"DJ Dollar",       avatar:"😎", color:"#F59E0B", accuracy:0.35, speed:0.55, talkRight:"DEFINITELY!", talkWrong:"WHAT?!", platform:100, choice:null, result:null },
    { id:"carlos",   name:"Carlos",          avatar:"🧔", color:"#92400E", accuracy:0.55, speed:1.6,  talkRight:"...sí?",       talkWrong:"...no?", platform:100, choice:null, result:null },
    { id:"tambien",  name:"También Sis",     avatar:"👧", color:"#EC4899", accuracy:0.85, speed:0.95, talkRight:"También.",     talkWrong:"...también?", platform:100, choice:null, result:null },
    { id:"abuela",   name:"Abuela",          avatar:"👵", color:"#7C3AED", accuracy:0.55, speed:1.25, talkRight:"Muy bien.",    talkWrong:"Ay, mijo.", platform:100, choice:null, result:null },
  ]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const word = words[round % words.length];
  const options = useMemo(()=>makeOptions(word, words, 4), [round]);

  // Auto-read on new round
  useEffect(()=>{
    if (done) return;
    setPhase("reading");
    const audioDur = autoReadQuestion(word.es, options, mode);
    // Reset NPC state
    setNpcs(prev => prev.map(n=>({...n, choice:null, result:null})));
    setPlayer(p=>({...p, lastResult:null}));
    const t = setTimeout(()=>{
      setPhase("answering");
      setTimeLeft(8 * mode.timerMult);
    }, audioDur);
    return ()=>clearTimeout(t);
    // eslint-disable-next-line
  },[round]);

  // Schedule NPC answers during the answering phase
  useEffect(()=>{
    if (phase !== "answering") return;
    const timers = [];
    setNpcs(prev => prev.map(npc => {
      const right = Math.random() < npc.accuracy;
      const wrongOpts = options.filter(o=>o!==word.en);
      const choice = right ? word.en : (wrongOpts[Math.floor(Math.random()*wrongOpts.length)] || options[0]);
      const delay = 600 + npc.speed * 1500 + Math.random()*800;
      timers.push(setTimeout(()=>{
        setNpcs(curr => curr.map(n => n.id===npc.id ? {...n, choice} : n));
      }, delay));
      return npc;
    }));
    return ()=>timers.forEach(clearTimeout);
    // eslint-disable-next-line
  },[phase, round]);

  // Countdown
  useEffect(()=>{
    if (phase !== "answering") return;
    if (player.lastResult !== null) return;
    if (timeLeft <= 0) { lockIn(null); return; }
    const t = setTimeout(()=>setTimeLeft(x=>Math.max(0,x-0.1)), 100);
    return ()=>clearTimeout(t);
    // eslint-disable-next-line
  },[timeLeft, phase, player.lastResult]);

  const lockIn = (opt)=>{
    if (player.lastResult !== null) return;
    const right = opt === word.en;
    if (right) speakEs(word.es);
    setPlayer(p=>({ platform: right ? Math.min(100, p.platform+4) : Math.max(0, p.platform-22), lastResult:right ? "right":"wrong" }));
    setPhase("reveal");
    // Resolve NPCs
    setTimeout(()=>{
      setNpcs(prev => prev.map(npc=>{
        const r = npc.choice === word.en;
        return {...npc, result: r?"right":"wrong", platform: Math.max(0, r ? Math.min(100, npc.platform+4) : npc.platform-22)};
      }));
    }, 400);
    // Next round or end
    setTimeout(()=>{
      const next = round+1;
      if (next>=TOTAL_ROUNDS) { setDone(true); return; }
      setRound(next);
    }, 2400);
  };

  // Done screen
  if (done) {
    const survivors = [{name:profile?.name||"You", avatar:profile?.avatar||"🌟", color:profile?.color||"#7C3AED", platform:player.platform, isYou:true}, ...npcs.map(n=>({name:n.name, avatar:n.avatar, color:n.color, platform:n.platform, isYou:false}))]
      .sort((a,b)=>b.platform-a.platform);
    const won = survivors[0].isYou;
    return (
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#1C0A4A 0%,#2D1B69 50%,${won?"#10B981":"#7F1D1D"} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center",position:"relative",overflow:"hidden"}}>
        {FONT_LINK}
        <style>{`@keyframes confettiFall{from{transform:translateY(-20px) rotate(0);opacity:0}10%{opacity:1}to{transform:translateY(110vh) rotate(720deg);opacity:0}}@keyframes bigBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}`}</style>
        {won && [...Array(28)].map((_,i)=>(<div key={i} style={{position:"absolute",left:`${(i*7)%95}%`,top:-30,fontSize:18+(i%3)*8,animation:`confettiFall ${3+i%4}s linear ${i*0.12}s infinite`,pointerEvents:"none"}}>{["⭐","✨","🎉","💛","🏆","🎊"][i%6]}</div>))}
        <div style={{fontSize:90,marginBottom:8,animation:"bigBounce 0.7s ease infinite",zIndex:2}}>{won?"🏆":"🌋"}</div>
        <div style={{fontSize:30,color:won?"#FCD34D":"#FCA5A5",...DS,fontWeight:900,marginBottom:6,zIndex:2}}>{won?"¡Campeón!":"¡Buen intento!"}</div>
        <div style={{fontSize:16,color:"white",marginBottom:24,zIndex:2,...DS}}>{won?`You beat the lava boss in ${landName}!`:`The lava won this round — try again!`}</div>
        <div style={{display:"flex",gap:10,marginBottom:22,zIndex:2,flexWrap:"wrap",justifyContent:"center",maxWidth:420}}>
          {survivors.map((p,i)=>(
            <div key={p.name} style={{background:p.isYou?"rgba(252,211,77,0.18)":"rgba(255,255,255,0.08)",border:`2px solid ${p.isYou?"#FCD34D":"rgba(255,255,255,0.2)"}`,borderRadius:14,padding:"10px 12px",minWidth:90,textAlign:"center"}}>
              <div style={{fontSize:13,color:"#FCD34D",fontWeight:800,...DS}}>#{i+1}</div>
              <div style={{fontSize:28}}>{p.avatar}</div>
              <div style={{fontSize:11,color:"white",fontWeight:700,...DS}}>{p.name}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>{Math.round(p.platform)}%</div>
            </div>
          ))}
        </div>
        <button onClick={onComplete} style={{padding:"16px 40px",borderRadius:22,background:"linear-gradient(135deg,#F59E0B,#F97316)",border:"none",color:"white",fontSize:17,cursor:"pointer",...DS,fontWeight:900,boxShadow:"0 8px 24px rgba(245,158,11,0.5)",zIndex:2}}>Continue to {nextLand} →</button>
      </div>
    );
  }

  const replay = ()=>autoReadQuestion(word.es, options, mode);
  const allCompetitors = [
    {id:"player", name:"You", avatar:profile?.avatar||"🌟", color:profile?.color||"#7C3AED", platform:player.platform, lastResult:player.lastResult, choice:null, isYou:true, talkRight:"¡Sí!", talkWrong:"😬"},
    ...npcs.map(n=>({...n, isYou:false}))
  ];
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,#1C0A4A 0%,#3D1B0E 100%)`,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",animation:player.lastResult==="wrong"?"shakeScreen 0.4s ease":""}}>
      {FONT_LINK}
      <style>{`@keyframes shakeScreen{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}@keyframes bubbleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes lavaPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.18)}}@keyframes thinkDot{0%,80%,100%{opacity:0.3}40%{opacity:1}}@keyframes popIn{0%{transform:scale(0.7);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes characterShockMini{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <ReadAgainButton onReplay={replay} color="#FCD34D"/>
      {/* Tiny status row */}
      <div style={{padding:"10px 16px 6px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:5}}>
        <div style={{fontSize:14,color:"#FCD34D",...DS,fontWeight:900}}>🌋 BOSS · {landName}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Round {round+1}/{TOTAL_ROUNDS}</div>
      </div>
      {/* Question card — compact */}
      <div style={{padding:"4px 16px 10px",position:"relative",zIndex:5}}>
        <div style={{background:"rgba(255,255,255,0.08)",border:`2px solid ${color}`,borderRadius:18,padding:"12px 16px",textAlign:"center",boxShadow:`0 6px 24px ${color}55`}}>
          <div style={{fontSize:11,color:"#FCD34D",fontWeight:800,letterSpacing:2,marginBottom:2,...DS}}>WHAT DOES THIS MEAN?</div>
          <div style={{fontSize:30,marginBottom:0}}>{word.emoji}</div>
          <div style={{fontSize:34,color:"white",...DS,fontWeight:900}}>{word.es}</div>
        </div>
        {phase==="answering" && (
          <div style={{height:8,background:"rgba(255,255,255,0.1)",borderRadius:4,marginTop:8,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(timeLeft/(8*mode.timerMult))*100}%`,background:timeLeft<2?"#EF4444":timeLeft<4?"#F59E0B":"#10B981",transition:"width 0.1s"}}/>
          </div>
        )}
      </div>
      {/* Arena: 4 platforms with floating answer bubbles in the scene */}
      <div style={{flex:1,position:"relative",margin:"0 8px",overflow:"hidden",zIndex:2}}>
        {/* Floating answer bubbles (only during answering) */}
        {phase==="answering" && options.map((opt,i)=>{
          const positions = [{l:"10%",t:"5%"},{l:"58%",t:"12%"},{l:"22%",t:"38%"},{l:"66%",t:"45%"}];
          const p = positions[i] || positions[0];
          return (
            <button key={opt} onClick={()=>lockIn(opt)} style={{position:"absolute",left:p.l,top:p.t,background:"linear-gradient(135deg,#FFFFFF,#FEF3C7)",border:`3px solid ${color}`,borderRadius:60,padding:"14px 20px",cursor:"pointer",fontSize:15+i%2,...DS,fontWeight:800,color:"#1C1917",boxShadow:`0 6px 18px ${color}55`,animation:`bubbleFloat ${2.3+i*0.3}s ease-in-out infinite`,zIndex:6,maxWidth:160}}>
              {opt}
            </button>
          );
        })}
        {phase==="reveal" && (
          <div style={{position:"absolute",left:"50%",top:"10%",transform:"translateX(-50%)",background:player.lastResult==="right"?"#10B981":"#EF4444",color:"white",padding:"10px 22px",borderRadius:20,fontSize:18,...DS,fontWeight:900,zIndex:6,animation:"popIn 0.3s ease"}}>
            {player.lastResult==="right" ? "¡Correct! ✅" : `Answer: ${word.en}`}
          </div>
        )}
        {/* Platforms at bottom */}
        <div style={{position:"absolute",bottom:90,left:0,right:0,display:"flex",justifyContent:"space-around",alignItems:"flex-end",padding:"0 6px",zIndex:4}}>
          {[{...allCompetitors[0]}, ...npcs].map((p)=>(
            <div key={p.id||"player"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:78,position:"relative",transition:"transform 0.6s",transform:`translateY(${(100-p.platform)*0.6}px)`}}>
              {/* Thought bubble or reaction */}
              {phase==="answering" && p.choice && !p.isYou && (
                <div style={{position:"absolute",top:-32,background:"white",border:"2px solid #7C3AED",borderRadius:12,padding:"3px 8px",fontSize:10,...DS,fontWeight:800,color:"#7C3AED",whiteSpace:"nowrap",animation:"popIn 0.3s ease"}}>chose!</div>
              )}
              {phase==="reveal" && !p.isYou && p.result && (
                <div style={{position:"absolute",top:-34,background:p.result==="right"?"#10B981":"#EF4444",color:"white",borderRadius:12,padding:"3px 8px",fontSize:10,...DS,fontWeight:800,whiteSpace:"nowrap",animation:"popIn 0.3s ease"}}>{p.result==="right"?p.talkRight:p.talkWrong}</div>
              )}
              {phase==="answering" && !p.choice && !p.isYou && (
                <div style={{position:"absolute",top:-26,fontSize:14,letterSpacing:2,color:"rgba(255,255,255,0.6)"}}><span style={{animation:"thinkDot 1.2s infinite"}}>.</span><span style={{animation:"thinkDot 1.2s infinite 0.2s"}}>.</span><span style={{animation:"thinkDot 1.2s infinite 0.4s"}}>.</span></div>
              )}
              <div style={{fontSize:32,filter:`drop-shadow(0 3px 6px ${p.color}80)`,animation:phase==="reveal"&&p.result==="wrong"?"characterShockMini 0.4s ease":"none"}}>{p.avatar}</div>
              <div style={{fontSize:10,color:"white",...DS,fontWeight:800,marginTop:2,textAlign:"center",lineHeight:1.1}}>{p.name}</div>
              <div style={{width:60,height:14,background:p.color,borderRadius:"6px 6px 0 0",marginTop:4,boxShadow:`0 -4px 8px ${p.color}80`}}/>
            </div>
          ))}
        </div>
        {/* Lava floor — fills based on average platform drop */}
        <div style={{position:"absolute",left:0,right:0,bottom:0,height:90,zIndex:3,animation:"lavaPulse 1.5s ease-in-out infinite"}}>
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" style={{position:"absolute",top:-12,left:0,width:"100%",height:20}}>
            <path d="M0,80 Q25,5 50,25 T100,15 T150,30 T200,10 T250,28 T300,18 T350,32 T400,20 L400,80 Z" fill="#F97316"/>
          </svg>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#F97316 0%,#EF4444 60%,#7F1D1D 100%)"}}/>
          {[...Array(5)].map((_,i)=>(<div key={i} style={{position:"absolute",left:`${(i*22+8)%96}%`,bottom:0,fontSize:14,color:"#FCD34D",animation:`bubbleFloat ${1+i*0.3}s ease-in-out ${i*0.4}s infinite`,opacity:0.7}}>•</div>))}
        </div>
      </div>
      {/* Encouragement bubble */}
      {phase==="reveal" && <EncouragementBubble correct={player.lastResult==="right"} mode={mode}/>}
    </div>
  );
}

function RewardScreen({ kind, text, color, landName, onContinue }) {
  useEffect(()=>{ setTimeout(()=>speakEn(text.replace(/\n/g," ")), 400); /* eslint-disable-next-line */ },[]);
  const isLim = kind === "limerick";
  const accent = isLim?"#F59E0B":"#10B981";
  const icon = isLim?"🎵":"😄";
  const label = isLim?"REWARD · THE LIMERICK":"REWARD · THE JOKE";
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${accent}18,#FDF6EC)`,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      {FONT_LINK}
      <style>{`@keyframes popIn{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes bobUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:0}20%{opacity:1}100%{transform:translateY(120vh) rotate(720deg);opacity:0}}`}</style>
      {[...Array(14)].map((_,i)=>(<div key={i} style={{position:"absolute",left:`${(i*7+5)%95}%`,top:-20,fontSize:18,animation:`confetti ${3+i%3}s linear ${i*0.2}s infinite`,pointerEvents:"none"}}>{["⭐","✨","🎉","💫"][i%4]}</div>))}
      <div style={{background:accent,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.9)",letterSpacing:3,fontWeight:800,...DS}}>{label}</div>
        <div style={{fontSize:18,color:"white",...DS}}>{landName}</div>
      </div>
      <div style={{flex:1,padding:"24px 16px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1}}>
        <div style={{fontSize:64,marginBottom:8,animation:"bobUp 2s ease-in-out infinite"}}>{icon}</div>
        <div style={{fontSize:13,color:accent,fontWeight:800,letterSpacing:2,marginBottom:10,...DS}}>YOU EARNED IT!</div>
        <div style={{background:"white",borderRadius:24,padding:"24px 22px",width:"100%",maxWidth:420,boxShadow:`0 12px 32px ${accent}30`,border:`2px solid ${accent}40`,animation:"popIn 0.45s ease",marginBottom:20}}>
          <div style={{fontSize:15.5,color:"#1C1917",lineHeight:1.75,...DS,whiteSpace:"pre-line"}}>{text}</div>
          <button onClick={()=>speakEn(text.replace(/\n/g," "))} style={{marginTop:14,background:`${accent}15`,border:`1px solid ${accent}40`,borderRadius:12,padding:"8px 14px",cursor:"pointer",fontSize:13,color:accent,fontWeight:800,...DS}}>🔊 Hear it again</button>
        </div>
        <button onClick={onContinue} style={{width:"100%",maxWidth:420,padding:16,borderRadius:18,background:`linear-gradient(135deg,${color},${accent})`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS,boxShadow:`0 8px 24px ${color}30`}}>Keep Going! ›</button>
      </div>
    </div>
  );
}

function MyProfileScreen({ profile, familyCode, familyName, onBack }) {
  const [mode, setMode] = useState(()=>getMode(profile).id);
  const pick = (id)=>{ setMode(id); setProfileMode(profile, id); };
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <div style={{background:"rgba(255,255,255,0.05)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:20}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>My Profile</div>
      </div>
      <div style={{flex:1,padding:"24px 20px",display:"flex",flexDirection:"column",alignItems:"center",overflowY:"auto"}}>
        <div style={{width:90,height:90,borderRadius:"50%",background:profile.color||T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,marginBottom:12,boxShadow:`0 8px 24px ${profile.color||T.purple}50`}}>{profile.avatar||"🌟"}</div>
        <div style={{fontSize:26,color:"white",...DS,marginBottom:4}}>{profile.name}</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:20}}>Explorer · Land {profile.level||1}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,width:"100%",maxWidth:360,marginBottom:20}}>
          {[{label:"Stars",value:profile.stars||0,icon:"⭐"},{label:"Land",value:profile.level||1,icon:"🗺️"},{label:"Streak",value:profile.streak||0,icon:"🔥"}].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"14px 10px",textAlign:"center"}}>
              <div style={{fontSize:24}}>{s.icon}</div><div style={{fontSize:22,color:"white",...DS}}>{s.value}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:700}}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* Mode selector */}
        <div style={{width:"100%",maxWidth:380,marginBottom:18}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:800,letterSpacing:2,marginBottom:8,...DS}}>EXPLORER MODE</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {Object.values(EXPLORER_MODES).map(m=>(
              <button key={m.id} onClick={()=>pick(m.id)} style={{padding:"14px 16px",borderRadius:16,background:mode===m.id?`linear-gradient(135deg,#F59E0B,#F97316)`:"rgba(255,255,255,0.08)",border:`2px solid ${mode===m.id?"#FCD34D":"rgba(255,255,255,0.15)"}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left",color:"white"}}>
                <div style={{fontSize:28}}>{m.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,...DS,fontWeight:800}}>{m.label}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>{m.desc}</div>
                </div>
                {mode===m.id && <div style={{fontSize:18}}>✅</div>}
              </button>
            ))}
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.08)",borderRadius:18,padding:"16px 20px",width:"100%",maxWidth:360}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:700,marginBottom:4}}>FAMILY</div>
          <div style={{fontSize:18,color:"white",...DS}}>{familyName}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
            <div style={{background:"rgba(255,255,255,0.1)",borderRadius:10,padding:"6px 14px",fontSize:18,color:T.goldL,letterSpacing:3,fontWeight:900}}>{familyCode}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Share with your family!</div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// LandIntroScreen
// ============================================================
function LandIntroScreen({ land, onBack, onStartLesson }) {
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${land.color}20,white)`,display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <div style={{background:land.color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:20}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",letterSpacing:2,fontWeight:700}}>LAND {land.id}</div>
          <div style={{fontSize:20,color:"white",...DS}}>{land.emoji} {land.name}</div>
        </div>
      </div>
      <div style={{flex:1,padding:"24px 20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:100,height:100,borderRadius:28,background:land.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,marginBottom:16,boxShadow:`0 8px 32px ${land.color}40`}}>{land.emoji}</div>
        <div style={{fontSize:28,color:T.text,...DS,marginBottom:4,textAlign:"center"}}>{land.name}</div>
        <div style={{fontSize:14,color:T.textSoft,marginBottom:24,textAlign:"center"}}>{land.region} · {land.level}</div>
        <div style={{display:"flex",gap:16,marginBottom:24,alignItems:"flex-end"}}>
          <img src="/characters/grayson.png" style={{height:100,filter:`drop-shadow(0 4px 12px ${T.purple}40)`}} alt="" onError={e=>e.target.style.display='none'}/>
          <img src="/characters/peyton.png" style={{height:86,filter:`drop-shadow(0 4px 12px ${T.blue}40)`}} alt="" onError={e=>e.target.style.display='none'}/>
        </div>
        <div style={{background:"white",borderRadius:20,padding:"16px 20px",marginBottom:24,width:"100%",maxWidth:380,boxShadow:`0 4px 20px ${land.color}20`,border:`2px solid ${land.color}20`}}>
          <div style={{fontSize:13,fontWeight:800,color:land.color,marginBottom:6}}>GRAYSON SAYS:</div>
          <div style={{fontSize:14,color:T.text,lineHeight:1.6}}>Ready to explore {land.name}? Let's learn some Spanish together! This land has fun games, silly stories, and a boss challenge at the end. ¡Vámonos!</div>
        </div>
        <button onClick={onStartLesson} style={{width:"100%",maxWidth:380,padding:"18px",borderRadius:20,background:`linear-gradient(135deg,${land.color},${land.color}CC)`,border:"none",color:"white",fontSize:18,cursor:"pointer",...DS,boxShadow:`0 8px 24px ${land.color}40`}}>Start Adventure! {land.emoji}</button>
      </div>
    </div>
  );
}

// ============================================================
// StudyHallScreen + Flashcard + RandomQuiz
// ============================================================
function StudyHallScreen({ profile, onBack, onOpen }) {
  const sections = [
    { id:"flashcards", icon:"🃏", label:"Flashcard Sets",   desc:"Practice by land or category",     color:"#E8445A", available:true  },
    { id:"quiz",       icon:"🎯", label:"Randomized Quiz",  desc:"Mixed review from all your lands", color:"#10B981", available:true  },
    { id:"bookmarks",  icon:"🔖", label:"Bookmarks",        desc:"Words you saved for review",       color:"#F97316", available:false },
    { id:"grammar",    icon:"⚡", label:"Verbs and Grammar",desc:"Conjugation, patterns, lessons",   color:"#7C3AED", available:false },
    { id:"ai",         icon:"🤖", label:"AI Tutor",         desc:"Wander Lingo Plus — coming soon!", color:"#F59E0B", available:false },
  ];
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <div style={{background:"rgba(255,255,255,0.05)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:20}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",letterSpacing:2,fontWeight:700}}>THE SERIOUS SECTION</div>
          <div style={{fontSize:20,color:"white",...DS}}>📚 Study Hall</div>
        </div>
      </div>
      <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <img src="/characters/grayson.png" style={{height:70,filter:"drop-shadow(0 4px 12px rgba(124,58,237,0.4))"}} alt="" onError={e=>e.target.style.display='none'}/>
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"12px 14px",flex:1}}>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.5}}>This is where the serious learning lives. Flashcards, grammar, conjugation — all the good stuff. En mi opinión it's worth it.</div>
          </div>
        </div>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>s.available&&onOpen(s.id)} style={{width:"100%",padding:"18px",borderRadius:18,background:s.available?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.04)",border:`2px solid ${s.available?s.color+"40":"rgba(255,255,255,0.1)"}`,cursor:s.available?"pointer":"default",display:"flex",alignItems:"center",gap:14,textAlign:"left",opacity:s.available?1:0.5}}>
            <div style={{width:48,height:48,borderRadius:14,background:`${s.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.icon}</div>
            <div style={{flex:1}}><div style={{fontSize:16,color:"white",...DS}}>{s.label}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:2}}>{s.desc}</div></div>
            {s.available && <div style={{fontSize:20,color:s.color}}>›</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

// FlashcardScreen — flips through completed-land vocab
function FlashcardScreen({ profile, onBack, allLandWords }) {
  const unlocked = profile.level || 1;
  const landNumbers = Object.keys(allLandWords).map(Number).filter(n=>n<=unlocked).sort((a,b)=>a-b);
  const [selectedLand, setSelectedLand] = useState(landNumbers[0]||1);
  const words = allLandWords[selectedLand] || [];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = words[idx];
  useEffect(()=>{ setIdx(0); setFlipped(false); },[selectedLand]);
  useEffect(()=>{ if(word) speakEs(word.es); /* eslint-disable-next-line */ },[idx, selectedLand]);
  const landMeta = LANDS.find(l=>l.id===selectedLand) || LANDS[0];
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${landMeta.color}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <style>{`@keyframes flipIn{from{transform:rotateY(180deg);opacity:0}to{transform:rotateY(0);opacity:1}}`}</style>
      <div style={{background:landMeta.color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
        <div style={{flex:1,fontSize:18,color:"white",...DS}}>🃏 Flashcards</div>
      </div>
      <div style={{padding:"12px 16px",overflowX:"auto",whiteSpace:"nowrap"}}>
        {landNumbers.map(n=>{
          const L = LANDS.find(l=>l.id===n);
          if(!L) return null;
          return (
            <button key={n} onClick={()=>setSelectedLand(n)} style={{display:"inline-block",marginRight:8,padding:"8px 14px",borderRadius:12,background:selectedLand===n?L.color:"rgba(0,0,0,0.05)",color:selectedLand===n?"white":"#374151",border:"none",cursor:"pointer",fontSize:13,...DS}}>{L.emoji} {L.name}</button>
          );
        })}
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        {!word ? <div style={{color:"#6B7280"}}>No words available for this land.</div> :
          <>
            <div onClick={()=>setFlipped(f=>!f)} style={{background:"white",borderRadius:24,padding:"36px 24px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 8px 32px ${landMeta.color}30`,border:`3px solid ${landMeta.color}`,cursor:"pointer",animation:"flipIn 0.35s ease",marginBottom:18,minHeight:200,display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{fontSize:58,marginBottom:12}}>{word.emoji}</div>
              <div style={{fontSize:34,color:landMeta.color,...DS,fontWeight:900,marginBottom:8}}>{flipped?word.en:word.es}</div>
              <div style={{fontSize:13,color:"#9CA3AF",fontWeight:700,...DS}}>Tap card to flip</div>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <button onClick={()=>{ speakEs(word.es); }} style={{padding:"8px 16px",borderRadius:12,background:`${landMeta.color}15`,border:`1.5px solid ${landMeta.color}40`,color:landMeta.color,cursor:"pointer",fontSize:13,fontWeight:800,...DS}}>🔊 {word.es}</button>
              <button onClick={()=>{ speakEn(word.en); }} style={{padding:"8px 16px",borderRadius:12,background:"#F3F4F6",border:"1.5px solid #E5E7EB",color:"#6B7280",cursor:"pointer",fontSize:13,fontWeight:800,...DS}}>🔊 {word.en}</button>
            </div>
            {(word.hook||word.speakHook) && <div style={{background:`${landMeta.color}10`,borderRadius:14,padding:"12px 14px",fontSize:13,color:"#1C1917",lineHeight:1.5,maxWidth:400,marginBottom:14,...DS}}><b style={{color:landMeta.color}}>Memory Hook: </b>{word.hook||word.speakHook}</div>}
            <div style={{display:"flex",gap:10,width:"100%",maxWidth:400}}>
              <button onClick={()=>{ setIdx(i=>(i-1+words.length)%words.length); setFlipped(false); }} style={{flex:1,padding:14,borderRadius:14,background:"rgba(0,0,0,0.05)",border:"none",fontSize:15,cursor:"pointer",fontWeight:800,...DS}}>← Previous</button>
              <button onClick={()=>{ setIdx(i=>(i+1)%words.length); setFlipped(false); }} style={{flex:1,padding:14,borderRadius:14,background:landMeta.color,color:"white",border:"none",fontSize:15,cursor:"pointer",fontWeight:800,...DS}}>Next →</button>
            </div>
            <div style={{fontSize:12,color:"#6B7280",marginTop:10}}>{idx+1} / {words.length}</div>
          </>
        }
      </div>
    </div>
  );
}

// RandomQuizScreen — mixed quiz from unlocked land vocab
function RandomQuizScreen({ profile, onBack, allLandWords }) {
  const unlocked = profile.level || 1;
  const pool = useMemo(()=>{
    const arr = [];
    Object.keys(allLandWords).map(Number).filter(n=>n<=unlocked).forEach(n=>{ (allLandWords[n]||[]).forEach(w=>arr.push(w)); });
    return arr.sort(()=>Math.random()-0.5).slice(0,10);
  // eslint-disable-next-line
  },[]);
  const allWords = useMemo(()=>{
    const arr = [];
    Object.values(allLandWords).forEach(list=>list.forEach(w=>arr.push(w)));
    return arr;
  },[allLandWords]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const word = pool[idx];
  const options = useMemo(()=>{
    if(!word) return [];
    const wrongs = allWords.filter(w=>w.en!==word.en).sort(()=>Math.random()-0.5).slice(0,3).map(w=>w.en);
    return [word.en, ...wrongs].sort(()=>Math.random()-0.5);
  // eslint-disable-next-line
  },[idx]);
  useEffect(()=>{ if(word) speakEs(word.es); /* eslint-disable-next-line */ },[idx]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt);
    if(opt===word.en) setScore(s=>s+1);
    setTimeout(()=>{
      if(idx<pool.length-1){ setIdx(i=>i+1); setSelected(null); }
      else setDone(true);
    },1200);
  };
  if(!word) return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      {FONT_LINK}
      <div style={{fontSize:20,color:T.text,...DS,marginBottom:12}}>No vocabulary unlocked yet — complete a land first!</div>
      <button onClick={onBack} style={{padding:"12px 24px",borderRadius:14,background:T.purple,color:"white",border:"none",cursor:"pointer",fontSize:15,...DS}}>← Back</button>
    </div>
  );
  if(done) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1C0A4A,#2D1B69)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}>
      {FONT_LINK}
      <div style={{fontSize:64,marginBottom:8}}>🎉</div>
      <div style={{fontSize:28,color:T.goldL,...DS,fontWeight:900,marginBottom:8}}>Quiz Complete!</div>
      <div style={{fontSize:18,color:"white",marginBottom:24}}>You got {score} / {pool.length} correct</div>
      <button onClick={onBack} style={{padding:"14px 32px",borderRadius:16,background:"linear-gradient(135deg,#F59E0B,#F97316)",border:"none",color:"white",fontSize:16,cursor:"pointer",...DS}}>Back to Study Hall</button>
    </div>
  );
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${T.purple}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
      {FONT_LINK}
      <div style={{background:T.purple,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
        <div style={{flex:1,fontSize:18,color:"white",...DS}}>🎯 Randomized Quiz</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>Score {score} · {idx+1}/{pool.length}</div>
      </div>
      <div style={{flex:1,padding:"24px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",borderRadius:24,padding:"28px 20px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 8px 32px ${T.purple}25`,border:`3px solid ${T.purple}`,marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:8}}>{word.emoji}</div>
          <div style={{fontSize:34,color:T.purple,...DS,fontWeight:900}}>{word.es}</div>
          <button onClick={()=>speakEs(word.es)} style={{marginTop:8,background:`${T.purple}15`,border:`1px solid ${T.purple}40`,borderRadius:10,padding:"6px 14px",cursor:"pointer",fontSize:13,color:T.purple,fontWeight:700,...DS}}>🔊 Hear it</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:400}}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>pick(opt)} style={{padding:"16px",borderRadius:16,border:`2px solid ${!selected?T.purple:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:16,...DS,fontWeight:700,color:"#1C1917"}}>{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LAND 1 SCREEN (with corrected content flow)
// ============================================================
function Land1Screen({ profile, onBack, onComplete, isReplay }) {
  const [phase, setPhase] = useState("story");
  const [storyIdx, setStoryIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const color = "#E8445A";
  const LAND1_LIMERICK = "A traveler arrived in Cuenca one day,\nAnd tried to say Hola the very wrong way,\nHe said 'Holla' like money,\nWhich the locals found funny,\nNow they call him DJ Dollar to this day. 🎵";
  const LAND1_JOKE = "A tourist walks into a shop and says 'Hola!' perfectly. The shopkeeper responds with a long enthusiastic greeting in rapid Spanish. The tourist stares blankly. Finally says '...that's the only word I know.' The shopkeeper nods slowly. 'Me too. I was just hoping you knew more.' 😄";
  const storySlides = [
    "You just stepped off a plane in Cuenca, Ecuador. The sun is shining and the mountains are gorgeous!",
    "A friendly man named Carlos waves at you from across the street. You wave back.",
    "He walks over, smiles, and says something in Spanish. You have absolutely no idea what he said.",
    "You smile and nod anyway. He keeps talking. You keep nodding. Twenty minutes later...",
    "...you realize you just agreed to help him move furniture on Saturday. 🛋️",
    "This is why we learn to say hello first. ¡Vámonos!",
  ];
  useEffect(()=>{
    if(phase==="story"){
      const slide = storySlides[storyIdx];
      if(slide) setTimeout(()=>speakEn(slide), 300);
    }
    // eslint-disable-next-line
  },[storyIdx, phase]);
  useEffect(()=>{
    if(["lesson1","lesson2","lesson3"].includes(phase)){
      const start = phase==="lesson1"?0:phase==="lesson2"?4:8;
      const word = LAND1_WORDS[start+wordIdx];
      if(word){
        setTimeout(()=>speakEs(word.es), 300);
        setTimeout(()=>speakEn(word.en), 1400);
        setTimeout(()=>speakEn(word.speakHook||""), 2800);
      }
    }
  },[phase, wordIdx]);

  if(phase==="story"){
    const slide = storySlides[storyIdx];
    return (
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${color}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
        {FONT_LINK}
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{background:color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
          <div style={{fontSize:18,color:"white",...DS}}>👋 Land 1 — Greetings</div>
        </div>
        <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-end"}}>
            <img src="/characters/grayson.png" style={{height:110}} alt="" onError={e=>e.target.style.display="none"}/>
            <img src="/characters/peyton.png" style={{height:90}} alt="" onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{background:"white",borderRadius:20,padding:"20px",width:"100%",maxWidth:400,boxShadow:`0 4px 20px ${color}20`,marginBottom:16,animation:"fadeIn 0.4s ease",border:`2px solid ${color}20`}}>
            <div style={{fontSize:12,color,fontWeight:800,marginBottom:8,...DS}}>THE STORY</div>
            <div style={{fontSize:15,color:"#1C1917",lineHeight:1.7,...DS}}>{slide}</div>
            <button onClick={()=>speakEn(slide)} style={{marginTop:10,background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontSize:12,color,fontWeight:700,...DS}}>🔊 Hear this</button>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>
            {storySlides.map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<=storyIdx?color:"#E5E7EB"}}/>)}
          </div>
          {storyIdx<storySlides.length-1 ?
            <button onClick={()=>setStoryIdx(i=>i+1)} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:color,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Next ›</button> :
            <button onClick={()=>{setPhase("lesson1");setWordIdx(0);}} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:`linear-gradient(135deg,${color},#F97316)`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Start Learning! 👋</button>
          }
        </div>
      </div>
    );
  }

  const lessonNum = phase==="lesson1"?1:phase==="lesson2"?2:3;
  const lessonStart = lessonNum===1?0:lessonNum===2?4:8;
  const lessonWords = LAND1_WORDS.slice(lessonStart, lessonStart+4);
  const nextPhase = phase==="lesson1"?"game1":phase==="lesson2"?"game2":"game3";

  if(["lesson1","lesson2","lesson3"].includes(phase)){
    const word = lessonWords[wordIdx];
    return (
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${color}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
        {FONT_LINK}
        <div style={{background:color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
          <div style={{flex:1,fontSize:16,color:"white",...DS}}>Lesson {lessonNum} of 3</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>{wordIdx+1} / 4</div>
        </div>
        <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{background:"white",borderRadius:24,padding:"28px 20px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 8px 32px ${color}25`,border:`3px solid ${color}`,marginBottom:16}}>
            <div style={{fontSize:52,marginBottom:8}}>{word.emoji}</div>
            <div style={{fontSize:38,color,...DS,fontWeight:900,marginBottom:4}}>{word.es}</div>
            <div style={{fontSize:22,color:"#6B7280",marginBottom:16,...DS}}>{word.en}</div>
            <div style={{background:`${color}10`,borderRadius:14,padding:"12px 16px",fontSize:14,color:"#1C1917",lineHeight:1.6,textAlign:"left",marginBottom:12,...DS}}><span style={{color,fontWeight:800}}>Memory Hook: </span>{word.hook}</div>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              <button onClick={()=>speakEs(word.es)} style={{background:`${color}15`,border:`1.5px solid ${color}40`,borderRadius:12,padding:"8px 16px",cursor:"pointer",fontSize:14,color,fontWeight:700,...DS}}>🔊 {word.es}</button>
              <button onClick={()=>speakEn(word.en)} style={{background:"#F3F4F6",border:"1.5px solid #E5E7EB",borderRadius:12,padding:"8px 16px",cursor:"pointer",fontSize:14,color:"#6B7280",fontWeight:700,...DS}}>🔊 {word.en}</button>
            </div>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>
            {lessonWords.map((_,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:i<=wordIdx?color:"#E5E7EB"}}/>)}
          </div>
          {wordIdx<3 ?
            <button onClick={()=>setWordIdx(i=>i+1)} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:color,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Next Word ›</button> :
            <button onClick={()=>{setPhase(nextPhase);setWordIdx(0);}} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:`linear-gradient(135deg,${color},#F97316)`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Let's Play! 🎮</button>
          }
        </div>
      </div>
    );
  }

  if(phase==="game1")    return <MatchingGame words={LAND1_WORDS.slice(0,4)} color={color} title="Cuenca Street — Match the Greetings!" onComplete={()=>setPhase("limerick")} emoji="🗺️" isReplay={isReplay} landId={1}/>;
  if(phase==="limerick") return <RewardScreen kind="limerick" text={LAND1_LIMERICK} color={color} landName="Greetings" onContinue={()=>{setPhase("lesson2");setWordIdx(0);}}/>;
  if(phase==="game2")    return <ShootingGame allWords={LAND1_WORDS} words={LAND1_WORDS.slice(4,8)} color={color} title="Greetings Shooting Game!" onComplete={()=>setPhase("joke")} emoji="🎯" isReplay={isReplay} landId={1}/>;
  if(phase==="joke")     return <RewardScreen kind="joke" text={LAND1_JOKE} color={color} landName="Greetings" onContinue={()=>{setPhase("lesson3");setWordIdx(0);}}/>;
  if(phase==="game3")    return <FallingWordsGame allWords={LAND1_WORDS} words={LAND1_WORDS.slice(8,12)} color={color} title="Catch the Greetings!" onComplete={()=>setPhase("boss")} emoji="⬇️" isReplay={isReplay} landId={1}/>;
  if(phase==="boss")     return <BossChallenge words={LAND1_WORDS} color={color} landName="Greetings" nextLand="Around Town" onComplete={onComplete} isReplay={isReplay} landId={1} profile={profile}/>;
  return null;
}


// ============================================================
// LAND 2-25 WORDS + CONTENT
// ============================================================
const LAND2_WORDS = [
  { es:"A la derecha",  en:"To the right",    emoji:"➡️", speakHook:"Think right, think derecha!" },
  { es:"A la izquierda",en:"To the left",     emoji:"⬅️", speakHook:"Izquierda is quirky and goes left!" },
  { es:"Todo recto",    en:"Straight ahead",  emoji:"⬆️", speakHook:"Todo recto, totally straight ahead!" },
  { es:"Dobla",         en:"Turn",            emoji:"↩️", speakHook:"Dobla — like a door swinging!" },
  { es:"El bano",       en:"The bathroom",    emoji:"🚽", speakHook:"The most important word ever!" },
  { es:"La tienda",     en:"The store",       emoji:"🏪", speakHook:"La tienda — where you spend money!" },
  { es:"El mercado",    en:"The market",      emoji:"🛒", speakHook:"El mercado, the market!" },
  { es:"La plaza",      en:"The plaza",       emoji:"🏛️", speakHook:"La plaza, the heart of the city!" },
  { es:"Disculpe",      en:"Excuse me",       emoji:"🙋", speakHook:"Disculpe — be cool and excuse me!" },
  { es:"Cerca",         en:"Near",            emoji:"📍", speakHook:"Cerca sounds like search nearby!" },
  { es:"Lejos",         en:"Far",             emoji:"🗺️", speakHook:"Lejos, far away!" },
  { es:"Ayuda",         en:"Help",            emoji:"🆘", speakHook:"Ayuda — you-da need help!" },
];
const LAND2_CONTENT = {
  story:["You need to find a bathroom in Cuenca. Urgently.","You spot a local and ask for directions in perfect Spanish.","She points left, says many words, waves twice, points right, says something about a fountain, walks away smiling.","You go left. You find a bakery. The bathroom is not here. The bread is excellent though.","This land exists so that never happens to you again."],
  limerick:"A tourist who needed the bathroom one day,\nAsked directions in Spanish the very wrong way.\nHe went left at the plaza,\nFound a whole new piazza,\nHe now lives there. His name is Jose.",
  joke:"A family asks where the bathroom is in perfect Spanish. The local gives detailed directions at full speed. The family nods confidently and walks into a shoe store. They bought three pairs. Still needed the bathroom.",
};
const LAND3_WORDS = [
  { es:"Mama",      en:"Mom",     emoji:"👩", speakHook:"Mama is the same everywhere!" },
  { es:"Papa",      en:"Dad",     emoji:"👨", speakHook:"Papa sounds like dad!" },
  { es:"Hermana",   en:"Sister",  emoji:"👧", speakHook:"Hermana — the one who borrows your stuff!" },
  { es:"Hermano",   en:"Brother", emoji:"👦", speakHook:"Hermano — brother version!" },
  { es:"Abuela",    en:"Grandma", emoji:"👵", speakHook:"Abuela — sneezing on a propeller!" },
  { es:"Abuelo",    en:"Grandpa", emoji:"👴", speakHook:"Abuelo — same sneeze, dignified!" },
  { es:"Bebe",      en:"Baby",    emoji:"👶", speakHook:"Babies say bebe — they already know Spanish!" },
  { es:"Familia",   en:"Family",  emoji:"👨‍👩‍👧‍👦", speakHook:"Familia sounds just like family!" },
  { es:"Tia",       en:"Aunt",    emoji:"👩", speakHook:"Tia brings the best food!" },
  { es:"Tio",       en:"Uncle",   emoji:"👨", speakHook:"Tio — cool tio energy!" },
  { es:"Prima",     en:"Cousin (girl)", emoji:"👧", speakHook:"Prima — primary cousin friend!" },
  { es:"Primo",     en:"Cousin (boy)",  emoji:"👦", speakHook:"Primo — prime cousin!" },
];
const LAND3_CONTENT = {
  story:["Spanish family words sound like something completely different in English.","Your grandmother is your Abuela — like sneezing while saying propeller.","Your grandfather is your Abuelo — same sneeze, dignified.","Your baby sibling is your Bebe — what babies say anyway.","By the end you'll sound like you've known these your whole life. Your abuela will be impressed and probably feed you."],
  limerick:"A girl tried to say grandma in Spanish one day.\nAbuela she shouted — her grandma said Ay!\nShe clapped and said Bueno!\nThen called for Abuelo.\nNow both of them follow her around every day.",
  joke:"A kid learns hermano means brother. She walks to her older sister and says you are NOT my hermano. Her sister says I know, I am your hermana. The kid thinks for a long time. Then says so there's a whole separate word just for you being annoying?",
};
const LAND4_WORDS = [
  { es:"El pollo",      en:"Chicken",         emoji:"🍗", speakHook:"Pollo sounds like poyo — chicken!" },
  { es:"El arroz",      en:"Rice",            emoji:"🍚", speakHook:"El arroz — always there for you!" },
  { es:"La fruta",      en:"Fruit",           emoji:"🍎", speakHook:"La fruta sounds like fruit!" },
  { es:"El pan",        en:"Bread",           emoji:"🍞", speakHook:"El pan — pan you bake bread in!" },
  { es:"La leche",      en:"Milk",            emoji:"🥛", speakHook:"La leche — stretchy like milk pouring!" },
  { es:"El agua",       en:"Water",           emoji:"💧", speakHook:"El agua — refreshing!" },
  { es:"El jugo",       en:"Juice",           emoji:"🧃", speakHook:"El jugo — Hugo loves his juice!" },
  { es:"El cafe",       en:"Coffee",          emoji:"☕", speakHook:"El cafe — just like cafe!" },
  { es:"Tengo hambre",  en:"I am hungry",     emoji:"😋", speakHook:"I have hunger — most useful phrase!" },
  { es:"Tengo sed",     en:"I am thirsty",    emoji:"🥤", speakHook:"I have thirst — sed like said!" },
  { es:"La cuenta",     en:"The bill",        emoji:"🧾", speakHook:"La cuenta — time to pay!" },
  { es:"Buen provecho", en:"Enjoy your meal", emoji:"🍽️", speakHook:"Said before every Spanish meal!" },
];
const LAND4_CONTENT = {
  story:["Spanish food words are critical to learn and here's why.","Order something you don't mean and the waiter brings it with a smile.","Ecuadorian food is delicious so stakes are low.","But point at the menu wrong and you might end up with cuy.","Look it up. Actually — learn the food words first, THEN look it up."],
  limerick:"A traveler sat down at a Cuenca cafe,\nAnd pointed at something he hoped was fillet.\nThe waiter said Bueno!\nBrought soup, bread, and cuy-no,\nHe smiled, took a bite, and just had a great day.",
  joke:"A kid learns pollo means chicken. Confidently orders pollo perfectly. The waiter brings a plate. She looks down. Looks up. Says this is definitely chicken. Her dad says yes you did it. She thinks and says I'd also like to learn the word for mayonnaise immediately.",
};
const LAND5_WORDS = [
  { es:"Feliz",         en:"Happy",      emoji:"😊", speakHook:"Feliz — like felicitations!" },
  { es:"Triste",        en:"Sad",        emoji:"😢", speakHook:"Triste — sad like a sad tree!" },
  { es:"Enojado",       en:"Angry",      emoji:"😠", speakHook:"Enojado — annoyed angry!" },
  { es:"Cansado",       en:"Tired",      emoji:"😴", speakHook:"Cansado — too tired to be happy!" },
  { es:"Asustado",      en:"Scared",     emoji:"😨", speakHook:"Ghost says BOO and you're scared-ado!" },
  { es:"Emocionado",    en:"Excited",    emoji:"🤩", speakHook:"Emocionado — emotional excitement!" },
  { es:"Aburrido",      en:"Bored",      emoji:"😑", speakHook:"Aburrido — boring burrito!" },
  { es:"Sorprendido",   en:"Surprised",  emoji:"😲", speakHook:"Surprised with extra drama!" },
  { es:"Bien",          en:"Good",       emoji:"✅", speakHook:"Bien — been good!" },
  { es:"Mal",           en:"Bad",        emoji:"😕", speakHook:"Mal — malfunction!" },
  { es:"Mas o menos",   en:"So so",      emoji:"🤷", speakHook:"More or less — the universal shrug!" },
  { es:"Estoy bien",    en:"I am fine",  emoji:"👍", speakHook:"The answer to everything!" },
];
const LAND5_CONTENT = {
  story:["Feelings in Spanish are dramatic. Not because Spanish is dramatic, just a little.","Once you know how to say how you feel, you say it constantly.","You walk into a room and announce that you're happy. You dramatically inform strangers you are tired.","You tell your family you're hungry every twenty minutes — which you were doing in English already.","Feelings are a superpower. Let's learn yours."],
  limerick:"A boy learned estoy triste meant sad,\nAnd used it whenever things went a bit bad.\nLost a game? Estoy triste!\nHis sister got misty.\nNow she does his chores. Best word he ever had.",
  joke:"A kid learns feliz means happy. She announces Estoy feliz! Her little sister immediately says Estoy feliz tambien! Mom tears up. The older sister whispers — I told her we were happy so she'd stop asking us to clean. It worked. Remember this.",
};
const LAND6_WORDS = [
  { es:"El",    en:"The (masc.)",  emoji:"🔤", speakHook:"El — masculine the!" },
  { es:"La",    en:"The (fem.)",   emoji:"🔤", speakHook:"La — feminine the!" },
  { es:"De",    en:"Of / From",    emoji:"📍", speakHook:"Soy de Cuenca — I'm from!" },
  { es:"Y",     en:"And",          emoji:"➕", speakHook:"Y — just one letter for and!" },
  { es:"En",    en:"In / On",      emoji:"📦", speakHook:"En — sounds like in!" },
  { es:"Un",    en:"A (masc.)",    emoji:"1️⃣", speakHook:"Un — like one!" },
  { es:"Que",   en:"That / What",  emoji:"❓", speakHook:"Que — what did you say?" },
  { es:"No",    en:"No",           emoji:"🚫", speakHook:"No — same word, easy!" },
  { es:"Si",    en:"Yes / If",     emoji:"✅", speakHook:"Si — see what we did!" },
  { es:"Con",   en:"With",         emoji:"🤝", speakHook:"Con — together with!" },
  { es:"Es",    en:"Is",           emoji:"📌", speakHook:"Es — Es facil!" },
  { es:"Muy",   en:"Very",         emoji:"💯", speakHook:"Muy — very useful!" },
];
const LAND6_CONTENT = {
  story:["Welcome to the Core Words checkpoint. These tiny words hold Spanish together.","El, la, de, y, en — small but in every sentence.","Master these and Spanish stops sounding like noise.","Carlos the furniture mover is back. He still wants help on Saturday.","Boss fight is upgraded. ¡Vámonos!"],
  limerick:"A traveler learned el and la one day,\nAnd shouted them out in the most confident way,\nLa perro! El gato!\nA local said no-no,\nThe genders are switched. You'll get there. Okay.",
  joke:"A kid learns si means yes. Mom asks if she cleaned her room. Si! Did she do homework? Si! Did she eat veggies? Si! Did she just learn one Spanish word? Long pause. Si.",
};
const LAND7_WORDS = [
  { es:"La clase",      en:"The class",     emoji:"🏫", speakHook:"La clase — like a class!" },
  { es:"El libro",      en:"The book",      emoji:"📚", speakHook:"El libro — sounds like library!" },
  { es:"La tarea",      en:"The homework",  emoji:"📝", speakHook:"La tarea — the dreaded tarea!" },
  { es:"El lapiz",      en:"The pencil",    emoji:"✏️", speakHook:"El lapiz — always disappears!" },
  { es:"El maestro",    en:"The teacher",   emoji:"👨‍🏫", speakHook:"El maestro — conductor of learning!" },
  { es:"La escuela",    en:"The school",    emoji:"🏫", speakHook:"La escuela!" },
  { es:"El examen",     en:"The test",      emoji:"📋", speakHook:"El examen — like exam!" },
  { es:"El escritorio", en:"The desk",      emoji:"🪑", speakHook:"Escritorio — where you write!" },
  { es:"No entiendo",   en:"I do not understand", emoji:"🤔", speakHook:"No entiendo — I do not tend to understand!" },
  { es:"La mochila",    en:"The backpack",  emoji:"🎒", speakHook:"Mochila — carries everything!" },
  { es:"El recreo",     en:"The recess",    emoji:"⚽", speakHook:"El recreo — the best time!" },
  { es:"El bano",       en:"The bathroom",  emoji:"🚽", speakHook:"Most important question in school!" },
];
const LAND7_CONTENT = {
  story:["School words in Spanish are extremely useful.","When you move to a new country and everyone speaks Spanish at full speed, you have two choices.","Smile and nod like a bobblehead for the entire year.","OR know enough school words to find your pencil, understand homework due dates, and politely tell your teacher you did the assignment.","Your teachers will appreciate it. Your pencil will too."],
  limerick:"A boy learned that libro meant book right away,\nAnd carried one proudly to school every day.\nHis teacher said Bueno!\nHis backpack said no-no.\nHe had seventeen books. Someone take some away.",
  joke:"A kid learns lapiz means pencil. She loses hers. She asks her teacher donde esta mi lapiz perfectly. Her teacher walks to the lost and found and hands her back four pencils. She didn't know she'd lost that many.",
};
const LAND8_WORDS = [
  { es:"Uno",    en:"One",       emoji:"1️⃣", speakHook:"Uno — the card game!" },
  { es:"Dos",    en:"Two",       emoji:"2️⃣", speakHook:"Dos — like dose, take two!" },
  { es:"Tres",   en:"Three",     emoji:"3️⃣", speakHook:"Tres — like tres leches, three milks!" },
  { es:"Cuatro", en:"Four",      emoji:"4️⃣", speakHook:"Cuatro — four strings on a cuatro guitar!" },
  { es:"Cinco",  en:"Five",      emoji:"5️⃣", speakHook:"Cinco — like Cinco de Mayo!" },
  { es:"Seis",   en:"Six",       emoji:"6️⃣", speakHook:"Seis — say six in Spanish!" },
  { es:"Siete",  en:"Seven",     emoji:"7️⃣", speakHook:"Siete — seven is siete!" },
  { es:"Ocho",   en:"Eight",     emoji:"8️⃣", speakHook:"Ocho — eight tentacles on an ocho-pus!" },
  { es:"Nueve",  en:"Nine",      emoji:"9️⃣", speakHook:"Nueve — almost new, nueve!" },
  { es:"Diez",   en:"Ten",       emoji:"🔟", speakHook:"Diez — ten fingers, diez dedos!" },
  { es:"Veinte", en:"Twenty",    emoji:"2️⃣0️⃣", speakHook:"Veinte — twenty!" },
  { es:"Cien",   en:"One hundred", emoji:"💯", speakHook:"Cien — one hundred percent!" },
];
const LAND8_CONTENT = {
  story:["Numbers in Spanish follow the same rules as English — great news.","Bad news: people use them at full speed and string them together into prices, addresses, phone numbers.","A vendor in Cuenca's market once told a tourist her bag cost cincuenta y dos dollars.","The tourist heard five words, understood zero, handed over a hundred and said keep the change because she panicked.","We're going to make sure that never happens to you. Your wallet will thank us."],
  limerick:"A boy counted uno dos tres every day,\nBy cuatro and cinco he felt pretty okay.\nAt seis he got cocky,\nAt siete got rocky,\nBy ocho he had forgotten uno. Anyway.",
  joke:"A kid learns to count to ten perfectly. Her dad quizzes her. How do you say ten? Diez. How do you say two? Dos. How do you say eight? Long pause. Diez minus dos? Dad stares. Kid shrugs. I'm still learning the middle ones.",
};
const LAND9_WORDS = [
  { es:"Rojo",      en:"Red",      emoji:"🔴", speakHook:"Rojo — rouge in French!" },
  { es:"Azul",      en:"Blue",     emoji:"🔵", speakHook:"Azul — mysterious blue!" },
  { es:"Verde",     en:"Green",    emoji:"🟢", speakHook:"Verde — verdant green!" },
  { es:"Amarillo",  en:"Yellow",   emoji:"🟡", speakHook:"Amarillo — a yellow armadillo!" },
  { es:"Morado",    en:"Purple",   emoji:"🟣", speakHook:"Morado — magnificent color!" },
  { es:"Rosado",    en:"Pink",     emoji:"🌸", speakHook:"Rosado — a pink rose!" },
  { es:"Naranja",   en:"Orange",   emoji:"🟠", speakHook:"Naranja — the fruit AND the color!" },
  { es:"Blanco",    en:"White",    emoji:"⬜", speakHook:"Blanco — blanc in French!" },
  { es:"Negro",     en:"Black",    emoji:"⬛", speakHook:"Negro — like a dark night!" },
  { es:"Gris",      en:"Gray",     emoji:"🩶", speakHook:"Gris — gray and slippery!" },
  { es:"Cafe",      en:"Brown",    emoji:"🤎", speakHook:"Cafe means brown AND coffee!" },
  { es:"Multicolor",en:"Colorful", emoji:"🌈", speakHook:"Multicolor — rainbow!" },
];
const LAND9_CONTENT = {
  story:["Colors are secretly everywhere in Spanish.","You'll walk Cuenca and think that door is rojo, that wall is azul, that flower is amarillo.","You'll do this out loud. Strangers will nod approvingly.","Only amarillo will trouble you — it means yellow and sounds like nothing in English.","We have a memory hook for it. You're welcome."],
  limerick:"A painter in Cuenca mixed rojo and blue,\nAnd ended up with a magnificent hue.\nHe said that is morado!\nWhich means purple. Bravo-do.\nHe painted his house that color. Wouldn't you?",
  joke:"Knock knock. Who's there? Amarillo. Amarillo who? Amarillo nice person once you know me, but right now I need you to remember I mean YELLOW and not an armadillo.",
};
const LAND10_WORDS = [
  { es:"El perro",   en:"The dog",        emoji:"🐕", speakHook:"El perro — rolls like a dog rolling over!" },
  { es:"El gato",    en:"The cat",        emoji:"🐱", speakHook:"El gato — fancy Italian cheese energy!" },
  { es:"El pajaro",  en:"The bird",       emoji:"🐦", speakHook:"El pajaro — birds go pa ha!" },
  { es:"El pez",     en:"The fish",       emoji:"🐟", speakHook:"El pez — Pez candy is fish shaped!" },
  { es:"El caballo", en:"The horse",      emoji:"🐎", speakHook:"El caballo — riding to a cab!" },
  { es:"La vaca",    en:"The cow",        emoji:"🐄", speakHook:"La vaca goes moo!" },
  { es:"El cerdo",   en:"The pig",        emoji:"🐷", speakHook:"El cerdo — certain pigs!" },
  { es:"El mono",    en:"The monkey",     emoji:"🐒", speakHook:"El mono — one funny monkey!" },
  { es:"El oso",     en:"The bear",       emoji:"🐻", speakHook:"El oso — oh so big!" },
  { es:"La serpiente",en:"The snake",     emoji:"🐍", speakHook:"La serpiente — serpent slithering!" },
  { es:"El cuy",     en:"The guinea pig", emoji:"🐹", speakHook:"El cuy — most important in Ecuador!" },
  { es:"El pollo",   en:"The chicken",    emoji:"🍗", speakHook:"El pollo — you know this!" },
];
const LAND10_CONTENT = {
  story:["Animals in Spanish are wonderful and occasionally alarming.","A dog is a perro — sounds like asking a question. A cat is a gato — fancy Italian cheese.","A fish is a pez, just like the candy, and the Pez candy inventor clearly knew Spanish.","The most important animal here is cuy.","You may remember cuy from Land 4. A cuy is a delicious traditional Ecuadorian guinea pig. Your class hamster is not safe in Cuenca. We said what we said."],
  limerick:"A girl saw a perro and said Hola dog!\nThe perro just stared like a bump on a log.\nShe said Perro I mean it!\nThe dog finally seen it.\nNow follows her home through the fog every jog.",
  joke:"Knock knock. Who's there? Gato. Gato who? Gato be honest — I'm a cat, I don't knock, I just stare until you open the door. This joke was a mistake.",
};
const LAND11_WORDS = [
  { es:"Pero",     en:"But",         emoji:"↪️", speakHook:"Pero — pear-oh!" },
  { es:"Porque",   en:"Because",     emoji:"💡", speakHook:"Porque — that is why!" },
  { es:"Tambien",  en:"Also / Too",  emoji:"➕", speakHook:"Tambien — me too!" },
  { es:"Cuando",   en:"When",        emoji:"⏰", speakHook:"Cuando — when when when?" },
  { es:"Donde",    en:"Where",       emoji:"📍", speakHook:"Donde — where is the bathroom!" },
  { es:"Como",     en:"How / Like",  emoji:"❓", speakHook:"Como — como estas?" },
  { es:"Siempre",  en:"Always",      emoji:"♾️", speakHook:"Siempre — always remember!" },
  { es:"Nunca",    en:"Never",       emoji:"🚫", speakHook:"Nunca — none-ever!" },
  { es:"Todo",     en:"Everything",  emoji:"🌐", speakHook:"Todo — toto-ally everything!" },
  { es:"Nada",     en:"Nothing",     emoji:"⭕", speakHook:"Nada — nothing at all!" },
  { es:"Mucho",    en:"A lot",       emoji:"📈", speakHook:"Mucho mucho!" },
  { es:"Ahora",    en:"Now",         emoji:"⏳", speakHook:"Ahora — right now!" },
];
const LAND11_CONTENT = {
  story:["Checkpoint two. You know enough Spanish for real conversations now.","Real conversations need connector words — pero, porque, tambien, cuando.","Without these you sound like a robot listing nouns.","The tambien sister returns. She still says tambien to literally everything.","Last boss before intermediate."],
  limerick:"A traveler said tambien with such pride,\nWhenever a Spaniard agreed by his side,\nThe locals said si-si!\nHe said tambien three-three!\nNow he says tambien even when he has lied.",
  joke:"A kid learns nunca means never. Her brother asks did you take my snack? Nunca! Did you read my journal? Nunca! Did you just learn one Spanish word? Long pause. Nunca.",
};

const LAND12_WORDS = [
  { es:"Ir",      en:"To go",        emoji:"🚶", speakHook:"Ir — two letters to go anywhere!" },
  { es:"Ser",     en:"To be (always)",emoji:"🪨",speakHook:"Ser — for who you ARE!" },
  { es:"Estar",   en:"To be (now)",  emoji:"💭", speakHook:"Estar — how you ARE right now!" },
  { es:"Tener",   en:"To have",      emoji:"🤲", speakHook:"Tener — like tenure!" },
  { es:"Hacer",   en:"To do/make",   emoji:"🛠️", speakHook:"Hacer — to do or make!" },
  { es:"Ver",     en:"To see",       emoji:"👀", speakHook:"Ver — sounds like view!" },
  { es:"Dar",     en:"To give",      emoji:"🎁", speakHook:"Dar — give it a dar!" },
  { es:"Querer",  en:"To want/love", emoji:"❤️", speakHook:"Querer — to want or to love!" },
  { es:"Poder",   en:"To be able to",emoji:"💪", speakHook:"Poder — like power!" },
  { es:"Decir",   en:"To say",       emoji:"💬", speakHook:"Decir — what you say!" },
  { es:"Hablar",  en:"To speak",     emoji:"🗣️", speakHook:"Hablar — sounds like blahblah!" },
  { es:"Comer",   en:"To eat",       emoji:"🍴", speakHook:"Comer — come on let's eat!" },
];
const LAND12_CONTENT = {
  story:["Welcome to intermediate. Things are about to get verby.","Verbs are the action heroes. Without them you can name everything but DO nothing.","Spanish verbs change endings depending on who's doing the action.","Don't panic. We start with the base form and build from there.","Carlos says ayudar means to help. He's still hoping you remembered Saturday."],
  limerick:"A learner discovered ser and estar,\nAnd asked why on earth there are two so-far,\nOne is for forever,\nOne for whatever,\nHe still gets them wrong but he's gotten this far.",
  joke:"A kid learns querer means to want AND to love. She tells her mom te quiero. Mom melts. The kid says I want a snack. Mom narrows her eyes. The kid says te quiero MUCHO. Mom hands over the snack.",
};
const LAND13_WORDS = [
  { es:"Hora",       en:"Hour",        emoji:"⏰", speakHook:"Hora — what hora is it?" },
  { es:"Dia",        en:"Day",         emoji:"🌞", speakHook:"Dia — every good day!" },
  { es:"Semana",     en:"Week",        emoji:"📅", speakHook:"Semana — a seven-day semana!" },
  { es:"Mes",        en:"Month",       emoji:"🗓️", speakHook:"Mes — a mes for every month!" },
  { es:"Año",        en:"Year",        emoji:"🎉", speakHook:"Año — a whole año!" },
  { es:"Hoy",        en:"Today",       emoji:"📍", speakHook:"Hoy — hoy is today!" },
  { es:"Mañana",     en:"Tomorrow",    emoji:"➡️", speakHook:"Mañana — tomorrow… probably!" },
  { es:"Ayer",       en:"Yesterday",   emoji:"⬅️", speakHook:"Ayer — yesterday is over!" },
  { es:"Lunes",      en:"Monday",      emoji:"😴", speakHook:"Lunes — moon-day!" },
  { es:"Martes",     en:"Tuesday",     emoji:"🛡️", speakHook:"Martes — Mars day!" },
  { es:"Miércoles",  en:"Wednesday",   emoji:"☄️", speakHook:"Miércoles — midweek!" },
  { es:"Viernes",    en:"Friday",      emoji:"🎉", speakHook:"Viernes — best day!" },
];
const LAND13_CONTENT = {
  story:["Time words are useful because every conversation asks que hora es?","Every plan asks cuando? Both unavoidable.","Without time words you can only meet at vague unknowable moments.","We start with hora, dia, mes, año then days of week.","By the end you can make plans and keep them."],
  limerick:"A traveler said mañana with pride,\nFor every plan he was asked to provide,\nMañana for cleaning!\nMañana for meaning!\nMañana eventually means 'never', he sighed.",
  joke:"A kid learns hoy means today and ayer means yesterday. Dad asks when did you do homework? Ayer! When? AYER! Today? Hoy I did NOT because I already did it AYER.",
};
const LAND14_WORDS = [
  { es:"La cabeza",  en:"The head",     emoji:"🧠", speakHook:"Cabeza — holds your brain!" },
  { es:"El ojo",     en:"The eye",      emoji:"👁️", speakHook:"Ojo — sees everything!" },
  { es:"La oreja",   en:"The ear",      emoji:"👂", speakHook:"Oreja — hears!" },
  { es:"La nariz",   en:"The nose",     emoji:"👃", speakHook:"Nariz — smells stuff!" },
  { es:"La boca",    en:"The mouth",    emoji:"👄", speakHook:"Boca — talks too much!" },
  { es:"La mano",    en:"The hand",     emoji:"✋", speakHook:"Mano — give me a hand!" },
  { es:"El pie",     en:"The foot",     emoji:"🦶", speakHook:"Pie — your foot!" },
  { es:"El brazo",   en:"The arm",      emoji:"💪", speakHook:"Brazo — flexes!" },
  { es:"La pierna",  en:"The leg",      emoji:"🦵", speakHook:"Pierna — walks!" },
  { es:"El corazón", en:"The heart",    emoji:"❤️", speakHook:"Mi corazón!" },
  { es:"El dedo",    en:"The finger",   emoji:"👆", speakHook:"Dedo — points!" },
  { es:"La espalda", en:"The back",     emoji:"🔙", speakHook:"Espalda — your back!" },
];
const LAND14_CONTENT = {
  story:["Body words are useful and awkward.","Useful because a doctor will ask where it hurts.","Awkward because you'll practice in front of a mirror.","Everyone learning a language has done this.","By the end you can survive a doctor visit and describe a stubbed toe."],
  limerick:"A patient said pierna at the clinic one day,\nThe doctor said sí, what's the trouble I pray?\nThe patient said hmm,\nIt's right here on my arm,\nIt's brazo not pierna. They laughed anyway.",
  joke:"A kid learns nariz means nose. She tells abuela your nariz is grande! Abuela narrows her eyes. Kid says I mean your nariz is bonita. Abuela hands her a cookie.",
};
const LAND15_WORDS = [
  { es:"Grande",   en:"Big",     emoji:"🦣", speakHook:"Grande — a grande coffee is HUGE!" },
  { es:"Pequeño",  en:"Small",   emoji:"🐜", speakHook:"Pequeño — tiny!" },
  { es:"Alto",     en:"Tall",    emoji:"🦒", speakHook:"Alto — like alt, tall!" },
  { es:"Bajo",     en:"Short",   emoji:"🐢", speakHook:"Bajo — low and short!" },
  { es:"Bonito",   en:"Pretty",  emoji:"🌸", speakHook:"Bonito — pretty!" },
  { es:"Feo",      en:"Ugly",    emoji:"👹", speakHook:"Feo — not so cute!" },
  { es:"Nuevo",    en:"New",     emoji:"✨", speakHook:"Nuevo — like new!" },
  { es:"Viejo",    en:"Old",     emoji:"👴", speakHook:"Viejo — old and wise!" },
  { es:"Rápido",   en:"Fast",    emoji:"⚡", speakHook:"Rápido — just like rapid!" },
  { es:"Lento",    en:"Slow",    emoji:"🐌", speakHook:"Lento — slow and lent-o!" },
  { es:"Fácil",    en:"Easy",    emoji:"😎", speakHook:"Fácil — facile, easy!" },
  { es:"Difícil",  en:"Hard",    emoji:"😤", speakHook:"Difícil — difficult!" },
];
const LAND15_CONTENT = {
  story:["Adjectives in Spanish change to match what they describe.","A big dog is un perro grande. Big dogs are perros grandes.","A pretty girl is una niña bonita. Adjective got an A.","Forget all this and people still understand.","Carlos says his couch is muy grande, muy pesado, y muy difícil. You can finally agree."],
  limerick:"A learner said bonita with pride,\nTo describe her car parked outside,\nIt was actually feo,\nDented and slow,\nNow bonita means 'wrong' in her ride.",
  joke:"A kid learns viejo means old. She tells abuelo eres muy viejo. He nods proudly. She continues — y muy bonito! He melts. She adds — y un poco lento. He squints. The cookie remains uneaten.",
};
const LAND16_WORDS = [
  { es:"La tienda",  en:"The store",    emoji:"🏪", speakHook:"Tienda — your favorite!" },
  { es:"El dinero",  en:"Money",        emoji:"💵", speakHook:"Dinero — keep it close!" },
  { es:"Comprar",    en:"To buy",       emoji:"🛒", speakHook:"Comprar — like compare, then buy!" },
  { es:"Vender",     en:"To sell",      emoji:"🤝", speakHook:"Vender — like a vending machine!" },
  { es:"Caro",       en:"Expensive",    emoji:"💎", speakHook:"Caro — careful, expensive!" },
  { es:"Barato",     en:"Cheap",        emoji:"💰", speakHook:"Barato — a bargain!" },
  { es:"El precio",  en:"The price",    emoji:"🏷️", speakHook:"Precio — like price!" },
  { es:"El cambio",  en:"Change",       emoji:"🪙", speakHook:"Cambio — exchange!" },
  { es:"La tarjeta", en:"Card",         emoji:"💳", speakHook:"Tarjeta — your card!" },
  { es:"Efectivo",   en:"Cash",         emoji:"💵", speakHook:"Effective — cash is effective!" },
  { es:"¿Cuánto?",   en:"How much?",    emoji:"❓", speakHook:"Cuánto — how much?" },
  { es:"Una bolsa",  en:"A bag",        emoji:"👜", speakHook:"Bolsa — your bag!" },
];
const LAND16_CONTENT = {
  story:["Shopping in Cuenca is its own sport.","The artisan markets are full of beautiful things and very good sellers.","Don't know cuánto cuesta and you'll buy a hand-woven hammock by accident.","Don't know cambio and you'll hand over a twenty for a two-dollar empanada.","We'll make sure that never happens."],
  limerick:"A shopper walked into a Cuenca shop spry,\nAnd asked cuánto cuesta with a confident eye,\nThe vendor said veinte,\nThe shopper paid plenty,\nVeinte means twenty. Not five. Don't ask why.",
  joke:"A kid learns barato means cheap. She holds the most expensive toy and says mira mama, es muy barato! Mom looks at the price. Kid adds — para ti!",
};
const LAND17_WORDS = [
  { es:"El sol",      en:"The sun",   emoji:"☀️", speakHook:"Sol — shines all day!" },
  { es:"La lluvia",   en:"Rain",      emoji:"🌧️", speakHook:"Lluvia — falls from clouds!" },
  { es:"La nieve",    en:"Snow",      emoji:"❄️", speakHook:"Nieve — like neve!" },
  { es:"El viento",   en:"Wind",      emoji:"💨", speakHook:"Viento — ventilation!" },
  { es:"La nube",     en:"Cloud",     emoji:"☁️", speakHook:"Nube — newbie cloud!" },
  { es:"Frío",        en:"Cold",      emoji:"🥶", speakHook:"Frío — freeze!" },
  { es:"Calor",       en:"Heat",      emoji:"🥵", speakHook:"Calor — calorie hot!" },
  { es:"Hace sol",    en:"It's sunny",emoji:"😎", speakHook:"It makes sun!" },
  { es:"Hace frío",   en:"It's cold", emoji:"🧥", speakHook:"It makes cold, brrr!" },
  { es:"La tormenta", en:"Storm",     emoji:"⛈️", speakHook:"Tormenta — tormented!" },
  { es:"La niebla",   en:"Fog",       emoji:"🌫️", speakHook:"Niebla — foggy!" },
  { es:"El arcoíris", en:"Rainbow",   emoji:"🌈", speakHook:"Arcoíris — arc of iris!" },
];
const LAND17_CONTENT = {
  story:["Cuenca's weather is famously unpredictable. Four seasons in an afternoon.","If you can't talk about weather in Spanish, you can't make small talk.","Hace sol! Hace frío! Está lloviendo! These are bus stop greetings.","Good news, only a handful of words.","By the end you can comment on la lluvia, complain about el viento, and impress strangers with meteorological vocabulary."],
  limerick:"A traveler walked Cuenca one day,\nHace sol! she announced with hooray,\nThen niebla, then lluvia,\nThen sun once again-ya,\nFour seasons before lunch. Que disarray.",
  joke:"A kid learns calor means heat. On a 90-degree day she shouts MUCHO CALOR! Mom hands water. Goes outside, comes in, shouts MUCHO CALOR! Mom hands more water.",
};
const LAND18_WORDS = [
  { es:"Aquí",     en:"Here",        emoji:"📍", speakHook:"Aquí — right here!" },
  { es:"Allí",     en:"There",       emoji:"📌", speakHook:"Allí — way over there!" },
  { es:"Este",     en:"This",        emoji:"👇", speakHook:"Este — this one!" },
  { es:"Ese",      en:"That",        emoji:"👉", speakHook:"Ese — that one!" },
  { es:"Mi",       en:"My",          emoji:"🙋", speakHook:"Mi — my backpack!" },
  { es:"Tu",       en:"Your",        emoji:"👈", speakHook:"Tu — your stuff!" },
  { es:"Su",       en:"His/Her",     emoji:"👤", speakHook:"Su — his or her!" },
  { es:"Nuestro",  en:"Our",         emoji:"🤝", speakHook:"Nuestro — ours!" },
  { es:"Hacer",    en:"To make/do",  emoji:"🛠️", speakHook:"Hacer — make and do!" },
  { es:"Dar",      en:"To give",     emoji:"🎁", speakHook:"Dar — give it!" },
  { es:"Poner",    en:"To put",      emoji:"📦", speakHook:"Poner — put it down!" },
  { es:"Traer",    en:"To bring",    emoji:"📥", speakHook:"Traer — bring it!" },
];
const LAND18_CONTENT = {
  story:["Checkpoint three. You've learned hundreds of words.","This checkpoint is about precision.","Aquí, allí, este, ese — point at things without picking them up.","Possessives — mi, tu, su, nuestro — claim things without writing your name.","Carlos has stopped asking about Saturday. He moved the couch himself."],
  limerick:"A learner said aquí with a smirk,\nAnd allí with a confident jerk,\nShe pointed at both,\nThen forgot which was which-loath,\nNow she just shrugs and says 'ahí'. That works.",
  joke:"A kid learns mi means my. She points at sister's snack and says mi snack. Sister says NO. Kid says SU snack? Sister says SI. Kid pauses. Pero quiero mi snack. Sister hands it over.",
};
const LAND19_WORDS = [
  { es:"Bueno",   en:"Good",       emoji:"👍", speakHook:"Bueno — all good!" },
  { es:"Malo",    en:"Bad",        emoji:"👎", speakHook:"Malo — no good!" },
  { es:"Otro",    en:"Another",    emoji:"🔁", speakHook:"Otro — give me another!" },
  { es:"Mismo",   en:"Same",       emoji:"🟰", speakHook:"Mismo — the same!" },
  { es:"Gente",   en:"People",     emoji:"👥", speakHook:"Gente — the people!" },
  { es:"Hombre",  en:"Man",        emoji:"👨", speakHook:"Hombre — the man!" },
  { es:"Mujer",   en:"Woman",      emoji:"👩", speakHook:"Mujer — the woman!" },
  { es:"Niño",    en:"Boy",        emoji:"👦", speakHook:"Niño — a child!" },
  { es:"Parte",   en:"Part",       emoji:"🧩", speakHook:"Parte — a part!" },
  { es:"Lado",    en:"Side",       emoji:"↔️", speakHook:"Lado — on this side!" },
  { es:"Lugar",   en:"Place",      emoji:"🗺️", speakHook:"Lugar — what a place!" },
  { es:"Cosa",    en:"Thing",      emoji:"📦", speakHook:"Cosa — that cosa!" },
];
const LAND19_CONTENT = {
  story:["Final checkpoint before advanced.","Gente, hombre, mujer, niño — everyday people words.","Bueno and malo — the two most opinionated words.","Cosa — the greatest fallback word. Forget what something is? Say la cosa.","Past this you're a Spanish-speaker. Congrats in advance."],
  limerick:"A traveler said cosa one day,\nFor every word she forgot on the way,\nLa cosa for table,\nLa cosa for label,\nNow her vocab is cosa. Okay.",
  joke:"A kid learns bueno means good. Teacher asks how her test went. Bueno! Did she study? Bueno! Actual score? Long pause. Más o menos bueno.",
};
const LAND20_WORDS = [
  { es:"Creo",            en:"I believe",       emoji:"🤔", speakHook:"Creo — I believe!" },
  { es:"Pienso",          en:"I think",         emoji:"💭", speakHook:"Pienso — pensive!" },
  { es:"Me gusta",        en:"I like it",       emoji:"👍", speakHook:"I dig it!" },
  { es:"No me gusta",     en:"I don't like it", emoji:"👎", speakHook:"Flip the gusto!" },
  { es:"Prefiero",        en:"I prefer",        emoji:"⭐", speakHook:"Prefiero — prefer!" },
  { es:"Opino",           en:"In my view",      emoji:"💬", speakHook:"Opino — opinion!" },
  { es:"De acuerdo",      en:"Agreed",          emoji:"🤝", speakHook:"Accordingly!" },
  { es:"En mi opinión",   en:"In my opinion",   emoji:"🎤", speakHook:"Make it official!" },
  { es:"Claro",           en:"Of course",       emoji:"✅", speakHook:"Clearly!" },
  { es:"Exacto",          en:"Exactly",         emoji:"🎯", speakHook:"Exact-o!" },
  { es:"Depende",         en:"It depends",      emoji:"⚖️", speakHook:"Depende!" },
  { es:"Tal vez",         en:"Maybe",           emoji:"🤷", speakHook:"Tal vez — maybe such time!" },
];
const LAND20_CONTENT = {
  story:["Welcome to advanced. Now you talk about how you FEEL about things.","Spanish-speakers love a good debate. Loud, fast, everyone interrupting.","Without opinion words you're stuck nodding like furniture.","Claro and exacto are the two most useful agreement words. Sprinkle them.","Tal vez is the universal escape hatch."],
  limerick:"A traveler said claro one day,\nTo everything spoken her way,\nClaro, claro, claro!\nThey thought she was cleared-o,\nNow she owes her opinion. Hooray.",
  joke:"A kid learns me gusta means I like it. Mom asks what for dinner. Me gusta el pollo! Mom serves chicken. Kid pushes plate. Mom narrows eyes. Kid says — me gusta el pollo… en general.",
};
const LAND21_WORDS = [
  { es:"El avión",       en:"Airplane",      emoji:"✈️", speakHook:"Aviation in the air!" },
  { es:"El aeropuerto",  en:"Airport",       emoji:"🛫", speakHook:"Port for planes!" },
  { es:"El pasaporte",   en:"Passport",      emoji:"📔", speakHook:"Pass-a-port, don't lose it!" },
  { es:"La maleta",      en:"Suitcase",      emoji:"🧳", speakHook:"Heavy maleta!" },
  { es:"El boleto",      en:"Ticket",        emoji:"🎫", speakHook:"The magic boleto!" },
  { es:"El hotel",       en:"Hotel",         emoji:"🏨", speakHook:"Same word, easy!" },
  { es:"La habitación",  en:"Room",          emoji:"🛏️", speakHook:"Where you stay!" },
  { es:"La reserva",     en:"Reservation",   emoji:"📅", speakHook:"Like reserve!" },
  { es:"El taxi",        en:"Taxi",          emoji:"🚕", speakHook:"Same everywhere!" },
  { es:"La frontera",    en:"Border",        emoji:"🛂", speakHook:"Like frontier!" },
  { es:"Llegar",         en:"To arrive",     emoji:"📍", speakHook:"Llegar — to arrive!" },
  { es:"Salir",          en:"To leave",      emoji:"🚪", speakHook:"Salir — to leave!" },
];
const LAND21_CONTENT = {
  story:["Travel Spanish is its own language.","Don't know pasaporte and you hand your library card to border patrol.","Don't know reserva and you arrive at a hotel without one.","Aeropuerto, maleta, boleto — survival words.","By the end you can travel anywhere without panic-pointing. Cuy still optional."],
  limerick:"A traveler arrived without reservation one night,\nThe clerk said lo siento, your room is now light,\nThe traveler said claro,\nI'll sleep in the carro,\nThe clerk gave her a room. Out of fright.",
  joke:"A kid learns maleta means suitcase. She packs it full of snacks. Mom asks where are your clothes? Kid says la cuenta says snacks first. Mom translates 'la cuenta' as 'the bill'. Kid says exactly.",
};
const LAND22_WORDS = [
  { es:"El doctor",    en:"Doctor",        emoji:"🩺", speakHook:"Same as English!" },
  { es:"El hospital",  en:"Hospital",      emoji:"🏥", speakHook:"Same word!" },
  { es:"La medicina",  en:"Medicine",      emoji:"💊", speakHook:"Sounds like medicine!" },
  { es:"La receta",    en:"Prescription",  emoji:"📝", speakHook:"Doctor's recipe!" },
  { es:"La fiebre",    en:"Fever",         emoji:"🌡️", speakHook:"Feverish!" },
  { es:"El dolor",     en:"Pain",          emoji:"😣", speakHook:"Dolores knows pain!" },
  { es:"Sano",         en:"Healthy",       emoji:"💪", speakHook:"Same as sane!" },
  { es:"Enfermo",      en:"Sick",          emoji:"🤒", speakHook:"Like infirm!" },
  { es:"La cita",      en:"Appointment",   emoji:"📅", speakHook:"Your meeting!" },
  { es:"La farmacia",  en:"Pharmacy",      emoji:"💊", speakHook:"Pharmacy!" },
  { es:"La pastilla",  en:"Pill",          emoji:"💊", speakHook:"Tiny pill!" },
  { es:"Me duele",     en:"It hurts me",   emoji:"😖", speakHook:"It hurts me!" },
];
const LAND22_CONTENT = {
  story:["Health Spanish is critical and hopefully rarely needed.","When you need it, you really need it.","Me duele plus body part — me duele la cabeza — is the most useful pattern.","Farmacia in Ecuador is your friend.","By the end you can survive minor medical situations. Major ones need a doctor and a translator."],
  limerick:"A traveler said me duele one day,\nFor everything on the way,\nMe duele la pierna,\nMe duele la cabeza,\nMe duele tomorrow. The doctor said pay.",
  joke:"A kid learns me duele means it hurts. Mom asks her to do chores. Me duele la pierna! Walk to sink anyway. Me duele el brazo! Mom hands a dishtowel. Me duele EVERYTHING. Mom says ten minutes to feel better. Kid is cured.",
};
const LAND23_WORDS = [
  { es:"La fiesta",     en:"Party",        emoji:"🎉", speakHook:"Same in English!" },
  { es:"Los amigos",    en:"Friends",      emoji:"👫", speakHook:"Same word!" },
  { es:"Bailar",        en:"To dance",     emoji:"💃", speakHook:"Bye-LAR — bailar!" },
  { es:"Cantar",        en:"To sing",      emoji:"🎤", speakHook:"Like chant!" },
  { es:"La música",     en:"Music",        emoji:"🎶", speakHook:"Same word!" },
  { es:"El cumpleaños", en:"Birthday",     emoji:"🎂", speakHook:"Completing years!" },
  { es:"El regalo",     en:"Gift",         emoji:"🎁", speakHook:"Royal gift!" },
  { es:"Brindar",       en:"To toast",     emoji:"🥂", speakHook:"Raise the glass!" },
  { es:"Divertido",     en:"Fun",          emoji:"😄", speakHook:"Diverting fun!" },
  { es:"Juntos",        en:"Together",     emoji:"🤝", speakHook:"Joined together!" },
  { es:"Conocer",       en:"To meet/know", emoji:"🤝", speakHook:"To know a person!" },
  { es:"Celebrar",      en:"To celebrate", emoji:"🥳", speakHook:"Same root!" },
];
const LAND23_CONTENT = {
  story:["Social Spanish is the most fun to learn because using it means socializing.","Ecuadorian fiestas are next-level. Food fantastic, music loud, bailar until dawn.","Can't say los amigos or feliz cumpleaños and you'll have a quiet time.","Cumpleaños deserves special attention. It's the law.","The cuy may or may not be served. We're still not telling. Tal vez."],
  limerick:"A guest at a fiesta one night,\nSaid bailar with all of her might,\nShe danced till the dawn,\nThen kept dancing on,\nHer abuela said mija, sleep tight.",
  joke:"A kid learns regalo means gift. She tells brother — soy un regalo. He says you are NOT. She says soy un regalo a mama. Mom hears and hands them BOTH a regalo.",
};
const LAND24_WORDS = [
  { es:"El teléfono",    en:"Phone",        emoji:"📱", speakHook:"Same word!" },
  { es:"La computadora", en:"Computer",     emoji:"💻", speakHook:"Same word again!" },
  { es:"El internet",    en:"Internet",     emoji:"🌐", speakHook:"Universal!" },
  { es:"El wifi",        en:"WiFi",         emoji:"📶", speakHook:"WEE-fee!" },
  { es:"La pantalla",    en:"Screen",       emoji:"🖥️", speakHook:"The screen!" },
  { es:"La contraseña",  en:"Password",     emoji:"🔒", speakHook:"Contra-secret!" },
  { es:"El correo",      en:"Email",        emoji:"📧", speakHook:"Like courier!" },
  { es:"La foto",        en:"Photo",        emoji:"📷", speakHook:"Same!" },
  { es:"El video",       en:"Video",        emoji:"🎥", speakHook:"Same!" },
  { es:"Descargar",      en:"To download",  emoji:"⬇️", speakHook:"Discharge!" },
  { es:"Conectar",       en:"To connect",   emoji:"🔌", speakHook:"Connect!" },
  { es:"El cargador",    en:"Charger",      emoji:"🔋", speakHook:"Charges the phone!" },
];
const LAND24_CONTENT = {
  story:["Tech Spanish is mostly easy — most words are from English.","Internet is internet. Wifi is wifi — say WEE-fee not WHY-fie.","Tricky ones: contraseña for password, pantalla for screen, cargador for charger.","Cuenca has cafés with WiFi gratis on every corner.","By the end you ask for the contraseña without charades. The barista thanks you."],
  limerick:"A traveler walked into a café,\nAnd asked for the wifi to play,\nThe barista said claro,\nLa contraseña… mira,\nIt's written on the wall. Look away.",
  joke:"A kid asks parents for wifi contraseña. They give it. Doesn't work. La contraseña no funciona. Mom says oh, we changed it. Kid stares. Mom says — we needed peace.",
};
const LAND25_WORDS = [
  { es:"La vida",     en:"Life",       emoji:"🌱", speakHook:"La vida es bella!" },
  { es:"El amor",     en:"Love",       emoji:"❤️", speakHook:"Universal, amor!" },
  { es:"El mundo",    en:"World",      emoji:"🌍", speakHook:"The whole mundo!" },
  { es:"El tiempo",   en:"Time",       emoji:"⏳", speakHook:"Time, the tiempo!" },
  { es:"El trabajo",  en:"Work/Job",   emoji:"💼", speakHook:"The trabajo!" },
  { es:"La casa",     en:"Home",       emoji:"🏠", speakHook:"Home sweet casa!" },
  { es:"El camino",   en:"Path/Road",  emoji:"🛤️", speakHook:"Buen camino!" },
  { es:"La verdad",   en:"Truth",      emoji:"✅", speakHook:"The verdad!" },
  { es:"Caminar",     en:"To walk",    emoji:"🚶", speakHook:"Walk the camino!" },
  { es:"Volver",      en:"To return",  emoji:"↩️", speakHook:"To return!" },
  { es:"Aprender",    en:"To learn",   emoji:"📚", speakHook:"To apprehend!" },
  { es:"Vivir",       en:"To live",    emoji:"✨", speakHook:"To live, vivir!" },
];
const LAND25_CONTENT = {
  story:["This is it. La Gran Final. The last land.","Look how far you've come. Twenty-four lands ago you said Hola for the first time.","Now you converse, order food, give opinions, describe pain, dance at fiestas.","This land is about the big words. La vida, el amor, el mundo.","One more boss. Then the celebration is yours forever. ¡Vámonos!"],
  limerick:"A learner began with just Hola,\nAnd marched through the lands solo-la,\nThrough numbers and colors,\nThrough abuelas and brothers,\nNow speaks Spanish like a Cuencana. ¡Olé!",
  joke:"A graduating student stands before her teacher. She has finished every land. What have you learned? She thinks. She says todo. And nada. Y mucho mucho. The teacher hands her a diploma. And a guinea pig.",
};

// Collect all word arrays for Study Hall access
const ALL_LAND_WORDS = {
  1:LAND1_WORDS, 2:LAND2_WORDS, 3:LAND3_WORDS, 4:LAND4_WORDS, 5:LAND5_WORDS,
  6:LAND6_WORDS, 7:LAND7_WORDS, 8:LAND8_WORDS, 9:LAND9_WORDS, 10:LAND10_WORDS,
  11:LAND11_WORDS, 12:LAND12_WORDS, 13:LAND13_WORDS, 14:LAND14_WORDS, 15:LAND15_WORDS,
  16:LAND16_WORDS, 17:LAND17_WORDS, 18:LAND18_WORDS, 19:LAND19_WORDS, 20:LAND20_WORDS,
  21:LAND21_WORDS, 22:LAND22_WORDS, 23:LAND23_WORDS, 24:LAND24_WORDS, 25:LAND25_WORDS,
};

// ============================================================
// LandScreen Template + QuizGame + Extra Game Components
// ============================================================
function LandScreen({ landNum, words, color, landName, nextLand, story, limerick, joke, onBack, onComplete, games, isReplay, profile }) {
  const G1 = (games && games[0]) || MatchingGame;
  const G2 = (games && games[1]) || QuizGame;
  const G3 = (games && games[2]) || FallingWordsGame;
  const [phase, setPhase] = useState("story");
  const [storyIdx, setStoryIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const storySlides = story.map(t=>({text:t}));
  useEffect(()=>{
    if(phase==="story"){ const slide=storySlides[storyIdx]; if(slide) setTimeout(()=>speakEn(slide.text),400); }
    // eslint-disable-next-line
  },[storyIdx, phase]);
  useEffect(()=>{
    if(["lesson1","lesson2","lesson3"].includes(phase)){
      const start = phase==="lesson1"?0:phase==="lesson2"?4:8;
      const word = words[start+wordIdx];
      if(word){ setTimeout(()=>speakEs(word.es),300); setTimeout(()=>speakEn(word.en),1400); setTimeout(()=>speakEn(word.speakHook||word.en),2800); }
    }
    // eslint-disable-next-line
  },[phase, wordIdx]);
  if(phase==="story"){
    const slide = storySlides[storyIdx];
    return (
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${color}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
        {FONT_LINK}
        <div style={{background:color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
          <div style={{fontSize:18,color:"white",...DS}}>Land {landNum} — {landName}</div>
        </div>
        <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-end"}}>
            <img src="/characters/grayson.png" style={{height:110}} alt="" onError={e=>e.target.style.display="none"}/>
            <img src="/characters/peyton.png" style={{height:90}} alt="" onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{background:"white",borderRadius:20,padding:"20px",width:"100%",maxWidth:400,boxShadow:`0 4px 20px ${color}20`,marginBottom:16,border:`2px solid ${color}20`}}>
            <div style={{fontSize:12,color,fontWeight:800,marginBottom:8,...DS}}>THE STORY</div>
            <div style={{fontSize:15,color:"#1C1917",lineHeight:1.7,...DS}}>{slide?.text}</div>
            <button onClick={()=>speakEn(slide?.text||"")} style={{marginTop:10,background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"6px 12px",cursor:"pointer",fontSize:12,color,fontWeight:700,...DS}}>🔊 Hear this</button>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>{storySlides.map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<=storyIdx?color:"#E5E7EB"}}/>)}</div>
          {storyIdx<storySlides.length-1 ?
            <button onClick={()=>setStoryIdx(i=>i+1)} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:color,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Next ›</button> :
            <button onClick={()=>{setPhase("lesson1");setWordIdx(0);}} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:`linear-gradient(135deg,${color},#F97316)`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Start Learning!</button>
          }
        </div>
      </div>
    );
  }
  const lessonNum = phase==="lesson1"?1:phase==="lesson2"?2:3;
  const lessonStart = lessonNum===1?0:lessonNum===2?4:8;
  const lessonWords = words.slice(lessonStart, lessonStart+4);
  const nextPhase = phase==="lesson1"?"game1":phase==="lesson2"?"game2":"game3";
  if(["lesson1","lesson2","lesson3"].includes(phase)){
    const word = lessonWords[wordIdx];
    return (
      <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${color}15,#FDF6EC)`,display:"flex",flexDirection:"column"}}>
        {FONT_LINK}
        <div style={{background:color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",cursor:"pointer",fontSize:18}}>←</button>
          <div style={{flex:1,fontSize:16,color:"white",...DS}}>Lesson {lessonNum} of 3</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>{wordIdx+1}/4</div>
        </div>
        <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{background:"white",borderRadius:24,padding:"28px 20px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 8px 32px ${color}25`,border:`3px solid ${color}`,marginBottom:16}}>
            <div style={{fontSize:52,marginBottom:8}}>{word.emoji}</div>
            <div style={{fontSize:38,color,...DS,fontWeight:900,marginBottom:4}}>{word.es}</div>
            <div style={{fontSize:22,color:"#6B7280",marginBottom:16,...DS}}>{word.en}</div>
            <div style={{background:`${color}10`,borderRadius:14,padding:"12px 16px",fontSize:14,color:"#1C1917",lineHeight:1.6,textAlign:"left",marginBottom:12,...DS}}><span style={{color,fontWeight:800}}>Memory Hook: </span>{word.hook||word.speakHook}</div>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              <button onClick={()=>speakEs(word.es)} style={{background:`${color}15`,border:`1.5px solid ${color}40`,borderRadius:12,padding:"8px 16px",cursor:"pointer",fontSize:14,color,fontWeight:700,...DS}}>🔊 {word.es}</button>
              <button onClick={()=>speakEn(word.en)} style={{background:"#F3F4F6",border:"1.5px solid #E5E7EB",borderRadius:12,padding:"8px 16px",cursor:"pointer",fontSize:14,color:"#6B7280",fontWeight:700,...DS}}>🔊 {word.en}</button>
            </div>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>{lessonWords.map((_,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:i<=wordIdx?color:"#E5E7EB"}}/>)}</div>
          {wordIdx<3 ?
            <button onClick={()=>setWordIdx(i=>i+1)} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:color,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Next Word ›</button> :
            <button onClick={()=>{setPhase(nextPhase);setWordIdx(0);}} style={{width:"100%",maxWidth:400,padding:16,borderRadius:18,background:`linear-gradient(135deg,${color},#F97316)`,border:"none",color:"white",fontSize:17,cursor:"pointer",...DS}}>Play Game! 🎮</button>
          }
        </div>
      </div>
    );
  }
  if(phase==="game1")    return <G1 words={words.slice(0,4)}  allWords={words} color={color} title={`${landName} — Round 1!`} onComplete={()=>setPhase("limerick")} emoji="🗺️" isReplay={isReplay} landId={landNum}/>;
  if(phase==="limerick") return <RewardScreen kind="limerick" text={limerick} color={color} landName={landName} onContinue={()=>{setPhase("lesson2");setWordIdx(0);}}/>;
  if(phase==="game2")    return <G2 words={words.slice(4,8)}  allWords={words} color={color} title={`${landName} — Round 2!`} onComplete={()=>setPhase("joke")} emoji="🎯" isReplay={isReplay} landId={landNum}/>;
  if(phase==="joke")     return <RewardScreen kind="joke" text={joke} color={color} landName={landName} onContinue={()=>{setPhase("lesson3");setWordIdx(0);}}/>;
  if(phase==="game3")    return <G3 words={words.slice(8,12)} allWords={words} color={color} title={`${landName} — Round 3!`} onComplete={()=>setPhase("boss")} emoji="⬇️" isReplay={isReplay} landId={landNum}/>;
  if(phase==="boss")     return <BossChallenge words={words} color={color} landName={landName} nextLand={nextLand} onComplete={onComplete} isReplay={isReplay} landId={landNum} profile={profile}/>;
  return null;
}

function QuizGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const word = words[idx];
  const options = useMemo(()=>makeOptions(word, pool, 4),[idx]);
  useEffect(()=>{ speakEs(word.es); /* eslint-disable-next-line */ },[idx]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt);
    if(opt===word.en){ setScore(s=>s+1); speakEs(word.es); }
    setTimeout(()=>{
      if(idx<words.length-1){ setIdx(i=>i+1); setSelected(null); }
      else onComplete();
    }, 1300);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>{emoji} {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Score: {score}/{words.length}</div>
      </div>
      <div style={{flex:1,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{background:"white",borderRadius:24,padding:"28px 20px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 8px 32px ${color}25`,border:`3px solid ${color}`,marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:8}}>{word.emoji}</div>
          <div style={{fontSize:34,color,...DS,fontWeight:900}}>{word.es}</div>
          <button onClick={()=>speakEs(word.es)} style={{marginTop:8,background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"6px 14px",cursor:"pointer",fontSize:13,color,fontWeight:700,...DS}}>🔊 Hear it</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:400}}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>pick(opt)} style={{padding:"16px",borderRadius:16,border:`2px solid ${!selected?color:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:16,...DS,fontWeight:700,color:"#1C1917"}}>{!selected?"🎯 ":opt===word.en?"✅ ":opt===selected?"❌ ":""}{opt}</button>
          ))}
        </div>
      </div>
    </CuencaBg>
  );
}

function WheelOfFortuneGame({ words, color, title, onComplete, emoji, isReplay, landId }) {
  const [idx, setIdx] = useState(0);
  const word = words[idx];
  const target = (word.es||"").toUpperCase();
  const norm = (c)=>c.replace(/[ÁÄÂ]/g,"A").replace(/[ÉÊË]/g,"E").replace(/[ÍÏÎ]/g,"I").replace(/[ÓÖÔ]/g,"O").replace(/[ÚÜÛ]/g,"U");
  const isLetter = (c)=>/[A-ZÑ]/.test(norm(c));
  const [revealed, setRevealed] = useState(()=>new Set());
  const [wrong, setWrong] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(()=>{ speakEn(word.en); /* eslint-disable-next-line */ },[idx]);
  const remaining = [...target].filter(c=>isLetter(c)&&!revealed.has(norm(c)));
  useEffect(()=>{
    if(!done && remaining.length===0){
      setDone(true); setScore(s=>s+1); speakEs(word.es);
      setTimeout(()=>{
        if(idx<words.length-1){ setIdx(i=>i+1); setRevealed(new Set()); setWrong(0); setDone(false); }
        else onComplete();
      },1600);
    }
  });
  const guess = (letter)=>{
    if(done||revealed.has(letter)) return;
    if([...target].some(c=>norm(c)===letter)) setRevealed(prev=>new Set([...prev,letter]));
    else { setWrong(w=>w+1); setRevealed(prev=>new Set([...prev,letter])); }
  };
  return(
    <CuencaBg color={color}>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      {FONT_LINK}
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>{emoji} {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>🎡 Guess the letters! Word {idx+1}/{words.length} · Score {score}</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",borderRadius:18,padding:"16px",width:"100%",maxWidth:420,boxShadow:`0 4px 20px ${color}20`,border:`2px solid ${color}30`,marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:13,color,fontWeight:800,letterSpacing:2,marginBottom:4}}>MEANS:</div>
          <div style={{fontSize:22,color:"#1C1917",...DS,marginBottom:6}}>{word.emoji} {word.en}</div>
          <button onClick={()=>speakEn(word.en)} style={{background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"4px 12px",cursor:"pointer",fontSize:12,color,fontWeight:700,...DS}}>🔊 Hear it</button>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:16,minHeight:60}}>
          {[...target].map((c,i)=>{
            const show = !isLetter(c)||revealed.has(norm(c))||done;
            return(<div key={i} style={{width:32,height:42,background:show?color:"white",border:`2px solid ${color}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,...DS,fontWeight:900,color:show?"white":"transparent"}}>{isLetter(c)?c:" "}</div>);
          })}
        </div>
        <div style={{fontSize:13,color:wrong>5?"#EF4444":"#6B7280",marginBottom:10,fontWeight:700,...DS}}>Wrong guesses: {wrong} {wrong>4?"😅":""}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(9, 1fr)",gap:4,width:"100%",maxWidth:420}}>
          {"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("").map(L=>{
            const used = revealed.has(L);
            const correct = used && [...target].some(c=>norm(c)===L);
            return(<button key={L} onClick={()=>guess(L)} disabled={used||done} style={{padding:"8px 0",borderRadius:8,fontSize:14,...DS,fontWeight:800,cursor:used?"default":"pointer",border:`2px solid ${used?(correct?"#10B981":"#EF4444"):color+"40"}`,background:used?(correct?"#D1FAE5":"#FEE2E2"):"white",color:used?(correct?"#065F46":"#991B1B"):"#1C1917",opacity:done&&!used?0.4:1}}>{L}</button>);
          })}
        </div>
      </div>
    </CuencaBg>
  );
}

function DealOrNoDealGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [opened, setOpened] = useState({});
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const word = words[idx];
  const briefcases = useMemo(()=>{
    const correct = word.en;
    const wrongs = pool.filter(w=>w.en!==correct).sort(()=>Math.random()-0.5).slice(0,5).map(w=>w.en);
    while(wrongs.length<5) wrongs.push("???");
    const all = [correct, ...wrongs].sort(()=>Math.random()-0.5);
    return all.map((en,i)=>({en, isCorrect:en===correct, num:i+1}));
  // eslint-disable-next-line
  },[idx]);
  useEffect(()=>{ speakEs(word.es); /* eslint-disable-next-line */ },[idx]);
  const tap = (b)=>{
    if(picked||opened[b.num]) return;
    if(b.isCorrect){
      setPicked(b.num); setScore(s=>s+1); speakEs(word.es);
      setOpened(prev=>({...prev,[b.num]:b.en}));
      setTimeout(()=>{
        if(idx<words.length-1){ setIdx(i=>i+1); setOpened({}); setPicked(null); }
        else onComplete();
      },1400);
    } else setOpened(prev=>({...prev,[b.num]:b.en}));
  };
  return(
    <CuencaBg color={color}>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      {FONT_LINK}
      <style>{`@keyframes shakeOpen{0%,100%{transform:scale(1)}50%{transform:scale(1.05) rotate(2deg)}}`}</style>
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>{emoji} {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>💼 Pick the right meaning! Score {score}/{words.length}</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",borderRadius:18,padding:"18px",width:"100%",maxWidth:420,boxShadow:`0 4px 20px ${color}20`,border:`2px solid ${color}40`,marginBottom:18,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:4}}>{word.emoji}</div>
          <div style={{fontSize:30,color,...DS,fontWeight:900,marginBottom:4}}>{word.es}</div>
          <button onClick={()=>speakEs(word.es)} style={{background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"4px 12px",cursor:"pointer",fontSize:12,color,fontWeight:700,...DS}}>🔊 Hear it</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10,width:"100%",maxWidth:420}}>
          {briefcases.map(b=>{
            const isOpened = opened[b.num]!==undefined;
            const isWinner = picked===b.num;
            return(<button key={b.num} onClick={()=>tap(b)} disabled={isOpened||picked!=null} style={{aspectRatio:"1/1",borderRadius:14,border:`3px solid ${isWinner?"#10B981":isOpened?"#9CA3AF":color}`,background:isWinner?"linear-gradient(135deg,#10B981,#34D399)":isOpened?"#F3F4F6":`linear-gradient(135deg,${color},${color}CC)`,cursor:isOpened?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",...DS,fontWeight:900,color:"white",padding:6,animation:isWinner?"shakeOpen 0.4s ease":"none",opacity:isOpened&&!isWinner?0.55:1}}>
              <div style={{fontSize:32}}>{isOpened?(isWinner?"🏆":"❌"):"💼"}</div>
              <div style={{fontSize:13,marginTop:4,color:isOpened?(isWinner?"white":"#374151"):"white"}}>{isOpened?b.en:`#${b.num}`}</div>
            </button>);
          })}
        </div>
      </div>
    </CuencaBg>
  );
}

function LightningRoundGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(5);
  const word = words[idx];
  const opts = useMemo(()=>{
    const correct = word.en;
    const wrongs = pool.filter(w=>w.en!==correct).sort(()=>Math.random()-0.5).slice(0,3).map(w=>w.en);
    return [correct,...wrongs].sort(()=>Math.random()-0.5);
  // eslint-disable-next-line
  },[idx]);
  useEffect(()=>{ speakEs(word.es); setTime(5); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    if(selected) return;
    if(time<=0){ pick(null); return; }
    const t = setTimeout(()=>setTime(x=>x-0.1), 100);
    return ()=>clearTimeout(t);
    // eslint-disable-next-line
  },[time, selected]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt||"timeout");
    if(opt===word.en){ setScore(s=>s+1); speakEs(word.es); }
    setTimeout(()=>{
      if(idx<words.length-1){ setIdx(i=>i+1); setSelected(null); }
      else onComplete();
    },900);
  };
  return(
    <CuencaBg color={color}>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      {FONT_LINK}
      <style>{`@keyframes flash{0%,100%{background:white}50%{background:#FEE2E2}}`}</style>
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>⚡ {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Score {score} · Round {idx+1}/{words.length}</div>
      </div>
      <div style={{height:8,background:"rgba(0,0,0,0.06)"}}>
        <div style={{height:"100%",width:`${(time/5)*100}%`,background:time<2?"#EF4444":time<3?"#F59E0B":color,transition:"width 0.1s linear,background 0.3s"}}/>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{background:"white",borderRadius:18,padding:"20px",width:"100%",maxWidth:420,boxShadow:`0 4px 20px ${color}20`,border:`2px solid ${color}40`,marginBottom:18,textAlign:"center",animation:time<2&&!selected?"flash 0.4s ease infinite":"none"}}>
          <div style={{fontSize:44,marginBottom:4}}>{word.emoji}</div>
          <div style={{fontSize:32,color,...DS,fontWeight:900}}>{word.es}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%",maxWidth:420}}>
          {opts.map(o=>(<button key={o} onClick={()=>pick(o)} style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${!selected?color:o===word.en?"#10B981":o===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":o===word.en?"#D1FAE5":o===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:14,...DS,fontWeight:700,color:"#1C1917"}}>{o}</button>))}
        </div>
      </div>
    </CuencaBg>
  );
}

function MemoryFlipGame({ words, color, title, onComplete, emoji, isReplay, landId }) {
  const pairs = words.slice(0,4);
  const [deck] = useState(()=>{
    const d = [];
    pairs.forEach((w,i)=>{
      d.push({id:`${i}-es`, key:i, text:w.es, side:"es", emoji:w.emoji});
      d.push({id:`${i}-en`, key:i, text:w.en, side:"en"});
    });
    return d.sort(()=>Math.random()-0.5);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [tries, setTries] = useState(0);
  useEffect(()=>{ if(matched.size===pairs.length) setTimeout(onComplete,800); /* eslint-disable-next-line */ },[matched]);
  useEffect(()=>{
    if(flipped.length===2){
      const [a,b] = flipped;
      if(a.key===b.key && a.side!==b.side){
        const word = pairs[a.key]; speakEs(word.es);
        setTimeout(()=>{ setMatched(prev=>new Set([...prev,a.key])); setFlipped([]); },600);
      } else setTimeout(()=>setFlipped([]),900);
      setTries(t=>t+1);
    }
    // eslint-disable-next-line
  },[flipped]);
  const flip = (c)=>{
    if(matched.has(c.key)||flipped.length>=2||flipped.some(f=>f.id===c.id)) return;
    setFlipped(prev=>[...prev,c]);
  };
  return(
    <CuencaBg color={color}>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      {FONT_LINK}
      <style>{`@keyframes flip{from{transform:rotateY(180deg)}to{transform:rotateY(0)}}`}</style>
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>🃏 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Pairs found: {matched.size}/{pairs.length} · Tries: {tries}</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:8,width:"100%",maxWidth:420}}>
          {deck.map(c=>{
            const shown = flipped.some(f=>f.id===c.id)||matched.has(c.key);
            return(<button key={c.id} onClick={()=>flip(c)} style={{aspectRatio:"3/4",borderRadius:12,border:`2.5px solid ${shown?(matched.has(c.key)?"#10B981":color):color+"40"}`,background:shown?(matched.has(c.key)?"#D1FAE5":"white"):`linear-gradient(135deg,${color},${color}CC)`,cursor:matched.has(c.key)?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",...DS,fontWeight:800,padding:6,animation:shown?"flip 0.35s ease":"none"}}>
              {shown ? <>{c.emoji&&c.side==="es"&&<div style={{fontSize:22,marginBottom:2}}>{c.emoji}</div>}<div style={{fontSize:c.text.length>10?11:13,color:c.side==="es"?color:"#1C1917",textAlign:"center",lineHeight:1.15}}>{c.text}</div></> : <div style={{fontSize:28,color:"white"}}>?</div>}
            </button>);
          })}
        </div>
      </div>
    </CuencaBg>
  );
}

// ============================================================
// Land 2-25 Screen Functions
// ============================================================

// ============================================================
// NEW GAMES: TreasureMap / EscapeRoom / ChaseGame / MarketRush / RestaurantRush / MadLibs
// All accept: { words, allWords, color, title, onComplete, emoji, isReplay, landId }
// ============================================================

function TreasureMapGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  // Player must tap clue markers in Spanish to match English prompts. 4 stops along path.
  const stops = useMemo(()=>{
    const picked = [...words].sort(()=>Math.random()-0.5).slice(0,4);
    return picked.map((w,i)=>{
      const others = (allWords||words).filter(x=>x.es!==w.es).sort(()=>Math.random()-0.5).slice(0,3);
      const markers = [w, ...others].sort(()=>Math.random()-0.5);
      return { target:w, markers, x: 50 + i*20 + (Math.random()-0.5)*10, y: 80 - i*22 + (Math.random()-0.5)*8 };
    });
  // eslint-disable-next-line
  },[]);
  const [stage, setStage] = useState(0);
  const [wrong, setWrong] = useState(null);
  const [path, setPath] = useState([{x:10,y:88}]);
  const cur = stops[stage];
  useEffect(()=>{ if(cur) speakEn(cur.target.en); /* eslint-disable-next-line */ },[stage]);
  const tap = (m) => {
    if(m.es===cur.target.es){
      speakEs(cur.target.es);
      setPath(p=>[...p,{x:cur.x,y:cur.y}]);
      setTimeout(()=>{
        if(stage<stops.length-1) setStage(s=>s+1);
        else onComplete();
      }, 700);
    } else {
      setWrong(m.es);
      setTimeout(()=>setWrong(null), 600);
    }
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>🗺️ {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Stop {stage+1} of {stops.length}</div>
      </div>
      <div style={{padding:"12px 16px",position:"relative",zIndex:2}}>
        <div style={{background:"white",borderRadius:14,padding:"10px 14px",border:`2px solid ${color}40`,textAlign:"center"}}>
          <div style={{fontSize:11,color,fontWeight:800,letterSpacing:1.5}}>FIND THE WORD FOR:</div>
          <div style={{fontSize:22,color:"#1C1917",...DS,fontWeight:900}}>{cur?.target.emoji} {cur?.target.en}</div>
        </div>
      </div>
      <div style={{flex:1,position:"relative",margin:"8px 16px",borderRadius:18,overflow:"hidden",background:"linear-gradient(160deg,#FCE7C0,#F5D58E)",border:`2px dashed ${color}80`,minHeight:340}}>
        {/* Cuenca map placeholder — rivers, plazas */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
          <path d="M 0,70 Q 30,60 50,68 T 100,72" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.5"/>
          <circle cx="20" cy="25" r="4" fill={color} opacity="0.4"/>
          <circle cx="78" cy="35" r="3" fill={color} opacity="0.4"/>
          <rect x="40" y="40" width="6" height="6" fill={color} opacity="0.4"/>
          {/* Path so far */}
          <polyline points={path.map(p=>`${p.x},${p.y}`).join(" ")} stroke={color} strokeWidth="1.2" strokeDasharray="2,1.5" fill="none"/>
        </svg>
        {/* Markers */}
        {cur?.markers.map((m,i)=>{
          const ang = (i/cur.markers.length) * Math.PI*2;
          const mx = cur.x + Math.cos(ang)*18;
          const my = cur.y + Math.sin(ang)*16;
          return (
            <button key={m.es+i} onClick={()=>tap(m)} style={{position:"absolute",left:`${mx}%`,top:`${my}%`,transform:"translate(-50%,-50%)",background:wrong===m.es?"#EF4444":"white",border:`3px solid ${wrong===m.es?"#EF4444":color}`,borderRadius:14,padding:"6px 10px",cursor:"pointer",fontSize:13,...DS,fontWeight:800,color:wrong===m.es?"white":"#1C1917",boxShadow:`0 4px 10px ${color}40`,whiteSpace:"nowrap"}}>📍 {m.es}</button>
          );
        })}
        <div style={{position:"absolute",left:"6%",top:"82%",fontSize:24}}>🏃</div>
        <div style={{position:"absolute",left:"86%",top:"6%",fontSize:24}}>🏆</div>
      </div>
    </CuencaBg>
  );
}

function EscapeRoomGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const puzzles = useMemo(()=>[...words].sort(()=>Math.random()-0.5).slice(0,4), []); // eslint-disable-line
  const [unlocked, setUnlocked] = useState(0);
  const [selected, setSelected] = useState(null);
  const cur = puzzles[unlocked];
  const options = useMemo(()=>cur?makeOptions(cur,pool,4):[], [unlocked]);
  useEffect(()=>{ if(cur) speakEs(cur.es); /* eslint-disable-next-line */ },[unlocked]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt);
    if(opt===cur.en){ speakEs(cur.es); }
    setTimeout(()=>{
      if(opt===cur.en){
        if(unlocked+1>=puzzles.length){ setTimeout(onComplete, 800); setUnlocked(u=>u+1); }
        else { setUnlocked(u=>u+1); setSelected(null); }
      } else { setSelected(null); }
    }, 1200);
  };
  const allOpen = unlocked >= puzzles.length;
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes lockShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>🔓 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Locks opened: {unlocked}/{puzzles.length}</div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:14,padding:"14px"}}>
        {puzzles.map((_,i)=>(
          <div key={i} style={{fontSize:36,filter:i<unlocked?"none":"grayscale(1) brightness(0.7)",animation:i===unlocked&&!allOpen?"lockShake 1.2s ease-in-out infinite":"none"}}>{i<unlocked?"🔓":"🔒"}</div>
        ))}
      </div>
      {allOpen ? (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",position:"relative",zIndex:1}}>
          <div style={{fontSize:120,marginBottom:10}}>🚪</div>
          <div style={{fontSize:22,color,...DS,fontWeight:900}}>You escaped!</div>
        </div>
      ) : (
        <div style={{flex:1,padding:"8px 16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
          <div style={{background:"white",borderRadius:18,padding:"18px 20px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:`0 4px 20px ${color}25`,border:`2.5px solid ${color}`,marginBottom:18}}>
            <div style={{fontSize:11,color,fontWeight:800,letterSpacing:1.5,marginBottom:4}}>PUZZLE {unlocked+1}</div>
            <div style={{fontSize:44}}>{cur.emoji}</div>
            <div style={{fontSize:30,color,...DS,fontWeight:900}}>{cur.es}</div>
            <button onClick={()=>speakEs(cur.es)} style={{marginTop:6,background:`${color}15`,border:`1px solid ${color}30`,borderRadius:10,padding:"4px 12px",cursor:"pointer",fontSize:12,color,fontWeight:700,...DS}}>🔊</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:400}}>
            {options.map(opt=>(
              <button key={opt} onClick={()=>pick(opt)} style={{padding:"14px",borderRadius:14,border:`2px solid ${!selected?color:opt===cur.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===cur.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:15,...DS,fontWeight:700}}>{opt}</button>
            ))}
          </div>
        </div>
      )}
    </CuencaBg>
  );
}

function ChaseGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [runnerY, setRunnerY] = useState(0); // 0=ground, negative = jump
  const [speed, setSpeed] = useState(1); // multiplier for scenery
  const [bgOffset, setBgOffset] = useState(0);
  const word = words[idx];
  const options = useMemo(()=>makeOptions(word, pool, 3),[idx]);
  useEffect(()=>{ if(word) speakEs(word.es); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    const t = setInterval(()=>{ setBgOffset(o=>(o+ 4*speed)%200); }, 60);
    return ()=>clearInterval(t);
  },[speed]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt);
    if(opt===word.en){
      setRunnerY(-60);
      setTimeout(()=>setRunnerY(0), 600);
      setSpeed(s=>Math.min(s+0.15, 2.4));
      speakEs(word.es);
    } else {
      setSpeed(s=>Math.max(s-0.3, 0.4));
    }
    setTimeout(()=>{
      if(idx<words.length-1){ setIdx(i=>i+1); setSelected(null); }
      else onComplete();
    }, 1300);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes runnerLegs{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-2px) rotate(2deg)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:3}}>
        <div style={{fontSize:16,color:"white",...DS}}>🏃 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Speed: {"🚀".repeat(Math.round(speed*2))} · {idx+1}/{words.length}</div>
      </div>
      <div style={{padding:"12px 16px",position:"relative",zIndex:2}}>
        <div style={{background:"white",borderRadius:14,padding:"10px 14px",border:`2px solid ${color}50`,textAlign:"center"}}>
          <div style={{fontSize:32}}>{word.emoji}</div>
          <div style={{fontSize:28,color,...DS,fontWeight:900}}>{word.es}</div>
        </div>
      </div>
      {/* Scrolling Cuenca street */}
      <div style={{height:160,position:"relative",overflow:"hidden",margin:"4px 12px",borderRadius:14,background:"linear-gradient(180deg,#A7D5F5 0%,#FEF3C7 60%,#92400E 100%)",border:`2px solid ${color}50`,zIndex:1}}>
        {/* moving houses */}
        {[0,200,400,600].map(off=>(
          <svg key={off} viewBox="0 0 200 100" style={{position:"absolute",left:off-bgOffset,bottom:30,width:200,height:80,opacity:0.85}}>
            <rect x="20" y="40" width="40" height="40" fill="#F59E0B"/>
            <rect x="70" y="20" width="50" height="60" fill="#E8445A"/>
            <rect x="130" y="35" width="50" height="45" fill="#7C3AED"/>
            <polygon points="20,40 40,20 60,40" fill="#7F1D1D"/>
            <polygon points="70,20 95,5 120,20" fill="#7F1D1D"/>
            <polygon points="130,35 155,15 180,35" fill="#7F1D1D"/>
          </svg>
        ))}
        {/* Runner */}
        <div style={{position:"absolute",left:30,bottom:30+(-runnerY),fontSize:42,transition:"bottom 0.3s ease-out",animation:"runnerLegs 0.3s ease-in-out infinite",zIndex:3}}>🏃</div>
        {/* Obstacles */}
        {[120,260,400,540].map((o,i)=>(
          <div key={i} style={{position:"absolute",left:o-bgOffset,bottom:30,fontSize:30,zIndex:2}}>{["🪨","🚧","🌵","📦"][i]}</div>
        ))}
        {/* Ground */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:30,background:"#7F1D1D"}}/>
      </div>
      <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:8,position:"relative",zIndex:2}}>
        {options.map(opt=>(
          <button key={opt} onClick={()=>pick(opt)} style={{padding:"13px",borderRadius:14,border:`2px solid ${!selected?color:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:15,...DS,fontWeight:700}}>{opt}</button>
        ))}
      </div>
    </CuencaBg>
  );
}

function MarketRushGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(4);
  const word = words[idx];
  const options = useMemo(()=>makeOptions(word, pool, 4),[idx]);
  useEffect(()=>{ speakEs(word.es); setTime(4); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    if(selected) return;
    if(time<=0){ pick(null); return; }
    const t = setTimeout(()=>setTime(x=>x-0.1), 100);
    return ()=>clearTimeout(t);
    // eslint-disable-next-line
  },[time, selected]);
  const pick = (opt)=>{
    if(selected) return;
    setSelected(opt||"timeout");
    if(opt===word.en){ setScore(s=>s+1); speakEs(word.es); }
    setTimeout(()=>{
      if(idx<words.length-1){ setIdx(i=>i+1); setSelected(null); }
      else onComplete();
    }, 900);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes vendorBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes slideIn{from{transform:translateX(120%)}to{transform:translateX(0)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>🛒 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Score {score}/{words.length} · Round {idx+1}</div>
      </div>
      <div style={{height:8,background:"rgba(0,0,0,0.06)"}}>
        <div style={{height:"100%",width:`${(time/4)*100}%`,background:time<1.5?"linear-gradient(90deg,#EF4444,#F97316)":color,transition:"width 0.1s"}}/>
      </div>
      <div style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
          <div style={{fontSize:60,animation:"vendorBob 1s ease-in-out infinite"}}>👨‍🌾</div>
          <div style={{background:"white",borderRadius:18,padding:"14px 20px",border:`3px solid ${color}`,boxShadow:`0 4px 12px ${color}30`,position:"relative"}}>
            <div style={{fontSize:11,color,fontWeight:800,letterSpacing:1.5}}>VENDOR CALLS:</div>
            <div style={{fontSize:30,color,...DS,fontWeight:900,whiteSpace:"nowrap"}}>{word.emoji} {word.es}!</div>
            <div style={{position:"absolute",left:-8,top:24,width:0,height:0,borderTop:"8px solid transparent",borderBottom:"8px solid transparent",borderRight:`8px solid ${color}`}}/>
          </div>
        </div>
        <div style={{width:"100%",maxWidth:420,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,animation:!selected?"slideIn 0.4s ease":"none"}}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>pick(opt)} style={{padding:"16px 8px",borderRadius:14,border:`2px solid ${!selected?color:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"white":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"white",cursor:"pointer",fontSize:14,...DS,fontWeight:700,color:"#1C1917"}}>{opt}</button>
          ))}
        </div>
      </div>
    </CuencaBg>
  );
}

function RestaurantRushGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [patience, setPatience] = useState(100);
  const word = words[idx];
  const tray = useMemo(()=>makeOptions(word, pool, 6),[idx]);
  useEffect(()=>{ speakEs(word.es); setPatience(100); /* eslint-disable-next-line */ },[idx]);
  useEffect(()=>{
    if(selected) return;
    if(patience<=0){ serve(null); return; }
    const t = setTimeout(()=>setPatience(p=>p-2.5), 100);
    return ()=>clearTimeout(t);
    // eslint-disable-next-line
  },[patience, selected]);
  const serve = (opt)=>{
    if(selected) return;
    setSelected(opt||"timeout");
    if(opt===word.en){ setScore(s=>s+1); speakEs(word.es); }
    setTimeout(()=>{
      if(idx<words.length-1){ setIdx(i=>i+1); setSelected(null); }
      else onComplete();
    }, 900);
  };
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <style>{`@keyframes customerFume{0%,100%{filter:none}50%{filter:hue-rotate(20deg) brightness(1.2)}}`}</style>
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px",position:"relative",zIndex:2}}>
        <div style={{fontSize:16,color:"white",...DS}}>🍽️ {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Served {score}/{words.length}</div>
      </div>
      <div style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <div style={{fontSize:60,animation:patience<40?"customerFume 0.5s ease-in-out infinite":"none"}}>{patience>60?"😊":patience>30?"😐":"😠"}</div>
          <div style={{background:"white",borderRadius:18,padding:"12px 18px",border:`3px solid ${color}`,boxShadow:`0 4px 12px ${color}30`}}>
            <div style={{fontSize:11,color,fontWeight:800,letterSpacing:1.5}}>ORDER:</div>
            <div style={{fontSize:24,color,...DS,fontWeight:900}}>"¡Quiero {word.es}!"</div>
          </div>
        </div>
        <div style={{width:"100%",maxWidth:420,marginBottom:14}}>
          <div style={{fontSize:11,color:"#92400E",fontWeight:800,marginBottom:4,...DS}}>PATIENCE</div>
          <div style={{height:10,background:"rgba(0,0,0,0.08)",borderRadius:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${patience}%`,background:patience<30?"#EF4444":patience<60?"#F59E0B":"#10B981",transition:"width 0.1s"}}/>
          </div>
        </div>
        <div style={{fontSize:11,color:"#78716C",marginBottom:6,...DS}}>SERVE THE RIGHT DISH:</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10,width:"100%",maxWidth:420}}>
          {tray.map(opt=>(
            <button key={opt} onClick={()=>serve(opt)} style={{aspectRatio:"1/1",borderRadius:14,border:`2px solid ${!selected?color:opt===word.en?"#10B981":opt===selected?"#EF4444":"#E5E7EB"}`,background:!selected?"#FFF7E8":opt===word.en?"#D1FAE5":opt===selected?"#FEE2E2":"#FFF7E8",cursor:"pointer",fontSize:12,...DS,fontWeight:700,color:"#1C1917",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:4,textAlign:"center"}}>
              <div style={{fontSize:24}}>🍽️</div>
              <div style={{lineHeight:1.2}}>{opt}</div>
            </button>
          ))}
        </div>
      </div>
    </CuencaBg>
  );
}

function MadLibsGame({ words, allWords, color, title, onComplete, emoji, isReplay, landId }) {
  const pool = allWords || words;
  // Pick 4 words to fill blanks in a Cuenca story
  const picks = useMemo(()=>[...words].sort(()=>Math.random()-0.5).slice(0,4),[]); // eslint-disable-line
  const [filled, setFilled] = useState([]); // chosen so far
  const [done, setDone] = useState(false);
  const cur = picks[filled.length];
  const options = useMemo(()=>{
    if(!cur) return [];
    const wrongs = pool.filter(w=>w.es!==cur.es).sort(()=>Math.random()-0.5).slice(0,2).map(w=>w.es);
    return [cur.es, ...wrongs].sort(()=>Math.random()-0.5);
  // eslint-disable-next-line
  },[filled.length]);
  useEffect(()=>{ if(cur) speakEn(cur.en); /* eslint-disable-next-line */ },[filled.length]);
  const pick = (es)=>{
    if(es===cur.es){
      speakEs(cur.es);
      const next = [...filled, cur];
      setFilled(next);
      if(next.length>=picks.length) setTimeout(()=>setDone(true), 600);
    }
  };
  const template = [
    "Once upon a time in Cuenca, a brave traveler met a friendly ",
    " who offered them some delicious ",
    ". They wandered together through the plaza, learning about ",
    " until they finally arrived at a beautiful ",
    ". The end!",
  ];
  if(done) return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>📖 {title}</div>
      </div>
      <div style={{flex:1,padding:"20px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{fontSize:48,marginBottom:8}}>📜</div>
        <div style={{fontSize:14,color:"#92400E",fontWeight:800,letterSpacing:2,marginBottom:10,...DS}}>YOUR STORY</div>
        <div style={{background:"white",borderRadius:16,padding:"20px 22px",maxWidth:420,boxShadow:`0 4px 18px ${color}30`,border:`2px solid ${color}40`,marginBottom:18,...DS,fontSize:16,color:"#1C1917",lineHeight:1.7}}>
          {template.map((t,i)=>(<span key={i}>{t}{filled[i]&&<b style={{color,background:`${color}15`,padding:"2px 8px",borderRadius:8}}>{filled[i].es}</b>}</span>))}
        </div>
        <button onClick={()=>{ filled.forEach((w,i)=>setTimeout(()=>speakEs(w.es), i*1200)); }} style={{padding:"12px 22px",borderRadius:14,background:`${color}15`,border:`1.5px solid ${color}40`,color,cursor:"pointer",fontSize:14,fontWeight:800,...DS,marginBottom:12}}>🔊 Hear it</button>
        <button onClick={onComplete} style={{padding:"14px 28px",borderRadius:16,background:`linear-gradient(135deg,${color},#F59E0B)`,color:"white",border:"none",cursor:"pointer",fontSize:15,fontWeight:800,...DS}}>Continue →</button>
      </div>
    </CuencaBg>
  );
  return (
    <CuencaBg color={color}>
      {FONT_LINK}
      <CuyOverlay visible={isReplay} landId={landId||1}/>
      <div style={{background:color,padding:"14px 16px"}}>
        <div style={{fontSize:16,color:"white",...DS}}>📖 {title}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.85)"}}>Word {filled.length+1}/{picks.length}</div>
      </div>
      <div style={{flex:1,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{background:"white",borderRadius:16,padding:"16px",maxWidth:420,boxShadow:`0 4px 16px ${color}25`,border:`2px solid ${color}30`,marginBottom:18,...DS,fontSize:15,color:"#1C1917",lineHeight:1.7}}>
          {template.map((t,i)=>(<span key={i}>{t}{filled[i] ? <b style={{color,background:`${color}15`,padding:"2px 8px",borderRadius:8}}>{filled[i].es}</b> : (i===filled.length ? <b style={{background:"#FEF3C7",padding:"2px 14px",borderRadius:8,color:"#92400E",border:`2px dashed ${color}`}}>___</b> : "___")}</span>))}
        </div>
        <div style={{background:"white",borderRadius:14,padding:"12px 16px",border:`2px solid ${color}40`,marginBottom:14,maxWidth:420,textAlign:"center"}}>
          <div style={{fontSize:11,color,fontWeight:800,letterSpacing:1.5}}>PICK THE SPANISH WORD FOR:</div>
          <div style={{fontSize:22,color:"#1C1917",...DS,fontWeight:900}}>{cur?.emoji} {cur?.en}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:420}}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>pick(opt)} style={{padding:"14px",borderRadius:14,border:`2px solid ${color}40`,background:"white",cursor:"pointer",fontSize:16,...DS,fontWeight:800,color}}>{opt}</button>
          ))}
        </div>
      </div>
    </CuencaBg>
  );
}

function Land2Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={2}  words={LAND2_WORDS}  color="#F97316" landName="Around Town" nextLand="Family"  story={LAND2_CONTENT.story}  limerick={LAND2_CONTENT.limerick}  joke={LAND2_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, ShootingGame, TreasureMapGame]} isReplay={isReplay}/>; }
function Land3Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={3}  words={LAND3_WORDS}  color="#F59E0B" landName="Family"      nextLand="Food"    story={LAND3_CONTENT.story}  limerick={LAND3_CONTENT.limerick}  joke={LAND3_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, ShootingGame, QuizGame]} isReplay={isReplay}/>; }
function Land4Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={4}  words={LAND4_WORDS}  color="#10B981" landName="Food"        nextLand="Feelings" story={LAND4_CONTENT.story}  limerick={LAND4_CONTENT.limerick}  joke={LAND4_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[RestaurantRushGame, FallingWordsGame, DealOrNoDealGame]} isReplay={isReplay}/>; }
function Land5Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={5}  words={LAND5_WORDS}  color="#3B82F6" landName="Feelings"    nextLand="Core Words 1" story={LAND5_CONTENT.story}  limerick={LAND5_CONTENT.limerick}  joke={LAND5_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[WheelOfFortuneGame, FallingWordsGame, QuizGame]} isReplay={isReplay}/>; }
function Land6Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={6}  words={LAND6_WORDS}  color="#7C3AED" landName="Core Words 1" nextLand="School"  story={LAND6_CONTENT.story}  limerick={LAND6_CONTENT.limerick}  joke={LAND6_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[TreasureMapGame, EscapeRoomGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land7Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={7}  words={LAND7_WORDS}  color="#E8445A" landName="School"      nextLand="Numbers" story={LAND7_CONTENT.story}  limerick={LAND7_CONTENT.limerick}  joke={LAND7_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[FallingWordsGame, EscapeRoomGame, DealOrNoDealGame]} isReplay={isReplay}/>; }
function Land8Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={8}  words={LAND8_WORDS}  color="#F97316" landName="Numbers"     nextLand="Colors"  story={LAND8_CONTENT.story}  limerick={LAND8_CONTENT.limerick}  joke={LAND8_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[FallingWordsGame, MarketRushGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land9Screen({ onBack, onComplete, isReplay, profile })  { return <LandScreen landNum={9}  words={LAND9_WORDS}  color="#8B5CF6" landName="Colors"      nextLand="Animals" story={LAND9_CONTENT.story}  limerick={LAND9_CONTENT.limerick}  joke={LAND9_CONTENT.joke}  onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, FallingWordsGame, EscapeRoomGame]} isReplay={isReplay}/>; }
function Land10Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={10} words={LAND10_WORDS} color="#10B981" landName="Animals"     nextLand="Core Words 2" story={LAND10_CONTENT.story} limerick={LAND10_CONTENT.limerick} joke={LAND10_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[ShootingGame, FallingWordsGame, EscapeRoomGame]} isReplay={isReplay}/>; }
function Land11Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={11} words={LAND11_WORDS} color="#7C3AED" landName="Core Words 2" nextLand="Verbs"  story={LAND11_CONTENT.story} limerick={LAND11_CONTENT.limerick} joke={LAND11_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[TreasureMapGame, DealOrNoDealGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land12Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={12} words={LAND12_WORDS} color="#F59E0B" landName="Verbs"        nextLand="Time"   story={LAND12_CONTENT.story} limerick={LAND12_CONTENT.limerick} joke={LAND12_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, QuizGame, LightningRoundGame]} isReplay={isReplay}/>; }
function Land13Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={13} words={LAND13_WORDS} color="#3B82F6" landName="Time"         nextLand="Body"   story={LAND13_CONTENT.story} limerick={LAND13_CONTENT.limerick} joke={LAND13_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[ChaseGame, MatchingGame, QuizGame]} isReplay={isReplay}/>; }
function Land14Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={14} words={LAND14_WORDS} color="#E8445A" landName="Body"         nextLand="Descriptions" story={LAND14_CONTENT.story} limerick={LAND14_CONTENT.limerick} joke={LAND14_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MemoryFlipGame, QuizGame, FallingWordsGame]} isReplay={isReplay}/>; }
function Land15Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={15} words={LAND15_WORDS} color="#8B5CF6" landName="Descriptions" nextLand="Shopping" story={LAND15_CONTENT.story} limerick={LAND15_CONTENT.limerick} joke={LAND15_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MadLibsGame, QuizGame, FallingWordsGame]} isReplay={isReplay}/>; }
function Land16Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={16} words={LAND16_WORDS} color="#10B981" landName="Shopping"     nextLand="Weather"  story={LAND16_CONTENT.story} limerick={LAND16_CONTENT.limerick} joke={LAND16_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MarketRushGame, DealOrNoDealGame, LightningRoundGame]} isReplay={isReplay}/>; }
function Land17Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={17} words={LAND17_WORDS} color="#F97316" landName="Weather"      nextLand="Core Words 3" story={LAND17_CONTENT.story} limerick={LAND17_CONTENT.limerick} joke={LAND17_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, FallingWordsGame, MemoryFlipGame]} isReplay={isReplay}/>; }
function Land18Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={18} words={LAND18_WORDS} color="#7C3AED" landName="Core Words 3" nextLand="Core Words 4" story={LAND18_CONTENT.story} limerick={LAND18_CONTENT.limerick} joke={LAND18_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, WheelOfFortuneGame, DealOrNoDealGame]} isReplay={isReplay}/>; }
function Land19Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={19} words={LAND19_WORDS} color="#7C3AED" landName="Core Words 4" nextLand="Opinions" story={LAND19_CONTENT.story} limerick={LAND19_CONTENT.limerick} joke={LAND19_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MemoryFlipGame, LightningRoundGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land20Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={20} words={LAND20_WORDS} color="#E8445A" landName="Opinions"     nextLand="Travel"   story={LAND20_CONTENT.story} limerick={LAND20_CONTENT.limerick} joke={LAND20_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MadLibsGame, LightningRoundGame, FallingWordsGame]} isReplay={isReplay}/>; }
function Land21Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={21} words={LAND21_WORDS} color="#3B82F6" landName="Travel"       nextLand="Health"   story={LAND21_CONTENT.story} limerick={LAND21_CONTENT.limerick} joke={LAND21_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[TreasureMapGame, DealOrNoDealGame, FallingWordsGame]} isReplay={isReplay}/>; }
function Land22Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={22} words={LAND22_WORDS} color="#10B981" landName="Health"       nextLand="Social Life" story={LAND22_CONTENT.story} limerick={LAND22_CONTENT.limerick} joke={LAND22_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MemoryFlipGame, EscapeRoomGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land23Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={23} words={LAND23_WORDS} color="#F59E0B" landName="Social Life"  nextLand="Technology" story={LAND23_CONTENT.story} limerick={LAND23_CONTENT.limerick} joke={LAND23_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MatchingGame, ShootingGame, LightningRoundGame]} isReplay={isReplay}/>; }
function Land24Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={24} words={LAND24_WORDS} color="#8B5CF6" landName="Technology"   nextLand="The Grand Final" story={LAND24_CONTENT.story} limerick={LAND24_CONTENT.limerick} joke={LAND24_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[ChaseGame, DealOrNoDealGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }
function Land25Screen({ onBack, onComplete, isReplay, profile }) { return <LandScreen landNum={25} words={LAND25_WORDS} color="#7C3AED" landName="The Grand Final" nextLand="Mastery" story={LAND25_CONTENT.story} limerick={LAND25_CONTENT.limerick} joke={LAND25_CONTENT.joke} onBack={onBack} onComplete={onComplete} profile={profile} games={[MemoryFlipGame, LightningRoundGame, WheelOfFortuneGame]} isReplay={isReplay}/>; }

const LAND_SCREENS = {
  1:Land1Screen, 2:Land2Screen, 3:Land3Screen, 4:Land4Screen, 5:Land5Screen,
  6:Land6Screen, 7:Land7Screen, 8:Land8Screen, 9:Land9Screen, 10:Land10Screen,
  11:Land11Screen, 12:Land12Screen, 13:Land13Screen, 14:Land14Screen, 15:Land15Screen,
  16:Land16Screen, 17:Land17Screen, 18:Land18Screen, 19:Land19Screen, 20:Land20Screen,
  21:Land21Screen, 22:Land22Screen, 23:Land23Screen, 24:Land24Screen, 25:Land25Screen,
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("opening");
  const [familyId, setFamilyId] = useState(null);
  const [familyCode, setFamilyCode] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(()=>{
    const saved = localStorage.getItem("wl_family");
    if(saved){
      try {
        const { id, code, name } = JSON.parse(saved);
        setFamilyId(id); setFamilyCode(code); setFamilyName(name);
        loadProfiles(id);
        setScreen("profiles");
      } catch(e){}
    }
  },[]);

  const loadProfiles = async (fid)=>{
    const { data } = await sb.from("players").select("*").eq("family_id", fid).order("updated_at",{ascending:false});
    setProfiles(data||[]);
  };
  const handleFamilyDone = (id, code, name)=>{
    setFamilyId(id); setFamilyCode(code); setFamilyName(name);
    localStorage.setItem("wl_family", JSON.stringify({id, code, name}));
    loadProfiles(id);
    setScreen("profiles");
  };
  const handleCreateProfile = async (name, avatar, color, username)=>{
    const { data } = await sb.from("players").insert({
      id: Date.now().toString(36) + Math.random().toString(36).substring(2,6),
      family_id: familyId, name, avatar, color, stars:0, streak:0, level:1,
      username: (username||"").trim() || null,
      last_date: new Date().toISOString().split("T")[0],
    }).select().single();
    if(data){ await loadProfiles(familyId); setScreen("profiles"); }
  };
  const handleSelectLand = (land)=>{
    setSelectedLand(land);
    setScreen("landIntro");
  };
  const startLand = (id)=>{
    setScreen(`land${id}`);
  };

  // Complete a land — update stars, level, streak in DB and local state
  const completeLand = async (landId)=>{
    const isCheckpoint = LANDS.find(l=>l.id===landId)?.level === "Checkpoint";
    const isFinalBoss = LANDS.find(l=>l.id===landId)?.level === "Final Boss";
    const stars = isFinalBoss ? 10 : isCheckpoint ? 5 : 3;
    const newLevel = Math.max(profile.level||1, landId+1);
    const newStars = (profile.stars||0) + stars;
    const today = new Date().toISOString().split("T")[0];
    const lastDate = profile.last_date;
    let newStreak = profile.streak || 0;
    if(lastDate !== today){
      const y = new Date(); y.setDate(y.getDate()-1);
      const yesterday = y.toISOString().split("T")[0];
      newStreak = (lastDate === yesterday) ? newStreak+1 : 1;
    }
    await sb.from("players").update({ level:newLevel, stars:newStars, streak:newStreak, last_date:today }).eq("id", profile.id);
    setProfile(p=>({...p, level:newLevel, stars:newStars, streak:newStreak, last_date:today}));
    setScreen("map");
  };

  if(screen === "opening")        return <OpeningScreen onEnter={()=>setScreen(familyId?"profiles":"family")} onReturning={()=>setScreen("usernameLogin")}/>;
  if(screen === "usernameLogin")  return <UsernameLoginScreen onFound={(p)=>{setProfile(p);setFamilyId(p.family_id);setFamilyCode(p.families?.code);setFamilyName(p.families?.name);localStorage.setItem("wl_family",JSON.stringify({id:p.family_id,code:p.families?.code,name:p.families?.name}));setScreen("map");}} onBack={()=>setScreen("opening")}/>;
  if(screen === "family")         return <FamilySetupScreen onDone={handleFamilyDone}/>;
  if(screen === "profiles")       return <ProfileSelectScreen profiles={profiles} familyName={familyName} familyCode={familyCode} onSelect={(p)=>{setProfile(p);setScreen("map");}} onCreate={()=>setScreen("createProfile")}/>;
  if(screen === "createProfile")  return <CreateProfileScreen onDone={handleCreateProfile} onBack={()=>setScreen("profiles")}/>;
  if(screen === "map")            return <AdventureMap profile={profile} onSelectLand={handleSelectLand} onStudyHall={()=>setScreen("studyHall")} onMyProfile={()=>setScreen("myProfile")}/>;
  if(screen === "landIntro")      return <LandIntroScreen land={selectedLand} onBack={()=>setScreen("map")} onStartLesson={()=>startLand(selectedLand.id)}/>;
  if(screen === "studyHall")      return <StudyHallScreen profile={profile} onBack={()=>setScreen("map")} onOpen={(id)=>setScreen("study_"+id)}/>;
  if(screen === "study_flashcards") return <FlashcardScreen profile={profile} onBack={()=>setScreen("studyHall")} allLandWords={ALL_LAND_WORDS}/>;
  if(screen === "study_quiz")     return <RandomQuizScreen profile={profile} onBack={()=>setScreen("studyHall")} allLandWords={ALL_LAND_WORDS}/>;
  if(screen === "myProfile")      return <MyProfileScreen profile={profile} familyCode={familyCode} familyName={familyName} onBack={()=>setScreen("map")}/>;

  for(let i=1; i<=25; i++){
    if(screen === `land${i}`){
      const Comp = LAND_SCREENS[i];
      const isReplay = (profile?.level||1) > i;
      return <Comp profile={profile} onBack={()=>setScreen("map")} onComplete={()=>completeLand(i)} isReplay={isReplay}/>;
    }
  }
  return null;
}
