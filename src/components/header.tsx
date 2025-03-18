'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
const Header = () => {
    const [_currrentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => set_currentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])
    return (
        <div className=' h-12  rounded grid grid-cols-12'>
            <div className='col-span-2 flex flex-col justify-center'>
                {_currrentMenu ?
                    <MenuOpenIcon className='lg:!hidden !w-12 !h-12 p-2' onClick={() => store.dispatch(setMenu(false))} />
                    : <MenuIcon className='lg:!hidden !w-12 !h-12 p-2' onClick={() => store.dispatch(setMenu(true))} />}
            </div>
            <p className='h-full flex flex-col justify-center text-center col-span-8 w-full'>Admin</p>
            <div className='col-span-2'></div>
        </div>
    )
}

export default Header