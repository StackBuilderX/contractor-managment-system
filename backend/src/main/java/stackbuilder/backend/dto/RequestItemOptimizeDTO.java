package stackbuilder.backend.dto;

public class RequestItemOptimizeDTO {

    private Long id;

    private Integer quantity;

    private ProductOptimizeDTO product;

    public RequestItemOptimizeDTO() {}

    public RequestItemOptimizeDTO(Long id, Integer quantity, ProductOptimizeDTO product) {
        this.id = id;
        this.quantity =quantity;
        this.product = product;
    }


//    ----- Getters && Setters ---------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

   public ProductOptimizeDTO getProduct() {
        return product;
    }

    public void setProduct(ProductOptimizeDTO product) {
        this.product = product;
    }
}
