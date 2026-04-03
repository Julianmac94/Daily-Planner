// ─────────────────────────────────────────────
//  PLAN.JS — Plan tab
// ─────────────────────────────────────────────

async function initPlan() {
  await loadStock();
  renderPlan();
}

function renderPlan() {
  const view = document.getElementById('view-plan');
  const bT = MEALS.breakfast.totals;
  const lT = MEALS.lunch.totals;

  view.innerHTML = `
    <div class="section-label">Your meals</div>

    <div class="plan-meal-card">
      <div class="plan-meal-title">🍳 Breakfast</div>
      <div class="plan-meal-cal">${bT.cal} cal · ${bT.protein}g protein · ${bT.carbs}g carbs · ${bT.fat}g fat</div>
      ${MEALS.breakfast.items.map(i => `<div class="plan-item-row"><span>${i.cal}</span><span>${i.name}</span></div>`).join('')}
    </div>

    <div class="plan-meal-card">
      <div class="plan-meal-title">🥗 Chicken Salad (Lunch / Afternoon)</div>
      <div class="plan-meal-cal">${lT.cal} cal · ${lT.protein}g protein · ${lT.carbs}g carbs · ${lT.fat}g fat</div>
      ${MEALS.lunch.items.map(i => `<div class="plan-item-row"><span>${i.cal}</span><span>${i.name}</span></div>`).join('')}
    </div>

    <div class="section-label">Daily totals vs targets</div>
    <div class="targets-grid">
      ${targetCard('Calories', DAY_TOTALS.cal, DAILY_TARGETS.cal, 'cal', '')}
      ${targetCard('Protein',  DAY_TOTALS.protein, DAILY_TARGETS.protein, 'pro', 'g')}
      ${targetCard('Net carbs',DAY_TOTALS.carbs, DAILY_TARGETS.carbs, 'carb', 'g')}
      ${targetCard('Fat',      DAY_TOTALS.fat, DAILY_TARGETS.fat, 'fat', 'g')}
    </div>

    <div class="section-label">Fasting approach</div>
    <div class="info-card">
      <strong>Time-restricted eating (16:8)</strong><br>
      Big breakfast to start the day → substantial chicken salad in the afternoon → fast through the evening and overnight. This creates a natural 16–18 hour fasting window which supports fat burning, reduces late-night eating risk, and aligns with your circadian rhythm.
    </div>

    <div class="section-label">Weekly budget</div>
    <div class="budget-card">
      <div class="budget-row"><span>Estimated weekly spend</span><span class="budget-val">~$${WEEKLY_COST.estimated}</span></div>
      <div class="budget-row"><span>Your budget</span><span class="budget-val">$150–$200</span></div>
      <div class="budget-row"><span>Per shop (×2/week)</span><span class="budget-val">~$75–$90</span></div>
      <div class="budget-row"><span>Free delivery minimum</span><span class="budget-val">$75</span></div>
    </div>

    <div class="section-label">Shopping schedule</div>
    <div class="schedule-card">
      <div class="schedule-row header"><span>Product</span><span>Frequency</span><span>Stock</span></div>
      ${SHOP_EVERY.map(k => scheduleRow(k, false)).join('')}
      ${SHOP_ROTATING.map(k => scheduleRow(k, true)).join('')}
    </div>

    <div class="disclaimer">
      Calorie targets are estimates. At your weight, individual metabolism varies — confirm with a GP when you can.<br>
      A Medicare Chronic Disease Management plan gives you subsidised dietitian visits.
    </div>
  `;
}

function targetCard(label, current, target, cls, unit) {
  const pct = Math.min(100, Math.round(current / target * 100));
  return `
    <div class="target-card">
      <div class="target-label">${label}</div>
      <div class="target-val ${cls}">${current}${unit}</div>
      <div class="target-bar-wrap"><div class="target-bar-fill ${cls}" style="width:${pct}%"></div></div>
      <div class="target-sub">Target: ${target}${unit}</div>
    </div>`;
}

function scheduleRow(key, isRotating) {
  const p = PRODUCTS[key];
  if (!p) return '';
  const s = (typeof stock !== 'undefined') ? stock[key] : null;
  let badge = '';
  if (isRotating) {
    if (s && s.daysRemaining !== null && s.daysRemaining !== undefined) {
      const r = s.daysRemaining;
      const cls = r <= 1 ? 'red' : r <= 3 ? 'amber' : 'green';
      badge = `<span class="badge ${cls}">${r}d left</span>`;
    } else {
      badge = `<span class="badge grey">Check stock</span>`;
    }
  } else {
    badge = `<span class="badge accent">Every shop</span>`;
  }
  const freq = isRotating ? `Every ${p.daysSupply}d` : 'Every shop';
  return `
    <div class="schedule-row">
      <span class="schedule-name">${p.name}</span>
      <span class="schedule-freq">${freq}</span>
      <span>${badge}</span>
    </div>`;
}
