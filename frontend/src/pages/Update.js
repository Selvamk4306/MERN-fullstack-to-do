import React, {useState, useEffect} from 'react'
import Updatetodo from '../components/Updatetodo'

import '../App.css'

import { useTodoContext } from '../hooks/useTodoContext'
import { useLocation } from 'react-router-dom'


function Update() {

    // usestate
    //const [toDos, setToDos] = useState([])
  
     const {toDos, dispatch} = useTodoContext();
     const [searchTitle, setSearchTitle] = useState("");
     const [searchError, setSearchError] = useState(null);

     const location = useLocation();

     const [selectedToDo, setSelectedToDo] = useState(
      location.state && location.state.selectedTodo
     )

     const handleSearch = () => {
        const found = toDos.find(
        (todo) => todo.title.toLowerCase() === searchTitle.toLowerCase()
      );

        if (!found) {
          setSearchError("To-Do not found");
          setSelectedToDo(null);
        } else {
          setSelectedToDo(found);
          setSearchError(null);
        }
      };
    

    useEffect(() => {
      const fetchTodos = async () => {
        const responce = await fetch('/to-dos')
        const json = await responce.json()
  
        if (responce.ok) {
          dispatch({type: 'FETCH_TODO', payload: json.data})
        }
      }
      fetchTodos()
    }, [dispatch])
    
  return (
    <div>

      <div className='search-box'>
        <label style = {{fontSize: "20px"}}>
          <strong>Search by Title:</strong>
          </label>

        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Enter exact title"
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {searchError && <p className="error">{searchError}</p>}

      <div className='layout2'>
        <div style={{ gridColumn: "1 / -1" }}>
        <Updatetodo 
        selectedToDo={selectedToDo} 
        clearSelectedToDo={() => setSelectedToDo(null)}
        />
      </div>
        {
          toDos && toDos.map((toDo) => (
          <div
            key={toDo.title}
            className={`card2 ${selectedToDo?.title === toDo.title ? 'selected' : ''}`}
            onClick={() => setSelectedToDo(toDo)}>

            <h2>{toDo.title}</h2>

            <p><strong>Status:</strong> {toDo.status}</p>

            <p><strong>Created at:</strong> {new Date(toDo.date).toLocaleString()}</p>

          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Update