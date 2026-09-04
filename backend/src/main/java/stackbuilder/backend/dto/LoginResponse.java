package stackbuilder.backend.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String firstName;
    private Long userId;

    public LoginResponse(String token, String role, String firstName, Long userId) {
        this.token = token;
        this.role = role;
        this.firstName = firstName;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getFirstName() {
        return firstName;
    }

    public Long getUserId() { return userId; }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

//    public Long getSupplierId() {
//        return supplierId;
//    }
//
//    public void setSupplierId(Long supplierId) {
//        this.supplierId = supplierId;
//    }
}
