'use client'
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "@firebase/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {app, db} from "@/lib/firebase";
import {withOutAuth} from "@/lib/auths";
import {doc, setDoc} from "@firebase/firestore";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";


function SignUp() {
    const auth = getAuth(app)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState(searchParams.get('email') || '')

    useEffect(() => {
        if (searchParams.has('email')) {
            toast.info(<div>가입 되지 않은 이메일입니다<br/>회원가입 페이지로 이동합니다</div>)
        }
    }, [])

    // @ts-ignore
    const handlePassSignup = (event) => {
        event.preventDefault()
        let form_data = event.target
        const password = form_data.password.value
        const password_confirm = form_data.password_check.value

        if (password !== password_confirm) {
            toast.error("비밀번호가 일치하지 않습니다.")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                const docRef = doc(db, "users", user.uid);

                setDoc(docRef, {
                    address: form_data.address.value,
                    role: 'employee'
                }).then(() => {
                }).catch((error) => {
                    toast.error("회원가입 실패: " + error.message)
                    router.refresh()
                })

                updateProfile(user, {
                    displayName: form_data.displayName.value,
                    photoURL: null
                }).then(() => {
                }).catch((error) => {
                    toast.error("회원가입 실패: " + error.message)
                })

                router.push('/signup/linking')
            }).catch((error) => {
            toast.error("회원가입 실패: " + error.message)
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-left px-24 space-y-8">
            <div>
                <h2 className="font-extrabold text-4xl">회원가입</h2>
            </div>
            <div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handlePassSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            이메일
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            비밀번호
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" name="password" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            비밀번호 확인
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password_check" type="password" name="password_check" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            이름 *(옵션)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="displayName" type="text" name="displayName"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            휴대전화 *(옵션)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber" type="text" name="phoneNumber"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            주소 *(옵션)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address" type="text" name="address"/>
                    </div>
                    <div className="flex flex-row">
                        <div className="mr-5">
                            <button
                                className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">회원가입
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ProtectedSignUp = withOutAuth(SignUp)
export default ProtectedSignUp


