'use client'
import React from 'react'
import Header from "@/components/header";
import Sidebar from './sidebar';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';

type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {

    return (
        <div className='w-full bg-slate-200 overflow-hidden  flex flex-col'>
            <Header />
            <div className='flex w-max min-h-(--vh-12)'>
                <Sidebar />
                <div className='w-(--vw-12) lg:w-(--vw-72) pr-1' onClick={() => store.dispatch(setMenu(false))}>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Layout