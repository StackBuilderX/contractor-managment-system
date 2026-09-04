package stackbuilder.backend.service;


import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.ContractorResponse;
import stackbuilder.backend.dto.SupplierResponse;
import stackbuilder.backend.entity.Product;
import stackbuilder.backend.entity.Supplier;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.repository.OrderRepository;
import stackbuilder.backend.repository.ProductRepository;
import stackbuilder.backend.repository.SupplierRepository;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public  SupplierService(SupplierRepository supplierRepository, ProductRepository productRepository, OrderRepository orderRepository) {

        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }



    public SupplierResponse getSupplierById(Long id) {
         Supplier supplier = supplierRepository.findByUser_id(id).orElseThrow(() -> new RuntimeException("Supplier Not Found"));

         User user = supplier.getUser();
         SupplierResponse response = new SupplierResponse();
        response.setId(supplier.getId());
        response.setUserId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setPhone(user.getPhone());
        response.setEmail(user.getEmail());
        response.setStatus(supplier.getStatus());
        response.setCompanyName(supplier.getCompanyName());
        response.setCity(supplier.getCity());
        response.setAddress(supplier.getAddress());
        response.setDescription(supplier.getDescription());
        response.setProductsCount(productRepository.countBySupplierId(supplier.getId()));
        response.setLowStockItems(productRepository.countLowStockItemsBySupplierId(supplier.getId()));
        response.setOutOfStock(productRepository.countOutOfStockBySupplierId(supplier.getId()));

        Long totalOrders = orderRepository.countBySupplierId(supplier.getId());
        response.setTotalOrders(totalOrders);


        return response;
    }







































    public List<SupplierResponse> getAllSuppliers() {
        return supplierRepository.findAll().stream().map(supplier -> {
            User user = supplier.getUser();
            SupplierResponse response = new SupplierResponse();

            response.setId(supplier.getId());
            response.setUserId(user.getId());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setPhone(user.getPhone());
            response.setEmail(user.getEmail());
            response.setStatus(supplier.getStatus());
            response.setCompanyName(supplier.getCompanyName());
            response.setCity(supplier.getCity());
            response.setAddress(supplier.getAddress());
            response.setDescription(supplier.getDescription());
            response.setProductsCount(productRepository.countBySupplierId(supplier.getId()));
            response.setLowStockItems(productRepository.countLowStockItemsBySupplierId(supplier.getId()));

            Long totalOrders = orderRepository.countBySupplierId(supplier.getId());
            response.setTotalOrders(totalOrders);


            return response;

        }).toList();
    }

}

