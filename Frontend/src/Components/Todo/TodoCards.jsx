import React from 'react'
import { RefreshCcwDot, Trash2 } from 'lucide-react'

const TodoCards = ({ title, body, id, delId, display, updateId, toBeUpdate}) => {
    return (
        <div className='border rounded-lg flex flex-col flex-wrap w-[90%] gap-4 p-4 shadow-md h-50 overflow-hidden'>
            <div className='text-2xl'>{title}</div>
            <div className='text-lg'>{body.split("", 30)}...</div>

            <div className='flex justify-between justify-self-end'>
               <div className='flex gap-2 cursor-pointer'
                    onClick={()=> {
                        display("block")
                        toBeUpdate(updateId);
                    }}
               ><RefreshCcwDot /> Update</div> 


               <div className='flex gap-2 text-red-600 cursor-pointer' 
               onClick={()=>{
                delId(id);
               }}>
                <Trash2 />Delete</div> 
            </div>
        </div>
    )
}

export default TodoCards