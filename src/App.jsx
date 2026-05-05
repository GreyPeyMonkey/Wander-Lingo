import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ══ LEVEL 1 VOCAB — every word has a memory hook ═════════════════════════════
const VOCAB_L1 = {
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
const VOCAB_L2 = {
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
const VOCAB_L3 = {
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
const CORE_SETS = [
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

const ALL_WORDS_L1 = Object.values(VOCAB_L1).flatMap(c => c.words);
const ALL_WORDS_L2 = Object.values(VOCAB_L2).flatMap(c => c.words);
const ALL_WORDS_L3 = Object.values(VOCAB_L3).flatMap(c => c.words);
const ALL_WORDS    = [...ALL_WORDS_L1, ...ALL_WORDS_L2, ...ALL_WORDS_L3, ...CORE_ALL_WORDS];

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


// ══ LEVEL PROGRESSION SYSTEM ═════════════════════════════════════════════════
// Stars earned per category (0-3) based on quiz performance
// 0 = untouched, 1 = tried, 2 = good (70%+), 3 = mastered (90%+)
const LEVEL_REQUIREMENTS = {
  2: { catsNeeded: 5, minStars: 2, label: "Complete 5 Beginner categories at 2+ stars" },
  3: { catsNeeded: 4, minStars: 2, label: "Complete 4 Intermediate categories at 2+ stars" },
  core: { catsNeeded: 3, minStars: 2, label: "Complete 3 categories at any level" },
};

const getCatProgress = (profile, catKey, catLevel) => {
  const key = `progress_${catLevel}_${catKey}`;
  return (profile.catProgress || {})[key] || 0; // 0-3 stars
};

const setCatProgress = (profile, catKey, catLevel, stars) => {
  const key = `progress_${catLevel}_${catKey}`;
  const existing = (profile.catProgress || {})[key] || 0;
  if (stars <= existing) return profile.catProgress || {}; // never downgrade
  return { ...(profile.catProgress || {}), [key]: stars };
};

const canUnlockLevel = (profile, targetLevel) => {
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

const getLevelProgress = (profile, forLevel) => {
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

const getCatStars = (profile, catKey, catLevel) => {
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

const getSayItProgress = (profile, catKey, catLevel) => {
  const key = `${catLevel}_${catKey}`;
  return (profile.catSayIt || {})[key] || 0;
};

const getNextSuggestedCat = (profile) => {
  const lv = profile.level || 1;
  const vocab = lv >= 3 ? VOCAB_L3 : lv >= 2 ? VOCAB_L2 : VOCAB_L1;
  const keys = Object.keys(vocab);
  // Find first category with 0 stars — that's the suggested one
  for (const key of keys) {
    if (getCatStars(profile, key, lv) === 0) return { key, lv, cat: vocab[key] };
  }
  // All have at least 1 star — suggest lowest star count
  let lowest = null;
  for (const key of keys) {
    const stars = getCatStars(profile, key, lv);
    if (stars < 3 && (!lowest || stars < getCatStars(profile, lowest.key, lv))) {
      lowest = { key, lv, cat: vocab[key] };
    }
  }
  return lowest; // null means all at 3 stars — level complete!
};

const isCatUnlocked = (profile, catKey, catLevel) => {
  const vocab = catLevel >= 3 ? VOCAB_L3 : catLevel >= 2 ? VOCAB_L2 : VOCAB_L1;
  const keys = Object.keys(vocab);
  const idx = keys.indexOf(catKey);
  if (idx <= 0) return true; // First category always unlocked
  // Previous category needs at least 2 stars (quiz score 70%+) to unlock next
  const prevKey = keys[idx - 1];
  return getCatStars(profile, prevKey, catLevel) >= 2;
};

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
    catProgress: r.cat_progress || {},
    missedWords: r.missed_words || {},
    bookmarked: r.bookmarked || [],
    catSayIt: r.cat_say_it || {},
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
    level: profile.level, cat_progress: profile.catProgress||{}, missed_words: profile.missedWords||{}, bookmarked: profile.bookmarked||[], cat_say_it: profile.catSayIt||{}, updated_at: new Date().toISOString()
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
const speakEnSlow = (text,onEnd) => {
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
const normText=str=>str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/gu,"").replace(/[¿¡.,!?]/g,"").trim();
const scoreMatch=(heard,target)=>{
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
function FlashcardMode({words,color,onEarn,bookmarked,onBookmark}){
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
function QuizMode({words,color,onEarn,onStat,allWords,onProgress}){
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


// == WORD SCRAMBLE ==
// Single words: scramble individual letters
// Multi-word phrases: scramble word order (more useful for language learning!)
function ScrambleMode({words,color,onEarn,onStat}){
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
function WriteMode({words,color,onEarn,onStat}){
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
function SayItMode({words,color,onEarn,onStat,onSayItAttempt}){
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
function LevelExamScreen({level,profile,onBack,onPass}){
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

// ══ LISTEN MODE ═══════════════════════════════════════════════════════════════
function ListenMode({words,color,onEarn,onStat,allWords,onProgress}){
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
function CoreWordsScreen({onBack,profile}){
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
function EditProfileScreen({profile,familyCode,onSave,onBack,onDelete}){
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
function DailyReviewScreen({profile,onComplete}){
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
    if(opt.en===word.en)setScore(s=>s+1);
    setTimeout(()=>{if(idx<reviewQueue.length-1)setIdx(i=>i+1);else onComplete(score+(opt.en===word.en?1:0));},1200);
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
      </div>
    </div>
  );
}

// ══ PROFILE MANAGEMENT SCREENS ═══════════════════════════════════════════════

function SwitchFamilyScreen({onSwitch, onBack}) {
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

function ManageFamilyScreen({profile, profiles, onBack, onMemberRemoved}) {
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
function HomeScreen({profile,onLearn,onDaily,onBoard,onMyProfile,onSwitch,onLevelChange,onStories,onCore,onExam,onExamPrompt,onShowStarInfo,dailyDone}){
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
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:2}}>Tap to start learning!</div>
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
              <button key={key} onClick={()=>unlocked?onLearn(key,lv):onShowStarInfo&&onShowStarInfo()}
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
function LearnScreen({catKey,catLevel,profile,onBack,onEarn,onStat,onCatProgress,onBookmark,onSayItAttempt,onWordResult}){
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
function DailyScreen({profile,onBack,onComplete}){
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
function MyProfileScreen({profile,onBack,familyCode,onEdit,onSwitchFamily,onManageMembers}){
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
      {familyReady&&screen==="home"      &&profile&&<HomeScreen profile={profile} onLearn={handleLearn} onDaily={()=>setScreen("daily")} onBoard={()=>setScreen("board")} onMyProfile={()=>setScreen("myprofile")} onSwitch={()=>setScreen("select")} onLevelChange={handleLevelChange} onStories={()=>setScreen("stories")} onCore={()=>setScreen("core")} onExam={(lv)=>{setExamLevel(lv);setScreen("exam");}} onExamPrompt={(lv)=>{setExamLevel(lv);setScreen("exam");}} onShowStarInfo={()=>{}} dailyDone={dailyDone}/>}
      {familyReady&&screen==="learn"     &&profile&&<LearnScreen catKey={learnCat} catLevel={learnCatLv} profile={profile} onBack={()=>setScreen("home")} onEarn={handleEarn} onStat={handleStat} onWordResult={handleWordResult} onBookmark={handleBookmark} onSayItAttempt={handleSayItAttempt} onCatProgress={handleCatProgress}/>}
      {familyReady&&screen==="daily"     &&profile&&<DailyScreen profile={profile} onBack={()=>setScreen("home")} onComplete={handleDailyComplete}/>}
      {familyReady&&screen==="board"     &&<LeaderboardScreen profiles={profiles} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="myprofile" &&profile&&<MyProfileScreen profile={profile} familyCode={familyCode} onBack={()=>setScreen("home")} onEdit={()=>setScreen("editprofile")} onSwitchFamily={()=>setScreen("switchfamily")} onManageMembers={()=>setScreen("managemembers")}/>}
      {familyReady&&screen==="review"    &&profile&&<DailyReviewScreen profile={profile} onComplete={()=>setScreen("home")}/>}
      {familyReady&&screen==="exam"       &&profile&&<LevelExamScreen level={examLevel} profile={profile} onBack={()=>setScreen("home")} onPass={handleExamPass}/>}
      {familyReady&&screen==="switchfamily" &&<SwitchFamilyScreen onSwitch={handleFamilySwitch} onBack={()=>setScreen("myprofile")}/>}
      {familyReady&&screen==="managemembers"&&profile&&<ManageFamilyScreen profile={profile} profiles={profiles} onBack={()=>setScreen("myprofile")} onMemberRemoved={handleMemberRemoved}/>}
      {familyReady&&screen==="core"             &&<CoreWordsScreen onBack={()=>setScreen("home")} profile={profile}/>}
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
