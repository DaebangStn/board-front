'use client'
import {getAuth, GoogleAuthProvider, linkWithPopup, User} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";
import {withAuth} from "@/lib/auths";

function Linking() {
    const router = useRouter()
    const auth = getAuth(app)
    const user: User | null = auth.currentUser

    if (user == null){
        alert("Invalid operation")
        return
    }

    const handleGoogleLink = () => {
        linkWithPopup(user, new GoogleAuthProvider()).then((result) => {
            console.log(result)
        }).catch((error) => {

        });
    }

    return (
        <div className="flex min-h-screen flex-col items-left p-24 space-y-8">
            <div className="mr-5">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGoogleLink}>구글 계정 연결
                </button>
            </div>
        </div>
    );
}

const ProtectedLinking = withAuth(Linking)
export default ProtectedLinking