package com.ecom.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class UserDtls {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	private String mobileNumber;

	private String email;

	private String address;

	private String city;

	private String state;

	private String pincode;

	private String password;

	private String profileImage;

	private String role ="USER";
	private String verificationCode; // Code de vérification
    private boolean accountNonLocked = true; // Par défaut, le compte est verrouillé (true signifie "verrouillé").
    private boolean emailVerified = false;

	private Boolean isEnable;


	private Integer failedAttempt;

	private Date lockTime;
	
	private String resetToken;

}
