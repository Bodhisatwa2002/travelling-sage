export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "adventure",
    name: "Adventure",
    description:
      "Rafting, road trips, and adrenaline-fueled journeys through India's wildest landscapes.",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
  },
  {
    slug: "heritage",
    name: "Heritage",
    description:
      "Ancient cities, Mughal monuments, and living traditions that tell the story of India's past.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
  },
  {
    slug: "culture",
    name: "Culture",
    description:
      "Art, festivals, food, and the people who make each Indian destination unique.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
  },
  {
    slug: "trekking",
    name: "Trekking",
    description:
      "Himalayan trails, high-altitude pilgrimages, and mountain adventures for every level.",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
  },
  {
    slug: "food",
    name: "Food",
    description:
      "Street food trails, regional cuisines, and the flavors that define each destination.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    slug: "spiritual",
    name: "Spiritual",
    description:
      "Ashrams, temples, ghats, and sacred journeys across India's spiritual heartland.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
  },
  {
    slug: "guides",
    name: "Guides",
    description:
      "Practical travel tips, itineraries, packing lists, and everything you need to plan your trip.",
    image:
      "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=600&q=80",
  },
];
