package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);

}
