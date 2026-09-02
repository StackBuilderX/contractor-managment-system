package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Supplier;

import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findByUser_id(Long userId);
}
