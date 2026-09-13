package stackbuilder.backend.service;

import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.ProjectDTO;
import stackbuilder.backend.dto.RequestItemDTO;
import stackbuilder.backend.entity.Contractor;
import stackbuilder.backend.entity.Project;
import stackbuilder.backend.entity.Request;
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
//
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

    // Convert Entity -> DTO
    private ProjectDTO convertToDTO(Project project) {


        List<Request> requests = requestRepository.findByProjectId(project.getId());

        List<String> materials = requests.stream().flatMap(request -> request.getItems().stream()).map(item -> item.getProduct().getName()).distinct().toList();

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
}

