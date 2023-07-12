'use client'
import {getAuth, onAuthStateChanged, User} from "@firebase/auth";
import {app} from "@/lib/firebase";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";

export default function Navbar() {
    const [user, setUser] = useState<User|null>(null)
    const auth = getAuth(app)
    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    const signOut = () => {
        const auth = getAuth(app)

        auth.signOut().then(() => {
            console.log("sign out")
        }).catch((error) => {
            console.log("sign out error: ", error)
        })
        router.refresh()
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-row items-center space-x-5 p-10">
                <Link href={'/'} className="text-3xl">Hey, MR. KIM!</Link>
                {user == null && <Link href={`/signin`}>로그인</Link>}
                {user == null && <Link href={`/signup`}>회원가입</Link>}
                {user != null && <button onClick={signOut}>로그아웃</button>}
                <Link href={`/work/add`}>일 추가</Link>
            </div>
            <div>
                {user != null && <div className="flex flex-row p-10">
                    <p>{user.email}님 안녕하세요!</p>
                </div>}
            </div>
        </div>
    );

}