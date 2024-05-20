package com.techcareer.To_DoProject.controller.api;

import com.techcareer.To_DoProject.business.dto.TaskDto;
import com.techcareer.To_DoProject.business.services.ITaskService;
import com.techcareer.To_DoProject.controller.ITaskApi;
import com.techcareer.To_DoProject.error.ApiResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

// Lombok
@RequiredArgsConstructor
@Log4j2
// API (REST)
@RestController
@RequestMapping("/api/v1.0.0")
@CrossOrigin //CORS: Hatası
public class TaskApiImpl implements ITaskApi<TaskDto> {
    // Injection
    @Qualifier("taskServicesImpl")
    private final ITaskService iTaskService;
    // Error
    private ApiResult apiResult;

    // CREATE (Api) --> HTTP POST isteği ile /create endpoint'ine gelen bir görevi oluşturmayı sağlar
    // http://localhost:4444/api/v1.0.0/create
    @PostMapping("/create")
    @Override
    public ResponseEntity<?> taskApiCreate(@RequestBody TaskDto taskDto) {
        TaskDto taskCreateApi =(TaskDto) iTaskService.taskServiceCreate(taskDto);
        if (taskCreateApi == null) {
            ApiResult apiResultCreate = ApiResult.builder()
                    .status(404)
                    .error("Task Eklenmedi")
                    .message("Task Dto bulunmadı")
                    .path("localhost:4444/api/v1.0.0/create")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(404).body(apiResultCreate);
        } else if (taskCreateApi.getTaskId() == 0) {
            ApiResult apiResultCreate = ApiResult.builder()
                    .status(400)
                    .error("Task Eklenmedi")
                    .message("Task Dto Bad Request")
                    .path("localhost:4444/api/v1.0.0/create")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(400).body(apiResultCreate);
        }
        log.info("Task Api eklendi");
        return ResponseEntity.status(201).body(taskCreateApi);
    }

    // HTTP GET isteği ile /list endpoint'ine gelen görev listesini alma işlemini gerçekleştirir.
    @GetMapping("/list")
    @Override
    public ResponseEntity<List<TaskDto>> taskApiList() {
        log.info("Task Api Listelendi");
        return ResponseEntity.ok(iTaskService.taskServiceList());
    }

    //  HTTP GET isteği ile /find veya /find/{id} endpoint'lerine gelen bir görevi bulma işlemini gerçekleştirir.
    @GetMapping({"/find","/find/{id}"})
    @Override
    public ResponseEntity<?> taskApiFindById(@PathVariable(name="id",required = false) Long id) {
        TaskDto taskFindApi=( TaskDto)iTaskService.taskServiceFindById(id);
        if(taskFindApi==null){
            // Eğer kaydederken null değer gelirse
            ApiResult apiResultFind=ApiResult.builder()
                    .status(404)
                    .error("Task Bulunamadı")
                    .message("Task Dto bulunmadı")
                    .path("localhost:4444/api/v1.0.0/find")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();               //builder nesnesinden nihai nesneyi oluşturur ve geri döndürür.
            return ResponseEntity.status(404).body(apiResultFind);
        }
        log.info("Task Api bulundu");
        return ResponseEntity.ok(iTaskService.taskServiceFindById(id));
    }

    // HTTP PUT isteği ile /update veya /update/{id} endpoint'lerine gelen bir görevi güncelleme işlemini gerçekleştirir.
    @Override
    @PutMapping({"/update","/update/{id}"})
    public ResponseEntity<?> taskApiUpdateById(@PathVariable(name="id",required = false)Long id, @Valid @RequestBody TaskDto taskDto) {
        TaskDto taskUpdateApi = ( TaskDto)iTaskService.taskServiceUpdateById(id, taskDto);
        if (taskUpdateApi == null) {
            ApiResult apiResultFind = ApiResult.builder()
                    .status(404)
                    .error("Task Bulunamadı")
                    .message("Task Dto bulunmadı")
                    .path("localhost:4444/api/v1.0.0/update")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(404).body(apiResultFind);
        }
        log.info("Task Api Güncellendi");
        return ResponseEntity.ok(taskUpdateApi);
    }

    //HTTP DELETE isteği ile /delete veya /delete/{id} endpoint'lerine gelen bir görevi silme işlemini gerçekleştirir.
    @Override
    @DeleteMapping({"/delete","/delete/{id}"})
    public ResponseEntity<String> taskApiDeleteById(@PathVariable(name="id",required = false)Long id) {
        iTaskService.taskServiceDeleteById(id);
        return new ResponseEntity<>("Task silindi.", HttpStatus.OK);
    }

    //HTTP PUT isteği ile /update/completion/{id} endpoint'ine gelen bir görevin tamamlanma durumunu güncelleme
    // işlemini gerçekleştirir.
    @Override
    @PutMapping("/update/completion/{id}")
    public ResponseEntity<?> updateTaskCompletionStatus(@PathVariable(name="id") Long id, @RequestBody boolean isCompleted,@Valid @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = (TaskDto) iTaskService.updateTaskCompletionStatus(id, isCompleted, taskDto);
        if (updatedTask == null) {
            ApiResult apiResultFind = ApiResult.builder()
                    .status(404)
                    .error("Task Bulunamadı")
                    .message("Task Dto bulunmadı")
                    .path("localhost:4444/api/v1.0.0/update/completion")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(404).body(apiResultFind);
        }
        log.info("Task completion guncellendi");
        return ResponseEntity.ok(updatedTask);
    }


}
