import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  uploadedImage!: File;
  imagePath: any;
  categories!: Category[];
  selectedCategory!: Category; // Déclarez selectedCategory
  newProduct = new Product();

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router,private userService:UserService) { }
currentUser: any;
  ngOnInit(): void {
    this.categoryService.getAllActiveCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });

    
    

      // Vous devez récupérer l'utilisateur actuel depuis votre service d'authentification
      this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel
  
  }
    isAdmin(): boolean {
      return this.currentUser && this.currentUser.role === 'ADMIN';
    }
  

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }

  saveProduct() {
    this.newProduct.category = this.selectedCategory; // Assurez-vous que selectedCategory est bien une instance de Category
    this.productService.saveProduct(this.newProduct).subscribe(
      response => {
        console.log('Product saved successfully', response);
        this.router.navigate(['/product-list']); // Redirige après la sauvegarde
      },
      error => {
        console.error('Error saving product', error);
      }
    );
  }
  calculateDiscountPrice(): void {
    if (this.newProduct.price && this.newProduct.discount) {
      const discountAmount = (this.newProduct.price * this.newProduct.discount) / 100;
      this.newProduct.discountPrice = this.newProduct.price - discountAmount;
    } else {
      this.newProduct.discountPrice = this.newProduct.price; // Si pas de remise, le prix reste le même
    }
  }
  

}

