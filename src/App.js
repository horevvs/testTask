import { Routes, Route } from "react-router-dom"
import './App.css';
import Mainpage from './Mainpage';
import Pagination from './Pagination';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path='/pagination' element={<Pagination />} />
    </Routes>)
}

export default App;
