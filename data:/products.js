// ─────────────────────────────────────────────
//  PRODUCTS.JS — All confirmed product data
//  Prices, macros, shopping schedule
// ─────────────────────────────────────────────

const PRODUCTS = {
  chicken_sausages: {
    key: 'chicken_sausages', meal: 'breakfast',
    name: 'WW Herb & Garlic Chicken Sausages',
    url: 'https://www.woolworths.com.au/shop/productdetails/901692/woolworths-6-herb-garlic-chicken-sausages',
    packSize: '505g (6 sausages)', packPrice: 7.00,
    dailyAmount: '1.5 sausages (126g)', daysPerPack: 4,
    qtyPerShop: 1, buyEvery: 'every',
    macros: { cal: 177, protein: 19, carbs: 6, fat: 8 },
    note: 'Check first ingredient is chicken'
  },
  eggs: {
    key: 'eggs', meal: 'breakfast',
    name: 'Sunny Queen XL Free Range Eggs',
    url: 'https://www.woolworths.com.au/shop/productdetails/77170/sunny-queen-12-extra-large-free-range-eggs',
    packSize: '12 eggs', packPrice: 6.50,
    dailyAmount: '3 eggs', daysPerPack: 4,
    qtyPerShop: 1, buyEvery: 'every',
    macros: { cal: 210, protein: 18, carbs: 1, fat: 15 },
    note: '1 box = exactly 4 days'
  },
  cottage_cheese: {
    key: 'cottage_cheese', meal: 'breakfast',
    name: 'East Coast Cottage Cheese',
    url: 'https://www.woolworths.com.au/shop/productdetails/113033/east-coast-sustainable-dairy-cottage-cheese',
    packSize: '500g', packPrice: 5.50,
    dailyAmount: '125g', daysPerPack: 4,
    qtyPerShop: 1, buyEvery: 'every',
    macros: { cal: 89, protein: 15, carbs: 5, fat: 1 },
    note: '500g tub = exactly 4 days. Zero waste.'
  },
  mushrooms: {
    key: 'mushrooms', meal: 'breakfast',
    name: 'WW Button Mushrooms 200g',
    url: 'https://www.woolworths.com.au/shop/productdetails/152608/woolworths-mushrooms-button-punnet',
    packSize: '200g punnet', packPrice: 3.00,
    dailyAmount: '100g (½ punnet)', daysPerPack: 2,
    qtyPerShop: 2, buyEvery: 'every',
    macros: { cal: 22, protein: 3, carbs: 3, fat: 0 },
    note: 'Buy 2 punnets per shop'
  },
  capsicum: {
    key: 'capsicum', meal: 'both',
    name: 'Red Capsicum each',
    url: 'https://www.woolworths.com.au/shop/productdetails/135306/red-capsicum',
    packSize: 'each', packPrice: 2.50,
    dailyAmount: '1 whole (½ bkfst · ½ lunch)', daysPerPack: 1,
    qtyPerShop: 4, buyEvery: 'every',
    macros: { cal: 40, protein: 1, carbs: 8, fat: 0 },
    note: 'Buy 4 per shop (1 per day)'
  },
  onion: {
    key: 'onion', meal: 'both',
    name: 'Red Onion each',
    url: 'https://www.woolworths.com.au/shop/productdetails/144497/onion-red',
    packSize: 'each', packPrice: 1.00,
    dailyAmount: '1 whole (½ bkfst · ½ lunch)', daysPerPack: 1,
    qtyPerShop: 4, buyEvery: 'every',
    macros: { cal: 40, protein: 1, carbs: 9, fat: 0 },
    note: 'Buy 4 per shop (1 per day)'
  },
  chicken_breast: {
    key: 'chicken_breast', meal: 'lunch',
    name: 'WW RSPCA Chicken Breast Fillet',
    url: 'https://www.woolworths.com.au/shop/productdetails/710953/woolworths-rspca-approved-chicken-breast-fillet',
    packSize: '~350g fillet (~$11/kg)', packPrice: 3.85,
    dailyAmount: '350g fillet', daysPerPack: 1,
    qtyPerShop: 4, buyEvery: 'every',
    macros: { cal: 385, protein: 80, carbs: 0, fat: 5 },
    note: 'Batch cook on shop day — lasts 4 days in fridge'
  },
  cos_lettuce: {
    key: 'cos_lettuce', meal: 'lunch',
    name: 'WW Cos Hearts Lettuce 2pk',
    url: 'https://www.woolworths.com.au/shop/productdetails/141496/woolworths-cos-hearts-lettuce',
    packSize: '2 hearts', packPrice: 3.50,
    dailyAmount: '1 cos heart', daysPerPack: 2,
    qtyPerShop: 2, buyEvery: 'every',
    macros: { cal: 20, protein: 2, carbs: 2, fat: 0 },
    note: 'Buy 2 packs = 4 hearts = 4 days'
  },
  cherry_tomatoes: {
    key: 'cherry_tomatoes', meal: 'lunch',
    name: 'WW Cherry Tomatoes 250g',
    url: 'https://www.woolworths.com.au/shop/productdetails/149620/woolworths-cherry-tomatoes-punnet',
    packSize: '250g punnet', packPrice: 3.50,
    dailyAmount: '½ punnet (125g)', daysPerPack: 2,
    qtyPerShop: 2, buyEvery: 'every',
    macros: { cal: 23, protein: 1, carbs: 4, fat: 0 },
    note: 'Buy 2 punnets per shop'
  },
  qukes: {
    key: 'qukes', meal: 'lunch',
    name: 'WW Qukes Baby Cucumbers 250g',
    url: 'https://www.woolworths.com.au/shop/productdetails/169067/woolworths-qukes-baby-cucumbers-punnet',
    packSize: '250g punnet', packPrice: 3.50,
    dailyAmount: '½ punnet (125g)', daysPerPack: 2,
    qtyPerShop: 2, buyEvery: 'every',
    macros: { cal: 16, protein: 1, carbs: 2, fat: 0 },
    note: 'Buy 2 punnets per shop'
  },
  avocado: {
    key: 'avocado', meal: 'lunch',
    name: 'Avofresh Smashed Avocado 160g',
    url: 'https://www.woolworths.com.au/shop/productdetails/820738/avofresh-smashed-avocado',
    packSize: '160g tub', packPrice: 4.50,
    dailyAmount: '40g (¼ tub)', daysPerPack: 4,
    qtyPerShop: 1, buyEvery: 'every',
    macros: { cal: 64, protein: 1, carbs: 2, fat: 6 },
    note: 'Resealable tub. 160g = exactly 4 days.'
  },
  cheese: {
    key: 'cheese', meal: 'both',
    name: 'Bega Protein Tasty Cheese 500g',
    url: 'https://www.woolworths.com.au/shop/productdetails/182060/bega-protein-tasty-cheese-block',
    packSize: '500g block', packPrice: 10.50,
    dailyAmount: '50g (1/10 block)', daysPerPack: 10,
    qtyPerShop: 1, buyEvery: 'rotating', daysSupply: 10,
    macros: { cal: 200, protein: 13, carbs: 0, fat: 16 },
    note: 'Grate yourself. 1 block = 10 days.'
  },
  beetroot: {
    key: 'beetroot', meal: 'lunch',
    name: 'Golden Circle Baby Beetroot 450g',
    url: 'https://www.woolworths.com.au/shop/productdetails/96235/golden-circle-canned-vegetables-baby-beetroot-cans',
    packSize: '450g can', packPrice: 2.50,
    dailyAmount: '2 tbsp (~50g)', daysPerPack: 9,
    qtyPerShop: 1, buyEvery: 'rotating', daysSupply: 9,
    macros: { cal: 30, protein: 1, carbs: 6, fat: 0 },
    note: 'Keep to 2 tbsp — higher sugar. ~9 days per can.'
  },
  bread: {
    key: 'bread', meal: 'breakfast',
    name: "Abbott's Lower Carb White Loaf",
    url: 'https://www.woolworths.com.au/shop/productdetails/6028176/abbott-s-bakery-lower-carb-white-loaf',
    packSize: '600g (~9 slices)', packPrice: 5.50,
    dailyAmount: '1 slice', daysPerPack: 9,
    qtyPerShop: 1, buyEvery: 'rotating', daysSupply: 9,
    macros: { cal: 69, protein: 3, carbs: 8, fat: 1 },
    note: '50% less carbs. ~9 days per loaf.'
  },
  butter: {
    key: 'butter', meal: 'breakfast',
    name: 'Westgold Unsalted Butter 250g',
    url: 'https://www.woolworths.com.au/shop/productdetails/714989/westgold-unsalted-butter-butter',
    packSize: '250g block', packPrice: 6.50,
    dailyAmount: '15g', daysPerPack: 16,
    qtyPerShop: 1, buyEvery: 'rotating', daysSupply: 16,
    macros: { cal: 108, protein: 0, carbs: 0, fat: 12 },
    note: '1 block lasts ~16 days'
  },
  coke_zero: {
    key: 'coke_zero', meal: 'drinks',
    name: 'Coke Zero 30-pack 375ml',
    url: 'https://www.woolworths.com.au/shop/productdetails/679121/coca-cola-zero-sugar-soft-drink-multipack-cans',
    packSize: '30 × 375ml cans', packPrice: 28.00,
    dailyAmount: '2–3 cans', daysPerPack: 10,
    qtyPerShop: 1, buyEvery: 'rotating', daysSupply: 10,
    macros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
    note: 'Normal price ~$47 — only buy on special (~$28). Check before ordering!'
  }
};

// ── Meal definitions ─────────────────────────────────────
const MEALS = {
  breakfast: {
    label: 'Breakfast',
    emoji: '🍳',
    totals: { cal: 680, protein: 52, carbs: 35, fat: 37 },
    items: [
      { name: '3 eggs, fried or scrambled',            cal: '210 cal · 18g P' },
      { name: '1.5 herb & garlic chicken sausages',    cal: '177 cal · 19g P' },
      { name: '125g cottage cheese',                   cal: '89 cal · 15g P' },
      { name: '100g button mushrooms',                 cal: '22 cal' },
      { name: '½ red capsicum',                        cal: '20 cal' },
      { name: '½ red onion',                           cal: '20 cal' },
      { name: '15g butter (for cooking)',              cal: '108 cal' },
      { name: '1 slice lower carb white bread',        cal: '69 cal · 8g carbs' },
    ]
  },
  lunch: {
    label: 'Chicken Salad',
    emoji: '🥗',
    totals: { cal: 758, protein: 93, carbs: 20, fat: 30 },
    items: [
      { name: '350g chicken breast, grilled',          cal: '385 cal · 80g P' },
      { name: '1 cos heart lettuce',                   cal: '20 cal' },
      { name: '125g cherry tomatoes',                  cal: '23 cal' },
      { name: '125g qukes (baby cucumbers)',           cal: '16 cal' },
      { name: '40g smashed avocado',                   cal: '64 cal' },
      { name: '25g Bega Protein cheese, grated',       cal: '100 cal · 7g P' },
      { name: '2 tbsp beetroot — keep portion small',  cal: '30 cal' },
      { name: '¼ red capsicum',                        cal: '10 cal' },
      { name: '¼ red onion',                           cal: '10 cal' },
      { name: 'Olive oil + vinegar dressing',          cal: '~80 cal' },
    ]
  }
};

// ── Targets ──────────────────────────────────────────────
const DAILY_TARGETS = { cal: 2200, protein: 180, carbs: 60, fat: 100 };
const DAY_TOTALS    = { cal: 1438, protein: 145, carbs: 55, fat: 67 };

// ── Shopping lists ───────────────────────────────────────
const SHOP_EVERY    = ['chicken_breast','chicken_sausages','eggs','cottage_cheese','avocado','cos_lettuce','cherry_tomatoes','qukes','mushrooms','capsicum','onion'];
const SHOP_ROTATING = ['cheese','beetroot','bread','butter','coke_zero'];

// ── Weekly cost ──────────────────────────────────────────
const WEEKLY_COST = { estimated: 177, freeDelivery: 75 };
