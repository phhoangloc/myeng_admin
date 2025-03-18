'use client'
import store from '@/redux/store'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AbcIcon from '@mui/icons-material/Abc';
const Sidebar = () => {

    const [_currentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)

    const update = () => {
        store.subscribe(() => set_currentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])

    const listMenu = [
        {
            icon: <HomeIcon className='!w-12 !h-12 p-2' />,
            name: "Home",
            link: "/",
        },
        {
            icon: <DashboardIcon className='!w-12 !h-12 p-2' />,
            name: "Dashboard",
            link: "/dashboard",
        },
        {
            icon: <AbcIcon className='!w-12 !h-12 p-2' />,
            name: "Word",
            link: "/word",
        },
    ]

    const toPage = useRouter()
    return (
        <div className={`transition-all duration-200 flex flex-col gap-1 p-1 rounded bg-white ${_currentMenu ? "w-72" : "w-16"} lg:w-72`}>
            <div className=' p-1 h-full'>
                {listMenu.map((menu, index) =>
                    <div key={index} className='h-12 flex flex-col justify-center border-b overflow-hidden cursor-pointer' onClick={() => { toPage.push(menu.link) }}>
                        <div className="flex">
                            <div className="">
                                {menu.icon}
                            </div>
                            <div className="flex flex-col justify-center">
                                {menu.name}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>

    )
}

export default Sidebar