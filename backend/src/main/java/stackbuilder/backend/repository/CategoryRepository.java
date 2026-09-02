package stackbuilder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stackbuilder.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {



}
