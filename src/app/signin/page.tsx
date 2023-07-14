'use client'
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";
import {withOutAuth} from "@/lib/auths";
import React from "react";

function SignIn(){
    const auth = getAuth(app)
    const router = useRouter()

    if (auth.currentUser != null) {
        console.log("Already authenticated: ", auth.currentUser)
        router.push('/')
    }

    // @ts-ignore
    const handlePassLogin = (event) => {
        event.preventDefault()
        let form_data = event.target
        const email = form_data.email.value
        const password = form_data.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("signin: ", user.email)
                router.push('/')
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage)
        })
    }

    const handleGoogleLogin = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                const user = result.user
                console.log("user: ", user)
                console.log("token: ", token)
                router.push('/')
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.email
            console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage, "email: ", email)
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-left px-24 space-y-8">
            <div>
                <h2 className="font-extrabold text-4xl">로그인</h2>
            </div>
            <div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handlePassLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            이메일
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text" name="email" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            비밀번호
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" name="password" required/>
                    </div>
                    <div className="flex flex-row">
                        <div className="mr-5">
                            <button
                                className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">이메일로 로그인
                            </button>
                        </div>
                        <div className="mr-5">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleGoogleLogin}>구글로 로그인
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ProtectedSignIn = withOutAuth(SignIn);
export default ProtectedSignIn;
