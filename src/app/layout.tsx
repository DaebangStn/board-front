import './globals.css'
import {Inter} from 'next/font/google'
import Navbar from "@/app/navbar";
import {Metadata} from "next";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: '어이, 김씨!',
    description: '인력 중개 플랫폼',
}
export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        {children}
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={false}
                        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        </body>
        </html>
    )
}