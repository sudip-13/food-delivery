import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import Signup from './assets/layouts/signup.jsx'
import Login from './assets/layouts/login.jsx'
import Adminsignup from './assets/layouts/adminsignup.jsx'
import Sendotp from './assets/layouts/sendotp.jsx'
import AdminHome from './assets/layouts/adminhome.jsx'
import ForgotPassword from './assets/layouts/forgotpass.jsx'
import Home from './assets/layouts/home.jsx'
import About from './assets/layouts/about.jsx'
import Veg from './assets/layouts/veg.jsx'
import Cart from './assets/layouts/cart.jsx'
import Contact from './assets/layouts/contact.jsx'
import NonVeg from './assets/layouts/nonveg.jsx'
import Profile from './assets/layouts/profile.jsx'
import Overview from './assets/layouts/overview.jsx'
import Payment from './assets/layouts/payment.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgotpassword' element={< ForgotPassword />}></Route>

        <Route path='/user/home' element={<Home />}></Route>
        <Route path='/user/about' element={<About />}></Route>
        <Route path='/user/veg' element={<Veg />}></Route>
        <Route path='/user/cart' element={<Cart />}></Route>
        <Route path='/user/contact' element={<Contact />}></Route>
        <Route path='/user/nonveg' element={<NonVeg />}></Route>
        <Route path='/user/profile' element={<Profile />}></Route>
        <Route path='/user/overview' element={<Overview />}></Route>
        <Route path='/user/payment' element={<Payment />}></Route>

        <Route path='/admin/signup' element={< Adminsignup />}></Route>
        <Route path='/admin/login' element={< Sendotp />}></Route>
        <Route path='/admin/home' element={< AdminHome />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;