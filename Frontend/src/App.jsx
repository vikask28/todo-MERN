import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signup/Signin'
import Todo from './Components/Todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './Store'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(sessionStorage.getItem("id"))
    const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.login())
    }
  }, [])
  

  return (
    <>
    <Router>
    <Navbar />

      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/about' element={<About />} />
      <Route exact path='/todo' element={<Todo />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/signin' element={<Signin />} />
      </Routes>

    </Router>
      <Footer />
    </>
  )
}

export default App