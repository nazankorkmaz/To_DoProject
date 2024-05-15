package com.techcareer.To_DoProject.business.dto;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.Date;



// LOMBOK
@Data  //burada getter setterlar hashcode toString var
@AllArgsConstructor  //Parametreli constructorler silinir
@NoArgsConstructor   //parametresiz constructor silinir
@Log4j2 //loglama için cağırılır
@Builder //design pattern yapısı için


public class TaskDto implements Serializable {

    // Serilestirme icin
    public static final Long serialVersionUID = 1L;

    // Task Id
    private Long taskId;

    // Task Name
    // Validation    ----> burada reactta bos gecmeye çalıştığı zaman geçmezsin diye hata vericek
    @NotEmpty(message = "bos gorev olamaz!")
    @Size(min = 2, max = 100, message = "Gorev 2-100 karakter olmalı!")
    private String taskName;

    private boolean isCompleted;

    private Date systemCreatedDate;


}
