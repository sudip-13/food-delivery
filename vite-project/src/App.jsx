import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import Signup from './Signup.jsx'
import Login from './login.jsx'
import AdminRegistrationForm from './adminlogin.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin/registration' element={< AdminRegistrationForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App