package com.techcareer.To_DoProject.data.repository;

import com.techcareer.To_DoProject.data.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    // Diğer özel sorguları buraya ekle
    Optional<TaskEntity> findByTaskName(String taskName);

}