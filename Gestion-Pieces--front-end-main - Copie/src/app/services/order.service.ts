import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderAddress, ProductOrder } from '../models/ProductOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8081/api/orders'; // URL de base du backend

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any, userId: number): Observable<any> {
    const url = `${this.baseUrl}/save?userId=${userId}`;
    return this.http.post(url, orderData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getOrdersByUser(userId: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.baseUrl}/user/${userId}`);
  }
  updateOrderStatus(id: number, status: string): Observable<ProductOrder> {
    const params = new HttpParams()
      .set('id', id)
      .set('status', status);

    return this.http.put<ProductOrder>(`${this.baseUrl}/updateStatus`, null, { params });
  }
  getAllOrders(): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.baseUrl}/all`);
  }
  getOrdersByAddressId(addressId: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.baseUrl}/byAddress`, {
      params: { addressId: addressId.toString() },
    });
  }

  // Méthode pour récupérer les détails d'une adresse
  getOrderAddressById(id: number): Observable<OrderAddress> {
    return this.http.get<OrderAddress>(`${this.baseUrl}/address/${id}`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/${orderId}`);
  }
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/${orderId}`);
  }
  groupOrdersByOrderId(orders: ProductOrder[]): ProductOrder[][] {
    const grouped: { [key: string]: ProductOrder[] } = orders.reduce((acc, order) => {
      const orderId = order.orderId; // orderId est une chaîne
      if (!acc[orderId]) {
        acc[orderId] = []; // Initialise un tableau si la clé n'existe pas encore
      }
      acc[orderId].push(order); // Ajoute l'ordre au tableau correspondant à l'orderId
      return acc;
    }, {} as { [key: string]: ProductOrder[] }); // Type explicite pour acc
  
    return Object.values(grouped); // Retourne les valeurs groupées sous forme de tableau
  }
}
