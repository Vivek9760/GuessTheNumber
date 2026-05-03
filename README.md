# 🎈 Guess The Number — Kids Edition

🌐 **Live Demo:** [https://vivek9760.github.io/GuessTheNumber/game.html](https://vivek9760.github.io/GuessTheNumber/game.html)

A fun, colorful number-guessing game designed for kids! Built with pure HTML, CSS, and JavaScript — zero dependencies, one file, works everywhere.

---

## 🚀 How to Play

1. Open `guess-the-number.html` in any browser
2. Press **"Let's Play!"**
3. Type a number between **1 and 100** and press **Check ✓** (or hit Enter)
4. Follow the hints — **Too High ⬇️** or **Too Low ⬆️**
5. Guess the number in **6 tries** to win! 🏆

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 Kids Theme | Bright colors, fun fonts, animated sky, clouds, flowers |
| 📱 Fully Responsive | Works on phones, tablets, and desktops — no scrolling needed |
| 🎯 Smart Range Bar | Visually narrows as you eliminate numbers |
| ❤️ Attempt Tracker | 6 dot indicators turn red as you use guesses |
| 🎉 Confetti | Bursts of confetti on a win! |
| 💬 Fun Messages | Encouraging (and slightly sarcastic) hints each round |
| 🔄 Instant Replay | Play again without reloading the page |
| ⌨️ Keyboard Support | Press Enter to submit a guess |

---

## 📁 File Structure

```
guess-the-number.html   ← The entire game (HTML + CSS + JS in one file)
README.md               ← This file
```

That's it. Just one HTML file!

---

## 🛠️ How It Works

### HTML Structure
Four screens are stacked inside a single page, only one shown at a time:

```
#screen-start  →  Welcome / Start button
#screen-game   →  Active gameplay
#screen-win    →  Victory screen with confetti
#screen-lose   →  Game over screen
```

### JavaScript Logic
- A random number `1–100` is generated at game start with `Math.random()`
- Each guess narrows `lo` (lower bound) and `hi` (upper bound)
- The range bar reflects the remaining range visually
- 6 attempt dots turn red as guesses are used
- Win/lose screens appear after a short animation delay

### CSS Approach
- `clamp()` values make every font size and element scale smoothly across screen sizes
- `overflow: hidden` on both `html` and `body` prevents all scrolling
- Background uses CSS shapes for clouds, hills, and animated floating emojis
- All animations are CSS-only (no libraries)

---

## 🎨 Customization

### Change the number of attempts
In `script.js` section, change:
```js
const MAX = 6;   // ← change to any number
```

### Change the number range
Update the input attributes and the random number generation:
```html
<input ... min="1" max="100" ...>
```
```js
secret = Math.floor(Math.random() * 100) + 1;
//                              ^^^  change max range
```

### Change colors
All colors are CSS variables at the top of the `<style>` block:
```css
:root {
  --pink: #ff6fb0;
  --purple: #a29bfe;
  --green: #55efc4;
  /* etc. */
}
```

### Change the mascot / emoji
Find the mascot line in the start screen:
```html
<div class="mascot">🐨</div>
```
Replace `🐨` with any emoji!

---

## 🌐 Browser Support

Works in all modern browsers:
- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Samsung Internet

No build tools, no npm, no dependencies. Just open and play.

---

## 📝 License

Free to use, modify, and share. Have fun! 🎉