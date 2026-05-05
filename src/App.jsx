import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// \u2550\u2550 LEVEL 1 VOCAB \u2014 every word has a memory hook \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const VOCAB_L1 = {
  greetings: { icon:"\u1f44b", label:"Greetings", color:"#E8445A", words:[
    {es:"Hola",              en:"Hello",           emoji:"\u1f44b", hook:"Imagine a giant hole-A in the ground waving hello!"},
    {es:"Buenos d\u00edas",       en:"Good morning",    emoji:"\u1f305", hook:"BOO! A friendly ghost pops out saying good morning \u2014 BOO-en-os dee-as!"},
    {es:"Buenas tardes",     en:"Good afternoon",  emoji:"\u2600\ufe0f", hook:"The BOO ghost is back in the afternoon! bweh-nas tar-days."},
    {es:"Buenas noches",     en:"Good night",      emoji:"\u1f319", hook:"BOO at night \u2014 noh-ches sounds like 'no chess at night'!"},
    {es:"\u00bfC\u00f3mo est\u00e1s?",      en:"How are you?",    emoji:"\u1f642", hook:"como a lake asking HOW you're doing \u2014 koh-mo es-tas?"},
    {es:"Estoy bien",        en:"I'm fine",        emoji:"\u1f44d", hook:"I'm staying (es-toy) just BEAN (bien) fine \u2014 like a happy jumping bean!"},
    {es:"Gracias",           en:"Thank you",       emoji:"\u1f64f", hook:"gras-ee-us \u2014 you're thankful someone mowed your grass for you!"},
    {es:"De nada",           en:"You're welcome",  emoji:"\u1f60a", hook:"It's NADA \u2014 nothing \u2014 like saying 'it was nothing at all!'"},
    {es:"Por favor",         en:"Please",          emoji:"\u2b50", hook:"pour flavor on it please \u2014 por fa-vor!"},
    {es:"Adi\u00f3s",             en:"Goodbye",         emoji:"\u270c\ufe0f", hook:"add one more OH when leaving \u2014 ah-dee-ohs!"},
    {es:"Hasta luego",       en:"See you later",   emoji:"\u1f917", hook:"hasta la vista! See you luego (loo-ay-go) \u2014 like a logo you'll see again!"},
    {es:"\u00bfC\u00f3mo te llamas?",  en:"What's your name?",emoji:"\u2753", hook:"A llama is calling YOUR name \u2014 YAH-mas? The llama wants to know!"},
    {es:"Me llamo...",       en:"My name is...",   emoji:"\u1f3f7\ufe0f", hook:"ME + a llama \u2014 my llama's name is... YAH-mo!"},
    {es:"Mucho gusto",       en:"Nice to meet you",emoji:"\u1f91d", hook:"mucho gusto \u2014 a gust of wind blows you together \u2014 so nice to meet!"},
  ]},
  around: { icon:"\u1f3d9\ufe0f", label:"Around Town", color:"#DC6B19", words:[
    {es:"Disculpe",                  en:"Excuse me",              emoji:"\u1f64b", hook:"dis-cool-pay \u2014 excuse the super dis-cool person!"},
    {es:"\u00bfD\u00f3nde est\u00e1 el ba\u00f1o?",      en:"Where is the bathroom?", emoji:"\u1f6bb", hook:"don'T-ay? don'T wait \u2014 find the bathroom fast! dohn-day es-ta?"},
    {es:"La cuenta por favor",       en:"The check please",       emoji:"\u1f9fe", hook:"kwen-ta \u2014 count the bill before paying!"},
    {es:"Una mesa para dos",         en:"A table for two",        emoji:"\u1fa91", hook:"A mesa (table) for dos \u2014 like two dosas on the table!"},
    {es:"\u00bfCu\u00e1nto cuesta?",           en:"How much does it cost?", emoji:"\u1f4b0", hook:"kwahn-to kwes-ta \u2014 HOW MUCH does this quest cost?"},
    {es:"Quiero ordenar",            en:"I'd like to order",      emoji:"\u1f4cb", hook:"kyer-oh \u2014 I cheer-oh to order my food!"},
    {es:"Un caf\u00e9 con leche",         en:"Coffee with milk",       emoji:"\u2615", hook:"caf-ay con leh-chay \u2014 coffee with lechy stretchy milk!"},
    {es:"\u00bfHabla ingl\u00e9s?",            en:"Do you speak English?",  emoji:"\u1f5e3\ufe0f", hook:"AH-bla \u2014 is this able person speaking my language?"},
    {es:"No hablo espa\u00f1ol bien",     en:"I don't speak Spanish well",emoji:"\u1f605", hook:"No AH-blo \u2014 I'm NOT able to speak it well yet!"},
    {es:"M\u00e1s despacio por favor",    en:"More slowly please",     emoji:"\u1f422", hook:"mas des-pah-see-oh \u2014 MORE slowly like a turtle! MUCH slower!"},
    {es:"A la derecha",              en:"To the right",           emoji:"\u27a1\ufe0f", hook:"DARE-echa \u2014 I DARE you to go RIGHT!"},
    {es:"A la izquierda",            en:"To the left",            emoji:"\u2b05\ufe0f", hook:"ees-kee-air-da \u2014 it's quirky and airy going left!"},
    {es:"Todo recto",                en:"Straight ahead",         emoji:"\u2b06\ufe0f", hook:"TODO recto \u2014 totally erect and straight ahead!"},
    {es:"\u00bfMe puede ayudar?",         en:"Can you help me?",       emoji:"\u1f91d", hook:"AYE-oo-dar \u2014 AYE! You DARE to help me? Please!"},
  ]},
  family: { icon:"\u1f468\u200d\u1f469\u200d\u1f467", label:"Family", color:"#10B981", words:[
    {es:"Mam\u00e1",    en:"Mom",           emoji:"\u1f469", hook:"ma + ma \u2014 double the love, double the ma!"},
    {es:"Pap\u00e1",    en:"Dad",           emoji:"\u1f468", hook:"pa + pa \u2014 double the pa, double the dad hugs!"},
    {es:"Hermana", en:"Sister",        emoji:"\u1f467", hook:"HER mana \u2014 SHE has the magic mana \u2014 that's your sister!"},
    {es:"Hermano", en:"Brother",       emoji:"\u1f466", hook:"HER mano \u2014 your bro is HER MAN-OH!"},
    {es:"Abuela",  en:"Grandma",       emoji:"\u1f475", hook:"ah-bweh-la \u2014 grandma flies in on a propeller \u2014 bweh!"},
    {es:"Abuelo",  en:"Grandpa",       emoji:"\u1f474", hook:"ah-bweh-lo \u2014 grandpa flies in too \u2014 bweh-lo!"},
    {es:"Beb\u00e9",    en:"Baby",          emoji:"\u1f476", hook:"bay-bay \u2014 babies say bay-bay and everyone smiles!"},
    {es:"Amigo",   en:"Friend (boy)",  emoji:"\u1f9d1", hook:"ah-mee-go \u2014 your buddy from the movie saying I GO with you amigo!"},
    {es:"Amiga",   en:"Friend (girl)", emoji:"\u1f469", hook:"ah-mee-ga \u2014 your girl friend \u2014 ME + ga, she goes everywhere with you!"},
    {es:"Mascota", en:"Pet",           emoji:"\u1f43e", hook:"mas-koh-ta \u2014 your pet wears a mascot costume at every game!"},
  ]},
  food: { icon:"\u1f34e", label:"Food", color:"#F59E0B", words:[
    {es:"Agua",        en:"Water",       emoji:"\u1f4a7", hook:"AH-gwa \u2014 water goes AH-gwa-gwa when you splash in it!"},
    {es:"Leche",       en:"Milk",        emoji:"\u1f95b", hook:"leh-chay \u2014 milk is so lechy and stretchy when it pours!"},
    {es:"Pan",         en:"Bread",       emoji:"\u1f35e", hook:"pan \u2014 you cook bread in A pan \u2014 simple as that!"},
    {es:"Arroz",       en:"Rice",        emoji:"\u1f35a", hook:"ah-rose \u2014 rice grows in fields like a beautiful rose garden!"},
    {es:"Pollo",       en:"Chicken",     emoji:"\u1f357", hook:"poy-yo \u2014 polo the chicken plays polo on horseback!"},
    {es:"Manzana",     en:"Apple",       emoji:"\u1f34e", hook:"man-zah-na \u2014 a MAN-sized banana shaped like an apple!"},
    {es:"Naranja",     en:"Orange",      emoji:"\u1f34a", hook:"nah-ran-ha \u2014 the runner ran to grab the orange \u2014 nah-ran-ha!"},
    {es:"Helado",      en:"Ice cream",   emoji:"\u1f366", hook:"eh-lah-do \u2014 held the ice cream before it melted \u2014 held-ado!"},
    {es:"Tengo hambre",en:"I'm hungry",  emoji:"\u1f60b", hook:"TEN-go \u2014 I'm so tense because my stomach has TEN growls!"},
    {es:"Tengo sed",   en:"I'm thirsty", emoji:"\u1f964", hook:"sed \u2014 so dry and said to be thirsty!"},
    {es:"Delicioso",   en:"Delicious",   emoji:"\u1f60d", hook:"deh-lee-SEE-oh-so \u2014 so delicious you can SEE it glowing!"},
    {es:"Quiero m\u00e1s",  en:"I want more", emoji:"\u1f64b", hook:"kyer-oh mas \u2014 cheer-oh for mas more \u2014 MORE MORE MORE!"},
  ]},
  feelings: { icon:"\u1f60a", label:"Feelings", color:"#8B5CF6", words:[
    {es:"Feliz",          en:"Happy",    emoji:"\u1f604", hook:"feh-lees \u2014 feel the happiness in your knees!"},
    {es:"Triste",         en:"Sad",      emoji:"\u1f622", hook:"trees-tay \u2014 a sad tree just stood there dripping tears today!"},
    {es:"Cansado",        en:"Tired",    emoji:"\u1f634", hook:"kan-sah-do \u2014 CAN'T-DO anything because I'm so tired!"},
    {es:"Emocionado",     en:"Excited",  emoji:"\u1f929", hook:"eh-mo-see-OH-nah-do \u2014 your emotions explode like a volcano!"},
    {es:"Asustado",       en:"Scared",   emoji:"\u1f628", hook:"ah-soos-tah-do \u2014 a ghost says BOO and you're so scared-ado!"},
    {es:"Enojado",        en:"Angry",    emoji:"\u1f620", hook:"eh-no-HA-do \u2014 enough! No HA-do! I'm angry!"},
    {es:"Te quiero",      en:"I love you",emoji:"\u2764\ufe0f", hook:"tay kyer-oh \u2014 cheer for the one you love \u2014 te cheer-oh!"},
    {es:"Me siento bien", en:"I feel good",emoji:"\u2728", hook:"see-en-to \u2014 I sense I feel amazing \u2014 me see-en-to bien!"},
  ]},
  school: { icon:"\u1f4da", label:"School", color:"#3B82F6", words:[
    {es:"Maestra",         en:"Teacher (f)",          emoji:"\u1f469\u200d\u1f3eb", hook:"my-ehs-tra \u2014 the master-A teacher rules the class!"},
    {es:"Maestro",         en:"Teacher (m)",          emoji:"\u1f468\u200d\u1f3eb", hook:"my-ehs-tro \u2014 the maestro teacher leads like an orchestra!"},
    {es:"Libro",           en:"Book",                 emoji:"\u1f4da", hook:"lee-bro \u2014 lee BROught his favorite book to read!"},
    {es:"L\u00e1piz",           en:"Pencil",               emoji:"\u270f\ufe0f", hook:"lah-pees \u2014 the pencil draws in laps around the page!"},
    {es:"Escuela",         en:"School",               emoji:"\u1f3eb", hook:"es-kway-la \u2014 school is the eskimo way of learning \u2014 es-kway-la!"},
    {es:"No entiendo",     en:"I don't understand",   emoji:"\u1f914", hook:"en-tee-en-do \u2014 I don't tend-to understand this at all!"},
    {es:"\u00bfMe puedes ayudar?",en:"Can you help me?",  emoji:"\u1f64b", hook:"AYE-oo-dar \u2014 AYE! You DARE help me with this?"},
    {es:"Entiendo",        en:"I understand",         emoji:"\u1f4a1", hook:"en-tee-en-do \u2014 NOW I tend-to understand \u2014 the light bulb is on!"},
  ]},
  numbers: { icon:"\u1f522", label:"Numbers", color:"#06B6D4", words:[
    {es:"Uno",   en:"One",   emoji:"1\ufe0f\u20e3", hook:"oo-no \u2014 ONE more ooh makes everything fun!"},
    {es:"Dos",   en:"Two",   emoji:"2\ufe0f\u20e3", hook:"dose \u2014 the doctor gives you TWO doses of medicine!"},
    {es:"Tres",  en:"Three", emoji:"3\ufe0f\u20e3", hook:"trace \u2014 THREE lines to trace on the paper!"},
    {es:"Cuatro",en:"Four",  emoji:"4\ufe0f\u20e3", hook:"kwah-tro \u2014 four quarters make one dollar \u2014 kwah-tro!"},
    {es:"Cinco", en:"Five",  emoji:"5\ufe0f\u20e3", hook:"sink-oh \u2014 five things fell into the sink-oh!"},
    {es:"Seis",  en:"Six",   emoji:"6\ufe0f\u20e3", hook:"sace \u2014 six geese went sace sace sace!"},
    {es:"Siete", en:"Seven", emoji:"7\ufe0f\u20e3", hook:"see-EH-tay \u2014 seven ate (see-ate) nine for breakfast!"},
    {es:"Ocho",  en:"Eight", emoji:"8\ufe0f\u20e3", hook:"OH-cho \u2014 eight is an OH with a cho cho train!"},
    {es:"Nueve", en:"Nine",  emoji:"9\ufe0f\u20e3", hook:"nweh-bay \u2014 nine bees went whew into the hive!"},
    {es:"Diez",  en:"Ten",   emoji:"\u1f51f", hook:"dee-ehs \u2014 TEN days in the sun \u2014 dee-ehs days!"},
  ]},
  colors: { icon:"\u1f3a8", label:"Colors", color:"#EC4899", words:[
    {es:"Rojo",     en:"Red",    emoji:"\u1f534", hook:"roh-ho \u2014 red roh-hos of roses everywhere!"},
    {es:"Azul",     en:"Blue",   emoji:"\u1f535", hook:"ah-zool \u2014 the azure blue sky goes ah-zool!"},
    {es:"Verde",    en:"Green",  emoji:"\u1f7e2", hook:"bair-day \u2014 green bears eating leaves today \u2014 BEAR-day!"},
    {es:"Amarillo", en:"Yellow", emoji:"\u1f7e1", hook:"ah-mah-ree-yo \u2014 an ARMADILLO painted itself yellow!"},
    {es:"Naranja",  en:"Orange", emoji:"\u1f7e0", hook:"nah-ran-ha \u2014 orange? You ran here to get one!"},
    {es:"Morado",   en:"Purple", emoji:"\u1f7e3", hook:"moh-rah-do \u2014 MORE-ado purple please \u2014 I want MORE!"},
    {es:"Rosa",     en:"Pink",   emoji:"\u1fa77", hook:"roh-sa \u2014 rosa always wears pink roses!"},
    {es:"Blanco",   en:"White",  emoji:"\u2b1c", hook:"blan-co \u2014 a blank white piece of paper \u2014 blank-o!"},
    {es:"Negro",    en:"Black",  emoji:"\u2b1b", hook:"neh-gro \u2014 negro means black like the night sky!"},
    {es:"Caf\u00e9",     en:"Brown",  emoji:"\u1f7e4", hook:"cah-fay \u2014 coffee is brown \u2014 cafe au lait!"},
  ]},
  animals: { icon:"\u1f43e", label:"Animals", color:"#64748B", words:[
    {es:"Perro",    en:"Dog",      emoji:"\u1f436", hook:"PAIR-oh \u2014 a PAIR of dogs are better than one!"},
    {es:"Gato",     en:"Cat",      emoji:"\u1f431", hook:"gah-to \u2014 the cat's gotta go \u2014 see ya gah-to!"},
    {es:"P\u00e1jaro",   en:"Bird",     emoji:"\u1f426", hook:"pah-ha-ro \u2014 the bird PARACHUTES down \u2014 pah-ha-ro!"},
    {es:"Pez",      en:"Fish",     emoji:"\u1f420", hook:"pehz \u2014 pez candy is fish-shaped \u2014 same word!"},
    {es:"Caballo",  en:"Horse",    emoji:"\u1f434", hook:"cah-bah-yo \u2014 the horse gallops saying bah-yo bah-yo!"},
    {es:"Vaca",     en:"Cow",      emoji:"\u1f42e", hook:"bah-ca \u2014 the cow says bah! bah-ca bah-ca!"},
    {es:"Mono",     en:"Monkey",   emoji:"\u1f412", hook:"moh-no \u2014 mono means alone \u2014 the lonely monkey!"},
    {es:"Elefante", en:"Elephant", emoji:"\u1f418", hook:"eh-leh-fan-tay \u2014 the elephant is a huge fan of Spanish!"},
    {es:"Le\u00f3n",     en:"Lion",     emoji:"\u1f981", hook:"lay-on \u2014 the lion lays on the grass in the sun!"},
    {es:"Tortuga",  en:"Turtle",   emoji:"\u1f422", hook:"tor-TOO-ga \u2014 the turtle took TOO long to get here!"},
  ]},
};

// \u2550\u2550 LEVEL 2 VOCAB \u2014 Intermediate \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const VOCAB_L2 = {
  verbs: { icon:"\u26a1", label:"Verbs & Actions", color:"#7C3AED", words:[
    {es:"Quiero",           en:"I want",          emoji:"\u1f64b", hook:"kyer-oh \u2014 I cheer-oh for what I want!"},
    {es:"Necesito",         en:"I need",           emoji:"\u2757", hook:"neh-seh-SEE-to \u2014 I NEED to SEE-to it right now!"},
    {es:"Tengo",            en:"I have",           emoji:"\u270b", hook:"TEN-go \u2014 I HAVE ten things to go do!"},
    {es:"Voy",              en:"I'm going",        emoji:"\u1f6b6", hook:"BOY \u2014 I'm going like a BOY scout on a mission!"},
    {es:"Me gusta",         en:"I like",           emoji:"\u1f44d", hook:"me goos-ta \u2014 I like it with gusto \u2014 goos-ta!"},
    {es:"Puedo",            en:"I can",            emoji:"\u1f4aa", hook:"pweh-do \u2014 I can power through anything!"},
    {es:"S\u00e9",               en:"I know",           emoji:"\u1f9e0", hook:"SAY \u2014 I KNOW what to SAY about that!"},
    {es:"Hablo",            en:"I speak",          emoji:"\u1f5e3\ufe0f", hook:"AH-blo \u2014 I speak blow by blow \u2014 AH-blo!"},
    {es:"Busco",            en:"I'm looking for",  emoji:"\u1f50d", hook:"boos-co \u2014 I'm boosting my search \u2014 boos-co!"},
    {es:"Vivo en",          en:"I live in",        emoji:"\u1f3e0", hook:"bee-bo \u2014 I LIVE like a bee in my hive \u2014 bee-bo!"},
    {es:"No s\u00e9",            en:"I don't know",     emoji:"\u1f937", hook:"SAY \u2014 I can't SAY because I just don't know!"},
    {es:"\u00bfPuedes repetir?", en:"Can you repeat?",  emoji:"\u1f501", hook:"reh-peh-teer \u2014 repeat it like a spinning tire \u2014 teer teer!"},
    {es:"Entend\u00ed",          en:"I understood",     emoji:"\u1f4a1", hook:"en-ten-dee \u2014 I DID understand \u2014 past tense \u2014 DID-ee!"},
    {es:"Quiero aprender",  en:"I want to learn",  emoji:"\u1f4d6", hook:"ah-pren-dair \u2014 I want to learn from the thin air \u2014 dair!"},
  ]},
  time: { icon:"\u1f550", label:"Time & Days", color:"#0369A1", words:[
    {es:"Hoy",            en:"Today",         emoji:"\u1f4c5", hook:"OY \u2014 today I say OY what a day!"},
    {es:"Ma\u00f1ana",         en:"Tomorrow",      emoji:"\u1f305", hook:"mahn-YAH-na \u2014 tomorrow is like a man eating a banana \u2014 man-yana!"},
    {es:"Ayer",           en:"Yesterday",     emoji:"\u23ea", hook:"ah-yair \u2014 YESTERDAY the air smelled different!"},
    {es:"Ahora",          en:"Right now",     emoji:"\u26a1", hook:"ah-OH-ra \u2014 RIGHT NOW say AH-OH-ra really fast!"},
    {es:"Lunes",          en:"Monday",        emoji:"1\ufe0f\u20e3", hook:"loo-nes \u2014 monday on the moon \u2014 lunar Monday!"},
    {es:"Martes",         en:"Tuesday",       emoji:"2\ufe0f\u20e3", hook:"mar-tays \u2014 tuesday on mars with the martians!"},
    {es:"Mi\u00e9rcoles",      en:"Wednesday",     emoji:"3\ufe0f\u20e3", hook:"mee-air-coh-les \u2014 WEDNESDAY in the air with the MERCURIANS!"},
    {es:"Jueves",         en:"Thursday",      emoji:"4\ufe0f\u20e3", hook:"hweh-bes \u2014 thursday we have webs \u2014 like jove the spider!"},
    {es:"Viernes",        en:"Friday",        emoji:"5\ufe0f\u20e3", hook:"bee-air-nes \u2014 friday in the air near venus \u2014 vee-air-nes!"},
    {es:"S\u00e1bado",         en:"Saturday",      emoji:"\u1f389", hook:"sah-bah-do \u2014 saturday in the sahara desert!"},
    {es:"Domingo",        en:"Sunday",        emoji:"\u2600\ufe0f", hook:"doh-ming-go \u2014 sunday with dominoes \u2014 dom-ingo!"},
    {es:"\u00bfQu\u00e9 hora es?",  en:"What time is it?",emoji:"\u1f550", hook:"kay OH-ra \u2014 WHAT hour is it \u2014 kay say the clock!"},
    {es:"Por la ma\u00f1ana",  en:"In the morning", emoji:"\u1f304", hook:"mahn-YAH-na \u2014 morning banana time with the man!"},
    {es:"Por la noche",   en:"At night",      emoji:"\u1f319", hook:"noh-chay \u2014 NO chess at night \u2014 night time!"},
  ]},
  body: { icon:"\u1f4aa", label:"Body & Health", color:"#DC2626", words:[
    {es:"Cabeza",              en:"Head",          emoji:"\u1f92f", hook:"cah-bay-sah \u2014 a cab drove into your head \u2014 cah-bay!"},
    {es:"Mano",                en:"Hand",          emoji:"\u270b", hook:"mah-no \u2014 your hand is your MAN-O helper!"},
    {es:"Pie",                 en:"Foot",          emoji:"\u1f9b6", hook:"pee-EH \u2014 your foot makes a pie shape in the mud!"},
    {es:"Ojo",                 en:"Eye",           emoji:"\u1f441\ufe0f", hook:"OH-ho \u2014 your eye goes OH-ho when it sees something amazing!"},
    {es:"Est\u00f3mago",            en:"Stomach",       emoji:"\u1f623", hook:"es-toh-mah-go \u2014 your stomach says stop-mago I'm full!"},
    {es:"Espalda",             en:"Back",          emoji:"\u1f519", hook:"es-pal-da \u2014 your back is your best pal-da!"},
    {es:"Me duele",            en:"It hurts",      emoji:"\u1f623", hook:"dweh-lay \u2014 it hurts like a duel \u2014 dwell on the pain!"},
    {es:"Estoy enfermo",       en:"I'm sick",      emoji:"\u1f912", hook:"en-fair-mo \u2014 it's NOT fair-mo to be sick!"},
    {es:"Necesito un m\u00e9dico",  en:"I need a doctor",emoji:"\u1f468\u200d\u2695\ufe0f", hook:"meh-dee-co \u2014 the medic is your medical doctor!"},
    {es:"La farmacia",         en:"The pharmacy",  emoji:"\u1f48a", hook:"far-mah-see-ah \u2014 the pharmacy is FAR-macia away!"},
    {es:"Tengo fiebre",        en:"I have a fever", emoji:"\u1f321\ufe0f", hook:"fee-EH-bray \u2014 fever is like a fee you pay \u2014 fee-EH!"},
    {es:"Me siento mal",       en:"I feel bad",    emoji:"\u1f61e", hook:"mal \u2014 feeling bad is just plain mal-icious!"},
  ]},
  descriptions: { icon:"\u1f3ad", label:"Describing Things", color:"#B45309", words:[
    {es:"Grande",   en:"Big",       emoji:"\u1f418", hook:"gran-day \u2014 grand and BIG \u2014 it's a grand day!"},
    {es:"Peque\u00f1o",  en:"Small",     emoji:"\u1f42d", hook:"peh-ken-yo \u2014 SMALL like little kenny YO!"},
    {es:"Bonito",   en:"Beautiful", emoji:"\u1f60d", hook:"boh-nee-to \u2014 BEAUTIFUL like a bonito fish in the sea!"},
    {es:"Caro",     en:"Expensive", emoji:"\u1f4b8", hook:"CAR-oh \u2014 as EXPENSIVE as a CAR \u2014 CAR-oh!"},
    {es:"Barato",   en:"Cheap",     emoji:"\u1f911", hook:"bah-rah-to \u2014 cheap like a burrito that costs almost nothing!"},
    {es:"Cerca",    en:"Near",      emoji:"\u1f4cd", hook:"sair-ca \u2014 near the circus \u2014 sair-ca!"},
    {es:"Lejos",    en:"Far",       emoji:"\u1f5fa\ufe0f", hook:"leh-hos \u2014 FAR like a legion of miles away!"},
    {es:"R\u00e1pido",   en:"Fast",      emoji:"\u26a1", hook:"rah-pee-do \u2014 RAPID and fast like a RAPID-o rocket!"},
    {es:"Lento",    en:"Slow",      emoji:"\u1f422", hook:"len-to \u2014 slow like lento music \u2014 nice and slow!"},
    {es:"Caliente", en:"Hot",       emoji:"\u1f525", hook:"cah-lee-en-tay \u2014 hot like a KALEIDOSCOPE of fire!"},
    {es:"Fr\u00edo",     en:"Cold",      emoji:"\u1f9ca", hook:"free-oh \u2014 cold and free-zing cold \u2014 free-oh!"},
    {es:"F\u00e1cil",    en:"Easy",      emoji:"\u1f60a", hook:"fah-seel \u2014 easy peasy like a fossil in the ground!"},
    {es:"Dif\u00edcil",  en:"Difficult", emoji:"\u1f624", hook:"dee-fee-seel \u2014 DIFFICULT fee to pay \u2014 dee-fee!"},
    {es:"Mucho",    en:"A lot",     emoji:"\u1f4e6", hook:"moo-cho \u2014 A lot of MOOs from the cow \u2014 moo-cho!"},
  ]},
  shopping: { icon:"\u1f6d2", label:"Shopping & Market", color:"#065F46", words:[
    {es:"El mercado",            en:"The market",          emoji:"\u1f3ea", hook:"mehr-cah-do \u2014 the market is your mercado adventure!"},
    {es:"\u00bfTiene cambio?",        en:"Do you have change?", emoji:"\u1f4b0", hook:"cahm-bee-oh \u2014 change your cambia coins!"},
    {es:"Es muy caro",           en:"It's very expensive", emoji:"\u1f631", hook:"moo-ee CAR-oh \u2014 the CAR is VERY expensive \u2014 moo-ee!"},
    {es:"Me llevo esto",         en:"I'll take this",      emoji:"\u1f6cd\ufe0f", hook:"yeh-bo \u2014 I'll TAKE it yebo style \u2014 yeh-bo!"},
    {es:"\u00bfCu\u00e1nto es todo?",      en:"How much is everything?",emoji:"\u1f9fe", hook:"kwahn-to \u2014 HOW MUCH in this quantum universe?"},
    {es:"Quiero comprar",        en:"I want to buy",       emoji:"\u1f4b3", hook:"cohm-prar \u2014 I want to compare prices before buying!"},
    {es:"\u00bfAcepta tarjeta?",      en:"Do you accept card?", emoji:"\u1f4b3", hook:"tar-heh-ta \u2014 card like a target credit card!"},
    {es:"El precio",             en:"The price",           emoji:"\u1f3f7\ufe0f", hook:"preh-see-oh \u2014 the price is oh so precious!"},
    {es:"La bolsa",              en:"The bag",             emoji:"\u1f6cd\ufe0f", hook:"bowl-sah \u2014 the bag is shaped like a bowl!"},
    {es:"\u00bfPuede bajar el precio?",en:"Can you lower the price?",emoji:"\u1f64f", hook:"bah-har \u2014 can you lower it like going DOWN to a bar?"},
    {es:"\u00bfD\u00f3nde encuentro...?",  en:"Where do I find...?", emoji:"\u1f50d", hook:"en-kwen-tro \u2014 WHERE do I ENCOUNTER what I'm looking for?"},
    {es:"Me da uno m\u00e1s",         en:"Give me one more",    emoji:"\u270c\ufe0f", hook:"Give me uno mas \u2014 one MORE please!"},
  ]},
  weather: { icon:"\u1f324\ufe0f", label:"Weather", color:"#1D4ED8", words:[
    {es:"Hace calor",        en:"It's hot",          emoji:"\u2600\ufe0f", hook:"AH-say cah-lor \u2014 it makes calor \u2014 hot hot hot!"},
    {es:"Hace fr\u00edo",         en:"It's cold",         emoji:"\u1f9ca", hook:"free-oh \u2014 it's cold and free-zing cold!"},
    {es:"Est\u00e1 lloviendo",    en:"It's raining",      emoji:"\u1f327\ufe0f", hook:"yo-bee-en-do \u2014 it's raining loving drops from the sky!"},
    {es:"Hace viento",       en:"It's windy",        emoji:"\u1f4a8", hook:"bee-en-to \u2014 windy like a vent blowing hard!"},
    {es:"Est\u00e1 nublado",      en:"It's cloudy",       emoji:"\u2601\ufe0f", hook:"noo-blah-do \u2014 cloudy and totally blah-do gray!"},
    {es:"\u00bfC\u00f3mo est\u00e1 el clima?",en:"What's the weather like?",emoji:"\u1f321\ufe0f", hook:"klee-mah \u2014 the climate clime changes fast in Cuenca!"},
    {es:"Va a llover",       en:"It's going to rain",emoji:"\u26c8\ufe0f", hook:"yo-bair \u2014 it's going to rain like a lover of water!"},
    {es:"Hace buen tiempo",  en:"The weather is nice",emoji:"\u1f308", hook:"tee-em-po \u2014 nice weather tempo \u2014 what a GOOD time!"},
    {es:"El sol",            en:"The sun",           emoji:"\u2600\ufe0f", hook:"sole \u2014 the sun is your sole friend on cold days!"},
    {es:"La lluvia",         en:"The rain",          emoji:"\u1f327\ufe0f", hook:"yoo-bee-ah \u2014 the rain goes yoobia yoobia down!"},
    {es:"La neblina",        en:"The fog",           emoji:"\u1f32b\ufe0f", hook:"neh-blee-nah \u2014 fog like a nebula floating down!"},
    {es:"Qu\u00e9 fresco",        en:"How pleasant",      emoji:"\u1f60c", hook:"fres-co \u2014 how fresh and pleasant \u2014 fresco cool!"},
  ]},
};


// \u2550\u2550 LEVEL 3 VOCAB (Advanced Intermediate) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const VOCAB_L3 = {
  opinions: { icon:"\u1f4ac", label:"Opinions & Ideas", color:"#BE185D", words:[
    {es:"Creo que",en:"I think that",emoji:"\u1f4ad",hook:"kreh-oh \u2014 I create my own thoughts \u2014 creo que!"},
    {es:"En mi opini\u00f3n",en:"In my opinion",emoji:"\u1f5e3\ufe0f",hook:"oh-pee-nyon \u2014 your opinion is your own onion \u2014 unique and layered!"},
    {es:"Estoy de acuerdo",en:"I agree",emoji:"\u1f44d",hook:"ah-kwair-do \u2014 I agree to meet at the square-do!"},
    {es:"No estoy de acuerdo",en:"I disagree",emoji:"\u1f44e",hook:"No agreement \u2014 the square is the wrong shape!"},
    {es:"Depende",en:"It depends",emoji:"\u1f937",hook:"deh-pen-day \u2014 it depends on which pen-day you pick!"},
    {es:"Me parece bien",en:"It seems fine to me",emoji:"\u2705",hook:"pah-reh-seh \u2014 it appears and seems just right to me!"},
    {es:"No me gusta",en:"I don't like it",emoji:"\u1f615",hook:"No goose-ta \u2014 the goose did NOT like that at all!"},
    {es:"Me encanta",en:"I love it",emoji:"\u1f60d",hook:"en-kan-ta \u2014 it enchants me \u2014 en-chant-a!"},
    {es:"Es interesante",en:"It's interesting",emoji:"\u1f914",hook:"in-teh-reh-san-tay \u2014 it's INTERESTING like a saint dancing!"},
    {es:"Tiene raz\u00f3n",en:"You are right",emoji:"\u1f3af",hook:"rah-sohn \u2014 you have reason \u2014 rah-sohn is right!"},
    {es:"No tiene raz\u00f3n",en:"You are wrong",emoji:"\u274c",hook:"No reason \u2014 no rah-sohn for that!"},
    {es:"Quiz\u00e1s",en:"Maybe",emoji:"\u1f937",hook:"kee-sas \u2014 maybe a kiss-as will help!"},
    {es:"Desde luego",en:"Of course",emoji:"\u1f4af",hook:"des-day lweh-go \u2014 of course from THERE to HERE!"},
    {es:"Sin embargo",en:"However",emoji:"\u2194\ufe0f",hook:"em-bar-go \u2014 however the embargo stopped it!"},
  ]},
  travel: { icon:"\u2708\ufe0f", label:"Travel", color:"#0F766E", words:[
    {es:"El aeropuerto",en:"The airport",emoji:"\u2708\ufe0f",hook:"ah-roh-pwair-to \u2014 the air-o-port opens to the sky!"},
    {es:"El vuelo",en:"The flight",emoji:"\u1f6eb",hook:"bweh-lo \u2014 the flight goes whoa up into the sky!"},
    {es:"El pasaporte",en:"The passport",emoji:"\u1f4d5",hook:"pah-sah-por-tay \u2014 your pass-a-port-ay gets you through the port!"},
    {es:"La maleta",en:"The suitcase",emoji:"\u1f9f3",hook:"mah-leh-ta \u2014 your suitcase holds your maleta of memories!"},
    {es:"El equipaje",en:"The luggage",emoji:"\u1f9f3",hook:"eh-kee-pah-hey \u2014 EQUIPMENT for your journey \u2014 eh-kee-pah!"},
    {es:"La reservaci\u00f3n",en:"The reservation",emoji:"\u1f4cb",hook:"reh-sair-bah-syon \u2014 reserve your spot at the station!"},
    {es:"El hotel",en:"The hotel",emoji:"\u1f3e8",hook:"oh-tel \u2014 hotel sounds the same \u2014 oh-tel!"},
    {es:"La habitaci\u00f3n",en:"The room",emoji:"\u1f6cf\ufe0f",hook:"ah-bee-tah-syon \u2014 HABITATION \u2014 your living space!"},
    {es:"\u00bfA qu\u00e9 hora sale?",en:"What time does it leave?",emoji:"\u1f550",hook:"sah-leh \u2014 what hour does it sail away?"},
    {es:"\u00bfD\u00f3nde est\u00e1 la salida?",en:"Where is the exit?",emoji:"\u1f6aa",hook:"sah-lee-da \u2014 the exit sails you out the door!"},
    {es:"Perd\u00ed mi equipaje",en:"I lost my luggage",emoji:"\u1f631",hook:"pair-dee \u2014 I'm in a PAIR of trouble \u2014 lost it!"},
    {es:"Quiero cambiar dinero",en:"I want to exchange money",emoji:"\u1f4b1",hook:"kahm-bee-ar \u2014 change money at the cambio!"},
  ]},
  health: { icon:"\u1f3e5", label:"Health & Emergency", color:"#DC2626", words:[
    {es:"Llame a la polic\u00eda",en:"Call the police",emoji:"\u1f694",hook:"YAH-meh \u2014 call the llama police \u2014 YAH-meh!"},
    {es:"Necesito ayuda",en:"I need help",emoji:"\u1f198",hook:"ah-yoo-da \u2014 I need aid \u2014 ayu-da!"},
    {es:"\u00bfD\u00f3nde est\u00e1 el hospital?",en:"Where is the hospital?",emoji:"\u1f3e5",hook:"ohs-pee-tal \u2014 the hospital is the os-pee-tal!"},
    {es:"Tengo una alergia",en:"I have an allergy",emoji:"\u1f927",hook:"ah-lair-hee-ah \u2014 allergy \u2014 ah-lair in the air!"},
    {es:"Soy diab\u00e9tico",en:"I am diabetic",emoji:"\u1f489",hook:"dee-ah-beh-tee-co \u2014 DIAbetic \u2014 dia-beh!"},
    {es:"Necesito mis medicamentos",en:"I need my medication",emoji:"\u1f48a",hook:"meh-dee-kah-men-tos \u2014 MEDICATION MENtos!"},
    {es:"Me robaron",en:"I was robbed",emoji:"\u1f6a8",hook:"roh-bah-ron \u2014 rob-aron \u2014 they robbed me!"},
    {es:"Estoy perdido",en:"I am lost",emoji:"\u1f61f",hook:"pair-dee-do \u2014 lost in a PAIR of streets!"},
    {es:"\u00bfPuede llamar a alguien?",en:"Can you call someone?",emoji:"\u1f4de",hook:"YAH-mar \u2014 can you call someone \u2014 llama them!"},
    {es:"No me siento bien",en:"I don't feel well",emoji:"\u1f912",hook:"see-en-to \u2014 I don't sense wellness \u2014 no see-en-to!"},
    {es:"\u00bfTiene un seguro m\u00e9dico?",en:"Do you have insurance?",emoji:"\u1f4cb",hook:"seh-goo-ro \u2014 secure medical coverage \u2014 seh-guro!"},
    {es:"Necesito descansar",en:"I need to rest",emoji:"\u1f634",hook:"des-kan-sar \u2014 I need to descend into rest \u2014 des-kan!"},
  ]},
  socialLife: { icon:"\u1f389", label:"Social & Daily Life", color:"#7C3AED", words:[
    {es:"\u00bfQu\u00e9 haces en tu tiempo libre?",en:"What do you do in your free time?",emoji:"\u1f550",hook:"tee-em-po lee-breh \u2014 tempo libre \u2014 free time music!"},
    {es:"Me gusta leer",en:"I like to read",emoji:"\u1f4da",hook:"leh-air \u2014 I like to READ the air \u2014 leh-air!"},
    {es:"Salgo con amigos",en:"I go out with friends",emoji:"\u1f389",hook:"sal-go \u2014 I sally forth with friends \u2014 sal-go!"},
    {es:"Trabajo desde casa",en:"I work from home",emoji:"\u1f3e0",hook:"kasa \u2014 I work from my casa \u2014 home sweet home!"},
    {es:"\u00bfTienes planes?",en:"Do you have plans?",emoji:"\u1f4c5",hook:"plah-nes \u2014 planes of plans ahead!"},
    {es:"\u00a1Qu\u00e9 pena!",en:"What a shame!",emoji:"\u1f61e",hook:"peh-nah \u2014 what a pain \u2014 peh-nah!"},
    {es:"\u00a1Qu\u00e9 suerte!",en:"What luck!",emoji:"\u1f340",hook:"swair-teh \u2014 sweet luck \u2014 swair-teh!"},
    {es:"\u00bfC\u00f3mo fue?",en:"How did it go?",emoji:"\u2753",hook:"fweh \u2014 HOW did it FLY by \u2014 fweh!"},
    {es:"Fue genial",en:"It was great",emoji:"\u1f31f",hook:"heh-nee-al \u2014 it was genial \u2014 GENIus-al!"},
    {es:"La pr\u00f3xima vez",en:"Next time",emoji:"\u23ed\ufe0f",hook:"prohk-see-mah \u2014 PROXIMATE time \u2014 next and near!"},
    {es:"A veces",en:"Sometimes",emoji:"\u1f504",hook:"AH beh-ses \u2014 AH sometimes the bases change!"},
    {es:"Siempre",en:"Always",emoji:"\u267e\ufe0f",hook:"see-em-preh \u2014 sempre \u2014 always in music means always!"},
  ]},
  technology: { icon:"\u1f4f1", label:"Technology", color:"#1D4ED8", words:[
    {es:"El tel\u00e9fono",en:"The phone",emoji:"\u1f4f1",hook:"teh-leh-foh-no \u2014 TELEPHONE \u2014 tele-fono!"},
    {es:"La contrase\u00f1a",en:"The password",emoji:"\u1f511",hook:"kon-tra-seh-nya \u2014 contra the entrance \u2014 kon-tra-SE\u00d1!"},
    {es:"\u00bfTiene WiFi?",en:"Do you have WiFi?",emoji:"\u1f4f6",hook:"wee-fee \u2014 WiFi sounds the same worldwide!"},
    {es:"\u00bfCu\u00e1l es la clave?",en:"What is the code/key?",emoji:"\u1f510",hook:"kla-beh \u2014 the clave is the key \u2014 kla-beh!"},
    {es:"La aplicaci\u00f3n",en:"The app",emoji:"\u1f4f2",hook:"ah-plee-kah-syon \u2014 APPLICATION \u2014 ah-plee-kay!"},
    {es:"Buscar en internet",en:"Search the internet",emoji:"\u1f50d",hook:"boos-kar \u2014 boost your search on the internet!"},
    {es:"Mandar un mensaje",en:"Send a message",emoji:"\u1f4ac",hook:"men-sah-heh \u2014 manage to send your message!"},
    {es:"La bater\u00eda est\u00e1 baja",en:"The battery is low",emoji:"\u1f50b",hook:"bah-teh-ree-ah bah-ha \u2014 battery going low-ha!"},
    {es:"\u00bfPuedo cargar mi tel\u00e9fono?",en:"Can I charge my phone?",emoji:"\u1f50c",hook:"kar-gar \u2014 can I charge \u2014 cargo my phone up!"},
    {es:"Tomar una foto",en:"Take a photo",emoji:"\u1f4f8",hook:"foh-to \u2014 foto \u2014 photo sounds almost the same!"},
  ]},
};

// \u2550\u2550 CORE 1000 \u2014 Most Common Spanish Words \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// Organized in sets of 25, prioritized by frequency of use in conversation
const CORE_SETS = [
  {
    setNum:1, title:"Top 25 Essential Words", color:"#DC2626",
    words:[
      {es:"El / La",en:"The",emoji:"\u1f4cc",hook:"el/la \u2014 THE most used word \u2014 just el or la!"},
      {es:"De",en:"Of / From",emoji:"\u1f4cd",hook:"deh \u2014 de-liver from \u2014 coming FROM somewhere!"},
      {es:"Y",en:"And",emoji:"\u2795",hook:"ee \u2014 E-asy AND simple \u2014 just say ee!"},
      {es:"En",en:"In / On",emoji:"\u1f4e6",hook:"en \u2014 in the box \u2014 like English 'in'!"},
      {es:"Un / Una",en:"A / An",emoji:"1\ufe0f\u20e3",hook:"oon/oo-na \u2014 A single ONE thing \u2014 oon!"},
      {es:"Que",en:"That / What",emoji:"\u2753",hook:"keh \u2014 THAT's what \u2014 keh said that?"},
      {es:"Se",en:"Oneself / Each other",emoji:"\u1f504",hook:"seh \u2014 self \u2014 like reFLEXive self!"},
      {es:"No",en:"No / Not",emoji:"\u1f6ab",hook:"no \u2014 NO needs no hook \u2014 it's the same!"},
      {es:"Con",en:"With",emoji:"\u1f91d",hook:"kon \u2014 con-nect WITH someone \u2014 kon!"},
      {es:"Por",en:"For / By / Through",emoji:"\u1f6e3\ufe0f",hook:"por \u2014 por-tal through which things pass!"},
      {es:"Su",en:"His / Her / Their",emoji:"\u1f464",hook:"soo \u2014 su-e owns everything \u2014 soo!"},
      {es:"Para",en:"For / In order to",emoji:"\u1f3af",hook:"pah-ra \u2014 PARAllel FOR a purpose!"},
      {es:"Como",en:"Like / As / How",emoji:"\u1f50d",hook:"koh-mo \u2014 como \u2014 HOW like a comma pausing!"},
      {es:"M\u00e1s",en:"More",emoji:"\u2795",hook:"mas \u2014 MORE mMAS \u2014 just like mas in music!"},
      {es:"Pero",en:"But",emoji:"\u2194\ufe0f",hook:"peh-ro \u2014 BUT a pear-oh stops the sentence!"},
      {es:"Si",en:"If",emoji:"\u1f914",hook:"see \u2014 if you SEE it \u2014 see!"},
      {es:"Ya",en:"Already / Now",emoji:"\u26a1",hook:"yah \u2014 YAH already done \u2014 YAH!"},
      {es:"Todo",en:"All / Everything",emoji:"\u1f310",hook:"toh-do \u2014 TODO list has EVERYTHING!"},
      {es:"Le",en:"To him / To her",emoji:"\u1f446",hook:"leh \u2014 le-t him have it \u2014 leh!"},
      {es:"Bien",en:"Well / Good",emoji:"\u2705",hook:"bee-en \u2014 BEAN good \u2014 feeling bee-en!"},
      {es:"Cuando",en:"When",emoji:"\u1f550",hook:"kwan-do \u2014 WHEN is it quando?"},
      {es:"Muy",en:"Very",emoji:"\u203c\ufe0f",hook:"moo-ee \u2014 VERY moo-ee like a cow yelling VERY loud!"},
      {es:"Sin",en:"Without",emoji:"\u1f6ab",hook:"seen \u2014 sin \u2014 without good it's a sin!"},
      {es:"Sobre",en:"About / On top of",emoji:"\u1f4cb",hook:"soh-breh \u2014 SOBER thoughts ABOUT things!"},
      {es:"Hay",en:"There is / There are",emoji:"\u1f5fa\ufe0f",hook:"eye \u2014 THERE is \u2014 AYE there's something there!"},
    ]
  },
  {
    setNum:2, title:"Words 26\u201350: Actions & States", color:"#D97706",
    words:[
      {es:"Ser",en:"To be (permanent)",emoji:"\u267e\ufe0f",hook:"sair \u2014 to be forever \u2014 sair always!"},
      {es:"Estar",en:"To be (temporary)",emoji:"\u23f3",hook:"es-tar \u2014 star position \u2014 where you're standing now!"},
      {es:"Tener",en:"To have",emoji:"\u270b",hook:"teh-nair \u2014 tennis player has a racket \u2014 TEN-er!"},
      {es:"Hacer",en:"To do / To make",emoji:"\u1f528",hook:"ah-sair \u2014 to DO \u2014 a sayer does things!"},
      {es:"Ir",en:"To go",emoji:"\u1f6b6",hook:"eer \u2014 GO \u2014eer away!"},
      {es:"Ver",en:"To see",emoji:"\u1f441\ufe0f",hook:"bair \u2014 to SEE \u2014 BEAR sees you!"},
      {es:"Dar",en:"To give",emoji:"\u1f381",hook:"dar \u2014 DARE to GIVE \u2014 dar!"},
      {es:"Saber",en:"To know (facts)",emoji:"\u1f9e0",hook:"sah-bair \u2014 savvy \u2014 to KNOW the facts!"},
      {es:"Querer",en:"To want / To love",emoji:"\u2764\ufe0f",hook:"keh-rair \u2014 to CARE and WANT \u2014 keh-rair!"},
      {es:"Llegar",en:"To arrive",emoji:"\u1f3c1",hook:"yeh-gar \u2014 yeah I arrived \u2014 yeh-gar!"},
      {es:"Pasar",en:"To pass / To happen",emoji:"\u27a1\ufe0f",hook:"pah-sar \u2014 to pass \u2014 pah-pass!"},
      {es:"Deber",en:"Should / Must",emoji:"\u26a0\ufe0f",hook:"deh-bair \u2014 debt \u2014 you should pay your debts!"},
      {es:"Poner",en:"To put / To place",emoji:"\u1f4cc",hook:"poh-nair \u2014 to PUT \u2014 poner places things!"},
      {es:"Venir",en:"To come",emoji:"\u1f44b",hook:"beh-neer \u2014 COME here veneer!"},
      {es:"Seguir",en:"To follow / To continue",emoji:"\u25b6\ufe0f",hook:"seh-geer \u2014 seguir \u2014 seek and follow!"},
      {es:"Encontrar",en:"To find / To meet",emoji:"\u1f50d",hook:"en-kon-trar \u2014 ENCOUNTER \u2014 to find and meet!"},
      {es:"Llamar",en:"To call",emoji:"\u1f4de",hook:"yah-mar \u2014 call the llama \u2014 yah-mar!"},
      {es:"Creer",en:"To believe",emoji:"\u1f64f",hook:"kreh-air \u2014 to believe \u2014 create belief!"},
      {es:"Hablar",en:"To speak",emoji:"\u1f5e3\ufe0f",hook:"ah-blar \u2014 able to speak \u2014 ah-blar!"},
      {es:"Llevar",en:"To carry / To take",emoji:"\u1f392",hook:"yeh-bar \u2014 carry the lever \u2014 yeh-bar!"},
      {es:"Dejar",en:"To leave / To let",emoji:"\u1f6aa",hook:"deh-har \u2014 depart and leave \u2014 deh-har!"},
      {es:"Sentir",en:"To feel",emoji:"\u1f493",hook:"sen-teer \u2014 sentient feeling \u2014 sen-teer!"},
      {es:"Vivir",en:"To live",emoji:"\u1f331",hook:"bee-beer \u2014 to LIVE and drink beer of life \u2014 vee-veer!"},
      {es:"Pensar",en:"To think",emoji:"\u1f4ad",hook:"pen-sar \u2014 pensive thinker \u2014 pen-sar!"},
      {es:"Salir",en:"To leave / To go out",emoji:"\u1f6b6",hook:"sah-leer \u2014 sally out \u2014 sal-leer!"},
    ]
  },
  {
    setNum:3, title:"Words 51\u201375: People & Places", color:"#059669",
    words:[
      {es:"La persona",en:"The person",emoji:"\u1f464",hook:"pair-soh-na \u2014 persona \u2014 your personal self!"},
      {es:"El hombre",en:"The man",emoji:"\u1f468",hook:"ohm-breh \u2014 the MAN is sombre \u2014 ohm-breh!"},
      {es:"La mujer",en:"The woman",emoji:"\u1f469",hook:"moo-hair \u2014 the woman has the hair \u2014 moo-hair!"},
      {es:"El ni\u00f1o",en:"The boy",emoji:"\u1f466",hook:"nee-nyo \u2014 the BOY is ninja \u2014 nee-nyo!"},
      {es:"La ni\u00f1a",en:"The girl",emoji:"\u1f467",hook:"nee-nya \u2014 the girl is a ninja too \u2014 nee-nya!"},
      {es:"La ciudad",en:"The city",emoji:"\u1f3d9\ufe0f",hook:"see-oo-dad \u2014 dad lives in the city \u2014 see-oo-dad!"},
      {es:"El pa\u00eds",en:"The country",emoji:"\u1f5fa\ufe0f",hook:"pah-ees \u2014 the country is a peace of land!"},
      {es:"La casa",en:"The house",emoji:"\u1f3e0",hook:"kah-sah \u2014 casa \u2014 house is casa!"},
      {es:"El trabajo",en:"The work / Job",emoji:"\u1f4bc",hook:"trah-bah-ho \u2014 trouble at WORK \u2014 trah-bah!"},
      {es:"El tiempo",en:"Time / Weather",emoji:"\u23f0",hook:"tee-em-po \u2014 tempo of time and weather!"},
      {es:"El a\u00f1o",en:"The year",emoji:"\u1f4c5",hook:"AH-nyo \u2014 annual year \u2014 AH-nyo!"},
      {es:"El d\u00eda",en:"The day",emoji:"\u1f31e",hook:"dee-ah \u2014 the DAY \u2014 dee-lightful day!"},
      {es:"La vida",en:"Life",emoji:"\u1f331",hook:"bee-da \u2014 vita \u2014 vida is life!"},
      {es:"El mundo",en:"The world",emoji:"\u1f30d",hook:"moon-do \u2014 the world has a moon-do!"},
      {es:"La mano",en:"The hand",emoji:"\u270b",hook:"mah-no \u2014 MAN-o hand \u2014 MAN of hands!"},
      {es:"El lugar",en:"The place",emoji:"\u1f4cd",hook:"loo-gar \u2014 the PLACE \u2014 lure to a gar-den!"},
      {es:"La vez",en:"The time (occasion)",emoji:"\u1f501",hook:"behs \u2014 once upon a vez \u2014 time!"},
      {es:"La parte",en:"The part",emoji:"\u1f9e9",hook:"par-teh \u2014 PART of the party!"},
      {es:"El lado",en:"The side",emoji:"\u2194\ufe0f",hook:"lah-do \u2014 the SIDE \u2014 laid-o on one side!"},
      {es:"El punto",en:"The point",emoji:"\u1f3af",hook:"poon-to \u2014 point \u2014 point-o right there!"},
      {es:"El tipo",en:"The type / Guy",emoji:"\u1f464",hook:"tee-po \u2014 type of person \u2014 tee-po!"},
      {es:"La manera",en:"The way / Manner",emoji:"\u1f6e3\ufe0f",hook:"mah-neh-rah \u2014 manner of the WAY!"},
      {es:"La forma",en:"The form / Way",emoji:"\u1f4dd",hook:"FOR-mah \u2014 form \u2014 FOR-ma!"},
      {es:"El nombre",en:"The name",emoji:"\u1f3f7\ufe0f",hook:"nohm-breh \u2014 nombre \u2014 the name!"},
      {es:"El caso",en:"The case",emoji:"\u1f5c2\ufe0f",hook:"kah-so \u2014 the case \u2014 kah-so!"},
    ]
  },
  {
    setNum:4, title:"Words 76\u2013100: Connectors & Expressions", color:"#7C3AED",
    words:[
      {es:"Tambi\u00e9n",en:"Also / Too",emoji:"\u2795",hook:"tahm-bee-en \u2014 TAMBOURINE also makes music!"},
      {es:"S\u00f3lo",en:"Only / Just",emoji:"1\ufe0f\u20e3",hook:"soh-lo \u2014 SOLO \u2014 ONLY one person!"},
      {es:"As\u00ed",en:"Like this / So",emoji:"\u1f446",hook:"ah-SEE \u2014 so \u2014 AH-SEE like this!"},
      {es:"Ah\u00ed",en:"There",emoji:"\u1f4cd",hook:"ah-ee \u2014 AH-ee there it is!"},
      {es:"Aqu\u00ed",en:"Here",emoji:"\u1f4cd",hook:"ah-kee \u2014 ah-key is HERE!"},
      {es:"All\u00ed",en:"Over there",emoji:"\u1f449",hook:"ah-yee \u2014 ah-yee over THERE!"},
      {es:"Despu\u00e9s",en:"After / Later",emoji:"\u23ed\ufe0f",hook:"des-pwes \u2014 AFTER \u2014 des-pass the time!"},
      {es:"Antes",en:"Before",emoji:"\u23ee\ufe0f",hook:"ahn-tes \u2014 ante \u2014 before the ante!"},
      {es:"Ahora",en:"Now",emoji:"\u26a1",hook:"ah-OH-rah \u2014 NOW \u2014 ah-OH-ra right now!"},
      {es:"Siempre",en:"Always",emoji:"\u267e\ufe0f",hook:"see-em-preh \u2014 sempre \u2014 always in music!"},
      {es:"Nunca",en:"Never",emoji:"\u1f6ab",hook:"noon-kah \u2014 NEVER at noon-kah!"},
      {es:"Poco",en:"A little / Few",emoji:"\u1f90f",hook:"poh-ko \u2014 POCO \u2014 a little POCO!"},
      {es:"Mucho",en:"A lot / Much",emoji:"\u1f4e6",hook:"moo-cho \u2014 MUCH moo from the cow!"},
      {es:"Muy",en:"Very",emoji:"\u203c\ufe0f",hook:"moo-ee \u2014 VERY moo \u2014 very loud cow!"},
      {es:"Tanto",en:"So much / As much",emoji:"\u2696\ufe0f",hook:"tan-to \u2014 tan-much in the tan skin!"},
      {es:"Mismo",en:"Same / Itself",emoji:"\u1fa9e",hook:"mees-mo \u2014 SAME mirror \u2014 mees-mo!"},
      {es:"Cada",en:"Each / Every",emoji:"\u1f522",hook:"kah-da \u2014 EACH cada-et learns every day!"},
      {es:"Entre",en:"Between / Among",emoji:"\u2194\ufe0f",hook:"en-treh \u2014 entre-ance between two doors!"},
      {es:"Dentro",en:"Inside",emoji:"\u1f4e6",hook:"den-tro \u2014 inside the den-tro!"},
      {es:"Fuera",en:"Outside",emoji:"\u1f333",hook:"fwair-ah \u2014 outside \u2014 it's fair outside!"},
      {es:"Contra",en:"Against",emoji:"\u2694\ufe0f",hook:"kon-trah \u2014 contra \u2014 against the enemy!"},
      {es:"Hacia",en:"Toward",emoji:"\u27a1\ufe0f",hook:"AH-see-ah \u2014 toward \u2014 AH-see the direction!"},
      {es:"Desde",en:"Since / From",emoji:"\u1f4c5",hook:"des-deh \u2014 since \u2014 from THAT des-k!"},
      {es:"Hasta",en:"Until / Up to",emoji:"\u1f3c1",hook:"ahs-tah \u2014 hasta la vista \u2014 UNTIL we meet!"},
      {es:"Durante",en:"During",emoji:"\u23f1\ufe0f",hook:"doo-ran-teh \u2014 during the DURAtion!"},
    ]
  },
];

const CORE_ALL_WORDS = CORE_SETS.flatMap(s => s.words);

const ALL_WORDS_L1 = Object.values(VOCAB_L1).flatMap(c => c.words);
const ALL_WORDS_L2 = Object.values(VOCAB_L2).flatMap(c => c.words);
const ALL_WORDS_L3 = Object.values(VOCAB_L3).flatMap(c => c.words);
const ALL_WORDS    = [...ALL_WORDS_L1, ...ALL_WORDS_L2, ...ALL_WORDS_L3, ...CORE_ALL_WORDS];

// \u2550\u2550 STORY MODE DATA \u2014 set in Cuenca, full audio on every line \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const STORIES = [
  {
    id:"cafe",
    title:"Un Caf\u00e9 en Cuenca",
    titleEn:"A Caf\u00e9 in Cuenca",
    emoji:"\u2615",
    color:"#DC6B19",
    panels:[
      {scene:"You walk into a cozy caf\u00e9 in the center of Cuenca.", sceneEs:"Entran a una cafeter\u00eda bonita en Cuenca."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Buenos d\u00edas. \u00bfTienen una mesa para dos?",    en:"Good morning. Do you have a table for two?"},
      {speaker:"Waiter",  avatar:"\u1f468", es:"\u00a1Claro que s\u00ed! Por aqu\u00ed, por favor.",        en:"Of course! Right this way, please."},
      {scene:"You sit down and look at the menu.", sceneEs:"Se sientan y miran el men\u00fa."},
      {speaker:"Grayson", avatar:"\u1f981", es:"Mam\u00e1, \u00bfqu\u00e9 es esto?",                        en:"Mom, what is this?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Es el men\u00fa, mi amor. Mira los precios.",     en:"It's the menu, my love. Look at the prices."},
      {speaker:"Waiter",  avatar:"\u1f468", es:"\u00bfQu\u00e9 desean ordenar?",                       en:"What would you like to order?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Un caf\u00e9 con leche, por favor.",              en:"A coffee with milk, please."},
      {speaker:"Grayson", avatar:"\u1f981", es:"Y yo quiero un jugo de naranja.",            en:"And I want an orange juice."},
      {speaker:"Waiter",  avatar:"\u1f468", es:"\u00a1Perfecto! Ya les traigo.",                  en:"Perfect! I'll bring it right out."},
      {scene:"After enjoying your drinks!", sceneEs:"\u00a1Despu\u00e9s de disfrutar sus bebidas!"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Disculpe, la cuenta por favor.",             en:"Excuse me, the check please."},
      {speaker:"Waiter",  avatar:"\u1f468", es:"Son cuatro d\u00f3lares con cincuenta.",          en:"That's four dollars and fifty cents."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Gracias, \u00a1muy amable!",                     en:"Thank you, very kind!"},
      {speaker:"Waiter",  avatar:"\u1f468", es:"\u00a1Hasta luego! \u00a1Que tengan un buen d\u00eda!",    en:"See you later! Have a great day!"},
    ]
  },
  {
    id:"market",
    title:"En el Mercado",
    titleEn:"At the Market",
    emoji:"\u1f6d2",
    color:"#10B981",
    panels:[
      {scene:"You arrive at the colorful Cuenca market \u2014 flowers, fruit, and food everywhere!", sceneEs:"Llegan al mercado de Cuenca \u2014 flores, frutas y comida por todas partes."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"\u00a1Miren qu\u00e9 frutas tan bonitas!",            en:"Look at these beautiful fruits!"},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"Pap\u00e1, \u00bfqu\u00e9 es eso rojo?",                  en:"Dad, what is that red thing?"},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"Es una manzana, Peyton. \u00a1Es roja!",        en:"It's an apple, Peyton. It's red!"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"Buenos d\u00edas, \u00bfqu\u00e9 desean?",                 en:"Good morning, what do you need?"},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"\u00bfCu\u00e1nto cuestan las naranjas?",            en:"How much do the oranges cost?"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"Son cincuenta centavos cada una.",          en:"They're fifty cents each."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"Me llevo seis, por favor.",                en:"I'll take six, please."},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Pap\u00e1, quiero helado!",                    en:"Dad, I want ice cream!"},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"Primero las frutas. \u00a1Por favor, Peyton!",  en:"Fruit first. Please, Peyton!"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"\u00a1Qu\u00e9 ni\u00f1a tan bonita!",                    en:"What a beautiful girl!"},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Gracias! Me llamo Peyton.",               en:"Thank you! My name is Peyton."},
      {speaker:"Vendor",  avatar:"\u1f469", es:"\u00a1Mucho gusto, Peyton! \u00a1Qu\u00e9 nombre tan bonito!",en:"Nice to meet you, Peyton! What a pretty name!"},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"\u00a1Gracias! \u00a1Hasta luego!",                 en:"Thank you! See you later!"},
    ]
  },
  {
    id:"friend",
    title:"Una Nueva Amiga",
    titleEn:"A New Friend",
    emoji:"\u1f46b",
    color:"#8B5CF6",
    panels:[
      {scene:"Grayson is playing in a park in Cuenca when a local girl walks over.", sceneEs:"Grayson juega en un parque cuando una ni\u00f1a se acerca."},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"\u00a1Hola! \u00bfC\u00f3mo te llamas?",                  en:"Hi! What's your name?"},
      {speaker:"Grayson", avatar:"\u1f981", es:"Me llamo Grayson. \u00bfY t\u00fa?",                 en:"My name is Grayson. And you?"},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"Me llamo Sof\u00eda. \u00a1Mucho gusto!",            en:"My name is Sof\u00eda. Nice to meet you!"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Mucho gusto, Sof\u00eda!",                     en:"Nice to meet you too, Sof\u00eda!"},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"\u00bfDe d\u00f3nde eres?",                          en:"Where are you from?"},
      {speaker:"Grayson", avatar:"\u1f981", es:"Soy de Florida, en los Estados Unidos.",   en:"I'm from Florida, in the United States."},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"\u00a1Qu\u00e9 interesante! \u00bfTe gusta Cuenca?",      en:"How interesting! Do you like Cuenca?"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1S\u00ed! Me gusta mucho. Es muy bonita.",      en:"Yes! I like it a lot. It's very beautiful."},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"\u00bfQuieres jugar conmigo?",                  en:"Do you want to play with me?"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1S\u00ed, por favor! \u00bfC\u00f3mo se juega?",         en:"Yes please! How do you play?"},
      {scene:"They play together and laugh for a long time.", sceneEs:"Juegan juntas y se r\u00eden mucho."},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Esto es muy divertido!",                  en:"This is so much fun!"},
      {speaker:"Sof\u00eda",   avatar:"\u1f338", es:"\u00a1S\u00ed! \u00a1Eres mi nueva amiga, Grayson!",     en:"Yes! You're my new friend, Grayson!"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Y t\u00fa eres mi amiga tambi\u00e9n, Sof\u00eda!",     en:"And you're my friend too, Sof\u00eda!"},
    ]
  },
  {
    id:"directions",
    title:"\u00bfD\u00f3nde Est\u00e1?",
    titleEn:"Where Is It?",
    emoji:"\u1f5fa\ufe0f",
    color:"#E8445A",
    panels:[
      {scene:"Leanne is on a street in Cuenca and is a little lost!", sceneEs:"Leanne est\u00e1 en una calle de Cuenca y est\u00e1 un poco perdida."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Disculpe, se\u00f1or. \u00bfMe puede ayudar?",       en:"Excuse me, sir. Can you help me?"},
      {speaker:"Man",     avatar:"\u1f474", es:"\u00a1Claro! \u00bfEn qu\u00e9 le puedo ayudar?",         en:"Of course! How can I help you?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00bfD\u00f3nde est\u00e1 el mercado, por favor?",       en:"Where is the market, please?"},
      {speaker:"Man",     avatar:"\u1f474", es:"Es f\u00e1cil. Camine todo recto.",             en:"It's easy. Walk straight ahead."},
      {speaker:"Man",     avatar:"\u1f474", es:"Luego doble a la derecha.",                en:"Then turn to the right."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00bfEst\u00e1 lejos?",                            en:"Is it far?"},
      {speaker:"Man",     avatar:"\u1f474", es:"No, est\u00e1 muy cerca. Solo cinco minutos.",  en:"No, it's very close. Only five minutes."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"M\u00e1s despacio, por favor. No hablo espa\u00f1ol bien.",en:"More slowly, please. I don't speak Spanish well."},
      {speaker:"Man",     avatar:"\u1f474", es:"\u00a1No hay problema! Hablo m\u00e1s despacio.",    en:"No problem! I'll speak more slowly."},
      {speaker:"Man",     avatar:"\u1f474", es:"Todo recto, luego a la derecha. \u00a1Muy cerca!",en:"Straight ahead, then to the right. Very close!"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1Entend\u00ed! \u00a1Much\u00edsimas gracias!",          en:"I understood! Thank you so very much!"},
      {speaker:"Man",     avatar:"\u1f474", es:"\u00a1De nada! \u00a1Que le vaya bien!",            en:"You're welcome! Have a great day!"},
    ]
  },
  {
    id:"negotiating",
    title:"\u00a1Qu\u00e9 Precio Tan Caro!",
    titleEn:"What an Expensive Price! (Intermediate)",
    emoji:"\u1f4b0",
    color:"#065F46",
    panels:[
      {scene:"Leanne is shopping at the artisan market in Cuenca for a handmade bag.", sceneEs:"Leanne est\u00e1 en el mercado artesanal de Cuenca buscando una bolsa hecha a mano."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Disculpe, \u00bfcu\u00e1nto cuesta esta bolsa?",        en:"Excuse me, how much does this bag cost?"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"Cuesta cuarenta d\u00f3lares, se\u00f1ora.",             en:"It costs forty dollars, ma'am."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1Ay, es muy caro! \u00bfPuede bajar el precio?",   en:"Oh, that's very expensive! Can you lower the price?"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"Es hecha a mano. Mucho trabajo.",              en:"It's handmade. A lot of work."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Entiendo. \u00bfCu\u00e1nto es su mejor precio?",       en:"I understand. What is your best price?"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"Para usted, treinta y cinco d\u00f3lares.",         en:"For you, thirty-five dollars."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Mmm. \u00bfTiene cambio de treinta d\u00f3lares?",      en:"Hmm. Do you have change for thirty dollars?"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"S\u00ed, tengo cambio. \u00bfQuiere la bolsa por treinta?", en:"Yes, I have change. Do you want the bag for thirty?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1Perfecto! Me llevo esta. \u00a1Muchas gracias!",  en:"Perfect! I'll take this one. Thank you so much!"},
      {speaker:"Vendor",  avatar:"\u1f469", es:"\u00a1Gracias a usted! \u00a1Que le vaya muy bien!",    en:"Thank you! Have a wonderful day!"},
      {scene:"Leanne walks away happily with her new bag \u2014 a real Cuenca treasure!", sceneEs:"Leanne se va feliz con su nueva bolsa \u2014 \u00a1un tesoro de Cuenca!"},
    ]
  },
  {
    id:"planning",
    title:"\u00bfQu\u00e9 Hacemos Ma\u00f1ana?",
    titleEn:"What Are We Doing Tomorrow? (Intermediate)",
    emoji:"\u1f4c5",
    color:"#7C3AED",
    panels:[
      {scene:"The family is at home in Cuenca planning their week together.", sceneEs:"La familia est\u00e1 en casa en Cuenca planeando su semana."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"\u00bfQu\u00e9 quieren hacer ma\u00f1ana?",                 en:"What do you want to do tomorrow?"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Quiero ir al parque! Me gusta mucho.",       en:"I want to go to the park! I really like it."},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Yo tambi\u00e9n! \u00bfHace buen tiempo ma\u00f1ana?",      en:"Me too! Is the weather nice tomorrow?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Creo que s\u00ed. Por la ma\u00f1ana hace sol.",        en:"I think so. In the morning it's sunny."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"Pero por la tarde puede llover. Es Cuenca.",  en:"But in the afternoon it might rain. It's Cuenca."},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1No importa! La lluvia es divertida.",        en:"It doesn't matter! Rain is fun."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Bien. Vamos al parque por la ma\u00f1ana.",        en:"Good. We'll go to the park in the morning."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"Necesito buscar un mercado cerca tambi\u00e9n.",   en:"I also need to find a market nearby."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"S\u00e9 d\u00f3nde hay uno. Est\u00e1 muy cerca, a la derecha.", en:"I know where there is one. It's very close, to the right."},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Pap\u00e1 sabe todo! Es muy inteligente.",        en:"Dad knows everything! He's very smart."},
      {speaker:"Victor",  avatar:"\u1f5fa\ufe0f", es:"\u00a1Ja! Aprendo mucho viviendo aqu\u00ed en Cuenca.", en:"Ha! I learn a lot living here in Cuenca."},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Nosotras tambi\u00e9n! Cada d\u00eda aprendemos m\u00e1s.", en:"Us too! Every day we learn more."},
      {scene:"A perfect Cuenca evening \u2014 planning, laughing, and learning together.", sceneEs:"Una noche perfecta en Cuenca \u2014 planeando, riendo y aprendiendo juntos."},
    ]
  },
  {
    id:"weather",
    title:"\u00a1Qu\u00e9 Clima Raro!",
    titleEn:"What Weird Weather!",
    emoji:"\u1f326\ufe0f",
    color:"#1D4ED8",
    panels:[
      {scene:"A beautiful morning in Cuenca \u2014 but the weather changes fast here!", sceneEs:"Una ma\u00f1ana bonita en Cuenca \u2014 \u00a1pero el clima cambia r\u00e1pido aqu\u00ed!"},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"Mam\u00e1, \u00bfhace fr\u00edo hoy?",                   en:"Mom, is it cold today?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"No, hace calor. \u00a1Es un d\u00eda muy bonito!",  en:"No, it's hot. It's a very beautiful day!"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Mam\u00e1! \u00bfVamos al parque?",               en:"Mom! Are we going to the park?"},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1S\u00ed! Pero lleven agua. Hace mucho calor.",en:"Yes! But bring water. It's very hot."},
      {scene:"At the park, the sky suddenly gets cloudy.", sceneEs:"En el parque, el cielo se pone nublado de repente."},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Ay! Est\u00e1 nublado ahora.",                en:"Oh! It's cloudy now."},
      {speaker:"Grayson", avatar:"\u1f981", es:"Mam\u00e1, creo que va a llover.",             en:"Mom, I think it's going to rain."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1S\u00ed! \u00a1Vamos r\u00e1pido a casa!",             en:"Yes! Let's go home quickly!"},
      {scene:"It starts raining \u2014 they run and laugh!", sceneEs:"\u00a1Empieza a llover \u2014 corren y se r\u00eden!"},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Est\u00e1 lloviendo! \u00a1Corro muy r\u00e1pido!",    en:"It's raining! I'm running very fast!"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1Yo tambi\u00e9n! \u00a1Esp\u00e9rame, Peyton!",        en:"Me too! Wait for me, Peyton!"},
      {scene:"Safe at home, all laughing together.", sceneEs:"En casa, todos se r\u00eden juntos."},
      {speaker:"Leanne",  avatar:"\u1f33a", es:"\u00a1Estamos bien! El clima en Cuenca es especial.",en:"We're fine! The weather in Cuenca is special."},
      {speaker:"Peyton",  avatar:"\u1f98b", es:"\u00a1Me gust\u00f3 la lluvia! \u00a1Fue muy divertido!",en:"I liked the rain! It was so much fun!"},
      {speaker:"Grayson", avatar:"\u1f981", es:"\u00a1S\u00ed! \u00a1Ma\u00f1ana volvemos al parque!",       en:"Yes! Tomorrow we go back to the park!"},
    ]
  },
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const todayStr = () => new Date().toISOString().slice(0, 10);

// \u2550\u2550 CONFIG \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const AVATARS = ["\u1f981","\u1f99c","\u1f42c","\u1f98b","\u1f33a","\u1f422","\u1f985","\u1f406","\u2b50","\u1f30a","\u1f5fa\ufe0f","\u1f9ed","\u1f98a","\u1f427","\u1f334","\u1f3ad"];
const PCOLORS = ["#E8445A","#10B981","#8B5CF6","#F59E0B","#3B82F6","#EC4899","#DC6B19","#06B6D4"];
const DS = { fontFamily:"'Nunito', sans-serif", fontWeight:900 };


// \u2550\u2550 LEVEL PROGRESSION SYSTEM \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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

const BADGE_DEF = {
  first_star: {icon:"\u1f31f",name:"First Star",    desc:"Earned your first star!"},
  stars_50:   {icon:"\u2b50",name:"Star Collector",desc:"50 stars earned!"},
  stars_100:  {icon:"\u1f3c6",name:"Champion",      desc:"100 stars earned!"},
  stars_250:  {icon:"\u1f451",name:"Royalty",        desc:"250 stars \u2014 amazing!"},
  streak_3:   {icon:"\u1f525",name:"On Fire!",       desc:"3-day streak!"},
  streak_7:   {icon:"\u1f4aa",name:"Week Warrior",   desc:"7 days in a row!"},
  streak_14:  {icon:"\u1f30b",name:"Legend",         desc:"14-day streak!"},
  quiz_10:    {icon:"\u1f3af",name:"Quiz Master",    desc:"10 quiz answers right"},
  speak_5:    {icon:"\u1f3a4",name:"Speak Up!",      desc:"5 pronunciation tries"},
  explorer:   {icon:"\u1f30d",name:"Explorer",       desc:"Played 3 categories"},
  match_win:  {icon:"\u1f9e9",name:"Match Maker",    desc:"Completed a match game"},
  daily_done: {icon:"\u1f4c5",name:"Daily Hero",     desc:"Finished a Daily Challenge"},
  storyteller:{icon:"\u1f4d6",name:"Storyteller",    desc:"Completed a full story!"},
  level2:     {icon:"\u1f680",name:"Level Up!",      desc:"Unlocked Intermediate level"},
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

// \u2550\u2550 SUPABASE SETUP \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// \u2b07\ufe0f  STEP 1: Paste your Supabase Project URL between the quotes below
const SUPABASE_URL = 'https://jlqrxshoilgmcfaitxta.supabase.co'
// \u2b07\ufe0f  STEP 2: Paste your Supabase anon/public key between the quotes below
const SUPABASE_KEY = 'sb_publishable_5ImngTBY4P21KP3bzBu75Q_FYgl4Pn9'

const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// \u2550\u2550 FAMILY CODE HELPERS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const makeCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const LS_FAMILY = 'wl_family_id';
const getFamilyId = () => localStorage.getItem(LS_FAMILY);
const setFamilyId = (id) => localStorage.setItem(LS_FAMILY, id);

// \u2550\u2550 LOAD / SAVE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
    level: profile.level, cat_progress: profile.catProgress||{}, updated_at: new Date().toISOString()
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
  storiesRead: 0, level: 1, catProgress: {},
});

// \u2550\u2550 SPEECH \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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

// \u2550\u2550 DAILY \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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

// \u2550\u2550 PRONUNCIATION \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
const normText=str=>str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[\u00bf\u00a1.,!?]/g,"").trim();
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
  // Weight toward strict scoring \u2014 harder threshold
  return Math.min(97,Math.round((exactPct*0.72)+(loosePct*0.28)));
};
const SRClass=typeof window!=="undefined"?(window.SpeechRecognition||window.webkitSpeechRecognition):null;
const BG="linear-gradient(160deg,#0f172a 0%,#1e3a5f 50%,#0d4f3c 100%)";

// \u2550\u2550 SHARED COMPONENTS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function SpeakEsBtn({text,color,size=40,showLabel=false}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEs(text,()=>setOn(false));setTimeout(()=>setOn(false),4000);};
  if(showLabel)return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:20,background:on?color:`${color}18`,border:`2px solid ${color}`,fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:on?"white":color,transition:"all .18s"}}>
      <span style={{fontSize:18}}>{on?"\u1f50a":"\u1f508"}</span><span>Hear Spanish</span>
    </button>
  );
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?color:`${color}18`,border:`2.5px solid ${color}`,fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"\u1f50a":"\u1f508"}
    </button>
  );
}

function SpeakEnBtn({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:on?color:`${color}20`,border:`2px solid ${color}60`,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
      {on?"\u1f50a":"\u1f508"}
    </button>
  );
}

function SpeakEnIconBtn({text,size=40}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?"rgba(255,255,255,.9)":"rgba(255,255,255,.25)",border:"2.5px solid rgba(255,255,255,.8)",fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"\u1f50a":"\u1f508"}
    </button>
  );
}

function SpeakEnPill({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:on?"rgba(255,255,255,.35)":"rgba(255,255,255,.18)",border:"2px solid rgba(255,255,255,.6)",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white",transition:"all .18s"}}>
      <span style={{fontSize:16}}>{on?"\u1f50a":"\u1f508"}</span><span>Hear English</span>
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
      <span style={{fontSize:18}}>\u2b50</span>
      <span style={{fontSize:18,fontWeight:900,color}}>{count}</span>
    </span>
  );
}

// \u2550\u2550 FLASHCARD (with memory hook) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>{idx+1} of {words.length} &nbsp;\u2022&nbsp; \u2705 {learned.size} learned</div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(learned.size/words.length)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* Memory Hook hint */}
      {word.hook&&!flipped&&(
        <div style={{width:"100%",padding:"10px 14px",borderRadius:16,background:showHook?`${color}12`:"#FFFBEB",border:`1.5px solid ${showHook?color:"#FCD34D"}`}}>
          <button onClick={()=>setShowHook(h=>!h)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"flex-start",gap:8,fontFamily:"inherit",padding:0}}>
            <span style={{fontSize:20,flexShrink:0}}>\u1f4a1</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:800,color:color,marginBottom:showHook?4:0}}>Memory Hook {showHook?"":"\u2014 tap to reveal!"}</div>
              {showHook&&<div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{word.hook}</div>}
            </div>
          </button>
          {showHook&&(
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,paddingTop:10,borderTop:`1px solid ${color}20`}}>
              <button onClick={e=>{e.stopPropagation();speakEnSlow(word.hook);}} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:color,border:"none",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span style={{fontSize:16}}>\u1f50a</span><span>Hear the hook!</span>
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

      {!flipped&&<div style={{fontSize:12,color:"#9CA3AF",textAlign:"center"}}>Tap \u1f508 to hear it \u00b7 Tap \u1f4a1 for a memory trick \u00b7 Tap card to flip</div>}

      <div style={{display:"flex",gap:10,width:"100%"}}>
        <ActionBtn onClick={()=>navigate(-1,false)} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>\u2190 Back</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,false)}  bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Skip</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,true)}   bg={color}                   style={{flex:1.4}}>Got it! \u2713</ActionBtn>
      </div>
    </div>
  );
}

// \u2550\u2550 QUIZ \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
    const wrong=shuffle(allWords.filter(w=>w.en!==word.en)).slice(0,3);
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
          <div style={{fontSize:72}}>\u1f3c6</div>
          <div style={{fontSize:26,color,marginTop:8,...DS}}>\u00a1Perfecto! All correct!</div>
          <div style={{display:"flex",justifyContent:"center",gap:4,margin:"8px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:28,opacity:earnedStars>=i?1:.2}}>\u2b50</span>)}</div>
          <div style={{fontSize:15,color:"#6B7280",marginTop:4}}>{score} / {total} \u2014 flawless round!</div>
          <ActionBtn onClick={restart} bg={color} style={{marginTop:20,width:"100%",padding:14,fontSize:16}}>Play Again \u1f504</ActionBtn>
        </div>
      );
    }
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:64}}>{pct>=0.9?"\u1f31f":pct>=0.7?"\u1f44d":"\u1f4aa"}</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Round Complete!</div>
        <div style={{display:"flex",justifyContent:"center",gap:4,margin:"6px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:24,opacity:earnedStars>=i?1:.2}}>\u2b50</span>)}</div>
        <div style={{fontSize:32,fontWeight:900,color:"#FCD34D",margin:"4px 0"}}>{score}/{total}</div>
        {missedCount>0&&<div style={{fontSize:14,color:"#6B7280",marginBottom:16}}>You missed {missedCount} word{missedCount>1?"s":""}. Practice them below!</div>}
        <div style={{display:"flex",gap:10,flexDirection:"column"}}>
          {missedCount>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:14,fontSize:15}}>Practice Missed Words \u1f501</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:15}}>Start Over \u1f504</ActionBtn>
        </div>
      </div>
    );
  }

  // End of retry pass
  if(isFinished && phase==="retry"){
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:72}}>\u1f389</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Retry Complete!</div>
        <div style={{fontSize:15,color:"#6B7280",margin:"8px 0 20px"}}>Great work practicing the tricky ones!</div>
        <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:16}}>Start Fresh \u1f504</ActionBtn>
      </div>
    );
  }

  if(!word)return null;

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"\u1f501 Retry \u2014 ":""}
        {idx+1} / {currentQueue.length} &nbsp;\u2022&nbsp; \u2705 {score} right
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQueue.length)*100}%`,transition:"width .4s"}}/>
      </div>
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:72}}>{word.emoji}</div>
        <div style={{fontSize:28,color:"#1F2937",marginTop:4,...DS}}>{word.es}</div>
        <div style={{display:"flex",justifyContent:"center",marginTop:12,gap:8,alignItems:"center"}}>
          <SpeakEsBtn text={word.es} color={color} size={44}/>
          <span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear it again</span>
        </div>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:8,fontWeight:600}}>Tap \u1f508 on each answer to hear it \u2014 then choose!</div>
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
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"\u2705 \u00a1Correcto!":`\u274c It was "${word.en}"`}</div>}
    </div>
  );
}

// \u2550\u2550 MATCH \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
  if(pairs===total)return(<div style={{textAlign:"center",padding:32}}><div style={{fontSize:72}}>\u1f389</div><div style={{fontSize:26,color,...DS,margin:"8px 0"}}>\u00a1Perfecto!</div><ActionBtn onClick={reset} bg={color} style={{marginTop:8}}>Play Again \u1f504</ActionBtn></div>);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Match Spanish \u1f517 English &nbsp;\u2022&nbsp; {pairs}/{total}</div>
      <div style={{fontSize:12,color:"#9CA3AF",textAlign:"center"}}>Tapping any card reads it aloud!</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%"}}>
        {cards.map(card=>{
          const isSel=sel.some(s=>s.id===card.id),isM=matched.has(card.id),isW=wrong.has(card.id);
          const cardBg=isM?`${color}15`:isW?"#FEE2E2":isSel?`${color}28`:"white";
          const cardBorder=isM?color:isW?"#EF4444":isSel?color:"#E5E7EB";
          return(
            <div key={card.id} style={{position:"relative",borderRadius:16,background:cardBg,border:`2.5px solid ${cardBorder}`,transition:"all .18s",opacity:isM?.5:1,transform:isSel?"scale(.97)":"scale(1)"}}>
              <button onClick={()=>tap(card)} style={{width:"100%",minHeight:80,padding:"10px 10px 28px",background:"none",border:"none",cursor:isM?"default":"pointer",textAlign:"center",fontFamily:"inherit",color:isM?"#9CA3AF":"#1F2937"}}>
                {card.lang==="es"?<React.Fragment><div style={{fontSize:26}}>{card.emoji}</div><div style={{fontSize:14,fontWeight:700,...DS}}>{card.text}</div></React.Fragment>:<div style={{fontSize:13,fontWeight:700,lineHeight:1.3}}>{card.text}</div>}
              </button>
              {/* Permanent listen button on every card */}
              <button onClick={e=>{e.stopPropagation();if(card.lang==="es")speakEs(card.text);else speakEn(card.text);}} style={{position:"absolute",bottom:4,right:4,width:24,height:24,borderRadius:"50%",background:`${color}20`,border:`1.5px solid ${color}60`,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:isM?.4:1}}>
                \u1f508
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// \u2550\u2550 SPEAK \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
    rec.onerror=()=>{setTranscript("Couldn't hear you \u2014 try again!");setPct(0);setPhase("result");};
    rec.start();
  },[word,phase,onEarn,onStat]);
  const next=()=>{setPhase("idle");setTranscript("");setPct(null);setIdx(i=>i+1);};
  const rb=pct===null?null:pct===100?{icon:"\u1f3c6",msg:"\u00a1Perfecto!",clr:"#10B981"}:pct>=75?{icon:"\u1f31f",msg:"\u00a1Muy bien!",clr:"#10B981"}:pct>=50?{icon:"\u1f44d",msg:"\u00a1Buen intento!",clr:"#F59E0B"}:{icon:"\u1f504",msg:"Try again!",clr:"#EF4444"};
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      {!SRClass&&<div style={{background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:16,padding:"10px 14px",fontSize:13,color:"#92400E",width:"100%",fontWeight:600}}>\u26a0\ufe0f Pronunciation mode needs Chrome or Edge.</div>}
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>\u1f3a4 Say it in Spanish! &nbsp;\u2022&nbsp; \u1f525 {ss} streak</div>
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
          {phase==="listening"?"\u23f9":"\u1f3a4"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>{phase==="idle"?"Tap the mic and say it in Spanish!":phase==="listening"?"\u1f399\ufe0f Listening \u2014 speak now!":""}</div>
      </React.Fragment>}
      {phase==="result"&&rb&&<div style={{width:"100%",borderRadius:20,padding:18,background:`${rb.clr}12`,border:`2px solid ${rb.clr}`,textAlign:"center"}}>
        <div style={{fontSize:36}}>{rb.icon}</div>
        <div style={{fontSize:20,color:rb.clr,...DS}}>{rb.msg}</div>
        {transcript&&<div style={{marginTop:6,fontSize:12,color:"#6B7280"}}>You said: <em>"{transcript}"</em></div>}
        <div style={{marginTop:4,fontSize:12,fontWeight:700,color:"#9CA3AF"}}>Match: {pct}%</div>
      </div>}
      {phase==="result"&&<div style={{display:"flex",gap:10,width:"100%"}}>
        {pct<55&&<ActionBtn onClick={()=>setPhase("idle")} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>\u1f504 Again</ActionBtn>}
        <ActionBtn onClick={next} bg={color} style={{flex:1}}>Next \u2192</ActionBtn>
      </div>}
    </div>
  );
}

// \u2550\u2550 STORY LIST SCREEN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function StoryListScreen({onBack,onStory,profile}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
        <div style={{fontSize:20,color:"white",...DS}}>\u1f4d6 Stories</div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:4}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:12,lineHeight:1.5}}>
          Real conversations from Cuenca! Tap any line to hear it spoken. Use the English hint if you need help. \u1f3a7
        </div>
        {STORIES.map(story=>(
          <button key={story.id} onClick={()=>onStory(story)} style={{width:"100%",padding:"18px",borderRadius:20,background:"rgba(255,255,255,.08)",border:`2px solid ${story.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",marginBottom:10}}>
            <div style={{width:56,height:56,borderRadius:16,background:`${story.color}30`,border:`2px solid ${story.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{story.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:17,color:"white",...DS}}>{story.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>{story.titleEn} &nbsp;\u2022&nbsp; {story.panels.length} lines</div>
            </div>
            <div style={{fontSize:22,color:story.color}}>\u203a</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// \u2550\u2550 STORY SCREEN \u2014 full comic strip with per-line audio \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
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
            <div style={{fontSize:48,marginBottom:8}}>\u1f3ac</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,.85)",lineHeight:1.6,fontStyle:"italic"}}>
              {panel.scene}
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:14,gap:10}}>
              <button onClick={()=>speakEs(panel.sceneEs)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:story.color,border:"none",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span>\u1f50a</span><span>Hear in Spanish</span>
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
                <span style={{fontSize:18}}>\u1f50a</span><span>Hear it!</span>
              </button>
              <button onClick={()=>setShowEn(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:20,background:showEn?"#6B7280":"rgba(107,114,128,.15)",border:"2px solid #6B7280",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:showEn?"white":"#374151",flex:1}}>
                <span>{showEn?"\u1f441\ufe0f":"\u1f441\ufe0f"}</span><span>{showEn?"Hide English":"Show English"}</span>
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
          <ActionBtn onClick={prev} bg="rgba(255,255,255,.1)" color="rgba(255,255,255,.7)" style={{flex:1,opacity:idx===0?.4:1}}>\u2190 Back</ActionBtn>
          <ActionBtn onClick={next} bg={story.color} style={{flex:1.6,padding:"14px 20px",fontSize:16}}>
            {isLast?"Finish Story! \u1f389":"Next \u2192"}
          </ActionBtn>
        </div>
      </div>
    </div>
  );
}


// \u2550\u2550 FAMILY SETUP SCREEN (first launch only) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
    else { setError("Code not found \u2014 double-check spelling and try again!"); setLoading(false); }
  };

  if (createdCode) return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ textAlign:"center", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", borderRadius:28, padding:36, width:"100%", maxWidth:380 }}>
        <div style={{ fontSize:56 }}>\u1f389</div>
        <div style={{ fontSize:26, color:"white", marginTop:8, ...DS }}>Family Created!</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", marginTop:8, marginBottom:20 }}>
          Your family code is below. Write it down or take a screenshot \u2014 share it with anyone you want to join your leaderboard!
        </div>
        <div style={{ background:"#FCD34D", borderRadius:20, padding:"16px 24px", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#78350F", letterSpacing:1, marginBottom:4 }}>YOUR FAMILY CODE</div>
          <div style={{ fontSize:48, fontWeight:900, color:"#1F2937", letterSpacing:8 }}>{createdCode}</div>
        </div>
        <ActionBtn onClick={onDone} bg="#10B981" style={{ width:"100%", padding:16, fontSize:16 }}>
          Let's Start Playing! \u1f30d
        </ActionBtn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ paddingBottom:32, textAlign:"center" }}>
        <div style={{ fontSize:56 }}>\u1f30d</div>
        <div style={{ fontSize:32, color:"white", lineHeight:1, marginTop:8, ...DS }}>Wander Lingo</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.6)", marginTop:8 }}>
          First, let's set up your family group!
        </div>
      </div>

      {!mode && (
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={() => setMode('create')} style={{ padding:"20px", borderRadius:20, background:"#2563EB", border:"none", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>\u2728</span>
            <div style={{ textAlign:"left" }}>
              <div>Create a New Family</div>
              <div style={{ fontSize:12, fontWeight:500, opacity:.8, marginTop:2 }}>First time? Start here</div>
            </div>
          </button>
          <button onClick={() => setMode('join')} style={{ padding:"20px", borderRadius:20, background:"rgba(255,255,255,.1)", border:"2px solid rgba(255,255,255,.3)", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>\u1f511</span>
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
            {loading ? "Creating..." : "Create Family! \u1f389"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>\u2190 Back</button>
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
            {loading ? "Joining..." : "Join Family! \u1f511"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>\u2190 Back</button>
        </div>
      )}
    </div>
  );
}

// \u2550\u2550 LISTEN MODE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
        <div style={{fontSize:64}}>{score===queue.length?"\u1f3c6":score>queue.length*0.7?"\u1f31f":"\u1f4aa"}</div>
        <div style={{fontSize:22,color,...DS,marginTop:8}}>Listen Round Done!</div>
        <div style={{fontSize:36,fontWeight:900,color:"#FCD34D",margin:"6px 0"}}>{score}/{queue.length}</div>
        <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>{mc>0?`Missed ${mc} \u2014 practice them!`:"Perfect ears! \u00a1Incre\u00edble!"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {mc>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:12}}>Practice Missed \u1f501</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12}}>Start Over \u1f504</ActionBtn>
        </div>
      </div>
    );
    return(<div style={{textAlign:"center",padding:"28px 16px"}}><div style={{fontSize:64}}>\u1f389</div><div style={{fontSize:22,color,...DS,marginTop:8}}>Retry Done!</div><ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12,marginTop:16}}>Start Fresh \u1f504</ActionBtn></div>);
  }

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Speed:</span>
        {[{id:"normal",label:"\u1f422 Slow & Clear"},{id:"fast",label:"\u26a1 Real Speed"}].map(s=>(
          <button key={s.id} onClick={()=>setSpeed(s.id)} style={{padding:"5px 12px",borderRadius:16,background:speed===s.id?color:"#F3F4F6",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:speed===s.id?"white":"#6B7280"}}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"\u1f501 Retry \u2014 ":""}{idx+1}/{currentQueue.length} &nbsp;\u2022&nbsp; \u2705 {score} right
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQueue.length)*100}%`,transition:"width .4s"}}/>
      </div>

      <div style={{width:"100%",background:"white",borderRadius:24,padding:"28px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:14}}>\u1f442 LISTEN \u2014 WHAT DO YOU HEAR?</div>
        <button onClick={()=>playWord(speed)} style={{width:96,height:96,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:40,cursor:"pointer",boxShadow:`0 8px 28px ${color}50`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
          {played?"\u1f50a":"\u25b6\ufe0f"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:10}}>
          {played?"Tap to hear again!":"Tap \u25b6\ufe0f to hear the Spanish word"}
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
        {!played?"Tap \u25b6\ufe0f first \u2014 then choose the English meaning!":"Choose the English meaning:"}
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
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"\u2705 \u00a1Correcto! Your ears are sharp!":"\u274c Keep training! It was \""+word.en+"\""}</div>}
    </div>
  );
}

// \u2550\u2550 PROFILE SELECT \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function ProfileSelectScreen({profiles,onSelect,onCreate}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px 40px"}}>
      <div style={{paddingTop:52,textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56}}>\u1f30d</div>
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
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>\u2b50 {p.stars}</span>
                {p.streak>0&&<span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>\u1f525 {p.streak}d</span>}
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>\u1f3c5 {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.15)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Level {p.level||1}</span>
              </div>
            </div>
            <div style={{fontSize:24,color:p.color}}>\u203a</div>
          </button>
        ))}
        <button onClick={onCreate} style={{width:"100%",padding:"16px 20px",borderRadius:20,background:"rgba(255,255,255,.06)",border:"2.5px dashed rgba(255,255,255,.3)",cursor:"pointer",color:"rgba(255,255,255,.7)",fontSize:16,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:24}}>\uff0b</span> Add New Player
        </button>
      </div>
    </div>
  );
}

// \u2550\u2550 CREATE PROFILE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function CreateProfileScreen({onDone,onBack}){
  const[name,setName]=useState("");
  const[avatar,setAvatar]=useState(AVATARS[0]);
  const[color,setColor]=useState(PCOLORS[0]);
  const valid=name.trim().length>0;
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 20px 40px"}}>
      <div style={{width:"100%",maxWidth:400}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:24,cursor:"pointer",marginBottom:16,fontFamily:"inherit"}}>\u2190 Back</button>
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
        <ActionBtn onClick={()=>valid&&onDone(name.trim(),avatar,color)} bg={valid?color:"#374151"} style={{width:"100%",padding:16,fontSize:18,opacity:valid?1:.5}}>Start Exploring! \u1f5fa\ufe0f</ActionBtn>
      </div>
    </div>
  );
}

// \u2550\u2550 HOME SCREEN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function HomeScreen({profile,onLearn,onDaily,onBoard,onMyProfile,onSwitch,onLevelChange,onStories,dailyDone}){
  const lv=profile.level||1;
  const vocab=lv>=3?VOCAB_L3:lv>=2?VOCAB_L2:VOCAB_L1;
  const catKeys=Object.keys(vocab);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:profile.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{profile.avatar}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:18,color:"white",lineHeight:1,...DS}}>Hola, {profile.name}! \u1f44b</div>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <StarCount count={profile.stars} color={profile.color}/>
            {profile.streak>0&&<span style={{display:"inline-flex",alignItems:"center",gap:3,background:"rgba(252,211,77,.15)",borderRadius:20,padding:"4px 10px"}}><span style={{fontSize:16}}>\u1f525</span><span style={{fontSize:15,fontWeight:900,color:"#FCD34D"}}>{profile.streak}</span></span>}
          </div>
        </div>
        <button onClick={onSwitch} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Switch</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 100px"}}>
        {/* Daily Challenge */}
        <button onClick={dailyDone?undefined:onDaily} style={{width:"100%",padding:"18px",borderRadius:22,background:dailyDone?"rgba(255,255,255,.06)":profile.color,border:dailyDone?"2px solid rgba(255,255,255,.12)":`2px solid ${profile.color}`,cursor:dailyDone?"default":"pointer",textAlign:"left",marginBottom:12,display:"flex",alignItems:"center",gap:14,opacity:dailyDone?.6:1}}>
          <span style={{fontSize:36}}>\u1f4c5</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>{dailyDone?"Daily Challenge Done! \u2713":"Daily Challenge \u2014 New Today!"}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:3}}>{dailyDone?"Come back tomorrow for a new one!":"5 questions \u00b7 Same for everyone \u00b7 Bonus stars!"}</div>
          </div>
          {!dailyDone&&<span style={{fontSize:22,color:"white"}}>\u203a</span>}
        </button>

        {/* Stories button */}
        <button onClick={onStories} style={{width:"100%",padding:"18px",borderRadius:22,background:"rgba(255,255,255,.08)",border:"2px solid rgba(255,255,255,.2)",cursor:"pointer",textAlign:"left",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:36}}>\u1f4d6</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>Stories \u2014 Listen & Learn!</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>Real conversations in Cuenca \u2014 tap any line to hear it!</div>
          </div>
          <span style={{fontSize:22,color:"rgba(255,255,255,.5)"}}>\u203a</span>
        </button>

        {/* Level selector with lock state */}
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {[
            {lv:1,label:"\u2b50 Beginner",emoji:"\u2b50"},
            {lv:2,label:"\u1f680 Intermediate",emoji:"\u1f680"},
            {lv:3,label:"\u1f525 Advanced",emoji:"\u1f525"},
          ].map(({lv:l,label,emoji})=>{
            const unlocked=canUnlockLevel(profile,l);
            const prog=l>1?getLevelProgress(profile,l):null;
            const active=lv===l;
            return(
              <button key={l} onClick={()=>unlocked&&onLevelChange(l)} style={{width:"100%",padding:"12px 16px",borderRadius:16,background:active?"white":unlocked?"rgba(255,255,255,.1)":"rgba(255,255,255,.04)",border:active?`2px solid ${profile.color}`:"2px solid rgba(255,255,255,.15)",cursor:unlocked?"pointer":"default",display:"flex",alignItems:"center",gap:10,transition:"all .2s"}}>
                <span style={{fontSize:22}}>{unlocked?emoji:"\u1f512"}</span>
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

        <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,marginBottom:10,letterSpacing:.5}}>{lv>=2?"INTERMEDIATE CATEGORIES":"BEGINNER CATEGORIES"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {catKeys.map(key=>{
            const c=vocab[key];
            const stars=getCatProgress(profile,key,lv);
            const starDisplay=["","\u2b50","\u2b50\u2b50","\u2b50\u2b50\u2b50"][stars]||"";
            return(
              <button key={key} onClick={()=>onLearn(key,lv)} style={{padding:"14px 8px",borderRadius:18,background:stars>=3?`${c.color}22`:"rgba(255,255,255,.07)",border:`2px solid ${stars>=1?c.color:c.color+"40"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,position:"relative"}}>
                {stars>=3&&<div style={{position:"absolute",top:4,right:4,fontSize:9,background:c.color,color:"white",borderRadius:6,padding:"1px 5px",fontWeight:800}}>\u2713</div>}
                <span style={{fontSize:26}}>{c.icon}</span>
                <span style={{fontSize:10,fontWeight:800,color:"white",textAlign:"center",lineHeight:1.2}}>{c.label}</span>
                <div style={{fontSize:10,minHeight:14,color:"#FCD34D"}}>{starDisplay}</div>
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
        {[{icon:"\u1f3e0",label:"Home",action:null},{icon:"\u1f3c6",label:"Leaderboard",action:onBoard},{icon:"\u1f396\ufe0f",label:"My Profile",action:onMyProfile}].map(({icon,label,action})=>(
          <button key={label} onClick={action||undefined} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:action?"pointer":"default",opacity:action?1:.5}}>
            <span style={{fontSize:22}}>{icon}</span>
            <span style={{fontSize:11,color:"white",fontWeight:700}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// \u2550\u2550 LEARN SCREEN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function LearnScreen({catKey,catLevel,profile,onBack,onEarn,onStat,onCatProgress}){
  const[mode,setMode]=useState("flashcard");
  const vocab=catLevel>=3?VOCAB_L3:catLevel>=2?VOCAB_L2:VOCAB_L1;
  const cat=vocab[catKey];
  const allWords=catLevel>=3?ALL_WORDS_L3:catLevel>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  const modes=[{id:"flashcard",label:"\u1f0cf Cards"},{id:"quiz",label:"\u1f3af Quiz"},{id:"listen",label:"\u1f442 Listen"},{id:"match",label:"\u1f9e9 Match"},{id:"speak",label:"\u1f3a4 Speak"}];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
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
          {mode==="quiz"     &&<QuizMode key={`q${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} allWords={allWords} onProgress={stars=>onCatProgress&&onCatProgress(catKey,catLevel,stars)}/>}
          {mode==="match"    &&<MatchMode key={`m${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
          {mode==="listen"   &&<ListenMode key={`l${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat} allWords={allWords} onProgress={stars=>onCatProgress&&onCatProgress(catKey,catLevel,stars)}/>}
          {mode==="speak"    &&<SpeakMode key={`s${catKey}${catLevel}`} words={cat.words} color={cat.color} onEarn={onEarn} onStat={onStat}/>}
        </div>
      </div>
    </div>
  );
}

// \u2550\u2550 DAILY CHALLENGE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
        <div style={{fontSize:72}}>{score===5?"\u1f3c6":score>=3?"\u1f31f":"\u1f4aa"}</div>
        <div style={{fontSize:28,color:"white",margin:"8px 0",...DS}}>Daily Complete!</div>
        <div style={{fontSize:48,fontWeight:900,color:"#FCD34D"}}>{score}/5</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginTop:4,marginBottom:8}}>{score===5?"Flawless! \u00a1Perfecto!":score>=3?"Great job!":"Practice makes perfect!"}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.5)",marginBottom:24}}>+{score*3} bonus stars earned!</div>
        <ActionBtn onClick={()=>onComplete(score)} bg={profile.color} style={{width:"100%",padding:16,fontSize:16}}>Back to Home \u1f3e0</ActionBtn>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
        <div style={{flex:1}}><div style={{fontSize:18,color:"white",...DS}}>\u1f4c5 Daily Challenge</div><div style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>Same for everyone today!</div></div>
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

// \u2550\u2550 LEADERBOARD \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function LeaderboardScreen({profiles,onBack}){
  const sorted=[...profiles].sort((a,b)=>b.stars-a.stars);
  const medals=["\u1f451","\u1f948","\u1f949"];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
        <div style={{fontSize:20,color:"white",...DS}}>\u1f3c6 Family Leaderboard</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {sorted.map((p,i)=>(
          <div key={p.id} style={{background:i===0?"rgba(252,211,77,.12)":"rgba(255,255,255,.06)",border:i===0?"2px solid #FCD34D":"2px solid rgba(255,255,255,.1)",borderRadius:20,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:28,width:36,textAlign:"center"}}>{medals[i]||String(i+1)}</div>
            <div style={{width:48,height:48,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,color:"white",...DS}}>{p.name}</div>
              <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>\u1f525 {p.streak}d</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>\u1f3c5 {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.12)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Lv {p.level||1}</span>
              </div>
            </div>
            <div style={{fontSize:22,fontWeight:900,color:"#FCD34D"}}>\u2b50 {p.stars}</div>
          </div>
        ))}
        {profiles.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,.4)",padding:40,fontSize:16}}>No explorers yet!</div>}
      </div>
    </div>
  );
}

// \u2550\u2550 MY PROFILE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
function MyProfileScreen({profile,onBack}){
  const allBadges=Object.entries(BADGE_DEF);
  const earned=new Set(profile.badges||[]);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>\u2190</button>
        <div style={{fontSize:20,color:"white",...DS}}>\u1f396\ufe0f Explorer Card</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:16,overflowY:"auto",paddingBottom:40}}>
        <div style={{background:`linear-gradient(135deg,${profile.color},${profile.color}99)`,borderRadius:24,padding:24,textAlign:"center"}}>
          <div style={{fontSize:56}}>{profile.avatar}</div>
          <div style={{fontSize:26,color:"white",marginTop:8,...DS}}>{profile.name}</div>
          <div style={{display:"inline-block",background:"rgba(255,255,255,.2)",borderRadius:12,padding:"4px 12px",fontSize:13,color:"white",fontWeight:700,marginTop:4}}>Level {profile.level||1}</div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>\u2b50 {profile.stars}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Stars</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>\u1f525 {profile.streak}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Streak</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>\u1f3c5 {(profile.badges||[]).length}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Badges</div></div>
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

// \u2550\u2550 MAIN APP \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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

  const handleCatProgress=async(catKey,catLevel,stars)=>{
    if(!activeId||!profile)return;
    const newProgress=setCatProgress(profile,catKey,catLevel,stars);
    if(JSON.stringify(newProgress)===JSON.stringify(profile.catProgress||{}))return;
    await updateProfile(activeId,{catProgress:newProgress});
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
      <div style={{fontSize:64}}>\u1f30d</div>
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
      {familyReady&&screen==="learn"     &&profile&&<LearnScreen catKey={learnCat} catLevel={learnCatLv} profile={profile} onBack={()=>setScreen("home")} onEarn={handleEarn} onStat={handleStat} onCatProgress={handleCatProgress}/>}
      {familyReady&&screen==="daily"     &&profile&&<DailyScreen profile={profile} onBack={()=>setScreen("home")} onComplete={handleDailyComplete}/>}
      {familyReady&&screen==="board"     &&<LeaderboardScreen profiles={profiles} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="myprofile" &&profile&&<MyProfileScreen profile={profile} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="stories"   &&<StoryListScreen onBack={()=>setScreen("home")} onStory={s=>{setActiveStory(s);setScreen("story");}} profile={profile}/>}
      {familyReady&&screen==="story"     &&activeStory&&<StoryScreen story={activeStory} onBack={()=>setScreen("stories")} onComplete={handleStoryComplete}/>}
    </div>
  );
