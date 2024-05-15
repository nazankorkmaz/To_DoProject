package com.techcareer.To_DoProject.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

// LOMBOK
@Data  //burada getter setterlar var
@AllArgsConstructor  //Parametreli constructorler silinir
@NoArgsConstructor   //parametresiz constructor silinir
@Log4j2 //loglama için cağırılır
@Builder //design pattern yapısı için

//ENTITY  ----> bununn database'e verileri eklmesi için çalışıcam
@Entity(name = "Tasks")
@Table(name = "tasks")

public class TaskEntity implements Serializable {

    public static final Long serialVersionUID = 1L;

    // Task Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ıd'nin artarak devam etmesini sağlar
    @Column(name = "task_id") //database'e bu adla kaydetsin
    private Long taskId;

    // Task Name
    @Column(name = "task_name")
    private String taskName;


    private boolean isCompleted;


    //System Created Date
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP) //zaman sn dk falan versin
    private Date systemCreatedDate;

    @Override
    public String toString() {
        return String.format("TaskEntity{" +
                "taskId=" + taskId +
                ", taskName='" + taskName + '\'' +
                ", isCompleted=" + isCompleted +
                ", systemCreatedDate=" + systemCreatedDate +
                '}');
    }
}
