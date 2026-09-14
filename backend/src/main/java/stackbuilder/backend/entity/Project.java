package stackbuilder.backend.entity;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String type;

    @ManyToOne
    @JoinColumn(name = "contractor_id", nullable = false)
    private Contractor contractor;

    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(precision = 15, scale = 2)
    private BigDecimal budget;

    @Column(precision = 15, scale = 2)
    private BigDecimal spent;

    @Column(nullable = false)
    private Integer progress = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Integer totalTasks = 0 ;

    @Column(nullable = false)
    private Integer completedTasks;

    @ElementCollection
    @CollectionTable(name = "project_materials", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "material")
    private List<Request> materials = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();

        if (status == null) {
            status = ProjectStatus.PLANNING;
        }
        if (progress == null) {  progress = 0;  }

        if (spent == null) { spent = BigDecimal.ZERO ;}

        if (totalTasks == null) { totalTasks =0; }

        if (completedTasks == null) { completedTasks = 0 ;}

        if (materials == null) {
            materials = new ArrayList<>();
        }
    }

//    ---- Constructors --------
    public  Project() {}
    public Project(String name, String description, Contractor contractor, String location, ProjectStatus status, LocalDate startDate, LocalDate endDate, BigDecimal budget, Integer progress, BigDecimal spent, String type, Integer totalTasks, Integer completedTasks, List<Request> materials) {

        this.name = name;
        this.description = description;
        this.contractor = contractor;
        this.location = location;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.progress = progress;
        this.materials = materials;
        this.spent = spent;
        this.type = type;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;


    }




//    ----- Getters && Setters ------


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Contractor getContractor() {
        return contractor;
    }

    public void setContractor(Contractor contractor) {
        this.contractor = contractor;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Request> getMaterials() {
        return materials;
    }

    public void setMaterials(List<Request> materials) {
        this.materials = materials;
    }
}
