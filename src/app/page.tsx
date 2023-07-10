import {db} from '../lib/firebase'
import type {work_brief_t} from "../lib/firebase";
import {getDocs, collection, DocumentData} from "@firebase/firestore";
import {initializeApp} from "firebase/app";
import {type} from "os";
import Link from "next/link";
import {it} from "node:test";

export default async function Home() {
    let work_brief = await getDocs(collection(db, 'work_brief'))
    console.log("number of loaded works: ", work_brief.docs.length)

    return (
        <main className="flex min-h-screen flex-col items-left justify-between p-24">
            {work_brief.docs.map((item, index) => {
                return(
                    <div key={index} className="border border-gray-300 p-4 rounded-md">
                       <h2 className="text-2xl font-semibold text-blue-600">{item.data().name}</h2>
                        <p className="text-gray-700">{item.data().description}</p>
                        <Link href={`/work/${item.id}`}>상세 보기</Link>
                    </div>
                )})}
        </main>
    )
}
