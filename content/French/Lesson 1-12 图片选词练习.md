---
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
<article class="frq-card">
  <div class="frq-picture" aria-label="帽子">
    <span>🎩</span>
  </div>
  <div class="frq-prompt">
    <p>戴在头上的衣物</p>
    <small>帽子</small>
  </div>
  <div class="frq-options">
<input id="frq-0-0" class="wrong" type="radio" name="frq-0">
<label for="frq-0-0">lit</label>
<input id="frq-0-1" class="wrong" type="radio" name="frq-0">
<label for="frq-0-1">ordinateur</label>
<input id="frq-0-2" class="wrong" type="radio" name="frq-0">
<label for="frq-0-2">voiture</label>
<input id="frq-0-3" class="correct" type="radio" name="frq-0">
<label for="frq-0-3">chapeau</label>
  </div>
  <p class="frq-feedback frq-good">正确：chapeau = 帽子</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="书">
    <span>📘</span>
  </div>
  <div class="frq-prompt">
    <p>可以阅读的物品</p>
    <small>书</small>
  </div>
  <div class="frq-options">
<input id="frq-1-0" class="correct" type="radio" name="frq-1">
<label for="frq-1-0">livre</label>
<input id="frq-1-1" class="wrong" type="radio" name="frq-1">
<label for="frq-1-1">lunettes</label>
<input id="frq-1-2" class="wrong" type="radio" name="frq-1">
<label for="frq-1-2">métro</label>
<input id="frq-1-3" class="wrong" type="radio" name="frq-1">
<label for="frq-1-3">restaurant</label>
  </div>
  <p class="frq-feedback frq-good">正确：livre = 书</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="椅子">
    <span>🪑</span>
  </div>
  <div class="frq-prompt">
    <p>坐下时用到的家具</p>
    <small>椅子</small>
  </div>
  <div class="frq-options">
<input id="frq-2-0" class="wrong" type="radio" name="frq-2">
<label for="frq-2-0">mer</label>
<input id="frq-2-1" class="correct" type="radio" name="frq-2">
<label for="frq-2-1">chaise</label>
<input id="frq-2-2" class="wrong" type="radio" name="frq-2">
<label for="frq-2-2">avion</label>
<input id="frq-2-3" class="wrong" type="radio" name="frq-2">
<label for="frq-2-3">musée</label>
  </div>
  <p class="frq-feedback frq-good">正确：chaise = 椅子</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="桌子">
    <span>🍽️</span>
  </div>
  <div class="frq-prompt">
    <p>吃饭或学习时会用到</p>
    <small>桌子</small>
  </div>
  <div class="frq-options">
<input id="frq-3-0" class="wrong" type="radio" name="frq-3">
<label for="frq-3-0">château</label>
<input id="frq-3-1" class="wrong" type="radio" name="frq-3">
<label for="frq-3-1">lit</label>
<input id="frq-3-2" class="correct" type="radio" name="frq-3">
<label for="frq-3-2">table</label>
<input id="frq-3-3" class="wrong" type="radio" name="frq-3">
<label for="frq-3-3">jardin</label>
  </div>
  <p class="frq-feedback frq-good">正确：table = 桌子</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="床">
    <span>🛏️</span>
  </div>
  <div class="frq-prompt">
    <p>晚上睡觉的地方</p>
    <small>床</small>
  </div>
  <div class="frq-options">
<input id="frq-4-0" class="wrong" type="radio" name="frq-4">
<label for="frq-4-0">chapeau</label>
<input id="frq-4-1" class="wrong" type="radio" name="frq-4">
<label for="frq-4-1">fenêtre</label>
<input id="frq-4-2" class="wrong" type="radio" name="frq-4">
<label for="frq-4-2">lunettes</label>
<input id="frq-4-3" class="correct" type="radio" name="frq-4">
<label for="frq-4-3">lit</label>
  </div>
  <p class="frq-feedback frq-good">正确：lit = 床</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="门">
    <span>🚪</span>
  </div>
  <div class="frq-prompt">
    <p>进出房间会经过</p>
    <small>门</small>
  </div>
  <div class="frq-options">
<input id="frq-5-0" class="correct" type="radio" name="frq-5">
<label for="frq-5-0">porte</label>
<input id="frq-5-1" class="wrong" type="radio" name="frq-5">
<label for="frq-5-1">clé</label>
<input id="frq-5-2" class="wrong" type="radio" name="frq-5">
<label for="frq-5-2">robe</label>
<input id="frq-5-3" class="wrong" type="radio" name="frq-5">
<label for="frq-5-3">avion</label>
  </div>
  <p class="frq-feedback frq-good">正确：porte = 门</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="窗户">
    <span>🪟</span>
  </div>
  <div class="frq-prompt">
    <p>可以看见外面的地方</p>
    <small>窗户</small>
  </div>
  <div class="frq-options">
<input id="frq-6-0" class="wrong" type="radio" name="frq-6">
<label for="frq-6-0">jardin</label>
<input id="frq-6-1" class="correct" type="radio" name="frq-6">
<label for="frq-6-1">fenêtre</label>
<input id="frq-6-2" class="wrong" type="radio" name="frq-6">
<label for="frq-6-2">bus</label>
<input id="frq-6-3" class="wrong" type="radio" name="frq-6">
<label for="frq-6-3">vélo</label>
  </div>
  <p class="frq-feedback frq-good">正确：fenêtre = 窗户</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="包">
    <span>🎒</span>
  </div>
  <div class="frq-prompt">
    <p>用来装东西</p>
    <small>包</small>
  </div>
  <div class="frq-options">
<input id="frq-7-0" class="wrong" type="radio" name="frq-7">
<label for="frq-7-0">montagne</label>
<input id="frq-7-1" class="wrong" type="radio" name="frq-7">
<label for="frq-7-1">chapeau</label>
<input id="frq-7-2" class="correct" type="radio" name="frq-7">
<label for="frq-7-2">sac</label>
<input id="frq-7-3" class="wrong" type="radio" name="frq-7">
<label for="frq-7-3">café</label>
  </div>
  <p class="frq-feedback frq-good">正确：sac = 包</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="钥匙">
    <span>🔑</span>
  </div>
  <div class="frq-prompt">
    <p>开门时会用到</p>
    <small>钥匙</small>
  </div>
  <div class="frq-options">
<input id="frq-8-0" class="wrong" type="radio" name="frq-8">
<label for="frq-8-0">piscine</label>
<input id="frq-8-1" class="wrong" type="radio" name="frq-8">
<label for="frq-8-1">chaise</label>
<input id="frq-8-2" class="wrong" type="radio" name="frq-8">
<label for="frq-8-2">sac</label>
<input id="frq-8-3" class="correct" type="radio" name="frq-8">
<label for="frq-8-3">clé</label>
  </div>
  <p class="frq-feedback frq-good">正确：clé = 钥匙</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="电脑">
    <span>💻</span>
  </div>
  <div class="frq-prompt">
    <p>学习和工作常用电子设备</p>
    <small>电脑</small>
  </div>
  <div class="frq-options">
<input id="frq-9-0" class="correct" type="radio" name="frq-9">
<label for="frq-9-0">ordinateur</label>
<input id="frq-9-1" class="wrong" type="radio" name="frq-9">
<label for="frq-9-1">lit</label>
<input id="frq-9-2" class="wrong" type="radio" name="frq-9">
<label for="frq-9-2">téléphone</label>
<input id="frq-9-3" class="wrong" type="radio" name="frq-9">
<label for="frq-9-3">bus</label>
  </div>
  <p class="frq-feedback frq-good">正确：ordinateur = 电脑</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="电话">
    <span>☎️</span>
  </div>
  <div class="frq-prompt">
    <p>用来打电话</p>
    <small>电话</small>
  </div>
  <div class="frq-options">
<input id="frq-10-0" class="wrong" type="radio" name="frq-10">
<label for="frq-10-0">café</label>
<input id="frq-10-1" class="correct" type="radio" name="frq-10">
<label for="frq-10-1">téléphone</label>
<input id="frq-10-2" class="wrong" type="radio" name="frq-10">
<label for="frq-10-2">chaussures</label>
<input id="frq-10-3" class="wrong" type="radio" name="frq-10">
<label for="frq-10-3">train</label>
  </div>
  <p class="frq-feedback frq-good">正确：téléphone = 电话</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="眼镜">
    <span>👓</span>
  </div>
  <div class="frq-prompt">
    <p>戴在眼睛前面</p>
    <small>眼镜</small>
  </div>
  <div class="frq-options">
<input id="frq-11-0" class="wrong" type="radio" name="frq-11">
<label for="frq-11-0">bibliothèque</label>
<input id="frq-11-1" class="wrong" type="radio" name="frq-11">
<label for="frq-11-1">piscine</label>
<input id="frq-11-2" class="correct" type="radio" name="frq-11">
<label for="frq-11-2">lunettes</label>
<input id="frq-11-3" class="wrong" type="radio" name="frq-11">
<label for="frq-11-3">bateau</label>
  </div>
  <p class="frq-feedback frq-good">正确：lunettes = 眼镜</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="鞋">
    <span>👟</span>
  </div>
  <div class="frq-prompt">
    <p>穿在脚上</p>
    <small>鞋</small>
  </div>
  <div class="frq-options">
<input id="frq-12-0" class="wrong" type="radio" name="frq-12">
<label for="frq-12-0">plage</label>
<input id="frq-12-1" class="wrong" type="radio" name="frq-12">
<label for="frq-12-1">banque</label>
<input id="frq-12-2" class="wrong" type="radio" name="frq-12">
<label for="frq-12-2">lit</label>
<input id="frq-12-3" class="correct" type="radio" name="frq-12">
<label for="frq-12-3">chaussures</label>
  </div>
  <p class="frq-feedback frq-good">正确：chaussures = 鞋</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="连衣裙">
    <span>👗</span>
  </div>
  <div class="frq-prompt">
    <p>一种连衣裙</p>
    <small>连衣裙</small>
  </div>
  <div class="frq-options">
<input id="frq-13-0" class="correct" type="radio" name="frq-13">
<label for="frq-13-0">robe</label>
<input id="frq-13-1" class="wrong" type="radio" name="frq-13">
<label for="frq-13-1">livre</label>
<input id="frq-13-2" class="wrong" type="radio" name="frq-13">
<label for="frq-13-2">fenêtre</label>
<input id="frq-13-3" class="wrong" type="radio" name="frq-13">
<label for="frq-13-3">lunettes</label>
  </div>
  <p class="frq-feedback frq-good">正确：robe = 连衣裙</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="汽车">
    <span>🚗</span>
  </div>
  <div class="frq-prompt">
    <p>路上行驶的小汽车</p>
    <small>汽车</small>
  </div>
  <div class="frq-options">
<input id="frq-14-0" class="wrong" type="radio" name="frq-14">
<label for="frq-14-0">bateau</label>
<input id="frq-14-1" class="correct" type="radio" name="frq-14">
<label for="frq-14-1">voiture</label>
<input id="frq-14-2" class="wrong" type="radio" name="frq-14">
<label for="frq-14-2">clé</label>
<input id="frq-14-3" class="wrong" type="radio" name="frq-14">
<label for="frq-14-3">robe</label>
  </div>
  <p class="frq-feedback frq-good">正确：voiture = 汽车</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="公共汽车">
    <span>🚌</span>
  </div>
  <div class="frq-prompt">
    <p>城市里的公共交通</p>
    <small>公共汽车</small>
  </div>
  <div class="frq-options">
<input id="frq-15-0" class="wrong" type="radio" name="frq-15">
<label for="frq-15-0">restaurant</label>
<input id="frq-15-1" class="wrong" type="radio" name="frq-15">
<label for="frq-15-1">plage</label>
<input id="frq-15-2" class="correct" type="radio" name="frq-15">
<label for="frq-15-2">bus</label>
<input id="frq-15-3" class="wrong" type="radio" name="frq-15">
<label for="frq-15-3">métro</label>
  </div>
  <p class="frq-feedback frq-good">正确：bus = 公共汽车</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="地铁">
    <span>🚇</span>
  </div>
  <div class="frq-prompt">
    <p>地下运行的交通工具</p>
    <small>地铁</small>
  </div>
  <div class="frq-options">
<input id="frq-16-0" class="wrong" type="radio" name="frq-16">
<label for="frq-16-0">musée</label>
<input id="frq-16-1" class="wrong" type="radio" name="frq-16">
<label for="frq-16-1">mer</label>
<input id="frq-16-2" class="wrong" type="radio" name="frq-16">
<label for="frq-16-2">livre</label>
<input id="frq-16-3" class="correct" type="radio" name="frq-16">
<label for="frq-16-3">métro</label>
  </div>
  <p class="frq-feedback frq-good">正确：métro = 地铁</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="火车">
    <span>🚆</span>
  </div>
  <div class="frq-prompt">
    <p>沿铁轨运行</p>
    <small>火车</small>
  </div>
  <div class="frq-options">
<input id="frq-17-0" class="correct" type="radio" name="frq-17">
<label for="frq-17-0">train</label>
<input id="frq-17-1" class="wrong" type="radio" name="frq-17">
<label for="frq-17-1">château</label>
<input id="frq-17-2" class="wrong" type="radio" name="frq-17">
<label for="frq-17-2">table</label>
<input id="frq-17-3" class="wrong" type="radio" name="frq-17">
<label for="frq-17-3">clé</label>
  </div>
  <p class="frq-feedback frq-good">正确：train = 火车</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="飞机">
    <span>✈️</span>
  </div>
  <div class="frq-prompt">
    <p>在天空中飞行</p>
    <small>飞机</small>
  </div>
  <div class="frq-options">
<input id="frq-18-0" class="wrong" type="radio" name="frq-18">
<label for="frq-18-0">bus</label>
<input id="frq-18-1" class="correct" type="radio" name="frq-18">
<label for="frq-18-1">avion</label>
<input id="frq-18-2" class="wrong" type="radio" name="frq-18">
<label for="frq-18-2">porte</label>
<input id="frq-18-3" class="wrong" type="radio" name="frq-18">
<label for="frq-18-3">téléphone</label>
  </div>
  <p class="frq-feedback frq-good">正确：avion = 飞机</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="船">
    <span>⛵</span>
  </div>
  <div class="frq-prompt">
    <p>在水上航行</p>
    <small>船</small>
  </div>
  <div class="frq-options">
<input id="frq-19-0" class="wrong" type="radio" name="frq-19">
<label for="frq-19-0">train</label>
<input id="frq-19-1" class="wrong" type="radio" name="frq-19">
<label for="frq-19-1">musée</label>
<input id="frq-19-2" class="correct" type="radio" name="frq-19">
<label for="frq-19-2">bateau</label>
<input id="frq-19-3" class="wrong" type="radio" name="frq-19">
<label for="frq-19-3">chaussures</label>
  </div>
  <p class="frq-feedback frq-good">正确：bateau = 船</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="自行车">
    <span>🚲</span>
  </div>
  <div class="frq-prompt">
    <p>两轮脚踏交通工具</p>
    <small>自行车</small>
  </div>
  <div class="frq-options">
<input id="frq-20-0" class="wrong" type="radio" name="frq-20">
<label for="frq-20-0">bateau</label>
<input id="frq-20-1" class="wrong" type="radio" name="frq-20">
<label for="frq-20-1">jardin</label>
<input id="frq-20-2" class="wrong" type="radio" name="frq-20">
<label for="frq-20-2">château</label>
<input id="frq-20-3" class="correct" type="radio" name="frq-20">
<label for="frq-20-3">vélo</label>
  </div>
  <p class="frq-feedback frq-good">正确：vélo = 自行车</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="餐馆">
    <span>🍽️</span>
  </div>
  <div class="frq-prompt">
    <p>可以点餐吃饭的地方</p>
    <small>餐馆</small>
  </div>
  <div class="frq-options">
<input id="frq-21-0" class="correct" type="radio" name="frq-21">
<label for="frq-21-0">restaurant</label>
<input id="frq-21-1" class="wrong" type="radio" name="frq-21">
<label for="frq-21-1">montagne</label>
<input id="frq-21-2" class="wrong" type="radio" name="frq-21">
<label for="frq-21-2">chapeau</label>
<input id="frq-21-3" class="wrong" type="radio" name="frq-21">
<label for="frq-21-3">porte</label>
  </div>
  <p class="frq-feedback frq-good">正确：restaurant = 餐馆</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="咖啡馆">
    <span>☕</span>
  </div>
  <div class="frq-prompt">
    <p>喝咖啡的小店</p>
    <small>咖啡馆</small>
  </div>
  <div class="frq-options">
<input id="frq-22-0" class="wrong" type="radio" name="frq-22">
<label for="frq-22-0">chaussures</label>
<input id="frq-22-1" class="correct" type="radio" name="frq-22">
<label for="frq-22-1">café</label>
<input id="frq-22-2" class="wrong" type="radio" name="frq-22">
<label for="frq-22-2">chaise</label>
<input id="frq-22-3" class="wrong" type="radio" name="frq-22">
<label for="frq-22-3">sac</label>
  </div>
  <p class="frq-feedback frq-good">正确：café = 咖啡馆</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="博物馆">
    <span>🏛️</span>
  </div>
  <div class="frq-prompt">
    <p>看展览的地方</p>
    <small>博物馆</small>
  </div>
  <div class="frq-options">
<input id="frq-23-0" class="wrong" type="radio" name="frq-23">
<label for="frq-23-0">voiture</label>
<input id="frq-23-1" class="wrong" type="radio" name="frq-23">
<label for="frq-23-1">bateau</label>
<input id="frq-23-2" class="correct" type="radio" name="frq-23">
<label for="frq-23-2">musée</label>
<input id="frq-23-3" class="wrong" type="radio" name="frq-23">
<label for="frq-23-3">ordinateur</label>
  </div>
  <p class="frq-feedback frq-good">正确：musée = 博物馆</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="图书馆">
    <span>📚</span>
  </div>
  <div class="frq-prompt">
    <p>借书和读书的地方</p>
    <small>图书馆</small>
  </div>
  <div class="frq-options">
<input id="frq-24-0" class="wrong" type="radio" name="frq-24">
<label for="frq-24-0">métro</label>
<input id="frq-24-1" class="wrong" type="radio" name="frq-24">
<label for="frq-24-1">restaurant</label>
<input id="frq-24-2" class="wrong" type="radio" name="frq-24">
<label for="frq-24-2">montagne</label>
<input id="frq-24-3" class="correct" type="radio" name="frq-24">
<label for="frq-24-3">bibliothèque</label>
  </div>
  <p class="frq-feedback frq-good">正确：bibliothèque = 图书馆</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="花园">
    <span>🌿</span>
  </div>
  <div class="frq-prompt">
    <p>有植物的户外空间</p>
    <small>花园</small>
  </div>
  <div class="frq-options">
<input id="frq-25-0" class="correct" type="radio" name="frq-25">
<label for="frq-25-0">jardin</label>
<input id="frq-25-1" class="wrong" type="radio" name="frq-25">
<label for="frq-25-1">musée</label>
<input id="frq-25-2" class="wrong" type="radio" name="frq-25">
<label for="frq-25-2">piscine</label>
<input id="frq-25-3" class="wrong" type="radio" name="frq-25">
<label for="frq-25-3">chaise</label>
  </div>
  <p class="frq-feedback frq-good">正确：jardin = 花园</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="沙滩">
    <span>🏖️</span>
  </div>
  <div class="frq-prompt">
    <p>海边有沙子的地方</p>
    <small>沙滩</small>
  </div>
  <div class="frq-options">
<input id="frq-26-0" class="wrong" type="radio" name="frq-26">
<label for="frq-26-0">ordinateur</label>
<input id="frq-26-1" class="correct" type="radio" name="frq-26">
<label for="frq-26-1">plage</label>
<input id="frq-26-2" class="wrong" type="radio" name="frq-26">
<label for="frq-26-2">banque</label>
<input id="frq-26-3" class="wrong" type="radio" name="frq-26">
<label for="frq-26-3">lit</label>
  </div>
  <p class="frq-feedback frq-good">正确：plage = 沙滩</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="山">
    <span>⛰️</span>
  </div>
  <div class="frq-prompt">
    <p>很高的自然地形</p>
    <small>山</small>
  </div>
  <div class="frq-options">
<input id="frq-27-0" class="wrong" type="radio" name="frq-27">
<label for="frq-27-0">lunettes</label>
<input id="frq-27-1" class="wrong" type="radio" name="frq-27">
<label for="frq-27-1">métro</label>
<input id="frq-27-2" class="correct" type="radio" name="frq-27">
<label for="frq-27-2">montagne</label>
<input id="frq-27-3" class="wrong" type="radio" name="frq-27">
<label for="frq-27-3">fenêtre</label>
  </div>
  <p class="frq-feedback frq-good">正确：montagne = 山</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="大海">
    <span>🌊</span>
  </div>
  <div class="frq-prompt">
    <p>大片咸水</p>
    <small>大海</small>
  </div>
  <div class="frq-options">
<input id="frq-28-0" class="wrong" type="radio" name="frq-28">
<label for="frq-28-0">robe</label>
<input id="frq-28-1" class="wrong" type="radio" name="frq-28">
<label for="frq-28-1">avion</label>
<input id="frq-28-2" class="wrong" type="radio" name="frq-28">
<label for="frq-28-2">musée</label>
<input id="frq-28-3" class="correct" type="radio" name="frq-28">
<label for="frq-28-3">mer</label>
  </div>
  <p class="frq-feedback frq-good">正确：mer = 大海</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="游泳池">
    <span>🏊</span>
  </div>
  <div class="frq-prompt">
    <p>游泳的地方</p>
    <small>游泳池</small>
  </div>
  <div class="frq-options">
<input id="frq-29-0" class="correct" type="radio" name="frq-29">
<label for="frq-29-0">piscine</label>
<input id="frq-29-1" class="wrong" type="radio" name="frq-29">
<label for="frq-29-1">vélo</label>
<input id="frq-29-2" class="wrong" type="radio" name="frq-29">
<label for="frq-29-2">jardin</label>
<input id="frq-29-3" class="wrong" type="radio" name="frq-29">
<label for="frq-29-3">banque</label>
  </div>
  <p class="frq-feedback frq-good">正确：piscine = 游泳池</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="城堡">
    <span>🏰</span>
  </div>
  <div class="frq-prompt">
    <p>城堡</p>
    <small>城堡</small>
  </div>
  <div class="frq-options">
<input id="frq-30-0" class="wrong" type="radio" name="frq-30">
<label for="frq-30-0">fenêtre</label>
<input id="frq-30-1" class="correct" type="radio" name="frq-30">
<label for="frq-30-1">château</label>
<input id="frq-30-2" class="wrong" type="radio" name="frq-30">
<label for="frq-30-2">montagne</label>
<input id="frq-30-3" class="wrong" type="radio" name="frq-30">
<label for="frq-30-3">livre</label>
  </div>
  <p class="frq-feedback frq-good">正确：château = 城堡</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>

<article class="frq-card">
  <div class="frq-picture" aria-label="银行">
    <span>🏦</span>
  </div>
  <div class="frq-prompt">
    <p>存钱和取钱的地方</p>
    <small>银行</small>
  </div>
  <div class="frq-options">
<input id="frq-31-0" class="wrong" type="radio" name="frq-31">
<label for="frq-31-0">clé</label>
<input id="frq-31-1" class="wrong" type="radio" name="frq-31">
<label for="frq-31-1">robe</label>
<input id="frq-31-2" class="correct" type="radio" name="frq-31">
<label for="frq-31-2">banque</label>
<input id="frq-31-3" class="wrong" type="radio" name="frq-31">
<label for="frq-31-3">table</label>
  </div>
  <p class="frq-feedback frq-good">正确：banque = 银行</p>
  <p class="frq-feedback frq-bad">再想想，看图和中文提示都指向同一个词。</p>
</article>
</section>
