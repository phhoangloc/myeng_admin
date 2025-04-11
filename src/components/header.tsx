'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { ApiLogout } from '@/api/client';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { UserType } from '@/redux/reducer/UserReduce';
const Header = () => {
    const [_currentUser, set_currentUser] = useState<UserType>(store.getState().user)

    const [_currrentMenu, set_currentMenu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => set_currentUser(store.getState().user))
        store.subscribe(() => set_currentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    }, [])

    const logout = async () => {
        const result = await ApiLogout()
        console.log(result)
        if (result.success) {
            store.dispatch(setRefresh())
        }
    }
    return (
        <div className=' h-12  rounded flex'>
            <div className='flex flex-col justify-center'>
                {_currrentMenu ?
                    <MenuOpenIcon className='lg:!hidden !w-12 !h-12 p-2 cursor-pointer' onClick={() => store.dispatch(setMenu(false))} />
                    : <MenuIcon className='lg:!hidden !w-12 !h-12 p-2 cursor-pointer' onClick={() => store.dispatch(setMenu(true))} />}
            </div>
            <p className='h-full flex flex-col justify-center col-span-8 w-full font-bold uppercase text-xl'>Admin</p>
            <div className='!w-9 !h-9 m-auto  cursor-pointer flex flex-col justify-center text-center font-bold text-lg bg-white rounded-[50%]'>
                {_currentUser.id ? <p onClick={() => logout()}>L</p> : null}
            </div>
        </div>
    )
}

export default Header