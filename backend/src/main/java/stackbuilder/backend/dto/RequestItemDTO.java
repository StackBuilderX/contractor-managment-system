package stackbuilder.backend.dto;

public class RequestItemDTO {

    private Long productId;
    private Integer quantity;
    private String unit;


    public RequestItemDTO(Long productId, Integer quantity, String unit) {
        this.productId = productId;
        this.quantity = quantity;
        this.unit = unit;
    }

//    --------- Getters && Setters ----------


    public Long getProductId() { return productId;  }

    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
