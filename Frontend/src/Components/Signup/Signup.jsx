import React, { useState } from 'react'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeadingComp from './HeadingComp'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const history = useNavigate();

  const [Inputs, setInputs] = useState({ email: "", username: "", password: "" })


  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const submit = async (e)=>{
    e.preventDefault();
    await axios
    .post(`${window.location.origin}/api/v1/register`, Inputs)
    .then((response) => {
      if(response.data.message === "User Already Exists"){
        alert(response.data.message);
      }else{
        alert(response.data.message);
      }
      setInputs({
        email: "", username: "", password: ""
      });
      history("/signin")
    });
  };


  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

          <HeadingComp first="Sign" second="Up" />


          <div className="flex flex-col gap-8">

            <input className='w-full border p-2 mt-3'
              type="email"
              name='email'
              placeholder='Enter your Email'
              onChange={change}
              value={Inputs.email} />

            <input className='w-full border p-2'
              type="username"
              name='username'
              placeholder='Enter your Username'
              onChange={change}
              value={Inputs.username} />

            <input className='w-full border p-2 mb-3'
              type="password"
              name='password'
              placeholder='Enter your Password'
              onChange={change}
              value={Inputs.password} />
          </div>

          <button type="button"
            onClick={submit}
            className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-orange-400"
          >Create Account
            <ArrowRight className="ml-2" size={16} />
          </button>


          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to={"/signin"}
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signup