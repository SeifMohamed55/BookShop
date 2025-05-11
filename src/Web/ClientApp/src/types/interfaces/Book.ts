export interface Book {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  imagePath?: string;
  totalPages?: number;
  averageRating?: number;
  categories?: string[];
}
