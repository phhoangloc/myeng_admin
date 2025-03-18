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
        <div className='w-full p-1 gap-1 lg:p-2 lg:gap-2 bg-slate-200 overflow-x-hidden flex flex-col'>
            <Header />
            <div className='flex w-max gap-1 lg:gap-4'>
                <Sidebar />
                <div className='w-(--vw-19) min-h-(--vh-12) lg:w-(--vw-80) ' onClick={() => store.dispatch(setMenu(false))}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout