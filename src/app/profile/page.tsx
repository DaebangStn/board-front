'use client'
import {withAuth} from "@/lib/auths";
import {getAuth, updateEmail, updateProfile, User} from "@firebase/auth";
import {app, db} from "@/lib/firebase";
import {useEffect, useState} from "react";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {Linking} from "@/app/profile/linking";

function Profile() {
    const auth = getAuth(app)
    // @ts-ignore
    const user: User = auth.currentUser
    const router = useRouter()

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [permissions, setPermissions] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user != null) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setAddress(data?.address || '')
                    setPermissions(data?.role || '')
                } else {
                    console.log("No document for user: " + user.uid)
                }

                setDisplayName(user.displayName || '');
                setEmail(user.email || '');
                setPhoneNumber(user.phoneNumber || '');
            } else {
                console.log("No user")
            }
        }

        fetchUserData()
    }, [db, user])

    const handleSave = async () => {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
            address: address,
            role: permissions
        })
        await updateProfile(user, {
            displayName: displayName,
            photoURL: null
        }).then(() => {

        }).catch((error) => {
            toast.error("프로필 저장 실패: " + error.message)
        })

        await updateEmail(user, email).then(() => {
        }).catch((error) => {
            toast.error("이메일 저장 실패: " + error.message)
        })

        // TODO: Let's isolate the phone number change logic
        // const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {})
        // const provider = new PhoneAuthProvider(auth)
        // const verificationId = await provider.verifyPhoneNumber(phoneNumber, verifier)
        // const credential = PhoneAuthProvider.credential(verificationId, '123456')
        // await updatePhoneNumber(user, credential).then(() => {
        // }).catch((error) => {
        //     toast.error("전화번호 저장 실패: " + error.message)
        // })

        toast.info("저장 완료")
        await router.push('/')
    }

    const handleUserDelete = async () => {
        user.delete().then(() => {
            toast.info("사용자 삭제 완료")
        }).catch((error) => {
            toast.error("사용자 삭제 실패: " + error.message)
        })
        router.refresh()
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">사용자 정보</h1>
            <div className="space-y-4">
                <div>
                    <label className="block">이름</label>
                    <input type="text" value={displayName}
                           onChange={(e) => setDisplayName(e.target.value)}
                           className="mt-1 block w-full text-black"/>
                </div>
                <div>
                    <label className="block">이메일</label>
                    <input type="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="mt-1 block w-full text-black"/>
                </div>
                <div>
                    <label className="block">전화번호</label>
                    <input type="tel" value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           className="mt-1 block w-full text-black"/>
                </div>
                <div>
                    <label className="block">주소</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                           className="mt-1 block w-full text-black"/>
                </div>
                <div>
                    <label className="block">역할</label>
                    <input type="text" value={permissions} onChange={(e) => setPermissions(e.target.value)}
                           className="mt-1 block w-full text-black" readOnly/>
                </div>
            </div>
            <div className="flex flex-row space-x-8">
                <button onClick={handleSave}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    저장하기
                </button>
                <button onClick={handleUserDelete}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    계정삭제
                </button>
            </div>
            <Linking/>
        </div>
    )
}

const ProtectedProfile = withAuth(Profile)
export default ProtectedProfile