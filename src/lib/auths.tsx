import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useRouter} from "next/navigation";

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

        useEffect(() => {
            if (!loading && !authenticated) {
                alert("로그인 해주세요")
                router.push('/');  // Replace with your login route
            }
        }, [loading, authenticated, router]);

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

        useEffect(() => {
            if (!loading && authenticated) {
                alert("로그아웃 해주세요")
                router.push('/');  // Replace with your login route
            }
        }, [loading, authenticated, router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    }
}

export {withAuth, withOutAuth};