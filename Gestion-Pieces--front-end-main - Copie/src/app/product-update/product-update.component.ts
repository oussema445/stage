import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ImageService } from '../services/image.service';
import { Product } from '../models/product.model';
import { Image } from '../models/image.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  currentProduct = new Product();
  categories!: Category[];
  currentCategoryId: number | null = null;  // Correctly initialize as 'number | null'
  uploadedImage!: File;
  myImage!: string;
  isImageUpdated: boolean = false;
  currentUser: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    // Récupérer toutes les catégories
    this.categoryService.getAllActiveCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
      this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel
    });
  
    this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel


    // Récupérer le produit à mettre à jour
    this.productService.getProductById(this.activatedRoute.snapshot.params['id']).subscribe(product => {
      this.currentProduct = product;

      // Initialiser la catégorie du produit
      if (this.currentProduct.category) {
        this.currentCategoryId = this.currentProduct.category.id!;
      } else {
        this.currentCategoryId = null;  // Si le produit n'a pas de catégorie
      }
    });
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  updateProduct(): void {
    if (this.currentCategoryId !== null) {
      // Set the category for the product
      this.currentProduct.category = this.categories.find(cat => cat.id === this.currentCategoryId)!;
  
      // Call updateProduct with both the product id and product data
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe(() => {
        if (this.isImageUpdated) {
          this.onAddImage();
        } else {
          this.router.navigate(['product-list']);
        }
      });
    } else {
      alert('Veuillez sélectionner une catégorie pour le produit.');
    }
  }
  

  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImage(): void {
    this.imageService.uploadImageForProduct(this.currentProduct.id, this.uploadedImage).subscribe((img: Image) => {
      this.currentProduct.images.push(img);
      this.isImageUpdated = false; // Reset the flag after upload
      this.router.navigate(['product-list']);
    });
  }

  deleteImage(image: any) {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette image ?');
    if (confirmDelete) {
      this.imageService.deleteImage(image.id).subscribe(response => {
        const index = this.currentProduct.images.indexOf(image);
        if (index > -1) {
          this.currentProduct.images.splice(index, 1);
        }
        alert('Image supprimée avec succès');
      }, error => {
        console.error('Erreur lors de la suppression de l\'image:', error);
      });
    }
  }
  
  
}
