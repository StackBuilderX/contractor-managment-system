package stackbuilder.backend.service;

import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.ProductOptimizeDTO;
import stackbuilder.backend.dto.ProjectDTO;
import stackbuilder.backend.dto.RequestItemOptimizeDTO;
import stackbuilder.backend.dto.RequestOptimizeDTO;
import stackbuilder.backend.entity.*;
import stackbuilder.backend.repository.ContractorRepository;
import stackbuilder.backend.repository.ProjectRepository;
import stackbuilder.backend.repository.RequestRepository;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ContractorRepository contractorRepository;
    private final RequestRepository requestRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            ContractorRepository contractorRepository,
            RequestRepository requestRepository
    ) {
        this.projectRepository = projectRepository;
        this.contractorRepository = contractorRepository;
        this.requestRepository = requestRepository;
    }

    // Get all projects of a contractor
    public List<ProjectDTO> getProjectsByContractorId(Long id) {

        Contractor contractor = contractorRepository.findByUser_Id(id)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));

        return projectRepository.findByContractorId(contractor.getId())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Get project by ID
    public ProjectDTO getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return convertToDTO(project);
    }

//    // Create project
    public ProjectDTO createProject(ProjectDTO dto) {

        Contractor contractor = contractorRepository.findById(dto.getContractorId())
                .orElseThrow(() -> new RuntimeException("Contractor not found"));


        Project project = new Project();


        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setContractor(contractor);
        project.setLocation(dto.getLocation());
        project.setStatus(dto.getStatus());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setBudget(dto.getBudget());
        project.setProgress(dto.getProgress());



        Project savedProject = projectRepository.save(project);

        return convertToDTO(savedProject);
    }




    // Convert Entity -> DTO
    private ProjectDTO convertToDTO(Project project) {

        List<RequestOptimizeDTO> materials = requestRepository.findByProjectId(project.getId()).stream().map(this::convertRequestToOptimizeDTO).toList();
        return new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getContractor().getId(),
                project.getType(),
                project.getLocation(),
                project.getStatus(),
                project.getStartDate(),
                project.getEndDate(),
                project.getBudget(),
                project.getSpent(),
                project.getProgress(),
                project.getTotalTasks(),
                project.getCompletedTasks(),
                materials,
                project.getCreatedAt()
        );
    }

    // Convert Request to Optimize Request
    private RequestOptimizeDTO convertRequestToOptimizeDTO(Request request) {

        List <RequestItemOptimizeDTO> items = request.getItems().stream().map(this::convertRequestItemToOptimizeDTO).toList();

        return  new RequestOptimizeDTO(
                request.getId(),
                request.getSupplier().getCompanyName(),
                request.getStatus(),
                request.getTitle(),
                request.getTotal(),
                request.getExpectedDelivery(),
                request.getPriority(),
                items
        );
    }

    //    convert RequestItem to RequestItemOptimize
    private RequestItemOptimizeDTO convertRequestItemToOptimizeDTO(RequestItem item) {

        Product product = item.getProduct();

        ProductOptimizeDTO productDto = new ProductOptimizeDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getUnit(),
                product.getImageUrl()
        );

        return new RequestItemOptimizeDTO(
                item.getId(),
                item.getQuantity(),
                productDto
        );

    }
}





//
//    // Update project
//    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
//
//        Project project = projectRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//
//        if (dto.getContractorId() != null &&
//                !dto.getContractorId().equals(project.getContractor().getId())) {
//
//            Contractor contractor = contractorRepository.findById(dto.getContractorId())
//                    .orElseThrow(() -> new RuntimeException("Contractor not found"));
//
//            project.setContractor(contractor);
//        }
//
//        project.setName(dto.getName());
//        project.setDescription(dto.getDescription());
//        project.setLocation(dto.getLocation());
//        project.setStatus(dto.getStatus());
//        project.setStartDate(dto.getStartDate());
//        project.setEndDate(dto.getEndDate());
//        project.setBudget(dto.getBudget());
//        project.setProgress(dto.getProgress());
//
//        Project updatedProject = projectRepository.save(project);
//
//        return convertToDTO(updatedProject);
//    }
//
//    // Delete project
//    public void deleteProject(Long id) {
//
//        if (!projectRepository.existsById(id)) {
//            throw new RuntimeException("Project not found");
//        }
//
//        projectRepository.deleteById(id);
//    }

