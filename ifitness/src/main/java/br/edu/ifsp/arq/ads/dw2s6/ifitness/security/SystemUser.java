package br.edu.ifsp.arq.ads.dw2s6.ifitness.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.User;

public class SystemUser extends org.springframework.security.core.userdetails.User{

	private static final long serialVersionUID = 1L;

	private User user;

	public SystemUser(User user, Collection<? extends GrantedAuthority> authorities) {
		super(user.getEmail(), user.getPassword(), authorities);
		this.user = user;
	}

	public User getUser() {
		return user;
	}
	
}
