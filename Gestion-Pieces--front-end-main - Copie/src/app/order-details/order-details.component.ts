import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOrder, OrderAddress } from '../models/ProductOrder.model'; // Assurez-vous du chemin d'importation
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: ProductOrder[] = [];
  orderAddress: OrderAddress | null = null;
  orderId: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
    console.log('ID de la commande:', this.orderId);  // Vérifiez l'ID récupéré
    if (this.orderId) {
      this.loadOrderDetails();
    } else {
      console.log('ID de commande invalide');
    }
  }
  
  
  loadOrderDetails(): void {
    this.orderService.getOrderDetails(this.orderId).subscribe(
      (data) => {
        console.log('Données récupérées:', data); // Vérifiez la structure de la réponse
        if (data && data.length > 0) {  // Vérifiez si la réponse contient des commandes
          this.orderDetails = data;
          this.orderAddress = data[0].orderAddress;  // Si chaque commande a une adresse
        } else {
          console.log('Aucune commande trouvée');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de commande', error);
      }
    );
  }

  getTotalPrice(): number {
    return this.orderDetails.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
  
  
}
 