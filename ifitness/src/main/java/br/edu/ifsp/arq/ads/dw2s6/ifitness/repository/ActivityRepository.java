package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.User;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.Activity.ActivityRepositoryQuery;



public interface ActivityRepository extends JpaRepository<Activity, Long>, ActivityRepositoryQuery {

	public List<Activity> findByUser(User user);
	
}