package stackbuilder.backend.dto;

import java.math.BigDecimal;

public class OrderItemResponse {

    private String productName;
    private String productUnit;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

//    private Long productId;
//    private Integer quantity;
//    private BigDecimal unitPrice;
//    private BigDecimal totalPrice;


//    ------ Getters && Setters --------------

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getProductUnit() {
        return productUnit;
    }

    public void setProductUnit(String productUnit) {
        this.productUnit = productUnit;
    }
}
