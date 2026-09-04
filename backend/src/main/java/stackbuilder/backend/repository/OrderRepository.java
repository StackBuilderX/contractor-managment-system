package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByContractor_Id(Long contractorId);
    Long countBySupplierId(Long supplierId);
    List<Order> findBySupplierId(Long supplierId);

}
