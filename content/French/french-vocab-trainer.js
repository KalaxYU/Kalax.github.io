(() => {
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
        state.deck = shuffle(state.group.items)
        state.index = 0
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
        ? "正确：" + item.term + " = " + item.translation
        : "答案：" + item.term + " = " + item.translation
      feedback.classList.add(correct ? "good" : "bad")
      next.hidden = false
      state.index += 1
      state.timer = setTimeout(renderCard, correct ? 650 : 1100)
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
