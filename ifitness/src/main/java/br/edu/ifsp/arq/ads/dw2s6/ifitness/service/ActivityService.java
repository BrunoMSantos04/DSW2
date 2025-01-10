package br.edu.ifsp.arq.ads.dw2s6.ifitness.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.User;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.ActivityRepository;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.UserRepository;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.filter.ActivityFilter;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.service.exception.NonExistentOrInactiveUserException;

@Service
public class ActivityService {
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Activity save(Activity activity) {
		Optional<User> user = userRepository.findById(activity.getUser().getId());
		if(!user.isPresent() || !user.get().isActive()) {
			throw new NonExistentOrInactiveUserException();
		}
		return activityRepository.save(activity);
	}
	
	public Activity update(Long id, Activity activity) {
		Activity activitySaved = findActivityById(id);
		BeanUtils.copyProperties(activity, activitySaved, "id");
		return activityRepository.save(activitySaved);
	}
	
	public Activity findActivityById(Long id) {
		Activity activitySaved = activityRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return activitySaved;
	}
	
	public List<Activity> findByUser(String email){
		Optional<User> user = userRepository.findByEmail(email);
		if(user.isPresent()) {
			return activityRepository.findByUser(user.get());
		}
		return null;
	}
	
	public Page<Activity> search(ActivityFilter activityFilter, Pageable pageable){
		return activityRepository.filter(activityFilter, pageable);
	}

}
