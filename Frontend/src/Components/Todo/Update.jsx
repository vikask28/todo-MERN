import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Update = ({display, update}) => {

    let id = sessionStorage.getItem("id")

    useEffect(() => {
        setInputs({
             title : update.title, 
             body : update.body}
             )
    }, [update, id])
    

    const [Inputs, setInputs] = useState({title : "", body: ""})


    const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name] : value})
    }

    const submit = async() => {
        if(id){
            await axios.put(`${window.location.origin}/api/v2/updatetask/${update._id}`, Inputs)
            .then((response) => {
                toast.success("Task Updated")
            })
         //   console.log(Inputs);
            display('none')
        }
        
    }

    return (
        <div className='p-10 flex items-center justify-center'>
            <div className='flex flex-col xl:w-7/12 md:w-[90%] sm:w-[90%] xs:w-[90%] gap-4'>
                <p className='text-orange-500 text-3xl font-medium mb-5'>Update Task</p>
                    <input className='border p-2 w-full text-2xl rounded shadow-md'
                        required
                        type="text"
                        name="title"
                        placeholder='Title' 
                        value={Inputs.title}
                        onChange={change}
                    />

                    <textarea id='textArea'
                        className='border p-2 text-xl rounded w-full'
                        required
                        type="text"
                        name="body"
                        placeholder='Body'
                        value={Inputs.body}
                        onChange={change}
                    />

                    <button 
                    className='bg-orange-500 p-2 rounded hover:bg-orange-400 text-xl text-white'
                    onClick={submit}  
                    >Update</button>

                    <button 
                    className='bg-orange-500 p-2 rounded hover:bg-orange-400 text-xl text-white'
                    onClick={()=> display('none')}          
                    >Cancel</button>
                </div>
        </div>
    )
}

export default Update