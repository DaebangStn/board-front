import './globals.css'
import {Inter} from 'next/font/google'
import Head from 'next/head';
import Navbar from "@/app/navbar";
import {Metadata} from "next";
import 'react-toastify/dist/ReactToastify.css';


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
        <Head>
            <title>어이, 김씨!</title>
            <meta name="description" content="인력 중개 플랫폼"/>
        </Head>
        <body className={inter.className}>
        <Navbar/>
        {children}

        </body>
        </html>
    )
}