import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/posts";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    const { id }= params;
    const {newTitle: title , newContent: content} = await request.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, {title, content});
    return NextResponse.json({message: "Post Updated"},{status:200});
}

export async function GET(request,{params}){
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({_id : id});
    return NextResponse.json({post},{status:200});
}