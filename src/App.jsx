import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// â•â• LEVEL 1 VOCAB â€” every word has a memory hook â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const VOCAB_L1 = {
  greetings: { icon:"ðŸ‘‹", label:"Greetings", color:"#E8445A", words:[
    {es:"Hola",              en:"Hello",           emoji:"ðŸ‘‹", hook:"Imagine a giant hole-A in the ground waving hello!"},
    {es:"Buenos dÃ­as",       en:"Good morning",    emoji:"ðŸŒ…", hook:"BOO! A friendly ghost pops out saying good morning â€” BOO-en-os dee-as!"},
    {es:"Buenas tardes",     en:"Good afternoon",  emoji:"â˜€ï¸", hook:"The BOO ghost is back in the afternoon! bweh-nas tar-days."},
    {es:"Buenas noches",     en:"Good night",      emoji:"ðŸŒ™", hook:"BOO at night â€” noh-ches sounds like 'no chess at night'!"},
    {es:"Â¿CÃ³mo estÃ¡s?",      en:"How are you?",    emoji:"ðŸ™‚", hook:"como a lake asking HOW you're doing â€” koh-mo es-tas?"},
    {es:"Estoy bien",        en:"I'm fine",        emoji:"ðŸ‘", hook:"I'm staying (es-toy) just BEAN (bien) fine â€” like a happy jumping bean!"},
    {es:"Gracias",           en:"Thank you",       emoji:"ðŸ™", hook:"gras-ee-us â€” you're thankful someone mowed your grass for you!"},
    {es:"De nada",           en:"You're welcome",  emoji:"ðŸ˜Š", hook:"It's NADA â€” nothing â€” like saying 'it was nothing at all!'"},
    {es:"Por favor",         en:"Please",          emoji:"â­", hook:"pour flavor on it please â€” por fa-vor!"},
    {es:"AdiÃ³s",             en:"Goodbye",         emoji:"âœŒï¸", hook:"add one more OH when leaving â€” ah-dee-ohs!"},
    {es:"Hasta luego",       en:"See you later",   emoji:"ðŸ¤—", hook:"hasta la vista! See you luego (loo-ay-go) â€” like a logo you'll see again!"},
    {es:"Â¿CÃ³mo te llamas?",  en:"What's your name?",emoji:"â“", hook:"A llama is calling YOUR name â€” YAH-mas? The llama wants to know!"},
    {es:"Me llamo...",       en:"My name is...",   emoji:"ðŸ·ï¸", hook:"ME + a llama â€” my llama's name is... YAH-mo!"},
    {es:"Mucho gusto",       en:"Nice to meet you",emoji:"ðŸ¤", hook:"mucho gusto â€” a gust of wind blows you together â€” so nice to meet!"},
  ]},
  around: { icon:"ðŸ™ï¸", label:"Around Town", color:"#DC6B19", words:[
    {es:"Disculpe",                  en:"Excuse me",              emoji:"ðŸ™‹", hook:"dis-cool-pay â€” excuse the super dis-cool person!"},
    {es:"Â¿DÃ³nde estÃ¡ el baÃ±o?",      en:"Where is the bathroom?", emoji:"ðŸš»", hook:"don'T-ay? don'T wait â€” find the bathroom fast! dohn-day es-ta?"},
    {es:"La cuenta por favor",       en:"The check please",       emoji:"ðŸ§¾", hook:"kwen-ta â€” count the bill before paying!"},
    {es:"Una mesa para dos",         en:"A table for two",        emoji:"ðŸª‘", hook:"A mesa (table) for dos â€” like two dosas on the table!"},
    {es:"Â¿CuÃ¡nto cuesta?",           en:"How much does it cost?", emoji:"ðŸ’°", hook:"kwahn-to kwes-ta â€” HOW MUCH does this quest cost?"},
    {es:"Quiero ordenar",            en:"I'd like to order",      emoji:"ðŸ“‹", hook:"kyer-oh â€” I cheer-oh to order my food!"},
    {es:"Un cafÃ© con leche",         en:"Coffee with milk",       emoji:"â˜•", hook:"caf-ay con leh-chay â€” coffee with lechy stretchy milk!"},
    {es:"Â¿Habla inglÃ©s?",            en:"Do you speak English?",  emoji:"ðŸ—£ï¸", hook:"AH-bla â€” is this able person speaking my language?"},
    {es:"No hablo espaÃ±ol bien",     en:"I don't speak Spanish well",emoji:"ðŸ˜…", hook:"No AH-blo â€” I'm NOT able to speak it well yet!"},
    {es:"MÃ¡s despacio por favor",    en:"More slowly please",     emoji:"ðŸ¢", hook:"mas des-pah-see-oh â€” MORE slowly like a turtle! MUCH slower!"},
    {es:"A la derecha",              en:"To the right",           emoji:"âž¡ï¸", hook:"DARE-echa â€” I DARE you to go RIGHT!"},
    {es:"A la izquierda",            en:"To the left",            emoji:"â¬…ï¸", hook:"ees-kee-air-da â€” it's quirky and airy going left!"},
    {es:"Todo recto",                en:"Straight ahead",         emoji:"â¬†ï¸", hook:"TODO recto â€” totally erect and straight ahead!"},
    {es:"Â¿Me puede ayudar?",         en:"Can you help me?",       emoji:"ðŸ¤", hook:"AYE-oo-dar â€” AYE! You DARE to help me? Please!"},
  ]},
  family: { icon:"ðŸ‘¨â€ðŸ‘©â€ðŸ‘§", label:"Family", color:"#10B981", words:[
    {es:"MamÃ¡",    en:"Mom",           emoji:"ðŸ‘©", hook:"ma + ma â€” double the love, double the ma!"},
    {es:"PapÃ¡",    en:"Dad",           emoji:"ðŸ‘¨", hook:"pa + pa â€” double the pa, double the dad hugs!"},
    {es:"Hermana", en:"Sister",        emoji:"ðŸ‘§", hook:"HER mana â€” SHE has the magic mana â€” that's your sister!"},
    {es:"Hermano", en:"Brother",       emoji:"ðŸ‘¦", hook:"HER mano â€” your bro is HER MAN-OH!"},
    {es:"Abuela",  en:"Grandma",       emoji:"ðŸ‘µ", hook:"ah-bweh-la â€” grandma flies in on a propeller â€” bweh!"},
    {es:"Abuelo",  en:"Grandpa",       emoji:"ðŸ‘´", hook:"ah-bweh-lo â€” grandpa flies in too â€” bweh-lo!"},
    {es:"BebÃ©",    en:"Baby",          emoji:"ðŸ‘¶", hook:"bay-bay â€” babies say bay-bay and everyone smiles!"},
    {es:"Amigo",   en:"Friend (boy)",  emoji:"ðŸ§‘", hook:"ah-mee-go â€” your buddy from the movie saying I GO with you amigo!"},
    {es:"Amiga",   en:"Friend (girl)", emoji:"ðŸ‘©", hook:"ah-mee-ga â€” your girl friend â€” ME + ga, she goes everywhere with you!"},
    {es:"Mascota", en:"Pet",           emoji:"ðŸ¾", hook:"mas-koh-ta â€” your pet wears a mascot costume at every game!"},
  ]},
  food: { icon:"ðŸŽ", label:"Food", color:"#F59E0B", words:[
    {es:"Agua",        en:"Water",       emoji:"ðŸ’§", hook:"AH-gwa â€” water goes AH-gwa-gwa when you splash in it!"},
    {es:"Leche",       en:"Milk",        emoji:"ðŸ¥›", hook:"leh-chay â€” milk is so lechy and stretchy when it pours!"},
    {es:"Pan",         en:"Bread",       emoji:"ðŸž", hook:"pan â€” you cook bread in A pan â€” simple as that!"},
    {es:"Arroz",       en:"Rice",        emoji:"ðŸš", hook:"ah-rose â€” rice grows in fields like a beautiful rose garden!"},
    {es:"Pollo",       en:"Chicken",     emoji:"ðŸ—", hook:"poy-yo â€” polo the chicken plays polo on horseback!"},
    {es:"Manzana",     en:"Apple",       emoji:"ðŸŽ", hook:"man-zah-na â€” a MAN-sized banana shaped like an apple!"},
    {es:"Naranja",     en:"Orange",      emoji:"ðŸŠ", hook:"nah-ran-ha â€” the runner ran to grab the orange â€” nah-ran-ha!"},
    {es:"Helado",      en:"Ice cream",   emoji:"ðŸ¦", hook:"eh-lah-do â€” held the ice cream before it melted â€” held-ado!"},
    {es:"Tengo hambre",en:"I'm hungry",  emoji:"ðŸ˜‹", hook:"TEN-go â€” I'm so tense because my stomach has TEN growls!"},
    {es:"Tengo sed",   en:"I'm thirsty", emoji:"ðŸ¥¤", hook:"sed â€” so dry and said to be thirsty!"},
    {es:"Delicioso",   en:"Delicious",   emoji:"ðŸ˜", hook:"deh-lee-SEE-oh-so â€” so delicious you can SEE it glowing!"},
    {es:"Quiero mÃ¡s",  en:"I want more", emoji:"ðŸ™‹", hook:"kyer-oh mas â€” cheer-oh for mas more â€” MORE MORE MORE!"},
  ]},
  feelings: { icon:"ðŸ˜Š", label:"Feelings", color:"#8B5CF6", words:[
    {es:"Feliz",          en:"Happy",    emoji:"ðŸ˜„", hook:"feh-lees â€” feel the happiness in your knees!"},
    {es:"Triste",         en:"Sad",      emoji:"ðŸ˜¢", hook:"trees-tay â€” a sad tree just stood there dripping tears today!"},
    {es:"Cansado",        en:"Tired",    emoji:"ðŸ˜´", hook:"kan-sah-do â€” CAN'T-DO anything because I'm so tired!"},
    {es:"Emocionado",     en:"Excited",  emoji:"ðŸ¤©", hook:"eh-mo-see-OH-nah-do â€” your emotions explode like a volcano!"},
    {es:"Asustado",       en:"Scared",   emoji:"ðŸ˜¨", hook:"ah-soos-tah-do â€” a ghost says BOO and you're so scared-ado!"},
    {es:"Enojado",        en:"Angry",    emoji:"ðŸ˜ ", hook:"eh-no-HA-do â€” enough! No HA-do! I'm angry!"},
    {es:"Te quiero",      en:"I love you",emoji:"â¤ï¸", hook:"tay kyer-oh â€” cheer for the one you love â€” te cheer-oh!"},
    {es:"Me siento bien", en:"I feel good",emoji:"âœ¨", hook:"see-en-to â€” I sense I feel amazing â€” me see-en-to bien!"},
  ]},
  school: { icon:"ðŸ“š", label:"School", color:"#3B82F6", words:[
    {es:"Maestra",         en:"Teacher (f)",          emoji:"ðŸ‘©â€ðŸ«", hook:"my-ehs-tra â€” the master-A teacher rules the class!"},
    {es:"Maestro",         en:"Teacher (m)",          emoji:"ðŸ‘¨â€ðŸ«", hook:"my-ehs-tro â€” the maestro teacher leads like an orchestra!"},
    {es:"Libro",           en:"Book",                 emoji:"ðŸ“š", hook:"lee-bro â€” lee BROught his favorite book to read!"},
    {es:"LÃ¡piz",           en:"Pencil",               emoji:"âœï¸", hook:"lah-pees â€” the pencil draws in laps around the page!"},
    {es:"Escuela",         en:"School",               emoji:"ðŸ«", hook:"es-kway-la â€” school is the eskimo way of learning â€” es-kway-la!"},
    {es:"No entiendo",     en:"I don't understand",   emoji:"ðŸ¤”", hook:"en-tee-en-do â€” I don't tend-to understand this at all!"},
    {es:"Â¿Me puedes ayudar?",en:"Can you help me?",  emoji:"ðŸ™‹", hook:"AYE-oo-dar â€” AYE! You DARE help me with this?"},
    {es:"Entiendo",        en:"I understand",         emoji:"ðŸ’¡", hook:"en-tee-en-do â€” NOW I tend-to understand â€” the light bulb is on!"},
  ]},
  numbers: { icon:"ðŸ”¢", label:"Numbers", color:"#06B6D4", words:[
    {es:"Uno",   en:"One",   emoji:"1ï¸âƒ£", hook:"oo-no â€” ONE more ooh makes everything fun!"},
    {es:"Dos",   en:"Two",   emoji:"2ï¸âƒ£", hook:"dose â€” the doctor gives you TWO doses of medicine!"},
    {es:"Tres",  en:"Three", emoji:"3ï¸âƒ£", hook:"trace â€” THREE lines to trace on the paper!"},
    {es:"Cuatro",en:"Four",  emoji:"4ï¸âƒ£", hook:"kwah-tro â€” four quarters make one dollar â€” kwah-tro!"},
    {es:"Cinco", en:"Five",  emoji:"5ï¸âƒ£", hook:"sink-oh â€” five things fell into the sink-oh!"},
    {es:"Seis",  en:"Six",   emoji:"6ï¸âƒ£", hook:"sace â€” six geese went sace sace sace!"},
    {es:"Siete", en:"Seven", emoji:"7ï¸âƒ£", hook:"see-EH-tay â€” seven ate (see-ate) nine for breakfast!"},
    {es:"Ocho",  en:"Eight", emoji:"8ï¸âƒ£", hook:"OH-cho â€” eight is an OH with a cho cho train!"},
    {es:"Nueve", en:"Nine",  emoji:"9ï¸âƒ£", hook:"nweh-bay â€” nine bees went whew into the hive!"},
    {es:"Diez",  en:"Ten",   emoji:"ðŸ”Ÿ", hook:"dee-ehs â€” TEN days in the sun â€” dee-ehs days!"},
  ]},
  colors: { icon:"ðŸŽ¨", label:"Colors", color:"#EC4899", words:[
    {es:"Rojo",     en:"Red",    emoji:"ðŸ”´", hook:"roh-ho â€” red roh-hos of roses everywhere!"},
    {es:"Azul",     en:"Blue",   emoji:"ðŸ”µ", hook:"ah-zool â€” the azure blue sky goes ah-zool!"},
    {es:"Verde",    en:"Green",  emoji:"ðŸŸ¢", hook:"bair-day â€” green bears eating leaves today â€” BEAR-day!"},
    {es:"Amarillo", en:"Yellow", emoji:"ðŸŸ¡", hook:"ah-mah-ree-yo â€” an ARMADILLO painted itself yellow!"},
    {es:"Naranja",  en:"Orange", emoji:"ðŸŸ ", hook:"nah-ran-ha â€” orange? You ran here to get one!"},
    {es:"Morado",   en:"Purple", emoji:"ðŸŸ£", hook:"moh-rah-do â€” MORE-ado purple please â€” I want MORE!"},
    {es:"Rosa",     en:"Pink",   emoji:"ðŸ©·", hook:"roh-sa â€” rosa always wears pink roses!"},
    {es:"Blanco",   en:"White",  emoji:"â¬œ", hook:"blan-co â€” a blank white piece of paper â€” blank-o!"},
    {es:"Negro",    en:"Black",  emoji:"â¬›", hook:"neh-gro â€” negro means black like the night sky!"},
    {es:"CafÃ©",     en:"Brown",  emoji:"ðŸŸ¤", hook:"cah-fay â€” coffee is brown â€” cafe au lait!"},
  ]},
  animals: { icon:"ðŸ¾", label:"Animals", color:"#64748B", words:[
    {es:"Perro",    en:"Dog",      emoji:"ðŸ¶", hook:"PAIR-oh â€” a PAIR of dogs are better than one!"},
    {es:"Gato",     en:"Cat",      emoji:"ðŸ±", hook:"gah-to â€” the cat's gotta go â€” see ya gah-to!"},
    {es:"PÃ¡jaro",   en:"Bird",     emoji:"ðŸ¦", hook:"pah-ha-ro â€” the bird PARACHUTES down â€” pah-ha-ro!"},
    {es:"Pez",      en:"Fish",     emoji:"ðŸ ", hook:"pehz â€” pez candy is fish-shaped â€” same word!"},
    {es:"Caballo",  en:"Horse",    emoji:"ðŸ´", hook:"cah-bah-yo â€” the horse gallops saying bah-yo bah-yo!"},
    {es:"Vaca",     en:"Cow",      emoji:"ðŸ®", hook:"bah-ca â€” the cow says bah! bah-ca bah-ca!"},
    {es:"Mono",     en:"Monkey",   emoji:"ðŸ’", hook:"moh-no â€” mono means alone â€” the lonely monkey!"},
    {es:"Elefante", en:"Elephant", emoji:"ðŸ˜", hook:"eh-leh-fan-tay â€” the elephant is a huge fan of Spanish!"},
    {es:"LeÃ³n",     en:"Lion",     emoji:"ðŸ¦", hook:"lay-on â€” the lion lays on the grass in the sun!"},
    {es:"Tortuga",  en:"Turtle",   emoji:"ðŸ¢", hook:"tor-TOO-ga â€” the turtle took TOO long to get here!"},
  ]},
};

// â•â• LEVEL 2 VOCAB â€” Intermediate â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const VOCAB_L2 = {
  verbs: { icon:"âš¡", label:"Verbs & Actions", color:"#7C3AED", words:[
    {es:"Quiero",           en:"I want",          emoji:"ðŸ™‹", hook:"kyer-oh â€” I cheer-oh for what I want!"},
    {es:"Necesito",         en:"I need",           emoji:"â—", hook:"neh-seh-SEE-to â€” I NEED to SEE-to it right now!"},
    {es:"Tengo",            en:"I have",           emoji:"âœ‹", hook:"TEN-go â€” I HAVE ten things to go do!"},
    {es:"Voy",              en:"I'm going",        emoji:"ðŸš¶", hook:"BOY â€” I'm going like a BOY scout on a mission!"},
    {es:"Me gusta",         en:"I like",           emoji:"ðŸ‘", hook:"me goos-ta â€” I like it with gusto â€” goos-ta!"},
    {es:"Puedo",            en:"I can",            emoji:"ðŸ’ª", hook:"pweh-do â€” I can power through anything!"},
    {es:"SÃ©",               en:"I know",           emoji:"ðŸ§ ", hook:"SAY â€” I KNOW what to SAY about that!"},
    {es:"Hablo",            en:"I speak",          emoji:"ðŸ—£ï¸", hook:"AH-blo â€” I speak blow by blow â€” AH-blo!"},
    {es:"Busco",            en:"I'm looking for",  emoji:"ðŸ”", hook:"boos-co â€” I'm boosting my search â€” boos-co!"},
    {es:"Vivo en",          en:"I live in",        emoji:"ðŸ ", hook:"bee-bo â€” I LIVE like a bee in my hive â€” bee-bo!"},
    {es:"No sÃ©",            en:"I don't know",     emoji:"ðŸ¤·", hook:"SAY â€” I can't SAY because I just don't know!"},
    {es:"Â¿Puedes repetir?", en:"Can you repeat?",  emoji:"ðŸ”", hook:"reh-peh-teer â€” repeat it like a spinning tire â€” teer teer!"},
    {es:"EntendÃ­",          en:"I understood",     emoji:"ðŸ’¡", hook:"en-ten-dee â€” I DID understand â€” past tense â€” DID-ee!"},
    {es:"Quiero aprender",  en:"I want to learn",  emoji:"ðŸ“–", hook:"ah-pren-dair â€” I want to learn from the thin air â€” dair!"},
  ]},
  time: { icon:"ðŸ•", label:"Time & Days", color:"#0369A1", words:[
    {es:"Hoy",            en:"Today",         emoji:"ðŸ“…", hook:"OY â€” today I say OY what a day!"},
    {es:"MaÃ±ana",         en:"Tomorrow",      emoji:"ðŸŒ…", hook:"mahn-YAH-na â€” tomorrow is like a man eating a banana â€” man-yana!"},
    {es:"Ayer",           en:"Yesterday",     emoji:"âª", hook:"ah-yair â€” YESTERDAY the air smelled different!"},
    {es:"Ahora",          en:"Right now",     emoji:"âš¡", hook:"ah-OH-ra â€” RIGHT NOW say AH-OH-ra really fast!"},
    {es:"Lunes",          en:"Monday",        emoji:"1ï¸âƒ£", hook:"loo-nes â€” monday on the moon â€” lunar Monday!"},
    {es:"Martes",         en:"Tuesday",       emoji:"2ï¸âƒ£", hook:"mar-tays â€” tuesday on mars with the martians!"},
    {es:"MiÃ©rcoles",      en:"Wednesday",     emoji:"3ï¸âƒ£", hook:"mee-air-coh-les â€” WEDNESDAY in the air with the MERCURIANS!"},
    {es:"Jueves",         en:"Thursday",      emoji:"4ï¸âƒ£", hook:"hweh-bes â€” thursday we have webs â€” like jove the spider!"},
    {es:"Viernes",        en:"Friday",        emoji:"5ï¸âƒ£", hook:"bee-air-nes â€” friday in the air near venus â€” vee-air-nes!"},
    {es:"SÃ¡bado",         en:"Saturday",      emoji:"ðŸŽ‰", hook:"sah-bah-do â€” saturday in the sahara desert!"},
    {es:"Domingo",        en:"Sunday",        emoji:"â˜€ï¸", hook:"doh-ming-go â€” sunday with dominoes â€” dom-ingo!"},
    {es:"Â¿QuÃ© hora es?",  en:"What time is it?",emoji:"ðŸ•", hook:"kay OH-ra â€” WHAT hour is it â€” kay say the clock!"},
    {es:"Por la maÃ±ana",  en:"In the morning", emoji:"ðŸŒ„", hook:"mahn-YAH-na â€” morning banana time with the man!"},
    {es:"Por la noche",   en:"At night",      emoji:"ðŸŒ™", hook:"noh-chay â€” NO chess at night â€” night time!"},
  ]},
  body: { icon:"ðŸ’ª", label:"Body & Health", color:"#DC2626", words:[
    {es:"Cabeza",              en:"Head",          emoji:"ðŸ¤¯", hook:"cah-bay-sah â€” a cab drove into your head â€” cah-bay!"},
    {es:"Mano",                en:"Hand",          emoji:"âœ‹", hook:"mah-no â€” your hand is your MAN-O helper!"},
    {es:"Pie",                 en:"Foot",          emoji:"ðŸ¦¶", hook:"pee-EH â€” your foot makes a pie shape in the mud!"},
    {es:"Ojo",                 en:"Eye",           emoji:"ðŸ‘ï¸", hook:"OH-ho â€” your eye goes OH-ho when it sees something amazing!"},
    {es:"EstÃ³mago",            en:"Stomach",       emoji:"ðŸ˜£", hook:"es-toh-mah-go â€” your stomach says stop-mago I'm full!"},
    {es:"Espalda",             en:"Back",          emoji:"ðŸ”™", hook:"es-pal-da â€” your back is your best pal-da!"},
    {es:"Me duele",            en:"It hurts",      emoji:"ðŸ˜£", hook:"dweh-lay â€” it hurts like a duel â€” dwell on the pain!"},
    {es:"Estoy enfermo",       en:"I'm sick",      emoji:"ðŸ¤’", hook:"en-fair-mo â€” it's NOT fair-mo to be sick!"},
    {es:"Necesito un mÃ©dico",  en:"I need a doctor",emoji:"ðŸ‘¨â€âš•ï¸", hook:"meh-dee-co â€” the medic is your medical doctor!"},
    {es:"La farmacia",         en:"The pharmacy",  emoji:"ðŸ’Š", hook:"far-mah-see-ah â€” the pharmacy is FAR-macia away!"},
    {es:"Tengo fiebre",        en:"I have a fever", emoji:"ðŸŒ¡ï¸", hook:"fee-EH-bray â€” fever is like a fee you pay â€” fee-EH!"},
    {es:"Me siento mal",       en:"I feel bad",    emoji:"ðŸ˜ž", hook:"mal â€” feeling bad is just plain mal-icious!"},
  ]},
  descriptions: { icon:"ðŸŽ­", label:"Describing Things", color:"#B45309", words:[
    {es:"Grande",   en:"Big",       emoji:"ðŸ˜", hook:"gran-day â€” grand and BIG â€” it's a grand day!"},
    {es:"PequeÃ±o",  en:"Small",     emoji:"ðŸ­", hook:"peh-ken-yo â€” SMALL like little kenny YO!"},
    {es:"Bonito",   en:"Beautiful", emoji:"ðŸ˜", hook:"boh-nee-to â€” BEAUTIFUL like a bonito fish in the sea!"},
    {es:"Caro",     en:"Expensive", emoji:"ðŸ’¸", hook:"CAR-oh â€” as EXPENSIVE as a CAR â€” CAR-oh!"},
    {es:"Barato",   en:"Cheap",     emoji:"ðŸ¤‘", hook:"bah-rah-to â€” cheap like a burrito that costs almost nothing!"},
    {es:"Cerca",    en:"Near",      emoji:"ðŸ“", hook:"sair-ca â€” near the circus â€” sair-ca!"},
    {es:"Lejos",    en:"Far",       emoji:"ðŸ—ºï¸", hook:"leh-hos â€” FAR like a legion of miles away!"},
    {es:"RÃ¡pido",   en:"Fast",      emoji:"âš¡", hook:"rah-pee-do â€” RAPID and fast like a RAPID-o rocket!"},
    {es:"Lento",    en:"Slow",      emoji:"ðŸ¢", hook:"len-to â€” slow like lento music â€” nice and slow!"},
    {es:"Caliente", en:"Hot",       emoji:"ðŸ”¥", hook:"cah-lee-en-tay â€” hot like a KALEIDOSCOPE of fire!"},
    {es:"FrÃ­o",     en:"Cold",      emoji:"ðŸ§Š", hook:"free-oh â€” cold and free-zing cold â€” free-oh!"},
    {es:"FÃ¡cil",    en:"Easy",      emoji:"ðŸ˜Š", hook:"fah-seel â€” easy peasy like a fossil in the ground!"},
    {es:"DifÃ­cil",  en:"Difficult", emoji:"ðŸ˜¤", hook:"dee-fee-seel â€” DIFFICULT fee to pay â€” dee-fee!"},
    {es:"Mucho",    en:"A lot",     emoji:"ðŸ“¦", hook:"moo-cho â€” A lot of MOOs from the cow â€” moo-cho!"},
  ]},
  shopping: { icon:"ðŸ›’", label:"Shopping & Market", color:"#065F46", words:[
    {es:"El mercado",            en:"The market",          emoji:"ðŸª", hook:"mehr-cah-do â€” the market is your mercado adventure!"},
    {es:"Â¿Tiene cambio?",        en:"Do you have change?", emoji:"ðŸ’°", hook:"cahm-bee-oh â€” change your cambia coins!"},
    {es:"Es muy caro",           en:"It's very expensive", emoji:"ðŸ˜±", hook:"moo-ee CAR-oh â€” the CAR is VERY expensive â€” moo-ee!"},
    {es:"Me llevo esto",         en:"I'll take this",      emoji:"ðŸ›ï¸", hook:"yeh-bo â€” I'll TAKE it yebo style â€” yeh-bo!"},
    {es:"Â¿CuÃ¡nto es todo?",      en:"How much is everything?",emoji:"ðŸ§¾", hook:"kwahn-to â€” HOW MUCH in this quantum universe?"},
    {es:"Quiero comprar",        en:"I want to buy",       emoji:"ðŸ’³", hook:"cohm-prar â€” I want to compare prices before buying!"},
    {es:"Â¿Acepta tarjeta?",      en:"Do you accept card?", emoji:"ðŸ’³", hook:"tar-heh-ta â€” card like a target credit card!"},
    {es:"El precio",             en:"The price",           emoji:"ðŸ·ï¸", hook:"preh-see-oh â€” the price is oh so precious!"},
    {es:"La bolsa",              en:"The bag",             emoji:"ðŸ›ï¸", hook:"bowl-sah â€” the bag is shaped like a bowl!"},
    {es:"Â¿Puede bajar el precio?",en:"Can you lower the price?",emoji:"ðŸ™", hook:"bah-har â€” can you lower it like going DOWN to a bar?"},
    {es:"Â¿DÃ³nde encuentro...?",  en:"Where do I find...?", emoji:"ðŸ”", hook:"en-kwen-tro â€” WHERE do I ENCOUNTER what I'm looking for?"},
    {es:"Me da uno mÃ¡s",         en:"Give me one more",    emoji:"âœŒï¸", hook:"Give me uno mas â€” one MORE please!"},
  ]},
  weather: { icon:"ðŸŒ¤ï¸", label:"Weather", color:"#1D4ED8", words:[
    {es:"Hace calor",        en:"It's hot",          emoji:"â˜€ï¸", hook:"AH-say cah-lor â€” it makes calor â€” hot hot hot!"},
    {es:"Hace frÃ­o",         en:"It's cold",         emoji:"ðŸ§Š", hook:"free-oh â€” it's cold and free-zing cold!"},
    {es:"EstÃ¡ lloviendo",    en:"It's raining",      emoji:"ðŸŒ§ï¸", hook:"yo-bee-en-do â€” it's raining loving drops from the sky!"},
    {es:"Hace viento",       en:"It's windy",        emoji:"ðŸ’¨", hook:"bee-en-to â€” windy like a vent blowing hard!"},
    {es:"EstÃ¡ nublado",      en:"It's cloudy",       emoji:"â˜ï¸", hook:"noo-blah-do â€” cloudy and totally blah-do gray!"},
    {es:"Â¿CÃ³mo estÃ¡ el clima?",en:"What's the weather like?",emoji:"ðŸŒ¡ï¸", hook:"klee-mah â€” the climate clime changes fast in Cuenca!"},
    {es:"Va a llover",       en:"It's going to rain",emoji:"â›ˆï¸", hook:"yo-bair â€” it's going to rain like a lover of water!"},
    {es:"Hace buen tiempo",  en:"The weather is nice",emoji:"ðŸŒˆ", hook:"tee-em-po â€” nice weather tempo â€” what a GOOD time!"},
    {es:"El sol",            en:"The sun",           emoji:"â˜€ï¸", hook:"sole â€” the sun is your sole friend on cold days!"},
    {es:"La lluvia",         en:"The rain",          emoji:"ðŸŒ§ï¸", hook:"yoo-bee-ah â€” the rain goes yoobia yoobia down!"},
    {es:"La neblina",        en:"The fog",           emoji:"ðŸŒ«ï¸", hook:"neh-blee-nah â€” fog like a nebula floating down!"},
    {es:"QuÃ© fresco",        en:"How pleasant",      emoji:"ðŸ˜Œ", hook:"fres-co â€” how fresh and pleasant â€” fresco cool!"},
  ]},
};


// â•â• LEVEL 3 VOCAB (Advanced Intermediate) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const VOCAB_L3 = {
  opinions: { icon:"ðŸ’¬", label:"Opinions & Ideas", color:"#BE185D", words:[
    {es:"Creo que",en:"I think that",emoji:"ðŸ’­",hook:"kreh-oh â€” I create my own thoughts â€” creo que!"},
    {es:"En mi opiniÃ³n",en:"In my opinion",emoji:"ðŸ—£ï¸",hook:"oh-pee-nyon â€” your opinion is your own onion â€” unique and layered!"},
    {es:"Estoy de acuerdo",en:"I agree",emoji:"ðŸ‘",hook:"ah-kwair-do â€” I agree to meet at the square-do!"},
    {es:"No estoy de acuerdo",en:"I disagree",emoji:"ðŸ‘Ž",hook:"No agreement â€” the square is the wrong shape!"},
    {es:"Depende",en:"It depends",emoji:"ðŸ¤·",hook:"deh-pen-day â€” it depends on which pen-day you pick!"},
    {es:"Me parece bien",en:"It seems fine to me",emoji:"âœ…",hook:"pah-reh-seh â€” it appears and seems just right to me!"},
    {es:"No me gusta",en:"I don't like it",emoji:"ðŸ˜•",hook:"No goose-ta â€” the goose did NOT like that at all!"},
    {es:"Me encanta",en:"I love it",emoji:"ðŸ˜",hook:"en-kan-ta â€” it enchants me â€” en-chant-a!"},
    {es:"Es interesante",en:"It's interesting",emoji:"ðŸ¤”",hook:"in-teh-reh-san-tay â€” it's INTERESTING like a saint dancing!"},
    {es:"Tiene razÃ³n",en:"You are right",emoji:"ðŸŽ¯",hook:"rah-sohn â€” you have reason â€” rah-sohn is right!"},
    {es:"No tiene razÃ³n",en:"You are wrong",emoji:"âŒ",hook:"No reason â€” no rah-sohn for that!"},
    {es:"QuizÃ¡s",en:"Maybe",emoji:"ðŸ¤·",hook:"kee-sas â€” maybe a kiss-as will help!"},
    {es:"Desde luego",en:"Of course",emoji:"ðŸ’¯",hook:"des-day lweh-go â€” of course from THERE to HERE!"},
    {es:"Sin embargo",en:"However",emoji:"â†”ï¸",hook:"em-bar-go â€” however the embargo stopped it!"},
  ]},
  travel: { icon:"âœˆï¸", label:"Travel", color:"#0F766E", words:[
    {es:"El aeropuerto",en:"The airport",emoji:"âœˆï¸",hook:"ah-roh-pwair-to â€” the air-o-port opens to the sky!"},
    {es:"El vuelo",en:"The flight",emoji:"ðŸ›«",hook:"bweh-lo â€” the flight goes whoa up into the sky!"},
    {es:"El pasaporte",en:"The passport",emoji:"ðŸ“•",hook:"pah-sah-por-tay â€” your pass-a-port-ay gets you through the port!"},
    {es:"La maleta",en:"The suitcase",emoji:"ðŸ§³",hook:"mah-leh-ta â€” your suitcase holds your maleta of memories!"},
    {es:"El equipaje",en:"The luggage",emoji:"ðŸ§³",hook:"eh-kee-pah-hey â€” EQUIPMENT for your journey â€” eh-kee-pah!"},
    {es:"La reservaciÃ³n",en:"The reservation",emoji:"ðŸ“‹",hook:"reh-sair-bah-syon â€” reserve your spot at the station!"},
    {es:"El hotel",en:"The hotel",emoji:"ðŸ¨",hook:"oh-tel â€” hotel sounds the same â€” oh-tel!"},
    {es:"La habitaciÃ³n",en:"The room",emoji:"ðŸ›ï¸",hook:"ah-bee-tah-syon â€” HABITATION â€” your living space!"},
    {es:"Â¿A quÃ© hora sale?",en:"What time does it leave?",emoji:"ðŸ•",hook:"sah-leh â€” what hour does it sail away?"},
    {es:"Â¿DÃ³nde estÃ¡ la salida?",en:"Where is the exit?",emoji:"ðŸšª",hook:"sah-lee-da â€” the exit sails you out the door!"},
    {es:"PerdÃ­ mi equipaje",en:"I lost my luggage",emoji:"ðŸ˜±",hook:"pair-dee â€” I'm in a PAIR of trouble â€” lost it!"},
    {es:"Quiero cambiar dinero",en:"I want to exchange money",emoji:"ðŸ’±",hook:"kahm-bee-ar â€” change money at the cambio!"},
  ]},
  health: { icon:"ðŸ¥", label:"Health & Emergency", color:"#DC2626", words:[
    {es:"Llame a la policÃ­a",en:"Call the police",emoji:"ðŸš”",hook:"YAH-meh â€” call the llama police â€” YAH-meh!"},
    {es:"Necesito ayuda",en:"I need help",emoji:"ðŸ†˜",hook:"ah-yoo-da â€” I need aid â€” ayu-da!"},
    {es:"Â¿DÃ³nde estÃ¡ el hospital?",en:"Where is the hospital?",emoji:"ðŸ¥",hook:"ohs-pee-tal â€” the hospital is the os-pee-tal!"},
    {es:"Tengo una alergia",en:"I have an allergy",emoji:"ðŸ¤§",hook:"ah-lair-hee-ah â€” allergy â€” ah-lair in the air!"},
    {es:"Soy diabÃ©tico",en:"I am diabetic",emoji:"ðŸ’‰",hook:"dee-ah-beh-tee-co â€” DIAbetic â€” dia-beh!"},
    {es:"Necesito mis medicamentos",en:"I need my medication",emoji:"ðŸ’Š",hook:"meh-dee-kah-men-tos â€” MEDICATION MENtos!"},
    {es:"Me robaron",en:"I was robbed",emoji:"ðŸš¨",hook:"roh-bah-ron â€” rob-aron â€” they robbed me!"},
    {es:"Estoy perdido",en:"I am lost",emoji:"ðŸ˜Ÿ",hook:"pair-dee-do â€” lost in a PAIR of streets!"},
    {es:"Â¿Puede llamar a alguien?",en:"Can you call someone?",emoji:"ðŸ“ž",hook:"YAH-mar â€” can you call someone â€” llama them!"},
    {es:"No me siento bien",en:"I don't feel well",emoji:"ðŸ¤’",hook:"see-en-to â€” I don't sense wellness â€” no see-en-to!"},
    {es:"Â¿Tiene un seguro mÃ©dico?",en:"Do you have insurance?",emoji:"ðŸ“‹",hook:"seh-goo-ro â€” secure medical coverage â€” seh-guro!"},
    {es:"Necesito descansar",en:"I need to rest",emoji:"ðŸ˜´",hook:"des-kan-sar â€” I need to descend into rest â€” des-kan!"},
  ]},
  socialLife: { icon:"ðŸŽ‰", label:"Social & Daily Life", color:"#7C3AED", words:[
    {es:"Â¿QuÃ© haces en tu tiempo libre?",en:"What do you do in your free time?",emoji:"ðŸ•",hook:"tee-em-po lee-breh â€” tempo libre â€” free time music!"},
    {es:"Me gusta leer",en:"I like to read",emoji:"ðŸ“š",hook:"leh-air â€” I like to READ the air â€” leh-air!"},
    {es:"Salgo con amigos",en:"I go out with friends",emoji:"ðŸŽ‰",hook:"sal-go â€” I sally forth with friends â€” sal-go!"},
    {es:"Trabajo desde casa",en:"I work from home",emoji:"ðŸ ",hook:"kasa â€” I work from my casa â€” home sweet home!"},
    {es:"Â¿Tienes planes?",en:"Do you have plans?",emoji:"ðŸ“…",hook:"plah-nes â€” planes of plans ahead!"},
    {es:"Â¡QuÃ© pena!",en:"What a shame!",emoji:"ðŸ˜ž",hook:"peh-nah â€” what a pain â€” peh-nah!"},
    {es:"Â¡QuÃ© suerte!",en:"What luck!",emoji:"ðŸ€",hook:"swair-teh â€” sweet luck â€” swair-teh!"},
    {es:"Â¿CÃ³mo fue?",en:"How did it go?",emoji:"â“",hook:"fweh â€” HOW did it FLY by â€” fweh!"},
    {es:"Fue genial",en:"It was great",emoji:"ðŸŒŸ",hook:"heh-nee-al â€” it was genial â€” GENIus-al!"},
    {es:"La prÃ³xima vez",en:"Next time",emoji:"â­ï¸",hook:"prohk-see-mah â€” PROXIMATE time â€” next and near!"},
    {es:"A veces",en:"Sometimes",emoji:"ðŸ”„",hook:"AH beh-ses â€” AH sometimes the bases change!"},
    {es:"Siempre",en:"Always",emoji:"â™¾ï¸",hook:"see-em-preh â€” sempre â€” always in music means always!"},
  ]},
  technology: { icon:"ðŸ“±", label:"Technology", color:"#1D4ED8", words:[
    {es:"El telÃ©fono",en:"The phone",emoji:"ðŸ“±",hook:"teh-leh-foh-no â€” TELEPHONE â€” tele-fono!"},
    {es:"La contraseÃ±a",en:"The password",emoji:"ðŸ”‘",hook:"kon-tra-seh-nya â€” contra the entrance â€” kon-tra-SEÃ‘!"},
    {es:"Â¿Tiene WiFi?",en:"Do you have WiFi?",emoji:"ðŸ“¶",hook:"wee-fee â€” WiFi sounds the same worldwide!"},
    {es:"Â¿CuÃ¡l es la clave?",en:"What is the code/key?",emoji:"ðŸ”",hook:"kla-beh â€” the clave is the key â€” kla-beh!"},
    {es:"La aplicaciÃ³n",en:"The app",emoji:"ðŸ“²",hook:"ah-plee-kah-syon â€” APPLICATION â€” ah-plee-kay!"},
    {es:"Buscar en internet",en:"Search the internet",emoji:"ðŸ”",hook:"boos-kar â€” boost your search on the internet!"},
    {es:"Mandar un mensaje",en:"Send a message",emoji:"ðŸ’¬",hook:"men-sah-heh â€” manage to send your message!"},
    {es:"La baterÃ­a estÃ¡ baja",en:"The battery is low",emoji:"ðŸ”‹",hook:"bah-teh-ree-ah bah-ha â€” battery going low-ha!"},
    {es:"Â¿Puedo cargar mi telÃ©fono?",en:"Can I charge my phone?",emoji:"ðŸ”Œ",hook:"kar-gar â€” can I charge â€” cargo my phone up!"},
    {es:"Tomar una foto",en:"Take a photo",emoji:"ðŸ“¸",hook:"foh-to â€” foto â€” photo sounds almost the same!"},
  ]},
};

// â•â• CORE 1000 â€” Most Common Spanish Words â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Organized in sets of 25, prioritized by frequency of use in conversation
const CORE_SETS = [
  {
    setNum:1, title:"Top 25 Essential Words", color:"#DC2626",
    words:[
      {es:"El / La",en:"The",emoji:"ðŸ“Œ",hook:"el/la â€” THE most used word â€” just el or la!"},
      {es:"De",en:"Of / From",emoji:"ðŸ“",hook:"deh â€” de-liver from â€” coming FROM somewhere!"},
      {es:"Y",en:"And",emoji:"âž•",hook:"ee â€” E-asy AND simple â€” just say ee!"},
      {es:"En",en:"In / On",emoji:"ðŸ“¦",hook:"en â€” in the box â€” like English 'in'!"},
      {es:"Un / Una",en:"A / An",emoji:"1ï¸âƒ£",hook:"oon/oo-na â€” A single ONE thing â€” oon!"},
      {es:"Que",en:"That / What",emoji:"â“",hook:"keh â€” THAT's what â€” keh said that?"},
      {es:"Se",en:"Oneself / Each other",emoji:"ðŸ”„",hook:"seh â€” self â€” like reFLEXive self!"},
      {es:"No",en:"No / Not",emoji:"ðŸš«",hook:"no â€” NO needs no hook â€” it's the same!"},
      {es:"Con",en:"With",emoji:"ðŸ¤",hook:"kon â€” con-nect WITH someone â€” kon!"},
      {es:"Por",en:"For / By / Through",emoji:"ðŸ›£ï¸",hook:"por â€” por-tal through which things pass!"},
      {es:"Su",en:"His / Her / Their",emoji:"ðŸ‘¤",hook:"soo â€” su-e owns everything â€” soo!"},
      {es:"Para",en:"For / In order to",emoji:"ðŸŽ¯",hook:"pah-ra â€” PARAllel FOR a purpose!"},
      {es:"Como",en:"Like / As / How",emoji:"ðŸ”",hook:"koh-mo â€” como â€” HOW like a comma pausing!"},
      {es:"MÃ¡s",en:"More",emoji:"âž•",hook:"mas â€” MORE mMAS â€” just like mas in music!"},
      {es:"Pero",en:"But",emoji:"â†”ï¸",hook:"peh-ro â€” BUT a pear-oh stops the sentence!"},
      {es:"Si",en:"If",emoji:"ðŸ¤”",hook:"see â€” if you SEE it â€” see!"},
      {es:"Ya",en:"Already / Now",emoji:"âš¡",hook:"yah â€” YAH already done â€” YAH!"},
      {es:"Todo",en:"All / Everything",emoji:"ðŸŒ",hook:"toh-do â€” TODO list has EVERYTHING!"},
      {es:"Le",en:"To him / To her",emoji:"ðŸ‘†",hook:"leh â€” le-t him have it â€” leh!"},
      {es:"Bien",en:"Well / Good",emoji:"âœ…",hook:"bee-en â€” BEAN good â€” feeling bee-en!"},
      {es:"Cuando",en:"When",emoji:"ðŸ•",hook:"kwan-do â€” WHEN is it quando?"},
      {es:"Muy",en:"Very",emoji:"â€¼ï¸",hook:"moo-ee â€” VERY moo-ee like a cow yelling VERY loud!"},
      {es:"Sin",en:"Without",emoji:"ðŸš«",hook:"seen â€” sin â€” without good it's a sin!"},
      {es:"Sobre",en:"About / On top of",emoji:"ðŸ“‹",hook:"soh-breh â€” SOBER thoughts ABOUT things!"},
      {es:"Hay",en:"There is / There are",emoji:"ðŸ—ºï¸",hook:"eye â€” THERE is â€” AYE there's something there!"},
    ]
  },
  {
    setNum:2, title:"Words 26â€“50: Actions & States", color:"#D97706",
    words:[
      {es:"Ser",en:"To be (permanent)",emoji:"â™¾ï¸",hook:"sair â€” to be forever â€” sair always!"},
      {es:"Estar",en:"To be (temporary)",emoji:"â³",hook:"es-tar â€” star position â€” where you're standing now!"},
      {es:"Tener",en:"To have",emoji:"âœ‹",hook:"teh-nair â€” tennis player has a racket â€” TEN-er!"},
      {es:"Hacer",en:"To do / To make",emoji:"ðŸ”¨",hook:"ah-sair â€” to DO â€” a sayer does things!"},
      {es:"Ir",en:"To go",emoji:"ðŸš¶",hook:"eer â€” GO â€”eer away!"},
      {es:"Ver",en:"To see",emoji:"ðŸ‘ï¸",hook:"bair â€” to SEE â€” BEAR sees you!"},
      {es:"Dar",en:"To give",emoji:"ðŸŽ",hook:"dar â€” DARE to GIVE â€” dar!"},
      {es:"Saber",en:"To know (facts)",emoji:"ðŸ§ ",hook:"sah-bair â€” savvy â€” to KNOW the facts!"},
      {es:"Querer",en:"To want / To love",emoji:"â¤ï¸",hook:"keh-rair â€” to CARE and WANT â€” keh-rair!"},
      {es:"Llegar",en:"To arrive",emoji:"ðŸ",hook:"yeh-gar â€” yeah I arrived â€” yeh-gar!"},
      {es:"Pasar",en:"To pass / To happen",emoji:"âž¡ï¸",hook:"pah-sar â€” to pass â€” pah-pass!"},
      {es:"Deber",en:"Should / Must",emoji:"âš ï¸",hook:"deh-bair â€” debt â€” you should pay your debts!"},
      {es:"Poner",en:"To put / To place",emoji:"ðŸ“Œ",hook:"poh-nair â€” to PUT â€” poner places things!"},
      {es:"Venir",en:"To come",emoji:"ðŸ‘‹",hook:"beh-neer â€” COME here veneer!"},
      {es:"Seguir",en:"To follow / To continue",emoji:"â–¶ï¸",hook:"seh-geer â€” seguir â€” seek and follow!"},
      {es:"Encontrar",en:"To find / To meet",emoji:"ðŸ”",hook:"en-kon-trar â€” ENCOUNTER â€” to find and meet!"},
      {es:"Llamar",en:"To call",emoji:"ðŸ“ž",hook:"yah-mar â€” call the llama â€” yah-mar!"},
      {es:"Creer",en:"To believe",emoji:"ðŸ™",hook:"kreh-air â€” to believe â€” create belief!"},
      {es:"Hablar",en:"To speak",emoji:"ðŸ—£ï¸",hook:"ah-blar â€” able to speak â€” ah-blar!"},
      {es:"Llevar",en:"To carry / To take",emoji:"ðŸŽ’",hook:"yeh-bar â€” carry the lever â€” yeh-bar!"},
      {es:"Dejar",en:"To leave / To let",emoji:"ðŸšª",hook:"deh-har â€” depart and leave â€” deh-har!"},
      {es:"Sentir",en:"To feel",emoji:"ðŸ’“",hook:"sen-teer â€” sentient feeling â€” sen-teer!"},
      {es:"Vivir",en:"To live",emoji:"ðŸŒ±",hook:"bee-beer â€” to LIVE and drink beer of life â€” vee-veer!"},
      {es:"Pensar",en:"To think",emoji:"ðŸ’­",hook:"pen-sar â€” pensive thinker â€” pen-sar!"},
      {es:"Salir",en:"To leave / To go out",emoji:"ðŸš¶",hook:"sah-leer â€” sally out â€” sal-leer!"},
    ]
  },
  {
    setNum:3, title:"Words 51â€“75: People & Places", color:"#059669",
    words:[
      {es:"La persona",en:"The person",emoji:"ðŸ‘¤",hook:"pair-soh-na â€” persona â€” your personal self!"},
      {es:"El hombre",en:"The man",emoji:"ðŸ‘¨",hook:"ohm-breh â€” the MAN is sombre â€” ohm-breh!"},
      {es:"La mujer",en:"The woman",emoji:"ðŸ‘©",hook:"moo-hair â€” the woman has the hair â€” moo-hair!"},
      {es:"El niÃ±o",en:"The boy",emoji:"ðŸ‘¦",hook:"nee-nyo â€” the BOY is ninja â€” nee-nyo!"},
      {es:"La niÃ±a",en:"The girl",emoji:"ðŸ‘§",hook:"nee-nya â€” the girl is a ninja too â€” nee-nya!"},
      {es:"La ciudad",en:"The city",emoji:"ðŸ™ï¸",hook:"see-oo-dad â€” dad lives in the city â€” see-oo-dad!"},
      {es:"El paÃ­s",en:"The country",emoji:"ðŸ—ºï¸",hook:"pah-ees â€” the country is a peace of land!"},
      {es:"La casa",en:"The house",emoji:"ðŸ ",hook:"kah-sah â€” casa â€” house is casa!"},
      {es:"El trabajo",en:"The work / Job",emoji:"ðŸ’¼",hook:"trah-bah-ho â€” trouble at WORK â€” trah-bah!"},
      {es:"El tiempo",en:"Time / Weather",emoji:"â°",hook:"tee-em-po â€” tempo of time and weather!"},
      {es:"El aÃ±o",en:"The year",emoji:"ðŸ“…",hook:"AH-nyo â€” annual year â€” AH-nyo!"},
      {es:"El dÃ­a",en:"The day",emoji:"ðŸŒž",hook:"dee-ah â€” the DAY â€” dee-lightful day!"},
      {es:"La vida",en:"Life",emoji:"ðŸŒ±",hook:"bee-da â€” vita â€” vida is life!"},
      {es:"El mundo",en:"The world",emoji:"ðŸŒ",hook:"moon-do â€” the world has a moon-do!"},
      {es:"La mano",en:"The hand",emoji:"âœ‹",hook:"mah-no â€” MAN-o hand â€” MAN of hands!"},
      {es:"El lugar",en:"The place",emoji:"ðŸ“",hook:"loo-gar â€” the PLACE â€” lure to a gar-den!"},
      {es:"La vez",en:"The time (occasion)",emoji:"ðŸ”",hook:"behs â€” once upon a vez â€” time!"},
      {es:"La parte",en:"The part",emoji:"ðŸ§©",hook:"par-teh â€” PART of the party!"},
      {es:"El lado",en:"The side",emoji:"â†”ï¸",hook:"lah-do â€” the SIDE â€” laid-o on one side!"},
      {es:"El punto",en:"The point",emoji:"ðŸŽ¯",hook:"poon-to â€” point â€” point-o right there!"},
      {es:"El tipo",en:"The type / Guy",emoji:"ðŸ‘¤",hook:"tee-po â€” type of person â€” tee-po!"},
      {es:"La manera",en:"The way / Manner",emoji:"ðŸ›£ï¸",hook:"mah-neh-rah â€” manner of the WAY!"},
      {es:"La forma",en:"The form / Way",emoji:"ðŸ“",hook:"FOR-mah â€” form â€” FOR-ma!"},
      {es:"El nombre",en:"The name",emoji:"ðŸ·ï¸",hook:"nohm-breh â€” nombre â€” the name!"},
      {es:"El caso",en:"The case",emoji:"ðŸ—‚ï¸",hook:"kah-so â€” the case â€” kah-so!"},
    ]
  },
  {
    setNum:4, title:"Words 76â€“100: Connectors & Expressions", color:"#7C3AED",
    words:[
      {es:"TambiÃ©n",en:"Also / Too",emoji:"âž•",hook:"tahm-bee-en â€” TAMBOURINE also makes music!"},
      {es:"SÃ³lo",en:"Only / Just",emoji:"1ï¸âƒ£",hook:"soh-lo â€” SOLO â€” ONLY one person!"},
      {es:"AsÃ­",en:"Like this / So",emoji:"ðŸ‘†",hook:"ah-SEE â€” so â€” AH-SEE like this!"},
      {es:"AhÃ­",en:"There",emoji:"ðŸ“",hook:"ah-ee â€” AH-ee there it is!"},
      {es:"AquÃ­",en:"Here",emoji:"ðŸ“",hook:"ah-kee â€” ah-key is HERE!"},
      {es:"AllÃ­",en:"Over there",emoji:"ðŸ‘‰",hook:"ah-yee â€” ah-yee over THERE!"},
      {es:"DespuÃ©s",en:"After / Later",emoji:"â­ï¸",hook:"des-pwes â€” AFTER â€” des-pass the time!"},
      {es:"Antes",en:"Before",emoji:"â®ï¸",hook:"ahn-tes â€” ante â€” before the ante!"},
      {es:"Ahora",en:"Now",emoji:"âš¡",hook:"ah-OH-rah â€” NOW â€” ah-OH-ra right now!"},
      {es:"Siempre",en:"Always",emoji:"â™¾ï¸",hook:"see-em-preh â€” sempre â€” always in music!"},
      {es:"Nunca",en:"Never",emoji:"ðŸš«",hook:"noon-kah â€” NEVER at noon-kah!"},
      {es:"Poco",en:"A little / Few",emoji:"ðŸ¤",hook:"poh-ko â€” POCO â€” a little POCO!"},
      {es:"Mucho",en:"A lot / Much",emoji:"ðŸ“¦",hook:"moo-cho â€” MUCH moo from the cow!"},
      {es:"Muy",en:"Very",emoji:"â€¼ï¸",hook:"moo-ee â€” VERY moo â€” very loud cow!"},
      {es:"Tanto",en:"So much / As much",emoji:"âš–ï¸",hook:"tan-to â€” tan-much in the tan skin!"},
      {es:"Mismo",en:"Same / Itself",emoji:"ðŸªž",hook:"mees-mo â€” SAME mirror â€” mees-mo!"},
      {es:"Cada",en:"Each / Every",emoji:"ðŸ”¢",hook:"kah-da â€” EACH cada-et learns every day!"},
      {es:"Entre",en:"Between / Among",emoji:"â†”ï¸",hook:"en-treh â€” entre-ance between two doors!"},
      {es:"Dentro",en:"Inside",emoji:"ðŸ“¦",hook:"den-tro â€” inside the den-tro!"},
      {es:"Fuera",en:"Outside",emoji:"ðŸŒ³",hook:"fwair-ah â€” outside â€” it's fair outside!"},
      {es:"Contra",en:"Against",emoji:"âš”ï¸",hook:"kon-trah â€” contra â€” against the enemy!"},
      {es:"Hacia",en:"Toward",emoji:"âž¡ï¸",hook:"AH-see-ah â€” toward â€” AH-see the direction!"},
      {es:"Desde",en:"Since / From",emoji:"ðŸ“…",hook:"des-deh â€” since â€” from THAT des-k!"},
      {es:"Hasta",en:"Until / Up to",emoji:"ðŸ",hook:"ahs-tah â€” hasta la vista â€” UNTIL we meet!"},
      {es:"Durante",en:"During",emoji:"â±ï¸",hook:"doo-ran-teh â€” during the DURAtion!"},
    ]
  },
];

const CORE_ALL_WORDS = CORE_SETS.flatMap(s => s.words);

const ALL_WORDS_L1 = Object.values(VOCAB_L1).flatMap(c => c.words);
const ALL_WORDS_L2 = Object.values(VOCAB_L2).flatMap(c => c.words);
const ALL_WORDS_L3 = Object.values(VOCAB_L3).flatMap(c => c.words);
const ALL_WORDS    = [...ALL_WORDS_L1, ...ALL_WORDS_L2, ...ALL_WORDS_L3, ...CORE_ALL_WORDS];

// â•â• STORY MODE DATA â€” set in Cuenca, full audio on every line â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const STORIES = [
  {
    id:"cafe",
    title:"Un CafÃ© en Cuenca",
    titleEn:"A CafÃ© in Cuenca",
    emoji:"â˜•",
    color:"#DC6B19",
    panels:[
      {scene:"You walk into a cozy cafÃ© in the center of Cuenca.", sceneEs:"Entran a una cafeterÃ­a bonita en Cuenca."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Buenos dÃ­as. Â¿Tienen una mesa para dos?",    en:"Good morning. Do you have a table for two?"},
      {speaker:"Waiter",  avatar:"ðŸ‘¨", es:"Â¡Claro que sÃ­! Por aquÃ­, por favor.",        en:"Of course! Right this way, please."},
      {scene:"You sit down and look at the menu.", sceneEs:"Se sientan y miran el menÃº."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"MamÃ¡, Â¿quÃ© es esto?",                        en:"Mom, what is this?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Es el menÃº, mi amor. Mira los precios.",     en:"It's the menu, my love. Look at the prices."},
      {speaker:"Waiter",  avatar:"ðŸ‘¨", es:"Â¿QuÃ© desean ordenar?",                       en:"What would you like to order?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Un cafÃ© con leche, por favor.",              en:"A coffee with milk, please."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Y yo quiero un jugo de naranja.",            en:"And I want an orange juice."},
      {speaker:"Waiter",  avatar:"ðŸ‘¨", es:"Â¡Perfecto! Ya les traigo.",                  en:"Perfect! I'll bring it right out."},
      {scene:"After enjoying your drinks!", sceneEs:"Â¡DespuÃ©s de disfrutar sus bebidas!"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Disculpe, la cuenta por favor.",             en:"Excuse me, the check please."},
      {speaker:"Waiter",  avatar:"ðŸ‘¨", es:"Son cuatro dÃ³lares con cincuenta.",          en:"That's four dollars and fifty cents."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Gracias, Â¡muy amable!",                     en:"Thank you, very kind!"},
      {speaker:"Waiter",  avatar:"ðŸ‘¨", es:"Â¡Hasta luego! Â¡Que tengan un buen dÃ­a!",    en:"See you later! Have a great day!"},
    ]
  },
  {
    id:"market",
    title:"En el Mercado",
    titleEn:"At the Market",
    emoji:"ðŸ›’",
    color:"#10B981",
    panels:[
      {scene:"You arrive at the colorful Cuenca market â€” flowers, fruit, and food everywhere!", sceneEs:"Llegan al mercado de Cuenca â€” flores, frutas y comida por todas partes."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Â¡Miren quÃ© frutas tan bonitas!",            en:"Look at these beautiful fruits!"},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"PapÃ¡, Â¿quÃ© es eso rojo?",                  en:"Dad, what is that red thing?"},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Es una manzana, Peyton. Â¡Es roja!",        en:"It's an apple, Peyton. It's red!"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Buenos dÃ­as, Â¿quÃ© desean?",                 en:"Good morning, what do you need?"},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Â¿CuÃ¡nto cuestan las naranjas?",            en:"How much do the oranges cost?"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Son cincuenta centavos cada una.",          en:"They're fifty cents each."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Me llevo seis, por favor.",                en:"I'll take six, please."},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡PapÃ¡, quiero helado!",                    en:"Dad, I want ice cream!"},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Primero las frutas. Â¡Por favor, Peyton!",  en:"Fruit first. Please, Peyton!"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Â¡QuÃ© niÃ±a tan bonita!",                    en:"What a beautiful girl!"},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡Gracias! Me llamo Peyton.",               en:"Thank you! My name is Peyton."},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Â¡Mucho gusto, Peyton! Â¡QuÃ© nombre tan bonito!",en:"Nice to meet you, Peyton! What a pretty name!"},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Â¡Gracias! Â¡Hasta luego!",                 en:"Thank you! See you later!"},
    ]
  },
  {
    id:"friend",
    title:"Una Nueva Amiga",
    titleEn:"A New Friend",
    emoji:"ðŸ‘«",
    color:"#8B5CF6",
    panels:[
      {scene:"Grayson is playing in a park in Cuenca when a local girl walks over.", sceneEs:"Grayson juega en un parque cuando una niÃ±a se acerca."},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Â¡Hola! Â¿CÃ³mo te llamas?",                  en:"Hi! What's your name?"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Me llamo Grayson. Â¿Y tÃº?",                 en:"My name is Grayson. And you?"},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Me llamo SofÃ­a. Â¡Mucho gusto!",            en:"My name is SofÃ­a. Nice to meet you!"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Mucho gusto, SofÃ­a!",                     en:"Nice to meet you too, SofÃ­a!"},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Â¿De dÃ³nde eres?",                          en:"Where are you from?"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Soy de Florida, en los Estados Unidos.",   en:"I'm from Florida, in the United States."},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Â¡QuÃ© interesante! Â¿Te gusta Cuenca?",      en:"How interesting! Do you like Cuenca?"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡SÃ­! Me gusta mucho. Es muy bonita.",      en:"Yes! I like it a lot. It's very beautiful."},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Â¿Quieres jugar conmigo?",                  en:"Do you want to play with me?"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡SÃ­, por favor! Â¿CÃ³mo se juega?",         en:"Yes please! How do you play?"},
      {scene:"They play together and laugh for a long time.", sceneEs:"Juegan juntas y se rÃ­en mucho."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Esto es muy divertido!",                  en:"This is so much fun!"},
      {speaker:"SofÃ­a",   avatar:"ðŸŒ¸", es:"Â¡SÃ­! Â¡Eres mi nueva amiga, Grayson!",     en:"Yes! You're my new friend, Grayson!"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Y tÃº eres mi amiga tambiÃ©n, SofÃ­a!",     en:"And you're my friend too, SofÃ­a!"},
    ]
  },
  {
    id:"directions",
    title:"Â¿DÃ³nde EstÃ¡?",
    titleEn:"Where Is It?",
    emoji:"ðŸ—ºï¸",
    color:"#E8445A",
    panels:[
      {scene:"Leanne is on a street in Cuenca and is a little lost!", sceneEs:"Leanne estÃ¡ en una calle de Cuenca y estÃ¡ un poco perdida."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Disculpe, seÃ±or. Â¿Me puede ayudar?",       en:"Excuse me, sir. Can you help me?"},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Â¡Claro! Â¿En quÃ© le puedo ayudar?",         en:"Of course! How can I help you?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¿DÃ³nde estÃ¡ el mercado, por favor?",       en:"Where is the market, please?"},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Es fÃ¡cil. Camine todo recto.",             en:"It's easy. Walk straight ahead."},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Luego doble a la derecha.",                en:"Then turn to the right."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¿EstÃ¡ lejos?",                            en:"Is it far?"},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"No, estÃ¡ muy cerca. Solo cinco minutos.",  en:"No, it's very close. Only five minutes."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"MÃ¡s despacio, por favor. No hablo espaÃ±ol bien.",en:"More slowly, please. I don't speak Spanish well."},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Â¡No hay problema! Hablo mÃ¡s despacio.",    en:"No problem! I'll speak more slowly."},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Todo recto, luego a la derecha. Â¡Muy cerca!",en:"Straight ahead, then to the right. Very close!"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡EntendÃ­! Â¡MuchÃ­simas gracias!",          en:"I understood! Thank you so very much!"},
      {speaker:"Man",     avatar:"ðŸ‘´", es:"Â¡De nada! Â¡Que le vaya bien!",            en:"You're welcome! Have a great day!"},
    ]
  },
  {
    id:"negotiating",
    title:"Â¡QuÃ© Precio Tan Caro!",
    titleEn:"What an Expensive Price! (Intermediate)",
    emoji:"ðŸ’°",
    color:"#065F46",
    panels:[
      {scene:"Leanne is shopping at the artisan market in Cuenca for a handmade bag.", sceneEs:"Leanne estÃ¡ en el mercado artesanal de Cuenca buscando una bolsa hecha a mano."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Disculpe, Â¿cuÃ¡nto cuesta esta bolsa?",        en:"Excuse me, how much does this bag cost?"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Cuesta cuarenta dÃ³lares, seÃ±ora.",             en:"It costs forty dollars, ma'am."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡Ay, es muy caro! Â¿Puede bajar el precio?",   en:"Oh, that's very expensive! Can you lower the price?"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Es hecha a mano. Mucho trabajo.",              en:"It's handmade. A lot of work."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Entiendo. Â¿CuÃ¡nto es su mejor precio?",       en:"I understand. What is your best price?"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Para usted, treinta y cinco dÃ³lares.",         en:"For you, thirty-five dollars."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Mmm. Â¿Tiene cambio de treinta dÃ³lares?",      en:"Hmm. Do you have change for thirty dollars?"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"SÃ­, tengo cambio. Â¿Quiere la bolsa por treinta?", en:"Yes, I have change. Do you want the bag for thirty?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡Perfecto! Me llevo esta. Â¡Muchas gracias!",  en:"Perfect! I'll take this one. Thank you so much!"},
      {speaker:"Vendor",  avatar:"ðŸ‘©", es:"Â¡Gracias a usted! Â¡Que le vaya muy bien!",    en:"Thank you! Have a wonderful day!"},
      {scene:"Leanne walks away happily with her new bag â€” a real Cuenca treasure!", sceneEs:"Leanne se va feliz con su nueva bolsa â€” Â¡un tesoro de Cuenca!"},
    ]
  },
  {
    id:"planning",
    title:"Â¿QuÃ© Hacemos MaÃ±ana?",
    titleEn:"What Are We Doing Tomorrow? (Intermediate)",
    emoji:"ðŸ“…",
    color:"#7C3AED",
    panels:[
      {scene:"The family is at home in Cuenca planning their week together.", sceneEs:"La familia estÃ¡ en casa en Cuenca planeando su semana."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Â¿QuÃ© quieren hacer maÃ±ana?",                 en:"What do you want to do tomorrow?"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Quiero ir al parque! Me gusta mucho.",       en:"I want to go to the park! I really like it."},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡Yo tambiÃ©n! Â¿Hace buen tiempo maÃ±ana?",      en:"Me too! Is the weather nice tomorrow?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Creo que sÃ­. Por la maÃ±ana hace sol.",        en:"I think so. In the morning it's sunny."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Pero por la tarde puede llover. Es Cuenca.",  en:"But in the afternoon it might rain. It's Cuenca."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡No importa! La lluvia es divertida.",        en:"It doesn't matter! Rain is fun."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Bien. Vamos al parque por la maÃ±ana.",        en:"Good. We'll go to the park in the morning."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Necesito buscar un mercado cerca tambiÃ©n.",   en:"I also need to find a market nearby."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"SÃ© dÃ³nde hay uno. EstÃ¡ muy cerca, a la derecha.", en:"I know where there is one. It's very close, to the right."},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡PapÃ¡ sabe todo! Es muy inteligente.",        en:"Dad knows everything! He's very smart."},
      {speaker:"Victor",  avatar:"ðŸ—ºï¸", es:"Â¡Ja! Aprendo mucho viviendo aquÃ­ en Cuenca.", en:"Ha! I learn a lot living here in Cuenca."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Nosotras tambiÃ©n! Cada dÃ­a aprendemos mÃ¡s.", en:"Us too! Every day we learn more."},
      {scene:"A perfect Cuenca evening â€” planning, laughing, and learning together.", sceneEs:"Una noche perfecta en Cuenca â€” planeando, riendo y aprendiendo juntos."},
    ]
  },
  {
    id:"weather",
    title:"Â¡QuÃ© Clima Raro!",
    titleEn:"What Weird Weather!",
    emoji:"ðŸŒ¦ï¸",
    color:"#1D4ED8",
    panels:[
      {scene:"A beautiful morning in Cuenca â€” but the weather changes fast here!", sceneEs:"Una maÃ±ana bonita en Cuenca â€” Â¡pero el clima cambia rÃ¡pido aquÃ­!"},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"MamÃ¡, Â¿hace frÃ­o hoy?",                   en:"Mom, is it cold today?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"No, hace calor. Â¡Es un dÃ­a muy bonito!",  en:"No, it's hot. It's a very beautiful day!"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡MamÃ¡! Â¿Vamos al parque?",               en:"Mom! Are we going to the park?"},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡SÃ­! Pero lleven agua. Hace mucho calor.",en:"Yes! But bring water. It's very hot."},
      {scene:"At the park, the sky suddenly gets cloudy.", sceneEs:"En el parque, el cielo se pone nublado de repente."},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡Ay! EstÃ¡ nublado ahora.",                en:"Oh! It's cloudy now."},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"MamÃ¡, creo que va a llover.",             en:"Mom, I think it's going to rain."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡SÃ­! Â¡Vamos rÃ¡pido a casa!",             en:"Yes! Let's go home quickly!"},
      {scene:"It starts raining â€” they run and laugh!", sceneEs:"Â¡Empieza a llover â€” corren y se rÃ­en!"},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡EstÃ¡ lloviendo! Â¡Corro muy rÃ¡pido!",    en:"It's raining! I'm running very fast!"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡Yo tambiÃ©n! Â¡EspÃ©rame, Peyton!",        en:"Me too! Wait for me, Peyton!"},
      {scene:"Safe at home, all laughing together.", sceneEs:"En casa, todos se rÃ­en juntos."},
      {speaker:"Leanne",  avatar:"ðŸŒº", es:"Â¡Estamos bien! El clima en Cuenca es especial.",en:"We're fine! The weather in Cuenca is special."},
      {speaker:"Peyton",  avatar:"ðŸ¦‹", es:"Â¡Me gustÃ³ la lluvia! Â¡Fue muy divertido!",en:"I liked the rain! It was so much fun!"},
      {speaker:"Grayson", avatar:"ðŸ¦", es:"Â¡SÃ­! Â¡MaÃ±ana volvemos al parque!",       en:"Yes! Tomorrow we go back to the park!"},
    ]
  },
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const todayStr = () => new Date().toISOString().slice(0, 10);

// â•â• CONFIG â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const AVATARS = ["ðŸ¦","ðŸ¦œ","ðŸ¬","ðŸ¦‹","ðŸŒº","ðŸ¢","ðŸ¦…","ðŸ†","â­","ðŸŒŠ","ðŸ—ºï¸","ðŸ§­","ðŸ¦Š","ðŸ§","ðŸŒ´","ðŸŽ­"];
const PCOLORS = ["#E8445A","#10B981","#8B5CF6","#F59E0B","#3B82F6","#EC4899","#DC6B19","#06B6D4"];
const DS = { fontFamily:"'Nunito', sans-serif", fontWeight:900 };


// â•â• LEVEL PROGRESSION SYSTEM â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
  first_star: {icon:"ðŸŒŸ",name:"First Star",    desc:"Earned your first star!"},
  stars_50:   {icon:"â­",name:"Star Collector",desc:"50 stars earned!"},
  stars_100:  {icon:"ðŸ†",name:"Champion",      desc:"100 stars earned!"},
  stars_250:  {icon:"ðŸ‘‘",name:"Royalty",        desc:"250 stars â€” amazing!"},
  streak_3:   {icon:"ðŸ”¥",name:"On Fire!",       desc:"3-day streak!"},
  streak_7:   {icon:"ðŸ’ª",name:"Week Warrior",   desc:"7 days in a row!"},
  streak_14:  {icon:"ðŸŒ‹",name:"Legend",         desc:"14-day streak!"},
  quiz_10:    {icon:"ðŸŽ¯",name:"Quiz Master",    desc:"10 quiz answers right"},
  speak_5:    {icon:"ðŸŽ¤",name:"Speak Up!",      desc:"5 pronunciation tries"},
  explorer:   {icon:"ðŸŒ",name:"Explorer",       desc:"Played 3 categories"},
  match_win:  {icon:"ðŸ§©",name:"Match Maker",    desc:"Completed a match game"},
  daily_done: {icon:"ðŸ“…",name:"Daily Hero",     desc:"Finished a Daily Challenge"},
  storyteller:{icon:"ðŸ“–",name:"Storyteller",    desc:"Completed a full story!"},
  level2:     {icon:"ðŸš€",name:"Level Up!",      desc:"Unlocked Intermediate level"},
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

// â•â• SUPABASE SETUP â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// â¬‡ï¸  STEP 1: Paste your Supabase Project URL between the quotes below
const SUPABASE_URL = 'https://jlqrxshoilgmcfaitxta.supabase.co'
// â¬‡ï¸  STEP 2: Paste your Supabase anon/public key between the quotes below
const SUPABASE_KEY = 'sb_publishable_5ImngTBY4P21KP3bzBu75Q_FYgl4Pn9'

const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// â•â• FAMILY CODE HELPERS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const makeCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const LS_FAMILY = 'wl_family_id';
const getFamilyId = () => localStorage.getItem(LS_FAMILY);
const setFamilyId = (id) => localStorage.setItem(LS_FAMILY, id);

// â•â• LOAD / SAVE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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

// â•â• SPEECH â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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

// â•â• DAILY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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

// â•â• PRONUNCIATION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const normText=str=>str.toLowerCase().split("").filter(c=>{const code=c.charCodeAt(0);return code<768||code>879;}).join("")"").replace(/[Â¿Â¡.,!?]/g,"").trim();
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
  // Weight toward strict scoring â€” harder threshold
  return Math.min(97,Math.round((exactPct*0.72)+(loosePct*0.28)));
};
const SRClass=typeof window!=="undefined"?(window.SpeechRecognition||window.webkitSpeechRecognition):null;
const BG="linear-gradient(160deg,#0f172a 0%,#1e3a5f 50%,#0d4f3c 100%)";

// â•â• SHARED COMPONENTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function SpeakEsBtn({text,color,size=40,showLabel=false}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEs(text,()=>setOn(false));setTimeout(()=>setOn(false),4000);};
  if(showLabel)return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:20,background:on?color:`${color}18`,border:`2px solid ${color}`,fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:on?"white":color,transition:"all .18s"}}>
      <span style={{fontSize:18}}>{on?"ðŸ”Š":"ðŸ”ˆ"}</span><span>Hear Spanish</span>
    </button>
  );
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?color:`${color}18`,border:`2.5px solid ${color}`,fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"ðŸ”Š":"ðŸ”ˆ"}
    </button>
  );
}

function SpeakEnBtn({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:on?color:`${color}20`,border:`2px solid ${color}60`,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
      {on?"ðŸ”Š":"ðŸ”ˆ"}
    </button>
  );
}

function SpeakEnIconBtn({text,size=40}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:on?"rgba(255,255,255,.9)":"rgba(255,255,255,.25)",border:"2.5px solid rgba(255,255,255,.8)",fontSize:size*.42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",transform:on?"scale(1.12)":"scale(1)"}}>
      {on?"ðŸ”Š":"ðŸ”ˆ"}
    </button>
  );
}

function SpeakEnPill({text,color}){
  const[on,setOn]=useState(false);
  const go=e=>{e.stopPropagation();setOn(true);speakEn(text,()=>setOn(false));setTimeout(()=>setOn(false),3000);};
  return(
    <button onClick={go} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:on?"rgba(255,255,255,.35)":"rgba(255,255,255,.18)",border:"2px solid rgba(255,255,255,.6)",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white",transition:"all .18s"}}>
      <span style={{fontSize:16}}>{on?"ðŸ”Š":"ðŸ”ˆ"}</span><span>Hear English</span>
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
      <span style={{fontSize:18}}>â­</span>
      <span style={{fontSize:18,fontWeight:900,color}}>{count}</span>
    </span>
  );
}

// â•â• FLASHCARD (with memory hook) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>{idx+1} of {words.length} &nbsp;â€¢&nbsp; âœ… {learned.size} learned</div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(learned.size/words.length)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* Memory Hook hint */}
      {word.hook&&!flipped&&(
        <div style={{width:"100%",padding:"10px 14px",borderRadius:16,background:showHook?`${color}12`:"#FFFBEB",border:`1.5px solid ${showHook?color:"#FCD34D"}`}}>
          <button onClick={()=>setShowHook(h=>!h)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"flex-start",gap:8,fontFamily:"inherit",padding:0}}>
            <span style={{fontSize:20,flexShrink:0}}>ðŸ’¡</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:800,color:color,marginBottom:showHook?4:0}}>Memory Hook {showHook?"":"â€” tap to reveal!"}</div>
              {showHook&&<div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{word.hook}</div>}
            </div>
          </button>
          {showHook&&(
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,paddingTop:10,borderTop:`1px solid ${color}20`}}>
              <button onClick={e=>{
                e.stopPropagation();
                // Strip phonetic spelling â€” read only the memory story (before the " â€” " dash)
                const storyPart = word.hook.split(" â€” ")[0].split(" - ")[0];
                speakEnSlow(storyPart);
              }} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:14,background:color,border:"none",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span style={{fontSize:16}}>ðŸ”Š</span><span>Hear the hook!</span>
              </button>
              <span style={{fontSize:12,color:"#6B7280"}}>Tap to hear the memory story!</span>
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

      {!flipped&&<div style={{fontSize:12,color:"#9CA3AF",textAlign:"center"}}>Tap ðŸ”ˆ to hear it Â· Tap ðŸ’¡ for a memory trick Â· Tap card to flip</div>}

      <div style={{display:"flex",gap:10,width:"100%"}}>
        <ActionBtn onClick={()=>navigate(-1,false)} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>â† Back</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,false)}  bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Skip</ActionBtn>
        <ActionBtn onClick={()=>navigate(1,true)}   bg={color}                   style={{flex:1.4}}>Got it! âœ“</ActionBtn>
      </div>
    </div>
  );
}

// â•â• QUIZ â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    // Same-category distractors first â€” forces real knowledge, not category guessing
    // allWords is already the current category's words, making same-cat distractors
    const sameCat = shuffle(allWords.filter(w=>w.en!==word.en));
    // If category has enough words, use all same-cat. Otherwise pad with global pool.
    let wrong;
    if(sameCat.length >= 3){
      wrong = sameCat.slice(0,3);
    } else {
      const globalPool = shuffle([...ALL_WORDS_L1,...ALL_WORDS_L2,...ALL_WORDS_L3].filter(w=>w.en!==word.en&&!sameCat.find(s=>s.en===w.en)));
      wrong = [...sameCat,...globalPool].slice(0,3);
    }
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
          <div style={{fontSize:72}}>ðŸ†</div>
          <div style={{fontSize:26,color,marginTop:8,...DS}}>Â¡Perfecto! All correct!</div>
          <div style={{display:"flex",justifyContent:"center",gap:4,margin:"8px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:28,opacity:earnedStars>=i?1:.2}}>â­</span>)}</div>
          <div style={{fontSize:15,color:"#6B7280",marginTop:4}}>{score} / {total} â€” flawless round!</div>
          <ActionBtn onClick={restart} bg={color} style={{marginTop:20,width:"100%",padding:14,fontSize:16}}>Play Again ðŸ”„</ActionBtn>
        </div>
      );
    }
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:64}}>{pct>=0.9?"ðŸŒŸ":pct>=0.7?"ðŸ‘":"ðŸ’ª"}</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Round Complete!</div>
        <div style={{display:"flex",justifyContent:"center",gap:4,margin:"6px 0"}}>{[1,2,3].map(i=><span key={i} style={{fontSize:24,opacity:earnedStars>=i?1:.2}}>â­</span>)}</div>
        <div style={{fontSize:32,fontWeight:900,color:"#FCD34D",margin:"4px 0"}}>{score}/{total}</div>
        {missedCount>0&&<div style={{fontSize:14,color:"#6B7280",marginBottom:16}}>You missed {missedCount} word{missedCount>1?"s":""}. Practice them below!</div>}
        <div style={{display:"flex",gap:10,flexDirection:"column"}}>
          {missedCount>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:14,fontSize:15}}>Practice Missed Words ðŸ”</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:15}}>Start Over ðŸ”„</ActionBtn>
        </div>
      </div>
    );
  }

  // End of retry pass
  if(isFinished && phase==="retry"){
    return(
      <div style={{textAlign:"center",padding:"32px 16px"}}>
        <div style={{fontSize:72}}>ðŸŽ‰</div>
        <div style={{fontSize:24,color,...DS,marginTop:8}}>Retry Complete!</div>
        <div style={{fontSize:15,color:"#6B7280",margin:"8px 0 20px"}}>Great work practicing the tricky ones!</div>
        <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:14,fontSize:16}}>Start Fresh ðŸ”„</ActionBtn>
      </div>
    );
  }

  if(!word)return null;

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"ðŸ” Retry â€” ":""}
        {idx+1} / {currentQueue.length} &nbsp;â€¢&nbsp; âœ… {score} right
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
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:8,fontWeight:600}}>Tap ðŸ”ˆ on each answer to hear it â€” then choose!</div>
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
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"âœ… Â¡Correcto!":`âŒ It was "${word.en}"`}</div>}
    </div>
  );
}

// â•â• MATCH â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
  if(pairs===total)return(<div style={{textAlign:"center",padding:32}}><div style={{fontSize:72}}>ðŸŽ‰</div><div style={{fontSize:26,color,...DS,margin:"8px 0"}}>Â¡Perfecto!</div><ActionBtn onClick={reset} bg={color} style={{marginTop:8}}>Play Again ðŸ”„</ActionBtn></div>);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Match Spanish ðŸ”— English &nbsp;â€¢&nbsp; {pairs}/{total}</div>
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
                ðŸ”ˆ
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// â•â• SPEAK â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    rec.onerror=()=>{setTranscript("Couldn't hear you â€” try again!");setPct(0);setPhase("result");};
    rec.start();
  },[word,phase,onEarn,onStat]);
  const next=()=>{setPhase("idle");setTranscript("");setPct(null);setIdx(i=>i+1);};
  const rb=pct===null?null:pct===100?{icon:"ðŸ†",msg:"Â¡Perfecto!",clr:"#10B981"}:pct>=75?{icon:"ðŸŒŸ",msg:"Â¡Muy bien!",clr:"#10B981"}:pct>=50?{icon:"ðŸ‘",msg:"Â¡Buen intento!",clr:"#F59E0B"}:{icon:"ðŸ”„",msg:"Try again!",clr:"#EF4444"};
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      {!SRClass&&<div style={{background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:16,padding:"10px 14px",fontSize:13,color:"#92400E",width:"100%",fontWeight:600}}>âš ï¸ Pronunciation mode needs Chrome or Edge.</div>}
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>ðŸŽ¤ Say it in Spanish! &nbsp;â€¢&nbsp; ðŸ”¥ {ss} streak</div>
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
          {phase==="listening"?"â¹":"ðŸŽ¤"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>{phase==="idle"?"Tap the mic and say it in Spanish!":phase==="listening"?"ðŸŽ™ï¸ Listening â€” speak now!":""}</div>
      </React.Fragment>}
      {phase==="result"&&rb&&<div style={{width:"100%",borderRadius:20,padding:18,background:`${rb.clr}12`,border:`2px solid ${rb.clr}`,textAlign:"center"}}>
        <div style={{fontSize:36}}>{rb.icon}</div>
        <div style={{fontSize:20,color:rb.clr,...DS}}>{rb.msg}</div>
        {transcript&&<div style={{marginTop:6,fontSize:12,color:"#6B7280"}}>You said: <em>"{transcript}"</em></div>}
        <div style={{marginTop:4,fontSize:12,fontWeight:700,color:"#9CA3AF"}}>Match: {pct}%</div>
      </div>}
      {phase==="result"&&<div style={{display:"flex",gap:10,width:"100%"}}>
        {pct<55&&<ActionBtn onClick={()=>setPhase("idle")} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>ðŸ”„ Again</ActionBtn>}
        <ActionBtn onClick={next} bg={color} style={{flex:1}}>Next â†’</ActionBtn>
      </div>}
    </div>
  );
}


// â•â• WORD SCRAMBLE GAME â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// See the emoji + English, unscramble the Spanish letters by tapping
function ScrambleMode({words,color,onEarn,onStat}){
  const queue = useRef(shuffle(words.filter(w=>w.es.length<=12&&!w.es.includes(" ")).length>=4
    ? words.filter(w=>w.es.length<=12&&!w.es.includes(" "))
    : words.filter(w=>!w.es.includes(" "))));
  const[idx,setIdx]=useState(0);
  const[phase,setPhase]=useState("playing"); // playing|correct|wrong|done
  const[scrambled,setScrambled]=useState([]);
  const[chosen,setChosen]=useState([]);
  const[score,setScore]=useState(0);
  const[shake,setShake]=useState(false);

  const word=queue.current[idx%queue.current.length];

  const makeScramble=(w)=>{
    const letters=w.es.split("").map((ch,i)=>({ch,id:`${i}_${ch}`}));
    // Ensure scrambled is different from original
    let s=shuffle(letters);
    let tries=0;
    while(s.map(l=>l.ch).join("")===w.es&&tries<10){s=shuffle(letters);tries++;}
    return s;
  };

  useEffect(()=>{
    if(!word)return;
    setScrambled(makeScramble(word));
    setChosen([]);setPhase("playing");
    speakEs(word.es);
  },[idx]);

  const pickLetter=(letter,fromBank)=>{
    if(phase!=="playing")return;
    if(fromBank){
      setScrambled(p=>p.filter(l=>l.id!==letter.id));
      setChosen(p=>[...p,letter]);
    } else {
      setChosen(p=>p.filter(l=>l.id!==letter.id));
      setScrambled(p=>[...p,letter]);
    }
  };

  // Check answer when all letters placed
  useEffect(()=>{
    if(phase!=="playing"||scrambled.length>0)return;
    const answer=chosen.map(l=>l.ch).join("");
    if(answer===word.es){
      setPhase("correct");setScore(s=>s+1);onEarn(3);onStat("quiz");
      speakEs(word.es);
      setTimeout(()=>setIdx(i=>i+1),1800);
    } else {
      setShake(true);setTimeout(()=>setShake(false),600);
      setPhase("wrong");
    }
  },[scrambled,chosen,phase,word]);

  const clearAnswer=()=>{
    setScrambled([...scrambled,...chosen]);setChosen([]);setPhase("playing");
  };
  const skip=()=>setIdx(i=>i+1);

  const total=queue.current.length;

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        ðŸ”¤ Unscramble the Spanish! &nbsp;â€¢&nbsp; âœ… {score} right &nbsp;â€¢&nbsp; {idx}/{total}
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/total)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* Clue card */}
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"22px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:72}}>{word.emoji}</div>
        <div style={{fontSize:24,...DS,color:"#1F2937",marginTop:6}}>{word.en}</div>
        <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}>
          <SpeakEsBtn text={word.es} color={color} size={38}/>
          <span style={{fontSize:12,color:"#9CA3AF"}}>Hear the answer</span>
        </div>
      </div>

      {/* Answer slots */}
      <div style={{
        display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,
        minHeight:56,width:"100%",padding:"12px",
        borderRadius:16,
        background:phase==="correct"?"#D1FAE5":phase==="wrong"?"#FEE2E2":"#F8FAFC",
        border:`2px solid ${phase==="correct"?"#10B981":phase==="wrong"?"#EF4444":"#E5E7EB"}`,
        transition:"all .2s",
        animation:shake?"shake .3s ease":"none",
      }}>
        {chosen.length===0
          ? <span style={{fontSize:13,color:"#9CA3AF",alignSelf:"center"}}>Tap letters below to build the word</span>
          : chosen.map(l=>(
              <button key={l.id} onClick={()=>phase==="playing"&&pickLetter(l,false)} style={{
                width:40,height:44,borderRadius:10,background:color,border:"none",
                fontSize:20,fontWeight:900,color:"white",cursor:phase==="playing"?"pointer":"default",
                fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 2px 8px ${color}40`,
              }}>{l.ch}</button>
            ))
        }
      </div>

      {/* Result message */}
      {phase==="correct"&&<div style={{fontSize:16,color:"#10B981",fontWeight:800}}>âœ… Â¡Perfecto! {word.es}</div>}
      {phase==="wrong"&&<div style={{fontSize:14,color:"#EF4444",fontWeight:700}}>Not quite â€” try a different order!</div>}

      {/* Letter bank */}
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,padding:"4px"}}>
        {scrambled.map(l=>(
          <button key={l.id} onClick={()=>phase==="playing"&&pickLetter(l,true)} style={{
            width:44,height:48,borderRadius:10,background:"white",
            border:`2px solid ${color}60`,fontSize:22,fontWeight:900,
            color:"#1F2937",cursor:phase==="playing"?"pointer":"default",
            fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 2px 6px rgba(0,0,0,.08)",transition:"transform .1s",
          }}>{l.ch}</button>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:10,width:"100%"}}>
        {chosen.length>0&&phase==="playing"&&(
          <ActionBtn onClick={clearAnswer} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>
            Clear â†º
          </ActionBtn>
        )}
        {phase==="wrong"&&(
          <ActionBtn onClick={clearAnswer} bg="#F59E0B" style={{flex:1}}>Try Again ðŸ”„</ActionBtn>
        )}
        <ActionBtn onClick={skip} bg={phase==="wrong"?color:"#F9FAFB"} color={phase==="wrong"?"white":"#6B7280"} style={{flex:1,border:phase==="wrong"?"none":"2px solid #E5E7EB"}}>
          {phase==="wrong"?"Show Answer & Skip â†’":"Skip â†’"}
        </ActionBtn>
      </div>
    </div>
  );
}


// â•â• LEVEL FINAL EXAM â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Two-part exam: comprehension + production
// Part 1 (Q1-15): Hear/see Spanish â†’ choose English answer
// Part 2 (Q16-25): See English â†’ type Spanish from memory
// Need 80% overall to unlock next level
function LevelExamScreen({level,profile,onBack,onPass,onFail}){
  const vocab=level>=3?VOCAB_L3:level>=2?VOCAB_L2:VOCAB_L1;
  const allLevelWords=Object.values(vocab).flatMap(c=>c.words);
  const globalAll=[...ALL_WORDS_L1,...ALL_WORDS_L2,...ALL_WORDS_L3];
  const COMP_COUNT=Math.min(15,Math.floor(allLevelWords.length*0.6)); // comprehension questions
  const PROD_COUNT=Math.min(10,allLevelWords.length-COMP_COUNT);       // production questions
  const TOTAL=COMP_COUNT+PROD_COUNT;
  const PASS_SCORE=0.8;

  const shuffled=shuffle(allLevelWords);
  const[compQueue]=useState(()=>shuffled.slice(0,COMP_COUNT));
  const[prodQueue]=useState(()=>shuffled.slice(COMP_COUNT,COMP_COUNT+PROD_COUNT));

  const[phase,setPhase]=useState("intro"); // intro|comp|prod|done
  const[compIdx,setCompIdx]=useState(0);
  const[prodIdx,setProdIdx]=useState(0);
  const[opts,setOpts]=useState([]);
  const[selected,setSelected]=useState(null);
  const[typed,setTyped]=useState("");
  const[writeResult,setWriteResult]=useState(null); // null|correct|close|wrong
  const[score,setScore]=useState(0);

  const compWord=compQueue[compIdx];
  const prodWord=prodQueue[prodIdx];

  // Set up comprehension options
  useEffect(()=>{
    if(phase!=="comp"||!compWord)return;
    const catWords=allLevelWords.filter(w=>w.en!==compWord.en);
    const cross=globalAll.filter(w=>w.en!==compWord.en&&!catWords.find(c=>c.en===w.en));
    const sameCat=shuffle(catWords).slice(0,2);
    const crossCat=shuffle(cross).slice(0,1);
    setOpts(shuffle([compWord,...sameCat,...crossCat].slice(0,4)));
    setSelected(null);
    speakEs(compWord.es);
  },[compIdx,phase]);

  // Set up production
  useEffect(()=>{
    if(phase!=="prod")return;
    setTyped("");setWriteResult(null);
  },[prodIdx,phase]);

  const pickComp=opt=>{
    if(selected)return;
    setSelected(opt);
    if(opt.en===compWord.en)setScore(s=>s+1);
    setTimeout(()=>{
      if(compIdx<COMP_COUNT-1)setCompIdx(i=>i+1);
      else{setPhase("prod");}
    },1200);
  };

  const checkProd=()=>{
    if(!prodWord||writeResult)return;
    const userAns=typed.trim().toLowerCase().split("").filter(c=>{const code=c.charCodeAt(0);return code<768||code>879;}).join("")"").replace(/[Â¿Â¡.,!?]/g,"");
    const correct=prodWord.es.toLowerCase().split("").filter(c=>{const code=c.charCodeAt(0);return code<768||code>879;}).join("")"").replace(/[Â¿Â¡.,!?]/g,"");
    const editDist=(a,b)=>{
      const m=a.length,n=b.length;
      const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j));
      for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)
        dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
      return dp[m][n];
    };
    if(userAns===correct){
      setWriteResult("correct");setScore(s=>s+1);speakEs(prodWord.es);
      setTimeout(()=>advance(),1800);
    } else if(editDist(userAns,correct)<=2){
      setWriteResult("close");
    } else {
      setWriteResult("wrong");
    }
  };

  const advance=()=>{
    if(prodIdx<PROD_COUNT-1){setProdIdx(i=>i+1);}
    else{setPhase("done");}
  };

  if(phase==="intro")return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:400}}>
        <div style={{fontSize:64}}>ðŸ†</div>
        <div style={{fontSize:26,color:"white",margin:"8px 0",...DS}}>
          {level===1?"â­ Level 1":level===2?"ðŸš€ Level 2":"ðŸ”¥ Level 3"} Final Exam
        </div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginBottom:20,lineHeight:1.6}}>
          This exam has two parts to test both sides of your Spanish:<br/>
          <span style={{color:"#93C5FD"}}>ðŸ“– Part 1 â€” {COMP_COUNT} questions:</span> Hear the Spanish, choose the English meaning<br/>
          <span style={{color:"#86EFAC"}}>âœï¸ Part 2 â€” {PROD_COUNT} questions:</span> See the English, write the Spanish from memory<br/><br/>
          Need <strong style={{color:"#FCD34D"}}>80%</strong> ({Math.ceil(TOTAL*0.8)}/{TOTAL}) to unlock the next level. Good luck!
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <ActionBtn onClick={()=>setPhase("comp")} bg="#FCD34D" color="#1F2937" style={{width:"100%",padding:16,fontSize:16}}>
            Start Exam! ðŸš€
          </ActionBtn>
          <ActionBtn onClick={onBack} bg="rgba(255,255,255,.12)" style={{width:"100%",padding:14}}>
            Not ready yet â€” Back
          </ActionBtn>
        </div>
      </div>
    </div>
  );

  if(phase==="done"){
    const pct=score/TOTAL;
    const passed=pct>=PASS_SCORE;
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{textAlign:"center",background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",borderRadius:28,padding:36,width:"100%",maxWidth:400}}>
          <div style={{fontSize:72}}>{passed?"ðŸ†":"ðŸ’ª"}</div>
          <div style={{fontSize:28,color:"white",margin:"8px 0",...DS}}>
            {passed?"Level Complete!":"Not Quite Yet!"}
          </div>
          <div style={{fontSize:48,fontWeight:900,color:passed?"#FCD34D":"#F87171",margin:"8px 0"}}>{score}/{TOTAL}</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginBottom:8}}>
            {passed
              ?`${Math.round(pct*100)}% â€” Â¡Excelente! Next level unlocked! ðŸŽ‰`
              :`You need ${Math.round(PASS_SCORE*100)}% (${Math.ceil(PASS_SCORE*TOTAL)} correct). You got ${Math.round(pct*100)}%. Keep practicing both the quiz AND the write modes!`}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>
            {passed
              ?<ActionBtn onClick={()=>onPass(level)} bg="#10B981" style={{width:"100%",padding:16,fontSize:16}}>
                Unlock Level {level+1}! ðŸš€
              </ActionBtn>
              :<ActionBtn onClick={()=>setPhase("intro")} bg="#F59E0B" style={{width:"100%",padding:16,fontSize:15}}>
                Try Again ðŸ”„
              </ActionBtn>}
            <ActionBtn onClick={onBack} bg="rgba(255,255,255,.15)" style={{width:"100%",padding:14}}>Back to Home</ActionBtn>
          </div>
        </div>
      </div>
    );
  }

  // â”€â”€ PART 1: COMPREHENSION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if(phase==="comp"&&compWord)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{flex:1}}>
          <div style={{fontSize:16,color:"white",...DS}}>ðŸ“– Part 1 â€” Comprehension</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Hear the Spanish â†’ choose the English</div>
        </div>
        <div style={{fontSize:13,color:"#93C5FD",fontWeight:900}}>{compIdx+1}/{COMP_COUNT}</div>
      </div>
      <div style={{flex:1,padding:"20px 14px"}}>
        <div style={{width:"100%",height:6,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:16}}>
          <div style={{height:"100%",borderRadius:99,background:"#93C5FD",width:`${(compIdx/COMP_COUNT)*100}%`,transition:"width .4s"}}/>
        </div>
        <div style={{background:"white",borderRadius:24,padding:"22px 20px",border:"3px solid #93C5FD",boxShadow:"0 8px 28px rgba(0,0,0,.3)",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:8}}>WHAT DOES THIS MEAN?</div>
          <div style={{fontSize:28,color:"#1F2937",...DS}}>{compWord.es}</div>
          <div style={{display:"flex",justifyContent:"center",marginTop:10,gap:8,alignItems:"center"}}>
            <SpeakEsBtn text={compWord.es} color="#3B82F6" size={40}/>
            <span style={{fontSize:13,color:"#9CA3AF"}}>Tap to hear</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {opts.map((opt,i)=>{
            const isC=opt.en===compWord.en,isCh=selected?.en===opt.en;
            let bg="white",border="#E5E7EB";
            if(selected){if(isC){bg="#D1FAE5";border="#10B981";}else if(isCh){bg="#FEE2E2";border="#EF4444";}}
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderRadius:16,background:bg,border:`2px solid ${border}`,transition:"all .2s"}}>
                <button onClick={()=>pickComp(opt)} style={{flex:1,background:"none",border:"none",textAlign:"left",fontSize:16,fontWeight:700,cursor:selected?"default":"pointer",color:"#1F2937",fontFamily:"inherit",padding:0,lineHeight:1.3}}>{opt.en}</button>
                <SpeakEnBtn text={opt.en} color={selected&&isC?"#10B981":"#3B82F6"}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // â”€â”€ PART 2: PRODUCTION â€” type OR speak, player's choice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if(phase==="prod"&&prodWord){
    const rColors={correct:"#10B981",close:"#F59E0B",wrong:"#EF4444"};
    const rMsgs={
      correct:"âœ… Â¡Perfecto!",
      close:`âœ¨ Almost! It's: ${prodWord.es}`,
      wrong:`âŒ The answer: ${prodWord.es}`,
    };
    return(
      <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontSize:16,color:"white",...DS}}>âœï¸ðŸŽ¤ Part 2 â€” Production</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>See English â†’ type OR say the Spanish from memory</div>
          </div>
          <div style={{fontSize:13,color:"#86EFAC",fontWeight:900}}>{prodIdx+1}/{PROD_COUNT}</div>
        </div>
        <div style={{flex:1,padding:"20px 14px"}}>
          <div style={{width:"100%",height:6,background:"rgba(255,255,255,.1)",borderRadius:99,marginBottom:16}}>
            <div style={{height:"100%",borderRadius:99,background:"#86EFAC",width:`${(prodIdx/PROD_COUNT)*100}%`,transition:"width .4s"}}/>
          </div>

          {/* Clue card */}
          <div style={{background:"white",borderRadius:24,padding:"24px 20px",border:"3px solid #86EFAC",boxShadow:"0 8px 28px rgba(0,0,0,.3)",textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:10}}>SAY OR TYPE THIS IN SPANISH</div>
            <div style={{fontSize:60}}>{prodWord.emoji}</div>
            <div style={{fontSize:26,color:"#1F2937",marginTop:8,...DS}}>{prodWord.en}</div>
          </div>

          {/* Result display â€” shown after either method */}
          {writeResult&&(
            <React.Fragment>
              <div style={{textAlign:"center",fontSize:16,fontWeight:800,color:rColors[writeResult],marginBottom:12,lineHeight:1.4}}>
                {rMsgs[writeResult]}
              </div>
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                {writeResult!=="correct"&&(
                  <ActionBtn onClick={()=>{setTyped("");setWriteResult(null);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>Try Again</ActionBtn>
                )}
                <ActionBtn onClick={advance} bg="#10B981" style={{flex:1,padding:14}}>Next â†’</ActionBtn>
              </div>
            </React.Fragment>
          )}

          {/* â”€â”€ OPTION 1: TYPE IT â”€â”€ */}
          {!writeResult&&(
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textAlign:"center",marginBottom:8,letterSpacing:.5}}>
                âœï¸ TYPE IT
              </div>
              <div style={{display:"flex",gap:8}}>
                <input
                  value={typed}
                  onChange={e=>setTyped(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&typed.trim()&&checkProd()}
                  placeholder="Type the Spanish..."
                  style={{flex:1,padding:"14px 16px",borderRadius:16,border:"2px solid rgba(134,239,172,.5)",fontSize:18,fontFamily:"inherit",fontWeight:700,color:"#1F2937",outline:"none",background:"white",textAlign:"center"}}
                />
                <ActionBtn onClick={checkProd} bg={typed.trim()?"#10B981":"#9CA3AF"} style={{padding:"14px 16px",fontSize:14,opacity:typed.trim()?1:.4,flexShrink:0}}>
                  âœ“
                </ActionBtn>
              </div>
            </div>
          )}

          {/* â”€â”€ DIVIDER â”€â”€ */}
          {!writeResult&&SRClass&&(
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.15)"}}/>
              <span style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700}}>OR</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.15)"}}/>
            </div>
          )}

          {/* â”€â”€ OPTION 2: SAY IT (mic) â”€â”€ */}
          {!writeResult&&SRClass&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>
                ðŸŽ¤ SAY IT
              </div>
              <MicButton
                onResult={(heard)=>{
                  // Score the spoken answer same as written
                  const userAns=normText(heard);
                  const correct=normText(prodWord.es);
                  const editDist=(a,b)=>{
                    const m=a.length,n=b.length;
                    const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j));
                    for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)
                      dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
                    return dp[m][n];
                  };
                  const pctMatch=scoreMatch(heard,prodWord.es);
                  if(pctMatch>=85||userAns===correct){
                    setWriteResult("correct");setScore(s=>s+1);speakEs(prodWord.es);
                    setTimeout(()=>advance(),1800);
                  } else if(pctMatch>=55||editDist(userAns,correct)<=2){
                    setWriteResult("close");
                  } else {
                    setWriteResult("wrong");
                  }
                }}
                color="#10B981"
              />
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Tap mic and say the Spanish word</div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

// Helper mic button for use inside exam
function MicButton({onResult,color}){
  const[listening,setListening]=useState(false);
  const recRef=useRef(null);
  const start=()=>{
    if(!SRClass||listening)return;
    setListening(true);
    const rec=new SRClass();
    rec.lang="es-MX";rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    recRef.current=rec;
    rec.onresult=e=>{
      const alts=Array.from(e.results[0]);
      const best=alts.reduce((b,a)=>{const s=scoreMatch(a.transcript,"");return{s:0,t:a.transcript}},{s:0,t:""});
      const heard=alts[0]?.transcript||"";
      setListening(false);
      onResult(heard);
    };
    rec.onerror=()=>{setListening(false);onResult("");};
    rec.start();
  };
  const stop=()=>{recRef.current?.stop();setListening(false);};
  return(
    <button onClick={listening?stop:start} style={{width:80,height:80,borderRadius:"50%",background:listening?"linear-gradient(135deg,#EF4444,#DC2626)":`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:34,cursor:"pointer",boxShadow:listening?"0 0 0 8px #EF444420":`0 6px 20px ${color}50`,transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {listening?"â¹":"ðŸŽ¤"}
    </button>
  );
}


// â•â• SAY IT MODE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// See English + emoji â†’ speak the Spanish from memory (no written Spanish shown)
// The hardest and most valuable production skill
function SayItMode({words,color,onEarn,onStat}){
  const queue = useRef(shuffle(words));
  const[idx,setIdx]=useState(0);
  const[phase,setPhase]=useState("ready"); // ready|listening|result
  const[transcript,setTranscript]=useState("");
  const[pct,setPct]=useState(null);
  const[streak,setStreak]=useState(0);
  const[showSpanish,setShowSpanish]=useState(false);
  const recRef=useRef(null);
  const word=queue.current[idx%queue.current.length];

  useEffect(()=>{
    setPhase("ready");setTranscript("");setPct(null);setShowSpanish(false);
  },[idx]);

  const startListening=useCallback(()=>{
    if(!SRClass||phase==="listening")return;
    setPhase("listening");setTranscript("");setPct(null);setShowSpanish(false);
    const rec=new SRClass();
    rec.lang="es-MX";rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
    recRef.current=rec;
    rec.onresult=e=>{
      const alts=Array.from(e.results[0]);
      const best=alts.reduce((b,a)=>{
        const s=scoreMatch(a.transcript,word.es);
        return s>b.s?{s,t:a.transcript}:b;
      },{s:0,t:alts[0]?.transcript||""});
      setTranscript(alts.slice(0,2).map(a=>a.transcript).join(" / "));
      setPct(best.s);
      onStat("speak");
      if(best.s>=60){setStreak(n=>n+1);onEarn(3);}
      else setStreak(0);
      setPhase("result");
    };
    rec.onerror=()=>{
      setTranscript("Couldn't hear you â€” try again!");
      setPct(0);setPhase("result");
    };
    rec.start();
  },[word,phase,onEarn,onStat]);

  const next=()=>{setIdx(i=>i+1);};
  const reveal=()=>{speakEs(word.es);setShowSpanish(true);};

  const rb=pct===null?null
    :pct>=90?{icon:"ðŸ†",msg:"Â¡Perfecto!",clr:"#10B981"}
    :pct>=70?{icon:"ðŸŒŸ",msg:"Â¡Muy bien!",clr:"#10B981"}
    :pct>=55?{icon:"ðŸ‘",msg:"Â¡Buen intento!",clr:"#F59E0B"}
    :{icon:"ðŸ”„",msg:"Keep practicing!",clr:"#EF4444"};

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      {!SRClass&&(
        <div style={{background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:16,padding:"10px 14px",fontSize:13,color:"#92400E",width:"100%",fontWeight:600}}>
          âš ï¸ This mode needs Chrome or Edge browser for the microphone.
        </div>
      )}

      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        ðŸ—£ï¸ Say it in Spanish from memory! &nbsp;â€¢&nbsp; ðŸ”¥ {streak} streak
      </div>

      {/* Clue card â€” English only, NO written Spanish */}
      <div style={{width:"100%",background:"white",borderRadius:24,padding:"28px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:12}}>
          WHAT IS THIS IN SPANISH?
        </div>
        <div style={{fontSize:80,lineHeight:1}}>{word.emoji}</div>
        <div style={{fontSize:28,color:"#1F2937",marginTop:10,...DS}}>{word.en}</div>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:6}}>
          Say the Spanish word â€” no peeking!
        </div>

        {/* Reveal button â€” shows Spanish after attempting */}
        {(phase==="result"||showSpanish)&&(
          <div style={{marginTop:14,padding:"10px 16px",background:`${color}10`,borderRadius:14,border:`1.5px solid ${color}30`}}>
            {showSpanish
              ?<><div style={{fontSize:22,color,...DS}}>{word.es}</div>
                <button onClick={()=>speakEs(word.es)} style={{marginTop:6,padding:"6px 14px",borderRadius:10,background:color,border:"none",color:"white",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>ðŸ”Š Hear it</button></>
              :<button onClick={reveal} style={{padding:"8px 16px",borderRadius:12,background:`${color}20`,border:`1.5px solid ${color}`,color,fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
                ðŸ‘ï¸ Reveal Answer
              </button>
            }
          </div>
        )}
      </div>

      {/* Mic button */}
      {SRClass&&(
        <React.Fragment>
          <button
            onClick={phase==="listening"
              ?()=>{recRef.current?.stop();setPhase("ready");}
              :startListening}
            style={{
              width:110,height:110,borderRadius:"50%",
              background:phase==="listening"
                ?"linear-gradient(135deg,#EF4444,#DC2626)"
                :`linear-gradient(135deg,${color},${color}cc)`,
              border:"none",fontSize:48,cursor:"pointer",
              boxShadow:phase==="listening"
                ?"0 0 0 10px #EF444420,0 8px 28px #EF444450"
                :`0 8px 28px ${color}50`,
              transition:"all .22s",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>
            {phase==="listening"?"â¹":"ðŸŽ¤"}
          </button>
          <div style={{fontSize:13,color:"#9CA3AF",textAlign:"center"}}>
            {phase==="ready"&&"Tap the mic and say it in Spanish!"}
            {phase==="listening"&&"ðŸŽ™ï¸ Listening â€” speak now!"}
          </div>
        </React.Fragment>
      )}

      {/* Result */}
      {phase==="result"&&rb&&(
        <div style={{width:"100%",borderRadius:20,padding:"16px 18px",background:`${rb.clr}12`,border:`2px solid ${rb.clr}`,textAlign:"center"}}>
          <div style={{fontSize:36}}>{rb.icon}</div>
          <div style={{fontSize:20,color:rb.clr,...DS}}>{rb.msg}</div>
          {transcript&&(
            <div style={{marginTop:6,fontSize:13,color:"#6B7280"}}>
              You said: <em>"{transcript}"</em>
            </div>
          )}
          <div style={{marginTop:4,fontSize:12,fontWeight:700,color:"#9CA3AF"}}>
            Match: {pct}%
          </div>
        </div>
      )}

      {/* Navigation */}
      {(phase==="result"||phase==="ready")&&(
        <div style={{display:"flex",gap:10,width:"100%"}}>
          {!showSpanish&&phase==="ready"&&(
            <ActionBtn onClick={reveal} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>
              ðŸ‘ï¸ Reveal
            </ActionBtn>
          )}
          {phase==="result"&&pct<60&&(
            <ActionBtn onClick={()=>{setPhase("ready");setTranscript("");setPct(null);}} bg="#F9FAFB" color="#6B7280" style={{flex:1,border:"2px solid #E5E7EB"}}>
              ðŸ”„ Again
            </ActionBtn>
          )}
          <ActionBtn onClick={next} bg={color} style={{flex:1,padding:"14px 0"}}>
            Next â†’
          </ActionBtn>
        </div>
      )}
    </div>
  );
}

// â•â• STORY LIST SCREEN â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function StoryListScreen({onBack,onStory,profile}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{fontSize:20,color:"white",...DS}}>ðŸ“– Stories</div>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:4}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:12,lineHeight:1.5}}>
          Real conversations from Cuenca! Tap any line to hear it spoken. Use the English hint if you need help. ðŸŽ§
        </div>
        {STORIES.map(story=>(
          <button key={story.id} onClick={()=>onStory(story)} style={{width:"100%",padding:"18px",borderRadius:20,background:"rgba(255,255,255,.08)",border:`2px solid ${story.color}40`,cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",marginBottom:10}}>
            <div style={{width:56,height:56,borderRadius:16,background:`${story.color}30`,border:`2px solid ${story.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{story.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:17,color:"white",...DS}}>{story.title}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>{story.titleEn} &nbsp;â€¢&nbsp; {story.panels.length} lines</div>
            </div>
            <div style={{fontSize:22,color:story.color}}>â€º</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// â•â• STORY SCREEN â€” full comic strip with per-line audio â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
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
            <div style={{fontSize:48,marginBottom:8}}>ðŸŽ¬</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,.85)",lineHeight:1.6,fontStyle:"italic"}}>
              {panel.scene}
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:14,gap:10}}>
              <button onClick={()=>speakEs(panel.sceneEs)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:20,background:story.color,border:"none",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:"white"}}>
                <span>ðŸ”Š</span><span>Hear in Spanish</span>
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
                <span style={{fontSize:18}}>ðŸ”Š</span><span>Hear it!</span>
              </button>
              <button onClick={()=>setShowEn(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:20,background:showEn?"#6B7280":"rgba(107,114,128,.15)",border:"2px solid #6B7280",fontSize:14,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:showEn?"white":"#374151",flex:1}}>
                <span>{showEn?"ðŸ‘ï¸":"ðŸ‘ï¸"}</span><span>{showEn?"Hide English":"Show English"}</span>
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
          <ActionBtn onClick={prev} bg="rgba(255,255,255,.1)" color="rgba(255,255,255,.7)" style={{flex:1,opacity:idx===0?.4:1}}>â† Back</ActionBtn>
          <ActionBtn onClick={next} bg={story.color} style={{flex:1.6,padding:"14px 20px",fontSize:16}}>
            {isLast?"Finish Story! ðŸŽ‰":"Next â†’"}
          </ActionBtn>
        </div>
      </div>
    </div>
  );
}


// â•â• FAMILY SETUP SCREEN (first launch only) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    else { setError("Code not found â€” double-check spelling and try again!"); setLoading(false); }
  };

  if (createdCode) return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ textAlign:"center", background:"rgba(255,255,255,.1)", backdropFilter:"blur(12px)", borderRadius:28, padding:36, width:"100%", maxWidth:380 }}>
        <div style={{ fontSize:56 }}>ðŸŽ‰</div>
        <div style={{ fontSize:26, color:"white", marginTop:8, ...DS }}>Family Created!</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", marginTop:8, marginBottom:20 }}>
          Your family code is below. Write it down or take a screenshot â€” share it with anyone you want to join your leaderboard!
        </div>
        <div style={{ background:"#FCD34D", borderRadius:20, padding:"16px 24px", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#78350F", letterSpacing:1, marginBottom:4 }}>YOUR FAMILY CODE</div>
          <div style={{ fontSize:48, fontWeight:900, color:"#1F2937", letterSpacing:8 }}>{createdCode}</div>
        </div>
        <ActionBtn onClick={onDone} bg="#10B981" style={{ width:"100%", padding:16, fontSize:16 }}>
          Let's Start Playing! ðŸŒ
        </ActionBtn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <div style={{ paddingBottom:32, textAlign:"center" }}>
        <div style={{ fontSize:56 }}>ðŸŒ</div>
        <div style={{ fontSize:32, color:"white", lineHeight:1, marginTop:8, ...DS }}>Wander Lingo</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.6)", marginTop:8 }}>
          First, let's set up your family group!
        </div>
      </div>

      {!mode && (
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={() => setMode('create')} style={{ padding:"20px", borderRadius:20, background:"#2563EB", border:"none", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>âœ¨</span>
            <div style={{ textAlign:"left" }}>
              <div>Create a New Family</div>
              <div style={{ fontSize:12, fontWeight:500, opacity:.8, marginTop:2 }}>First time? Start here</div>
            </div>
          </button>
          <button onClick={() => setMode('join')} style={{ padding:"20px", borderRadius:20, background:"rgba(255,255,255,.1)", border:"2px solid rgba(255,255,255,.3)", color:"white", fontSize:17, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>ðŸ”‘</span>
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
            {loading ? "Creating..." : "Create Family! ðŸŽ‰"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>â† Back</button>
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
            {loading ? "Joining..." : "Join Family! ðŸ”‘"}
          </ActionBtn>
          <button onClick={() => setMode(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>â† Back</button>
        </div>
      )}
    </div>
  );
}

// â•â• LISTEN MODE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
        <div style={{fontSize:64}}>{score===queue.length?"ðŸ†":score>queue.length*0.7?"ðŸŒŸ":"ðŸ’ª"}</div>
        <div style={{fontSize:22,color,...DS,marginTop:8}}>Listen Round Done!</div>
        <div style={{fontSize:36,fontWeight:900,color:"#FCD34D",margin:"6px 0"}}>{score}/{queue.length}</div>
        <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>{mc>0?`Missed ${mc} â€” practice them!`:"Perfect ears! Â¡IncreÃ­ble!"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {mc>0&&<ActionBtn onClick={()=>{setPhase("retry");setIdx(0);setSelected(null);}} bg="#F59E0B" style={{width:"100%",padding:12}}>Practice Missed ðŸ”</ActionBtn>}
          <ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12}}>Start Over ðŸ”„</ActionBtn>
        </div>
      </div>
    );
    return(<div style={{textAlign:"center",padding:"28px 16px"}}><div style={{fontSize:64}}>ðŸŽ‰</div><div style={{fontSize:22,color,...DS,marginTop:8}}>Retry Done!</div><ActionBtn onClick={restart} bg={color} style={{width:"100%",padding:12,marginTop:16}}>Start Fresh ðŸ”„</ActionBtn></div>);
  }

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>Speed:</span>
        {[{id:"normal",label:"ðŸ¢ Slow & Clear"},{id:"fast",label:"âš¡ Real Speed"}].map(s=>(
          <button key={s.id} onClick={()=>setSpeed(s.id)} style={{padding:"5px 12px",borderRadius:16,background:speed===s.id?color:"#F3F4F6",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",color:speed===s.id?"white":"#6B7280"}}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{fontSize:12,color:"#9CA3AF",fontWeight:700}}>
        {phase==="retry"?"ðŸ” Retry â€” ":""}{idx+1}/{currentQueue.length} &nbsp;â€¢&nbsp; âœ… {score} right
      </div>
      <div style={{width:"100%",height:6,background:"#F3F4F6",borderRadius:99}}>
        <div style={{height:"100%",borderRadius:99,background:color,width:`${(idx/currentQueue.length)*100}%`,transition:"width .4s"}}/>
      </div>

      <div style={{width:"100%",background:"white",borderRadius:24,padding:"28px 20px",border:`3px solid ${color}`,boxShadow:`0 8px 28px ${color}30`,textAlign:"center"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#9CA3AF",letterSpacing:.5,marginBottom:14}}>ðŸ‘‚ LISTEN â€” WHAT DO YOU HEAR?</div>
        <button onClick={()=>playWord(speed)} style={{width:96,height:96,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}cc)`,border:"none",fontSize:40,cursor:"pointer",boxShadow:`0 8px 28px ${color}50`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
          {played?"ðŸ”Š":"â–¶ï¸"}
        </button>
        <div style={{fontSize:13,color:"#9CA3AF",marginTop:10}}>
          {played?"Tap to hear again!":"Tap â–¶ï¸ to hear the Spanish word"}
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
        {!played?"Tap â–¶ï¸ first â€” then choose the English meaning!":"Choose the English meaning:"}
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
      {selected&&<div style={{fontSize:13,color:selected.en===word.en?"#10B981":"#EF4444",fontWeight:800,textAlign:"center"}}>{selected.en===word.en?"âœ… Â¡Correcto! Your ears are sharp!":"âŒ Keep training! It was \""+word.en+"\""}</div>}
    </div>
  );
}

// â•â• PROFILE SELECT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function ProfileSelectScreen({profiles,onSelect,onCreate}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px 40px"}}>
      <div style={{paddingTop:52,textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56}}>ðŸŒ</div>
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
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>â­ {p.stars}</span>
                {p.streak>0&&<span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>ðŸ”¥ {p.streak}d</span>}
                <span style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>ðŸ… {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.15)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Level {p.level||1}</span>
              </div>
            </div>
            <div style={{fontSize:24,color:p.color}}>â€º</div>
          </button>
        ))}
        <button onClick={onCreate} style={{width:"100%",padding:"16px 20px",borderRadius:20,background:"rgba(255,255,255,.06)",border:"2.5px dashed rgba(255,255,255,.3)",cursor:"pointer",color:"rgba(255,255,255,.7)",fontSize:16,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:24}}>ï¼‹</span> Add New Player
        </button>
      </div>
    </div>
  );
}

// â•â• CREATE PROFILE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function CreateProfileScreen({onDone,onBack}){
  const[name,setName]=useState("");
  const[avatar,setAvatar]=useState(AVATARS[0]);
  const[color,setColor]=useState(PCOLORS[0]);
  const valid=name.trim().length>0;
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 20px 40px"}}>
      <div style={{width:"100%",maxWidth:400}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:24,cursor:"pointer",marginBottom:16,fontFamily:"inherit"}}>â† Back</button>
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
        <ActionBtn onClick={()=>valid&&onDone(name.trim(),avatar,color)} bg={valid?color:"#374151"} style={{width:"100%",padding:16,fontSize:18,opacity:valid?1:.5}}>Start Exploring! ðŸ—ºï¸</ActionBtn>
      </div>
    </div>
  );
}

// â•â• HOME SCREEN â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function HomeScreen({profile,onLearn,onDaily,onBoard,onMyProfile,onSwitch,onLevelChange,onStories,onExam,dailyDone}){
  const lv=profile.level||1;
  const vocab=lv>=3?VOCAB_L3:lv>=2?VOCAB_L2:VOCAB_L1;
  const catKeys=Object.keys(vocab);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:profile.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{profile.avatar}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:18,color:"white",lineHeight:1,...DS}}>Hola, {profile.name}! ðŸ‘‹</div>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <StarCount count={profile.stars} color={profile.color}/>
            {profile.streak>0&&<span style={{display:"inline-flex",alignItems:"center",gap:3,background:"rgba(252,211,77,.15)",borderRadius:20,padding:"4px 10px"}}><span style={{fontSize:16}}>ðŸ”¥</span><span style={{fontSize:15,fontWeight:900,color:"#FCD34D"}}>{profile.streak}</span></span>}
          </div>
        </div>
        <button onClick={onSwitch} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Switch</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 100px"}}>
        {/* Daily Challenge */}
        <button onClick={dailyDone?undefined:onDaily} style={{width:"100%",padding:"18px",borderRadius:22,background:dailyDone?"rgba(255,255,255,.06)":profile.color,border:dailyDone?"2px solid rgba(255,255,255,.12)":`2px solid ${profile.color}`,cursor:dailyDone?"default":"pointer",textAlign:"left",marginBottom:12,display:"flex",alignItems:"center",gap:14,opacity:dailyDone?.6:1}}>
          <span style={{fontSize:36}}>ðŸ“…</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>{dailyDone?"Daily Challenge Done! âœ“":"Daily Challenge â€” New Today!"}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:3}}>{dailyDone?"Come back tomorrow for a new one!":"5 questions Â· Same for everyone Â· Bonus stars!"}</div>
          </div>
          {!dailyDone&&<span style={{fontSize:22,color:"white"}}>â€º</span>}
        </button>

        {/* Stories button */}
        <button onClick={onStories} style={{width:"100%",padding:"18px",borderRadius:22,background:"rgba(255,255,255,.08)",border:"2px solid rgba(255,255,255,.2)",cursor:"pointer",textAlign:"left",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:36}}>ðŸ“–</span>
          <div style={{flex:1}}>
            <div style={{fontSize:15,color:"white",...DS}}>Stories â€” Listen & Learn!</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:3}}>Real conversations in Cuenca â€” tap any line to hear it!</div>
          </div>
          <span style={{fontSize:22,color:"rgba(255,255,255,.5)"}}>â€º</span>
        </button>

        {/* Level selector with lock state */}
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {[
            {lv:1,label:"â­ Beginner",emoji:"â­"},
            {lv:2,label:"ðŸš€ Intermediate",emoji:"ðŸš€"},
            {lv:3,label:"ðŸ”¥ Advanced",emoji:"ðŸ”¥"},
          ].map(({lv:l,label,emoji})=>{
            const unlocked=canUnlockLevel(profile,l);
            const prog=l>1?getLevelProgress(profile,l):null;
            const active=lv===l;
            return(
              <button key={l} onClick={()=>unlocked&&onLevelChange(l)} style={{width:"100%",padding:"12px 16px",borderRadius:16,background:active?"white":unlocked?"rgba(255,255,255,.1)":"rgba(255,255,255,.04)",border:active?`2px solid ${profile.color}`:"2px solid rgba(255,255,255,.15)",cursor:unlocked?"pointer":"default",display:"flex",alignItems:"center",gap:10,transition:"all .2s"}}>
                <span style={{fontSize:22}}>{unlocked?emoji:"ðŸ”’"}</span>
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
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>
            {lv>=3?"ADVANCED":lv>=2?"INTERMEDIATE":"BEGINNER"} CATEGORIES
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>onLearn("__review__",lv)} style={{padding:"5px 10px",borderRadius:12,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",color:"white",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              ðŸ”€ Mix Review
            </button>
            <button onClick={()=>onExam(lv)} style={{padding:"5px 10px",borderRadius:12,background:"#FCD34D20",border:"1px solid #FCD34D60",color:"#FCD34D",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              ðŸ† Level Exam
            </button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {catKeys.map(key=>{
            const c=vocab[key];
            const stars=getCatProgress(profile,key,lv);
            const starDisplay=["","â­","â­â­","â­â­â­"][stars]||"";
            return(
              <button key={key} onClick={()=>onLearn(key,lv)} style={{padding:"14px 8px",borderRadius:18,background:stars>=3?`${c.color}22`:"rgba(255,255,255,.07)",border:`2px solid ${stars>=1?c.color:c.color+"40"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,position:"relative"}}>
                {stars>=3&&<div style={{position:"absolute",top:4,right:4,fontSize:9,background:c.color,color:"white",borderRadius:6,padding:"1px 5px",fontWeight:800}}>âœ“</div>}
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
        {[{icon:"ðŸ ",label:"Home",action:null},{icon:"ðŸ†",label:"Leaderboard",action:onBoard},{icon:"ðŸŽ–ï¸",label:"My Profile",action:onMyProfile}].map(({icon,label,action})=>(
          <button key={label} onClick={action||undefined} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:action?"pointer":"default",opacity:action?1:.5}}>
            <span style={{fontSize:22}}>{icon}</span>
            <span style={{fontSize:11,color:"white",fontWeight:700}}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// â•â• LEARN SCREEN â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function LearnScreen({catKey,catLevel,profile,onBack,onEarn,onStat,onCatProgress}){
  const[mode,setMode]=useState("flashcard");
  const vocab=catLevel>=3?VOCAB_L3:catLevel>=2?VOCAB_L2:VOCAB_L1;
  const cat=vocab[catKey];
  const allWords=catLevel>=3?ALL_WORDS_L3:catLevel>=2?ALL_WORDS_L2:ALL_WORDS_L1;
  const modes=[{id:"flashcard",label:"ðŸƒ Cards"},{id:"quiz",label:"ðŸŽ¯ Quiz"},{id:"listen",label:"ðŸ‘‚ Listen"},{id:"scramble",label:"ðŸ”¤ Scramble"},{id:"match",label:"ðŸ§© Match"},{id:"sayit",label:"ðŸ—£ï¸ Say It"},{id:"speak",label:"ðŸŽ¤ Echo"}];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{fontSize:20,color:"white",...DS}}>{cat.icon} {cat.label}</div>
        <div style={{marginLeft:"auto"}}><StarCount count={profile.stars} color={profile.color}/></div>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 14px 4px",flexWrap:"wrap",justifyContent:"center"}}>
        {modes.map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{flex:"1 1 70px",maxWidth:90,padding:"9px 0",borderRadius:20,background:mode===m.id?"white":"rgba(255,255,255,.12)",border:"none",color:mode===m.id?cat.color:"rgba(255,255,255,.8)",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",boxShadow:mode===m.id?"0 4px 12px rgba(0,0,0,.2)":"none"}}>
            {m.label}
          </button>
        ))}
      </div>
      {/* Mode hint */}
      <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.45)",paddingBottom:8,paddingLeft:14,paddingRight:14}}>
        {mode==="flashcard"&&"Flip cards â€” Spanish on front, English on back"}
        {mode==="quiz"&&"Hear Spanish â†’ choose the English meaning"}
        {mode==="listen"&&"Hear Spanish only â†’ identify the English (no peeking!)"}
        {mode==="scramble"&&"See the English clue â†’ unscramble the Spanish letters"}
        {mode==="match"&&"Tap to pair Spanish words with English meanings"}
        {mode==="sayit"&&"See English â†’ say the Spanish out loud from memory"}
        {mode==="speak"&&"See Spanish â†’ echo it back for pronunciation practice"}
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

// â•â• DAILY CHALLENGE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
        <div style={{fontSize:72}}>{score===5?"ðŸ†":score>=3?"ðŸŒŸ":"ðŸ’ª"}</div>
        <div style={{fontSize:28,color:"white",margin:"8px 0",...DS}}>Daily Complete!</div>
        <div style={{fontSize:48,fontWeight:900,color:"#FCD34D"}}>{score}/5</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.7)",marginTop:4,marginBottom:8}}>{score===5?"Flawless! Â¡Perfecto!":score>=3?"Great job!":"Practice makes perfect!"}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.5)",marginBottom:24}}>+{score*3} bonus stars earned!</div>
        <ActionBtn onClick={()=>onComplete(score)} bg={profile.color} style={{width:"100%",padding:16,fontSize:16}}>Back to Home ðŸ </ActionBtn>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{flex:1}}><div style={{fontSize:18,color:"white",...DS}}>ðŸ“… Daily Challenge</div><div style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>Same for everyone today!</div></div>
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

// â•â• LEADERBOARD â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function LeaderboardScreen({profiles,onBack}){
  const sorted=[...profiles].sort((a,b)=>b.stars-a.stars);
  const medals=["ðŸ‘‘","ðŸ¥ˆ","ðŸ¥‰"];
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{fontSize:20,color:"white",...DS}}>ðŸ† Family Leaderboard</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {sorted.map((p,i)=>(
          <div key={p.id} style={{background:i===0?"rgba(252,211,77,.12)":"rgba(255,255,255,.06)",border:i===0?"2px solid #FCD34D":"2px solid rgba(255,255,255,.1)",borderRadius:20,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:28,width:36,textAlign:"center"}}>{medals[i]||String(i+1)}</div>
            <div style={{width:48,height:48,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,color:"white",...DS}}>{p.name}</div>
              <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>ðŸ”¥ {p.streak}d</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>ðŸ… {(p.badges||[]).length}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.12)",borderRadius:8,padding:"1px 6px",color:"white",fontWeight:700}}>Lv {p.level||1}</span>
                {(p.dailyScores||{})[todayStr()]!==undefined&&(
                  <span style={{fontSize:11,background:"rgba(252,211,77,.2)",borderRadius:8,padding:"1px 6px",color:"#FCD34D",fontWeight:700}}>
                    ðŸ“… {(p.dailyScores||{})[todayStr()]}/5 today
                  </span>
                )}
              </div>
            </div>
            <div style={{fontSize:22,fontWeight:900,color:"#FCD34D"}}>â­ {p.stars}</div>
          </div>
        ))}
        {profiles.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,.4)",padding:40,fontSize:16}}>No explorers yet!</div>}
      </div>
    </div>
  );
}

// â•â• MY PROFILE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function MyProfileScreen({profile,onBack}){
  const allBadges=Object.entries(BADGE_DEF);
  const earned=new Set(profile.badges||[]);
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.12)",border:"none",borderRadius:12,padding:"8px 12px",color:"white",fontSize:20,cursor:"pointer"}}>â†</button>
        <div style={{fontSize:20,color:"white",...DS}}>ðŸŽ–ï¸ Explorer Card</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:16,overflowY:"auto",paddingBottom:40}}>
        <div style={{background:`linear-gradient(135deg,${profile.color},${profile.color}99)`,borderRadius:24,padding:24,textAlign:"center"}}>
          <div style={{fontSize:56}}>{profile.avatar}</div>
          <div style={{fontSize:26,color:"white",marginTop:8,...DS}}>{profile.name}</div>
          <div style={{display:"inline-block",background:"rgba(255,255,255,.2)",borderRadius:12,padding:"4px 12px",fontSize:13,color:"white",fontWeight:700,marginTop:4}}>Level {profile.level||1}</div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>â­ {profile.stars}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Stars</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>ðŸ”¥ {profile.streak}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Streak</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:"white"}}>ðŸ… {(profile.badges||[]).length}</div><div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Badges</div></div>
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

// â•â• MAIN APP â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
  const profile=profiles.find(p=>p.id===activeId)||null;

  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap";
    link.rel="stylesheet";document.head.appendChild(link);
    const style=document.createElement("style");
    style.textContent="*{box-sizing:border-box}button:active{opacity:.88}::-webkit-scrollbar{display:none}input:focus{outline:none}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}";
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

  const handleExamPass=async(level)=>{
    if(!activeId||!profile)return;
    const newLevel=Math.min(level+1,3);
    await updateProfile(activeId,{level:newLevel});
    setScreen("home");
  };

  const handleStoryComplete=async()=>{
    if(!profile)return;
    await updateProfile(activeId,{storiesRead:(profile.storiesRead||0)+1,stars:profile.stars+5});
    setScreen("stories");
  };

  if(loading)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{fontSize:64}}>ðŸŒ</div>
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
      {familyReady&&screen==="home"      &&profile&&<HomeScreen profile={profile} onLearn={handleLearn} onDaily={()=>setScreen("daily")} onBoard={()=>setScreen("board")} onMyProfile={()=>setScreen("myprofile")} onSwitch={()=>setScreen("select")} onLevelChange={handleLevelChange} onStories={()=>setScreen("stories")} onExam={(lv)=>{setExamLevel(lv);setScreen("exam");}} dailyDone={dailyDone}/>}
      {familyReady&&screen==="learn"     &&profile&&<LearnScreen catKey={learnCat} catLevel={learnCatLv} profile={profile} onBack={()=>setScreen("home")} onEarn={handleEarn} onStat={handleStat} onCatProgress={handleCatProgress}/>}
      {familyReady&&screen==="daily"     &&profile&&<DailyScreen profile={profile} onBack={()=>setScreen("home")} onComplete={handleDailyComplete}/>}
      {familyReady&&screen==="board"     &&<LeaderboardScreen profiles={profiles} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="myprofile" &&profile&&<MyProfileScreen profile={profile} onBack={()=>setScreen("home")}/>}
      {familyReady&&screen==="exam"       &&profile&&<LevelExamScreen level={examLevel} profile={profile} onBack={()=>setScreen("home")} onPass={handleExamPass} onFail={()=>setScreen("home")}/>}
      {familyReady&&screen==="stories"   &&<StoryListScreen onBack={()=>setScreen("home")} onStory={s=>{setActiveStory(s);setScreen("story");}} profile={profile}/>}
      {familyReady&&screen==="story"     &&activeStory&&<StoryScreen story={activeStory} onBack={()=>setScreen("stories")} onComplete={handleStoryComplete}/>}
    </div>
  );
}
