import { Category } from "./Category";
import { Review } from "./Review";

export interface MostPopularBook {
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



