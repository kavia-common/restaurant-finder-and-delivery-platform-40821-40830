/**
 * Mock images
 * - Keep existing (unsplash.com) placeholder imagery for all cuisines by default.
 * - For Italian, Chinese, and Indian restaurants only, use stable stock placeholders via
 *   https://unsplash.it/seed/<seed>/<w>/<h> so list cards and details hero remain consistent.
 */

const placeholderImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1200&q=60"
];

function pickImage(seed) {
  return placeholderImages[seed % placeholderImages.length];
}

function makeSeed(id, name) {
  // Stable, URL-safe seed based on restaurant id + name (no randomness).
  return encodeURIComponent(`${id}-${name}`.toLowerCase().replace(/\s+/g, "-"));
}

function seededStockImage({ id, name, width, height }) {
  const seed = makeSeed(id, name);
  return `https://unsplash.it/seed/${seed}/${width}/${height}`;
}

function hasAnyCuisine(cuisines, targets) {
  const set = new Set(cuisines || []);
  return targets.some((t) => set.has(t));
}

export const restaurants = [
  {
    id: "r-101",
    name: "Blue Harbor Sushi",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    price: "$$",
    deliveryTimeMins: 30,
    deliveryFee: 2.99,
    imageUrl: pickImage(1),
    distanceKm: 2.1
  },
  {
    id: "r-102",
    name: "Amber Spice Kitchen",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.5,
    price: "$$",
    deliveryTimeMins: 40,
    deliveryFee: 1.49,
    imageUrl: seededStockImage({ id: "r-102", name: "Amber Spice Kitchen", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-102", name: "Amber Spice Kitchen", width: 1200, height: 600 }),
    distanceKm: 3.8
  },
  {
    id: "r-103",
    name: "Coastal Bowl Co.",
    cuisine: ["Healthy", "Bowls"],
    rating: 4.3,
    price: "$",
    deliveryTimeMins: 25,
    deliveryFee: 0.99,
    imageUrl: pickImage(3),
    distanceKm: 1.4
  },
  {
    id: "r-104",
    name: "City Brick Pizza",
    cuisine: ["Italian", "Pizza"],
    rating: 4.6,
    price: "$$",
    deliveryTimeMins: 35,
    deliveryFee: 2.49,
    imageUrl: seededStockImage({ id: "r-104", name: "City Brick Pizza", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-104", name: "City Brick Pizza", width: 1200, height: 600 }),
    distanceKm: 4.2
  },

  // --- Added: more high-demand cuisines (Italian, Chinese, Indian) ---
  // Note: Keep all other cuisines unchanged.

  // Italian (non-pizza focused)
  {
    id: "r-105",
    name: "Trattoria Sol Mare",
    cuisine: ["Italian"],
    rating: 4.4,
    price: "$$",
    deliveryTimeMins: 32,
    deliveryFee: 2.29,
    imageUrl: seededStockImage({ id: "r-105", name: "Trattoria Sol Mare", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-105", name: "Trattoria Sol Mare", width: 1200, height: 600 }),
    distanceKm: 2.9
  },
  {
    id: "r-106",
    name: "Pasta & Basil House",
    cuisine: ["Italian"],
    rating: 4.2,
    price: "$$",
    deliveryTimeMins: 28,
    deliveryFee: 1.99,
    imageUrl: seededStockImage({ id: "r-106", name: "Pasta & Basil House", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-106", name: "Pasta & Basil House", width: 1200, height: 600 }),
    distanceKm: 1.8
  },

  // Chinese
  {
    id: "r-107",
    name: "Red Lantern Wok",
    cuisine: ["Chinese"],
    rating: 4.5,
    price: "$$",
    deliveryTimeMins: 30,
    deliveryFee: 2.49,
    imageUrl: seededStockImage({ id: "r-107", name: "Red Lantern Wok", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-107", name: "Red Lantern Wok", width: 1200, height: 600 }),
    distanceKm: 3.2
  },
  {
    id: "r-108",
    name: "Golden Panda Express Kitchen",
    cuisine: ["Chinese"],
    rating: 4.1,
    price: "$",
    deliveryTimeMins: 24,
    deliveryFee: 1.29,
    imageUrl: seededStockImage({ id: "r-108", name: "Golden Panda Express Kitchen", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-108", name: "Golden Panda Express Kitchen", width: 1200, height: 600 }),
    distanceKm: 2.0
  },

  // Indian (non-vegetarian focused)
  {
    id: "r-109",
    name: "Tandoor & Curry Co.",
    cuisine: ["Indian"],
    rating: 4.6,
    price: "$$",
    deliveryTimeMins: 38,
    deliveryFee: 2.19,
    imageUrl: seededStockImage({ id: "r-109", name: "Tandoor & Curry Co.", width: 640, height: 420 }),
    heroImageUrl: seededStockImage({ id: "r-109", name: "Tandoor & Curry Co.", width: 1200, height: 600 }),
    distanceKm: 4.0
  }
];

export const menusByRestaurantId = {
  "r-101": {
    sections: [
      {
        id: "s-101-1",
        title: "Signature Rolls",
        items: [
          { id: "m-101-1", name: "Harbor Dragon Roll", description: "Shrimp tempura, avocado, spicy mayo.", price: 13.5 },
          { id: "m-101-2", name: "Bluefin Crunch Roll", description: "Tuna, cucumber, tempura flakes.", price: 12.0 }
        ]
      },
      {
        id: "s-101-2",
        title: "Bowls",
        items: [
          { id: "m-101-3", name: "Salmon Poke Bowl", description: "Salmon, edamame, seaweed, rice.", price: 14.25 },
          { id: "m-101-4", name: "Tofu Teriyaki Bowl", description: "Teriyaki tofu, broccoli, jasmine rice.", price: 11.75 }
        ]
      }
    ]
  },
  "r-102": {
    sections: [
      {
        id: "s-102-1",
        title: "Curries",
        items: [
          { id: "m-102-1", name: "Paneer Tikka Masala", description: "Creamy tomato curry, basmati rice.", price: 12.5 },
          { id: "m-102-2", name: "Chana Masala", description: "Chickpeas, spices, coriander.", price: 10.75 }
        ]
      },
      {
        id: "s-102-2",
        title: "Sides",
        items: [
          { id: "m-102-3", name: "Garlic Naan", description: "Toasted naan brushed with garlic butter.", price: 3.25 },
          { id: "m-102-4", name: "Mango Lassi", description: "Yogurt smoothie with mango.", price: 4.5 }
        ]
      }
    ]
  },
  "r-103": {
    sections: [
      {
        id: "s-103-1",
        title: "Build Your Bowl",
        items: [
          { id: "m-103-1", name: "Terra Green Bowl", description: "Kale, quinoa, roasted sweet potato.", price: 11.25 },
          { id: "m-103-2", name: "Protein Power Bowl", description: "Chicken, brown rice, greens.", price: 12.95 }
        ]
      }
    ]
  },
  "r-104": {
    sections: [
      {
        id: "s-104-1",
        title: "Pizzas",
        items: [
          { id: "m-104-1", name: "Margherita", description: "Tomato, mozzarella, basil.", price: 12.0 },
          { id: "m-104-2", name: "Pepperoni Classic", description: "Pepperoni, mozzarella, oregano.", price: 13.25 }
        ]
      },
      {
        id: "s-104-2",
        title: "Salads",
        items: [{ id: "m-104-3", name: "Caesar Salad", description: "Romaine, parmesan, croutons.", price: 8.5 }]
      }
    ]
  },

  // --- Added menus for new high-demand cuisine restaurants ---

  "r-105": {
    sections: [
      {
        id: "s-105-1",
        title: "House Pastas",
        items: [
          { id: "m-105-1", name: "Spaghetti Carbonara", description: "Pancetta, egg, pecorino, black pepper.", price: 14.75 },
          { id: "m-105-2", name: "Penne Arrabbiata", description: "Spicy tomato sauce, garlic, basil.", price: 12.5 }
        ]
      },
      {
        id: "s-105-2",
        title: "Classics",
        items: [
          { id: "m-105-3", name: "Chicken Parmigiana", description: "Crispy chicken, marinara, mozzarella.", price: 16.25 },
          { id: "m-105-4", name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone.", price: 6.75 }
        ]
      }
    ]
  },

  "r-106": {
    sections: [
      {
        id: "s-106-1",
        title: "Fresh Pasta",
        items: [
          { id: "m-106-1", name: "Fettuccine Alfredo", description: "Cream sauce, parmesan, cracked pepper.", price: 13.95 },
          { id: "m-106-2", name: "Pesto Gnocchi", description: "Basil pesto, potato gnocchi, pine nuts.", price: 14.25 }
        ]
      },
      {
        id: "s-106-2",
        title: "Starters",
        items: [
          { id: "m-106-3", name: "Bruschetta Trio", description: "Tomato basil, olive tapenade, ricotta.", price: 8.25 },
          { id: "m-106-4", name: "Italian Soda", description: "Sparkling citrus soda (mock).", price: 3.5 }
        ]
      }
    ]
  },

  "r-107": {
    sections: [
      {
        id: "s-107-1",
        title: "Wok Favorites",
        items: [
          { id: "m-107-1", name: "Kung Pao Chicken", description: "Peanuts, scallions, chili, soy glaze.", price: 13.25 },
          { id: "m-107-2", name: "Beef & Broccoli", description: "Tender beef, broccoli, savory sauce.", price: 14.0 }
        ]
      },
      {
        id: "s-107-2",
        title: "Noodles & Rice",
        items: [
          { id: "m-107-3", name: "Vegetable Chow Mein", description: "Stir-fried noodles, cabbage, carrots.", price: 11.75 },
          { id: "m-107-4", name: "Egg Fried Rice", description: "Fluffy rice, egg, peas, scallion.", price: 9.5 }
        ]
      }
    ]
  },

  "r-108": {
    sections: [
      {
        id: "s-108-1",
        title: "Quick Plates",
        items: [
          { id: "m-108-1", name: "Orange Chicken", description: "Crispy chicken, citrus glaze.", price: 10.99 },
          { id: "m-108-2", name: "Mapo Tofu (Mild)", description: "Silken tofu, savory bean sauce (mild).", price: 9.99 }
        ]
      },
      {
        id: "s-108-2",
        title: "Sides",
        items: [
          { id: "m-108-3", name: "Spring Rolls", description: "Two crispy veg spring rolls.", price: 3.99 },
          { id: "m-108-4", name: "Jasmine Rice", description: "Steamed jasmine rice.", price: 2.5 }
        ]
      }
    ]
  },

  "r-109": {
    sections: [
      {
        id: "s-109-1",
        title: "Tandoor",
        items: [
          { id: "m-109-1", name: "Chicken Tikka", description: "Charred chicken, yogurt spices.", price: 14.5 },
          { id: "m-109-2", name: "Seekh Kebab", description: "Spiced minced kebab, mint chutney.", price: 13.25 }
        ]
      },
      {
        id: "s-109-2",
        title: "Curries & Rice",
        items: [
          { id: "m-109-3", name: "Butter Chicken", description: "Creamy tomato curry, basmati.", price: 15.25 },
          { id: "m-109-4", name: "Jeera Rice", description: "Cumin basmati rice.", price: 4.25 }
        ]
      }
    ]
  }
};

// PUBLIC_INTERFACE
export function getRestaurantById(restaurantId) {
  /** Find restaurant by id from mock data. */
  return restaurants.find((r) => r.id === restaurantId) || null;
}

// PUBLIC_INTERFACE
export function getMenuForRestaurant(restaurantId) {
  /** Get mock menu for restaurant. */
  return menusByRestaurantId[restaurantId] || { sections: [] };
}
