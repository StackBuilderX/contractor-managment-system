package stackbuilder.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stackbuilder.backend.dto.ContractorResponse;
import stackbuilder.backend.service.ContractorService;

import java.util.List;

@RestController
@RequestMapping("/api/contractors")
public class ContractorController {

    private final ContractorService contractorService;

    public ContractorController(ContractorService contractorService) {
        this.contractorService = contractorService;
    }

    @GetMapping
    public List<ContractorResponse> getAllContractors() {
        return contractorService.getAllContractors();
    }

}
