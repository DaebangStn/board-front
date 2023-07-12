'use client'
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";

export default function Home() {
    const router = useRouter()
    const auth = getAuth(app)

    // @ts-ignore
    const handlePassLogin = (event) => {
        event.preventDefault()
        let form_data = event.target
        const email = form_data.email.value
        const password = form_data.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("user: ", user)
                router.push('/')
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage)
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-left p-24 space-y-8">
            <div>
            </div>
        </div>
    );
}