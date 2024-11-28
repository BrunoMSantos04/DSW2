package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.User;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

	public List<Activity> findByUser(User user);
	
}