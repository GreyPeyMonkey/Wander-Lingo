// ══ AppData.jsx — All vocabulary, stories, and lesson content ══
// Import from this file in App.jsx — keeps data separate from UI

// ══ LEVEL 1 VOCAB — every word has a memory hook ═════════════════════════════
export const VOCAB_L1 = {
  greetings: { icon:"👋", label:"Greetings", color:"#E8445A", words:[
    {es:"Hola",              en:"Hello",           emoji:"👋", hook:"Imagine a giant hole-A in the ground waving hello!"},
    {es:"Buenos días",       en:"Good morning",    emoji:"🌅", hook:"BOO! A friendly ghost pops out saying good morning — BOO-en-os dee-as!"},
    {es:"Buenas tardes",     en:"Good afternoon",  emoji:"☀️", hook:"The BOO ghost is back in the afternoon! bweh-nas tar-days."},
    {es:"Buenas noches",     en:"Good night",      emoji:"🌙", hook:"BOO at night — noh-ches sounds like 'no chess at night'!"},
    {es:"¿Cómo estás?",      en:"How are you?",    emoji:"🙂", hook:"como a lake asking HOW you're doing — koh-mo es-tas?"},
    {es:"Estoy bien",        en:"I'm fine",        emoji:"👍", hook:"I'm staying (es-toy) just BEAN (bien) fine — like a happy jumping bean!"},
    {es:"Gracias",           en:"Thank you",       emoji:"🙏", hook:"gras-ee-us — you're thankful someone mowed your grass for you!"},
    {es:"De nada",           en:"You're welcome",  emoji:"😊", hook:"It's NADA — nothing — like saying 'it was nothing at all!'"},
    {es:"Por favor",         en:"Please",          emoji:"⭐", hook:"pour flavor on it please — por fa-vor!"},
    {es:"Adiós",             en:"Goodbye",         emoji:"✌️", hook:"add one more OH when leaving — ah-dee-ohs!"},
    {es:"Hasta luego",       en:"See you later",   emoji:"🤗", hook:"hasta la vista! See you luego (loo-ay-go) — like a logo you'll see again!"},
    {es:"¿Cómo te llamas?",  en:"What's your name?",emoji:"❓", hook:"A llama is calling YOUR name — YAH-mas? The llama wants to know!"},
    {es:"Me llamo...",       en:"My name is...",   emoji:"🏷️", hook:"ME + a llama — my llama's name is... YAH-mo!"},
    {es:"Mucho gusto",       en:"Nice to meet you",emoji:"🤝", hook:"mucho gusto — a gust of wind blows you together — so nice to meet!"},
  ]},
  around: { icon:"🏙️", label:"Around Town", color:"#DC6B19", words:[
    {es:"Disculpe",                  en:"Excuse me",              emoji:"🙋", hook:"dis-cool-pay — excuse the super dis-cool person!"},
    {es:"¿Dónde está el baño?",      en:"Where is the bathroom?", emoji:"🚻", hook:"don'T-ay? don'T wait — find the bathroom fast! dohn-day es-ta?"},
    {es:"La cuenta por favor",       en:"The check please",       emoji:"🧾", hook:"kwen-ta — count the bill before paying!"},
    {es:"Una mesa para dos",         en:"A table for two",        emoji:"🪑", hook:"A mesa (table) for dos — like two dosas on the table!"},
    {es:"¿Cuánto cuesta?",           en:"How much does it cost?", emoji:"💰", hook:"kwahn-to kwes-ta — HOW MUCH does this quest cost?"},
    {es:"Quiero ordenar",            en:"I'd like to order",      emoji:"📋", hook:"kyer-oh — I cheer-oh to order my food!"},
    {es:"Un café con leche",         en:"Coffee with milk",       emoji:"☕", hook:"caf-ay con leh-chay — coffee with lechy stretchy milk!"},
    {es:"¿Habla inglés?",            en:"Do you speak English?",  emoji:"🗣️", hook:"AH-bla — is this able person speaking my language?"},
    {es:"No hablo español bien",     en:"I don't speak Spanish well",emoji:"😅", hook:"No AH-blo — I'm NOT able to speak it well yet!"},
    {es:"Más despacio por favor",    en:"More slowly please",     emoji:"🐢", hook:"mas des-pah-see-oh — MORE slowly like a turtle! MUCH slower!"},
    {es:"A la derecha",              en:"To the right",           emoji:"➡️", hook:"DARE-echa — I DARE you to go RIGHT!"},
    {es:"A la izquierda",            en:"To the left",            emoji:"⬅️", hook:"ees-kee-air-da — it's quirky and airy going left!"},
    {es:"Todo recto",                en:"Straight ahead",         emoji:"⬆️", hook:"TODO recto — totally erect and straight ahead!"},
    {es:"¿Me puede ayudar?",         en:"Can you help me?",       emoji:"🤝", hook:"AYE-oo-dar — AYE! You DARE to help me? Please!"},
  ]},
  family: { icon:"👨‍👩‍👧", label:"Family", color:"#10B981", words:[
    {es:"Mamá",    en:"Mom",           emoji:"👩", hook:"ma + ma — double the love, double the ma!"},
    {es:"Papá",    en:"Dad",           emoji:"👨", hook:"pa + pa — double the pa, double the dad hugs!"},
    {es:"Hermana", en:"Sister",        emoji:"👧", hook:"HER mana — SHE has the magic mana — that's your sister!"},
    {es:"Hermano", en:"Brother",       emoji:"👦", hook:"HER mano — your bro is HER MAN-OH!"},
    {es:"Abuela",  en:"Grandma",       emoji:"👵", hook:"ah-bweh-la — grandma flies in on a propeller — bweh!"},
    {es:"Abuelo",  en:"Grandpa",       emoji:"👴", hook:"ah-bweh-lo — grandpa flies in too — bweh-lo!"},
    {es:"Bebé",    en:"Baby",          emoji:"👶", hook:"bay-bay — babies say bay-bay and everyone smiles!"},
    {es:"Amigo",   en:"Friend (boy)",  emoji:"🧑", hook:"ah-mee-go — your buddy from the movie saying I GO with you amigo!"},
    {es:"Amiga",   en:"Friend (girl)", emoji:"👩", hook:"ah-mee-ga — your girl friend — ME + ga, she goes everywhere with you!"},
    {es:"Mascota", en:"Pet",           emoji:"🐾", hook:"mas-koh-ta — your pet wears a mascot costume at every game!"},
  ]},
  food: { icon:"🍎", label:"Food", color:"#F59E0B", words:[
    {es:"Agua",        en:"Water",       emoji:"💧", hook:"AH-gwa — water goes AH-gwa-gwa when you splash in it!"},
    {es:"Leche",       en:"Milk",        emoji:"🥛", hook:"leh-chay — milk is so lechy and stretchy when it pours!"},
    {es:"Pan",         en:"Bread",       emoji:"🍞", hook:"pan — you cook bread in A pan — simple as that!"},
    {es:"Arroz",       en:"Rice",        emoji:"🍚", hook:"ah-rose — rice grows in fields like a beautiful rose garden!"},
    {es:"Pollo",       en:"Chicken",     emoji:"🍗", hook:"poy-yo — polo the chicken plays polo on horseback!"},
    {es:"Manzana",     en:"Apple",       emoji:"🍎", hook:"man-zah-na — a MAN-sized banana shaped like an apple!"},
    {es:"Naranja",     en:"Orange",      emoji:"🍊", hook:"nah-ran-ha — the runner ran to grab the orange — nah-ran-ha!"},
    {es:"Helado",      en:"Ice cream",   emoji:"🍦", hook:"eh-lah-do — held the ice cream before it melted — held-ado!"},
    {es:"Tengo hambre",en:"I'm hungry",  emoji:"😋", hook:"TEN-go — I'm so tense because my stomach has TEN growls!"},
    {es:"Tengo sed",   en:"I'm thirsty", emoji:"🥤", hook:"sed — so dry and said to be thirsty!"},
    {es:"Delicioso",   en:"Delicious",   emoji:"😍", hook:"deh-lee-SEE-oh-so — so delicious you can SEE it glowing!"},
    {es:"Quiero más",  en:"I want more", emoji:"🙋", hook:"kyer-oh mas — cheer-oh for mas more — MORE MORE MORE!"},
  ]},
  feelings: { icon:"😊", label:"Feelings", color:"#8B5CF6", words:[
    {es:"Feliz",          en:"Happy",    emoji:"😄", hook:"feh-lees — feel the happiness in your knees!"},
    {es:"Triste",         en:"Sad",      emoji:"😢", hook:"trees-tay — a sad tree just stood there dripping tears today!"},
    {es:"Cansado",        en:"Tired",    emoji:"😴", hook:"kan-sah-do — CAN'T-DO anything because I'm so tired!"},
    {es:"Emocionado",     en:"Excited",  emoji:"🤩", hook:"eh-mo-see-OH-nah-do — your emotions explode like a volcano!"},
    {es:"Asustado",       en:"Scared",   emoji:"😨", hook:"ah-soos-tah-do — a ghost says BOO and you're so scared-ado!"},
    {es:"Enojado",        en:"Angry",    emoji:"😠", hook:"eh-no-HA-do — enough! No HA-do! I'm angry!"},
    {es:"Te quiero",      en:"I love you",emoji:"❤️", hook:"tay kyer-oh — cheer for the one you love — te cheer-oh!"},
    {es:"Me siento bien", en:"I feel good",emoji:"✨", hook:"see-en-to — I sense I feel amazing — me see-en-to bien!"},
  ]},
  school: { icon:"📚", label:"School", color:"#3B82F6", words:[
    {es:"Maestra",         en:"Teacher (f)",          emoji:"👩‍🏫", hook:"my-ehs-tra — the master-A teacher rules the class!"},
    {es:"Maestro",         en:"Teacher (m)",          emoji:"👨‍🏫", hook:"my-ehs-tro — the maestro teacher leads like an orchestra!"},
    {es:"Libro",           en:"Book",                 emoji:"📚", hook:"lee-bro — lee BROught his favorite book to read!"},
    {es:"Lápiz",           en:"Pencil",               emoji:"✏️", hook:"lah-pees — the pencil draws in laps around the page!"},
    {es:"Escuela",         en:"School",               emoji:"🏫", hook:"es-kway-la — school is the eskimo way of learning — es-kway-la!"},
    {es:"No entiendo",     en:"I don't understand",   emoji:"🤔", hook:"en-tee-en-do — I don't tend-to understand this at all!"},
    {es:"¿Me puedes ayudar?",en:"Can you help me?",  emoji:"🙋", hook:"AYE-oo-dar — AYE! You DARE help me with this?"},
    {es:"Entiendo",        en:"I understand",         emoji:"💡", hook:"en-tee-en-do — NOW I tend-to understand — the light bulb is on!"},
  ]},
  numbers: { icon:"🔢", label:"Numbers", color:"#06B6D4", words:[
    {es:"Uno",   en:"One",   emoji:"1️⃣", hook:"oo-no — ONE more ooh makes everything fun!"},
    {es:"Dos",   en:"Two",   emoji:"2️⃣", hook:"dose — the doctor gives you TWO doses of medicine!"},
    {es:"Tres",  en:"Three", emoji:"3️⃣", hook:"trace — THREE lines to trace on the paper!"},
    {es:"Cuatro",en:"Four",  emoji:"4️⃣", hook:"kwah-tro — four quarters make one dollar — kwah-tro!"},
    {es:"Cinco", en:"Five",  emoji:"5️⃣", hook:"sink-oh — five things fell into the sink-oh!"},
    {es:"Seis",  en:"Six",   emoji:"6️⃣", hook:"sace — six geese went sace sace sace!"},
    {es:"Siete", en:"Seven", emoji:"7️⃣", hook:"see-EH-tay — seven ate (see-ate) nine for breakfast!"},
    {es:"Ocho",  en:"Eight", emoji:"8️⃣", hook:"OH-cho — eight is an OH with a cho cho train!"},
    {es:"Nueve", en:"Nine",  emoji:"9️⃣", hook:"nweh-bay — nine bees went whew into the hive!"},
    {es:"Diez",  en:"Ten",   emoji:"🔟", hook:"dee-ehs — TEN days in the sun — dee-ehs days!"},
  ]},
  colors: { icon:"🎨", label:"Colors", color:"#EC4899", words:[
    {es:"Rojo",     en:"Red",    emoji:"🔴", hook:"roh-ho — red roh-hos of roses everywhere!"},
    {es:"Azul",     en:"Blue",   emoji:"🔵", hook:"ah-zool — the azure blue sky goes ah-zool!"},
    {es:"Verde",    en:"Green",  emoji:"🟢", hook:"bair-day — green bears eating leaves today — BEAR-day!"},
    {es:"Amarillo", en:"Yellow", emoji:"🟡", hook:"ah-mah-ree-yo — an ARMADILLO painted itself yellow!"},
    {es:"Naranja",  en:"Orange", emoji:"🟠", hook:"nah-ran-ha — orange? You ran here to get one!"},
    {es:"Morado",   en:"Purple", emoji:"🟣", hook:"moh-rah-do — MORE-ado purple please — I want MORE!"},
    {es:"Rosa",     en:"Pink",   emoji:"🩷", hook:"roh-sa — rosa always wears pink roses!"},
    {es:"Blanco",   en:"White",  emoji:"⬜", hook:"blan-co — a blank white piece of paper — blank-o!"},
    {es:"Negro",    en:"Black",  emoji:"⬛", hook:"neh-gro — negro means black like the night sky!"},
    {es:"Café",     en:"Brown",  emoji:"🟤", hook:"cah-fay — coffee is brown — cafe au lait!"},
  ]},
  animals: { icon:"🐾", label:"Animals", color:"#64748B", words:[
    {es:"Perro",    en:"Dog",      emoji:"🐶", hook:"PAIR-oh — a PAIR of dogs are better than one!"},
    {es:"Gato",     en:"Cat",      emoji:"🐱", hook:"gah-to — the cat's gotta go — see ya gah-to!"},
    {es:"Pájaro",   en:"Bird",     emoji:"🐦", hook:"pah-ha-ro — the bird PARACHUTES down — pah-ha-ro!"},
    {es:"Pez",      en:"Fish",     emoji:"🐠", hook:"pehz — pez candy is fish-shaped — same word!"},
    {es:"Caballo",  en:"Horse",    emoji:"🐴", hook:"cah-bah-yo — the horse gallops saying bah-yo bah-yo!"},
    {es:"Vaca",     en:"Cow",      emoji:"🐮", hook:"bah-ca — the cow says bah! bah-ca bah-ca!"},
    {es:"Mono",     en:"Monkey",   emoji:"🐒", hook:"moh-no — mono means alone — the lonely monkey!"},
    {es:"Elefante", en:"Elephant", emoji:"🐘", hook:"eh-leh-fan-tay — the elephant is a huge fan of Spanish!"},
    {es:"León",     en:"Lion",     emoji:"🦁", hook:"lay-on — the lion lays on the grass in the sun!"},
    {es:"Tortuga",  en:"Turtle",   emoji:"🐢", hook:"tor-TOO-ga — the turtle took TOO long to get here!"},
  ]},
};

// ══ LEVEL 2 VOCAB — Intermediate ═════════════════════════════════════════════
export const VOCAB_L2 = {
  verbs: { icon:"⚡", label:"Verbs & Actions", color:"#7C3AED", words:[
    {es:"Quiero",           en:"I want",          emoji:"🙋", hook:"kyer-oh — I cheer-oh for what I want!"},
    {es:"Necesito",         en:"I need",           emoji:"❗", hook:"neh-seh-SEE-to — I NEED to SEE-to it right now!"},
    {es:"Tengo",            en:"I have",           emoji:"✋", hook:"TEN-go — I HAVE ten things to go do!"},
    {es:"Voy",              en:"I'm going",        emoji:"🚶", hook:"BOY — I'm going like a BOY scout on a mission!"},
    {es:"Me gusta",         en:"I like",           emoji:"👍", hook:"me goos-ta — I like it with gusto — goos-ta!"},
    {es:"Puedo",            en:"I can",            emoji:"💪", hook:"pweh-do — I can power through anything!"},
    {es:"Sé",               en:"I know",           emoji:"🧠", hook:"SAY — I KNOW what to SAY about that!"},
    {es:"Hablo",            en:"I speak",          emoji:"🗣️", hook:"AH-blo — I speak blow by blow — AH-blo!"},
    {es:"Busco",            en:"I'm looking for",  emoji:"🔍", hook:"boos-co — I'm boosting my search — boos-co!"},
    {es:"Vivo en",          en:"I live in",        emoji:"🏠", hook:"bee-bo — I LIVE like a bee in my hive — bee-bo!"},
    {es:"No sé",            en:"I don't know",     emoji:"🤷", hook:"SAY — I can't SAY because I just don't know!"},
    {es:"¿Puedes repetir?", en:"Can you repeat?",  emoji:"🔁", hook:"reh-peh-teer — repeat it like a spinning tire — teer teer!"},
    {es:"Entendí",          en:"I understood",     emoji:"💡", hook:"en-ten-dee — I DID understand — past tense — DID-ee!"},
    {es:"Quiero aprender",  en:"I want to learn",  emoji:"📖", hook:"ah-pren-dair — I want to learn from the thin air — dair!"},
  ]},
  time: { icon:"🕐", label:"Time & Days", color:"#0369A1", words:[
    {es:"Hoy",            en:"Today",         emoji:"📅", hook:"OY — today I say OY what a day!"},
    {es:"Mañana",         en:"Tomorrow",      emoji:"🌅", hook:"mahn-YAH-na — tomorrow is like a man eating a banana — man-yana!"},
    {es:"Ayer",           en:"Yesterday",     emoji:"⏪", hook:"ah-yair — YESTERDAY the air smelled different!"},
    {es:"Ahora",          en:"Right now",     emoji:"⚡", hook:"ah-OH-ra — RIGHT NOW say AH-OH-ra really fast!"},
    {es:"Lunes",          en:"Monday",        emoji:"1️⃣", hook:"loo-nes — monday on the moon — lunar Monday!"},
    {es:"Martes",         en:"Tuesday",       emoji:"2️⃣", hook:"mar-tays — tuesday on mars with the martians!"},
    {es:"Miércoles",      en:"Wednesday",     emoji:"3️⃣", hook:"mee-air-coh-les — WEDNESDAY in the air with the MERCURIANS!"},
    {es:"Jueves",         en:"Thursday",      emoji:"4️⃣", hook:"hweh-bes — thursday we have webs — like jove the spider!"},
    {es:"Viernes",        en:"Friday",        emoji:"5️⃣", hook:"bee-air-nes — friday in the air near venus — vee-air-nes!"},
    {es:"Sábado",         en:"Saturday",      emoji:"🎉", hook:"sah-bah-do — saturday in the sahara desert!"},
    {es:"Domingo",        en:"Sunday",        emoji:"☀️", hook:"doh-ming-go — sunday with dominoes — dom-ingo!"},
    {es:"¿Qué hora es?",  en:"What time is it?",emoji:"🕐", hook:"kay OH-ra — WHAT hour is it — kay say the clock!"},
    {es:"Por la mañana",  en:"In the morning", emoji:"🌄", hook:"mahn-YAH-na — morning banana time with the man!"},
    {es:"Por la noche",   en:"At night",      emoji:"🌙", hook:"noh-chay — NO chess at night — night time!"},
  ]},
  body: { icon:"💪", label:"Body & Health", color:"#DC2626", words:[
    {es:"Cabeza",              en:"Head",          emoji:"🤯", hook:"cah-bay-sah — a cab drove into your head — cah-bay!"},
    {es:"Mano",                en:"Hand",          emoji:"✋", hook:"mah-no — your hand is your MAN-O helper!"},
    {es:"Pie",                 en:"Foot",          emoji:"🦶", hook:"pee-EH — your foot makes a pie shape in the mud!"},
    {es:"Ojo",                 en:"Eye",           emoji:"👁️", hook:"OH-ho — your eye goes OH-ho when it sees something amazing!"},
    {es:"Estómago",            en:"Stomach",       emoji:"😣", hook:"es-toh-mah-go — your stomach says stop-mago I'm full!"},
    {es:"Espalda",             en:"Back",          emoji:"🔙", hook:"es-pal-da — your back is your best pal-da!"},
    {es:"Me duele",            en:"It hurts",      emoji:"😣", hook:"dweh-lay — it hurts like a duel — dwell on the pain!"},
    {es:"Estoy enfermo",       en:"I'm sick",      emoji:"🤒", hook:"en-fair-mo — it's NOT fair-mo to be sick!"},
    {es:"Necesito un médico",  en:"I need a doctor",emoji:"👨‍⚕️", hook:"meh-dee-co — the medic is your medical doctor!"},
    {es:"La farmacia",         en:"The pharmacy",  emoji:"💊", hook:"far-mah-see-ah — the pharmacy is FAR-macia away!"},
    {es:"Tengo fiebre",        en:"I have a fever", emoji:"🌡️", hook:"fee-EH-bray — fever is like a fee you pay — fee-EH!"},
    {es:"Me siento mal",       en:"I feel bad",    emoji:"😞", hook:"mal — feeling bad is just plain mal-icious!"},
  ]},
  descriptions: { icon:"🎭", label:"Describing Things", color:"#B45309", words:[
    {es:"Grande",   en:"Big",       emoji:"🐘", hook:"gran-day — grand and BIG — it's a grand day!"},
    {es:"Pequeño",  en:"Small",     emoji:"🐭", hook:"peh-ken-yo — SMALL like little kenny YO!"},
    {es:"Bonito",   en:"Beautiful", emoji:"😍", hook:"boh-nee-to — BEAUTIFUL like a bonito fish in the sea!"},
    {es:"Caro",     en:"Expensive", emoji:"💸", hook:"CAR-oh — as EXPENSIVE as a CAR — CAR-oh!"},
    {es:"Barato",   en:"Cheap",     emoji:"🤑", hook:"bah-rah-to — cheap like a burrito that costs almost nothing!"},
    {es:"Cerca",    en:"Near",      emoji:"📍", hook:"sair-ca — near the circus — sair-ca!"},
    {es:"Lejos",    en:"Far",       emoji:"🗺️", hook:"leh-hos — FAR like a legion of miles away!"},
    {es:"Rápido",   en:"Fast",      emoji:"⚡", hook:"rah-pee-do — RAPID and fast like a RAPID-o rocket!"},
    {es:"Lento",    en:"Slow",      emoji:"🐢", hook:"len-to — slow like lento music — nice and slow!"},
    {es:"Caliente", en:"Hot",       emoji:"🔥", hook:"cah-lee-en-tay — hot like a KALEIDOSCOPE of fire!"},
    {es:"Frío",     en:"Cold",      emoji:"🧊", hook:"free-oh — cold and free-zing cold — free-oh!"},
    {es:"Fácil",    en:"Easy",      emoji:"😊", hook:"fah-seel — easy peasy like a fossil in the ground!"},
    {es:"Difícil",  en:"Difficult", emoji:"😤", hook:"dee-fee-seel — DIFFICULT fee to pay — dee-fee!"},
    {es:"Mucho",    en:"A lot",     emoji:"📦", hook:"moo-cho — A lot of MOOs from the cow — moo-cho!"},
  ]},
  shopping: { icon:"🛒", label:"Shopping & Market", color:"#065F46", words:[
    {es:"El mercado",            en:"The market",          emoji:"🏪", hook:"mehr-cah-do — the market is your mercado adventure!"},
    {es:"¿Tiene cambio?",        en:"Do you have change?", emoji:"💰", hook:"cahm-bee-oh — change your cambia coins!"},
    {es:"Es muy caro",           en:"It's very expensive", emoji:"😱", hook:"moo-ee CAR-oh — the CAR is VERY expensive — moo-ee!"},
    {es:"Me llevo esto",         en:"I'll take this",      emoji:"🛍️", hook:"yeh-bo — I'll TAKE it yebo style — yeh-bo!"},
    {es:"¿Cuánto es todo?",      en:"How much is everything?",emoji:"🧾", hook:"kwahn-to — HOW MUCH in this quantum universe?"},
    {es:"Quiero comprar",        en:"I want to buy",       emoji:"💳", hook:"cohm-prar — I want to compare prices before buying!"},
    {es:"¿Acepta tarjeta?",      en:"Do you accept card?", emoji:"💳", hook:"tar-heh-ta — card like a target credit card!"},
    {es:"El precio",             en:"The price",           emoji:"🏷️", hook:"preh-see-oh — the price is oh so precious!"},
    {es:"La bolsa",              en:"The bag",             emoji:"🛍️", hook:"bowl-sah — the bag is shaped like a bowl!"},
    {es:"¿Puede bajar el precio?",en:"Can you lower the price?",emoji:"🙏", hook:"bah-har — can you lower it like going DOWN to a bar?"},
    {es:"¿Dónde encuentro...?",  en:"Where do I find...?", emoji:"🔍", hook:"en-kwen-tro — WHERE do I ENCOUNTER what I'm looking for?"},
    {es:"Me da uno más",         en:"Give me one more",    emoji:"✌️", hook:"Give me uno mas — one MORE please!"},
  ]},
  weather: { icon:"🌤️", label:"Weather", color:"#1D4ED8", words:[
    {es:"Hace calor",        en:"It's hot",          emoji:"☀️", hook:"AH-say cah-lor — it makes calor — hot hot hot!"},
    {es:"Hace frío",         en:"It's cold",         emoji:"🧊", hook:"free-oh — it's cold and free-zing cold!"},
    {es:"Está lloviendo",    en:"It's raining",      emoji:"🌧️", hook:"yo-bee-en-do — it's raining loving drops from the sky!"},
    {es:"Hace viento",       en:"It's windy",        emoji:"💨", hook:"bee-en-to — windy like a vent blowing hard!"},
    {es:"Está nublado",      en:"It's cloudy",       emoji:"☁️", hook:"noo-blah-do — cloudy and totally blah-do gray!"},
    {es:"¿Cómo está el clima?",en:"What's the weather like?",emoji:"🌡️", hook:"klee-mah — the climate clime changes fast in Cuenca!"},
    {es:"Va a llover",       en:"It's going to rain",emoji:"⛈️", hook:"yo-bair — it's going to rain like a lover of water!"},
    {es:"Hace buen tiempo",  en:"The weather is nice",emoji:"🌈", hook:"tee-em-po — nice weather tempo — what a GOOD time!"},
    {es:"El sol",            en:"The sun",           emoji:"☀️", hook:"sole — the sun is your sole friend on cold days!"},
    {es:"La lluvia",         en:"The rain",          emoji:"🌧️", hook:"yoo-bee-ah — the rain goes yoobia yoobia down!"},
    {es:"La neblina",        en:"The fog",           emoji:"🌫️", hook:"neh-blee-nah — fog like a nebula floating down!"},
    {es:"Qué fresco",        en:"How pleasant",      emoji:"😌", hook:"fres-co — how fresh and pleasant — fresco cool!"},
  ]},
};


// ══ LEVEL 3 VOCAB (Advanced Intermediate) ════════════════════════════════════
export const VOCAB_L3 = {
  opinions: { icon:"💬", label:"Opinions & Ideas", color:"#BE185D", words:[
    {es:"Creo que",en:"I think that",emoji:"💭",hook:"kreh-oh — I create my own thoughts — creo que!"},
    {es:"En mi opinión",en:"In my opinion",emoji:"🗣️",hook:"oh-pee-nyon — your opinion is your own onion — unique and layered!"},
    {es:"Estoy de acuerdo",en:"I agree",emoji:"👍",hook:"ah-kwair-do — I agree to meet at the square-do!"},
    {es:"No estoy de acuerdo",en:"I disagree",emoji:"👎",hook:"No agreement — the square is the wrong shape!"},
    {es:"Depende",en:"It depends",emoji:"🤷",hook:"deh-pen-day — it depends on which pen-day you pick!"},
    {es:"Me parece bien",en:"It seems fine to me",emoji:"✅",hook:"pah-reh-seh — it appears and seems just right to me!"},
    {es:"No me gusta",en:"I don't like it",emoji:"😕",hook:"No goose-ta — the goose did NOT like that at all!"},
    {es:"Me encanta",en:"I love it",emoji:"😍",hook:"en-kan-ta — it enchants me — en-chant-a!"},
    {es:"Es interesante",en:"It's interesting",emoji:"🤔",hook:"in-teh-reh-san-tay — it's INTERESTING like a saint dancing!"},
    {es:"Tiene razón",en:"You are right",emoji:"🎯",hook:"rah-sohn — you have reason — rah-sohn is right!"},
    {es:"No tiene razón",en:"You are wrong",emoji:"❌",hook:"No reason — no rah-sohn for that!"},
    {es:"Quizás",en:"Maybe",emoji:"🤷",hook:"kee-sas — maybe a kiss-as will help!"},
    {es:"Desde luego",en:"Of course",emoji:"💯",hook:"des-day lweh-go — of course from THERE to HERE!"},
    {es:"Sin embargo",en:"However",emoji:"↔️",hook:"em-bar-go — however the embargo stopped it!"},
  ]},
  travel: { icon:"✈️", label:"Travel", color:"#0F766E", words:[
    {es:"El aeropuerto",en:"The airport",emoji:"✈️",hook:"ah-roh-pwair-to — the air-o-port opens to the sky!"},
    {es:"El vuelo",en:"The flight",emoji:"🛫",hook:"bweh-lo — the flight goes whoa up into the sky!"},
    {es:"El pasaporte",en:"The passport",emoji:"📕",hook:"pah-sah-por-tay — your pass-a-port-ay gets you through the port!"},
    {es:"La maleta",en:"The suitcase",emoji:"🧳",hook:"mah-leh-ta — your suitcase holds your maleta of memories!"},
    {es:"El equipaje",en:"The luggage",emoji:"🧳",hook:"eh-kee-pah-hey — EQUIPMENT for your journey — eh-kee-pah!"},
    {es:"La reservación",en:"The reservation",emoji:"📋",hook:"reh-sair-bah-syon — reserve your spot at the station!"},
    {es:"El hotel",en:"The hotel",emoji:"🏨",hook:"oh-tel — hotel sounds the same — oh-tel!"},
    {es:"La habitación",en:"The room",emoji:"🛏️",hook:"ah-bee-tah-syon — HABITATION — your living space!"},
    {es:"¿A qué hora sale?",en:"What time does it leave?",emoji:"🕐",hook:"sah-leh — what hour does it sail away?"},
    {es:"¿Dónde está la salida?",en:"Where is the exit?",emoji:"🚪",hook:"sah-lee-da — the exit sails you out the door!"},
    {es:"Perdí mi equipaje",en:"I lost my luggage",emoji:"😱",hook:"pair-dee — I'm in a PAIR of trouble — lost it!"},
    {es:"Quiero cambiar dinero",en:"I want to exchange money",emoji:"💱",hook:"kahm-bee-ar — change money at the cambio!"},
  ]},
  health: { icon:"🏥", label:"Health & Emergency", color:"#DC2626", words:[
    {es:"Llame a la policía",en:"Call the police",emoji:"🚔",hook:"YAH-meh — call the llama police — YAH-meh!"},
    {es:"Necesito ayuda",en:"I need help",emoji:"🆘",hook:"ah-yoo-da — I need aid — ayu-da!"},
    {es:"¿Dónde está el hospital?",en:"Where is the hospital?",emoji:"🏥",hook:"ohs-pee-tal — the hospital is the os-pee-tal!"},
    {es:"Tengo una alergia",en:"I have an allergy",emoji:"🤧",hook:"ah-lair-hee-ah — allergy — ah-lair in the air!"},
    {es:"Soy diabético",en:"I am diabetic",emoji:"💉",hook:"dee-ah-beh-tee-co — DIAbetic — dia-beh!"},
    {es:"Necesito mis medicamentos",en:"I need my medication",emoji:"💊",hook:"meh-dee-kah-men-tos — MEDICATION MENtos!"},
    {es:"Me robaron",en:"I was robbed",emoji:"🚨",hook:"roh-bah-ron — rob-aron — they robbed me!"},
    {es:"Estoy perdido",en:"I am lost",emoji:"😟",hook:"pair-dee-do — lost in a PAIR of streets!"},
    {es:"¿Puede llamar a alguien?",en:"Can you call someone?",emoji:"📞",hook:"YAH-mar — can you call someone — llama them!"},
    {es:"No me siento bien",en:"I don't feel well",emoji:"🤒",hook:"see-en-to — I don't sense wellness — no see-en-to!"},
    {es:"¿Tiene un seguro médico?",en:"Do you have insurance?",emoji:"📋",hook:"seh-goo-ro — secure medical coverage — seh-guro!"},
    {es:"Necesito descansar",en:"I need to rest",emoji:"😴",hook:"des-kan-sar — I need to descend into rest — des-kan!"},
  ]},
  socialLife: { icon:"🎉", label:"Social & Daily Life", color:"#7C3AED", words:[
    {es:"¿Qué haces en tu tiempo libre?",en:"What do you do in your free time?",emoji:"🕐",hook:"tee-em-po lee-breh — tempo libre — free time music!"},
    {es:"Me gusta leer",en:"I like to read",emoji:"📚",hook:"leh-air — I like to READ the air — leh-air!"},
    {es:"Salgo con amigos",en:"I go out with friends",emoji:"🎉",hook:"sal-go — I sally forth with friends — sal-go!"},
    {es:"Trabajo desde casa",en:"I work from home",emoji:"🏠",hook:"kasa — I work from my casa — home sweet home!"},
    {es:"¿Tienes planes?",en:"Do you have plans?",emoji:"📅",hook:"plah-nes — planes of plans ahead!"},
    {es:"¡Qué pena!",en:"What a shame!",emoji:"😞",hook:"peh-nah — what a pain — peh-nah!"},
    {es:"¡Qué suerte!",en:"What luck!",emoji:"🍀",hook:"swair-teh — sweet luck — swair-teh!"},
    {es:"¿Cómo fue?",en:"How did it go?",emoji:"❓",hook:"fweh — HOW did it FLY by — fweh!"},
    {es:"Fue genial",en:"It was great",emoji:"🌟",hook:"heh-nee-al — it was genial — GENIus-al!"},
    {es:"La próxima vez",en:"Next time",emoji:"⏭️",hook:"prohk-see-mah — PROXIMATE time — next and near!"},
    {es:"A veces",en:"Sometimes",emoji:"🔄",hook:"AH beh-ses — AH sometimes the bases change!"},
    {es:"Siempre",en:"Always",emoji:"♾️",hook:"see-em-preh — sempre — always in music means always!"},
  ]},
  technology: { icon:"📱", label:"Technology", color:"#1D4ED8", words:[
    {es:"El teléfono",en:"The phone",emoji:"📱",hook:"teh-leh-foh-no — TELEPHONE — tele-fono!"},
    {es:"La contraseña",en:"The password",emoji:"🔑",hook:"kon-tra-seh-nya — contra the entrance — kon-tra-SEÑ!"},
    {es:"¿Tiene WiFi?",en:"Do you have WiFi?",emoji:"📶",hook:"wee-fee — WiFi sounds the same worldwide!"},
    {es:"¿Cuál es la clave?",en:"What is the code/key?",emoji:"🔐",hook:"kla-beh — the clave is the key — kla-beh!"},
    {es:"La aplicación",en:"The app",emoji:"📲",hook:"ah-plee-kah-syon — APPLICATION — ah-plee-kay!"},
    {es:"Buscar en internet",en:"Search the internet",emoji:"🔍",hook:"boos-kar — boost your search on the internet!"},
    {es:"Mandar un mensaje",en:"Send a message",emoji:"💬",hook:"men-sah-heh — manage to send your message!"},
    {es:"La batería está baja",en:"The battery is low",emoji:"🔋",hook:"bah-teh-ree-ah bah-ha — battery going low-ha!"},
    {es:"¿Puedo cargar mi teléfono?",en:"Can I charge my phone?",emoji:"🔌",hook:"kar-gar — can I charge — cargo my phone up!"},
    {es:"Tomar una foto",en:"Take a photo",emoji:"📸",hook:"foh-to — foto — photo sounds almost the same!"},
  ]},
};

// ══ CORE 1000 — Most Common Spanish Words ════════════════════════════════════
// Organized in sets of 25, prioritized by frequency of use in conversation
export const CORE_SETS = [
  {
    setNum:1, title:"Top 25 Essential Words", color:"#DC2626",
    words:[
      {es:"El / La",en:"The",emoji:"📌",hook:"el/la — THE most used word — just el or la!"},
      {es:"De",en:"Of / From",emoji:"📍",hook:"deh — de-liver from — coming FROM somewhere!"},
      {es:"Y",en:"And",emoji:"➕",hook:"ee — E-asy AND simple — just say ee!"},
      {es:"En",en:"In / On",emoji:"📦",hook:"en — in the box — like English 'in'!"},
      {es:"Un / Una",en:"A / An",emoji:"1️⃣",hook:"oon/oo-na — A single ONE thing — oon!"},
      {es:"Que",en:"That / What",emoji:"❓",hook:"keh — THAT's what — keh said that?"},
      {es:"Se",en:"Oneself / Each other",emoji:"🔄",hook:"seh — self — like reFLEXive self!"},
      {es:"No",en:"No / Not",emoji:"🚫",hook:"no — NO needs no hook — it's the same!"},
      {es:"Con",en:"With",emoji:"🤝",hook:"kon — con-nect WITH someone — kon!"},
      {es:"Por",en:"For / By / Through",emoji:"🛣️",hook:"por — por-tal through which things pass!"},
      {es:"Su",en:"His / Her / Their",emoji:"👤",hook:"soo — su-e owns everything — soo!"},
      {es:"Para",en:"For / In order to",emoji:"🎯",hook:"pah-ra — PARAllel FOR a purpose!"},
      {es:"Como",en:"Like / As / How",emoji:"🔍",hook:"koh-mo — como — HOW like a comma pausing!"},
      {es:"Más",en:"More",emoji:"➕",hook:"mas — MORE mMAS — just like mas in music!"},
      {es:"Pero",en:"But",emoji:"↔️",hook:"peh-ro — BUT a pear-oh stops the sentence!"},
      {es:"Si",en:"If",emoji:"🤔",hook:"see — if you SEE it — see!"},
      {es:"Ya",en:"Already / Now",emoji:"⚡",hook:"yah — YAH already done — YAH!"},
      {es:"Todo",en:"All / Everything",emoji:"🌐",hook:"toh-do — TODO list has EVERYTHING!"},
      {es:"Le",en:"To him / To her",emoji:"👆",hook:"leh — le-t him have it — leh!"},
      {es:"Bien",en:"Well / Good",emoji:"✅",hook:"bee-en — BEAN good — feeling bee-en!"},
      {es:"Cuando",en:"When",emoji:"🕐",hook:"kwan-do — WHEN is it quando?"},
      {es:"Muy",en:"Very",emoji:"‼️",hook:"moo-ee — VERY moo-ee like a cow yelling VERY loud!"},
      {es:"Sin",en:"Without",emoji:"🚫",hook:"seen — sin — without good it's a sin!"},
      {es:"Sobre",en:"About / On top of",emoji:"📋",hook:"soh-breh — SOBER thoughts ABOUT things!"},
      {es:"Hay",en:"There is / There are",emoji:"🗺️",hook:"eye — THERE is — AYE there's something there!"},
    ]
  },
  {
    setNum:2, title:"Words 26–50: Actions & States", color:"#D97706",
    words:[
      {es:"Ser",en:"To be (permanent)",emoji:"♾️",hook:"sair — to be forever — sair always!"},
      {es:"Estar",en:"To be (temporary)",emoji:"⏳",hook:"es-tar — star position — where you're standing now!"},
      {es:"Tener",en:"To have",emoji:"✋",hook:"teh-nair — tennis player has a racket — TEN-er!"},
      {es:"Hacer",en:"To do / To make",emoji:"🔨",hook:"ah-sair — to DO — a sayer does things!"},
      {es:"Ir",en:"To go",emoji:"🚶",hook:"eer — GO —eer away!"},
      {es:"Ver",en:"To see",emoji:"👁️",hook:"bair — to SEE — BEAR sees you!"},
      {es:"Dar",en:"To give",emoji:"🎁",hook:"dar — DARE to GIVE — dar!"},
      {es:"Saber",en:"To know (facts)",emoji:"🧠",hook:"sah-bair — savvy — to KNOW the facts!"},
      {es:"Querer",en:"To want / To love",emoji:"❤️",hook:"keh-rair — to CARE and WANT — keh-rair!"},
      {es:"Llegar",en:"To arrive",emoji:"🏁",hook:"yeh-gar — yeah I arrived — yeh-gar!"},
      {es:"Pasar",en:"To pass / To happen",emoji:"➡️",hook:"pah-sar — to pass — pah-pass!"},
      {es:"Deber",en:"Should / Must",emoji:"⚠️",hook:"deh-bair — debt — you should pay your debts!"},
      {es:"Poner",en:"To put / To place",emoji:"📌",hook:"poh-nair — to PUT — poner places things!"},
      {es:"Venir",en:"To come",emoji:"👋",hook:"beh-neer — COME here veneer!"},
      {es:"Seguir",en:"To follow / To continue",emoji:"▶️",hook:"seh-geer — seguir — seek and follow!"},
      {es:"Encontrar",en:"To find / To meet",emoji:"🔍",hook:"en-kon-trar — ENCOUNTER — to find and meet!"},
      {es:"Llamar",en:"To call",emoji:"📞",hook:"yah-mar — call the llama — yah-mar!"},
      {es:"Creer",en:"To believe",emoji:"🙏",hook:"kreh-air — to believe — create belief!"},
      {es:"Hablar",en:"To speak",emoji:"🗣️",hook:"ah-blar — able to speak — ah-blar!"},
      {es:"Llevar",en:"To carry / To take",emoji:"🎒",hook:"yeh-bar — carry the lever — yeh-bar!"},
      {es:"Dejar",en:"To leave / To let",emoji:"🚪",hook:"deh-har — depart and leave — deh-har!"},
      {es:"Sentir",en:"To feel",emoji:"💓",hook:"sen-teer — sentient feeling — sen-teer!"},
      {es:"Vivir",en:"To live",emoji:"🌱",hook:"bee-beer — to LIVE and drink beer of life — vee-veer!"},
      {es:"Pensar",en:"To think",emoji:"💭",hook:"pen-sar — pensive thinker — pen-sar!"},
      {es:"Salir",en:"To leave / To go out",emoji:"🚶",hook:"sah-leer — sally out — sal-leer!"},
    ]
  },
  {
    setNum:3, title:"Words 51–75: People & Places", color:"#059669",
    words:[
      {es:"La persona",en:"The person",emoji:"👤",hook:"pair-soh-na — persona — your personal self!"},
      {es:"El hombre",en:"The man",emoji:"👨",hook:"ohm-breh — the MAN is sombre — ohm-breh!"},
      {es:"La mujer",en:"The woman",emoji:"👩",hook:"moo-hair — the woman has the hair — moo-hair!"},
      {es:"El niño",en:"The boy",emoji:"👦",hook:"nee-nyo — the BOY is ninja — nee-nyo!"},
      {es:"La niña",en:"The girl",emoji:"👧",hook:"nee-nya — the girl is a ninja too — nee-nya!"},
      {es:"La ciudad",en:"The city",emoji:"🏙️",hook:"see-oo-dad — dad lives in the city — see-oo-dad!"},
      {es:"El país",en:"The country",emoji:"🗺️",hook:"pah-ees — the country is a peace of land!"},
      {es:"La casa",en:"The house",emoji:"🏠",hook:"kah-sah — casa — house is casa!"},
      {es:"El trabajo",en:"The work / Job",emoji:"💼",hook:"trah-bah-ho — trouble at WORK — trah-bah!"},
      {es:"El tiempo",en:"Time / Weather",emoji:"⏰",hook:"tee-em-po — tempo of time and weather!"},
      {es:"El año",en:"The year",emoji:"📅",hook:"AH-nyo — annual year — AH-nyo!"},
      {es:"El día",en:"The day",emoji:"🌞",hook:"dee-ah — the DAY — dee-lightful day!"},
      {es:"La vida",en:"Life",emoji:"🌱",hook:"bee-da — vita — vida is life!"},
      {es:"El mundo",en:"The world",emoji:"🌍",hook:"moon-do — the world has a moon-do!"},
      {es:"La mano",en:"The hand",emoji:"✋",hook:"mah-no — MAN-o hand — MAN of hands!"},
      {es:"El lugar",en:"The place",emoji:"📍",hook:"loo-gar — the PLACE — lure to a gar-den!"},
      {es:"La vez",en:"The time (occasion)",emoji:"🔁",hook:"behs — once upon a vez — time!"},
      {es:"La parte",en:"The part",emoji:"🧩",hook:"par-teh — PART of the party!"},
      {es:"El lado",en:"The side",emoji:"↔️",hook:"lah-do — the SIDE — laid-o on one side!"},
      {es:"El punto",en:"The point",emoji:"🎯",hook:"poon-to — point — point-o right there!"},
      {es:"El tipo",en:"The type / Guy",emoji:"👤",hook:"tee-po — type of person — tee-po!"},
      {es:"La manera",en:"The way / Manner",emoji:"🛣️",hook:"mah-neh-rah — manner of the WAY!"},
      {es:"La forma",en:"The form / Way",emoji:"📝",hook:"FOR-mah — form — FOR-ma!"},
      {es:"El nombre",en:"The name",emoji:"🏷️",hook:"nohm-breh — nombre — the name!"},
      {es:"El caso",en:"The case",emoji:"🗂️",hook:"kah-so — the case — kah-so!"},
    ]
  },
  {
    setNum:4, title:"Words 76–100: Connectors & Expressions", color:"#7C3AED",
    words:[
      {es:"También",en:"Also / Too",emoji:"➕",hook:"tahm-bee-en — TAMBOURINE also makes music!"},
      {es:"Sólo",en:"Only / Just",emoji:"1️⃣",hook:"soh-lo — SOLO — ONLY one person!"},
      {es:"Así",en:"Like this / So",emoji:"👆",hook:"ah-SEE — so — AH-SEE like this!"},
      {es:"Ahí",en:"There",emoji:"📍",hook:"ah-ee — AH-ee there it is!"},
      {es:"Aquí",en:"Here",emoji:"📍",hook:"ah-kee — ah-key is HERE!"},
      {es:"Allí",en:"Over there",emoji:"👉",hook:"ah-yee — ah-yee over THERE!"},
      {es:"Después",en:"After / Later",emoji:"⏭️",hook:"des-pwes — AFTER — des-pass the time!"},
      {es:"Antes",en:"Before",emoji:"⏮️",hook:"ahn-tes — ante — before the ante!"},
      {es:"Ahora",en:"Now",emoji:"⚡",hook:"ah-OH-rah — NOW — ah-OH-ra right now!"},
      {es:"Siempre",en:"Always",emoji:"♾️",hook:"see-em-preh — sempre — always in music!"},
      {es:"Nunca",en:"Never",emoji:"🚫",hook:"noon-kah — NEVER at noon-kah!"},
      {es:"Poco",en:"A little / Few",emoji:"🤏",hook:"poh-ko — POCO — a little POCO!"},
      {es:"Mucho",en:"A lot / Much",emoji:"📦",hook:"moo-cho — MUCH moo from the cow!"},
      {es:"Muy",en:"Very",emoji:"‼️",hook:"moo-ee — VERY moo — very loud cow!"},
      {es:"Tanto",en:"So much / As much",emoji:"⚖️",hook:"tan-to — tan-much in the tan skin!"},
      {es:"Mismo",en:"Same / Itself",emoji:"🪞",hook:"mees-mo — SAME mirror — mees-mo!"},
      {es:"Cada",en:"Each / Every",emoji:"🔢",hook:"kah-da — EACH cada-et learns every day!"},
      {es:"Entre",en:"Between / Among",emoji:"↔️",hook:"en-treh — entre-ance between two doors!"},
      {es:"Dentro",en:"Inside",emoji:"📦",hook:"den-tro — inside the den-tro!"},
      {es:"Fuera",en:"Outside",emoji:"🌳",hook:"fwair-ah — outside — it's fair outside!"},
      {es:"Contra",en:"Against",emoji:"⚔️",hook:"kon-trah — contra — against the enemy!"},
      {es:"Hacia",en:"Toward",emoji:"➡️",hook:"AH-see-ah — toward — AH-see the direction!"},
      {es:"Desde",en:"Since / From",emoji:"📅",hook:"des-deh — since — from THAT des-k!"},
      {es:"Hasta",en:"Until / Up to",emoji:"🏁",hook:"ahs-tah — hasta la vista — UNTIL we meet!"},
      {es:"Durante",en:"During",emoji:"⏱️",hook:"doo-ran-teh — during the DURAtion!"},
    ]
  },
];

const CORE_ALL_WORDS = CORE_SETS.flatMap(s => s.words);

export const ALL_WORDS_L1 = Object.values(VOCAB_L1).flatMap(c => c.words);
export const ALL_WORDS_L2 = Object.values(VOCAB_L2).flatMap(c => c.words);
export const ALL_WORDS_L3 = Object.values(VOCAB_L3).flatMap(c => c.words);
export const ALL_WORDS    = [...ALL_WORDS_L1, ...ALL_WORDS_L2, ...ALL_WORDS_L3, ...CORE_ALL_WORDS];

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
