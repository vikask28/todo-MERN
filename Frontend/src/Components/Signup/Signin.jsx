import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import HeadingComp from './HeadingComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../Store'


const Signin = () => {

    const dispatch = useDispatch();
  const history = useNavigate();

  const [Inputs, setInputs] = useState({ email: "", password: "" })

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const submit = async (e)=>{
    e.preventDefault();
    await axios 
    .post(`${window.location.origin}/api/v1/signin`, Inputs)
    .then((response) => {
      // console.log(response.data.others._id);
      sessionStorage.setItem("id", response.data.others._id)
      dispatch(authActions.login())
      history("/todo")
    });
  };


  return (
    <section>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
     
        <HeadingComp first="Sign" second="In" />
        

        <div className="flex flex-col gap-8">

        <input 
        className='w-full border p-2 mt-3' 
        type="email" 
        name='email' 
        value={Inputs.email}
        onChange={change}
        placeholder='Enter your Email' />
       
        <input 
        className='w-full border p-2 mb-3' 
        type="password" 
        name='password' 
        value={Inputs.password}
        onChange={change}
        placeholder='Enter your Password' />
    
        </div>



        <button type="button" className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-orange-400" onClick={submit}>Sign In
        </button>


              <p className="mt-2 text-center text-base text-gray-600">
          Don't have an account?{' '}
          <Link
            to={"/signup"}
            title=""
            className="font-medium text-black transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </section>
  )
}

export default Signin