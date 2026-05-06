import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
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
import { SwitchFamilyScreen, ManageFamilyScreen, VerbChartScreen, ConjugationPractice, GrammarLessonScreen, ConjugationScreen } from './AppC.jsx';
import { ProfileSelectScreen, CreateProfileScreen, HomeScreen, LearnScreen, DailyScreen, LeaderboardScreen, MyProfileScreen } from './AppD.jsx';

export default function App(){
  const[profiles,setProfiles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[screen,setScreen]=useState("select");
  const[activeId,setActiveId]=useState(null);
  const[learnCat,setLearnCat]=useState("greetings");
  const[learnCatLv,setLearnCatLv]=useState(1);
  const[activeStory,setActiveStory]=useState(null);
  const[familyReady,setFamilyReady]=useState(!!getFamilyId());
  const[examLevel,setExamLevel]=useState(1);
  const[conjLevel,setConjLevel]=useState(1);
  const[celebration,setCelebration]=useState(null);
  const[confirmDelete,setConfirmDelete]=useState(false); // {catLabel, color}
  const[familyCode,setFamilyCode]=useState(null);
  const[showReview,setShowReview]=useState(false);
  const profile=profiles.find(p=>p.id===activeId)||null;

  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap";
    link.rel="stylesheet";document.head.appendChild(link);
    const style=document.createElement("style");
    style.textContent="*{box-sizing:border-box}button:active{opacity:.88}::-webkit-scrollbar{display:none}input:focus{outline:none}";
    document.head.appendChild(style);
    findVoices();
    if(window.speechSynthesis){window.speechSynthesis.onvoiceschanged=findVoices;[300,1000,2500].forEach(ms=>setTimeout(findVoices,ms));}
    loadProfiles().then(ps=>{setProfiles(ps);setLoading(false);});
    const fid=getFamilyId();
    if(fid){db.from('families').select('code').eq('id',fid).single().then(({data})=>{if(data)setFamilyCode(data.code);});}
  },[]);

  const persist = async (updated) => {
    setProfiles(updated);
    for (const p of updated) { await saveProfile(p); }
  };
  const updateProfile = async (id, changes) => {
    const updated = profiles.map(p => {
      if (p.id !== id) return p;
      const merged = { ...p, ...changes };
      merged.badges = calcBadges(merged);
      return merged;
    });
    setProfiles(updated);
    const changed = updated.find(p => p.id === id);
    if (changed) await saveProfile(changed);
  };

  const handleSelect=async p=>{
    const d=todayStr(),yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    let streak=p.streak||0;
    if(p.lastDate===d){}else if(p.lastDate===yesterday){streak+=1;}else{streak=1;}
    const longestStreak=Math.max(p.longestStreak||0,streak);
    const updated={...p,streak,longestStreak,lastDate:d,badges:calcBadges({...p,streak})};
    await persist(profiles.map(x=>x.id===p.id?updated:x));
    setActiveId(p.id);
    // Load fresh from Supabase to get latest missedWords and bookmarked
    const freshProfiles = await loadProfiles();
    const freshP = freshProfiles.find(x=>x.id===updated.id)||updated;
    const missedCount = Object.keys(freshP.missedWords||{}).length;
    const bookmarkCount = (freshP.bookmarked||[]).length;
    setProfiles(freshProfiles);
    setScreen((missedCount>0||bookmarkCount>0)?"review":"home");
  };

  const handleCreate=async(name,avatar,color)=>{
    const p=createProfile(name,avatar,color);
    await persist([...profiles,p]);setActiveId(p.id);setScreen("home");
  };

  const handleEarn=async amount=>{
    if(!activeId||!profile)return;
    await updateProfile(activeId,{stars:profile.stars+amount});
  };

  const handleStat=async type=>{
    if(!activeId||!profile)return;
    const changes={};
    if(type==="quiz")changes.quizCorrect=(profile.quizCorrect||0)+1;
    if(type==="speak")changes.speakAttempts=(profile.speakAttempts||0)+1;
    if(type==="match")changes.matchWins=(profile.matchWins||0)+1;
    await updateProfile(activeId,changes);
  };

  const handleLearn=async(catKey,catLevel)=>{
    if(!profile)return;
    const cats=[...new Set([...(profile.catsPlayed||[]),`${catLevel}_${catKey}`])];
    await updateProfile(activeId,{catsPlayed:cats});
    setLearnCat(catKey);setLearnCatLv(catLevel);setScreen("learn");
  };

  const handleLevelChange=async lv=>{
    if(!activeId||!profile)return;
    await updateProfile(activeId,{level:lv});
  };

  const handleCatProgress=async(catKey,catLevel,stars)=>{
    if(!activeId||!profile)return;
    const newProgress=setCatProgress(profile,catKey,catLevel,stars);
    if(JSON.stringify(newProgress)===JSON.stringify(profile.catProgress||{}))return;
    await updateProfile(activeId,{catProgress:newProgress});
    // Trigger celebration when a category hits 3 stars for first time
    if(stars>=3){
      const vocab=catLevel>=3?VOCAB_L3:catLevel>=2?VOCAB_L2:VOCAB_L1;
      const cat=vocab[catKey];
      if(cat)setCelebration({catLabel:cat.label,icon:cat.icon,color:cat.color});
    }
  };

  const handleDailyComplete=async score=>{
    if(!profile)return;
    const d=todayStr();
    const dailyScores={...(profile.dailyScores||{}),[d]:score};
    await updateProfile(activeId,{stars:profile.stars+(score*3),dailyDone:(profile.dailyDone||0)+1,dailyScores});
    setScreen("home");
  };

  // Bookmark a word for extra review
  const handleBookmark=async(word)=>{
    if(!activeId||!profile)return;
    const bm=profile.bookmarked||[];
    const newBm=bm.includes(word.es)?bm.filter(w=>w!==word.es):[...bm,word.es];
    await updateProfile(activeId,{bookmarked:newBm});
  };

  // Track Say It successes per category (needed for 3-star requirement)
  const handleSayItAttempt=async(catKey,catLevel)=>{
    if(!activeId||!profile)return;
    const key=`${catLevel}_${catKey}`;
    const current=(profile.catSayIt||{})[key]||0;
    await updateProfile(activeId,{catSayIt:{...(profile.catSayIt||{}),[key]:current+1}});
  };

  const handleDeleteProfile=async()=>{
    if(!activeId)return;
    await db.from('players').delete().eq('id',activeId);
    setProfiles(p=>p.filter(x=>x.id!==activeId));
    setActiveId(null);setScreen("select");setConfirmDelete(false);
  };

  const handleMemberRemoved=(removedId)=>{
    setProfiles(p=>p.filter(x=>x.id!==removedId));
  };

  const handleFamilySwitch=()=>{
    setProfiles([]);setActiveId(null);
    loadProfiles().then(ps=>setProfiles(ps));
    setScreen("select");
  };

  const handleExamPass=async(level)=>{
    if(!activeId||!profile)return;
    await updateProfile(activeId,{level:Math.min(level+1,3)});
    setScreen("home");
  };
  const handleSaveProfile=async(name,avatar,color)=>{
    if(!activeId||!profile)return;
    await updateProfile(activeId,{name,avatar,color});
    setScreen("myprofile");
  };
  // Used by daily review — one correct answer clears the word completely
  const handleReviewCorrect=async(word)=>{
    if(!activeId||!profile)return;
    const missed={...(profile.missedWords||{})};
    delete missed[word.es];
    await updateProfile(activeId,{missedWords:missed});
  };

  const handleWordResult=async(word,correct)=>{
    if(!activeId||!profile)return;
    const missed={...(profile.missedWords||{})};
    const key=word.es;
    if(!correct){missed[key]={count:(missed[key]?.count||0)+1,lastMissed:todayStr()};}
    else if(missed[key]){const nc=Math.max(0,(missed[key].count||1)-1);if(nc===0)delete missed[key];else missed[key]={...missed[key],count:nc};}
    await updateProfile(activeId,{missedWords:missed});
  };
  const handleStoryComplete=async()=>{
    if(!profile)return;
    await updateProfile(activeId,{storiesRead:(profile.storiesRead||0)+1,stars:profile.stars+5});
    setScreen("stories");
  };

  if(loading)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{fontSize:64}}>🌍</div>
      <div style={{fontSize:30,color:"white",marginTop:12,...DS}}>Wander Lingo</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,.5)",marginTop:8}}>Loading your adventure...</div>
    </div>
  );

  const dailyDone=profile?(profile.dailyScores||{})[todayStr()]!==undefined:false;

  return(
    <div style={{fontFamily:"'Nunito',sans-serif"}}>
      {!familyReady&&<FamilySetupScreen onDone={()=>{
        setFamilyReady(true);
        loadProfiles().then(ps=>setProfiles(ps));
      }}/>}
      {familyReady&&screen==="select"    &&<ProfileSelectScreen profiles={profiles} onSelect={handleSelect} onCreate={()=>setScreen("create")}/>}
      {familyReady&&screen==="create"    &&<CreateProfileScreen onDone={handleCreate} onBack={()=>setScreen("select")}/>}
      {familyReady&&screen==="home"      &&profile&&<HomeScreen profile={profile} onLearn={handleLearn} onDaily={()=>setScreen("daily")} onBoard={()=>setScreen("board")} onMyProfile={()=>setScreen("myprofile")} onSwitch={()=>setScreen("select")} onLevelChange={handleLevelChange} onStories={()=>setScreen("stories")} onCore={()=>setScreen("core")} onConjugation={()=>setScreen("conjugation")} onExam={(lv)=>{setExamLevel(lv);setScreen("exam");}} onExamPrompt={(lv)=>{setExamLevel(lv);setScreen("exam");}} onShowStarInfo={()=>{}} dailyDone={dailyDone}/>}
      {familyReady&&screen==="learn"     &&profile&&<LearnScreen catKey={learnCat} catLevel={learnCatLv} profile={profile} onBack={()=>setScreen("home")} onEarn={handleEarn} onStat={handleStat} onWordResult={handleWordResult} onBookmark={handleBookmark} onSayItAttempt={handleSayItAttempt} onCatProgress={handleCatProgress}/>}
      {familyReady&&screen==="daily"     &&profile&&<DailyScreen profile={profile} onBack={()=>setScreen("home")} onComplete={handleDailyComplete}/>}
      {familyReady&&screen==="board"     &&<LeaderboardScreen profiles={profiles} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="myprofile" &&profile&&<MyProfileScreen profile={profile} familyCode={familyCode} onBack={()=>setScreen("home")} onEdit={()=>setScreen("editprofile")} onSwitchFamily={()=>setScreen("switchfamily")} onManageMembers={()=>setScreen("managemembers")}/>}
      {familyReady&&screen==="review"    &&profile&&<DailyReviewScreen profile={profile} onComplete={()=>setScreen("home")} onBookmark={handleBookmark} onWordResult={handleReviewCorrect}/>}
      {familyReady&&screen==="exam"       &&profile&&<LevelExamScreen level={examLevel} profile={profile} onBack={()=>setScreen("home")} onPass={handleExamPass}/>}
      {familyReady&&screen==="switchfamily" &&<SwitchFamilyScreen onSwitch={handleFamilySwitch} onBack={()=>setScreen("myprofile")}/>}
      {familyReady&&screen==="managemembers"&&profile&&<ManageFamilyScreen profile={profile} profiles={profiles} onBack={()=>setScreen("myprofile")} onMemberRemoved={handleMemberRemoved}/>}
      {familyReady&&screen==="conjugation" &&profile&&<ConjugationScreen onBack={()=>setScreen("home")} profile={profile} onEarn={handleEarn}/>}
      {familyReady&&screen==="core"                   &&<CoreWordsScreen onBack={()=>setScreen("home")} profile={profile}/>}
      {familyReady&&screen==="editprofile"&&profile&&<EditProfileScreen profile={profile} familyCode={familyCode} onSave={handleSaveProfile} onBack={()=>setScreen("myprofile")} onDelete={()=>setConfirmDelete(true)}/>}
      {familyReady&&screen==="stories"   &&<StoryListScreen onBack={()=>setScreen("home")} onStory={s=>{setActiveStory(s);setScreen("story");}} profile={profile}/>}
      {familyReady&&screen==="story"     &&activeStory&&<StoryScreen story={activeStory} onBack={()=>setScreen("stories")} onComplete={handleStoryComplete}/>}
      {/* Delete profile confirmation */}
      {confirmDelete&&(
        <div onClick={()=>setConfirmDelete(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:1001,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{textAlign:"center",background:"#1E293B",borderRadius:24,padding:32,width:"100%",maxWidth:360,border:"2px solid rgba(239,68,68,.4)"}}>
            <div style={{fontSize:48,marginBottom:12}}>⚠️</div>
            <div style={{fontSize:20,color:"white",fontWeight:800,marginBottom:8}}>Delete Profile?</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,.6)",marginBottom:24,lineHeight:1.5}}>This permanently deletes all your stars, badges, and progress. This cannot be undone.</div>
            <div style={{display:"flex",gap:10}}>
              <ActionBtn onClick={()=>setConfirmDelete(false)} bg="rgba(255,255,255,.1)" style={{flex:1,padding:13}}>Cancel</ActionBtn>
              <ActionBtn onClick={handleDeleteProfile} bg="#EF4444" style={{flex:1,padding:13}}>Yes, Delete</ActionBtn>
            </div>
          </div>
        </div>
      )}
      {/* Category complete celebration overlay */}
      {celebration&&(
        <div onClick={()=>setCelebration(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}} >
          <div style={{textAlign:"center",background:"rgba(255,255,255,.1)",backdropFilter:"blur(20px)",borderRadius:32,padding:"40px 32px",width:"100%",maxWidth:360,border:`2px solid ${celebration.color}`}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:72,marginBottom:8}}>{celebration.icon}</div>
            <div style={{fontSize:13,fontWeight:800,color:celebration.color,letterSpacing:1,marginBottom:6}}>CATEGORY COMPLETE!</div>
            <div style={{fontSize:28,color:"white",fontWeight:900,marginBottom:4}}>{celebration.catLabel}</div>
            <div style={{display:"flex",justifyContent:"center",gap:6,fontSize:36,marginBottom:16}}>⭐⭐⭐</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginBottom:24}}>You've mastered this category! The next one is now unlocked.</div>
            <button onClick={()=>setCelebration(null)} style={{width:"100%",padding:"14px",borderRadius:18,background:celebration.color,border:"none",color:"white",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Keep Going!</button>
          </div>
        </div>
      )}
    </div>
  );
}
