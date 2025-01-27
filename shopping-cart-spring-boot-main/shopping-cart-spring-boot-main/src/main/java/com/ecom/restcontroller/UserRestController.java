package com.ecom.restcontroller;


import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.UserDtls;
import com.ecom.service.UserService;

import jakarta.mail.MessagingException;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserService userService;

 // Endpoint to save a user
    @PostMapping("/save")
    public UserDtls saveUser(@RequestBody UserDtls user) throws MessagingException, UnsupportedEncodingException {
        return userService.saveUser(user);
    }

    

    // Endpoint to get user by email
    @GetMapping("/email")
    public UserDtls getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    // Endpoint to get users by role
    @GetMapping("/role")
    public List<UserDtls> getUsers(@RequestParam String role) {
        return userService.getUsers(role);
    }

    // Endpoint to update account status
    @PutMapping("/updateStatus")
    public Boolean updateAccountStatus(@RequestParam Integer id, @RequestParam Boolean status) {
        return userService.updateAccountStatus(id, status);
    }

    // Endpoint to increase failed attempt
    @PutMapping("/increaseFailedAttempt")
    public void increaseFailedAttempt(@RequestBody UserDtls user) {
        userService.increaseFailedAttempt(user);
    }

    // Endpoint to lock user account
    @PutMapping("/lockAccount")
    public void userAccountLock(@RequestBody UserDtls user) {
        userService.userAccountLock(user);
    }

    // Endpoint to check if unlock account time expired
    @GetMapping("/unlockTimeExpired")
    public boolean unlockAccountTimeExpired(@RequestBody UserDtls user) {
        return userService.unlockAccountTimeExpired(user);
    }

    // Endpoint to reset failed attempts
    @PutMapping("/resetAttempt")
    public void resetAttempt(@RequestParam int userId) {
        userService.resetAttempt(userId);
    }

    // Endpoint to update user reset token
    @PutMapping("/updateResetToken")
    public void updateUserResetToken(@RequestParam String email, @RequestParam String resetToken) {
        userService.updateUserResetToken(email, resetToken);
    }

    // Endpoint to get user by reset token
    @GetMapping("/token")
    public UserDtls getUserByToken(@RequestParam String token) {
        return userService.getUserByToken(token);
    }

    // Endpoint to update user
    @PutMapping("/update")
    public UserDtls updateUser(@RequestBody UserDtls user) {
        return userService.updateUser(user);
    }

    // Endpoint to update user profile with image
    @PutMapping("/updateProfile")
    public UserDtls updateUserProfile(@RequestBody UserDtls user, @RequestParam String img) {
        return userService.updateUserProfile(user, img);
    }

    // Endpoint to save an admin user
    @PostMapping("/saveAdmin")
    public UserDtls saveAdmin(@RequestBody UserDtls user) {
        return userService.saveAdmin(user);
    }

    // Endpoint to check if email exists
    @GetMapping("/existsEmail")
    public Boolean existsEmail(@RequestParam String email) {
        return userService.existsEmail(email);
    }
    
   
    
    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String email, @RequestParam String code) {
        boolean isVerified = userService.verifyCode(email, code);
        if (isVerified) {
            return ResponseEntity.ok("Account verified successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDtls userDtls) {
        try {
            // Utilisation de l'email et du mot de passe pour l'authentification
            UserDtls authenticatedUser = userService.authenticateUser(userDtls.getEmail(), userDtls.getPassword());
            
            if (authenticatedUser != null) {
                // L'utilisateur est authentifié, retournez les informations utilisateur
                return ResponseEntity.ok(authenticatedUser);
            } else {
                // Authentification échouée, mot de passe incorrect
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect");
            }
        } catch (RuntimeException e) {
            // En cas d'erreur spécifique, renvoyer un message plus détaillé
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            // En cas d'erreur inattendue
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne du serveur");
        }
    }
    
    
    @PostMapping("/sendPasswordResetCode")
    public ResponseEntity<Map<String, Object>> sendPasswordResetCode(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = payload.get("email");
            boolean result = userService.sendPasswordResetCode(email);
            if (result) {
                response.put("message", "Code de réinitialisation envoyé avec succès.");
                response.put("status", 200);
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Utilisateur non trouvé.");
                response.put("status", 404);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            response.put("message", "Erreur lors de l'envoi du code de réinitialisation.");
            response.put("status", 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    // Vérification du code de réinitialisation
    @PostMapping("/verifyResetCode")
    public ResponseEntity<Map<String, Object>> verifyResetCode(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        String email = payload.get("email");
        String resetToken = payload.get("resetToken");

        boolean isCodeValid = userService.verifyResetCode(email, resetToken);
        if (isCodeValid) {
            response.put("message", "Code de réinitialisation validé.");
            response.put("status", 200);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Code de réinitialisation invalide.");
            response.put("status", 400);
            return ResponseEntity.status(400).body(response);
        }
    }

    // Réinitialisation du mot de passe
    @PostMapping("/resetPassword")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> payload) {
        Map<String, Object> response = new HashMap<>();
        String email = payload.get("email");
        String newPassword = payload.get("newPassword");

        boolean isPasswordReset = userService.resetPassword(email, newPassword);
        if (isPasswordReset) {
            response.put("message", "Mot de passe réinitialisé avec succès.");
            response.put("status", 200);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Échec de la réinitialisation du mot de passe. Utilisateur non trouvé.");
            response.put("status", 400);
            return ResponseEntity.status(400).body(response);
        }
    }
    
    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest request) {
        try {
            // Appel de la méthode de service pour mettre à jour le mot de passe
            userService.updatePassword(request.getUserId(), request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok("Mot de passe mis à jour avec succès");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Ancien mot de passe incorrect");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour du mot de passe");
        }
    }
    
    public static class UpdatePasswordRequest {
        private Integer userId;
        private String oldPassword;
        private String newPassword;

        // Getters et Setters
        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

}



