package stackbuilder.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.RequestDTO;
import stackbuilder.backend.dto.RequestItemDTO;
import stackbuilder.backend.dto.RequestItemResponseDTO;
import stackbuilder.backend.dto.RequestResponseDTO;
import stackbuilder.backend.entity.*;
import stackbuilder.backend.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final ProjectRepository projectRepository;

    private RequestResponseDTO mapToResponseDTO(Request request) {

        RequestResponseDTO response = new RequestResponseDTO();

        response.setId(request.getId());
        response.setContractor(request.getContractor().getFirstName() + " " + request.getContractor().getLastName());
        response.setSupplier(request.getSupplier().getCompanyName());

        if(request.getProject() != null) {
            response.setProjectName(request.getProject().getName());
        }

        response.setStatus(request.getStatus());
        response.setPriority(request.getPriority());
        response.setCreatedAt(request.getCreatedAt());
        response.setTitle(request.getTitle());
        response.setTotal(request.getTotal());
        response.setExpectedDelivery(request.getExpectedDelivery());

        List<RequestItemResponseDTO> items = request.getItems().stream().map( item -> {
            RequestItemResponseDTO itemResponse = new RequestItemResponseDTO();

            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnit(item.getUnit());

            return itemResponse;
        }).toList();
        response.setItems(items);

        return response;
    }

    public RequestResponseDTO createRequest(RequestDTO dto, String contractorEmail) {

        User contractor = userRepository.findByEmail(contractorEmail).orElseThrow(() -> new RuntimeException("Contractor Not Found"));
        Supplier supplier = supplierRepository.findById(dto.getSupplierId()).orElseThrow(() -> new RuntimeException("Supplier Not Found"));
        Project project = null;//    ---------- Create Request ------------


        if(dto.getProjectId() != null ) {
            project = projectRepository.findById(dto.getProjectId()).orElseThrow(() -> new RuntimeException("Project Not Found"));
        }

        Request request = new Request();

        request.setContractor(contractor);
        request.setSupplier(supplier);
        request.setProject(project);
        request.setPriority(dto.getPriority());
        request.setTitle(dto.getTitle());
        request.setPriority(dto.getPriority());
        request.setExpectedDelivery(dto.getExpectedDelivery());
        request.setStatus(RequestStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());

//     --------- Create Request Items ---------
        BigDecimal total = BigDecimal.ZERO;
        for (RequestItemDTO itemDTO : dto.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId()).orElseThrow(() -> new RuntimeException("Product Not Found"));

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()));

            total = total.add(itemTotal);

            RequestItem item = new RequestItem();

            item.setProduct(product);
            item.setQuantity(itemDTO.getQuantity());
            item.setUnit(itemDTO.getUnit());
            item.setRequest(request);

            request.getItems().add(item);
        }

        request.setTotal(total);

//      ---------- Save Request + Items ------------
        Request savedRequest = requestRepository.save(request);

        RequestResponseDTO response = new RequestResponseDTO();

        response.setId(savedRequest.getId());
        response.setContractor(savedRequest.getContractor().getFirstName() + " " +savedRequest.getContractor().getLastName());
        response.setSupplier(savedRequest.getSupplier().getCompanyName());
        if(savedRequest.getProject() != null) {
            response.setProjectName(savedRequest.getProject().getName());
        }
        response.setStatus(savedRequest.getStatus());
        response.setPriority(savedRequest.getPriority());
        response.setCreatedAt(savedRequest.getCreatedAt());

        List<RequestItemResponseDTO> items = savedRequest.getItems().stream().map(
                item -> {
                    RequestItemResponseDTO itemResponse = new RequestItemResponseDTO();

                    itemResponse.setProductId(item.getProduct().getId());
                    itemResponse.setProductName(item.getProduct().getName());
                    itemResponse.setQuantity(item.getQuantity());
                    itemResponse.setUnit(item.getUnit());

                    return itemResponse;
                }).toList();
        response.setItems(items);
        response.setTotal(request.getTotal());
        response.setSupplier(request.getSupplier().getCompanyName());
        response.setTitle(request.getTitle());

        return response;
    }


    public List<RequestResponseDTO> getMyRequests(String contractorEmail) {
        User contractor = userRepository.findByEmail(contractorEmail).orElseThrow(() -> new RuntimeException("Contractor Not Found"));

        List<Request> requests = requestRepository.findByContractorId(contractor.getId());

        return requests.stream().map(this::mapToResponseDTO).toList();
    }
}
