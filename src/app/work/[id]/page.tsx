import {useRouter} from "next/router";
import {doc, DocumentData, getDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";


export default async function Home({params}: {params:{id:string}}) {
    const docRef = doc(db, "work_detail", params.id)
    const work_detail: DocumentData = await getDoc(docRef)
    if (work_detail.exists()){
        console.log("loading work detail, id: ", params.id)
        return (
            <main className="flex min-h-screen flex-col items-left justify-between p-24">
                <div className="border border-gray-300 p-4 rounded-md">
                    <h2 className="text-2xl font-semibold text-blue-600">{work_detail.data().name}</h2>
                    <p className="text-gray-700">{work_detail.data().description}</p>
                </div>
            </main>
        )
    }else{
        console.log("There is no such work: ", params.id)

        return (
            <main className="flex min-h-screen flex-col items-left justify-between p-24">
                There is no such work {params.id}
            </main>
        )
    }
}
