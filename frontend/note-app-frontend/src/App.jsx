import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Notes } from './Notes'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Notes/>} />
       
      </Routes>
    </>
  )
}

export default App
