package com.techcareer.To_DoProject.business.services;

import java.util.List;

// D: Dto
// E: Entity
public interface ITaskService <D, E>{

    // MODEL MAPPER

    public D entityToDto(E e);
    public E dtoToEntity(D d);


    // ROLE CRUD

    public D taskServiceCreate(D d);

    public List<D> taskServiceList();

    public D taskServiceFindById(Long id);

    public D taskServiceUpdateById(Long id, D d);

    public void taskServiceDeleteById(Long id);

    public D updateTaskCompletionStatus(Long id, Boolean completed, D d);
}


