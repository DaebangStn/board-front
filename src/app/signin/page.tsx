'use client'
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";
import {withOutAuth} from "@/lib/auths";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

function SignIn() {
    const auth = getAuth(app)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (auth.currentUser != null) {
        return
    }

    // @ts-ignore
    const handlePassLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("signin: ", user.email)
                router.push('/')
            }).catch((error) => {
            const errorCode = error.code

            if (errorCode === 'auth/invalid-email') {
                router.push('/signup?email=' + email)
                return
            } else {
                toast.error("로그인 실패: " + error.message)
                router.refresh()
            }
        })
    }

    const handleGoogleLogin = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                return
            }).catch((error) => {
            toast.error("로그인 실패: " + error.message)
            router.refresh()
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-left px-24 space-y-8">
            <div>
                <h2 className="font-extrabold text-4xl">로그인</h2>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        이메일
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                            leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" name="email" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        비밀번호
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                            leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" name="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div className="flex flex-row">
                    <div className="mr-5">
                        <button
                            className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                            focus:outline-none focus:shadow-outline"
                            onClick={handlePassLogin}>
                            이메일 로그인 혹은 가입
                        </button>
                    </div>
                    <div className="mr-5">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                            focus:outline-none focus:shadow-outline"
                            onClick={handleGoogleLogin}>
                            구글로 시작
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        </div>
    );
}

const ProtectedSignIn = withOutAuth(SignIn);
export default ProtectedSignIn;
