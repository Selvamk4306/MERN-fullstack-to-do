import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTodoContext } from '../hooks/useTodoContext'


const DeleteTodo = () => {

    const { dispatch } = useTodoContext();
    const location = useLocation();
    const navigate = useNavigate();

    const selectedToDo = location.state?.selectedTodo;

    const handleDelete = async () => {
        try{
            const responce = await fetch(`https://mern-fullstack-to-do.onrender.com/to-dos/${encodeURIComponent(selectedToDo.title)}`,
            {
                method: 'DELETE'
            });
            const json = await responce.json();

            if(responce.ok){
                dispatch({type: "DELETE_TODO", payload: json.data})
                navigate('/', {
                    state: {message : "To-Do deleted successfully"}
                });
            } else{
                alert(json.message || "Delete failed");
            }

        } catch(err){
            alert("Server error");
        }
    }
  return (
    <div className='delete-card'>
        <h2>
            Delete-To-Do
        </h2>
        <div className='content'>
            <p>Are you sure you want to delete <strong>{selectedToDo.title}</strong> Todo</p>
        </div>

        <div className='actions'>
            <button onClick={handleDelete} className='btn1'>Yes</button>
            <button onClick={() => navigate(-1)} className='btn2'>No</button>
        </div>
    </div>
  );
};

export default DeleteTodo