export interface BookClub {
  id: number;
  name: string;
  members: number;
  currentlyReading: {
    title: string;
    author: string;
    description: string;
    coverImage: string;
  };
  coverImage: string;
  category: string;
}

// Mock data for book clubs
export const mockBookClubs: BookClub[] = [
  {
    id: 1,
    name: "Contemporary Fiction Club",
    members: 156,
    currentlyReading: {
      title: "The Midnight Library",
      author: "Matt Haig",
      description:
        "We read and discuss the latest contemporary fiction novels.",
      coverImage:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Fiction",
  },
  {
    id: 2,
    name: "Sci-Fi Explorers",
    members: 203,
    currentlyReading: {
      title: "Project Hail Mary",
      author: "Andy Weir",
      description:
        "For lovers of science fiction in all its forms - from classics to modern masterpieces.",
      coverImage:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Non-Fiction",
  },
  {
    id: 3,
    name: "Mystery Readers",
    members: 178,
    currentlyReading: {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      description: "We love solving mysteries together through reading.",
      coverImage:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Fiction",
  },
  {
    id: 4,
    name: "History Buffs",
    members: 124,
    currentlyReading: {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      description:
        "Exploring the past through fascinating historical accounts.",
      coverImage:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    },
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Non-Fiction",
  },
];
