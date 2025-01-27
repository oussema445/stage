import { Category } from "./category.model";
import { Image } from "./image.model";

export class Product {
  id!: number;
  title!: string;
  description!: string;
  ref!:String;
  category!: Category;
  price!: number;
  stock!: number;
  images: Image[] = []; // This should be an array to hold multiple image URLs or Base64 strings
  discount!: number;
  discountPrice!: number;
  isActive!: boolean;
  isArchived!: boolean;
  archivedAt!: string | null;
  quantity!: number;

}
