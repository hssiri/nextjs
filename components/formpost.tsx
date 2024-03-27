"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthings";
import Image from "next/image";


const Formpost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!title || !content || !imageUrl) {
            alert("Fill all fields.")
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/Posts', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, content, imageUrl })

            })
            if (res.ok) {
                router.push("/");
            }
            else {
                throw new Error("Failed to create ")
            }
        } catch (error) {

        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5 mt-10">
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <textarea onChange={(e) => setContent(e.target.value)} value={content} className="textarea textarea-bordered w-full max-w-xs" placeholder="Content" ></textarea>

                <div>
                    <input type="hidden" value={imageUrl} name="imageUrl" />
                    <UploadDropzone endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            setImageUrl(res[0].url);
                        }}

                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />

                    {/* {imageUrl.length ? (
              <div>
                <Image src={imageUrl} alt='img' width={500} height={300}/>
              </div>
              ) :null} */}
                </div>

                <button type="submit" className="btn btn-primary w-full max-w-xs">Post</button>
            </form>
        </div>
    )
}

export default Formpost;