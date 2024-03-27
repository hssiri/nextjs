"use client"

import Image from "next/image";
import Link from "next/link";
import Delete from "./delete";
import { HiPencilAlt } from "react-icons/hi";
import { useState } from "react";




const getPosts = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/Posts',
            { cache: 'no-store', }
        )
        if (!res.ok) {
            throw new Error("Failed to fetch")
        }
        return res.json();
    } catch (error) {
        console.log("Error", error)
    }
}


export default async function PostCard({ props }: { props: { title: string } }) {
    
    var { posts } = await getPosts();

    if (props.title) {
        const searchdata = posts.filter((post: any) => post.title.toLowerCase().includes(props.title));
        posts = searchdata
    }



    return (
        <>
            {posts.map((post: any) => (
                <div className="card w-full h-full bg-base-100 shadow-xl border">

                        <div>
                            <Image src={post.img} alt='img' width={500} height={500} />
                        </div>
                   

                    <div className="card-body">
                        <h2 className="card-title">{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="card-actions justify-end">
                            <Delete id={post._id} />
                            <Link href={`/editpost/${post._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
