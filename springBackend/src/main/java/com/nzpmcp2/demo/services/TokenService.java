package com.nzpmcp2.demo.services;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nzpmcp2.demo.config.JwtConfig;
import com.nzpmcp2.demo.models.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
public class TokenService {

    private final JwtConfig jwtConfig;

    public TokenService(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String generateToken(Authentication auth) {

        // Create the header for the jwt
        JWSHeader jwsHeader = new JWSHeader.Builder(jwtConfig.getAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();

        // Create token body
        User user = (User) auth.getPrincipal();
        List<String> authority = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        JWTClaimsSet claimSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .claim("id", user.getId())
                .claim("authorities", authority)
                .issuer("NZPMCP2")
                .issueTime(Date.from(Instant.now()))
                .expirationTime(Date.from(Instant.now().plus(10, ChronoUnit.HOURS)))
                .build();

        // Sign the jwt with the secret key
        SecretKey key = jwtConfig.getSecretKey();
        SignedJWT signedJWT = new SignedJWT(jwsHeader, claimSet);
        try {
            MACSigner signer = new MACSigner(key);
            signedJWT.sign(signer);
        } catch (Exception e) {
            throw new RuntimeException("Error generating JWT",e);
        }

        // return the signed jwt
        return signedJWT.serialize();
    }
}
