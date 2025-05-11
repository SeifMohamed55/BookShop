import { UserData } from "./UserData";

export interface Review {
  id?: number;
  user?: UserData;
  comment?: string;
  likes?: number;
  rating?: number;
  lastModified?: Date;
}
