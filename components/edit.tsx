"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function EditPost({id, title, content}){

    const [newTitle , setNewTitle] = useState(title);
    const [newContent , setNewContent] = useState(content);

    const router = useRouter();

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        try{
            const res = await fetch(`http://localhost:3000/api/Posts/${id}`,{
                method:"PUT",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newTitle, newContent}),
            })
            if(!res.ok){
                throw new Error("Failed to update")
            }
            router.refresh();
            router.push("/")
        }catch(error){}
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5 mt-10">
            <input onChange={e=>setNewTitle(e.target.value)} value={newTitle} type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
            <textarea onChange={e=>setNewContent(e.target.value)} value={newContent} className="textarea textarea-bordered w-full max-w-xs" placeholder="Content" ></textarea>
            <button type="submit" className="btn btn-primary w-full max-w-xs">Update</button>
            </form>
        </div>
    )
}