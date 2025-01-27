package com.ecom.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ecom.model.OrderAddress;
import com.ecom.model.OrderRequest;
import com.ecom.model.ProductOrder;

public interface OrderService {

	public void saveOrder(Integer userid, OrderRequest orderRequest) throws Exception;

	public List<ProductOrder> getOrdersByUser(Integer userId);

	public ProductOrder updateOrderStatus(Integer id, String status);

	public List<ProductOrder> getAllOrders();

	List<ProductOrder> getOrdersByOrderId(String orderId)	;
	public Page<ProductOrder> getAllOrdersPagination(Integer pageNo,Integer pageSize);
	public List<ProductOrder> getOrdersByOrderAddressId(Integer orderAddressId);
	 public OrderAddress getOrderDetailsById(Integer id);
}
