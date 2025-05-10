import { UserData } from "./UserData";

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

interface Review {
  id?: number;
  user?: UserData;
  comment?: string;
  likes?: number;
  rating?: number;
  lastModified?: Date;
}

interface Category {
  id?: number;
  name?: string;
}
