package stackbuilder.backend.service;


import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.CreateOrderRequest;
import stackbuilder.backend.dto.OrderItemRequest;
import stackbuilder.backend.dto.OrderItemResponse;
import stackbuilder.backend.dto.OrderResponse;
import stackbuilder.backend.entity.*;
import stackbuilder.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final ContractorRepository contractorRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository, SupplierRepository supplierRepository, ContractorRepository contractorRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.contractorRepository = contractorRepository;
    }




    public OrderResponse mapToResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());
        response.setContractor(order.getContractor().getCompanyName());
        response.setSupplierId(order.getSupplier().getId());
        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());
        response.setTotalPrice(order.getTotalPrice());

        List<OrderItemResponse> items = order.getItems().stream().map(item -> {
            OrderItemResponse itemResponse = new OrderItemResponse();

            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setProductUnit(item.getProduct().getUnit());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());
            itemResponse.setTotalPrice(item.getTotalPrice());

            return itemResponse;
        }).toList();

        response.setItems(items);

        return response;
    }






    public OrderResponse createOrder(CreateOrderRequest request) {

        Contractor contractor = contractorRepository.findById(request.getContractorId()).orElseThrow(() -> new RuntimeException("Contractor Not Found"));

        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(() -> new RuntimeException("Supplier Not Found"));

        Order order = new Order();

        order.setContractor(contractor);
        order.setSupplier(supplier);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(BigDecimal.ZERO);

        BigDecimal orderTotal = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId()).orElseThrow(() -> new RuntimeException("Product Not Found"));

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(product.getPrice());

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            orderItem.setTotalPrice(itemTotal);

            orderTotal = orderTotal.add(itemTotal);
            order.getItems().add(orderItem);
        }

        order.setTotalPrice(orderTotal);

        Order savedOrder = orderRepository.save(order);

        return mapToResponse(savedOrder);

    }


public List<OrderResponse> getOrdersBySupplierId(Long id) {
        Long supplierId = supplierRepository.findByUser_id(id).get().getId();
        return orderRepository.findBySupplierId(supplierId).stream().map(this::mapToResponse).toList();
}

}
