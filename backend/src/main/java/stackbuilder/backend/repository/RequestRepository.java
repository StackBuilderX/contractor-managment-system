package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Request;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByContractorId(Long contractorId);
    List<Request> findByProjectId(Long projectId);

}
