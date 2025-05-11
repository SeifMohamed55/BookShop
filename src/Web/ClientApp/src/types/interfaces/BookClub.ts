import { Category } from "./Category";
import { Review } from "./Review";

export interface BookClub {
  author?: string;
  id?: number;
  name?: string;
  description?: string;
  imagePath?: string;
  mostPopularBook?: PopularBook | undefined;
  numberOfMembers?: number;
}

interface PopularBook {
  id?: number;
  title?: string;
  author?: string;
  imagePath?: string;
  totalPages?: number;
  averageRating?: number;
  description?: string;
  bookFilePath?: string;
  reviews?: Review[];
  categories?: Category[];
}
