package stackbuilder.backend.dto;

import stackbuilder.backend.entity.RequestPriority;

import java.time.LocalDate;
import java.util.List;

public class RequestDTO {

    private Long supplierId;
    private Long projectId;

    private String title;
    private RequestPriority priority;
    private LocalDate expectedDelivery;

    private List<RequestItemDTO> items;


//   ---------- Getters && Setters ----------------

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public RequestPriority getPriority() {
        return priority;
    }

    public void setPriority(RequestPriority priority) {
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getExpectedDelivery() {
        return expectedDelivery;
    }

    public void setExpectedDelivery(LocalDate expectedDelivery) {
        this.expectedDelivery = expectedDelivery;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<RequestItemDTO> getItems() {
        return items;
    }

    public void setItems(List<RequestItemDTO> items) {
        this.items = items;
    }
}
