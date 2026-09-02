package stackbuilder.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stackbuilder.backend.dto.LoginRequest;
import stackbuilder.backend.dto.LoginResponse;
import stackbuilder.backend.dto.RegisterRequest;
import stackbuilder.backend.dto.RegisterResponse;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {


        return authService.login(request);
    }
}
