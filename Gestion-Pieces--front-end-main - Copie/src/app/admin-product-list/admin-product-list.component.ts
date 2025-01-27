import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = []; // List of products
  searchTerm: string = ''; // Search term variable
  isLoading: boolean = true; // Loading indicator
  categories: any[] = [];  // Liste des catégories

  constructor(private productService: ProductService, private categoryService:CategoryService, private router: Router,private userService:UserService) {}
  onUpdateProduct(productId: number): void {
    // Naviguer vers la page de mise à jour avec l'ID du produit
    this.router.navigate(['/product-update/', productId]);
  }
 
  currentUser: any;
  ngOnInit(): void {
    this.loadProducts();
    this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  // Load products
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.isLoading = false; // Hide loader after products are loaded
      },
      (error) => {
        console.error('Error loading products', error);
        this.isLoading = false; // Hide loader in case of error
      }
    );
  }

  // Search method
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.loadProducts(); // Reload all products if search term is empty
    } else {
      this.productService.searchProduct(this.searchTerm).subscribe(
        (response: Product[]) => {
          this.products = response; 
        },
        (error) => {
          console.error('Error searching for products', error);
        }
      );
    }
  }

  // View product details
  onViewProduct(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }

  // Get the full URL of the product image
  getProductImageUrl(imageName: string): string {
    return `http://localhost:8081/static/img/product_img/${imageName}`; // Update based on your image storage path
  }
  deleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe(
        (success) => {
          if (success) {
            // Supprimer le produit du tableau local si la suppression est réussie
            this.products = this.products.filter((product) => product.id !== id);
            this.loadProducts();
          } else {
            alert('Erreur lors de la suppression du produit.');
          }
        },
        (error) => {
          console.error('Erreur de communication avec le serveur', error);
          alert('Erreur lors de la suppression du produit.');
        }
      );
    }
  }
}
