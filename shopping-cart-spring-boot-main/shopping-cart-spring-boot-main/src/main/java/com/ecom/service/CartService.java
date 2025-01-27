package com.ecom.service;

import java.util.List;

import com.ecom.model.Cart;

public interface CartService {

	public Cart saveCart(Long productId, Integer userId, Integer quantity);

	public List<Cart> getCartsByUser(Integer userId);
	
	public Integer getCountCart(Integer userId);

	public void updateQuantity(String sy, Integer cid);

}
