export interface Author {
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}

export const founder: Author = {
  slug: "ananya-deshpande",
  name: "Ananya Deshpande",
  role: "Founder & Editor-in-Chief",
  bio: "The Founder and Editor-in-Chief of READZ, a passionate traveler who has explored every corner of India. She started this magazine to share stories from the road — the kind that guidebooks miss and only experience reveals.",
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
};

export const authors: Author[] = [
  {
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    slug: "rohan-kapoor",
    name: "Rohan Kapoor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    slug: "kavya-nair",
    name: "Kavya Nair",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    slug: "vikram-singh",
    name: "Vikram Singh",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    slug: "meera-iyer",
    name: "Meera Iyer",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
  },
  {
    slug: "dev-chatterjee",
    name: "Dev Chatterjee",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
];
