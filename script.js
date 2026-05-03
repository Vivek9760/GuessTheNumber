const MAX = 6;
let secret, left, lo, hi, count, over;

const hints = [
  [
    "💡 Think of any number between 1 and 100!",
    "You got this! 💪",
    "Hmm, interesting choice! 🤔",
    "Getting warmer... maybe! 🔥",
    "You're so close! Or maybe not... 😅",
    "Last chance! Make it count! 😬",
  ],
  [
    "Let's goooo! 🚀",
    "Ooh that's brave! 😄",
    "The number is somewhere in there! 🎯",
    "You're a detective now! 🕵️",
    "Almost there! Probably! 🤞",
    "Don't panic! 😤",
  ],
];
const highHints = [
  "⬇️ Too high! Come down a little!",
  "🎈 Too big! Try something smaller!",
  "⬇️ Nope! Go lower!",
  "😅 Way too high! Come waaaay down!",
  "⬇️ Still too high! Almost no chances left!",
  "😱 TOO HIGH! Last guess!!",
];
const lowHints = [
  "⬆️ Too low! Go higher!",
  "🐢 Too small! Think bigger!",
  "⬆️ Nope! Aim higher!",
  "😅 Way too low! Go waaaay up!",
  "⬆️ Still too low! Almost no chances left!",
  "😱 TOO LOW! Last guess!!",
];
const winMsgs = [
  "Wow, you found it in {n} tries! Amazing! 🌟",
  "Only {n} guess{es}?! You're a genius! 🧠",
  "{n} tries and you got it! Super smart! 🦄",
  "You did it in {n} guess{es}! Incredible! ⭐",
];
const loseMsgs = [
  "The number was {x}. So close yet so far! 😭",
  "It was {x} all along! You'll get it next time! 🌈",
  "Aww, it was {x}! Don't give up! 🦋",
  "The secret was {x}! Better luck next time! 🌟",
];
const winSarcasms = [
  "I knew you could do it! (Okay I wasn't sure, but still!) 😄",
  "You must be really good at math! Or very lucky! 🎲",
  "The number was no match for your big brain! 🧠",
  "You solved my puzzle! I need a harder one! 🤭",
];
const loseSarcasms = [
  "Six guesses and still no luck? The number was hiding SO well! 🙈",
  "That number was a sneaky one! Don't feel bad! 😊",
  "Even the flowers felt sad for you... but try again! 🌸",
  "The number won this round! Rematch? 🥊",
];

function rnd(a) {
  return a[Math.floor(Math.random() * a.length)];
}
function el(id) {
  return document.getElementById(id);
}
function show(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  el(id).classList.add("active");
}

function startGame() {
  show("screen-game");
  initGame();
}

function initGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  left = MAX;
  lo = 1;
  hi = 100;
  count = 0;
  over = false;
  renderDots();
  updateAttempts();
  updateRange();
  setHint(hints[0][0]);
  hideFeedback();
  const inp = el("guess-input");
  if (inp) {
    inp.value = "";
    inp.disabled = false;
  }
  el("check-btn").disabled = false;
  const nb = el("num-box");
  nb.textContent = "?";
  nb.className = "num-box";
}

function renderDots() {
  const row = el("dots-row");
  row.innerHTML = "";
  for (let i = 0; i < MAX; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i >= left ? " used" : "");
    row.appendChild(d);
  }
}

function updateAttempts() {
  el("attempts-label").textContent = left === 1 ? "⚠️ Last chance!" : `❤️ ${left} tries left`;
}

function updateRange() {
  const fill = el("range-fill");
  const p = (v) => ((v - 1) / 99) * 100;
  fill.style.left = p(lo) + "%";
  fill.style.width = p(hi) - p(lo) + "%";
  el("lo-lbl").textContent = lo;
  el("hi-lbl").textContent = hi;
}

function setHint(t) {
  el("hint-box").textContent = t;
}

function showFeedback(t, type) {
  const f = el("feedback");
  f.textContent = t;
  f.className = "feedback " + type;
  requestAnimationFrame(() => f.classList.add("show"));
}

function hideFeedback() {
  const f = el("feedback");
  f.classList.remove("show");
  f.className = "feedback";
}

function makeGuess() {
  if (over) return;
  const inp = el("guess-input");
  const v = parseInt(inp.value, 10);
  if (!inp.value.trim() || isNaN(v)) {
    shakeEl("guess-input");
    showFeedback("🔢 Enter a number first!", "err");
    return;
  }
  if (v < 1 || v > 100) {
    shakeEl("guess-input");
    showFeedback("😬 Pick between 1 and 100!", "err");
    return;
  }
  left--;
  count++;
  inp.value = "";
  renderDots();
  updateAttempts();
  if (v === secret) {
    over = true;
    el("guess-input").disabled = true;
    el("check-btn").disabled = true;
    const nb = el("num-box");
    nb.textContent = secret;
    nb.className = "num-box revealed-win";
    showFeedback("🎉 Correct! Amazing!", "win");
    fireConfetti();
    const tries = MAX - left;
    setTimeout(() => {
      const msg = rnd(winMsgs)
        .replace("{n}", tries)
        .replace("{es}", tries === 1 ? "" : "es")
        .replace("{x}", secret);
      el("win-msg").textContent = `The number was ${secret}! ${msg}`;
      el("win-sarcasm").textContent = rnd(winSarcasms);
      show("screen-win");
    }, 900);
    return;
  }
  if (v > secret) {
    hi = Math.min(hi, v - 1);
    showFeedback("⬇️ Too high! Go lower!", "high");
    setHint(highHints[Math.min(count - 1, highHints.length - 1)]);
  } else {
    lo = Math.max(lo, v + 1);
    showFeedback("⬆️ Too low! Go higher!", "low");
    setHint(lowHints[Math.min(count - 1, lowHints.length - 1)]);
  }
  updateRange();
  if (left === 0) {
    over = true;
    el("guess-input").disabled = true;
    el("check-btn").disabled = true;
    const nb = el("num-box");
    nb.textContent = secret;
    nb.className = "num-box revealed-lose";
    setTimeout(() => {
      el("lose-msg").textContent = rnd(loseMsgs).replace("{x}", secret);
      el("lose-sarcasm").textContent = rnd(loseSarcasms);
      show("screen-lose");
    }, 700);
  }
}

function resetGame() {
  show("screen-game");
  initGame();
}

function shakeEl(id) {
  const e = el(id);
  e.classList.remove("shake");
  void e.offsetWidth;
  e.classList.add("shake");
  e.addEventListener("animationend", () => e.classList.remove("shake"), { once: true });
}

function fireConfetti() {
  const wrap = el("confetti");
  wrap.innerHTML = "";
  wrap.classList.add("show");
  const colors = ["#ff6fb0", "#ff9f43", "#a29bfe", "#74b9ff", "#ffeaa7", "#55efc4", "#fd79a8", "#fdcb6e"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "conf";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = 8 + Math.random() * 10 + "px";
    c.style.height = 8 + Math.random() * 10 + "px";
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    c.style.animationDelay = Math.random() * 1 + "s";
    c.style.animationDuration = 1.5 + Math.random() + "s";
    wrap.appendChild(c);
  }
  setTimeout(() => {
    wrap.classList.remove("show");
    wrap.innerHTML = "";
  }, 3000);
}

el("guess-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeGuess();
});
