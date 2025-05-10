export interface BookClub {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  books: PopularBook[];
  numberOfMembers: number;
}

export interface PopularBook {
  id: number;
  title: string;
  author: string;
  imagePath: string;
  totalPages: number;
  averageRating: number;
}

// Function to map API response to frontend model
export const mapBookClubDtoToBookClub = (dto: any): BookClub => {
  return {
    id: dto.id || 0,
    name: dto.name || '',
    description: dto.description || '',
    imagePath: dto.imagePath || '',
    books: dto.books?.map((book: any) => ({
      id: book.id || 0,
      title: book.title || '',
      author: book.author || '',
      imagePath: book.imagePath || '',
      totalPages: book.totalPages || 0,
      averageRating: book.averageRating || 0
    })) || [],
    numberOfMembers: dto.numberOfMembers || 0
  };
};

// Mock data for book clubs
export const mockBookClubs: BookClub[] = [
  {
    id: 1,
    name: "Contemporary Fiction Club",
    description: "We read and discuss the latest contemporary fiction novels.",
    imagePath: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    books: [
      {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        imagePath: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        totalPages: 304,
        averageRating: 4.5
      }
    ],
    numberOfMembers: 156
  },
  {
    id: 2,
    name: "Sci-Fi Explorers",
    description: "For lovers of science fiction in all its forms - from classics to modern masterpieces.",
    imagePath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    books: [
      {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        imagePath: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        totalPages: 496,
        averageRating: 4.8
      }
    ],
    numberOfMembers: 203
  },
  {
    id: 3,
    name: "Mystery Readers",
    description: "We love solving mysteries together through reading.",
    imagePath: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    books: [],
    numberOfMembers: 178
  },
  {
    id: 4,
    name: "History Buffs",
    description: "Exploring the past through fascinating historical accounts.",
    imagePath: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    books: [],
    numberOfMembers: 124
  },
];
