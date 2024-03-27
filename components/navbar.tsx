import Link from "next/link"


export default function Navbar() {
    return (
        <div className="navbar bg-neutral-100">
                <nav className="flex-1 justify-between items-center mx-auto p-4 ">
                    <div className="">
                        <ul className="flex item-center gap-10">
                            <li>
                                <Link href="/" className="no-underline hover:text-sky-500 ">Home</Link>
                            </li>
                            <li>
                                <Link href="/fetchdata" className="no-underline hover:text-sky-500">Blogs</Link>
                            </li>
                            <li>
                                <Link href="/createpost" className="no-underline hover:text-sky-500">Create Post</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        </div>




    )
}

