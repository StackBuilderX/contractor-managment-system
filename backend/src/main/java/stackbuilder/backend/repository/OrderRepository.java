package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
