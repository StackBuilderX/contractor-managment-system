package stackbuilder.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.jdbc.support.CustomSQLErrorCodesTranslation;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import stackbuilder.backend.entity.User;
import stackbuilder.backend.repository.UserRepository;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;
    private final CustomUserDetailsService userDeatailsService;
    private final UserRepository userRepository;

    public  JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDeatailsService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userDeatailsService = userDeatailsService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = authHeader.substring(7);

            if(jwtService.isTokenValid(token)){
                Long userId = jwtService.extractUserId(token);
                String email = jwtService.extractEmail(token);

                User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

                if(!user.getEmail().equals(email)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }

                UserDetails userDetails = userDeatailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            }

            String email = jwtService.extractEmail(token);
            System.out.println("Jwt Email: " + email);
            UserDetails userDetails = userDeatailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails
                    .getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            System.out.println("Invalid JWT: " + e.getMessage());
        }

        filterChain.doFilter(request, response);

    }
}
