'use client'
import {getAuth, onAuthStateChanged, User} from "@firebase/auth";
import {app, db} from "@/lib/firebase";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect, useState} from "react";
import {doc, getDoc} from "@firebase/firestore";
import {fetchUserRole} from "@/lib/auths";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const auth = getAuth(app)
    const router = useRouter()

    console.log('navbar loaded')


    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                fetchUserRole(user).then((_role) => {
                    if (_role == null) {
                        console.log('user role undefined')
                    } else {
                        console.log('user role: ', _role)
                        setRole(_role)
                    }
                }).catch((error) => {
                    console.log('fetch user data error: ', error)
                })
            } else {
                setRole(null)
            }
        })
    }, [user, role])

    const signOut = () => {
        const auth = getAuth(app)

        auth.signOut().then(() => {
            console.log("sign out")
        }).catch((error) => {
            console.log("sign out error: ", error)
        })

        setRole(null)
        setUser(null)
        router.push('/')
    }

    return (
        <div className="flex flex-row w-full py-5">
            <div className="flex flex-row items-center space-x-5 px-5">
                <Link href={'/'} className="text-3xl">Hey, MR. KIM!</Link>
                {user == null && <Link href={`/signin`}>로그인</Link>}
                {user == null && <Link href={`/signup`}>회원가입</Link>}
                {user != null && <Link href={`/profile`}>마이페이지</Link>}
                {user != null && <button onClick={signOut}>로그아웃</button>}
                {role == 'admin' && <Link href={`/work/add`}>일 추가</Link>}
                {user != null && <div className="px-10">
                    {user.displayName ? <p>{user.displayName}님 안녕하세요!</p> : <p>{user.email}님 안녕하세요!</p>}
                </div>}
            </div>
        </div>
    );

}