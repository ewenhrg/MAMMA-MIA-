/**
 * Digital day menu — sourced from Menu-Jour A3 recto/verso.
 * Prices in EGP. Tax charge +14% applies (shown on the page).
 */

export type MenuItem = {
  name: string;
  price: number;
  description?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
  note?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle?: string;
  categories: MenuCategory[];
};

export const MENU_TAX_NOTE = "Tax charge +14%";

export const menuSections: MenuSection[] = [
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Hot · Cold · Fresh",
    categories: [
      {
        id: "hot-coffee",
        title: "Hot Drinks — Coffee",
        items: [
          { name: "Turkish Coffee", price: 85 },
          { name: "French Coffee", price: 110 },
          { name: "Nutella / Hazelnut Coffee", price: 125 },
          { name: "Espresso", price: 90 },
          { name: "Espresso Double", price: 110 },
          { name: "Espresso Macchiato", price: 100 },
          { name: "Cortado", price: 100 },
          { name: "Spanish Latte", price: 130 },
          { name: "Macchiato Caramel", price: 110 },
          { name: "Cappuccino", price: 110 },
          { name: "Coffee Latte", price: 110 },
          { name: "Nescafe Black", price: 90 },
          { name: "Nescafé With Milk", price: 110 },
          { name: "Americano", price: 110 },
          { name: "Mocha Black or White", price: 135 },
        ],
      },
      {
        id: "hot-tea",
        title: "Hot Drinks — Tea",
        items: [
          { name: "Black Tea", price: 70 },
          { name: "Herbal Tea", price: 70 },
          { name: "Fruit Tea", price: 90 },
          { name: "Tea Pot", price: 200 },
        ],
      },
      {
        id: "hot-mix",
        title: "Hot Drinks — Mix",
        items: [
          { name: "Hot Cider", price: 110 },
          { name: "Sahlab Nuts, Fruits or Flavor", price: 110 },
          { name: "Hot Chocolate", price: 120 },
        ],
      },
      {
        id: "cold-coffee",
        title: "Cold Drinks — Coffee",
        items: [
          { name: "Iced Coffee", price: 130 },
          { name: "Iced Mocca", price: 150 },
          { name: "Iced Frappe", price: 165 },
          { name: "Iced Americano", price: 130 },
          { name: "Iced Chocolate", price: 130 },
        ],
      },
      {
        id: "soft-drinks",
        title: "Soft Drinks",
        items: [
          { name: "Small Water", price: 40 },
          { name: "Large Water", price: 60 },
          { name: "Sparkling Water", price: 170 },
          { name: "Ice tea", price: 100 },
          { name: "Cola / Fanta / Pepsi / Sprite", price: 100 },
          { name: "Schweppes", price: 100 },
          { name: "Tonic", price: 100 },
          { name: "Soda", price: 100 },
          { name: "Birell", price: 100 },
          { name: "Red Bull", price: 200 },
        ],
      },
      {
        id: "fresh-juices",
        title: "Fresh Juices",
        items: [
          { name: "Mango", price: 150 },
          { name: "Strawberry", price: 130 },
          { name: "Guava", price: 120 },
          { name: "Orange", price: 130 },
          { name: "Watermelon", price: 130 },
          { name: "Cantaloup", price: 130 },
          { name: "Pineapple", price: 140 },
          { name: "Peach", price: 130 },
          { name: "Lemon", price: 120 },
          { name: "Lemon Mint", price: 130 },
          { name: "Avocado", price: 200 },
          { name: "Apple", price: 130 },
        ],
      },
      {
        id: "smoothies",
        title: "Smoothies",
        items: [
          { name: "Mango", price: 160 },
          { name: "Strawberry", price: 140 },
          { name: "Guava", price: 130 },
          { name: "Watermelon", price: 140 },
          { name: "Peach", price: 140 },
          { name: "Lemon", price: 130 },
          { name: "Lemon Mint", price: 140 },
          { name: "Pineapple", price: 150 },
          { name: "Blueberry", price: 140 },
          { name: "Kiwi", price: 160 },
          { name: "Pina Colada", price: 140 },
          { name: "Mango Kiwi", price: 160 },
          { name: "Passion Fruit", price: 150 },
        ],
      },
      {
        id: "milkshakes",
        title: "Milkshakes",
        items: [
          { name: "Mango", price: 200 },
          { name: "Strawberry", price: 200 },
          { name: "Vanilla", price: 200 },
          { name: "Caramel", price: 200 },
          { name: "Chocolate", price: 200 },
          { name: "Nutella", price: 250 },
          { name: "Lotus", price: 250 },
          { name: "Pistaccio", price: 250 },
          { name: "Blueberry", price: 200 },
          { name: "Passion Fruit", price: 250 },
          { name: "Oreo", price: 250 },
        ],
      },
      {
        id: "fresh-cocktails",
        title: "Fresh Cocktails",
        items: [
          {
            name: "Florida",
            price: 150,
            description: "Strawberry · Mango · Guava",
          },
          {
            name: "Vitamin C",
            price: 150,
            description: "Orange · Kiwi · Lemon",
          },
          {
            name: "Hawaii",
            price: 150,
            description: "Pineapple · Kiwi · Peach",
          },
          {
            name: "Kiango",
            price: 150,
            description: "Kiwi · Mango · Banana",
          },
          {
            name: "Montana",
            price: 150,
            description: "Strawberry · Mango · Banana",
          },
          {
            name: "Rose",
            price: 150,
            description: "Strawberry · Mango · Ice Cream",
          },
          {
            name: "Mama Mia",
            price: 250,
            description: "Avocado · Kiwi · Banana · Milk · Honey · Nuts",
          },
        ],
      },
      {
        id: "mojitos",
        title: "Mojitos",
        items: [
          { name: "Classic", price: 150 },
          { name: "Strawberry", price: 200 },
          { name: "Pineapple", price: 200 },
          { name: "Watermelon", price: 200 },
          { name: "Kiwi", price: 200 },
          { name: "Passion Fruit", price: 200 },
          { name: "Cherry Cola", price: 200 },
          { name: "Blue Mountain", price: 200 },
          { name: "Sunshine", price: 200 },
          { name: "Scotch Mint", price: 200 },
          { name: "Mamma Mia", price: 250 },
        ],
      },
      {
        id: "ice-cream",
        title: "Ice Cream",
        items: [
          { name: "1 Scoop", price: 75 },
          { name: "2 Scoops", price: 150 },
          { name: "3 Scoops", price: 175 },
          {
            name: "Mamma Mia Ice Cream",
            price: 200,
            description: "Chocolate, sauce and 2 scoops",
          },
        ],
        note: "Choice: Vanilla · Chocolate · Mango · Strawberry",
      },
    ],
  },
  {
    id: "food",
    title: "Food Menu",
    subtitle: "Beach & Restaurant",
    categories: [
      {
        id: "breakfast",
        title: "Breakfast",
        subtitle: "8h – 12h",
        items: [
          {
            name: "Oriental Breakfast",
            price: 300,
            description:
              "Fava Beans · Falafel · 2 Eggs · Cheese with Tomatoes · Bread",
          },
          {
            name: "English Breakfast",
            price: 380,
            description: "Eggs · Salami · Beans · Cheese · Butter · Honey · Jam · Toast",
          },
          {
            name: "French Breakfast",
            price: 430,
            description:
              "2 Croissants · Butter · Honey · Jam · Drink (Orange Juice, Black Coffee or Hot Chocolate)",
          },
          {
            name: "Extras",
            price: 100,
            description:
              "Mixed Cheese or Tahini or Baba Ghanoush or Pickled Eggplant",
          },
        ],
      },
      {
        id: "starters",
        title: "Starters",
        items: [
          {
            name: "Cold Mezze",
            price: 150,
            description: "Tahini or Baba Ghanoush or Tabbouleh",
          },
          {
            name: "Cheese Samosa",
            price: 150,
            description: "Fried and stuffed with cheese and fresh mint",
          },
          {
            name: "Grilled Sausage",
            price: 200,
            description: "Spicy sausage slices with lemon juice",
          },
          {
            name: "Chicken Strips",
            price: 200,
            description: "Crispy chicken strips",
          },
          {
            name: "Banco Bronze",
            price: 450,
            description: "Fried shrimps with sweet chili",
          },
          {
            name: "Fried Calamari",
            price: 400,
            description: "Marinated calamari fillets fried with sweet chili",
          },
          { name: "Spicy Potatoes with Sriracha", price: 150 },
          {
            name: "Chicken Wings",
            price: 250,
            description: "Fried chicken wings with dip of your choice",
          },
          {
            name: "Prawns",
            price: 450,
            description: "Shrimp marinated with garlic, lemon and coriander",
          },
        ],
      },
      {
        id: "sandwiches",
        title: "Sandwiches",
        items: [
          {
            name: "Smoked Salmon Sandwich",
            price: 450,
            description: "Smoked salmon fillets with dressing and caper",
          },
          {
            name: "Chicken Wrap",
            price: 280,
            description: "Chicken breast, mozzarella and vegetables with hot sauce",
          },
          {
            name: "Chicken Quesadilla",
            price: 280,
            description: "Mexican-style chicken with hot sauce",
          },
          {
            name: "Classic Burger",
            price: 300,
            description: "Beef with lettuce, cheddar cheese",
          },
          {
            name: "Tuna Sandwich",
            price: 200,
            description: "Tuna with vegetables and corn",
          },
        ],
      },
      {
        id: "fajitas",
        title: "Fajitas",
        items: [
          {
            name: "Chicken Fajitas",
            price: 650,
            description: "Chicken strips with vegetables, corn",
          },
          {
            name: "Beef Fajitas",
            price: 700,
            description: "Sliced marinated Mexican beef steaks",
          },
          {
            name: "Seafood Fajitas",
            price: 850,
            description:
              "A selection of Red Sea seafood prepared in the style of Mamma Mia",
          },
        ],
      },
      {
        id: "salads",
        title: "Salads",
        items: [
          {
            name: "Fresh Salad",
            price: 150,
            description: "A selection of fresh vegetables",
          },
          {
            name: "Salmon Avocado",
            price: 400,
            description: "Smoked salmon with avocado and vegetables",
          },
          {
            name: "Greek Salad",
            price: 250,
            description: "Tomatoes, cucumbers, olives, feta, olive oil",
          },
          {
            name: "Classic Caesar Salad",
            price: 200,
            description: "Lettuce, Parmesan, dressing and bread",
          },
          {
            name: "Tuna Salad",
            price: 250,
            description: "Tuna, vegetables and sweet corn",
          },
          {
            name: "Rocca Salad",
            price: 200,
            description: "Rocca salad with Parmesan and special sauce",
          },
          {
            name: "Seafood Salad",
            price: 270,
            description: "Mixed seafood with vegetables",
          },
        ],
        note: "Extras — Shrimp 150 · Chicken 120 · Salmon 200",
      },
      {
        id: "soups",
        title: "Soups",
        items: [
          { name: "Chicken Cream Soup", price: 220 },
          { name: "Lentil Soup", price: 150 },
          { name: "Mushroom Cream Soup", price: 200 },
          { name: "Seafood Soup", price: 200 },
          { name: "Tomato Soup", price: 150 },
        ],
      },
      {
        id: "mains",
        title: "Main Courses",
        items: [
          {
            name: "Beef Tenderloin",
            price: 850,
            description: "Angus fillet with your choice of sauce",
          },
          {
            name: "Ribeye",
            price: 1700,
            description: "Selected beef cooked to your preference",
          },
          {
            name: "Lamb Chops",
            price: 850,
            description: "Grilled lamb chops with coriander rice",
          },
          {
            name: "Chicken Diablo",
            price: 750,
            description: "Chicken breast with mushrooms cheese sauce",
          },
          {
            name: "Grilled Chicken",
            price: 650,
            description: "Grilled marinated chicken breast with sauce",
          },
          {
            name: "Grilled Salmon",
            price: 950,
            description: "Grilled salmon with herbs",
          },
          {
            name: "Grilled Jumbo Prawns",
            price: 950,
            description: "Jumbo prawns grilled with your choice of sauce",
          },
          {
            name: "Mixed Seafood",
            price: 1050,
            description: "Shrimp, calamari, fish, salmon, mussels",
          },
        ],
        note:
          "Served with your choice of two: Rice / Sautéed vegetables / Grilled vegetables / Mashed potatoes / Potato wedges",
      },
      {
        id: "charcoal",
        title: "Charcoal Grill",
        items: [
          {
            name: "Half Grilled Chicken",
            price: 450,
            description: "Half marinated grilled chicken with garlic sauce",
          },
          {
            name: "Kofta 450g",
            price: 450,
            description: "Beef kofta grilled on charcoal",
          },
          {
            name: "Kebab 350g",
            price: 500,
            description: "Beef kebab on charcoal",
          },
          {
            name: "Mixed Grill",
            price: 750,
            description: "Beef, kofta, shish tawook and hawawshi",
          },
          {
            name: "Hawawshi",
            price: 300,
            description: "Grilled bread stuffed with seasoned minced meat",
          },
          {
            name: "Shish Tawook",
            price: 500,
            description:
              "Chicken marinated with lemon and garlic, served on skewers with garlic sauce",
          },
        ],
        note: "All grilled dishes served with: Mixed rice · Tahini · Garlic sauce · Grilled vegetables",
      },
      {
        id: "sides",
        title: "Side Dishes",
        items: [
          { name: "White Rice", price: 80 },
          { name: "Vermicelli Rice", price: 120 },
          { name: "Sautéed or Grilled Vegetables", price: 120 },
          { name: "French Fries or Wedges", price: 100 },
          { name: "Mashed Potatoes", price: 100 },
        ],
      },
      {
        id: "pasta",
        title: "Pasta",
        items: [
          {
            name: "Penne Alfredo",
            price: 350,
            description: "Penne with chicken, mushrooms and parmesan",
          },
          {
            name: "Penne Arrabbiata",
            price: 250,
            description: "Penne with tomato sauce, chili peppers and olives",
          },
          {
            name: "Spaghetti Bolognese",
            price: 350,
            description: "Spaghetti with beef and tomato concasse",
          },
          {
            name: "Seafood Pasta",
            price: 400,
            description: "With shrimp, calamari, mussels and salmon",
          },
          {
            name: "Fettuccine Carbonara",
            price: 350,
            description: "With smoked turkey, smoked beef and cream",
          },
        ],
      },
      {
        id: "pizza",
        title: "Pizza",
        items: [
          {
            name: "Margherita Pizza",
            price: 250,
            description: "Mozzarella cheese with tomato sauce",
          },
          {
            name: "Quattro Formaggi Pizza",
            price: 350,
            description: "A variety of Italian cheese with sauce",
          },
          {
            name: "Quattro Stagioni Pizza",
            price: 380,
            description: "Smoked turkey / smoked beef sausage with vegetables",
          },
          {
            name: "Vegetable Pizza",
            price: 300,
            description: "Fresh vegetables with pizza sauce and mozzarella",
          },
          {
            name: "Seafood Pizza",
            price: 480,
            description: "Seafood with pizza sauce and mozzarella cheese",
          },
          {
            name: "BBQ Chicken Pizza",
            price: 370,
            description: "Chicken with vegetables and BBQ sauce",
          },
        ],
      },
      {
        id: "desserts",
        title: "Desserts",
        items: [
          { name: "Cheesecake", price: 170 },
          { name: "Chocolate Cake", price: 170 },
          { name: "Molten Cake", price: 180 },
          { name: "Fruit Salad", price: 200 },
          { name: "Mixed Fruit Plate", price: 500 },
        ],
      },
      {
        id: "waffle-pancake",
        title: "Waffle & Pancakes",
        items: [
          { name: "Nutella", price: 160 },
          { name: "Nutella and Fruit", price: 185 },
          { name: "Nutella and Nuts", price: 195 },
          { name: "Caramel", price: 130 },
          { name: "Caramel and Fruit", price: 160 },
          { name: "Caramel and Nuts", price: 170 },
          { name: "Mini Pancakes", price: 180 },
        ],
      },
    ],
  },
];
