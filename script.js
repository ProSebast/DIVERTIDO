// ========== COSAS QUE USO PARA QUE TODO FUNCIONE O NO SE ==========
let titleClickCount = 0;
let volumeLevel = 50;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const contentArea = document.getElementById('contentArea');
const mainContainer = document.getElementById('mainContainer');
let historiaActual = 0;
let historiasVistas = [];

// ========== LAS PORQUERIAS QUE VUELAN POR AHI ==========
function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'heart';
    emoji.innerHTML = ['✨', '🌟', '⭐', '💫', '🌈', '☀️', '🌸', '🦋', '🌺', '🍀'][Math.floor(Math.random() * 10)];
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.animationDuration = (Math.random() * 5 + 5) + 's';
    emoji.style.animationDelay = Math.random() * 5 + 's';
    document.getElementById('floatingHearts').appendChild(emoji);
    setTimeout(() => emoji.remove(), 15000);
}

// Crear emojis periódicamente
setInterval(createFloatingEmoji, 2000);
for(let i = 0; i < 5; i++) createFloatingEmoji();

// ========== EL TITULO QUE TIENE EL SECRETO ESE ==========
document.getElementById('mainTitle').addEventListener('click', function() {
    titleClickCount++;
    this.classList.add('shake');
    setTimeout(() => this.classList.remove('shake'), 500);
    
    if (titleClickCount === 5) {
        showSecretPopup('🎉 You discovered the title secret! 🎉<br><br>Remember: You are stronger than you think, braver than you believe, and more special than you know. ✨');
        createConfetti();
        titleClickCount = 0;
    }
});

// ========== PA QUE SUBA Y BAJE EL VOLUMEN ==========
document.addEventListener('keydown', function(e) {
    const volumeIndicator = document.getElementById('volumeIndicator');
    const volumeLevelSpan = document.getElementById('volumeLevel');
    
    if (e.key === 'ArrowUp' || e.key === '+') {
        e.preventDefault();
        volumeLevel = Math.min(100, volumeLevel + 10);
        volumeLevelSpan.textContent = volumeLevel;
        volumeIndicator.classList.add('show');
        setTimeout(() => volumeIndicator.classList.remove('show'), 2000);
    } else if (e.key === 'ArrowDown' || e.key === '-') {
        e.preventDefault();
        volumeLevel = Math.max(0, volumeLevel - 10);
        volumeLevelSpan.textContent = volumeLevel;
        volumeIndicator.classList.add('show');
        setTimeout(() => volumeIndicator.classList.remove('show'), 2000);
    }
    
    // Konami Code
    konamiCode.push(e.key);
    if (konamiCode.length > 10) konamiCode.shift();
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activatePartyMode();
        konamiCode = [];
    }
});

// ========== EL MODO FIESTA ESTE QUE NADIE SABE COMO SACAR ==========
function activatePartyMode() {
    document.body.classList.add('party-mode');
    mainContainer.classList.add('rainbow-mode');
    showSecretPopup('🎊 PARTY MODE ACTIVATED! 🎊<br><br>Konami Code unlocked 🎮');
    createConfetti();
    
    for(let i = 0; i < 50; i++) {
        setTimeout(createFloatingEmoji, i * 100);
    }
    
    setTimeout(() => {
        document.body.classList.remove('party-mode');
        mainContainer.classList.remove('rainbow-mode');
    }, 10000);
}

// ========== PAPELITOS PA QUE SE VEA BIEN ==========
function createConfetti() {
    const colors = ['#FF6B9D', '#FEC163', '#C9EEFF', '#FFD93D', '#FF1493'];
    for(let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// ========== SI TOCAS 3 VECES PASA ESTO ==========
let buttonClickTimes = {};
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const now = Date.now();
        const btnText = this.textContent.trim();
        
        if (!buttonClickTimes[btnText]) buttonClickTimes[btnText] = [];
        buttonClickTimes[btnText].push(now);
        
        if (buttonClickTimes[btnText].length > 3) {
            buttonClickTimes[btnText].shift();
        }
        
        if (buttonClickTimes[btnText].length === 3) {
            const timeDiff = buttonClickTimes[btnText][2] - buttonClickTimes[btnText][0];
            if (timeDiff < 2000) {
                showSecretPopup('⚡ Triple Click! ⚡<br><br>You are fast as lightning 🌩️');
                buttonClickTimes[btnText] = [];
            }
        }
    });
});

// ========== EL ESPACIO PARA HACER NADA ==========
let spaceCount = 0;
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        spaceCount++;
        if (spaceCount >= 10) {
            showSecretPopup('🚀 INFINITE SPACE! 🚀<br><br>You pressed space 10 times 🌌');
            createConfetti();
            spaceCount = 0;
        }
    }
});

// ========== LAS COSAS IMPORTANTES SE SUPONE ==========
function showContent(html) {
    contentArea.innerHTML = html;
    contentArea.classList.add('active');
    contentArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========== LOS MEMES PORQUE LA RISA ES VIDA ==========
async function showRandom() {
    showContent('<div class="loading">Loading meme... 🎲</div>');
    try {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();
        showContent(`
            <div class="meme-container">
                <h2>🎲 Random Meme</h2>
                <img src="${data.url}" alt="${data.title}">
                <p style="text-align: center; margin-top: 15px; opacity: 0.8;">${data.title}</p>
            </div>
        `);
    } catch (error) {
        showContent('<div class="message">Oops! Could not load meme 😅<br>Try again</div>');
    }
}

// ========== MIS HISTORIAS QUE SON UNA MUESTRA DE MI GENIALIDAD ==========
function showHistorias() {
    const historias = [
        {
            titulo: "1️⃣ El niño de la moto del mall",
            texto: "Cuando era niño, un día me perdí en el Mall de Santiago. Nadie sabía dónde estaba y mi mamá me buscaba por todos lados. Hasta que le preguntó a un guardia, y el guardia dijo:<br><br>\"¿No es el niño que está arriba de la moto en exhibición?\"<br><br>Sí… ese era yo."
        },
        {
            titulo: "2️⃣ El día que escapé a la casa de la vecina",
            texto: "Cuando era niño, un día desaparecí de la casa. Nadie me encontraba por ningún lado.<br><br>Al final me encontraron en la casa de la vecina. Resulta que yo había escalado un muro que estaba en la casa y pasé para el otro lado.<br><br>Hasta el día de hoy nadie sabe cómo escalé ese muro… ni yo.<br>Supongo que soy un genio."
        },
        {
            titulo: "3️⃣ El ataque de la paloma",
            texto: "En la media tenía una presentación para el Día del Profesor. Iba todo arreglado y bien preparado.<br><br>Cuando estaba llegando a la entrada del colegio… una paloma me cagó.<br><br>No sé qué había comido esa paloma, pero fue un baño total.<br><br>Hasta el día de hoy me río de eso."
        },
        {
            titulo: "4️⃣ Mi canal de YouTube que aún existe",
            texto: "¿Te conté que una vez tuve un canal de YouTube?<br>Pues todavía existe:<br><br><a href='https://www.youtube.com/@Tasle' target='_blank'>youtube.com/@Tasle</a><br><br>Lo dejé ahí porque me da nostalgia… y también risa.<br>Aunque creo que me da más vergüenza que otra cosa."
        },
        {
            titulo: "5️⃣ El perro que me ganó",
            texto: "En mi primer carrete rompí una mesa.<br>Pero no fue lo que parece.<br>Fue porque un perro me empujó.<br><br>La cosa es que yo no estaba curao…<br>y el perro tampoco era grande.<br><br>Ese día me ganó un perro.<br>Rayos."
        },
        {
            titulo: "6️⃣ El día que salí negro de barro",
            texto: "Una vez me quedé atrapado en un canal donde pasa el agua y esas cosas.<br>La cosa es que había puro barro, me resbalé y caí ahí.<br><br>Ese día salí completamente negro de barro.<br>Literalmente parecía otra persona."
        }
    ];
    
    // Verificar si ya vio todas las historias
    if (historiasVistas.length === historias.length) {
        showContent(`
            <div class="historia-placeholder">
                <h2>📖 Historias Chistosas Mia</h2>
                <div style="margin-top: 30px; font-size: 1.2em; line-height: 1.8; text-align: center; color: #555;">
                    <p style="margin-bottom: 20px;">✨</p>
                    <p style="margin-bottom: 15px;">Tengo más historias, pero son cosas que conocerás más adelante.</p>
                    <p style="margin-bottom: 15px;">No hay prisa de nada, no hace falta apresurar nada.</p>
                    <p style="margin-bottom: 15px;">Todo se dará a su tiempo.</p>
                    <p style="margin-bottom: 20px;">💫</p>
                    <p style="margin-bottom: 15px;">Sentí que quizás necesitabas reírte un poco, o si quieres hablar, aquí estoy.</p>
                    <p style="margin-bottom: 20px;"><strong>Te aprecio mucho, la verdad.</strong></p>
                    <p>🌟</p>
                </div>
                <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.7; text-align: center;">
                    💡 Presiona el botón de nuevo para volver a leer las historias
                </p>
            </div>
        `);
        historiasVistas = [];
        historiaActual = 0;
        return;
    }
    
    const historia = historias[historiaActual];
    
    if (!historiasVistas.includes(historiaActual)) {
        historiasVistas.push(historiaActual);
    }
    
    showContent(`
        <div class="historia-placeholder">
            <h2>📖 Historias Chistosas Mia</h2>
            <h3 style="color: #FF6B9D; margin-top: 20px; font-size: 1.3em;">${historia.titulo}</h3>
            <div style="margin-top: 20px; font-size: 1.1em; line-height: 1.8; text-align: left;">
                ${historia.texto}
            </div>
            <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.7; text-align: center;">
                💡 Presiona el botón de nuevo para la siguiente historia (${historiasVistas.length}/${historias.length})
            </p>
        </div>
    `);
    
    historiaActual++;
    if (historiaActual >= historias.length) {
        historiaActual = 0;
    }
}

// ========== PA QUE NO ESTES TRISTE ==========
function showMalDia() {
    const mensajes = [
        "Hey, take a deep breath. Tomorrow is a new day and everything can be different. 🌅",
        "Bad days exist so good days can shine brighter. Don't give up. 💪",
        "It's okay not to be okay all the time. Give yourself permission to feel, then rise up. 🌟",
        "This difficult day is just one chapter, not your whole story. Keep going. 📖",
        "Remember: you've survived 100% of your bad days so far. This one will pass too. 🌈",
        "You're not alone in this. It's okay to ask for help and take your time. 🤗",
        "Gray days teach us to appreciate sunny days. This too shall pass. ☀️",
        "Your worth doesn't decrease on a bad day. You're amazing always. ✨",
        "Every storm ends. After the rain, the sun always comes out. 🌦️",
        "You don't have to be strong all the time. It's okay to rest and recover. 💙",
        "Tomorrow you'll have a new chance to start fresh. 🌄",
        "Difficult days make you stronger. You're growing even if you don't feel it. 🌱",
        "Give yourself the same love and understanding you'd give your best friend. 💕",
        "Don't judge your whole day by one bad moment. There's still time for it to get better. ⏰",
        "It's okay to cry. Tears are the heart's language when words aren't enough. 💧",
        "You're braver than you think for keeping going despite everything. 🦁",
        "Bad days are temporary. Your strength is permanent. 💎",
        "You're not failing, you're learning. Every difficult day teaches you something. 📚",
        "You deserve to rest without feeling guilty. Self-care isn't selfish. 🛀",
        "Even on the darkest days, there are small lights. Look for them. 🕯️",
        "This feeling is temporary. You've felt joy before and you will again. 🌸",
        "Be gentle with yourself. You're doing the best you can. 🌺",
        "One step at a time. You don't have to have it all figured out today. 👣",
        "Your feelings are valid. It's okay to not be okay right now. 💜",
        "This too shall pass. Nothing lasts forever, not even pain. 🦋",
        "You are not your thoughts. You are the observer of your thoughts. 🧘",
        "Take it one breath at a time. You're going to be okay. 🌬️",
        "You've overcome challenges before. You can do it again. 🏔️",
        "It's okay to take a break. Rest is productive too. 🌙",
        "You are loved, even when you don't feel it. 💗",
        "This moment doesn't define you. Tomorrow is a fresh start. 🌅",
        "Be patient with yourself. Healing takes time. 🌿",
        "You don't have to be perfect. You just have to be you. 🌻",
        "Small steps forward are still progress. Keep going. 🐾",
        "You are worthy of compassion, especially from yourself. 🤲",
        "This struggle is shaping you into someone stronger. 💪",
        "You matter. Your presence makes a difference. ⭐",
        "It's okay to ask for help. That's a sign of strength, not weakness. 🤝",
        "You've survived every bad day so far. Your track record is 100%. 📊",
        "This pain is temporary, but your resilience is permanent. 🛡️"
    ];
    
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
    showContent(`
        <div class="message">
            <h2>💙 A Message For You</h2>
            <p style="margin-top: 30px; font-size: 1.3em;">${mensaje}</p>
        </div>
    `);
}

// ========== EL TEXTO QUE TE SALE HOY ==========
function showMensajeDia() {
    const mensajes = [
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
        { text: "Believe in yourself and all that you are possible.", author: "Anonymous" },
        { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
        { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
        { text: "Every day is a new opportunity to change your life.", author: "Anonymous" },
        { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
        { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "Make each day your masterpiece.", author: "John Wooden" },
        { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { text: "Don't give up. The beginning is always the hardest.", author: "Anonymous" },
        { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "Act as if what you do makes a difference. It does.", author: "William James" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Persistence guarantees that results are inevitable.", author: "Paramahansa Yogananda" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
        { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
        { text: "Dream bigger. Do bigger.", author: "Anonymous" },
        { text: "Don't stop when you're tired. Stop when you're done.", author: "Anonymous" },
        { text: "Wake up with determination. Go to bed with satisfaction.", author: "Anonymous" },
        { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
        { text: "Little things make big days.", author: "Anonymous" },
        { text: "It's going to be hard, but hard does not mean impossible.", author: "Anonymous" },
        { text: "Don't wait for opportunity. Create it.", author: "Anonymous" },
        { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Anonymous" },
        { text: "The key to success is to focus on goals, not obstacles.", author: "Anonymous" },
        { text: "Dream it. Believe it. Build it.", author: "Anonymous" },
        { text: "Your limitation—it's only your imagination.", author: "Anonymous" },
        { text: "Great things never come from comfort zones.", author: "Anonymous" },
        { text: "Success doesn't just find you. You have to go out and get it.", author: "Anonymous" },
        { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Be so good they can't ignore you.", author: "Steve Martin" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
        { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
        { text: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
        { text: "Take up one idea. Make that one idea your life. Think of it, dream of it, live on that idea.", author: "Swami Vivekananda" },
        { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
        { text: "Good things come to people who wait, but better things come to those who go out and get them.", author: "Anonymous" },
        { text: "If you do what you always did, you will get what you always got.", author: "Anonymous" }
    ];
    
    const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
    showContent(`
        <div class="quote">
            <h2>💫 Message of the Day</h2>
            <p style="margin-top: 30px;">"${msg.text}"</p>
            <p class="quote-author">— ${msg.author}</p>
        </div>
    `);
}

// ========== PA QUE TE CREAS EL CUENTO ==========
function showRecuerda() {
    const mensajes = [
        { text: "You are enough just as you are. You don't need to be perfect to be valuable.", author: "Your heart" },
        { text: "Your worth doesn't depend on others' opinions. You are unique and irreplaceable.", author: "The truth" },
        { text: "You deserve love, respect, and all the good things life has to offer.", author: "The universe" },
        { text: "Your mistakes don't define you. Your ability to rise does.", author: "Your strength" },
        { text: "You are stronger than you think, braver than you believe.", author: "Winnie the Pooh" },
        { text: "You're not too sensitive. You're not dramatic. You're human and that's beautiful.", author: "Anonymous" },
        { text: "Your story isn't over. Every day is a new page you can write.", author: "Your future" },
        { text: "You are a work in progress, and that's perfectly fine.", author: "Anonymous" },
        { text: "You don't need anyone's approval to be who you are.", author: "Your essence" },
        { text: "You're capable of incredible things. Don't let anyone tell you otherwise.", author: "Your potential" },
        { text: "Your voice matters. Your ideas matters. You matter.", author: "Reality" },
        { text: "You don't have to prove anything to anyone except yourself.", author: "Your inner peace" },
        { text: "You are worthy of love and belonging just as you are now.", author: "Brené Brown" },
        { text: "Your past doesn't determine your future. Every moment is a new opportunity.", author: "Anonymous" },
        { text: "You're more resilient than you think. Look at everything you've overcome.", author: "Your story" },
        { text: "You're not a mistake. You're a unique possibility in the universe.", author: "Your existence" },
        { text: "You deserve to take up space in this world. Don't make yourself small for anyone.", author: "Your right" },
        { text: "You're brave just for keeping trying every day.", author: "Your courage" },
        { text: "Your sensitivity is your superpower, not your weakness.", author: "Your gift" },
        { text: "You are exactly who you need to be at this moment in your life.", author: "The present" },
        { text: "You don't need to be like everyone else. The world needs your authenticity.", author: "Your uniqueness" },
        { text: "You are good enough, smart enough, enough of everything.", author: "The absolute truth" },
        { text: "Your value doesn't increase or decrease based on your achievements. You're valuable for existing.", author: "Your essence" },
        { text: "You are the protagonist of your own story. Write it however you want.", author: "Your power" },
        { text: "You're not broken. You're in the process of becoming who you're meant to be.", author: "Your transformation" },
        { text: "You have survived 100% of your worst days. You're doing great.", author: "Your resilience" },
        { text: "You are not defined by your productivity. You have inherent worth.", author: "Your being" },
        { text: "Your journey is yours alone. Comparison is the thief of joy.", author: "Your path" },
        { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
        { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious.", author: "Lori Deschene" },
        { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
        { text: "Talk to yourself like you would to someone you love.", author: "Brené Brown" },
        { text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
        { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
        { text: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins" },
        { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
        { text: "Your value doesn't decrease based on someone's inability to see your worth.", author: "Anonymous" },
        { text: "You are not required to set yourself on fire to keep other people warm.", author: "Anonymous" },
        { text: "You are allowed to be a work in progress and a masterpiece at the same time.", author: "Anonymous" },
        { text: "You don't have to be fearless. Just don't let fear stop you.", author: "Anonymous" },
        { text: "You are not too much. You have never been too much. You will never be too much.", author: "Anonymous" },
        { text: "Your existence is not a burden. You matter. You are important. You are loved.", author: "Anonymous" },
        { text: "You are not behind. You are not lagging. You are exactly where you need to be.", author: "Anonymous" },
        { text: "You don't need to earn your worth. You were born worthy.", author: "Anonymous" },
        { text: "You are not your mistakes. You are not your struggles. You are here now with the power to shape your day and your future.", author: "Steve Maraboli" },
        { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
        { text: "You are confined only by the walls you build yourself.", author: "Andrew Murphy" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
        { text: "You are the one that possesses the keys to your being. You carry the passport to your own happiness.", author: "Diane von Furstenberg" }
    ];
    
    const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
    showContent(`
        <div class="quote">
            <h2>✨ Remember Who You Are</h2>
            <p style="margin-top: 30px;">"${msg.text}"</p>
            <p class="quote-author">— ${msg.author}</p>
        </div>
    `);
}

// ========== MUSIQUITA RICA ==========
function showMusica() {
    // Canciones de tu playlist personal (35 canciones)
    const canciones = [
        '71wFwRo8xGc4lrcyKwsvba', '5XJ7JsPDqNunEmGBTrgfhA', '5jW3rF4URMdK7tO2xjS5EI', '6y6EZKfsOZ7P3ALbnUuXik',
        '2Lk4eKx3eWaB4uxWguNXq0', '6kPCcIAGoTeRrh8qrmKa90', '1hZsWUnLbqRw09jLAMQSsb', '0LxKI4Y1yMuJZzdJKcttU0',
        '7CMj1OOS1ho4CPEQTFKzcN', '1FtqN0n4kG1oGw3XT9tq2H', '7MmrcXVA7A5zZ2CbDuGHNa', '3fjN3y5x4hN53rykAN2LHQ',
        '0Njk7qwCya5tSeXMZzoBUw', '2b7Si9I7PtpgGOnUE8Qogd', '3yBx8j3hVNawnmlrBf3EHR', '3GCdLUSnKSMJhs4Tj6CV3s',
        '2CGNAOSuO1MEFCbBRgUzjd', '1h5Yg6TSSlNdUNMVcZfZf3', '11pjpFy9m7CQqVBC0A5EPG', '6VAS7m73rDopQe7BdrFMpD',
        '3lnaMCNOqHZHzUYdHP6TxA', '2lTm559tuIvatlT1u0JYG2', '5WEF0icHWmAZBBMglBd599', '3k3NWokhRRkEPhCzPmV8TW',
        '5Eax0qFko2dh7Rl2lYs3bx', '6UJI5SmxMSVmMPzFMXzNPg', '36sOAsQjFqphPtasMThwzv', '67ACYA3UI6QMNtHX6b34wX',
        '4MzXwWMhyBbmu6hOcLVD49', '6Xom58OOXk2SoU711L2IXO', '2JPLbjOn0wPCngEot2STUS', '62NnbMclYuQuF09B0ShIPV',
        '6vYApgg6LrtohBw82KhYzs', '6jBoUckd6VEImt6pg8RpDr', '4MQEsa25Jc6mfLaFYmYhIo'
    ];
    
    const randomSong = canciones[Math.floor(Math.random() * canciones.length)];
    showContent(`
        <div class="spotify-container">
            <h2>🎵 Music You Might Like</h2>
            <p style="margin: 20px 0;">A random song to brighten your day 😊</p>
            <iframe 
                src="https://open.spotify.com/embed/track/${randomSong}?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
            <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.8;">
                💡 Press the button again for another random song
            </p>
        </div>
    `);
}

// ========== MAS COSAS RARAS QUE PUSE ==========
let eyeClickCount = 0;
function showSecretMessage() {
    eyeClickCount++;
    if (eyeClickCount === 5) {
        initGame();
        eyeClickCount = 0;
    } else {
        showSecretPopup('you found something hidden 👀');
    }
}

function showSecretPopup(message) {
    const popup = document.getElementById('secretMessage');
    popup.innerHTML = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 4000);
}

// Easter egg: triple doble-clic en el fondo
let backgroundClickCount = 0;
document.body.addEventListener('dblclick', function(e) {
    if (e.target === document.body) {
        backgroundClickCount++;
        if (backgroundClickCount === 3) {
            showSecretPopup('🌟 Triple double-click! You are persistent, I like that 🌟');
            backgroundClickCount = 0;
        }
    }
});

// Mantener presionada la tecla H por 3 segundos
let hKeyTime = 0;
document.addEventListener('keydown', function(e) {
    if (e.key === 'h' || e.key === 'H') {
        if (hKeyTime === 0) hKeyTime = Date.now();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'h' || e.key === 'H') {
        const duration = Date.now() - hKeyTime;
        if (duration > 3000) {
            showSecretPopup('🤗 VIRTUAL HUG! 🤗<br><br>You held H (for Hug) for 3 seconds 💕');
            createConfetti();
        }
        hKeyTime = 0;
    }
});

// ========== EL JUEGO SECRETO DE VOLUMEN ==========
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false;
let score = 0;
let bird = { x: 50, y: 150, width: 30, height: 30, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let frameCount = 0;

function initGame() {
    mainContainer.style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('gameScore').style.display = 'block';
    document.getElementById('gameOver').style.display = 'none';
    
    // Ajustar canvas al tamaño de la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frameCount = 0;
    gameRunning = true;
    
    document.getElementById('gameScore').innerText = '0';
    
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo bonito
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Actualizar pájaro
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // Dibujar pájaro (emoji 🐥)
    ctx.font = '30px Arial';
    ctx.fillText('🐥', bird.x, bird.y);
    
    // Generar tuberías
    if (frameCount % 100 === 0) {
        let gap = 150;
        let minHeight = 50;
        let pipeWidth = 50;
        let pipeHeight = Math.floor(Math.random() * (canvas.height - gap - minHeight * 2)) + minHeight;
        pipes.push({ x: canvas.width, top: pipeHeight, bottom: canvas.height - pipeHeight - gap });
    }
    
    // Actualizar y dibujar tuberías
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 3;
        
        ctx.fillStyle = '#75b855';
        ctx.fillRect(pipes[i].x, 0, 50, pipes[i].top);
        ctx.fillRect(pipes[i].x, canvas.height - pipes[i].bottom, 50, pipes[i].bottom);
        
        // Colisión
        if (bird.x + 25 > pipes[i].x && bird.x < pipes[i].x + 50) {
            if (bird.y < pipes[i].top || bird.y > canvas.height - pipes[i].bottom) {
                endGame();
            }
        }
        
        // Puntaje
        if (pipes[i].x === bird.x) {
            score++;
            document.getElementById('gameScore').innerText = score;
        }
        
        if (pipes[i].x < -50) pipes.splice(i, 1);
    }
    
    // Colisión suelo/techo
    if (bird.y > canvas.height || bird.y < 0) endGame();
    
    frameCount++;
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('finalScore').innerText = score;
}

function resetGame() {
    initGame();
}

function exitGame() {
    gameRunning = false;
    canvas.style.display = 'none';
    document.getElementById('gameScore').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    mainContainer.style.display = 'block';
}

// Salto con tap o espacio
function handleJump(e) {
    if (gameRunning) {
        bird.velocity = bird.lift;
    }
}

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleJump();
}, { passive: false });

canvas.addEventListener('mousedown', handleJump);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') handleJump();
});

// Redimensionar canvas si cambia el tamaño
window.addEventListener('resize', () => {
    if (gameRunning) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    checkOrientation(); // Pa saber si esta de lado
});

// ========== SECRETOS DE CELULAR QUE ME INVENTE ==========

// 1. EL REGAÑO POR GIRAR EL CEL
function checkOrientation() {
    const overlay = document.getElementById('orientationOverlay');
    // Detectar si está en horizontal y es un dispositivo móvil/tablet
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = window.innerWidth < 1024; 

    if (isLandscape && isMobile) {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
}

// Escuchar cambios de orientación de forma más robusta
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);
checkOrientation(); 

// 3. EL SECRETO DE SU NOMBRE (3 toques en Dani)
let daniClickCount = 0;
// Usamos pointerdown para que responda instantáneo en móviles
document.getElementById('daniSecret').addEventListener('pointerdown', function(e) {
    daniClickCount++;
    if (daniClickCount === 3) {
        showSecretPopup('💖 ¡Eres la persona más increíble del mundo! 💖<br><br>Bueno, a veces te gusta hacer las cosas a tu manera... pero se te quiere igual 😂');
        createConfetti();
        daniClickCount = 0;
    }
});

// 4. EL VÍNCULO DE CRISTAL (2 DEDOS)
const beam = document.getElementById('beam');
let isCrystalActive = false;

document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault(); 
        isCrystalActive = true;
        updateBeam(e.touches[0], e.touches[1]);
        beam.style.display = 'block';
        showSecretPopup('✨ ¡VÍNCULO DE CRISTAL! ✨');
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (isCrystalActive && e.touches.length === 2) {
        updateBeam(e.touches[0], e.touches[1]);
        // Soltar chispas por donde pasa
        if (Math.random() > 0.8) createFloatingEmoji();
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    if (isCrystalActive) {
        createRipple(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        beam.style.display = 'none';
        isCrystalActive = false;
    }
});

function updateBeam(t1, t2) {
    beam.setAttribute('x1', t1.clientX);
    beam.setAttribute('y1', t1.clientY);
    beam.setAttribute('x2', t2.clientX);
    beam.setAttribute('y2', t2.clientY);
}

function createRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'ripple-effect';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 1000);
}

// SECRETO PC: Mantener "V" (de Vínculo) + mover ratón para ver una demo (usa el centro)
let isVDown = false;
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'v') {
        isVDown = true;
        beam.style.display = 'block';
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'v') {
        isVDown = false;
        beam.style.display = 'none';
    }
});
document.addEventListener('mousemove', (e) => {
    if (isVDown) {
        // En PC conectamos el ratón con el centro de la pantalla para simular
        updateBeam({clientX: window.innerWidth/2, clientY: window.innerHeight/2}, {clientX: e.clientX, clientY: e.clientY});
    }
});

// 5. MODO LINTERNA (3 clics/toques en el fondo)
let bgClickCount = 0;
let isFlashlightMode = false;
document.body.addEventListener('mousedown', (e) => {
    if (e.target === document.body || e.target.id === 'floatingHearts') {
        bgClickCount++;
        if (bgClickCount === 3) {
            toggleFlashlight();
            bgClickCount = 0;
        }
        setTimeout(() => bgClickCount = 0, 1000);
    }
});

function toggleFlashlight() {
    isFlashlightMode = !isFlashlightMode;
    const overlay = document.getElementById('flashlightOverlay');
    const texts = document.querySelectorAll('.flashlight-text');
    
    overlay.style.display = isFlashlightMode ? 'block' : 'none';
    texts.forEach(t => t.style.display = isFlashlightMode ? 'block' : 'none');
    
    if (isFlashlightMode) {
        showSecretPopup('🔦 Modo Linterna activado... busca los mensajes ocultos');
    }
}

function moveFlashlight(e) {
    if (!isFlashlightMode) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    const overlay = document.getElementById('flashlightOverlay');
    const mask = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;
    overlay.style.maskImage = mask;
    overlay.style.webkitMaskImage = mask;
}

document.addEventListener('mousemove', moveFlashlight);
document.addEventListener('touchmove', moveFlashlight, { passive: true });

// 6. CARGA DE AMOR (Mantener presionado)
let pressTimer;
let isCharging = false;
const chargeCircle = document.getElementById('chargeCircle');

function startPress(e) {
    if (e.target !== document.body && e.target.id !== 'floatingHearts') return;
    
    isCharging = true;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    chargeCircle.style.left = x + 'px';
    chargeCircle.style.top = y + 'px';
    chargeCircle.style.display = 'block';
    
    pressTimer = setTimeout(() => {
        if (isCharging) {
            showSecretPopup('❤️ ¡CARGA DE AMOR COMPLETADA! ❤️');
            createConfetti();
            for(let i = 0; i < 20; i++) setTimeout(createFloatingEmoji, i * 50);
            cancelPress();
        }
    }, 2000);
}

function cancelPress() {
    isCharging = false;
    clearTimeout(pressTimer);
    chargeCircle.style.display = 'none';
}

document.addEventListener('mousedown', startPress);
document.addEventListener('touchstart', startPress, { passive: true });
document.addEventListener('mouseup', cancelPress);
document.addEventListener('touchend', cancelPress);

// 7. LLUVIA DE AMOR (Deslizar hacia abajo)
let startYSwipe = 0;
document.addEventListener('touchstart', (e) => {
    startYSwipe = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    // Si desliza hacia abajo más de 200px
    if (startYSwipe > 0 && endY - startYSwipe > 200) {
        startEmojiRain();
    }
    startYSwipe = 0;
});

// En PC: Al mover el ratón rápido hacia abajo
let lastMouseY = 0;
document.addEventListener('mousemove', (e) => {
    if (e.clientY - lastMouseY > 50 && e.buttons === 1) { // Click + mover abajo
        startEmojiRain();
    }
    lastMouseY = e.clientY;
});

function startEmojiRain() {
    showSecretPopup('🌧️ ¡LLUVIA DE AMOR! 🌧️');
    const interval = setInterval(() => {
        for(let i = 0; i < 5; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'confetti'; // Usamos la clase confetti que ya tiene animación de caída
            emoji.innerHTML = ['❤️', '💖', '✨', '🌈', '🌸', '🍭', '🦋'][Math.floor(Math.random() * 7)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
            emoji.style.background = 'none'; // Quitamos el color sólido de los papelitos
            emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 4000);
        }
    }, 100);
    
    // Parar la lluvia después de 8 segundos para no saturar el celu
    setTimeout(() => clearInterval(interval), 8000);
}
