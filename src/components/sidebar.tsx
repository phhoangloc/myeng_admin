'use client'
import store from '@/redux/store'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation';
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
            icon: <AbcIcon className='!w-12 !h-12 p-2' />,
            name: "Word",
            link: "/word",
        },
        {
            icon: <AbcIcon className='!w-12 !h-12 p-2' />,
            name: "Path 5",
            link: "/pathfive",
        },
    ]

    const toPage = useRouter()
    return (
        <div className={`transition-all duration-200 rounded h-full ${_currentMenu ? "w-72" : "w-12"} lg:w-72`}>
            <div className='h-full'>
                {listMenu.map((menu, index) =>
                    <div key={index} className='h-12 flex flex-col justify-center overflow-hidden cursor-pointer' onClick={() => { toPage.push(menu.link) }}>
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