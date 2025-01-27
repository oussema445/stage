export class Image {
    id!: number;
    name!: string;
    type!: string;
    image!: string;  // Assuming you store image URLs or file paths as strings
    productId!: number;  // Reference to the product this image belongs to
  }