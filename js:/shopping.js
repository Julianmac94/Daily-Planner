// ─────────────────────────────────────────────
//  SHOPPING.JS — Shop tab
// ─────────────────────────────────────────────

let activeShopType = 'A';
let sessions = { A: null, B: null };
let ticks = { A: {}, B: {} };
let stock = {};

async function initShop() {
  await loadStock();
  renderShopView();
}

async function loadStock() {
  const items = await getShoppingItems();
  for (const item of items) {
    const rem = await getDaysRemaining(item.product_key);
    stock[item.product_key] = { lastPurchased: item.last_purchased, daysRemaining: rem };
  }
}

function renderShopView() {
  document.getElementById('view-shop').innerHTML = `
    <div class="shop-selector">
      <button class="shop-type-btn ${activeShopType==='A'?'active':''}" onclick="switchShopType('A')">Shop A · Days 1–4</button>
      <button class="shop-type-btn ${activeShopType==='B'?'active':''}" onclick="switchShopType('B')">Shop B · Days 5–7</button>
    </div>
    <div id="shop-body"></div>
  `;
  loadShopList(activeShopType);
}

async function switchShopType(type) {
  activeShopType = type;
  document.querySelectorAll('.shop-type-btn').forEach(b => b.classList.toggle('active', b.textContent.includes(type)));
  await loadShopList(type);
}

async function loadShopList(type) {
  const body = document.getElementById('shop-body');
  body.innerHTML = '<div class="loading">Loading...</div>';
  sessions[type] = await getOrCreateSession(type);
  const t = await getTicksForSession(sessions[type].id);
  ticks[type] = {};
  t.forEach(r => { ticks[type][r.product_key] = r.ticked; });
  renderShopList(type);
}

function renderShopList(type) {
  const body = document.getElementById('shop-body');
  const everyProds    = SHOP_EVERY.map(k => PRODUCTS[k]).filter(Boolean);
  const rotatingProds = SHOP_ROTATING.map(k => PRODUCTS[k]).filter(Boolean);

  let cost = 0, tickCount = 0;
  const allProds = [...everyProds, ...rotatingProds];
  allProds.forEach(p => {
    if (ticks[type][p.key]) {
      cost += p.packPrice * (p.qtyPerShop || 1);
      tickCount++;
    }
  });

  const reached = cost >= WEEKLY_COST.freeDelivery;
  const barPct  = Math.min(100, Math.round(cost / WEEKLY_COST.freeDelivery * 100));

  body.innerHTML = `
    <div class="cost-bar">
      <div class="cost-bar-top">
        <span class="cost-total">$${cost.toFixed(2)}</span>
        <span class="cost-threshold">${reached ? '✓ Free delivery reached' : '$' + (WEEKLY_COST.freeDelivery - cost).toFixed(2) + ' to free delivery'}</span>
      </div>
      <div class="cost-bar-track">
        <div class="cost-bar-fill ${reached ? 'reached' : ''}" style="width:${barPct}%"></div>
      </div>
      <div class="cost-bar-labels"><span>$0</span><span>$${WEEKLY_COST.freeDelivery} free delivery</span></div>
    </div>

    <div class="section-label">Always buy every shop</div>
    <div class="card">
      ${everyProds.map(p => shopItem(p, type, false)).join('')}
    </div>

    <div class="section-label">Check stock first</div>
    <div class="card">
      ${rotatingProds.map(p => shopItem(p, type, true)).join('')}
    </div>

    <div class="shop-actions">
      <button class="btn btn-secondary" onclick="resetShopList('${type}')">Reset list</button>
      ${reached ? `<button class="btn btn-primary" onclick="finishShop('${type}',${cost.toFixed(2)})">Done · $${cost.toFixed(2)}</button>` : ''}
    </div>

    <div class="section-label">Recent shops</div>
    <div id="recent-shops"><div class="loading">Loading...</div></div>
  `;

  // Attach checkbox listeners
  body.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', async e => {
      const key = e.target.dataset.key;
      const checked = e.target.checked;
      ticks[type][key] = checked;
      await tickItem(sessions[type].id, key, checked);
      if (checked && PRODUCTS[key]?.daysSupply) {
        await markPurchased(key, PRODUCTS[key].daysSupply);
        stock[key] = { lastPurchased: getTodayDate(), daysRemaining: PRODUCTS[key].daysSupply };
      }
      renderShopList(type);
    });
  });

  loadRecentShops();
}

function shopItem(p, type, isRotating) {
  const checked = !!ticks[type][p.key];
  const qty = p.qtyPerShop || 1;
  const itemCost = (p.packPrice * qty).toFixed(2);
  const s = stock[p.key];
  let stockBadge = '';
  if (isRotating) {
    if (s && s.daysRemaining !== null && s.daysRemaining !== undefined) {
      const r = s.daysRemaining;
      const cls = r <= 1 ? 'red' : r <= 3 ? 'amber' : 'green';
      stockBadge = `<div class="rotating-flag"><span class="badge ${cls}">${r}d left</span></div>`;
    } else {
      stockBadge = `<div class="rotating-flag"><span class="badge grey">Not tracked yet</span></div>`;
    }
  }
  const qtyLabel = qty > 1 ? ` × ${qty}` : '';
  return `
    <div class="check-item ${checked ? 'ticked' : ''}">
      <input type="checkbox" data-key="${p.key}" ${checked ? 'checked' : ''}>
      <div class="ci-body">
        <div class="ci-name">${p.name}${qtyLabel}</div>
        <div class="ci-qty">${p.dailyAmount} per day · ${p.packSize}</div>
        ${p.note ? `<div class="ci-note">${p.note}</div>` : ''}
        ${stockBadge}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
        <span class="ci-price">$${itemCost}</span>
        <a href="${p.url}" target="_blank" class="woolies-link">Woolies ↗</a>
      </div>
    </div>`;
}

async function resetShopList(type) {
  ticks[type] = {};
  sessions[type] = await createShopSession(type);
  renderShopList(type);
}

async function finishShop(type, cost) {
  if (!confirm(`Mark Shop ${type} complete? Total: $${cost}`)) return;
  await completeSession(sessions[type].id, cost);
  ticks[type] = {};
  sessions[type] = await createShopSession(type);
  await loadStock();
  renderShopList(type);
}

async function loadRecentShops() {
  const el = document.getElementById('recent-shops');
  if (!el) return;
  const shops = await getRecentShops(6);
  if (!shops.length) { el.innerHTML = '<div class="card"><div class="card-body" style="color:var(--muted);font-size:13px;">No completed shops yet.</div></div>'; return; }
  el.innerHTML = `<div class="card">${shops.map(s => `
    <div class="row">
      <span class="label">${new Date(s.shop_date).toLocaleDateString('en-AU', {day:'numeric',month:'short'})} · Shop ${s.shop_type}</span>
      <span class="val">$${s.total_cost?.toFixed(2) || '—'}</span>
    </div>`).join('')}
  </div>`;
}
