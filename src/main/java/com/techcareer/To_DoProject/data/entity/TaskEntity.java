package com.techcareer.To_DoProject.data.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.CreationTimestamp;
import java.io.Serializable;
import java.util.Date;

// LOMBOK
@Data
@NoArgsConstructor
@Log4j2
@Builder //design pattern yapısı için
//ENTITY  ----> bunun database'e verileri eklmesi için çalışıcam
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

    // Task Completed
    @Column(name = "completed")
    private boolean completed;

    //System Created Date
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP) //zaman sn dk falan versin
    private Date systemCreatedDate;

    public TaskEntity(Long taskId, String taskName, boolean completed, Date systemCreatedDate) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.completed = false;
        this.systemCreatedDate = systemCreatedDate;
    }

    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return String.format("TaskEntity{" +
                "taskId=" + taskId +
                ", taskName='" + taskName + '\'' +
                ", completed=" + completed +
                ", systemCreatedDate=" + systemCreatedDate +
                '}');
    }
}
