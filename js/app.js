// ─────────────────────────────────────────────
//  APP.JS — Init, tab routing, header
// ─────────────────────────────────────────────

let activeTab = 'today';

function updateHeader() {
  const now = new Date();
  document.getElementById('header-date').textContent =
    now.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

function switchTab(tab) {
  if (activeTab === tab) return;
  activeTab = tab;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`view-${tab}`).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'today') initToday();
  if (tab === 'shop')  initShop();
  if (tab === 'plan')  initPlan();
}

async function init() {
  updateHeader();
  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  // Load first tab
  await initToday();
}

document.addEventListener('DOMContentLoaded', init);
