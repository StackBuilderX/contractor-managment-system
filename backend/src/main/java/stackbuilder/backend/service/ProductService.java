package stackbuilder.backend.service;


import org.springframework.stereotype.Service;
import stackbuilder.backend.entity.Product;
import stackbuilder.backend.entity.Supplier;
import stackbuilder.backend.repository.ProductRepository;
import stackbuilder.backend.repository.SupplierRepository;

import java.util.List;


@Service
public class ProductService {

    private ProductRepository productRepository;
    private SupplierRepository supplierRepository;

    public  ProductService (ProductRepository productRepository, SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public  List<Product> getAllProductsBySupplierId(Long id) {
        Supplier supplier = supplierRepository.findByUser_id(id).orElseThrow(() -> new RuntimeException("Supplier Not Found"));

        return productRepository.findAllBySupplierId(supplier.getId());
    }



}
