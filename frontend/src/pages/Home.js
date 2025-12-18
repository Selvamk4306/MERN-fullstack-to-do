import React, {useEffect} from 'react'
import '../App.css'

import TodoLists from '../components/todolists'
import Addtodos from '../components/addtodos'
import {useTodoContext} from '../hooks/useTodoContext'

import { useLocation } from 'react-router-dom'


const Home = () => {

  // usestate
  //const [toDos, setToDos] = useState([])

  const {toDos, dispatch} = useTodoContext();

  const location = useLocation();

  useEffect(() => {
  const fetchtodos = async () =>{
    const responce =  await fetch('https://mern-fullstack-to-do.onrender.com/to-dos')
    const json = await responce.json();

    console.log(json);

    if(responce.ok){
      //setToDos(json.data)

      dispatch({type: 'FETCH_TODO', payload: json.data})
    }
  }
  fetchtodos();
  }, [dispatch])

  useEffect(() => {
    if(location.state?.message){
    alert(location.state.message);

    window.history.replaceState({}, document.title)
  }
  }, [location.state])
  
  return (
    <div className='layout'>
      <div className='left'>
        <Addtodos />
      </div>
      <div className='right'>
        {
          toDos && toDos.map((toDo) => (
            <TodoLists key = {toDo.title} toDo={toDo} />
          ))
        }
      </div>  
    </div>
  )
}

export default Home;