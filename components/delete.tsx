"use client"

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Delete({ id }){
    const router = useRouter();
    const removePost = async()=>{
        const confirmed = confirm('Are You Sure?');

        if(confirmed){
            const res = await fetch(`http://localhost:3000/api/Posts?id=${id}`,{
                method:"DELETE",
            })
            if(res.ok){
                router.refresh();
            }
            
        }
    }
    return(
        <button onClick={removePost} className="text-red-400">
            <HiOutlineTrash size={24}/>
        </button>
    )
}