package stackbuilder.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import stackbuilder.backend.dto.LoginRequest;
import stackbuilder.backend.dto.LoginResponse;
import stackbuilder.backend.dto.RegisterRequest;
import stackbuilder.backend.dto.RegisterResponse;
import stackbuilder.backend.entity.*;
import stackbuilder.backend.exception.BadRequestException;
import stackbuilder.backend.exception.UnauthorizedException;
import stackbuilder.backend.repository.ContractorRepository;
import stackbuilder.backend.repository.SupplierRepository;
import stackbuilder.backend.repository.UserRepository;
import stackbuilder.backend.security.JwtService;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final ContractorRepository contractorRepository;
    private final SupplierRepository supplierRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public  AuthService(UserRepository userRepository, JwtService jwtService, ContractorRepository contractorRepository, SupplierRepository supplierRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtService = jwtService;
        this.contractorRepository = contractorRepository;
        this.supplierRepository = supplierRepository;
    }

//    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if(request.getRole() == Role.ADMIN) {
            throw new BadRequestException("You can't register as Admin");
        }
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email Already Exists");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
         userRepository.save(user);

         if(user.getRole() == Role.CONTRACTOR) {
             Contractor contractor = new Contractor();
             contractor.setUser(user);

             contractor.setStatus(ContractorStatus.ACTIVE);
             contractorRepository.save(contractor);
         } else if (user.getRole() == Role.SUPPLIER) {
             Supplier supplier = new Supplier();
             supplier.setUser(user);

             supplier.setStatus(SupplierStatus.ACTIVE);
             supplierRepository.save(supplier);
         }

        String token = jwtService.generateToken(user);
        return new RegisterResponse(token, user.getRole().name(), user.getFirstName(), user.getId());
    }



    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

//        Supplier supplier = supplierRepository.findByUser_id(user.getId()).orElseThrow(() -> new RuntimeException("Supplier Not Found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(token, user.getRole().name(), user.getFirstName(), user.getId());
    }
}
