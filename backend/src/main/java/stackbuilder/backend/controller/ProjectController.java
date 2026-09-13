package stackbuilder.backend.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stackbuilder.backend.dto.ProjectDTO;
import stackbuilder.backend.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/contractor/{id}")
    public List<ProjectDTO>  getProjectsByContractor(@PathVariable Long id) {
        return projectService.getProjectsByContractorId(id);
    }

    @PostMapping
    public ProjectDTO createProject(@RequestBody ProjectDTO dto) {
        return projectService.createProject(dto);
    }

}
