import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ══ LEVEL 1 VOCAB — every word has a memory hook ═════════════════════════════
const VOCAB_L1 = {
  greetings: { icon:"👋", label:"Greetings", color:"#E8445A", words:[
    {es:"Hola",              en:"Hello",           emoji:"👋", hook:"Imagine a giant HOLE-A in the ground waving hello!"},
    {es:"Buenos días",       en:"Good morning",    emoji:"🌅", hook:"BOO! A friendly ghost pops out saying good morning — BOO-en-os DEE-as!"},
    {es:"Buenas tardes",     en:"Good afternoon",  emoji:"☀️", hook:"The BOO ghost is back in the afternoon! BWEH-nas TAR-days."},
    {es:"Buenas noches",     en:"Good night",      emoji:"🌙", hook:"BOO at NIGHT — NOH-ches sounds like 'no chess at night'!"},
    {es:"¿Cómo estás?",      en:"How are you?",    emoji:"🙂", hook:"COMO a lake asking HOW you're doing — KOH-mo es-TAS?"},
    {es:"Estoy bien",        en:"I'm fine",        emoji:"👍", hook:"I'm STAYING (es-TOY) just BEAN (bien) fine — like a happy jumping bean!"},
    {es:"Gracias",           en:"Thank you",       emoji:"🙏", hook:"GRAS-ee-us — you're thankful someone mowed your GRASS for you!"},
    {es:"De nada",           en:"You're welcome",  emoji:"😊", hook:"It's NADA — NOTHING — like saying 'it was nothing at all!'"},
    {es:"Por favor",         en:"Please",          emoji:"⭐", hook:"POUR FLAVOR on it please — por fa-VOR!"},
    {es:"Adiós",             en:"Goodbye",         emoji:"✌️", hook:"ADD one more OH when leaving — ah-dee-OHS!"},
    {es:"Hasta luego",       en:"See you later",   emoji:"🤗", hook:"HASTA la vista! See you LUEGO (LOO-ay-go) — like a logo you'll see again!"},
    {es:"¿Cómo te llamas?",  en:"What's your name?",emoji:"❓", hook:"A LLAMA is calling YOUR name — YAH-mas? The llama wants to know!"},
    {es:"Me llamo...",       en:"My name is...",   emoji:"🏷️", hook:"ME + a LLAMA — MY llama's name is... YAH-mo!"},
    {es:"Mucho gusto",       en:"Nice to meet you",emoji:"🤝", hook:"MUCHO GUSTO — a GUST of wind blows you together — so nice to meet!"},
  ]},
  around: { icon:"🏙️", label:"Around Town", color:"#DC6B19", words:[
    {es:"Disculpe",                  en:"Excuse me",              emoji:"🙋", hook:"DIS-COOL-pay — excuse the super DIS-COOL person!"},
    {es:"¿Dónde está el baño?",      en:"Where is the bathroom?", emoji:"🚻", hook:"DON'T-ay? DON'T wait — find the bathroom fast! DOHN-day es-TA?"},
    {es:"La cuenta por favor",       en:"The check please",       emoji:"🧾", hook:"KWEN-ta — COUNT the bill before paying!"},
    {es:"Una mesa para dos",         en:"A table for two",        emoji:"🪑", hook:"A MESA (table) for DOS — like two DOSAS on the table!"},
    {es:"¿Cuánto cuesta?",           en:"How much does it cost?", emoji:"💰", hook:"KWAHN-to KWES-ta — HOW MUCH does this QUEST cost?"},
    {es:"Quiero ordenar",            en:"I'd like to order",      emoji:"📋", hook:"KYER-oh — I CHEER-oh to order my food!"},
    {es:"Un café con leche",         en:"Coffee with milk",       emoji:"☕", hook:"CAF-ay con LEH-chay — coffee with LECHY stretchy milk!"},
    {es:"¿Habla inglés?",            en:"Do you speak English?",  emoji:"🗣️", hook:"AH-bla — is this ABLE person speaking my language?"},
    {es:"No hablo español bien",     en:"I don't speak Spanish well",emoji:"😅", hook:"No AH-blo — I'm NOT ABLE to speak it well yet!"},
    {es:"Más despacio por favor",    en:"More slowly please",     emoji:"🐢", hook:"MAS des-PAH-see-oh — MORE slowly like a turtle! MUCH slower!"},
    {es:"A la derecha",              en:"To the right",           emoji:"➡️", hook:"DARE-echa — I DARE you to go RIGHT!"},
    {es:"A la izquierda",            en:"To the left",            emoji:"⬅️", hook:"ees-kee-AIR-da — it's QUIRKY and airy going LEFT!"},
    {es:"Todo recto",                en:"Straight ahead",         emoji:"⬆️", hook:"TODO RECTO — totally ERECT and straight ahead!"},
    {es:"¿Me puede ayudar?",         en:"Can you help me?",       emoji:"🤝", hook:"AYE-oo-DAR — AYE! You DARE to help me? Please!"},
  ]},
  family: { icon:"👨‍👩‍👧", label:"Family", color:"#10B981", words:[
    {es:"Mamá",    en:"Mom",           emoji:"👩", hook:"MA + MA — double the love, double the MA!"},
    {es:"Papá",    en:"Dad",           emoji:"👨", hook:"PA + PA — double the PA, double the dad hugs!"},
    {es:"Hermana", en:"Sister",        emoji:"👧", hook:"HER MANA — SHE has the magic MANA — that's your sister!"},
    {es:"Hermano", en:"Brother",       emoji:"👦", hook:"HER MANO — your bro is HER MAN-OH!"},
    {es:"Abuela",  en:"Grandma",       emoji:"👵", hook:"ah-BWEH-la — grandma flies in on a propeller — BWEH!"},
    {es:"Abuelo",  en:"Grandpa",       emoji:"👴", hook:"ah-BWEH-lo — grandpa flies in too — BWEH-lo!"},
    {es:"Bebé",    en:"Baby",          emoji:"👶", hook:"BAY-BAY — babies say BAY-BAY and everyone smiles!"},
    {es:"Amigo",   en:"Friend (boy)",  emoji:"🧑", hook:"ah-MEE-go — your buddy from the movie saying I GO with you amigo!"},
    {es:"Amiga",   en:"Friend (girl)", emoji:"👩", hook:"ah-MEE-ga — your girl friend — ME + GA, she goes everywhere with you!"},
    {es:"Mascota", en:"Pet",           emoji:"🐾", hook:"mas-KOH-ta — your pet wears a MASCOT costume at every game!"},
  ]},
  food: { icon:"🍎", label:"Food", color:"#F59E0B", words:[
    {es:"Agua",        en:"Water",       emoji:"💧", hook:"AH-gwa — water goes AH-GWA-GWA when you splash in it!"},
    {es:"Leche",       en:"Milk",        emoji:"🥛", hook:"LEH-chay — milk is so LECHY and stretchy when it pours!"},
    {es:"Pan",         en:"Bread",       emoji:"🍞", hook:"PAN — you cook bread IN A PAN — simple as that!"},
    {es:"Arroz",       en:"Rice",        emoji:"🍚", hook:"ah-ROSE — rice grows in fields like a beautiful ROSE garden!"},
    {es:"Pollo",       en:"Chicken",     emoji:"🍗", hook:"POY-yo — POLO the chicken plays polo on horseback!"},
    {es:"Manzana",     en:"Apple",       emoji:"🍎", hook:"man-ZAH-na — a MAN-sized BANANA shaped like an apple!"},
    {es:"Naranja",     en:"Orange",      emoji:"🍊", hook:"nah-RAN-ha — the runner RAN to grab the orange — nah-RAN-ha!"},
    {es:"Helado",      en:"Ice cream",   emoji:"🍦", hook:"eh-LAH-do — HELD the ice cream before it melted — HELD-ado!"},
    {es:"Tengo hambre",en:"I'm hungry",  emoji:"😋", hook:"TEN-go — I'm so TENSE because my stomach has TEN growls!"},
    {es:"Tengo sed",   en:"I'm thirsty", emoji:"🥤", hook:"SED — so DRY and SAID to be thirsty!"},
    {es:"Delicioso",   en:"Delicious",   emoji:"😍", hook:"deh-lee-SEE-oh-so — so delicious you can SEE it glowing!"},
    {es:"Quiero más",  en:"I want more", emoji:"🙋", hook:"KYER-oh MAS — CHEER-oh for MAS more — MORE MORE MORE!"},
  ]},
  feelings: { icon:"😊", label:"Feelings", color:"#8B5CF6", words:[
    {es:"Feliz",          en:"Happy",    emoji:"😄", hook:"feh-LEES — FEEL the happiness in your knees!"},
    {es:"Triste",         en:"Sad",      emoji:"😢", hook:"TREES-tay — a sad TREE just stood there dripping tears today!"},
    {es:"Cansado",        en:"Tired",    emoji:"😴", hook:"kan-SAH-do — CAN'T-DO anything because I'm so tired!"},
    {es:"Emocionado",     en:"Excited",  emoji:"🤩", hook:"eh-mo-see-OH-nah-do — your EMOTIONS explode like a volcano!"},
    {es:"Asustado",       en:"Scared",   emoji:"😨", hook:"ah-soos-TAH-do — a GHOST says BOO and you're so SCARED-ado!"},
    {es:"Enojado",        en:"Angry",    emoji:"😠", hook:"eh-no-HA-do — ENOUGH! No HA-do! I'm angry!"},
    {es:"Te quiero",      en:"I love you",emoji:"❤️", hook:"tay KYER-oh — CHEER for the one you love — te CHEER-oh!"},
    {es:"Me siento bien", en:"I feel good",emoji:"✨", hook:"see-EN-to — I SENSE I feel amazing — me see-EN-to bien!"},
  ]},
  school: { icon:"📚", label:"School", color:"#3B82F6", words:[
    {es:"Maestra",         en:"Teacher (f)",          emoji:"👩‍🏫", hook:"my-EHS-tra — the MASTER-A teacher rules the class!"},
    {es:"Maestro",         en:"Teacher (m)",          emoji:"👨‍🏫", hook:"my-EHS-tro — the MAESTRO teacher leads like an orchestra!"},
    {es:"Libro",           en:"Book",                 emoji:"📚", hook:"LEE-bro — LEE BROught his favorite book to read!"},
    {es:"Lápiz",           en:"Pencil",               emoji:"✏️", hook:"LAH-pees — the PENCIL draws in LAPS around the page!"},
    {es:"Escuela",         en:"School",               emoji:"🏫", hook:"es-KWAY-la — SCHOOL is the ESKIMO way of learning — es-KWAY-la!"},
    {es:"No entiendo",     en:"I don't understand",   emoji:"🤔", hook:"en-tee-EN-do — I don't TEND-to understand this at all!"},
    {es:"¿Me puedes ayudar?",en:"Can you help me?",  emoji:"🙋", hook:"AYE-oo-DAR — AYE! You DARE help me with this?"},
    {es:"Entiendo",        en:"I understand",         emoji:"💡", hook:"en-tee-EN-do — NOW I TEND-to understand — the light bulb is ON!"},
  ]},
  numbers: { icon:"🔢", label:"Numbers", color:"#06B6D4", words:[
    {es:"Uno",   en:"One",   emoji:"1️⃣", hook:"OO-no — ONE more OOH makes everything fun!"},
    {es:"Dos",   en:"Two",   emoji:"2️⃣", hook:"DOSE — the doctor gives you TWO doses of medicine!"},
    {es:"Tres",  en:"Three", emoji:"3️⃣", hook:"TRACE — THREE lines to trace on the paper!"},
    {es:"Cuatro",en:"Four",  emoji:"4️⃣", hook:"KWAH-tro — FOUR QUARTERS make one dollar — KWAH-tro!"},
    {es:"Cinco", en:"Five",  emoji:"5️⃣", hook:"SINK-oh — FIVE things fell into the SINK-oh!"},
    {es:"Seis",  en:"Six",   emoji:"6️⃣", hook:"SACE — SIX geese went SACE SACE SACE!"},
    {es:"Siete", en:"Seven", emoji:"7️⃣", hook:"see-EH-tay — SEVEN ate (see-ATE) nine for breakfast!"},
    {es:"Ocho",  en:"Eight", emoji:"8️⃣", hook:"OH-cho — EIGHT is an OH with a CHO CHO train!"},
    {es:"Nueve", en:"Nine",  emoji:"9️⃣", hook:"NWEH-bay — NINE bees went WHEW into the hive!"},
    {es:"Diez",  en:"Ten",   emoji:"🔟", hook:"dee-EHS — TEN DAYS in the sun — dee-EHS days!"},
  ]},
  colors: { icon:"🎨", label:"Colors", color:"#EC4899", words:[
    {es:"Rojo",     en:"Red",    emoji:"🔴", hook:"ROH-ho — RED ROH-hos of roses everywhere!"},
    {es:"Azul",     en:"Blue",   emoji:"🔵", hook:"ah-ZOOL — the AZURE blue sky goes ah-ZOOL!"},
    {es:"Verde",    en:"Green",  emoji:"🟢", hook:"BAIR-day — GREEN bears eating leaves today — BEAR-day!"},
    {es:"Amarillo", en:"Yellow", emoji:"🟡", hook:"ah-mah-REE-yo — an ARMADILLO painted itself YELLOW!"},
    {es:"Naranja",  en:"Orange", emoji:"🟠", hook:"nah-RAN-ha — ORANGE? You RAN here to get one!"},
    {es:"Morado",   en:"Purple", emoji:"🟣", hook:"moh-RAH-do — MORE-ado purple please — I want MORE!"},
    {es:"Rosa",     en:"Pink",   emoji:"🩷", hook:"ROH-sa — ROSA always wears PINK roses!"},
    {es:"Blanco",   en:"White",  emoji:"⬜", hook:"BLAN-co — a BLANK white piece of paper — BLANK-o!"},
    {es:"Negro",    en:"Black",  emoji:"⬛", hook:"NEH-gro — NEGRO means BLACK like the night sky!"},
    {es:"Café",     en:"Brown",  emoji:"🟤", hook:"cah-FAY — COFFEE is BROWN — cafe au lait!"},
  ]},
  animals: { icon:"🐾", label:"Animals", color:"#64748B", words:[
    {es:"Perro",    en:"Dog",      emoji:"🐶", hook:"PAIR-oh — a PAIR of dogs are better than one!"},
    {es:"Gato",     en:"Cat",      emoji:"🐱", hook:"GAH-to — the cat's GOTTA go — see ya GAH-to!"},
    {es:"Pájaro",   en:"Bird",     emoji:"🐦", hook:"PAH-ha-ro — the bird PARACHUTES down — PAH-ha-ro!"},
    {es:"Pez",      en:"Fish",     emoji:"🐠", hook:"PEHZ — PEZ candy is FISH-shaped — same word!"},
    {es:"Caballo",  en:"Horse",    emoji:"🐴", hook:"cah-BAH-yo — the horse GALLOPS saying BAH-yo BAH-yo!"},
    {es:"Vaca",     en:"Cow",      emoji:"🐮", hook:"BAH-ca — the cow says BAH! BAH-ca BAH-ca!"},
    {es:"Mono",     en:"Monkey",   emoji:"🐒", hook:"MOH-no — MONO means alone — the lonely monkey!"},
    {es:"Elefante", en:"Elephant", emoji:"🐘", hook:"eh-leh-FAN-tay — the ELEPHANT is a huge FAN of Spanish!"},
    {es:"León",     en:"Lion",     emoji:"🦁", hook:"lay-ON — the LION LAYS ON the grass in the sun!"},
    {es:"Tortuga",  en:"Turtle",   emoji:"🐢", hook:"tor-TOO-ga — the TURTLE took TOO long to get here!"},
  ]},
};

// ══ LEVEL 2 VOCAB — Intermediate ═════════════════════════════════════════════
const VOCAB_L2 = {
  verbs: { icon:"⚡", label:"Verbs & Actions", color:"#7C3AED", words:[
    {es:"Quiero",           en:"I want",          emoji:"🙋", hook:"KYER-oh — I CHEER-oh for what I want!"},
    {es:"Necesito",         en:"I need",           emoji:"❗", hook:"neh-seh-SEE-to — I NEED to SEE-to it right now!"},
    {es:"Tengo",            en:"I have",           emoji:"✋", hook:"TEN-go — I HAVE ten things to go do!"},
    {es:"Voy",              en:"I'm going",        emoji:"🚶", hook:"BOY — I'm going like a BOY SCOUT on a mission!"},
    {es:"Me gusta",         en:"I like",           emoji:"👍", hook:"me GOOS-ta — I like it with GUSTO — goos-TA!"},
    {es:"Puedo",            en:"I can",            emoji:"💪", hook:"PWEH-do — I can POWER through anything!"},
    {es:"Sé",               en:"I know",           emoji:"🧠", hook:"SAY — I KNOW what to SAY about that!"},
    {es:"Hablo",            en:"I speak",          emoji:"🗣️", hook:"AH-blo — I speak BLOW by blow — AH-blo!"},
    {es:"Busco",            en:"I'm looking for",  emoji:"🔍", hook:"BOOS-co — I'm BOOSTING my search — BOOS-co!"},
    {es:"Vivo en",          en:"I live in",        emoji:"🏠", hook:"BEE-bo — I LIVE like a BEE in my hive — BEE-bo!"},
    {es:"No sé",            en:"I don't know",     emoji:"🤷", hook:"SAY — I can't SAY because I just don't know!"},
    {es:"¿Puedes repetir?", en:"Can you repeat?",  emoji:"🔁", hook:"reh-peh-TEER — REPEAT it like a spinning TIRE — TEER TEER!"},
    {es:"Entendí",          en:"I understood",     emoji:"💡", hook:"en-ten-DEE — I DID understand — past tense — DID-ee!"},
    {es:"Quiero aprender",  en:"I want to learn",  emoji:"📖", hook:"ah-pren-DAIR — I want to learn from the thin AIR — DAIR!"},
  ]},
  time: { icon:"🕐", label:"Time & Days", color:"#0369A1", words:[
    {es:"Hoy",            en:"Today",         emoji:"📅", hook:"OY — TODAY I say OY what a day!"},
    {es:"Mañana",         en:"Tomorrow",      emoji:"🌅", hook:"mahn-YAH-na — TOMORROW is like a man eating a BANANA — man-YANA!"},
    {es:"Ayer",           en:"Yesterday",     emoji:"⏪", hook:"ah-YAIR — YESTERDAY the AIR smelled different!"},
    {es:"Ahora",          en:"Right now",     emoji:"⚡", hook:"ah-OH-ra — RIGHT NOW say AH-OH-RA really fast!"},
    {es:"Lunes",          en:"Monday",        emoji:"1️⃣", hook:"LOO-nes — MONDAY on the MOON — LUNAR Monday!"},
    {es:"Martes",         en:"Tuesday",       emoji:"2️⃣", hook:"MAR-tays — TUESDAY on MARS with the MARTIANS!"},
    {es:"Miércoles",      en:"Wednesday",     emoji:"3️⃣", hook:"mee-AIR-coh-les — WEDNESDAY in the AIR with the MERCURIANS!"},
    {es:"Jueves",         en:"Thursday",      emoji:"4️⃣", hook:"HWEH-bes — THURSDAY we have WEBS — like JOVE the spider!"},
    {es:"Viernes",        en:"Friday",        emoji:"5️⃣", hook:"bee-AIR-nes — FRIDAY in the AIR near VENUS — vee-AIR-nes!"},
    {es:"Sábado",         en:"Saturday",      emoji:"🎉", hook:"SAH-bah-do — SATURDAY in the SAHARA DESERT!"},
    {es:"Domingo",        en:"Sunday",        emoji:"☀️", hook:"doh-MING-go — SUNDAY with DOMINOES — dom-INGO!"},
    {es:"¿Qué hora es?",  en:"What time is it?",emoji:"🕐", hook:"KAY OH-ra — WHAT HOUR is it — KAY say the clock!"},
    {es:"Por la mañana",  en:"In the morning", emoji:"🌄", hook:"mahn-YAH-na — MORNING banana time with the man!"},
    {es:"Por la noche",   en:"At night",      emoji:"🌙", hook:"NOH-chay — NO CHESS at night — NIGHT time!"},
  ]},
  body: { icon:"💪", label:"Body & Health", color:"#DC2626", words:[
    {es:"Cabeza",              en:"Head",          emoji:"🤯", hook:"cah-BAY-sah — a CAB drove into your HEAD — cah-BAY!"},
    {es:"Mano",                en:"Hand",          emoji:"✋", hook:"MAH-no — your HAND is your MAN-O helper!"},
    {es:"Pie",                 en:"Foot",          emoji:"🦶", hook:"pee-EH — your FOOT makes a PIE shape in the mud!"},
    {es:"Ojo",                 en:"Eye",           emoji:"👁️", hook:"OH-ho — your EYE goes OH-HO when it sees something amazing!"},
    {es:"Estómago",            en:"Stomach",       emoji:"😣", hook:"es-TOH-mah-go — your STOMACH says STOP-mago I'm full!"},
    {es:"Espalda",             en:"Back",          emoji:"🔙", hook:"es-PAL-da — your BACK is your best PAL-da!"},
    {es:"Me duele",            en:"It hurts",      emoji:"😣", hook:"DWEH-lay — it HURTS like a duel — DWELL on the pain!"},
    {es:"Estoy enfermo",       en:"I'm sick",      emoji:"🤒", hook:"en-FAIR-mo — it's NOT FAIR-mo to be sick!"},
    {es:"Necesito un médico",  en:"I need a doctor",emoji:"👨‍⚕️", hook:"MEH-dee-co — the MEDIC is your MEDICAL doctor!"},
    {es:"La farmacia",         en:"The pharmacy",  emoji:"💊", hook:"far-MAH-see-ah — the PHARMACY is FAR-macia away!"},
    {es:"Tengo fiebre",        en:"I have a fever", emoji:"🌡️", hook:"fee-EH-bray — FEVER is like a FEE you pay — fee-EH!"},
    {es:"Me siento mal",       en:"I feel bad",    emoji:"😞", hook:"MAL — feeling BAD is just plain MAL-icious!"},
  ]},
  descriptions: { icon:"🎭", label:"Describing Things", color:"#B45309", words:[
    {es:"Grande",   en:"Big",       emoji:"🐘", hook:"GRAN-day — GRAND and BIG — it's a GRAND day!"},
    {es:"Pequeño",  en:"Small",     emoji:"🐭", hook:"peh-KEN-yo — SMALL like little KENNY YO!"},
    {es:"Bonito",   en:"Beautiful", emoji:"😍", hook:"boh-NEE-to — BEAUTIFUL like a BONITO fish in the sea!"},
    {es:"Caro",     en:"Expensive", emoji:"💸", hook:"CAR-oh — as EXPENSIVE as a CAR — CAR-oh!"},
    {es:"Barato",   en:"Cheap",     emoji:"🤑", hook:"bah-RAH-to — CHEAP like a BURRITO that costs almost nothing!"},
    {es:"Cerca",    en:"Near",      emoji:"📍", hook:"SAIR-ca — NEAR the CIRCUS — sair-CA!"},
    {es:"Lejos",    en:"Far",       emoji:"🗺️", hook:"LEH-hos — FAR like a LEGION of miles away!"},
    {es:"Rápido",   en:"Fast",      emoji:"⚡", hook:"RAH-pee-do — RAPID and FAST like a RAPID-o rocket!"},
    {es:"Lento",    en:"Slow",      emoji:"🐢", hook:"LEN-to — SLOW like LENTO music — nice and slow!"},
    {es:"Caliente", en:"Hot",       emoji:"🔥", hook:"cah-lee-EN-tay — HOT like a KALEIDOSCOPE of fire!"},
    {es:"Frío",     en:"Cold",      emoji:"🧊", hook:"FREE-oh — COLD and FREE-zing cold — FREE-oh!"},
    {es:"Fácil",    en:"Easy",      emoji:"😊", hook:"FAH-seel — EASY peasy like a FOSSIL in the ground!"},
    {es:"Difícil",  en:"Difficult", emoji:"😤", hook:"dee-FEE-seel — DIFFICULT FEE to pay — dee-FEE!"},
    {es:"Mucho",    en:"A lot",     emoji:"📦", hook:"MOO-cho — A LOT of MOOs from the cow — MOO-cho!"},
  ]},
  shopping: { icon:"🛒", label:"Shopping & Market", color:"#065F46", words:[
    {es:"El mercado",            en:"The market",          emoji:"🏪", hook:"mehr-CAH-do — the MARKET is your MERCADO adventure!"},
    {es:"¿Tiene cambio?",        en:"Do you have change?", emoji:"💰", hook:"CAHM-bee-oh — CHANGE your CAMBIA coins!"},
    {es:"Es muy caro",           en:"It's very expensive", emoji:"😱", hook:"MOO-ee CAR-oh — the CAR is VERY expensive — moo-ee!"},
    {es:"Me llevo esto",         en:"I'll take this",      emoji:"🛍️", hook:"YEH-bo — I'll TAKE it YEBO style — YEH-bo!"},
    {es:"¿Cuánto es todo?",      en:"How much is everything?",emoji:"🧾", hook:"KWAHN-to — HOW MUCH in this QUANTUM universe?"},
    {es:"Quiero comprar",        en:"I want to buy",       emoji:"💳", hook:"cohm-PRAR — I want to COMPARE prices before buying!"},
    {es:"¿Acepta tarjeta?",      en:"Do you accept card?", emoji:"💳", hook:"tar-HEH-ta — CARD like a TARGET credit card!"},
    {es:"El precio",             en:"The price",           emoji:"🏷️", hook:"PREH-see-oh — the PRICE is oh so PRECIOUS!"},
    {es:"La bolsa",              en:"The bag",             emoji:"🛍️", hook:"BOWL-sah — the BAG is shaped like a BOWL!"},
    {es:"¿Puede bajar el precio?",en:"Can you lower the price?",emoji:"🙏", hook:"bah-HAR — can you lower it like going DOWN to a BAR?"},
    {es:"¿Dónde encuentro...?",  en:"Where do I find...?", emoji:"🔍", hook:"en-KWEN-tro — WHERE do I ENCOUNTER what I'm looking for?"},
    {es:"Me da uno más",         en:"Give me one more",    emoji:"✌️", hook:"Give me UNO MAS — one MORE please!"},
  ]},
  weather: { icon:"🌤️", label:"Weather", color:"#1D4ED8", words:[
    {es:"Hace calor",        en:"It's hot",          emoji:"☀️", hook:"AH-say cah-LOR — it makes CALOR — HOT HOT HOT!"},
    {es:"Hace frío",         en:"It's cold",         emoji:"🧊", hook:"FREE-oh — it's COLD and FREE-zing cold!"},
    {es:"Está lloviendo",    en:"It's raining",      emoji:"🌧️", hook:"yo-bee-EN-do — it's raining LOVING drops from the sky!"},
    {es:"Hace viento",       en:"It's windy",        emoji:"💨", hook:"bee-EN-to — WINDY like a VENT blowing hard!"},
    {es:"Está nublado",      en:"It's cloudy",       emoji:"☁️", hook:"noo-BLAH-do — CLOUDY and totally BLAH-do gray!"},
    {es:"¿Cómo está el clima?",en:"What's the weather like?",emoji:"🌡️", hook:"KLEE-mah — the CLIMATE CLIME changes fast in Cuenca!"},
    {es:"Va a llover",       en:"It's going to rain",emoji:"⛈️", hook:"yo-BAIR — it's going to rain like a LOVER of water!"},
    {es:"Hace buen tiempo",  en:"The weather is nice",emoji:"🌈", hook:"tee-EM-po — nice weather TEMPO — what a GOOD time!"},
    {es:"El sol",            en:"The sun",           emoji:"☀️", hook:"SOLE — the SUN is your SOLE friend on cold days!"},
    {es:"La lluvia",         en:"The rain",          emoji:"🌧️", hook:"YOO-bee-ah — the rain goes YOOBIA YOOBIA down!"},
    {es:"La neblina",        en:"The fog",           emoji:"🌫️", hook:"neh-BLEE-nah — FOG like a NEBULA floating down!"},
    {es:"Qué fresco",        en:"How pleasant",      emoji:"😌", hook:"FRES-co — how FRESH and pleasant — FRESCO cool!"},
  ]},
};

const ALL_WORDS_L1 = Object.values(VOCAB_L1).flatMap(c => c.words);
const ALL_WORDS_L2 = Object.values(VOCAB_L2).flatMap(c => c.words);
const ALL_WORDS    = [...ALL_WORDS_L1, ...ALL_WORDS_L2];

// ══ STORY MODE DATA — set in Cuenca, full audio on every line ════════════════
const STORIES = [
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

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const todayStr = () => new Date().toISOString().slice(0, 10);

// ══ CONFIG ════════════════════════════════════════════════════════════════════
const AVATARS = ["🦁","🦜","🐬","🦋","🌺","🐢","🦅","🐆","⭐","🌊","🗺️","🧭","🦊","🐧","🌴","🎭"];
const PCOLORS = ["#E8445A","#10B981","#8B5CF6","#F59E0B","#3B82F6","#EC4899","#DC6B19","#06B6D4"];
const DS = { fontFamily:"'Nunito', sans-serif", fontWeight:900 };

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

const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// ══ FAMILY CODE HELPERS ═══════════════════════════════════════════════════════
const makeCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const LS_FAMILY = 'wl_family_id';
const getFamilyId = () => localStorage.getItem(LS_FAMILY);
const setFamilyId = (id) => localStorage.setItem(LS_FAMILY, id);

// ══ LOAD / SAVE ════════════════════════════════════════════════════════════════
const loadProfiles = async () => {
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
  }));
};

const saveProfile = async (profile) => {
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
    level: profile.level, updated_at: new Date().toISOString()
  });
};

const createFamily = async (familyName) => {
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

const createProfile = (name, avatar, color) => ({
  id: Date.now().toString(), name, avatar, color,
  stars: 0, streak: 0, longestStreak: 0, lastDate: null,
  badges: [], quizCorrect: 0, speakAttempts: 0,
  catsPlayed: [], matchWins: 0, dailyDone: 0, dailyScores: {},
  storiesRead: 0, level: 1,
});

// ══ SPEECH ════════════════════════════════════════════════════════════════════
let esVoice=null, enVoice=null;
const findVoices = () => {
  const vs = window.speechSynthesis?window.speechSynthesis.getVoices():[];
  esVoice=vs.find(v=>v.lang==="es-MX")||vs.find(v=>v.lang==="es-US")||vs.find(v=>v.lang.startsWith("es"))||null;
  enVoice=vs.find(v=>v.lang==="en-US")||vs.find(v=>v.lang.startsWith("en"))||null;
  return !!esVoice;
};
const speakEs = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="es-MX"; u.rate=0.82; u.pitch=1.05;
  if(esVoice)u.voice=esVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};
const speakEn = (text,onEnd) => {
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US"; u.rate=0.85;
  if(enVoice)u.voice=enVoice;
  if(onEnd)u.onend=onEnd;
  window.speechSynthesis.speak(u);
};

// ══ DAILY ═════════════════════════════════════════════════════════════════════
const getDailyWords = (level) => {
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
const normText=str=>str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿¡.,!?]/g,"").trim();
const scoreMatch=(heard,target)=>{
  const h=normText(heard),t=normText(target);
  if(!h)return 0;if(h===t)return 100;
  const tw=t.split(" "),hw=h.split(" ");
  const hits=tw.filter(tw=>hw.some(hw=>hw===tw||(tw.length>3&&(hw.includes(tw)||tw.includes(hw)))));
  return Math.min(99,Math.round((hits.length/tw.length)*100));
};
const SRClass=typeof window!=="undefined"?(window.SpeechRecognition||window.webkitSpeechRecognition):null;
const BG="linear-gradient(160deg,#0f172a 0%,#1e3a5f 50%,#0d4f3c 100%)";

// ══ SHARED COMPONENTS ════════════════════════════════════════════════════════

function SpeakEsBtn({text,color,size=40,showLabel=false}){
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

function SpeakEnBtn({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:on?color:`${color}20`,border:`2px solid ${color}60`,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
      {on?"🔊":"🔈"}
    </button>
  );
}

function SpeakEnIconBtn({text,size=40}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?"rgba(255,255,255,.9)":"rgba(255,255,255,.25)",border:"2.5px solid rgba(255,255,255,.8)",fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"🔊":"🔈"}
    </button>
  );
}

function SpeakEnPill({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:on?"rgba(255,255,255,.35)":"rgba(255,255,255,.18)",border:"2px solid rgba(255,255,255,.6)",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white",transition:"all .18s"}}>
      <span style={{fontSize:16}}>{on?"🔊":"🔈"}</span><span>Hear English</span>
    </button>
  );
}

function ActionBtn({onClick,bg,color="white",children,style={}}){
  return(
    <button onClick={onClick} style={{padding:"12px 20px",borderRadius:18,background:bg,border:"none",color,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",...style}}>
      {children}
    </button>
  );
}

function StarCount({count,color}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:3,background:`${color}20`,borderRadius:20,padding:"4px 12px"}}>
      <span style={{fontSize:18}}>⭐</span>
      <span style={{fontSize:18,fontWeight:900,color}}>{count}</span>
    </span>
  );
}

// ══ FLASHCARD (with memory hook) ══════════════════════════════════════════════
function FlashcardMode({words,color,onEarn}){
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
              <button onClick={e=>{e.stopPropagation();speakEn(word.hook);}} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:color,border:"none",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
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

      <div style={{display:"flex",gap:10,width:"100%"}}>
        <ActionBtn onClick={()=>navigate(-1,false)} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>← Back</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,false)}  bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Skip</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,true)}   bg={color}                   style={{flex:1.4}}>Got it! ✓</ActionBtn>
      </div>
    </div>
  );
}

// ══ QUIZ ══════════════════════════════════════════════════════════════════════
function QuizMode({words,color,onEarn,onStat,allWords}){
  const queue=useRef(shuffle(words));
  const[idx,setIdx]=useState(0);
  const[opts,setOpts]=useState([]);
  const[selected,setSelected]=useState(null);
  const[score,setScore]=useState(0);
  const[total,setTotal]=useState(0);
  const word=queue.current[idx%queue.current.length];

  useEffect(()=>{
    if(!word)return;
    const wrong=shuffle(allWords.filter(w=>w.en!==word.en)).slice(0,3);
    setOpts(shuffle([word,...wrong]));setSelected(null);speakEs(word.es);
  },[idx]);

  const pick=opt=>{
    if(selected)return;setSelected(opt);setTotal(t=>t+1);
    if(opt.en===word.en){setScore(s=>s+1);onEarn(2);onStat("quiz");}
    setTimeout(()=>setIdx(i=>i+1),1400);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>✅ {score} right &nbsp;•&nbsp; {total} answered</div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:72}}>{word.emoji}</div>
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
function MatchMode({words,color,onEarn,onStat}){
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
          return(
            <button key={card.id} onClick={()=>tap(card)} style={{padding:"14px 10px",borderRadius:16,minHeight:80,background:isM?`${color}15`:isW?"#FEE2E2":isSel?`${color}28`:"white",border:`2.5px solid ${isM?color:isW?"#EF4444":isSel?color:"#E5E7EB"}`,fontSize:13,fontWeight:700,cursor:isM?"default":"pointer",transition:"all .18s",color:isM?"#9CA3AF":"#1F2937",textAlign:"center",fontFamily:"inherit",opacity:isM?.5:1,transform:isSel?"scale(.97)":"scale(1)"}}>
              {card.lang==="es"?<React.Fragment><div style={{fontSize:26}}>{card.emoji}</div><div style={{fontSize:14,...DS}}>{card.text}</div></React.Fragment>:<div style={{fontSize:14,lineHeight:1.3}}>{card.text}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ══ SPEAK ═════════════════════════════════════════════════════════════════════
function SpeakMode({words,color,onEarn,onStat}){
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

// ══ STORY LIST SCREEN ═════════════════════════════════════════════════════════
function StoryListScreen({onBack,onStory,profile}){
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
function StoryScreen({story,onBack,onComplete}){
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
function FamilySetupScreen({ onDone }) {
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

// ══ PROFILE SELECT ════════════════════════════════════════════════════════════
function ProfileSelectScreen({profiles,onSelect,onCreate}){
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
function CreateProfileScreen({onDone,onBack}){
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
function HomeScreen({profile,onLearn,onDaily,onBoard,onMyProfile,onSwitch,onLevelChange,onStories,dailyDone}){
  const lv=profile.level||1;
  const vocab=lv>=2?VOCAB_L2:VOCAB_L1;
  const catKeys=Object.keys(vocab);
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
        {/* Daily Challenge */}
        <button onClick={dailyDone?undefined:onDaily} style={{width:"100%",padding:"18px",borderRadius:22,background:dailyDone?"rgba(255,255,255,.06)":profile.color,border:dailyDone?"2px solid rgba(255,255,255,.12)":`2px solid ${profile.color}`,cursor:dailyDone?"default":"pointer",textAlign:"left",marginBottom:12,display:"flex",alignItems:"center",gap:14,opacity:dailyDone?.6:1}}>
          <span style={{fontSize:36}}>📅</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>{dailyDone?"Daily Challenge Done! ✓":"Daily Challenge — New Today!"}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:3}}>{dailyDone?"Come back tomorrow for a new one!":"5 questions · Same for everyone · Bonus stars!"}</div>
          </div>
          {!dailyDone&&<span style={{fontSize:22,color:"white"}}>›</span>}
        </button>

        {/* Stories button */}
        <button onClick={onStories} style={{width:"100%",padding:"18px",borderRadius:22,background:"rgba(255,255,255,.08)",border:"2px solid rgba(255,255,255,.2)",cursor:"pointer",textAlign:"left",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:36}}>📖</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>Stories — Listen & Learn!</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>Real conversations in Cuenca — tap any line to hear it!</div>
          </div>
          <span style={{fontSize:22,color:"rgba(255,255,255,.5)"}}>›</span>
        </button>

        {/* Level toggle */}
        <div style={{display:"flex",marginBottom:14,background:"rgba(255,255,255,.08)",borderRadius:16,padding:4}}>
          {[{lv:1,label:"⭐ Beginner"},{lv:2,label:"🚀 Intermediate"}].map(({lv:l,label})=>(
            <button key={l} onClick={()=>onLevelChange(l)} style={{flex:1,padding:"10px 0",borderRadius:12,background:lv===l?"white":"transparent",border:"none",color:lv===l?profile.color:"rgba(255,255,255,.6)",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
              {label}
            </button>
          ))}
        </div>

        <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,marginBottom:10,letterSpacing:.5}}>{lv>=2?"INTERMEDIATE CATEGORIES":"BEGINNER CATEGORIES"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {catKeys.map(key=>{
            const c=vocab[key];
            return(
              <button key={key} onClick={()=>onLearn(key,lv)} style={{padding:"16px 8px",borderRadius:18,background:"rgba(255,255,255,.07)",border:`2px solid ${c.color}40`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <span style={{fontSize:28}}>{c.icon}</span>
                <span style={{fontSize:11,fontWeight:800,color:"white",textAlign:"center",lineHeight:1.2}}>{c.label}</span>
                <div style={{width:32,height:4,borderRadius:99,background:`${c.color}80`}}/>
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
function LearnScreen({catKey,catLevel,profile,onBack,onEarn,onStat}){
  const[mode,setMode]=useState("flashcard");
  const vocab=catLevel>=2?VOCAB_L2:VOCAB_L1;
  const cat=vocab[catKey];
  const allWords=catLevel>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  const modes=[{id:"flashcard",label:"🃏 Cards"},{id:"quiz",label:"🎯 Quiz"},{id:"match",label:"🧩 Match"},{id:"speak",label:"🎤 Speak"}];
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
          {mode==="flashcard"&&<FlashcardMode key={`${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn}/>}
          {mode==="quiz"     &&<QuizMode key={`q${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} allWords={allWords}/>}
          {mode==="match"    &&<MatchMode key={`m${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
          {mode==="speak"    &&<SpeakMode key={`s${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
        </div>
      </div>
    </div>
  );
}

// ══ DAILY CHALLENGE ═══════════════════════════════════════════════════════════
function DailyScreen({profile,onBack,onComplete}){
  const{words}=getDailyWords(profile.level||1);
  const pool=(profile.level||1)>=2?ALL_WORDS_L2:ALL_WORDS_L1;
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
          <div style={{fontSize:68}}>{word.emoji}</div>
          <div style={{fontSize:28,color:"#1F2937",marginTop:4,...DS}}>{word.es}</div>
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
function LeaderboardScreen({profiles,onBack}){
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
function MyProfileScreen({profile,onBack}){
  const allBadges=Object.entries(BADGE_DEF);
  const earned=new Set(profile.badges||[]);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontSize:20,color:"white",...DS}}>🎖️ Explorer Card</div>
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
export default function App(){
  const[profiles,setProfiles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[screen,setScreen]=useState("select");
  const[activeId,setActiveId]=useState(null);
  const[learnCat,setLearnCat]=useState("greetings");
  const[learnCatLv,setLearnCatLv]=useState(1);
  const[activeStory,setActiveStory]=useState(null);
  const[familyReady,setFamilyReady]=useState(!!getFamilyId());
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
    setActiveId(p.id);setScreen("home");
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

  const handleDailyComplete=async score=>{
    if(!profile)return;
    const d=todayStr();
    const dailyScores={...(profile.dailyScores||{}),[d]:score};
    await updateProfile(activeId,{stars:profile.stars+(score*3),dailyDone:(profile.dailyDone||0)+1,dailyScores});
    setScreen("home");
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
      {familyReady&&screen==="home"      &&profile&&<HomeScreen profile={profile} onLearn={handleLearn} onDaily={()=>setScreen("daily")} onBoard={()=>setScreen("board")} onMyProfile={()=>setScreen("myprofile")} onSwitch={()=>setScreen("select")} onLevelChange={handleLevelChange} onStories={()=>setScreen("stories")} dailyDone={dailyDone}/>}
      {familyReady&&screen==="learn"     &&profile&&<LearnScreen catKey={learnCat} catLevel={learnCatLv} profile={profile} onBack={()=>setScreen("home")} onEarn={handleEarn} onStat={handleStat}/>}
      {familyReady&&screen==="daily"     &&profile&&<DailyScreen profile={profile} onBack={()=>setScreen("home")} onComplete={handleDailyComplete}/>}
      {familyReady&&screen==="board"     &&<LeaderboardScreen profiles={profiles} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="myprofile" &&profile&&<MyProfileScreen profile={profile} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="stories"   &&<StoryListScreen onBack={()=>setScreen("home")} onStory={s=>{setActiveStory(s);setScreen("story");}} profile={profile}/>}
      {familyReady&&screen==="story"     &&activeStory&&<StoryScreen story={activeStory} onBack={()=>setScreen("stories")} onComplete={handleStoryComplete}/>}
    </div>
  );
}
