import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://jlqrxshoilgmcfaitxta.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpscXp4c2hvaWxnbWNmYWl0eHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTI1MTYsImV4cCI6MjA2MTg4ODUxNn0.lNaBCOCtCKBBcSlVfJnFMBGfTdADkAsgKFV9gUPaEOM"
);

// ══ THEME ════════════════════════════════════════════════════════
const T = {
  bg:       "#FDF6EC",
  bgDark:   "#2D1B69",
  cream:    "#FDF6EC",
  purple:   "#7C3AED",
  purpleL:  "#A78BFA",
  blue:     "#2563EB",
  blueL:    "#60A5FA",
  gold:     "#F59E0B",
  goldL:    "#FCD34D",
  green:    "#10B981",
  red:      "#EF4444",
  orange:   "#F97316",
  text:     "#1C1917",
  textSoft: "#78716C",
  white:    "#FFFFFF",
  card:     "#FFFFFF",
  shadow:   "rgba(124,58,237,0.15)",
};

const DS = { fontFamily: "'Nunito', 'Quicksand', system-ui, sans-serif", fontWeight: 800 };

// ══ LAND DATA ═════════════════════════════════════════════════════
const LANDS = [
  // Beginner
  { id:1,  name:"Greetings",       emoji:"👋", color:"#E8445A", level:"Beginner",      region:"Cuenca Plaza"      },
  { id:2,  name:"Around Town",     emoji:"🏘️", color:"#F97316", level:"Beginner",      region:"Cuenca Streets"    },
  { id:3,  name:"Family",          emoji:"🏠", color:"#F59E0B", level:"Beginner",      region:"Casa Familiar"     },
  { id:4,  name:"Food",            emoji:"🍽️", color:"#10B981", level:"Beginner",      region:"Mercado Central"   },
  { id:5,  name:"Feelings",        emoji:"🎭", color:"#3B82F6", level:"Beginner",      region:"Parque Calderon"   },
  { id:6,  name:"Core Words 1",    emoji:"⭐", color:"#7C3AED", level:"Checkpoint",    region:"La Ruta Mágica"    },
  { id:7,  name:"School",          emoji:"🏫", color:"#E8445A", level:"Beginner",      region:"La Escuela"        },
  { id:8,  name:"Numbers",         emoji:"🔢", color:"#F97316", level:"Beginner",      region:"El Mercado"        },
  { id:9,  name:"Colors",          emoji:"🎨", color:"#8B5CF6", level:"Beginner",      region:"Arte de Cuenca"    },
  { id:10, name:"Animals",         emoji:"🐾", color:"#10B981", level:"Beginner",      region:"El Campo"          },
  { id:11, name:"Core Words 2",    emoji:"⭐", color:"#7C3AED", level:"Checkpoint",    region:"La Ruta Mágica"    },
  // Intermediate
  { id:12, name:"Verbs",           emoji:"⚡", color:"#F59E0B", level:"Intermediate",  region:"Centro Histórico"  },
  { id:13, name:"Time",            emoji:"⏰", color:"#3B82F6", level:"Intermediate",  region:"El Reloj"          },
  { id:14, name:"Body",            emoji:"🧍", color:"#E8445A", level:"Intermediate",  region:"La Clínica"        },
  { id:15, name:"Descriptions",    emoji:"✨", color:"#8B5CF6", level:"Intermediate",  region:"Las Galerías"      },
  { id:16, name:"Shopping",        emoji:"🛍️", color:"#10B981", level:"Intermediate",  region:"Artesanías"        },
  { id:17, name:"Weather",         emoji:"🌦️", color:"#F97316", level:"Intermediate",  region:"Los Andes"         },
  { id:18, name:"Core Words 3",    emoji:"⭐", color:"#7C3AED", level:"Checkpoint",    region:"La Ruta Mágica"    },
  { id:19, name:"Core Words 4",    emoji:"⭐", color:"#7C3AED", level:"Checkpoint",    region:"La Ruta Mágica"    },
  // Advanced
  { id:20, name:"Opinions",        emoji:"🗣️", color:"#E8445A", level:"Advanced",      region:"El Debate"         },
  { id:21, name:"Travel",          emoji:"✈️", color:"#3B82F6", level:"Advanced",      region:"El Aeropuerto"     },
  { id:22, name:"Health",          emoji:"🏥", color:"#10B981", level:"Advanced",      region:"La Farmacia"       },
  { id:23, name:"Social Life",     emoji:"👥", color:"#F59E0B", level:"Advanced",      region:"La Fiesta"         },
  { id:24, name:"Technology",      emoji:"📱", color:"#8B5CF6", level:"Advanced",      region:"El Café WiFi"      },
  { id:25, name:"Core Words 4",    emoji:"🏆", color:"#7C3AED", level:"Final Boss",    region:"La Gran Final"     },
];

// ══ HELPERS ══════════════════════════════════════════════════════
const speakEs = (text) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES"; u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const speakEn = (text) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

// ══ OPENING SCREEN ════════════════════════════════════════════════
function OpeningScreen({ onEnter }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 300); }, []);

  return (
    <div style={{
      minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A 0%, #2D1B69 40%, #1A3A6B 100%)`,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"20px", overflow:"hidden", position:"relative"
    }}>
      {/* Stars background */}
      {[...Array(20)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
          width: i%3===0?4:2, height: i%3===0?4:2,
          borderRadius:"50%", background:"white",
          opacity: 0.3 + Math.random()*0.5,
          animation:`twinkle ${2+Math.random()*3}s ease-in-out infinite`,
          animationDelay:`${Math.random()*3}s`
        }}/>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');
        @keyframes twinkle { 0%,100%{opacity:.2} 50%{opacity:.8} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatR { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* Characters */}
      <div style={{
        display:"flex", alignItems:"flex-end", gap:20, marginBottom:10,
        opacity: show?1:0, transition:"opacity 0.8s ease",
      }}>
        {/* Grayson - purple */}
        <div style={{ animation:"float 3s ease-in-out infinite", animationDelay:"0.2s" }}>
          <img src="/characters/grayson.png"
            style={{ height:160, filter:"drop-shadow(0 8px 24px rgba(124,58,237,0.5))" }}
            alt="Grayson" onError={e => { e.target.style.display='none'; }}
          />
        </div>
        {/* Peyton - blue */}
        <div style={{ animation:"floatR 3s ease-in-out infinite", animationDelay:"0.8s" }}>
          <img src="/characters/peyton.png"
            style={{ height:140, filter:"drop-shadow(0 8px 24px rgba(37,99,235,0.5))" }}
            alt="Peyton" onError={e => { e.target.style.display='none'; }}
          />
        </div>
      </div>

      {/* Title */}
      <div style={{
        textAlign:"center", marginBottom:8,
        opacity: show?1:0, transition:"opacity 1s ease 0.4s",
        animation: show?"fadeUp 0.8s ease 0.4s both":"none"
      }}>
        <div style={{ fontSize:13, letterSpacing:4, color:"#A78BFA", fontWeight:700, marginBottom:6 }}>
          BIENVENIDOS A
        </div>
        <div style={{
          fontSize:42, color:"white", lineHeight:1.1, marginBottom:4,
          ...DS, textShadow:"0 4px 20px rgba(124,58,237,0.6)"
        }}>
          Wander
        </div>
        <div style={{
          fontSize:42, color:T.goldL, lineHeight:1.1,
          ...DS, textShadow:"0 4px 20px rgba(245,158,11,0.5)"
        }}>
          Lingo
        </div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:8, fontStyle:"italic" }}>
          Learn Spanish. See the world.
        </div>
      </div>

      {/* Decorative path dots */}
      <div style={{ display:"flex", gap:8, margin:"16px 0", alignItems:"center" }}>
        {["#E8445A","#F97316","#F59E0B","#10B981","#3B82F6","#7C3AED"].map((c,i) => (
          <div key={i} style={{
            width:10, height:10, borderRadius:"50%", background:c,
            opacity:0.7, animation:`pulse ${1.5+i*0.2}s ease-in-out infinite`,
            animationDelay:`${i*0.15}s`
          }}/>
        ))}
      </div>

      {/* Start button */}
      <button onClick={onEnter} style={{
        background:`linear-gradient(135deg, ${T.gold}, ${T.orange})`,
        border:"none", borderRadius:24, padding:"16px 48px",
        fontSize:20, color:"white", cursor:"pointer", ...DS,
        boxShadow:`0 8px 32px rgba(245,158,11,0.5)`,
        animation:"pulse 2s ease-in-out infinite",
        opacity: show?1:0, transition:"opacity 1s ease 0.8s",
        marginTop:8
      }}>
        ¡Vámonos! 🗺️
      </button>

      <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:12 }}>
        25 lands • 15 games • 1 incredible adventure
      </div>
    </div>
  );
}

// ══ FAMILY SETUP ══════════════════════════════════════════════════
function FamilySetupScreen({ onDone }) {
  const [mode, setMode] = useState("choose"); // choose|create|join
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createFamily = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const code = Math.random().toString(36).substring(2,8).toUpperCase();
    const { data, error: err } = await sb.from("families").insert({ name: input.trim(), code }).select().single();
    if (err) { setError("Could not create family. Try again!"); setLoading(false); return; }
    onDone(data.id, data.code, data.name);
  };

  const joinFamily = async () => {
    if (input.length < 6) return;
    setLoading(true);
    const { data, error: err } = await sb.from("families").select().eq("code", input.toUpperCase()).single();
    if (err || !data) { setError("Family code not found. Check and try again!"); setLoading(false); return; }
    onDone(data.id, data.code, data.name);
  };

  if (mode === "choose") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <div style={{ fontSize:48, marginBottom:8 }}>🌍</div>
      <div style={{ fontSize:28, color:"white", ...DS, marginBottom:4 }}>Start Your Adventure</div>
      <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:32, textAlign:"center" }}>
        Create a family group or join one that already exists
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, width:"100%", maxWidth:320 }}>
        <button onClick={()=>setMode("create")} style={{ padding:"18px", borderRadius:20, background:`linear-gradient(135deg, ${T.purple}, ${T.blue})`, border:"none", color:"white", fontSize:17, cursor:"pointer", ...DS }}>
          🏡 Create My Family
        </button>
        <button onClick={()=>setMode("join")} style={{ padding:"18px", borderRadius:20, background:"rgba(255,255,255,0.1)", border:"2px solid rgba(255,255,255,0.2)", color:"white", fontSize:17, cursor:"pointer", ...DS }}>
          🔑 Join a Family
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <button onClick={()=>{setMode("choose");setInput("");setError("");}} style={{ position:"absolute", top:20, left:20, background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 14px", color:"white", cursor:"pointer", fontSize:14 }}>← Back</button>
      <div style={{ fontSize:36, marginBottom:12 }}>{mode==="create"?"🏡":"🔑"}</div>
      <div style={{ fontSize:24, color:"white", ...DS, marginBottom:4 }}>
        {mode==="create" ? "Name Your Family" : "Enter Family Code"}
      </div>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:24, textAlign:"center" }}>
        {mode==="create" ? "e.g. The Quintanas, The Wanderers" : "Ask your family for their 6-letter code"}
      </div>
      <input
        value={input} onChange={e=>setInput(e.target.value)}
        placeholder={mode==="create" ? "Family name..." : "XXXXXX"}
        maxLength={mode==="create"?30:6}
        style={{ width:"100%", maxWidth:300, padding:"16px", borderRadius:16, border:"2px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.1)", color:"white", fontSize:18, fontFamily:"inherit", fontWeight:700, textAlign:"center", outline:"none", marginBottom:8 }}
      />
      {error && <div style={{ color:"#FCA5A5", fontSize:13, marginBottom:8, textAlign:"center" }}>{error}</div>}
      <button
        onClick={mode==="create"?createFamily:joinFamily}
        disabled={loading || (mode==="create"?!input.trim():input.length<6)}
        style={{ width:"100%", maxWidth:300, padding:16, borderRadius:18, background: (mode==="create"?input.trim():input.length>=6) ? `linear-gradient(135deg, ${T.gold}, ${T.orange})` : "rgba(255,255,255,0.2)", border:"none", color:"white", fontSize:17, cursor:"pointer", ...DS, opacity: loading?0.7:1 }}
      >
        {loading ? "..." : mode==="create" ? "Create Family 🎉" : "Join Family 🚀"}
      </button>
    </div>
  );
}

// ══ PROFILE SELECT ════════════════════════════════════════════════
const AVATARS = ["🦁","🐯","🦊","🐺","🦅","🐬","🦋","🌟","🔥","⚡","🌈","🎯"];
const COLORS  = ["#E8445A","#F97316","#F59E0B","#10B981","#3B82F6","#7C3AED","#EC4899","#14B8A6"];

function ProfileSelectScreen({ profiles, familyName, familyCode, onSelect, onCreate }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column", padding:20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <div style={{ textAlign:"center", marginBottom:24, marginTop:20 }}>
        <div style={{ fontSize:13, color:T.goldL, letterSpacing:3, fontWeight:700, marginBottom:4 }}>{familyName?.toUpperCase()}</div>
        <div style={{ fontSize:24, color:"white", ...DS }}>Who's adventuring today?</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:4 }}>Family code: {familyCode}</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:380, margin:"0 auto", width:"100%" }}>
        {profiles.map(p => (
          <button key={p.id} onClick={()=>onSelect(p)} style={{
            padding:"16px 20px", borderRadius:20, background:"rgba(255,255,255,0.08)",
            border:`2px solid ${p.color||T.purple}40`, cursor:"pointer",
            display:"flex", alignItems:"center", gap:14, textAlign:"left"
          }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:p.color||T.purple, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
              {p.avatar||"🌟"}
            </div>
            <div>
              <div style={{ fontSize:18, color:"white", ...DS }}>{p.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>
                ⭐ {p.stars||0} stars · Land {p.currentLand||1}
              </div>
            </div>
            <div style={{ marginLeft:"auto", fontSize:22, color:"rgba(255,255,255,0.3)" }}>›</div>
          </button>
        ))}
        <button onClick={onCreate} style={{
          padding:"16px", borderRadius:20, background:"rgba(255,255,255,0.05)",
          border:"2px dashed rgba(255,255,255,0.2)", cursor:"pointer",
          color:"rgba(255,255,255,0.5)", fontSize:15, ...DS
        }}>
          + Add Explorer
        </button>
      </div>
    </div>
  );
}

// ══ CREATE PROFILE ════════════════════════════════════════════════
function CreateProfileScreen({ onDone, onBack }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column", padding:20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <button onClick={onBack} style={{ alignSelf:"flex-start", background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 14px", color:"white", cursor:"pointer", fontSize:14, marginBottom:20 }}>← Back</button>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 12px" }}>{avatar}</div>
        <div style={{ fontSize:22, color:"white", ...DS }}>Create Your Explorer</div>
      </div>
      <div style={{ maxWidth:340, margin:"0 auto", width:"100%", display:"flex", flexDirection:"column", gap:16 }}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name..." maxLength={20}
          style={{ padding:"14px 16px", borderRadius:14, border:"2px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.1)", color:"white", fontSize:17, fontFamily:"inherit", fontWeight:700, outline:"none" }}
        />
        <div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:8, fontWeight:700 }}>CHOOSE YOUR AVATAR</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {AVATARS.map(a => (
              <button key={a} onClick={()=>setAvatar(a)} style={{ width:44, height:44, borderRadius:12, background: avatar===a?color:"rgba(255,255,255,0.1)", border: avatar===a?`2px solid ${color}`:"2px solid transparent", fontSize:20, cursor:"pointer" }}>{a}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:8, fontWeight:700 }}>CHOOSE YOUR COLOR</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {COLORS.map(c => (
              <button key={c} onClick={()=>setColor(c)} style={{ width:36, height:36, borderRadius:"50%", background:c, border: color===c?"3px solid white":"3px solid transparent", cursor:"pointer" }}/>
            ))}
          </div>
        </div>
        <button onClick={()=>{ if(name.trim()) onDone(name.trim(), avatar, color); }} disabled={!name.trim()||loading}
          style={{ padding:16, borderRadius:18, background: name.trim()?`linear-gradient(135deg,${T.gold},${T.orange})`:"rgba(255,255,255,0.2)", border:"none", color:"white", fontSize:17, cursor:"pointer", ...DS, opacity: loading?0.7:1 }}>
          {loading ? "..." : "Start Adventuring! 🗺️"}
        </button>
      </div>
    </div>
  );
}

// ══ ADVENTURE MAP ═════════════════════════════════════════════════
function AdventureMap({ profile, onSelectLand, onStudyHall, onMyProfile }) {
  const unlockedLand = profile.currentLand || 1;

  const levelColors = {
    "Beginner":      { bg:"#FEF3C7", accent:"#F59E0B", text:"#92400E" },
    "Checkpoint":    { bg:"#EDE9FE", accent:"#7C3AED", text:"#4C1D95" },
    "Intermediate":  { bg:"#DBEAFE", accent:"#2563EB", text:"#1E3A5F" },
    "Advanced":      { bg:"#D1FAE5", accent:"#10B981", text:"#064E3B" },
    "Final Boss":    { bg:"#FEE2E2", accent:"#EF4444", text:"#7F1D1D" },
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg, #1C0A4A, #2D1B69)`, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:profile.color||T.purple, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
          {profile.avatar||"🌟"}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, color:"white", ...DS }}>{profile.name}</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>⭐ {profile.stars||0} stars</div>
        </div>
        <button onClick={onStudyHall} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 12px", color:"white", cursor:"pointer", fontSize:13, ...DS }}>
          📚 Study Hall
        </button>
        <button onClick={onMyProfile} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 12px", color:"white", cursor:"pointer", fontSize:13 }}>
          👤
        </button>
      </div>

      {/* Map title */}
      <div style={{ padding:"16px 16px 8px", textAlign:"center" }}>
        <div style={{ fontSize:11, color:T.textSoft, letterSpacing:3, fontWeight:700, marginBottom:4 }}>YOUR ADVENTURE PATH</div>
        <div style={{ fontSize:22, color:T.text, ...DS }}>The Spanish Speaking World 🌍</div>
      </div>

      {/* Lands grid */}
      <div style={{ flex:1, overflowY:"auto", padding:"8px 14px 100px" }}>
        {["Beginner","Checkpoint","Intermediate","Checkpoint","Advanced","Final Boss"].map((levelGroup, gi) => {
          const groupLands = LANDS.filter(l => {
            if (levelGroup === "Checkpoint") {
              return l.level === "Checkpoint" && (gi === 1 ? l.id <= 11 : l.id <= 19);
            }
            return l.level === levelGroup;
          });
          if (!groupLands.length) return null;
          const lc = levelColors[levelGroup] || levelColors["Beginner"];

          return (
            <div key={gi} style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:lc.text, fontWeight:800, letterSpacing:2, marginBottom:8, paddingLeft:4 }}>
                {levelGroup === "Checkpoint" ? "⭐ CHECKPOINT" : levelGroup.toUpperCase()}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {groupLands.map(land => {
                  const unlocked = land.id <= unlockedLand;
                  const current  = land.id === unlockedLand;
                  const done     = land.id < unlockedLand;

                  return (
                    <button key={land.id} onClick={()=>unlocked&&onSelectLand(land)}
                      style={{
                        width:"100%", padding:"14px 16px", borderRadius:18,
                        background: done ? `${land.color}20` : current ? "white" : "rgba(0,0,0,0.04)",
                        border: current ? `3px solid ${land.color}` : done ? `2px solid ${land.color}40` : "2px solid rgba(0,0,0,0.08)",
                        cursor: unlocked?"pointer":"default",
                        display:"flex", alignItems:"center", gap:12, textAlign:"left",
                        boxShadow: current ? `0 4px 20px ${land.color}30` : "none",
                        opacity: unlocked?1:0.4,
                        transition:"all 0.2s"
                      }}>
                      <div style={{
                        width:48, height:48, borderRadius:14,
                        background: done?land.color:current?land.color:"rgba(0,0,0,0.06)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:22, flexShrink:0
                      }}>
                        {done ? "✅" : unlocked ? land.emoji : "🔒"}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:15, color: unlocked?T.text:"#9CA3AF", ...DS }}>{land.name}</span>
                          {current && <span style={{ fontSize:10, background:land.color, color:"white", borderRadius:8, padding:"2px 8px", fontWeight:800 }}>CURRENT</span>}
                        </div>
                        <div style={{ fontSize:11, color:T.textSoft, marginTop:2 }}>
                          Land {land.id} · {land.region}
                        </div>
                      </div>
                      {unlocked && <div style={{ fontSize:20, color:land.color }}>›</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"white", borderTop:"1px solid rgba(0,0,0,0.08)", display:"flex", padding:"10px 0 16px" }}>
        {[
          { icon:"🗺️", label:"Map",         action:null },
          { icon:"📚", label:"Study Hall",   action:onStudyHall },
          { icon:"👤", label:"My Profile",   action:onMyProfile },
        ].map(({icon,label,action}) => (
          <button key={label} onClick={action||undefined} style={{ flex:1, background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:action?"pointer":"default", opacity:action?1:0.5 }}>
            <span style={{ fontSize:22 }}>{icon}</span>
            <span style={{ fontSize:10, color:T.textSoft, fontWeight:700 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ══ LAND INTRO SCREEN ═════════════════════════════════════════════
function LandIntroScreen({ land, profile, onBack, onStartLesson }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, ${land.color}20, white)`, display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <div style={{ background:land.color, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:12, padding:"8px 12px", color:"white", cursor:"pointer", fontSize:20 }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:2, fontWeight:700 }}>LAND {land.id}</div>
          <div style={{ fontSize:20, color:"white", ...DS }}>{land.emoji} {land.name}</div>
        </div>
      </div>

      <div style={{ flex:1, padding:"24px 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        {/* Land icon big */}
        <div style={{ width:100, height:100, borderRadius:28, background:land.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:48, marginBottom:16, boxShadow:`0 8px 32px ${land.color}40` }}>
          {land.emoji}
        </div>

        <div style={{ fontSize:28, color:T.text, ...DS, marginBottom:4, textAlign:"center" }}>{land.name}</div>
        <div style={{ fontSize:14, color:T.textSoft, marginBottom:24, textAlign:"center" }}>{land.region} · {land.level}</div>

        {/* Characters appear */}
        <div style={{ display:"flex", gap:16, marginBottom:24, alignItems:"flex-end" }}>
          <img src="/characters/grayson.png" style={{ height:100, filter:`drop-shadow(0 4px 12px ${T.purple}40)` }} alt="Grayson" onError={e=>e.target.style.display='none'}/>
          <img src="/characters/peyton.png"  style={{ height:86,  filter:`drop-shadow(0 4px 12px ${T.blue}40)` }}   alt="Peyton"  onError={e=>e.target.style.display='none'}/>
        </div>

        <div style={{ background:"white", borderRadius:20, padding:"16px 20px", marginBottom:24, width:"100%", maxWidth:380, boxShadow:`0 4px 20px ${land.color}20`, border:`2px solid ${land.color}20` }}>
          <div style={{ fontSize:13, fontWeight:800, color:land.color, marginBottom:6 }}>GRAYSON SAYS:</div>
          <div style={{ fontSize:14, color:T.text, lineHeight:1.6 }}>
            Ready to explore {land.name}? Let's learn some Spanish together! This land has fun games, silly stories, and a boss challenge at the end. ¡Vámonos!
          </div>
          <button onClick={()=>speakEn(`Ready to explore ${land.name}? Let's learn some Spanish together!`)} style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, background:`${land.color}15`, border:`1px solid ${land.color}30`, borderRadius:10, padding:"6px 12px", cursor:"pointer", fontSize:12, color:land.color, fontWeight:700, fontFamily:"inherit" }}>
            🔊 Hear this
          </button>
        </div>

        <button onClick={onStartLesson} style={{
          width:"100%", maxWidth:380, padding:"18px", borderRadius:20,
          background:`linear-gradient(135deg, ${land.color}, ${land.color}CC)`,
          border:"none", color:"white", fontSize:18, cursor:"pointer", ...DS,
          boxShadow:`0 8px 24px ${land.color}40`
        }}>
          Start Adventure! {land.emoji}
        </button>
      </div>
    </div>
  );
}

// ══ STUDY HALL SCREEN ═════════════════════════════════════════════
function StudyHallScreen({ profile, onBack }) {
  const sections = [
    { icon:"🃏", label:"Flashcard Sets",      desc:"Practice by land or category",     color:"#E8445A", available:true  },
    { icon:"🔖", label:"Bookmarks",           desc:"Words you saved for review",       color:"#F97316", available:true  },
    { icon:"🎯", label:"Randomized Quiz",     desc:"Mixed review from all your lands", color:"#10B981", available:true  },
    { icon:"⚡", label:"Verbs and Grammar",   desc:"Conjugation, patterns, lessons",   color:"#7C3AED", available:true  },
    { icon:"🤖", label:"AI Tutor",            desc:"Wander Lingo Plus — coming soon!", color:"#F59E0B", available:false },
  ];

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <div style={{ background:"rgba(255,255,255,0.05)", padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 12px", color:"white", cursor:"pointer", fontSize:20 }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:2, fontWeight:700 }}>THE SERIOUS SECTION</div>
          <div style={{ fontSize:20, color:"white", ...DS }}>📚 Study Hall</div>
        </div>
      </div>

      <div style={{ flex:1, padding:"20px 16px", display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <img src="/characters/grayson.png" style={{ height:70, filter:"drop-shadow(0 4px 12px rgba(124,58,237,0.4))" }} alt="Grayson" onError={e=>e.target.style.display='none'}/>
          <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:16, padding:"12px 14px", flex:1 }}>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", lineHeight:1.5 }}>
              This is where the serious learning lives. Flashcards, grammar, conjugation — all the good stuff. En mi opinión it's worth it.
            </div>
          </div>
        </div>

        {sections.map((s,i) => (
          <button key={i} style={{
            width:"100%", padding:"18px", borderRadius:18,
            background: s.available?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.04)",
            border:`2px solid ${s.available?s.color+"40":"rgba(255,255,255,0.1)"}`,
            cursor: s.available?"pointer":"default",
            display:"flex", alignItems:"center", gap:14, textAlign:"left",
            opacity: s.available?1:0.5
          }}>
            <div style={{ width:48, height:48, borderRadius:14, background:`${s.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
              {s.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, color:"white", ...DS }}>{s.label}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{s.desc}</div>
            </div>
            {s.available && <div style={{ fontSize:20, color:s.color }}>›</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══ MY PROFILE SCREEN ═════════════════════════════════════════════
function MyProfileScreen({ profile, familyCode, familyName, onBack, onEditProfile }) {
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg, #1C0A4A, #2D1B69)`, display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');`}</style>
      <div style={{ background:"rgba(255,255,255,0.05)", padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:12, padding:"8px 12px", color:"white", cursor:"pointer", fontSize:20 }}>←</button>
        <div style={{ fontSize:20, color:"white", ...DS }}>My Profile</div>
      </div>
      <div style={{ flex:1, padding:"24px 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:90, height:90, borderRadius:"50%", background:profile.color||T.purple, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, marginBottom:12, boxShadow:`0 8px 24px ${profile.color||T.purple}50` }}>
          {profile.avatar||"🌟"}
        </div>
        <div style={{ fontSize:26, color:"white", ...DS, marginBottom:4 }}>{profile.name}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>Explorer · {profile.level||"Beginner"}</div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, width:"100%", maxWidth:360, marginBottom:24 }}>
          {[
            { label:"Stars",    value:profile.stars||0,       icon:"⭐" },
            { label:"Land",     value:profile.currentLand||1, icon:"🗺️" },
            { label:"Streak",   value:profile.streak||0,      icon:"🔥" },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.08)", borderRadius:16, padding:"14px 10px", textAlign:"center" }}>
              <div style={{ fontSize:24 }}>{s.icon}</div>
              <div style={{ fontSize:22, color:"white", ...DS }}>{s.value}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Family code */}
        <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:18, padding:"16px 20px", width:"100%", maxWidth:360, marginBottom:16 }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:700, marginBottom:4 }}>FAMILY</div>
          <div style={{ fontSize:18, color:"white", ...DS }}>{familyName}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"6px 14px", fontSize:18, color:T.goldL, letterSpacing:3, fontWeight:900 }}>{familyCode}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>Share this code with your family!</div>
          </div>
        </div>

        <button onClick={onEditProfile} style={{ width:"100%", maxWidth:360, padding:14, borderRadius:16, background:"rgba(255,255,255,0.1)", border:"2px solid rgba(255,255,255,0.2)", color:"white", fontSize:15, cursor:"pointer", ...DS }}>
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}

// ══ MAIN APP ══════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen]         = useState("opening");
  const [familyId, setFamilyId]     = useState(null);
  const [familyCode, setFamilyCode] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [profiles, setProfiles]     = useState([]);
  const [profile, setProfile]       = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);
  const [loading, setLoading]       = useState(false);

  // Load family from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wl_family");
    if (saved) {
      const { id, code, name } = JSON.parse(saved);
      setFamilyId(id); setFamilyCode(code); setFamilyName(name);
      loadProfiles(id);
      setScreen("profiles");
    }
  }, []);

  const loadProfiles = async (fid) => {
    const { data } = await sb.from("profiles").select("*").eq("familyId", fid).order("created_at");
    setProfiles(data || []);
  };

  const handleFamilyDone = (id, code, name) => {
    setFamilyId(id); setFamilyCode(code); setFamilyName(name);
    localStorage.setItem("wl_family", JSON.stringify({ id, code, name }));
    loadProfiles(id);
    setScreen("profiles");
  };

  const handleSelectProfile = (p) => {
    setProfile(p);
    setScreen("map");
  };

  const handleCreateProfile = async (name, avatar, color) => {
    const { data } = await sb.from("profiles").insert({ familyId, name, avatar, color, stars:0, currentLand:1, streak:0 }).select().single();
    if (data) { await loadProfiles(familyId); setScreen("profiles"); }
  };

  const handleSelectLand = (land) => {
    setSelectedLand(land);
    setScreen("landIntro");
  };

  if (screen === "opening")   return <OpeningScreen onEnter={()=>setScreen(familyId?"profiles":"family")}/>;
  if (screen === "family")    return <FamilySetupScreen onDone={handleFamilyDone}/>;
  if (screen === "profiles")  return <ProfileSelectScreen profiles={profiles} familyName={familyName} familyCode={familyCode} onSelect={handleSelectProfile} onCreate={()=>setScreen("createProfile")}/>;
  if (screen === "createProfile") return <CreateProfileScreen onDone={handleCreateProfile} onBack={()=>setScreen("profiles")}/>;
  if (screen === "map")       return <AdventureMap profile={profile} onSelectLand={handleSelectLand} onStudyHall={()=>setScreen("studyHall")} onMyProfile={()=>setScreen("myProfile")}/>;
  if (screen === "landIntro") return <LandIntroScreen land={selectedLand} profile={profile} onBack={()=>setScreen("map")} onStartLesson={()=>setScreen("map")}/>;
  if (screen === "studyHall") return <StudyHallScreen profile={profile} onBack={()=>setScreen("map")}/>;
  if (screen === "myProfile") return <MyProfileScreen profile={profile} familyCode={familyCode} familyName={familyName} onBack={()=>setScreen("map")} onEditProfile={()=>setScreen("map")}/>;

  return null;
}
