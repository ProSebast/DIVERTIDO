// ========== VARIABLES GLOBALES ==========
let titleClickCount = 0;
let volumeLevel = 50;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const contentArea = document.getElementById('contentArea');
const mainContainer = document.getElementById('mainContainer');
let historiaActual = 0;
let historiasVistas = [];

// ========== EMOJIS FLOTANTES ==========
function createFloatingEmoji() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    const emoji = document.createElement('div');
    emoji.className = 'heart';
    emoji.innerHTML = ['✨', '🌟', '⭐', '💫', '🌈', '☀️', '🌸', '🦋', '🌺', '🍀'][Math.floor(Math.random() * 10)];
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.animationDuration = (Math.random() * 5 + 5) + 's';
    emoji.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), 15000);
}

setInterval(createFloatingEmoji, 2000);
for(let i = 0; i < 5; i++) createFloatingEmoji();

// ========== TITULO SECRETO ==========
const mainTitle = document.getElementById('mainTitle');
if (mainTitle) {
    mainTitle.addEventListener('click', function() {
        titleClickCount++;
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
        if (titleClickCount === 5) {
            showSecretPopup('🎉 Descubriste el secreto del título! 🎉<br><br>Eres más fuerte de lo que crees y más especial de lo que imaginas. ✨');
            createConfetti();
            titleClickCount = 0;
        }
    });
}

// ========== CONTROLES DE VOLUMEN Y KONAMI ==========
document.addEventListener('keydown', function(e) {
    const volumeIndicator = document.getElementById('volumeIndicator');
    const volumeLevelSpan = document.getElementById('volumeLevel');
    
    if (e.key === 'ArrowUp' || e.key === '+') {
        e.preventDefault();
        volumeLevel = Math.min(100, volumeLevel + 10);
        if (volumeLevelSpan) volumeLevelSpan.textContent = volumeLevel;
        if (volumeIndicator) {
            volumeIndicator.classList.add('show');
            setTimeout(() => volumeIndicator.classList.remove('show'), 2000);
        }
    } else if (e.key === 'ArrowDown' || e.key === '-') {
        e.preventDefault();
        volumeLevel = Math.max(0, volumeLevel - 10);
        if (volumeLevelSpan) volumeLevelSpan.textContent = volumeLevel;
        if (volumeIndicator) {
            volumeIndicator.classList.add('show');
            setTimeout(() => volumeIndicator.classList.remove('show'), 2000);
        }
    }
    
    konamiCode.push(e.key);
    if (konamiCode.length > 10) konamiCode.shift();
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activatePartyMode();
        konamiCode = [];
    }
});

function activatePartyMode() {
    document.body.classList.add('party-mode');
    mainContainer.classList.add('rainbow-mode');
    showSecretPopup('🎊 PARTY MODE ACTIVADO! 🎊<br><br>Konami Code desbloqueado 🎮');
    createConfetti();
    for(let i = 0; i < 50; i++) setTimeout(createFloatingEmoji, i * 100);
    setTimeout(() => {
        document.body.classList.remove('party-mode');
        mainContainer.classList.remove('rainbow-mode');
    }, 10000);
}

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

// ========== FUNCIONES DE CONTENIDO ==========
function showContent(html) {
    if (!contentArea) return;
    contentArea.innerHTML = html;
    contentArea.classList.add('active');
    contentArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function showRandom() {
    showContent('<div class="loading">Cargando algo divertido... 🎲</div>');
    try {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();
        showContent(`
            <div class="meme-container">
                <h2>🎲 Algo para reír</h2>
                <img src="${data.url}" alt="${data.title}">
                <p style="text-align: center; margin-top: 15px; opacity: 0.8;">${data.title}</p>
            </div>
        `);
    } catch (error) {
        showContent('<div class="message">¡Ups! No pude cargar el meme 😅<br>Intenta de nuevo</div>');
    }
}

function showHistorias() {
    const historias = [
        { 
            titulo: "1️⃣ El niño de la moto del mall", 
            texto: "Cuando era niño, un día me perdí en el Mall de Santiago. Nadie sabía dónde estaba y mi mamá me buscaba por todos lados. Hasta que le preguntó a un guardia, y el guardia dijo:<br>\"¿No es el niño que está arriba de la moto en exhibición?\"<br>Sí… ese era yo." 
        },
        { 
            titulo: "2️⃣ El día que escapé a la casa de la vecina", 
            texto: "Cuando era niño, un día desaparecí de la casa. Nadie me encontraba por ningún lado.<br>Al final me encontraron en la casa de la vecina. Resulta que yo había escalado un muro que estaba en la casa y pasé para el otro lado.<br>Hasta el día de hoy nadie sabe cómo escalé ese muro… ni yo.<br>Supongo que soy un genio." 
        },
        { 
            titulo: "3️⃣ El ataque de la paloma", 
            texto: "En la media tenía una presentación para el Día del Profesor. Iba todo arreglado y bien preparado.<br>Cuando estaba llegando a la entrada del colegio… una paloma me cagó.<br>No sé qué había comido esa paloma, pero fue un baño total.<br>Hasta el día de hoy me río de eso." 
        },
        { 
            titulo: "4️⃣ Mi canal de YouTube que aún existe", 
            texto: "¿Te conté que una vez tuve un canal de YouTube?<br>Pues todavía existe:<br><a href='https://www.youtube.com/@Tasle' target='_blank'>https://www.youtube.com/@Tasle</a><br><br>Lo dejé ahí porque me da nostalgia… y también risa.<br>Aunque creo que me da más vergüenza que otra cosa." 
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
    
    if (historiasVistas.length === historias.length) {
        showContent(`
            <div class="historia-placeholder">
                <h2>📖 Mis Historias</h2>
                <p>Ya viste todas las historias por hoy. ¡Te aprecio mucho! ✨</p>
            </div>
        `);
        historiasVistas = [];
        historiaActual = 0;
        return;
    }
    
    const h = historias[historiaActual];
    if (!historiasVistas.includes(historiaActual)) historiasVistas.push(historiaActual);
    
    showContent(`
        <div class="historia-placeholder">
            <h2>📖 Mis Historias</h2>
            <h3 style="color: #FF6B9D;">${h.titulo}</h3>
            <p>${h.texto}</p>
            <p style="font-size: 0.8em; opacity: 0.6; margin-top: 20px;">Pulsa de nuevo para otra historia (${historiasVistas.length}/${historias.length})</p>
        </div>
    `);
    
    historiaActual = (historiaActual + 1) % historias.length;
}

function showMalDia() {
    const msgs = [
        "Respira profundo, mañana será mejor. 🌅",
        "Los días malos existen para que los buenos brillen. 💪",
        "Está bien no estar bien. Date permiso. 🌟",
        "Eres increíble siempre. ✨"
    ];
    const m = msgs[Math.floor(Math.random() * msgs.length)];
    showContent(`<div class="message"><h2>💙 Un Mensaje</h2><p>${m}</p></div>`);
}

function showMensajeDia() {
    const mensajes = [
        { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "Act as if what you do makes a difference. It does.", author: "William James" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Everything you can imagine is real.", author: "Pablo Picasso" }
    ];
    
    const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
    showContent(`
        <div class="quote">
            <h2>💫 Mensaje del Día</h2>
            <p style="margin-top: 30px;">"${msg.text}"</p>
            <p class="quote-author">— ${msg.author}</p>
        </div>
    `);
}

function showRecuerda() {
    const mensajes = [
        { text: "Eres suficiente tal cual eres. No necesitas ser perfecto para ser valioso.", author: "Tu corazón" },
        { text: "Tu valor no depende de opiniones ajenas. Eres único e irremplazable.", author: "La verdad" },
        { text: "Mereces amor, respeto y todas las cosas buenas que la vida tiene para ofrecer.", author: "El universo" },
        { text: "Eres más fuerte de lo que piensas, más valiente de lo que crees.", author: "Winnie the Pooh" },
        { text: "Tu historia no ha terminado. Cada día es una nueva página que puedes escribir.", author: "Tu futuro" }
    ];
    
    const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
    showContent(`
        <div class="quote">
            <h2>✨ Recuerda Quién Eres</h2>
            <p style="margin-top: 30px;">"${msg.text}"</p>
            <p class="quote-author">— ${msg.author}</p>
        </div>
    `);
}

function showMusica() {
    const canciones = [
        '71wFwRo8xGc4lrcyKwsvba', '5XJ7JsPDqNunEmGBTrgfhA', '5jW3rF4URMdK7tO2xjS5EI',
        '6y6EZKfsOZ7P3ALbnUuXik', '2Lk4eKx3eWaB4uxWguNXq0', '6kPCcIAGoTeRrh8qrmKa90'
    ];
    
    const randomSong = canciones[Math.floor(Math.random() * canciones.length)];
    showContent(`
        <div class="spotify-container">
            <h2>🎵 Música que podría gustarte</h2>
            <p style="margin: 20px 0;">Una canción random para alegrar tu día 😊</p>
            <iframe 
                src="https://open.spotify.com/embed/track/${randomSong}?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
        </div>
    `);
}

// ========== JUEGO SECRETO ==========
let eyeClickCount = 0;
function showSecretMessage() {
    eyeClickCount++;
    if (eyeClickCount === 3) {
        initGame();
        eyeClickCount = 0;
    }
}

function showSecretPopup(message) {
    const popup = document.getElementById('secretMessage');
    if (!popup) return;
    popup.innerHTML = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 4000);
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let gameRunning = false;
let score = 0;
let bird = { x: 50, y: 150, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let frameCount = 0;

function initGame() {
    if (!canvas) return;
    mainContainer.style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('gameScore').style.display = 'block';
    document.getElementById('gameOver').style.display = 'none';
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
    if (!gameRunning || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    ctx.font = '30px Arial';
    ctx.fillText('🐥', bird.x, bird.y);
    
    if (frameCount % 100 === 0) {
        let h = Math.random() * (canvas.height - 250) + 50;
        pipes.push({ x: canvas.width, h: h });
    }
    
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 3;
        ctx.fillStyle = '#75b855';
        ctx.fillRect(pipes[i].x, 0, 50, pipes[i].h);
        ctx.fillRect(pipes[i].x, pipes[i].h + 150, 50, canvas.height);
        
        if (bird.x + 25 > pipes[i].x && bird.x < pipes[i].x + 50) {
            if (bird.y < pipes[i].h || bird.y > pipes[i].h + 150) endGame();
        }
        
        if (pipes[i].x === bird.x) {
            score++;
            document.getElementById('gameScore').innerText = score;
        }
        
        if (pipes[i].x < -50) pipes.splice(i, 1);
    }
    
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

function handleJump() {
    if (gameRunning) bird.velocity = bird.lift;
}

if (canvas) {
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleJump();
    }, { passive: false });
    canvas.addEventListener('mousedown', handleJump);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameRunning) handleJump();
    });
}

// ========== SECRETOS MÓVILES ==========
function checkOrientation() {
    const overlay = document.getElementById('orientationOverlay');
    if (!overlay) return;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = window.innerWidth < 1024;
    overlay.style.display = (isLandscape && isMobile) ? 'flex' : 'none';
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
checkOrientation();

const daniSecret = document.getElementById('daniSecret');
let daniClicks = 0;
if (daniSecret) {
    daniSecret.addEventListener('pointerdown', () => {
        daniClicks++;
        if (daniClicks === 3) {
            showSecretPopup('💖 Eres la mejor persona del mundo! 💖');
            createConfetti();
            daniClicks = 0;
        }
    });
}

// Vínculo Cristal
const beam = document.getElementById('beam');
let isCrystal = false;

document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();
        isCrystal = true;
        updateBeam(e.touches[0], e.touches[1]);
        if (beam) beam.style.display = 'block';
        showSecretPopup('✨ ¡VÍNCULO DE CRISTAL! ✨');
    }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (isCrystal && e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();
        updateBeam(e.touches[0], e.touches[1]);
        if (Math.random() > 0.8) createFloatingEmoji();
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    if (isCrystal) {
        isCrystal = false;
        if (beam) beam.style.display = 'none';
        const touch = e.changedTouches[0];
        createRipple(touch.clientX, touch.clientY);
    }
});

function updateBeam(t1, t2) {
    if (!beam) return;
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

// Lluvia de amor
let startY = -1;
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (startY !== -1) {
        let diff = e.touches[0].clientY - startY;
        if (diff > 50 && startY < 200 && e.cancelable) e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    if (startY !== -1 && (e.changedTouches[0].clientY - startY) > 180) {
        startEmojiRain();
    }
    startY = -1;
});

function startEmojiRain() {
    showSecretPopup('🌧️ ¡LLUVIA DE AMOR! 🌧️');
    const inter = setInterval(() => {
        for(let i=0; i<5; i++) {
            const e = document.createElement('div');
            e.className = 'confetti';
            e.innerHTML = ['❤️', '💖', '✨', '🌈', '🌸'][Math.floor(Math.random() * 5)];
            e.style.left = Math.random()*100+'%';
            e.style.top = '-50px';
            e.style.fontSize = (Math.random() * 20 + 20) + 'px';
            e.style.background = 'none';
            document.body.appendChild(e);
            setTimeout(() => e.remove(), 4000);
        }
    }, 100);
    setTimeout(() => clearInterval(inter), 6000);
}

// Modo linterna
let bgClicks = 0;
let isFlash = false;
document.body.addEventListener('mousedown', (e) => {
    if (e.target === document.body || e.target.id === 'floatingHearts') {
        bgClicks++;
        if (bgClicks === 3) {
            isFlash = !isFlash;
            const ov = document.getElementById('flashlightOverlay');
            if (ov) ov.style.display = isFlash ? 'block' : 'none';
            document.querySelectorAll('.flashlight-text').forEach(t => t.style.display = isFlash ? 'block' : 'none');
            if (isFlash) showSecretPopup('🔦 Modo Linterna activado');
            bgClicks = 0;
        }
        setTimeout(() => bgClicks = 0, 1000);
    }
});

document.addEventListener('mousemove', (e) => {
    if (!isFlash) return;
    const ov = document.getElementById('flashlightOverlay');
    if (ov) {
        const m = `radial-gradient(circle 120px at ${e.clientX}px ${e.clientY}px, transparent 0%, black 100%)`;
        ov.style.maskImage = m;
        ov.style.webkitMaskImage = m;
    }
});

// Carga de amor
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

window.addEventListener('resize', () => {
    if (gameRunning && canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
