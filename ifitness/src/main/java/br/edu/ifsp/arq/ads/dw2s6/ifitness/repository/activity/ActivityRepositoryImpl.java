package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.activity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.filter.ActivityFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ActivityRepositoryImpl implements ActivityRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;
	
	@Override
	public Page<Activity> filter(ActivityFilter activityFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Activity> criteria = builder.createQuery(Activity.class);
		Root<Activity> root = criteria.from(Activity.class);
		
		Predicate[] predicates = createConstraints(activityFilter, builder, root);
		criteria.where(predicates);
		
		TypedQuery<Activity> query = manager.createQuery(criteria);
		addPaginationConstraints(query, pageable);
		
		return new PageImpl<>(query.getResultList(), pageable, totalPages(activityFilter));
	}

	private Predicate[] createConstraints(ActivityFilter activityFilter, CriteriaBuilder builder, Root<Activity> root) {
		List<Predicate> predicates = new ArrayList<>();
		
		if(activityFilter.getUser() != null) {
			predicates.add(builder.equal(
					root.get("user"), activityFilter.getUser()));
		}
		
		if(activityFilter.getType() != null) {
			predicates.add(builder.equal(
					root.get("type"), activityFilter.getType()));
		}
		
		if (activityFilter.getInitialDate() != null) {
			predicates.add(
					builder.greaterThanOrEqualTo(root.get("date"), activityFilter.getInitialDate()));
		}
		
		if (activityFilter.getFinalDate() != null) {
			predicates.add(
					builder.lessThanOrEqualTo(root.get("date"), activityFilter.getFinalDate()));
		}
		
		return predicates.toArray(new Predicate[predicates.size()]);
	}

	private void addPaginationConstraints(TypedQuery<Activity> query, Pageable pageable) {
		int currentPage = pageable.getPageNumber();
		int totalRecordsPerPage = pageable.getPageSize();
		int firstPageRecord = currentPage * totalRecordsPerPage;
		
		query.setFirstResult(firstPageRecord);
		query.setMaxResults(totalRecordsPerPage);
	}
	
	private Long totalPages(ActivityFilter activityFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Activity> root = criteria.from(Activity.class);
		
		Predicate[] predicates = createConstraints(activityFilter, builder, root);
		criteria.where(predicates);
		
		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}
	
}}