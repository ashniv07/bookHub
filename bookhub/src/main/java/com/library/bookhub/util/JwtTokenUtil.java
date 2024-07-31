package com.library.bookhub.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;
import org.springframework.stereotype.Component;
import com.library.bookhub.Domain.AuthDto;
 
@Component
public class JwtTokenUtil {
 
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private static final long EXPIRATION_TIME = 7200000; 
 
    private SecretKey getSecretKey() {
        return SECRET_KEY;
    }
 

    //Generating token
    public String generateToken(AuthDto authDto) {
        return Jwts.builder()
                .claim("userId", authDto.getUserId())
                .claim("roleId", authDto.getRoleId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSecretKey())
                .compact();
    }
 
    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    //Getting role
 
    public int getUserIdFromToken(String token) {
        return getClaimsFromToken(token).get("userId", Integer.class);
    }
 
    public int getRoleFromToken(String token) {
        return getClaimsFromToken(token).get("roleId", Integer.class);
    }


 //Validating token
    public boolean validateToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return !isTokenExpired(claims);
        } catch (Exception e) {
            return false;
        }
    }
 
//Checking expiry
    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }
 
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return isTokenExpired(claims);
        } catch (Exception e) {
            return true; // Assume expired if token is invalid
        }
    }
}