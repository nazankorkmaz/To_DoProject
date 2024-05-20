// http://localhost:4444/api/v1/delete/all
// proxy:    http://localhost:4444/
// URL:      /delete/all

import axios from 'axios';

const TODO_API_PERSIST_URL ="/api/v1.0.0"
class TaskApi{
    // CREATE (Api)
    // http://localhost:4444/api/v1.0.0/create
    //@PostMapping("/create")
    taskApiCreate(taskDto) {
        return axios.post(`${TODO_API_PERSIST_URL}/create`,taskDto);
    }

    //@GetMapping("/list")
    taskApiList() {
       return axios.get(`${TODO_API_PERSIST_URL}/list`);
    }

    //@GetMapping({"/find","/find/{id}"})
    taskApiFindById(id) {
       return axios.get(`${TODO_API_PERSIST_URL}/find/${id}`);}


    //@PutMapping({"/update","/update/{id}"})
    taskApiUpdateById(id, taskDto) {
        return axios.put(`${TODO_API_PERSIST_URL}/update/${id}`,taskDto);
    }

    //@DeleteMapping({"/delete","/delete/{id}"})
    taskApiDeleteById(id) {
        return axios.delete(`${TODO_API_PERSIST_URL}/delete/${id}`);
    }

    taskApiUpdateCompletionStatus(taskId, completed,taskDto) {
        return axios.put(`${TODO_API_PERSIST_URL}/update/completion/${taskId}`, completed);
    }
}
// Export Default
export default new TaskApi();