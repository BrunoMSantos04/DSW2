package br.edu.ifsp.arq.ads.dw2s6.ifitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.ifitness.domain.model.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long>{

}