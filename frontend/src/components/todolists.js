import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { FaPen, FaTrash } from "react-icons/fa";

  const TodoLists = ({toDo}) => {
    return (
      <div>

          <div className='card'>

            <div>
              <h2>{toDo.title}</h2>
            </div>

              <div className='content'>
                <h4>Tasks :- </h4>
                <ul>
                  {
                    toDo.desc.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  }
                </ul>
                <p><strong>Status :- </strong>{toDo.status}</p>
                <p>
                  <strong>Created at :- </strong>
                  {new Date(toDo.date).toLocaleString()}
                </p>
                <Link to = "/update"
                state={{selectedTodo: toDo}}>
                    <button className='iconE'>
                      <FaPen size={10} style={{ cursor: "pointer" }} />
                    </button>
                </Link>
                <Link to = "/delete"
                state={{selectedTodo: toDo}}>
                    <button className='iconD'>
                      <FaTrash size={10} />
                    </button>
                </Link>
              </div>
              
            </div>

      </div>
    )
  }

  export default TodoLists;