package stackbuilder.backend.dto;

public class RegisterResponse {

    private String token;
    private String role;
    private String firstName;
    private Long userId;

    public RegisterResponse(String token, String role, String firstName, Long userId) {
        this.token = token;
        this.role = role;
        this.firstName = firstName;
        this.userId = userId;
    }
    public String getToken() {
        return token;
    }

    public String getRole() { return role; }

    public String getFirstName() {
        return firstName;
    }

    public  Long getUserId() { return userId; }
}
