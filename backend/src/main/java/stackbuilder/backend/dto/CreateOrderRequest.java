package stackbuilder.backend.dto;

import java.util.List;

public class CreateOrderRequest {

    private Long contractorId;

    private Long supplierId;

    private List<OrderItemRequest> items;


//    ----- Getters && Setters -------

    public Long getContractorId() {
        return contractorId;
    }

    public void setContractorId(Long contractorId) {
        this.contractorId = contractorId;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}
