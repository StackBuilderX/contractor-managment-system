package stackbuilder.backend.controller;


import org.springframework.web.bind.annotation.*;
import stackbuilder.backend.dto.CreateOrderRequest;
import stackbuilder.backend.dto.OrderResponse;
import stackbuilder.backend.entity.Order;
import stackbuilder.backend.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponse createOrder(@RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request);
    }

    @GetMapping("/supplier/{id}")
    public List<OrderResponse> getOrderBySupplier(@PathVariable Long id) {

        return orderService.getOrdersBySupplierId(id);
    }




}
