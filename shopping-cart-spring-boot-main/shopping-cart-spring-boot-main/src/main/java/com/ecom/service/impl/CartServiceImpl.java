package com.ecom.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.ecom.model.Cart;
import com.ecom.model.Product;
import com.ecom.model.UserDtls;
import com.ecom.repository.CartRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	public static class CartNotFoundException extends RuntimeException {
        public CartNotFoundException(String message) {
            super(message);
        }
    }
	
	@Override
	public Cart saveCart(Long productId, Integer userId, Integer quantity) {

	    // Récupérer l'utilisateur et le produit avec gestion des erreurs si non trouvé
	    UserDtls userDtls = userRepository.findById(userId)
	            .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
	    
	    Product product = productRepository.findById(productId)
	            .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

	    // Vérifier si le panier existe déjà pour cet utilisateur et produit
	    Cart cartStatus = cartRepository.findByProductIdAndUserId(productId, userId);

	    Cart cart = null;

	    // Si le panier n'existe pas, en créer un nouveau
	    if (cartStatus == null) {
	        cart = new Cart();
	        cart.setProduct(product);
	        cart.setUser(userDtls);
	        cart.setQuantity(quantity); // Utiliser la quantité envoyée par le frontend ou Postman
	        cart.setTotalPrice(quantity * product.getDiscountPrice()); // Calculer le prix total avec la quantité
	    } else {
	        // Si le panier existe, augmenter la quantité et recalculer le prix total
	        cart = cartStatus;
	        cart.setQuantity(cart.getQuantity() + quantity); // Ajouter la quantité à celle existante
	        cart.setTotalPrice(cart.getQuantity() * product.getDiscountPrice()); // Recalculer le prix total
	    }

	    // Sauvegarder ou mettre à jour le panier
	    Cart saveCart = cartRepository.save(cart);

	    return saveCart;
	}



	@Override
	public List<Cart> getCartsByUser(Integer userId) {
		List<Cart> carts = cartRepository.findByUserId(userId);

		Double totalOrderPrice = 0.0;
		List<Cart> updateCarts = new ArrayList<>();
		for (Cart c : carts) {
			Double totalPrice = (c.getProduct().getDiscountPrice() * c.getQuantity());
			c.setTotalPrice(totalPrice);
			totalOrderPrice = totalOrderPrice + totalPrice;
			c.setTotalOrderPrice(totalOrderPrice);
			updateCarts.add(c);
		}

		return updateCarts;
	}

	@Override
	public Integer getCountCart(Integer userId) {
		Integer countByUserId = cartRepository.countByUserId(userId);
		return countByUserId;
	}

	public void updateQuantity(String sy, Integer cid) {
	    // Vérifier si le panier existe
	    Optional<Cart> optionalCart = cartRepository.findById(cid);
	    if (!optionalCart.isPresent()) {
	        throw new CartNotFoundException("Cart not found with id: " + cid);
	    }
	    
	    Cart cart = optionalCart.get();
	    int updateQuantity;

	    // Décrémentation de la quantité
	    if (sy.equalsIgnoreCase("de")) {
	        updateQuantity = cart.getQuantity() - 1;

	        // Vérifier si la quantité est inférieure ou égale à 0
	        if (updateQuantity <= 0) {
	            cartRepository.delete(cart);
	        } else {
	            cart.setQuantity(updateQuantity);
	            cartRepository.save(cart);
	        }

	    } else {  // Incrémentation de la quantité
	        updateQuantity = cart.getQuantity() + 1;
	        cart.setQuantity(updateQuantity);
	        cartRepository.save(cart);
	    }
	}


}
