import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';  // Importer le service
import { ProductOrder } from '../models/ProductOrder.model';  // Importer le modèle
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './app-my-orders.component.html',
  styleUrls: ['./app-my-orders.component.css']
})
export class AppMyOrdersComponent implements OnInit {
  orders: ProductOrder[] = [];  // Liste des commandes
  groupedOrders: any[] = [];  // Commandes regroupées par `orderId`

  constructor(
    private orderService: OrderService, 
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    const userId = user?.id;

    if (userId) {
      // Appel pour obtenir toutes les commandes d'un utilisateur
      this.orderService.getOrdersByUser(userId).subscribe(
        (orders) => {
          this.orders = orders;
          // Regrouper les commandes par orderId
          this.groupedOrders = this.orderService.groupOrdersByOrderId(orders);
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes:', error);
        }
      );
    } else {
      console.error('Utilisateur non trouvé');
    }
  }
  cancelOrder(id: number): void {
    this.orderService.updateOrderStatus(id, 'Annulé').subscribe(
      (updatedOrder) => {
        // Mettre à jour le statut de la commande dans la liste
        const index = this.orders.findIndex((order) => order.id === id);
        if (index !== -1) {
          this.orders[index].status = updatedOrder.status;
        }
        alert('Commande annulée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de l\'annulation de la commande:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }

  viewOrderDetails(orderId: String): void {
    this.router.navigate(['/order-detail', orderId]);
  }
  getTotalPrice(orderGroup: any[]): number {
    return orderGroup.reduce((total, order) => total + (order.price * order.quantity), 0);
  }
  
}
