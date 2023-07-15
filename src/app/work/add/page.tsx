'use client'
import {addDoc, arrayUnion, collection, doc, setDoc} from "@firebase/firestore";
import {app, db} from "@/lib/firebase";
import {withAdmin} from "@/lib/auths";
import {getAuth, User} from "@firebase/auth";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddWork() {
    const auth = getAuth(app)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])


    // @ts-ignore
    const handleSubmit = async (event) => {
            event.preventDefault()
            let form_data = event.target
        toast.success(form_data.name.value + "가 등록 되었습니다")

        if (user != null) {
            const doc_ref = await addDoc(
                collection(db, 'work_brief'), {
                    name: form_data.name.value,
                    description: form_data.description_brief.value,
                })

            await setDoc(doc(db, 'work_detail', doc_ref.id), {
                name: form_data.name.value,
                description: form_data.description_detail.value,
                employer: {[user.uid]: user.displayName},
        });
            console.log('Document written with ID: ', doc_ref.id)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        제목
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" name="name" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        간략한 설명
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description_brief" type="text" name="description_brief" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        자세한 설명
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:sh"
                        id="description_detail" name="description_detail" rows={5} required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        모집인원(명)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="num_applicant" type="number" name="num_applicant" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        게시기간
                    </label>
                    <div className="flex flex-row">
                        <div className="mr-1 w-2/5">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="adv_date_to" type="datetime-local" name="adv_date_from"/>
                        </div>
                        <div className="mr-1 text-black font-bold text-center w-1/5">
                            <h4> ~ </h4>
                        </div>
                        <div className="w-2/5">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="adv_date_from" type="datetime-local" name="adv_date_to"/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between flex-row">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        등록
                    </button>
                </div>
            </form>
                        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        </div>
    );
}

const ProtectedAddWork = withAdmin(AddWork)
export default ProtectedAddWork