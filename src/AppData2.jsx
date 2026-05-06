// ══ AppData2.jsx — Stories, Config, Conjugation, Grammar ══════
import { VOCAB_L1, VOCAB_L2, VOCAB_L3, ALL_WORDS_L1, ALL_WORDS_L2, ALL_WORDS_L3 } from "./AppData1.jsx";

// ══ STORY MODE DATA — set in Cuenca, full audio on every line ════════════════
export const STORIES = [
  {
    id:"cafe",
    title:"Un Café en Cuenca",
    titleEn:"A Café in Cuenca",
    emoji:"☕",
    color:"#DC6B19",
    panels:[
      {scene:"You walk into a cozy café in the center of Cuenca.", sceneEs:"Entran a una cafetería bonita en Cuenca."},
      {speaker:"Leanne",  avatar:"🌺", es:"Buenos días. ¿Tienen una mesa para dos?",    en:"Good morning. Do you have a table for two?"},
      {speaker:"Waiter",  avatar:"👨", es:"¡Claro que sí! Por aquí, por favor.",        en:"Of course! Right this way, please."},
      {scene:"You sit down and look at the menu.", sceneEs:"Se sientan y miran el menú."},
      {speaker:"Grayson", avatar:"🦁", es:"Mamá, ¿qué es esto?",                        en:"Mom, what is this?"},
      {speaker:"Leanne",  avatar:"🌺", es:"Es el menú, mi amor. Mira los precios.",     en:"It's the menu, my love. Look at the prices."},
      {speaker:"Waiter",  avatar:"👨", es:"¿Qué desean ordenar?",                       en:"What would you like to order?"},
      {speaker:"Leanne",  avatar:"🌺", es:"Un café con leche, por favor.",              en:"A coffee with milk, please."},
      {speaker:"Grayson", avatar:"🦁", es:"Y yo quiero un jugo de naranja.",            en:"And I want an orange juice."},
      {speaker:"Waiter",  avatar:"👨", es:"¡Perfecto! Ya les traigo.",                  en:"Perfect! I'll bring it right out."},
      {scene:"After enjoying your drinks!", sceneEs:"¡Después de disfrutar sus bebidas!"},
      {speaker:"Leanne",  avatar:"🌺", es:"Disculpe, la cuenta por favor.",             en:"Excuse me, the check please."},
      {speaker:"Waiter",  avatar:"👨", es:"Son cuatro dólares con cincuenta.",          en:"That's four dollars and fifty cents."},
      {speaker:"Leanne",  avatar:"🌺", es:"Gracias, ¡muy amable!",                     en:"Thank you, very kind!"},
      {speaker:"Waiter",  avatar:"👨", es:"¡Hasta luego! ¡Que tengan un buen día!",    en:"See you later! Have a great day!"},
    ]
  },
  {
    id:"market",
    title:"En el Mercado",
    titleEn:"At the Market",
    emoji:"🛒",
    color:"#10B981",
    panels:[
      {scene:"You arrive at the colorful Cuenca market — flowers, fruit, and food everywhere!", sceneEs:"Llegan al mercado de Cuenca — flores, frutas y comida por todas partes."},
      {speaker:"Victor",  avatar:"🗺️", es:"¡Miren qué frutas tan bonitas!",            en:"Look at these beautiful fruits!"},
      {speaker:"Peyton",  avatar:"🦋", es:"Papá, ¿qué es eso rojo?",                  en:"Dad, what is that red thing?"},
      {speaker:"Victor",  avatar:"🗺️", es:"Es una manzana, Peyton. ¡Es roja!",        en:"It's an apple, Peyton. It's red!"},
      {speaker:"Vendor",  avatar:"👩", es:"Buenos días, ¿qué desean?",                 en:"Good morning, what do you need?"},
      {speaker:"Victor",  avatar:"🗺️", es:"¿Cuánto cuestan las naranjas?",            en:"How much do the oranges cost?"},
      {speaker:"Vendor",  avatar:"👩", es:"Son cincuenta centavos cada una.",          en:"They're fifty cents each."},
      {speaker:"Victor",  avatar:"🗺️", es:"Me llevo seis, por favor.",                en:"I'll take six, please."},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Papá, quiero helado!",                    en:"Dad, I want ice cream!"},
      {speaker:"Victor",  avatar:"🗺️", es:"Primero las frutas. ¡Por favor, Peyton!",  en:"Fruit first. Please, Peyton!"},
      {speaker:"Vendor",  avatar:"👩", es:"¡Qué niña tan bonita!",                    en:"What a beautiful girl!"},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Gracias! Me llamo Peyton.",               en:"Thank you! My name is Peyton."},
      {speaker:"Vendor",  avatar:"👩", es:"¡Mucho gusto, Peyton! ¡Qué nombre tan bonito!",en:"Nice to meet you, Peyton! What a pretty name!"},
      {speaker:"Victor",  avatar:"🗺️", es:"¡Gracias! ¡Hasta luego!",                 en:"Thank you! See you later!"},
    ]
  },
  {
    id:"friend",
    title:"Una Nueva Amiga",
    titleEn:"A New Friend",
    emoji:"👫",
    color:"#8B5CF6",
    panels:[
      {scene:"Grayson is playing in a park in Cuenca when a local girl walks over.", sceneEs:"Grayson juega en un parque cuando una niña se acerca."},
      {speaker:"Sofía",   avatar:"🌸", es:"¡Hola! ¿Cómo te llamas?",                  en:"Hi! What's your name?"},
      {speaker:"Grayson", avatar:"🦁", es:"Me llamo Grayson. ¿Y tú?",                 en:"My name is Grayson. And you?"},
      {speaker:"Sofía",   avatar:"🌸", es:"Me llamo Sofía. ¡Mucho gusto!",            en:"My name is Sofía. Nice to meet you!"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Mucho gusto, Sofía!",                     en:"Nice to meet you too, Sofía!"},
      {speaker:"Sofía",   avatar:"🌸", es:"¿De dónde eres?",                          en:"Where are you from?"},
      {speaker:"Grayson", avatar:"🦁", es:"Soy de Florida, en los Estados Unidos.",   en:"I'm from Florida, in the United States."},
      {speaker:"Sofía",   avatar:"🌸", es:"¡Qué interesante! ¿Te gusta Cuenca?",      en:"How interesting! Do you like Cuenca?"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Sí! Me gusta mucho. Es muy bonita.",      en:"Yes! I like it a lot. It's very beautiful."},
      {speaker:"Sofía",   avatar:"🌸", es:"¿Quieres jugar conmigo?",                  en:"Do you want to play with me?"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Sí, por favor! ¿Cómo se juega?",         en:"Yes please! How do you play?"},
      {scene:"They play together and laugh for a long time.", sceneEs:"Juegan juntas y se ríen mucho."},
      {speaker:"Grayson", avatar:"🦁", es:"¡Esto es muy divertido!",                  en:"This is so much fun!"},
      {speaker:"Sofía",   avatar:"🌸", es:"¡Sí! ¡Eres mi nueva amiga, Grayson!",     en:"Yes! You're my new friend, Grayson!"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Y tú eres mi amiga también, Sofía!",     en:"And you're my friend too, Sofía!"},
    ]
  },
  {
    id:"directions",
    title:"¿Dónde Está?",
    titleEn:"Where Is It?",
    emoji:"🗺️",
    color:"#E8445A",
    panels:[
      {scene:"Leanne is on a street in Cuenca and is a little lost!", sceneEs:"Leanne está en una calle de Cuenca y está un poco perdida."},
      {speaker:"Leanne",  avatar:"🌺", es:"Disculpe, señor. ¿Me puede ayudar?",       en:"Excuse me, sir. Can you help me?"},
      {speaker:"Man",     avatar:"👴", es:"¡Claro! ¿En qué le puedo ayudar?",         en:"Of course! How can I help you?"},
      {speaker:"Leanne",  avatar:"🌺", es:"¿Dónde está el mercado, por favor?",       en:"Where is the market, please?"},
      {speaker:"Man",     avatar:"👴", es:"Es fácil. Camine todo recto.",             en:"It's easy. Walk straight ahead."},
      {speaker:"Man",     avatar:"👴", es:"Luego doble a la derecha.",                en:"Then turn to the right."},
      {speaker:"Leanne",  avatar:"🌺", es:"¿Está lejos?",                            en:"Is it far?"},
      {speaker:"Man",     avatar:"👴", es:"No, está muy cerca. Solo cinco minutos.",  en:"No, it's very close. Only five minutes."},
      {speaker:"Leanne",  avatar:"🌺", es:"Más despacio, por favor. No hablo español bien.",en:"More slowly, please. I don't speak Spanish well."},
      {speaker:"Man",     avatar:"👴", es:"¡No hay problema! Hablo más despacio.",    en:"No problem! I'll speak more slowly."},
      {speaker:"Man",     avatar:"👴", es:"Todo recto, luego a la derecha. ¡Muy cerca!",en:"Straight ahead, then to the right. Very close!"},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Entendí! ¡Muchísimas gracias!",          en:"I understood! Thank you so very much!"},
      {speaker:"Man",     avatar:"👴", es:"¡De nada! ¡Que le vaya bien!",            en:"You're welcome! Have a great day!"},
    ]
  },
  {
    id:"negotiating",
    title:"¡Qué Precio Tan Caro!",
    titleEn:"What an Expensive Price! (Intermediate)",
    emoji:"💰",
    color:"#065F46",
    panels:[
      {scene:"Leanne is shopping at the artisan market in Cuenca for a handmade bag.", sceneEs:"Leanne está en el mercado artesanal de Cuenca buscando una bolsa hecha a mano."},
      {speaker:"Leanne",  avatar:"🌺", es:"Disculpe, ¿cuánto cuesta esta bolsa?",        en:"Excuse me, how much does this bag cost?"},
      {speaker:"Vendor",  avatar:"👩", es:"Cuesta cuarenta dólares, señora.",             en:"It costs forty dollars, ma'am."},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Ay, es muy caro! ¿Puede bajar el precio?",   en:"Oh, that's very expensive! Can you lower the price?"},
      {speaker:"Vendor",  avatar:"👩", es:"Es hecha a mano. Mucho trabajo.",              en:"It's handmade. A lot of work."},
      {speaker:"Leanne",  avatar:"🌺", es:"Entiendo. ¿Cuánto es su mejor precio?",       en:"I understand. What is your best price?"},
      {speaker:"Vendor",  avatar:"👩", es:"Para usted, treinta y cinco dólares.",         en:"For you, thirty-five dollars."},
      {speaker:"Leanne",  avatar:"🌺", es:"Mmm. ¿Tiene cambio de treinta dólares?",      en:"Hmm. Do you have change for thirty dollars?"},
      {speaker:"Vendor",  avatar:"👩", es:"Sí, tengo cambio. ¿Quiere la bolsa por treinta?", en:"Yes, I have change. Do you want the bag for thirty?"},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Perfecto! Me llevo esta. ¡Muchas gracias!",  en:"Perfect! I'll take this one. Thank you so much!"},
      {speaker:"Vendor",  avatar:"👩", es:"¡Gracias a usted! ¡Que le vaya muy bien!",    en:"Thank you! Have a wonderful day!"},
      {scene:"Leanne walks away happily with her new bag — a real Cuenca treasure!", sceneEs:"Leanne se va feliz con su nueva bolsa — ¡un tesoro de Cuenca!"},
    ]
  },
  {
    id:"planning",
    title:"¿Qué Hacemos Mañana?",
    titleEn:"What Are We Doing Tomorrow? (Intermediate)",
    emoji:"📅",
    color:"#7C3AED",
    panels:[
      {scene:"The family is at home in Cuenca planning their week together.", sceneEs:"La familia está en casa en Cuenca planeando su semana."},
      {speaker:"Victor",  avatar:"🗺️", es:"¿Qué quieren hacer mañana?",                 en:"What do you want to do tomorrow?"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Quiero ir al parque! Me gusta mucho.",       en:"I want to go to the park! I really like it."},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Yo también! ¿Hace buen tiempo mañana?",      en:"Me too! Is the weather nice tomorrow?"},
      {speaker:"Leanne",  avatar:"🌺", es:"Creo que sí. Por la mañana hace sol.",        en:"I think so. In the morning it's sunny."},
      {speaker:"Victor",  avatar:"🗺️", es:"Pero por la tarde puede llover. Es Cuenca.",  en:"But in the afternoon it might rain. It's Cuenca."},
      {speaker:"Grayson", avatar:"🦁", es:"¡No importa! La lluvia es divertida.",        en:"It doesn't matter! Rain is fun."},
      {speaker:"Leanne",  avatar:"🌺", es:"Bien. Vamos al parque por la mañana.",        en:"Good. We'll go to the park in the morning."},
      {speaker:"Leanne",  avatar:"🌺", es:"Necesito buscar un mercado cerca también.",   en:"I also need to find a market nearby."},
      {speaker:"Victor",  avatar:"🗺️", es:"Sé dónde hay uno. Está muy cerca, a la derecha.", en:"I know where there is one. It's very close, to the right."},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Papá sabe todo! Es muy inteligente.",        en:"Dad knows everything! He's very smart."},
      {speaker:"Victor",  avatar:"🗺️", es:"¡Ja! Aprendo mucho viviendo aquí en Cuenca.", en:"Ha! I learn a lot living here in Cuenca."},
      {speaker:"Grayson", avatar:"🦁", es:"¡Nosotras también! Cada día aprendemos más.", en:"Us too! Every day we learn more."},
      {scene:"A perfect Cuenca evening — planning, laughing, and learning together.", sceneEs:"Una noche perfecta en Cuenca — planeando, riendo y aprendiendo juntos."},
    ]
  },
  {
    id:"weather",
    title:"¡Qué Clima Raro!",
    titleEn:"What Weird Weather!",
    emoji:"🌦️",
    color:"#1D4ED8",
    panels:[
      {scene:"A beautiful morning in Cuenca — but the weather changes fast here!", sceneEs:"Una mañana bonita en Cuenca — ¡pero el clima cambia rápido aquí!"},
      {speaker:"Peyton",  avatar:"🦋", es:"Mamá, ¿hace frío hoy?",                   en:"Mom, is it cold today?"},
      {speaker:"Leanne",  avatar:"🌺", es:"No, hace calor. ¡Es un día muy bonito!",  en:"No, it's hot. It's a very beautiful day!"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Mamá! ¿Vamos al parque?",               en:"Mom! Are we going to the park?"},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Sí! Pero lleven agua. Hace mucho calor.",en:"Yes! But bring water. It's very hot."},
      {scene:"At the park, the sky suddenly gets cloudy.", sceneEs:"En el parque, el cielo se pone nublado de repente."},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Ay! Está nublado ahora.",                en:"Oh! It's cloudy now."},
      {speaker:"Grayson", avatar:"🦁", es:"Mamá, creo que va a llover.",             en:"Mom, I think it's going to rain."},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Sí! ¡Vamos rápido a casa!",             en:"Yes! Let's go home quickly!"},
      {scene:"It starts raining — they run and laugh!", sceneEs:"¡Empieza a llover — corren y se ríen!"},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Está lloviendo! ¡Corro muy rápido!",    en:"It's raining! I'm running very fast!"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Yo también! ¡Espérame, Peyton!",        en:"Me too! Wait for me, Peyton!"},
      {scene:"Safe at home, all laughing together.", sceneEs:"En casa, todos se ríen juntos."},
      {speaker:"Leanne",  avatar:"🌺", es:"¡Estamos bien! El clima en Cuenca es especial.",en:"We're fine! The weather in Cuenca is special."},
      {speaker:"Peyton",  avatar:"🦋", es:"¡Me gustó la lluvia! ¡Fue muy divertido!",en:"I liked the rain! It was so much fun!"},
      {speaker:"Grayson", avatar:"🦁", es:"¡Sí! ¡Mañana volvemos al parque!",       en:"Yes! Tomorrow we go back to the park!"},
    ]
  },
];

export const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
export const todayStr = () => new Date().toISOString().slice(0, 10);

// ══ CONFIG ════════════════════════════════════════════════════════════════════
export const AVATARS = ["🦁","🦜","🐬","🦋","🌺","🐢","🦅","🐆","⭐","🌊","🗺️","🧭","🦊","🐧","🌴","🎭"];
export const PCOLORS = ["#E8445A","#10B981","#8B5CF6","#F59E0B","#3B82F6","#EC4899","#DC6B19","#06B6D4"];
export const DS = { fontFamily:"'Nunito', sans-serif", fontWeight:900 };


// ══ LEVEL PROGRESSION SYSTEM ═════════════════════════════════════════════════
// Stars earned per category (0-3) based on quiz performance
// 0 = untouched, 1 = tried, 2 = good (70%+), 3 = mastered (90%+)
export const LEVEL_REQUIREMENTS = {
  2: { catsNeeded: 5, minStars: 2, label: "Complete 5 Beginner categories at 2+ stars" },
  3: { catsNeeded: 4, minStars: 2, label: "Complete 4 Intermediate categories at 2+ stars" },
  core: { catsNeeded: 3, minStars: 2, label: "Complete 3 categories at any level" },
};

export const getCatProgress = (profile, catKey, catLevel) => {
  const key = `progress_${catLevel}_${catKey}`;
  return (profile.catProgress || {})[key] || 0; // 0-3 stars
};

export const setCatProgress = (profile, catKey, catLevel, stars) => {
  const key = `progress_${catLevel}_${catKey}`;
  const existing = (profile.catProgress || {})[key] || 0;
  if (stars <= existing) return profile.catProgress || {}; // never downgrade
  return { ...(profile.catProgress || {}), [key]: stars };
};

export const canUnlockLevel = (profile, targetLevel) => {
  if (targetLevel <= 1) return true;
  if ((profile.level || 1) >= targetLevel) return true;
  const req = LEVEL_REQUIREMENTS[targetLevel];
  if (!req) return false;
  const sourceLevel = targetLevel - 1;
  const sourceVocab = sourceLevel === 1 ? VOCAB_L1 : VOCAB_L2;
  const catKeys = Object.keys(sourceVocab);
  const qualifyingCats = catKeys.filter(k =>
    getCatProgress(profile, k, sourceLevel) >= req.minStars
  );
  return qualifyingCats.length >= req.catsNeeded;
};

export const getLevelProgress = (profile, forLevel) => {
  const req = LEVEL_REQUIREMENTS[forLevel];
  if (!req) return { current: 0, needed: 0 };
  const sourceLevel = forLevel - 1;
  const sourceVocab = sourceLevel === 1 ? VOCAB_L1 : VOCAB_L2;
  const catKeys = Object.keys(sourceVocab);
  const qualifying = catKeys.filter(k => getCatProgress(profile, k, sourceLevel) >= req.minStars);
  return { current: qualifying.length, needed: req.catsNeeded };
};


// ══ GUIDED PATH SYSTEM ════════════════════════════════════════════════════════
// Categories unlock sequentially — finish one to open the next
// Need at least 1 star (tried the quiz) to unlock the next category

export const getCatStars = (profile, catKey, catLevel) => {
  const progressKey = `progress_${catLevel}_${catKey}`;
  const quizStars = (profile.catProgress || {})[progressKey] || 0;
  // 3 stars requires at least 3 successful Say It attempts in this category
  if(quizStars >= 3){
    const sayItKey = `${catLevel}_${catKey}`;
    const sayItCount = (profile.catSayIt || {})[sayItKey] || 0;
    return sayItCount >= 3 ? 3 : 2; // Cap at 2 until Say It requirement met
  }
  return quizStars;
};

export const getSayItProgress = (profile, catKey, catLevel) => {
  const key = `${catLevel}_${catKey}`;
  return (profile.catSayIt || {})[key] || 0;
};

export const getNextSuggestedCat = (profile) => {
  const lv = profile.level || 1;
  const vocab = lv >= 3 ? VOCAB_L3 : lv >= 2 ? VOCAB_L2 : VOCAB_L1;
  const keys = Object.keys(vocab);

  // Priority 1: find an unlocked category that's in progress (1 star, not yet 2)
  // This keeps the user working on what they've started
  for (const key of keys) {
    if (!isCatUnlocked(profile, key, lv)) continue;
    const stars = getCatStars(profile, key, lv);
    if (stars === 1) return { key, lv, cat: vocab[key], hint: "Keep going — aim for 2 stars!" };
  }

  // Priority 2: first unlocked category with 0 stars (never tried)
  for (const key of keys) {
    if (!isCatUnlocked(profile, key, lv)) continue;
    const stars = getCatStars(profile, key, lv);
    if (stars === 0) return { key, lv, cat: vocab[key], hint: "New category — give it a try!" };
  }

  // Priority 3: unlocked category with 2 stars (needs Say It for 3rd star)
  for (const key of keys) {
    if (!isCatUnlocked(profile, key, lv)) continue;
    const stars = getCatStars(profile, key, lv);
    if (stars === 2) return { key, lv, cat: vocab[key], hint: "Try Say It mode to earn the 3rd star!" };
  }

  return null; // All unlocked categories mastered
};

export const isCatUnlocked = (profile, catKey, catLevel) => {
  const vocab = catLevel >= 3 ? VOCAB_L3 : catLevel >= 2 ? VOCAB_L2 : VOCAB_L1;
  const keys = Object.keys(vocab);
  const idx = keys.indexOf(catKey);
  if (idx <= 0) return true; // First category always unlocked
  // Previous category needs at least 2 stars (quiz score 70%+) to unlock next
  const prevKey = keys[idx - 1];
  return getCatStars(profile, prevKey, catLevel) >= 2;
};


// ══ CONJUGATION DATA ══════════════════════════════════════════════════════════

// Present tense endings — the patterns that unlock the whole system
export const CONJ_PATTERNS = {
  ar: {
    label: "-AR verbs",
    color: "#2563EB",
    example: "hablar (to speak)",
    hook: "Think: I SPEAK = yo habl-O. The O ending = me, myself, I.",
    endings: {
      yo: "o", tu: "as", el: "a",
      nosotros: "amos", vosotros: "ais", ellos: "an"
    },
    memory: {
      yo: "yo = O — I always end in O",
      tu: "tu = AS — you AS k questions",
      el: "el/ella = A — she/he/it ends in A",
      nosotros: "nosotros = AMOS — WE AMOS love doing things",
      vosotros: "vosotros = AIS — Spain only, sounds like ICE",
      ellos: "ellos = AN — they AN always agree"
    }
  },
  er: {
    label: "-ER verbs",
    color: "#7C3AED",
    example: "comer (to eat)",
    hook: "ER verbs swap A for E — comER, comES, comE",
    endings: {
      yo: "o", tu: "es", el: "e",
      nosotros: "emos", vosotros: "eis", ellos: "en"
    },
    memory: {
      yo: "yo = O — same as -AR, I always end in O",
      tu: "tu = ES — you ES cape to eat",
      el: "el/ella = E — he/she E ats",
      nosotros: "nosotros = EMOS — we EMOS tionally eat together",
      vosotros: "vosotros = EIS — Spain only",
      ellos: "ellos = EN — they EN joy eating"
    }
  },
  ir: {
    label: "-IR verbs",
    color: "#059669",
    example: "vivir (to live)",
    hook: "IR verbs are like ER but nosotros changes — vivIMOS not vivEMOS",
    endings: {
      yo: "o", tu: "es", el: "e",
      nosotros: "imos", vosotros: "is", ellos: "en"
    },
    memory: {
      yo: "yo = O — still O, always",
      tu: "tu = ES — same as ER verbs",
      el: "el/ella = E — same as ER verbs",
      nosotros: "nosotros = IMOS — IR verbs say I MOST live",
      vosotros: "vosotros = IS — shortest ending",
      ellos: "ellos = EN — same as ER verbs"
    }
  }
};

export const PRONOUNS = [
  { es: "yo", en: "I", color: "#E8445A" },
  { es: "tu", en: "you (informal)", color: "#DC6B19" },
  { es: "el/ella", en: "he/she/it", color: "#10B981" },
  { es: "nosotros", en: "we", color: "#3B82F6" },
  { es: "vosotros", en: "you all (Spain)", color: "#8B5CF6" },
  { es: "ellos", en: "they", color: "#F59E0B" },
];

// Regular verbs for practice — grouped by type
export const REGULAR_VERBS = {
  ar: [
    { inf: "hablar", en: "to speak", stem: "habl",
      yo:"hablo", tu:"hablas", el:"habla", nosotros:"hablamos", vosotros:"hablais", ellos:"hablan",
      hook: "HABL sounds like ABLE — you are able to speak" },
    { inf: "trabajar", en: "to work", stem: "trabaj",
      yo:"trabajo", tu:"trabajas", el:"trabaja", nosotros:"trabajamos", vosotros:"trabajais", ellos:"trabajan",
      hook: "trab-AH-har — work is HARD (harsh sound)" },
    { inf: "caminar", en: "to walk", stem: "camin",
      yo:"camino", tu:"caminas", el:"camina", nosotros:"caminamos", vosotros:"caminais", ellos:"caminan",
      hook: "CAMIN sounds like COMING — walking is coming somewhere" },
    { inf: "comprar", en: "to buy", stem: "compr",
      yo:"compro", tu:"compras", el:"compra", nosotros:"compramos", vosotros:"comprais", ellos:"compran",
      hook: "COMPR sounds like COMPARE prices before buying" },
    { inf: "escuchar", en: "to listen", stem: "escuch",
      yo:"escucho", tu:"escuchas", el:"escucha", nosotros:"escuchamos", vosotros:"escuchais", ellos:"escuchan",
      hook: "es-COOCH-ar — listening is a COUCH potato activity" },
    { inf: "tomar", en: "to take/drink", stem: "tom",
      yo:"tomo", tu:"tomas", el:"toma", nosotros:"tomamos", vosotros:"tomais", ellos:"toman",
      hook: "TOMAR — TOM takes everything" },
    { inf: "necesitar", en: "to need", stem: "necesit",
      yo:"necesito", tu:"necesitas", el:"necesita", nosotros:"necesitamos", vosotros:"necesitais", ellos:"necesitan",
      hook: "necesito sounds like NECESSITY — I need it" },
    { inf: "buscar", en: "to look for", stem: "busc",
      yo:"busco", tu:"buscas", el:"busca", nosotros:"buscamos", vosotros:"buscais", ellos:"buscan",
      hook: "BUSCAR — BUS driver searches for passengers" },
  ],
  er: [
    { inf: "comer", en: "to eat", stem: "com",
      yo:"como", tu:"comes", el:"come", nosotros:"comemos", vosotros:"comeis", ellos:"comen",
      hook: "COMER — a COMEr who eats everything in sight" },
    { inf: "beber", en: "to drink", stem: "beb",
      yo:"bebo", tu:"bebes", el:"bebe", nosotros:"bebemos", vosotros:"bebeis", ellos:"beben",
      hook: "BEBER — a BABY BEBer drinks milk" },
    { inf: "leer", en: "to read", stem: "le",
      yo:"leo", tu:"lees", el:"lee", nosotros:"leemos", vosotros:"leeis", ellos:"leen",
      hook: "LEER — LEE reads everything" },
    { inf: "correr", en: "to run", stem: "corr",
      yo:"corro", tu:"corres", el:"corre", nosotros:"corremos", vosotros:"correis", ellos:"corren",
      hook: "CORRER — CORE strength needed to run" },
    { inf: "aprender", en: "to learn", stem: "aprend",
      yo:"aprendo", tu:"aprendes", el:"aprende", nosotros:"aprendemos", vosotros:"aprendeis", ellos:"aprenden",
      hook: "aprENDer — learning never ENDS" },
    { inf: "comprender", en: "to understand", stem: "comprend",
      yo:"comprendo", tu:"comprendes", el:"comprende", nosotros:"comprendemos", vosotros:"comprendeis", ellos:"comprenden",
      hook: "comprENDer — understanding COMPREhension never ENDS" },
  ],
  ir: [
    { inf: "vivir", en: "to live", stem: "viv",
      yo:"vivo", tu:"vives", el:"vive", nosotros:"vivimos", vosotros:"vivis", ellos:"viven",
      hook: "VIVIR — VIVID life is worth living" },
    { inf: "escribir", en: "to write", stem: "escrib",
      yo:"escribo", tu:"escribes", el:"escribe", nosotros:"escribimos", vosotros:"escribis", ellos:"escriben",
      hook: "escRIBir — SCRIBE writes everything" },
    { inf: "recibir", en: "to receive", stem: "recib",
      yo:"recibo", tu:"recibes", el:"recibe", nosotros:"recibimos", vosotros:"recibis", ellos:"reciben",
      hook: "reCIBir — receive like a SIEVE catches things" },
    { inf: "abrir", en: "to open", stem: "abr",
      yo:"abro", tu:"abres", el:"abre", nosotros:"abrimos", vosotros:"abris", ellos:"abren",
      hook: "ABRIR — APRIL opens spring" },
    { inf: "subir", en: "to go up/upload", stem: "sub",
      yo:"subo", tu:"subes", el:"sube", nosotros:"subimos", vosotros:"subis", ellos:"suben",
      hook: "SUBIR — SUBmarine goes up" },
  ]
};

// Irregular verbs — the most important ones to memorize
export const IRREGULAR_VERBS = [
  {
    inf: "ser", en: "to be (permanent)", color: "#E8445A",
    hook: "SER is for permanent things — SER-iously forever",
    forms: { yo:"soy", tu:"eres", el:"es", nosotros:"somos", vosotros:"sois", ellos:"son" },
    examples: [
      { es: "Yo soy americana", en: "I am American (always true)" },
      { es: "El es doctor", en: "He is a doctor (profession)" },
      { es: "Somos familia", en: "We are family (permanent)" },
    ]
  },
  {
    inf: "estar", en: "to be (temporary)", color: "#DC6B19",
    hook: "ESTAR is for temporary states — where you ESTAR-t today may change",
    forms: { yo:"estoy", tu:"estas", el:"esta", nosotros:"estamos", vosotros:"estais", ellos:"estan" },
    examples: [
      { es: "Estoy cansada", en: "I am tired (right now, not forever)" },
      { es: "Esta en Cuenca", en: "She is in Cuenca (location, can change)" },
      { es: "Estamos felices", en: "We are happy (current mood)" },
    ]
  },
  {
    inf: "tener", en: "to have", color: "#10B981",
    hook: "TENER — TEN things to HAVE today",
    forms: { yo:"tengo", tu:"tienes", el:"tiene", nosotros:"tenemos", vosotros:"teneis", ellos:"tienen" },
    examples: [
      { es: "Tengo hambre", en: "I am hungry (lit: I have hunger)" },
      { es: "Tienes razon", en: "You are right (lit: you have reason)" },
      { es: "Tiene 10 anos", en: "She is 10 years old (lit: has 10 years)" },
    ]
  },
  {
    inf: "ir", en: "to go", color: "#3B82F6",
    hook: "IR is tiny but wild — totally irregular, just memorize it",
    forms: { yo:"voy", tu:"vas", el:"va", nosotros:"vamos", vosotros:"vais", ellos:"van" },
    examples: [
      { es: "Voy al mercado", en: "I am going to the market" },
      { es: "Vamos a Cuenca", en: "We are going to Cuenca" },
      { es: "Van a comer", en: "They are going to eat (ir + a + inf)" },
    ]
  },
  {
    inf: "hacer", en: "to do / to make", color: "#8B5CF6",
    hook: "HACER — only yo is weird: HAGO. Rest follow -ER pattern",
    forms: { yo:"hago", tu:"haces", el:"hace", nosotros:"hacemos", vosotros:"haceis", ellos:"hacen" },
    examples: [
      { es: "Que haces?", en: "What are you doing?" },
      { es: "Hago ejercicio", en: "I exercise (I make exercise)" },
      { es: "Hace calor", en: "It is hot (it makes heat)" },
    ]
  },
  {
    inf: "querer", en: "to want / to love", color: "#F59E0B",
    hook: "QUERER — stem changes E to IE except nosotros/vosotros",
    forms: { yo:"quiero", tu:"quieres", el:"quiere", nosotros:"queremos", vosotros:"quereis", ellos:"quieren" },
    examples: [
      { es: "Quiero aprender", en: "I want to learn" },
      { es: "Te quiero", en: "I love you (family/friends)" },
      { es: "Quieren comer", en: "They want to eat" },
    ]
  },
  {
    inf: "poder", en: "to be able to / can", color: "#059669",
    hook: "PODER — stem changes O to UE. POder becomes PUEdo",
    forms: { yo:"puedo", tu:"puedes", el:"puede", nosotros:"podemos", vosotros:"podeis", ellos:"pueden" },
    examples: [
      { es: "Puedo hablar", en: "I can speak" },
      { es: "Puedes ayudarme?", en: "Can you help me?" },
      { es: "No podemos ir", en: "We cannot go" },
    ]
  },
  {
    inf: "saber", en: "to know (facts)", color: "#DC2626",
    hook: "SABER — only yo is weird: SE. Rest follow -ER pattern",
    forms: { yo:"se", tu:"sabes", el:"sabe", nosotros:"sabemos", vosotros:"sabeis", ellos:"saben" },
    examples: [
      { es: "Se hablar espanol", en: "I know how to speak Spanish" },
      { es: "Sabes donde esta?", en: "Do you know where it is?" },
      { es: "No saben nada", en: "They don't know anything" },
    ]
  },
];

// Grammar lessons — bite-sized explanations with examples
export const GRAMMAR_LESSONS = [
  {
    id: "ser_estar",
    title: "Ser vs. Estar — Both Mean To Be",
    icon: "two",
    color: "#E8445A",
    difficulty: "Essential",
    hook: "SER = permanent identity. ESTAR = temporary state. Ask: will this change?",
    sections: [
      {
        heading: "Use SER for...",
        points: [
          { rule: "Identity & origin", example: "Soy americana — I am American", note: "Always true" },
          { rule: "Profession", example: "Es medica — She is a doctor", note: "Who you are" },
          { rule: "Relationships", example: "Es mi mama — She is my mom", note: "Permanent bond" },
          { rule: "Time & dates", example: "Son las tres — It is three o'clock", note: "Factual" },
          { rule: "Descriptions of character", example: "Eres inteligente — You are smart", note: "Core trait" },
        ]
      },
      {
        heading: "Use ESTAR for...",
        points: [
          { rule: "Location", example: "Estoy en Cuenca — I am in Cuenca", note: "Can change" },
          { rule: "Feelings & mood", example: "Estoy feliz — I am happy", note: "Right now" },
          { rule: "Health", example: "Esta enferma — She is sick", note: "Temporary" },
          { rule: "Ongoing actions", example: "Estamos comiendo — We are eating", note: "In progress" },
          { rule: "Appearance (vs. usual)", example: "Estas muy guapa — You look beautiful today", note: "Today, not always" },
        ]
      },
      {
        heading: "The classic trick question",
        points: [
          { rule: "El cafe es malo", example: "The coffee is bad (bad brand/taste always)", note: "Use SER" },
          { rule: "El cafe esta frio", example: "The coffee is cold (right now, heat it up)", note: "Use ESTAR" },
        ]
      }
    ]
  },
  {
    id: "tu_usted",
    title: "Tu vs. Usted — When to Be Formal",
    icon: "formal",
    color: "#2563EB",
    difficulty: "Essential",
    hook: "Tu is casual (friends, family, kids). Usted is respectful (strangers, elders, authority).",
    sections: [
      {
        heading: "Use TU (informal) with...",
        points: [
          { rule: "Friends & family", example: "Como estas, mama? — How are you, mom?", note: "" },
          { rule: "Children", example: "Como te llamas? — What is your name?", note: "Speaking to kids" },
          { rule: "Peers your age", example: "Quieres comer? — Do you want to eat?", note: "Same generation" },
          { rule: "Casual settings", example: "Hablas espanol? — Do you speak Spanish?", note: "At a cafe with a peer" },
        ]
      },
      {
        heading: "Use USTED (formal) with...",
        points: [
          { rule: "Older people", example: "Como esta usted? — How are you? (to elder)", note: "Show respect" },
          { rule: "Strangers in service", example: "Puede ayudarme? — Can you help me?", note: "Doctor, official" },
          { rule: "Professional settings", example: "Usted habla ingles? — Do you speak English?", note: "Formal" },
          { rule: "People in authority", example: "Buenos dias, senor — Good morning, sir", note: "Police, mayor" },
        ]
      },
      {
        heading: "In Ecuador specifically...",
        points: [
          { rule: "Ecuadorians are quite formal", example: "Default to usted with adults you just met", note: "Safe rule" },
          { rule: "They will invite you to use tu", example: "Tutear — when they say this, switch to tu", note: "They will tell you" },
          { rule: "Kids always get tu", example: "Como te llamas, nino?", note: "Always informal with children" },
        ]
      }
    ]
  },
  {
    id: "gender",
    title: "Gender — El and La, O and A",
    icon: "gender",
    color: "#10B981",
    difficulty: "Foundation",
    hook: "Every Spanish noun is masculine (el) or feminine (la). Adjectives must match.",
    sections: [
      {
        heading: "The basic rule",
        points: [
          { rule: "Words ending in -O are usually masculine", example: "el libro (the book), el nino (the boy)", note: "Use el" },
          { rule: "Words ending in -A are usually feminine", example: "la casa (the house), la nina (the girl)", note: "Use la" },
          { rule: "Adjectives change to match", example: "el libro rojo / la casa roja — red book / red house", note: "O becomes A" },
        ]
      },
      {
        heading: "Common exceptions (just memorize these)",
        points: [
          { rule: "el dia (the day)", example: "Ends in A but masculine — el dia perfecto", note: "Exception!" },
          { rule: "la mano (the hand)", example: "Ends in O but feminine — la mano derecha", note: "Exception!" },
          { rule: "el problema, el tema", example: "Greek-origin words ending -ma are masculine", note: "Pattern" },
          { rule: "la foto, la moto", example: "Short for fotografia — feminine stays", note: "Abbreviations" },
        ]
      },
      {
        heading: "Plural: use los and las",
        points: [
          { rule: "los + masculine plural", example: "los libros rojos — the red books", note: "" },
          { rule: "las + feminine plural", example: "las casas rojas — the red houses", note: "" },
          { rule: "Mixed group? Use masculine", example: "los ninos — boys, OR a mixed group", note: "Spanish default" },
        ]
      }
    ]
  },
  {
    id: "verb_order",
    title: "Word Order — More Flexible Than English",
    icon: "order",
    color: "#8B5CF6",
    difficulty: "Helpful",
    hook: "English is rigid: Subject-Verb-Object. Spanish lets you rearrange for emphasis.",
    sections: [
      {
        heading: "Basic order is similar to English",
        points: [
          { rule: "Subject + Verb + Object works fine", example: "Yo como una manzana — I eat an apple", note: "Safe default" },
          { rule: "You can drop the subject entirely", example: "Como una manzana — (I) eat an apple", note: "Verb ending shows who" },
        ]
      },
      {
        heading: "Questions — just add tone or flip verb",
        points: [
          { rule: "Add question marks and raise voice", example: "Hablas espanol? — You speak Spanish?", note: "Same words, question tone" },
          { rule: "Flip verb and subject", example: "Hablas tu espanol? — Do you speak Spanish?", note: "More formal question" },
          { rule: "Add a question word first", example: "Donde esta el bano? — Where is the bathroom?", note: "Question word leads" },
        ]
      },
      {
        heading: "Negation — just add NO before verb",
        points: [
          { rule: "Put no directly before the verb", example: "No hablo espanol bien — I don't speak Spanish well", note: "Simple!" },
          { rule: "Double negatives are correct in Spanish", example: "No tengo nada — I don't have nothing", note: "Both negatives stay" },
          { rule: "No + verb + nunca = never", example: "No como nunca carne — I never eat meat", note: "Double negative = correct" },
        ]
      }
    ]
  },
];
