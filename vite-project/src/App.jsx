import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import Signup from './assets/signup.jsx'
import Login from './assets/login.jsx'
import Adminsignup from './assets/adminsignup.jsx'
import Sendotp from './assets/sendotp.jsx'
import AdminHome from './assets/adminhome.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/admin/signup' element={< Adminsignup />}></Route>
        <Route path='/admin/login' element={< Sendotp />}></Route>
        <Route path='/admin/home' element={< AdminHome />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App