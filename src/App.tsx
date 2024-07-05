import './App.css'
import { Route, Routes } from 'react-router-dom'
import FormPage from './component/FormPage'
import SecondPage from './component/SecondPage'

function App() {

  return (
    <Routes>
       <Route path='/' element={<FormPage />} />
       <Route path='/second' element={<SecondPage /> } />
    </Routes>
  )
}

export default App
