package br.edu.ifsp.arq.ads.dw2s6.ifitness.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.ActivityRepository;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.service.ActivityService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/activities")
public class ActivityResource {

	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private ActivityService activityService;	
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ACTIVITY') and hasAuthority('SCOPE_read')")
	public List<Activity> list(){
		return activityRepository.findAll();
	}
	
	@GetMapping("/user/{email}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ACTIVITY') and hasAuthority('SCOPE_read')")
	public ResponseEntity<List<Activity>> finfByUser(@PathVariable String email){
		List<Activity> activities = activityService.findByUser(email);
		if(!activities.isEmpty()) {
			return ResponseEntity.ok(activities);
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ACTIVITY') and hasAuthority('SCOPE_read')")
	public ResponseEntity<Activity> findById(@PathVariable Long id) {
		Optional<Activity> activity = activityRepository.findById(id);
		if(activity.isPresent()) {
			return ResponseEntity.ok(activity.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_ACTIVITY') and hasAuthority('SCOPE_write')")
	public Activity create(@Valid @RequestBody Activity activity) {
		return activityService.save(activity);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_ACTIVITY') and hasAuthority('SCOPE_write')")
	public void delete(@PathVariable Long id) {
		activityRepository.deleteById(id);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_ACTIVITY') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Activity> update(@PathVariable Long id, @Valid @RequestBody Activity activity) {
		Activity activitySaved = activityService.update(id, activity);
		return ResponseEntity.ok(activitySaved);
	}
	
}
