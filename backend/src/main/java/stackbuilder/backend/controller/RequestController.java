package stackbuilder.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import stackbuilder.backend.dto.RequestDTO;
import stackbuilder.backend.dto.RequestResponseDTO;
import stackbuilder.backend.entity.Request;
import stackbuilder.backend.service.RequestService;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<RequestResponseDTO> createRequest(@RequestBody RequestDTO requestDTO, Authentication authentication) {

        String contractorEmail = authentication.getName();
        RequestResponseDTO response = requestService.createRequest(requestDTO, contractorEmail);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<RequestResponseDTO>> getMyRequests(Authentication authentication) {
        String contractorEmail = authentication.getName();

        List<RequestResponseDTO> requests = requestService.getMyRequests(contractorEmail);

        return ResponseEntity.ok(requests);
    }


}
