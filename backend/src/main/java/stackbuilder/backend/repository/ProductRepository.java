package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
