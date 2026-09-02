package stackbuilder.backend.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.ContractorResponse;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.repository.ContractorRepository;

import java.util.List;

@Service
public class ContractorService {

    private final ContractorRepository contractorRepository;

    public  ContractorService(ContractorRepository contractorRepository) {
        this.contractorRepository = contractorRepository;
    }

    public List<ContractorResponse> getAllContractors() {
        return contractorRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().map(contractor -> {
            User user = contractor.getUser();

            ContractorResponse response = new ContractorResponse();

            response.setId(contractor.getId());
            response.setUserId(user.getId());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setPhone(user.getPhone());
            response.setEmail(user.getEmail());
            response.setStatus(contractor.getStatus());
            response.setCompanyName(contractor.getCompanyName());
            response.setCity(contractor.getCity());
            response.setAddress(contractor.getAddress());
            response.setSpecialization(contractor.getSpecialization());

            return response;

        }).toList();
    }
}
