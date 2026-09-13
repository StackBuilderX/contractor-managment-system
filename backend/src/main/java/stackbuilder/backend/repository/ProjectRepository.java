package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByContractorId(Long contractorId);
}
