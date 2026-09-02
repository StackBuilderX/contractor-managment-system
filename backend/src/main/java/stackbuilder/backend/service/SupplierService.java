package stackbuilder.backend.service;


import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.ContractorResponse;
import stackbuilder.backend.dto.SupplierResponse;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.repository.SupplierRepository;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public  SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
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

            return response;

        }).toList();
    }

}
