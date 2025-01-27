package com.ecom.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.model.Cart;
import com.ecom.model.OrderAddress;
import com.ecom.model.OrderRequest;
import com.ecom.model.ProductOrder;
import com.ecom.repository.CartRepository;
import com.ecom.repository.ProductOrderRepository;
import com.ecom.service.OrderService;
import com.ecom.util.CommonUtil;
import com.ecom.util.OrderStatus;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private ProductOrderRepository orderRepository;
	@Autowired
    private ProductOrderRepository productOrderRepository;


	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CommonUtil commonUtil;

	@Override
	public void saveOrder(Integer userid, OrderRequest orderRequest) throws Exception {
	    List<Cart> carts = cartRepository.findByUserId(userid);
	    if (carts.isEmpty()) {
	        throw new Exception("No items in the cart for user with ID " + userid);
	    }

	    String globalOrderId = UUID.randomUUID().toString(); // Générer un ID global pour la commande
	    List<ProductOrder> savedOrders = new ArrayList<>();

	    for (Cart cart : carts) {
	        ProductOrder order = new ProductOrder();
	        order.setOrderId(globalOrderId); // Utiliser le même ID pour tous les produits
	        order.setOrderDate(LocalDate.now());
	        order.setProduct(cart.getProduct());
	        order.setPrice(cart.getProduct().getDiscountPrice());
	        order.setQuantity(cart.getQuantity());
	        order.setUser(cart.getUser());
	        order.setStatus(OrderStatus.IN_PROGRESS.getName());
	        order.setPaymentType(orderRequest.getPaymentType());

	        // Ajouter l'adresse
	        OrderAddress address = new OrderAddress();
	        address.setFirstName(orderRequest.getFirstName());
	        address.setLastName(orderRequest.getLastName());
	        address.setEmail(orderRequest.getEmail());
	        address.setMobileNo(orderRequest.getMobileNo());
	        address.setAddress(orderRequest.getAddress());
	        address.setCity(orderRequest.getCity());
	        address.setState(orderRequest.getState());
	        address.setPincode(orderRequest.getPincode());
	        order.setOrderAddress(address);

	        // Sauvegarder chaque produit
	        ProductOrder savedOrder = orderRepository.save(order);
	        savedOrders.add(savedOrder); // Ajouter à la liste des commandes sauvegardées
	    }

	    // Envoyer un email unique pour toute la commande
	    commonUtil.sendMailForProductOrder(savedOrders, "success");
	}


	@Override
	public List<ProductOrder> getOrdersByUser(Integer userId) {
		List<ProductOrder> orders = orderRepository.findByUserId(userId);
		return orders;
	}

	@Override
	public ProductOrder updateOrderStatus(Integer id, String status) {
		Optional<ProductOrder> findById = orderRepository.findById(id);
		if (findById.isPresent()) {
			ProductOrder productOrder = findById.get();
			productOrder.setStatus(status);
			ProductOrder updateOrder = orderRepository.save(productOrder);
			return updateOrder;
		}
		return null;
	}

	@Override
	public List<ProductOrder> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public Page<ProductOrder> getAllOrdersPagination(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return orderRepository.findAll(pageable);

	}

	public List<ProductOrder> getOrdersByOrderId(String orderId) {
	    return orderRepository.findByOrderId(orderId);
	}

	public OrderAddress getOrderDetailsById(Integer id) {
	    // Récupérer la liste des commandes liées à cet ID d'adresse
	    List<ProductOrder> productOrders = productOrderRepository.findByOrderAddressId(id);

	    // Vérifier si des commandes existent pour cet ID d'adresse
	    if (productOrders == null || productOrders.isEmpty()) {
	        throw new RuntimeException("Aucune commande trouvée pour l'ID d'adresse : " + id);
	    }

	    // Si des commandes existent, retourner l'adresse associée à la première commande
	    ProductOrder firstOrder = productOrders.get(0);
	    return firstOrder.getOrderAddress();
	}

	  
	  public List<ProductOrder> getOrdersByOrderAddressId(Integer orderAddressId) {
	        return productOrderRepository.findByOrderAddressId(orderAddressId);
	    }

}
