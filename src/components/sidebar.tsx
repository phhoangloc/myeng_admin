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
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>5</div>,
            name: "Path 5",
            link: "/pathfive",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>6</div>,
            name: "Path 6",
            link: "/pathsix",
        },
        {
            icon: <div className='!w-12 !h-12 p-2 flex flex-col justify-center text-center font-bold text-xl'>7</div>,
            name: "Path 7",
            link: "/pathseven",
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