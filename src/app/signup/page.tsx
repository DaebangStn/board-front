'use client'
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";
import {withOutAuth} from "@/lib/auths";
import exp from "constants";

function SignUp() {
    const auth = getAuth(app)
    const router = useRouter()

    // @ts-ignore
    const handlePassSignup = (event) => {
        event.preventDefault()
        let form_data = event.target
        const email = form_data.email.value
        const password = form_data.password.value
        const password_confirm = form_data.password_check.value

        if (password !== password_confirm) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("user: ", user)
                router.push('/signup/linking')
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage)
            alert(errorMessage)
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            비밀번호 확인
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password_check" type="password" name="password_check" required/>
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


