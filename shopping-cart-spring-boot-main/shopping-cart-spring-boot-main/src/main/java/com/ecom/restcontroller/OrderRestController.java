package com.ecom.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.model.OrderAddress;
import com.ecom.model.OrderRequest;
import com.ecom.model.ProductOrder;
import com.ecom.service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/api/orders")
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    // Endpoint to save an order
    @PostMapping("/save")
    public ResponseEntity<Object> saveOrder(@RequestParam Integer userId, @RequestBody OrderRequest orderRequest) {
        try {
            orderService.saveOrder(userId, orderRequest);
            return ResponseEntity.ok(new ResponseMessage("Order successfully placed"));
        } catch (Exception e) {
            // Renvoyer un message d'erreur détaillé
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("Error processing order: " + e.getMessage()));
        }
    }


    // Endpoint to get orders by user
    @GetMapping("/user/{userId}")
    public List<ProductOrder> getOrdersByUser(@PathVariable Integer userId) {
        return orderService.getOrdersByUser(userId);
    }

    // Endpoint to update order status
    @PutMapping("/updateStatus")
    public ProductOrder updateOrderStatus(@RequestParam Integer id, @RequestParam String status) {
        return orderService.updateOrderStatus(id, status);
    }

    // Endpoint to get all orders
    @GetMapping("/all")
    public List<ProductOrder> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<ProductOrder>> getOrdersByOrderId(@PathVariable String orderId) {
        List<ProductOrder> orders = orderService.getOrdersByOrderId(orderId);
        return ResponseEntity.ok(orders);
    }

    // Endpoint to get paginated orders
    @GetMapping("/pagination")
    public Page<ProductOrder> getAllOrdersPagination(@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
        return orderService.getAllOrdersPagination(pageNo, pageSize);
    }
    
    public class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
    @GetMapping("/byAddress")
    public List<ProductOrder> getOrdersByOrderAddressId(@RequestParam Integer addressId) {
        return orderService.getOrdersByOrderAddressId(addressId);
    }
    
    @GetMapping("/address/{id}")
    public OrderAddress getOrderDetailsById(@PathVariable Integer id) {
        return orderService.getOrderDetailsById(id);
    }

}
