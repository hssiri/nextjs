import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/posts";


export async function POST(req,res) {
  // console.log(await req.json())
    const { title, content,imageUrl } = await req.json();

    await connectMongoDB();
    await Post.create({ title, content, img:imageUrl });
    return NextResponse.json({ message: "Post Created" }, { status: 201 })
}

  
export async function GET() {
    await connectMongoDB();
    const posts = await Post.find();
    return NextResponse.json({ posts })
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({message:"Post Deleted"}, {status: 200})
}