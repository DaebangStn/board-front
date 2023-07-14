import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useRouter} from "next/navigation";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {User} from "@firebase/auth";

// @ts-ignore
function withAuth(Component) {
    // @ts-ignore
    return function WrappedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const auth = getAuth();

            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoading(false);
                    setAuthenticated(true);
                } else {
                    setLoading(false);
                    setAuthenticated(false);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();

        }, []);  // Empty dependency array means this effect runs once on mount and cleanup on unmount

        if (!loading && !authenticated) {
            alert("로그인 해주세요")
            router.push('/signin')
            return
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    }
}

// @ts-ignore
function withOutAuth(Component) {
    // @ts-ignore
    return function WrappedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const auth = getAuth();

            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoading(false);
                    setAuthenticated(true);
                } else {
                    setLoading(false);
                    setAuthenticated(false);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();

        }, []);  // Empty dependency array means this effect runs once on mount and cleanup on unmount

        if (!loading && authenticated) {
            alert("로그아웃 해주세요")
            router.push('/')
            return
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    }
}

// @ts-ignore
function withAdmin(Component) {
    // @ts-ignore
    return function WrappedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const auth = getAuth();

            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchUserRole(user).then((role) => {
                        if (role == null) {
                            console.log('user role undefined')
                        } else {
                            console.log('user role: ', role)
                            if (role === 'admin') {
                                setLoading(false);
                                setAuthenticated(true);
                            } else {
                                setLoading(false);
                                setAuthenticated(false);
                            }
                        }
                    }).catch((error) => {
                        console.log('fetch user data error: ', error)
                    })
                } else {
                    setLoading(false);
                    setAuthenticated(false);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();

        }, []);  // Empty dependency array means this effect runs once on mount and cleanup on unmount

        if (!loading && !authenticated) {
            alert("관리자 권한이 필요합니다")
            router.push('/');  // Replace with your login route
            return
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    }
}

async function fetchUserRole(user: User) {
    if (user != null) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()?.role
        } else {
            throw new Error("No document for user: " + user?.uid)
        }
    }
}


export {withAuth, withOutAuth, fetchUserRole, withAdmin};