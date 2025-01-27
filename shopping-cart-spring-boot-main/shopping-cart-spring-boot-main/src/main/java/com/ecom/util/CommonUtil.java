package com.ecom.util;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.ecom.model.ProductOrder;
import com.ecom.model.UserDtls;
import com.ecom.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class CommonUtil {

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserService userService;

	public Boolean sendMail(String url, String reciepentEmail) throws UnsupportedEncodingException, MessagingException {

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom("ososmhemed@gmail.com", "Shooping Cart");
		helper.setTo(reciepentEmail);

		String content = "<p>Hello,</p>" + "<p>You have requested to reset your password.</p>"
				+ "<p>Click the link below to change your password:</p>" + "<p><a href=\"" + url
				+ "\">Change my password</a></p>";
		helper.setSubject("Password Reset");
		helper.setText(content, true);
		mailSender.send(message);
		return true;
	}

	public static String generateUrl(HttpServletRequest request) {

		// http://localhost:8080/forgot-password
		String siteUrl = request.getRequestURL().toString();

		return siteUrl.replace(request.getServletPath(), "");
	}
	
	String msg=null;;
	
	public Boolean sendMailForProductOrder(List<ProductOrder> orders, String status) throws Exception {
	    if (orders == null || orders.isEmpty()) {
	        throw new Exception("No orders provided for email.");
	    }

	    // Récupérer les informations générales de la commande
	    ProductOrder firstOrder = orders.get(0); // Utiliser le premier ordre pour les informations communes
	    String orderId = firstOrder.getOrderId();
	    String customerName = firstOrder.getOrderAddress().getFirstName();
	    String customerEmail = firstOrder.getOrderAddress().getEmail();
	    String paymentType = firstOrder.getPaymentType();

	    // Construire le tableau des produits
	    StringBuilder productDetails = new StringBuilder();
	    productDetails.append("<table border='1' cellpadding='5' cellspacing='0'>");
	    productDetails.append("<tr><th>Nom du produit</th><th>Quantité</th><th>Prix</th></tr>");
	    for (ProductOrder order : orders) {
	        productDetails.append("<tr>")
	            .append("<td>").append(order.getProduct().getTitle()).append("</td>")
	            .append("<td>").append(order.getQuantity()).append("</td>")
	            .append("<td>").append(order.getPrice()).append("</td>")
	            .append("</tr>");
	    }
	    productDetails.append("</table>");

	    // Construire le corps du message
	    String msg = "<p>Bonjour [[name]],</p>"
	        + "<p>Merci pour votre commande. Statut de la commande : <b>[[orderStatus]]</b>.</p>"
	        + "<p><b>ID de la commande : [[orderId]]</b></p>"
	        + "<p><b>Type de paiement : [[paymentType]]</b></p>"
	        + "<p><b>Détails des produits :</b></p>"
	        + productDetails.toString();

	    // Remplacer les placeholders
	    msg = msg.replace("[[name]]", customerName);
	    msg = msg.replace("[[orderStatus]]", status);
	    msg = msg.replace("[[orderId]]", orderId);
	    msg = msg.replace("[[paymentType]]", paymentType);

	    // Préparer et envoyer l'email
	    MimeMessage message = mailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(message);

	    helper.setFrom("daspabitra55@gmail.com", "Shopping Cart");
	    helper.setTo(customerEmail);
	    helper.setSubject("Statut de votre commande");
	    helper.setText(msg, true);

	    mailSender.send(message);
	    return true;
	}

	
	public UserDtls getLoggedInUserDetails(Principal p) {
		String email = p.getName();
		UserDtls userDtls = userService.getUserByEmail(email);
		return userDtls;
	}
	


	

	public Boolean sendVerificationEmail(String email, String verificationCode) throws UnsupportedEncodingException, MessagingException {
	    // Créer un objet MimeMessage
	    MimeMessage message = mailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(message);

	    // Définir l'adresse de l'expéditeur et du destinataire
	    helper.setFrom("ososmhemed@gmail.com", "Ste Mghirbe");
	    helper.setTo(email);

	    // Créer le contenu de l'email avec le code de vérification
	    String content = "<p>Hello,</p>"
	                   + "<p>Thank you for registering.</p>"
	                   + "<p>Please use the following code to verify your email address:</p>"
	                   + "<h3>" + verificationCode + "</h3>"
	                   + "<p>If you did not request this, please ignore this email.</p>";

	    // Définir le sujet et le corps de l'email
	    helper.setSubject("Email Verification");
	    helper.setText(content, true);

	    // Envoyer l'email
	    try {
	        mailSender.send(message);
	        return true; // Retourner true si l'email a été envoyé avec succès
	    } catch (Exception e) {  // Capture toute exception possible
	        e.printStackTrace(); // Afficher l'exception dans les logs
	        return false; // Retourner false si une erreur s'est produite
	    }
	}



public static String generateVerificationCode() {
    return String.valueOf((int)((Math.random() * 89999) + 10000)); // Génère un code à 5 chiffres
}


//Dans CommonUtil.java (ou une classe similaire)

//Dans CommonUtil.java

public static String generateResetCode() {
 int code = (int) (Math.random() * 90000) + 10000;  // Génère un code entre 10000 et 99999
 return String.valueOf(code);
}



//Dans CommonUtil.java (ou une classe similaire)

public boolean sendResetPasswordEmail(String email, String resetCode) throws MessagingException, UnsupportedEncodingException {
 String subject = "Réinitialisation de mot de passe";
 String content = "Bonjour, \n\n" +
                  "Nous avons reçu une demande de réinitialisation de mot de passe. " +
                  "Votre code de réinitialisation est : \n\n" +
                  resetCode + "\n\n" +
                  "Veuillez entrer ce code dans l'application pour réinitialiser votre mot de passe.";

 return sendEmail(email, subject, content);  // Méthode générique pour envoyer l'email
}


//Dans CommonUtil.java
public Boolean sendEmail(String toEmail, String subject, String content) {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper;
    
    try {
        helper = new MimeMessageHelper(message, true, "UTF-8"); // Assurez-vous que l'encodage est correct
        helper.setFrom("your-email@gmail.com", "Your Application Name");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(content, true); // Set content to HTML if needed

        mailSender.send(message); // Envoi de l'email
        return true; // Retourne true si l'email est envoyé avec succès
    } catch (MessagingException | UnsupportedEncodingException e) {
        e.printStackTrace(); // En cas d'erreur, affiche l'exception dans les logs
        return false; // Retourne false en cas d'erreur
    }
}



}
