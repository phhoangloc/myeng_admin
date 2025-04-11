'use client'
import React, { useState, useEffect } from 'react'
import Header from "@/components/header";
import Sidebar from './sidebar';
import store from '@/redux/store';
import { UserType } from '@/redux/reducer/UserReduce';
import LoginCard from '@/tool/card/loginCard';

type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)
    const [_currentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)

    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentMenu(store.getState().menu))

    }
    useEffect(() => {
        update()
    }, [])

    return (

        _currentUser.id ?
            <div className='w-full bg-slate-200 overflow-hidden  flex flex-col'>
                <div className='flex w-max min-h-screen'>
                    <div className={`transition-all duration-200 rounded h-full ${_currentMenu ? "w-40" : "w-12"} lg:w-40`}>

                        <Sidebar />
                    </div>

                    <div className='w-(--vw-12) lg:w-(--vw-40) px-2'>
                        <Header />
                        {children}
                    </div>
                </div>
            </div> :
            <div className='w-full h-screen flex flex-col justify-center bg-slate-200'>
                <LoginCard />
            </div>
    )
}


export default Layout