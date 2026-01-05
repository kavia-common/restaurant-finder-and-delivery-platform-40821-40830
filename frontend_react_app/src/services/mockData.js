const placeholderImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1200&q=60"
];

function pickImage(seed) {
  return placeholderImages[seed % placeholderImages.length];
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
    imageUrl: pickImage(2),
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
    imageUrl: pickImage(0),
    distanceKm: 4.2
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
        items: [
          { id: "m-104-3", name: "Caesar Salad", description: "Romaine, parmesan, croutons.", price: 8.5 }
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
