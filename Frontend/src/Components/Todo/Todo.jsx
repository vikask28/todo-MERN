import React, { useState, useEffect } from 'react'
import TodoCards from './TodoCards'
import Update from './Update';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store';
import axios from 'axios';


let id = sessionStorage.getItem("id")
let toUpdateArray = []

const Todo = () => {

    const [Inputs, setInputs] = useState({ title: "", body: "" })

    const [Array, setArray] = useState([])

    const show = () => {
        document.getElementById('textArea').style.display = "block";
    }

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    }

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Task should not be empty!")
        } else {
            if (id) {
                await axios.post(`${window.location.origin}/api/v2/addtask`, { title: Inputs.title, body: Inputs.body, id: id })
                    .then((response) => { toast.success("Your Task is Added!")})
                
                setInputs({ title: "", body: "" })
                
            }else{
                setArray([...Array, Inputs])
                setInputs({ title: "", body: "" })
                toast.success("Your Task is Added!")
                toast.error("Your Task is Not Saved! Please Signup First")
            }
// console.log(Inputs);
        }
    }
    // console.log(Array);

    const del = async(cardId) => {
        if(id){
            await axios.delete(`${window.location.origin}/api/v2/deletetask/${cardId}`, {
                data: { id: id },
            })
            .then(() => {
                // console.log(response.data);
                toast.success("Task deleted!")
            })
            //Array.splice(id, "1");
            //setArray([...Array])
        }else{
            toast.error("Please Signup First")
        }
    }

    const dis = (value) => {
        document.getElementById('todo-update').style.display = value;
    }

    const update = (value)=> {
        toUpdateArray = Array[value];
    }

    useEffect(() => {
        if(id){
            const fetch = async()=>{
                await axios
                .get(`${window.location.origin}/api/v2/gettasks/${id}`)
                .then((response) => {
                    setArray(response.data.list)
                })
              }
              fetch();
        }
      }, [submit])

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
            <ToastContainer />
            <div className='relative max-h-[auto] min-h-[100vh] w-[100%] flex flex-col items-center gap-14'>

                <div className='flex flex-col h-52 xl:w-7/12 md:w-[90%] sm:w-[90%] xs:w-[90%] mt-7 gap-4'>
                    <input className='border p-2 w-full text-2xl rounded shadow-md'
                        required
                        onClick={show}
                        type="text"
                        placeholder='Title'
                        name='title'
                        value={Inputs.title}
                        onChange={change}
                    />

                    <textarea id='textArea'
                        className='hidden border p-2 text-xl rounded w-full'
                        required
                        type="text"
                        placeholder='Body'
                        name='body'
                        value={Inputs.body}
                        onChange={change}
                    />

                    <button className='bg-orange-500 p-2 rounded hover:bg-orange-400 text-xl text-white'
                        onClick={submit}
                    >Add</button>
                </div>

                <div className='w-9/12 grid justify-items-center lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-12'>

                    {Array && Array.map((item, index) =>
                        <TodoCards 
                        title={item.title} 
                        body={item.body} 
                        key={index} 
                        id={item._id} 
                        delId={del} 
                        display={dis}
                        updateId={index}
                        toBeUpdate={update}
                        />
                    )}

                </div>


                <div id='todo-update' className='hidden absolute top-7 left-0 bg-white w-[100%] h-[100vh]'>
                    <Update display={dis} update={toUpdateArray} />
                </div>

            </div>

        </>
    )
}

export default Todo