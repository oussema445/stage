import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ImageService } from '../services/image.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  productId!: number;
  productImages: string[] = []; // Array to store the images
user: any;
activeSection: string = '';

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const productId = +id;
      this.loadProduct(productId);
    } else {
      console.error('Product ID is null');
    }
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.loadProductImages(product.images); // Load the associated images
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  loadProductImages(images: any[]): void {
    images.forEach(image => {
      // Assuming you are storing image URLs or Base64 strings in the image model
      this.productImages.push(image);  // Add the image URLs or Base64 strings to the array
    });
  }

  message: string = '';
  isMessageVisible: boolean = false; // Indicateur de visibilité du message

  addToCart(product: Product): void {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.message = this.user
      ? 'Produit ajouté au panier! Vous pouvez consulter votre panier.'
      : 'Produit ajouté au panier! Vous pouvez consulter votre panier.';
    this.showMessage(); // Afficher le message
  }

  showMessage(): void {
    this.isMessageVisible = true;
    setTimeout(() => {
      this.isMessageVisible = false;
      window.location.reload();

       // Masquer le message après 3 secondes
    }, 1500);
  }
  showDetails: boolean = true; // Variable pour afficher la section Détails

  // Fonction pour gérer l'affichage des sections
  showSection(section: string): void {
    
    this.showDetails = section === 'details';
  }
  toggleSection(section: string) {
    if (this.activeSection === section) {
      this.activeSection = ''; // If the section is already active, hide it
    } else {
      this.activeSection = section; // Activate the clicked section
    }
  }
  
}
