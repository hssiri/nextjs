"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthings";

export default function EditPost({ id, title, content, imageUrl }) {

    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    const [newImageUrl, setNewImageUrl] = useState(imageUrl);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/Posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newContent, newImageUrl }),
            })
            if (!res.ok) {
                throw new Error("Failed to update")
            }
            router.refresh();
            router.push("/")
        } catch (error) { }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5 mt-10">
                <input onChange={e => setNewTitle(e.target.value)} value={newTitle} type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <textarea onChange={e => setNewContent(e.target.value)} value={newContent} className="textarea textarea-bordered w-full max-w-xs" placeholder="Content" ></textarea>

                <div>
                    {/* <input type="hidden" value={newImageUrl} name="imageUrl" /> */}
                    <UploadDropzone endpoint='imageUploader'
                        onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            setNewImageUrl(res[0].url);
                        }}

                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                </div>


                <button type="submit" className="btn btn-primary w-full max-w-xs">Update</button>
            </form>
        </div>
    )
}