import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Update from './pages/Update'
import DeleteTodo from './components/DeleteTodo';

//import todolists from './components/todolists';

function App() {
  return (
    <BrowserRouter>
      <Navbar />  
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/update" element = {<Update />}/> 
          <Route path="/delete" element={<DeleteTodo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
