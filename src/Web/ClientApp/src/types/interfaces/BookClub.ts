export interface BookClub {
  name?: string;
  description?: string;
  imagePath?: string;
  books?: PopularBook[];
  numberOfMembers?: number;
}

interface PopularBook {
  id?: number;
  title?: string;
  author?: string;
  imagePath?: string;
  totalPages?: number;
  averageRating?: number;
}
