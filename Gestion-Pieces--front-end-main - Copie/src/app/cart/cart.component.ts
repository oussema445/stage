import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';  // Assurez-vous d'importer le service

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: any[] = [];  // Tableau pour stocker les données du panier
  userId!: number;  // ID de l'utilisateur connecté

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté (par exemple, depuis un service d'authentification ou un token)
    this.userId = this.getUserIdFromStorage(); // Assurez-vous d'obtenir l'ID de l'utilisateur connecté

    // Récupérer les données du panier depuis le localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartData = JSON.parse(storedCart);
      this.transferCartToBackend(); // Transférer les données au backend pour l'utilisateur connecté
    }
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté (exemple)
  getUserIdFromStorage(): number {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 0;  // Retourne 0 si l'ID n'est pas trouvé
  }

  // Méthode pour envoyer les données du panier au backend pour l'utilisateur connecté
  transferCartToBackend(): void {
    if (this.cartData.length > 0 && this.userId > 0) {
      this.cartService.transferCartDataToBackend(this.cartData, this.userId)
        .subscribe(
          (response) => {
            console.log('Cart transferred successfully:', response);
            // Optionnel : supprimer les éléments du localStorage après envoi
            localStorage.removeItem('cart');
          },
          (error) => {
            console.error('Error transferring cart:', error);
          }
        );
    } else {
      console.log('No items in the cart or no user connected');
    }
  }

}
