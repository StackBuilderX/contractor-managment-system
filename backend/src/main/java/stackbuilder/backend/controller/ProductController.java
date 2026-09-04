package stackbuilder.backend.controller;


import org.springframework.web.bind.annotation.*;
import stackbuilder.backend.entity.Product;
import stackbuilder.backend.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {return productService.createProduct(product);}

    @GetMapping
    public List<Product> getAllProducts(Product product) {return productService.getAllProducts();}
}
