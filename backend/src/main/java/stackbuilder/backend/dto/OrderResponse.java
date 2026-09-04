package stackbuilder.backend.dto;

import stackbuilder.backend.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {


    private Long id;
    private String contractor;
    private Long supplierId;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private BigDecimal totalPrice;
    private List<OrderItemResponse> items;

//    private Long id;
//    private Long contractorId;
//    private Long supplierId;
//    private OrderStatus status;
//    private LocalDateTime createdAt;
//    private BigDecimal totalPrice;
//    private List<OrderItemResponse> items;



//    ------- Getters && Setters ----------


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractor() {
        return contractor;
    }

    public void setContractor(String contractor) {
        this.contractor = contractor;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}
