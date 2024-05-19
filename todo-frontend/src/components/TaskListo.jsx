
import React, { useEffect, useState } from 'react'

import {Link, Route, useNavigate} from 'react-router-dom'

import BlogCategoryApi from "../services/TaskApi";


function TaskList({props}) {

    // REDIRECT
    let navigate = useNavigate();

    // STATE
    const [blogCategoryApiListData, setBlogCategoryApiListData] = useState([]); //unutma diziyi yaz

    // EFFECT
    useEffect(() => {
        //2.YOL
        fetchBlogCategoryList();
    }, []) //end useEffect

    // Fetch users from API
    const fetchBlogCategoryList = async () => {
        try {
            
            const response = await BlogCategoryApi.taskApiList();   //fetch('https://api.example.com/users');
            setBlogCategoryApiListData(response.data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    // FUNCTION
    // LIST AFTER LOADING
    const listManipulationAfter = () => {
        BlogCategoryApi.taskApiList()
            .then(
                (response) => {
                    console.log(response);
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.headers);
                    if (response.status === 200) {
                        setBlogCategoryApiListData(response.data)
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }


   ////////////////////////////
    // CRUD
    // REGISTER UPDATE
    const setUpdateBlogCategory = (data) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        let { taskId, taskName } = data
        localStorage.setItem("taskId", taskId)
        localStorage.setItem("Task", taskName)
    }

    // REGISTER VIEW
    const setViewBlogCategory = (taskId) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        localStorage.setItem("blog_category_view_id", taskId)
    }
  
   //REGISTER DELETE
   const setDeleteBlogCategory = (taskId) => {
    if (window.confirm(taskId+ " id datayı silmek istiyor musunuz ?")) {
        // 1.YOL
        BlogCategoryApi.taskApiDeleteById(taskId)
            .then((response) => {
                if (response.status === 200) {
                    listManipulationAfter();
                    navigate('/list')
                    //window.location = "/blog/category/list"
                }
            })
            .catch((err) => {
                console.error(err);
                navigate('/list')
                //window.location = "/register/list"
            });
    } else {
        alert(taskId + " nolu data silinmedi !!!");
        //navigate('/register/list')
        window.location = "/list"
    }
    // 2.YOL (delete axios yazarak)
    // axios.delete(" http://localhost:4444/register/api/v1.0.0/delete/"+id).then().catch();
}




  return (

    
    //<div>TaskList</div>


    <React.Fragment>

        <br /><br /><br /><br />
        <h1 className="text-center display-5 mb-5">{('task_list')}</h1>
            <Link className='btn btn-primary me-2' to="/create">Create</Link>
             <table className='table table-striped table-responsive mb-5'>
                <thead>
                <tr>
                    <th>{'taskId'}</th>
                    <th>{'Task'}</th>
                    <th>{('date')}</th>
                    <th>{('update')}</th>
                    <th>{('delete')}</th>
                </tr>
                </thead>

                <tbody>
                {
                    blogCategoryApiListData.map((data) =>
                        <tr key={data.taskId}>
                            <td>{data.taskId}</td>
                            <td>{data.taskName}</td>
                            <td>{data.systemCreatedDate}</td>
                            <td>
                                <Link to={`/update/${data.taskId}`}>
                                    <i onClick={() => setUpdateBlogCategory(data)} className="fa-solid fa-pen-nib text-primary"></i>
                                </Link>
                            </td>
                            <td>
                                <Link>
                                    <i onClick={() => setDeleteBlogCategory(data.taskId)} className="fa-solid fa-trash text-danger"></i>
                                </Link>
                            </td>
                        </tr>
                    )
                }
                </tbody>

            </table>
        </React.Fragment>
  )
}
export default TaskList


