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

const lessonPath = path.join(contentDir, lessonFileName)
const lessonText = await readFile(lessonPath, "utf8")

const wordClassPattern =
  /\s+(?:n\.(?:m|f)(?:\.pl)?\.?|n\.|adj\.\/n\.|adj\.|adv\.|v\.|pron\.)$/u

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

    const parts = line
      .split("|")
      .slice(1, -1)
      .map((part) => part.trim())

    if (parts.length < 2 || !parts[0] || !parts[1]) {
      continue
    }

    if (/^(法语|中文|动词)$/u.test(parts[0]) || /^(法语|中文)$/u.test(parts[1])) {
      continue
    }

    const term = cleanTerm(parts[0])
    const translation = parts[1].replace(/\s+/g, " ").trim()
    if (term && translation) {
      rows.push({ term, rawTerm: parts[0], translation, section })
    }
  }

  const seen = new Set()
  return rows.filter((row) => {
    const key = `${normalize(row.term)}::${row.translation}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

const rows = parseRows(lessonText)
const byTerm = new Map(rows.map((row) => [normalize(row.term), row]))

const visuals = [
  { term: "chapeau", icon: "🎩", clue: "戴在头上的衣物" },
  { term: "livre", icon: "📘", clue: "可以阅读的物品" },
  { term: "chaise", icon: "🪑", clue: "坐下时用到的家具" },
  { term: "table", icon: "🍽️", clue: "吃饭或学习时会用到" },
  { term: "lit", icon: "🛏️", clue: "晚上睡觉的地方" },
  { term: "porte", icon: "🚪", clue: "进出房间会经过" },
  { term: "fenêtre", icon: "🪟", clue: "可以看见外面的地方" },
  { term: "sac", icon: "🎒", clue: "用来装东西" },
  { term: "clé", icon: "🔑", clue: "开门时会用到" },
  { term: "ordinateur", icon: "💻", clue: "学习和工作常用电子设备" },
  { term: "téléphone", icon: "☎️", clue: "用来打电话" },
  { term: "lunettes", icon: "👓", clue: "戴在眼睛前面" },
  { term: "chaussures", icon: "👟", clue: "穿在脚上" },
  { term: "robe", icon: "👗", clue: "一种连衣裙" },
  { term: "voiture", icon: "🚗", clue: "路上行驶的小汽车" },
  { term: "bus", icon: "🚌", clue: "城市里的公共交通" },
  { term: "métro", icon: "🚇", clue: "地下运行的交通工具" },
  { term: "train", icon: "🚆", clue: "沿铁轨运行" },
  { term: "avion", icon: "✈️", clue: "在天空中飞行" },
  { term: "bateau", icon: "⛵", clue: "在水上航行" },
  { term: "vélo", icon: "🚲", clue: "两轮脚踏交通工具" },
  { term: "restaurant", icon: "🍽️", clue: "可以点餐吃饭的地方" },
  { term: "café", icon: "☕", clue: "喝咖啡的小店" },
  { term: "musée", icon: "🏛️", clue: "看展览的地方" },
  { term: "bibliothèque", icon: "📚", clue: "借书和读书的地方" },
  { term: "jardin", icon: "🌿", clue: "有植物的户外空间" },
  { term: "plage", icon: "🏖️", clue: "海边有沙子的地方" },
  { term: "montagne", icon: "⛰️", clue: "很高的自然地形" },
  { term: "mer", icon: "🌊", clue: "大片咸水" },
  { term: "piscine", icon: "🏊", clue: "游泳的地方" },
  { term: "château", icon: "🏰", clue: "城堡" },
  { term: "banque", icon: "🏦", clue: "存钱和取钱的地方" },
]

const quizItems = visuals
  .map((visual) => {
    const row = byTerm.get(normalize(visual.term))
    return row ? { ...visual, ...row } : null
  })
  .filter(Boolean)

function pickOptions(item, index) {
  const pool = quizItems.filter((candidate) => candidate.term !== item.term)
  const options = [item.term]
  let cursor = (index * 7 + 3) % pool.length
  let attempts = 0
  while (options.length < 4 && pool.length > 0 && attempts < pool.length * 2) {
    const candidate = pool[cursor % pool.length].term
    if (!options.includes(candidate)) {
      options.push(candidate)
    }
    cursor += 5
    attempts += 1
  }

  const shift = (index * 3 + 1) % options.length
  return options.slice(shift).concat(options.slice(0, shift))
}

function quizCard(item, index) {
  const options = pickOptions(item, index)
  const labels = options
    .map((option, optionIndex) => {
      const id = `frq-${index}-${optionIndex}`
      const kind = option === item.term ? "correct" : "wrong"
      return `<input id="${id}" class="${kind}" type="radio" name="frq-${index}">
<label for="${id}">${html(option)}</label>`
    })
    .join("\n")

  return `<article class="frq-card">
  <div class="frq-picture" aria-label="${html(item.translation)}">
    <span>${item.icon}</span>
  </div>
  <div class="frq-prompt">
    <p>${html(item.clue)}</p>
    <small>${html(item.translation)}</small>
  </div>
  <div class="frq-options">
${labels}
  </div>
  <p class="frq-feedback frq-good">正确：${html(item.term)} = ${html(item.translation)}</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>`
}

function buildQuizPage() {
  const cards = quizItems.map((item, index) => quizCard(item, index)).join("\n\n")
  return `---
title: Lesson 1-12 图片选词练习
tags:
  - flashcards
---

# Lesson 1-12 图片选词练习

从图片和中文提示出发，选择对应的法语单词。

[[Lesson 1-12  Vocabulaire|返回词汇表]] · [[Lesson 1-12 Flashcards|打开闪卡]]

<style>
.frq-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.frq-card {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
  background: color-mix(in srgb, var(--light) 92%, var(--secondary));
}
.frq-picture {
  display: grid;
  place-items: center;
  min-height: 120px;
  border-radius: 8px;
  background:
    radial-gradient(circle at 20% 15%, rgba(132, 165, 157, 0.28), transparent 28%),
    linear-gradient(135deg, rgba(123, 151, 170, 0.2), rgba(255, 214, 102, 0.16));
  border: 1px solid color-mix(in srgb, var(--lightgray) 70%, var(--tertiary));
}
.frq-picture span {
  font-size: 4.25rem;
  line-height: 1;
}
.frq-prompt p {
  margin: 0.85rem 0 0.15rem;
  font-weight: 700;
}
.frq-prompt small {
  color: var(--gray);
}
.frq-options {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.85rem;
}
.frq-options input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.frq-options label {
  display: block;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.42rem 0.65rem;
  cursor: pointer;
  background: var(--light);
}
.frq-options label:hover {
  border-color: var(--secondary);
}
.frq-options input.correct:checked + label {
  border-color: #2f8f5b;
  background: rgba(47, 143, 91, 0.16);
  color: var(--dark);
}
.frq-options input.wrong:checked + label {
  border-color: #b65f4b;
  background: rgba(182, 95, 75, 0.16);
  color: var(--dark);
}
.frq-feedback {
  display: none;
  margin: 0.85rem 0 0;
  font-weight: 700;
}
.frq-card:has(input.correct:checked) .frq-good,
.frq-card:has(input.wrong:checked) .frq-bad {
  display: block;
}
.frq-good {
  color: #2f8f5b;
}
.frq-bad {
  color: #b65f4b;
}
</style>

<section class="frq-wrap">
${cards}
</section>
`
}

function buildFlashcardsPage() {
  const grouped = new Map()
  for (const row of rows) {
    if (!grouped.has(row.section)) {
      grouped.set(row.section, [])
    }
    grouped.get(row.section).push(row)
  }

  const sections = [...grouped.entries()]
    .map(([section, items]) => {
      const cards = items.map((item) => `${item.term}::${item.translation}`).join("\n")
      return `## ${section}\n\n${cards}`
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

for (const dir of [contentDir, sourceDir].filter(Boolean)) {
  await writeIfChanged(path.join(dir, quizFileName), buildQuizPage())
  await writeIfChanged(path.join(dir, flashcardFileName), buildFlashcardsPage())
}
