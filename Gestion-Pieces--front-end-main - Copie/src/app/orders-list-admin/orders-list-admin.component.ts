import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductOrder } from '../models/ProductOrder.model';

@Component({
  selector: 'app-order-list-admin',
  templateUrl: './orders-list-admin.component.html',
  styleUrls: ['./orders-list-admin.component.css'],
})
export class OrderListAdminComponent implements OnInit {
  orders: ProductOrder[] = [];
  statuses = [
    { key: 'IN_PROGRESS', label: 'En cours' },
    { key: 'ORDER_RECEIVED', label: 'Commande reçue' },
    { key: 'PRODUCT_PACKED', label: 'Produit emballé' },
    { key: 'OUT_FOR_DELIVERY', label: 'En cours de livraison' },
    { key: 'DELIVERED', label: 'Livré' },
    { key: 'CANCEL', label: 'Annulé' },
    { key: 'SUCCESS', label: 'Succès' },
  ];
  selectedOrder: any | null = null;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadAllOrders();
  }

  // Charger toutes les commandes
  loadAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    );
  }

  // Mettre à jour le statut d'une commande
  updateStatus(id: number, status: string): void {
    this.orderService.updateOrderStatus(id, status).subscribe(
      (updatedOrder) => {
        console.log('Statut mis à jour :', updatedOrder);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut :', error);
      }
    );
  }

  // Annuler une commande
  cancelOrder(orderId: number): void {
    const status = 'CANCEL';

    this.orderService.updateOrderStatus(orderId, status).subscribe(
      (updatedOrder) => {
        console.log('Commande annulée avec succès :', updatedOrder);
        this.loadAllOrders(); // Recharge les commandes après modification
      },
      (error) => {
        console.error('Erreur lors de l\'annulation de la commande :', error);
      }
    );
  }

  viewOrderDetails(order: ProductOrder): void {
    this.orderService.getOrderAddressById(order.id).subscribe((address) => {
      this.selectedOrder = {
        address: `${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state}, ${address.pincode}`,
        products: [
          {
            productTitle: order.productTitle,
            quantity: order.quantity,
            price: order.price,
          },
        ],
        totalPrice: order.totalPrice,
      };
    });
  }
}
