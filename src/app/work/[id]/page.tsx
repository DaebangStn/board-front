'use client'
import {deleteDoc, doc, DocumentData, getDoc, setDoc} from "@firebase/firestore";
import {app, db, functions} from "@/lib/firebase";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {getAuth, User} from "@firebase/auth";
import {fetchUserRole} from "@/lib/auths";
import {httpsCallable} from "@firebase/functions";

export default function DetailedWork({params}: { params: { id: string } }) {
    const auth = getAuth(app)
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [docData, setDocData] = useState<DocumentData | null>(null)
    const [isApplicant, setIsApplicant] = useState<boolean>(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            if (user) {
                fetchUserRole(user).then((_role) => {
                    if (_role != null) {
                        setRole(_role)
                    } else {
                        toast.warn(user.displayName + '님의 역할을 확인하지 못했습니다')
                    }
                }).catch((error) => {
                    toast.warn(user.displayName + '님의 역할을 확인하지 못했습니다')
                })
            } else {
                setRole(null)
            }
        })

        const docRef = doc(db, "work_detail", params.id)
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setDocData(docSnap.data())
                if (user != null && docSnap.data().employeeApplicant != null) {
                    setIsApplicant(docSnap.data().employeeApplicant.hasOwnProperty(user.uid))
                }
            } else {
                toast.warn("해당하는 일이 없습니다")
                setTimeout(() => {
                    router.push('/')
                }, 2500)
            }
        }).catch((error) => {
            toast.error("오류가 발생했습니다")
            setTimeout(() => {
                router.push('/')
            }, 2500)
        })

        return () => unsubscribe()
    }, [params.id, user])

    const handleEnroll = () => {
        const applyWork = httpsCallable(functions, 'applyWork')

        applyWork({docId: params.id}).then((resp) => {
            toast.info("지원 성공")
            setIsApplicant(true)
        }).catch((error) => {
            toast.error("지원 실패" + error.message)
        })
    }

    const cancelEnroll = () => {
        const quitWork = httpsCallable(functions, 'quitWork')

        quitWork({docId: params.id}).then((resp) => {
            toast.info("지원 취소 완료.")
            setIsApplicant(false)
        }).catch((error) => {
            toast.error("지원 취소 실패" + error.message)
        })

    }

    const handleDelete = () => {
        deleteDoc(doc(db, "work_brief", params.id)).then(() => {
            deleteDoc(doc(db, "work_detail", params.id)).then(() => {
                router.push('/')
            }).catch((error) => {
                toast("삭제 실패: " + error.message)
            })
        }).catch((error) => {
            toast("삭제 실패: " + error.message)
        })
    }

    return (
        <div className="min-h-screen items-left justify-between px-10">
            {docData == null ?
                <div>loading...</div> :
                <div className="flex flex-col">
                    <div className="border border-gray-300 p-4 rounded-md space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-blue-600">{docData.name}</h2>
                        </div>
                        <div>
                            <p className="text-gray-700">{docData.description}</p>
                        </div>
                        {/* for who can view employer data */}
                        {user != null && ((docData.employer && docData.employer.hasOwnProperty(user.uid)) || role == 'admin') &&
                            <div className="space-y-4">
                                <div><p className="text-bold">
                                    지원자: {docData.employeeApplicant ? docData.employee.length : 0}명</p>
                                </div>
                                {docData.employeeApplicant &&
                                    <div className="text-xl">지원자 명단
                                    </div>}
                                {docData.employeeApplicant &&
                                    <div className="w-1/2 h-20 overflow-auto border border-gray-600">
                                        <ul>
                                            {Object.keys(docData.employeeApplicant).map(key => {
                                                return (<li key={key}>{docData.employeeApplicant[key]}</li>)
                                            })}
                                        </ul>
                                    </div>}
                            </div>}
                    </div>
                    {user != null && <div className="flex-row">
                        {role == 'employee' && !isApplicant && <div>
                            <button onClick={handleEnroll}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                지원하기
                            </button>
                        </div>}
                        {role == 'employee' && isApplicant && <div>
                            <button onClick={cancelEnroll}
                                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                지원취소
                            </button>
                        </div>}
                        {((docData.employer && docData.employer.hasOwnProperty(user.uid)) || role == 'admin') &&
                            <div>
                                <button onClick={handleDelete}
                                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    삭제하기
                                </button>
                            </div>}
                    </div>}
                </div>}
        </div>)
}