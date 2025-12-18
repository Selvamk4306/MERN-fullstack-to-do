import React, {useState} from 'react'
import '../App.css';
import { useTodoContext } from '../hooks/useTodoContext';

const Addtodos = () => {

    const {dispatch} = useTodoContext();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('to-do');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const descArray = desc.split('\n').map(item => item.trim()).filter(item => item !== '');
        const toDo = {title, desc : descArray, status};

        console.log("Sending toDo:", toDo);

        const responce = await fetch('https://mern-fullstack-to-do.onrender.com/to-dos', {
            method: 'POST',
            body: JSON.stringify(toDo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await responce.json();

        if(!responce.ok){
            setError(json.error || json.message || " Something went wrong ");
        }
        else{
            setTitle('');
            setDesc('');
            setStatus('to-do');
            setSuccess("To Do added successfully!");
            setError(null);
            console.log('new to do added:', json);
            dispatch({type: 'ADD_TODO', payload: json.data})
        }
        console.log(descArray);
    }   

  return (
    <div>
        <form onSubmit={handleSubmit}
        className="form-container">
            <div className='heading'>
                <h2>Add To Dos Component</h2>
            </div>
            <div className='field'>
            <div>
                <label>
                <strong>Title:</strong>
                </label>
                <input type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'
                ></input>
            </div>

            <div>
                <label>
                <strong>Description:</strong>
                </label>
                <textarea 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder='description (use new line for multiple items)'
                ></textarea>
            </div>
            
            <div>
                <label>
                    <strong>Status:</strong>
                </label>
                <select type="text" value={status} 
                onChange={(e) => setStatus(e.target.value)}
                placeholder='status'>
                    <option>To-do</option>
                    <option>In-progress</option>
                    <option>Completed</option>
                </select>
            </div>
            </div>
            <button type="submit" className=' field btn'>Submit</button>          
        </form>

        {error && <div className="error">{error}</div>}

        {success && <div className='mesg'>{success}</div>}  
    </div>
  )
}

export default Addtodos