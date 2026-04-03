// ─────────────────────────────────────────────
//  FOOD.JS — Today tab
// ─────────────────────────────────────────────

let fastTimer = null;
let lastMealTime = null;

async function initToday() {
  const today = getTodayDate();
  const log = await getFoodLog(today);
  const bDone = log.some(r => r.meal === 'breakfast' && r.completed);
  const lDone = log.some(r => r.meal === 'lunch'     && r.completed);
  const saved = localStorage.getItem('lastMealTime');
  if (saved) lastMealTime = new Date(saved);
  renderToday(bDone, lDone);
}

function renderToday(bDone, lDone) {
  const bM = bDone ? MEALS.breakfast.totals : { cal:0, protein:0, carbs:0, fat:0 };
  const lM = lDone ? MEALS.lunch.totals     : { cal:0, protein:0, carbs:0, fat:0 };
  const tCal = bM.cal + lM.cal, tPro = bM.protein + lM.protein;
  const tCarb = bM.carbs + lM.carbs, tFat = bM.fat + lM.fat;

  document.getElementById('view-today').innerHTML = `

    <div class="section-label">Today's macros</div>
    <div class="macro-grid">
      <div class="macro-card cal"><div class="ml">Calories</div><div class="mv" id="mc-cal">${tCal}</div><div class="mt">of ${DAILY_TARGETS.cal}</div></div>
      <div class="macro-card pro"><div class="ml">Protein</div><div class="mv" id="mc-pro">${tPro}g</div><div class="mt">of ${DAILY_TARGETS.protein}g</div></div>
      <div class="macro-card carb"><div class="ml">Carbs</div><div class="mv" id="mc-carb">${tCarb}g</div><div class="mt">&lt;${DAILY_TARGETS.carbs}g</div></div>
      <div class="macro-card fat"><div class="ml">Fat</div><div class="mv" id="mc-fat">${tFat}g</div><div class="mt">~${DAILY_TARGETS.fat}g</div></div>
    </div>

    <div class="section-label">Meals</div>
    ${mealCard('breakfast', bDone)}
    ${mealCard('lunch', lDone)}

    <div class="section-label">Fasting window</div>
    <div class="fast-card">
      <div class="fast-label">Time since last meal</div>
      <div class="fast-timer" id="fast-time">--:--</div>
      <div class="fast-bar-wrap"><div class="fast-bar-fill" id="fast-bar" style="width:0%"></div></div>
      <div class="fast-target">Target: 16h fast · Bar turns green at 16h</div>
      <button class="last-meal-btn" onclick="setLastMealNow()">Mark last meal as now</button>
      <div id="fast-note" style="font-size:11px;color:var(--muted);text-align:center;margin-top:6px;"></div>
    </div>
  `;

  document.getElementById('card-breakfast').addEventListener('click', () => doToggleMeal('breakfast'));
  document.getElementById('card-lunch').addEventListener('click',     () => doToggleMeal('lunch'));
  document.getElementById('btn-expand-bkfst').addEventListener('click', e => { e.stopPropagation(); expandCard('card-breakfast'); });
  document.getElementById('btn-expand-lunch').addEventListener('click', e => { e.stopPropagation(); expandCard('card-lunch'); });

  startFastTimer();
}

function mealCard(meal, done) {
  const m = MEALS[meal];
  const id = meal === 'breakfast' ? 'card-breakfast' : 'card-lunch';
  const expId = meal === 'breakfast' ? 'btn-expand-bkfst' : 'btn-expand-lunch';
  return `
    <div class="meal-toggle ${done ? 'done' : ''}" id="${id}">
      <div class="meal-toggle-header">
        <div class="meal-toggle-left">
          <div class="meal-check">${done ? '✓' : ''}</div>
          <div>
            <div class="meal-title">${m.emoji} ${m.label}</div>
            <div class="meal-subtitle">${m.totals.cal} cal · ${m.totals.protein}g protein · ${m.totals.carbs}g carbs</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
          <div class="meal-macros-inline">
            <span class="mpill cal">${m.totals.cal}</span>
            <span class="mpill pro">${m.totals.protein}g P</span>
            <span class="mpill carb">${m.totals.carbs}g C</span>
          </div>
          <button id="${expId}" style="font-size:11px;color:var(--muted);background:none;border:none;cursor:pointer;padding:2px;">details ▾</button>
        </div>
      </div>
      <div class="meal-items-expand">
        ${m.items.map(i => `<div class="meal-item-row"><span>${i.name}</span><span class="mir">${i.cal}</span></div>`).join('')}
      </div>
    </div>`;
}

function expandCard(id) {
  document.getElementById(id)?.classList.toggle('expanded');
}

async function doToggleMeal(meal) {
  const today = getTodayDate();
  const cardId = meal === 'breakfast' ? 'card-breakfast' : 'card-lunch';
  const card = document.getElementById(cardId);
  const nowDone = !card.classList.contains('done');
  card.classList.toggle('done', nowDone);
  card.querySelector('.meal-check').textContent = nowDone ? '✓' : '';
  if (nowDone) { lastMealTime = new Date(); localStorage.setItem('lastMealTime', lastMealTime.toISOString()); }
  await toggleMeal(today, meal, nowDone);
  const log = await getFoodLog(today);
  const bD = log.some(r => r.meal === 'breakfast' && r.completed);
  const lD = log.some(r => r.meal === 'lunch'     && r.completed);
  const bM = bD ? MEALS.breakfast.totals : { cal:0, protein:0, carbs:0, fat:0 };
  const lM = lD ? MEALS.lunch.totals     : { cal:0, protein:0, carbs:0, fat:0 };
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('mc-cal',  bM.cal + lM.cal);
  set('mc-pro',  (bM.protein + lM.protein) + 'g');
  set('mc-carb', (bM.carbs   + lM.carbs)   + 'g');
  set('mc-fat',  (bM.fat     + lM.fat)     + 'g');
}

function setLastMealNow() {
  lastMealTime = new Date();
  localStorage.setItem('lastMealTime', lastMealTime.toISOString());
  updateFastDisplay();
}

function startFastTimer() {
  if (fastTimer) clearInterval(fastTimer);
  updateFastDisplay();
  fastTimer = setInterval(updateFastDisplay, 60000);
}

function updateFastDisplay() {
  const timerEl = document.getElementById('fast-time');
  const barEl   = document.getElementById('fast-bar');
  const noteEl  = document.getElementById('fast-note');
  if (!timerEl) { clearInterval(fastTimer); return; }
  if (!lastMealTime) { timerEl.textContent = '--:--'; return; }
  const diffMs = Date.now() - lastMealTime;
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  const pct = Math.min(100, Math.round((h + m/60) / 16 * 100));
  if (barEl) {
    barEl.style.width = pct + '%';
    barEl.style.background = pct >= 100 ? 'var(--green)' : 'var(--accent)';
  }
  if (noteEl) {
    const timeStr = lastMealTime.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit' });
    noteEl.textContent = `Last meal: ${timeStr}${h >= 16 ? ' · 🎯 16h reached!' : ' · ' + (16 - h) + 'h to go'}`;
  }
}
