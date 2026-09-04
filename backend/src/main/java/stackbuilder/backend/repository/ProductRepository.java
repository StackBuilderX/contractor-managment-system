package stackbuilder.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import stackbuilder.backend.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {

    int countBySupplierId(Long supplierId);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.supplier.id = :supplierId AND p.stock <= 20")
    int countLowStockItemsBySupplierId(@Param("supplierId") Long supplierId);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.supplier.id = :supplierId AND p.stock = 0")
    int countOutOfStockBySupplierId(@Param("supplierId") Long supplierId);

}
