'use client'
import {EmailAuthProvider, getAuth, GoogleAuthProvider, linkWithPopup, User} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {app} from "@/lib/firebase";
import {useEffect, useState} from "react";
import {withAuth} from "@/lib/auths";

function Linking() {
    const router = useRouter()
    const auth = getAuth(app)
    // @ts-ignore
    const user: User = auth.currentUser

    const [isEmailLinked, setIsEmailLinked] = useState(false);
    const [isGoogleLinked, setIsGoogleLinked] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user != null) {
            const googleProvider = user.providerData.find(profile => profile.providerId === 'google.com');
            setIsGoogleLinked(!!googleProvider);
            const emailProvider = user.providerData.find(profile => profile.providerId === 'password');
            setIsEmailLinked(!!emailProvider);
        }
    }, [user])

    const handleGoogleLink = () => {
        if (!isGoogleLinked) {
            linkWithPopup(user, new GoogleAuthProvider()).then((result) => {
                const user = result.user
                alert("구글 계정 연결 완료: " + user.email)
                router.refresh()
            }).catch((error) => {
                alert("구글 계정 연결 실패: " + error.message)
                router.refresh()
            });
        }
    }

    const handleEmailLink = () => {
        if(!isEmailLinked){
            const credential = EmailAuthProvider.credential(email, password);
            linkWithPopup(user, credential).then((result) => {
                const user = result.user
                alert("이메일 연결 완료: " + user.email)
                router.refresh()
            }).catch((error) => {
                alert("이메일 연결 실패: " + error.message)
                router.refresh()
            })
        }
    }

    return (
        <div className="flex flex-col">
            {!isEmailLinked && (
                <div>
                    <form className="space-y-4 px-8">
                        <div className="flex flex-row space-x-4">
                            <label>이메일:</label>
                            <input type="email" name="email" value={email} className="mt-1"
                                   onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row space-x-4">
                            <label>비밀번호:</label>
                            <input type="password" name="password" value={password} className="mt-1"
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            )}
            <div className="flex min-h-screen flex-row p-8">
                <div className="mr-5">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                    whitespace-nowrap focus:shadow-outline"
                        onClick={handleEmailLink}>
                        {isEmailLinked ? '이메일 연결 완료' : '이메일 연결'}
                    </button>
                </div>
                <div className="mr-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                    whitespace-nowrap focus:shadow-outline"
                        onClick={handleGoogleLink}>
                        {isGoogleLinked ? '구글 계정 연결 완료' : '구글 계정 연결'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const ProtectedLinking = withAuth(Linking)
export default ProtectedLinking