// ─────────────────────────────────────────────
//  SUPABASE.JS — DB connection + all queries
// ─────────────────────────────────────────────

const SUPABASE_URL = 'https://umixhrnekaochquhcmpo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_8WMdbsGXLdXatHdo_VnxOw_hNimlUQj';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// ── Food log ─────────────────────────────────
async function getFoodLog(date) {
  const { data, error } = await db.from('food_log').select('*').eq('log_date', date);
  if (error) console.error('getFoodLog:', error);
  return data || [];
}

async function toggleMeal(date, meal, completed) {
  const { error } = await db.from('food_log')
    .upsert({ log_date: date, meal, completed }, { onConflict: 'log_date,meal' });
  if (error) console.error('toggleMeal:', error);
}

// ── Shop sessions ─────────────────────────────
async function getOrCreateSession(shopType) {
  const today = getTodayDate();
  const { data: existing } = await db.from('shop_sessions').select('*')
    .eq('shop_date', today).eq('shop_type', shopType).eq('completed', false)
    .order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (existing) return existing;
  const { data, error } = await db.from('shop_sessions')
    .insert({ shop_date: today, shop_type: shopType, completed: false })
    .select().single();
  if (error) console.error('createSession:', error);
  return data;
}

async function createShopSession(shopType) {
  const today = getTodayDate();
  const { data, error } = await db.from('shop_sessions')
    .insert({ shop_date: today, shop_type: shopType, completed: false })
    .select().single();
  if (error) console.error('createShopSession:', error);
  return data;
}

async function completeSession(sessionId, totalCost) {
  const { error } = await db.from('shop_sessions')
    .update({ completed: true, total_cost: totalCost })
    .eq('id', sessionId);
  if (error) console.error('completeSession:', error);
}

// ── Shop ticks ────────────────────────────────
async function getTicksForSession(sessionId) {
  const { data, error } = await db.from('shop_ticks').select('*').eq('session_id', sessionId);
  if (error) console.error('getTicksForSession:', error);
  return data || [];
}

async function tickItem(sessionId, productKey, ticked) {
  const { error } = await db.from('shop_ticks')
    .upsert({ session_id: sessionId, product_key: productKey, ticked }, { onConflict: 'session_id,product_key' });
  if (error) console.error('tickItem:', error);
}

// ── Stock tracking ────────────────────────────
async function getShoppingItems() {
  const { data, error } = await db.from('shopping_items').select('*');
  if (error) console.error('getShoppingItems:', error);
  return data || [];
}

async function markPurchased(productKey, daysSupply) {
  const today = getTodayDate();
  const { error } = await db.from('shopping_items')
    .upsert({ product_key: productKey, last_purchased: today, days_supply: daysSupply }, { onConflict: 'product_key' });
  if (error) console.error('markPurchased:', error);
}

async function getDaysRemaining(productKey) {
  const { data } = await db.from('shopping_items').select('*')
    .eq('product_key', productKey).maybeSingle();
  if (!data || !data.last_purchased) return null;
  const purchased = new Date(data.last_purchased);
  const today = new Date();
  const daysSince = Math.floor((today - purchased) / 86400000);
  return Math.max(0, (data.days_supply || 0) - daysSince);
}

// ── Recent shops ──────────────────────────────
async function getRecentShops(limit = 6) {
  const { data, error } = await db.from('shop_sessions').select('*')
    .eq('completed', true)
    .order('shop_date', { ascending: false }).limit(limit);
  if (error) console.error('getRecentShops:', error);
  return data || [];
}
