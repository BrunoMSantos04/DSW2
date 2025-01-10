package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.activity;

import java.util.List;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Activity;
import br.edu.ifsp.arq.ads.dw2s6.ifitness.repository.filter.ActivityFilter;

public interface ActivityRepositoryQuery {

	public List<Activity> filter(ActivityFilter activityFilter);

}