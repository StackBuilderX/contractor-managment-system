package stackbuilder.backend.service;


import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stackbuilder.backend.entity.Contractor;
import stackbuilder.backend.entity.Supplier;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.repository.ContractorRepository;
import stackbuilder.backend.repository.SupplierRepository;
import stackbuilder.backend.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final ContractorRepository contractorRepository;
    private final SupplierRepository supplierRepository;

    public UserService(UserRepository userRepository, CloudinaryService cloudinaryService, ContractorRepository contractorRepository, SupplierRepository supplierRepository) {

        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
        this.contractorRepository = contractorRepository;
        this.supplierRepository = supplierRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC,"createdAt"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User Not Found"));
    }

    public  User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());

        return userRepository.save(user);
    }

    public User partialUpdateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("User Not Found"));

        if(updatedUser.getFirstName() != null) {
            user.setFirstName(updatedUser.getFirstName());
        }

        if(updatedUser.getLastName() != null) {
            user.setLastName(updatedUser.getLastName());
        }

        if(updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }

        if(updatedUser.getPhone() != null) {
            user.setPhone(updatedUser.getPhone());
        }

        return userRepository.save(user);
    }


    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));

            Optional<Contractor> contractor = contractorRepository.findByUser_Id(id);
            Optional<Supplier> supplier = supplierRepository.findByUser_id(id);
            if (contractor.isPresent()) {
                contractorRepository.delete(contractor.get());
                userRepository.delete(user);
            } else if (supplier.isPresent()) {
                supplierRepository.delete(supplier.get());
                userRepository.delete(user);
            }
    }


    public User updateProfileImage(Long id, MultipartFile file) throws IOException {

        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));

        Map result = cloudinaryService.uploadImage(file);

        String imageUrl = (String) result.get("secure_url");
        String publicId = (String) result.get("public_id");

        user.setProfileImageUrl(imageUrl);
        user.setProfileImagePublicId(publicId);

        return userRepository.save(user);
    }
}
