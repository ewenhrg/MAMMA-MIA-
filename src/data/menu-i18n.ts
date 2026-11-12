/**
 * Translations for the QR menu (/menu).
 * Menu content in `menu.ts` is written in English; everything here is keyed by that English text.
 */

export const MENU_LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ar", label: "عربي مصري", short: "عربي" },
] as const;

export type MenuLang = (typeof MENU_LANGS)[number]["code"];
type ForeignLang = Exclude<MenuLang, "en">;

const FOREIGN_ORDER: readonly ForeignLang[] = ["fr", "es", "de", "ru", "ar"];

/** [fr, es, de, ru, ar] — or a single string: Arabic only, other languages keep the English text. */
type Tr = readonly [string, string, string, string, string] | string;

export const isRtl = (lang: MenuLang) => lang === "ar";

export function detectMenuLang(languages: readonly string[]): MenuLang {
  for (const tag of languages) {
    const base = tag.toLowerCase().split("-")[0];
    const match = MENU_LANGS.find((l) => l.code === base);
    if (match) return match.code;
  }
  return "en";
}

export function translate(lang: MenuLang, text: string): string {
  if (lang === "en") return text;
  const entry = TEXT[text];
  if (entry !== undefined) {
    if (typeof entry === "string") return lang === "ar" ? entry : text;
    return entry[FOREIGN_ORDER.indexOf(lang)];
  }
  if (text.includes(" · ")) {
    return text
      .split(" · ")
      .map((part) => translate(lang, part))
      .join(" · ");
  }
  return text;
}

export function categoryLabels(lang: MenuLang, id: string, title: string) {
  if (lang === "en") {
    return {
      title,
      chip: title.replace("Hot Drinks — ", "Hot ").replace("Cold Drinks — ", "Iced "),
    };
  }
  const entry = CATEGORIES[id]?.[FOREIGN_ORDER.indexOf(lang)];
  if (!entry) return { title, chip: title };
  return typeof entry === "string" ? { title: entry, chip: entry } : { title: entry[0], chip: entry[1] };
}

export type MenuUi = {
  tagline: string;
  tax: string;
  drinks: string;
  food: string;
  viewOrder: string;
  backToMenu: string;
  myOrder: string;
  emptyOrder: string;
  tableLabel: string;
  tablePlaceholder: string;
  showWaiter: string;
  orderHeading: string;
  table: (value: string) => string;
  customerOrder: string;
  items: (count: number) => string;
  editOrder: string;
  newOrder: string;
  confirmNewOrder: string;
  footer: string;
  pdfMenu: string;
  add: string;
  remove: string;
  language: string;
  currency: string;
};

const russianItems = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} позиция`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} позиции`;
  return `${n} позиций`;
};

const arabicItems = (n: number) => {
  if (n === 1) return "صنف واحد";
  if (n === 2) return "صنفين";
  if (n <= 10) return `${n} أصناف`;
  return `${n} صنف`;
};

export const MENU_UI: Record<MenuLang, MenuUi> = {
  en: {
    tagline: "Beach Club · Restaurant · Hurghada",
    tax: "Tax +14%",
    drinks: "Drinks",
    food: "Food",
    viewOrder: "View my order",
    backToMenu: "Menu",
    myOrder: "My order",
    emptyOrder: "Your order is empty.",
    tableLabel: "Table / sunbed number (optional)",
    tablePlaceholder: "e.g. 12",
    showWaiter: "Show to the waiter",
    orderHeading: "Mamma Mia · Order",
    table: (v) => `Table ${v}`,
    customerOrder: "Customer order",
    items: (n) => `${n} item${n > 1 ? "s" : ""}`,
    editOrder: "Edit order",
    newOrder: "New order",
    confirmNewOrder: "Start a new order? Your current selection will be cleared.",
    footer: "Prices in EGP · Tax charge +14%",
    pdfMenu: "PDF menu",
    add: "Add",
    remove: "Remove one",
    language: "Language",
    currency: "EGP",
  },
  fr: {
    tagline: "Beach Club · Restaurant · Hurghada",
    tax: "Taxe +14 %",
    drinks: "Boissons",
    food: "Cuisine",
    viewOrder: "Voir ma commande",
    backToMenu: "Menu",
    myOrder: "Ma commande",
    emptyOrder: "Votre commande est vide.",
    tableLabel: "Numéro de table / transat (facultatif)",
    tablePlaceholder: "ex. 12",
    showWaiter: "Montrer au serveur",
    orderHeading: "Mamma Mia · Commande",
    table: (v) => `Table ${v}`,
    customerOrder: "Commande client",
    items: (n) => `${n} article${n > 1 ? "s" : ""}`,
    editOrder: "Modifier",
    newOrder: "Nouvelle commande",
    confirmNewOrder: "Commencer une nouvelle commande ? Votre sélection actuelle sera effacée.",
    footer: "Prix en EGP · Taxe +14 %",
    pdfMenu: "Menu PDF",
    add: "Ajouter",
    remove: "Retirer",
    language: "Langue",
    currency: "EGP",
  },
  es: {
    tagline: "Beach Club · Restaurante · Hurghada",
    tax: "Impuesto +14 %",
    drinks: "Bebidas",
    food: "Comida",
    viewOrder: "Ver mi pedido",
    backToMenu: "Menú",
    myOrder: "Mi pedido",
    emptyOrder: "Tu pedido está vacío.",
    tableLabel: "Número de mesa / tumbona (opcional)",
    tablePlaceholder: "p. ej. 12",
    showWaiter: "Mostrar al camarero",
    orderHeading: "Mamma Mia · Pedido",
    table: (v) => `Mesa ${v}`,
    customerOrder: "Pedido del cliente",
    items: (n) => `${n} artículo${n > 1 ? "s" : ""}`,
    editOrder: "Editar pedido",
    newOrder: "Nuevo pedido",
    confirmNewOrder: "¿Empezar un nuevo pedido? Se borrará tu selección actual.",
    footer: "Precios en EGP · Impuesto +14 %",
    pdfMenu: "Menú en PDF",
    add: "Añadir",
    remove: "Quitar",
    language: "Idioma",
    currency: "EGP",
  },
  de: {
    tagline: "Beach Club · Restaurant · Hurghada",
    tax: "Steuer +14 %",
    drinks: "Getränke",
    food: "Speisen",
    viewOrder: "Meine Bestellung",
    backToMenu: "Menü",
    myOrder: "Meine Bestellung",
    emptyOrder: "Deine Bestellung ist leer.",
    tableLabel: "Tisch- / Liegennummer (optional)",
    tablePlaceholder: "z. B. 12",
    showWaiter: "Dem Kellner zeigen",
    orderHeading: "Mamma Mia · Bestellung",
    table: (v) => `Tisch ${v}`,
    customerOrder: "Kundenbestellung",
    items: (n) => `${n} Artikel`,
    editOrder: "Bearbeiten",
    newOrder: "Neue Bestellung",
    confirmNewOrder: "Neue Bestellung beginnen? Deine aktuelle Auswahl wird gelöscht.",
    footer: "Preise in EGP · Steuer +14 %",
    pdfMenu: "PDF-Menü",
    add: "Hinzufügen",
    remove: "Entfernen",
    language: "Sprache",
    currency: "EGP",
  },
  ru: {
    tagline: "Beach Club · Ресторан · Хургада",
    tax: "Налог +14%",
    drinks: "Напитки",
    food: "Еда",
    viewOrder: "Мой заказ",
    backToMenu: "Меню",
    myOrder: "Мой заказ",
    emptyOrder: "Ваш заказ пуст.",
    tableLabel: "Номер столика / шезлонга (необязательно)",
    tablePlaceholder: "напр. 12",
    showWaiter: "Показать официанту",
    orderHeading: "Mamma Mia · Заказ",
    table: (v) => `Столик ${v}`,
    customerOrder: "Заказ гостя",
    items: russianItems,
    editOrder: "Изменить",
    newOrder: "Новый заказ",
    confirmNewOrder: "Начать новый заказ? Текущий выбор будет удалён.",
    footer: "Цены в EGP · Налог +14%",
    pdfMenu: "Меню в PDF",
    add: "Добавить",
    remove: "Убрать",
    language: "Язык",
    currency: "EGP",
  },
  ar: {
    tagline: "بيتش كلوب · مطعم · الغردقة",
    tax: "ضريبة ‎+14%",
    drinks: "مشروبات",
    food: "أكل",
    viewOrder: "شوف طلبي",
    backToMenu: "المنيو",
    myOrder: "طلبي",
    emptyOrder: "طلبك فاضي.",
    tableLabel: "رقم الترابيزة / الشيزلونج (اختياري)",
    tablePlaceholder: "مثلاً 12",
    showWaiter: "ورّي الطلب للجرسون",
    orderHeading: "ماما ميا · طلب",
    table: (v) => `ترابيزة ${v}`,
    customerOrder: "طلب زبون",
    items: arabicItems,
    editOrder: "عدّل الطلب",
    newOrder: "طلب جديد",
    confirmNewOrder: "تبدأ طلب جديد؟ الاختيارات الحالية هتتمسح.",
    footer: "الأسعار بالجنيه المصري · ضريبة ‎+14%",
    pdfMenu: "المنيو PDF",
    add: "زوّد",
    remove: "شيل",
    language: "اللغة",
    currency: "ج.م",
  },
};

/** [title, chip] when the chip label is shorter than the section title. */
type CategoryTr = string | readonly [string, string];

const CATEGORIES: Record<string, readonly [CategoryTr, CategoryTr, CategoryTr, CategoryTr, CategoryTr]> = {
  "hot-coffee": [
    ["Boissons chaudes — Café", "Café chaud"],
    ["Bebidas calientes — Café", "Café caliente"],
    ["Heißgetränke — Kaffee", "Heißer Kaffee"],
    ["Горячие напитки — Кофе", "Горячий кофе"],
    ["مشروبات سخنة — قهوة", "قهوة سخنة"],
  ],
  "hot-tea": [
    ["Boissons chaudes — Thé", "Thé"],
    ["Bebidas calientes — Té", "Té"],
    ["Heißgetränke — Tee", "Tee"],
    ["Горячие напитки — Чай", "Чай"],
    ["مشروبات سخنة — شاي", "شاي"],
  ],
  "hot-mix": [
    ["Boissons chaudes — Spécialités", "Spécialités chaudes"],
    ["Bebidas calientes — Especiales", "Especiales calientes"],
    ["Heißgetränke — Spezialitäten", "Heiße Spezialitäten"],
    ["Горячие напитки — Другое", "Другие горячие"],
    ["مشروبات سخنة — متنوع", "مشروبات سخنة"],
  ],
  "cold-coffee": [
    ["Boissons froides — Café", "Café glacé"],
    ["Bebidas frías — Café", "Café helado"],
    ["Kaltgetränke — Kaffee", "Eiskaffee"],
    ["Холодные напитки — Кофе", "Холодный кофе"],
    ["مشروبات ساقعة — قهوة", "قهوة ساقعة"],
  ],
  "soft-drinks": ["Boissons fraîches", "Refrescos", "Softdrinks", "Безалкогольные напитки", "مية ومشروبات غازية"],
  "fresh-juices": ["Jus frais", "Zumos naturales", "Frische Säfte", "Свежевыжатые соки", "عصاير فريش"],
  smoothies: ["Smoothies", "Smoothies", "Smoothies", "Смузи", "سموزي"],
  milkshakes: ["Milkshakes", "Batidos", "Milchshakes", "Молочные коктейли", "ميلك شيك"],
  "fresh-cocktails": [
    "Cocktails de fruits frais",
    "Cócteles de fruta fresca",
    "Frische Fruchtcocktails",
    "Фруктовые коктейли",
    "كوكتيل فواكه فريش",
  ],
  mojitos: ["Mojitos", "Mojitos", "Mojitos", "Мохито", "موهيتو"],
  "ice-cream": ["Glaces", "Helados", "Eis", "Мороженое", "آيس كريم"],
  breakfast: ["Petit-déjeuner", "Desayuno", "Frühstück", "Завтрак", "فطار"],
  starters: ["Entrées", "Entrantes", "Vorspeisen", "Закуски", "مقبلات"],
  sandwiches: ["Sandwichs", "Sándwiches", "Sandwiches", "Сэндвичи", "ساندويتشات"],
  fajitas: ["Fajitas", "Fajitas", "Fajitas", "Фахитос", "فاهيتا"],
  salads: ["Salades", "Ensaladas", "Salate", "Салаты", "سلطات"],
  soups: ["Soupes", "Sopas", "Suppen", "Супы", "شوربة"],
  mains: ["Plats principaux", "Platos principales", "Hauptgerichte", "Основные блюда", "أطباق رئيسية"],
  charcoal: ["Grillades au charbon", "Parrilla de carbón", "Holzkohlegrill", "Гриль на углях", "مشويات على الفحم"],
  sides: ["Accompagnements", "Guarniciones", "Beilagen", "Гарниры", "أطباق جانبية"],
  pasta: ["Pâtes", "Pasta", "Pasta", "Паста", "مكرونة"],
  pizza: ["Pizzas", "Pizzas", "Pizza", "Пицца", "بيتزا"],
  desserts: ["Desserts", "Postres", "Desserts", "Десерты", "حلويات"],
  "waffle-pancake": ["Gaufres & pancakes", "Gofres y tortitas", "Waffeln & Pancakes", "Вафли и панкейки", "وافل وبان كيك"],
};

const TEXT: Record<string, Tr> = {
  // Hot coffee
  "Turkish Coffee": ["Café turc", "Café turco", "Türkischer Kaffee", "Кофе по-турецки", "قهوة تركي"],
  "French Coffee": ["Café français", "Café francés", "Französischer Kaffee", "Кофе по-французски", "قهوة فرنساوي"],
  "Nutella / Hazelnut Coffee": [
    "Café Nutella / noisette",
    "Café Nutella / avellana",
    "Nutella- / Haselnusskaffee",
    "Кофе с нутеллой / фундуком",
    "قهوة نوتيلا / بندق",
  ],
  Espresso: ["Espresso", "Espresso", "Espresso", "Эспрессо", "إسبريسو"],
  "Espresso Double": ["Espresso double", "Espresso doble", "Doppelter Espresso", "Двойной эспрессо", "إسبريسو دبل"],
  "Espresso Macchiato": ["Espresso macchiato", "Espresso macchiato", "Espresso Macchiato", "Эспрессо макиато", "إسبريسو ماكياتو"],
  Cortado: ["Cortado", "Cortado", "Cortado", "Кортадо", "كورتادو"],
  "Spanish Latte": ["Latte espagnol", "Latte español", "Spanischer Latte", "Испанский латте", "سبانش لاتيه"],
  "Macchiato Caramel": ["Macchiato caramel", "Macchiato de caramelo", "Karamell-Macchiato", "Макиато с карамелью", "ماكياتو كراميل"],
  Cappuccino: ["Cappuccino", "Capuchino", "Cappuccino", "Капучино", "كابتشينو"],
  "Coffee Latte": ["Café latte", "Café con leche", "Milchkaffee", "Кофе латте", "قهوة لاتيه"],
  "Nescafe Black": ["Nescafé noir", "Nescafé solo", "Nescafé schwarz", "Нескафе чёрный", "نسكافيه سادة"],
  "Nescafé With Milk": ["Nescafé au lait", "Nescafé con leche", "Nescafé mit Milch", "Нескафе с молоком", "نسكافيه باللبن"],
  Americano: ["Americano", "Americano", "Americano", "Американо", "أمريكانو"],
  "Mocha Black or White": [
    "Moka noir ou blanc",
    "Moca negro o blanco",
    "Mokka dunkel oder weiß",
    "Мокко тёмный или белый",
    "موكا دارك أو وايت",
  ],

  // Hot tea & mix
  "Black Tea": ["Thé noir", "Té negro", "Schwarzer Tee", "Чёрный чай", "شاي"],
  "Herbal Tea": ["Tisane", "Infusión de hierbas", "Kräutertee", "Травяной чай", "أعشاب"],
  "Fruit Tea": ["Thé aux fruits", "Té de frutas", "Früchtetee", "Фруктовый чай", "شاي فواكه"],
  "Tea Pot": ["Théière", "Tetera", "Teekanne", "Чайник чая", "براد شاي"],
  "Hot Cider": ["Cidre chaud", "Sidra caliente", "Heißer Apfelcider", "Горячий сидр", "سيدر سخن"],
  "Sahlab Nuts, Fruits or Flavor": [
    "Sahlab aux noix, fruits ou arôme",
    "Sahlab con frutos secos, frutas o sabor",
    "Sahlab mit Nüssen, Früchten oder Aroma",
    "Сахляб с орехами, фруктами или вкусом",
    "سحلب مكسرات أو فواكه أو نكهة",
  ],
  "Hot Chocolate": ["Chocolat chaud", "Chocolate caliente", "Heiße Schokolade", "Горячий шоколад", "هوت شوكليت"],

  // Cold coffee
  "Iced Coffee": ["Café glacé", "Café helado", "Eiskaffee", "Холодный кофе", "آيس كوفي"],
  "Iced Mocca": ["Moka glacé", "Moca helado", "Eis-Mokka", "Холодный мокко", "آيس موكا"],
  "Iced Frappe": ["Frappé glacé", "Frappé helado", "Eis-Frappé", "Фраппе", "آيس فرابيه"],
  "Iced Americano": ["Americano glacé", "Americano helado", "Eis-Americano", "Холодный американо", "آيس أمريكانو"],
  "Iced Chocolate": ["Chocolat glacé", "Chocolate helado", "Eisschokolade", "Холодный шоколад", "آيس شوكليت"],

  // Soft drinks
  "Small Water": ["Petite eau", "Agua pequeña", "Wasser klein", "Вода малая", "مية صغيرة"],
  "Large Water": ["Grande eau", "Agua grande", "Wasser groß", "Вода большая", "مية كبيرة"],
  "Ice tea": ["Thé glacé", "Té helado", "Eistee", "Холодный чай", "آيس تي"],
  "Cola / Fanta / Pepsi / Sprite": "كولا / فانتا / بيبسي / سبرايت",
  Schweppes: "شويبس",
  Tonic: ["Tonic", "Tónica", "Tonic Water", "Тоник", "تونيك"],
  Soda: ["Soda", "Soda", "Soda", "Содовая", "صودا"],
  Birell: [
    "Birell (bière sans alcool)",
    "Birell (cerveza sin alcohol)",
    "Birell (alkoholfreies Bier)",
    "Birell (безалкогольное пиво)",
    "بيريل",
  ],
  "Red Bull": "ريد بول",

  // Fruits & flavours (juices, smoothies, milkshakes, mojitos, ingredient lists)
  Mango: ["Mangue", "Mango", "Mango", "Манго", "مانجا"],
  Strawberry: ["Fraise", "Fresa", "Erdbeere", "Клубника", "فراولة"],
  Guava: ["Goyave", "Guayaba", "Guave", "Гуава", "جوافة"],
  Orange: ["Orange", "Naranja", "Orange", "Апельсин", "برتقال"],
  Watermelon: ["Pastèque", "Sandía", "Wassermelone", "Арбуз", "بطيخ"],
  Cantaloup: ["Melon", "Melón", "Melone", "Дыня", "كانتلوب"],
  Pineapple: ["Ananas", "Piña", "Ananas", "Ананас", "أناناس"],
  Peach: ["Pêche", "Melocotón", "Pfirsich", "Персик", "خوخ"],
  Lemon: ["Citron", "Limón", "Zitrone", "Лимон", "ليمون"],
  "Lemon Mint": ["Citron menthe", "Limón y menta", "Zitrone-Minze", "Лимон с мятой", "ليمون نعناع"],
  Avocado: ["Avocat", "Aguacate", "Avocado", "Авокадо", "أفوكادو"],
  Apple: ["Pomme", "Manzana", "Apfel", "Яблоко", "تفاح"],
  Blueberry: ["Myrtille", "Arándano", "Heidelbeere", "Черника", "بلوبيري"],
  Kiwi: ["Kiwi", "Kiwi", "Kiwi", "Киви", "كيوي"],
  "Pina Colada": ["Piña colada", "Piña colada", "Piña Colada", "Пина колада", "بينا كولادا"],
  "Mango Kiwi": ["Mangue kiwi", "Mango y kiwi", "Mango-Kiwi", "Манго-киви", "مانجا كيوي"],
  "Passion Fruit": ["Fruit de la passion", "Maracuyá", "Maracuja", "Маракуйя", "باشن فروت"],
  Vanilla: ["Vanille", "Vainilla", "Vanille", "Ваниль", "فانيليا"],
  Caramel: ["Caramel", "Caramelo", "Karamell", "Карамель", "كراميل"],
  Chocolate: ["Chocolat", "Chocolate", "Schokolade", "Шоколад", "شوكولاتة"],
  Nutella: ["Nutella", "Nutella", "Nutella", "Нутелла", "نوتيلا"],
  Lotus: ["Lotus (spéculoos)", "Lotus (galleta)", "Lotus (Spekulatius)", "Лотус (печенье)", "لوتس"],
  Pistaccio: ["Pistache", "Pistacho", "Pistazie", "Фисташка", "فستق"],
  Oreo: ["Oreo", "Oreo", "Oreo", "Орео", "أوريو"],
  Banana: ["Banane", "Plátano", "Banane", "Банан", "موز"],
  "Ice Cream": ["Glace", "Helado", "Eis", "Мороженое", "آيس كريم"],
  Milk: ["Lait", "Leche", "Milch", "Молоко", "لبن"],
  Honey: ["Miel", "Miel", "Honig", "Мёд", "عسل"],
  Nuts: ["Fruits secs", "Frutos secos", "Nüsse", "Орехи", "مكسرات"],

  // Fresh cocktails & mojitos
  Florida: "فلوريدا",
  "Vitamin C": ["Vitamine C", "Vitamina C", "Vitamin C", "Витамин C", "فيتامين سي"],
  Hawaii: ["Hawaï", "Hawái", "Hawaii", "Гавайи", "هاواي"],
  Kiango: "كيانجو",
  Montana: "مونتانا",
  Rose: "روز",
  "Mama Mia": "ماما ميا",
  Classic: ["Classique", "Clásico", "Klassisch", "Классический", "كلاسيك"],
  "Cherry Cola": ["Cerise cola", "Cereza cola", "Kirsch-Cola", "Вишнёвая кола", "تشيري كولا"],
  "Blue Mountain": "بلو ماونتن",
  Sunshine: "صن شاين",
  "Scotch Mint": "سكوتش منت",
  "Mamma Mia": "ماما ميا",

  // Ice cream
  "1 Scoop": ["1 boule", "1 bola", "1 Kugel", "1 шарик", "بولة واحدة"],
  "2 Scoops": ["2 boules", "2 bolas", "2 Kugeln", "2 шарика", "بولتين"],
  "3 Scoops": ["3 boules", "3 bolas", "3 Kugeln", "3 шарика", "3 بولات"],
  "Mamma Mia Ice Cream": [
    "Coupe glacée Mamma Mia",
    "Helado Mamma Mia",
    "Mamma-Mia-Eisbecher",
    "Мороженое Mamma Mia",
    "آيس كريم ماما ميا",
  ],
  "Chocolate, sauce and 2 scoops": [
    "Chocolat, sauce et 2 boules",
    "Chocolate, salsa y 2 bolas",
    "Schokolade, Soße und 2 Kugeln",
    "Шоколад, соус и 2 шарика",
    "شوكولاتة وصوص وبولتين",
  ],
  "Choice: Vanilla · Chocolate · Mango · Strawberry": [
    "Au choix : vanille · chocolat · mangue · fraise",
    "A elegir: vainilla · chocolate · mango · fresa",
    "Zur Wahl: Vanille · Schokolade · Mango · Erdbeere",
    "На выбор: ваниль · шоколад · манго · клубника",
    "اختار: فانيليا · شوكولاتة · مانجا · فراولة",
  ],

  // Breakfast
  "Oriental Breakfast": [
    "Petit-déjeuner oriental",
    "Desayuno oriental",
    "Orientalisches Frühstück",
    "Восточный завтрак",
    "فطار شرقي",
  ],
  "Fava Beans · Falafel · 2 Eggs · Cheese with Tomatoes · Bread": [
    "Fèves · Falafel · 2 œufs · Fromage et tomates · Pain",
    "Habas · Falafel · 2 huevos · Queso con tomate · Pan",
    "Ful (Saubohnen) · Falafel · 2 Eier · Käse mit Tomaten · Brot",
    "Фул (бобы) · Фалафель · 2 яйца · Сыр с помидорами · Хлеб",
    "فول · طعمية · 2 بيض · جبنة بالطماطم · عيش",
  ],
  "English Breakfast": ["Petit-déjeuner anglais", "Desayuno inglés", "Englisches Frühstück", "Английский завтрак", "فطار إنجليزي"],
  "Eggs · Salami · Beans · Cheese · Butter · Honey · Jam · Toast": [
    "Œufs · Salami · Haricots · Fromage · Beurre · Miel · Confiture · Toast",
    "Huevos · Salami · Alubias · Queso · Mantequilla · Miel · Mermelada · Tostadas",
    "Eier · Salami · Bohnen · Käse · Butter · Honig · Marmelade · Toast",
    "Яйца · Салями · Фасоль · Сыр · Масло · Мёд · Джем · Тост",
    "بيض · سلامي · فاصوليا · جبنة · زبدة · عسل · مربى · توست",
  ],
  "French Breakfast": [
    "Petit-déjeuner français",
    "Desayuno francés",
    "Französisches Frühstück",
    "Французский завтрак",
    "فطار فرنساوي",
  ],
  "2 Croissants · Butter · Honey · Jam · Drink (Orange Juice, Black Coffee or Hot Chocolate)": [
    "2 croissants · Beurre · Miel · Confiture · Boisson (jus d'orange, café noir ou chocolat chaud)",
    "2 cruasanes · Mantequilla · Miel · Mermelada · Bebida (zumo de naranja, café solo o chocolate caliente)",
    "2 Croissants · Butter · Honig · Marmelade · Getränk (Orangensaft, schwarzer Kaffee oder heiße Schokolade)",
    "2 круассана · Масло · Мёд · Джем · Напиток (апельсиновый сок, чёрный кофе или горячий шоколад)",
    "2 كرواسون · زبدة · عسل · مربى · مشروب (عصير برتقال أو قهوة سادة أو هوت شوكليت)",
  ],
  Extras: ["Suppléments", "Extras", "Extras", "Дополнительно", "إضافات"],
  "Mixed Cheese or Tahini or Baba Ghanoush or Pickled Eggplant": [
    "Fromages variés, tahini, baba ghanoush ou aubergines marinées",
    "Quesos variados, tahini, baba ganoush o berenjena encurtida",
    "Käseauswahl, Tahini, Baba Ghanoush oder eingelegte Aubergine",
    "Ассорти сыров, тахини, баба гануш или маринованные баклажаны",
    "جبن مشكل أو طحينة أو بابا غنوج أو بتنجان مخلل",
  ],

  // Starters
  "Cold Mezze": ["Mezzé froids", "Mezze frío", "Kalte Mezze", "Холодные мезе", "مقبلات باردة"],
  "Tahini or Baba Ghanoush or Tabbouleh": [
    "Tahini, baba ghanoush ou taboulé",
    "Tahini, baba ganoush o tabulé",
    "Tahini, Baba Ghanoush oder Taboulé",
    "Тахини, баба гануш или табуле",
    "طحينة أو بابا غنوج أو تبولة",
  ],
  "Cheese Samosa": ["Samoussa au fromage", "Samosa de queso", "Käse-Samosa", "Самоса с сыром", "سمبوسك جبنة"],
  "Fried and stuffed with cheese and fresh mint": [
    "Frit, farci au fromage et à la menthe fraîche",
    "Frita, rellena de queso y menta fresca",
    "Frittiert, gefüllt mit Käse und frischer Minze",
    "Жареная, с сыром и свежей мятой",
    "مقلية ومحشية جبنة ونعناع فريش",
  ],
  "Grilled Sausage": ["Saucisse grillée", "Salchicha a la parrilla", "Gegrillte Wurst", "Колбаски гриль", "سجق مشوي"],
  "Spicy sausage slices with lemon juice": [
    "Rondelles de saucisse épicée au jus de citron",
    "Rodajas de salchicha picante con zumo de limón",
    "Scharfe Wurstscheiben mit Zitronensaft",
    "Острые колбаски с лимонным соком",
    "سجق حراق بعصير الليمون",
  ],
  "Chicken Strips": ["Lanières de poulet", "Tiras de pollo", "Hähnchenstreifen", "Куриные стрипсы", "استربس فراخ"],
  "Crispy chicken strips": [
    "Lanières de poulet croustillantes",
    "Tiras de pollo crujientes",
    "Knusprige Hähnchenstreifen",
    "Хрустящие куриные стрипсы",
    "استربس فراخ مقرمشة",
  ],
  "Banco Bronze": "بانكو برونز",
  "Fried shrimps with sweet chili": [
    "Crevettes frites, sauce chili douce",
    "Gambas fritas con chile dulce",
    "Frittierte Garnelen mit Sweet Chili",
    "Жареные креветки со сладким чили",
    "جمبري مقلي بالسويت تشيلي",
  ],
  "Fried Calamari": ["Calamars frits", "Calamares fritos", "Frittierte Calamari", "Жареные кальмары", "كاليماري مقلي"],
  "Marinated calamari fillets fried with sweet chili": [
    "Filets de calamar marinés et frits, sauce chili douce",
    "Filetes de calamar marinados y fritos con chile dulce",
    "Marinierte, frittierte Calamari mit Sweet Chili",
    "Маринованное филе кальмара, жареное, со сладким чили",
    "فيليه كاليماري متتبل ومقلي بالسويت تشيلي",
  ],
  "Spicy Potatoes with Sriracha": [
    "Pommes de terre épicées à la sriracha",
    "Patatas picantes con sriracha",
    "Scharfe Kartoffeln mit Sriracha",
    "Острый картофель со шрирачей",
    "بطاطس حراقة بالسريراتشا",
  ],
  "Chicken Wings": ["Ailes de poulet", "Alitas de pollo", "Chicken Wings", "Куриные крылышки", "أجنحة فراخ"],
  "Fried chicken wings with dip of your choice": [
    "Ailes de poulet frites, sauce au choix",
    "Alitas fritas con salsa a elegir",
    "Frittierte Chicken Wings mit Dip nach Wahl",
    "Жареные крылышки с соусом на выбор",
    "أجنحة فراخ مقلية مع صوص من اختيارك",
  ],
  Prawns: ["Crevettes", "Langostinos", "Garnelen", "Креветки", "جمبري"],
  "Shrimp marinated with garlic, lemon and coriander": [
    "Crevettes marinées à l'ail, au citron et à la coriandre",
    "Gambas marinadas con ajo, limón y cilantro",
    "Garnelen mariniert mit Knoblauch, Zitrone und Koriander",
    "Креветки в маринаде из чеснока, лимона и кинзы",
    "جمبري متتبل بالتوم والليمون والكزبرة",
  ],

  // Sandwiches
  "Smoked Salmon Sandwich": [
    "Sandwich au saumon fumé",
    "Sándwich de salmón ahumado",
    "Räucherlachs-Sandwich",
    "Сэндвич с копчёным лососем",
    "ساندويتش سلمون مدخن",
  ],
  "Smoked salmon fillets with dressing and caper": [
    "Saumon fumé, sauce et câpres",
    "Salmón ahumado con aliño y alcaparras",
    "Räucherlachs mit Dressing und Kapern",
    "Копчёный лосось с соусом и каперсами",
    "سلمون مدخن بالدريسنج والكبر",
  ],
  "Chicken Wrap": ["Wrap au poulet", "Wrap de pollo", "Hähnchen-Wrap", "Ролл с курицей", "راب فراخ"],
  "Chicken breast, mozzarella and vegetables with hot sauce": [
    "Blanc de poulet, mozzarella et légumes, sauce piquante",
    "Pechuga de pollo, mozzarella y verduras con salsa picante",
    "Hähnchenbrust, Mozzarella und Gemüse mit scharfer Soße",
    "Куриная грудка, моцарелла и овощи с острым соусом",
    "صدور فراخ وموتزاريلا وخضار بالصوص الحار",
  ],
  "Chicken Quesadilla": ["Quesadilla au poulet", "Quesadilla de pollo", "Hähnchen-Quesadilla", "Кесадилья с курицей", "كاساديا فراخ"],
  "Mexican-style chicken with hot sauce": [
    "Poulet à la mexicaine, sauce piquante",
    "Pollo al estilo mexicano con salsa picante",
    "Hähnchen nach mexikanischer Art mit scharfer Soße",
    "Курица по-мексикански с острым соусом",
    "فراخ على الطريقة المكسيكي بالصوص الحار",
  ],
  "Classic Burger": ["Burger classique", "Hamburguesa clásica", "Klassischer Burger", "Классический бургер", "برجر كلاسيك"],
  "Beef with lettuce, cheddar cheese": [
    "Bœuf, laitue, cheddar",
    "Ternera con lechuga y queso cheddar",
    "Rindfleisch mit Salat und Cheddar",
    "Говядина, салат, сыр чеддер",
    "لحمة بالخس وجبنة شيدر",
  ],
  "Tuna Sandwich": ["Sandwich au thon", "Sándwich de atún", "Thunfisch-Sandwich", "Сэндвич с тунцом", "ساندويتش تونة"],
  "Tuna with vegetables and corn": [
    "Thon, légumes et maïs",
    "Atún con verduras y maíz",
    "Thunfisch mit Gemüse und Mais",
    "Тунец с овощами и кукурузой",
    "تونة بالخضار والذرة",
  ],

  // Fajitas
  "Chicken Fajitas": ["Fajitas au poulet", "Fajitas de pollo", "Hähnchen-Fajitas", "Фахитос с курицей", "فاهيتا فراخ"],
  "Chicken strips with vegetables, corn": [
    "Lanières de poulet, légumes et maïs",
    "Tiras de pollo con verduras y maíz",
    "Hähnchenstreifen mit Gemüse und Mais",
    "Курица с овощами и кукурузой",
    "استربس فراخ بالخضار والذرة",
  ],
  "Beef Fajitas": ["Fajitas au bœuf", "Fajitas de ternera", "Rindfleisch-Fajitas", "Фахитос с говядиной", "فاهيتا لحمة"],
  "Sliced marinated Mexican beef steaks": [
    "Émincé de bœuf mariné à la mexicaine",
    "Filetes de ternera marinada al estilo mexicano",
    "Marinierte Rindfleischstreifen nach mexikanischer Art",
    "Маринованная говядина по-мексикански",
    "شرايح ستيك لحمة متتبلة على الطريقة المكسيكي",
  ],
  "Seafood Fajitas": [
    "Fajitas aux fruits de mer",
    "Fajitas de marisco",
    "Meeresfrüchte-Fajitas",
    "Фахитос с морепродуктами",
    "فاهيتا سي فود",
  ],
  "A selection of Red Sea seafood prepared in the style of Mamma Mia": [
    "Fruits de mer de la mer Rouge à la façon Mamma Mia",
    "Selección de marisco del mar Rojo al estilo Mamma Mia",
    "Meeresfrüchte aus dem Roten Meer nach Mamma-Mia-Art",
    "Морепродукты Красного моря по рецепту Mamma Mia",
    "تشكيلة سي فود من البحر الأحمر على طريقة ماما ميا",
  ],

  // Salads
  "Fresh Salad": ["Salade fraîche", "Ensalada fresca", "Frischer Salat", "Свежий салат", "سلطة خضرا"],
  "A selection of fresh vegetables": [
    "Assortiment de légumes frais",
    "Selección de verduras frescas",
    "Auswahl an frischem Gemüse",
    "Ассорти свежих овощей",
    "تشكيلة خضار فريش",
  ],
  "Salmon Avocado": ["Saumon avocat", "Salmón y aguacate", "Lachs-Avocado", "Лосось с авокадо", "سلمون أفوكادو"],
  "Smoked salmon with avocado and vegetables": [
    "Saumon fumé, avocat et légumes",
    "Salmón ahumado con aguacate y verduras",
    "Räucherlachs mit Avocado und Gemüse",
    "Копчёный лосось с авокадо и овощами",
    "سلمون مدخن بالأفوكادو والخضار",
  ],
  "Greek Salad": ["Salade grecque", "Ensalada griega", "Griechischer Salat", "Греческий салат", "سلطة يوناني"],
  "Tomatoes, cucumbers, olives, feta, olive oil": [
    "Tomates, concombres, olives, feta, huile d'olive",
    "Tomates, pepinos, aceitunas, feta, aceite de oliva",
    "Tomaten, Gurken, Oliven, Feta, Olivenöl",
    "Помидоры, огурцы, оливки, фета, оливковое масло",
    "طماطم وخيار وزيتون وجبنة فيتا وزيت زيتون",
  ],
  "Classic Caesar Salad": [
    "Salade César classique",
    "Ensalada César clásica",
    "Klassischer Caesar Salad",
    "Классический салат «Цезарь»",
    "سلطة سيزر كلاسيك",
  ],
  "Lettuce, Parmesan, dressing and bread": [
    "Laitue, parmesan, sauce et croûtons",
    "Lechuga, parmesano, aliño y pan",
    "Salat, Parmesan, Dressing und Brot",
    "Салат, пармезан, соус и хлеб",
    "خس وبارميزان ودريسنج وعيش",
  ],
  "Tuna Salad": ["Salade de thon", "Ensalada de atún", "Thunfischsalat", "Салат с тунцом", "سلطة تونة"],
  "Tuna, vegetables and sweet corn": [
    "Thon, légumes et maïs doux",
    "Atún, verduras y maíz dulce",
    "Thunfisch, Gemüse und Mais",
    "Тунец, овощи и сладкая кукуруза",
    "تونة وخضار وذرة",
  ],
  "Rocca Salad": ["Salade de roquette", "Ensalada de rúcula", "Rucola-Salat", "Салат с рукколой", "سلطة جرجير"],
  "Rocca salad with Parmesan and special sauce": [
    "Roquette, parmesan et sauce maison",
    "Rúcula con parmesano y salsa especial",
    "Rucola mit Parmesan und Spezialsoße",
    "Руккола с пармезаном и фирменным соусом",
    "جرجير بالبارميزان وصوص مخصوص",
  ],
  "Seafood Salad": ["Salade de fruits de mer", "Ensalada de marisco", "Meeresfrüchtesalat", "Салат с морепродуктами", "سلطة سي فود"],
  "Mixed seafood with vegetables": [
    "Fruits de mer et légumes",
    "Marisco variado con verduras",
    "Gemischte Meeresfrüchte mit Gemüse",
    "Ассорти морепродуктов с овощами",
    "سي فود مشكل بالخضار",
  ],
  "Extras — Shrimp 150 · Chicken 120 · Salmon 200": [
    "Suppléments — Crevettes 150 · Poulet 120 · Saumon 200",
    "Extras — Gambas 150 · Pollo 120 · Salmón 200",
    "Extras — Garnelen 150 · Hähnchen 120 · Lachs 200",
    "Добавки — Креветки 150 · Курица 120 · Лосось 200",
    "إضافات — جمبري 150 · فراخ 120 · سلمون 200",
  ],

  // Soups
  "Chicken Cream Soup": ["Velouté de poulet", "Crema de pollo", "Hühnercremesuppe", "Куриный крем-суп", "شوربة كريمة فراخ"],
  "Lentil Soup": ["Soupe de lentilles", "Sopa de lentejas", "Linsensuppe", "Чечевичный суп", "شوربة عدس"],
  "Mushroom Cream Soup": [
    "Velouté de champignons",
    "Crema de champiñones",
    "Pilzcremesuppe",
    "Грибной крем-суп",
    "شوربة كريمة مشروم",
  ],
  "Seafood Soup": ["Soupe de fruits de mer", "Sopa de marisco", "Meeresfrüchtesuppe", "Суп из морепродуктов", "شوربة سي فود"],
  "Tomato Soup": ["Soupe de tomates", "Sopa de tomate", "Tomatensuppe", "Томатный суп", "شوربة طماطم"],

  // Main courses
  "Beef Tenderloin": ["Filet de bœuf", "Solomillo de ternera", "Rinderfilet", "Говяжья вырезка", "فيليه لحمة"],
  "Angus fillet with your choice of sauce": [
    "Filet d'Angus, sauce au choix",
    "Filete Angus con salsa a elegir",
    "Angus-Filet mit Soße nach Wahl",
    "Филе ангус с соусом на выбор",
    "فيليه أنجوس مع صوص من اختيارك",
  ],
  Ribeye: ["Entrecôte (ribeye)", "Entrecot (ribeye)", "Ribeye-Steak", "Рибай", "ريب آي"],
  "Selected beef cooked to your preference": [
    "Bœuf sélectionné, cuisson au choix",
    "Ternera seleccionada al punto que prefieras",
    "Ausgewähltes Rind, nach Wunsch gegart",
    "Отборная говядина нужной прожарки",
    "لحمة مختارة بالسوى اللي تحبه",
  ],
  "Lamb Chops": ["Côtelettes d'agneau", "Chuletas de cordero", "Lammkoteletts", "Бараньи отбивные", "ريش ضاني"],
  "Grilled lamb chops with coriander rice": [
    "Côtelettes d'agneau grillées, riz à la coriandre",
    "Chuletas de cordero a la parrilla con arroz al cilantro",
    "Gegrillte Lammkoteletts mit Koriander-Reis",
    "Бараньи отбивные гриль с рисом с кинзой",
    "ريش ضاني مشوية مع رز بالكزبرة",
  ],
  "Chicken Diablo": ["Poulet Diablo", "Pollo Diablo", "Hähnchen Diablo", "Курица «Диабло»", "فراخ ديابلو"],
  "Chicken breast with mushrooms cheese sauce": [
    "Blanc de poulet, sauce champignons et fromage",
    "Pechuga de pollo con salsa de champiñones y queso",
    "Hähnchenbrust mit Pilz-Käse-Soße",
    "Куриная грудка с грибным сырным соусом",
    "صدور فراخ بصوص المشروم والجبنة",
  ],
  "Grilled Chicken": ["Poulet grillé", "Pollo a la parrilla", "Gegrilltes Hähnchen", "Курица гриль", "فراخ مشوية"],
  "Grilled marinated chicken breast with sauce": [
    "Blanc de poulet mariné et grillé, avec sauce",
    "Pechuga de pollo marinada a la parrilla con salsa",
    "Gegrillte marinierte Hähnchenbrust mit Soße",
    "Маринованная куриная грудка гриль с соусом",
    "صدور فراخ متتبلة مشوية بالصوص",
  ],
  "Grilled Salmon": ["Saumon grillé", "Salmón a la parrilla", "Gegrillter Lachs", "Лосось гриль", "سلمون مشوي"],
  "Grilled salmon with herbs": [
    "Saumon grillé aux herbes",
    "Salmón a la parrilla con hierbas",
    "Gegrillter Lachs mit Kräutern",
    "Лосось гриль с травами",
    "سلمون مشوي بالأعشاب",
  ],
  "Grilled Jumbo Prawns": [
    "Gambas géantes grillées",
    "Langostinos jumbo a la parrilla",
    "Gegrillte Riesengarnelen",
    "Королевские креветки гриль",
    "جمبري جامبو مشوي",
  ],
  "Jumbo prawns grilled with your choice of sauce": [
    "Gambas géantes grillées, sauce au choix",
    "Langostinos jumbo a la parrilla con salsa a elegir",
    "Gegrillte Riesengarnelen mit Soße nach Wahl",
    "Королевские креветки гриль с соусом на выбор",
    "جمبري جامبو مشوي مع صوص من اختيارك",
  ],
  "Mixed Seafood": ["Assiette de fruits de mer", "Mariscada", "Meeresfrüchteplatte", "Ассорти морепродуктов", "سي فود مشكل"],
  "Shrimp, calamari, fish, salmon, mussels": [
    "Crevettes, calamars, poisson, saumon, moules",
    "Gambas, calamares, pescado, salmón, mejillones",
    "Garnelen, Calamari, Fisch, Lachs, Muscheln",
    "Креветки, кальмары, рыба, лосось, мидии",
    "جمبري وكاليماري وسمك وسلمون وبلح بحر",
  ],
  "Served with your choice of two: Rice / Sautéed vegetables / Grilled vegetables / Mashed potatoes / Potato wedges": [
    "Servi avec deux accompagnements au choix : riz / légumes sautés / légumes grillés / purée / potatoes",
    "Servido con dos guarniciones a elegir: arroz / verduras salteadas / verduras a la parrilla / puré de patatas / patatas gajo",
    "Mit zwei Beilagen nach Wahl: Reis / sautiertes Gemüse / gegrilltes Gemüse / Kartoffelpüree / Kartoffelspalten",
    "Подаётся с двумя гарнирами на выбор: рис / тушёные овощи / овощи гриль / картофельное пюре / картофельные дольки",
    "بيتقدم مع اختيارين: رز / خضار سوتيه / خضار مشوي / بطاطس بيوريه / بطاطس ودجز",
  ],

  // Charcoal grill
  "Half Grilled Chicken": ["Demi-poulet grillé", "Medio pollo a la parrilla", "Halbes Grillhähnchen", "Половина курицы гриль", "نص فرخة مشوية"],
  "Half marinated grilled chicken with garlic sauce": [
    "Demi-poulet mariné et grillé, sauce à l'ail",
    "Medio pollo marinado a la parrilla con salsa de ajo",
    "Halbes mariniertes Grillhähnchen mit Knoblauchsoße",
    "Половина маринованной курицы гриль с чесночным соусом",
    "نص فرخة متتبلة مشوية بالتومية",
  ],
  "Kofta 450g": ["Kofta 450 g", "Kofta 450 g", "Kofta 450 g", "Кофта 450 г", "كفتة 450 جم"],
  "Beef kofta grilled on charcoal": [
    "Kofta de bœuf grillée au charbon",
    "Kofta de ternera a la brasa",
    "Rinder-Kofta vom Holzkohlegrill",
    "Говяжья кофта на углях",
    "كفتة لحمة على الفحم",
  ],
  "Kebab 350g": ["Kebab 350 g", "Kebab 350 g", "Kebab 350 g", "Кебаб 350 г", "كباب 350 جم"],
  "Beef kebab on charcoal": [
    "Kebab de bœuf au charbon",
    "Kebab de ternera a la brasa",
    "Rinderkebab vom Holzkohlegrill",
    "Говяжий кебаб на углях",
    "كباب لحمة على الفحم",
  ],
  "Mixed Grill": ["Grillades mixtes", "Parrillada mixta", "Gemischte Grillplatte", "Ассорти гриль", "مشويات مشكلة"],
  "Beef, kofta, shish tawook and hawawshi": [
    "Bœuf, kofta, shish taouk et hawawshi",
    "Ternera, kofta, shish tawook y hawawshi",
    "Rind, Kofta, Shish Tawook und Hawawshi",
    "Говядина, кофта, шиш-таук и хававши",
    "لحمة وكفتة وشيش طاووق وحواوشي",
  ],
  Hawawshi: ["Hawawshi", "Hawawshi", "Hawawshi", "Хававши", "حواوشي"],
  "Grilled bread stuffed with seasoned minced meat": [
    "Pain grillé farci à la viande hachée épicée",
    "Pan a la parrilla relleno de carne picada especiada",
    "Gegrilltes Brot gefüllt mit gewürztem Hackfleisch",
    "Лепёшка гриль с пряным фаршем",
    "عيش مشوي محشي لحمة مفرومة متبلة",
  ],
  "Shish Tawook": ["Shish taouk", "Shish tawook", "Shish Tawook", "Шиш-таук", "شيش طاووق"],
  "Chicken marinated with lemon and garlic, served on skewers with garlic sauce": [
    "Poulet mariné au citron et à l'ail, en brochettes, sauce à l'ail",
    "Pollo marinado con limón y ajo, en brochetas con salsa de ajo",
    "Hähnchen in Zitrone und Knoblauch mariniert, am Spieß mit Knoblauchsoße",
    "Курица в маринаде из лимона и чеснока, на шпажках, с чесночным соусом",
    "فراخ متتبلة بالليمون والتوم على أسياخ مع التومية",
  ],
  "All grilled dishes served with: Mixed rice · Tahini · Garlic sauce · Grilled vegetables": [
    "Toutes les grillades sont servies avec : riz · tahini · sauce à l'ail · légumes grillés",
    "Todas las carnes a la parrilla se sirven con: arroz · tahini · salsa de ajo · verduras a la parrilla",
    "Alle Grillgerichte mit: Reis · Tahini · Knoblauchsoße · gegrilltem Gemüse",
    "Все блюда гриль подаются с: рисом · тахини · чесночным соусом · овощами гриль",
    "كل المشويات بتتقدم مع: رز · طحينة · تومية · خضار مشوي",
  ],

  // Side dishes
  "White Rice": ["Riz blanc", "Arroz blanco", "Weißer Reis", "Белый рис", "رز أبيض"],
  "Vermicelli Rice": ["Riz aux vermicelles", "Arroz con fideos", "Reis mit Fadennudeln", "Рис с вермишелью", "رز بالشعرية"],
  "Sautéed or Grilled Vegetables": [
    "Légumes sautés ou grillés",
    "Verduras salteadas o a la parrilla",
    "Sautiertes oder gegrilltes Gemüse",
    "Овощи тушёные или гриль",
    "خضار سوتيه أو مشوي",
  ],
  "French Fries or Wedges": [
    "Frites ou potatoes",
    "Patatas fritas o gajo",
    "Pommes frites oder Kartoffelspalten",
    "Картофель фри или дольки",
    "بطاطس محمرة أو ودجز",
  ],
  "Mashed Potatoes": ["Purée de pommes de terre", "Puré de patatas", "Kartoffelpüree", "Картофельное пюре", "بطاطس بيوريه"],

  // Pasta
  "Penne Alfredo": ["Penne Alfredo", "Penne Alfredo", "Penne Alfredo", "Пенне Альфредо", "بيني ألفريدو"],
  "Penne with chicken, mushrooms and parmesan": [
    "Penne au poulet, champignons et parmesan",
    "Penne con pollo, champiñones y parmesano",
    "Penne mit Hähnchen, Pilzen und Parmesan",
    "Пенне с курицей, грибами и пармезаном",
    "مكرونة بيني بالفراخ والمشروم والبارميزان",
  ],
  "Penne Arrabbiata": ["Penne all'arrabbiata", "Penne arrabbiata", "Penne Arrabbiata", "Пенне арраббьята", "بيني أرابياتا"],
  "Penne with tomato sauce, chili peppers and olives": [
    "Penne sauce tomate, piment et olives",
    "Penne con salsa de tomate, guindilla y aceitunas",
    "Penne mit Tomatensoße, Chili und Oliven",
    "Пенне в томатном соусе с перцем чили и оливками",
    "بيني بصوص الطماطم والشطة والزيتون",
  ],
  "Spaghetti Bolognese": ["Spaghetti bolognaise", "Espaguetis a la boloñesa", "Spaghetti Bolognese", "Спагетти болоньезе", "سباجيتي بولونيز"],
  "Spaghetti with beef and tomato concasse": [
    "Spaghetti au bœuf et concassé de tomates",
    "Espaguetis con ternera y tomate triturado",
    "Spaghetti mit Rindfleisch und Tomatenconcassé",
    "Спагетти с говядиной и томатами",
    "سباجيتي باللحمة والطماطم",
  ],
  "Seafood Pasta": ["Pâtes aux fruits de mer", "Pasta con marisco", "Pasta mit Meeresfrüchten", "Паста с морепродуктами", "مكرونة سي فود"],
  "With shrimp, calamari, mussels and salmon": [
    "Crevettes, calamars, moules et saumon",
    "Con gambas, calamares, mejillones y salmón",
    "Mit Garnelen, Calamari, Muscheln und Lachs",
    "С креветками, кальмарами, мидиями и лососем",
    "بالجمبري والكاليماري وبلح البحر والسلمون",
  ],
  "Fettuccine Carbonara": ["Fettuccine carbonara", "Fettuccine carbonara", "Fettuccine Carbonara", "Феттучине карбонара", "فيتوتشيني كاربونارا"],
  "With smoked turkey, smoked beef and cream": [
    "Dinde fumée, bœuf fumé et crème",
    "Con pavo ahumado, ternera ahumada y nata",
    "Mit geräucherter Pute, Räucherrind und Sahne",
    "С копчёной индейкой, копчёной говядиной и сливками",
    "بالتركي المدخن واللحمة المدخنة والكريمة",
  ],

  // Pizza
  "Margherita Pizza": ["Pizza Margherita", "Pizza Margarita", "Pizza Margherita", "Пицца Маргарита", "بيتزا مارجريتا"],
  "Mozzarella cheese with tomato sauce": [
    "Mozzarella et sauce tomate",
    "Mozzarella con salsa de tomate",
    "Mozzarella mit Tomatensoße",
    "Моцарелла с томатным соусом",
    "جبنة موتزاريلا بصوص الطماطم",
  ],
  "Quattro Formaggi Pizza": [
    "Pizza quatre fromages",
    "Pizza cuatro quesos",
    "Pizza Quattro Formaggi",
    "Пицца «Четыре сыра»",
    "بيتزا كواترو فورماجي",
  ],
  "A variety of Italian cheese with sauce": [
    "Assortiment de fromages italiens et sauce",
    "Variedad de quesos italianos con salsa",
    "Verschiedene italienische Käse mit Soße",
    "Ассорти итальянских сыров с соусом",
    "تشكيلة جبن إيطالي بالصوص",
  ],
  "Quattro Stagioni Pizza": [
    "Pizza quatre saisons",
    "Pizza cuatro estaciones",
    "Pizza Quattro Stagioni",
    "Пицца «Четыре сезона»",
    "بيتزا كواترو ستاجيوني",
  ],
  "Smoked turkey / smoked beef sausage with vegetables": [
    "Dinde fumée / saucisse de bœuf fumée et légumes",
    "Pavo ahumado / salchicha de ternera ahumada con verduras",
    "Geräucherte Pute / Räucherrindwurst mit Gemüse",
    "Копчёная индейка / копчёная говяжья колбаса с овощами",
    "تركي مدخن / سجق لحمة مدخن بالخضار",
  ],
  "Vegetable Pizza": ["Pizza aux légumes", "Pizza vegetal", "Gemüsepizza", "Овощная пицца", "بيتزا خضار"],
  "Fresh vegetables with pizza sauce and mozzarella": [
    "Légumes frais, sauce pizza et mozzarella",
    "Verduras frescas con salsa de pizza y mozzarella",
    "Frisches Gemüse mit Pizzasoße und Mozzarella",
    "Свежие овощи с соусом для пиццы и моцареллой",
    "خضار فريش بصوص البيتزا والموتزاريلا",
  ],
  "Seafood Pizza": ["Pizza aux fruits de mer", "Pizza de marisco", "Meeresfrüchtepizza", "Пицца с морепродуктами", "بيتزا سي فود"],
  "Seafood with pizza sauce and mozzarella cheese": [
    "Fruits de mer, sauce pizza et mozzarella",
    "Marisco con salsa de pizza y mozzarella",
    "Meeresfrüchte mit Pizzasoße und Mozzarella",
    "Морепродукты с соусом для пиццы и моцареллой",
    "سي فود بصوص البيتزا وجبنة موتزاريلا",
  ],
  "BBQ Chicken Pizza": [
    "Pizza poulet barbecue",
    "Pizza de pollo barbacoa",
    "BBQ-Hähnchen-Pizza",
    "Пицца с курицей барбекю",
    "بيتزا فراخ باربكيو",
  ],
  "Chicken with vegetables and BBQ sauce": [
    "Poulet, légumes et sauce barbecue",
    "Pollo con verduras y salsa barbacoa",
    "Hähnchen mit Gemüse und BBQ-Soße",
    "Курица с овощами и соусом барбекю",
    "فراخ بالخضار وصوص الباربكيو",
  ],

  // Desserts, waffles & pancakes
  Cheesecake: ["Cheesecake", "Tarta de queso", "Käsekuchen", "Чизкейк", "تشيز كيك"],
  "Chocolate Cake": ["Gâteau au chocolat", "Tarta de chocolate", "Schokoladenkuchen", "Шоколадный торт", "كيكة شوكولاتة"],
  "Molten Cake": ["Fondant au chocolat", "Volcán de chocolate", "Schokoladen-Lavakuchen", "Шоколадный фондан", "مولتن كيك"],
  "Fruit Salad": ["Salade de fruits", "Macedonia de frutas", "Obstsalat", "Фруктовый салат", "سلطة فواكه"],
  "Mixed Fruit Plate": ["Assiette de fruits", "Plato de frutas variadas", "Gemischter Obstteller", "Фруктовая тарелка", "طبق فواكه مشكلة"],
  "Nutella and Fruit": ["Nutella et fruits", "Nutella y fruta", "Nutella und Obst", "Нутелла и фрукты", "نوتيلا وفواكه"],
  "Nutella and Nuts": ["Nutella et fruits secs", "Nutella y frutos secos", "Nutella und Nüsse", "Нутелла и орехи", "نوتيلا ومكسرات"],
  "Caramel and Fruit": ["Caramel et fruits", "Caramelo y fruta", "Karamell und Obst", "Карамель и фрукты", "كراميل وفواكه"],
  "Caramel and Nuts": ["Caramel et fruits secs", "Caramelo y frutos secos", "Karamell und Nüsse", "Карамель и орехи", "كراميل ومكسرات"],
  "Mini Pancakes": ["Mini pancakes", "Mini tortitas", "Mini-Pancakes", "Мини-панкейки", "ميني بان كيك"],
};
