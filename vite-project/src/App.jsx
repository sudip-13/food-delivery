import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import Signup from './Signup.jsx'
import Login from './login.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App