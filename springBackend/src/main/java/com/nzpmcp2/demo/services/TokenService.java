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
        JWSHeader jwsHeader = new JWSHeader.Builder(jwtConfig.getAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        SecretKey key = jwtConfig.getSecretKey();

        JWTClaimsSet claimSet = new JWTClaimsSet.Builder()
                .issuer("nzpmcp2")
                .issueTime(Date.from(Instant.now()))
                .expirationTime(Date.from(Instant.now().plus(1, ChronoUnit.HOURS)))
                .claim("roles", roles)
                .claim("id", ((User) auth.getPrincipal()).getId())
                .build();

        SignedJWT signedJWT = new SignedJWT(jwsHeader, claimSet);

        try {
            MACSigner signer = new MACSigner(key);
            signedJWT.sign(signer);
        } catch (Exception e) {
            throw new RuntimeException("Error generating JWT",e);
        }

        return signedJWT.serialize();
    }
}
