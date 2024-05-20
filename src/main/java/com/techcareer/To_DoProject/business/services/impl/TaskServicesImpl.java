package com.techcareer.To_DoProject.business.services.impl;

import com.techcareer.To_DoProject.bean.ModelMapperBeanClass;
import com.techcareer.To_DoProject.business.dto.TaskDto;
import com.techcareer.To_DoProject.business.services.ITaskService;
import com.techcareer.To_DoProject.data.entity.TaskEntity;
import com.techcareer.To_DoProject.data.repository.TaskRepository;
import com.techcareer.To_DoProject.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

// Lombok
@RequiredArgsConstructor
@Log4j2
@Service
@Component("taskServicesImpl")   //spring tarafından springin bir parçasısın artık demek
public class TaskServicesImpl implements ITaskService<TaskDto, TaskEntity> {

    @Autowired
    private final TaskRepository taskRepository;
    private final ModelMapperBeanClass modelMapperBeanClass;

    @Override
    public TaskDto entityToDto(TaskEntity taskEntity) {
        return modelMapperBeanClass.modelMapperMethod().map(taskEntity, TaskDto.class);
    }

    @Override
    public TaskEntity dtoToEntity(TaskDto taskDto) {
        return modelMapperBeanClass.modelMapperMethod().map(taskDto, TaskEntity.class);
    }

    @Override        // database'e veri eklerken bu methot çağırılır
    @Transactional  // Create,Update,Delete
    public TaskDto taskServiceCreate(TaskDto taskDto) {
        TaskEntity roleEntity1;
        // Dto => Entity çevirmek
        roleEntity1 = dtoToEntity(taskDto);
        roleEntity1.setTaskName(roleEntity1.getTaskName());
        // Kaydetmek
        TaskEntity roleEntity2 = taskRepository.save(roleEntity1);
        // ID ve Date Dto üzerinde Set yapıyorum
        taskDto.setTaskId(roleEntity2.getTaskId());
        taskDto.setSystemCreatedDate(roleEntity2.getSystemCreatedDate());
        return taskDto;
    }

    @Override
    public List<TaskDto> taskServiceList() {
        //Entity List
        List<TaskEntity> taskEntityList1 = taskRepository.findAll(); // listeyi çağırdı
        // Dto List
        List<TaskDto> taskDtoList = new ArrayList<>();
        // Entity To Dto List
        for (TaskEntity tempEntity : taskEntityList1) {
            TaskDto taskDto1 = entityToDto(tempEntity); //oncekini tek tek alıp
            taskDtoList.add(taskDto1);  // bu yeni listeye ekle
        }
        return taskDtoList;
    }

    @Override
    public TaskDto taskServiceFindById(Long id) {
        Boolean booleanRoleEntityFindById = taskRepository.findById(id).isPresent();
        TaskEntity taskEntity = null;
        if (booleanRoleEntityFindById) {
            taskEntity = taskRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Task", "id", id)
            );
        } else if (!booleanRoleEntityFindById) {
            throw new ResourceNotFoundException("Task", "id", id);
        }
        return entityToDto(taskEntity);
    }

    @Override
    public TaskDto taskServiceUpdateById(Long id, TaskDto taskDto) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        task.setTaskName(taskDto.getTaskName());
        task.setCompleted(taskDto.isCompleted());
        TaskEntity updatedTask = taskRepository.save(task);
        return entityToDto(updatedTask);
    }

    @Override
    public void taskServiceDeleteById(Long id) {
        TaskEntity task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        taskRepository.delete(task);
    }

    @Override
    @Transactional
    public TaskDto updateTaskCompletionStatus(Long id, Boolean completed, TaskDto taskDto) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        task.setCompleted(taskDto.isCompleted());
        TaskEntity updatedTask = taskRepository.save(task);
        return entityToDto(updatedTask);
    }
}

