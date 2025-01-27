package com.ecom.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.UserDtls;
import com.ecom.repository.UserRepository;
import com.ecom.service.UserService;
import com.ecom.util.AppConstant;
import com.ecom.util.CommonUtil;

import jakarta.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	  @Autowired
	  @Lazy
	    private CommonUtil commonUtil;
	
	  @Override
	  public UserDtls saveUser(UserDtls user) throws UnsupportedEncodingException, MessagingException {
	      // Générer un code de vérification
	      String verificationCode = CommonUtil.generateVerificationCode();
	      user.setVerificationCode(verificationCode);
	      user.setAccountNonLocked(false); // Le compte est verrouillé par défaut
          user.setIsEnable(true);
	      // Sauvegarder l'utilisateur dans la base de données
	      UserDtls savedUser = userRepository.save(user);

	      // Envoyer l'email de vérification
	      commonUtil.sendVerificationEmail(user.getEmail(), verificationCode);

	      return savedUser;
	  }






	@Override
	public UserDtls getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public List<UserDtls> getUsers(String role) {
		return userRepository.findByRole(role);
	}

	@Override
	public Boolean updateAccountStatus(Integer id, Boolean status) {

		Optional<UserDtls> findByuser = userRepository.findById(id);

		if (findByuser.isPresent()) {
			UserDtls userDtls = findByuser.get();
			userDtls.setIsEnable(status);
			userRepository.save(userDtls);
			return true;
		}

		return false;
	}

	@Override
	public void increaseFailedAttempt(UserDtls user) {
		int attempt = user.getFailedAttempt() + 1;
		user.setFailedAttempt(attempt);
		userRepository.save(user);
	}

	@Override
	public void userAccountLock(UserDtls user) {
		user.setAccountNonLocked(false);
		user.setLockTime(new Date());
		userRepository.save(user);
	}

	@Override
	public boolean unlockAccountTimeExpired(UserDtls user) {

		long lockTime = user.getLockTime().getTime();
		long unLockTime = lockTime + AppConstant.UNLOCK_DURATION_TIME;

		long currentTime = System.currentTimeMillis();

		if (unLockTime < currentTime) {
			user.setAccountNonLocked(true);
			user.setFailedAttempt(0);
			user.setLockTime(null);
			userRepository.save(user);
			return true;
		}

		return false;
	}

	@Override
	public void resetAttempt(int userId) {

	}

	@Override
	public void updateUserResetToken(String email, String resetToken) {
		UserDtls findByEmail = userRepository.findByEmail(email);
		findByEmail.setResetToken(resetToken);
		userRepository.save(findByEmail);
	}

	@Override
	public UserDtls getUserByToken(String token) {
		return userRepository.findByResetToken(token);
	}

	@Override
	public UserDtls updateUser(UserDtls user) {
		return userRepository.save(user);
	}
	@Override
	public UserDtls updateUserProfile(UserDtls user, String base64Image) {
	    // Récupérer l'utilisateur existant de la base de données
	    UserDtls dbUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));

	    // Mise à jour des coordonnées de l'utilisateur
	    dbUser.setName(user.getName());
	    dbUser.setMobileNumber(user.getMobileNumber());
	    dbUser.setAddress(user.getAddress());
	    dbUser.setCity(user.getCity());
	    dbUser.setState(user.getState());
	    dbUser.setPincode(user.getPincode());

	    // Pas de changement dans le nom de l'image

	    // Sauvegarder les modifications dans la base de données
	    dbUser = userRepository.save(dbUser);

	    return dbUser;
	}

	@Override
	public UserDtls saveAdmin(UserDtls user) {
	    user.setRole("ADMIN");
	    user.setIsEnable(true);
	    user.setAccountNonLocked(true);
	    user.setFailedAttempt(0);

	    // Utiliser directement le mot de passe fourni
	    String password = user.getPassword();
	    user.setPassword(password);

	    UserDtls saveUser = userRepository.save(user);
	    return saveUser;
	}


	@Override
	public Boolean existsEmail(String email) {
		return userRepository.existsByEmail(email);
	}


	
	public boolean verifyCode(String email, String code) {
	    UserDtls user = userRepository.findByEmail(email);
	    if (user != null && user.getVerificationCode().equals(code)) {
	        user.setAccountNonLocked(true); // Déverrouille le compte
	        user.setVerificationCode(null); // Supprime le code de vérification après l'utilisation
	        userRepository.save(user);
	        return true;
	    }
	    return false;
	}


	public UserDtls authenticateUser(String email, String password) {
	    // Récupérer l'utilisateur depuis la base de données en utilisant l'email
	    UserDtls user = userRepository.findByEmail(email);
	    
	    if (user != null) {
	        // Vérifier si le compte est verrouillé
	        if (!user.isAccountNonLocked()) {
	            throw new RuntimeException("Le compte est verrouillé. Veuillez contacter l'administrateur.");
	        }
	        
	        // Vérifier si l'utilisateur est activé
	        if (!user.getIsEnable()) {
	            throw new RuntimeException("Le compte n'est pas activé. Veuillez contacter l'administrateur.");
	        }
	        
	        // Vérifier le mot de passe
	        if (password.equals(user.getPassword())) {
	            // Si l'utilisateur existe, est activé, et le mot de passe correspond, renvoyer l'utilisateur
	            return user;
	        }
	    }
	    return null; // Sinon, retourner null pour indiquer une authentification échouée
	}



	@Override
	public boolean sendPasswordResetCode(String email) throws UnsupportedEncodingException, MessagingException {
	    // Vérifier si l'utilisateur existe
	    UserDtls user = userRepository.findByEmail(email);
	    if (user != null) {
	        // Générer un code de réinitialisation de 5 chiffres
	        String resetCode = CommonUtil.generateResetCode();  // Implémenter cette méthode pour générer un code à 5 chiffres

	        // Sauvegarder le code de réinitialisation dans l'utilisateur
	        user.setResetToken(resetCode);
	        userRepository.save(user);

	        // Envoyer un email avec le code de réinitialisation
	        commonUtil.sendResetPasswordEmail(user.getEmail(), resetCode);

	        return true;
	    }
	    return false;  // Utilisateur non trouvé
	}

	@Override
	public boolean verifyResetCode(String email, String code) {
	    UserDtls user = userRepository.findByEmail(email);
	    if (user != null && user.getResetToken().equals(code)) {
	        // Le code correspond, on peut permettre à l'utilisateur de réinitialiser son mot de passe
	        return true;
	    }
	    return false;
	}

	@Override
	public boolean resetPassword(String email, String newPassword) {
	    UserDtls user = userRepository.findByEmail(email);
	    if (user != null) {
	        // Réinitialiser le mot de passe
	        user.setPassword(newPassword);

	        // Supprimer le token de réinitialisation après utilisation
	        user.setResetToken(null);
	        userRepository.save(user);

	        return true;  // Mot de passe réinitialisé
	    }
	    return false;  // Utilisateur non trouvé
	}
	
	
	@Override
    public UserDtls updatePassword(Integer userId, String oldPassword, String newPassword) {
        UserDtls user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé pour l'ID: " + userId));

        // Comparer les mots de passe
        if (!user.getPassword().equals(oldPassword)) {
            throw new BadCredentialsException("Ancien mot de passe incorrect");
        }

        // Si tout va bien, mettre à jour le mot de passe
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
	
}
