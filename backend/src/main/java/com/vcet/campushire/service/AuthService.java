package com.vcet.campushire.service;

import com.vcet.campushire.dto.RegisterRequest;
import com.vcet.campushire.entity.User;
import com.vcet.campushire.repository.UserRepository;
import com.vcet.campushire.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest req) {
        if (req.email() != null && userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (req.rollNo() != null && userRepository.existsByRollNo(req.rollNo())) {
            throw new IllegalArgumentException("Roll number already registered");
        }
        User user = User.builder()
                .email(req.email())
                .rollNo(req.rollNo())
                .passwordHash(passwordEncoder.encode(req.password()))
                .role(req.role())
                .fullName(req.fullName())
                .department(req.department())
                .build();
        return userRepository.save(user);
    }

    public String login(String username, String rawPassword) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, rawPassword)
        );
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(principal, Map.of("roles", principal.getAuthorities()));
    }
}
