import {app, db} from '@/lib/firebase'
import {getDocs, collection} from "@firebase/firestore";
import Link from "next/link";

export default async function Home() {
    let work_brief = await getDocs(collection(db, 'work_brief'))
    console.log("number of loaded works: ", work_brief.docs.length)

    return (
        <div className="flex min-h-screen flex-col items-left p-24 space-y-8">
            {work_brief.docs.map((item, index) => {
                return(
                    <div key={index} className="border border-gray-300 p-4 rounded-md">
                       <h2 className="text-2xl font-semibold text-blue-600">{item.data().name}</h2>
                        <p className="text-gray-700">{item.data().description}</p>
                        <Link href={`/work/${item.id}`}>상세 보기</Link>
                    </div>
                )})}
        </div>
    )
}
