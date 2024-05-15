package com.techcareer.To_DoProject.controller;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITaskApi <D>{


    // TASK CRUD

    public ResponseEntity<?> taskApiCreate(D d);

    public ResponseEntity<List<D>> taskApiList();

    public ResponseEntity<?> taskApiFindById(Long id);

    public ResponseEntity<?> taskApiUpdateById(Long id, D d);

    public ResponseEntity<String> taskApiDeleteById(Long id);

}
