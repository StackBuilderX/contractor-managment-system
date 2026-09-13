package stackbuilder.backend.dto;


import stackbuilder.backend.entity.ProjectStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class ProjectDTO {

    private Long id;
    private String name;
    private String description;
    private Long contractorId;

    private String type;
    private String location;
    private ProjectStatus status;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal budget;
    private BigDecimal spent;

    private Integer progress;
    private Integer totalTasks;
    private Integer completedTasks;

    private List<String> materials;

    private LocalDateTime createdAt;

    public ProjectDTO() {
    }

    public ProjectDTO(
            Long id,
            String name,
            String description,
            Long contractorId,
            String type,
            String location,
            ProjectStatus status,
            LocalDate startDate,
            LocalDate endDate,
            BigDecimal budget,
            BigDecimal spent,
            Integer progress,
            Integer totalTasks,
            Integer completedTasks,
            List<String> materials,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.contractorId = contractorId;
        this.type = type;
        this.location = location;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.spent = spent;
        this.progress = progress;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.materials = materials;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getContractorId() {
        return contractorId;
    }

    public void setContractorId(Long contractorId) {
        this.contractorId = contractorId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getSpent() {
        return spent;
    }

    public void setSpent(BigDecimal spent) {
        this.spent = spent;
    }

    public Integer getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Integer totalTasks) {
        this.totalTasks = totalTasks;
    }

    public Integer getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Integer completedTasks) {
        this.completedTasks = completedTasks;
    }

    public List<String> getMaterials() {
        return materials;
    }

    public void setMaterials(List<String> materials) {
        this.materials = materials;
    }
}

