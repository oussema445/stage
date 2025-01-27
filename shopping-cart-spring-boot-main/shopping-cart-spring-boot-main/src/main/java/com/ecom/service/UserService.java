package com.ecom.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.UserDtls;

import jakarta.mail.MessagingException;

public interface UserService {

	public UserDtls saveUser(UserDtls user)throws UnsupportedEncodingException, MessagingException;

	public UserDtls getUserByEmail(String email);

	public List<UserDtls> getUsers(String role);

	public Boolean updateAccountStatus(Integer id, Boolean status);

	public void increaseFailedAttempt(UserDtls user);

	public void userAccountLock(UserDtls user);

	public boolean unlockAccountTimeExpired(UserDtls user);

	public void resetAttempt(int userId);

	public void updateUserResetToken(String email, String resetToken);

	public UserDtls getUserByToken(String token);

	public UserDtls updateUser(UserDtls user);


	public UserDtls saveAdmin(UserDtls user);

	public Boolean existsEmail(String email);
	public UserDtls updateUserProfile(UserDtls user, String base64Image);
	public UserDtls authenticateUser(String email, String password);	
	public boolean verifyCode(String email, String code);
	public boolean sendPasswordResetCode(String email) throws UnsupportedEncodingException, MessagingException;
	public boolean verifyResetCode(String email, String code);
	public boolean resetPassword(String email, String newPassword);
	public UserDtls updatePassword(Integer userId, String oldPassword, String newPassword);
}
