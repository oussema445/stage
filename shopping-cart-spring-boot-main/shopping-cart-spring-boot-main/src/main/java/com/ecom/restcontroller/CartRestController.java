package com.ecom.restcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.model.Cart;
import com.ecom.service.CartService;
import com.ecom.service.impl.CartServiceImpl.CartNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    private CartService cartService;

    // Endpoint to save a cart
    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveCart(
            @RequestParam Integer userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) { // Ajoutez la quantité dans les paramètres

        cartService.saveCart(productId, userId, quantity); // Passez la quantité à la méthode de service

        // Créer une réponse JSON
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cart item saved successfully.");
        
        // Retourner une réponse JSON
        return ResponseEntity.ok(response);
    }


    // Endpoint to get all carts by user
    @GetMapping("/user/{userId}")
    public List<Cart> getCartsByUser(@PathVariable Integer userId) {
        return cartService.getCartsByUser(userId);
    }

    // Endpoint to get cart count by user
    @GetMapping("/count/{userId}")
    public Integer getCountCart(@PathVariable Integer userId) {
        return cartService.getCountCart(userId);
    }

    @PutMapping("/updateQuantity")
    public ResponseEntity<String> updateQuantity(
            @RequestParam String sy, @RequestParam Integer cid) {

        try {
            cartService.updateQuantity(sy, cid);
            return ResponseEntity.ok("Cart updated successfully.");
        } catch (CartNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }
}
