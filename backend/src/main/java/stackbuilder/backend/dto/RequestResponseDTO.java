package stackbuilder.backend.dto;

import stackbuilder.backend.entity.RequestPriority;
import stackbuilder.backend.entity.RequestStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class RequestResponseDTO {

    private Long id;
    private String contractor;
    private String supplier;
    private String projectName;
    private String title;
    private BigDecimal total;
    private LocalDate expectedDelivery;
    private RequestStatus status;
    private RequestPriority priority;
    private List<RequestItemResponseDTO> items;
    private LocalDateTime createdAt;

//    ----------- Getters && Setters -----------

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

    public String getSupplier() {
        return supplier;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDate getExpectedDelivery() {
        return expectedDelivery;
    }

    public void setExpectedDelivery(LocalDate expectedDelivery) {
        this.expectedDelivery = expectedDelivery;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getProjectName() {
        return projectName;
    }

    public RequestPriority getPriority() {
        return priority;
    }

    public void setPriority(RequestPriority priority) {
        this.priority = priority;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }



    public List<RequestItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<RequestItemResponseDTO> items) {
        this.items = items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
