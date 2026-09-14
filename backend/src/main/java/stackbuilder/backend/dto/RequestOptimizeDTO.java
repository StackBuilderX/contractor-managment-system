package stackbuilder.backend.dto;

import stackbuilder.backend.entity.RequestPriority;
import stackbuilder.backend.entity.RequestStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RequestOptimizeDTO {


    private Long id;

    private RequestStatus status;

    private String title;

    private BigDecimal total;

    private LocalDate expectedDelivery;

    private RequestPriority priority;

    private String supplierCompanyName;

    private List<RequestItemOptimizeDTO> items = new ArrayList<>();


    public RequestOptimizeDTO() {}

    public RequestOptimizeDTO(Long id, String supplierCompanyName , RequestStatus status, String title, BigDecimal total, LocalDate expectedDelivery, RequestPriority priority, List<RequestItemOptimizeDTO> items) {
        this.id = id;
        this.supplierCompanyName = supplierCompanyName;
        this.status = status;
        this.title = title;
        this.total = total;
        this.expectedDelivery = expectedDelivery;
        this.priority = priority;
        this.items =items;


    }


    // --------Getters && Setters ------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
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

    public RequestPriority getPriority() {
        return priority;
    }

    public void setPriority(RequestPriority priority) {
        this.priority = priority;
    }

    public List<RequestItemOptimizeDTO> getItems() {
        return items;
    }

    public void setItems(List<RequestItemOptimizeDTO> items) {
        this.items = items;
    }



    public String getSupplierCompanyName() {
        return supplierCompanyName;
    }

    public void setSupplierCompanyName(String supplierCompanyName) {
        this.supplierCompanyName = supplierCompanyName;
    }
}





