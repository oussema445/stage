export interface ProductOrder {
    id: number;
    orderId: string;        // L'ID de la commande
    orderDate: string;      // La date de la commande (au format string ou date)
    productTitle: string;   // Le titre du produit
    quantity: number;       // La quantité commandée
    price: number;          // Le prix unitaire du produit
    totalPrice: number;     // Le prix total (quantité * prix)
    status: string;         // Le statut de la commande
    paymentType: string;    // Le type de paiement (par exemple, "Cash on Delivery")
  }

  export interface OrderAddress {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }
  
  