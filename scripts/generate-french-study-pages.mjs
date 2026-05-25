import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const args = new Map()
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i], process.argv[i + 1])
}

const contentDir = args.get("--content")
const sourceDir = args.get("--source")

if (!contentDir) {
  throw new Error("Missing --content <French content directory>")
}

const lessonFileName = "Lesson 1-12  Vocabulaire.md"
const quizFileName = "Lesson 1-12 图片选词练习.md"
const flashcardFileName = "Lesson 1-12 Flashcards.md"
const trainerDataFileName = "lesson-1-12-vocab-data.json"
const trainerScriptFileName = "french-vocab-trainer.js"
const trainerStyleFileName = "french-vocab-trainer.css"

const lessonPath = path.join(contentDir, lessonFileName)
const lessonText = await readFile(lessonPath, "utf8")

const wordClassPattern =
  /\s+(?:n\.(?:m|f)(?:\.pl)?\.?|n\.|adj\.\/n\.|adj\.|adv\.|v\.|pron\.)$/u

const termIconMap = new Map([
  ["monsieur", "👨"],
  ["madame", "👩"],
  ["mademoiselle", "👩"],
  ["ami(e)", "🤝"],
  ["copain/copine", "🤝"],
  ["garçon", "🧑"],
  ["fille", "👧"],
  ["femme", "👩"],
  ["homme", "👨"],
  ["père", "👨"],
  ["mère", "👩"],
  ["frère", "👦"],
  ["sœur", "👧"],
  ["fils", "👦"],
  ["professeur", "🧑‍🏫"],
  ["secrétaire", "🗂️"],
  ["photographe", "📷"],
  ["dentiste", "🦷"],
  ["boulanger/boulangère", "🥖"],
  ["artiste", "🎨"],
  ["musicien/musicienne", "🎵"],
  ["peintre", "🎨"],
  ["sculpteur/sculptrice", "🗿"],
  ["France", "🇫🇷"],
  ["Chine", "🇨🇳"],
  ["Japon", "🇯🇵"],
  ["Italie", "🇮🇹"],
  ["Canada", "🇨🇦"],
  ["Espagne", "🇪🇸"],
  ["Allemagne", "🇩🇪"],
  ["Belgique", "🇧🇪"],
  ["Suisse", "🇨🇭"],
  ["Europe", "🗺️"],
  ["monde", "🌍"],
  ["Paris", "🗼"],
  ["Rome", "🏛️"],
  ["bonjour", "👋"],
  ["bonsoir", "🌙"],
  ["salut", "👋"],
  ["au revoir", "👋"],
  ["merci", "🙏"],
  ["bienvenue", "🎉"],
  ["bon voyage", "🧳"],
  ["bon week-end", "📅"],
  ["bon anniversaire", "🎂"],
  ["nom", "🏷️"],
  ["prénom", "🏷️"],
  ["âge", "🎂"],
  ["adresse", "📍"],
  ["e-mail", "✉️"],
  ["téléphone", "☎️"],
  ["numéro", "🔢"],
  ["carte", "🪪"],
  ["carte postale", "💌"],
  ["appartement", "🏠"],
  ["chambre", "🛏️"],
  ["salon", "🛋️"],
  ["cuisine", "🍳"],
  ["salle de bains", "🛁"],
  ["toilettes", "🚻"],
  ["entrée", "🚪"],
  ["fenêtre", "🪟"],
  ["porte", "🚪"],
  ["mur", "🧱"],
  ["table", "🍽️"],
  ["chaise", "🪑"],
  ["étagère", "🗄️"],
  ["lit", "🛏️"],
  ["livre", "📘"],
  ["affiche", "🖼️"],
  ["tableau", "🖼️"],
  ["photo", "📷"],
  ["vase", "🏺"],
  ["assiette", "🍽️"],
  ["fourchette", "🍴"],
  ["sac", "🎒"],
  ["clé", "🔑"],
  ["ordinateur", "💻"],
  ["télévision", "📺"],
  ["blouson", "🧥"],
  ["chapeau", "🎩"],
  ["chemise", "👔"],
  ["chaussures", "👟"],
  ["lunettes", "👓"],
  ["pantalon", "👖"],
  ["robe", "👗"],
  ["pull", "🧶"],
  ["baskets", "👟"],
  ["vêtement", "👕"],
  ["boutique", "🛍️"],
  ["à gauche", "⬅️"],
  ["à droite", "➡️"],
  ["devant", "⬆️"],
  ["derrière", "⬇️"],
  ["rue", "🛣️"],
  ["banque", "🏦"],
  ["bibliothèque", "📚"],
  ["cinéma", "🎬"],
  ["musée", "🏛️"],
  ["opéra", "🎭"],
  ["poste", "📮"],
  ["restaurant", "🍽️"],
  ["café", "☕"],
  ["hôtel", "🏨"],
  ["lycée", "🏫"],
  ["jardin", "🌿"],
  ["parking", "🅿️"],
  ["grand(e)", "📏"],
  ["petit(e)", "🤏"],
  ["jeune", "🌱"],
  ["vieux/vieille", "🕰️"],
  ["nouveau/nouvelle", "✨"],
  ["beau/belle", "🌟"],
  ["rouge", "🟥"],
  ["bleu(e)", "🟦"],
  ["blanc/blanche", "⬜"],
  ["noir(e)", "⬛"],
  ["vert(e)", "🟩"],
  ["gris(e)", "◻️"],
  ["jaune", "🟨"],
  ["marron", "🟫"],
  ["shopping", "🛍️"],
  ["acheter", "🛒"],
  ["prix", "🏷️"],
  ["euro", "💶"],
  ["art", "🎨"],
  ["film", "🎬"],
  ["musique", "🎵"],
  ["sport", "🏃"],
  ["nature", "🌿"],
  ["lecture", "📖"],
  ["dessin", "✏️"],
  ["poème", "📜"],
  ["aller", "➡️"],
  ["venir", "⬅️"],
  ["partir", "🚶"],
  ["arriver", "📍"],
  ["à pied", "🚶"],
  ["à vélo", "🚲"],
  ["à moto", "🏍️"],
  ["en voiture", "🚗"],
  ["en bus", "🚌"],
  ["en métro", "🚇"],
  ["en train", "🚆"],
  ["en avion", "✈️"],
  ["en bateau", "⛵"],
  ["bus", "🚌"],
  ["métro", "🚇"],
  ["vélo", "🚲"],
  ["voiture", "🚗"],
  ["train", "🚆"],
  ["avion", "✈️"],
  ["bateau", "⛵"],
  ["hélicoptère", "🚁"],
  ["aéroport", "✈️"],
  ["port", "⚓"],
  ["quai", "🚉"],
  ["billet", "🎫"],
  ["voyage", "🧳"],
  ["destination", "📍"],
  ["kilomètre", "📏"],
  ["mer", "🌊"],
  ["plage", "🏖️"],
  ["piscine", "🏊"],
  ["terrasse", "🌤️"],
  ["île", "🏝️"],
  ["montagne", "⛰️"],
  ["sud", "⬇️"],
  ["nord", "⬆️"],
  ["ouest", "⬅️"],
  ["est", "➡️"],
  ["jour", "☀️"],
  ["week-end", "📅"],
  ["air", "💨"],
  ["aquarium", "🐠"],
  ["château", "🏰"],
  ["prison", "🔒"],
  ["palais", "🏛️"],
  ["cathédrale", "⛪"],
  ["tourisme", "🧳"],
  ["je", "🙋"],
  ["tu", "👉"],
  ["il", "👨"],
  ["elle", "👩"],
  ["nous", "👥"],
  ["vous", "👥"],
  ["ils", "👥"],
  ["elles", "👥"],
  ["qui", "❓"],
  ["quoi", "❓"],
  ["où", "📍"],
  ["comment", "❓"],
  ["combien", "🔢"],
  ["pourquoi", "❓"],
  ["oui", "✅"],
  ["non", "❌"],
  ["zéro", "0"],
  ["un/une", "1"],
  ["deux", "2"],
  ["trois", "3"],
  ["quatre", "4"],
  ["cinq", "5"],
  ["six", "6"],
  ["sept", "7"],
  ["huit", "8"],
  ["neuf", "9"],
  ["dix", "10"],
  ["onze", "11"],
  ["douze", "12"],
  ["treize", "13"],
  ["quatorze", "14"],
  ["quinze", "15"],
  ["seize", "16"],
  ["vingt", "20"],
  ["trente", "30"],
  ["cent", "100"],
  ["mille", "1000"],
])

const sectionIcons = [
  "👥",
  "🗺️",
  "👋",
  "🏠",
  "📍",
  "🎨",
  "🛍️",
  "🎭",
  "🚆",
  "🌊",
  "❓",
  "🏃",
  "🔢",
]

function cleanTerm(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(wordClassPattern, "")
    .replace(/\s+(?:n|adj|adv|v|pron)\.$/u, "")
    .trim()
}

function normalize(value) {
  return value
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function html(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function parseRows(markdown) {
  const rows = []
  let section = "Vocabulaire"

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim()
    const heading = line.match(/^##\s+(.*)$/u)
    if (heading) {
      section = heading[1].replace(/^\d+\.\s*/, "").trim()
      continue
    }

    if (!line.startsWith("|") || /^\|\s*-/.test(line)) {
      continue
    }

    const cells = line
      .split("|")
      .slice(1)
      .map((part) => part.trim())
      .filter(Boolean)

    if (cells.length < 2) {
      continue
    }

    const [rawTerm, rawTranslation] = cells
    if (/^(法语|中文|动词)$/u.test(rawTerm) || /^(法语|中文)$/u.test(rawTranslation)) {
      continue
    }

    const term = cleanTerm(rawTerm)
    const translation = rawTranslation.replace(/\s+/g, " ").trim()
    if (term && translation) {
      rows.push({ term, rawTerm, translation, section })
    }
  }

  const seen = new Set()
  return rows.filter((row) => {
    const key = `${row.section}::${normalize(row.term)}::${row.translation}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

function buildGroups(rows) {
  const groupMap = new Map()
  for (const row of rows) {
    if (!groupMap.has(row.section)) {
      groupMap.set(row.section, [])
    }
    groupMap.get(row.section).push(row)
  }

  return [...groupMap.entries()].map(([name, items], index) => ({
    id: `section-${index + 1}`,
    name,
    icon: sectionIcons[index % sectionIcons.length],
    items: items.map((item, itemIndex) => ({
      id: `w-${index + 1}-${itemIndex + 1}`,
      icon: termIconMap.get(item.term) ?? sectionIcons[index % sectionIcons.length],
      ...item,
    })),
  }))
}

const rows = parseRows(lessonText)
const groups = buildGroups(rows)
const totalCards = groups.reduce((total, group) => total + group.items.length, 0)

function buildQuizPage() {
  const data = JSON.stringify({ generatedAt: new Date().toISOString(), totalCards, groups }).replace(
    /</g,
    "\\u003c",
  )

  return `---
title: Lesson 1-12 图片选词练习
tags:
  - flashcards
---

# Lesson 1-12 图片选词练习

先选择一个词汇分类，再像百词斩一样一张一张选择对应的法语单词。每次打开页面都会重新随机排序。

[[Lesson 1-12  Vocabulaire|返回词汇表]] · [[Lesson 1-12 Flashcards|打开闪卡]]

<div id="frq-app" class="frq-app"><section class="frq-menu" aria-label="选择词汇分类"><div class="frq-menu-head"><strong>选择分类</strong><span data-total-count>${totalCards} 个词</span></div><div class="frq-categories" data-categories></div></section><section class="frq-trainer" data-trainer hidden><div class="frq-topbar"><button type="button" data-back>分类</button><div><strong data-section-title></strong><span data-progress></span></div><button type="button" data-reshuffle>重排</button></div><div class="frq-card" data-card><div class="frq-picture"><span data-icon></span></div><div class="frq-prompt"><p data-translation></p><small data-section-label></small></div><div class="frq-options" data-options></div><p class="frq-feedback" data-feedback></p><button type="button" class="frq-next" data-next hidden>下一个</button></div></section></div>

<style>
.frq-app {
  margin: 1.5rem 0;
}
.frq-menu-head,
.frq-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.frq-menu-head span,
.frq-topbar span {
  color: var(--gray);
  font-size: 0.95rem;
}
.frq-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}
.frq-category {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.8rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
  text-align: left;
}
.frq-category:hover,
.frq-category:focus-visible {
  border-color: var(--secondary);
  outline: none;
}
.frq-category .frq-cat-icon {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--tertiary) 24%, transparent);
  font-size: 1.35rem;
}
.frq-category strong {
  display: block;
  line-height: 1.2;
}
.frq-category small {
  color: var(--gray);
}
.frq-category em {
  color: var(--secondary);
  font-style: normal;
  font-weight: 700;
}
.frq-topbar button,
.frq-next {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.45rem 0.7rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
}
.frq-card {
  max-width: 680px;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
  background: color-mix(in srgb, var(--light) 94%, var(--secondary));
}
.frq-picture {
  display: grid;
  place-items: center;
  min-height: 210px;
  border-radius: 8px;
  background:
    radial-gradient(circle at 18% 18%, rgba(132, 165, 157, 0.26), transparent 30%),
    radial-gradient(circle at 82% 22%, rgba(255, 214, 102, 0.18), transparent 26%),
    linear-gradient(135deg, rgba(123, 151, 170, 0.2), rgba(132, 165, 157, 0.1));
  border: 1px solid color-mix(in srgb, var(--lightgray) 70%, var(--tertiary));
}
.frq-picture span {
  font-size: 5rem;
  line-height: 1;
}
.frq-prompt p {
  margin: 1rem 0 0.15rem;
  font-size: 1.35rem;
  font-weight: 800;
}
.frq-prompt small {
  color: var(--gray);
}
.frq-options {
  display: grid;
  gap: 0.55rem;
  margin-top: 1rem;
}
.frq-option {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.72rem 0.85rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
}
.frq-option:hover,
.frq-option:focus-visible {
  border-color: var(--secondary);
  outline: none;
}
.frq-option.is-correct {
  border-color: #2f8f5b;
  background: rgba(47, 143, 91, 0.16);
}
.frq-option.is-wrong {
  border-color: #b65f4b;
  background: rgba(182, 95, 75, 0.16);
}
.frq-feedback {
  min-height: 1.6rem;
  margin: 0.9rem 0 0;
  font-weight: 800;
}
.frq-feedback.good {
  color: #2f8f5b;
}
.frq-feedback.bad {
  color: #b65f4b;
}
.frq-choice-list {
  margin: 0.55rem 0 0;
  padding-left: 1.2rem;
}
.frq-choice-list li {
  margin: 0.18rem 0;
}
.frq-next {
  margin-top: 0.7rem;
  width: 100%;
  font-weight: 800;
}
@media (max-width: 560px) {
  .frq-menu-head,
  .frq-topbar {
    align-items: flex-start;
    flex-direction: column;
  }
  .frq-card {
    padding: 0.85rem;
  }
  .frq-picture {
    min-height: 150px;
  }
  .frq-picture span {
    font-size: 4rem;
  }
}
</style>

<script type="application/json" id="frq-data">${data}</script>
<script>
(() => {
  const root = document.getElementById("frq-app")
  const dataNode = document.getElementById("frq-data")
  if (!root || !dataNode || root.dataset.ready === "true") return
  root.dataset.ready = "true"

  const data = JSON.parse(dataNode.textContent)
  const categories = root.querySelector("[data-categories]")
  const menu = root.querySelector(".frq-menu")
  const trainer = root.querySelector("[data-trainer]")
  const title = root.querySelector("[data-section-title]")
  const progress = root.querySelector("[data-progress]")
  const icon = root.querySelector("[data-icon]")
  const translation = root.querySelector("[data-translation]")
  const sectionLabel = root.querySelector("[data-section-label]")
  const options = root.querySelector("[data-options]")
  const feedback = root.querySelector("[data-feedback]")
  const next = root.querySelector("[data-next]")
  const back = root.querySelector("[data-back]")
  const reshuffle = root.querySelector("[data-reshuffle]")

  let state = { group: null, deck: [], index: 0, locked: false, timer: null }

  const allItems = data.groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, sectionName: group.name, sectionIcon: group.icon })),
  )
  const allGroup = {
    id: "all",
    name: "全部词汇",
    icon: "🔀",
    items: allItems,
  }

  function shuffle(items) {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  function sampleOptions(answer, pool) {
    const picked = [answer.term]
    const shuffled = shuffle(pool.filter((item) => item.id !== answer.id))
    for (const item of shuffled) {
      if (!picked.includes(item.term)) picked.push(item.term)
      if (picked.length === 4) break
    }
    return shuffle(picked)
  }

  function showMenu() {
    clearTimeout(state.timer)
    trainer.hidden = true
    menu.hidden = false
  }

  function startGroup(group) {
    state = { group, deck: shuffle(group.items), index: 0, locked: false, timer: null }
    menu.hidden = true
    trainer.hidden = false
    title.textContent = group.name
    renderCard()
  }

  function renderCategories() {
    const groups = [allGroup, ...data.groups]
    categories.innerHTML = groups
      .map(
        (group) => \`<button type="button" class="frq-category" data-group="\${group.id}">
          <span class="frq-cat-icon">\${group.icon}</span>
          <span><strong>\${group.name}</strong><small>\${group.items.length} 个词</small></span>
          <em>开始</em>
        </button>\`,
      )
      .join("")

    for (const button of categories.querySelectorAll("[data-group]")) {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-group")
        startGroup(groups.find((group) => group.id === id))
      })
    }
  }

  function renderCard() {
    clearTimeout(state.timer)
    state.locked = false
    next.hidden = true
    feedback.textContent = ""
    feedback.className = "frq-feedback"

    if (state.index >= state.deck.length) {
      state.deck = shuffle(state.group.items)
      state.index = 0
    }

    const item = state.deck[state.index]
    const pool = state.group.id === "all" ? state.group.items : state.group.items
    progress.textContent = \`\${state.index + 1} / \${state.deck.length}\`
    icon.textContent = item.icon || item.sectionIcon || state.group.icon
    translation.textContent = item.translation
    sectionLabel.textContent = item.sectionName || state.group.name
    options.innerHTML = ""

    for (const option of sampleOptions(item, pool)) {
      const button = document.createElement("button")
      button.type = "button"
      button.className = "frq-option"
      button.textContent = option
      button.addEventListener("click", () => answer(button, item, option))
      options.append(button)
    }
  }

  function answer(button, item, option) {
    if (state.locked) return
    state.locked = true
    const correct = option === item.term

    for (const optionButton of options.querySelectorAll("button")) {
      optionButton.disabled = true
      if (optionButton.textContent === item.term) optionButton.classList.add("is-correct")
    }

    if (!correct) button.classList.add("is-wrong")
    feedback.textContent = correct
      ? \`正确：\${item.term} = \${item.translation}\`
      : \`答案：\${item.term} = \${item.translation}\`
    feedback.classList.add(correct ? "good" : "bad")
    next.hidden = false
    state.index += 1
    state.timer = setTimeout(renderCard, correct ? 650 : 1100)
  }

  next.addEventListener("click", renderCard)
  back.addEventListener("click", showMenu)
  reshuffle.addEventListener("click", () => startGroup(state.group))
  renderCategories()
})()
</script>
`
}

function buildFlashcardsPage() {
  const sections = groups
    .map((group) => {
      const cards = group.items.map((item) => `${item.term}::${item.translation}`).join("\n")
      return `## ${group.name}\n\n${cards}`
    })
    .join("\n\n")

  return `---
title: Lesson 1-12 Flashcards
tags:
  - flashcards
---

# Lesson 1-12 Flashcards

#flashcards

[[Lesson 1-12  Vocabulaire|返回词汇表]] · [[Lesson 1-12 图片选词练习|图片选词练习]]

${sections}
`
}

function buildQuizPageV2() {
  return `---
title: Lesson 1-12 图片选词练习
tags:
  - flashcards
---

# Lesson 1-12 图片选词练习

先选择一个词汇分类，再像百词斩一样一张一张选择对应的法语单词。每次打开页面都会重新随机排序。

[[Lesson 1-12  Vocabulaire|返回词汇表]] · [[Lesson 1-12 Flashcards|打开闪卡]]

<link rel="stylesheet" href="./${trainerStyleFileName}">
<div id="frq-app" class="frq-app" data-data-url="./${trainerDataFileName}" data-total-count="${totalCards}"><section class="frq-loading">正在加载词卡...</section></div>
<script src="./${trainerScriptFileName}"></script>
`
}

function buildTrainerData() {
  return `${JSON.stringify({ generatedAt: new Date().toISOString(), totalCards, groups }, null, 2)}\n`
}

function buildTrainerStyle() {
  return `.frq-app {
  margin: 1.5rem 0;
}
.frq-menu-head,
.frq-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.frq-menu-head span,
.frq-topbar span {
  color: var(--gray);
  font-size: 0.95rem;
}
.frq-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}
.frq-category {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.8rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
  text-align: left;
}
.frq-category:hover,
.frq-category:focus-visible {
  border-color: var(--secondary);
  outline: none;
}
.frq-cat-icon {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--tertiary) 24%, transparent);
  font-size: 1.35rem;
}
.frq-category strong {
  display: block;
  line-height: 1.2;
}
.frq-category small {
  color: var(--gray);
}
.frq-category em {
  color: var(--secondary);
  font-style: normal;
  font-weight: 700;
}
.frq-topbar button,
.frq-next {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.45rem 0.7rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
}
.frq-card {
  max-width: 680px;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
  background: color-mix(in srgb, var(--light) 94%, var(--secondary));
}
.frq-picture {
  display: grid;
  place-items: center;
  min-height: 210px;
  border-radius: 8px;
  background:
    radial-gradient(circle at 18% 18%, rgba(132, 165, 157, 0.26), transparent 30%),
    radial-gradient(circle at 82% 22%, rgba(255, 214, 102, 0.18), transparent 26%),
    linear-gradient(135deg, rgba(123, 151, 170, 0.2), rgba(132, 165, 157, 0.1));
  border: 1px solid color-mix(in srgb, var(--lightgray) 70%, var(--tertiary));
}
.frq-picture span {
  font-size: 5rem;
  line-height: 1;
}
.frq-prompt p {
  margin: 1rem 0 0.15rem;
  font-size: 1.35rem;
  font-weight: 800;
}
.frq-prompt small {
  color: var(--gray);
}
.frq-options {
  display: grid;
  gap: 0.55rem;
  margin-top: 1rem;
}
.frq-option {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.72rem 0.85rem;
  background: var(--light);
  color: var(--dark);
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
}
.frq-option:hover,
.frq-option:focus-visible {
  border-color: var(--secondary);
  outline: none;
}
.frq-option.is-correct {
  border-color: #2f8f5b;
  background: rgba(47, 143, 91, 0.16);
}
.frq-option.is-wrong {
  border-color: #b65f4b;
  background: rgba(182, 95, 75, 0.16);
}
.frq-feedback {
  min-height: 1.6rem;
  margin: 0.9rem 0 0;
  font-weight: 800;
}
.frq-feedback.good {
  color: #2f8f5b;
}
.frq-feedback.bad {
  color: #b65f4b;
}
.frq-next {
  margin-top: 0.7rem;
  width: 100%;
  font-weight: 800;
}
.frq-loading,
.frq-error {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
}
@media (max-width: 560px) {
  .frq-menu-head,
  .frq-topbar {
    align-items: flex-start;
    flex-direction: column;
  }
  .frq-card {
    padding: 0.85rem;
  }
  .frq-picture {
    min-height: 150px;
  }
  .frq-picture span {
    font-size: 4rem;
  }
}
`
}

function buildTrainerScript() {
  return `(() => {
  function initTrainer(root) {
    if (!root || root.dataset.ready === "true") return
    root.dataset.ready = "true"

    const dataUrl = root.dataset.dataUrl
    root.innerHTML = '<section class="frq-loading">正在加载词卡...</section>'

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Cannot load vocabulary data")
        return response.json()
      })
      .then((data) => renderTrainer(root, data))
      .catch(() => {
        root.innerHTML = '<section class="frq-error">词卡数据加载失败，请稍后刷新。</section>'
      })
  }

  function renderTrainer(root, data) {
    root.innerHTML = '<section class="frq-menu" aria-label="选择词汇分类"><div class="frq-menu-head"><strong>选择分类</strong><span>' + data.totalCards + ' 个词</span></div><div class="frq-categories" data-categories></div></section><section class="frq-trainer" data-trainer hidden><div class="frq-topbar"><button type="button" data-back>分类</button><div><strong data-section-title></strong><span data-progress></span></div><button type="button" data-reshuffle>重排</button></div><div class="frq-card" data-card><div class="frq-picture"><span data-icon></span></div><div class="frq-prompt"><p data-translation></p><small data-section-label></small></div><div class="frq-options" data-options></div><p class="frq-feedback" data-feedback></p><button type="button" class="frq-next" data-next hidden>下一个</button></div></section>'

    const categories = root.querySelector("[data-categories]")
    const menu = root.querySelector(".frq-menu")
    const trainer = root.querySelector("[data-trainer]")
    const title = root.querySelector("[data-section-title]")
    const progress = root.querySelector("[data-progress]")
    const icon = root.querySelector("[data-icon]")
    const translation = root.querySelector("[data-translation]")
    const sectionLabel = root.querySelector("[data-section-label]")
    const options = root.querySelector("[data-options]")
    const feedback = root.querySelector("[data-feedback]")
    const next = root.querySelector("[data-next]")
    const back = root.querySelector("[data-back]")
    const reshuffle = root.querySelector("[data-reshuffle]")

    let state = { group: null, deck: [], index: 0, locked: false, timer: null }
    const allItems = data.groups.flatMap((group) =>
      group.items.map((item) => ({ ...item, sectionName: group.name, sectionIcon: group.icon })),
    )
    const allGroup = { id: "all", name: "全部词汇", icon: "🔀", items: allItems }

    function shuffle(items) {
      const copy = [...items]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
      }
      return copy
    }

    function sampleOptions(answer, pool) {
      const picked = [answer]
      const shuffled = shuffle(pool.filter((item) => item.id !== answer.id))
      for (const item of shuffled) {
        if (!picked.some((pickedItem) => pickedItem.term === item.term)) picked.push(item)
        if (picked.length === 4) break
      }
      return shuffle(picked)
    }

    function showMenu() {
      clearTimeout(state.timer)
      trainer.hidden = true
      menu.hidden = false
    }

    function startGroup(group) {
      state = { group, deck: shuffle(group.items), index: 0, locked: false, timer: null }
      menu.hidden = true
      trainer.hidden = false
      title.textContent = group.name
      renderCard()
    }

    function showFinished() {
      clearTimeout(state.timer)
      state.locked = true
      next.hidden = true
      progress.textContent = "完成"
      icon.textContent = "🎉"
      translation.textContent = "这个分类已经全部完成"
      sectionLabel.textContent = state.group.name + " · " + state.deck.length + " 个词"
      options.innerHTML = ""
      feedback.textContent = "点“重排”可以重新随机练一遍，或点“分类”选择别的部分。"
      feedback.className = "frq-feedback good"
    }

    function renderCategories() {
      const groups = [allGroup, ...data.groups]
      categories.innerHTML = groups
        .map(
          (group) => '<button type="button" class="frq-category" data-group="' + group.id + '"><span class="frq-cat-icon">' + group.icon + '</span><span><strong>' + group.name + '</strong><small>' + group.items.length + ' 个词</small></span><em>开始</em></button>',
        )
        .join("")

      for (const button of categories.querySelectorAll("[data-group]")) {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-group")
          startGroup(groups.find((group) => group.id === id))
        })
      }
    }

    function renderCard() {
      clearTimeout(state.timer)
      state.locked = false
      next.hidden = true
      feedback.textContent = ""
      feedback.className = "frq-feedback"

      if (state.index >= state.deck.length) {
        showFinished()
        return
      }

      const item = state.deck[state.index]
      progress.textContent = String(state.index + 1) + " / " + String(state.deck.length)
      icon.textContent = item.icon || item.sectionIcon || state.group.icon
      translation.textContent = item.translation
      sectionLabel.textContent = item.sectionName || state.group.name
      options.innerHTML = ""

      for (const option of sampleOptions(item, state.group.items)) {
        const button = document.createElement("button")
        button.type = "button"
        button.className = "frq-option"
        button.textContent = option.term
        button.dataset.translation = option.translation
        button.addEventListener("click", () => answer(button, item, option))
        options.append(button)
      }
    }

    function answer(button, item, option) {
      if (state.locked) return
      state.locked = true
      const correct = option.term === item.term

      for (const optionButton of options.querySelectorAll("button")) {
        optionButton.disabled = true
        if (optionButton.textContent === item.term) optionButton.classList.add("is-correct")
      }

      if (!correct) button.classList.add("is-wrong")
      feedback.classList.add(correct ? "good" : "bad")
      next.hidden = false
      state.index += 1

      if (correct) {
        feedback.textContent = "正确：" + item.term + " = " + item.translation
        state.timer = setTimeout(renderCard, 1500)
        return
      }

      feedback.textContent = ""
      const answerLine = document.createElement("div")
      answerLine.textContent = "答案：" + item.term + " = " + item.translation
      feedback.append(answerLine)
      const list = document.createElement("ul")
      list.className = "frq-choice-list"
      for (const optionButton of options.querySelectorAll("button")) {
        const row = document.createElement("li")
        row.textContent = optionButton.textContent + " = " + optionButton.dataset.translation
        list.append(row)
      }
      feedback.append(list)
    }

    next.addEventListener("click", renderCard)
    back.addEventListener("click", showMenu)
    reshuffle.addEventListener("click", () => startGroup(state.group))
    renderCategories()
  }

  function initAll() {
    for (const root of document.querySelectorAll("#frq-app")) initTrainer(root)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll)
  } else {
    initAll()
  }
  document.addEventListener("nav", initAll)
})()
`
}

async function writeIfChanged(filePath, content) {
  let previous = null
  try {
    previous = await readFile(filePath, "utf8")
  } catch {
  }

  if (previous !== content) {
    await writeFile(filePath, content, "utf8")
    console.log(`Generated ${filePath}`)
  }
}

console.log(`Parsed ${totalCards} vocabulary cards across ${groups.length} sections.`)

for (const dir of [contentDir, sourceDir].filter(Boolean)) {
  await writeIfChanged(path.join(dir, quizFileName), buildQuizPageV2())
  await writeIfChanged(path.join(dir, flashcardFileName), buildFlashcardsPage())
  await writeIfChanged(path.join(dir, trainerDataFileName), buildTrainerData())
  await writeIfChanged(path.join(dir, trainerScriptFileName), buildTrainerScript())
  await writeIfChanged(path.join(dir, trainerStyleFileName), buildTrainerStyle())
}
