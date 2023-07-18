'use client'
import {db} from '@/lib/firebase'
import {getDocs, collection, DocumentData} from "@firebase/firestore";
import Link from "next/link";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function Home() {
    const [work, setWork] = useState<DocumentData[]>([])

    useEffect(() => {
        getDocs(collection(db, 'work_brief')).then((doc) => {
            setWork(doc.docs)
            console.log("number of loaded works: ", doc.docs.length)
        }).catch((error) => {
            toast.error("작업 목록을 불러오는데 실패했습니다 " + error.message);
        })

    }, [])

    return (
        <div className="flex min-h-screen flex-col items-left p-24 space-y-8">
            {work.map((item, index) => {
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
