import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import ForgotPassword from './Components/ForgotPassword'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
