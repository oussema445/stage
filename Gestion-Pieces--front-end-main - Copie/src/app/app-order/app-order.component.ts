import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service'; // Service pour gérer le panier
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './app-order.component.html',
  styleUrls: ['./app-order.component.css']
})
export class AppOrderComponent implements OnInit {
  orderForm: FormGroup;
  items: any[] = []; // Liste des articles dans le panier
  deliveryFee = 7; // Frais de livraison fixes
  tax = 3; // Taxe fixe
  totalPrice = 0; // Prix total des articles

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private userService: UserService, // Injecter le service du panier
    private router :Router,
  ) {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      paymentType: ['Cash on Delivery', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupérer les articles du panier depuis le localStorage ou via un service
    this.items = this.cartService.getItems(); // Si tu utilises un service de panier
    this.updateTotalPrice(); // Calculer le prix total initial
  }

  // Méthode pour calculer le prix total des articles dans le panier
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Méthode pour calculer le prix total final (articles + livraison + taxes)
  getTotalOrderPrice(): number {
    return this.getTotalPrice() + this.deliveryFee + this.tax;
  }

  // Met à jour le prix total en fonction des articles dans le panier
  updateTotalPrice(): void {
    this.totalPrice = this.getTotalOrderPrice(); // Mettre à jour le prix total
  }
  onSubmit() {
    const user = this.userService.getUser();
    const userId = user?.id;
  
    if (!userId) {
      alert('Utilisateur non trouvé. Veuillez vous connecter.');
      return;
    }
  
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;

      this.orderService.placeOrder(orderData, userId).subscribe(
        (response) => {
          console.log('Commande soumise avec succès :', response);
          alert('Votre commande a été passée avec succès !');
          this.clearCart();
          this.router.navigate(['/orders']);

        },
        (error) => {
          console.error('Erreur lors de la soumission de la commande :', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
  clearCart(): void {
    this.cartService.clearCart(); // Supprimer tout le panier du localStorage via le service
    this.items = []; // Réinitialiser la liste des produits dans le composant
    this.updateTotalPrice(); // Réinitialiser le prix total
  }
  
  
}
