import EditPost from "@/components/edit";

const getPostById = async(id) =>{
    try{
        const res = await fetch(`http://localhost:3000/api/Posts/${id}`,{
            cache:'no-store',
        })

        if(!res.ok){
            throw new Error("Failed to fetch");
        }
        return res.json();
    }catch(error){
        console.log(error)
    }
}
export default async function Edit({ params }){
    const {id} = params;
    const {post} = await getPostById(id);
    const {title , content} = post

    return(
        <div>
            <h1 className="text-center font-semibold text-2xl my-4">Edit Post</h1>
            <EditPost id={id} title={title} content={content}/>
        </div>
        
    )
}