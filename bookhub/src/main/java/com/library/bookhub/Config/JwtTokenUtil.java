// package com.library.bookhub.Config;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// import org.springframework.stereotype.Component;

// import java.util.Date;

// import javax.crypto.SecretKey;

// @Component
// public class JwtTokenUtil {

//     private static final SecretKey SECRET_KEY = Jwts.SIG.HS512.key().build();; // Replace with your actual secret key
//     private static final long EXPIRATION_TIME = 7200000; // 2 hours in milliseconds

//     public String generateToken(User user) {
//         return Jwts.builder()
//                 .claim("userId", user.getUserId())
//                 .setIssuedAt(new Date(System.currentTimeMillis()))
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(SECRET_KEY)
//                 .compact();
//     }

//     public String getUserIdFromToken(String token) {
//         Claims claims = Jwts.builder()
//                 .setSigningKey(SECRET_KEY)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//         return claims.get("userId", String.class);
//     }
//     // Validate JWT token
//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }

//     // Check if JWT token is expired
//     public boolean isTokenExpired(String token) {
//         Date expiration = Jwts.parser().setSigningKey(SECRET_KEY)
//                 .parseClaimsJws(token)
//                 .getBody().getExpiration();
//         return expiration.before(new Date());
//     }
// }
