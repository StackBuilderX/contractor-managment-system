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

    public  ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }





}
